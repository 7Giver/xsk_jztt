<template>
  <view id="app">
    <u-navbar title="草稿箱" :is-fixed="true" :border-bottom="false">
      <view class="navbar-right" slot="right">
        <view class="edit_btn" @click="editDrafts">{{showCheck ? '取消' : '编辑'}}</view>
      </view>
    </u-navbar>
    <view class="drafts-page">
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
      <swiper
        class="uni-swiper"
        :current="swiperCurrent"
        @transition="transition"
        @animationfinish="animationfinish"
      >
        <swiper-item class="swiper-item" v-for="(tab, idx) in tabList" :key="idx">
          <draftsPage ref="page" :showCheck="showCheck"></draftsPage>
        </swiper-item>
      </swiper>
      <transition name="fade-column">
        <view class="footer" v-if="showCheck">
          <u-checkbox
            v-model="allChecked"
            size="40"
            shape="circle"
            active-color="#F04323"
            @change="checkAllChange"
          >全选</u-checkbox>
          <view class="dele_btn">删除</view>
        </view>
      </transition>
    </view>
  </view>
</template>

<script>
import { getDrafts } from "api/home.js";
import draftsPage from "./drafts-page";
export default {
  components: {
    draftsPage
  },
  data() {
    return {
      showCheck: false, //编辑状态
      allChecked: false,
      current: 0,
      swiperCurrent: 0,
      tabList: [
        {
          name: "文章",
        },
        {
          name: "视频",
        },
      ],
    };
  },
  onReady() {
    this.pageList = this.$refs.page;
    this.pageList[0].getData();
  },
  methods: {
    // 监听下拉刷新
    onPullDownRefresh() {
      let target = this.pageList[this.swiperCurrent];
      target.pageIndex = 1;
      target.dataList = [];
      target.loadStatus = "loadmore";
      target.getData(this.swiperCurrent);
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
    // 编辑收藏
    editDrafts() {
      this.showCheck = !this.showCheck;
      if (this.showCheck == false) {
        this.allChecked = false;
        this.orderList.forEach((list) => {
          list.forEach((item) => {
            item.checked = false;
          });
        });
      }
    },
    // 全选监听
    checkAllChange(e) {
      // console.log(e);
      let targetArr = this.orderList[this.swiperCurrent];
      if (e.value === true) {
        targetArr.forEach((item) => {
          item.checked = true;
        });
      } else if (e.value === false) {
        targetArr.forEach((item) => {
          item.checked = false;
        });
      }
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
    font-size: 30rpx;
  }
}
.drafts-page {
  position: relative;
  .navbar {
    border-bottom: 1px solid #f2f2f2;
    /deep/.u-scroll-bar {
      position: absolute;
      bottom: 0px;
    }
  }
  // .uni-swiper {
  //   height: 100vh;
  // }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 15px;
    border-top: 1px solid #e6e6e6;
    background: #fff;
    transition: 0.3;
    .dele_btn {
      color: #fff;
      padding: 0 34rpx;
      line-height: 62rpx;
      letter-spacing: 1px;
      border-radius: 12rpx;
      background: #f04323;
    }
  }
}
.fade-column-enter-active,
.fade-column-leave-active {
  transition: 0.3s;
}
.fade-column-enter,
.fade-column-leave-to {
  transform: translateY(60px);
}
</style>
