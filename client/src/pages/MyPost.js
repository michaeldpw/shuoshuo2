import React from 'react'
import axios from 'axios'
import MyPostList from '../components/MyPostList'
import Loader from 'react-loader-spinner';
import { url } from '../url'


export default class MyPost extends React.Component {

    state = {
        username: '',
        sessioncode: '',
        avatar: '',
        loading: false
    }

    componentDidMount(){
        this.setState({loading: true}, () => {
            axios.get(url + '/getsession').then(res => {
                this.setState({
                    loading: false,
                    username: res.data.username,
                    sessioncode: res.data.code,
                    avatar: res.data.avatar
                })
           })
        })  
    }


    render(){
        return (
            <div className="container mypost-container">
                {
                    this.state.loading?
                    <Loader style={{"display": "flex", "justify-content": "center", "margin": "auto"}}type="ThreeDots" color="#e87110" height="100" width="100" />
                    : (
                        this.state.username? 
                        <MyPostList />
                        :
                        <p>Please sign in...</p>
                    )
                }
            </div>
        )
    }
}