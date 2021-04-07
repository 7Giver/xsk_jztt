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
            <view class="u-flex item" @click="postLike">
              <template>
                <u-icon name="thumb-up-fill" color="#f04323" v-if="detail.is_like"></u-icon>
                <u-icon name="thumb-up" color="#f04323" v-else></u-icon>
              </template>
              <view
                class="text"
                :class="{on: detail.is_like}"
              >{{detail.likes > 9999 ? '1w+' : detail.likes}}</view>
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
            <view class="right_wrap" @click="postFocus" v-show="userinfo.id">
              <view class="foucs_btn on" v-if="!userinfo.is_focus">+关注</view>
              <view class="foucs_btn" v-else>已关注</view>
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
        <my-comment ref="myComment" @emitShowReport="goShowReport" @scrollToBottom="scrollToBottom"></my-comment>
      </view>
      <!-- 底部功能组件 -->
      <mix-footer
        ref="mixFooter"
        :detail="detail"
        @emitScroll="scrollComment"
        @emitShowReport="goShowReport"
        @emitLike="postLike"
        @emitCollect="postCollect"
        @emitShare="goShareDetail"
      ></mix-footer>
      <!-- 发表评论组件 -->
      <comment-report
        ref="commentReport"
        :articleId="detail.id"
        :parentId="parentId"
        @emitShowReport="goShowReport"
      ></comment-report>
    </view>
  </view>
</template>

<script>
import {
  getArticleDetail,
  likeArticle,
  postUserFocus,
  collectArticle,
} from "@/api/home.js";
import myComment from "@/components/my-comment/my-comment";
import MixFooter from "@/components/mix-footer/mix-footer";
import CommentReport from "@/components/comment-report/comment-report";
export default {
  components: {
    myComment,
    MixFooter,
    CommentReport,
  },
  data() {
    return {
      videoId: "",
      parentId: "", // 父级评论Id
      statusBarHeight: 0, // 工具栏高度
      detail: {},
      userinfo: {},
      shadowStyle: {
        backgroundImage: "none",
      },
      recommendList: [],
    };
  },
  onReady() {
    this.myComment = this.$refs.myComment;
    this.mixFooter = this.$refs.mixFooter;
    this.commentReport = this.$refs.commentReport;
    this.detail.id && this.myComment.getComment(this.detail.id);
  },
  onLoad(options) {
    if (options.id) {
      this.videoId = options.id;
      this.getNewsDetail();
    }
    uni.$on("emitRefreshComment", (data) => {
      this.detail.comments++;
      this.refreshComment();
    });
  },
  methods: {
    // 视频报错回调
    videoErrorCallback(e) {
      console.log(e);
    },
    // 跳转视频详情
    goRecommend(id) {
      this.$Router.push({
        path: "/pages/video/detail",
        query: { id: id },
      });
    },
    // 展示评论组件
    goShowReport(data) {
      // this.showReport = !this.showReport;
      this.commentReport.showContent = !this.commentReport.showContent;
      // data是Boolean刷新评论视图，是string则传入父级评论id
      if (typeof data === "string") {
        this.parentId = data;
      }
    },
    // 滚动到评论区
    scrollComment() {
      let dom = this.myComment.$el;
      uni.pageScrollTo({
        scrollTop: dom.offsetTop,
        duration: 300, // 动画默认300ms
      });
    },
    // 刷新评论区
    refreshComment() {
      this.myComment.limit = 10;
      this.myComment.pageIndex = 1;
      this.myComment.commentList = [];
      this.myComment.getComment(this.detail.id);
    },
    // 分享文章详情
    goShareDetail() {
      // #ifdef H5
      console.log("H5分享开发中");
      // #endif
      // #ifdef APP-PLUS
      plus.share.sendWithSystem(
        {
          content: this.detail.title,
          href: this.detail.share_url,
          pictures: [this.detail.cover ? this.detail.cover : this.logo_url],
        },
        function () {
          console.log("分享成功");
        },
        function (e) {
          console.log("分享失败：" + JSON.stringify(e));
        }
      );
      // #endif
    },
    // 请求文章详情
    async getNewsDetail() {
      let params = {
        token: this.vuex_token || "",
        id: this.videoId,
        uid: this.vuex_user.id,
      };
      let { data } = await getArticleDetail(params);
      this.userinfo = data.userinfo || {};
      this.detail = data || {};
      uni.setNavigationBarTitle({
        title: data.title,
      });
      this.recommendList = data.recommands;
      this.$nextTick(() => {
        this.$refs.uReadMore.init();
      });
    },
    // 请求用户关注
    async postFocus(item) {
      if (!this.vuex_token) {
        console.log("请先登录");
        return;
      }
      if (this.userinfo.id == this.vuex_user.id) {
        this.$u.toast("不能关注自己哦");
        return;
      }
      let params = {
        token: this.vuex_token,
        focus_id: this.userinfo.id,
        opt: this.userinfo.is_focus ? "cancel" : "focus",
      };
      let { data } = await postUserFocus(params);
      if (this.userinfo.is_focus == 1) {
        this.userinfo.is_focus = 0;
        this.$u.toast("取关成功");
      } else {
        this.userinfo.is_focus = 1;
        this.$u.toast("关注成功");
      }
    },
    // 点赞视频
    async postLike(item) {
      if (!this.vuex_token) {
        console.log("请先登录");
        return;
      }
      if (this.userinfo.id == this.vuex_user.id) {
        this.$u.toast("不能点赞自己哦");
        return;
      }
      let params = {
        token: this.vuex_token,
        id: this.detail.id,
        type: this.detail.is_like ? 2 : 1,
      };
      let { data } = await likeArticle(params);
      if (this.detail.is_like == 1) {
        this.detail.is_like = 0;
        --this.detail.likes;
        this.$u.toast("取消成功");
      } else {
        this.detail.is_like = 1;
        ++this.detail.likes;
        this.$u.toast("点赞成功");
      }
    },
    // 收藏视频
    async postCollect() {
      if (!this.vuex_token) {
        console.log("请先登录");
        return;
      }
      let params = {
        token: this.vuex_token,
        id: this.detail.id,
        type: this.detail.is_favor ? 2 : 1,
      };
      let { data } = await collectArticle(params);
      if (this.detail.is_favor == 1) {
        this.detail.is_favor = 0;
        this.$u.toast("取消成功");
      } else {
        this.detail.is_favor = 1;
        this.$u.toast("收藏成功");
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
        .on {
          color: #f04323;
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
          width: 120rpx;
          color: #999999;
          font-size: 26rpx;
          text-align: center;
          line-height: 48rpx;
          border-radius: 13rpx;
          letter-spacing: 1px;
          background-color: #f0f0f0;
        }
        .on {
          color: #fff;
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
