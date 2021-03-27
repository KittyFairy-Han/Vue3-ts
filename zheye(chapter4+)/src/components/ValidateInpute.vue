<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-20 11:08:18
 * @LastEditors: your name
 * @LastEditTime: 2021-03-13 19:47:18
 * @Description: 输入验证
-->
<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      type="text"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    >
    </textarea>
    <span v-if="inputRef.error" class="invalid-feedback">{{
      inputRef.message
    }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted } from "vue";
import { emitter } from "./ValidateForm.vue";

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
interface RuleProp {
  type: "required" | "email" | "custom";
  message: string;
  validator?: (v: string) => boolean;
}
export type RulesType = RuleProp[];
export type TagType = "input" | "textarea";
export default defineComponent({
  components: {},
  props: {
    rules: Array as PropType<RulesType>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: "input",
    },
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || "",
      error: false,
      message: "",
    });
    // console.log(inputRef, context.attrs);
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      //   console.log(targetValue)
      context.emit("update:modelValue", targetValue);
    };
    const validateInput = () => {
      let pass = true;
      props.rules?.every((rule) => {
        switch (rule.type) {
          case "required":
            pass = inputRef.val.trim() !== "";
            break;
          case "email":
            pass = emailReg.test(inputRef.val);
            break;
          case "custom":
            pass = rule.validator ? rule.validator(inputRef.val) : true;
            break;
          default:
            break;
        }
        // 用every方法，当有一个规则验证不通过的时候就不验证下一个规则了。
        inputRef.message = rule.message;
        inputRef.error = !pass;
        // console.log(rule,pass)
        return pass;
      });
      return pass;
    };

    onMounted(() => {
      emitter.emit("form-item-created", validateInput);
    });
    return {
      inputRef,
      updateValue,
      validateInput,
    };
  },
});
</script>

<style lang="less"></style>
