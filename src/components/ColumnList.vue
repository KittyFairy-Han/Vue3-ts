<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-19 21:42:52
 * @LastEditors: your name
 * @LastEditTime: 2021-03-07 19:34:28
 * @Description: 列表组件
-->
<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="column in columnList" :key="column._id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            class="rounded-circle border border-light w-25 my-3"
            :src="column.avatar&&column.avatar.url"
            :alt="column.title"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link
            class="btn btn-outline-primary"
            :to="{ name: 'Column', params: { id: column._id } }"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { ColumnProps } from "../store";
export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true,
    },
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map((column) => {
        if (!column.avatar) {
          column.avatar = { url: require("@/assets/column.png") };
        }
        return column;
      });
    });
    return {
      columnList,
    };
  },
});
</script>

<style></style>
