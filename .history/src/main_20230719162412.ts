import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@/styles/index.less'
import store from '@/store'

createApp(App)
    .use(store)
    .mount('#app')
