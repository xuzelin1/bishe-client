<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iSelect/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <categroy/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '../components/iselect';
import Hot from '../components/hot'
import Categroy from '../components/categroy'
export default {
  components:{
    iSelect,
    Hot,
    Categroy
  }
}
</script>

<style lang="css">
</style>
