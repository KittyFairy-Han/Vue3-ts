<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-28 20:31:18
 * @LastEditors: your name
 * @LastEditTime: 2021-03-13 11:47:53
 * @Description: file content
-->

<template>
  <div class="create-post-page">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputTitle" class="form-label">文章标题</label>
        <validate-inpute
          v-model="titleVal"
          :rules="titleRules"
          type="text"
          placeholder="请输入文章标题"
        ></validate-inpute>
      </div>
      <div class="mb-3">
        <label for="exampleInputContent" class="form-label">文章内容</label>
        <validate-inpute
          rows="10"
          v-model="contentVal"
          :rules="contentRules"
          type="text"
          tag="textarea"
          placeholder="请输入文章内容"
        ></validate-inpute>
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import ValidateInpute, { RulesType } from "../components/ValidateInpute.vue";
import ValidateForm from "@/components/ValidateForm.vue";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/store";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { ValidateForm, ValidateInpute },
  name: "CreatePost",
  props: {
    msg: String,
  },
  setup() {
    const router = useRouter();

    const store = useStore<GlobalDataProps>();

    const titleVal = ref("");
    const titleRules: RulesType = [
      { type: "required", message: "文章标题不能为空" },
    ];
    const contentVal = ref("");
    const contentRules: RulesType = [
      { type: "required", message: "文章内容不能为空" },
    ];

    const onFormSubmit = (result: boolean) => {
      if (result) {
        store.commit("createPost", {
          title: titleVal.value,
          content: contentVal.value,
        });
        console.log(store.state.user)

        if (store.state.user.column) {
          router.push({
            name: "Column",
            params: { id: store.state.user.column },
          });
        }
      }
    };

    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      onFormSubmit
    };
  },
});
</script>

