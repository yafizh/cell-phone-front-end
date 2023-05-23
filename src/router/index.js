import { createRouter, createWebHistory } from "vue-router";

import AdminView from "../views/masters/AdminView.vue";
import EmployeeView from "../views/masters/EmployeeView.vue";
import ItemTypeView from "../views/masters/ItemTypeView.vue";
import ItemView from "../views/items/ItemView.vue";
import ItemInView from "../views/items/ItemInView.vue";
import ItemOutView from "../views/items/ItemOutView.vue";
import BalanceView from "../views/balances/BalanceView.vue";
import BalanceInView from "../views/balances/BalanceInView.vue";
import CreditOutView from "../views/balances/CreditOutView.vue";
import TopupOutView from "../views/balances/TopupOutView.vue";

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
    path: "/balances",
    name: "balance",
    component: BalanceView,
  },
  {
    path: "/balance-in",
    name: "balance.in",
    component: BalanceInView,
  },
  {
    path: "/credit-out",
    name: "credit.out",
    component: CreditOutView,
  },
  {
    path: "/topup-out",
    name: "topup.out",
    component: TopupOutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
