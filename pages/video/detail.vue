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
        <view class="video_wrap" >
          <video
            class="myVideo"
            id="myVideo"
            :src="detail.video"
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
              <view class="text">{{detail.like}}</view>
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
              <u-avatar :src="detail.avatar" size="80"></u-avatar>
              <view class="right">
                <view class="nickname">{{detail.nickname}}</view>
                <view class="fans">{{detail.fans}}粉丝</view>
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
        <view class="item" v-for="(item, index) in recommendList" :key="index">
          <view class="left_wrap">
            <view class="title u-line-2">{{item.title}}</view>
            <view class="u-flex bottom">
              <view class="u-flex left">
                <view class="name">{{item.name}}</view>
              </view>
              <view class="play_time">{{item.play_time}}万次播放</view>
            </view>
          </view>
          <view class="right_wrap">
            <image class="banner" :src="item.banner" />
            <view class="times">{{item.times}}</view>
          </view>
        </view>
        <view class="showmore_wrap">
          <view class="text">查看更多</view>
          <u-icon name="arrow-down"></u-icon>
        </view>
      </view>
      <!-- 评论版块 -->
      <view class="comment_wrap">
        <my-comment></my-comment>
      </view>
    </view>
  </view>
</template>

<script>
import myComment from "@/components/my-comment/my-comment";
export default {
  components: {
    myComment,
  },
  data() {
    return {
      statusBarHeight: 0, // 工具栏高度
      detail: {
        video:
          "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4",
        title:
          "这里是视频标题这里是视频标题这里是视频标题这里是视频标题这里是视频标题这里是视频标题这里是视频标题这里是视频标题",
        like: 220,
        avatar: "",
        nickname: "这里是用户名这里是用户名这里是用户名这里是用户名",
        fans: 5425,
        is_like: 0,
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
  onReady(options) {
    try {
      const res = uni.getSystemInfoSync();
      console.log(res.statusBarHeight);
      this.windostatusBarHeightwWidth = res.statusBarHeight;
    } catch (e) {
      // error
    }
    setTimeout(() => {
      uni.setNavigationBarColor({
        frontColor: "#ffffff",
        // backgroundColor: "#000000",
      });
    }, 500);
  },
  methods: {
    // 视频报错回调
    videoErrorCallback(e) {
      // console.log(e);
      uni.showModal({
        content: "视频错误",
        showCancel: false,
      });
    },
    // 视频点赞
    getLikes() {
      this.detail.is_like = !this.detail.is_like;
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
        padding: 0 15rpx;
        line-height: 68rpx;
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
      margin-right: 26rpx;
      .title {
        color: #333333;
        font-size: 28rpx;
        letter-spacing: 1px;
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
        width: 250rpx;
        height: 100%;
        border-radius: 10rpx;
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
