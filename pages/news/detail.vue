<template>
  <view id="app">
    <u-navbar :title="detail.title" :border-bottom="false">
      <view class="u-flex navbar-right" slot="right">
        <u-icon name="star"></u-icon>
        <u-icon name="share"></u-icon>
      </view>
    </u-navbar>
    <view class="detail-page">
      <view class="detail_wrap">
        <view class="u-line-3 main_title">{{detail.title}}</view>
        <view class="u-flex inner_header">
          <view class="u-flex left_wrap">
            <view class="avatar_wrap">
              <u-avatar :src="detail.avatar" size="75"></u-avatar>
            </view>
            <view class="right">
              <view class="nickname">{{detail.source}}</view>
              <view class="date">{{detail.datetime}}</view>
            </view>
          </view>
          <view class="right_wrap">
						<view class="foucs_btn">+关注</view>
					</view>
        </view>
        <view class="content_wrap">{{detail.title}}</view>
        <view class="handle_wrap">
          <view class="like_wrap"></view>
          <view class="love_wrap"></view>
        </view>
        <view class="advert_wrap">
          <view class="bottom_wrap">
            <view class="left">
              <view>广告</view>
              <view>这里是广告昵称</view>
            </view>
            <view class="right">
              <u-icon name="close"></u-icon>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
    };
  },
  onLoad(options) {
    console.log(this.$Route);
    this.getQueryObj();
  },
  methods: {
    // 获取文章对象
    getQueryObj() {
      let detail = this.$Route.query;
      if (detail.id) {
        this.detail = detail;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-right {
  margin-right: 30rpx;
  .u-icon {
    color: #666666;
    font-size: 42rpx;
    &:first-child {
      margin-right: 15rpx;
    }
  }
}
.detail-page {
  .detail_wrap {
    padding: 0 15px;
    .main_title {
      margin: 10rpx auto 0;
      color: #333333;
      font-size: 40rpx;
    }
    .inner_header {
      justify-content: space-between;
      margin: 30rpx auto;
      .left_wrap {
        .avatar_wrap {
          margin-right: 16rpx;
        }
        .right {
          .nickname {
            color: #333333;
            font-size: 26rpx;
          }
          .date {
            color: #999999;
            font-size: 24rpx;
            margin-top: 3rpx;
          }
        }
      }
			.right_wrap {

				.foucs_btn {
					width: 120rpx;
					color: #fff;
					font-size: 26rpx;
					text-align: center;
					line-height: 48rpx;
					border-radius: 13rpx;
					letter-spacing: 1px;
					background-color: #F04323;
				}
			}
    }
  }
}
</style>
