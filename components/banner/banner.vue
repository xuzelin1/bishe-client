<template>
  <div class="banner clearfix">
    <div class="left-banner">
      <div class="category-nav-container" @mouseleave="mouseleave">
        <div class="nav-title-wrapper">
          <span class="nav-title">全部分类</span>
        </div>
        <div class="nav-content-wrapper">
          <ul>
            <li
              v-for="nav in navList"
              :key="nav.id"
              @mouseenter="enter"
              class="nav-li">
                <span :class="nav.type">{{ nav.name }}</span>
             </li>
          </ul>
        </div>
        <div class="nav-detail-wrapper" v-if="kind">
          <div
            class="detail"
            @mouseenter="sover"
            @mouseleave="sout">
            <template
              v-for="(item,idx) in curdetail.child">
              <h4 :key="idx" class="detail-title">{{ item.title }}</h4>
              <span
                class="detail-item"
                v-for="v in item.child"
                :key="v">{{ v }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="right-banner">
      <div class="header-links">
        <nuxt-link
          v-for="link in headerLink"
          :key="link.title"
          :to="link.url">{{ link.title }}</nuxt-link>
      </div>
      <div class="banner-row clearfix">
        <div style="width: 550px; height: 240px;" class="margin-right"></div>
        <div style="width: 150px; height: 240px;" class="margin-right"></div>
        <div style="width: 228px; height: 240px;" class="margin-right login-pane">
          <div class="float">
            <div class="login-container">
              <BannerLogin />
            </div>
          </div>
        </div>
      </div>
      <div class="banner-row clearfix">
        <div style="width: 270px; height: 165px;" class="margin-right margin-top"></div>
        <div style="width: 270px; height: 165px;" class="margin-right margin-top"></div>
        <div style="width: 150px; height: 165px;" class="margin-right margin-top"></div>
        <div style="width: 228px; height: 165px;" class="margin-right margin-top"></div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerLogin from '../banner-login';
export default {
  components: {
    BannerLogin,
  },
  data () {
    return {
      navList: [],
      headerLink: [
        { title: '美团外卖', url: '',},
        { title: '猫眼电影', url: '',},
        { title: '美团酒店', url: '',},
        { title: '民宿／公寓', url: '',},
        { title: '商家入驻', url: '',},
        { title: '美团公益', url: '',},
      ],
      kind: '',
    }
  },
  computed:{
    curdetail:function(){
      return this.navList.filter(item => item.type===this.kind)[0]
    }
  },
  mounted () {
    this.$axios.get('geo/menu').then((res) => {
      this.navList = res.data.menu;
    })
  },
  methods: {
    mouseleave:function(){
      let self=this;
      self._timer=setTimeout(function(){
        self.kind=''
      },150)
    },
    enter (e) {
      this.kind=e.target.querySelector('span').className;
    },
    sover:function(){
      clearTimeout(this._timer)
    },
    sout:function(){
      this.kind=''
    }
  }
};
</script>

<style lang="less">
  .banner {
    width: 1190px;
    margin: 0 auto;
    position: relative;

    .left-banner {
      float: left;

      .category-nav-container {
        width: 230px;
        height: 475px;
        position: relative;
        text-align: left;
        float: left;
        margin-top: -50px;
        color: #646464;
        background: #FFF;
        box-sizing: border-box;
        border: 1px solid #E5E5E5;

        .nav-title-wrapper {
          height: 50px;
          padding-top: 15px;
          box-sizing: border-box;

          .nav-title {
            color: #222222;
            font-size: 16px;
            font-weight: 700;
            margin-left: 15px;
          }
        }

        .nav-content-wrapper {
          ul {
            padding: 10px 8px;
            height: 425px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            margin: 0;
            justify-content: space-between;

            .nav-li {
              list-style: none;
              font-size: 13px;
              line-height: 20px;
              height: 20px;
              color: #646464;
              cursor: pointer;

              .title:not(:last-child){
                &::after {
                  content: ' / ';
                }
              }
            }
          }
        }

        .nav-detail-wrapper {
          position: absolute;
          top: 60px;
          left: 230px;
          width: 400px;
          height: 416px;
          background-color: #fff;
          z-index: 199;
          color: #666;
          overflow: hidden;
          padding: 15px;

          .detail-title {
            border-bottom: 1px solid #666;
            padding: 10px;
          }
          .detail-item {
            display: inline-block;
            margin: 8px;
            font-size: 14px;
          }
        }
      }
    }

    .right-banner {
      float: left;
      margin-left: 10px;
      margin-top: 10px;
      position: relative;

      .header-links {
        position: absolute;
        top: -45px;
        left: 20px;

        a {
          color: #222;
          font-weight: 700;
          font-size: 16px;
          margin: 0 20px;
          cursor: pointer;
          position: relative;
        }
      }

      .margin-right {
        background: #fff;
        float: left;
      }
      .margin-top {
        margin-top: 10px;
      }
      .margin-right:not(:last-child) {
        margin-right: 10px;
      }
    }

    .login-container {
      width: 228px;
      height: 238px;
      background-color: #fff;
      border: 1px solid #e5e5e5;
    }
  }
</style>