import React from 'react'
import axios from 'axios'
import MyPostList from '../components/MyPostList'
import Img from '../components/Img'


export default class MyPost extends React.Component {

    state = {
        username: '',
        sessioncode: '',
        avatar: ''
    }

    componentDidMount(){
        axios.get('/getsession').then(res => {
            this.setState({
                username: res.data.username,
                sessioncode: res.data.code,
                avatar: res.data.avatar
            })
            console.log(this.state);
        })
    }


    render(){
        return (
            <div className="container mypost-container">
                {
                    this.state.username? 
                    <div className="list-group">
                        <a className="list-group-item">
                            <div className="comment-avatar">
                                <Img src={"/avatar/" + '.jpg'} alt=""/>
                            </div>
                            <div className="username">
                                <h4>item.username</h4> 
                                <p>item.datetime</p>
                            </div>
                            <div className="content">
                                <p>item.content</p>
                            </div>                         
                        </a>
                    </div>
                    :
                    <p>Please sign in...</p>
                }
            </div>
        )
    }
}