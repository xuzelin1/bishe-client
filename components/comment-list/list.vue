<template>
  <div class="m-comments-list">
    <ul class="comment-list">
      <li
        v-for="(item) in commentList"
        :key="item._id">
        <div class="comment-item">
          <div class="user-avatar">
            <img :src="item.userId.avatar" alt="">
          </div>
          <div class="comment-detail">
            <div class="user-name">{{ item.userId.username }}</div>
            <div class="rate-time">
              <el-rate v-model="item.star" disabled style="display: inline-block"></el-rate>
              <div class="create-time">{{ item.createTime }}</div>
              <p class="comment-coontent">{{ item.content }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    proId: String,
  },
  data() {
    return {
      commentList: [],
    }
  },
  mounted () {
    this.getCommentList();
  },
  methods: {
    getCommentList () {
      let res = this.$axios.post('/comments/list', {
        proId: this.proId,
      }).then(res => {
        this.commentList = res.data.list;
      })
    },
  }
}
</script>

<style lang="less" scoped>

  .comment-list {
    width: 100%;
    margin-top: 20px;
    border-top: 1px solid #efefef;
    padding: 0;
  }

  li {
    list-style: none;
  }

  .comment-item {
    display: flex;
    .user-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      float: left;
      padding: 15px;

      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
      }
    }

    .comment-detail {
      width: calc(100% - 80px);

      .user-name {
        padding-top: 15px;
        font-size: 18px;
      }

      .create-time {
        font-size: 14px;
        color: #666;
      }

      .comment-coontent {
        line-height: 2em;
      }
    }
  }

</style>
