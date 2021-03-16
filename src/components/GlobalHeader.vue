<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-19 22:43:19
 * @LastEditors: your name
 * @LastEditTime: 2021-02-28 21:01:15
 * @Description: 头部
-->
<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">者也专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link :to="{name:'Login'}" class="btn btn-outline-light my-2">登陆</router-link>
      </li>
      <li class="list-inline-item">
        <router-link :to="{name:'Login'}" class="btn btn-outline-light my-2">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <drop-down :title="`你好,${user.nickName}`">
          <drop-down-item>
            <router-link :to="{name:'CreatePost'}" class="dropdown-item">新建文章</router-link>
          </drop-down-item>
          <drop-down-item :disabled="true">
            <a href="#" class="dropdown-item">编辑资料</a>
          </drop-down-item>
          <drop-down-item>
            <a href="#" class="dropdown-item">退出登录</a>
          </drop-down-item>
        </drop-down>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import DropDown from "./DropDown.vue";
import DropDownItem from "./DropDownItem.vue";
import {UserProps} from "../store"

export default defineComponent({
  components: { DropDown, DropDownItem },
  name: "GlobalHeader",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup() {
    return {};
  }
});
</script>

<style></style>
