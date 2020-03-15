<template>
  <div class="cart-list">
    <div class="item-pane">
      <div
        v-for="cart in list"
        :key="cart._id"
        class="cart-item">
        <input type="checkbox" v-model="cart.isCheck" class="checkbox" @change="totalChange(cart)">
        <div class="img-pane">
          <img :src="cart.proId.url" alt="">
        </div>
        <div class="cart-info">
          <p>{{ cart.proId.name }}</p>
          <p class="num">数量：{{ cart.productNum }}</p>
          <p class="time">{{ cart.createTime }}</p>
        </div>
        <div class="cart-total">
          总价：{{ cart.total }}
        </div>
      </div>
      </div>

    <div class="fn-pane" v-if="totalPay > 0">
      <div class="total-pay">
        <span>总价：￥{{ totalPay }}</span>
      </div>
      <el-button class="accountBtn" @click="toAccount">结算</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
  },
  data () {
    return {
      totalPay: 0,
    };
  },
  methods: {
    totalChange (cart) {
      if(cart.isCheck) {
        this.totalPay += cart.total;
      } else {
        this.totalPay -= cart.total;
      }
    },
    toAccount () {
      const submitArray = this.list.filter(item => {
        if(item.isCheck) {
          return item;
        }
      }).map(item => {
        return item._id;
      })
      this.$confirm('确定结算吗?', '提示', {
        confirmButtonText: '付款',
        cancelButtonText: '未付款',
        type: 'warning'
      }).then(() => {
        // 付款
        this.$axios.post('/sales/status', {
          submitArray,
          status: '02',
        }).then(res => {
          // if(res.data.status === 200) {
          location.reload()
          // }
        })
      }).catch(() => {
        // 未付款
        this.$axios.post('/sales/status', {
          submitArray,
          status: '01',
        }).then(res => {
          // if(res.data.status === 200) {
          location.reload()
          // }
        })
      });
    }
  }
}
</script>

<style lang="less">
  .item-pane {
    max-height: 400px;
    overflow-y: auto;
  }
  .cart-item {
    border: 1px solid #E5E5E5;
    padding: 20px;

    .checkbox {
      float: left;
      margin-top: 40px;
      margin-right: 25px;
    }
    
    &::after {
      content: '';
      display: block;
      clear: both;
    }

    .img-pane {
      float: left;
      width: 90px;
      height: 90px;
      border-radius: 5px;
      overflow: hidden;

      img {
        object-fit: cover;
        width: 90px;
        height: 90px;
      }
    }

    .cart-info {
      float: left;
      height: 90px;
      width: 325px;
      position: relative;

      p {
        margin: 10px;
      }

      .num {
        font-size: 14px;
      }

      .time {
        font-size: 12px;
        color: #666;
      }
    }

    .cart-total {
      float: left;
      font-size: 12px;
      color: #666666;
      line-height: 90px;
      text-align: center;
      width: 200px;
    }

    .cart-status {
      float: left;
      font-size: 12px;
      color: #333;
      line-height: 90px;
      text-align: center;
      width: 100px;
    }
  }

  .fn-pane {
    margin-top: 20px;
    overflow: hidden;
    .total-pay {
      float: left;
      line-height: 40px;
    }
    .accountBtn {
      float: right;
      background-color: red;
      color: #fff;
    }
  }
</style>