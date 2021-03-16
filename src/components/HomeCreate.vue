<!--
 * @Author: 鱼小柔
 * @Date: 2021-03-07 14:22:10
 * @LastEditors: your name
 * @LastEditTime: 2021-03-07 14:27:31
 * @Description: 
-->
<template>
  <section class="home-create">
    <div class="img-container">
      <img src="../assets/home-create.svg" alt="" />
    </div>
    <h1>随心写作 自由表达</h1>
    <router-link class="btn btn-primary" :to="{ name: 'CreatePost' }"
      >开始写文章</router-link
    >
  </section>
</template>

<script>
export default {};
</script>

<style>
.home-create{
    margin-bottom: 40px;
}
.home-create .img-container {
  width: 100%;
  height: 250px;
}
.home-create .img-container img {
  width: 100%;
  height: 100%;
}
</style>