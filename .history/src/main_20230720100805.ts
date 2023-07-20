import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@/styles/index.less'
import stores from '@/store/index'
import router from './router'

createApp(App)
    .use(stores)
    .use(router)
    .mount('#app')
