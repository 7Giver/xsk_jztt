<template>
  <view class="article-timer">
    <view class="content undone" v-if="!timerFinish">
      <text class="top_tips">{{level}}/{{maxMinute / 60}}</text>
      <text class="timer">{{resultTime}}</text>
    </view>
    <view class="content done" v-else>
      <text class="doneText">完成</text>
    </view>
  </view>
</template>

<script>
import { articleRead } from "@/api/home.js";
export default {
  name: "articleTimer",
  props: {
    articleId: {
      type: [Number, String],
      default: "",
    },
  },
  data() {
    return {
      totalTime: 0, // 计时
      maxTime: 3600, // 计时最大值
      unitTime: 5, // 请求间隔
      stopUnit: 15, // 暂停计时单位
      maxMinute: 60, // 任务分钟
      level: 5, // 等级
      hasTime: 320,
      resultTime: "00:00", // 显示计时
      timerFinish: false, // 计时结束
      timer: null, // 定时器对象
      readTask: [
        { level: 1, reward: 200, seconds: 300 },
        { level: 2, reward: 200, seconds: 360 },
        { level: 3, reward: 200, seconds: 420 },
      ],
    };
  },
  mounted() {
    this.initData();
  },
  beforeDestroy() {
    this.timerStop();
  },
  methods: {
    initData() {
      // console.log("initData!");

      // let hasTime = this.hasTime;
      // let read_task = this.readTask;

      let hasTime = this.vuex_user.read_seconds;
      let read_task = this.vuex_setting.read_task;
      let maxTime = this.vuex_setting.article_finish_seconds;
      let unitTime = this.vuex_setting.article_commit_seconds;
      let stopUnit = this.vuex_setting.article_seconds;

      // console.log(this.vuex_setting);

      if (read_task.length) {
        let lastItem = read_task[read_task.length - 1];
        this.readTask = read_task;
        this.maxMinute = lastItem.seconds;

        if (hasTime == lastItem.seconds) {
          this.timerFinish = true;
          return;
        }
        if (hasTime != 0) {
          this.totalTime == 0 ? (this.totalTime = hasTime) : this.totalTime;
          let arr = read_task.map((item) => item.seconds);
          let result = this.findCloseNum(arr, hasTime);
          this.level = this.addZero(parseInt((result / 60) % 60));
        }
        if (maxTime && unitTime && stopUnit) {
          this.maxTime = maxTime;
          this.unitTime = unitTime;
          this.stopUnit = stopUnit;
          this.startTimer(maxTime, unitTime, stopUnit);
          // console.log("timer start!");
        }
      }
    },
    // 开始计时
    startTimer(maxTime, unitTime, stopUnit) {
      this.timer = setInterval(() => {
        if (this.totalTime < maxTime) {
          ++this.totalTime;
          this.hasTime = this.totalTime;
          this.readTask.forEach((item) => {
            if (this.hasTime == item.seconds) {
              this.level = parseInt((this.hasTime / 60) % 60);
            }
          });
          this.countDown(this.totalTime);
        } else {
          this.timerFinish = true;
          this.timerStop();
        }
        if (0 < this.totalTime < maxTime) {
          this.totalTime % unitTime == 0 && this.postRead();
        }
      }, 1000);
      setTimeout(() => {
        this.timerClear();
        // console.log("timer stop!");
      }, stopUnit * 1000);
    },
    // 秒数格式化
    countDown(lefttime) {
      let d = parseInt(lefttime / (24 * 60 * 60));
      let h = parseInt((lefttime / (60 * 60)) % 24);
      let m = parseInt((lefttime / 60) % 60);
      let s = parseInt(lefttime % 60);
      d = this.addZero(d);
      h = this.addZero(h);
      m = this.addZero(m);
      s = this.addZero(s);
      this.resultTime = `${m}:${s}`;
    },
    // 不满10补0
    addZero(i) {
      return i < 10 ? "0" + i : i + "";
    },
    // 匹配已完成的等级
    findCloseNum(arr, num) {
      var index = 0;
      for (var i = 0; i < arr.length; i++) {
        var new_d_value = num - arr[i];
        if (new_d_value >= 0) {
          if (arr[i] < arr[index]) {
            continue;
          }
          index = i;
        }
      }
      return arr[index];
    },
    // 暂停定时器
    timerClear(data) {
      clearInterval(this.timer);
      this.timer = null;
    },
    // 清除定时器
    timerStop() {
      clearInterval(this.timer);
      this.totalTime = this.$options.data().totalTime;
      this.resultTime = this.$options.data().resultTime;
      this.timer = null;
    },
    // 请求阅读累计
    async postRead() {
      console.log("post");
      let params = {
        token: this.vuex_token,
        id: this.articleId,
      };
      let { data } = await articleRead(params);
    },
  },
};
</script>

<style scoped lang="scss">
.article-timer {
  position: fixed;
  right: 5%;
  bottom: 28%;
  z-index: 99;
  zoom: 0.94;
  .content {
    color: #fff;
    width: 130rpx;
    height: 130rpx;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 14rpx;
    // background-color: cornflowerblue;
    .top_tips {
      font-size: 24rpx;
      line-height: 26rpx;
    }
    .timer {
      font-size: 30rpx;
    }
  }
  .undone {
    background-image: url("/static/img/news/pic_yd1.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
  .done {
    background-image: url("/static/img/news/pic_yd2.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    .doneText {
      color: #ffff;
      font-size: 30rpx;
    }
  }
}
</style>