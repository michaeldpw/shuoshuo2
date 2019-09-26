import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { url } from '../url'
import Img from '../components/Img'
import Loader from 'react-loader-spinner'
axios.defaults.withCredentials = true;


class UserPage extends React.Component{

    state = {
        avatar: null,
        username: null,
        code:'',
        loading: ''
    }

    componentDidMount(){ 
        this.setState({loading: true}, () => {
            axios.get(url + '/getsession').then(res => {
                this.setState({
                    code: res.data.code,
                    username: res.data.username,
                    avatar: res.data.avatar,
                    loading: false
                })
            })
        })
       
    }


    render(){

        const url_username = this.props.match.params.username;

        return (
            <div className="user-container">
                {
                    this.state.loading?
                    <Loader style={{"display": "flex", "justify-content": "center", "margin": "auto"}}
                        type="ThreeDots" 
                        color="#e87110" 
                        height="100" 
                        width="100" />
                    :
                    (
                     this.state.username && this.state.username == url_username? 
                        <div className="user-info">
                            <div className="user-avatar">
                            <NavLink to={"/setavatar/" + this.state.username}>
                                <Img style={{"height": "100px", "width": "100px", "border-radius": "50px"}} 
                                        src={url + "/avatar/" + this.state.username + '.jpg'} 
                                        alt=""/>
                            </NavLink>
                            </div>
                            <p>{this.state.username}</p>
                            
                        </div>
                        :
                        <h1>Sorry {url_username}, you need to <NavLink to="/signin">sign in</NavLink>.</h1>
                    )
                }
                
               
            </div>
        )
    }
}

export default UserPage;