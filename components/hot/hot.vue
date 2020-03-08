<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd
        @click="changeCity(item)"
        v-for="item in list"
        :key="item.id">{{ item.name==='市辖区'?item.province:item.name }}</dd>
    </dl>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data(){
    return {
      list:[]
    }
  },
  async mounted(){
    let {status,data:{hots}}=await this.$axios.get('/geo/hotCity')
    if(status===200){
      this.list=hots
    }
  },
  methods: {
    ...mapActions('modules/geo', [
      'setPosition'
    ]),
    changeCity (item) {
      let province = item.province;
      let city = item.name;
      if(item.name==='市辖区') {
        city = item.province;
      }
      this.setPosition({
        province: province,
        city: city
      })
    }
  }
}
</script>

<style lang="less">
.m-hcity {
  dl {
    display: flex;

    dt {
      font-size: 16px;
      color: #333;
      font-weight: 500;
    }

    dd {
      margin: 0 20px;
      color: #666;
      line-height: 22px;
    }
  }
}
</style>
