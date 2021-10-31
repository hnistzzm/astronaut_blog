<template>
<div>
  <div class="page">
    <HomeNavTop></HomeNavTop>
    <router-view></router-view>
    <footer>
      <p>Copy Right</p>
    </footer>
  </div>
  
</div>
</template>

<script>
import HomeNavTop from '../../components/blog/BloghomeNavTop'
export default {
  name: "BlogCenter",
  data(){
    return{
    }
  },
  components:{HomeNavTop},

}
</script>

<style scoped Lang="less">
.page{
  width: 100%;
  height: 100%;
  background-color: rgb(246, 246, 246);
}
footer{
  margin-top: 15px;
  width: 100%;
  height: 65px;
  background-color: rgb(51,51,51);
  position: relative;
  /* border: 1px solid red; */
}
footer p{
  font-size: 18px;
  color: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>
