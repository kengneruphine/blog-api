import React, { Component } from 'react'
import axios from 'axios'

class PostForm extends Component{
    constructor(props) {
        super(props)

        this.initialState ={ 
            title: '',
            content: '',
            publish: false,  // it is the same as publish variable
            store : ''
        }

        this.state = this.initialState;
    }

    componentDidMount() {
        this.storeCollector()
    }

    storeCollector() {
        let store = JSON.parse(localStorage.getItem('loginToken'));
        if (store) {
            this.setState({ store:store})
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleCheckClick = () => {
        this.setState({ publish: !this.state.publish });
      }
      submitHandler = e => {
        e.preventDefault()
          let token = this.state.store.token;
          console.log("token is",token);
          axios.post('http://localhost:4000/api/posts', this.state, {
              headers: {
                  'Content-Type': 'application/json',
                  'auth-token': `${token}`
              }
          })
              .then(response => {
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

        const { title, content, publish } = this.state;

        return (
            <div style={mystyle}><h5>Submit a Post</h5>
            <form onSubmit={this.submitHandler}>
                <label htmlFor="username">Title</label>
                <input type="text" name="title" value={title} onChange={this.changeHandler} />
                <label htmlFor="content">Content</label>
                <textarea  name="content" value={content} onChange={this.changeHandler} />
                    <input type="checkbox" value={publish} onChange={this.handleCheckClick} className="filled-in" id="filled-in-box" /> &emsp;Publish
                    <br />
                    <br />
                <button value="submit">Submit</button>
                </form>
                </div>
        );
    }
}

export default PostForm;
