import { createRouter, createWebHistory } from "vue-router";

import AdminView from "../views/masters/AdminView.vue";
import EmployeeView from "../views/masters/EmployeeView.vue";
import ItemTypeView from "../views/masters/ItemTypeView.vue";
import ItemView from "../views/items/ItemView.vue";

const routes = [
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
  },
  {
    path: "/employees",
    name: "employee",
    component: EmployeeView,
  },
  {
    path: "/item-types",
    name: "item-type",
    component: ItemTypeView,
  },
  {
    path: "/items",
    name: "item",
    component: ItemView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
