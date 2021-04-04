<template>
  <view id="app">
    <u-navbar :is-back="false" :border-bottom="false">
      <view class="navbar-right" slot="right">
        <view class="icon_wrap" @click="goNext('message')">
          <view class="left">
            <u-icon name="email" size="43" color="#333"></u-icon>
            <u-badge size="mini" :is-dot="true" :offset="[-8, -8]"></u-badge>
          </view>
          <view>消息</view>
        </view>
      </view>
    </u-navbar>
    <view class="mine-page">
      <view class="header">
        <view class="u-flex header_top">
          <view class="u-flex left_wrap">
            <view class="avatar" @click="goNext('setting')">
              <u-avatar :src="vuex_user.avatar" size="100"></u-avatar>
            </view>
            <view class="right">
              <view class="nickname">{{ vuex_user.name || 'client' }}</view>
              <view class="bottom" @click="goNext('personal')">
                <text>查看个人主页</text>
                <u-icon name="arrow-right" color="#969799" size="20"></u-icon>
              </view>
            </view>
          </view>
          <view
            class="incode_wrap"
            @click="copyJSON(vuex_user.invite_code)"
          >我的邀请码：{{ vuex_user.invite_code }}</view>
        </view>
        <view class="u-flex header_bottom" @click="goNext('coin')">
          <view class="item">
            <view class="number">{{ vuex_user.integral }}</view>
            <text class="title">我的金币</text>
          </view>
          <!-- <view class="item">
            <view class="number">{{ 569 }}</view>
            <text class="title">今日金币</text>
          </view>-->
          <view class="item">
            <view class="number">{{ vuex_user.money }}</view>
            <text class="title">当前价值(元)</text>
          </view>
          <view class="item">
            <image class="icon" src="/static/img/mine/icon_zhmx.png" mode="widthFix" />
            <text class="title">账户明细</text>
          </view>
        </view>
      </view>
      <view class="container">
        <view class="u-flex share_wrap">
          <view
            class="u-flex item"
            v-for="(item, index) in inviteList"
            :key="index"
            @click="innerNext(item.id)"
          >
            <image class="icon" :src="item.icon" mode="widthFix" />
            <view class="title">{{ item.title }}</view>
          </view>
        </view>
        <view class="banner_wrap mt">
          <u-swiper mode="none" bg-color="#fff" :height="220" :list="bannerList"></u-swiper>
        </view>
        <view class="function_wrap mt">
          <view class="main_title">我的功能</view>
          <view class="u-flex content">
            <view
              class="u-flex item"
              v-for="(item, index) in iconList"
              :key="index"
              @click="goNextPage(item)"
            >
              <image class="icon" :src="item.icon" mode="widthFix" />
              <view class="title">{{ item.title }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserInfo } from "@/api/home.js";
export default {
  data() {
    return {
      inviteList: [
        {
          id: 1,
          icon: "/static/img/mine/icon_wxyq.png",
          title: "微信邀请",
        },
        {
          id: 2,
          icon: "/static/img/mine/icon_pyqyq.png",
          title: "朋友圈邀请",
        },
        {
          id: 3,
          icon: "/static/img/mine/icon_qqyq.png",
          title: "QQ邀请",
        },
        {
          id: 4,
          icon: "/static/img/mine/icon_wdhy.png",
          title: "我的好友",
        },
      ],
      bannerList: [
        {
          image: "https://cdn.uviewui.com/uview/swiper/1.jpg",
          title: "昨夜星辰昨夜风，画楼西畔桂堂东",
        },
        {
          image: "https://cdn.uviewui.com/uview/swiper/2.jpg",
          title: "身无彩凤双飞翼，心有灵犀一点通",
        },
        {
          image: "https://cdn.uviewui.com/uview/swiper/3.jpg",
          title: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳",
        },
      ],
      iconList: [
        {
          id: 1,
          icon: "/static/img/mine/icon_gzfs.png",
          title: "关注/粉丝",
        },
        {
          id: 2,
          icon: "/static/img/mine/icon_wdsc.png",
          title: "我的收藏",
        },
        {
          id: 3,
          icon: "/static/img/mine/icon_wdzj.png",
          title: "我的足迹",
        },
        {
          id: 4,
          icon: "/static/img/mine/icon_hbyq.png",
          title: "海报邀请",
        },
        {
          id: 5,
          icon: "/static/img/mine/icon_cgx.png",
          title: "草稿箱",
        },
        {
          id: 6,
          icon: "/static/img/mine/icon_wdzp.png",
          title: "我的作品",
        },
        // {
        //   id: 7,
        //   icon: "/static/img/mine/icon_yjms.png",
        //   title: "夜间模式",
        // },
        {
          id: 8,
          icon: "/static/img/mine/icon_fk.png",
          title: "帮助反馈",
        },
        {
          id: 9,
          icon: "/static/img/mine/icon_xtsz.png",
          title: "系统设置",
        },
        {
          id: 10,
          icon: "/static/img/mine/icon_pl.png",
          title: "我的评论",
        },
      ],
    };
  },
  onShow() {
    this.getUserData();
  },
  methods: {
    // 获取用户数据
    async getUserData() {
      let { data } = await getUserInfo(this.vuex_token);
      this.$u.vuex("vuex_user", data);
    },
    // 跳转页面
    goNext(type) {
      switch (type) {
        case "personal":
          this.$Router.push({ name: "personal" });
          break;
        case "coin":
          this.$Router.push({ path: "/pages/mine/coin" });
          break;
        case "message":
          this.$Router.push({ path: "/pages/message/message" });
          break;
        case "setting":
          this.$Router.push({ path: "/pages/setting/personal" });
          break;
        default:
          break;
      }
    },
    // 区域跳转
    innerNext(id) {
      switch (id) {
        case 1:
          this.callWxshare();
          break;
        case 4:
          this.$Router.push({ path: "/pages/mine/friend" });
          break;
        default:
          break;
      }
    },
    // 功能页面跳转
    goNextPage(item) {
      switch (item.id) {
        case 1:
          this.$Router.push({ path: "/pages/mine/foucFans" });
          break;
        case 2:
          this.$Router.push({ path: "/pages/mine/collection" });
          break;
        case 3:
          this.$Router.push({ path: "/pages/mine/footprint" });
          break;
        case 4:
          this.$Router.push({ path: "/pages/mine/invitePoster" });
          break;
        case 5:
          this.$Router.push({ path: "/pages/mine/drafts" });
          break;
        case 6:
          this.$Router.push({ path: "/pages/mine/works" });
          break;
        case 7:
          // this.$Router.push({ path: "/pages/mine/works" });
          // 夜间模式
          break;
        case 8:
          this.$Router.push({ path: "/pages/mine/helps" });
          break;
        case 9:
          this.$Router.push({ path: "/pages/setting/setting" });
          break;
        case 10:
          this.$Router.push({ path: "/pages/mine/comment" });
          break;
        default:
          break;
      }
    },
    // 调用微信分享
    callWxshare() {
      // uni.share({
      //   provider: "weixin",
      //   scene: "WXSceneSession",
      //   type: 0,
      //   href: "http://uniapp.dcloud.io/",
      //   title: "uni-app分享",
      //   summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
      //   imageUrl:
      //     "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
      //   success: function (res) {
      //     console.log("success:" + JSON.stringify(res));
      //   },
      //   fail: function (err) {
      //     console.log("fail:" + JSON.stringify(err));
      //   },
      // });
      uni.shareWithSystem({
        summary: "",
        href: "https://uniapp.dcloud.io",
        imageUrl:
          "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
        success() {
          // 分享完成，请注意此时不一定是成功分享
        },
        fail() {
          // 分享失败
        },
      });
    },
    // 复制文本
    async copyJSON(text) {
      // #ifdef H5
      let target = document.createElement("input"); //创建input节点
      target.value = text; // 给input的value赋值
      document.body.appendChild(target); // 向页面插入input节点
      target.select(); // 选中input
      try {
        await document.execCommand("Copy"); // 执行浏览器复制命令
        this.$u.toast("复制成功");
      } catch {
        console.log("h5复制失败");
      }
      // #endif
      // #ifdef APP-PLUS
      uni.setClipboardData({
        data: text,
        success: () => {
          this.$u.toast("复制成功");
        },
        fail: () => {
          console.log("app复制失败");
        },
      });
      // #endif
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-right {
  margin-right: 30rpx;
  display: flex;
  .icon_wrap {
    display: flex;
    .left {
      margin: 0 12rpx;
      position: relative;
      color: #ffffff;
      display: flex;
    }
  }
}
.mine-page {
  // height: calc(100vh - env(safe-area-inset-top));
  background-color: #f2f2f2;
  .header {
    padding: 0 30rpx;
    background-color: #fff;
    .header_top {
      align-items: flex-end;
      justify-content: space-between;
      .left_wrap {
        .avatar {
          margin-right: 20rpx;
        }
        .right {
          .nickname {
            color: #333333;
            font-size: 30rpx;
            font-weight: bold;
          }
          .bottom {
            color: #666666;
            margin-top: 6rpx;
          }
        }
      }
      .incode_wrap {
        font-size: 26rpx;
        color: #666666;
        padding-bottom: 15rpx;
      }
    }
    .header_bottom {
      justify-content: space-around;
      .item {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 30rpx 0;
        .number {
          color: #333333;
          font-size: 34rpx;
          font-weight: bold;
          margin-bottom: 8rpx;
        }
        .title {
          color: #666666;
          font-size: 24rpx;
        }
        .icon {
          width: 48rpx;
          margin-bottom: 10rpx;
        }
      }
    }
  }
  .container {
    padding: 30rpx 30rpx 50rpx;
    > view {
      border-radius: 18rpx;
      background-color: #fff;
    }
    .mt {
      margin-top: 30rpx;
    }
    .share_wrap {
      justify-content: space-around;
      padding: 26rpx 10rpx;
      .item {
        align-items: center;
        flex-direction: column;
        .icon {
          width: 80rpx;
        }
        .title {
          color: #666666;
          font-size: 24rpx;
          margin-top: 16rpx;
        }
      }
    }
    .banner_wrap {
      overflow: hidden;
    }
    .function_wrap {
      padding: 30rpx 30rpx 10rpx;
      .main_title {
        color: #333333;
        font-size: 30rpx;
        font-weight: bold;
      }
      .content {
        flex-wrap: wrap;
        padding-top: 30rpx;
        .item {
          align-items: center;
          flex-direction: column;
          width: 25%;
          margin-bottom: 30rpx;
          .icon {
            width: 80rpx;
          }
          .title {
            color: #666666;
            font-size: 24rpx;
            margin-top: 10rpx;
          }
        }
      }
    }
  }
  .picker_wrap {
    display: flex;
    align-items: center;
  }
}
</style>
