<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-19 22:43:19
 * @LastEditors: your name
 * @LastEditTime: 2021-02-20 00:54:44
 * @Description: 下拉组件
-->
<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
      >{{ title }}</a
    >
    <ul class="dropdown-menu" v-show="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import useClickOutside from "../hooks/useClickOutside";
export default defineComponent({
  name: "DropDown",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false);
    const dropdownRef = ref<HTMLElement | null>(null);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    const isClickOutside = useClickOutside(dropdownRef);

    watch(isClickOutside, () => {
      // 打开状态下，点击非dropdown的孩子节点则关闭

      if (isClickOutside.value && isOpen.value) {
        isOpen.value = false;
      }
    });

    return {
      isOpen,
      toggleOpen,
      isClickOutside,
      // 返回和 ref 同名的响应式对象，就可以拿到对应的 dom 节点
      dropdownRef
    };
  }
});
</script>

<style>
.dropdown-menu {
  display: block;
}
</style>
