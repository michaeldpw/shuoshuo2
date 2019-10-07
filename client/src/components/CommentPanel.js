import React from 'react'
import Img from './Img'
import { connect } from 'react-redux';
import { url } from '../url'
import Axios from 'axios';


class CommentPanel extends React.Component {

    state = {
        comment:''
    }

    handleInputChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    handleSubmit = () => {
        const comment = {
            _id: Date.now().toString(),
            pid: this.props.pid,
            author: this.props.auth.user,
            content: this.state.comment,
            createdAt: new Date()
        }

        Axios.post(url + '/postcomment', comment).then(res => {
            console.log(res.data);
            window.location.reload();
        })


    }


    render(){
        return (
            <div className="comment-panel" style={{"display": (this.props.isShown?'flex':'none')}}  >
                <Img src={url + "/avatar/" + this.props.auth.user + '.jpg'} 
                    alt=""
                    style={{"height": "30px", "width": "30px", "border-radius": "15px"}}/>
                <input type="text" 
                        onChange={this.handleInputChange} 
                        placeholder="Say something..." required/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }


    
}

const mapStateToProps = (state) => {
        return {
            auth: state.auth
        }
    }

export default connect(mapStateToProps, null)(CommentPanel)