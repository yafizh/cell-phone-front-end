import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Axios
import axios from "./plugins/axios";
import VueAxios from "vue-axios";

import "@/assets/css/styles.css";
import "@/assets/scss/boxicons.scss";
import "@/assets/scss/core.scss";
import "@/assets/scss/theme-default.scss";

import Helpers from "@/assets/js/helpers";

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// vue3-easy-data-table
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

window.Helpers = Helpers;
window.PerfectScrollbar = PerfectScrollbar;

const app = createApp(App);

app.component("EasyDataTable", Vue3EasyDataTable);

app.use(VueAxios, axios);
app.use(router);

app.mount("#app");
