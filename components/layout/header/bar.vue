<template>
  <div class="header-bar">
    <div class="header-bar-content">
      <div class="header-bar-position">
        <i class="el-icon-location"></i>
        广州市
        <nuxt-link to="" class="change-city">切换城市</nuxt-link>
        <span>[</span>
        <span>白云区</span>
        <span>番禺区</span>
        <span>天河区</span>
        <span>]</span>
      </div>
      <div class="header-bar-nav">
        <span class="nav-item" v-for="nav in navList" :key="nav.label">
          {{ nav.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: [
        {
          label: '我的美团',
        },
        {
          label: '商家中心',
        },
        {
          label: '美团规则',
        },
        {
          label: '网站导航',
        },
      ]
    }
  }
}
</script>

<style lang="less">
  .header-bar {
    background-color: #f8f8f8;
    width: 100%;
    height: 40px;
    font-size: 12px;
    color: #999;

    .header-bar-content {
      width: 1190px;
      margin: 0 auto;

      .header-bar-position {
        float: left;
        padding-top: 12px;

        .change-city {
          background: #F4F4F4;
          border: 1px solid #E5E5E5;
          border-radius: 2px;
          color: #666;
          margin: 0 4px;
          padding: 0 2px;
        }
      }
      .header-bar-nav {
        float: right;

        .nav-item {
          float: left;
          position: relative;
          height: 40px;
          padding: 12px 14px;
          box-sizing: border-box;
          border-left: 1px solid transparent;
          border-right: 1px solid transparent;
        }
      }
    }
  }
</style>