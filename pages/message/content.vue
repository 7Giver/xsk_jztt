<template>
  <view>
    <u-navbar :title="pageTitle" :is-fixed="true" :border-bottom="false">
      <view class="navbar-right" slot="right">
        <view class="edit_btn" @click="showModal=true">全部已读</view>
      </view>
    </u-navbar>
    <view class="message-content">
      <contentPage ref="page"></contentPage>
      <u-modal
        v-model="showModal"
        :content="modalContent"
        :show-cancel-button="true"
        @confirm="modalConfirm"
      ></u-modal>
    </view>
  </view>
</template>

<script>
import { noticeList, noticeRead } from "@/api/home.js";
import contentPage from "./content-page";
export default {
  components: {
    contentPage,
  },
  data() {
    return {
      pageType: null, // 页面类型
      pageTitle: "",
      modalContent: "是否置为已读？", // 提示窗文本
      showModal: false, //显示提示窗
    };
  },
  onReady() {
    this.pageList = this.$refs.page;
    this.pageType = this.$Route.query.type * 1;
    this.setPageType(this.pageType);
  },
  methods: {
    // 设置页面类型
    setPageType(type) {
      switch (type) {
        case 1:
          this.pageTitle = "点赞通知";
          break;
        case 2:
          this.pageTitle = "评论通知";
          break;
        case 3:
          this.pageTitle = "关注通知";
          break;
        case 5:
          this.pageTitle = "邀请好友通知";
          break;
        case 9:
          this.pageTitle = "系统消息";
          break;
        default:
          break;
      }
      this.pageList.getData(this.pageType);
    },
    // 监听下拉刷新
    onPullDownRefresh() {
      let target = this.pageList;
      target.pageIndex = 1;
      target.dataList = [];
      target.loadStatus = "loadmore";
      target.getData(this.pageType);
    },
    // 提示窗确认
    modalConfirm(e) {
      this.postRead();
    },
    // 设置全部已读
    async postRead() {
      let params = {
        token: this.vuex_token,
        type: this.pageType,
      };
      let { data } = await noticeRead(params);
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
    font-size: 28rpx;
  }
}
.message-content {
}
</style>
