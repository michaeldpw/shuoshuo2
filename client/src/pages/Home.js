import React from 'react';
import './pages.css';

import PostList from '../components/PostList';

import Jumbotron from '../components/Jumbotron';

class Home extends React.Component{

    state = {
	   show: true
    }

   
 
    togglePanel = () => {
		this.setState({
			show: !this.state.show
		})
    }

    render(){ 
	    
	const { show } = this.state;
        return (
            <div className="home-container">                 
			<Jumbotron isShow={show? 'show':'hide'}/>               			
			<div onClick={this.togglePanel} className='collapse-header'>
                {
                    show? <span  style={{color:"#cccccc"}}className="glyphicon glyphicon-menu-up" aria-hidden="true"></span>
                    :
                    <span  style={{color:"#cccccc"}}className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
                }
            </div>

               <PostList />
            </div>
        )
    }
}

export default Home;