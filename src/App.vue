<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
   created () {
        //在页面加载时读取localStorage里的状态信息
    sessionStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(sessionStorage.getItem("userMsg"))));
    window.onbeforeunload = () => {
      console.log("页面刷新了");
      sessionStorage.setItem('userMsg', JSON.stringify(this.$store.state));
    }

}
}
</script>

<style>

</style>
