import React from 'react'
import Img from './Img';
import { NavLink } from 'react-router-dom'
import { url } from '../url'
import { Icon } from 'antd';
import 'antd/dist/antd.css'



class PostListItem extends React.Component {


    render(){
        return (
            
            <NavLink to={"/post/"+ this.props.item._id}>
              <a className="list-group-item" key={this.props.index}>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    <div className="comment-avatar">
                        <Img src={url + "/avatar/" + this.props.item.username + '.jpg'} alt=""/>
                    </div>
                    <div className="username">
                        <h4>{this.props.item.username}</h4>
                        <div className="date-and-summary">
                            <p>{this.props.item.datetime}</p>
                            <div className="comment-like-summary">
                                <Icon type="message" 
                                    theme="filled" 
                                    style={{ fontSize: '12px', color: '#b6b8b7' }}/>
                                <span>4</span>
                                <Icon type="like" 
                                    theme="filled" 
                                    style={{ fontSize: '12px', color: '#b6b8b7', marginLeft: '20px'}}/>
                                <span>10</span>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
                <div className="content">
                    <p>{this.props.item.content}</p>
                </div>
              </a>
            </NavLink>
           
        )
    }
}

export default PostListItem