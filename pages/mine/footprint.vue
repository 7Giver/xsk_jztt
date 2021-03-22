<template>
  <view>
    <u-navbar title="我的足迹" :is-fixed="true" :border-bottom="false">
      <view class="navbar-right" slot="right">
        <u-icon name="more-dot-fill" size="43" color="#333"></u-icon>
      </view>
    </u-navbar>
    <view class="page-footpoint">
      <u-index-list :scrollTop="scrollTop">
        <view v-for="(item, index) in indexList" :key="index">
          <u-index-anchor :index="item" />
          <view class="list-cell">列表1</view>
          <view class="list-cell">列表2</view>
          <view class="list-cell">列表3</view>
        </view>
      </u-index-list>
    </view>
  </view>
</template>

<script>
import { getTrack } from "@/api/home.js";
export default {
  data() {
    return {
      pageIndex: 1,
      limit: 10,
      scrollTop: 0,
      indexList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
    };
  },
  onLoad(options) {
    this.getTrackData();
  },
  methods: {
    // 获取足迹列表
    async getTrackData() {
      let params = {
        token: this.vuex_token,
        page: this.pageIndex,
        limit: this.limit
      }
      let { data } = await getTrack(params);
    },
    // 监听页面滚动
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
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
</style>
