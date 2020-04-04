<template>
  <div class="header-content clearfix">
    <div class="header-title-module">
      <a href="/" class="header-title">
        <img src="https://dss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/0cd7912397dda144ec297cbdb5b7d0a20cf48698.jpg" alt="">
      </a>
    </div>
    <div class="header-search-module">
      <search />
    </div>
  </div>
</template>

<script>
import search from './search';
export default {
  components: {
    search,
  }
}
</script>

<style lang="less">
  .header-content {
    padding-bottom: 35px;
    width: 1190px;
    margin: 0 auto;

    .header-title-module {
      float: left;
      padding-top: 28px;
      padding-right: 60px;
      padding-bottom: 40px;
      font-size: 16px;
      min-width: 220px;
      height: 54px;
      box-sizing: content-box;
      vertical-align: sub;

      img {
        // width: 126px;
        // height: 46px;
        width: 80px;
        height: 80px;
        border: 0;
      }
    }

    .header-search-module {
      float: left;
      padding-top: 28px;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      z-index: 999;
    }
  }
</style>