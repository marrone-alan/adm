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
import Profile from '../pages/Profile';
import Account from '../pages/Profile/Account';
import PersonalData from '../pages/Profile/PersonalData';
import ReportAccess from '../pages/Profile/ReportAccess';
import SignIn from '../pages/SignIn';
import Access from '../pages/Report/Access';
import Operational from '../pages/Report/Operational';
import IPAddress from '../pages/IpAddress';
import Order from '../pages/Status/Order';
import Product from '../pages/Status/Product';
import System from '../pages/Resource/System';
import Action from '../pages/Resource/Action';
import Users from '../pages/Users';

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
        <PrivateRoute exact path="/usuarios" component={Users} />
        <PrivateRoute exact path="/recursos/acoes" component={Action} />
        <PrivateRoute exact path="/recursos/sistemas" component={System} />
        <PrivateRoute exact path="/status/pedido" component={Order} />
        <PrivateRoute exact path="/status/produto" component={Product} />
        <PrivateRoute exact path="/ip" component={IPAddress} />
        <PrivateRoute exact path="/relatorios/acessos" component={Access} />
        <PrivateRoute
          exact
          path="/relatorios/operacional"
          component={Operational}
        />
        <PrivateRoute exact path="/perfil" component={Profile} />
        <PrivateRoute exact path="/perfil/minha-conta" component={Account} />
        <PrivateRoute
          exact
          path="/perfil/dados-pessoais"
          component={PersonalData}
        />
        <PrivateRoute
          exact
          path="/perfil/relatorio-acesso"
          component={ReportAccess}
        />
        <PrivateRoute path="*" component={Home} />
      </Switch>
    </ChangeRoute>
  </BrowserRouter>
);

export { Routes };
