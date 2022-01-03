import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "addCity",
    component: () => import("../views/AddCity"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

export default router;
