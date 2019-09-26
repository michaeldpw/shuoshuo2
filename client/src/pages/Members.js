import React from 'react'
import axios from 'axios'
import MemberList from '../components/MemberList';
import LoadingSpinner from '../components/LoadingSpinner'

export default class Members extends React.Component {

    state = {
        username: '',
        sessioncode: '',
        avatar: '',
        loading: false
    }

    componentDidMount(){
        this.setState({loading: true}, () => {
            axios.get('/getsession').then(res => {
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
                    <LoadingSpinner />: (
                        this.state.username? 
                        <MemberList  />
                        :
                        <p>Please sign in...</p>
                    )
                }
            </div>
        )
    }
}