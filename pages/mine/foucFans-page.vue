<template>
  <view class="page-foucFans">
    <scroll-view :scroll-y="true" style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
      <view class="user_item" v-for="(item, index) in orderList" :key="index">
        <view class="left_wrap">
          <u-avatar :src="item.avatar" size="80"></u-avatar>
          <view class="right">
            <view class="nickname">{{item.name}}</view>
            <view class="works">{{item.trends ? (item.trends + '作品') : '暂无作品'}}</view>
          </view>
        </view>
        <view class="right_wrap" @click="goGetFocus(item)">
          <view class="btn foucs" v-if="item.is_focus == 0">关注</view>
          <view class="btn cancel" v-else-if="item.is_focus == 1">取关</view>
        </view>
      </view>
      <view class="loadmore">
        <u-loadmore :status="loadStatus"></u-loadmore>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getFoucfans, getFocus } from "api/home.js";
export default {
  data() {
    return {
      limit: 10,
      pageIndex: 1,
      listType: 0, //列表类型
      orderList: [],
      loadStatus: "loadmore",
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
    async getOrderList(index = 0) {
      this.listType = index * 1 + 1;
      let params = {
        token: this.vuex_token,
        page: this.pageIndex,
        limit: this.limit,
        sid: "",
        type: this.listType,
      };
      let { data } = await getFoucfans(params);
      let result = data.list;
      if (data == null || result.length == 0) {
        // 加载结束
        this.loadStatus = "nomore";
        return;
      }
      this.orderList = this.orderList.concat(result);
      this.pageIndex++;
      if (result.length < this.limit) {
        // 一页不足的情况
        this.loadStatus = "nomore";
      } else {
        this.loadStatus = "loadmore";
      }
    },
    // 点击关注取关
    async goGetFocus(item) {
      let params = {
        token: this.vuex_token,
        focus_id: item.id,
        opt: item.is_focus ? "cancel" : "focus",
      };
      let { data } = await getFocus(params);
      let result = null;
      item.is_focus ? (result = 0) : (result = 1);
      item.is_focus = result;
    },
  },
};
</script>

<style lang="scss" scoped>
.user_item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  border-bottom: 1px solid #e6e6e6;
  background: #fff;
  .left_wrap {
    display: flex;
    align-items: center;
    .right {
      margin-left: 18rpx;
      .nickname {
        color: #333333;
        font-size: 28rpx;
        font-weight: bold;
      }
      .works {
        color: #999999;
        font-size: 24rpx;
        margin-top: 4rpx;
      }
    }
  }
  .right_wrap {
    font-size: 28rpx;
    .btn {
      width: 120rpx;
      text-align: center;
      line-height: 50rpx;
      border-radius: 200rpx;
      border: 1px solid transparent;
    }
    .foucs {
      color: #f04323;
      border-color: #f04323;
    }
    .cancel {
      color: #999999;
      border-color: #c7c7c7;
    }
  }
}
.loadmore {
  padding: 20rpx 0;
}
</style>