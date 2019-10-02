import React from 'react'
import Img from './Img'
import { url } from '../url'
import Loader from 'react-loader-spinner'

export default class MemberList extends React.Component {
    
    state = {
        users: [],
        total: 0,
        loading: false
    }

    getAllUsers = async () => {
        const response = await fetch(`${url}/alluser`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
      
          const data = await response.json();
      
          this.setState({
            users: data.result,
            loading: false
            
          });
    }

    componentDidMount(){
        this.setState({loading: true}, () => {
             this.getAllUsers(); 
        })
       
    }

    render() {
        return (
            <div className="memberlist">
            {
                this.state.loading?
                <Loader type="ThreeDots" 
                    style={{"display": "flex", "justifyContent": "center"}} 
                    color="#e87110" 
                    height="100" 
                    width="100" />
                :
                <div className="member-wrapper" >
                {
                    this.state.users.map((item, index) => {
                        return (
                        <div className="scene">
                            <div className="box">
                                <div className="front face">
                                    <div className="memberlist-avatar" key={index}>
                                        <Img src={url + "/avatar/" + item.username + '.jpg'} alt=""/>
                                        <h4>{item.username}</h4>
                                    </div>
                                </div>
                                <div className="right face">
                                    <p>Email</p>
                                    <p>LinkedIn</p>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
                </div>
            }   
            </div>
        )
        
    }
}