<template>
  <div id = 'home'>
    <nav-bar class="home-nav"><slot slot="center">购物街</slot></nav-bar>
    <home-swiper class="swiper" :banners="banners"/>
    <home-recommend :recommends = 'recommends'></home-recommend>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles =" ['流行','新款','精选']"></tab-control>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2><h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
      <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>
    <h2 class="title">首页</h2>

  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from '../../components/content/tabControl/tabControl'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend';
  import FeatureView from './childComps/featureView'

  import {getHomeMultidata} from "network/home";
  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      TabControl,
    },
    data() {
      return {
        banners: [],
        recommends: [],
      };
    },
    created() {
      getHomeMultidata().then((res) => {
        // // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // this.feature = res.data.
        // console.log(this.recommends);
      });
    },
  };
</script>

<style>
.title {
  color: orange;
}

#home {
  padding-top : 44px;
}

.home-nav {
  position: fixed;
  top : 0;
  left : 0;
  right : 0;
  z-index : 10;
  background-color: var(--color-tint);
  color: #fff;
} 

.tab-control {
  position: sticky;
  top : 44px;
}

</style>