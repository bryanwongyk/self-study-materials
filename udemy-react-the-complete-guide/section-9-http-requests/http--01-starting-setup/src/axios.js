import axios from 'axios';

// Create an instance of axios
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorisation'] = 'AUTH_TOKEN_FROM_INSTANCE'

export default instance;
