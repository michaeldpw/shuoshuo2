import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { url } from '../url'
import Img from '../components/Img'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
axios.defaults.withCredentials = true;


class UserPage extends React.Component{

    state = {
        avatar: null,
        username: null,
        code:'',
        loading: ''
    }


    render(){

        const url_username = this.props.match.params.username;

        return (
            <div className="user-container">
                
                    {
                     this.props.auth.user && this.props.auth.user == url_username? 
                        <div className="user-info">
                            <div className="user-avatar">
                            <NavLink to={"/setavatar/" + this.props.auth.user}>
                                <Img style={{"height": "100px", "width": "100px", "borderRadius": "50px"}} 
                                        src={url + "/avatar/" + this.props.auth.user + '.jpg'} 
                                        alt=""/>
                            </NavLink>
                            </div>
                            <p>{this.props.auth.user}</p>
                            
                        </div>
                        :
                        <h1>Sorry {url_username}, you need to <NavLink to="/signin">sign in</NavLink>.</h1>
                    
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


export default connect(mapStateToProps, null)(UserPage);