import React from 'react'
import axios from 'axios';
import Post from './Post'
import SignIn from './SignIn';
import { url, port } from '../url'
import defaultAvatar from './default.jpg'
import Img from './Img'

export default class Jumbotron extends React.Component{

    state = {
         username:'',
         sessioncode:'',
         avatar:''
    }

    componentDidMount(){
        console.log('componentdidmount');
        axios.get(url + '/getsession').then(res => {
            //console.log(res.data);
            this.setState({
                username: res.data.username,
                sessioncode: res.data.code,
                avatar: res.data.avatar
            })
            console.log(this.state);
        })
    }

    render(){
        return (
            <div className={this.props.isShow}>
              <div className="jumbotron">
                { 
                    this.state.username? 
                    <div className="container">
                        <div className="user-panel">
                            <div className="avatar">
                                <Img src={url + "/avatar/" + this.state.username + '.jpg'} alt=""/>
                                {/* <img src={"/avatar/" + this.state.avatar + '.jpg'} alt=""/> */}
                                <p>{this.state.username}</p>
                            </div>
                            <div className="col-lg-6 col-lg-offset-1">
                                <Post author={this.state.username}/>
                            </div>
                        </div>                       
                    </div>:
                    <div className="container">
                        <div className="user-panel">
                            <div className="avatar">
                                <img src={defaultAvatar} alt=""/>
                                <span className="hint">Please sign in</span>
                            </div>
                           <SignIn/>
                        </div>           
                    </div>   
			    }
              </div>
            </div>
        )
    }

}