<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-18 23:15:24
 * @LastEditors: your name
 * @LastEditTime: 2021-02-18 23:56:51
 * @Description: 通用弹窗
-->
<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2><slot>this is default info</slot></h2>
      <button @click="closeBtnClick">关闭</button>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isOpen: Boolean,
  },
  emits: {
    "close-modal": null
  },
  setup(props, context) {
    const closeBtnClick = ()=>{context.emit("close-modal")};
    return {
      closeBtnClick,
    };
  },
});
</script>
<style>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background: moccasin;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -100px;
  margin-right: -100px;
}
</style>