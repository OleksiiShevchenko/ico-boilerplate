import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Landing from './pages/landing';
import Dashboard from './pages/dashboard';

const Routes = () => (
  <Switch>
    <Redirect from="/dashboard" exact to="/dashboard/transactions" />
    <Route exact path="/" component={Landing}/>
    <Route path="/dashboard" component={Dashboard}/>
  </Switch>
);


export default Routes;
