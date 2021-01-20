<template>
  <view id="app" v-cloak>
    <u-navbar :is-back="false" :border-bottom="false">
      <view class="navbar-right" slot="right">
        <view class="icon_wrap">
          <view class="left">
            <u-icon name="email" size="43" color="#333"></u-icon>
            <u-badge size="mini" :is-dot="true" :offset="[-8, -8]"></u-badge>
          </view>
          <view>消息</view>
        </view>
      </view>
    </u-navbar>
    <view class="mine-page">
      <view class="header">
        <view class="u-flex header_top">
          <view class="u-flex left_wrap">
            <view class="avatar">
              <u-avatar :src="userInfo.avatar" size="100"></u-avatar>
            </view>
            <view class="right">
              <view class="nickname">{{ userInfo.nickname }}</view>
              <view class="bottom">
                <text>查看个人主页</text>
                <u-icon name="arrow-right" color="#969799" size="26"></u-icon>
              </view>
            </view>
          </view>
          <view class="incode_wrap">我的邀请码：{{ userInfo.inCode }}</view>
        </view>
        <view class="header_bottom">
          <view class="item">
            <view>{{5312}}</view>
            <text>我的金币</text>
          </view>
          <view class="item">
            <view>{{569}}</view>
            <text>今日金币</text>
          </view>
          <view class="item">
            <view>{{88}}</view>
            <text>当前价值(元)</text>
          </view>
          <view class="item">
            <view>{{88}}</view>
            <text>账户明细</text>
          </view>
        </view>
      </view>
      <view class="picker_wrap">
        <view class="clamp_one">字符大小：</view>
        <picker
          @change="fontPickerChange"
          :value="fontIndex"
          :range="fontArray"
        >
          <view class="uni-input">{{ fontArray[fontIndex] }}</view>
        </picker>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        avatar: "",
        nickname: "这里是用户名",
        inCode: 5463155,
      },
      fontIndex: 1,
      fontArray: ["小", "中", "大"],
    };
  },
  onShow() {
    console.log(window.document.documentElement);
  },
  methods: {
    fontPickerChange(e) {
      // console.log("picker发送选择改变，携带值为", e.target.value);
      this.fontIndex = e.target.value;
      window.document.documentElement.setAttribute("data-size", e.target.value);
    },
  },
};
</script>

<style lang="scss">
.navbar-right {
  margin-right: 30rpx;
  display: flex;
  .icon_wrap {
    display: flex;
    .left {
      margin: 0 12rpx;
      position: relative;
      color: #ffffff;
      display: flex;
    }
  }
}
.mine-page {
  height: calc(100% - 44px);
  height: calc(100% - 44px - constant(safe-area-inset-top));
  height: calc(100% - 44px - env(safe-area-inset-top));
  .header {
    padding: 0 30rpx;
    .header_top {
      align-items: flex-end;
      justify-content: space-between;
      .left_wrap {
        .avatar {
          margin-right: 20rpx;
        }
        .right {
          .nickname {
            color: #333333;
            font-size: 30rpx;
            font-weight: bold;
          }
          .bottom {
            color: #666666;
            margin-top: 6rpx;
          }
        }
      }
      .incode_wrap {
        font-size: 26rpx;
        color: #666666;
        padding-bottom: 15rpx;
      }
    }
    .header_bottom {

    }
  }
  .picker_wrap {
    display: flex;
    align-items: center;
  }
}
</style>
