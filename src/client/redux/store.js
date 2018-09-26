import { createStore, applyMiddleware, compose as simpleCompose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import apiMiddleware from './middlewares/api';
import customMiddleware from './middlewares/custom';

import reducer from './reducer';

export default function configureStore(api, history) {
  const compose = process.env.NODE_ENV === 'production' ? simpleCompose : composeWithDevTools;

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(
        apiMiddleware(api),
        customMiddleware(),
        routerMiddleware(history)
      ),
    ),
  );

  return store;
}







