<template>
  <view>
    <u-navbar :is-back="false" :border-bottom="false">
      <view class="navbar-right" slot="right">
        <view>遇到问题</view>
      </view>
    </u-navbar>
    <view class="container">
      <view class="top_wrap">
        <view class="u-flex title_wrap">
          <image class="logo" src="/static/img/login/logo.png" mode="widthFix" />
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
          <view class="u-flex left_wrap">
            <view class="zone_number">
              <picker @change="pickerChange" :value="actionIndex" :range="actionSheet">
                <view class="uni-input">+{{actionSheet[actionIndex]}}</view>
              </picker>
            </view>
            <u-icon name="arrow-down"></u-icon>
          </view>
          <view class="input_wrap">
            <input
              v-model="phone"
              placeholder-class="phcolor"
              maxlength="13"
              placeholder="手机号"
              @input="phoneChange"
            />
          </view>
        </view>
        <view class="u-flex has_code" v-else>
          <view class="input_wrap">
            <input v-model="verCode" placeholder-class="phcolor" maxlength="6" placeholder="输入验证码" />
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
import { getOauthCode, userLogin, getUserInfo } from "@/api/home.js";
export default {
  data() {
    return {
      tips: "", // 验证码提示语
      verCode: "", // 输入的验证码
      phoneNumber: "", // 去空格手机号
      phone: null, // 显示手机号
      seconds: 20, // 验证码倒计时
      checkPhone: false, // 验证手机号
      sendCode: false, //是否发送验证码
      actionIndex: 0, // 区号下标
      actionSheet: [86, 87], // 区号数组
    };
  },
  onLoad(options) {
    // console.log(this.$Route.query);
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
    // 区号监听
    pickerChange(e) {
      this.actionIndex = e.target.value;
    },
    // 监听手机号
    phoneChange(e) {
      // console.log(e);
      let phone = e.target.value;
      if (phone.length === 3 || phone.length === 8) {
        this.phone += " ";
      }
      let str = phone.replace(/\s*/g, "");
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
        uni.showLoading({
          title: "加载中...",
        });
        this.getLogin();
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
      setTimeout(() => {
        uni.hideLoading();
        this.sendCode = true;
        this.$u.toast("验证码已发送");
        this.$refs.uCode.start();
      }, 300);
    },
    // 登录接口
    async getLogin() {
      let params = {
        mobile: this.phoneNumber,
        code: "1234",
        invite: "",
        openid: "",
      };
      let { data } = await userLogin(params);
      this.$u.vuex("vuex_token", data.token);
      this.getUserData();
    },
    // 获取用户数据
    async getUserData() {
      let { data } = await getUserInfo(this.vuex_token);
      this.$u.vuex("vuex_user", data);
      setTimeout(() => {
        uni.hideLoading();
        if (data.has_label) {
          uni.switchTab({ url: "/pages/news/news" });
        } else {
          this.$Router.push({ name: "tagOff" });
        }
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
$mianColor: #f04323;
$offColor: #ffaa9a;
.navbar-right {
  margin-right: 30rpx;
  display: flex;
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
        border-radius: 14rpx;
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
    .phcolor {
      color: #999999;
      font-size: 34rpx;
    }
    .input_wrap {
      margin-left: 30rpx;
      input {
        color: #333333;
        font-size: 40rpx;
      }
    }
    .no_code {
      .left_wrap {
        font-size: 34rpx;
        .zone_number {
          width: 74rpx;
        }
        .u-icon {
          color: #333;
          font-size: 24rpx;
        }
      }
    }
    .has_code {
      justify-content: space-between;
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
      border-color: $mianColor;
      background-color: $mianColor;
    }
    .u-btn--default--disabled {
      border-color: $offColor;
      background-color: $offColor;
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
