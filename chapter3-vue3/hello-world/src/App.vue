<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-16 20:27:35
 * @LastEditors: your name
 * @LastEditTime: 2021-02-19 15:17:59
 * @Description: file content
-->
<template>
  <main>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <h1>{{ x }}</h1>
    <h1>{{ y }}</h1>
    <p>{{ error }}</p>
    <suspense>
      <template #default>
        <div>
          <async-show />
          <cat-show />
        </div>
      </template>
      <template #fallback>
        <h1>Loading ! ...</h1>
      </template>
    </suspense>

    <modal :isOpen="open" @close-modal="handleCloseBtnClick">弹弹弹窗</modal>
    <button @click="increase">➕</button>
    <button @click="updateGreeting">更新标题</button>
    <button @click="handleOpenBtnClick">打开弹窗</button>
  </main>
</template>

<script lang="ts">
import { ref, computed, reactive, defineComponent, toRefs, watch, onErrorCaptured } from "vue";
import useMousePosition from "./hooks/useMousePosition";
import Modal from "./components/Modal.vue";
import AsyncShow from "./components/AsyncShow.vue";
import CatShow from "./components/CatShow.vue";
// 因为类型推断为any所以最好自己定义一个interface然后指定这个类型
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}

export default defineComponent({
  name: "App",
  components: { Modal, AsyncShow, CatShow },
  //声明周期之前运行的 无法访问到this
  setup() {
    const error = ref(null);
    onErrorCaptured((e: any) => {
      error.value = e;
      return true;
    });
    // 清楚来源
    // 逻辑脱离组件，组件只关心 x,y 的值
    // x,y 可以别名，避免命名冲突
    const { x, y } = useMousePosition();

    /* 第二种写法 */
    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++;
      },
      double: computed(() => {
        return data.count * 2;
      }),
    });
    const greetings = ref("unknow");
    const updateGreeting = () => {
      greetings.value += "Hello ";
    };
    watch(greetings, () => {
      document.title = `updating ${greetings.value}`;
    });
    const open = ref(false);
    const handleOpenBtnClick = () => {
      open.value = true;
    };
    const handleCloseBtnClick = () => {
      open.value = false;
    };
    const refData = toRefs(data);
    return {
      x,
      y,
      open,
      handleOpenBtnClick,
      handleCloseBtnClick,
      ...refData,
      greetings,
      updateGreeting,
      error,
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
