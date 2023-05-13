import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Axios
import axios from "./plugins/axios";
import VueAxios from "vue-axios";

import "./assets/css/bootstrap1.min.css";
import "./assets/css/style1.css";
import "metismenujs/style";
import "bootstrap";

const app = createApp(App);

app.use(VueAxios, axios);
app.use(router);

app.mount("#app");
