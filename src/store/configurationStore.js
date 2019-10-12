import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../state';

export default function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk),
  );
  window.store = store;

  return store;
}
