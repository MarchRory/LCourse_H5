import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@/styles/index.less'
import router from './router'
import stores from '@/store/index'
import '@/auth'
import { Toast } from 'vant';

createApp(App)
    .use(router)
    .use(stores)
    .use(Toast)
    .mount('#app')
