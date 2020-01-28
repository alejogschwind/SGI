import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import * as serviceWorker from './serviceWorker';
import setAuthorizationToken from './utils/setAuthorization'
import jwt from 'jsonwebtoken';

import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { authCheckState } from './actions/authActions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(thunk),
//   // other store enhancers if any
// );

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   )
// )
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));


// if (localStorage.token) {
//   console.log('A')
//   setAuthorizationToken(localStorage.token)
//   store.dispatch(authCheckState())
// }

if (localStorage.token) {
  store.dispatch(authCheckState())
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
