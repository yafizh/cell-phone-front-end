import { createRouter, createWebHistory } from "vue-router";

import AdminView from "../views/masters/AdminView.vue";
import EmployeeView from "../views/masters/EmployeeView.vue";
import ItemTypeView from "../views/masters/ItemTypeView.vue";
import ItemView from "../views/items/ItemView.vue";
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
    path: "/item-sale",
    name: "item.sale",
    component: '',
  },
  {
    path: "/credit-sale",
    name: "credit.sale",
    component: '',
  },
  {
    path: "/topup-sale",
    name: "topup.sale",
    component: '',
  },
  {
    path: "/item-supply",
    name: "item.supply",
    component: '',
  },
  {
    path: "/credit-supply",
    name: "credit.supply",
    component: '',
  },
  {
    path: "/topup-supply",
    name: "topup.supply",
    component: '',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
