<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
          <!-- 遍历数组records渲染每页显示几笔订单 -->
        <table class="order-item"
               v-for='(payInfoList) in payInfoList.records' 
               :key="payInfoList.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle">{{ payInfoList.createTime }}　订单编号：{{ payInfoList.outTradeNo}}<span class="pull-right delete"><img src="../images/delete.png"></span></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- 遍历records数组下的orderDetailList数组,具体展示每笔订单里的商品信息 -->
            <tr v-for="(orderDetailList,index) in payInfoList.orderDetailList"
                :key="orderDetailList.id">
              <td width="60%">
                <div class="typographic">
                  <img :src="orderDetailList.imgUrl" width="100px" height="90px">
                  <a href="#"
                     class="block-text">{{  orderDetailList.skuName}}</a>
                  <span>x{{orderDetailList.skuNum}}</span>
                  <a href="#"
                     class="service">售后申请</a>
                </div>
              </td>
              <td :rowspan="payInfoList.orderDetailList.length"
                  v-if="index==0"
                  width="8%"
                  class="center">{{ payInfoList.consignee }}</td>
              <td :rowspan="payInfoList.orderDetailList.length"
                  v-if="index==0"
                  width="13%"
                  class="center">
                <ul class="unstyled">
                  <li>总金额¥{{orderDetailList.splitTotalAmount}}</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td :rowspan="payInfoList.orderDetailList.length"
                  v-if="index==0"
                  width="8%"
                  class="center">
                <a href="#"
                   class="btn">{{ payInfoList.orderStatusName }} </a>
              </td>
              <td :rowspan="payInfoList.orderDetailList.length"
                  v-if="index==0"
                  width="13%"
                  class="center">
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html"
                       target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
        <!-- 使用分页器组件 -->
        <UsePagination     :total="payInfoList.total"
                           :pageSize="payInfoList.size"
                           :pageNo="page"
                           :pagerCount="5"
                           @currentPage="currentPage"></UsePagination>
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "myOrder",
  data () {
    return {
      page: 1,
      limit: 3,
      payInfoList: {}
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      let result = await this.$http.reqMyPayList(this.page, this.limit)
      console.log(result)
      if (result.code == 200) {
        this.payInfoList = result.data
      } else {
        return alert(result.message)
      }
    },
    currentPage(page){
        this.page = page
        this.getData()
    }
  }
};
</script>

<style scoped>
</style>
