<template>
  <div class="container">
    <!--  面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-table :data="userList">
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="用户头像">
                <template v-slot:default="scope">
                     <el-image :src="url+scope.row.userHeadPortrait" v-if="scope.row.userHeadPortrait"></el-image>
                     <p v-else style="color:#999999">暂无头像</p>
                </template>
            </el-table-column>
            <el-table-column label="ID" prop="userId"></el-table-column>
            <el-table-column label="昵称" prop="userNickName"></el-table-column>
            <el-table-column label="真实姓名" prop="userTrueName"></el-table-column>
            <el-table-column label="性别" prop="userGender"></el-table-column>
            <el-table-column label="生日" prop="userBirthday"></el-table-column>
            <el-table-column label="介绍" prop="userSelfIntro"></el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-tooltip content="编辑" placement="top" :enterable="false">
                        <el-button 
                            type="primary"
                            icon="el-icon-edit"
                            size="small" 
                            @click="currentEditUserInfo = scope.row;editUserSync=true">
                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="注销" placement="top" :enterable="false">
                        <el-button 
                            type="danger" 
                            icon="el-icon-delete" 
                            size="small"
                            @click="removeUserById(scope.row.userId)">
                        </el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="100px">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.userState"
                        active-value="1"
                        inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="changeUserState(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.currentPage"
        :page-sizes="[5, 8, 12, 15]"
        :page-size=queryInfo.pageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total=total>
    </el-pagination>
    <el-dialog
        title="修改用户信息"
        :visible.sync="editUserSync"
        width="30%"
        >
        <el-form 
            :model="currentEditUserInfo"
            label-width="80px"
            >
            <el-form-item label="用户ID:">
                <el-input v-model="currentEditUserInfo.userId" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户昵称:">
                <el-input v-model="currentEditUserInfo.userNickName"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名:">
                <el-input v-model="currentEditUserInfo.userTrueName" disabled></el-input>
            </el-form-item>
            <el-form-item label="性别:">
                <el-radio v-model="currentEditUserInfo.userGender" label="男" border>男</el-radio>
                <el-radio v-model="currentEditUserInfo.userGender" label="女" border>女</el-radio>
            </el-form-item>
            <el-form-item label="用户生日:">
                <el-date-picker
                    v-model="currentEditUserInfo.userBirthday"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="用户介绍:">
                <el-input 
                    v-model="currentEditUserInfo.userSelfIntro"
                    type="textarea" 
                    :autosize="{ minRows: 2, maxRows: 4}">
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editUserSync = false">取 消</el-button>
            <el-button type="primary" @click="editUser(currentEditUserInfo)">确 定</el-button>
        </span>
    </el-dialog>

  </div>
  
</template>

<script>
export default {
    data() {
        return {
            editUserSync:false,
            queryInfo:{
                searchKey:'',
                currentPage:1,
                pageSize:8
            },
            total:0,
            currentEditUserInfo:{},
            userList:[]
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
        async getUserList(){
            const {data : res} = await this.$http.post('/getUserList',this.queryInfo)
            console.log(res);
            if(this.checkReq(res.meta.status)){
                this.userList = res.data.userList
                this.total = res.data.total
            }else{
                this.$message.error('获取用户信息失败!')
            }
        },
        async editUser(currentEditUserInfo){
            const {data:res} = await this.$http.post('/editUserInfo',currentEditUserInfo)
            if(this.checkReq(res.meta.status)){
                this.editUserSync = false
                await this.getUserList()
                return this.$message.success('修改用户信息成功!')
            }
            this.editUserSync = false
            return this.$message.error('修改用户信息失败!')
        },
        //修改用户状态
        async changeUserState(state){
            const{data : res} = await this.$http.post('/changeUserState',
                                {userId:state.userId,userState:state.userState})
            console.log(res);
            if(this.checkReq(res.meta.status)){
                return this.$message.success('修改用户状态成功!')
            }
            return this.$message.error('修改用户状态失败!')
        },
         //显示删除用户的对话框
        async removeUserById(id){
            const confirmResult = await this.$confirm('此操作将永久注销该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            //如果用户确定删除，则返回值为字符串confirm
            //如果用户取消了删除，则返回值为字符串cancel
            if(confirmResult !=='confirm'){
                return this.$message.info('已取消删除')
            }
            //console.log('确认了删除')
            const {data:res} = await this.$http.delete("/deleteUser/"+id)
            console.log(res);
            if(this.checkReq(res.meta.status)){
                this.$message.success('注销用户成功!')
                await this.getUserList()
            }else{
              return this.$message.error('注销用户失败!')  
            }
        },
        //分页操作
        handleSizeChange(pageSize){
            this.queryInfo.pageSize = pageSize
            this.getUserList()
        },
        handleCurrentChange(currentPage){
            this.queryInfo.currentPage = currentPage
            this.getUserList()
        }
            
        
    },
}
</script>

<style scoped Lang="less">
.container{
    width: 100%;
    height: 100%;
}
.el-card{
    margin-top: 15px;
}
.el-image{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.el-form .el-input{
    width: 300px;
}
</style>