<template>
  <view>
    <u-navbar title="我的收藏" :is-fixed="true" :border-bottom="false">
      <view class="navbar-right" slot="right">
        <view class="edit_btn" @click="editCollection">{{showCheck ? '取消' : '编辑'}}</view>
      </view>
    </u-navbar>
    <view class="main-container">
      <view :class="[showCheck ? 'content_wrap right_row' : 'content_wrap']">
        <view class="u-flex item" v-for="(item, index) in dataList" :key="index">
          <transition name="fade-row">
            <view class="check_wrap" v-if="showCheck">
              <u-checkbox v-model="item.checked" size="40" shape="circle" active-color="#F04323"></u-checkbox>
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
      </view>
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
      showCheck: false, //是否编辑状态
      allChecked: false, //全选状态
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
  onLoad(options) {},
  methods: {
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
  padding-bottom: 120rpx;
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
