<template>
  <view class="min-footer">
    <view class="comment_wrap" @click="emitShowReport">
      <image class="icon" src="/static/img/icon/icon_xpl.png" mode="widthFix" />
      <!-- <u-input v-model="comment" height="40" placeholder="写评论..." disabled></u-input> -->
      <view class="title">写评论...</view>
    </view>
    <view class="mix_wrap">
      <view class="item" @click="emitScroll">
        <image src="/static/img/icon/icon_comment.png" mode="widthFix" />
        <u-badge type="error" size="mini" :count="detail.comments || 0" :is-center="true"></u-badge>
      </view>
      <view class="item" @click="emitCollect">
        <image v-if="detail.is_favor" src="/static/img/icon/icon_sc_on.png" mode="widthFix" />
        <image v-else src="/static/img/icon/icon_sc.png" mode="widthFix" />
      </view>
      <view class="item" @click="emitLike">
        <image v-if="detail.is_like" src="/static/img/news/icon_dz_on.png" mode="widthFix" />
        <image v-else src="/static/img/news/icon_dz.png" mode="widthFix" />
      </view>
      <view class="item">
        <image src="/static/img/icon/icon_fx.png" mode="widthFix" />
      </view>
    </view>
  </view>
</template>

<script>
/**
 * minFooter 文章视频底部功能
 * @description 集合评论、转发、收藏、点赞等功能
 * @property {Object} detail 文章详情对象
 * @event {Function} emitShowReport 派送展示评论组件
 * @event {Function} emitLike 派送点赞事件
 * @event {Function} emitCollect 派送点赞事件
 */
export default {
  name: "mixFooter",
  props: {
    detail: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  // mounted() {
  //   console.log(this.detail);
  //   console.log(this.commentNum);
  // },
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    emitShowReport() {
      this.$emit("emitShowReport");
    },
    emitScroll() {
      this.$emit("emitScroll");
    },
    emitLike() {
      this.$emit("emitLike");
    },
    emitCollect() {
      this.$emit("emitCollect");
    },
  },
};
</script>

<style lang="scss" scoped>
.min-footer {
  position: fixed;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20rpx 34rpx;
  background: #fff;
  border-top: 1px solid #e6e6e6;
  .comment_wrap {
    width: 50%;
    display: flex;
    align-items: center;
    padding: 12rpx 24rpx;
    background: #f2f2f2;
    border-radius: 120rpx;
    .icon {
      width: 26rpx;
      margin-right: 10rpx;
    }
    .title {
      color: #999999;
      font-size: 28rpx;
    }
  }
  .mix_wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 44rpx;
    .item {
      position: relative;
      image {
        width: 38rpx;
      }
    }
  }
}
</style>