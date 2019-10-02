import React from 'react'
import MemberList from '../components/MemberList';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class Members extends React.Component {

    render(){
        return (
            <div className="container member-container">
                {
                    this.props.auth.isLoggedIn?
                    <MemberList />
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

export default connect(mapStateToProps, null)(Members);