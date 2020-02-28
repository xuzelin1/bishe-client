<template>
  <div class="m-geo">
    <i class="el-icon-location"/>
      <!-- {{ $store.state.geo.position.city }} -->
      {{ city }}
    <nuxt-link
      class="changeCity"
      to="/changeCity">切换城市</nuxt-link>
    [白云区 番禺区 天河区]
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data () {
    return {
      province: "",
      city: "",
    };
  },
  mounted () {
    this.$axios.get('geo/getPosition').then(({ data }) => {
      this.province = data.province;
      this.city = data.city;
    })
  },
}
</script>

<style lang="css">
</style>
