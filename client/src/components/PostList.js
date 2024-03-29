import React from 'react'
import axios from 'axios';
import './components.css';
import { url } from '../url'
import { NavLink } from 'react-router-dom'
import PostListItem from './PostListItem'
import Loader from 'react-loader-spinner'


class PostList extends React.Component{

    state = {
        post: [],
        total: 0,
        currentPage: 1,
        loading: false,
        openComment: false
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

    handleShowComment = () => {
        this.setState({
            openComment: !this.state.openComment
        })
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

                {
                  this.state.loading? 
                  <Loader type="ThreeDots" 
                          style={{"display": "flex", "justifyContent": "center"}} 
                          color="#e87110" 
                          height="100" 
                          width="100" 
                  />
                  :
                  <React.Fragment>
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
                  <div className="list-group">
                    {
                        this.state.post.map((item, index) => {
                            
                            var comments_number = item.comments? item.comments.length: 0;
                            var likes_number = item.likes? item.likes.length: 0
                            
                            return (  
                                <PostListItem item={item}  
                                                comments_number={comments_number} 
                                                likes_number={likes_number}
                                                id={item._id} 
                                                index={index}/>       
                            )
                        })
                    }
                  </div>
                </React.Fragment>
                }
            </div> 
            
            
        )
    }



}

export default PostList