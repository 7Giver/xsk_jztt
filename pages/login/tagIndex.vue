<template>
  <view>
    <u-navbar :is-back="false" :is-fixed="true" :border-bottom="false"></u-navbar>
    <view class="tag-page">
      <view class="mian_title">选择你感兴趣的东西</view>
      <view class="tag_wrap">
        <view
          class="u-flex item"
          v-for="(item, index) in tagList"
          :key="index"
          @click="checkItem(item)"
        >
          <view class="title">{{item.title}}</view>
          <view class="right_wrap" :class="{ check: item.checked }">
            <u-icon name="checkbox-mark" color="#fff"></u-icon>
          </view>
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
    // 点击选中
    checkItem(item) {
      item.checked = !item.checked;
    },
    // 跳转页面
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
$mianColor: #f04323;
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
      .title {
        font-size: 30rpx;
        font-weight: bold;
      }
      .right_wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 46rpx;
        height: 46rpx;
        border-radius: 50%;
        background: #ffffff;
        border: 1px solid #f0f0f0;
      }
      .check {
        background: $mianColor;
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
    background: $mianColor;
  }
}
</style>
