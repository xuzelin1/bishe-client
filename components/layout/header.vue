<template>
  <div class="layout-header">
    <Bar />
    <Content />
  </div>
</template>

<script>
import Bar from './header/bar';
import Content from './header/content';
export default {
  components: {
    Bar,
    Content,
  },
}
</script>

<style lang="less">
  .layout-header {
    background-color: #fff;
    box-shadow: 0 2px 27px 0 rgba(0,0,0,0.10);
  }
</style>