<template>
  <div class="m-products-list">
    <!-- <dl style="text-align: center;">
      <dd
        v-for="item in nav"
        :key="item.name"
        :class="[item.name,item.acitve?'s-nav-active':'']"
        @click="navSelect"
      >{{ item.txt }}</dd>
    </dl> -->
    <ul class="product-list">
      <!-- <Item
        v-for="(item,idx) in productList"
        :key="idx"
        :meta="item"/> -->
      <li
        v-for="(item) in dataList"
        :key="item._id">
        <div class="product-item">
          <div class="img-pane">
            <img :src="item.url
              || 'https://p1.meituan.net/deal/6277acb85ab92a7800ef95ffaa62dc93121399.jpg@58_0_1484_900a%7C388h_640w_2e_90Q%7C213w_120h_1e_1c'" alt="">
          </div>
          <div class="item-info">
            <nuxt-link :to="'detail?id=' + item._id">
              <h3>{{ item.name }}</h3>
            </nuxt-link>
            <span class="star">评分：
              <el-rate v-model="item.star" disabled style="display: inline-block"></el-rate>
            </span>
            <span class="comment-num">{{ item.commentNum }}条评价</span>
            <p class="position">{{ item.position }}</p>
            <span class="cur">￥{{ item.price }}</span>
            <del class="old">门市价：{{ item.oldPrice }}</del>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Item from '@/components/product'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      productList: [],
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          acitve: true
        }, {
          name: 's-price',
          txt: '价格最低',
          active: false
        }, {
          name: 's-visit',
          txt: '人气最高',
          active: false
        }, {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ]
    }
  },
  computed: {
    dataList () {
      console.log(this.list);
      if(this.list.length > 0) {
        return this.list;
      }
      return this.productList;
    }
  },
  mounted () {
    if (this.list.length === 0) {
      this.getProductList();
    }
  },
  methods: {
    getProductList () {
      let res = this.$axios.post('/products/list', {
        type: 'electircy'
      }).then(res => {
        console.log(res);
        this.productList = res.data.data;
      })
    },
    navSelect: function () {
      console.log('select')
    }
  }
}
</script>

<style lang="less" scoped>

  li {
    list-style: none;
  }

  .product-list {
    width: 100%;
    margin-top: 20px;
    border-top: 1px solid #efefef;
  }

  .product-item {
    height: 145px;
    padding: 10px 0;
    border-bottom: 1px solid #efefef;

    &::after {
      content: '';
      display: block;
      clear: both;
      *zoom: 1;
    }
    .img-pane {
      height: 125px;
      width: 220px;
      border-radius: 5px;
      overflow: hidden;
      float: left;
      margin-top: 10px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .item-info {
      padding-left: 20px;
      float: left;

      a {
        color: #000;
      }

      .star {
        font-size: 12px;
        padding-right: 8px;
      }
      .comment-num {
        color: #ff6600;
        font-size: 12px;
      }

      .position {
        font-size: 12px;
        color: #666;
      }

      .cur {
        font-size: 18px;
        color: #ff6600;
      }

      .old {
        font-size: 12px;
        color: #666;
      }
    }
  }

</style>
