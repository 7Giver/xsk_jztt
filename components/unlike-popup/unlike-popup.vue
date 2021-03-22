<template>
  <view class="unlike-popup">
    <u-popup v-model="showDialog" mode="bottom" border-radius="26" :safe-area-inset-bottom="true">
      <view class="container">
        <view class="list_wrap">
          <view
            class="item"
            v-for="(item, index) in dataList"
            :key="index"
            @click="checkItem(item)"
          >
            <view class="title">{{item.title}}</view>
            <view class="right_wrap" :class="{ check: item.checked }">
              <u-icon name="checkbox-mark" color="#fff"></u-icon>
            </view>
          </view>
        </view>
        <view class="submit_btn" @click="submit">完成</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
/**
 * unlikePopup 文章视频不喜欢弹窗
 * @description 选择不喜欢的原因
 * @property {Number String} articleId 文章Id
 * @event {Function} submit 点击完成
 */
import { getUnlikeList, postDislike } from "@/api/home.js";
export default {
  name: "unlikePopup",
  props: {
    articleId: {
      type: [Number, String],
      default: "",
    },
  },
  data() {
    return {
      showDialog: false,
      dataList: [], // 原因数组
    };
  },
  mounted() {
    this.getUnlike();
  },
  methods: {
    checkItem(item) {
      if (item.checked) {
        item.checked = 0;
      } else {
        item.checked = 1;
      }
    },
    submit() {
      let arr = [];
      this.dataList.filter((item) => {
        item.checked == 1 && arr.push(item.title);
      });
      let result = arr.join(",");
      if (!result) return (this.showDialog = false);
      this.postUnlike(result);
    },
    async getUnlike() {
      let { data } = await getUnlikeList();
      let resultData = data.list.map((item) => {
        return {
          title: item,
          checked: 0,
        };
      });
      this.dataList = resultData;
    },
    async postUnlike(str) {
      let params = {
        token: this.vuex_token,
        id: this.articleId,
        content: str,
      };
      let { data } = await postDislike(params);
      this.dataList.forEach((item) => (item.checked = 0));
      this.$u.toast("提交成功");
      this.showDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$mianColor: #f04323;
.container {
  color: #333;
  padding-top: 14rpx;
}
.list_wrap {
  padding: 0 30rpx;
  border-bottom: 1px solid #f0f0f0;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 86rpx;
    &:not(:last-child) {
      border-bottom: 1px solid #f0f0f0;
    }
    .title {
      font-size: 28rpx;
      font-weight: bold;
    }
    .right_wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44rpx;
      height: 44rpx;
      border-radius: 50%;
      background: #f0f0f0;
    }
    .check {
      background: $mianColor;
    }
  }
}
.submit_btn {
  text-align: center;
  font-size: 30rpx;
  line-height: 86rpx;
}
</style>