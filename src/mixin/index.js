export const mixin ={
	data(){
		return{
			url:'http://211.69.238.167:8090/'
		}
	},
    methods:{
		checkReq(status){
            if(status === 201){
                return true
            }
            return false
        }
    }
}