<template>
  <view id="app">
    <view class="u-flex header">
      <u-icon
        name="close"
        color="#333333"
        size="28"
        @click="closeLogin"
      ></u-icon>
      <view>遇到问题</view>
    </view>
    <view class="container">
      <div class="top_wrap">
        <view class="u-flex title_wrap">
          <image class="logo" src="/static/img/login/icon_logo.png" mode="widthFix" />
          <view class="title">手机登录</view>
        </view>
        <view class="off_title">
          <view v-if="phone">
            <text>验证码已发送至+86 1888888888</text>
            <view>
              <u-icon
                name="edit-pen-fill"
                color="#333333"
                size="28"
                @click="eidtPhone"
              ></u-icon>
              <text>修改</text>
            </view>
          </view>
          <view v-else>登录即表示同意“用户协议”和“隐私政策”</view>
        </view>
      </div>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      phone: null,
    };
  },
  onLoad(options) {
    console.log(this.$Route.query);
  },
  computed: {},
  methods: {
    // 关闭登录
    closeLogin() {
      console.log(11);
    },
    // 编辑手机号
    eidtPhone() {
      console.log("edit");
    },
  },
};
</script>

<style lang="scss">
#app {
  .header {
    justify-content: space-between;
    padding: 30rpx 30rpx;
  }
  .container {
    padding: 30rpx 60rpx;
    .top_wrap {

      .title_wrap {

        .logo {
          width: 80rpx;
          margin-right: 20rpx;
        }
        .title {
          font-size: 54rpx;
        }
      }
      .off_title {
        color: #999999;
        margin-top: 14rpx;
      }
    }
  }
}
</style>
