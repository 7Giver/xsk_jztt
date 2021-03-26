<template>
  <view class="comment-report" :style="{ height: (screenHeight - keyboardHeight) + 'px'}">
    <view class="mask" @click="emitShowReport"></view>
    <view class="content_wrap" v-show="showContent">
      <view class="container">
        <u-input
          v-model="comment"
          type="textarea"
          :focus="true"
          :border="true"
          :height="120"
          :maxlength="100"
          @input="inputChange"
          @blur="emitShowReport"
        />
        <view class="right_wrap">
          <u-icon name="arrow-up" color="#999999"></u-icon>
          <view class="submit" :class="{ on: !disabled }">
            <text v-if="!disabled" @click="postComment">发布</text>
            <text v-else>发布</text>
          </view>
        </view>
      </view>
      <!-- 拓展功能区 -->
      <view class="footer"></view>
    </view>
  </view>
</template>

<script>
/**
 * commentReport 文章视频评论发布
 * @description 文章或视频评论发布
 * @property {Number String} articleId 文章Id
 * @property {Number String} parentId 父级评论Id
 * @event {Function} emitShowReport 派送关闭组件
 */
import { commentSubmit } from "@/api/home.js";
export default {
  name: "commentReport",
  props: {
    articleId: {
      type: [Number, String],
      default: "",
    },
    parentId: {
      type: [Number, String],
      default: "",
    },
  },
  data() {
    return {
      comment: "",
      keyboardHeight: 0, // 键盘高度
      screenHeight: 0, // 屏幕高度
      disabled: true, // 禁言发布
      showContent: false, // 展示组件主体
    };
  },
  created() {
    this.screenHeight = this.vuex_system.screenHeight;
    // 根据状态栏高度或品牌判断，是否直接展示主体
    if (
      this.vuex_system.brand == "Apple" ||
      !this.vuex_system.statusBarHeight
    ) {
      this.showContent = true;
    }
  },
  mounted() {
    uni.onKeyboardHeightChange((res) => {
      if (res.height == 0) {
        this.emitShowReport();
      } else {
        this.keyboardHeight = res.height;
        this.showContent = true;
      }
    });
    // 备用方案 显示主体
    // if (!this.showContent) {
    //   setTimeout(() => {
    //     this.showContent = true;
    //   }, 400);
    // }
  },
  methods: {
    inputChange(e) {
      let str = this.$u.trim(e);
      str ? (this.disabled = false) : (this.disabled = true);
    },
    emitShowReport() {
      this.$emit("emitShowReport");
    },
    // 提交评论
    async postComment() {
      let str = this.$u.trim(this.comment); //去除两端空格
      if (!this.articleId) {
        this.$u.toast("文章ID不能为空");
        return;
      }
      if (!str) {
        this.$u.toast("评论不能为空");
        return;
      }
      let params = {
        token: this.vuex_token,
        article_id: this.articleId,
        parent_id: this.parentId || "",
        content: str,
      };
      let { data } = await commentSubmit(params);
      this.comment = "";
      this.$emit("emitShowReport", true);
      this.$u.toast("评论成功");
    },
  },
};
</script>

<style lang="scss" scoped>
$mianColor: #f04323;
.comment-report {
  position: fixed;
  bottom: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .content_wrap {
    width: 100%;
    padding: 30rpx 36rpx;
    background: #fff;
    border-top: 1px solid #e6e6e6;
    .container {
      display: flex;
      justify-content: space-between;
      .u-input {
        background: #f9f9f9;
        border-radius: 14rpx;
      }
      .right_wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        padding-left: 36rpx;
        .submit {
          color: #999999;
          font-size: 32rpx;
          letter-spacing: 1px;
          padding-bottom: 5rpx;
        }
        .on {
          color: $mianColor;
        }
      }
    }
    .footer {
    }
  }
  .mask {
    flex: 1;
  }
}
</style>