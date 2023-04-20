//detail模块的小仓库
import { reqAddShopCar, reqDetailList} from '@/api';
import {getUUID} from '@/utils/USER_ID'
let state = {
     //商品详情的数据
     detailInfo: {},
     uuid_token:getUUID()
};
let mutations = {
     GETDETAILINFO(state, detailInfo) {
          state.detailInfo = detailInfo;
     }
};
let actions = {

     async getDetailInfo({ state, commit, dispatch }, skuId) {
          //商品详情请求，需要携带商品ID
          let result = await reqDetailList(skuId);
          if (result.code == 200) {
               commit('GETDETAILINFO', result.data);
          }
          // console.log(result.data)
     },
     //添加到购物车中，只需向服务器提交信息，不需要返回结果
     async AddShopCar({commit},{skuId,skuNum}){
          let result = await reqAddShopCar(skuId,skuNum)
          // console.log(result)
          if(result.code == 200){
               return 'ok'
          }else{
             return  Promise.reject(new Error('faile'))
          }
     }
};
//项目中仓库的getters为了简化数据而生【组件获取数据更加方便】
let getters = {
//如果服务器没有及时返回数据，那么getters中detailInfo就是初始值一个空对象，空对象.categoryView即为undefined，传给组件会引起报错，所以当没有返回数据时候返回{}
  categoryView(state){
   return state.detailInfo.categoryView || {}
  },
  skuInfo(state){
  return state.detailInfo.skuInfo || {}
  },
  spuSaleAttrList(state){
     return state.detailInfo.spuSaleAttrList || []
  }
};

//对外暴露
export default {
     state,
     mutations,
     actions,
     getters
}