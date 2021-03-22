<template>
  <view id="app">
    <u-navbar title="创作中心" :border-bottom="false"></u-navbar>
    <view class="page-creative">
      <view class="header">
        <u-avatar :src="vuex_user.avatar" size="60"></u-avatar>
        <view class="title">欢迎来到你的创作中心</view>
      </view>
      <view class="inner_wrap">
        <view class="item">
          <view class="title">总阅读量</view>
          <view class="number">{{688}}</view>
        </view>
        <view class="item">
          <view class="title">总粉丝</view>
          <view class="number">{{962}}</view>
        </view>
        <view class="item">
          <view class="title">总收益</view>
          <view class="number">{{2337}}</view>
        </view>
      </view>
      <view class="list_wrap">
        <view class="main_title">我的作品</view>
        <scroll-view
          :scroll-y="true"
          class="data_list"
          style="height: 100%;width: 100%;"
          @scrolltolower="reachBottom"
        >
          <view class="item" v-for="(item, index) in dataList" :key="index">
            <view class="left_wrap">
              <view class="u-line-2 title">{{item.title}}</view>
              <view class="u-flex bottom">
                <view class="number">{{item.shares}}转发</view>
                <view class="number">{{item.comments}}评论</view>
                <view class="number">{{item.likes}}点赞</view>
              </view>
            </view>
            <view class="right_wrap">
              <image :src="item.cover" mode="scaleToFill" />
            </view>
          </view>
          <view class="loadmore">
            <u-loadmore :status="loadStatus"></u-loadmore>
          </view>
        </scroll-view>
      </view>
      <view class="footer">
        <view class="u-flex item">
          <image class="icon" src="/static/img/mine/icon_wz.png" mode="scaleToFill" />
          <text>发布文章</text>
        </view>
        <view class="u-flex item">
          <image class="icon" src="/static/img/mine/icon_sp.png" mode="scaleToFill" />
          <text>发布视频</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserWorks } from "@/api/home.js";
export default {
  data() {
    return {
      limit: 20,
      pageIndex: 1,
      loadStatus: "loadmore",
      dataList: [],
    };
  },
  onLoad(options) {
    this.getData();
    // this.getData();
  },
  methods: {
    // 触发滚动加载
    reachBottom() {
      // console.log(111);
      if (this.dataList.length >= this.limit) {
        this.loadStatus = "loading";
        setTimeout(() => {
          this.getData();
        }, 500);
      }
    },
    async getData() {
      let params = {
        token: this.vuex_token,
        page: this.pageIndex,
        limit: this.limit,
        sid: "",
        type: 0,
      };
      let { data } = await getUserWorks(params);
      let result = data.list;
      if (data == null || result.length == 0) {
        // 加载结束
        this.loadStatus = "nomore";
        // uni.stopPullDownRefresh();
        return;
      }
      this.dataList = this.dataList.concat(result);
      this.pageIndex++;
      if (result.length < this.limit) {
        // 一页不足的情况
        this.loadStatus = "nomore";
      } else {
        this.loadStatus = "loadmore";
      }
      // uni.stopPullDownRefresh();
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
}
.page-creative {
  flex: 1;
  .header {
    background: url("/static/img/mine/pic_bg.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding: 40rpx 30rpx 120rpx;
    color: #fff;
    .u-avatar {
      margin-right: 20rpx;
    }
    .title {
      font-size: 32rpx;
    }
  }
  .inner_wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    margin: -90rpx auto 0;
    padding: 50rpx 40rpx;
    background: #fff;
    border-radius: 20rpx;
    box-shadow: 0px 2px 10px 0px rgba(231, 231, 231, 0.8);
    .item {
      text-align: center;
      .title {
        color: #999999;
        font-size: 24rpx;
      }
      .number {
        color: #333;
        font-size: 34rpx;
        font-weight: bold;
        margin-top: 10rpx;
      }
    }
  }
  .list_wrap {
    height: 65vh;
    padding: 0 30rpx;
    padding-bottom: 135rpx;
    .main_title {
      width: 100%;
      font-size: 30rpx;
      font-weight: bold;
      margin: 40rpx auto 30rpx;
      line-height: 30rpx;
      padding-left: 16rpx;
      border-left: 8rpx solid #f04323;
    }
    .data_list {
      // padding-bottom: 120rpx;
      .item {
        display: flex;
        padding-bottom: 20rpx;
        border-bottom: 1px solid #e6e6e6;
        .left_wrap {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          padding-right: 28rpx;
          .title {
            font-size: 30rpx;
          }
          .bottom {
            justify-content: space-between;
            .number {
              color: #999999;
              font-size: 26rpx;
            }
          }
        }
        .right_wrap {
          flex: 1;
          image {
            display: block;
            width: 260rpx;
            height: 160rpx;
          }
        }
      }
    }
  }
  .loadmore {
    padding: 20rpx 0;
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    border-top: 1px solid #e6e6e6;
    background: #fff;
    z-index: 99;
    .item {
      position: relative;
      flex: 1;
      display: flex;
      justify-content: center;
      line-height: 92rpx;
      .icon {
        width: 38rpx;
        height: 38rpx;
        margin-right: 10rpx;
      }
      text {
        color: #f04323;
        font-size: 30rpx;
      }
      &:first-child::after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 1px;
        height: 46rpx;
        background: #e6e6e6;
      }
    }
  }
}
</style>