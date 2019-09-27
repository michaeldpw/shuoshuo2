import React from 'react'
import axios from 'axios'
import MemberList from '../components/MemberList';
import Loader from 'react-loader-spinner';
import { url } from '../url'
import { Redirect } from 'react-router-dom'

export default class Members extends React.Component {

    state = {
        username: '',
        sessioncode: '',
        avatar: '',
        loading: false,
        redirect: false
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
           }).then(() => this.setState({
            redirect: this.state.username? false: true
        }))
        })  
    }




    render(){
        return (
            <div className="container mypost-container">

                {
                    this.state.loading?
                    <Loader type="ThreeDots" 
                            style={{"display": "flex", "justify-content": "center"}} 
                            color="#e87110" 
                            height="100" 
                            width="100" />
                    : 
                    (
                        !this.state.redirect? 
                        <MemberList  />
                        :
                        <Redirect to='/signin' />
                    )
                }
            </div>
        )
    }
}