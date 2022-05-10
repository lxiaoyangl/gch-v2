import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/css/common.less";
import "./assets/css/reset.less";

import ElementPlus from "element-plus";

import * as ElIcons from "@element-plus/icons-vue";
import "element-plus/dist/index.css";

let app = createApp(App);
Object.keys(ElIcons).forEach((key) => {
  app.component(key, ElIcons[key as keyof typeof ElIcons]);
});
app.use(ElementPlus).use(router).mount("#app");
