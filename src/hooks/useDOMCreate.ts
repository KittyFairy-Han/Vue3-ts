/*
 * @Author: 鱼小柔
 * @Date: 2021-03-13 18:06:51
 * @LastEditors: your name
 * @LastEditTime: 2021-03-13 18:16:16
 * @Description: file content
 */
import { onUnmounted } from "vue";
export default (nodeId: string) => {
  const node = document.createElement("div");
  node.id = nodeId;
  document.body.appendChild(node);
  onUnmounted(() => {
    document.body.removeChild(node);
  });
};
