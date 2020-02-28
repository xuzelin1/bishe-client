<template>
  <div class="layout-content">
    <Module headerColor="red">
      <div class="tab-pane">
        
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
      };
    },
    methods: {
      handleClick () {

      },
    }
  };
</script>

<style lang="less">
  .layout-content {
    margin: 0 auto;
    width: 1190px;

    .tab-pane {
      padding-left: 10px;
      /deep/ .el-tabs__nav-wrap ::after {
        width: 0;
      }
    }
  }
</style>