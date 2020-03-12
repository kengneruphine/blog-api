import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Readers extends Component {
    constructor(props) {
             super(props)
    
          this.state = {
              posts: [],
              singlePost:{}
            }
    }
    
    _isMounted = false;

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


    componentWillUnmount() {
      this._isMounted = false;
      //clearInterval(this.interval);
  }
    
    getPost(postId) {
        console.log(postId);
        axios.get(`http://localhost:4000/api/posts/${postId}`)
            .then(response => {
                console.log(response.data)
                this.setState({ singlePost: response.data });
                this.props.history.push('/single-post', this.state.singlePost);
        }).catch(error => {
            console.log(error);
            this.setState({errorMsg: 'Error retrieving data'})
    })
    }
    render() {
        const {posts} = this.state   //destructure the state property
        return (
            <div>
                <h4>List of all Posts available on this site</h4>
                <div>
                {posts.map((post,i) =>
                        <div key={i} data-id={post.id} >
                        <h5 onClick={()=> this.getPost(post._id)}>Title :<Link>{post.title} </Link> &emsp;  Date:{new Date(post.createdAt).toLocaleDateString()}</h5>
                            <br />
                            <p>{post.content}</p>
                         </div>)
                    }
                    </div>
            </div>
        )
    }
}

export default Readers