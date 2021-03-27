<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-19 14:57:04
 * @LastEditors: your name
 * @LastEditTime: 2021-02-19 15:19:53
 * @Description: file content
-->
<template>
  <div class="img-container">
    <h1 v-if="loading">loading...waiting...</h1>
    <img v-if="loaded" :src="result[0].url" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useURLLoader from "../hooks/useURLLoader";
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default defineComponent({
  async setup() {
    const { result, loading, loaded } = await useURLLoader<CatResult>(
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );
    return {
      result,
      loading,
      loaded,
    };
  },
});
</script>
<style>
.img-container img{
    width: 400px;
    height: 400px;
    object-fit: contain;
}
</style>