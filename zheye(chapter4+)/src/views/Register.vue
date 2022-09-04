<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-28 10:05:25
 * @LastEditors: your name
 * @LastEditTime: 2021-03-16 22:20:16
 * @Description: 首页
-->
<template>
  <div>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail" class="form-label">邮箱地址</label>
        <validate-inpute
          v-model="emailVal"
          :rules="emailRules"
          type="email"
          placeholder="请输入邮箱地址"
        ></validate-inpute>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword" class="form-label">用户密码</label>
        <validate-inpute
          v-model="passwordVal"
          :rules="passwordRules"
          type="password"
          placeholder="请输入密码"
        ></validate-inpute>
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary">提交</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import ValidateInpute, { RulesType } from "../components/ValidateInpute.vue";
import ValidateForm from "../components/ValidateForm.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/store";
import createTiper from "../components/createTiper"
export default defineComponent({
  components: {
    ValidateInpute,
    ValidateForm,
  },
  props: {},
  setup() {
    const router = useRouter();
    const emailVal = ref("");
    const emailRules: RulesType = [
      { type: "required", message: "电子邮箱地址不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" },
    ];
    const passwordVal = ref("viking");
    const passwordRules: RulesType = [
      { type: "required", message: "密码不能为空" },
    ];
    const store = useStore<GlobalDataProps>(); //这是个钩子函数 必须在setup里面定义
    const onFormSubmit = async (result: boolean) => {
      if (result) {
        try {
          await store.dispatch("fetchToken", {
            email: emailVal.value,
            password: passwordVal.value,
          });
          await store.dispatch("fetchUserInfo");
          router.push({ name: "Home" });
          createTiper('成功','success',10*1000)
        } catch (error) {
          console.log("catch")
          createTiper('失败','error',10*1000)
        }
      }
    };
    return {
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFormSubmit,
    };
  },
});
</script>

<style></style>
