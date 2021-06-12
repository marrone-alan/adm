import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// services
import { isAuthenticated } from '../services/auth';
// pages
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={SignIn} />
      <PrivateRoute path="*" component={Home} />
    </Switch>
  </BrowserRouter>
);

export { Routes };
