import React from 'react'
import Img from './Img'
import { connect } from 'react-redux';
import { url } from '../url'
import Axios from 'axios';
import { withRouter } from 'react-router-dom'


class CommentPanel extends React.Component {

    state = {
        comment:'',
        loading: false
        
    }

    handleInputChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    handleSubmit = () => {
        console.log(this.props.pid)
        if (!this.props.auth.user) {
          this.props.history.push('/signin');
          return;
        }

        const comment = {
            _id: Date.now().toString(),
            pid: this.props.pid,
            author: this.props.auth.user,
            content: this.state.comment,
            createdAt: new Date()
        }

        this.setState({loading: true});
        Axios.post(url + '/postcomment', comment).then(res => {
                this.setState({
                    loading: false
                })
        })
       window.location.reload();
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

                {
                    this.state.loading?
                    <button onClick={this.handleSubmit} disabled={!this.state.comment}>Submitting...</button>
                    :
                    <button onClick={this.handleSubmit} disabled={!this.state.comment}>Submit</button>
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

export default withRouter(connect(mapStateToProps, null)(CommentPanel))