import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Axios
import axios from "./plugins/axios";
import VueAxios from "vue-axios";

import "@/assets/scss/boxicons.scss";
import "@/assets/scss/core.scss";
import "@/assets/scss/theme-default.scss";

import Helpers from "@/assets/js/helpers";

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

window.Helpers = Helpers;
window.PerfectScrollbar = PerfectScrollbar;

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);

app.mount("#app");
