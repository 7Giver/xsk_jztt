<template>
  <view>
    <u-navbar title="关注 / 粉丝" :is-fixed="true" :border-bottom="false"></u-navbar>
    <view class="fans-page">
      <u-sticky>
        <view class="navbar">
          <u-tabs-swiper
            ref="tabs"
            activeColor="#F04323"
            :list="tabList"
            :current="current"
            :is-scroll="false"
            @change="tabChange"
          ></u-tabs-swiper>
        </view>
      </u-sticky>
      <swiper
        class="uni-swiper"
        :current="swiperCurrent"
        @transition="transition"
        @animationfinish="animationfinish"
      >
        <swiper-item class="swiper-item" v-for="(order, idx) in orderList" :key="idx">
          <scroll-view
            :scroll-y="true"
            style="height: 100%;width: 100%;"
            @scrolltolower="reachBottom"
          >
            <view class="user_item" v-for="(item, index) in orderList[idx]" :key="index">
              <view class="left_wrap">
                <u-avatar :src="item.avatar" size="80"></u-avatar>
                <view class="right">
                  <view class="nickname">{{item.name}}</view>
                  <view class="works">{{item.trends ? (item.trends+'作品') : '暂无作品'}}</view>
                </view>
              </view>
              <view class="right_wrap" @click="goGetFocus(item, index)">
                <view class="btn foucs" v-if="item.is_focus == 0">关注</view>
                <view class="btn cancel" v-else-if="item.is_focus == 1">取关</view>
              </view>
            </view>
            <view class="loadmore">
              <u-loadmore :status="loadStatus[idx]"></u-loadmore>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import { getFoucfans, getFocus } from "api/home.js";
export default {
  data() {
    return {
      tabList: [
        {
          name: "我关注的",
        },
        {
          name: "我的粉丝",
        },
      ],
      pageIndex: [1, 1],
      limit: 10,
      current: 0,
      swiperCurrent: 0,
      orderList: [[], []],
      loadStatus: ["loadmore", "loadmore"],
    };
  },
  onLoad(options) {
    this.getOrderList(0);
  },
  methods: {
    // 页面数据
    async getOrderList(idx) {
      let params = {
        token: this.vuex_token,
        page: this.pageIndex[idx],
        limit: this.limit,
        sid: "",
        type: this.swiperCurrent * 1 + 1,
      };
      let { data } = await getFoucfans(params);
      let result = data.list;
      if (this.orderList[idx].length >= 30) {
        this.loadStatus.splice(this.current, 1, "nomore");
        return;
      }
      this.orderList[idx] = this.orderList[idx].concat(result);
      this.pageIndex[idx]++;
      if (result.length < this.limit) {
        // 一页不足的情况
        this.loadStatus.splice(idx, 1, "nomore");
      } else {
        this.loadStatus.splice(idx, 1, "loadmore");
      }
    },
    // 点击关注取关
    async goGetFocus(item, index) {
      let params = {
        token: this.vuex_token,
        focus_id: item.id,
        opt: item.is_focus ? "cancel" : "focus",
      };
      let { data } = await getFocus(params);
      let result = null;
      item.is_focus ? (result = 0) : (result = 1);
      item.is_focus = result;
      let targetArr = this.orderList[this.swiperCurrent];
      // console.log('item',item);
      // console.log(targetArr[index]);
      // this.$set(targetArr[index], "is_focus", result);
      targetArr.splice(index, 1, item);
      console.log(targetArr);
    },
    // 触发加载
    reachBottom() {
      let targetArr = this.orderList[this.current];
      if (targetArr.length >= this.limit) {
        this.loadStatus.splice(this.current, 1, "loading");
        setTimeout(() => {
          this.getOrderList(this.current);
        }, 600);
      }
    },
    // tab栏切换
    tabChange(index) {
      // console.log(index);
      this.swiperCurrent = index;
      this.pageIndex = this.$options.data().pageIndex;
      this.limit = this.$options.data().limit;
      this.orderList = this.$options.data().orderList;
      this.getOrderList(index);
    },
    transition({ detail: { dx } }) {
      this.$refs.tabs.setDx(dx);
    },
    animationfinish({ detail: { current } }) {
      this.$refs.tabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background: #f2f2f2;
}
.fans-page {
  // padding-bottom: 20rpx;
  .uni-swiper {
    height: 100vh;
  }
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
}
</style>
