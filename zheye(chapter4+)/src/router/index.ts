/*
 * @Author: 鱼小柔
 * @Date: 2021-02-28 16:27:50
 * @LastEditors: your name
 * @LastEditTime: 2021-03-21 17:05:16
 * @Description: file content
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import ColumnDetail from "../views/ColumnDetail.vue";
import CreatePost from "../views/CreatePost.vue";
import store from "../store";
import createTiper from "@/components/createTiper";
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

router.beforeEach(async (to, from, next) => {
  // console.log(store.state.user)
  const {
    token,
    user: { isLogin },
  } = store.state;
  if (isLogin) {
    // 已经登录
    if (to.meta.redirectAlreadyLogin) {
      // 还想到登录页面
      // 重定向到主页
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    // 没有登陆
    if (token) {
      // 有token
      // 先获取用户信息 ，获取后会把login设置为true
      try {
        await store.dispatch("fetchUserInfo");
        if (to.meta.redirectAlreadyLogin) {
          //想要到登录的页面
          //重定向到主页
          next({ name: "Home" });
        } else {
          next();
        }
      } catch (error) {
        createTiper('获取用户信息失败，请重新登录','error')
        next({ name: "Login" });
      }
    } else {
      // 没有token
      // 想到需要用户信息的页面
      if (to.meta.requiredLogin) {
        //先登录
        next({ name: "Login" });
      } else {
        next();
      }
    }
  }
});

export default router;
