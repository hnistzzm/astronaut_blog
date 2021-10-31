<template>
<div class="container">

    <div class="classify-navbar">

    </div>
    <div class="classify-content">
        <ul class="classify-content-lists">
            <li class="classify-content-lists-item">
                <ClassifyCard></ClassifyCard>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import ClassifyCard from '../../components/blog/ClassifyCard.vue'
export default {
  name: "Classification",
  data() {
      return {
          
      }
  },
  components:{ClassifyCard}
}
</script>

<style scoped Lang="less">
.container{
    width: 1200px;
    height: 80vh;
    position: relative;
    border: 1px solid red;
    margin:  0 auto;
}
.classify-navbar{
    width: 100%;
    height: 70px;
    margin-top: 15px;
    border: 1px solid red;
    background-color: #FFFFFF;
}
.classify-content-lists-item{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}

</style>
