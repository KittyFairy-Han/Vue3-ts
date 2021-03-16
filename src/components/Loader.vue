<!--
 * @Author: 鱼小柔
 * @Date: 2021-03-07 22:33:06
 * @LastEditors: your name
 * @LastEditTime: 2021-03-16 22:33:58
 * @Description: loader
-->
<template>
  <teleport to="#back">
    <div
      class="d-flex justify-content-center align-items-center h-100 loading-container"
      :style="{ backgroundColor: bg || '' }"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">{{ text || loading }}</span>
        </div>
        <p v-if="text" class="text-primary small">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>
<script>
import { defineComponent } from "vue";
import useDOMCreate from "../hooks/useDOMCreate"
export default defineComponent({
  props: {
    text: {
      type: String,
    },
    bg: {
      type: String,
    },
  },
  setup(){
      //这样写才是一个可以拿去给别人直接用的组件
      //如果是在index.html中直接写了一个back的节点
      //别人用的时候也得写这个节点，麻烦
      //并且生成时间得在mounted之前
      useDOMCreate("back")
  }
});
</script>
<style>
.loading-container {
  background: rgba(235, 238, 235, 0.336);
  z-index: 100;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
}
.loading-content {
  text-align: center;
}
</style>