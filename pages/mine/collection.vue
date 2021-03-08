<template>
  <view>
    <u-navbar title="我的收藏" :is-fixed="true" :border-bottom="false">
      <view class="navbar-right" slot="right">
        <view class="edit_btn" @click="editCollection">{{showCheck ? '取消' : '编辑'}}</view>
      </view>
    </u-navbar>
    <view class="main-container">
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
                  <view class="nickname">{{item.author || '暂无作者'}}{{item.id}}</view>
                  <view class="add_time">收藏于{{item.add_time | date('mm-dd')}}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="loadmore">
          <u-loadmore :status="loadStatus"></u-loadmore>
        </view>
      </scroll-view>
      <transition name="fade-column">
        <view class="footer" v-if="showCheck">
          <u-checkbox
            v-model="allChecked"
            size="40"
            shape="circle"
            active-color="#F04323"
            @change="checkAllChange"
          >全选</u-checkbox>
          <view class="dele_btn" @click="goDeleteFavor">删除</view>
        </view>
      </transition>
    </view>
  </view>
</template>

<script>
import { getFavor, deleteFavor } from "api/home.js";
export default {
  data() {
    return {
      limit: 10, //分页数量
      pageIndex: 1, //分页
      loadStatus: "loadmore",
      showCheck: false, //是否编辑状态
      allChecked: false, //全选状态
      dataList: [],
    };
  },
  onReady() {
    //这里表示当进入页面的时候就开始执行下拉刷新动画
    this.$nextTick(() => {
      uni.startPullDownRefresh({
        success: function (res) {
          console.log(res); //success 返回参数说明
        },
      });
    });
  },
  methods: {
    // 页面数据
    async getDataList(index = 0) {
      let params = {
        token: this.vuex_token,
        page: this.pageIndex,
        limit: this.limit,
      };
      let { data } = await getFavor(params);
      let result = data.list;
      if (data == null || result.length == 0) {
        // 加载结束
        this.loadStatus = "nomore";
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
        this.dataList = result;
      } else {
        this.dataList = this.dataList.concat(result);
      }
      this.pageIndex++;
      uni.stopPullDownRefresh();
    },
    // 请求批量删除
    async postDelete(str, arr) {
      let params = {
        token: this.vuex_token,
        id_str: str,
      };
      let { data, msg } = await deleteFavor(params);
      this.doneDelete(arr);
      this.$u.toast(msg);
    },
    // 点击批量删除
    goDeleteFavor() {
      let str = "";
      let arr = [];
      let resultArr = this.dataList.filter((item) => item.checked);
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
    },
    // 点击删除后处理
    doneDelete(arr = []) {
      let target = this.dataList;
      this.dataList = target.filter((item) => arr.indexOf(item.id) == -1);
      this.showCheck = false;
    },
    // 监听下拉刷新
    onPullDownRefresh() {
      this.limit = this.$options.data().limit;
      this.pageIndex = this.$options.data().pageIndex;
      this.loadStatus = this.$options.data().loadStatus;
      this.dataList = this.$options.data().dataList;
      this.getDataList();
    },
    // 触发滚动加载
    reachBottom() {
      if (this.dataList.length >= this.limit) {
        this.loadStatus = "loading";
        setTimeout(() => {
          this.getDataList();
        }, 600);
      }
    },
    // 编辑收藏
    editCollection() {
      this.showCheck = !this.showCheck;
    },
    // 全选监听
    checkAllChange(e) {
      // console.log(e);
      if (e.value === true) {
        this.dataList.forEach((item) => {
          item.checked = true;
        });
      } else if (e.value === false) {
        this.dataList.forEach((item) => {
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
.main-container {
  position: relative;
  // height: calc(100vh - 44px - env(safe-area-inset-bottom));
  // padding-bottom: 120rpx;
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
  .loadmore {
    padding: 20rpx 0;
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
