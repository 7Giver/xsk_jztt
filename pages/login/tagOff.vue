<template>
  <view>
    <u-navbar :is-back="false" :border-bottom="false">
      <view class="title_wrap">
        <view class="main">
          选择你感兴趣的
          <view class="off">（最多选{{maxNumber}}个）</view>
        </view>
        <view class="off" @click="goPassTag">点击跳过</view>
      </view>
    </u-navbar>
    <view class="tag-page">
      <view class="tag_wrap">
        <view class="wrap_item" v-for="(item, index) in tagList" :key="index">
          <view class="u-line-1 title">{{item.name}}</view>
          <view class="u-flex tag_list">
            <view
              class="u-line-1 tag"
              :class="{ on: tag.checked }"
              v-for="(tag, i) in item.subs"
              :key="i"
              @click="taggleTag(tag)"
            >{{tag.name}}</view>
          </view>
        </view>
      </view>
      <view class="next_btn" @click="submitTags">完成({{targetList.length}})</view>
    </view>
  </view>
</template>

<script>
import { getSecondTag, userLogin, postUserTag } from "@/api/home.js";
export default {
  data() {
    return {
      ids: "", // 一级标签
      maxNumber: 6, // 最多标签数量
      tagList: [],
      targetList: [], //选中的标签
    };
  },
  onLoad(options) {
    if (options.ids) {
      this.ids = options.ids;
      this.getTagList(options.ids);
    } else {
      this.getTagList(options.ids);
    }
  },
  methods: {
    // 选中标签
    taggleTag(tag) {
      let resutlt = [];
      this.tagList.forEach((item) => {
        item.subs.forEach((subs) => {
          subs.checked && resutlt.push(subs);
        });
      });
      if (resutlt.length < this.maxNumber || tag.checked) {
        tag.checked = !tag.checked;
      } else {
        this.$u.toast(`不能超过${this.maxNumber}个`);
      }
      let target = []
      this.tagList.forEach((item) => {
        item.subs.forEach((subs) => {
          subs.checked && target.push(subs);
        });
      });
      this.targetList = target
    },
    // 跳过选择
    goPassTag() {
      uni.switchTab({ url: "/pages/news/news" });
    },
    // 获取兴趣标签
    async getTagList(str = "") {
      let { data } = await getSecondTag(str);
      let result = data.list;
      result.forEach((item) => {
        item.subs.forEach((v) => {
          this.$set(v, "checked", false);
        });
      });
      this.tagList = result;
    },
    // 提交用户标签
    async submitTags() {
      let targetArr = [];
      this.tagList.forEach((item) => {
        item.subs.forEach((subs) => {
          subs.checked && targetArr.push(subs);
        });
      });
      if (!targetArr.length) {
        this.$u.toast("请选择标签");
        return;
      }
      let arr = targetArr.map((item) => `${item.id},${item.parent_id}`);
      let result = arr.join(",").split(",");
      let newArr = new Set([...result]);
      let ids = [...newArr].join(",");
      uni.showLoading({
        title: "登录中...",
      });
      let params = {
        token: this.vuex_token,
        ids: ids,
      };
      let { data } = await postUserTag(params);
      this.$u.vuex("vuex_user.has_label", 1);
      setTimeout(() => {
        uni.hideLoading();
        uni.switchTab({ url: "/pages/news/news" });
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.title_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 40rpx;
  .main {
    display: flex;
    align-items: baseline;
    color: #333333;
    font-size: 36rpx;
    font-weight: bold;
  }
  .off {
    color: #666666;
    font-size: 26rpx;
    font-weight: normal;
  }
}
.tag-page {
  position: relative;
  padding: 0 36rpx;
  padding-bottom: 150rpx;
  .tag_wrap {
    padding-top: 30rpx;
    .wrap_item {
      padding: 24rpx 30rpx;
      margin-bottom: 30rpx;
      background: #f8f8f8;
      border-radius: 10rpx;
      .title {
        width: 52%;
        font-size: 30rpx;
        font-weight: bold;
      }
      .tag_list {
        flex-wrap: wrap;
        .tag {
          min-width: 21%;
          // max-width: 24%;
          color: #666666;
          font-size: 26rpx;
          line-height: 50rpx;
          text-align: center;
          padding: 0 6rpx;
          margin: 20rpx 3% 0 0;
          border-radius: 8rpx;
          border: 1px solid #999999;
          &:nth-child(4n) {
            margin-right: 0;
          }
        }
        .on {
          color: #f04323;
          border-color: #f04323;
        }
      }
    }
  }
  .next_btn {
    position: sticky;
    bottom: 120rpx;
    width: 100%;
    margin: 80rpx auto 0;
    color: #fff;
    font-size: 30rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 10rpx;
    background: #f04323;
  }
}
</style>
