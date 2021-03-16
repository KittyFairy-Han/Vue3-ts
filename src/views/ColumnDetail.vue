<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-28 14:53:44
 * @LastEditors: your name
 * @LastEditTime: 2021-03-13 11:42:12
 * @Description: 专栏详情
-->
<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <!-- <img :src="column.avatar&&column.avatar.url" :alt="column.title" /> -->
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>

    <article class="card mb-3 shadow-sm" v-for="item in list" :key="item._id">
      <div class="card-body">
        <h3>{{ item.title }}</h3>
        <div class="row my-3 align-items-center">
          <div class="col-4">
            <img class="post-img" :src="item.image && item.image.url" />
          </div>
          <p class="col-8 text-muted">{{ item.excerpt }}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
// eslint-disable-next-line
import { GlobalDataProps, ColumnProps, PostProps } from "../store";
export default defineComponent({
  components: {},
  props: {},
  setup() {
    const route = useRoute();
    const store = useStore<GlobalDataProps>();
    const columnId = route.params.id;
    const column = computed(() => store.state.columns[0]);
    console.log(column);
    const list = computed(() => store.state.posts);
    console.log(list);
    onMounted(() => {
      store.dispatch("fetchColumn", columnId);
      store.dispatch("fetchPosts", columnId);
    });
    return {
      column,
      list,
    };
  },
});
</script>

<style>
.post-img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}
</style>

