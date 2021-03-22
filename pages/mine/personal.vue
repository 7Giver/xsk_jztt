<template>
  <view id="app">
    <u-navbar :is-back="true" :is-fixed="false" :border-bottom="false" :title="userInfo.name">
      <view class="navbar-right" slot="right">
        <view class="icon_wrap">
          <view class="left">
            <u-icon name="setting" size="46" color="#333" @click="goSetting"></u-icon>
          </view>
        </view>
      </view>
    </u-navbar>
    <view class="personal-page">
      <view class="header">
        <view class="u-flex top_wrap">
          <view class="avatar" @click="goSetting">
            <u-avatar :src="userInfo.avatar" size="110"></u-avatar>
          </view>
          <view class="u-flex u-flex-1 right_wrap">
            <view class="item">
              <view class="number">{{ userInfo.trends || 0 }}</view>
              <text class="title">动态</text>
            </view>
            <view class="item">
              <view class="number">{{ userInfo.focus || 0 }}</view>
              <text class="title">关注</text>
            </view>
            <view class="item">
              <view class="number">{{ userInfo.fans || 0 }}</view>
              <text class="title">粉丝</text>
            </view>
          </view>
        </view>
        <view class="detail_wrap">简介：{{ userInfo.intro || "暂无简介" }}</view>
      </view>
      <u-gap height="15" bg-color="#F2F2F2"></u-gap>
      <view class="container">
        <view class="u-tabs-box">
          <u-tabs-swiper
            ref="tabs"
            activeColor="#F04323"
            :list="tabList"
            :current="current"
            :is-scroll="false"
            @change="tabChange"
          ></u-tabs-swiper>
        </view>
        <swiper
          class="uni-swiper"
          :current="swiperCurrent"
          @transition="transition"
          @animationfinish="animationfinish"
        >
          <swiper-item class="swiper-item" v-for="(tab, idx) in tabList" :key="idx">
            <personalPage ref="page"></personalPage>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserIndex, getUserWorks } from "@/api/home.js";
import personalPage from "./personal-page";
export default {
  components: {
    personalPage,
  },
  data() {
    return {
      userInfo: {},
      current: 0,
      swiperCurrent: 0,
      tabList: [
        {
          name: "全部",
        },
        {
          name: "文章",
        },
        {
          name: "视频",
        },
      ],
    };
  },
  onReady() {
    this.pageList = this.$refs.page;
    this.pageList[0].getData();
  },
  onLoad(options) {
    this.getUserData();
    // this.getUserWork();
  },
  methods: {
    // 获取用户数据
    async getUserData() {
      let { data } = await getUserIndex(this.vuex_token);
      this.userInfo = data;
    },
    // tab栏切换
    tabChange(index) {
      this.swiperCurrent = index;
      let target = this.pageList[index];
      target.pageIndex = 1;
      target.dataList = [];
      target.loadStatus = "loadmore";
      target.getData(index);
    },
    // 监听下拉刷新
    onPullDownRefresh() {
      let target = this.pageList[this.swiperCurrent];
      target.pageIndex = 1;
      target.dataList = [];
      target.loadStatus = "loadmore";
      target.getData(this.swiperCurrent);
    },
    transition({ detail: { dx } }) {
      this.$refs.tabs.setDx(dx);
    },
    animationfinish({ detail: { current } }) {
      this.$refs.tabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
    // 跳转资料设置
    goSetting() {
      this.$Router.push({ name: "personalData" });
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.navbar-right {
  margin-right: 30rpx;
  display: flex;
  .icon_wrap {
    display: flex;
    .left {
      margin: 0 12rpx;
      position: relative;
      color: #ffffff;
      display: flex;
    }
  }
}
.personal-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  .header {
    padding: 30rpx 35rpx;
    .top_wrap {
      .avatar {
        margin-right: 20rpx;
      }
      .right_wrap {
        justify-content: space-around;
        .item {
          text-align: center;
          .number {
            color: #333333;
            font-size: 36rpx;
            font-weight: bold;
          }
          .title {
            color: #666666;
            font-size: 24rpx;
            letter-spacing: 1px;
          }
        }
      }
    }
    .detail_wrap {
      color: #666666;
      font-size: 26rpx;
      margin-top: 15rpx;
    }
  }
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    .uni-swiper {
      flex: 1;
      .swiper-item {
        overflow: scroll;
      }
    }
  }
}
</style>
