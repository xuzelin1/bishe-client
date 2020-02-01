<template>
  <div class="module">
    <div class="module-content clearfix">
      <div :style="{ backgroundColor: headerColor }" class="nav-content"/>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headerColor: String,
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
  .module {
    background-color: #fff;
    .module-content {
      margin: 40px auto;
      .nav-content {
        width: 100%;
        height: 44px;
        line-height: 44px;
        box-sizing: border-box;
        font-size: 14px;
        color: #fff;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        margin-bottom: -44px;
      }
    }
  }
  
</style>