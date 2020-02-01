<template>
  <div class="layout-content">
    <Module headerColor="red">
      <div class="tab-pane">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="first">
            
          </el-tab-pane>
          <el-tab-pane label="约会" name="second">

          </el-tab-pane>
          <el-tab-pane label="聚餐" name="third">

          </el-tab-pane>
          <el-tab-pane label="丽人SPA" name="fourth">

          </el-tab-pane>
        </el-tabs>
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