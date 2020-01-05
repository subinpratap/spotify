import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from "react-redux";
import reducers from './reducers'
import thunk from "redux-thunk";
import logger from 'redux-logger'
import { createStore, applyMiddleware, compose } from "redux";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk, logger))
); */
const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>, 
    document.querySelector('#root'));
