/*
 * @Author: 鱼小柔
 * @Date: 2021-02-18 22:00:23
 * @LastEditors: your name
 * @LastEditTime: 2021-02-18 22:32:25
 * @Description: axios
 */
import { ref } from "vue";
import axios from "axios";

export default function useURLLoader<T>(url: string) {
  const result = ref<T | null>(null);
  const loading = ref(true);
  const loaded = ref(false);
  const error = ref(null);
  axios
    .get(url)
    .then((rawData) => {
      loading.value = false;
      loaded.value = true;
      result.value = rawData.data;
    })
    .catch((e) => {
      error.value = e;
      loading.value = false;
    });
  return {
    result,
    loading,
    loaded,
    error,
  };
}
