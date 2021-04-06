<template>
  <view>
    <u-navbar title="我的足迹" :is-fixed="true" :border-bottom="false">
      <view class="navbar-right" slot="right">
        <u-icon name="more-dot-fill" size="43" color="#333"></u-icon>
      </view>
    </u-navbar>
    <view class="page-footpoint">
      <scroll-view :scroll-y="true" style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
        <view
          class="footer-item"
          v-for="(item, index) in footList"
          :key="index"
          @click="goDetail(item)"
        >
          <view class="banner">
            <image :src="item.cover" />
          </view>
          <view class="right_wrap">
            <view class="u-line-2 title">{{item.title}}</view>
            <view class="u-flex bottom">
              <view class="nickname">{{item.author || '暂无作者'}}</view>
              <view class="add_time">浏览于{{item.add_time | date('mm-dd')}}</view>
            </view>
          </view>
        </view>
        <view class="loadmore">
          <u-loadmore :status="loadStatus"></u-loadmore>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { getTrack } from "@/api/home.js";
export default {
  data() {
    return {
      limit: 10, //分页数量
      pageIndex: 1, //分页
      loadStatus: "loadmore",
      footList: [],
    };
  },
  onLoad(options) {
    this.getTrackData();
  },
  methods: {
    // 足迹详情
    goDetail(item) {
      if (!item.id) {
        console.log("缺少文章id");
        return;
      }
      if (item.type == 1) {
        this.$Router.push({ path: `/pages/news/detail?newsId=${item.id}` });
      } else if (item.type == 2) {
        this.$Router.push({ path: `/pages/video/detail?id=${item.id}` });
      }
    },
    // 触发滚动加载
    reachBottom() {
      if (this.footList.length >= this.limit) {
        this.loadStatus = "loading";
        setTimeout(() => {
          this.getTrackData();
        }, 600);
      }
    },
    // 获取足迹列表
    async getTrackData() {
      let params = {
        token: this.vuex_token,
        page: this.pageIndex,
        limit: this.limit,
      };
      let { data } = await getTrack(params);
      let result = data.list;
      if (data == null || result.length == 0) {
        // 加载结束
        this.loadStatus = "nomore";
        uni.stopPullDownRefresh();
        return;
      }
      if (result.length < this.limit) {
        // 一页不足的情况
        this.loadStatus = "nomore";
      } else {
        this.loadStatus = "loadmore";
      }
      // 处理数据
      if (this.pageIndex == 1) {
        this.footList = result;
      } else {
        this.footList = this.footList.concat(result);
      }
      this.pageIndex++;
      uni.stopPullDownRefresh();
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-right {
  margin-right: 30rpx;
  display: flex;
}

.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 24rpx;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}

.anchor-text {
  color: red;
}

.page-footpoint {
  height: 100vh;
  padding: 0 30rpx;
}

.loadmore {
  padding: 20rpx 0;
}

.footer-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1px solid #e6e6e6;
  .banner {
    width: 240rpx;
    height: 155rpx;
    margin-right: 20rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .right_wrap {
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 4rpx 0;
    .title {
      font-size: 28rpx;
    }
    .bottom {
      justify-content: space-between;
      color: #999999;
      font-size: 24rpx;
    }
  }
}
</style>
