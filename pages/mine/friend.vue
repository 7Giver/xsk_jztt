<template>
  <view id="app">
    <u-navbar :is-fixed="false" :border-bottom="false" title="我的好友"></u-navbar>
    <view class="page-friend">
      <view class="header">
        <view class="main_title">我的收益</view>
        <view class="main_wrap">
          <view class="u-flex item">
            <view class="title">已邀请好友</view>
            <view class="cash">
              <text>{{total}}</text>个
            </view>
          </view>
          <view class="u-flex item">
            <view class="title">已到账收益</view>
            <view class="cash">
              <text>{{money}}</text>元
            </view>
          </view>
          <view class="u-flex item">
            <view class="title">可提现收益</view>
            <view class="cash">
              <text>{{cash}}</text>元
            </view>
          </view>
        </view>
      </view>
      <view class="gap_wrap">我的好友</view>
      <view class="container">
        <scroll-view
          :scroll-y="true"
          style="height: 100%;width: 100%;"
          @scrolltolower="reachBottom"
        >
          <view class="friend_list">
            <view class="u-flex item" v-for="(item, index) in dataList" :key="index">
              <view class="u-flex left_wrap">
                <u-avatar :src="item.avatar" size="80"></u-avatar>
                <view class="u-line-1 name_wrap">{{item.name}}</view>
              </view>
              <view class="right_wrap">
                <view class="add_time">{{item.add_time}}</view>
              </view>
            </view>
          </view>
          <view class="loadmore" v-if="dataList.length">
            <u-loadmore :status="loadStatus"></u-loadmore>
          </view>
          <view class="nodata" v-else>
            <u-empty text="暂无数据"></u-empty>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import { getFriend } from "@/api/home.js";
export default {
  data() {
    return {
      total: 0,
      cash: 0,
      money: 0,
      limit: 20,
      pageIndex: 1,
      loadStatus: "loadmore",
      dataList: [],
    };
  },
  onLoad(options) {
    this.getData();
  },
  methods: {
    // 触发滚动加载
    reachBottom() {
      if (this.dataList.length >= this.limit) {
        this.loadStatus = "loading";
        setTimeout(() => {
          this.getData();
        }, 500);
      }
    },
    // 监听下拉刷新
    onPullDownRefresh() {
      this.limit = this.$options.data().limit;
      this.pageIndex = this.$options.data().pageIndex;
      this.loadStatus = this.$options.data().loadStatus;
      this.dataList = this.$options.data().dataList;
      this.getData();
    },
    async getData() {
      let params = {
        token: this.vuex_token,
        page: this.pageIndex,
        limit: this.limit,
      };
      let { data } = await getFriend(params);
      this.total = data.total;
      this.cash = data.cash;
      this.money = data.money;
      let result = data.list;
      if (data == null || result.length == 0) {
        // 加载结束
        this.loadStatus = "nomore";
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
    },
  },
};
</script>

<style lang="scss" scoped>
.page-friend {
  .header {
    margin: 30rpx 36rpx;
    padding: 20rpx 30rpx;
    background: url("/static/img/mine/coin_header.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    border-radius: 20rpx;
    color: #fff;
    .main_title {
      font-size: 32rpx;
      line-height: 60rpx;
    }
    .main_wrap {
      display: flex;
      justify-content: space-between;
      padding: 30rpx 14rpx;
      .item {
        flex-direction: column;
        .title {
          font-size: 24rpx;
        }
        .cash {
          font-size: 26rpx;
          text {
            font-size: 34rpx;
            margin-right: 6rpx;
          }
        }
      }
    }
  }
  .gap_wrap {
    color: #999999;
    font-size: 26rpx;
    line-height: 66rpx;
    padding-left: 36rpx;
    background: #f2f2f2;
  }
  .container {
    position: relative;
    background: #fff;
    .friend_list {
      padding: 0 30rpx;
      .item {
        padding: 20rpx 0;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;
        .left_wrap {
          width: 50%;
          .u-avatar {
            margin-right: 18rpx;
          }
          .name_wrap {
            flex: 1;
            font-size: 28rpx;
            font-weight: bold;
          }
        }
        .right_wrap {
          .add_time {
            color: #999999;
          }
        }
      }
    }
    .loadmore {
      padding: 20rpx 0;
    }
    .nodata {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      zoom: 1.15;
    }
  }
}
</style>