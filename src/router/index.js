import { createRouter, createWebHistory } from "vue-router";

import AdminView from "../views/masters/AdminView.vue";
import EmployeeView from "../views/masters/EmployeeView.vue";
import ItemTypeView from "../views/masters/ItemTypeView.vue";

const routes = [
  {
    path: "/admin",
    name: "admin.index",
    component: AdminView,
  },
  {
    path: "/employees",
    name: "employees.index",
    component: EmployeeView,
  },
  {
    path: "/item-types",
    name: "item-types.index",
    component: ItemTypeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
