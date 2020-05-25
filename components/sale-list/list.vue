<template>
  <div class="sale-list">
    <div
      v-for="sale in list"
      :key="sale._id"
      class="sale-item">
      <div class="img-pane">
        <img :src="sale.proId.url" alt="">
      </div>
      <div class="sale-info">
        <p>{{ sale.proId.name }}</p>
        <p class="num">数量：{{ sale.productNum }}</p>
        <p class="time">{{ sale.createTime }}</p>
      </div>
      <div class="sale-total">
        总价：{{ sale.total }}
      </div>
      <div class="sale-status">
        {{ sale.statusZh }}
      </div>
      <div class="fn-pane">
        <el-button v-if="sale.status === '01'" type="danger" size="small" @click="toPay(sale._id)">付款</el-button>
        <el-button v-if="sale.status === '02'" type="warning" size="small" @click="toComment(sale._id)">评价</el-button>
        <el-button v-if="sale.status === '02'" type="danger" size="small" @click="refund(sale._id)">退款</el-button>
      </div>
    </div>
    <Empty :text="emptySale" v-if="list.length === 0"/>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
  },
  data () {
    return {
      emptySale: '订单列表为空'
    }
  },
  methods: {
    toComment (saleId) {
      location.href = '/comment?saleId=' + saleId;
    },
    toPay (saleId) {
      const submitArray = [saleId];
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
      });
    },
    refund (saleId) {
      const submitArray = [saleId];
      this.$confirm('确定退款吗?', '提示', {
        confirmButtonText: '退款',
        cancelButtonText: '未退款',
        type: 'warning'
      }).then(() => {
        // 退款
        this.$axios.post('/sales/status', {
          submitArray,
          status: '11',
        }).then(res => {
          // if(res.data.status === 200) {
          location.reload()
          // }
        })
      }).catch(() => {
        // 未退款
      });
    }
  }
}
</script>

<style lang="less">
  .sale-item {
    border-top: 1px solid #E5E5E5;
    padding: 10px;
    
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

    .sale-info {
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

    .sale-total {
      float: left;
      font-size: 12px;
      color: #666666;
      line-height: 90px;
      text-align: center;
      width: 200px;
    }

    .sale-status {
      float: left;
      font-size: 12px;
      color: #333;
      line-height: 90px;
      text-align: center;
      width: 100px;
    }

    .fn-pane {
      padding-left: 30px;
      line-height: 90px;
      margin-top: 0;
    }
  }
</style>