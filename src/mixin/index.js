export const mixin ={
	data(){
		return{
			url:'http://211.69.238.167:8090/'
		}
	},
    methods:{
		//判断是否处于登录状态
		async isLogin(){
			const {data : res} =await this.$http.post('/checkLogin')
			if(res.meta.status === 200){
				console.log("尚未登录");
				return false
			}
			console.log("已经登录");
			return true
		},
		async getUserInfo() {
			const {data : res} =await this.$http.post('/getUserInfo')
			console.log("获取到的用户信息",res)
			if(res.meta.status === 201){
				window.sessionStorage.setItem('userInfo',JSON.stringify(res.data.userInfo) )
				this.$store.commit('SetUserInfo',res.data.userInfo)
			}
          },
		blogView(blogId){
			let routeUrl=this.$router.resolve
				({path:'/blogView',query:{blogId:blogId, store:JSON.stringify(this.$store.state)}})
			window.open(routeUrl.href, '_blank');
		},
		checkReq(status){
            if(status === 201){
                return true
            }
            return false
        },
		//退出登录
		logOut(){
			//销毁session
			window.sessionStorage.clear();
			this.$store.commit('LoginOut')
			this.$router.push('/home')
			return this.$message.success('退出账号成功!')
		},
    }
}