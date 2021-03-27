<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-28 20:31:18
 * @LastEditors: your name
 * @LastEditTime: 2021-03-21 23:15:26
 * @Description: file content
-->

<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <uploader
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      action="api/upload"
      :beforeUpload="beforeUpload"
      @file-uploaded-success="handleUploadedSuccess"
    >
      <template #ready>
        <h2>click to upload avatar</h2>
      </template>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-primary" role="status"></div>
          <!-- <span class="sr-only">Loading...</span> -->
        </div>
        <h2>正在上传</h2>
      </template>
      <template #file-uploaded-success="dataProps">
        <img :src="dataProps.uploadedData.url" alt="" />
        <div></div>
      </template>
    </uploader>

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
import Uploader from "@/components/Uploader.vue";
import { ImageProps } from "../store/index";
import { commonUploadCheck } from "../common/helper";
import createTiper from "@/components/createTiper";
export default defineComponent({
  components: { ValidateForm, ValidateInpute, Uploader },
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

    let imgid = "";

    const beforeUpload = (file: File) => {
      const { passed, error } = commonUploadCheck(file, {
        format: ["image/jpeg", "image/png"],
        size: 1,
      });
      if (!passed) {
        createTiper(error.join(","), "error");
      } else {
        return true;
      }
    };

    const handleUploadedSuccess = (data: ImageProps) => {
      imgid = data._id as string;
      console.log(data);
    };

    const onFormSubmit = async (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user;
        try {
          await store.dispatch("createPost", {
            image: imgid,
            title: titleVal.value,
            content: contentVal.value,
            column,
            author: _id,
          });
          // console.log(store.state.user);
          debugger;

          createTiper("发表成功，2秒后跳转到所属专栏", "success", 2000);
          setTimeout(() => {
            if (column) {
              router.push({
                name: "Column",
                params: { id: column },
              });
            }
          }, 2000);
        } catch (error) {
          createTiper("发表失败","error")
        }
      }
    };

    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      beforeUpload,
      handleUploadedSuccess,
      onFormSubmit,
    };
  },
});
</script>
<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>

