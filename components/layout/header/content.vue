<template>
  <div class="header-content clearfix">
    <div class="header-title-module">
      <a href="" class="header-title">
        <img src="https://s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="">
      </a>
    </div>
    <div class="header-search-module">
      <div class="search-block">
        <input type="text" class="search-input" placeholder="搜索商家或地点">
        <button class="search-btn">
          <i class="el-icon-search"/>
        </button>
      </div>
      <div class="search-suggest">

      </div>
    </div>
  </div>
</template>

<script>
export default {

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
        width: 126px;
        height: 46px;
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

      .search-block {
        width: 550px;
        height: 40px;
        background: #fff;

        .search-input {
          border: 1px solid #E5E5E5;
          border-right: none;
          border-radius: 4px 0 0 4px;
          line-height: 100%;
          box-sizing: border-box;
          display: inline-block !important;
          padding: 15px;
          font-size: 14px;
          height: 100%;
          background: transparent;
          width: 85.45%;
        }

        .search-btn {
          outline: none;
          width: 14.55%;
          box-sizing: border-box;
          line-height: 100%;
          height: 100%;
          background: #FFC300;
          border: none;
          float: right;
          color: #222222;
          cursor: pointer;
          border-bottom-right-radius: 4px;
          border-top-right-radius: 4px;
        }
      }
    }
  }
</style>