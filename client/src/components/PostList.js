import React from 'react'
import axios from 'axios';
import './components.css';
import Img from './Img';
import { url } from '../url'
import Loader from 'react-loader-spinner'
import { Icon } from 'antd';
import 'antd/dist/antd.css'

class PostList extends React.Component{

    state = {
        post: [],
        total: 0,
        currentPage: 1,
        loading: false
    }

    getCount = () => {
        axios.get(url + '/count').then(res => {
            this.setState({
                total: res.data.count
            })
        })
    }

    getData = async (page) => {
        const response = await fetch(`${url}/allpost?page=${page}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
      
          const data = await response.json();
      
          this.setState({
            post: data.result,
            currentPage: data.page + 1,
            loading: false
          });
    }

    componentDidMount(){
        this.setState({loading: true}, () => {
            this.getCount();
            this.getData(0);
        })
         //0是后端的第一页
        
    }

    handlePrevious = () => {

        if(this.state.currentPage !== 1){
            this.getData(this.state.currentPage - 1 - 1);
            console.log("previous");
        }
    }

    handleNext = () => {
        var total_page = Math.ceil(this.state.total/5);
        console.log(this.state.currentPage + 1 );
        if(this.state.currentPage < total_page){
            this.getData(this.state.currentPage);
            console.log("next");
        }
    }

    render(){

        const pageNumber = [];
        if(this.state.total !== 0){
            for(let i = 1; i <= Math.ceil(this.state.total/5); i++){
                pageNumber.push(i);
            }
        }

        return (
            <div className="container">
               <nav id="pagination-nav" aria-label="Page navigation">
                    <ul className="pagination">
                        <li onClick={this.handlePrevious}>
                            <a aria-label="Previous">
                                <span aria-hidden="true" >&laquo;</span>
                            </a>
                        </li>
                            {
                               pageNumber.map((item, index) => {
                                let classes = (this.state.currentPage) === item ? "active" : '';
                                        return <li key={index} className={classes}>
                                                    <a 
                                                       onClick={() => this.getData(item - 1)}    
                                                    >
                                                       {item}
                                                    </a>

                                                </li>                         
                               })
                            }
                        <li onClick={this.handleNext}>
                            <a  aria-label="Next" >
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                {
                  this.state.loading? 
                  <Loader type="ThreeDots" 
                          style={{"display": "flex", "justifyContent": "center"}} 
                          color="#e87110" 
                          height="100" 
                          width="100" 
                  />
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
                                    <div className="comment-like">
                                        <div className="comment-tab">
                                            <Icon type="message" 
                                                theme="outlined" 
                                                style={{ fontSize: '18px', color: 'ddd' }}/>
                                            <span style={{"fontSize": "16px"}}> Comment</span>
                                        </div>
                                        <div className="like-tab">
                                            <Icon type="like" 
                                                    theme="outlined" 
                                                    style={{ fontSize: '18px', color: 'ddd' }}/>
                                                <span style={{"fontSize": "16px"}}> Like</span>
                                            </div>
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

export default PostList