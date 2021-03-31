<template>
  <view class="taskSign">
    <u-navbar title="签到详情" :border-bottom="false">
      <view class="navbar-right" slot="right">
        <u-icon name="more-dot-fill" size="43" color="#333"></u-icon>
      </view>
    </u-navbar>
    <view class="sign-page">
      <view class="header">
        <view class="main_title">每日签到上线啦</view>
        <view class="off_title">连续签到每天收益金币</view>
      </view>
      <view class="container">
        <view id="calendar" v-if="showDate">
          <view class="month">
            <view class="arrow" @click="pickPre(currentYear,currentMonth)">
              <u-icon name="play-left-fill"></u-icon>
            </view>
            <view class="year-month" @click="pickYear(currentYear,currentMonth)">
              <text class="choose-year">{{ currentYear }}.</text>
              <text class="choose-month">{{ currentMonth < 10 ? '0' + currentMonth : currentMonth }}</text>
            </view>
            <view class="arrow" @click="pickNext(currentYear,currentMonth)">
              <u-icon name="play-right-fill"></u-icon>
            </view>
          </view>
          <view class="content">
            <view class="weekdays">
              <view>一</view>
              <view>二</view>
              <view>三</view>
              <view>四</view>
              <view>五</view>
              <view>六</view>
              <view>日</view>
            </view>
            <view class="days">
              <view v-for="day in days" @click="pick(day)">
                <text
                  v-if="day.date.getMonth() + 1 != currentMonth"
                  class="item other-month"
                  :class="{is_sign :day.sign}"
                >{{ day.date.getDate() < 10 ? '0' + day.date.getDate() : day.date.getDate() }}</text>
                <template v-else>
                  <text
                    v-if="day.date.getFullYear() == new Date().getFullYear() && day.date.getMonth() == new Date().getMonth() && day.date.getDate() == new Date().getDate()"
                    class="item active"
                    :class="{is_sign: day.sign}"
                  >{{ day.date.getDate() < 10 ? '0' + day.date.getDate() : day.date.getDate() }}</text>
                  <text
                    v-else
                    class="item"
                    :class="{is_sign: day.sign}"
                  >{{ day.date.getDate() < 10 ? '0' + day.date.getDate() : day.date.getDate() }}</text>
                </template>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="footer">
        <view class="main_title">签到规则</view>
        <view class="content">
          1.每日完成签到，即可获得当日金币。
          <br />2.保持连续签到，每日以5个金币递增，最高每日可获得100个金币。
          <br />3.断签一天回到第一天重新获取金币。
        </view>
      </view>
      <view class="signBtn" @click="goSign">签到</view>
    </view>
    <!-- 签到成功弹窗 -->
    <u-popup v-model="showModal" mode="center">
      <view class="sign_dialog">
        <image class="icon" src="/static/img/task/pic_qdb.png" />
        <view class="container">
          <view class="content">
            <view class="title">
              已连续签到
              <text>{{series}}</text>天
            </view>
            <view class="bottom_wrap">
              <view class="coin">金币</view>
              <view class="right">+{{integral}}</view>
            </view>
          </view>
          <view class="submit" @click="showModal=false">明天签到可获得{{tomorrow}}金币</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { getSign, postSign } from "@/api/home.js";
export default {
  data() {
    return {
      showDate: true, //显示日历
      showModal: false, //显示弹窗
      minDate: new Date(), //日历最小日期
      maxDate: new Date(), //日历最大日期
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      integral: 0, //签到获得金币数
      series: 0, //连续签到天数
      tomorrow: 0, // 明天可获得的金币数
    };
  },
  onLoad(options) {
    this.initData();
    this.getSignData();
    console.log(this.$u.timeFormat(new Date(), "yyyy-mm-dd"));
  },
  methods: {
    // 获取签到信息
    async getSignData() {
      let params = {
        token: this.vuex_token,
        date: this.$u.timeFormat(new Date(), "yyyy-mm"),
      };
      let { data } = await getSign(params);
    },
    // 点击签到
    async goSign() {
      let params = {
        token: this.vuex_token,
      };
      let { data } = await postSign(params);
      this.series = data.series;
      this.integral = data.integral;
      this.tomorrow = data.tomorrow;
      this.showModal = true;
    },
    // 返回类似 2016-01-02 格式的字符串
    formatDate: function (year, month, day) {
      let y = year;
      let m = month;
      let d = day;
      let result = "";
      if (m < 10) m = "0" + m;
      if (day) {
        if (d < 10) d = "0" + d;
        result = y + "-" + m + "-" + d;
      } else {
        result = y + "-" + m;
      }
      return result;
    },
    // 载入日历
    initData(cur) {
      var date;
      if (cur) {
        date = new Date(cur);
      } else {
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        date = new Date(year, month);
      }
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
      this.currentWeek = date.getDay(); // 1...6,0
      if (this.currentWeek == 0) {
        this.currentWeek = 7;
      }
      var str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      );
      console.log("initDay:" + str + "," + this.currentWeek);
      this.days.length = 0;
      // 今天是周日，放在第一行第7个位置，前面6个
      for (var i = this.currentWeek - 1; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        this.days.push({
          date: d,
          sign: 0,
        });
      }
      for (var i = 1; i <= 35 - this.currentWeek; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        this.days.push({
          date: d,
          sign: 0,
        });
      }
      this.initSignDate();
    },
    // 日期点击
    pick(date) {
      // alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()));
      // this.goSign();
    },
    // 上一个月
    pickPre(year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      // this.getSignDate(this.formatDate(d.getFullYear(), d.getMonth() + 1));
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    // 下一个月
    pickNext(year, month) {
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(35);
      // this.getSignDate(this.formatDate(d.getFullYear(), d.getMonth() + 1));
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    // 点击标题年月
    pickYear(year, month) {
      // alert(year + "," + month);
    },
    // 设置签到日历范围
    initSignMonth(str) {
      let arr = str.split("-");
      this.minDate = new Date(arr[0] * 1, arr[1] * 1 - 7);
      this.maxDate = new Date(arr[0] * 1, arr[1] * 1, 0);
      this.showDate = true;
    },
    // 渲染已签到日期
    initSignDate() {
      let days = this.days;
      let signList = this.signList || [{ add_date: "2021-03-10", id: "1" }];

      days.forEach((item) => {
        signList.forEach((v) => {
          if (item.date.getTime() === new Date(v.add_date).getTime()) {
            item.sign = 1;
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.taskSign {
  height: 100vh;
  background-color: #f04323;
}
.navbar-right {
  margin-right: 30rpx;
}
/deep/ .u-mode-center-box {
  background-color: transparent;
}
.sign-page {
  background-image: url("/static/img/task/pic_rwbg.png");
  background-repeat: no-repeat;
  background-position: top;
  background-size: 100%;
  padding: 0 15px;
  .header {
    color: #fff;
    padding: 30rpx 0 30rpx;
    .main_title {
      font-size: 46rpx;
      letter-spacing: 1px;
    }
    .off_title {
      font-size: 30rpx;
      margin-top: 8rpx;
      letter-spacing: 1px;
    }
  }
  .container {
    $mainColor: #fff;
    margin-bottom: 40rpx;
    background: #fff;
    border-radius: 20rpx;
    overflow: hidden;
    .month {
      display: flex;
      justify-content: space-between;
      width: 85%;
      margin: 0 auto;
      line-height: 90rpx;
      background: $mainColor;
      .year-month {
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: #666666;
        font-size: 34rpx;
      }
      .arrow {
        color: #cacaca;
        font-size: 32rpx;
        padding: 0 20rpx;
      }
    }
    .content {
      padding: 0 32rpx;
    }
    .weekdays {
      padding: 6rpx 0 18rpx;
      background-color: $mainColor;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      flex-wrap: wrap;
      color: #999999;
      font-size: 26rpx;
      justify-content: space-around;
      view {
        display: inline-block;
        width: 13.6%;
        text-align: center;
      }
    }
    .days {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 14rpx 0;
      background: #ffffff;
      view {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 14.2%;
        font-size: 28rpx;
        list-style-type: none;
        text {
          color: #ebebeb;
          $width: 80rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          width: $width;
          height: $width;
        }
      }
      .active {
        color: $mainColor;
        border-radius: 50%;
        border: 1px solid #f04323;
      }
      .other-month {
        padding: 5px;
        opacity: 0.3;
      }
      .item {
        background: url("/static/img/task/pic_coin.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 83%;
      }
      .is_sign {
        color: #ffe985;
        background: url("/static/img/task/pic_coin_on.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 83%;
      }
    }
  }
  .footer {
    color: #fff;
    padding: 20rpx 32rpx;
    border-radius: 20rpx;
    background: #ff7258;
    .main_title {
      font-size: 30rpx;
      letter-spacing: 1px;
      padding: 10rpx 0 16rpx;
    }
    .content {
      font-size: 24rpx;
      line-height: 1.8;
    }
  }
  .signBtn {
    // position: fixed;
    // bottom: 32px;
    // left: 50%;
    // transform: translate(-50%, 0);
    width: 85%;
    margin: 40rpx auto 0;
    color: #fbfeca;
    text-align: center;
    font-size: 34rpx;
    line-height: 90rpx;
    letter-spacing: 4rpx;
    border-radius: 400rpx;
    border: 3px solid #ffd074;
    background: linear-gradient(0deg, #ea302c 0%, #ff7428 100%);
  }
}
.sign_dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .icon {
    position: relative;
    z-index: 2;
    width: 110rpx;
    height: 120rpx;
  }
  .container {
    position: relative;
    z-index: 1;
    margin-top: -60rpx;
    border-radius: 20rpx;
    background: #fff;
    overflow: hidden;
    .content {
      width: 430rpx;
      padding: 70rpx 30rpx 30rpx;
      .title {
        color: #333333;
        font-size: 30rpx;
        text-align: center;
        text {
          color: #f04323;
          font-size: 36rpx;
          margin: 0 10rpx;
        }
      }
      .bottom_wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20rpx;
        .coin {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffe985;
          font-size: 24rpx;
          margin-right: 10rpx;
          width: 70rpx;
          height: 70rpx;
          background: url("/static/img/task/pic_coin_on.png");
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
        }
        .right {
          color: #f04323;
          font-size: 30rpx;
        }
      }
    }
    .submit {
      color: #fff;
      font-size: 24rpx;
      text-align: center;
      line-height: 80rpx;
      background: linear-gradient(90deg, #f04323 0%, #ff983c 100%);
    }
  }
}
</style>
