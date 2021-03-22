<template>
  <view>
    <u-navbar title="我的消息" :is-fixed="true" :border-bottom="false">
      <view class="navbar-right" slot="right">
        <view class="edit_btn" @click="showModal=true">全部已读</view>
      </view>
    </u-navbar>
    <view class="message-page">
      <view class="header">
        <view class="item" @click="goNext('likes')">
          <image class="icon" src="/static/img/icon/icon_dz.png" mode="widthFix" />
          <view class="title">点赞</view>
          <view class="tips" v-if="likes">{{likes}}</view>
        </view>
        <view class="item" @click="goNext('comments')">
          <image class="icon" src="/static/img/icon/icon_pl.png" mode="widthFix" />
          <view class="title">评论</view>
          <view class="tips" v-if="comments">{{comments}}</view>
        </view>
        <view class="item" @click="goNext('focus')">
          <image class="icon" src="/static/img/icon/icon_zz.png" mode="widthFix" />
          <view class="title">关注</view>
          <view class="tips" v-if="focus">{{focus}}</view>
        </view>
      </view>
      <u-gap height="15" bg-color="#F2F2F2"></u-gap>
      <view class="container">
        <view class="inner_wrap">
          <view class="item" @click="goNext('system')" v-if="systems.info.length">
            <view class="left_wrap">
              <image class="icon" src="/static/img/icon/icon_xtxx.png" mode="widthFix" />
              <view class="point" v-if="systems.unread !== 0"></view>
            </view>
            <view class="right_wrap">
              <view class="top_wrap">
                <view class="title">{{systems.info.title}}</view>
                <view class="add_time">{{systems.info.add_time}}</view>
              </view>
              <view class="bottom u-line-2">{{systems.info.content}}</view>
            </view>
          </view>
          <view class="item" @click="goNext('friends')" v-if="invites.info.length">
            <view class="left_wrap">
              <image class="icon" src="/static/img/icon/icon_yqhy.png" mode="widthFix" />
              <view class="point" v-if="invites.unread !== 0"></view>
            </view>
            <view class="right_wrap">
              <view class="top_wrap">
                <view class="title">{{invites.info.title}}</view>
                <view class="add_time">{{invites.info.add_time}}</view>
              </view>
              <view class="bottom u-line-2">{{invites.info.content}}</view>
            </view>
          </view>
        </view>
        <view class="nodata" v-if="!systems.info.length && !invites.info.length">
          <u-empty text="暂无数据"></u-empty>
        </view>
        <!-- <view class="message_list">
          <view class="item" v-for="(item, index) in messageList" :key="index">
            <view class="top_wrap">
              <u-avatar :src="item.avatar" size="85"></u-avatar>
              <view class="avatar_right">
                <view class="nikcname">{{item.nickname}}</view>
                <view class="add_time">{{item.add_time}}</view>
              </view>
            </view>
            <view class="bottom_wrap">
              <view class="comment">{{item.comment}}</view>
              <view class="article_wrap">
                <image class="banner" :src="item.banner" />
                <view class="title">{{item.title}}</view>
              </view>
            </view>
          </view>
        </view>-->
      </view>
    </view>
    <u-modal
      v-model="showModal"
      :content="modalContent"
      :show-cancel-button="true"
      @confirm="modalConfirm"
    ></u-modal>
  </view>
</template>

<script>
import { getNotice, noticeRead } from "@/api/home.js";
export default {
  data() {
    return {
      likes: 0,
      comments: 0,
      focus: 0,
      systems: {
        info: [],
        unread: 0,
      }, // 系统消息
      invites: {
        info: [],
        unread: 0,
      }, // 邀请消息
      showModal: false, //展示提示窗
      modalContent: "全部置为已读？",
      messageList: [
        {
          avatar: "",
          nickname: "这里是用户名这里是用户名这里是用户名",
          add_time: "2021-01-14 13:22",
          comment: "这边是评论内容这边是评论内容",
          banner: "https://cdn.uviewui.com/uview/swiper/3.jpg",
          title: "这边是标题这边是标题这边是标题这边是标题这边是标题这边是标题",
        },
      ],
    };
  },
  onLoad(options) {
    this.getData();
  },
  methods: {
    // 获取消息
    async getData() {
      let { data } = await getNotice(this.vuex_token);
      this.likes = data.likes;
      this.comments = data.comments;
      this.focus = data.focus;
      this.systems = data.systems;
      this.invites = data.invites;
    },
    // 设置全部已读
    async postRead() {
      let params = {
        token: this.vuex_token,
        type: "",
      };
      let { data } = await noticeRead(params);
      this.getData();
    },
    // 提示窗确认
    modalConfirm(e) {
      this.postRead();
    },
    // 页面跳转集合
    goNext(type) {
      switch (type) {
        case "likes":
          this.$Router.push({
            path: "/pages/message/content",
            query: { type: 1 },
          });
          break;
        case "comments":
          this.$Router.push({
            path: "/pages/message/content",
            query: { type: 2 },
          });
          break;
        case "focus":
          this.$Router.push({
            path: "/pages/message/content",
            query: { type: 3 },
          });
          break;
        case "friends":
          this.$Router.push({
            path: "/pages/message/content",
            query: { type: 5 },
          });
          break;
        case "system":
          this.$Router.push({
            path: "/pages/message/content",
            query: { type: 9 },
          });
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
  .edit_btn {
    color: #999999;
    font-size: 28rpx;
  }
}
.message-page {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 30rpx 0;
    .item {
      position: relative;
      text-align: center;
      .icon {
        width: 100rpx;
      }
      .title {
        font-size: 26rpx;
        margin-top: 4rpx;
        letter-spacing: 1px;
      }
      .tips {
        position: absolute;
        top: -6rpx;
        right: -20rpx;
        color: #fff;
        font-size: 24rpx;
        padding: 0 16rpx;
        line-height: 34rpx;
        border-radius: 100rpx;
        background: #f04323;
      }
    }
  }
  .container {
    position: relative;
    padding: 0 30rpx;
    .inner_wrap {
      .item {
        display: flex;
        align-items: center;
        padding: 20rpx 0;
        border-bottom: 1px solid#E6E6E6;
        .left_wrap {
          margin-right: 20rpx;
          position: relative;
          .icon {
            width: 86rpx;
          }
          .point {
            position: absolute;
            top: -6rpx;
            right: -6rpx;
            width: 20rpx;
            height: 20rpx;
            border-radius: 50%;
            background: #f04323;
          }
        }
        .right_wrap {
          flex: 1;
          .top_wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8rpx;
            .title {
              color: #333333;
              font-size: 28rpx;
              font-weight: bold;
            }
            .add_time {
              color: #999999;
              font-size: 26rpx;
            }
          }
          .bottom {
            color: #666666;
            font-size: 26rpx;
            line-height: 1.6;
          }
        }
      }
    }
    .message_list {
      .item {
        padding: 20rpx 0 30rpx;
        border-bottom: 1px solid#E6E6E6;
        .top_wrap {
          display: flex;
          align-items: center;
          .u-avatar {
            margin-right: 20rpx;
          }
          .avatar_right {
            .nikcname {
              width: 260rpx;
              font-size: 28rpx;
              font-weight: bold;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              line-clamp: 1;
              -webkit-box-orient: vertical;
              word-break: break-all;
            }
            .add_time {
              color: #999999;
              font-size: 24rpx;
            }
          }
        }
        .bottom_wrap {
          padding-left: 104rpx;
          .comment {
            padding: 4rpx 0 16rpx;
          }
          .article_wrap {
            padding: 20rpx;
            background: #f7f7f7;
            display: flex;
            align-items: center;
            .banner {
              width: 220rpx;
              height: 120rpx;
            }
            .title {
              flex: 1;
              color: #333333;
              font-size: 24rpx;
              line-height: 1.6;
              margin-left: 20rpx;
            }
          }
        }
      }
    }
    .nodata {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      zoom: 1.15;
    }
  }
}
</style>
