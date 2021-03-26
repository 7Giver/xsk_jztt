<template>
  <view>
    <u-navbar :is-back="false" :is-fixed="true" :border-bottom="false">
      <view class="mian_title">选择你感兴趣的东西</view>
    </u-navbar>
    <view class="tag-page">
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
      <view class="next_btn" @click="goSecondTag">下一步</view>
    </view>
  </view>
</template>

<script>
import { getFirstTag } from "@/api/home.js";
export default {
  data() {
    return {
      tagList: [],
    };
  },
  onShow() {
    this.getTagList();
  },
  methods: {
    // 点击选中
    checkItem(item) {
      item.checked = !item.checked;
    },
    // 跳转下一页面
    goSecondTag() {
      let targetArr = this.tagList.filter((item) => item.checked);
      let arr = targetArr.map((item) => item.id);
      let result = arr.join(",");
      this.$Router.push({
        path: "/pages/login/tagOff",
        query: {
          ids: result,
        },
      });
    },
    // 获取兴趣标签
    async getTagList() {
      let { data } = await getFirstTag();
      this.tagList = data.list.map((item) => {
        return {
          id: item.id,
          title: item.name,
          checked: false,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$mianColor: #f04323;
.mian_title {
  color: #333333;
  font-size: 36rpx;
  font-weight: bold;
  padding: 0 40rpx;
}
.tag-page {
  position: relative;
  padding: 0 40rpx 120rpx;
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
    position: sticky;
    bottom: 120rpx;
    width: 80%;
    margin: 90rpx auto 0;
    color: #fff;
    font-size: 30rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 10rpx;
    background: $mianColor;
  }
}
</style>
