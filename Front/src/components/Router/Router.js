import React, { Component } from 'react';
import Login from '../Login';
import Dashboard from '../Dashboard';
import AuthenticationService from '../../services/AuthService'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthenticationService.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

class Router extends Component {
  render() {
    return(
      <BrowserRouter>
        <PrivateRoute exact path='/' component={Dashboard} />
        <Route exact path='/login' component={Login} />
      </BrowserRouter>
    );
    
  }
}

export default Router