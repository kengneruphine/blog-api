import React, { Component } from 'react'
import axios from 'axios'

class RegisterForm extends Component{
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:4000/api/user/register', this.state)
            .then(response => {
             //console.log(response)
                this.props.history.push('/Login');
                this.setState(this.state)
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
            marginTop: "5%"
        }

        const { username, email, password } = this.state;

        return (
            <div style={mystyle}><h3>Create an account</h3>
            <form onSubmit={this.submitHandler}>
                <label for="username">Username</label>
                <input type="text" name="username" value={username} onChange={this.changeHandler} />
                <label for="email">Email</label>
                <input type="text" name="email" value={email} onChange={this.changeHandler} />
                <label for="password">Password</label>
                <input type="password" name="password" value={password} onChange={this.changeHandler} />
                <button value="submit">Register</button>
                </form>
                </div>
        );
    }
}

export default RegisterForm;