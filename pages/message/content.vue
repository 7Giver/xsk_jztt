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
    if (this.pageType == 1) {
      this.pageTitle = "系统消息";
      this.dataList = this.systemList;
    } else if (this.pageType == 2) {
      this.pageTitle = "邀请好友通知";
      this.dataList = this.friendList;
    }
  },
  methods: {
    // 设置全部已读
    setAllRead() {},
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
