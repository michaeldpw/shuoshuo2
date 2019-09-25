import React from 'react'
import axios from 'axios'
import { url, port } from '../url'

class Post extends React.Component {

    state = {
        disabled: true,
        content:'',
        code:''
    }

    handleChange = (e) => {
        const length = e.target.value.length;
        if(length>0){
            this.setState({
                disabled: false
            })
        } else {
            this.setState({
                disabled: true
            })
        }
        this.setState({
            content: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const post = {
            content: this.state.content
        }
        console.log(post);
        axios.post('/dopost',post).then(res => {
            this.setState({
                code: res.data.code
            })    
            console.log(this.state.code);
        });
        window.location.reload();
    }

    render(){
        return (
            <div>
                <textarea id='content' 
                        cols='80' 
                        rows='4'
                        className = "form-control"
                        onChange={this.handleChange} required/>
                 <button type="submit" 
                        style={Object.assign({}, styles.button, !this.state.disabled && styles.buttonEnabled)}
                        disabled={this.state.disabled}
                        onClick={this.handleSubmit}>Post</button>
            </div>
        )
    }
}

export default Post;

const styles = {
    input: {
      width: 200,
      outline: 'none',
      fontSize: 20,
      padding: 10,
      border: 'none',
      backgroundColor: '#ddd',
      marginTop: 10,
    },
    button: {
      width: 150,
      height: 40,
      marginTop: "10px",
      border: 'none',
      borderRadius: 4,
      fontSize: 20,
      cursor: 'pointer',
      transition: '.25s all',
    },
    buttonEnabled: {
      backgroundColor: '#F98522',
      color: '#FFFFFF',
      width: 220
    }
  }