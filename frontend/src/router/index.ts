import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("~/views/HomeView.vue"),
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("~/views/index/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("~/views/LoginView.vue"),
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
