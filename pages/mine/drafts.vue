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
          <view class="dele_btn" @click="goDeleteItem">删除</view>
        </view>
      </transition>
    </view>
  </view>
</template>

<script>
import { getDrafts, deleteDrafts } from "api/home.js";
import draftsPage from "./drafts-page";
export default {
  components: {
    draftsPage,
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
    // 编辑收藏
    editDrafts() {
      let dataList = this.pageList[this.swiperCurrent].dataList;
      this.showCheck = !this.showCheck;
      if (this.showCheck == false) {
        this.allChecked = false;
        dataList.forEach((item) => {
          this.$set(item, "checked", false);
        });
      }
    },
    // 全选事件
    checkAllChange(e) {
      // console.log(e);
      let dataList = this.pageList[this.swiperCurrent].dataList;
      if (e.value === true) {
        dataList.forEach((item) => {
          this.$set(item, "checked", true);
        });
      } else if (e.value === false) {
        dataList.forEach((item) => {
          this.$set(item, "checked", false);
        });
      }
    },
    // 点击批量删除
    goDeleteItem() {
      let str = "";
      let arr = [];
      let dataList = this.pageList[this.swiperCurrent].dataList;
      let resultArr = dataList.filter((item) => item.checked);
      let length = resultArr.length;
      if (!length) {
        this.$u.toast("请勾选作品");
        return;
      }
      resultArr.forEach((item, index) => {
        str += item.id + (index == length - 1 ? "" : ",");
        arr.push(item.id);
      });
      this.postDelete(str, arr);
      // this.doneDelete(arr, this.swiperCurrent);
    },
    // 点击删除后处理
    doneDelete(arr = [], index) {
      let dataList = this.pageList[index].dataList;
      this.pageList[index].dataList = dataList.filter(
        (item) => arr.indexOf(item.id) == -1
      );
      this.showCheck = false;
    },
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
      this.showCheck = false;
      this.swiperCurrent = index;
      let target = this.pageList[index];
      target.pageIndex = 0;
      target.dataList = [];
      target.loadStatus = "loadmore";
      target.getData(index);
    },
    transition({ detail: { dx } }) {
      this.$refs.tabs.setDx(dx);
    },
    animationfinish({ detail: { current } }) {
      this.$refs.tabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
    // 请求批量删除
    async postDelete(str, arr) {
      let params = {
        token: this.vuex_token,
        ids: str,
      };
      let { data, msg } = await deleteDrafts(params);
      this.doneDelete(arr, this.swiperCurrent);
      this.$u.toast(msg);
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
