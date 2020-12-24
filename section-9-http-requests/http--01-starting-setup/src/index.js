import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// set up default configuration
axios.defaults.baseURL= 'https://jsonplaceholder.typicode.com'
// set up common headers
axios.defaults.headers.common['Authorisation'] = 'AUTH_TOKEN'
axios.defaults.headers.post['Content-Type'] = 'application/json';

// request is the request configuration.
axios.interceptors.request.use(request => {
    console.log(request);
    // We can edit the request configuration here.
    // We always need to return the Promise request, or it will block the request.
    return request;
}, error => {
    // We can include a function to handle errors
    console.log(error)
    // We need to still forward the Promise to our request handler with a given error message, so that it can then handle the error.
    // also handles unchecked exceptions like internet disconnected
    return Promise.reject(error);
});

//response is the response configuration we get from the server
axios.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
