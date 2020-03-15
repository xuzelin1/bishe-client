<template>
  <div class="my-order">
    <h3>我的菜单</h3>
    <div class="item">
      <nuxt-link to="/userinfo">我的订单</nuxt-link>
      <i class="el-icon-arrow-right" style=""></i>
    </div>
    <div class="item">
      <nuxt-link to="/cart">我的购物车</nuxt-link>
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
  .my-order {
    float: left;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    width: 210px;
    min-height: 500px;
    padding-bottom: 20px;
    padding: 10px;
    h3 {
      margin: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #E5E5E5;
      margin-bottom: 10px;
    }
    .item {
      height: 40px;
      line-height: 40px;

      a {
        color: #000;
      }

      i {
        float: right;
        line-height: 40px;
      }
    }
  }
</style>