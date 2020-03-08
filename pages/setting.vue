<template>
  <div class="setting-page">
    <Header />
    <div class="container">
      <div class="my-order">
        <h3>我的菜单</h3>
        <div class="item">
          <nuxt-link to="/cart">我的订单</nuxt-link>
          <i class="el-icon-arrow-right" style=""></i>
        </div>
        <div class="item">
          <nuxt-link to="/cart">我的购物车</nuxt-link>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="setting-content">
        <h3>个人信息</h3>
        <p>账户设置</p>
        <div class="content-item clearfix">
          <p class="item-title">头像</p>
          <div class="avatar">
            <img src="https://img.meituan.net/avatar/b3f80e2be1be1c5cd9357422f01f504f2028.jpg" alt="">
          </div>
          <button class="btn-change">修改</button>
        </div>
        <div class="content-item clearfix">
          <p class="item-title">头像</p>
          <p class="item-con">jack</p>
          <button class="btn-change">修改</button>
        </div>
        <div class="content-item clearfix">
          <p class="item-title">登录密码</p>
          <p class="item-con">安全强度：弱</p>
          <button class="btn-change">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },
}
</script>

<style lang="less">
  .clearfix:after {
    content: " ";
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }
  .container {
    margin: 20px auto;
    width: 1190px;

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

    .setting-content {
      border: 1px solid #E5E5E5;
      border-radius: 4px;
      min-height: 200px;
      width: 888px;
      float: right;
      background: #fff;
      padding: 30px;
      padding-bottom: 0;

      h3 {
        margin: 0;
      }
      p {
        font-size: 14px;
      }

      .content-item {
        padding: 20px 0;
        border-top: 1px solid #E5E5E5;
        height: 60px;

        .item-title {
          margin: 0;
          font-size: 18px;
          border-right: 1px solid #E5E5E5;
          padding-right: 20px;
          padding-left: 40px;
          float: left;
          width: 100px;
          line-height: 60px;
        }

        .avatar {
          float: left;
          width: 60px;
          height: 60px;
          overflow: hidden;
          border-radius: 50%;
          margin-left: 30px;
          line-height: 60px;

          img {
            width: 60px;
            height: 60px;
          }
        }

        .item-con {
          line-height: 60px;
          font-size: 16px;
          padding-left: 30px;
          margin: 0;
          float: left;
        }

        .btn-change {
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 100px;
          font-size: 14px;
          color: #666666;
          float: right;
          height: 40px;
          width: 82px;
          cursor: pointer;
          margin: 0 15px;
          line-height: 40px;
          text-align: center;
        }
      }
    }
  }
</style>