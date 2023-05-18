import { createRouter, createWebHistory } from "vue-router";

import AdminView from "../views/masters/AdminView.vue";
import EmployeeView from "../views/masters/EmployeeView.vue";
import ItemTypeView from "../views/masters/ItemTypeView.vue";
import ItemView from "../views/items/ItemView.vue";
import ItemInView from "../views/items/ItemInView.vue";
import ItemOutView from "../views/items/ItemOutView.vue";
import CreditView from "../views/credits/CreditView.vue";
import TopupView from "../views/topup/TopupView.vue";

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
  {
    path: "/credits",
    name: "credit",
    component: CreditView,
  },
  {
    path: "/topups",
    name: "topup",
    component: TopupView,
  },
  {
    path: "/item-in",
    name: "item.in",
    component: ItemInView,
  },
  {
    path: "/item-out",
    name: "item.out",
    component: ItemOutView,
  },
  {
    path: "/credit-in",
    name: "credit.in",
    component: '',
  },
  {
    path: "/credit-out",
    name: "credit.out",
    component: '',
  },
  {
    path: "/topup-in",
    name: "topup.in",
    component: '',
  },
  {
    path: "/topup-out",
    name: "topup.out",
    component: '',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
