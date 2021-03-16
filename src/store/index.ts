/*
 * @Author: 鱼小柔
 * @Date: 2021-02-28 18:29:37
 * @LastEditors: your name
 * @LastEditTime: 2021-03-13 17:04:21
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
    fetchUserInfo(state, payload) {
      state.user.isLogin = true;
      state.user.nickName = payload.nickName;
      state.user._id = payload._id;
      state.user.column = payload.column;
    },
    createPost(state, payload) {
      state.posts.push({
        id: new Date().getTime(),
        columnId: state.user.column,
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
    fetchToken(state, { token }) {
      state.token = token;
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
      await postAndCommit(`user/login`, "fetchToken", context.commit, data);
      updateToken(context.state.token);
      localStorage.setItem("token", context.state.token);
    },
    async fetchUserInfo(context) {
      getAndCommit("user/current", "fetchUserInfo", context.commit);
    },
  },
  getters: {},
});
