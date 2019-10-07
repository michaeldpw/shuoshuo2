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
       comment_number: '',
       loading: false
    }
    
    componentDidMount(){
        this.setState({loading: true}, () => {   
            Axios.get(url + '/getpostwithid?pid=' + this.props.match.params.pid).then(res => {
                this.setState({
                    post: res.data.result,
                    comment_number: res.data.comment_number,
                    loading: false,
                    // comments_number: Object.keys(res.data.result.comments).length
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
                            <CommentPanel isShown={true} pid={this.props.match.params.pid}/>
                            <div className="comment-like">
                            <div className="comment-tab">
                                <Icon type="message" 
                                    theme="outlined" 
                                    style={{ fontSize: '18px', color: 'ddd' }}/>
                                <span style={{"fontSize": "16px"}}> {this.state.comment_number}</span>
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
                <CommentList post={this.state.post} />
            </React.Fragment>
            }
           </div>

        )
    }
}



export default PostDetail