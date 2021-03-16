<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-19 15:47:57
 * @LastEditors: your name
 * @LastEditTime: 2021-03-16 22:26:26
 * @Description: root vue
-->
<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <loader v-if="loading" bg="rgba(0,0,0,0.5)" text="拼命加载中"></loader>
    <router-view></router-view>
    <footer class="list-inline mb-0">
      <small>
        <ul>
          <li class="list-inline-item">@ 2021 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalHeader from "./components/GlobalHeader.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "./store";
import Loader from "./components/Loader.vue";
export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    Loader,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    
    const currentUser = computed(() => store.state.user);
    const loading = computed(() => store.state.loading);
    onMounted(()=>{
      if(store.state.token&&!store.state.user.isLogin){
        store.dispatch("fetchUserInfo")
      }
    })
    return {
      loading,
      currentUser,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
