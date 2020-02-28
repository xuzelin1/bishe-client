<template>
  <div class="header-search">
    <div class="search-block">
      <input
        @blur="inputFocus = false"
        @focus="inputFocus = true"
        type="text"
        class="search-input"
        placeholder="搜索商家或地点"
        v-model="input">
      <button class="search-btn">
        <i class="el-icon-search"/>
      </button>
    </div>
    <div class="search-suggest" v-show="inputFocus">
      <div class="header-search-noinput" v-if="searchList.length == 0">
        <h6>热门搜索</h6>
        <div class="header-search-hotword">
          <ul>
            <li v-for="place in hotPlaceList" :key="place.name">
              {{ place.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="header-search-hasinput">
        <ul>
          <li v-for="place in searchList" :key="place.name">
            {{ place.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      inputFocus: false,
      city: '',
      searchList: [],
      hotPlaceList: [],
    }
  },
  watch: {
    input (newVal) {
      if(!newVal) {
        this.searchList = [];
        return;
      }
      this.$axios.get('search/top', {
        params: {
          input: this.input,
          // city: this.city.replace('市', ''),
          city: '广州',
        }
      }).then(({ data }) => {
        this.searchList = data.top;
      })
    },
  },
  mounted () {
    this.$axios.get('geo/getPosition').then(({ data }) => {
      this.city = data.city;
    })
    this.$axios.get('search/hotPlace', {
      params: {
        // city: this.city.replace('市', ''),
        city: '广州',
      }
    }).then(({ data }) => {
      this.hotPlaceList = data.result;
    })
  },
  methods: {

  }
}
</script>

<style lang="less">
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

  .search-suggest {
    width: 85.45%;
    // display: none;
    box-sizing: border-box;
    position: absolute;
    border: 1px solid #E5E5E5;
    border-top: none;
    background: #fff;
    z-index: 999;
    box-shadow: 0 3px 5px 0 rgba(0,0,0,0.1);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    color: #999;
    font-size: 12px;
    text-align: left;

    .header-search-hasinput,
    .header-search-noinput {
      display: block;
      padding: 10px;

      h6 {
        margin: 0;
        padding-bottom: 5px;
      }

      .header-search-hotword {
        width: auto;
        padding-top: 5px;
        margin-bottom: 5px;
        padding-left: 0;
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        padding: 3px;
        cursor: pointer;

        &:hover {
          background-color: #efefef;
        }
      }
    }
  }
</style>