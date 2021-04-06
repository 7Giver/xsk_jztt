<template>
  <view id="app">
    <u-navbar title-width="400" :title="detail.title" :border-bottom="false">
      <view class="u-flex navbar-right" slot="right">
        <view @click="postCollect">
          <u-icon name="star-fill" color="#F04323" v-if="detail.is_favor == 1"></u-icon>
          <u-icon name="star" v-else></u-icon>
        </view>
        <image
          class="icon"
          src="/static/img/icon/icon_fx.png"
          mode="widthFix"
          @click="goShareDetail"
        />
      </view>
    </u-navbar>
    <view class="detail-page">
      <!-- 文章版块 -->
      <view class="detail_wrap">
        <view class="u-line-3 main_title">{{detail.title}}</view>
        <view class="u-flex inner_header">
          <view class="u-flex left_wrap">
            <view class="avatar_wrap">
              <u-avatar :src="userinfo.avatar" size="75"></u-avatar>
            </view>
            <view class="right">
              <view class="nickname">{{userinfo.name || '佚名'}}</view>
              <view class="date">{{detail.add_time}}</view>
            </view>
          </view>
          <view class="right_wrap" @click="postFocus" v-show="userinfo.id">
            <view class="foucs_btn on" v-if="!userinfo.is_focus">+关注</view>
            <view class="foucs_btn" v-else>已关注</view>
          </view>
        </view>
        <!-- 富文本 -->
        <view class="content_wrap">
          <rich-text :nodes="detail.content"></rich-text>
          <!-- <u-read-more ref="uReadMore" color="#F04323" show-height="800" text-indent="0" :toggle="true">
            <rich-text :nodes="detail.content"></rich-text>
          </u-read-more>-->
        </view>
        <view class="handle_wrap">
          <view class="u-flex item_wrap" @click="unlike.showDialog=true">
            <image class="icon" src="/static/img/news/icon_bxh.png" mode="widthFix" />
            <view class="text">不喜欢</view>
          </view>
          <view class="u-flex item_wrap" @click="postLike">
            <image
              class="icon"
              src="/static/img/news/icon_like_on.png"
              mode="widthFix"
              v-if="detail.is_like == 1"
            />
            <image class="icon" src="/static/img/news/icon_like.png" mode="widthFix" v-else />
            <view class="text">{{detail.likes || 0}}</view>
          </view>
        </view>
        <!-- 广告区 -->
        <!-- <view class="advert_wrap">
          <u-swiper :list="bannerList" mode="none"></u-swiper>
          <view class="u-flex bottom_wrap">
            <view class="u-flex left">
              <view class="type_name">广告</view>
              <view class="advert_name">这里是广告昵称</view>
            </view>
            <view class="right">
              <u-icon name="close"></u-icon>
            </view>
          </view>
        </view>-->
      </view>
      <!-- <u-input v-model="mytest" type="textarea" :focus="true" /> -->
      <u-gap height="15" bg-color="#F2F2F2"></u-gap>
      <!-- 推荐版块 -->
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
          <view class="item_list">
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
                    <u-avatar :src="item.avatar" size="40" />
                    <view class="name">{{item.author || '九章新闻'}}</view>
                  </view>
                  <view class="add_time">{{item.add_time | date('mm-dd hh:MM')}}</view>
                </view>
              </view>
              <view class="right_wrap">
                <image class="banner" :src="item.cover" />
              </view>
            </view>
          </view>
        </u-read-more>
        <!-- <view class="advert_wrap">
          <u-swiper :list="bannerList" mode="none"></u-swiper>
          <view class="u-flex bottom_wrap">
            <view class="u-flex left">
              <view class="type_name">广告</view>
              <view class="advert_name">这里是广告昵称</view>
            </view>
            <view class="right">
              <u-icon name="close"></u-icon>
            </view>
          </view>
        </view>-->
      </view>
      <u-gap height="15" bg-color="#F2F2F2"></u-gap>
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
      <!-- 不喜欢原因 -->
      <unlike-popup ref="unlike" :articleId="detail.id"></unlike-popup>
      <!-- 阅读计时器 -->
      <article-timer ref="articleTimer" :articleId="detail.id"></article-timer>
    </view>
  </view>
</template>

<script>
import {
  getArticleDetail,
  collectArticle,
  likeArticle,
  postUserFocus,
  articleClose,
} from "@/api/home.js";
import MyComment from "@/components/my-comment/my-comment";
import MixFooter from "@/components/mix-footer/mix-footer";
import UnlikePopup from "@/components/unlike-popup/unlike-popup";
import CommentReport from "@/components/comment-report/comment-report";
import articleTimer from "@/components/article-timer/article-timer";
export default {
  components: {
    MyComment,
    MixFooter,
    UnlikePopup,
    CommentReport,
    articleTimer,
  },
  data() {
    return {
      logo_url: "/static/img/login/logo.png",
      userinfo: {}, // 文章用户信息
      detail: {}, // 文章详情
      commentNum: 0, // 评论数量
      parentId: "", // 父级评论Id
      showReport: false, //评论组件
      mytest: "",
      commentList: [],
      shadowStyle: {
        backgroundImage: "none",
      },
      bannerList: [
        {
          image: "https://cdn.uviewui.com/uview/swiper/1.jpg",
          title: "昨夜星辰昨夜风，画楼西畔桂堂东",
        },
        {
          image: "https://cdn.uviewui.com/uview/swiper/2.jpg",
          title: "身无彩凤双飞翼，心有灵犀一点通",
        },
        {
          image: "https://cdn.uviewui.com/uview/swiper/3.jpg",
          title: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳",
        },
      ],
      recommendList: [
        {
          title:
            "这边是标题这边是标题这边是标题这边是标题这边是标题这边是标题这边是标题这边是标题",
          avatar: "",
          name: "新闻小能手新闻小能手新闻小能手新闻小能手",
          add_time: "12-15 14:36",
          banner: "https://cdn.uviewui.com/uview/swiper/1.jpg",
        },
        {
          title: "这边是标题这边是标题这边是标题这边是标题",
          avatar: "",
          name: "新闻小能手",
          add_time: "12-15 14:36",
          banner: "https://cdn.uviewui.com/uview/swiper/2.jpg",
        },
        {
          title: "这边是标题这边是标题这边是标题这边是标题",
          avatar: "",
          name: "新闻小能手",
          add_time: "12-15 14:36",
          banner: "https://cdn.uviewui.com/uview/swiper/3.jpg",
        },
      ],
    };
  },
  onReady() {
    this.unlike = this.$refs.unlike;
    this.myComment = this.$refs.myComment;
    this.mixFooter = this.$refs.mixFooter;
    this.commentReport = this.$refs.commentReport;
  },
  onLoad(options) {
    this.getNewsDetail(options.newsId);
    uni.$on("emitRefreshComment", (data) => {
      this.detail.comments++;
      this.refreshComment();
    });
  },
  onPageScroll({ scrollTop }) {
    let articleTimer = this.$refs.articleTimer;
    // 防抖函数，根据全局设置的参数暂停计时
    if (articleTimer) {
      !articleTimer.timer && this.$u.debounce(timerStart, 6000, true);
      function timerStart() {
        articleTimer.initData();
      }
    }
  },
  onHide() {
    // console.log("hide");
    // let articleTimer = this.$refs.articleTimer;
    // articleTimer.timerClear();
  },
  onUnload() {
    // console.log("onUnload");
    let articleTimer = this.$refs.articleTimer;
    if (articleTimer) {
      if (this.detail.track_id && this.vuex_token) {
        this.postArticleClose();
      }
      articleTimer.timerStop();
    }
  },
  methods: {
    // 滚动到评论区
    scrollComment() {
      let dom = this.myComment.$el;
      uni.pageScrollTo({
        scrollTop: dom.offsetTop,
        duration: 300, // 动画默认300ms
      });
    },
    // 滚动到底部
    scrollToBottom() {
      uni.pageScrollTo({
        scrollTop: Number.MAX_SAFE_INTEGER,
        duration: 250,
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
    // 刷新评论区
    refreshComment() {
      this.myComment.limit = 10;
      this.myComment.pageIndex = 1;
      this.myComment.commentList = [];
      this.myComment.getComment(this.detail.id);
    },
    // 跳转视频详情
    goRecommend(id) {
      this.$Router.push({
        path: "/pages/news/detail",
        query: { newsId: id },
      });
    },
    // 分享文章详情
    goShareDetail() {
      // #ifdef H5
      console.log("H5分享开发中");
      // #endif
      // #ifdef  APP-PLUS
      // uni.shareWithSystem({
      //   summary: this.detail.title,
      //   href: this.detail.share_url,
      //   imageUrl: this.detail.cover ? this.detail.cover : this.logo_url,
      //   success() {
      //     // 分享完成，请注意此时不一定是成功分享
      //   },
      //   fail() {
      //     // 分享失败
      //   },
      // });
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
    async getNewsDetail(newsId) {
      let params = {
        token: this.vuex_token || "",
        id: newsId,
        uid: this.vuex_user.id,
      };
      let { data } = await getArticleDetail(params);
      this.userinfo = data.userinfo || {};
      this.detail = data || {};
      this.recommendList = data.recommands;
      this.$nextTick(() => {
        this.$refs.uReadMore.init();
      });
      this.refreshComment();
    },
    // 收藏文章
    async postCollect() {
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
    // 点赞文章
    async postLike() {
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
    // 请求用户关注
    async postFocus() {
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
    // 阅读停止
    async postArticleClose() {
      let params = {
        token: this.vuex_token,
        track_id: this.detail.track_id,
      };
      let { data } = await articleClose(params);
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
      margin-right: 30rpx;
    }
  }
  .icon {
    width: 38rpx;
    margin-top: 6rpx;
  }
}
.detail-page {
  /deep/.u-content {
    line-height: 1;
  }
  .detail_wrap {
    padding: 0 15px;
    .main_title {
      margin: 10rpx auto 0;
      color: #333333;
      font-size: 44rpx;
      font-weight: bold;
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
            font-size: 30rpx;
            font-weight: 600;
          }
          .date {
            color: #999999;
            font-size: 26rpx;
            margin-top: 3rpx;
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
  .content_wrap {
    font-size: 32rpx;
    /deep/.u-content {
      font-size: 32rpx;
    }
  }
  .handle_wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    margin: 30rpx auto 50rpx;
    .item_wrap {
      justify-content: center;
      width: 230rpx;
      height: 76rpx;
      border-radius: 100rpx;
      border: 1px solid #e5e5e5;
      .icon {
        width: 44rpx;
        margin-right: 10rpx;
      }
      .text {
        font-size: 24rpx;
      }
    }
  }
  .advert_wrap {
    .bottom_wrap {
      justify-content: space-between;
      padding: 20rpx 0;
      .left {
        color: #999999;
        font-size: 24rpx;
        .type_name {
          margin-right: 24rpx;
        }
      }
      .right {
        .u-icon {
          color: #999999;
          font-size: 24rpx;
        }
      }
    }
  }
  .recommend_wrap {
    padding: 0 15px;
    .item_list {
      margin-bottom: 30rpx;
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
            min-height: 80rpx;
          }
          .bottom {
            color: #999999;
            font-size: 24rpx;
            margin-top: 20rpx;
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
              .u-avatar {
                margin-right: 15rpx;
              }
            }
            .add_time {
              margin-left: 14rpx;
            }
          }
        }
        .right_wrap {
          .banner {
            width: 240rpx;
            height: 142rpx;
          }
        }
      }
    }
  }
}
</style>
