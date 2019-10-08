import React from 'react'
import Axios from 'axios';
import CommentPanel from '../components/CommentPanel'
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { url } from '../url'
import { Icon } from 'antd';
import 'antd/dist/antd.css'
import Img from '../components/Img'
import CommentList from '../components/CommentList'


class PostDetail extends  React.Component {

    state = {
       post: [],
       comment_number: '',
       like_number: 0,
       loading: false,
       like: false
    }
    
    componentDidMount(){
        this.setState({loading: true}, () => {   
            Axios.get(url + '/getpostwithid?pid=' + this.props.match.params.pid).then(res => {
                this.setState({
                    post: res.data.result,
                    comment_number: res.data.comment_number,
                    like_number: res.data.like_number,
                    loading: false,
                })
            }).then(() => {
                this.state.post.map(post => {
                   if (post.likes && post.likes.indexOf(this.props.auth.user)>= 0){
                       this.setState({
                           like: true
                       })
                   }
                })
            })
           
        })   
    }

    handleLike = () => {
        if(this.props.auth.user){
            
            Axios.get(url + '/dolike?pid=' + this.props.match.params.pid + '&user=' + this.props.auth.user)
                .then (res => {
                    console.log(res.data.result)
                    this.setState({
                        like: true,
                        like_number: this.state.like? this.state.like_number : this.state.like_number + 1
                    })
                }).catch(err => console.log(err))
        } else {
            this.props.history.push('/signin')
        }
    } 

    handleUnlike = () => {
        Axios.get(url + '/dounlike?pid=' + this.props.match.params.pid + '&user=' + this.props.auth.user)
        .then (res => {
            this.setState({
                like: false,
                like_number:  this.state.like_number - 1
            })
        }).catch(err => console.log(err))
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
                                    style={{ fontSize: '18px' }}/>
                                <span style={{"fontSize": "16px"}}> {this.state.comment_number}</span>
                             </div>
                            {
                                this.state.like?
                                <div className="like-tab" onClick={this.handleUnlike}>
                                    <Icon type="like" 
                                        theme="filled"                                    
                                        style={{ fontSize: '18px', color: '#ffc73b' }}/>
                                    <span style={{"fontSize": "16px"}}> {this.state.like_number}</span>
                                </div>
                                :
                                <div className="like-tab" onClick={this.handleLike}>
                                    <Icon type="like" 
                                        theme="outlined" 
                                        style={{ fontSize: '18px' }}/>
                                    <span style={{"fontSize": "16px"}}> {this.state.like_number}</span>
                                </div>

                            }
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}


export default withRouter(connect(mapStateToProps, null)(PostDetail))