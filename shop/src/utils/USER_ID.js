import { v4 as uuidv4} from 'uuid'
export const getUUID =()=> {
let	userId = localStorage.getItem('USERTEMPID') 
	if(!userId){
		userId = uuidv4()
		userId = localStorage.setItem('USERTEMPID',userId)
	 }
	 return userId
}