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
                  <view class="nickname">{{item.nickname}}</view>
                  <view class="works">{{item.works}}作品</view>
                </view>
              </view>
              <view class="right_wrap">
                <view class="btn foucs" v-if="item.foucs == 0">关注</view>
                <view class="btn cancel" v-else-if="item.foucs == 1">取关</view>
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
import { getFoucfans } from "api/home.js";
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
      page: 1,
      limit: 10,
      current: 0,
      swiperCurrent: 0,
      orderList: [[], []],
      loadStatus: ["loadmore", "loadmore"],
      dataList: [
        {
          id: 1,
          avatar: "",
          nickname: "这里是用户名1",
          works: 3245,
          foucs: 1,
        },
        {
          id: 2,
          avatar: "",
          nickname: "这里是用户名2",
          works: 3245,
          foucs: 1,
        },
        {
          id: 3,
          avatar: "",
          nickname: "这里是用户名3",
          works: 3245,
          foucs: 0,
        },
        {
          id: 4,
          avatar: "",
          nickname: "这里是用户名4",
          works: 3245,
          foucs: 0,
        },
      ],
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
        page: this.page,
        limit: this.limit,
        sid: "",
        type: this.current,
      };
      let { data } = await getFoucfans(params);
      console.log(data);
      if (this.orderList[idx].length >= 30) {
        this.loadStatus.splice(this.current, 1, "nomore");
        return false;
      }
      this.loadStatus.splice(this.current, 1, "loading");
      for (let i = 0; i < 15; i++) {
        let index = this.$u.random(0, this.dataList.length - 1);
        let data = JSON.parse(JSON.stringify(this.dataList[index]));
        this.orderList[idx].push(data);
      }
      // this.loadStatus.splice(this.current, 1, "loadmore");
    },
    // 触发加载
    reachBottom() {
      // this.loadStatus.splice(this.current, 1, "loading");
      setTimeout(() => {
        this.getOrderList(this.current);
      }, 1200);
    },
    // tab栏切换
    tabChange(index) {
      this.swiperCurrent = index;
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
