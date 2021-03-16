<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-28 10:06:15
 * @LastEditors: your name
 * @LastEditTime: 2021-03-07 21:53:13
 * @Description: 登录页
-->
<template>
  <main>
    <home-create></home-create>
    <column-list :list="list"></column-list>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import ColumnList from "../components/ColumnList.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store";
import HomeCreate from "@/components/HomeCreate.vue";
export default defineComponent({
  components: {
    ColumnList,
    HomeCreate,
  },
  props: {},
  setup() {
    const store = useStore<GlobalDataProps>();
    const columns = computed(() => store.state.columns);
    console.log(columns.value);

    onMounted(() => {
      store.dispatch("fetchColumns");
    });

    return {
      list: columns,
    };
  },
});
</script>

<style>
</style>
