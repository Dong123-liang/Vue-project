<template>
  <div>
    <!-- 首页路由组件 -->
    <!-- 商品分类子组件 -->
    <typeNav></typeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like ref="like"></Like>
    <!-- 
       Floor标签,通过v-for动态生成
       父子组件通信:props

       问题:VC[Home]身上的floorList这个属性的属性值有几种情况?

       仓库floorList:起始值 空数组
       仓库floorList:不是空数组,代表服务器数据回来了。v-for渲染子组件完毕。给组件的props,就是两个对象
    
    -->
    <Floor v-for="(floor) in floorList" :key="floor.id" :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
//局部组件:引入、注册、使用
//全局组件：只需要在入口文件定义一次,直接使用
import ListContainer from "./listContainer";
import Recommend from "./recommend";
import Rank from "./rank";
import Like from "./like";
import Floor from "./floor";
import Brand from "./brand";
import { mapState } from "vuex";
export default {
  name: "MyHome",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  //组件挂载完毕钩子
  mounted() {
    this.$store.dispatch("getFloorList");
    // //挂载home页面时,派发请求，在请求拦截器中获取token，返回登录的用户信息
    // this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style scoped>
</style>
