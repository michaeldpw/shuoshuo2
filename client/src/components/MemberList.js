import React from 'react'
import Img from './Img'

export default class MemberList extends React.Component {
    
    state = {
        users: [],
        total: 0
        // currentPage: 1
    }

    getAllUsers = async (page) => {
        const response = await fetch(`/alluser`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
      
          const data = await response.json();
      
          this.setState({
            users: data.result
            // currentPage: data.page + 1
          });
    }

    componentDidMount(){
        this.getAllUsers(); 
    }


    render() {
        return (
            <div className="list-group">
            {
                this.state.users.map((item, index) => {
                    return (
                         <a className="list-group-item" key={index}>
                            <div className="comment-avatar">
                                   <Img src={"/avatar/" + item.username + '.jpg'} alt=""/>
                            </div>
                            <div className="username">
                                <h4>{item.username}</h4> 
                            
                            </div>
                           
                        </a>
                    )
                })
            }
            </div>
        )
    }
}