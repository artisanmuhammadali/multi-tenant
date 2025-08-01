import axios from 'axios'
import { getAuthToken } from './assets/utils';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL + '/api/'
axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
