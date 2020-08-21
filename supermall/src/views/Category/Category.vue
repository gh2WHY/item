<template>
  <div id="category">
    <nav-bar class="nav"><div slot = 'center'>商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"></tab-menu>
    </div>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'

  import TabMenu from './childComps/TabMenu'

  //导入获取数据的方法
  import {getCategory} from "network/category";
  export default {
    name: "Category",
    data() {
      return {
        categories: [],
      }
    },
    components : {
      NavBar,
      TabMenu
    },
    created(){
      this.getCategory()
    },
    methods : {
      getCategory() {
        getCategory().then(res => {
          this.categories = res.data.category.list;
        })
      }
    },
    
 
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }
  
 .nav {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
