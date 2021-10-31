<template>
    <el-container>
        <el-header>
            <div class="system-name">
                <el-image :src="require('../../static/image/dreamboy.png')" ></el-image>
                <span>Astronaut博客管理系统</span>
            </div>
            <el-button>退出</el-button>
        </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu 
                        class="el-menu-vertical-demo"
                        :router="true" 
                        unique-opened
                        background-color="#545c64"
                        active-text-color="#ffd04b"
                        text-color="#fff"
                        >
                        <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id" >
                            <!--            一级菜单的模板区域-->
                            <template slot="title">
                            <!--              图标-->
                            <i :class="menuIconList[item.id]"></i>
                            <!--              文本-->
                            <span>{{ item.authName }}</span>
                            </template>
                            <!--            二级菜单-->
                            <el-menu-item :index="'/home'+subItem.path+''" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState(subItem.path)">
                                <template slot="title">
                                    <!--              图标-->
                                    <i class="el-icon-menu"></i>
                                    <!--              文本-->
                                    <span>{{ subItem.authName }}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        <el-footer></el-footer>
    </el-container>
        
</template>

<script>
export default {
    data() {
        return {
            menuList:[],
            menuIconList:[],
            activePath:''
        }
    },
    created(){
        this.getMenuList()
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
        async getMenuList(){
            const {data : res} = await this.$http.post('/getMenuList')
            this.menuList = res.data.menuList
            this.menuIconList = res.data.menuIcon
        },
        saveNavState(activePath){
            window.sessionStorage.setItem('activePath',activePath);
            this.activePath = activePath;
        }
    },
}
</script>

<style scoped Lang="less">
.el-container{
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
}
.el-header{
    background-color: rgb(64,158,255);
    color: #FFFFFF;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.system-name{
    display: flex;
    align-items: center;
}
.system-name>.el-image{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
}
.el-aside{
    height: 100%;
    /* border: 1px solid red; */
     background-color: #545c64;
     
}
.el-menu{
    border-right: none;
}
</style>