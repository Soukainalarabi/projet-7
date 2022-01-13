import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
// Add Axios
import axios from 'axios'
const BASE_URL = "http://localhost:3000/";
// Add Axios
const app = createApp(App)
app.use(router).mount('#app')
app.config.globalProperties.$http = axios;
app.config.globalProperties.$baseUrl = BASE_URL

export function tokenInterceptor() {
    axios.interceptors.request.use(request => {
        // add auth header with jwt if account is logged in and request is to the api url
        const token = localStorage.getItem("token");
        const isApiUrl = !request.url.startsWith(`${BASE_URL}/api/auth`);

        if (token && isApiUrl) {
            request.headers.common.Authorization = `Bearer ${token}`;
        }
        request.baseURL = BASE_URL;
        return request;
    });
}

tokenInterceptor();
