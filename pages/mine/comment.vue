<template>
  <view>
    <u-navbar title="我的评论" :is-fixed="true" :border-bottom="false">
      <view class="navbar-right" slot="right">
        <u-icon name="more-dot-fill" size="43" color="#333"></u-icon>
      </view>
    </u-navbar>
    <view class="page-comment">
      <scroll-view :scroll-y="true" style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
        <view class="comment_wrap">
          <view class="item" v-for="(item, index) in dataList" :key="index">
            <view class="avatar_wrap">
              <u-avatar :src="item.avatar" size="90"></u-avatar>
            </view>
            <view class="container_wrap">
              <view class="top_wrap">
                <view class="left">
                  <view class="user_name">{{item.uname}}</view>
                  <view class="add_time">{{item.add_time}}</view>
                </view>
                <view class="right" @click="postDelete(item.id)">删除</view>
              </view>
              <view class="content_wrap">
                <text class="u-line-2">{{item.content}}</text>
              </view>
              <view class="works_wrap">
                <view class="article_wrap">
                  <image class="cover" :src="item.cover" mode="scaleToFill" />
                  <view class="u-line-3 title">{{item.title}}</view>
                </view>
                <!-- <view class="video_wrap" v-if="item.type == 1">
                  <image class="cover" :src="item.cover" mode="scaleToFill" />
                </view>-->
              </view>
            </view>
          </view>
          <view class="loadmore" v-if="dataList.length">
            <u-loadmore :status="loadStatus"></u-loadmore>
          </view>
          <view class="nodata" v-else>
            <u-empty text="暂无数据"></u-empty>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { mineComment, deleteComment } from "@/api/home.js";
export default {
  data() {
    return {
      limit: 20,
      lastid: 0,
      loadStatus: "loadmore",
      dataList: [],
    };
  },
  onLoad(options) {
    this.getData();
  },
  methods: {
    // 触发滚动加载
    reachBottom() {
      if (this.dataList.length >= this.limit) {
        this.loadStatus = "loading";
        setTimeout(() => {
          this.getData();
        }, 500);
      }
    },
		// 监听下拉刷新
    onPullDownRefresh() {
      this.limit = this.$options.data().limit;
      this.lastid = this.$options.data().lastid;
      this.loadStatus = this.$options.data().loadStatus;
      this.dataList = this.$options.data().dataList;
      this.getData();
    },
    // 页面数据
    async getData() {
      let params = {
        token: this.vuex_token,
        lastid: this.lastid,
        limit: this.limit,
      };
      let { data } = await mineComment(params);
      let result = data.list;
      if (data == null || result.length == 0) {
        // 加载结束
        this.loadStatus = "nomore";
				uni.stopPullDownRefresh();
        return;
      }
      this.dataList = this.dataList.concat(result);
      this.lastid = data.lastid;
      if (result.length < this.limit) {
        // 一页不足的情况
        this.loadStatus = "nomore";
      } else {
        this.loadStatus = "loadmore";
      }
			uni.stopPullDownRefresh();
    },
    // 请求删除
    async postDelete(str) {
      let params = {
        token: this.vuex_token,
        id: str,
      };
      let { data, msg } = await deleteComment(params);
      let idx = this.dataList.findIndex((item) => item.id == str);
      this.dataList.splice(idx, 1);
      this.$u.toast('删除成功');
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-right {
  margin-right: 30rpx;
  display: flex;
}
.page-comment {
  position: relative;
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
}
</style>
