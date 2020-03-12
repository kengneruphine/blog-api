import React, { Component } from 'react'
import axios from 'axios'

class PostForm extends Component{
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            content: '',
            checked: false   // it is the same as publish variable
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleCheckClick = () => {
        this.setState({ checked: !this.state.checked });
      }
    // submitHandler = e => {
    //     e.preventDefault()
    //     console.log(this.state)
    //     axios.post('http://localhost:4000/api/user/register', this.state)
    //         .then(response => {
    //          //console.log(response)
    //             this.props.history.push('/Login');
    //             this.setState(this.state)
    //         })
    //         .catch(error => {
    //             alert(error);
    //             //console.log(error);
    //     })
    // }
    render() {
        const mystyle = {
            width: "50%",
            marginLeft: "15%",
            marginTop: "2%"
        }

        const { title, content, checked } = this.state;

        return (
            <div style={mystyle}><h5>Submit a Post</h5>
            <form onSubmit={this.submitHandler}>
                <label htmlFor="username">Title</label>
                <input type="text" name="title" value={title} onChange={this.changeHandler} />
                <label htmlFor="email">Content</label>
                <textarea  name="content" value={content} onChange={this.changeHandler} />
                    <input type="checkbox" value={checked} onChange={this.handleCheckClick} className="filled-in" id="filled-in-box" /> &emsp;Publish
                    <br />
                    <br />
                <button value="submit">Submit</button>
                </form>
                </div>
        );
    }
}

export default PostForm;