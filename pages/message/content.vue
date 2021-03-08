<template>
  <view>
    <u-navbar :title="pageTitle" :is-fixed="true" :border-bottom="false">
      <view class="navbar-right" slot="right">
        <view class="edit_btn" @click="setAllRead">全部已读</view>
      </view>
    </u-navbar>
    <view class="message-content">
      <view class="message_list">
        <view class="item" v-for="(item, index) in dataList" :key="index">
          <view class="icon_wrap">
            <image
              class="icon"
              src="/static/img/icon/icon_xtxx.png"
              mode="widthFix"
              v-if="pageType == 1"
            />
            <image
              class="icon"
              src="/static/img/icon/icon_yqhy.png"
              mode="widthFix"
              v-else-if="pageType == 2"
            />
            <view class="point" v-if="!item.readed"></view>
          </view>
          <view class="content_wrap">
            <view class="top">
              <view class="title">{{pageType == 1 ? '系统消息' : '邀请好友通知'}}</view>
              <view class="add_time">{{item.add_time}}</view>
            </view>
            <view class="content">
              <view v-if="pageType == 1">{{item.content}}</view>
              <view v-if="pageType == 2">[{{item.nickname}}]关注了您。</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { noticeList, noticeRead } from "api/home.js";
export default {
  data() {
    return {
      pageType: null, // 页面类型
      pageTitle: "",
      dataList: [],
      systemList: [
        {
          add_time: "2021-01-14",
          content:
            "这边是消息内容。这边是消息内容。这边是消息内容。这边是消息内容。这边是消息内容。这边是消息内容。这边是消息内容。这边是消息内容。这边是消息内容。这边是消息内容。这边是消息内容。这边是消息内容。",
          readed: 0,
        },
        {
          add_time: "2021-01-12",
          content:
            "这边是消息内容。这边是消息内容。这边是消息内容。这边是消息内容。这边是消息内容。这边是消息内容。这边是消息内容。",
          readed: 1,
        },
        {
          add_time: "2021-01-10",
          content:
            "这边是消息内容。这边是消息内容。这边是消息内容。这边是消息内容。",
          readed: 1,
        },
      ],
      friendList: [
        {
          add_time: "3天前",
          nickname: "对方厚度积分",
          readed: 0,
        },
        {
          add_time: "3天前",
          nickname: "times",
          readed: 1,
        },
        {
          add_time: "3天前",
          nickname: "尽快的解决",
          readed: 1,
        },
      ],
    };
  },
  onLoad(options) {
    // console.log(this.$Route.query);
    this.pageType = this.$Route.query.type;
    this.setPageType(this.pageType);
  },
  methods: {
    // 设置页面类型
    setPageType(type) {
      switch (type) {
        case 1:
          this.pageTitle = "点赞通知";
          break;
        case 2:
          this.pageTitle = "评论通知";
          break;
        case 3:
          this.pageTitle = "关注通知";
          break;
        case 5:
          this.pageTitle = "邀请好友通知";
          break;
        case 9:
          this.pageTitle = "系统消息";
          break;
        default:
          break;
      }
      this.getDataList();
    },
    // 请求列表
    async getDataList() {
      let params = {
        token: this.vuex_token,
        type: this.pageType,
        page: 1,
        limit: 20,
      };
      let { data } = await noticeList(params);
    },
    // 设置全部已读
    async setAllRead() {
      let params = {
        token: this.vuex_token,
        type: this.pageType,
      };
      let { data } = await noticeRead(params);
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
.message-content {
  .message_list {
    padding: 0 15px;
    .item {
      display: flex;
      padding: 20rpx 0;
      border-bottom: 1px solid#E6E6E6;
      .icon_wrap {
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
      .content_wrap {
        flex: 1;
        .top {
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
        .content {
          color: #666666;
          font-size: 26rpx;
          line-height: 1.6;
        }
      }
    }
  }
}
</style>
