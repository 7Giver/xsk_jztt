<template>
  <view>
    <u-navbar title="我的金币" :is-fixed="true" :border-bottom="false"></u-navbar>
    <view class="coin-page">
      <view class="header">
        <view class="container">
          <view class="top_wrap">
            <!-- <view class="main_title">
              <view class="number">{{vuex_user.money}}</view>
              <view class="text">当前通宝（个）</view>
            </view> -->
            <view class="bottom_wrap">
              <view class="item">
                <view class="number">{{vuex_user.money}}</view>
                <view class="text">当前通宝（个）</view>
              </view>
              <view class="item">
                <view class="number">{{vuex_user.integral}}</view>
                <view class="text">金币余额</view>
              </view>
            </view>
          </view>
          <view class="notice_wrap">
            <u-icon name="bell-fill"></u-icon>
            <view class="text">当前汇率：{{vuex_setting.goldrate}}金币=1通宝 每晚{{0}}点自动兑换</view>
          </view>
        </view>
      </view>
      <view class="my_wrap">收支明细</view>
      <view class="coin_container">
        <u-sticky>
          <view class="navbar">
            <u-tabs-swiper
              ref="tabs"
              activeColor="#F04323"
              :list="tabList"
              :current="current"
              :is-scroll="false"
              @change="tabChange"
            ></u-tabs-swiper>
          </view>
        </u-sticky>
        <swiper
          class="uni-swiper"
          :current="swiperCurrent"
          @transition="transition"
          @animationfinish="animationfinish"
        >
          <swiper-item class="swiper-item" v-for="(order, idx) in orderList" :key="idx">
            <scroll-view
              :scroll-y="true"
              style="height: 100%;width: 100%;padding-bottom: 30rpx;"
              @scrolltolower="reachBottom"
            >
              <view class="coin_item" v-for="(item, index) in order" :key="index">
                <view class="left_wrap">
                  <view class="title">{{item.content}}</view>
                  <view class="time">{{item.add_time}}</view>
                </view>
                <view class="right_wrap">
                  <view>{{item.use_type == 1 ? '-' : '+'}}{{item.amount}}{{item.source == 1 ? '金币' : '通宝'}}</view>
                </view>
              </view>
              <u-loadmore :status="loadStatus[idx]" margin-top="30"></u-loadmore>
            </scroll-view>
          </swiper-item>
        </swiper>
      </view>
      <view class="sumbit_btn">申请提现</view>
    </view>
  </view>
</template>

<script>
import { getCoinData } from "@/api/home.js";
export default {
  data() {
    return {
      userInfo: {
        tongbao: 5.68,
        coin: 66,
        cash: 616,
      },
      tabList: [
        {
          name: "全部",
        },
        {
          name: "通宝",
        },
        {
          name: "金币",
        },
      ],
      limit: 10,
      current: 0,
      swiperCurrent: 0,
      pageIndex: [1, 1],
      orderList: [[], [], []],
      loadStatus: ["loadmore", "loadmore", "loadmore"],
      dataList: [
        {
          type: 0,
          title: "签到",
          cash: 35,
          add_time: "2021-01-02 13:42:00",
        },
        {
          type: 0,
          title: "文章奖励",
          cash: 20,
          add_time: "2021-01-01 13:42:00",
        },
        {
          type: 1,
          title: "购物",
          cash: 100,
          add_time: "2021-01-02 13:42:00",
        },
        {
          type: 0,
          title: "文章奖励",
          cash: 200,
          add_time: "2021-01-01 13:42:00",
        },
        {
          type: 1,
          title: "积分兑换",
          cash: 150,
          add_time: "2021-01-02 13:42:00",
        },
      ],
    };
  },
  onLoad(options) {
    this.getOrderList(0);
  },
  methods: {
    // 页面数据
    async getOrderList(idx) {
      let params = {
        token: this.vuex_token,
        page: this.pageIndex[idx],
        limit: this.limit,
        type: this.swiperCurrent,
      };
      let { data } = await getCoinData(params);
      let result = data.list;
      let targetArr = this.orderList[idx];
      if (data == null || result.length == 0) {
        // 加载结束
        this.loadStatus.splice(idx, 1, "nomore");
        return false;
      }
      this.orderList[idx] = targetArr.concat(result);
      this.pageIndex[idx]++;
      if (result.length < this.limit) {
        // 一页不足的情况
        this.loadStatus.splice(idx, 1, "nomore");
      } else {
        this.loadStatus.splice(idx, 1, "loadmore");
      }
      // 随机数据
      // this.orderList[idx] = data.list;
      // for (let i = 0; i < 20; i++) {
      //   let index = this.$u.random(0, this.dataList.length - 1);
      //   let data = JSON.parse(JSON.stringify(this.dataList[index]));
      //   this.orderList[idx].push(data);
      // }
      // this.loadStatus.splice(idx, 1, "loadmore");
    },
    // 触发加载
    reachBottom() {
      let targetArr = this.orderList[this.current];
      if (targetArr.length >= this.limit) {
        this.loadStatus.splice(this.current, 1, "loading");
        setTimeout(() => {
          this.getOrderList(this.current);
        }, 600);
      }
    },
    // tab栏切换
    tabChange(index) {
      this.swiperCurrent = index;
      this.limit = this.$options.data().limit;
      this.pageIndex = this.$options.data().pageIndex;
      this.orderList = this.$options.data().orderList;
      this.getOrderList(index);
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
.coin-page {
  position: relative;
  .header {
    padding: 26rpx 15px 32rpx;
    .container {
      background: url("/static/img/mine/coin_header.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      border-radius: 22rpx;
      overflow: hidden;
      color: #fff;
      .top_wrap {
        padding: 30rpx 0 30rpx;
        .main_title {
          display: flex;
          align-items: center;
          flex-direction: column;
          .number {
            font-size: 66rpx;
          }
          .text {
            font-size: 28rpx;
            padding-left: 22rpx;
          }
        }
        .bottom_wrap {
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin: 30rpx auto;
          > view {
            text-align: center;
          }
          .number {
            font-size: 46rpx;
          }
          .text {
            font-size: 26rpx;
            margin-top: 12rpx;
            letter-spacing: 1px;
            zoom: 0.9;
          }
        }
      }
      .notice_wrap {
        display: flex;
        justify-content: center;
        font-size: 24rpx;
        line-height: 60rpx;
        letter-spacing: 1px;
        background: #e63f1f;
        .u-icon {
          margin-right: 8rpx;
        }
      }
    }
  }
  .my_wrap {
    width: 100%;
    height: 58rpx;
    color: #999999;
    font-size: 26rpx;
    line-height: 66rpx;
    padding-left: 16px;
    background: #f2f2f2;
  }
  .coin_container {
    padding-bottom: 200rpx;
    background: #f2f2f2;
    .navbar {
      padding-top: 10rpx;
      background: #f2f2f2;
      border-bottom: 1px solid #e6e6e6;
    }
    .uni-swiper {
      height: 100vh;
      background: #fff;
    }
    .coin_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 30rpx;
      border-bottom: 1px solid #e6e6e6;
      .left_wrap {
        .title {
          color: #333333;
          font-size: 30rpx;
        }
        .time {
          color: #999999;
          font-size: 28rpx;
          margin-top: 6rpx;
        }
      }
      .right_wrap {
        color: #f04323;
        font-size: 28rpx;
      }
    }
  }
  .sumbit_btn {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 85%;
    color: #fff;
    height: 45px;
    text-align: center;
    font-size: 16px;
    line-height: 45px;
    letter-spacing: 2px;
    border-radius: 20rpx;
    background: linear-gradient(90deg, #f66126 0%, #f04323 100%);
  }
}
</style>
