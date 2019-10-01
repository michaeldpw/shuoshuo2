import React from 'react'
import MyPostList from '../components/MyPostList'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class MyPost extends React.Component {

    render(){
        return (
            <div className="container mypost-container">
                {
                    this.props.auth.isLoggedIn?
                    <MyPostList user={this.props.auth.user}/>
                    :
                    <Redirect to='/signin' />
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

export default connect(mapStateToProps, null)(MyPost);