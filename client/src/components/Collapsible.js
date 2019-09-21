import React from 'react';

export default class Collapsible extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: true
        }
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel = (e) => {
        this.setState({open: !this.state.open})
    }

    render() {
        return (
        <div>
            {
                this.state.open ? 
                <div className='content'>
                    {this.props.children}
                </div>
                : 
                null
            }
            <div onClick={(e)=>this.togglePanel(e)} className='collapse-header'>
                <span  style={{color:"#cccccc"}}className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
            </div>
            
        </div>
        );
    }
}