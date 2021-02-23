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
      <view class="u-m-t-10">
        <u-cell-group :border="false">
          <u-cell-item title="字体大小"></u-cell-item>
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
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
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
