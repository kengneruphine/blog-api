import React, { Component } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Post from './Post';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    const mystyle = {
      listStyleType: "none",
      display: "flex",
      backgroundColor: "lightblue",
      marginTop:10
    }
    return (
      <Router>
        <div className="container">
          <div className="list">
            <ul style={mystyle}>
              <li> <Link to={'/Login'}>Login</Link></li> &emsp;&emsp;
              <li><Link to={'/Register'}>Register</Link></li>
            </ul>
            <h2>Welcome to Simple blog site</h2>
          </div>
          <br />
          <Switch>
          <Route exact path='/' component={LoginForm} />
            <Route path='/Login' component={LoginForm} />
            <Route path='/Register' component={RegisterForm} />
          </Switch>

          <Switch>
            <Route path='/Post' component={Post} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;