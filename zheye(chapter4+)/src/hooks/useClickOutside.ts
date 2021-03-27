/*
 * @Author: 鱼小柔
 * @Date: 2021-02-20 00:17:17
 * @LastEditors: your name
 * @LastEditTime: 2021-02-20 00:54:01
 * @Description: 是否点击该节点的非孩子节点
 */
import { ref, onMounted, onUnmounted, Ref } from "vue";
export default (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false);
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false;
      } else {
        isClickOutside.value = true;
      }
    }
  };
  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
  return isClickOutside;
};
