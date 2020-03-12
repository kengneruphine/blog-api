import React, { Component } from 'react'
import axios from 'axios'

class LoginForm extends Component{
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state);
        axios.post('http://localhost:4000/api/user/login', this.state)
            .then(response => {
                localStorage.setItem('login', JSON.stringify({ token: response.token }));
                this.props.history.push("/Post");
                this.setState(this.state)
            })
            .catch(error => {
                alert(error);
        })
    };
    
    render() {
        const mystyle = {
            width: "50%",
            marginLeft: "15%",
            marginTop: "7%"
        }
        const { username, password } = this.state;

        return (
            <form onSubmit={this.submitHandler} style={mystyle}>
                <label for="username">Username</label>
                <input type="text" name="username" value={username} onChange={this.changeHandler} />
                <lable for="password">Password</lable>
                <input type="password" name="password" value={password} onChange={this.changeHandler} />
                <button value="submit">Login</button>
            </form>
        );
    }
}

export default LoginForm;