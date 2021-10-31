<template>
  <div class="container">
    <!--  面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博客管理</el-breadcrumb-item>
      <el-breadcrumb-item>博客管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-table :data="blogList">
            <el-table-column type="index" label="#"></el-table-column>
            
             <el-table-column label="封面" >
                <template v-slot:default="scope">
                    <el-image :src="url+scope.row.blogCoverImage" v-if="scope.row.blogCoverImage" fit="cover"></el-image>
                    <p v-else style="color:#999999">暂无封面</p>
                </template>
             </el-table-column>
             <el-table-column label="ID" sortable prop="blogId"></el-table-column>
             <el-table-column label="标题" sortable prop="blogTitle"></el-table-column>
             <el-table-column label="来源" prop="blogOrigin">
                <template v-slot:default="scope">
                    <el-tag  effect="dark" type="danger" v-if="scope.row.blogOrigin === 1">原创</el-tag>
                    <el-tag  effect="dark" v-else>转载</el-tag>
                </template>
             </el-table-column>
             <el-table-column label="分类" prop="blogClassify">
                <template v-slot:default="scope">
                  <el-tag v-for="(item,index) in scope.row.blogClassify" :key="index" >{{item}}</el-tag>  
                </template>
             </el-table-column>
              <el-table-column label="推荐级别" sortable prop="blogRcLevel"></el-table-column>
             <el-table-column label="作者名称" sortable prop="blogAuthorName"></el-table-column>
             <el-table-column label="作者ID" sortable prop="blogAuthorId"></el-table-column>
             <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-tooltip content="编辑" placement="top" :enterable="false">
                        <el-button 
                            type="primary" 
                            icon="el-icon-edit" 
                            size="small"
                            @click="editBlogInfo(scope.row)">
                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="删除" placement="top" :enterable="false">
                        <el-button 
                            type="danger" 
                            icon="el-icon-delete" 
                            size="small">
                        </el-button>
                    </el-tooltip>
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
        title="修改博客信息"
        :visible.sync="editBlogSync"
        width="30%">
        <el-form
            :model="currentEditBlogInfo"
            label-width="80px">
            <el-form-item label="博客ID:">
                <el-input v-model="currentEditBlogInfo.blogId"></el-input>
            </el-form-item>
            <el-form-item label="来源">
                <el-radio v-model="currentEditBlogInfo.blogOrigin" :label="0">转载</el-radio>
                <el-radio v-model="currentEditBlogInfo.blogOrigin" :label="1">原创</el-radio>
            </el-form-item>
            <el-form-item label="推荐级别:">
                <el-select v-model="currentEditBlogInfo.blogRcLevel" placeholder="请选择">
                    <el-option label="1" :value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo:{
        searchKey:'',
        currentPage:1,
        pageSize:8
      },
      total:0,
      editBlogSync:false,
      currentEditBlogInfo:{},
      blogList:[],
      recLevel:true
    }
  },
  created(){
    this.getBlogList()
  },
  methods: {
    async getBlogList(){
      const {data:res} = await this.$http.post('/getBlogList')
      console.log(res);
      if(this.checkReq(res.meta.status)){
        this.blogList = res.data.blogList
      }
    },
    editBlogInfo(blogInfo){
        console.log(blogInfo);
        this.currentEditBlogInfo = blogInfo
        this.editBlogSync = true
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

.el-card{
  margin-top: 15px;
}
.el-image{
  width: 80px;
  height: 50px;
}
.el-tag{
  margin-left: 2px;
}
</style>