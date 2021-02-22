<template>
  <view id="app">
    <u-navbar title="我的作品" :is-fixed="true" :border-bottom="false">
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
        <swiper-item class="swiper-item" v-for="(order, idx) in orderList" :key="idx">
          <scroll-view
            :scroll-y="true"
            style="height: 100%;width: 100%;"
            @scrolltolower="reachBottom"
          >
            <view :class="[showCheck ? 'content_wrap right_row' : 'content_wrap']">
              <view class="u-flex item" v-for="(item, index) in orderList[idx]" :key="index">
                <transition name="fade-row">
                  <view class="check_wrap" v-if="showCheck">
                    <u-checkbox
                      v-model="item.checked"
                      size="40"
                      shape="circle"
                      active-color="#F04323"
                    ></u-checkbox>
                  </view>
                </transition>
                <view class="content">
                  <view class="banner">
                    <image :src="item.img" />
                  </view>
                  <view class="right_wrap">
                    <view class="u-line-2 title">{{item.title}}</view>
                    <view class="u-flex bottom">
                      <view class="nickname">{{item.nickname}}</view>
                      <view class="add_time">收藏于{{item.add_time}}</view>
                    </view>
                  </view>
                </view>
              </view>
              <view class="loadmore">
                <u-loadmore :status="loadStatus[idx]"></u-loadmore>
              </view>
            </view>
          </scroll-view>
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
export default {
  data() {
    return {
      showCheck: false, //编辑状态
      allChecked: false,
      current: 0,
      swiperCurrent: 0,
      orderList: [[], []],
      loadStatus: ["loadmore", "loadmore"],
      tabList: [
        {
          name: "文章",
        },
        {
          name: "视频",
        },
      ],
      dataList: [
        {
          img:
            "//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg",
          title:
            "这边是标题这边是标题这边是标题这边是标题这边是标题这边是标题这边是标题这边是标题这边是标题",
          nickname: "新闻小助手",
          add_time: "1-12",
          checked: false,
        },
        {
          img:
            "//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg",
          title: "这边是标题这边是标题这边是标题这边是标题",
          nickname: "新闻小助手",
          add_time: "1-13",
          checked: false,
        },
        {
          img:
            "//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg",
          title: "这边是标题这边是标题这边是标题这边是标题",
          nickname: "新闻小助手",
          add_time: "1-14",
          checked: false,
        },
        {
          img:
            "//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg",
          title: "这边是标题这边是标题这边是标题这边是标题",
          nickname: "新闻小助手",
          add_time: "1-15",
          checked: false,
        },
      ],
    };
  },
  onLoad(options) {
    this.getOrderList(0);
  },
  methods: {
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
    // 页面数据
    getOrderList(idx) {
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
  .uni-swiper {
    height: 100vh;
  }
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
