<template>
  <view class="page-content">
    <scroll-view :scroll-y="true" style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
      <view class="message_list" v-if="pageType !== 2">
        <view class="item" v-for="(item, index) in dataList" :key="index">
          <view class="icon_wrap">
            <image
              class="icon"
              src="/static/img/icon/icon_xtxx.png"
              mode="widthFix"
              v-if="pageType == 9"
            />
            <image
              class="icon"
              src="/static/img/icon/icon_yqhy.png"
              mode="widthFix"
              v-else-if="pageType == 5"
            />
            <view class="point" v-if="!item.is_read"></view>
          </view>
          <view class="content_wrap">
            <view class="top">
              <view class="title">
                <text v-if="pageType == 1">点赞提醒</text>
                <text v-if="pageType == 3">关注提醒</text>
                <text v-if="pageType == 5">邀请好友通知</text>
                <text v-if="pageType == 9">系统消息</text>
              </view>
              <view class="add_time">{{item.add_time | timeFrom}}</view>
            </view>
            <view class="content">
              <text>{{item.content}}</text>
            </view>
          </view>
        </view>
      </view>
      <commentPage :dataList="dataList" v-else></commentPage>
      <view class="loadmore" v-if="dataList.length">
        <u-loadmore :status="loadStatus"></u-loadmore>
      </view>
      <view class="nodata" v-else>
        <u-empty text="暂无数据"></u-empty>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { noticeList } from "api/home.js";
import commentPage from "./comment-page";
export default {
  components: {
    commentPage
  },
  data() {
    return {
      limit: 20,
      pageIndex: 1,
      pageType: 1, //列表类型
      loadStatus: "loadmore",
      dataList: [],
    };
  },
  methods: {
    // 触发滚动加载
    reachBottom() {
      if (this.dataList.length >= this.limit) {
        this.loadStatus = "loading";
        setTimeout(() => {
          this.getData(this.pageType);
        }, 500);
      }
    },
    // 页面数据
    async getData(type) {
      this.pageType = type * 1;
      let params = {
        token: this.vuex_token,
        page: this.pageIndex,
        limit: this.limit,
        type: type,
      };
      let { data } = await noticeList(params);
      let result = data.list;
      if (data == null || result.length == 0) {
        // 加载结束
        this.loadStatus = "nomore";
        uni.stopPullDownRefresh();
        return;
      }
      this.dataList = this.dataList.concat(result);
      this.pageIndex++;
      if (result.length < this.limit) {
        // 一页不足的情况
        this.loadStatus = "nomore";
      } else {
        this.loadStatus = "loadmore";
      }
      uni.stopPullDownRefresh();
    },
  },
};
</script>

<style lang="scss" scoped>
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
.loadmore {
  padding: 20rpx 0;
}
.nodata {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  zoom: 1.15;
}
</style>