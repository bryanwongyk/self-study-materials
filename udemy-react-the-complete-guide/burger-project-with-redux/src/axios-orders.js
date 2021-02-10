import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-guide-722af-default-rtdb.firebaseio.com/'
});

export default instance;