<template>
  <view id="app">
    <u-navbar :title="detail.title" :border-bottom="false">
      <view class="u-flex navbar-right" slot="right">
        <u-icon name="star"></u-icon>
        <u-icon name="share"></u-icon>
      </view>
    </u-navbar>
    <view class="detail-page">
      <!-- 文章版块 -->
      <view class="detail_wrap">
        <view class="u-line-3 main_title">{{detail.title}}</view>
        <view class="u-flex inner_header">
          <view class="u-flex left_wrap">
            <view class="avatar_wrap">
              <u-avatar :src="detail.avatar" size="75"></u-avatar>
            </view>
            <view class="right">
              <view class="nickname">{{detail.source}}</view>
              <view class="date">{{detail.datetime}}</view>
            </view>
          </view>
          <view class="right_wrap">
            <view class="foucs_btn">+关注</view>
          </view>
        </view>
        <view class="content_wrap">
          <u-read-more color="#F04323" show-height="700" :toggle="true">
            <rich-text :nodes="content"></rich-text>
          </u-read-more>
        </view>
        <view class="handle_wrap">
          <view class="u-flex item_wrap">
            <image class="icon" src="/static/img/news/icon_bxh.png" mode="widthFix" />
            <view class="text">不喜欢</view>
          </view>
          <view class="u-flex item_wrap">
            <image class="icon" src="/static/img/news/icon_like.png" mode="widthFix" />
            <view class="text">220</view>
          </view>
        </view>
        <view class="advert_wrap">
          <u-swiper :list="bannerList" mode="none"></u-swiper>
          <view class="u-flex bottom_wrap">
            <view class="u-flex left">
              <view class="type_name">广告</view>
              <view class="advert_name">这里是广告昵称</view>
            </view>
            <view class="right">
              <u-icon name="close"></u-icon>
            </view>
          </view>
        </view>
      </view>
      <u-gap height="15" bg-color="#F2F2F2"></u-gap>
      <!-- 推荐版块 -->
      <view class="recommend_wrap">
        <view class="item_list">
          <view class="item" v-for="(item, index) in recommendList" :key="index">
            <view class="left_wrap">
              <view class="title u-line-2">{{item.title}}</view>
              <view class="u-flex bottom">
                <view class="u-flex left">
                  <u-avatar :src="item.avatar" size="40" />
                  <view class="name">{{item.name}}</view>
                </view>
                <view class="add_time">{{item.add_time}}</view>
              </view>
            </view>
            <view class="right_wrap">
              <image class="banner" :src="item.banner" />
            </view>
          </view>
        </view>
        <view class="advert_wrap">
          <u-swiper :list="bannerList" mode="none"></u-swiper>
          <view class="u-flex bottom_wrap">
            <view class="u-flex left">
              <view class="type_name">广告</view>
              <view class="advert_name">这里是广告昵称</view>
            </view>
            <view class="right">
              <u-icon name="close"></u-icon>
            </view>
          </view>
        </view>
      </view>
      <u-gap height="15" bg-color="#F2F2F2"></u-gap>
      <!-- 评论版块 -->
      <view class="comment_wrap">
        <my-comment></my-comment>
      </view>
    </view>
  </view>
</template>

<script>
import myComment from "@/components/my-comment/my-comment";
export default {
  components: {
    myComment,
  },
  data() {
    return {
      detail: {},
      content: `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
				苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
				无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？如果按技术含量来说，大家常常把认为没有气垫Dunk是其中最原始的一款。但正确的顺序是，83年NIKE为了打败老对手Converse而推出的Air Force 1 （第一双气垫鞋)让他们在市场上大获全胜，股票也节节攀升。但到了85年adidas卷土重来，运动产品市场大变，Nike面临有史以来最严重的财政危机，股价在同年下跌过半，此时为了扭转逆势，Nike做了一个后来影响全世界的动作，那就以巨资签下了当时的超级新人Michael Jordan，以Air Force One为原型，为他设计了第一双签名鞋Air Jordan One。很快所有的顶级校队都强烈要求拥有自己的队鞋，这正是后来Dunk出现的原因。在Dunk发售时有8种完全不同颜色，分别代表了北卡罗来纳大学、亚利桑那大学及阿肯色大学等八支NCAA顶尖球队。其实在设计方面Dunk是以Air Jordan 1代为设计原型，所以都拥有了极好的抓地性能和场地感，保证了那些优秀的球员在场上可以轻巧且稳定的运动，因此性能也不可挑剔。`,
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
      recommendList: [
        {
          title:
            "这边是标题这边是标题这边是标题这边是标题这边是标题这边是标题这边是标题这边是标题",
          avatar: "",
          name: "新闻小能手新闻小能手新闻小能手新闻小能手",
          add_time: "12-15 14:36",
          banner: "https://cdn.uviewui.com/uview/swiper/2.jpg",
        },
        {
          title: "这边是标题这边是标题这边是标题这边是标题",
          avatar: "",
          name: "新闻小能手",
          add_time: "12-15 14:36",
          banner: "https://cdn.uviewui.com/uview/swiper/2.jpg",
        },
        {
          title: "这边是标题这边是标题这边是标题这边是标题",
          avatar: "",
          name: "新闻小能手",
          add_time: "12-15 14:36",
          banner: "https://cdn.uviewui.com/uview/swiper/2.jpg",
        },
      ],
    };
  },
  onLoad(options) {
    console.log(this.$Route);
    this.getQueryObj();
  },
  methods: {
    // 获取文章对象
    getQueryObj() {
      let detail = this.$Route.query;
      if (detail.id) {
        this.detail = detail;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-right {
  margin-right: 30rpx;
  .u-icon {
    color: #666666;
    font-size: 42rpx;
    &:first-child {
      margin-right: 15rpx;
    }
  }
}
.detail-page {
  .detail_wrap {
    padding: 0 15px;
    .main_title {
      margin: 10rpx auto 0;
      color: #333333;
      font-size: 40rpx;
    }
    .inner_header {
      justify-content: space-between;
      margin: 30rpx auto;
      .left_wrap {
        .avatar_wrap {
          margin-right: 16rpx;
        }
        .right {
          .nickname {
            color: #333333;
            font-size: 26rpx;
          }
          .date {
            color: #999999;
            font-size: 24rpx;
            margin-top: 3rpx;
          }
        }
      }
      .right_wrap {
        .foucs_btn {
          width: 120rpx;
          color: #fff;
          font-size: 26rpx;
          text-align: center;
          line-height: 48rpx;
          border-radius: 13rpx;
          letter-spacing: 1px;
          background-color: #f04323;
        }
      }
    }
  }
  .handle_wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    margin: 30rpx auto 50rpx;
    .item_wrap {
      justify-content: center;
      width: 230rpx;
      line-height: 76rpx;
      border-radius: 100rpx;
      border: 1px solid #e5e5e5;
      .icon {
        width: 44rpx;
        margin-right: 10rpx;
      }
      .text {
        font-size: 24rpx;
      }
    }
  }
  .advert_wrap {
    .bottom_wrap {
      justify-content: space-between;
      padding: 20rpx 0;
      .left {
        color: #999999;
        font-size: 24rpx;
        .type_name {
          margin-right: 24rpx;
        }
      }
      .right {
        .u-icon {
          color: #999999;
          font-size: 24rpx;
        }
      }
    }
  }
  .recommend_wrap {
    padding: 0 15px;
    .item_list {
      margin-bottom: 30rpx;
      .item {
        display: flex;
        padding: 26rpx 0;
        border-bottom: 1px solid #e6e6e6;
        .left_wrap {
          flex: 1;
          margin-right: 26rpx;
          .title {
            color: #333333;
            font-size: 28rpx;
            letter-spacing: 1px;
          }
          .bottom {
            color: #999999;
            font-size: 24rpx;
            margin-top: 20rpx;
            .left {
              .name {
                width: 160rpx;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp:1;
                line-clamp: 1;
                -webkit-box-orient: vertical;
                word-break: break-all;
              }
              .u-avatar {
                margin-right: 15rpx;
              }
            }
            .add_time {
              margin-left: 14rpx;
            }
          }
        }
        .right_wrap {
          .banner {
            width: 250rpx;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
