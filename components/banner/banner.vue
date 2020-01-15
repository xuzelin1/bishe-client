<template>
  <div class="banner clearfix">
    <div class="left-banner">
      <div class="category-nav-container">
        <div class="nav-title-wrapper">
          <span class="nav-title">全部分类</span>
        </div>
        <div class="nav-content-wrapper">
          <ul>
            <li v-for="nav in navList" :key="nav.id" class="nav-li">
              <i :class="nav.icon"></i>
              <span v-for="title in nav.titles" :key="title" class="title">{{ title }}</span>
            </li>
          </ul>
        </div>
        <div class="nav-detail-wrapper"></div>
      </div>
    </div>
    <div class="right-banner">
      <div class="header-links">
        <nuxt-link
          v-for="link in headerLink"
          :key="link.title"
          :to="link.url">{{ link.title }}</nuxt-link>
      </div>
      <div class="banner-row clearfix">
        <div style="width: 550px; height: 240px;" class="margin-div"></div>
        <div style="width: 150px; height: 240px;" class="margin-div"></div>
        <div style="width: 228px; height: 240px;" class="margin-div"></div>
      </div>
      <div class="banner-row clearfix">
        <div style="width: 270px; height: 165px;" class="margin-div"></div>
        <div style="width: 270px; height: 165px;" class="margin-div"></div>
        <div style="width: 150px; height: 165px;" class="margin-div"></div>
        <div style="width: 228px; height: 165px;" class="margin-div"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: [
        { id: 0, icon: '', titles: ['美食'],},
        { id: 1, icon: '', titles: ['外卖'],},
        { id: 2, icon: '', titles: ['酒店'],},
        { id: 3, icon: '', titles: ['榛果民宿'],},
        { id: 4, icon: '', titles: ['猫眼电影'],},
        { id: 5, icon: '', titles: ['机票', '火车票'],},
        { id: 6, icon: '', titles: ['休闲娱乐', 'KTV'],},
        { id: 7, icon: '', titles: ['生活服务'],},
        { id: 8, icon: '', titles: ['丽人', '美发', '医学美容'],},
        { id: 9, icon: '', titles: ['结婚', '婚纱摄影', '婚宴'],},
        { id: 10, icon: '', titles: ['亲子', '儿童乐园', '幼教'],},
        { id: 11, icon: '', titles: ['运动健身', '健身中心'],},
        { id: 12, icon: '', titles: ['家装', '建材', '家居'],},
        { id: 13, icon: '', titles: ['学习培训', '音乐培训'],},
        { id: 14, icon: '', titles: ['医疗健康', '宠物', '爱车'],},
        { id: 15, icon: '', titles: ['酒吧', '密室逃脱'],},
      ],
      headerLink: [
        { title: '美团外卖', url: '',},
        { title: '猫眼电影', url: '',},
        { title: '美团酒店', url: '',},
        { title: '民宿／公寓', url: '',},
        { title: '商家入驻', url: '',},
        { title: '美团公益', url: '',},
      ]
    }
  }
}
</script>

<style lang="less">
  .banner {
    width: 1190px;
    margin: 0 auto;
    position: relative;

    .left-banner {
      float: left;

      .category-nav-container {
        width: 230px;
        height: 475px;
        position: relative;
        text-align: left;
        float: left;
        margin-top: -50px;
        color: #646464;
        background: #FFF;
        box-sizing: border-box;
        border: 1px solid #E5E5E5;

        .nav-title-wrapper {
          height: 50px;
          padding-top: 15px;
          box-sizing: border-box;

          .nav-title {
            color: #222222;
            font-size: 16px;
            font-weight: 700;
            margin-left: 15px;
          }
        }

        .nav-content-wrapper {
          ul {
            padding: 10px 8px;
            height: 425px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            margin: 0;
            justify-content: space-between;

            .nav-li {
              list-style: none;
              .title {
                font-size: 13px;
                line-height: 20px;
                height: 20px;
                color: #646464;
                cursor: pointer;
              }
              .title:not(:last-child){
                &::after {
                  content: ' / ';
                }
              }
            }
          }
        }
      }
    }

    .right-banner {
      float: left;
      margin-left: 10px;
      margin-top: 10px;
      position: relative;

      .header-links {
        position: absolute;
        top: -45px;
        left: 20px;

        a {
          color: #222;
          font-weight: 700;
          font-size: 16px;
          margin: 0 20px;
          cursor: pointer;
          position: relative;
        }
      }

      .margin-div {
        margin-top: 10px;
        background: red;
        float: left;
      }

      .margin-div:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
</style>