import React from 'react'
import axios from 'axios';
import './components.css';
import Img from './Img';
import { url, port } from '../url'

class PostList extends React.Component{

    state = {
        post: [],
        total: 0,
        currentPage: 1
    }

    getCount = () => {
        axios.get('/count').then(res => {
            this.setState({
                total: res.data.count
            })
        })
    }

    getData = async (page) => {
        const response = await fetch(`/allpost?page=${page}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
      
          const data = await response.json();
      
          this.setState({
            post: data.result,
            currentPage: data.page + 1
          });
    }

    componentDidMount(){
        this.getCount();
        this.getData(0); //0是后端的第一页
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
               <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li onClick={this.handlePrevious}>
                            <a aria-label="Previous"  >
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
               <div className="list-group">
                    {
                        this.state.post.map((item, index) => {
                            return (
                                 <a className="list-group-item" key={index}>
                                    <div className="comment-avatar">
                                           <Img src={"/avatar/" + item.username + '.jpg'} alt=""/>
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
            </div> 
            
        )
    }



}

export default PostList