<template>
  <view>
    <u-navbar :is-back="false" :is-fixed="true" :border-bottom="false"></u-navbar>
    <view class="tag-page">
      <view class="mian_title">选择你感兴趣的东西</view>
      <view class="tag_wrap">
        <view class="u-flex item" v-for="(item, index) in tagList" :key="index">
          <view class="title">{{item.title}}</view>
          <u-checkbox v-model="item.checked" size="40" shape="circle" active-color="#F04323"></u-checkbox>
        </view>
      </view>
      <view class="next_btn" @click="goNext('tagOff')">下一步</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tagList: [
        {
          title: "电影AAA",
          checked: false,
        },
        {
          title: "美食",
          checked: false,
        },
        {
          title: "音乐",
          checked: false,
        },
        {
          title: "运动",
          checked: false,
        },
        {
          title: "学习",
          checked: false,
        },
      ],
    };
  },
  methods: {
    // 选中某个单选框时，由radio时触发
    goNext(type) {
      switch (type) {
        case "tagOff":
          this.$Router.push({ path: "/pages/login/tagOff" });
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-right {
  margin-right: 30rpx;
  display: flex;
}
.tag-page {
  position: relative;
  padding: 0 40rpx;
  .mian_title {
    color: #333333;
    font-size: 36rpx;
    font-weight: bold;
  }
  .tag_wrap {
    padding-top: 40rpx;
    .item {
      justify-content: space-between;
      padding: 24rpx 30rpx;
      margin-bottom: 30rpx;
      background: #f8f8f8;
      border-radius: 10rpx;
      /deep/.u-checkbox__icon-wrap {
        background: #fff;
      }
      /deep/.u-checkbox__label {
        display: none;
      }
      .title {
        font-size: 30rpx;
        font-weight: bold;
      }
    }
  }
  .next_btn {
    position: fixed;
    bottom: 12%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 80%;
    color: #fff;
    font-size: 30rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 10rpx;
    background: #f04323;
  }
}
</style>
