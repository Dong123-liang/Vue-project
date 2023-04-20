<template>
  <!--banner轮播-->
  <div class="swiper-container">
    <!-- swiper-wrapper里面每一个slider即为一张图片 -->
    <div class="swiper-wrapper">
      <div class="swiper-slide"
           v-for="(item) in List"
           :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>

</template>

<script>
//swiper使用步骤:
//第一步:引入依赖包、样式
import Swiper from "swiper/swiper-bundle";

export default {
  name: 'UseCarousel',
  props: ['List'],
  watch: {
    List: {
      //能在这里直接初始化Swiper类的实例吗?
      //不能在当前状态直接初始化Swiper类的实例,因为这里只能保证数据发生变化了[服务器数据回来了],
      //但是你不能保证v-for遍历的结构完事了.
      immediate: true,
      handler (newvalue, oldvalue) {
        this.$nextTick(() => {
          //初始化Swiper类的实例
          var mySwiper = new Swiper('.swiper-container', {
            //设置轮播图防线

            direction: "horizontal",
            //开启循环模shi
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //分页器类型
              type: "bullets",
              //点击分页器，切换轮播
              clickable: true,
            },
            //自动轮播
            autoplay: {
              delay: 2000,
              //新版本的写法：目前是5版本
              pauseOnMouseEnter: true,
              //如果设置为true，当切换到最后一个slide时停止自动切换
              stopOnLastSlide: true,
              //用户操作swiper之后，是否禁止autoplay
              disableOnInteraction: false,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            //切换效果
            // effect: "cube",
          });

          //1:swiper插件,对外暴露一个Swiper构造函数
          //2:Swiper构造函数需要传递参数 1、根节结构总点CSS选择器|根节点真实DOM节点  2、轮播图配置项
          //鼠标进入停止轮播
/*           mySwiper.el.onmouseover = function () {
            mySwiper.autoplay.stop();
          };
          //鼠标离开开始轮播
          mySwiper.el.onmouseout = function () {
            mySwiper.autoplay.start();
          }; */


        });
      },
    },
  }
}
</script>

<style>
</style>