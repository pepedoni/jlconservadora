import React, { Component } from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

import { routes } from "config/routes";

export default class MainRouter extends Component {
  render() {
    return (
      <Switch>
        {routes.map((route, index) => (
          <Route
            exact={route.exact} 
            key={index}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    )
  }
}