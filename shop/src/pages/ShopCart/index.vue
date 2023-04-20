<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list"
            v-for="(cartInfo) in cartInfoList"
            :key="cartInfo.id">
          <li class="cart-list-con1">
            <input type="checkbox"
                   name="chk_list"
                   :checked='cartInfo.isChecked'
                   @change="changeCart(cartInfo,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{cartInfo.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)"
               class="mins"
               @click=" minusSkuNum(cartInfo)">-</a>
            <input autocomplete="off"
                   type="text"
                   :value=cartInfo.skuNum
                   @blur="changeSkuNum(cartInfo, $event)"
                   minnum="1"
                   class="itxt">
            <a href="javascript:void(0)"
               @click="addSkuNum(cartInfo)"
               class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum * cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet"
               @click="deleteShop(cartInfo)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll"
               type="checkbox"
               :checked="isAllChecked"
               :disabled="cartInfoList.length == 0"
               @click="updateAllChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none"
           @click='deleteCheckCart()'>删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ checkedCartNum }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ TotalPrice }}</i>
        </div>
        <div class="sumbtn">
             <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
//按需引入lodash节流函数
import throttle from "lodash/throttle";
//按需引入lodash防抖函数
import debounce from "lodash/debounce";
export default {
  name: 'ShopCart',
  mounted () {
    this.getShopCartdata()
  },
  methods: {
    getShopCartdata () {
      this.$store.dispatch('getShopCart')
    },
    //全选的业务 
    async updateAllChecked (e) {
      //获取全选的复选框勾选的状态,接口需要的1|0
      let isChecked = e.target.checked ? "1" : "0";
      try {
        //await等待成功:购物车全部商品勾选状态成功以后
        await this.$store.dispatch("allUpdateChecked", isChecked);
      
        this.getShopCartdata()
      } catch (error) {
        alert('修改失败');
      }
    },
/*     updateAllChecked  (event) {
          console.log(event.target.checked)
          this.cartInfoList.forEach((arr) => {
            let isChecked = event.target.checked ?'1':'0'
            try{
          let result = this.$store.dispatch('CheckCart', { skuId: arr.skuId, isChecked:isChecked})
          console.log(result)
         this.getShopCartdata()
            }catch(e){
            alert(e.message)
            }
          })
         
        },  */
    //手动修改产品的数量
    /*     async handler (type, disNum, cart) {  //使用按钮改变数量的时候需要使用节流，否则减会出现负数
          //type 判断用户点击的加或减或重新输入
          //disNum 新值与旧值的差
          //cart 获取用户的id
          switch (type) {
            case 'minus': disNum > 1 ? -1 : 0
              break;
            case 'add': disNum = 1
              break;
            case 'change': if (isNaN(disNum) || disNum < 0) {
              disNum = 0
            } else {
              disNum = parseInt(disNum) - cart.skuNum
            }
          }
          try {
            await this.$store.dispatch('AddShopCar', { skuId: cart.skuId, skuNum: disNum })//将更新后的用户id信息及其改变的数量提交给服务器
            this.getShopCartdata()//获取服务器返回的数据
          }
          catch (error) {
            alert(error.message)
          }
        },*/
    throttle (fn, time) {
      let flag = false
      return function () {
        if (flag) return

        flag = true
        setTimeout(() => {
          fn()
          flag = false
        }, time)
      }
    },
    debounce (fn, time) {
      let timer = null;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn();
        }, time);
      };
    },
    async addSkuNum (cart) {
      //整理参数
      let params = { skuId: cart.skuId, skuNum: 1 };
      //发请求:通知服务器修改当前商品的个数
      //再次获取购物车的最新的数据：保证这次修改数据完毕【成功以后在获取购物车数据】
      try {
        //修改商品个数成功
        await this.$store.dispatch('AddShopCar', params);
        //再次获取最新的购物车的数据
        this.getShopCartdata();
      } catch (error) {
        alert("修改数量失败");
      }
    },
    //修改商品数据-减的操作
    minusSkuNum: throttle(async function (cart) {
      if (cart.skuNum > 1) {
        //整理参数:至少加入购物车的数量最低1个
        let params = { skuId: cart.skuId, skuNum: -1 };
        //修改商品的数据
        try {
          //修改商品的个数、成功以后再次获取购物车的数据
          await this.$store.dispatch('AddShopCar', params);
          this.getShopCartdata();
        } catch (error) { }
      }
    }, 2000),
    changeSkuNum: debounce(async function (cart, e) {

      //整理参数
      let params = { skuId: cart.skuId };
      //计算出SkuNum携带的数据
      let userResultValue = e.target.value * 1;
      //用户输入完毕，最终结果【非法条件】
      if (isNaN(userResultValue) || userResultValue < 1) {
        params.skuNum = 0;
      } else {
        //正常情况
        params.skuNum = parseInt(userResultValue) - cart.skuNum;
      }
      //发请求：修改商品的个数
      try {
        //修改商品的个数、成功以后再次获取购物车的数据
        await this.$store.dispatch('AddShopCar', params);
        this.getShopCartdata();
      } catch (error) { }
    }, 500),
   //删除商品
    async deleteShop (cartInfo) {
      try {
        console.log(cartInfo)
        await this.$store.dispatch('DeleteShop', cartInfo.skuId)
        this.getShopCartdata()
      } catch (error) {
        alert(error.message)
      }
    },
    //改变商品选中的状态
    async changeCart (cartInfo, event) {
      try {
        let isChecked = event.target.checked ? 1 : 0
        await this.$store.dispatch('CheckCart', { skuId: cartInfo.skuId, isChecked: isChecked })
        this.getShopCartdata()
      } catch (error) {
        return error.maseege
      }
    },
    //删除已选中的商品
async deleteCheckCart(){
  try{
  await  this.$store.dispatch('deleteAllCart')
  this.getShopCartdata()
  }catch(error){
    alert(error.message)
  }
}
  },

  computed: {
    ...mapGetters(['cartList']),
    cartInfoList () {
      return this.cartList.cartInfoList || []
    },
    //计算总价
    TotalPrice () {
      let sum = 0
      this.cartInfoList.forEach((arr) => {
        if(arr.isChecked == 1)
        sum += arr.skuNum * arr.cartPrice
      })
      return sum
      //      return this.cartInfoList.reduce((a, b) => a + b.skuPrice * b.skuNum, 0); ES6reduce方法
    },
    isAllChecked () {
      return this.cartInfoList.every((arr) => arr.isChecked == 1)
    },
    checkedCartNum(){
      let sum = 0 
      this.cartInfoList.forEach((arr)=>{  
        if(arr.isChecked == 1) sum += arr.skuNum 
      })
      return sum
    }
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>