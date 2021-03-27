/*
 * @Author: 鱼小柔
 * @Date: 2021-03-13 12:00:44
 * @LastEditors: your name
 * @LastEditTime: 2021-03-21 22:45:52
 * @Description: file content
 */
/* eslint-disable */
import axios from "axios";
import store from "../store";
import { Commit } from "vuex";
axios.defaults.baseURL = "http://api.vikingship.xyz/api/";
if (localStorage.getItem("token")) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
}
axios.interceptors.request.use((config) => {
  store.commit("setLoading", true);
  store.commit("setError", { status: false, message: "" });
  return config;
});
axios.interceptors.response.use(
  (config) => {
    store.commit("setLoading", false);

    return config;
  },
  (e) => {
    const { code, error } = e.response.data;
    store.commit("setError", { status: true, message: `${code}:${error}` });
    store.commit("setLoading", false);
    return Promise.reject(error);
  }
);
export const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const res = await axios.get(url, { params: { pageSize: 999 } });
  commit(mutationName, res.data.data);
};
export const postAndCommit = async (url: string, mutationName: string, commit: Commit, data: any) => {
  const res = await axios.post(url, data);
  commit(mutationName, res.data.data);
};
export function updateToken(token: string) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
