import {reqLogin,reqgetUserInfo,reqLoginout} from '@/api'
const actions ={
	async userLogin({commit},data){
		let result =  await reqLogin(data)
		// console.log(result)
		if(result.code == 200){
			commit('USERLOGIN',result.data.token)
			localStorage.setItem('token',result.data.token)//存储token 
		}else{
			return Promise.reject(new Error('登录失败'))
		}
	},
	async getUserInfo({commit}){
		let result = await reqgetUserInfo()
		// console.log(result)
		if(result.code == 200){
			commit("GETUSERINFO",result.data)
			return 'ok'
		}else{
			return Promise.reject(new Error(result.messge))
		}
	},
	async LoginOut({commit}){
	  let result =  await reqLoginout()
		if(result.code ==200){ 
		commit('LOGINOUT')
		return 'ok'
	}else{
		return Promise.reject(new Error(result.messge))
	}
	}

}
const mutations={
	USERLOGIN(state,token){
    state.token = token

	},
	GETUSERINFO(state,Info){
		state.UserInfo = Info
	},
	LOGINOUT(state){
		state.token = localStorage.removeItem('token')
		state.UserInfo = {}
	}
}
const state={
	token:localStorage.getItem('token'),
	UserInfo:{}
}
export default{
	actions,
	mutations,
	state
}
