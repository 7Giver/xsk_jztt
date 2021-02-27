<template>
  <view id="app">
    <u-navbar :is-back="true" :is-fixed="false" :border-bottom="false" :title="userInfo.name">
      <view class="navbar-right" slot="right">
        <view class="icon_wrap">
          <view class="left">
            <u-icon name="setting" size="46" color="#333"></u-icon>
          </view>
        </view>
      </view>
    </u-navbar>
    <view class="personal-page">
      <view class="header">
        <view class="u-flex top_wrap">
          <view class="avatar">
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
          <swiper-item class="swiper-item" v-for="(order, idx) in orderList" :key="idx">
            <scroll-view :scroll-y="true" @scrolltolower="reachBottom">
              <view class="works_wrap" v-for="(item, index) in dataList" :key="index">
                <view class="u-flex top_wrap">
                  <u-avatar :src="item.avatar" size="75"></u-avatar>
                  <view class="right">
                    <view class="u-line-1 nickname">{{ item.nickname }}</view>
                    <view class="addtime">{{ item.addTime }}</view>
                  </view>
                </view>
                <view class="content">
                  <div class="many_mode" v-if="item.imgList.length >= 3">
                    <view class="u-line-2 title">{{ item.title }}</view>
                    <view class="u-flex many_wrap">
                      <div class="item" v-for="(image, ids) in item.imgList" :key="ids">
                        <u-image :src="image" height="180">
                          <u-loading slot="loading"></u-loading>
                        </u-image>
                      </div>
                    </view>
                  </div>
                  <div class="single_mode" v-else-if="item.imgList.length == 1">
                    <view class="u-line-3 title">{{ item.title }}</view>
                    <image :src="item.imgList[0]" />
                  </div>
                  <div class="video_mode" v-else-if="item.videoSrc">
                    <view class="u-line-2 title">{{ item.title }}</view>
                    <video :src="item.video"></video>
                  </div>
                </view>
              </view>
              <!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
            </scroll-view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserIndex, getUserWorks } from "api/home.js";
export default {
  data() {
    return {
      userInfo: {},
      page: 1,
      limit: 10,
      current: 0,
      swiperCurrent: 0,
      orderList: [[], [], []],
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
      dataList: [
        {
          id: 1,
          nickname:
            "夏日流星限定贩卖夏日流星限定贩卖夏日流星限定贩卖夏日流星限定贩卖夏日流星限定贩卖夏日流星限定贩卖夏日流星限定贩卖",
          addTime: "3天前",
          title: "这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题",
          imgList: [
            "//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg",
            "//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg",
            "//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg",
          ],
        },
        {
          id: 2,
          nickname:
            "夏日流星限定贩卖夏日流星限定贩卖夏日流星限定贩卖夏日流星限定贩卖夏日流星限定贩卖夏日流星限定贩卖夏日流星限定贩卖",
          addTime: "3天前",
          title: "这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题",
          imgList: ["/static/img/pic_bg.png"],
        },
      ],
      loadStatus: ["loadmore", "loadmore", "loadmore"],
    };
  },
  onLoad(options) {
    this.getUserData();
    this.getUserWork();
  },
  methods: {
    // 获取用户数据
    async getUserData() {
      let { data } = await getUserIndex(this.vuex_token);
      this.userInfo = data;
    },
    // 获取用户数据
    async getUserWork() {
      let params = {
        token: this.vuex_token,
        page: this.page,
        limit: this.limit,
        sid: "",
        type: this.current,
      };
      let { data } = await getUserWorks(params);
      console.log(data);
    },
    // tab栏切换
    tabChange(index) {
      this.swiperCurrent = index;
      // this.getOrderList(index);
    },
    transition({ detail: { dx } }) {
      this.$refs.tabs.setDx(dx);
    },
    animationfinish({ detail: { current } }) {
      this.$refs.tabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
    reachBottom() {
      // 此tab为空数据
      this.loadStatus.splice(this.current, 1, "loading");
      setTimeout(() => {
        // this.getOrderList(this.current);
      }, 1200);
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
    }
    .works_wrap {
      padding: 30rpx;
      background-color: #fff;
      margin-bottom: 15rpx;
      .top_wrap {
        margin-bottom: 20rpx;
        .u-avatar {
          margin-right: 20rpx;
        }
        .right {
          flex: 1;
          .nickname {
            width: 200rpx;
            color: #333333;
            font-size: 26rpx;
            font-weight: bold;
          }
          .addtime {
            color: #999999;
            font-size: 24rpx;
          }
        }
      }
      .content {
        .many_mode {
          .title {
            font-size: 28rpx;
            line-height: 1.4;
          }
          .many_wrap {
            margin-top: 10rpx;
            .item {
              flex: 1;
              &:not(:last-child) {
                margin-right: 10rpx;
              }
              .u-image {
                width: 100%;
              }
            }
          }
        }
        .single_mode {
          display: flex;
          .title {
            flex: 1;
            font-size: 28rpx;
            line-height: 1.4;
            margin-right: 18rpx;
          }
          image {
            width: 280rpx;
            height: 160rpx;
          }
        }
        .video_mode {
          .title {
            font-size: 28rpx;
            line-height: 1.4;
          }
        }
      }
    }
  }
}
</style>
