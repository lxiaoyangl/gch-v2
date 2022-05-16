import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/css/common.less";
import "./assets/css/reset.less";

import ElementPlus from "element-plus";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";

let app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus).use(router).mount("#app");
