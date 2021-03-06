import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './pages.css';
import ReactCrop from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";
import Loader from 'react-loader-spinner'
import { url } from '../url'
import { connect } from 'react-redux'

import {extractImageFileExtensionFromBase64,
	image64toCanvasRef} from '../base64'
axios.defaults.withCredentials = true;

const imageMaxSize = 1000000000 // bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})
class SetAvatar extends React.Component{

		constructor(props){
			super(props)
			this.imagePreviewCanvasRef = React.createRef()
			this.fileInputRef = React.createRef()	
			this.state = {
					loading: false,
					imgSrc: null,
					imgSrcExt: null,
					src: null,
					avatar: null,
					username: null,
					code:'',
					crop: {
						aspect: 1 / 1,
					},
					x: 0,
					y: 0,
					width: 0,
					height: 0
		}
	 }

	 verifyFile = (files) => {
		if (files && files.length > 0){
				const currentFile = files[0]
				const currentFileType = currentFile.type
				const currentFileSize = currentFile.size
				if(currentFileSize > imageMaxSize) {
						alert("This file is not allowed. " + currentFileSize + " bytes is too large")
						return false
				}
				if (!acceptedFileTypesArray.includes(currentFileType)){
						alert("This file is not allowed. Only images are allowed.")
						return false
				}
				return true
		}
}

handleImageLoaded = (image) => {
	//console.log(image)
}
handleOnCropChange = (crop) => {
	this.setState({crop:crop})
}
handleOnCropComplete = (crop, pixelCrop) =>{
	console.log(crop, pixelCrop)
	const canvasRef = this.imagePreviewCanvasRef.current
	const {imgSrc}  = this.state
	image64toCanvasRef(canvasRef, imgSrc, crop)
}

handleFileSelect = event => {
	// console.log(event)
	const files = event.target.files
	console.log(files);
	if (files && files.length > 0){
				const isVerified = this.verifyFile(files)
			 if (isVerified){
					 // imageBase64Data 
					 const currentFile = files[0]
					 const myFileItemReader = new FileReader()
					 myFileItemReader.addEventListener("load", ()=>{
							 // console.log(myFileItemReader.result)
							 const myResult = myFileItemReader.result
							 this.setState({
									 imgSrc: myResult,
									 imgSrcExt: extractImageFileExtensionFromBase64(myResult)
							 })
					 }, false)
					 myFileItemReader.readAsDataURL(currentFile)
			 }
	}
}

	render(){
		const {imgSrc} = this.state
		const url_username = this.props.match.params.username;
	  
		return (
			<div className="avatar-container">
				{
					this.props.auth.user && this.props.auth.user == url_username? 
					<div>
						<form method="post" 
									action={url + "/uploadandcropavatar"}
									target="targetIfr" 
									encType="multipart/form-data">
							<div className="form-group">
								<input ref={this.fileInputRef} type='file' name="image" accept={acceptedFileTypes} multiple={false} onChange={this.handleFileSelect} />
							  <input type="text" readOnly name="x" value={this.state.crop.x}/>
								<input type="text" readOnly name="y" value={this.state.crop.y}/>
								<input type="text" readOnly name="width" value={this.state.crop.width}/>
								<input type="text" readOnly name="height" value={this.state.crop.height}/>
							</div>
							<button type="submit" className="btn btn-default" >Submit</button>
						  <iframe name="targetIfr" style={{display:"none"}}></iframe> 
						</form>

        			<br/>
						<div>
							<ReactCrop
								src={imgSrc} 
								crop={this.state.crop} 
								onImageLoaded={this.handleImageLoaded}
								onComplete = {this.handleOnCropComplete}
								onChange={this.handleOnCropChange}/>

                  	<br/>
                  	<p>Preview Canvas Crop </p>
                  	<canvas ref={this.imagePreviewCanvasRef}></canvas>
              		</div>
			    </div>
					:<h1>Sorry, you need to <NavLink to="/signin">sign in</NavLink>.</h1>
				
				}
				
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, null)(SetAvatar);