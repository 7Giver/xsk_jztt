<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title" @click="toggleMessage('info')">{{ title }}</text>
    </view>
    <view @click="goToLogin">登录</view>
    <view class="">token：{{vuex_token}}</view>
    <!-- 对话框 -->
    <uni-popup
      id="popupDialog"
      ref="popupDialog"
      type="dialog"
      @change="change"
      :maskClick="true"
    >
      <uni-popup-dialog
        :type="msgType"
        title="通知"
        content="欢迎使用 uni-popup!"
        :before-close="true"
        @confirm="dialogConfirm"
        @close="dialogClose"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
import { getAreaList } from "@/api/home.js";
export default {
  data() {
    return {
      title: "Hello",
      msgType: "info",
    };
  },
  onLoad(...options) {
    this.getPageData();
  },
  onShow(...options) {
    // console.log(getAreaList);
  },
  methods: {
    getPageData() {
      // getAreaList({
      //   tel: 12321312321
      // }).then((res) => {
      //   console.log(res);
      // });
    },
    goToLogin() {
      uni.switchTab({ url: '/pages/news/news' });
    },
    /**
     * 打开消息提示
     * @param {Object} type
     */
    toggleMessage(type) {
      this.msgType = type;
      this.$refs.popupDialog.open();
    },
    /**
     * 对话框点击确认按钮
     */
    dialogConfirm(done) {
      // this.$refs.popupMessage.open();
      console.log("点击确认");
      // 需要执行 done 才能关闭对话框
      done();
    },
    /**
     * 对话框取消按钮
     */
    dialogClose(done) {
      this.msgType = "info";
      this.message = "点击了对话框的取消按钮";
      // 需要执行 done 才能关闭对话框
      done();
    },
    /**
     * popup 状态发生变化触发
     * @param {Object} e
     */
    change(e) {
      console.log("popup " + e.type + " 状态", e.show);
    },
  },
};
</script>

<style>
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
</style>
