import { reqOrderInfo , reqAddressList} from "@/api";
const actions = {
  async getOrderInfo ({commit}) {
		let result = await reqOrderInfo()
	 console.log(result)
	 if(result.code == 200){
	 commit('GETORDERINFO',result.data) 
	}else{
		return Promise.reject(new Error(result.message))
	}
},
async getAddressInfo ({commit}) {
	let result = await reqAddressList()
 console.log(result)
  if(result.code == 200){
  commit('GETADDRESSINFO',result.data) 
}else{
	return Promise.reject(new Error(result.message))
}
}

}
const mutations = {
 GETORDERINFO (state,orderInfo){
	state.OrderInfo = orderInfo
 },
 GETADDRESSINFO(state,info){
	state.addressInfo = info
 }

}
const state ={
OrderInfo:{},
addressInfo:[]
}
export default{
	actions,
	mutations,
	state
}
