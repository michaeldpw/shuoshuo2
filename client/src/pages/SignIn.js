import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { url } from '../url'
import { connect } from 'react-redux';
import { login } from '../actions'
axios.defaults.withCredentials = true;

class SignIn extends React.Component{

    state = {
        username: '',
        password:'',
        error: '',
        isLoading: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleClick = () => {
        this.props.history.push('/signup');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        // console.log(user);
        // axios.post(url + '/checklogin',user).then(res => {
        //     //console.log(res.data);
        //     this.setState({
        //         code: res.data.code
        //     })    
        // });

        this.setState({isLoading: true});
        this.props.login(user).then(

            (res) => {
                this.context.history.push('/')},
            (err) => {
                this.setState({ error: err.response.data.error, isLoading: false });
                console.log(err.response.data)
            }
            // res => {
            // this.setState({
            //     isloading: false,
            //     error: res.data.error
            // })
        ).catch(e => console.log(e))
    }

    render(){
        const username = this.props.auth.user;
        if(username){
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
                    <div className="con">
                        <i></i>
                        <p>or</p>
                    </div>
                    <button className="create_account" onClick={this.handleClick} disabled={this.state.isLoading}>Create a new account</button>
                </div>
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