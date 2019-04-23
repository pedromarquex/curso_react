import axios from 'axios';

const api = axios.create({
    baseURL: 'http://pedromarquex.pythonanywhere.com/'
});

export default api;