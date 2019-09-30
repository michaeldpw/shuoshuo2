import React from 'react'
import axios from 'axios';
import Post from './Post'
import SignIn from './SignIn';
import { connect } from 'react-redux';
import { url  } from '../url'
import defaultAvatar from './default.jpg'
import Img from './Img'

class Jumbotron extends React.Component{

    state = {
         username:'',
         sessioncode:'',
         avatar:'',
         show: true
    }

    togglePanel = () => {
		this.setState({
			show: !this.state.show
		})
    }

    // componentDidMount(){
    //     console.log('componentdidmount');
    //     axios.get(url + '/getsession').then(res => {
    //         //console.log(res.data);
    //         this.setState({
    //             username: res.data.username,
    //             sessioncode: res.data.code,
    //             avatar: res.data.avatar
    //         })
    //         console.log(this.state);
    //     })
    // }

    render(){
        return (
            <div className={this.props.isShow}>
              <div className={this.state.show? 'jumbotron show' : 'jumbotron hide'}>
                { 
                    this.props.auth.user? 
                    <div className="container">
                        <div className="user-panel">
                            <div className="avatar">
                                <Img src={url + "/avatar/" + this.state.username + '.jpg'} alt=""/>
                                {/* <img src={"/avatar/" + this.state.avatar + '.jpg'} alt=""/> */}
                                <p>{this.props.auth.user}</p>
                            </div>
                            <div className="col-lg-6 col-lg-offset-1">
                                <Post author={this.state.username}/>
                            </div>
                        </div>                       
                    </div>
                    :
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
              <div onClick={this.togglePanel} className='collapse-header'>
                    {
                        this.state.show? 
                        <span  style={{color:"#cccccc"}}
                                className="glyphicon glyphicon-menu-up" 
                                aria-hidden="true"></span>
                        :
                        <span  style={{color:"#cccccc"}}
                                className="glyphicon glyphicon-menu-hamburger" 
                                aria-hidden="true"></span>
                    }
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

export default connect(mapStateToProps, null)(Jumbotron);