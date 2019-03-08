import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import UserLogin from  './components/user/Login'
import UserRegister from './components/user/Register'

class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <div>
          <h2> User Authentication App</h2>
          <Link to="/users/register"> Register </Link> |
          <Link to="/users/login"> Login </Link>

          <Route path="/users/register" component = {UserRegister}/>
          <Route path="/users/login" component = {UserLogin}/>
        </div>
      </BrowserRouter>
      
    )
  }
}

export default App;
