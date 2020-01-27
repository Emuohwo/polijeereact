import axios from 'axios';
import history from './history';
import { CLEAR_STATE } from '../constants/actionTypes';

export default {
    requestInterceptors: () => {
        axios.interceptors.request.use((config) => {
            config.baseURL = process.env.API_BASE_URL;
            return config;
        }, error => Promise.reject(error));
    },
    responseInterceptors: (store) => {
        axios.interceptors.response.use( (response, error) => {
            // catch 401
            if (error.response.status === 401) {
                store.dispatch({ type: CLEAR_STATE });
                localStorage.removeItem('token');
                history.push('/login');
            }
            return Promise.reject(error);
        });
    }
};