<template>
  <el-container>
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1"> 
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logout() {
      //清空token,跳转回登录页
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang = 'less' scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    background-color: #373d41;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  }
}
</style>