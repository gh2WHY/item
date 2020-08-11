<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar class="tabbar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabBar/mainTabBar";
export default {
  name: "app",
  components: {
    MainTabBar,
  },
};
</script>

<style>
  @import 'assets/css/base.css';
  .tabbar {
    background-color: #fff;
  }
</style>
