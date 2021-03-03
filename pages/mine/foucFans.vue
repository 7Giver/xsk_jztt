<template>
  <view>
    <u-navbar title="关注 / 粉丝" :is-fixed="true" :border-bottom="false"></u-navbar>
    <view class="fans-page">
      <u-sticky>
        <view class="navbar">
          <u-tabs-swiper
            ref="tabs"
            activeColor="#F04323"
            :list="tabList"
            :current="current"
            :is-scroll="false"
            @change="tabChange"
          ></u-tabs-swiper>
        </view>
      </u-sticky>
      <swiper
        class="uni-swiper"
        :current="swiperCurrent"
        @transition="transition"
        @animationfinish="animationfinish"
      >
        <swiper-item class="swiper-item" v-for="(tab, idx) in tabList" :key="idx">
          <foucFansPage ref="page"></foucFansPage>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import foucFansPage from "./foucFans-page";
export default {
  components: {
    foucFansPage,
  },
  data() {
    return {
      tabList: [
        {
          name: "我关注的",
        },
        {
          name: "我的粉丝",
        },
      ],
      current: 0,
      swiperCurrent: 0,
    };
  },
  onReady() {
    this.pageList = this.$refs.page;
    this.pageList[0].getOrderList();
  },
  onLoad(options) {
    // console.log(options);
  },
  methods: {
    // tab栏切换
    tabChange(index) {
      this.swiperCurrent = index;
      let target = this.pageList[index];
      target.pageIndex = 0;
      target.orderList = [];
      target.loadStatus = "loadmore";
      target.getOrderList(index);
    },
    transition({ detail: { dx } }) {
      this.$refs.tabs.setDx(dx);
    },
    animationfinish({ detail: { current } }) {
      this.$refs.tabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #f2f2f2;
}
.fans-page {
  // padding-bottom: 20rpx;
  // .uni-swiper {
  //   height: 100vh;
  // }
}
</style>
