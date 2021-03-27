/*
 * @Author: 鱼小柔
 * @Date: 2021-02-28 16:27:50
 * @LastEditors: your name
 * @LastEditTime: 2021-03-16 21:15:21
 * @Description: file content
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './io'

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
  