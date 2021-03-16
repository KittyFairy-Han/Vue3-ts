<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-19 23:48:46
 * @LastEditors: your name
 * @LastEditTime: 2021-02-20 00:02:54
 * @Description: 下拉菜单选项
-->
<template>
  <li class="dropdown-option" :class="{ 'is-disabled': disabled }">
    <slot></slot>
  </li>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DropDownItem",
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style>
.dropdown-option.is-disabled * {
  color: #6b6868;
  pointer-events: none;
  background-color: transparent;
}
</style>
