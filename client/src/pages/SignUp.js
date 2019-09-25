import React from 'react';
import axios from 'axios';
import { url, port } from '../url'
import  bg  from './signup-bg.jpg'
axios.defaults.withCredentials = true;

class SignUp extends React.Component{

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

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        //console.log(user);
        axios.post('/doregister',user).then(res => {
            //console.log(res.data);
                this.setState({
                    code: res.data
                }, function(){
                    if(res.data === '1'){
                        alert("Welcome onboard, " + this.state.username + "!")
                    }
                })
            
        }); 
        
    }

    render(){
        const code = this.state.code;
        
        if(code == '1'){
            window.location = '/'
        } 
        return (
            <div className="signup-container">
                <div className="image-section">
                    <img src={bg} alt=""/>
                </div>
                <div className="create-account">
                <h1>Create an account</h1>
                <h3>It's easy and fast.</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" 
                               className="form-control" 
                               id="username" 
                               onChange={this.handleChange}
                               placeholder="Username" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" 
                               className="form-control" 
                               id="password" 
                               onChange={this.handleChange}
                               placeholder="Password" required/>
                    </div>
                   <p>
                   By clicking Sign Up, you agree to our <a>Terms</a>, <a>Data Policy</a> and <a>Cookie Policy</a>. You may receive SMS notifications from us and can opt out at any time.
                   </p>
                    {
                        this.state.code == "-1"?
                        <div className="alert alert-danger" role="alert">Username has been taken!</div>: null
                    }
                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>
                </div>
                
            </div>
        )
    }
}

export default SignUp;