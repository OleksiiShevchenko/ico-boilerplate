import { createStore, applyMiddleware, compose as simpleCompose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';

export default function configureStore(history) {
  const compose = process.env.NODE_ENV === 'production' ? simpleCompose : composeWithDevTools;

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      ),
    ),
  );

  return store;
}
