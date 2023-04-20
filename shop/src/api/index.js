//统一管理项目前部的接口
import requests from "./requests";
import mockRequests from './mockRequests';

//封装函数:复用
//将来这个函数可以在别的地方使用,需要对外暴露【分别暴露】
//获取商品分类的数据
export const reqCategory = () => {
   //箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
   //下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
   return requests({ method: 'get', url: '/product/getBaseCategoryList' });
}


//获取首页轮播图数据的接口
export const reqBannerList = () => mockRequests({ url: '/banner', method: 'get' });

//获取Floor数据接口
export const reqFloorList = ()=>mockRequests({url:'/floor',method:'get'});

//搜索模块的请求接口函数:
//将来根据不同的搜索条件,需要给服务器携带不同的参数
//请求体携带搜索的参数
//搜索的条件:data至少是一个空对象

export const reqSearchList = (data)=>requests({url:'/list',method:'post',data})



//详情模块商品的数据
export const reqDetailList = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});

//将商品信息添加购物车
//发送请求时，需要携带商品ID及其商品数量参数发送给服务器。
export const reqAddShopCar = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车数据
export const reqShopCart = () => requests({url:'/cart/cartList',method:"get"})

//点击删除对应商品
export const reqDeleteShop = (skuId)=> requests({url:`/cart/deleteCart/${skuId}`,method:"delete"})
//修改产品的状态
export const reqcheackCart =(skuID,isChecked) => requests({url:`/cart/checkCart/${skuID}/${isChecked}`,method:"get"})
//获取验证码
export const reqgetCode =(phone) => requests({url:`/user/passport/sendCode/${phone}`,method:"get"})
//提交注册信息
export const reqRegisterUser = (data) => requests({url:"user/passport/register",method:"post",data})
//提交登录信息
export const reqLogin=(data) => requests({url:"/user/passport/login",method:"post",data})
//登陆后获取用户信息
export const reqgetUserInfo = () => requests({url:"/user/passport/auth/getUserInfo",method:"get"})
//退出登录
export const reqLoginout = () => requests({url:'/user/passport/logout',method:"get"})
//获取交易商品数据
export const reqOrderInfo =() => requests({url:'/order/auth/trade',method:'get'})
//获取地址信息
export const reqAddressList =() => requests({url:"/user/userAddress/auth/findUserAddressList",method:"get"})
//提交订单
export const reqsubmitOrder=(tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})
//获取订单支付信息
export const reqPayment =(orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'}) 
//获取订单支付信息
export const reqQueryPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
//获取订单列表
export const reqMyPayList =(page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'})