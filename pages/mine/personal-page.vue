<template>
  <view class="page-personal">
    <scroll-view :scroll-y="true" style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
      <view class="works_wrap" v-for="(item, index) in dataList" :key="index">
        <view class="u-flex top_wrap">
          <u-avatar :src="item.avatar" size="75"></u-avatar>
          <view class="right">
            <view class="u-line-1 nickname">{{ item.uname }}</view>
            <view class="addtime">{{item.time_stamp | timeFrom('mm-dd')}}</view>
          </view>
        </view>
        <view class="content">
          <div class="many_mode" v-if="item.pic_list.length >= 3">
            <view class="u-line-2 title">{{ item.title }}</view>
            <view class="u-flex many_wrap">
              <div class="item" v-for="(image, ids) in item.imgList" :key="ids">
                <u-image :src="image" height="180">
                  <u-loading slot="loading"></u-loading>
                </u-image>
              </div>
            </view>
          </div>
          <div class="single_mode" v-else-if="item.pic_list.length < 3">
            <view class="title">
              <text class="u-line-3">{{ item.title }}</text>
            </view>
            <image :src="item.cover" />
          </div>
          <div class="video_mode" v-else-if="item.videoSrc">
            <view class="u-line-2 title">{{ item.title }}</view>
            <video :src="item.video"></video>
          </div>
        </view>
      </view>
      <view class="loadmore">
        <u-loadmore :status="loadStatus"></u-loadmore>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getUserWorks } from "@/api/home.js";
export default {
  data() {
    return {
      limit: 20,
      pageIndex: 1,
      listType: 0, //列表类型
      loadStatus: "loadmore",
      dataList: [],
    };
  },
  methods: {
    // 触发滚动加载
    reachBottom() {
      if (this.orderList.length >= this.limit) {
        this.loadStatus = "loading";
        setTimeout(() => {
          this.getOrderList(this.listType);
        }, 500);
      }
    },
    // 页面数据
    async getData(index = 0) {
      this.listType = index * 1;
      let params = {
        token: this.vuex_token,
        page: this.pageIndex,
        limit: this.limit,
        sid: "",
        type: index,
      };
      let { data } = await getUserWorks(params);
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
.works_wrap {
  padding: 30rpx;
  background-color: #fff;
  margin-bottom: 15rpx;
  .top_wrap {
    margin-bottom: 20rpx;
    .u-avatar {
      margin-right: 20rpx;
    }
    .right {
      flex: 1;
      .nickname {
        width: 200rpx;
        color: #333333;
        font-size: 26rpx;
        font-weight: bold;
      }
      .addtime {
        color: #999999;
        font-size: 24rpx;
      }
    }
  }
  .content {
    .many_mode {
      .title {
        font-size: 28rpx;
        line-height: 1.4;
      }
      .many_wrap {
        margin-top: 10rpx;
        .item {
          flex: 1;
          &:not(:last-child) {
            margin-right: 10rpx;
          }
          .u-image {
            width: 100%;
          }
        }
      }
    }
    .single_mode {
      display: flex;
      .title {
        flex: 1;
        font-size: 28rpx;
        line-height: 1.4;
        margin-right: 18rpx;
      }
      image {
        width: 280rpx;
        height: 160rpx;
      }
    }
    .video_mode {
      .title {
        font-size: 28rpx;
        line-height: 1.4;
      }
    }
  }
}
.loadmore {
  padding: 20rpx 0;
}
</style>