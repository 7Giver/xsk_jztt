<template>
  <view id="app" :style="{'min-height': innerPage}">
    <u-navbar :is-fixed="false" :border-bottom="false" title="生成专属邀请海报" title-width="300"></u-navbar>
    <view class="poster-page">
      <view class="poster_wrap" id="poster">
        <image class="poster" src="/static/img/mine/pic_hb.png" mode="widthFix" />
        <view class="invite_code">邀请码：{{inviteCode}}</view>
        <image class="code" src="/static/img/code.jpg" mode="widthFix" />
      </view>
      <view class="btn_wrap">
        <view class="btn save">保存图片</view>
        <view class="btn share" @click="resultPoster">立即分享</view>
      </view>
    </view>
    <image class="test" :src="resultSrc" mode="widthFix" v-if="resultSrc" />
  </view>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      poster: "", //海报图片
      resultSrc: "", //输出的海报图片
      inviteCode: 4561523,
    };
  },
  computed: {
    innerPage() {
      return window.innerHeight + "px";
    },
  },
  methods: {
    // 生成海报
    resultPoster() {
      window.pageYoffset = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      var posterDom = document.querySelector("#poster");
      new html2canvas(posterDom, {
        allowTaint: true,
        useCORS: true,
				scale: 1.5,
      }).then((canvas) => {
        this.resultSrc = canvas.toDataURL();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
}
.poster-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 50rpx 90rpx 100rpx;
  .poster_wrap {
    position: relative;
    .poster {
      width: 100%;
    }
    .invite_code {
      position: absolute;
      left: 50%;
      bottom: 34%;
      transform: translate(-50%, 0);
      color: #fff;
      padding: 0 20rpx;
      font-size: 24rpx;
      line-height: 50rpx;
      border-radius: 200rpx;
      background: rgba(0, 0, 0, 0.5);
    }
    .code {
      position: absolute;
      left: 50%;
      bottom: 6%;
      transform: translate(-50%, 0);
      width: 220rpx;
      box-shadow: 0px 0px 13px 0px rgba(35, 24, 21, 0.4);
    }
  }
  .btn_wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn {
      width: 40%;
      font-size: 30rpx;
      line-height: 68rpx;
      text-align: center;
      border-radius: 100rpx;
      border: 1px solid #f04323;
    }
    .save {
      color: #f04323;
    }
    .share {
      color: #fff;
      background: #f04323;
    }
  }
}
.test {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
}
</style>
