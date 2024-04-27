import { createApp } from "vue";
import "./style.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import App from "./App.vue";
import "@/styles/index.less";
import { Toast } from "vant";
import "vant/es/toast/style"; // 全局引入toast样式
import "vant/es/dialog/style";
import { Notify } from "vant";
import "vant/es/notify/style";
import router from "./router";
import stores from "@/store/index";
import "@/auth";
import { Lazyload } from "vant";
import { Icon } from '@iconify/vue'


createApp(App)
  .use(router)
  .use(stores)
  .use(Toast)
  .use(Notify)
  .use(Lazyload)
  .component('s-icon', Icon)
  .mount("#app")
