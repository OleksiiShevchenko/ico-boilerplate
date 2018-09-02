import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import { BrowserRouter as Router } from 'react-router-dom'

import configureStore from './redux/store';
import Routes from './routes';

const history = createHistory();
const store = configureStore(history);

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

