import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@/styles/index.less'
import store from '@/store'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const app = createApp(App)
app.use(store)
    .mount('#app')
