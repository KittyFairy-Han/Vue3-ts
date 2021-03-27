<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-20 18:16:59
 * @LastEditors: your name
 * @LastEditTime: 2021-02-20 21:33:55
 * @Description: 表单验证
-->
<template>
  <form class="validate-form-container">
    <slot></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import mitt from "mitt";
type ValidateFunc = () => boolean;
// 实例化 mitt
export const emitter = mitt();
export default defineComponent({
  emits: ["form-submit"],
  setup(props, context) {
    let funcArr: ValidateFunc[] = [];
    const submitForm = () => {
      // 循环执行数组 得到最后的验证结果
      const result = funcArr.map(func => func()).every(result => result);
      context.emit("form-submit", result);
    };
    // 将监听得到的验证函数都存到一个数组中
    const callback = (func?: ValidateFunc) => {
      if (func) {
        funcArr.push(func);
      }
    };
    // 添加监听
    emitter.on("form-item-created", callback);
    onUnmounted(() => {
      // 删除监听
      emitter.off("form-item-created", callback);
      funcArr = [];
    });
    return {
      submitForm
    };
  }
});
</script>

<style lang="less"></style>
