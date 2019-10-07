import React from 'react'
import moment from 'moment'
import Img from './Img'
import { url } from '../url'

class Commentlist extends React.Component {
    render(){
        return (
            <div className="comment-list">
                <div className="comment-summary">

                </div>
                
                    {
                        this.props.post.map((item, index) => {
                            return (
                            <div className="comments-detail" key={index}>
                                {
                                    item.comments && item.comments.slice(0).reverse().map(comment => {
                                        return (
                                            <div className="comment-item" key={comment._id}>
                                                
                                                    <Img src={url + "/avatar/" + comment.author + '.jpg'} 
                                                     style={{"height":"40px", "width": "40px", "borderRadius": "20px"}}
                                                     alt=""/>
                                                   
                                               
                                                <div className="comment-text">
                                                    <div className="author-and-content">
                                                        <h5>{comment.author}</h5>
                                                        <p>{comment.content}</p>
                                                    </div>
                                                    <div className="comment-time">
                                                        <p>{moment(comment.createdAt).fromNow()}</p>
                                                    </div>
                                                    
                                                </div> 
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            )
                        })
                    }
                   
                
            </div>
        )
    }
}

export default Commentlist