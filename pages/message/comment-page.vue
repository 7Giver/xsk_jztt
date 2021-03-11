<template>
  <view class="comment_wrap">
    <view class="item" v-for="(item, index) in dataList" :key="index" @click="goNextPage(item.id)">
      <view class="avatar_wrap">
        <u-avatar :src="item.avatar" size="90"></u-avatar>
      </view>
      <view class="container_wrap">
        <view class="top_wrap">
          <view class="left">
            <view class="user_name">{{item.uname}}</view>
            <view class="add_time">{{item.add_time}}</view>
          </view>
          <!-- <view class="right" @click="postDelete(item.id)">删除</view> -->
        </view>
        <view class="content_wrap">
          <text class="u-line-2">{{item.content}}</text>
        </view>
        <view class="works_wrap">
          <view class="article_wrap">
            <image class="cover" :src="item.article_info.cover" mode="scaleToFill" />
            <view class="u-line-3 title">{{item.article_info.title}}</view>
          </view>
          <!-- <view class="video_wrap" v-if="item.type == 1">
                  <image class="cover" :src="item.cover" mode="scaleToFill" />
          </view>-->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 跳转文章详情
    goNextPage(id) {
      console.log(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.comment_wrap {
  padding: 20rpx 30rpx;
  .item {
    display: flex;
    align-items: flex-start;
    .avatar_wrap {
      padding-right: 30rpx;
    }
    .container_wrap {
      flex: 1;
      .top_wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          .user_name {
            font-weight: bold;
            font-size: 32rpx;
          }
          .add_time {
            color: #999999;
            font-size: 26rpx;
          }
        }
        .right {
          font-size: 28rpx;
          color: #f04323;
        }
      }
      .content_wrap {
        color: #333333;
        font-size: 28rpx;
        padding: 14rpx 0;
      }
      .works_wrap {
        padding: 20rpx;
        background: #f7f7f7;
        .article_wrap {
          display: flex;
          align-items: center;
          .cover {
            width: 170rpx;
            height: 110rpx;
            margin-right: 20rpx;
          }
          .title {
            flex: 1;
            font-size: 24rpx;
          }
        }
      }
    }
  }
}
</style>