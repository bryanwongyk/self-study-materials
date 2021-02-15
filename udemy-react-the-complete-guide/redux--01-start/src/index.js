import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers} from 'redux';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import {Provider} from 'react-redux';

// merge into one rootReducer
const rootReducer = combineReducers({
    // feature areas can be given any name
    ctr: counterReducer,
    res: resultReducer
});

// Reducers typically made in another file to store complex logic and adhere to single responsibility principle.
const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
