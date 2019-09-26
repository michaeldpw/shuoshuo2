import React from 'react'
import Img from './Img'
import { url } from '../url'

export default class MyPostList extends React.Component {
    
    state = {
        post: []
        // total: 0,
        // currentPage: 1
    }

    getData = async (page) => {
        const response = await fetch(`${url}/mypost`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
      
          const data = await response.json();
      
          this.setState({
            post: data.result
            // currentPage: data.page + 1
          });
    }

    componentDidMount(){
        this.getData(); 
    }


    render() {
        return (
            <div className="list-group">
            {
                this.state.post.map((item, index) => {
                    return (
                         <a className="list-group-item" key={index}>
                            <div className="comment-avatar">
                                   <Img src={url + "/avatar/" + item.username + '.jpg'} alt=""/>
                            </div>
                            <div className="username">
                                <h4>{item.username}</h4> 
                                <p>{item.datetime}</p>
                            </div>
                            <div className="content">
                                <p>{item.content}</p>
                            </div>
                        </a>
                    )
                })
            }
            </div>
        )
    }
}