<template>
  <div class="container">
      <div class="login-form">
          <el-form :model="adminLoginInfo" ref="adminLoginRef" :rules="adminLoginRules">
              <el-form-item label="账号" prop="adminId">
                  <el-input v-model="adminLoginInfo.adminId"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="adminPassWord">
                  <el-input v-model="adminLoginInfo.adminPassWord"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button @click="adminLogin">登录</el-button>
                  <el-button>取消</el-button>
              </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
export default {
 data() {
     return {
         adminLoginInfo:{
            adminId:'1172557344',
            adminPassWord:'123'
         },
         adminLoginRules:{
            adminId:[
                { required: true, message: '请输入id', trigger: 'blur' },
                { min: 3, max: 15, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            adminPassWord:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 15, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ]
         }
     }
 },
 methods:{
      adminLogin(){
         this.$refs.adminLoginRef.validate(async valid =>{
            if(!valid) return this.$message.error('请输入正确格式的账号密码!')
            const {data : res} =await  this.$http.post('/login',this.adminLoginInfo)
            console.log(res);
            if(this.checkReq(res.meta.status)){
                this.$message.success('登录成功!')
                this.$router.push('/home')
            }else{
                return this.$message.error('账号或密码错误!')
            }
            
        })
     }
 }
}
</script>

<style scoped Lang="less">
.container{
    width: 100%;
    height: 100%;
    background:url('../../static/image/background1.jpeg');
    background-size:100% 100% ;
    position: relative;
}
.login-form{
    width: 600px;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
}
.login-form>.el-form{
    width: 400px;
    height: 300px;
    margin: 0 auto;
    margin-top: 100px;
}
.login-form .el-input{
    
    width: 300px;
}
</style>