<template>
    <div class="Home">
        <!-- 背景 -->
        <div class="stars"></div>
        <div class="moon"></div>
        <!--    顶部导航栏-->
        <header class="TopMenu">
              <div class="navbar">
                  <ul class="navbar-ul">
                      <li><span>首页</span></li>
                      <li @click="blogCenterRoute"><span>博客</span></li>
                      <li @click="aboutDialogVisible=true"><span>关于</span></li>
                      <li @click="contactDialogVisible=true"><span>一起学习</span></li>
                  </ul>
              </div>
              <div class="user-info" v-if="loginState">
                  <el-dropdown @command="userRouter">
                      <span class="el-dropdown-link">
                            <el-image :src="url+userInfo.userHeadPortrait" v-if="userInfo.userHeadPortrait"></el-image>
                      </span>
                      <el-dropdown-menu slot="dropdown" split-button="true">
                          <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
                          <el-dropdown-item command="myBlog">我的博客</el-dropdown-item>
                          <el-dropdown-item >内容管理</el-dropdown-item>
                          <el-dropdown-item command="layout">退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
              </div>
              <div class="login" v-else>
                  <el-button  type="primary" icon="el-icon-user-solid" @click="loginDialogVisible = true">登录</el-button>
              </div>
        </header>
        <!-- 内容区域 -->
        <div class="middle">
            <p class="my-self">Dance In Bytes</p>
            <p class="great-word">须知少年凌云志,曾许人间第一流</p>
        </div>
      <!--  点击"联系" 弹出对话框-->
          <el-dialog title="联系作者" :visible.sync="contactDialogVisible" width="40%">
              <el-card class="contactCard">
                <span>您可以通过扫描下方二维码联系作者</span>
                <div>
                    <el-image :src="require('../static/image/wxImage.jpg')" style="height: 300px;width: 300px"></el-image>
                </div>
              </el-card>
          </el-dialog>
      <!--点击”关于“ 弹出对话框-->
          <el-dialog title="关于本网站" :visible.sync="aboutDialogVisible" width="40%">
              <el-card>
                  <span>
                    这是我人生中第一个独立编写的网站,前端计划采用vue+element+bootstrap为基础，后端计划采用node.js(目前水平有限,未来可能会用更完备的后端框架来重构)，
                    这个网站只是为了对自己学过的知识进行实践，暂时没有明确这个网站的功能，这是一个想到什么好的点子就写什么的网站。目前来看，我计划做一个博客功能，记录自己的
                    学习经验.
                  </span><br>
                  <span style="float: right">2020/7/6</span>
              </el-card>
          </el-dialog>

          <el-card class="login-box" v-if="loginDialogVisible">
              <i  class="el-icon-close login-cancel" @click="loginDialogVisible=false"></i>
            <!-- 登录表单 -->
              <div v-if="loginFormState" :class="['register-state','register-state-change']">
                  <div class="login-form">
                      <p class="login-cue-word">Sign in to website</p>
                      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
                          <el-form-item>
                              <el-input v-model="loginForm.userId" prop="userId" prefix-icon="el-icon-user"></el-input>
                          </el-form-item>
                          <el-form-item>
                              <el-input v-model="loginForm.passWord" prop="passWord" prefix-icon="el-icon-lock"></el-input>
                          </el-form-item>
                      </el-form>
                      <el-button @click="UserLogin">SIGN IN</el-button>
                  </div>
              </div>

              <!-- 注册表单 -->
              <div v-if="registerFormState" :class="['login-state','login-state-change']">
                  <div class="login-form">
                      <p class="login-cue-word">Sign up to website</p>
                      <el-form :model="registerForm" :rules="registerFormRules" ref="registerFormRef">
                          <el-form-item  prop="nickName">
                              <el-input v-model="registerForm.nickName" prefix-icon="el-icon-user"></el-input>
                          </el-form-item>
                          <el-form-item  prop="passWord">
                              <el-input v-model="registerForm.passWord"  show-password prefix-icon="el-icon-lock"></el-input>
                          </el-form-item>
                      </el-form>
                      <el-button @click="UserRegister">SIGN UP</el-button>
                  </div>
              </div>
              <div v-if="loginFormState" :class="['welcome-box-left','welcome-box-left-change']">
                  <div class="description">
                      <p class="description-word">欢迎登录</p>
                      <el-button  @click="loginFormState = !loginFormState;registerFormState=!registerFormState;">SIGN UP</el-button>
                  </div>
              </div>
              <div v-if="registerFormState" :class="['welcome-box-right','welcome-box-change']">
                  <div class="description">
                      <p class="description-word">欢迎注册</p>
                      <el-button  @click="loginFormState = !loginFormState;registerFormState=!registerFormState;">SIGN IN</el-button>
                  </div>
              </div>
          </el-card>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
      return{
          loginFormState:true,
          registerFormState:false,
          //联系作者对话框
          contactDialogVisible:false,
          aboutDialogVisible:false,
          loginDialogVisible:false,
          registerDialogVisible:false,
          //登录的表单
          loginForm:{
            userId:'957957209',
            passWord:'123'
          },
          registerForm:{
            nickName:'',
            passWord:''
          },
          //存放用户信息的列表
          loginFormRules:{
            userId:[
              { required: true, message: '请输入昵称', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
            ],
            passWord: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
            ]
          },
          registerFormRules:{
            nickName:[
              { required: true, message: '请输入昵称', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
            ],
            passWord: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
            ]
          }

        }
    },
    computed:{
      ...mapState(['loginState','userInfo'])
    },
    created(){
      this.isLogin()
    },

    methods:{
        handleCommand(e){
          console.log(e)
          if(e === 'c'){
            this.logOut()
          }
        },

        //点击"联系"按钮，弹出联系作者对话框
        contactDialogShow(){
          this.contactDialogVisible = true
        },
        //点击"关于"按钮，弹出about对话框
        aboutDialogShow(){
          this.aboutDialogVisible = true
        },
        //检查登录状态
        async checkLoginState(){
          const {data : res} = await this.$http.post('/checkLogin')
          if(res.meta.status === 201){
            this.userInfo = res.data.userInfo
          }else{

          }
          console.log("check",res)
        },
        //点击“登录”
        UserLogin(){
          console.log(this.loginForm)
            this.$refs.loginFormRef.validate(async valid => {
            if (!valid) return
            const {data: res} = await this.$http.post('/userLogin',this.loginForm)
            if (res.meta.status === 201){
              this.loginDialogVisible = false
              window.sessionStorage.setItem('token', res.data.Token)
              window.sessionStorage.setItem('userInfo',JSON.stringify(res.data.userInfo) )
              this.$store.commit('SetToken',res.data.Token)
              this.$store.commit('SetUserInfo',res.data.userInfo)
              this.$store.commit('SetLoginState',true)
              console.log("从vuex中拿到的userinfo", this.userInfo);
              return this.$message({
                duration:2000,
                type:'success',
                message:'登录成功!'
              })
            }else{
              this.loginForm.passWord = ''
              return this.$message.error('账号或密码输入错误!')
            }
          })
        },
        //点击"注册"
        UserRegister(){
          this.$refs.registerFormRef.validate(async valid => {
            if(!valid) return
            const {data: res} = await this.$http.post('/userRegister',this.registerForm)
            console.log(res)
            if(res.status === 201){
              // this.userInfo = res.userInfo
              this.loginDialogVisible = false
              return this.$message.success('注册成功!')
            }else{
              this.loginForm.passWord = ''
              return this.$message.error('注册失败!')
            }
          })
        },
        //点击“博客”
        blogCenterRoute(){
          this.$router.push('/blogCenter')
        },
        userRouter(instructions){
          if(instructions==='myBlog'){
            this.$router.push('/myBlog')
          }else if(instructions==='layout'){
            this.logOut()
          }else if(instructions === 'userCenter'){
            this.$router.push('/userCenter')
          }
        },
      }
}
</script>

<style Lang="less" scoped>

html,body{
  height: 100%;
  width: 100%;
  overflow: hidden;
}

body {
  position: absolute;
  text-align: center;
  margin: auto;
  background-color: #04162E;

}
.Home{
  height:100%;
  width: 100%;
  background-color:#04162E;
  position: relative;
}
.TopMenu{
  /* background-color: #409EFF; */
  height: 50px;
  width: 100%;
  position: relative;
  align-items: center;
}
.navbar{
  width: 20%;
  margin: 0 auto;

}
.navbar-ul{
  display: flex;
  color: white;
  list-style: none;
  height: 50px;
  align-items: center;
}
.navbar-ul li{
  text-align: center;
  width: 60px;
  border-radius: 10px;
  margin: 0 10px;
  cursor: pointer;
}
.navbar-ul li:hover{
  background-color: rgb(33,150,243);
}
.login{
  position: absolute;
  right: 20%;
  bottom: 0;
}
.user-info{
  right: 20%;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 0;
}
.user-info .el-image{
  border-radius: 50%;
}
.middle{
  width: 50%;
  height: 300px;
  position: absolute;
  top: 30%;
  left: 50%;
  text-align: center;
  transform: translate(-50%,0);
  /* border: 1px solid red; */
  animation: anim 8s ease-out infinite ;
  /* 动画执行次数 */
  animation-iteration-count: 1;
}
.my-self{
  font-weight: 600;
  font-size: 35px;
  font-style: oblique;
  color: white;
}
.great-word{
  font-size: 30px;
  color: white;
}
.login-cancel{
  font-size: 30px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999;
}
.login-box{
  width: 700px;
  height: 400px;
  margin: 300px auto;
  background-color:rgb(236, 240, 243);
  position: relative;
  /* z-index: 999; */
}
.login-state{
  width: 400px;
  height: 400px;
  box-shadow: 0 0 10px white;
  position: absolute;
  left: 0;
  top: 0;
}
.login-state-change{
  animation: login 3s ease 1;
  animation-fill-mode: forwards;
  z-index: 998;
}
.register-state{
  width: 400px;
  height: 400px;
  /* border: 1px solid red; */
  box-shadow: 0 0 10px white;
  position: absolute;
  right: 0;
  top: 0;
}
.register-state-change{
  animation: register 3s ease 1;
  animation-fill-mode: forwards;
  z-index: 998;
}
.login-form{
  width: 300px;
  height: 300px;
  /* border: 1px solid red; */
  margin: 50px auto;
  text-align: center;
  padding-top: 50px;
}
.login-cue-word{
  font-size: 25px;
  font-weight: 600;
}
.el-input{
  width: 250px;
  box-shadow: 2px 2px 4px #999999 ;
  border-radius: 5px;
}
.el-input:focus{
  box-shadow: 4px 4px 4px #999999 ;
}
.login-form >.el-button{
  color: white;
  border-radius: 15px;
  background-color: rgb(75,112,226);
}
.welcome-box-right{
  width: 300px;
  height: 400px;
  position: absolute;
  right: 0;
  top: 0;
}
.welcome-box-change{
  animation: welcome 3s ease  0s 1;
  animation-fill-mode: forwards;
}
.description{
  margin-top: 50px;
  width: 300px;
  height: 300px;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.description >.el-button{
  color: white;
  border-radius: 15px;
  background-color: rgb(75,112,226);
}
.description-word{
  font-size: 30px;
  font-weight: 600;
}
.welcome-box-left{
  /* display: none; */
  width: 300px;
  height: 400px;
  position: absolute;
  left: 0;
  top: 0;
  /* animation: welcome 3s ease  0s 1;
  animation-fill-mode: forwards; */
  /* animation: name duration timing-function delay iteration-count direction fill-mode; */
}
.welcome-box-left-change{
  /* display: block; */
  animation: welcome-left 3s ease  0s 1;
  animation-fill-mode: forwards;
}
@keyframes login{
  0%{
    transform: translate(0px,0px);
  }
  100%{
    transform: translate(300px,0);
  }
}
@keyframes register{
  0%{
    transform: translate(0px,0px);
  }
  100%{
    transform: translate(-300px,0);
  }
}
@keyframes welcome-left{
  0%{
    transform: translate(0px,0px);
  }
  100%{
    transform: translate(400px,0);
  }
}

@keyframes welcome{
  0%{
    transform: translate(0px,0px);
  }
  100%{
    transform: translate(-400px,0);
  }
}
@keyframes anim{
  0%{
    opacity: 0;
  }
  10%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
.moon {
  height: 100px;
  width: 100px;
  margin: 0 auto;
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  background: #B5BCC6;
  overflow: hidden;
}
.moon:before, .moon:after {
  border-radius: 50%;
  content: "";
  position: absolute;
  top: -4%;
  left: -4%;
  height: 108%;
  width: 108%;
}
.moon:before {
  background: #04162E;
  -moz-box-shadow: inset -10px 0 7px 0px #B5BCC6;
  -webkit-box-shadow: inset -10px 0 7px 0px #B5BCC6;
  box-shadow: inset -10px 0 7px 0px #B5BCC6;
}
.moon:after {
  background: #B5BCC6;
  -moz-box-shadow: inset -10px 0 7px 0px #B5BCC6;
  -webkit-box-shadow: inset -10px 0 7px 0px #B5BCC6;
  box-shadow: inset -10px 0 7px 0px #B5BCC6;
}

/* Animation */
@keyframes before-fullmoon {
  0%, 50% {
    opacity: 1;
  }
  50.01%, 100% {
    opacity: 0;
  }
  0%, 24.99% {
    background: #04162E;
  }
  25%, 100% {
    background: #B5BCC6;
  }
  0% {
    -moz-box-shadow: inset 0 0 7px 0 #B5BCC6;
    -webkit-box-shadow: inset 0 0 7px 0 #B5BCC6;
    box-shadow: inset 0 0 7px 0 #B5BCC6;
  }
  24.99% {
    -moz-box-shadow: inset 55px 0 7px 0 #B5BCC6;
    -webkit-box-shadow: inset 55px 0 7px 0 #B5BCC6;
    box-shadow: inset 55px 0 7px 0 #B5BCC6;
  }
  25% {
    -moz-box-shadow: inset 55px 0 7px 0 #04162E;
    -webkit-box-shadow: inset 55px 0 7px 0 #04162E;
    box-shadow: inset 55px 0 7px 0 #04162E;
  }
  50%, 100% {
    -moz-box-shadow: inset 0 0 7px 0 #04162E;
    -webkit-box-shadow: inset 0 0 7px 0 #04162E;
    box-shadow: inset 0 0 7px 0 #04162E;
  }
  0%, 50%, 100% {
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }
  20%, 30% {
    -moz-border-radius: 10% 10% 10% 10%/50% 50% 50% 50%;
    -webkit-border-radius: 10%;
    border-radius: 10% 10% 10% 10%/50% 50% 50% 50%;
  }
  25% {
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0;
  }
  0%, 24.99% {
    -moz-transform: rotate(0);
    -ms-transform: rotate(0);
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  25%, 50%, 100% {
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
}
@keyframes after-fullmoon {
  0%, 50% {
    opacity: 0;
  }
  50.01%, 100% {
    opacity: 1;
  }
  0%, 50%, 74.99% {
    background: #B5BCC6;
  }
  75%, 100% {
    background: #04162E;
  }
  0%, 50% {
    -moz-box-shadow: inset 0 0 7px 0 #04162E;
    -webkit-box-shadow: inset 0 0 7px 0 #04162E;
    box-shadow: inset 0 0 7px 0 #04162E;
  }
  74.99% {
    -moz-box-shadow: inset 55px 0 7px 0 #04162E;
    -webkit-box-shadow: inset 55px 0 7px 0 #04162E;
    box-shadow: inset 55px 0 7px 0 #04162E;
  }
  75% {
    -moz-box-shadow: inset 55px 0 7px 0 #B5BCC6;
    -webkit-box-shadow: inset 55px 0 7px 0 #B5BCC6;
    box-shadow: inset 55px 0 7px 0 #B5BCC6;
  }
  100% {
    -moz-box-shadow: inset 0 0 7px 0 #B5BCC6;
    -webkit-box-shadow: inset 0 0 7px 0 #B5BCC6;
    box-shadow: inset 0 0 7px 0 #B5BCC6;
  }
  0%, 50%, 100% {
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }
  70%, 80% {
    -moz-border-radius: 10% 10% 10% 10%/50% 50% 50% 50%;
    -webkit-border-radius: 10%;
    border-radius: 10% 10% 10% 10%/50% 50% 50% 50%;
  }
  75% {
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0;
  }
  0%, 50%, 74.99% {
    -moz-transform: rotate(0);
    -ms-transform: rotate(0);
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  75%, 100% {
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
}
.moon:before {
  -moz-animation: before-fullmoon linear 5s infinite;
  -webkit-animation: before-fullmoon linear 5s infinite;
  animation: before-fullmoon linear 5s infinite;
}
.moon:after {
  -moz-animation: after-fullmoon linear 5s infinite;
  -webkit-animation: after-fullmoon linear 5s infinite;
  animation: after-fullmoon linear 5s infinite;
}

/* stars */
.stars {
  position: absolute;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 753px 222px #A1B8D0 , 837px 680px #A1B8D0 , 818px 545px #A1B8D0 , 285px 143px #A1B8D0 , 271px 689px #A1B8D0 , 781px 639px #A1B8D0 , 305px 307px #A1B8D0 , 744px 54px #A1B8D0 , 545px 578px #A1B8D0 , 615px 855px #A1B8D0 , 561px 688px #A1B8D0 , 62px 811px #A1B8D0 , 227px 579px #A1B8D0 , 913px 333px #A1B8D0 , 155px 775px #A1B8D0 , 187px 199px #A1B8D0 , 816px 919px #A1B8D0 , 146px 85px #A1B8D0 , 297px 261px #A1B8D0 , 329px 352px #A1B8D0 , 164px 407px #A1B8D0 , 738px 327px #A1B8D0 , 544px 549px #A1B8D0 , 709px 654px #A1B8D0 , 844px 789px #A1B8D0 , 110px 150px #A1B8D0 , 808px 195px #A1B8D0 , 610px 747px #A1B8D0 , 693px 230px #A1B8D0 , 301px 486px #A1B8D0 , 841px 767px #A1B8D0 , 398px 459px #A1B8D0 , 1px 75px #A1B8D0 , 528px 753px #A1B8D0 , 560px 119px #A1B8D0 , 175px 700px #A1B8D0 , 236px 818px #A1B8D0 , 106px 857px #A1B8D0 , 560px 652px #A1B8D0 , 195px 153px #A1B8D0 , 673px 176px #A1B8D0 , 180px 928px #A1B8D0 , 221px 538px #A1B8D0 , 737px 886px #A1B8D0 , 698px 744px #A1B8D0 , 251px 912px #A1B8D0 , 938px 88px #A1B8D0 , 926px 492px #A1B8D0 , 597px 359px #A1B8D0 , 769px 623px #A1B8D0 , 81px 318px #A1B8D0 , 934px 858px #A1B8D0 , 870px 836px #A1B8D0 , 862px 741px #A1B8D0 , 901px 663px #A1B8D0 , 862px 141px #A1B8D0 , 248px 655px #A1B8D0 , 315px 711px #A1B8D0 , 117px 119px #A1B8D0 , 740px 43px #A1B8D0 , 140px 255px #A1B8D0 , 342px 813px #A1B8D0 , 860px 533px #A1B8D0 , 54px 423px #A1B8D0 , 872px 247px #A1B8D0 , 866px 859px #A1B8D0 , 1px 813px #A1B8D0 , 458px 190px #A1B8D0 , 440px 996px #A1B8D0 , 779px 992px #A1B8D0 , 967px 884px #A1B8D0 , 258px 802px #A1B8D0 , 608px 831px #A1B8D0 , 842px 485px #A1B8D0 , 979px 365px #A1B8D0 , 106px 863px #A1B8D0 , 401px 811px #A1B8D0 , 373px 238px #A1B8D0 , 983px 647px #A1B8D0 , 576px 668px #A1B8D0 , 439px 404px #A1B8D0 , 721px 401px #A1B8D0 , 971px 887px #A1B8D0 , 332px 139px #A1B8D0 , 922px 205px #A1B8D0 , 196px 181px #A1B8D0 , 486px 43px #A1B8D0 , 137px 862px #A1B8D0 , 887px 753px #A1B8D0 , 520px 902px #A1B8D0 , 373px 267px #A1B8D0 , 458px 292px #A1B8D0 , 677px 462px #A1B8D0 , 711px 979px #A1B8D0 , 110px 655px #A1B8D0 , 167px 825px #A1B8D0 , 696px 543px #A1B8D0 , 725px 269px #A1B8D0 , 626px 581px #A1B8D0 , 116px 244px #A1B8D0 , 903px 958px #A1B8D0 , 934px 495px #A1B8D0 , 513px 715px #A1B8D0 , 846px 140px #A1B8D0 , 317px 540px #A1B8D0 , 190px 399px #A1B8D0 , 781px 843px #A1B8D0 , 529px 174px #A1B8D0 , 203px 405px #A1B8D0 , 334px 935px #A1B8D0 , 209px 969px #A1B8D0 , 439px 831px #A1B8D0 , 622px 115px #A1B8D0 , 340px 621px #A1B8D0 , 878px 163px #A1B8D0 , 187px 955px #A1B8D0 , 943px 782px #A1B8D0 , 168px 927px #A1B8D0 , 349px 349px #A1B8D0 , 652px 519px #A1B8D0 , 595px 137px #A1B8D0 , 652px 648px #A1B8D0 , 145px 647px #A1B8D0 , 241px 361px #A1B8D0 , 771px 102px #A1B8D0 , 385px 886px #A1B8D0 , 509px 737px #A1B8D0 , 333px 44px #A1B8D0 , 755px 713px #A1B8D0 , 818px 270px #A1B8D0 , 998px 294px #A1B8D0 , 494px 675px #A1B8D0 , 519px 940px #A1B8D0 , 772px 384px #A1B8D0 , 928px 859px #A1B8D0 , 948px 145px #A1B8D0 , 220px 890px #A1B8D0 , 760px 451px #A1B8D0 , 94px 463px #A1B8D0 , 403px 926px #A1B8D0 , 499px 241px #A1B8D0 , 803px 262px #A1B8D0 , 311px 544px #A1B8D0 , 210px 363px #A1B8D0 , 166px 288px #A1B8D0 , 555px 878px #A1B8D0 , 700px 949px #A1B8D0 , 22px 149px #A1B8D0 , 540px 992px #A1B8D0 , 146px 376px #A1B8D0 , 577px 186px #A1B8D0 , 229px 30px #A1B8D0 , 62px 305px #A1B8D0 , 84px 414px #A1B8D0 , 847px 326px #A1B8D0 , 966px 664px #A1B8D0 , 27px 318px #A1B8D0 , 782px 744px #A1B8D0 , 524px 483px #A1B8D0 , 629px 958px #A1B8D0 , 23px 139px #A1B8D0 , 596px 203px #A1B8D0 , 393px 266px #A1B8D0 , 718px 231px #A1B8D0 , 50px 123px #A1B8D0 , 772px 883px #A1B8D0 , 265px 281px #A1B8D0 , 99px 490px #A1B8D0 , 5px 1px #A1B8D0 , 368px 766px #A1B8D0 , 503px 548px #A1B8D0 , 817px 650px #A1B8D0 , 807px 49px #A1B8D0 , 486px 806px #A1B8D0 , 359px 714px #A1B8D0 , 110px 24px #A1B8D0 , 221px 326px #A1B8D0 , 259px 489px #A1B8D0 , 34px 449px #A1B8D0 , 878px 198px #A1B8D0 , 386px 337px #A1B8D0 , 481px 285px #A1B8D0 , 419px 177px #A1B8D0 , 187px 602px #A1B8D0 , 564px 639px #A1B8D0 , 909px 709px #A1B8D0 , 951px 173px #A1B8D0 , 918px 143px #A1B8D0 , 756px 589px #A1B8D0 , 70px 688px #A1B8D0 , 931px 295px #A1B8D0 , 997px 17px #A1B8D0 , 47px 362px #A1B8D0 , 48px 902px #A1B8D0 , 811px 302px #A1B8D0 , 565px 403px #A1B8D0 , 995px 46px #A1B8D0 , 219px 351px #A1B8D0 , 555px 185px #A1B8D0 , 795px 851px #A1B8D0 , 618px 703px #A1B8D0 , 410px 60px #A1B8D0 , 544px 842px #A1B8D0 , 524px 447px #A1B8D0 , 935px 174px #A1B8D0 , 629px 456px #A1B8D0 , 469px 277px #A1B8D0 , 381px 815px #A1B8D0 , 877px 679px #A1B8D0 , 22px 764px #A1B8D0 , 23px 864px #A1B8D0 , 19px 200px #A1B8D0 , 789px 556px #A1B8D0 , 519px 651px #A1B8D0 , 87px 232px #A1B8D0 , 506px 662px #A1B8D0 , 99px 943px #A1B8D0 , 94px 435px #A1B8D0 , 172px 817px #A1B8D0 , 835px 987px #A1B8D0 , 644px 307px #A1B8D0 , 33px 515px #A1B8D0 , 643px 578px #A1B8D0 , 288px 821px #A1B8D0 , 453px 480px #A1B8D0 , 950px 926px #A1B8D0 , 483px 95px #A1B8D0 , 477px 874px #A1B8D0 , 829px 9px #A1B8D0 , 360px 462px #A1B8D0 , 779px 633px #A1B8D0 , 635px 225px #A1B8D0 , 346px 634px #A1B8D0 , 399px 392px #A1B8D0 , 564px 89px #A1B8D0 , 693px 523px #A1B8D0 , 443px 621px #A1B8D0 , 502px 372px #A1B8D0 , 673px 993px #A1B8D0 , 548px 740px #A1B8D0 , 476px 664px #A1B8D0 , 56px 513px #A1B8D0 , 107px 807px #A1B8D0 , 187px 694px #A1B8D0 , 148px 553px #A1B8D0 , 588px 918px #A1B8D0 , 856px 917px #A1B8D0 , 507px 695px #A1B8D0 , 746px 468px #A1B8D0 , 100px 205px #A1B8D0 , 868px 92px #A1B8D0 , 187px 545px #A1B8D0 , 840px 81px #A1B8D0 , 601px 992px #A1B8D0 , 793px 881px #A1B8D0 , 614px 282px #A1B8D0 , 518px 37px #A1B8D0 , 247px 575px #A1B8D0 , 527px 943px #A1B8D0 , 387px 492px #A1B8D0 , 712px 9px #A1B8D0 , 911px 827px #A1B8D0 , 867px 260px #A1B8D0 , 344px 868px #A1B8D0 , 44px 48px #A1B8D0 , 434px 204px #A1B8D0 , 631px 819px #A1B8D0 , 675px 385px #A1B8D0 , 610px 893px #A1B8D0 , 623px 226px #A1B8D0 , 343px 245px #A1B8D0 , 300px 260px #A1B8D0 , 522px 961px #A1B8D0 , 340px 595px #A1B8D0 , 301px 881px #A1B8D0 , 823px 748px #A1B8D0 , 236px 256px #A1B8D0 , 387px 261px #A1B8D0 , 606px 159px #A1B8D0 , 743px 157px #A1B8D0 , 485px 836px #A1B8D0 , 425px 667px #A1B8D0 , 975px 182px #A1B8D0 , 792px 810px #A1B8D0 , 872px 458px #A1B8D0 , 714px 992px #A1B8D0 , 902px 629px #A1B8D0 , 558px 261px #A1B8D0 , 573px 664px #A1B8D0 , 70px 368px #A1B8D0 , 255px 378px #A1B8D0 , 450px 151px #A1B8D0 , 158px 623px #A1B8D0 , 414px 420px #A1B8D0 , 831px 890px #A1B8D0 , 691px 312px #A1B8D0 , 63px 12px #A1B8D0 , 296px 449px #A1B8D0 , 579px 772px #A1B8D0 , 658px 232px #A1B8D0 , 443px 54px #A1B8D0 , 554px 197px #A1B8D0 , 792px 572px #A1B8D0 , 183px 561px #A1B8D0 , 712px 330px #A1B8D0 , 20px 425px #A1B8D0 , 992px 923px #A1B8D0 , 863px 812px #A1B8D0 , 878px 912px #A1B8D0 , 812px 844px #A1B8D0 , 683px 234px #A1B8D0 , 803px 779px #A1B8D0 , 829px 221px #A1B8D0 , 18px 438px #A1B8D0 , 202px 104px #A1B8D0 , 319px 754px #A1B8D0 , 980px 827px #A1B8D0 , 349px 956px #A1B8D0 , 301px 509px #A1B8D0 , 940px 606px #A1B8D0 , 279px 108px #A1B8D0 , 142px 984px #A1B8D0 , 271px 497px #A1B8D0 , 37px 760px #A1B8D0 , 760px 820px #A1B8D0 , 344px 601px #A1B8D0 , 291px 344px #A1B8D0 , 273px 770px #A1B8D0 , 569px 103px #A1B8D0 , 41px 174px #A1B8D0 , 248px 694px #A1B8D0 , 359px 654px #A1B8D0 , 725px 227px #A1B8D0 , 272px 474px #A1B8D0 , 802px 632px #A1B8D0 , 777px 708px #A1B8D0 , 310px 728px #A1B8D0 , 560px 510px #A1B8D0 , 996px 354px #A1B8D0 , 6px 456px #A1B8D0 , 335px 981px #A1B8D0 , 169px 42px #A1B8D0 , 786px 52px #A1B8D0 , 735px 140px #A1B8D0 , 967px 148px #A1B8D0 , 382px 928px #A1B8D0 , 998px 523px #A1B8D0 , 506px 664px #A1B8D0 , 578px 246px #A1B8D0 , 889px 143px #A1B8D0 , 529px 343px #A1B8D0 , 766px 639px #A1B8D0 , 30px 305px #A1B8D0 , 810px 641px #A1B8D0 , 474px 678px #A1B8D0 , 653px 567px #A1B8D0 , 750px 768px #A1B8D0 , 102px 929px #A1B8D0 , 787px 362px #A1B8D0 , 692px 808px #A1B8D0 , 951px 671px #A1B8D0 , 953px 162px #A1B8D0 , 184px 592px #A1B8D0 , 2px 166px #A1B8D0 , 877px 430px #A1B8D0 , 18px 465px #A1B8D0 , 182px 309px #A1B8D0 , 603px 641px #A1B8D0 , 197px 268px #A1B8D0 , 393px 453px #A1B8D0 , 407px 893px #A1B8D0 , 661px 621px #A1B8D0 , 699px 835px #A1B8D0 , 251px 110px #A1B8D0 , 992px 480px #A1B8D0 , 785px 973px #A1B8D0 , 365px 627px #A1B8D0 , 830px 564px #A1B8D0 , 880px 587px #A1B8D0 , 167px 101px #A1B8D0 , 994px 812px #A1B8D0 , 891px 279px #A1B8D0 , 206px 993px #A1B8D0 , 517px 90px #A1B8D0 , 601px 259px #A1B8D0 , 383px 593px #A1B8D0 , 185px 596px #A1B8D0 , 499px 78px #A1B8D0 , 95px 166px #A1B8D0 , 3px 353px #A1B8D0 , 163px 556px #A1B8D0 , 762px 132px #A1B8D0 , 567px 678px #A1B8D0 , 343px 604px #A1B8D0 , 796px 323px #A1B8D0 , 169px 749px #A1B8D0 , 749px 995px #A1B8D0 , 596px 5px #A1B8D0 , 918px 402px #A1B8D0 , 337px 879px #A1B8D0;
}
.stars:after {
  content: "";
  position: absolute;
  width: 1px;
  height: 1px;
  background: #A1B8D0;
  box-shadow: 753px 222px #A1B8D0 , 837px 680px #A1B8D0 , 818px 545px #A1B8D0 , 285px 143px #A1B8D0 , 271px 689px #A1B8D0 , 781px 639px #A1B8D0 , 305px 307px #A1B8D0 , 744px 54px #A1B8D0 , 545px 578px #A1B8D0 , 615px 855px #A1B8D0 , 561px 688px #A1B8D0 , 62px 811px #A1B8D0 , 227px 579px #A1B8D0 , 913px 333px #A1B8D0 , 155px 775px #A1B8D0 , 187px 199px #A1B8D0 , 816px 919px #A1B8D0 , 146px 85px #A1B8D0 , 297px 261px #A1B8D0 , 329px 352px #A1B8D0 , 164px 407px #A1B8D0 , 738px 327px #A1B8D0 , 544px 549px #A1B8D0 , 709px 654px #A1B8D0 , 844px 789px #A1B8D0 , 110px 150px #A1B8D0 , 808px 195px #A1B8D0 , 610px 747px #A1B8D0 , 693px 230px #A1B8D0 , 301px 486px #A1B8D0 , 841px 767px #A1B8D0 , 398px 459px #A1B8D0 , 1px 75px #A1B8D0 , 528px 753px #A1B8D0 , 560px 119px #A1B8D0 , 175px 700px #A1B8D0 , 236px 818px #A1B8D0 , 106px 857px #A1B8D0 , 560px 652px #A1B8D0 , 195px 153px #A1B8D0 , 673px 176px #A1B8D0 , 180px 928px #A1B8D0 , 221px 538px #A1B8D0 , 737px 886px #A1B8D0 , 698px 744px #A1B8D0 , 251px 912px #A1B8D0 , 938px 88px #A1B8D0 , 926px 492px #A1B8D0 , 597px 359px #A1B8D0 , 769px 623px #A1B8D0 , 81px 318px #A1B8D0 , 934px 858px #A1B8D0 , 870px 836px #A1B8D0 , 862px 741px #A1B8D0 , 901px 663px #A1B8D0 , 862px 141px #A1B8D0 , 248px 655px #A1B8D0 , 315px 711px #A1B8D0 , 117px 119px #A1B8D0 , 740px 43px #A1B8D0 , 140px 255px #A1B8D0 , 342px 813px #A1B8D0 , 860px 533px #A1B8D0 , 54px 423px #A1B8D0 , 872px 247px #A1B8D0 , 866px 859px #A1B8D0 , 1px 813px #A1B8D0 , 458px 190px #A1B8D0 , 440px 996px #A1B8D0 , 779px 992px #A1B8D0 , 967px 884px #A1B8D0 , 258px 802px #A1B8D0 , 608px 831px #A1B8D0 , 842px 485px #A1B8D0 , 979px 365px #A1B8D0 , 106px 863px #A1B8D0 , 401px 811px #A1B8D0 , 373px 238px #A1B8D0 , 983px 647px #A1B8D0 , 576px 668px #A1B8D0 , 439px 404px #A1B8D0 , 721px 401px #A1B8D0 , 971px 887px #A1B8D0 , 332px 139px #A1B8D0 , 922px 205px #A1B8D0 , 196px 181px #A1B8D0 , 486px 43px #A1B8D0 , 137px 862px #A1B8D0 , 887px 753px #A1B8D0 , 520px 902px #A1B8D0 , 373px 267px #A1B8D0 , 458px 292px #A1B8D0 , 677px 462px #A1B8D0 , 711px 979px #A1B8D0 , 110px 655px #A1B8D0 , 167px 825px #A1B8D0 , 696px 543px #A1B8D0 , 725px 269px #A1B8D0 , 626px 581px #A1B8D0 , 116px 244px #A1B8D0 , 903px 958px #A1B8D0 , 934px 495px #A1B8D0 , 513px 715px #A1B8D0 , 846px 140px #A1B8D0 , 317px 540px #A1B8D0 , 190px 399px #A1B8D0 , 781px 843px #A1B8D0 , 529px 174px #A1B8D0 , 203px 405px #A1B8D0 , 334px 935px #A1B8D0 , 209px 969px #A1B8D0 , 439px 831px #A1B8D0 , 622px 115px #A1B8D0 , 340px 621px #A1B8D0 , 878px 163px #A1B8D0 , 187px 955px #A1B8D0 , 943px 782px #A1B8D0 , 168px 927px #A1B8D0 , 349px 349px #A1B8D0 , 652px 519px #A1B8D0 , 595px 137px #A1B8D0 , 652px 648px #A1B8D0 , 145px 647px #A1B8D0 , 241px 361px #A1B8D0 , 771px 102px #A1B8D0 , 385px 886px #A1B8D0 , 509px 737px #A1B8D0 , 333px 44px #A1B8D0 , 755px 713px #A1B8D0 , 818px 270px #A1B8D0 , 998px 294px #A1B8D0 , 494px 675px #A1B8D0 , 519px 940px #A1B8D0 , 772px 384px #A1B8D0 , 928px 859px #A1B8D0 , 948px 145px #A1B8D0 , 220px 890px #A1B8D0 , 760px 451px #A1B8D0 , 94px 463px #A1B8D0 , 403px 926px #A1B8D0 , 499px 241px #A1B8D0 , 803px 262px #A1B8D0 , 311px 544px #A1B8D0 , 210px 363px #A1B8D0 , 166px 288px #A1B8D0 , 555px 878px #A1B8D0 , 700px 949px #A1B8D0 , 22px 149px #A1B8D0 , 540px 992px #A1B8D0 , 146px 376px #A1B8D0 , 577px 186px #A1B8D0 , 229px 30px #A1B8D0 , 62px 305px #A1B8D0 , 84px 414px #A1B8D0 , 847px 326px #A1B8D0 , 966px 664px #A1B8D0 , 27px 318px #A1B8D0 , 782px 744px #A1B8D0 , 524px 483px #A1B8D0 , 629px 958px #A1B8D0 , 23px 139px #A1B8D0 , 596px 203px #A1B8D0 , 393px 266px #A1B8D0 , 718px 231px #A1B8D0 , 50px 123px #A1B8D0 , 772px 883px #A1B8D0 , 265px 281px #A1B8D0 , 99px 490px #A1B8D0 , 5px 1px #A1B8D0 , 368px 766px #A1B8D0 , 503px 548px #A1B8D0 , 817px 650px #A1B8D0 , 807px 49px #A1B8D0 , 486px 806px #A1B8D0 , 359px 714px #A1B8D0 , 110px 24px #A1B8D0 , 221px 326px #A1B8D0 , 259px 489px #A1B8D0 , 34px 449px #A1B8D0 , 878px 198px #A1B8D0 , 386px 337px #A1B8D0 , 481px 285px #A1B8D0 , 419px 177px #A1B8D0 , 187px 602px #A1B8D0 , 564px 639px #A1B8D0 , 909px 709px #A1B8D0 , 951px 173px #A1B8D0 , 918px 143px #A1B8D0 , 756px 589px #A1B8D0 , 70px 688px #A1B8D0 , 931px 295px #A1B8D0 , 997px 17px #A1B8D0 , 47px 362px #A1B8D0 , 48px 902px #A1B8D0 , 811px 302px #A1B8D0 , 565px 403px #A1B8D0 , 995px 46px #A1B8D0 , 219px 351px #A1B8D0 , 555px 185px #A1B8D0 , 795px 851px #A1B8D0 , 618px 703px #A1B8D0 , 410px 60px #A1B8D0 , 544px 842px #A1B8D0 , 524px 447px #A1B8D0 , 935px 174px #A1B8D0 , 629px 456px #A1B8D0 , 469px 277px #A1B8D0 , 381px 815px #A1B8D0 , 877px 679px #A1B8D0 , 22px 764px #A1B8D0 , 23px 864px #A1B8D0 , 19px 200px #A1B8D0 , 789px 556px #A1B8D0 , 519px 651px #A1B8D0 , 87px 232px #A1B8D0 , 506px 662px #A1B8D0 , 99px 943px #A1B8D0 , 94px 435px #A1B8D0 , 172px 817px #A1B8D0 , 835px 987px #A1B8D0 , 644px 307px #A1B8D0 , 33px 515px #A1B8D0 , 643px 578px #A1B8D0 , 288px 821px #A1B8D0 , 453px 480px #A1B8D0 , 950px 926px #A1B8D0 , 483px 95px #A1B8D0 , 477px 874px #A1B8D0 , 829px 9px #A1B8D0 , 360px 462px #A1B8D0 , 779px 633px #A1B8D0 , 635px 225px #A1B8D0 , 346px 634px #A1B8D0 , 399px 392px #A1B8D0 , 564px 89px #A1B8D0 , 693px 523px #A1B8D0 , 443px 621px #A1B8D0 , 502px 372px #A1B8D0 , 673px 993px #A1B8D0 , 548px 740px #A1B8D0 , 476px 664px #A1B8D0 , 56px 513px #A1B8D0 , 107px 807px #A1B8D0 , 187px 694px #A1B8D0 , 148px 553px #A1B8D0 , 588px 918px #A1B8D0 , 856px 917px #A1B8D0 , 507px 695px #A1B8D0 , 746px 468px #A1B8D0 , 100px 205px #A1B8D0 , 868px 92px #A1B8D0 , 187px 545px #A1B8D0 , 840px 81px #A1B8D0 , 601px 992px #A1B8D0 , 793px 881px #A1B8D0 , 614px 282px #A1B8D0 , 518px 37px #A1B8D0 , 247px 575px #A1B8D0 , 527px 943px #A1B8D0 , 387px 492px #A1B8D0 , 712px 9px #A1B8D0 , 911px 827px #A1B8D0 , 867px 260px #A1B8D0 , 344px 868px #A1B8D0 , 44px 48px #A1B8D0 , 434px 204px #A1B8D0 , 631px 819px #A1B8D0 , 675px 385px #A1B8D0 , 610px 893px #A1B8D0 , 623px 226px #A1B8D0 , 343px 245px #A1B8D0 , 300px 260px #A1B8D0 , 522px 961px #A1B8D0 , 340px 595px #A1B8D0 , 301px 881px #A1B8D0 , 823px 748px #A1B8D0 , 236px 256px #A1B8D0 , 387px 261px #A1B8D0 , 606px 159px #A1B8D0 , 743px 157px #A1B8D0 , 485px 836px #A1B8D0 , 425px 667px #A1B8D0 , 975px 182px #A1B8D0 , 792px 810px #A1B8D0 , 872px 458px #A1B8D0 , 714px 992px #A1B8D0 , 902px 629px #A1B8D0 , 558px 261px #A1B8D0 , 573px 664px #A1B8D0 , 70px 368px #A1B8D0 , 255px 378px #A1B8D0 , 450px 151px #A1B8D0 , 158px 623px #A1B8D0 , 414px 420px #A1B8D0 , 831px 890px #A1B8D0 , 691px 312px #A1B8D0 , 63px 12px #A1B8D0 , 296px 449px #A1B8D0 , 579px 772px #A1B8D0 , 658px 232px #A1B8D0 , 443px 54px #A1B8D0 , 554px 197px #A1B8D0 , 792px 572px #A1B8D0 , 183px 561px #A1B8D0 , 712px 330px #A1B8D0 , 20px 425px #A1B8D0 , 992px 923px #A1B8D0 , 863px 812px #A1B8D0 , 878px 912px #A1B8D0 , 812px 844px #A1B8D0 , 683px 234px #A1B8D0 , 803px 779px #A1B8D0 , 829px 221px #A1B8D0 , 18px 438px #A1B8D0 , 202px 104px #A1B8D0 , 319px 754px #A1B8D0 , 980px 827px #A1B8D0 , 349px 956px #A1B8D0 , 301px 509px #A1B8D0 , 940px 606px #A1B8D0 , 279px 108px #A1B8D0 , 142px 984px #A1B8D0 , 271px 497px #A1B8D0 , 37px 760px #A1B8D0 , 760px 820px #A1B8D0 , 344px 601px #A1B8D0 , 291px 344px #A1B8D0 , 273px 770px #A1B8D0 , 569px 103px #A1B8D0 , 41px 174px #A1B8D0 , 248px 694px #A1B8D0 , 359px 654px #A1B8D0 , 725px 227px #A1B8D0 , 272px 474px #A1B8D0 , 802px 632px #A1B8D0 , 777px 708px #A1B8D0 , 310px 728px #A1B8D0 , 560px 510px #A1B8D0 , 996px 354px #A1B8D0 , 6px 456px #A1B8D0 , 335px 981px #A1B8D0 , 169px 42px #A1B8D0 , 786px 52px #A1B8D0 , 735px 140px #A1B8D0 , 967px 148px #A1B8D0 , 382px 928px #A1B8D0 , 998px 523px #A1B8D0 , 506px 664px #A1B8D0 , 578px 246px #A1B8D0 , 889px 143px #A1B8D0 , 529px 343px #A1B8D0 , 766px 639px #A1B8D0 , 30px 305px #A1B8D0 , 810px 641px #A1B8D0 , 474px 678px #A1B8D0 , 653px 567px #A1B8D0 , 750px 768px #A1B8D0 , 102px 929px #A1B8D0 , 787px 362px #A1B8D0 , 692px 808px #A1B8D0 , 951px 671px #A1B8D0 , 953px 162px #A1B8D0 , 184px 592px #A1B8D0 , 2px 166px #A1B8D0 , 877px 430px #A1B8D0 , 18px 465px #A1B8D0 , 182px 309px #A1B8D0 , 603px 641px #A1B8D0 , 197px 268px #A1B8D0 , 393px 453px #A1B8D0 , 407px 893px #A1B8D0 , 661px 621px #A1B8D0 , 699px 835px #A1B8D0 , 251px 110px #A1B8D0 , 992px 480px #A1B8D0 , 785px 973px #A1B8D0 , 365px 627px #A1B8D0 , 830px 564px #A1B8D0 , 880px 587px #A1B8D0 , 167px 101px #A1B8D0 , 994px 812px #A1B8D0 , 891px 279px #A1B8D0 , 206px 993px #A1B8D0 , 517px 90px #A1B8D0 , 601px 259px #A1B8D0 , 383px 593px #A1B8D0 , 185px 596px #A1B8D0 , 499px 78px #A1B8D0 , 95px 166px #A1B8D0 , 3px 353px #A1B8D0 , 163px 556px #A1B8D0 , 762px 132px #A1B8D0 , 567px 678px #A1B8D0 , 343px 604px #A1B8D0 , 796px 323px #A1B8D0 , 169px 749px #A1B8D0 , 749px 995px #A1B8D0 , 596px 5px #A1B8D0 , 918px 402px #A1B8D0 , 337px 879px #A1B8D0;
}


</style>
