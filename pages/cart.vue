<template>
  <div class="cart-page">
    <Header />
    <div class="cart-container">
      <MyOrder />
      <div class="cart-pane">
        <h3>我的购物车</h3>
        <CartList :list="saleList"/>
      </div>
    </div>
  </div>
</template>

<script>
import CartList from '@/components/cart-list'
export default {
  components: {
    CartList,
  },
  data () {
    return {
      saleList: [],
    }
  },
  mounted () {
    this.$axios.post('/sales/salelist', {
      status: '00',
    }).then(res => {
      this.saleList = res.data.salelist.map(item => {
        item['isCheck'] = false;
        return item;
      });
    })
  }
}
</script>

<style lang="less">
  .cart-container {
    width: 1190px;
    margin: 20px auto;
    margin-top: -35px;

    .cart-pane {
      padding: 20px;
      background-color: #fff;
      width: 908px;
      float: right;
      border: 1px solid #efefef;

      h3 {
        margin-top: 0;
      }
    }
  }
</style>