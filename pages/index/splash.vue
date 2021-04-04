<template>
  <view class="content">
    <!-- <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title" @click="toggleMessage('info')">{{ title }}</text>
    </view>
    <view @click="goToLogin">登录</view>
    <view class="">token：{{vuex_token}}</view> -->

    <image class="splash" src="/static/img/login/splash.png" mode="widthFix" :style="{'padding-top': (statusBarHeight + 50) + 'px'}"></image>
    <view class="pass-wap" @click="closeSplash" :style="{top: (statusBarHeight + 10) + 'px'}">
      <text>{{count}} | 关闭广告</text>
      <view class="close-view">
        <view class="close-l close-h"></view>
        <view class="close-l close-v"></view>
      </view>
    </view>
  </view>
</template>

<script>
import { getAreaList, getSystemConfig } from "@/api/home.js";
export default {
  data() {
    return {
      title: "Hello",
      msgType: "info",
      count: 5,
      myTimer: null,
      statusBarHeight: 0
    };
  },
  onShow(...options) {
    // console.log(getAreaList);
    if (this.vuex_system) {
      this.statusBarHeight = this.vuex_system.statusBarHeight;
      this.startTimer();
    }
  },
  onUnload() {
    this.timerClear();
  },
  methods: {
    goToLogin() {
      uni.switchTab({ url: '/pages/news/news' });
    },
    // 关闭广告
    closeSplash() {
      this.vuex_token ? uni.switchTab({ url: '/pages/news/news' }) : uni.redirectTo({ url: '/pages/login/login' });
    },
    // 清除定时器
    timerClear(data) {
      clearInterval(this.myTimer);
      this.timer = null;
      if (data) {
        this.closeSplash();
      }
    },
    // 开启计时器
    startTimer() {
      this.myTimer = setInterval(() => {
        if (this.count <= 0) {
          this.timerClear(true);
          return;
        }
        this.count--;
      }, 1000)
    }
  },
};
</script>

<style scoped langg="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.splash {
  width: 100%;
  padding-top: 0px;
  background-color: #FC4A23;
}

.pass-wap {
  position: absolute;
  top: 40rpx;
  right: 30rpx;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 26rpx;
  height: 50rpx;
  line-height: 50rpx;
  padding: 0 16rpx;
  border-radius: 400rpx;
  background-color: rgba(0,0,0, 0.4);
}

.close-view {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 20px;
  height: 15px;
  line-height: 15px;
  border-color: #fff;
  justify-content: center;
  text-align: center;
}

.close-l {
  position: absolute;
  width: 22rpx;
  height: 1px;
  background-color: #fff;
}

.close-h {
  transform: rotate(45deg);
}

.close-v {
  transform: rotate(-45deg);
}
</style>
