<template>
  <view id="app">
    <!-- <u-navbar
      :is-back="false"
      :is-fixed="false"
      :border-bottom="false"
      :background="{ background: '#F04323' }"
    >
      <view class="solt-wrap">
        <view>任务中心</view>
      </view>
    </u-navbar>
    <view class="task-page">
    </view>-->
    <view class="header">
      <view class="main_title">任务中心</view>
      <view class="cash_wrap">
        <view class="u-flex top">
          <view class="coin">{{ 147789 }}</view>
          <view class="cash">约{{ 14.77 }}元</view>
        </view>
        <text class="title">我的金币</text>
      </view>
    </view>
    <view class="container">
      <view class="top_wrap">
        <view class="u-flex top">
          <view class="left">
            连续签到每日可得
            <text>{{ 100 }}</text>金币
          </view>
          <view class="u-flex right" @click="goNext('sign')">
            <view class="text">
              已连续
              <text>{{ 30 }}</text>天
            </view>
            <u-icon name="arrow-right"></u-icon>
          </view>
        </view>
        <view class="u-flex bottom">
          <view class="u-flex item" v-for="(item, index) in taskCoin" :key="index">
            <template>
              <div class="u-flex icon receivedBg" v-if="item.status == 2">{{ item.cash }}</div>
              <div class="u-flex icon receiveBg" v-else>
                <text>{{ item.cash }}</text>
                <view class="can_get" v-if="item.status == 1">可领取</view>
              </div>
            </template>
            <view class="title">
              <text v-if="item.status == 2">已领</text>
              <text v-else>{{ item.title }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="task_wrap" style="margin-top: -40px;">
        <view class="main_title">{{noviceTask.main_title}}</view>
        <view class="item" v-for="(item, index) in noviceTask.taskList" :key="index">
          <view class="u-flex left_wrap">
            <view class="icon_wrap">
              <image class="icon" :src="item.icon" />
            </view>
            <view class="content">
              <view class="u-flex title_wrap">
                <view class="title">{{item.title}}</view>
                <view class="tips_wrap">
                  <view class="u-flex bag_wrap" v-if="item.type == 'yqhy'">
                    <image class="redBag" :src="redBag" mode="widthFix" />
                    <view class="cash">{{item.cash}}元</view>
                  </view>
                  <view class="tips" v-else>+{{item.cash}}</view>
                </view>
              </view>
              <view class="text_wrap">{{item.off_title}}</view>
            </view>
          </view>
          <view class="u-flex btn_wrap">
            <view class="btn task" v-if="item.status == 0">
              <text v-if="item.type == 'xryd'">去阅读</text>
              <text v-if="item.type == 'yqhy'">去邀请</text>
              <text v-if="item.type == 'wszl'">去完善</text>
            </view>
            <view class="btn get" v-else-if="item.status == 1">立即领取</view>
            <view class="btn done" v-else-if="item.status == 2">已完成</view>
          </view>
        </view>
      </view>

      <view class="task_wrap">
        <view class="main_title">{{dailyTask.main_title}}</view>
        <view class="item" v-for="(item, index) in dailyTask.taskList" :key="index">
          <view class="u-flex left_wrap">
            <view class="icon_wrap">
              <image class="icon" :src="item.icon" />
            </view>
            <view class="content">
              <view class="u-flex title_wrap">
                <view class="title">{{item.title}}</view>
                <view class="tips_wrap">
                  <view class="u-flex bag_wrap" v-if="item.type == 'yqhy'">
                    <image class="redBag" :src="redBag" mode="widthFix" />
                    <view class="cash">{{item.cash}}元</view>
                  </view>
                  <view class="tips" v-else>+{{item.cash}}</view>
                </view>
              </view>
              <view class="text_wrap">{{item.off_title}}</view>
            </view>
          </view>
          <view class="u-flex btn_wrap">
            <view class="btn task" v-if="item.status == 0">
              <text v-if="item.type == 'yddj'">去阅读</text>
              <text v-if="item.type == 'yqyd'">去邀请</text>
              <text v-if="item.type == 'qdjl'">去签到</text>
              <text v-if="item.type == 'txjl'">去提现</text>
            </view>
            <view class="btn get" v-else-if="item.status == 1">立即领取</view>
            <view class="btn done" v-else-if="item.status == 2">已完成</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      redBag: "/static/img/task/pic_hb.png",
      taskCoin: [
        {
          cash: 50,
          title: "看文章领金币",
          status: 2,
        },
        {
          cash: 50,
          title: "看视频领金币",
          status: 1,
        },
        {
          cash: 20,
          title: "看视频领金币",
          status: 2,
        },
        {
          cash: 20,
          title: "签到领金币",
          status: 0,
        },
      ],
      noviceTask: {
        main_title: "新手任务",
        taskList: [
          {
            type: "xryd",
            icon: "/static/img/task/pic_xryd.png",
            title: "新人首次阅读任务",
            off_title: "阅读文章50秒后完成任务",
            cash: 1000,
            status: 1,
          },
          {
            type: "yqhy",
            icon: "/static/img/task/pic_yqhy.png",
            title: "首次邀请好友",
            off_title: "首次邀请好友，奖励5元",
            cash: 5,
            status: 0,
          },
          {
            type: "wszl",
            icon: "/static/img/task/pic_wszl.png",
            title: "完善资料",
            off_title: "新用户完善资料后完成任务",
            cash: 1000,
            status: 2,
          },
        ],
      },
      dailyTask: {
        main_title: "日常任务",
        taskList: [
          {
            type: "yddj",
            icon: "/static/img/task/pic_yddj.png",
            title: "阅读得大奖励",
            off_title: "阅读5/10/30/60分钟可得奖励",
            cash: 1500,
            status: 2,
          },
          {
            type: "yqyd",
            icon: "/static/img/task/pic_yqyd.png",
            title: "邀请好友阅读",
            off_title: "好友阅读完成的奖励",
            cash: 300,
            status: 0,
          },
          {
            type: "qdjl",
            icon: "/static/img/task/pic_qdjl.png",
            title: "签到的奖励",
            off_title: "连续签到天数越多奖励越多",
            cash: 50,
            status: 0,
          },
          {
            type: "txjl",
            icon: "/static/img/task/pic_txjl.png",
            title: "完成提现的奖励",
            off_title: "成功完成一次提现",
            cash: 300,
            status: 0,
          },
        ],
      },
    };
  },
  onLoad(options) {},
  methods: {
    // 跳转页面
    goNext(type) {
      switch (type) {
        case 'sign':
          this.$Router.push({path: "/pages/task/sign"})
          break;
      
        default:
          break;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
#app {
  // padding-top: env(safe-area-inset-top);
  // background-image: url("/static/img/task/pic_rwbg.png");
  // background-repeat: no-repeat;
  // background-position: top;
  // background-size: 100%;
}
.task-page {
  height: 600rpx;
}
.header {
  background-image: url("/static/img/task/pic_rwbg.png");
  background-repeat: no-repeat;
  background-position: top;
  background-size: 100%;
  padding-top: env(safe-area-inset-top);
  padding-left: 30rpx;
  padding-right: 30rpx;
  .main_title {
    color: #fff;
    font-size: 36rpx;
    letter-spacing: 1px;
    padding: 20rpx 0 30rpx;
  }
  .cash_wrap {
    color: #fff;
    padding-bottom: 180rpx;
    .top {
      .coin {
        font-size: 48rpx;
        margin-right: 20rpx;
      }
      .cash {
        color: #f04323;
        font-size: 24rpx;
        padding: 0 14rpx;
        border-radius: 100rpx;
        background-color: #fff;
      }
    }
    .title {
      font-size: 26rpx;
      letter-spacing: 2rpx;
    }
  }
}
.container {
  position: relative;
  padding: 0 28rpx 40rpx;
  background-color: #f2f2f2;
  .top_wrap {
    position: relative;
    top: -110rpx;
    padding: 0 28rpx;
    border-radius: 20rpx;
    background-color: #fff;
    .top {
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      color: #333333;
      font-size: 28rpx;
      .left {
        line-height: 3;
        text {
          font-size: 32rpx;
          color: #ff983c;
          margin: 0 6rpx;
        }
      }
      .right {
        font-size: 26rpx;
        align-items: baseline;
        .text {
          margin-right: 10rpx;
          text {
            color: #f04323;
          }
        }
        .u-icon {
          color: #999999;
          font-size: 24rpx;
        }
      }
    }
    .bottom {
      justify-content: space-around;
      padding: 24rpx 0;
      .item {
        flex-direction: column;
        .icon {
          position: relative;
          width: 82rpx;
          height: 82rpx;
          justify-content: center;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
          font-size: 30rpx;
        }
        .title {
          margin-top: 10rpx;
        }
        .receiveBg {
          color: #ffe985;
          background-image: url("~@/static/img/task/pic_coin_on.png");
        }
        .receivedBg {
          color: #ebebeb;
          background-image: url("~@/static/img/task/pic_coin.png");
        }
        .can_get {
          position: absolute;
          bottom: -14rpx;
          left: 50%;
          transform: translate(-50%, 0);
          width: 110rpx;
          color: #ffffff;
          font-size: 24rpx;
          text-align: center;
          line-height: 40rpx;
          border-radius: 200rpx;
          background: linear-gradient(90deg, #f04323 0%, #ff983c 100%);
          zoom: 0.9;
        }
      }
    }
  }
  .task_wrap {
    padding: 0 28rpx;
    margin-bottom: 30rpx;
    border-radius: 20rpx;
    background-color: #fff;
    .main_title {
      color: #333333;
      font-size: 30rpx;
      line-height: 80rpx;
      font-weight: bold;
      border-bottom: 1px solid #e6e6e6;
    }
    .item {
      display: flex;
      padding: 20rpx 0;
      &:not(:last-child) {
        border-bottom: 1px solid #e6e6e6;
      }
      .left_wrap {
        .icon_wrap {
          margin-right: 16rpx;
          .icon {
            width: 85rpx;
            height: 85rpx;
          }
        }
        .content {
          flex: 1;
          .title_wrap {
            .title {
              color: #333333;
              font-size: 30rpx;
              font-weight: bold;
            }
            .tips_wrap {
              margin-left: 15rpx;
              .tips {
                color: #fff;
                font-size: 20rpx;
                padding: 2rpx 18rpx;
                border-radius: 300rpx;
                background-color: #ff881e;
                zoom: 0.8;
              }
              .bag_wrap {
                .redBag {
                  width: 28rpx;
                  margin-right: 10rpx;
                }
                .cash {
                  color: #f14624;
                  font-size: 24rpx;
                  letter-spacing: 1px;
                }
              }
            }
          }
          .text_wrap {
            color: #999999;
            font-size: 24rpx;
            margin-top: 5rpx;
          }
        }
      }
      .btn_wrap {
        flex: 1;
        justify-content: flex-end;
        .btn {
          color: #fff;
          width: 156rpx;
          font-size: 24rpx;
          line-height: 56rpx;
          text-align: center;
          letter-spacing: 1rpx;
          border-radius: 400rpx;
        }
        .get {
          background: linear-gradient(90deg, #f04323 0%, #ff983c 100%);
        }
        .task {
          background-color: #ab26ff;
        }
        .done {
          background-color: #d1d1d1;
        }
      }
    }
  }
}
</style>
