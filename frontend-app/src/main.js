import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import config from './assets/config/config.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


// Add Axios

import axios from 'axios'
// charger la configuration
const BASE_URL = config.backend.baseURL;
const DATE_TIME_FORMAT = config.moment.dateTimeFormat;
const AUTH_ENDPOINT = config.backend.authEndpoint;
// Add Axios
const app = createApp(App)
app.use(router).mount('#app')
app.config.globalProperties.$http = axios;
app.config.globalProperties.$baseUrl = BASE_URL;
app.config.globalProperties.$datetimeFormat = DATE_TIME_FORMAT;

export function tokenInterceptor() {
    axios.interceptors.request.use(request => {
        // add auth header with jwt if account is logged in and request is to the api url
        const token = localStorage.getItem("token");
        const isApiUrl = !request.url.startsWith(BASE_URL + AUTH_ENDPOINT);

        if (token && isApiUrl) {
            request.headers.common.Authorization = `Bearer ${token}`;
        }
        request.baseURL = BASE_URL;
        return request;
    });
}

tokenInterceptor();
