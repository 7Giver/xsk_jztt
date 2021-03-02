<template>
  <view>
    <u-navbar title="系统设置" :is-fixed="true" :border-bottom="false">
      <view class="navbar-right" slot="right">
        <u-icon name="more-dot-fill" size="43" color="#333"></u-icon>
      </view>
    </u-navbar>
    <view class="setting-page">
      <view class="u-m-t-10">
        <u-cell-group :border="false">
          <u-cell-item title="账号管理" @click="goNext('account')"></u-cell-item>
          <u-cell-item title="编辑个人资料" @click="goNext('personal')"></u-cell-item>
        </u-cell-group>
      </view>
      <view class="u-m-t-10" @click="showFontPicker=true">
        <u-cell-group :border="false">
          <u-cell-item title="字体大小" :value="fontText"></u-cell-item>
          <u-cell-item title="非WIFI网络流量" value="最佳效果 (显示大图)"></u-cell-item>
        </u-cell-group>
      </view>
      <view class="u-m-t-10">
        <u-cell-group :border="false">
          <u-cell-item title="清除缓存" value="147.68MB"></u-cell-item>
          <u-cell-item title="检查更新" value="13.1.1版"></u-cell-item>
          <u-cell-item title="关于我们"></u-cell-item>
        </u-cell-group>
      </view>
      <view class="u-m-t-10">
        <view class="login_out">退出登录</view>
      </view>
      <!-- 设置全局字符大小 -->
      <u-select
        v-model="showFontPicker"
        :list="fontArray"
        :default-value="fontIndex"
        @confirm="fontPickerChange"
      ></u-select>
      <!-- <view>测试字体</view> -->
    </view>
  </view>
</template>

<script>
import { setFontSize } from "api/home.js";
export default {
  data() {
    return {
      fontText: "",
      fontIndex: [1], //默认下标
      showFontPicker: false, //字体picker显示
      fontArray: [
        {
          value: 0,
          label: "小",
        },
        {
          value: 1,
          label: "中",
        },
        {
          value: 2,
          label: "大",
        },
      ],
    };
  },
  onShow(options) {
    this.initFontSize();
  },
  methods: {
    // 页面跳转
    goNext(type) {
      switch (type) {
        case "account":
          this.$Router.push({ path: "/pages/setting/account" });
          break;
        case "personal":
          this.$Router.push({ path: "/pages/setting/personal" });
          break;
        default:
          break;
      }
    },
    // 载入字体大小
    initFontSize() {
      this.fontText = this.vuex_setting.font;
      // console.log(this.vuex_setting.font);
      let resultIndex = this.fontArray.findIndex(
        (item) => item.label == this.vuex_setting.font
      );
      this.fontIndex = [resultIndex];
    },
    // 切换字符大小
    fontPickerChange(e) {
      let target = e[0];
      this.fontIndex = [target.value];
      this.fontText = target.label;
      window.document.documentElement.setAttribute("data-size", target.value);
      this.goSetFont();
    },
    // 请求设置字体大小
    async goSetFont() {
      let params = {
        token: this.vuex_token,
        font: this.fontText,
      };
      let { data } = await setFontSize(params);
      this.$u.vuex('vuex_setting.font', this.fontText);
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #f2f2f2;
}
.navbar-right {
  margin-right: 30rpx;
  display: flex;
}
.setting-page {
  .login_out {
    color: #f04323;
    font-size: 30rpx;
    line-height: 100rpx;
    text-align: center;
    background: #fff;
  }
}
</style>
