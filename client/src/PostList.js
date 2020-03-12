import React, { Component,useEffect, useState } from 'react'
import axios from 'axios'

class PostList extends Component{
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            errorMsg :''
        }
    }

    // const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     getPosts();
    // },[]);

    // const getPosts = () => {
    //     axios.get('http://localhost:4000/api/posts')
    //         .then(response => {
    //             setPosts(response.data);
    //             console.log(response.data);
    //         }) 
    // }
    
    _isMounted = false;


    getAllPost() {
        axios.get('http://localhost:4000/api/posts')
        .then(response => {
            //console.log(response)
            this.setState({posts: response.data})
        })
        .catch(error => {
            console.log(error);
            this.setState({errorMsg: 'Error retrieving data'})
    })
    }
    componentDidMount() {
        this._isMounted = true;
        this.interval = setInterval(() => this.getAllPost(), 1000);
    }


  componentWillUnmount() {
      this._isMounted = false;
      clearInterval(this.interval);
  }
    
    render() {
    
        const { posts, errorMsg } = this.state   //destructure the state property
        return (
            <div>
                <h3>List of Posts </h3>
                <div>
                    {posts.map(post =>
                        <div key={post.id}>
                            <h5>Title :{post.title} &emsp;  Date:{new Date(post.createdAt).toLocaleDateString()}
                            &emsp;&emsp; <button>Edit</button></h5>
                            <br />
                            <p>{post.content}</p>
                        </div>)
                    }
                </div>
        
            </div>
        )

    }
    }


export default PostList