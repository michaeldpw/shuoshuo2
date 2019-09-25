import React from 'react'
import axios from 'axios'
import MyPostList from '../components/MyPostList'


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
                    <MyPostList />
                    :
                    <p>Please sign in...</p>
                }
            </div>
        )
    }
}