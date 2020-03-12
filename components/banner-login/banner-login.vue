<template>
  <div v-if="!userInfo.user" class="banner-login">
    <div class="head-img-row">
      <img src="https://s0.meituan.net/bs/fe-web-meituan/e350c4a/img/avatar.jpg" alt="">
    </div>
    <p class="user-name">Hi！您好</p>
    <nuxt-link to="/register" class="btn-login">注册</nuxt-link>
    <nuxt-link to="/login" class="btn-login">登录</nuxt-link>
  </div>
  <div v-else class="banner-login">
    <div class="avatar-pane">
      <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
      <img :src="require('@/assets/images/default-avatar.png')" alt="">
    </div>
    <p class="user-name">{{ userInfo.user }}</p>
    <p class="user-mail">{{ userInfo.email }}</p>

    <div class="edit">
      <nuxt-link to="/setting">
        <i class="el-icon-setting"></i>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        user: '',
        email: '',
        avatar: '',
      },
    };
  },
  mounted () {
    this.$axios.get('users/getUser').then(res => {
      this.userInfo = res.data;
    });
  }
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
    .user-mail {
      text-align: center;
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

    .avatar-pane {
      width: 50px;
      height: 50px;
      margin: auto;
      overflow: hidden;
      border-radius: 50%;
      margin-bottom: 15px;

      img {
        width: 50px;
        height: 50px;
      }
    }

    .edit {
      position: absolute;
      right: 10px;
      top: 10px;

      i {
        color: #000;
        font-size: 26px;
      }
    }
  }
</style>