import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { url, port } from '../url'
axios.defaults.withCredentials = true;

class SignIn extends React.Component{

    state = {
        username:'',
        password:'',
        code:''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleClick = () => {
        this.props.history.push('/signup');
        console.log('jump to signup');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(user);
        axios.post(url +':5000/checklogin',user).then(res => {
            //console.log(res.data);
            this.setState({
                code: res.data.code
            })    
        });
    }

    render(){
        const code = this.state.code;
        
        if(code == '1'){
          window.location = '/'
        } 
        return (
            <div className="signin-container">
                <div className="signin-panel">
                    <p>Log in to Blog</p>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" 
                                className="form-control" 
                                id="username" 
                                onChange={this.handleChange}
                                placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <input type="password" 
                                className="form-control" 
                                id="password" 
                                onChange={this.handleChange}
                                placeholder="Password" />
                        </div>
                        {
                            this.state.code === "-1"?
                            <div className="alert alert-danger" role="alert">Username does not exist!</div>: null
                        }
                        {
                            this.state.code === "-2"?
                            <div className="alert alert-danger" role="alert">Incorrect password!</div>: null
                        }

                        <button type="submit" className="signin-btn">Log In</button>
                    </form>
                    <div className="con">
                        <i></i>
                        <p>or</p>
                    </div>
                    <button className="create_account" onClick={this.handleClick}>Create a new account</button>
                </div>
                
               
                
            </div>
        )
    }
}

export default SignIn;