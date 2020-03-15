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
                :key="v">
                <nuxt-link :to="'/products?type=' + v">
                  {{ v }}
                </nuxt-link>
              </span>
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
        <div style="width: 550px; height: 240px;" class="margin-right">
          <el-carousel height="240px">
            <el-carousel-item v-for="item in carouselUrls" :key="item">
              <!-- <h3 class="small">{{ item }}</h3> -->
              <img :src="item" alt="" style="width: 550px; height: 240px;">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div style="width: 150px; height: 240px;" class="margin-right">
          <img src="http://p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg" alt="" style="width: 150px; height: 240px;">
        </div>
        <div style="width: 228px; height: 240px;" class="margin-right login-pane">
          <div class="float">
            <div class="login-container">
              <BannerLogin />
            </div>
          </div>
        </div>
      </div>
      <div class="banner-row clearfix">
        <div style="width: 270px; height: 165px;" class="margin-right margin-top">
          <img src="http://p1.meituan.net/codeman/8cce56c467a17e04f3094d1e455462a0132772.png" alt="" style="width: 270px; height: 165px;">
        </div>
        <div style="width: 270px; height: 165px;" class="margin-right margin-top">
          <img src="http://p1.meituan.net/codeman/16442c19da1f1c4544f794e29d99c92051716.jpg" alt="" style="width: 270px; height: 165px;">
        </div>
        <div style="width: 150px; height: 165px;" class="margin-right margin-top">
          <img src="http://p1.meituan.net/codeman/5b21cddb4bb1cbc3a9c3bce0f726c75940469.jpg" alt="" style="width: 150px; height: 165px;">
        </div>
        <div style="width: 228px; height: 165px; position: relative" class="margin-right margin-top">
          <div class="advertising">广告</div>
          <img src="https://p1.meituan.net/dpmerchantpic/ab800e5c54adb2b32801ed151993125279014.jpg@213w_120h_1e_1c" alt="" style="width: 228px; height: 165px;">
        </div>
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
        { title: '广工外卖', url: '',},
        { title: '猫眼电影', url: '',},
        { title: '广工酒店', url: '',},
        { title: '民宿／公寓', url: '',},
        { title: '商家入驻', url: '',},
        { title: '广工公益', url: '',},
      ],
      kind: '',
      carouselUrls: [
        'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg',
        'http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg',
        'https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png',
        'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg',
      ],
    }
  },
  computed:{
    curdetail:function(){ 
      return this.navList.filter(item => item.type===this.kind)[0]
    }
  },
  mounted () {
    const item = {
      child: [
        {
          child: [
            '电子商品'
          ],
          title: '电子商品',
        }
      ],
      name: '日常用品',
      type: 'common',
    }
    this.$axios.get('geo/menu').then((res) => {
      this.navList = res.data.menu.concat([item]);
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

        .advertising {
          position: absolute;
          color: #FFF;
          background: #dfdfdf;
          opacity: 0.7;
          right: 0;
          top: 0;
        }
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