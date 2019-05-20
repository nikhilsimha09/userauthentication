import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import UserLogin from  './components/user/LoginForm'
//import Home from './components/user/Register'
import Home from './components/user/Home'
import UserLogins from './loginstrap'

class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <div>
          {/* <h2> Modus </h2> */}
          {/* <Link to="/users/register"> Register </Link> |
          <Link to="/users/login"> Login </Link> */}

          {/* <Home/> */}
          {/* <UserJumbotron/>
          <UserLogins /> */}
          <Route path="/" component = {Home}/>
          {/* <Route path="/users/register" component = {UserRegister}/> */}
          {/* <Route path="/users/login" component = {UserLogin}/> */}
        </div>
      </BrowserRouter>
      
    )
  }
}

export default App;
