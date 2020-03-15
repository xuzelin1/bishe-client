<template>
  <div class="product-detail">
    <Header />
    <div class="detail-container">
      <div class="detail-info">
        <h2>{{ productDetail.name }}</h2>
        <div class="rate-price">
          评价：<el-rate v-model="productDetail.star" disabled style="display: inline-block"></el-rate>
          <span>人均价格：{{ productDetail.price }}</span>
        </div>
        <div class="other-info">
          <p>介绍：{{ productDetail.desc }}</p>
          <p>地址：{{ productDetail.position }}</p>
        </div>
        <div class="bottom-info">
          月销量：{{ productDetail.salenum }}
          <el-button icon="el-icon-shopping-cart-2" type="danger" circle @click="dialogCartVisible = true"></el-button>
        </div>
      </div>
      <div class="detail-imgs">
        <div class="img-pane">
          <img :src="productDetail.url" alt="">
        </div>
      </div>
    </div>

    <div class="other-product-list">
      <h3 style="margin-top: 0">猜你喜欢</h3>
      <ProductList :list="guessList"/>
    </div>

    <div class="comment-pane">
      <h3 style="margin-top: 0">网友点评</h3>
      <CommentList :proId="curId"/>
    </div>

    <el-dialog title="加入购物车" :visible.sync="dialogCartVisible">
      <h3>请输入购买数量</h3>
      <div class="num-pane">
        <el-button :disabled="productNum === 1" @click="productNum--">-</el-button>
        <el-input v-model="productNum" style="width: 30%;"></el-input>
        <el-button @click="productNum++">+</el-button>
      </div>
      <el-button type="primary" style="float: right;" @click="cartAddSubmit">确认</el-button>
    </el-dialog>
  </div>
</template>

<script>
import ProductList from '@/components/product-list'
import CommentList from '@/components/comment-list'
export default {
  data () {
    return {
      curId: '',
      productDetail: {},
      guessList: [],
      dialogCartVisible: false,
      productNum: 1,
    }
  },
  components: {
    ProductList,
    CommentList,
  },
  mounted () {
    this.curId = this.$router.currentRoute.query.proId;
    this.getDetail(this.curId);
  },
  methods:{
    getDetail(_id) {
      this.$axios.post('/products/detail', {
        _id,
      }).then(res => {
        this.productDetail = res.data.data;
        this.getGuessList(this.productDetail.keywords)
      })
    },
    getGuessList (guess) {
      this.$axios.post('/products/guess', {
        guess,
      }).then(res => {
        this.guessList = res.data.guesslist;
      })
    },
    cartAddSubmit () {
      this.$axios.post('/sales/create', {
        proId: this.productDetail._id,
        userId: '5e4624759c2f7d2cb0cfa154',
        createTime: '2020-03-15',
        total: this.productNum * this.productDetail.price,
        productNum: this.productNum,
        status: '00',
      }).then(res => {
        if(res.status == 200) {
          this.$message({
            message: '已经加入购物车',
            type: 'success'
          });
        }
      })
    }
  }
}
</script>

<style lang="less">
  .product-detail {

    .detail-container {
      margin: auto;
      width: 1190px;
      height: 250px;
      border-radius: 20px;
      background-color: #fff;
      box-shadow: 0 5px 14px 0 rgba(0,0,0,.1);
      display: flex;
      align-items: center;
      padding: 20px;
      margin-top: 20px;

      .detail-info {
        width: 800px;
        height: 100%;

        .rate-price {
          padding: 0 15px 20px 0;
          border-bottom: 1px solid #efefef;
          margin-right: 20px;
        }

        .other-info {
          border-bottom: 1px solid #efefef;
          margin-right: 20px;
        }

        .bottom-info {
          height: 50px;
          line-height: 50px;

          .el-button {
            float: right;
            margin-top: 10px;
            margin-right: 24px;
          }
        }
      }

      .detail-imgs {
        border-radius: 10px;
        width: 450px;
        height: 240px;
        overflow: hidden;
        img {
          width: 450px;
          height: 240px;
          object-fit: cover;
        }
      }
    }

    .comment-pane,
    .other-product-list {
      background-color: #fff;
      width: 1190px;
      margin: auto;
      padding: 20px;
      margin-top: 50px;
      box-shadow: 0 5px 14px 0 rgba(0,0,0,.1);
      border-radius: 15px;

      li {
        list-style: none;
      }
    }

    .num-pane {
      margin: auto;
    }

    /deep/ .el-dialog__body {
      overflow: hidden;
    }
  }
</style>
