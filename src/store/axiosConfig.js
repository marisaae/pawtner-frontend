import axios from 'axios';
import Cookies from 'js-cookie';

axios.interceptors.request.use(config => {
    // Add CSRF Token to non-GET requests
    if (config.method.toUpperCase() !== 'GET') {
        config.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }
    return config;
}, error => {
    // Handle request error
    return Promise.reject(error);
});