import React, { Component } from 'react'
import axios from 'axios'

class PostList extends Component{
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            errorMsg :''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/posts')
            .then(response => {
                console.log(response)
                this.setState({posts: response.data})
            })
            .catch(error => {
                console.log(error);
                this.setState({errorMsg: 'Error retrieving data'})
        })
    }
    render() {
        const {posts, errorMsg} = this.state   //destructure the state property
        return (
            <div>
                <h3>List of Posts </h3>
                {
                    posts.map(post =>
                        <div key={post.id}>
                            <h5>Title :{post.title} &emsp;  Date:{new Date(post.createdAt).toLocaleDateString()}</h5>
                            <br />
                            <p>{post.content}</p>
                            <p>Publish {post.publish}</p>
                         </div>)
                }
                {errorMsg ? <div>{errorMsg}</div> :null}
            </div>
        )
    }
}

export default PostList