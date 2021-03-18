<template>
  <view class="red-bag">
    <u-mask :show="showBag" @click="emitClose"></u-mask>
    <view class="container">
      <!-- 关闭状态 -->
      <transition name="fade">
        <view class="wrap close_status" v-if="!isOpen">
          <image class="bag close_bag" src="/static/img/redBag/pic_hb1.png" mode="widthFix" />
          <view class="button_wrap">
            <image
              class="button"
              src="/static/img/redBag/button.png"
              mode="widthFix"
              @click="isOpen=true"
            />
          </view>
          <view class="title_wrap">
            <view class="main">恭喜您获得一个新人红包</view>
            <view class="off">（仅限新注册用户领取）</view>
          </view>
          <view class="bottom_text">当天可提现</view>
        </view>
      </transition>
      <!-- 打开状态 -->
      <view class="wrap open_status" v-show="isOpen">
        <image class="bag" src="/static/img/redBag/pic_hb4.png" mode="widthFix" />
        <image class="bag bottom_card" src="/static/img/redBag/pic_hb2.png" mode="widthFix" />
        <view class="inner_card">
          <view class="title_wrap">
            <view class="main">恭喜您获得新人红包</view>
            <view class="off">（当天可提现）</view>
          </view>
          <view class="cash">2元</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * redBag 红包
 * @description 新用户或活动红包
 * @property {Boolean} showBag 显示红包组件
 * @event {Function} emitClose 派送关闭组件
 */
export default {
  name: "redBag",
  props: {
    // showBag: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      showBag: false,
      isOpen: false, // 是否打开红包
    };
  },
  created() {
    this.showBag = true;
  },
  methods: {
    emitClose() {
      this.showBag = false;
      setTimeout(() => {
        this.$emit("emitClose");
      }, 150);
    },
  },
};
</script>

<style lang="scss" scoped>
.red-bag {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10000;
}
.container {
  position: relative;
  width: 100%;
  height: 100%;
  .wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10080;
  }
  .bag {
    width: 450rpx;
  }
}
.close_status {
  color: #fff1c5;
  .button_wrap {
    position: absolute;
    top: 62%;
    left: 50%;
    transform: translate(-50%, -50%);
    .button {
      width: 150rpx;
      animation: mymove 5s infinite;
      animation-direction: alternate;
      animation-timing-function: ease-in-out;
    }
  }
  .title_wrap {
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translate(-50%, 0);
    width: 100%;
    text-align: center;
    letter-spacing: 2rpx;
    .main {
      font-size: 30rpx;
    }
    .off {
      font-size: 24rpx;
      margin-top: 10rpx;
    }
  }
  .bottom_text {
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%, 0);
    font-size: 24rpx;
  }
}
.open_status {
  color: #d44a1d;
  .bottom_card {
    margin-top: -88rpx;
  }
  .inner_card {
    position: relative;
    display: none;
  }
}
/deep/.u-mode-center-box {
  background-color: transparent;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 800;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>