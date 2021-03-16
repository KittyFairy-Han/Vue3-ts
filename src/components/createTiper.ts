/*
 * @Author: 鱼小柔
 * @Date: 2021-03-13 18:35:51
 * @LastEditors: your name
 * @LastEditTime: 2021-03-16 22:23:35
 * @Description: file content
 */

import { createApp } from "vue";
import Tiper from "./Tiper.vue";
export type MessageType = "success" | "error" | "default";

export default (text: string, mtype: MessageType, timeout = 2000) => {
  const tiperVM = createApp(Tiper, {
    text,
    mtype,
  });
  const ele = document.createElement("div");
  document.body.appendChild(ele);
  tiperVM.mount(ele);
  setTimeout(() => {
    tiperVM.unmount();
    document.body.removeChild(ele);
  }, timeout);
};
