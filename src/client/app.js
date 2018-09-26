import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import { BrowserRouter as Router } from 'react-router-dom'

import configureStore from './redux/store';
import Routes from './routes';
import api from './api';

import './index.scss';
import 'reset-css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

const history = createHistory();
const store = configureStore(api, history);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    );
  }
}

