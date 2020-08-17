<template>
  <div class="nav-bar">
    <nav-bar>
      <div slot="left" class="left" @click="backHome">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div 
            v-for="(item,index) in titles" 
            :key="index" 
            class="title-item"
            :class="{active : currentIndex === index}"
            @click="navClick(index)"
            >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex : 0,
    };
  },
  components: {
    NavBar,
  },
  methods : {
    backHome() {
      this.$router.back();
    },
    navClick(index) {
      this.currentIndex = index;
    }
  }
};
</script>

<style scoped>
  .left > img {
    margin-top : 10px;
  }
  .title {
    display: flex;
  }

  .title .title-item {
    flex: 1;
    text-align: center;
  }

  .active {
    color: var(--color-high-text);
  }
</style>