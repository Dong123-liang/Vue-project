<template>
  <!--banner轮播-->
  <div class="swiper-container">
    <!-- swiper-wrapper里面每一个slider即为一张图片 -->
    <div class="swiper-wrapper">
      <div class="swiper-slide"
           v-for="(item) in List"
           :key="item.id">
        <img :src="item.imgUrl"
             width="100%"
             height="100%" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev swiper-button-white"></div>
    <div class="swiper-button-next swiper-button-white"></div>
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

          });
        })
      }
    }
  }
}
  </script>

<style>
.swiper-container {
  height: 100%;
  width: 100%;
}
:root{
  --swiper-theme-color:#f56c6c!important
}
</style>