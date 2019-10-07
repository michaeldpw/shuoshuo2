import React from 'react'
import Axios from 'axios';
import CommentPanel from '../components/CommentPanel'
import Loader from 'react-loader-spinner'
import { url } from '../url'
import { Icon } from 'antd';
import 'antd/dist/antd.css'
import Img from '../components/Img'
import CommentList from '../components/CommentList'


class PostDetail extends  React.Component {

    state = {
       post: [],
       comments: [],
       openComment: false,
       loading: false
    }

    handleShowComment = () => {
        this.setState({
            openComment: !this.state.openComment
        })
    }
    
    componentDidMount(){
        this.setState({loading: true}, () => {   
            Axios.get(url + '/getpostwithid?pid=' + this.props.match.params.pid).then(res => {
                this.setState({
                    post: res.data.result,
                    comments: res.data.result.comments,
                    loading: false
                })
            })
           
        })   
    }
    
    render(){

         console.log(this.state)
        return ( 
            <div className="post-container">
            {
                this.state.loading? 
                <Loader type="ThreeDots" 
                    style={{"display": "flex", "justifyContent": "center"}} 
                    color="#e87110" 
                    height="100" 
                    width="100" />
                :
                <React.Fragment>
                    <div className="list-group">
                    {
                      this.state.post.map((item, index) => {
                       return (       
                        <a className="list-group-item" style={{paddingBottom: '0px'}} key={index}>
                            <div style={{"display": "flex", "flexDirection": "row"}}>
                                <div className="comment-avatar">
                                    <Img src={url + "/avatar/" + item.username + '.jpg'} alt=""/>
                                </div>
                                 <div className="username">
                                    <h4>{item.username}</h4> 
                                    <p> Published at {item.datetime}</p>
                                </div>
                             </div>
                            <div className="content" style={{"padding-bottom": "10px"}}>
                                <p>{item.content}</p>
                            </div>    
                            <CommentPanel isShown={this.state.openComment} pid={this.props.match.params.pid}/>
                            <div className="comment-like">
                            <div className="comment-tab" onClick={this.handleShowComment}>
                                <Icon type="message" 
                                    theme="outlined" 
                                    style={{ fontSize: '18px', color: 'ddd' }}/>
                                <span style={{"fontSize": "16px"}}> 4</span>
                             </div>
                            <div className="like-tab">
                                <Icon type="like" 
                                        theme="outlined" 
                                        style={{ fontSize: '18px', color: 'ddd' }}/>
                                    <span style={{"fontSize": "16px"}}> 10</span>
                                </div>
                            </div>             
                        </a> 
                       )
                   })
                }
                </div>
                <CommentList post={this.state.post}/>
            </React.Fragment>
            }
           </div>

        )
    }
}



export default PostDetail