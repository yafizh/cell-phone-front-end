import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/css/bootstrap1.min.css";
import "./assets/css/style1.css";
import "metismenujs/style";
import "bootstrap";

createApp(App).use(router).mount("#app");
