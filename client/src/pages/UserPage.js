import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { url, port} from '../url'
axios.defaults.withCredentials = true;


class UserPage extends React.Component{

    state = {
        avatar: null,
        username: null,
        code:''
    }

    componentDidMount(){ 
        axios.get(url + ':5000/getsession').then(res => {
            this.setState({
                code: res.data.code,
                username: res.data.username,
                avatar: res.data.avatar
            })
            console.log(this.state);
        })
    }


    render(){

        const url_username = this.props.match.params.username;
        return (
            <div className="user-container container">
                {
                    this.state.username && this.state.username == url_username? 
                    <div> 
                        <NavLink to={"/setavatar/" + this.state.username}>
                        <img src={url + ':' + port + "/avatar/" + this.state.avatar + '.jpg'} alt=""/>
                        </NavLink>
                        {this.state.username}
                    </div>:<h1>Sorry {url_username}, you need to <NavLink to="/signin">sign in</NavLink>.</h1>
                }
               
            </div>
        )
    }
}

export default UserPage;