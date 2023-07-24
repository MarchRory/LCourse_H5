import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@/styles/index.less'
import 'vant/es/toast/style';  // 全局引入toast样式
import router from './router'
import stores from '@/store/index'
import '@/auth'
import { Toast } from 'vant';
import { Lazyload } from 'vant';

createApp(App)
    .use(router)
    .use(stores)
    .use(Toast)
    .use(Lazyload)
    .mount('#app')
