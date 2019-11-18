import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from '../state';
import history from './history';

export default function configureStore(initialState) {
  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
      )
    )
  );
  window.store = store;

  return store;
}
