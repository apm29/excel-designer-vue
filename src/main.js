import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import "virtual:windi.css";
import "element-plus/dist/index.css";
import "@/remote/remote-config.js";
import "@mdi/font/css/materialdesignicons.min.css";
createApp(App).use(router).use(createPinia()).mount("#app");
