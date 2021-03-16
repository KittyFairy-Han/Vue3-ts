/*
 * @Author: 鱼小柔
 * @Date: 2021-02-28 16:27:50
 * @LastEditors: your name
 * @LastEditTime: 2021-03-07 21:48:10
 * @Description: file content
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import ColumnDetail from "../views/ColumnDetail.vue";
import CreatePost from "../views/CreatePost.vue";
import store from "../store";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (Login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
    meta: { redirectAlreadyLogin: true },
  },
  {
    path: "/create",
    name: "CreatePost",
    component: CreatePost,
    meta: { requiredLogin: true },
  },
  {
    path: "/column/:id",
    name: "Column",
    component: ColumnDetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(store.state.user)
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: "Login" });
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
