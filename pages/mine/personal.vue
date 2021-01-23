<template>
  <view id="app">
    <u-navbar
      :is-back="true"
      :is-fixed="false"
      :border-bottom="false"
      title="用户名称"
    >
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
              <view class="number">{{ userInfo.dynamic }}</view>
              <text class="title">动态</text>
            </view>
            <view class="item">
              <view class="number">{{ userInfo.focus }}</view>
              <text class="title">关注</text>
            </view>
            <view class="item">
              <view class="number">{{ userInfo.fans }}</view>
              <text class="title">粉丝</text>
            </view>
          </view>
        </view>
        <view class="detail_wrap">
          简介：{{ userInfo.detail || "暂无简介" }}
        </view>
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
          :current="swiperCurrent"
          @transition="transition"
          @animationfinish="animationfinish"
        >
          <swiper-item
            class="swiper-item"
            v-for="(order, idx) in orderList"
            :key="idx"
          >
            <scroll-view
              scroll-y
              style="height: 800rpx; width: 100%"
              @scrolltolower="onreachBottom"
            >
              <view
                class="works_wrap"
                v-for="(item, index) in dataList"
                :key="index"
              >
                <view class="u-flex top_wrap">
                  <u-avatar :src="item.avatar" size="80"></u-avatar>
                  <view class="right">
                    <view class="nickname">{{ item.nickname }}</view>
                    <view>{{ item.addTime }}</view>
                  </view>
                </view>
                <view class="content">
                  <view class="u-flex many_wrap">
                    <view v-for="(image, ids) in item.imgList" :key="ids">
                      <u-image :src="image" width="150" mode="widthFix">
                        <u-loading slot="loading"></u-loading>
                      </u-image>
                    </view>
                  </view>
                </view>
              </view>
            </scroll-view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        avatar: "",
        nickname: "这里是用户名",
        detail: "",
        dynamic: 5463,
        focus: 163,
        fans: 336,
      },
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
          nickname: "夏日流星限定贩卖",
          addTime: "3天前",
          imgList: [
            "//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg",
            "//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg",
            "//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg",
          ],
        },
      ],
    };
  },
  onLoad(options) {},
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
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
    .works_wrap {
      padding: 20rpx;
      .top_wrap {
      }
    }
  }
}
</style>
