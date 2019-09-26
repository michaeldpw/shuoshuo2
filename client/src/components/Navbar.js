import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import './components.css';
import brand from './brand.jpg'

axios.defaults.withCredentials = true;

class Navbar extends React.Component{

    state = {
	  username:'',
	  link:'',
	  logout: 0
    }

    componentDidMount(){

	  axios.get('/getsession').then(res => {
		console.log(res.data);
		this.setState({
		    username: res.data.username,
		    link: res.data.username
		})
		
	  })
    }

    handleLogOut = () => {
	  axios.get('/logout').then(res => {
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
				    <li className="hvr-underline-from-center"><NavLink to="/">Posts</NavLink></li>
				    <li className="hvr-underline-from-center "><NavLink to="/mypost">My Posts</NavLink></li>
				    <li className="hvr-underline-from-center"><NavLink to="/members">Team Members</NavLink></li>                
				</ul> 
				{
				    this.state.username? 
				    <ul className="nav navbar-nav navbar-right">
					  <li> <a>Welcome, {this.state.username}</a></li>
					  <li className="hvr-underline-from-center"> <NavLink to={"/user/" + this.state.link}>Profile</NavLink></li>
					  <li className="hvr-underline-from-center"><a onClick={this.handleLogOut}>Log Out</a></li>
				    </ul>:
				    <ul className="nav navbar-nav navbar-right">
					  <li className="hvr-underline-from-center"> <NavLink to="/signin">Log In</NavLink></li> 
					  <li className="hvr-underline-from-center"> <NavLink to="/signup">Create New Account</NavLink></li>
				    </ul>
				}
			  </div> 
		    </div>
		</nav>
	  )
    }
}

export default withRouter(Navbar);