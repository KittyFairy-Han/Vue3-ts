<!--
 * @Author: 鱼小柔
 * @Date: 2021-03-07 22:33:06
 * @LastEditors: your name
 * @LastEditTime: 2021-03-16 22:15:51
 * @Description: 全局的tip提示
-->
<template>
    <div
      class="alert message-info fixed-top w-50 mx-auto mt-2"
      :class="classObject"
      v-show="show"
    >
      <span>{{ text }}</span>
      <button
        type="button"
        class="close"
        aria-label="close"
        @click.prevent="hide"
      >
        <span aria-hidden="true">x</span>
      </button>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export type MessageType = 'success' | 'error' | 'default';
export default defineComponent({
  props: {
    text: {
      type: String,
    },
    mtype: {
      type: String as PropType<MessageType>,
      default: "default",
    },
  },
  emits: ["close-tip"],
  setup(props, context) {
    //这样写才是一个可以拿去给别人直接用的组件
    //如果是在index.html中直接写了一个back的节点
    //别人用的时候也得写这个节点，麻烦
    //并且生成时间得在mounted之前
    
    const show = ref(true);
    const classObject = {
      "alert-success": props.mtype == "success",
      "alert-danger": props.mtype == "error",
      "alert-primary": props.mtype == "default",
    };
    const hide = () => {
      show.value = false;
      context.emit("close-tip", true);
    };
    return {
      classObject,
      show,
      hide,
    }
  },
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