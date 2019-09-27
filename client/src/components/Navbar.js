import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import './components.css';
import brand from './brand.jpg'
import { url } from '../url'

axios.defaults.withCredentials = true;

class Navbar extends React.Component{

    state = {
	  username:'',
	  link:'',
	  logout: 0
    }

    componentDidMount(){

	  axios.get(url + '/getsession').then(res => {
		console.log(res.data);
		this.setState({
		    username: res.data.username,
		    link: res.data.username
		})
		
	  })
    }

    handleLogOut = () => {
	  axios.get(url + '/logout').then(res => {
		this.setState({
		    logout:res.data.logout
		})
	  })
    }

    render(){
    
	  // var isActive = this.props.location.pathname == this.props.to
	  // var className = isActive ? 'active' : '';
	  
	  const logout = this.state.logout;
	  if(logout == '1'){
	    window.location = '/'
	  } 
	  
	  return (
		<nav className="navbar navbar-default navbar-fixed-top">
		    <div className="container">
			  <div className="navbar-header">
				<a className="navbar-brand" href="#">
				    <img alt="Brand" src={brand}/>
				</a>
			  </div>
			  <div className="navbar-collapse collapse">
				<ul className="nav navbar-nav navbar-item">
				    <li className="hvr-underline-from-center">
						<NavLink to="/">
							<span className="glyphicon glyphicon-home" aria-hidden="true"></span>
							<p>Posts</p>
						</NavLink></li>
				    <li className="hvr-underline-from-center ">
						<NavLink to="/mypost">
							<span className="glyphicon glyphicon-tags" aria-hidden="true"></span>
							<p> My Posts</p>
						</NavLink></li>
				    <li className="hvr-underline-from-center">
						<NavLink to="/members">
							<span className="glyphicon glyphicon-th" aria-hidden="true"></span>
							<p> Teammates</p>
						</NavLink>
					</li>                
				</ul> 
				{
				    this.state.username? 
				    <ul className="nav navbar-nav navbar-right">
					  <li className="hvr-underline-from-center"> 
					  	<NavLink to={"/user/" + this.state.link}>
						  	<span className="glyphicon glyphicon-user" aria-hidden="true"></span>
							<p>Profile</p>
						</NavLink>
					  </li>
					  <li className="hvr-underline-from-center">
						  <a onClick={this.handleLogOut}>
						  	<span className="glyphicon glyphicon-off" aria-hidden="true"></span>
							<p>Log Out</p>
						  </a>
					  </li>
				    </ul>:
				    <ul className="nav navbar-nav navbar-right">
					  <li className="hvr-underline-from-center log-in"> 
					  	<NavLink to="/signin">
						  	<span className="glyphicon glyphicon-lock" aria-hidden="true"></span>
							<p>Log In</p>
						</NavLink>
					  </li> 
					  <li className="new-account-li"> 
					  	<NavLink to="/signup">
						  	<button className="signup-button">Create New Account</button>
						</NavLink>
					  </li>
				    </ul>
				}
			  </div> 
		    </div>
		</nav>
	  )
    }
}

export default withRouter(Navbar);