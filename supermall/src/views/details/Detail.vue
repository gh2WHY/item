<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <div class="bgc" ref = 'scroll'>
      <scroll class="content">
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo = 'detailInfo'></detail-goods-info>
        <detail-params-info :paramInfo = 'paramInfo'></detail-params-info>
        <detail-comment-info :commentInfo = 'commentInfo'></detail-comment-info>
        <!-- <good-item :goods="recommendlist"></good-item> -->
      </scroll>
    </div>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from './childComps/DetailParamsInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo';

import Scroll from "../../components/common/BScroll/BScroll";
import GoodItem from '../../components/content/goods/GoodList';


import { getDetail, Goods, Shop,GoodsParam ,getRecommend} from "../../network/details.js";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo : {},
      commentInfo : {},
      recommendlist : [],
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodItem,
  },
  created() {
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then((res) => {
      let data = res.result;
      //1.获取轮播图相关数据
      this.topImages = data.itemInfo.topImages;
      //2. 获取商品描述信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3. 获取店铺相关信息
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5. 获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //6. 请求评论信息
      if(data.rate) {
        this.commentInfo = data.rate.list[0];
      }
    });
    getRecommend().then((res) => {
      this.recommendlist = res.data.list;
    })
  },
  methods : {
    imageLoad() {
      this.$refs.scroll.refresh();
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 11;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 11;
  background-color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow: hidden;
  background-color: #fff;
}
</style>