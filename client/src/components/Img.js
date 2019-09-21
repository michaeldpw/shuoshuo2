import React from 'react'

class Img extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            src: this.props.src? this.props.src : ''
        }
    }

    handleImageError = () => {
        this.setState({
            src: require('./default.jpg')
        })
    }

    handleImageLoaded = () => {

    }

    render(){
        return (
            <img 
                {...this.props}
                src={this.state.src}
                onLoad={this.handleImageLoaded}
                onError={this.handleImageError}
            />
        )
    }
}

export default Img;