<template>
  <div class="layout-content">
    <Module headerColor="#c1ab84">
      <div class="tab-pane">
        <ul class="tabs">
          <li class="tab-title">有格调</li>
          <li
            @click="changeTab(item)"
            v-for="item in tabs"
            :key="item.key"
            class="tab-item"
            :class="{active: tabKind===item.key}">
            {{ item.name }}
          </li>
        </ul>
        <ul class="contents">
          <li
            class="tab-content-item"
            v-for="item in curList"
            :key="item.id">
            <div class="quality-img">
              <img :src="item.photos[0].url" alt="">
            </div>
            <p class="name">{{ item.name }}</p>
            <p class="type">{{ item.type }}</p>
          </li>
        </ul>
      </div>
    </Module>
  </div>
</template>

<script>
  import Module from '@/components/module';
  export default {
    components: {
      Module,
    },
    data () {
      return {
        activeName: 0,
        tabKind: '景点',
        tabType: 'all',
        tabs: [
          {
            name: '全部',
            key: '景点',
            type: 'all',
          },{
            name: '约会聚餐',
            key: '美食',
            type: 'part',
          },{
            name: '丽人SPA',
            key: '丽人',
            type: 'spa',
          },
          // {
          //   name: '电影演出',
          //   key: '电影',
          //   type: 'movie',
          // },
          {
            name: '品质出游',
            key: '旅游',
            type: 'travel',
          },
        ],
        tabDataList: {
          all: [],
          part: [],
          spa: [],
          movie: [],
          travel: [],
        },
      };
    },
    computed: {
      curList () {
        return this.tabDataList[this.tabType];
      }
    },
    mounted () {
      this.getList('景点', 'all');
    },
    methods: {
      changeTab (item) {
        this.tabKind = item.key;
        this.tabType = item.type;
        this.getList(item.key, item.type);
      },
      getList (keyword, type) {
        this.$axios.get('/search/resultsByKeywords', {
          params:{
            keyword,
            city:'广州'
          }
        }).then(res => {
          const { pois, count } = res.data
          // let ran = parseInt(Math.random() * count - 6);
          // this.tabDataList[type] = pois.slice(ran, ran + 6);
          this.tabDataList[type] = pois.slice(0, 6);
        })
      }
    }
  };
</script>

<style lang="less">
  .layout-content {
    margin: 0 auto;
    width: 1190px;

    .tab-pane {
      padding-left: 10px;
      padding-right: 10px;
      /deep/ .el-tabs__nav-wrap ::after {
        width: 0;
      }

      .tabs {
        padding: 0;
        margin: 0;
        line-height: 44px;
        overflow: hidden;

        .tab-title {
          font-size: 18px;
          font-weight: 600;
          margin-left: 13px;
          margin-right: 10px;
          color: #fff;
          float: left;
          list-style: none;
        }

        .active {
          color: #5b6980 !important;
        }

        .tab-item {
          font-size: 14px;
          color: #fff;
          list-style: none;
          float: left;
          padding: 0 5px;
          position: relative;
          cursor: pointer;
          text-transform: uppercase;
        }
      }

      .contents {
        padding: 0;
        margin: 0;
        overflow: hidden;

        .tab-content-item {
          width: 33.3%;
          height: 314px;
          list-style: none;
          float: left;

          .quality-img {
            max-width: 100%;
            height: 208px;
            cursor: pointer;
            padding: 10px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 4px;
            }
          }

          .name {
            padding-left: 10px;
            margin-top: 5px;
          }
          .type {
            padding-left: 10px;
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      
    }
  }
</style>