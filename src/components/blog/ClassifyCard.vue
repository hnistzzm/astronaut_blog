<template>
    <el-card class="classify-card">
        <div slot="header" class="clearfix">
            <el-image :src="require('../../static/image/ByteDance.webp')"></el-image>
        </div>
        <span>前端</span>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props:[]
}
</script>

<style scoped Lang="less">
.classify-card{
    width: 280px;
    height: 200px;
    /* margin-right: 15px; */
    /* background-color: ; */
}
.classify-card span{
    font-size: 15px;
    font-weight: 600;
}
.clearfix>.el-image{
    height: 100px;
    width: 200px;
    margin-left: 20px;
}
</style>