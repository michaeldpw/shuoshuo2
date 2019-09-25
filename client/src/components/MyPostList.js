import React from 'react'
import Img from './Img'

export default class MyPostList extends React.Component {
    
    state = {
        post: [],
        total: 0,
        currentPage: 1
    }

    render() {
        return (
            <div className="list-group">
                 <a className="list-group-item">
                    <div className="comment-avatar">
                        <Img src={"/avatar/" + '.jpg'} alt=""/>
                    </div>
                    <div className="username">
                        <h4>item.username</h4> 
                        <p>item.datetime</p>
                    </div>
                    <div className="content">
                        <p>item.content</p>
                    </div>                         
                </a>
            </div>
        )
    }
}