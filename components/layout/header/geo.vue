<template>
  <div class="m-geo">
    <i class="el-icon-location"/>
      <!-- {{ $store.state.geo.position.city }} -->
      {{ position.city }}
    <nuxt-link
      class="changeCity"
      to="/changeCity">切换城市</nuxt-link>
    <!-- [白云区 番禺区 天河区] -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data () {
    return {
      province: "",
      city: "",
    };
  },
  mounted () {
    if(!this.position.city) {
      this.$axios.get('geo/getPosition').then(({ data }) => {
        this.province = data.province;
        this.city = data.city;
        this.setPosition({
          province: this.province,
          city: this.city,
        })
      })
    }
  },
  computed: {
    ...mapState('modules/geo', [
      'position'
    ])
  },
  methods: {
    ...mapActions('modules/geo', [
      'setPosition'
    ])
  }
}
</script>

<style lang="css">
</style>
