<template>
  <view id="app" :style="{ 'min-height': innerPage }" v-cloak>
    <view class="u-flex header">
      <u-icon name="close" @click="closeLogin"></u-icon>
      <view>遇到问题</view>
    </view>
    <view class="container">
      <view class="top_wrap">
        <view class="u-flex title_wrap">
          <image class="logo" src="/static/img/login/icon_logo.png" mode="widthFix" />
          <view class="title">{{ sendCode ? "输入验证码" : "手机登录" }}</view>
        </view>
        <view class="off_title">
          <view class="u-flex" v-if="sendCode">
            <text class="title">验证码发送至+86 {{ phoneNumber }}</text>
            <view>
              <u-icon name="edit-pen-fill" @click="eidtPhone"></u-icon>
              <text @click="sendCode = false">修改</text>
            </view>
          </view>
          <view v-else>登录即表示同意“用户协议”和“隐私政策”</view>
        </view>
      </view>
      <view class="mumber_wrap">
        <view class="u-flex no_code" v-if="!sendCode">
          <view class="u-flex left_wrap" @click="showZone = true">
            <view class="zone_number">+{{ zoneNumber }}</view>
            <u-icon name="arrow-down"></u-icon>
          </view>
          <view class="input_wrap">
            <u-input
              v-model="phone"
              :custom-style="{ color: '#333', 'font-size': '40rpx' }"
              placeholder="手机号"
              maxlength="15"
              @input="phoneChange"
            />
          </view>
        </view>
        <view class="u-flex has_code" v-else>
          <view class="input_wrap">
            <u-input
              v-model="verCode"
              :custom-style="{ color: '#333', 'font-size': '40rpx' }"
              placeholder="输入验证码"
              maxlength="10"
            />
          </view>
          <view class="ver_code" @click="getCode">{{ tips }}</view>
        </view>
      </view>
      <view class="tips_wrap" :style="{ visibility: sendCode ? 'hidden' : null }">未注册的手机号验证通过后将自注册</view>
      <view class="button_wrap">
        <u-button
          :ripple="true"
          :disabled="!checkPhone"
          ripple-bg-color="#e78d7d"
          @click="goReadyTo"
        >{{ sendCode ? "下一步" : "获取短信验证码" }}</u-button>
      </view>
    </view>
    <view class="authorize_wrap">
      <u-divider>微信登录</u-divider>
      <image class="icon_wx" src="/static/img/login/icon_wx.png" mode="widthFix" />
    </view>
    <!-- 选择区号 -->
    <u-select
      v-model="showZone"
      :list="actionSheetList"
      :default-value="zoneKey"
      :safe-area-inset-bottom="true"
      @confirm="zoneConfirm"
    ></u-select>
    <!-- 验证码倒计时 -->
    <u-verification-code
      ref="uCode"
      change-text="重新获取(Xs)"
      :seconds="seconds"
      :keep-running="true"
      @change="codeChange"
    ></u-verification-code>
  </view>
</template>

<script>
import { getOauthCode } from "api/home.js";
export default {
  data() {
    return {
      phone: null, //显示手机号
      zoneNumber: 86, //手机区号
      seconds: 20, //验证码倒计时
      phoneNumber: "", //去空格手机号
      verCode: "", //输入的验证码
      tips: "", //验证码提示语
      zoneKey: [0], //区号键
      showZone: false, //区号选择器
      checkPhone: false, // 验证手机号
      sendCode: false, //是否发送验证码
      actionSheetList: [
        {
          value: 0,
          label: 86,
        },
        {
          value: 1,
          label: 87,
        },
      ],
    };
  },
  onLoad(options) {
    // console.log(this.$Route.query);
    // console.log(this.$u.vuex);
    console.log(this.$http);
  },
  computed: {
    innerPage() {
      return window.innerHeight + "px";
    },
  },
  methods: {
    // 关闭登录
    closeLogin() {
      // console.log(11);
      this.$Router.back(0);
    },
    // 编辑手机号
    eidtPhone() {
      console.log("edit");
    },
    // 区号选择
    zoneConfirm(e) {
      let obj = e[0];
      this.zoneNumber = obj.label;
      this.zoneKey = [obj.value];
    },
    // 监听手机号
    phoneChange(e) {
      let length = e.length;
      if (length === 3 || length === 8) {
        this.phone += " ";
      }
      let str = this.phone.replace(/\s*/g, "");
      if (this.$common.isPhoneNumber(str)) {
        this.checkPhone = true;
        this.phoneNumber = str;
      } else {
        this.checkPhone = false;
      }
    },
    // 点击下一步
    goReadyTo() {
      if (this.sendCode) {
        this.$Router.push({ path: "/pages/login/tagIndex" });
      } else {
        this.sendCode = true;
      }
    },
    // 验证码倒计时监听
    codeChange(text) {
      // console.log(text);
      this.tips = text;
    },
    // 获取验证码
    async getCode() {
      if (!this.$refs.uCode.canGetCode) {
        this.$u.toast("倒计时结束后再发送");
        return;
      }
      uni.showLoading({
        title: "正在获取验证码",
      });
      let { data } = await getOauthCode(this.phoneNumber);
      uni.hideLoading();
      this.$u.toast("验证码已发送");
      this.$refs.uCode.start();
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  // position: relative;
}
.header {
  justify-content: space-between;
  padding: 30rpx 30rpx;
  .u-icon {
    color: #333;
    font-size: 29rpx;
  }
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
      .title {
        margin-right: 18rpx;
      }
      .u-icon {
        color: #999999;
        font-size: 28rpx;
        margin-right: 6rpx;
      }
    }
  }
  .mumber_wrap {
    margin-top: 90rpx;
    padding-bottom: 20rpx;
    border-bottom: 1px solid #e6e6e6;
    .no_code {
      .left_wrap {
        font-size: 34rpx;
        .zone_number {
          margin-right: 10rpx;
        }
        .u-icon {
          color: #333;
          font-size: 24rpx;
        }
      }
      .input_wrap {
        margin-left: 30rpx;
        .u-input {
          u-input {
            font-size: 40rpx;
          }
        }
      }
    }
    .has_code {
      justify-content: space-between;
      .input_wrap {
        flex: 1;
        padding-right: 24rpx;
        .u-input {
          u-input {
            font-size: 40rpx;
          }
        }
      }
      .ver_code {
        white-space: nowrap;
      }
    }
  }
  .tips_wrap {
    color: #999999;
    font-size: 28rpx;
    margin-top: 26rpx;
  }
  .button_wrap {
    margin-top: 60rpx;
    .u-btn {
      color: #ffffff;
      border-color: #f04323;
      background-color: #f04323;
    }
    .u-btn--default--disabled {
      border-color: #ffaa9a;
      background-color: #ffaa9a;
    }
  }
}
.authorize_wrap {
  position: absolute;
  bottom: 12%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .icon_wx {
    width: 100rpx;
    margin-top: 54rpx;
  }
}
</style>
