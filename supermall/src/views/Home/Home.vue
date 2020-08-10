<template>
  <div>
    <nav-bar class="home-nav">
        <slot slot = 'center'>购物街</slot>
    </nav-bar>
    <h2 class="title">首页</h2>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
export default {
 name: "Home",
  components: {
    NavBar
  } ,
};
</script>

<style>
.title {
  color: orange;
}

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  } 
</style>