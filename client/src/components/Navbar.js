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
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-item">
                            <li className=""><NavLink to="/"><span>Posts</span></NavLink></li>
                            <li className=""><NavLink to="/mypost"><span>My Post</span></NavLink></li>        
                        </ul> 
                        {
                            this.state.username? 
                            <ul className="nav navbar-nav navbar-right">
                                <li> <a>Welcome, {this.state.username}</a></li>
                                <li className=""> <NavLink to={"/user/" + this.state.link}><span>Profile</span></NavLink></li>
                                <li><a onClick={this.handleLogOut}><span>Log Out</span></a></li>
                            </ul>:
                            <ul className="nav navbar-nav navbar-right">
                                <li className=""> <NavLink to="/signin"><span>Log In</span></NavLink></li> 
                                <li className=""> <NavLink to="/signup"><span>Create New Account</span></NavLink></li>
                            </ul>
                        }
                    </div> 
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar);