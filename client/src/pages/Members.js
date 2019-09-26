import React from 'react'
import axios from 'axios'
import MemberList from '../components/MemberList';

export default class Members extends React.Component {

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
                    <MemberList />
                    :
                    <p>Please sign in...</p>
                }
            </div>
        )
    }
}