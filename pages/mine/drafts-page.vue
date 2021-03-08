<template>
  <view class="page-drafts">
    <scroll-view :scroll-y="true" style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
      <view :class="[showCheck ? 'content_wrap right_row' : 'content_wrap']">
        <view class="u-flex item" v-for="(item, index) in dataList" :key="index">
          <transition name="fade-row">
            <view class="check_wrap" v-if="showCheck">
              <u-checkbox v-model="item.checked" size="40" shape="circle" active-color="#F04323"></u-checkbox>
            </view>
          </transition>
          <view class="content">
            <view class="banner">
              <image :src="item.cover" />
            </view>
            <view class="right_wrap">
              <view class="u-line-2 title">{{item.title}}</view>
              <view class="u-flex bottom">
                <view class="nickname">{{vuex_user.name}}</view>
                <view class="add_time">收藏于{{item.add_time}}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="loadmore">
          <u-loadmore :status="loadStatus"></u-loadmore>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getDrafts } from "api/home.js";
export default {
  props: {
    showCheck: {
      type: Boolean,
      default: false,
    },
  },
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
      if (this.dataList.length >= this.limit) {
        this.loadStatus = "loading";
        setTimeout(() => {
          this.getData(this.listType);
        }, 500);
      }
    },
    // 页面数据
    async getData(index = 0) {
      this.listType = index * 1 + 1;
      let params = {
        token: this.vuex_token,
        page: this.pageIndex,
        limit: this.limit,
        sid: "",
        type: this.listType,
      };
      let { data } = await getDrafts(params);
      let result = data.list;
      if (data == null || result.length == 0) {
        // 加载结束
        this.loadStatus = "nomore";
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
    },
  },
};
</script>

<style lang="scss" scoped>
.content_wrap {
  position: relative;
  right: 0rpx;
  width: 100%;
  padding: 0 30rpx;
  transition: 0.3s;
  .item {
    position: relative;
    .check_wrap {
      position: absolute;
      left: -60rpx;
    }
    .content {
      width: 100%;
      display: flex;
      padding: 20rpx 0;
      border-bottom: 1px solid #e6e6e6;
      .banner {
        width: 200rpx;
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
  }
}
.right_row {
  right: -60rpx;
}
.loadmore {
  padding: 20rpx 0;
}
.fade-row-enter-active {
  transition: 0.3s ease 0.2s;
}
.fade-row-leave-active {
  transition: 0.1s;
}
.fade-row-enter,
.fade-row-leave-to {
  opacity: 0;
}
</style>