<template>
  <view id="app" v-cloak>
    <view class="header">
      <view class="main_title">任务中心</view>
      <view class="cash_wrap" @click="goNext('coin')">
        <view class="u-flex top">
          <view class="coin">{{ integral }}</view>
          <view class="cash">约{{ assess_money }}元</view>
        </view>
        <text class="title">我的金币</text>
      </view>
    </view>
    <view class="container">
      <view class="top_wrap">
        <view class="u-flex top">
          <view class="left">
            连续签到每日可得
            <text>{{ sign_final }}</text>金币
          </view>
          <view class="u-flex right" @click="goNext('sign')">
            <view class="text">
              已连续
              <text>{{ series }}</text>天
            </view>
            <u-icon name="arrow-right"></u-icon>
          </view>
        </view>
        <view class="u-flex bottom">
          <view
            class="u-flex item"
            v-for="(item, index) in taskCoin"
            :key="index"
            @click="goCoinPage(item.id)"
          >
            <template>
              <div class="u-flex icon receivedBg" v-if="item.status == 2 || item.status == 3">
                <!-- <text>{{ item.cash }}</text> -->
                <text>金</text>
              </div>
              <div class="u-flex icon receiveBg" v-else>
                <!-- <text>{{ item.cash }}</text> -->
                <text>金</text>
                <!-- <view class="can_get" v-if="item.status == 1">可领取</view> -->
              </div>
            </template>
            <view class="title">
              <text v-if="item.status == 2">已领</text>
              <text v-if="item.status == 3">敬请期待</text>
              <text v-else>{{ item.title }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="task_wrap" style="margin-top: -80rpx;">
        <view class="main_title">新手任务</view>
        <view class="item" v-for="(item, index) in new_task" :key="index">
          <view class="u-flex left_wrap">
            <view class="icon_wrap">
              <image class="icon" :src="item.icon" />
            </view>
            <view class="content">
              <view class="u-flex title_wrap">
                <view class="title">{{item.name}}</view>
                <view class="tips_wrap">
                  <view class="u-flex bag_wrap" v-if="item.award_type == 2">
                    <image class="redBag" :src="redBag" mode="widthFix" />
                    <view class="cash">{{item.award}}元</view>
                  </view>
                  <view class="tips" v-else>+{{item.award}}</view>
                </view>
              </view>
              <view class="text_wrap">{{item.intro}}</view>
            </view>
          </view>
          <view class="u-flex btn_wrap">
            <view class="btn get" v-if="item.is_finish == 0">
              <text v-if="item.id == 1" @click="goNext('news')">去阅读</text>
              <text v-if="item.id == 2">去邀请</text>
              <text v-if="item.id == 3" @click="goNext('personal')">去完善</text>
              <text v-if="item.id == 12" @click="goNext('model')">去填写</text>
            </view>
            <view class="btn done" v-else-if="item.status == 1">已完成</view>
          </view>
        </view>
      </view>

      <view class="task_wrap">
        <view class="main_title">日常任务</view>
        <view class="item" v-for="(item, index) in daily_task" :key="index">
          <view class="u-flex left_wrap">
            <view class="icon_wrap">
              <image class="icon" :src="item.icon" />
            </view>
            <view class="content">
              <view class="u-flex title_wrap">
                <view class="title">{{item.name}}</view>
                <view class="tips_wrap">
                  <view class="u-flex bag_wrap" v-if="item.award_type == 2">
                    <image class="redBag" :src="redBag" mode="widthFix" />
                    <view class="cash">{{item.award}}元</view>
                  </view>
                  <view class="tips" v-else>+{{item.award}}</view>
                </view>
              </view>
              <view class="text_wrap">{{item.intro}}</view>
            </view>
          </view>
          <view class="u-flex btn_wrap">
            <view class="btn get" v-if="item.is_finish == 0">
              <text v-if="item.id == 4" @click="goNext('news')">去阅读</text>
              <text v-if="item.id == 5">去邀请</text>
              <text v-if="item.id == 6" @click="goNext('sign')">去签到</text>
              <text v-if="item.id == 7">去提现</text>
            </view>
            <view class="btn done" v-else-if="item.status == 1">
              <text v-if="item.has_receive">+{{item.has_receive}}</text>
              <text v-else>已完成</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <u-modal
      ref="uModal"
      v-model="showModel"
      title="邀请码"
      confirm-color="#f04323"
      :show-cancel-button="true"
      :async-close="true"
      @confirm="modelConfim"
    >
      <view class="slot-content">
        <u-input v-model="inviteCode" :border="true" placeholder="输入邀请码" />
      </view>
    </u-modal>
    <u-tabbar :list="vuex_tabbar"></u-tabbar>
  </view>
</template>

<script>
import { getTaskList, postUserBind } from "@/api/home.js";
export default {
  data() {
    return {
      integral: 0, //当前金币
      assess_money: 0, //折合现金
      series: 0, //连续签到天数
      sign_final: 0, //连续签到可得金币数
      showModel: false, // 显示绑定弹窗
      inviteCode: "", // 输入的邀请码
      redBag: "/static/img/task/pic_hb.png",
      taskCoin: [
        {
          id: 1,
          cash: 50,
          title: "看视频领金币",
          status: 3,
        },
        {
          id: 2,
          cash: 50,
          title: "看文章领金币",
          status: 1,
        },
        {
          id: 3,
          cash: 20,
          title: "看视频领金币",
          status: 3,
        },
        {
          id: 4,
          cash: 20,
          title: "签到领金币",
          status: 0,
        },
      ],
      new_task: [], //新手任务
      daily_task: [], //日常任务
    };
  },
  onShow(options) {
    this.getTask();
  },
  methods: {
    // 获取任务列表
    async getTask() {
      let { data } = await getTaskList(this.vuex_token);
      this.integral = data.integral;
      this.assess_money = data.assess_money;
      this.series = data.series;
      this.sign_final = data.sign_final;
      this.new_task = data.new_task;
      this.daily_task = data.daily_task;
    },
    // 跳转页面
    goNext(type) {
      switch (type) {
        case "sign":
          this.$Router.push({ name: "taskSign" });
          break;
        case "coin":
          this.$Router.push({ name: "myCoin" });
          break;
        case "news":
          uni.switchTab({ url: "/pages/news/news" });
          break;
        case "personal":
          this.$Router.push({ name: "personalData" });
          break;
        case "model":
          this.showModel = true;
          break;
        default:
          break;
      }
    },
    // 币区跳转
    goCoinPage(id) {
      switch (id) {
        case 2:
          uni.switchTab({ url: "/pages/news/news" });
          break;
        case 4:
          this.$Router.push({ name: "taskSign" });
          break;

        default:
          break;
      }
    },
    // 邀请码弹窗确认
    async modelConfim() {
      if (!this.inviteCode) {
        this.$u.toast("请输入邀请码");
        this.$refs.uModal.clearLoading();
        return;
      }
      let params = {
        token: this.vuex_token,
        code: this.inviteCode,
      };
      try {
        let { code, data, msg } = await this.$u.post(
          `${this.$baseURL}/v1/user/bind`,
          params,
          {
            "content-type": "application/x-www-form-urlencoded",
          }
        );
        if (code !== 0) {
          this.$u.toast(msg);
          this.showModel = false;
          return;
        }
        this.$u.toast("绑定成功");
        this.showModel = false;
      } catch (err) {
        console.log(err);
        this.showModel = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-image: url("/static/img/task/pic_rwbg.png");
  background-repeat: no-repeat;
  background-position: top;
  background-size: 100%;
  // padding-top: env(safe-area-inset-top);
  padding-top: var(--status-bar-height);
  padding-left: 30rpx;
  padding-right: 30rpx;
  padding-bottom: 180rpx;
  .main_title {
    color: #fff;
    font-size: 48rpx;
    font-weight: bold;
    letter-spacing: 1px;
    padding: 30rpx 0 20rpx;
  }
  .cash_wrap {
    color: #fff;
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
      font-weight: 600;
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
          line-height: 82rpx;
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
.slot-content {
  padding: 50rpx 70rpx 60rpx;
}
</style>
