<template>
  <div class="layout-nav">
    <div class="title">美团导航</div>
    <div class="nav-content">
      <div class="nav-content-item" v-for="item in navList" :key="item.title">
        <div class="sub-title">{{ item.title }}</div>
        <div class="sub-content-list">
          <div class="sub-content-item" v-for="sub in item.subList" :key="sub">
            <a href="">{{ sub }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: [
        {
          title: '热门城市',
          subList: [
            '贵阳','苏州','上海','郑州','长沙','昆明','深圳','西安','佛山','温州','厦门','杭州','广州','无锡','成都','常州','北京','长春','天津',
          ],
        },
        {
          title: '热门分类',
          subList: [
            '酒店','美食','休闲娱乐','运动健身','生活服务','上门服务','购物','时尚购','本地购物','结婚','摄影写真','宴会','丽人','母婴亲子','学习培训','家装','汽车服务','医疗','宠物',
          ],
        },
        {
          title: '周边热门',
          subList: [
            '德阳酒店','广汉美食','广汉休闲娱乐','金堂运动健身','金堂生活服务','广汉上门服务','广汉购物','金堂时尚购','金堂本地购物','金堂结婚','金堂摄影写真','广汉宴会','德阳丽人','广汉母婴亲子','德阳学习培训','德阳家装','金堂汽车服务','德阳医疗','广汉宠物',
          ]
        },
      ]
    }
  },
}
</script>

<style lang="less">
  .layout-nav {
    margin: 40px auto 0;
    width: 1190px;
    height: auto;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    background: #FFFFFF;

    .title {
      width: auto;
      height: 44px;
      font-size: 16px;
      font-weight: 500;
      color: #222222;
      text-align: left;
      padding-left: 20px;
      padding-top: 6px;
      line-height: 44px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      margin-bottom: 6px;
    }

    .nav-content-item {
      width: 100%;
      height: auto;
      overflow: hidden;
      padding-inline-start: 0;

      .sub-title {
        width: 100px;
        height: 100%;
        float: left;
        font-size: 14px;
        font-weight: 500;
        color: #222222;
        text-align: center;
        padding: 10px 0;
      }

      .sub-content-list {
        width: 1090px;
        height: auto;
        padding-top: 12px;
        float: left;
        border-bottom: 1px solid #E5E5E5;
        overflow: hidden;

        .sub-content-item {
          list-style: none;
          width: 100px;
          height: 17px;
          font-size: 12px;
          text-align: left;
          margin-bottom: 13px;
          float: left;

          & > a {
            display: block;
            width: 80px;
            cursor: pointer;
            color: #666666;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>