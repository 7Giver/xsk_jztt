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
              @click="openBag"
            />
          </view>
          <view class="title_wrap">
            <view class="main">{{ detail.title }}</view>
            <view class="off">{{ detail.desc }}</view>
            <view class="cash">打开得{{ detail.money }}元</view>
          </view>
          <view class="bottom_text" v-if="detail.can_draw">{{ detail.can_draw }}</view>
        </view>
      </transition>
      <!-- 打开状态 -->
      <view class="wrap open_status" v-show="isOpen">
        <image class="bag" src="/static/img/redBag/pic_hb4.png" mode="widthFix" />
        <image class="bag bottom_card" src="/static/img/redBag/pic_hb2.png" mode="widthFix" />
        <view class="inner_card" :class="{ up: startAnime }">
          <view class="title_wrap">
            <view class="main">{{ detail.title }}</view>
            <view class="off">{{ detail.desc }}</view>
          </view>
          <view class="cash">{{ detail.money }}元</view>
        </view>
        <view class="get_btn" @click="postReceive">开心收下</view>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * redBag 红包
 * @description 新用户或活动红包
 * @property {Object} detail 红包详情
 * @event {Function} emitClose 派送关闭组件
 */
import { receiveReward } from "@/api/home.js";
export default {
  name: "redBag",
  props: {
    detail: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      showBag: false,
      isOpen: false, // 是否打开红包
      startAnime: false, // 开始动画
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
    openBag() {
      this.isOpen = true;
      setTimeout(() => {
        this.startAnime = true;
      }, 100);
    },
    async postReceive() {
      let params = {
        token: this.vuex_token,
        type: this.detail.type,
      };
      let { data } = await receiveReward(params);
      this.emitClose();
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
  .title_wrap {
    text-align: center;
    letter-spacing: 2rpx;
    .main {
      font-size: 30rpx;
      font-weight: bold;
    }
    .off {
      font-size: 24rpx;
      margin-top: 10rpx;
    }
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
    .cash {
      font-size: 44rpx;
      letter-spacing: 4rpx;
      margin-top: 38rpx;
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
  overflow: hidden;
  .bottom_card {
    z-index: 1;
    margin-top: -88rpx;
  }
  .inner_card {
    position: absolute;
    top: 326rpx;
    left: 50%;
    transform: translate(-50%, 0);
    background: url("/static/img/redBag/pic_hb3.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    width: 86%;
    height: 340rpx;
    padding-top: 54rpx;
    text-align: center;
    transition: 0.5s;
    .cash {
      font-size: 56rpx;
      margin-top: 36rpx;
      letter-spacing: 4rpx;
    }
  }
  .get_btn {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 2;
    color: #d4161a;
    width: 80%;
    font-size: 30rpx;
    font-weight: bold;
    line-height: 76rpx;
    text-align: center;
    border-radius: 200rpx;
    background: linear-gradient(0deg, #ea7850 0%, #fee7c1 100%);
  }
  .up {
    top: 0rpx;
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