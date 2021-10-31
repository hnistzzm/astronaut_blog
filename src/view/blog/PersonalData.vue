<template>
<div class="container">
<!--  用户一般信息-->
  <div class="general-info">
      <div class="head-portrait" @click="uploadImageVisible = true">
        <el-image :src="url+userInfo.userHeadPortrait" class="head-image"></el-image>
        <i class="el-icon-camera icon-camera"></i>
      </div>
      <p>{{userInfo.userNickName}}</p>
  </div>
  <div class="normal-info">
    <div class="normal-info-title">
      <p>基本信息</p>
    </div>
    <div class="normal-info-content">
<!--      当处于未编辑状态时，只展示用户的基本信息-->
      <el-card class="normal-info-content-card-noEdit" shadow="never" v-if="!isEdit">
        <ul class="normal-info-content-list">
          <li>
            <div class="normal-info-data-title">用户昵称</div>
            <div class="normal-info-data">{{userInfo.userNickName}}</div>
          </li>
          <li>
            <div class="normal-info-data-title">
              <span>用</span>
              <span>户</span>
              <span>ID</span>
            </div>
            <div class="normal-info-data">{{userInfo.userId}}</div>
          </li>
          <li>
            <div class="normal-info-data-title">真实姓名</div>
            <div class="normal-info-data">{{userInfo.userTrueName}}</div>
          </li>
          <li>
            <div class="normal-info-data-title">
              <span>姓</span>
              <span>别</span>
            </div>
            <div class="normal-info-data">{{userInfo.userGender}}</div>
          </li>
          <li>
            <div class="normal-info-data-title">个人简介</div>
            <div class="normal-info-data">{{userInfo.userSelfIntro}}</div>
          </li>
          <li>
            <div class="normal-info-data-title">
              <span>生</span>
              <span>日</span>
            </div>
            <div class="normal-info-data">{{userInfo.userBirthday}}</div>
          </li>
        </ul>
        <p class="edit-button" @click="isEdit = true">编辑</p>
      </el-card>
<!--      当处于编辑状态时，提供表单让-->
      <el-card class="normal-info-content-card-isEdit" v-else>
        <el-form ref="form"  label-width="80px">
          <el-row >
            <el-col :span="6">
              <el-form-item label="用户昵称">
                <el-input style="width: 300px" v-model="userInfo.userNickName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="4">
              <el-form-item label="真实姓名">
                <el-input style="width: 300px" v-model="userInfo.userTrueName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-row >
              <el-col :span="6">
                <el-form-item label="用户 ID">
                  <el-input style="width: 300px" v-model="userInfo.userId" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="4">
                <el-form-item label="出生日期">
                  <el-date-picker
                   v-model="userInfo.userBirthday"
                   align="right"
                   type="date"
                   placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
          <el-form-item label="性  别">
            <el-radio-group v-model="userInfo.userGender">
              <el-radio-button  label="男" border>男</el-radio-button>
              <el-radio-button  label="女" border style="margin-left: 30px;">女</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input  type="textarea" :rows="5" v-model="userInfo.userSelfIntro"  style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="editUserInfo()">保存</el-button>
            <el-button @click="isEdit=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
  <!--    上传图片-->
  <el-dialog :visible.sync="uploadImageVisible" width="30%"  class="upload-dialog" title="上传头像" >
    <el-upload
        class="avatar-uploader"
        action="#"
        :before-upload="beforeUpload"
        ref="upload"
        :show-file-list="false">
      <el-image  v-if="imgUrl" :src="url+imgUrl" class="avatar"></el-image>
      <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <span  slot="footer" class="dialog-footer" v-if="imgUrl">
          <el-button @click="uploadImageVisible=false">取 消</el-button>
          <el-button type="primary" @click="upload">上传</el-button>
        </span>
  </el-dialog>

</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "PersonalData",
  data(){
    return{
      isEdit:false,
      uploadImageVisible:false,
      imgUrl:''
    }
  },
  computed:{
     ...mapState(['loginState','userInfo'])
  },
  created() {
    this.getUserInfo()
  },
  methods:{
    
    async editUserInfo(){
      const {data : res} =await this.$http.post('/editUserInfo',this.userInfo)
      if(res.meta.status === 201){
        this.$message.success('修改成功!')
        await this.getUserInfo()
        this.isEdit = false
      }
      console.log(res)
    },
    async beforeUpload(file){
      console.log("file",file)
      let formData = new FormData()
      formData.append('file',file)
      console.log("formdata",formData)
      const {data : res} = await this.$http.post('/beforeUpload',formData)
      this.imgUrl = res.data
      console.log(res)
    },
    async upload(){
      const {data : res} = await this.$http.post('/upload',{imgUrl:this.imgUrl})
      if(res.meta.status === 201){
        await this.getUserInfo()
        this.$message.success('上传成功!')
      }else{
        this.$message.error('上传失败!')
      }
      this.uploadImageVisible=false

    }
  }
}
</script>

<style scoped Lang="less">
.container{
  height: 100%;
  /* //border: 1px solid red; */
  margin: 0;
  padding: 0;
  width: 100%;
}
.general-info{
  height:15%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: 500;
  position: relative;
}
.head-portrait{
  width: 100px;
  height: 100px;
  position: relative;
  cursor: pointer;
}
.head-portrait:hover{
  filter: brightness(70%);
}
.head-portrait:hover .icon-camera{
  display: block;
  position: absolute;
  top: 50%;
}
.icon-camera{
  display: none;
}
.head-image{
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.icon-camera{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.normal-info{
  margin-top: 15px;
  height: 600px;
  /* border:1px solid red; */
}
.normal-info-title{
  height: 50px;
  background-color: white;
  font-weight: 600;
  font-size: 20px;
  padding-left: 15px;
  margin-bottom: 1px;
}
.normal-info-title p{
  line-height: 50px;
}
.normal-info-content{
  height: 90%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.normal-info-content-card-noEdit{
  width: 95%;
  height: 90%;
  line-height:70px;
  border: none;
  position: relative;
}
.normal-info-content-card-noEdit:hover{
  background-color:rgb(248,248,248) ;
}

.normal-info-content-card-noEdit:hover .edit-button{
  display: block;
  color: blue;
  cursor: pointer;
  position: absolute;
  right: 5%;
  top: 5%;
}
.normal-info-content-list{
  list-style: none;
}
.normal-info-content-list>li{
  display: flex;
}
.normal-info-data{
  margin-left: 50px;
  color: #222226;
}
.normal-info-data-title{
  width: 56px;
  display: flex;
  justify-content: space-between;
  color: #555666;
  /* //font-size: 18px; */
}
.edit-button{
  display: none;
}
.normal-info-content-card-isEdit{
  width: 95%;
  height: 90%;
  line-height:40px;
  border: none;
  position: relative;
  background-color:rgb(248,248,248) ;
}
.upload-dialog{
  text-align: center;
}

.avatar-uploader .el-upload{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader :hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 50%;
  border: 1px dashed #d9d9d9;
}
::v-deep .el-upload__input{
  display: none!important;
}








</style>
