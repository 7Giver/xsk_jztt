<template>
  <view id="app">
    <!-- <u-navbar :is-fixed="false" :border-bottom="false">
      <view class="u-flex navbar-right" slot="right">
        <u-icon name="star"></u-icon>
        <u-icon name="share"></u-icon>
      </view>
    </u-navbar>-->
    <view class="detail-page">
      <view class="header_wrap" :style="{'padding-top': statusBarHeight + 'px'}">
        <view class="video_wrap">
          <video
            class="myVideo"
            id="myVideo"
            :src="detail.content"
            @error="videoErrorCallback"
            controls
          ></video>
        </view>
        <view class="content">
          <view class="video_title u-line-2">{{detail.title}}</view>
          <view class="u-flex handle_wrap">
            <view class="u-flex item" @click="getLikes">
              <template>
                <u-icon name="thumb-up-fill" v-if="detail.is_like"></u-icon>
                <u-icon name="thumb-up" v-else></u-icon>
              </template>
              <view class="text">{{detail.likes > 9999 ? '1w+' : detail.likes}}</view>
            </view>
            <view class="u-flex item">
              <image class="icon" src="/static/img/icon/icon_wx.png" mode="widthFix" />
              <view class="text">分享微信</view>
            </view>
            <view class="u-flex item">
              <image class="icon" src="/static/img/icon/icon_pyq.png" mode="widthFix" />
              <view class="text">分享朋友圈</view>
            </view>
          </view>
          <view class="u-flex user_wrap">
            <view class="u-flex left_wrap">
              <u-avatar :src="userinfo.avatar" size="80"></u-avatar>
              <view class="right">
                <view class="nickname">{{userinfo.name}}</view>
                <view class="fans">{{userinfo.fans}}粉丝</view>
              </view>
            </view>
            <view class="right_wrap">
              <view class="foucs_btn">+关注</view>
            </view>
          </view>
        </view>
      </view>
      <u-gap height="15" bg-color="#F2F2F2"></u-gap>
      <view class="recommend_wrap">
        <u-read-more
          ref="uReadMore"
          close-text="查看更多"
          color="#F04323"
          show-height="620"
          text-indent="0"
          :toggle="true"
          :shadow-style="shadowStyle"
        >
          <view
            class="item"
            v-for="(item, index) in recommendList"
            :key="index"
            @click="goRecommend(item.id)"
          >
            <view class="left_wrap">
              <view class="title u-line-2">{{item.title}}</view>
              <view class="u-flex bottom">
                <view class="u-flex left">
                  <view class="name">{{item.name}}</view>
                </view>
                <view class="play_time">{{item.views}}播放</view>
              </view>
            </view>
            <view class="right_wrap">
              <image class="banner" :src="item.cover" mode="aspectFit" />
            </view>
          </view>
        </u-read-more>
      </view>
      <!-- 评论版块 -->
      <view class="comment_wrap">
        <my-comment></my-comment>
      </view>
    </view>
  </view>
</template>

<script>
import { getArticleDetail } from "@/api/home.js";
import myComment from "@/components/my-comment/my-comment";
export default {
  components: {
    myComment,
  },
  data() {
    return {
      videoId: "",
      statusBarHeight: 0, // 工具栏高度
      detail: {},
      userinfo: {},
      shadowStyle: {
        backgroundImage: "none",
      },
      recommendList: [
        {
          title:
            "这边是标题这边是标题这边是标题这边是标题这边是标题这边是标题这边是标题这边是标题",
          avatar: "",
          name: "新闻小能手新闻小能手新闻小能手新闻小能手",
          play_time: 15.3,
          times: "15:03",
          banner: "https://cdn.uviewui.com/uview/swiper/2.jpg",
        },
        {
          title: "这边是标题这边是标题这边是标题这边是标题",
          avatar: "",
          name: "新闻小能手",
          play_time: 8,
          times: "15:03",
          banner: "https://cdn.uviewui.com/uview/swiper/2.jpg",
        },
        {
          title: "这边是标题这边是标题这边是标题这边是标题",
          avatar: "",
          name: "新闻小能手",
          play_time: 5.04,
          times: "15:03",
          banner: "https://cdn.uviewui.com/uview/swiper/2.jpg",
        },
      ],
    };
  },
  onLoad(options) {
    if (options.id) {
      this.videoId = options.id;
      this.getNewsDetail();
    }
  },
  methods: {
    // 视频报错回调
    videoErrorCallback(e) {
      console.log(e);
    },
    // 视频点赞
    getLikes() {
      this.detail.is_like = !this.detail.is_like;
    },
    // 跳转视频详情
    goRecommend(id) {
      this.$Router.push({
        path: "/pages/video/detail",
        query: { id: id },
      });
    },
    // 请求文章详情
    async getNewsDetail() {
      let params = {
        token: this.vuex_token,
        id: this.videoId,
        uid: this.vuex_user.id,
      };
      let { data } = await getArticleDetail(params);
      this.userinfo = data.userinfo || {};
      this.detail = data || {};
      this.recommendList = data.recommands;
      this.$nextTick(() => {
        this.$refs.uReadMore.init();
      });
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
}
/deep/.u-content {
  line-height: 1;
}
.header_wrap {
  .video_wrap {
    width: 100%;
    // background-color: #000000;
    .myVideo {
      width: 100%;
    }
  }
  .content {
    padding: 15rpx 15px;
    .video_title {
      font-size: 28rpx;
    }
    .handle_wrap {
      margin: 30rpx auto;
      .item {
        justify-content: center;
        flex: 1;
        height: 70rpx;
        padding: 0 15rpx;
        border-radius: 400rpx;
        border: 1px solid #e5e5e5;
        &:nth-child(2) {
          margin: 0 18rpx;
        }
        .icon {
          width: 40rpx;
        }
        .u-icon {
          font-size: 34rpx;
        }
        .text {
          font-size: 24rpx;
          margin-left: 10rpx;
        }
      }
    }
    .user_wrap {
      justify-content: space-between;
      padding: 20rpx 0;
      .left_wrap {
        .u-avatar {
          margin-right: 20rpx;
        }
        .right {
          .nickname {
            width: 200rpx;
            font-size: 26rpx;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            -webkit-box-orient: vertical;
            word-break: break-all;
          }
          .fans {
            color: #999999;
            font-size: 24rpx;
          }
        }
      }
      .right_wrap {
        .foucs_btn {
          color: #fff;
          width: 100rpx;
          font-size: 24rpx;
          text-align: center;
          letter-spacing: 1px;
          line-height: 52rpx;
          border-radius: 10rpx;
          background-color: #f04323;
        }
      }
    }
  }
}
.recommend_wrap {
  padding: 0 15px;
  .item {
    display: flex;
    padding: 26rpx 0;
    border-bottom: 1px solid #e6e6e6;
    .left_wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-right: 26rpx;
      padding-bottom: 10rpx;
      .title {
        color: #333333;
        font-size: 28rpx;
        letter-spacing: 1px;
        line-height: 34rpx;
      }
      .bottom {
        color: #999999;
        font-size: 24rpx;
        margin-top: 26rpx;
        .left {
          .name {
            width: 160rpx;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            -webkit-box-orient: vertical;
            word-break: break-all;
          }
        }
        .play_time {
          margin-left: 14rpx;
        }
      }
    }
    .right_wrap {
      position: relative;
      .banner {
        width: 240rpx;
        height: 142rpx;
        border-radius: 10rpx;
        background-color: black;
      }
      .times {
        position: absolute;
        right: 10rpx;
        bottom: 10rpx;
        color: #fff;
        width: 96rpx;
        text-align: center;
        font-size: 24rpx;
        letter-spacing: 1px;
        line-height: 40rpx;
        border-radius: 300rpx;
        background-color: rgba($color: #000000, $alpha: 0.4);
      }
    }
  }
  .showmore_wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20rpx 0;
    .u-icon {
      color: #333333;
      margin-left: 10rpx;
    }
  }
}
</style>
