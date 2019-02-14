import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Cookies from 'js-cookie'
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store';
import { hot } from 'react-hot-loader';

import Boomy from '../app';
import Login from 'features/auth/authContainer';
import Dashboard from "features/dashboard/dashboardContainer";

const getAccessToken = () => Cookies.get('@jl_token') || sessionStorage.getItem('@jl_token')
const isAuthenticated = () => !!getAccessToken()

//Redirect all routes to '/login' when user isn't authenticated
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          title: 'ok',
          state: { from: props.location }
        }} />
  )} />
)

//Redirect '/' to '/pipeline'
const DashboardRoute = () => (
  <Route render={() => (
   <Redirect to="/dashboard"/>
  )} />
)

class Router extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <DashboardRoute exact path="/"/>
          <ProtectedRoute path='/' component={Boomy} />
        </Switch>
      </ConnectedRouter>
    )
  }
}

export default (Router);