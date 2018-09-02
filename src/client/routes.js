import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from './pages/landing/landing';
import Dashboard from './pages/dashboard/dashboard';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Landing}/>
    <Route path="/dashboard" component={Dashboard}/>
  </Switch>
);


export default Routes;
