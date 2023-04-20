import { reqgetCode,reqRegisterUser } from "@/api";
let actions={
 async getCode({commit},phone){
   let result =  await reqgetCode(phone)
	 if(result.code == 200){
	 commit('GETCODE',result.data)
	 }else{
		return  Promise.reject(new Error('faile') )
	 }
 },
 async registerUser({commit},data){
let result =  await reqRegisterUser(data)
if(result.code == 200){
	return 'ok'
}else{
	return Promise.reject(new Error(result.message))//返回错误信息
}
 }
}
let mutations={
GETCODE(state,code){
	state.code = code
	},
}
let state={
  code:''
}

export default{
	actions,
	mutations,
	state

}