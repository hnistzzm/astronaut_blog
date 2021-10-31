//该文件用于创建Vuex中最核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

Vue.use(Vuex)

//准备actions--用于响应组件中的动作
const actions = {
  
}
//准备mutations--用于操作数据(state)
const mutations = {
    SetToken(state,value){
        state.token = value
    },
    SetUserInfo(state,value){
        state.userInfo = value
    },
    SetLoginState(state,value){
        console.log("修改登录状态",value);
        state.loginState = value
    },
    IsLogin(state,value){
        state.loginState = value
    },
    LoginOut(state){
        state.token = ''
        state.userInfo = {}
        state.loginState = false
    }
}
//准备state--用于存储数据
const state = {
    token:'' ,
    userInfo:{},
    loginState:false
}
//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})