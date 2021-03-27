/*
 * @Author: 鱼小柔
 * @Date: 2021-02-18 20:08:22
 * @LastEditors: your name
 * @LastEditTime: 2021-02-18 20:30:14
 * @Description: 获取鼠标点击位置的逻辑
 */

import { ref, toRefs, reactive, onMounted, onUnmounted } from "vue";

export default function useMousePosition() {
  /*
  const x = ref(0);
  const y = ref(0);
  const updateMouse = (e: MouseEvent) => {
    x.value = e.pageX;
    y.value = e.pageY;
  };
  onMounted(() => {
    document.addEventListener("click", updateMouse);
  });
  onUnmounted(() => {
    document.removeEventListener("click", updateMouse);
  });
  return {
    x,
    y,
  };
  */
  const data = reactive({
    x: 0,
    y: 0,
  });
  const updateMouse = (e: MouseEvent) => {
    data.x = e.pageX;
    data.y = e.pageY;
  };
  onMounted(() => {
    document.addEventListener("click", updateMouse);
  });
  onUnmounted(() => {
    document.removeEventListener("click", updateMouse);
  });
  const refData = toRefs(data);
  return refData;
}
