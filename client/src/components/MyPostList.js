import React from 'react'
import Img from './Img'
import { url } from '../url'
import Loader from 'react-loader-spinner'
import Axios from 'axios';

export default class MyPostList extends React.Component {
    
    state = {
        post: [],
        loading: false
        // total: 0,
        // currentPage: 1
    }

    // getData = async () => {
    //     const response = await fetch(`${url}/mypost`, {
    //         method: 'GET',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //         },
    //       });
      
    //       const data = await response.json();
      
    //       this.setState({
    //         post: data.result,
    //         loading: false
    //       });
    // }

    componentDidMount(){
        this.setState({loading: true}, () => {
            //  this.getData();
            Axios.get(url + '/mypost?username=' + this.props.user).then(
                res => {
                    this.setState({
                        post: res.data.result,
                        loading: false
                    })
                }
            )
        })
        
    }

    render() {
        return (
            <div className="mypostlist">
            {
                this.state.loading?
                <Loader type="ThreeDots" 
                    style={{"display": "flex", "justifyContent": "center"}} 
                    color="#e87110" 
                    height="100" 
                    width="100" />
                :
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
            }   
            </div>
        )
        
    }

}