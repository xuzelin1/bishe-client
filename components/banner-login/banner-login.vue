<template>
  <div class="banner-login">
    <div class="head-img-row">
      <img src="https://s0.meituan.net/bs/fe-web-meituan/e350c4a/img/avatar.jpg" alt="">
    </div>
    <p class="user-name">Hi！您好</p>
    <nuxt-link to="/register" class="btn-login">注册</nuxt-link>
    <nuxt-link to="/" class="btn-login">登录</nuxt-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
  .banner-login {
    padding-top: 30px;
    position: relative;

    .head-img-row {
      border-radius: 30px;
      margin: 0px auto 4px auto;
      text-align: center;

      img {
        width: 47px;
        height: 47px;
        border-radius: 50%;
        border: 4px solid #E5E5E5;
      }
    }
    .user-name {
      font-size: 16px;
      color: #222;
      text-align: center;
      font-weight: 500;
      white-space: nowrap;
      width: 6em;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0 auto;
    }

    .btn-login {
      width: 118px;
      text-align: center;
      margin: 10px auto 15px auto;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 40px;
      font-size: 14px;
      color: #333;
      transition: background-color 0.5s;
      display: block;
      line-height: 38px;

      &:hover {
        background-color: #f6f6f6;
        transition: background-color 0.5s;
      }
    }
  }
</style>