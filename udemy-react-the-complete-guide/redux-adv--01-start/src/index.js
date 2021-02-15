import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

/* MIDDLEWARE
applyMiddleware() tells Redux to run the provided middleware functions one by one anytime the store makes a dispatch of an action.

This middleware is a logger. 
It logs the action to be dispatched, then the next() middleware's dispatch method is executed [if there is no more middleware, then the last one in the stack is the reducer],
then it logs the new state of the store.

action must be passed to next() because it is possible if we wanted to to change the action in the middleware, before passing it on to next().
*/
const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            let result = next(action);
            // We can log what the next state is since we already called next().
            console.log('[Middleware] Next state', store.getState());
            return result;
        }
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
