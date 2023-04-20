import { reqShopCart,reqDeleteShop, reqcheackCart} from "@/api"
export default{
	actions:{
		//获取购物车数据
    async getShopCart({commit}){
			let result = await reqShopCart()
			if(result.code == 200){
			commit('CARTLIST',result.data)
			// console.log(result.data)
		}
	},
	//删除对应的产品
	async	DeleteShop({commit},skuId){
		let result = await reqDeleteShop(skuId)
	if(result.code == 200){
		// console.log(result)
		return 'ok'
	}else{
		return Promise.reject(new Error('faile'))
	}
	},
	//修改产品的状态
	async CheckCart({commit},{skuId,isChecked}){
		let result = await reqcheackCart(skuId,isChecked)
		// console.log(`*********`,result)
		if(result.code == 200){
			return 'ok'
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	     //修改全部商品的勾选的状态
	allUpdateChecked({ commit, state, dispatch }, isChecked) {
		let arr = [];
				//获取购物车商品的个数,进行遍历
				state.cartList[0].cartInfoList.forEach(item => {
						 //调用修改某一个商品的action【四次】
						 let ps = dispatch("CheckCart", { skuId: item.skuId, isChecked });
			
						 arr.push(ps);
				})
				//Promise.all():参数需要的是一个数组【数组里面需要promise】
				//Promise.all()执行一次,返回的是一个Promise对象,Promise对象状态：成功、失败取决于什么?
				//成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！！
				return Promise.all(arr);
	}, 
	deleteAllCart({state,dispatch}){
		let arr = []
    state.cartList[0].cartInfoList.forEach(item =>{
      if(item.isChecked == 1){
        let ps = dispatch('DeleteShop',item.skuId)
        arr.push(ps)
      }
    })
    return Promise.all(arr)
	}
},
	mutations:{
   CARTLIST(state,cartList){
 		state.cartList = cartList
	 }
	},
	state:{
		cartList:[]
	},
	getters:{
		cartList(state){
		return state.cartList[0] || {}
		}
	},
}