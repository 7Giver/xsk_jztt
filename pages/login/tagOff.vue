<template>
  <view>
    <u-navbar :is-back="false" :is-fixed="false" :border-bottom="false"></u-navbar>
    <view class="tag-page">
      <view class="title_wrap">
        <view class="main">选择你感兴趣的东西</view>
        <view class="off">最多可选5个</view>
      </view>
      <view class="tag_wrap">
        <view class="wrap_item" v-for="(item, index) in tagList" :key="index">
          <view class="u-line-1 title">{{item.title}}</view>
          <view class="u-flex tag_list">
            <view
              :class="[tag.checked ? 'u-line-1 tag on' : 'u-line-1 tag']"
              v-for="(tag, i) in item.tag"
              :key="i"
              @click="taggleTag(item, tag)"
            >{{tag.name}}</view>
          </view>
        </view>
      </view>
      <view class="next_btn" @click="getLogin">完成</view>
    </view>
  </view>
</template>

<script>
import { userLogin } from "@/api/home.js";
export default {
  data() {
    return {
      tagList: [
        {
          title: "电影AAAFDSFDSFDSFDSFDSFDSFDSFDSFWRD2REQWFWEF",
          tag: [
            {
              name: "标签内容",
              checked: false,
            },
            {
              name: "标签内容撒旦范德萨范德萨发第三方撒旦范德萨爱的方式",
              checked: false,
            },
            {
              name: "标签",
              checked: false,
            },
            {
              name: "标签",
              checked: false,
            },
            {
              name: "是标签",
              checked: false,
            },
            {
              name: "标签内容",
              checked: false,
            },
            {
              name: "标签",
              checked: false,
            },
          ],
        },
        {
          title: "美食",
          tag: [
            {
              name: "标签内容",
              checked: false,
            },
            {
              name: "标签内容",
              checked: false,
            },
            {
              name: "标签",
              checked: false,
            },
            {
              name: "标签",
              checked: false,
            },
            {
              name: "是标签",
              checked: false,
            },
            {
              name: "标签内容",
              checked: false,
            },
            {
              name: "标签",
              checked: false,
            },
          ],
        },
        {
          title: "音乐",
          tag: [
            {
              name: "标签内容",
              checked: false,
            },
            {
              name: "标签内容",
              checked: false,
            },
            {
              name: "标签",
              checked: false,
            },
            {
              name: "标签",
              checked: false,
            },
            {
              name: "是标签",
              checked: false,
            },
            {
              name: "标签内容",
              checked: false,
            },
            {
              name: "标签",
              checked: false,
            },
          ],
        },
        {
          title: "运动",
          tag: [
            {
              name: "标签内容",
              checked: false,
            },
            {
              name: "标签内容",
              checked: false,
            },
            {
              name: "标签",
              checked: false,
            },
            {
              name: "标签",
              checked: false,
            },
            {
              name: "是标签",
              checked: false,
            },
            {
              name: "标签内容",
              checked: false,
            },
            {
              name: "标签",
              checked: false,
            },
          ],
        },
        {
          title: "学习",
          tag: [
            {
              name: "标签内容",
              checked: false,
            },
            {
              name: "标签内容",
              checked: false,
            },
            {
              name: "标签",
              checked: false,
            },
            {
              name: "标签",
              checked: false,
            },
            {
              name: "是标签",
              checked: false,
            },
            {
              name: "标签内容",
              checked: false,
            },
            {
              name: "标签",
              checked: false,
            },
          ],
        },
      ],
    };
  },
  methods: {
    async getLogin() {
      let params = {
        mobile: this.vuex_user.tel || 13023367790,
        code: "1234",
        invite: "",
        openid: "",
      };
      let { data } = await userLogin(params);
      this.$u.vuex("vuex_token", data.token);
      this.$u.toast("登录成功");
      setTimeout(() => {
        uni.switchTab({ url: "/pages/news/news" });
      }, 700);
    },
    // 选中标签
    taggleTag(item, tag) {
      let arr = item.tag;
      let resutlt = arr.filter((item) => item.checked);
      if (resutlt.length < 5 || tag.checked) {
        tag.checked = !tag.checked;
      } else {
        this.$u.toast("不能超过5个");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  padding-bottom: 80rpx;
}
.navbar-right {
  margin-right: 30rpx;
  display: flex;
}
.tag-page {
  position: relative;
  padding: 0 40rpx;
  .title_wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .main {
      color: #333333;
      font-size: 36rpx;
      font-weight: bold;
    }
    .off {
      color: #666666;
      font-size: 24rpx;
    }
  }
  .tag_wrap {
    padding-top: 40rpx;
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
          max-width: 28%;
          color: #666666;
          font-size: 26rpx;
          line-height: 50rpx;
          text-align: center;
          padding: 0 3%;
          margin: 20rpx 5% 0 0;
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
    width: 100%;
    margin: 60rpx auto 0;
    color: #fff;
    font-size: 30rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 10rpx;
    background: #f04323;
  }
}
</style>
