/*
 * @Author: 鱼小柔
 * @Date: 2021-02-28 18:29:37
 * @LastEditors: your name
 * @LastEditTime: 2021-03-21 23:06:19
 * @Description: file content
 */
import { createStore } from "vuex";

import { getAndCommit, postAndCommit, updateToken } from "../io";
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createAt?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
  error: { status: boolean; message?: string };
  token: string;
}
export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P;
}
export default createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: { isLogin: false },
    loading: false,
    token: localStorage.getItem("token") || "",
    error: { status: false },
  },
  mutations: {
    setToken(state, { token }) {
      state.token = token;
    },
    clearToken(state) {
      state.token = "";
    },
    setUserInfo(state, payload) {
      state.user.isLogin = true;
      state.user.nickName = payload.nickName;
      state.user._id = payload._id;
      state.user.column = payload.column;
    },
    clearUserInfo(state) {
      state.user = {
        isLogin: false,
      };
    },
    createPost(state, payload) {
      debugger;
      console.log(payload);
      state.posts.push({
        id: new Date().getTime(),
        createdAt: new Date().toLocaleString(),
        ...payload,
      });
    },
    fetchColumns(state, data) {
      state.columns = data.list;
    },
    fetchColumn(state, data) {
      state.columns = [data];
    },
    fetchPosts(state, data) {
      state.posts = data.list;
    },

    setLoading(state, status) {
      state.loading = status;
    },
    setError(state, { status, message }) {
      state.error = { status, message };
    },
  },
  actions: {
    async fetchColumns(context) {
      getAndCommit("columns", "fetchColumns", context.commit);
    },
    async fetchColumn(context, id) {
      getAndCommit(`columns/${id}`, "fetchColumn", context.commit);
    },
    async fetchPosts(context, id) {
      getAndCommit(`columns/${id}/posts`, "fetchPosts", context.commit);
    },
    async fetchToken(context, data) {
      await postAndCommit(`user/login`, "setToken", context.commit, data); //提交到store
      updateToken(context.state.token); //添加到axios请求时候的header
      localStorage.setItem("token", context.state.token); //保存到local
    },
    async fetchUserInfo(context) {
      getAndCommit("user/current", "setUserInfo", context.commit);
    },
    async createPost(context, payload) {
      postAndCommit("posts", "createPost", context.commit, payload);
    },
    logout({ commit }) {
      updateToken("");
      localStorage.removeItem("token");
      commit("clearUserInfo");
      commit("clearToken");
    },
  },
  getters: {},
});
