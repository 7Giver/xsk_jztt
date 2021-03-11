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
      </view>
    </view>
  </view>
</template>

<script>
import { getFriend } from "api/home.js";
export default {
  data() {
    return {
      total: 0,
      cash: 0,
      money: 0,
      limit: 20,
      pageIndex: 1,
      dataList: [
        {
          avatar: "",
          name: "测试昵称",
          add_time: "2021.3.11 16:50",
        },
      ],
    };
  },
  onLoad(options) {
    this.getData();
  },
  methods: {
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
    background: #f2f2f2;
    .friend_list {
      padding: 0 30rpx;
      background: #fff;
      .item {
        padding: 20rpx 0;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;
        background: #fff;
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
  }
}
</style>