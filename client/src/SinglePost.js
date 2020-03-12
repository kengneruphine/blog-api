import React, { Component } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class SinglePost extends Component {
    constructor(props) {
        super(props)

        this.initialState = {
            name: '',
            email: '',
            message: '',
        }
        this.state = this.initialState
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    post = this.props.location.state; //getting data passsed from the other route

    postId = this.post._id;

    submitHandler = e => {
        e.preventDefault()
          axios.post(`http://localhost:4000/api/comments/${this.postId}`, this.state)
              .then(response => {
                  console.log("response is", response)
                this.setState(this.initialState)
            })
            .catch(error => {
                alert(error);
                //console.log(error);
        })
    }

    
    render() {
        const mystyle = {
            width: "50%",
            marginLeft: "15%",
            marginTop: "2%"
        }

        const { name, email, message } = this.state;
        return (
            <div>
                <h5>{this.post.title} &emsp; <Link to={'/Readers'}> back </Link></h5>
                <p>Published date {new Date(this.post.createdAt).toLocaleDateString()}</p>
                <p>{this.post.content}</p>
                <h5>Comments</h5>
                {this.post.comments.map(comment =>
                    <div key={comment.id}>
                    <h6>Name :{comment.name} &emsp;  Date:{new Date(comment.createdAt).toLocaleDateString()}</h6>
                        <p>{comment.message}</p>
                     </div>)
                }
                <br />
                <br />
                <div className="createComment" style={mystyle}>
                <h5>Leave a comment</h5>
                    <form onSubmit={this.submitHandler}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={name} onChange={this.changeHandler} />
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" value={email} onChange={this.changeHandler} />
                        <label htmlFor="message">Message</label>
                        <textarea name="message" value={message} onChange={this.changeHandler} />
                        <button value="submit">Submit</button>
                    </form>
                </div>

            </div>
        )
    }
}

export default SinglePost
