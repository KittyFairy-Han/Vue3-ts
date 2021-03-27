<!--
 * @Author: 鱼小柔
 * @Date: 2021-03-21 11:10:01
 * @LastEditors: your name
 * @LastEditTime: 2021-03-21 19:24:30
 * @Description: 上传组件
-->
<template>
  <div class="file-upload">
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    />
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot></slot>
      <!-- 只能用 v-if 不能用 v-show -->
      <slot name="ready" v-if="fileStatus === 'ready'"
        ><button class="btn btn-primary">点击上传</button></slot
      >
      <slot name="loading" v-if="fileStatus === 'loading'"
        ><button class="btn btn-primary">正在上传</button></slot
      >
      <slot
        name="file-uploaded-success"
        v-if="fileStatus === 'success'"
        :uploadedData="uploadedData"
        ><button class="btn btn-primary">上传成功</button></slot
      >
      <slot name="file-uploaded-error" v-if="fileStatus === 'error'"
        ><button class="btn btn-primary">上传失败</button></slot
      >
    </div>
  </div>
</template>

<script lang=ts>
import axios from "axios";
import { defineComponent, PropType, ref } from "vue";
type UploadStatus = "ready" | "loading" | "success" | "error";
type CheckFunction = (file: File) => boolean;
export default defineComponent({
  inheritAttrs: false,
  props: {
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>,
    },
  },
  emits: ["file-uploaded-success", "file-uploaded-error"],
  setup(props, context) {
    const fileInput = ref<HTMLInputElement | null>(null);
    const fileStatus = ref<UploadStatus>("ready");
    const uploadedData = ref();
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click(); //代码触发input点击
      }
    };
    const handleFileChange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        const uploadFile = files[0];
        if (props.beforeUpload) {
          const result = props.beforeUpload(uploadFile);
          if (!result) {
            return;
          }
        }
        fileStatus.value = "loading";
        const formData = new FormData();
        formData.append(uploadFile.name, uploadFile);
        try {
          const result = await axios.post("/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          // console.log(result);
          uploadedData.value = result.data.data;
          fileStatus.value = "success";
          context.emit("file-uploaded-success",result.data.data);
        } catch (error) {
          fileStatus.value = "error";
          context.emit("file-uploaded-error", error);
        }
        if (fileInput.value) {
          fileInput.value.value = "";
        }
      }
    };
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange,
      uploadedData,
    };
  },
});
</script>

<style>
</style>
