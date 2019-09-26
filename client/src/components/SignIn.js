import React from 'react';
import axios from 'axios';
import { url, port } from '../url'

axios.defaults.withCredentials = true;

class SignIn extends React.Component{

    state = {
        un:'',
        pw:'',
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
            username: this.state.un,
            password: this.state.pw
        }
        console.log(user);
        //console.log(url);
        axios.post(url + '/checklogin',user).then(res => {
            console.log(res.data);
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
            <div className="signin">
                <form onSubmit={this.handleSubmit}>
					<div className="input-group">
						<span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
						<input id="un" 
						    type="text" 
							className="form-control" 
							onChange={this.handleChange}
							placeholder="Username" />
    					</div>			  	
						<br/>
					<div className="input-group">
						<span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
						<input id="pw" 
							type="password" 
							className="form-control" 
							onChange={this.handleChange}
							placeholder="Password" />
					</div>
                    <br/>    
                    {
                        this.state.code === "-1"?
                        <div className="warning">Username does not exist!</div>: null
                    }                    
                    {
                        this.state.code === "-2"?
                        <div className="warning">Incorrect password!</div>: null
					}
                    <button type="submit" className="btn btn-primary sub-btn">Log In</button>                                       
                </form>
            </div>          
            
        )
    }
}

export default SignIn;