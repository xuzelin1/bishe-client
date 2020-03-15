<template>
  <div class="user-info">
    <Header />
    <div class="userinfo-container">
      <MyOrder />

      <div class="sale-list-container" v-if="tabStatus">
        <ul class="tab-pane">
          <li
            v-for="tab in userfnList"
            :key="tab.icon"
            :class="{active: tab.status === tabStatus}"
            @click="tabStatus = tab.status">
            {{ tab.title }}
          </li>
        </ul>
        <SaleList :list="saleList"/>
      </div>

      <div class="info-page" v-else>
        <div class="user-info-box">
          <div class="user-info">
            <div class="user-avatar">
              <img :src="userInfo.avatar" alt="">
            </div>
            <div class="nick-name">
              <h3 class="name">{{ userInfo.user }}</h3>
              <p class="email">{{ userInfo.email }}</p>
            </div>
            <nuxt-link to="setting" class="setting-link">
              个人信息设置
              <i class="el-icon-arrow-right"></i>
            </nuxt-link>
          </div>
          <div class="userfn-ls">
            <ul>
              <li
                v-for="fn in userfnList"
                :key="fn.icon"
                class="fn-item"
                @click="getSaleList(fn.status)">
                <i :class="fn.icon"></i>
                <span>{{ fn.title }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="other-product-list">
          <h3 style="margin-top: 0">猜你喜欢</h3>
          <ProductList :list="guessList"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from '@/components/product-list'
import SaleList from '@/components/sale-list'
export default {
  components: {
    ProductList,
    SaleList,
  },
  data () {
    return {
      userInfo: {},
      userfnList: [
        {
          icon: 'el-icon-s-order',
          title: '全部订单',
          status: '-1',
        },
        {
          icon: 'el-icon-s-finance',
          title: '待付款',
          status: '01',
        },
        {
          icon: 'el-icon-s-comment',
          title: '待评价',
          status: '02',
        },
        {
          icon: 'el-icon-s-release',
          title: '退款/售后',
          status: '11',
        },
      ],
      guessList: [],
      saleList: [],
      tabStatus: "",
    };
  },
  mounted () {
    this.getGuessList('手机')
    this.getUserInfo();
  },
  watch: {
    tabStatus (value) {
      this.$axios.post('/sales/salelist', {
        userId: this.userInfo._id,
        status: value,
      }).then(res => {
        console.log(res);
        this.saleList = res.data.salelist;
      })
    },
  },
  methods: {
    getUserInfo() {
      this.$axios.get('users/getUser').then(res => {
        if(res.data.code === -1) {
          location.href = '/login';
        }
        this.userInfo = res.data;
      });
    },
    getGuessList (guess) {
      this.$axios.post('/products/guess', {
        guess,
      }).then(res => {
        this.guessList = res.data.guesslist;
      })
    },
    getSaleList (status) {
      this.tabStatus = status;
    }
  }
}
</script>

<style lang="less">
  .userinfo-container {
    width: 1190px;
    margin: 20px auto;
    margin-top: -35px;

    .sale-list-container,
    .info-page {
      width: 948px;
      float: right;
      border: 1px solid #efefef;
    }

    .sale-list-container {
      padding: 10px;
      width: 928px;
      background-color: #fff;

      .tab-pane {

        padding: 0;

        &::after {
          content: '';
          display: block;
          clear: both;
        }

        li {
          cursor: pointer;
          list-style: none;
          float: left;
          width: 15%;
          text-align: center;
        }

        .active {
          color: #ffc300;
        }
      }
    }

    .other-product-list {
      background-color: #fff;
      width: 910px;
      margin: auto;
      padding: 20px;
      margin-top: 20px;
      box-shadow: 0 5px 14px 0 rgba(0, 0, 0, 0.1);
      border-radius: 15px;
    }

    .user-info-box {
      box-shadow: 0 5px 14px 0 rgba(0,0,0,0.10);
      border: 1px solid #E5E5E5;
      border-radius: 4px;
      min-height: 200px;
      width: 100%;
      // float: right;
      background: #fff;
      padding-bottom: 0;

      .user-info {
        width: 948px;
        height: 209px;
        background: #FFD000;
        background-image: linear-gradient(to bottom right,#FFD000,#FFBD00);
        border-radius: 4px 4px 0 0;

        .user-avatar {
          width: 110px;
          height: 110px;
          border: 10px solid rgba(248,248,248,0.5);
          border-radius: 100%;
          position: relative;
          float: left;
          top: 38px;
          left: 30px;

          img {
            height: 100%;
            width: 100%;
            border-radius: 100%;
            box-shadow: 0 3px 7px 0 rgba(189,92,0,0.53);
            border: 0px;
            object-fit: cover;
          }
        }

        .nick-name {
          float: left;
          color: #222222;
          position: relative;
          left: 51px;
          top: 70px;
          font-weight: 500;

          .name {
            margin-top: 0;
          }
        }

        .setting-link {
          color: #222222;
          float: right;
          font-size: 14px;
          position: relative;
          left: -30px;
          top: 90px;
        }
      }

      .userfn-ls {
        width: 100%;
        height: 110px;
        background: #fff;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;

        ul {
          position: relative;
          top: 20px;
          width: 850px;
          margin-left: 100px;

          .fn-item {
            cursor: pointer;
            list-style: none;
            float: left;
            width: 170px;
            position: relative;

            i {
              color: #fe8b40;
              font-size: 50px;
            }

            span {
              display: inline-block;
              height: 50px;
              position: absolute;
              line-height: 50px;
              padding-left: 8px;
              color: #666;
            }
          }
        }
      }
    }
  }


</style>