import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@/styles/index.less'
import stores from '@/store/index'
import router from './router'
import { Toast } from 'vant';

createApp(App)
    .use(stores)
    .use(router)
    .use(Toast)
    .mount('#app')
