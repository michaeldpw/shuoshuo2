import React from 'react';
import './pages.css';
import PostList from '../components/PostList';
import Jumbotron from '../components/Jumbotron';


class Home extends React.Component{

    state = {
	   show: true
    }


    render(){ 
	    
	const { show } = this.state;
        return (
            <div className="home-container">                 
                <Jumbotron/>               			
                <PostList />
            </div>
        )
    }
}

export default Home;