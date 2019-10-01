import React from 'react';
import axios from 'axios';
import { url } from '../url'
import { connect } from 'react-redux';
import { login } from '../actions'

axios.defaults.withCredentials = true;

class SignIn extends React.Component{

    state = {
        un:'',
        pw:'',
        code:'',
        error:'',
        isLoading:''
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
        // console.log(user);
        // //console.log(url);
        // axios.post(url + '/checklogin',user).then(res => {
        //     console.log(res.data);
        //     this.setState({
        //         code: res.data.code
        //     })    
        // });

        this.setState({isLoading: true});
        this.props.login(user).then(
            (res) => {
                this.context.history.push('/');
                
            },
            (err) => {
                this.setState({ error: err.response.data.error, isLoading: false });
                console.log(err.response.data)
            }
        ).catch(e => console.log(e))

    }

    render(){
        const username = this.props.auth.user;
        if(username){
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
					<div className="input-group pw">
						<span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
						<input id="pw" 
							type="password" 
							className="form-control" 
							onChange={this.handleChange}
							placeholder="Password" />
					</div>
                    <br/>    
                    {
                            this.state.error &&
                            <div className="alert alert-danger" role="alert">{this.state.error}</div>
                    }
                    {
                            this.state.isLoading?
                            <button type="submit" className="signin-btn" style={{"opacity": "0.5"}}disabled={true}>Logging in...</button>
                            :
                            <button type="submit" className="signin-btn" disabled={false}>Log In</button>
                    }
                    
                </form>
            </div>          
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { login })(SignIn);