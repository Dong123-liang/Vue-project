<template>
  <div class="spec-preview">
    <img :src="objInfo.imgUrl" />
    <div class="event"
         @mousemove="handler"></div>
    <div class="big" >
      <!-- 放大镜后的大图盒子 -->
      <img :src="objInfo.imgUrl" ref="big"/>
    </div>
    <div class="mask"
         ref="mask"></div><!-- 遮罩层 -->
  </div>
</template>

<script>
export default {
  name: "UseZoom",
  props: ['skuIamgeList'],
  data () {
    return {
      index: 0
    }
  },
  computed: {
    objInfo () {
      /* 如果服务器没有及时返回数据，那么skuIamgeList就是初始值一个空数组，空数组[0](此接口返回地类型为对象).imgUrl即为undefined，会引起报错，
      所以当没有返回数据时候返回{}(此数组的第零项为对象类型)*/
      return this.skuIamgeList[this.index] || {}
    }
  },
  mounted () {
    this.$bus.$on('GetcurrentImage', (curIndex) => this.index = curIndex)
  },
  methods: {
   handler (event) {
      // 计算遮罩层到相对定位盒子的距离，来改变遮罩层的位置
      let mask = this.$refs.mask
      let big = this.$refs.big
      let left = event.offsetX - mask.offsetWidth / 2
      let top = event.offsetY - mask.offsetHeight / 2
      // console.log(event.offsetX , left,top, big.offsetWidth , mask.offsetWidth)
      if (left <= 0) left = 0
      if (left >= 400 - mask.offsetWidth) { left = 400 - mask.offsetWidth   }
      if(top<= 0) top = 0
      if(top >= 400 - mask.offsetHeight ) { top =  400 - mask.offsetHeight}
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      big.style.left = - 2 * left +'px'//此项目中大图与遮罩层的比例为2，若不知道可以用下面的公式
      big.style.top =  - 2 * top +'px'
      //遮挡层移动距离/遮挡层移动的最大距离(400-mask.offsetWidth(200)) === 大图片移动的距离/大图片移动的最大距离(大图片宽度(800)-大盒子宽度(400))
    },
   }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;//400
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;//800
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>