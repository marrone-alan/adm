import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// services
import { isAuthenticated } from '../services/auth';
// helpers
import ChangeRoute from '../helpers/ChangeRoute';
// components
import Navigation from '../components/Navigation';
// pages
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import Access from '../pages/Report/Access';
import Operational from '../pages/Report/Operational';

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
    <Navigation />
    <ChangeRoute>
      <Switch>
        <Route exact path="/login" component={SignIn} />
        <PrivateRoute exact path="/relatorios/acessos" component={Access} />
        <PrivateRoute
          exact
          path="/relatorios/operacional"
          component={Operational}
        />
        <PrivateRoute path="*" component={Home} />
      </Switch>
    </ChangeRoute>
  </BrowserRouter>
);

export { Routes };
