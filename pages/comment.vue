<template>
  <div class="comment-page">
    <Header />
    <div class="comment-container">
      <MyOrder />
      <div class="comment-pane">
        <div class="sale-info">
          <div class="img-pane">
            <img :src="saleDetail.proId.url" alt="">
          </div>
          <div class="infos">
            <h3>{{ saleDetail.proId.name }}</h3>
            <div>数量：{{ saleDetail.productNum }} 总价：{{ saleDetail.total }}</div>
            <div>{{ saleDetail.createTime }}</div>
          </div>
        </div>
        <div class="rate-pane">
          <span>评分：</span>
          <el-rate
            style="display: inline-block;"
            v-model="commentForm.star"
            show-text>
          </el-rate>
        </div>
        <el-input
          style="margin-top: 15px"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="commentForm.content">
        </el-input>

        <el-button type="primary" class="submit-btn" @click="addComment">提交评价</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import commentList from '@/components/comment-list'
export default {
  components: {
    commentList,
  },
  data () {
    return {
      commentForm: {
        saleId: '',
        content: '',
        createTime: '2020-03-15',
        star: 0,
      },
      saleDetail: {
        proId: {}
      },
    }
  },
  mounted () {
    this.commentForm.saleId = this.$router.currentRoute.query.saleId;
    console.log( this.$router)
    this.$axios.post('/sales/detail', {_id: this.commentForm.saleId})
      .then(res => {
        this.saleDetail = res.data.detail;
        console.log(this.saleDetail);
      })
  },
  methods: {
    addComment () {
      console.log(this.commentForm);
      const {
        saleId,
        content,
        createTime,
        star,
      } = this.commentForm;
      this.$axios.post('/comments/create', {
        proId: this.saleDetail.proId._id,
        content,
        createTime,
        star,
      }).then(res => {
        console.log(res);
        if(res.status == 200) {
          let submitArray = [];
          submitArray.push(saleId);
          this.$axios.post('/sales/status', {
            submitArray,
            status: '03',
          }).then(res => {
            // if(res.data.status === 200) {
            location.reload()
            // }
          })
          this.$router.push({
            path: 'detail?proId=' + this.saleDetail.proId._id,
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
  .comment-container {
    width: 1190px;
    margin: 20px auto;
    margin-top: -35px;

    .comment-pane {
      padding: 20px;
      background-color: #fff;
      width: 908px;
      float: right;
      border: 1px solid #efefef;

      .sale-info {
        overflow: hidden;
        padding-bottom: 20px;
        .img-pane {
          width: 120px;
          height: 120px;
          overflow: hidden;
          border-radius: 15px;
          float: left;

          img {
            width: 120px;
            height: 120px;
          }
        }

        .infos {
          float: left;
          line-height: 40px;
          margin-left: 20px;

          h3 {
            margin: 0;
          }
        }
      }

    }

    .submit-btn {
      float: right;
      margin-top: 10px;
    }
  }
</style>