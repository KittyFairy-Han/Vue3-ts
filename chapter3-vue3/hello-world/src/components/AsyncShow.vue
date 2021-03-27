<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-19 12:09:00
 * @LastEditors: your name
 * @LastEditTime: 2021-02-19 12:12:19
 * @Description: 异步
-->
<template>
  <h1>{{ result }}</h1>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve({
          result: 42,
        });
      }, 3000);
    });
  },
});
</script>