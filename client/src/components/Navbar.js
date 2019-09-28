import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import './components.css';
import brand from './brand.jpg'
import { url } from '../url'
import { Icon } from 'antd';
import 'antd/dist/antd.css'

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
		    <div className="container1">
			  <div className="navbar-header">
				<a className="navbar-brand" href="#">
				    <img alt="Brand" src={brand}/>
				</a>
			  </div>
			  <div className="navbar-collapse collapse">
				<ul className="nav navbar-nav navbar-item-1">
				    <li className="hvr-underline-from-center">
						<NavLink to="/">
							<Icon type="home" 
                                theme="outlined" 
                                style={{ fontSize: '24px', color: '#c7d1d8' }}/>
							<p>Posts</p>
						</NavLink></li>
				    <li className="hvr-underline-from-center mypost">
						<NavLink to="/mypost">
							<Icon type="solution" 
                                theme="outlined" 
                                style={{ fontSize: '24px', color: '#c7d1d8' }}/>	
							<p> My Posts</p>
						</NavLink></li>
				    <li className="hvr-underline-from-center teammates">
						<NavLink to="/members">
							<Icon type="team" 
                                theme="outlined" 
                                style={{ fontSize: '24px', color: '#c7d1d8' }}/>
							<p> Teammates</p>
						</NavLink>
					</li>                
				</ul> 
				{
				    this.state.username? 
				    <ul className="nav navbar-nav navbar-right navbar-item-2">
					  <li className="hvr-underline-from-center"> 
					  	<NavLink to={"/user/" + this.state.link}>
						  <Icon type="setting" 
                                theme="outlined" 
                                style={{ fontSize: '24px', color: '#c7d1d8' }}/>
							<p>Setting</p>
						</NavLink>
					  </li>
					  <li className="hvr-underline-from-center">
						  <a onClick={this.handleLogOut}>
						  	<Icon type="logout" 
                                theme="outlined" 
                                style={{ fontSize: '24px', color: '#c7d1d8' }}/>
							<p>Log Out</p>
						  </a>
					  </li>
				    </ul>:
				    <ul className="nav navbar-nav navbar-right navbar-item-2">
					  <li className="hvr-underline-from-center log-in"> 
					  	<NavLink to="/signin">
						  <Icon type="lock" 
                                theme="outlined" 
                                style={{ fontSize: '24px', color: '#c7d1d8' }}/>
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