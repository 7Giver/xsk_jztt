<template>
	<view class="reply_wrap">
		<u-navbar title="评论" :border-bottom="false"></u-navbar>
		<view class="comment">
			<view class="top">
				<view class="left">
					<view class="heart-photo"><image :src="comment.avatar" mode=""></image></view>
					<view class="user-info">
						<view class="name">{{ comment.name }}</view>
						<view class="date">{{ comment.time_stamp | timeFrom }}</view>
					</view>
				</view>
				<view class="right" :class="{ highlight: comment.is_like }">
					{{ comment.likes }}
					<u-icon v-if="!comment.is_like" name="thumb-up" class="like" color="#9a9a9a" :size="30" @click="postLike"></u-icon>
					<u-icon v-if="comment.is_like" name="thumb-up-fill" class="like" :size="30" @click="postLike"></u-icon>
				</view>
			</view>
			<view class="content">{{ comment.content }}</view>
		</view>
		<view class="all-reply">
			<view class="all-reply-top">全部回复</view>
			<scroll-view class="reply_list" :scroll-y="true" style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
				<view class="item" v-for="(item, index) in commentList" :key="index">
					<view class="comment">
						<view class="top">
							<view class="left">
								<view class="heart-photo"><image :src="item.avatar" mode=""></image></view>
								<view class="user-info">
									<view class="name">{{ item.name }}</view>
									<view class="date">{{ item.time_stamp | timeFrom }}</view>
								</view>
							</view>
							<view class="right" :class="{ highlight: item.is_like }">
								<view class="num">{{ item.likes }}</view>
								<u-icon v-if="!item.is_like" name="thumb-up" class="like" :size="30" color="#9a9a9a" @click="postLike(item)"></u-icon>
								<u-icon v-if="item.is_like" name="thumb-up-fill" class="like" :size="30" @click="postLike(item)"></u-icon>
							</view>
						</view>
						<!-- <view class="reply" v-if="item.reply">
							<view class="username">{{ item.reply.name }}</view>
							<view class="text">{{ item.reply.contentStr }}</view>
						</view> -->
						<view class="content">{{ item.content }}</view>
					</view>
				</view>
				<view class="loadmore">
					<u-loadmore :status="loadStatus"></u-loadmore>
				</view>
    	</scroll-view>
		</view>
	</view>
</template>

<script>
import { secondComment, likeComment } from "@/api/home.js";
export default {
	data() {
		return {
			articleId: "", // 文章id
			parentId: "",  // 父级评论id
			pageIndex: 1,
			limit: 10,
			comment: {}, // 父级评论对象
			commentList: [],
			loadStatus: "loadmore", // 加载状态
		};
	},
	onLoad(options) {
		this.articleId = options.articleId;
		this.parentId = options.parentId;
		// this.getReply();
		this.getComment();
	},
	methods: {
		// 点赞
		getLike(item) {
			if (item.parent_id) {
				item.is_like = !item.is_like;
				if (item.is_like == 1) {
					item.likes++;
				} else {
					item.likes--;
				}
			} else {
				if (this.comment.is_like == 1) {
					this.comment.is_like = !this.comment.is_like;
					this.comment.likes--;
				} else {
					this.comment.is_like = !this.comment.is_like;
					this.comment.likes++;
				}
			}
		},
		// 触发滚动加载
    reachBottom() {
      if (this.commentList.length >= this.limit) {
        this.loadStatus = "loading";
        setTimeout(() => {
          this.getComment();
        }, 500);
      }
    },
		// 请求二级评论列表
		async getComment() {
			let params = {
				token: this.vuex_token,
				article_id: this.articleId,
				page: this.pageIndex,
				limit: this.limit,
				comment_id: this.parentId
			}
			let { data } = await secondComment(params);
			this.comment = data.info;
			let result = data.list;
      if (data == null || result.length == 0) {
        // 加载结束
        this.loadStatus = "nomore";
        uni.stopPullDownRefresh();
        return;
      }
      this.commentList = this.commentList.concat(result);
      this.pageIndex++;
      if (result.length < this.limit) {
        // 一页不足的情况
        this.loadStatus = "nomore";
      } else {
        this.loadStatus = "loadmore";
      }
      uni.stopPullDownRefresh();
		},
		// 请求点赞
		async postLike(item) {
			let params = {
				token: this.vuex_token,
				id: item.id ? item.id : this.comment.id,
				type: item.is_like || this.comment.is_like ? 2 : 1
			}
			let { data } = await likeComment(params);
			this.getLike(item);
		},
		// 回复列表
		getReply() {
			this.comment = {
				id: 1,
				name: '叶轻眉',
				date: '12-25 18:58',
				content: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
				url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
				allReply: 12,
				likes: 33,
				isLikes: false
			};
			this.commentList = [
				{
					name: '新八几',
					date: '12-25 18:58',
					content: '不要乱打广告啊喂！虽然是真的超好用',
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					likes: 33,
					is_like: false,
					reply: {
						name: 'uview',
						contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
					}
				},
				{
					name: '叶轻眉1',
					date: '01-25 13:58',
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					content: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					allReply: 0,
					likes: 11,
					is_like: false,
					reply: {
						name: '粘粘',
						contentStr: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
					}
				},
				{
					name: '叶轻眉2',
					date: '03-25 13:58',
					content: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					allReply: 0,
					likes: 21,
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					is_like: false,
					allReply: 2,
					reply: {
						name: '豆包',
						contentStr: '想吃冰糖葫芦粘豆包，但没钱5555.........'
					}
				},
				{
					name: '叶轻眉3',
					date: '06-20 13:58',
					content: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					allReply: 0,
					likes: 150,
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					is_like: false
				}
			];
		},
	}
};
</script>

<style lang="scss" scoped>
$mianColor: #f04323;
page {
	background-color: #f2f2f2;
}
// .reply_wrap {
// 	display: flex;
// 	flex-direction: column;
// 	height: 100vh;
// }
.comment {
	padding: 30rpx;
	font-size: 32rpx;
	background-color: #ffffff;
	.top {
		display: flex;
		justify-content: space-between;
	}
	.content {
		color: #333;
		font-size: 30rpx;
		margin-top: 10rpx;
	}
	.left {
		display: flex;
		.heart-photo {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}
		.user-info {
			margin-left: 10rpx;
			.name {
				color: #333333;
				font-size: 28rpx;
				font-weight: bold;
				margin-bottom: 4rpx;
			}
			.date {
				font-size: 20rpx;
				color: $u-light-color;
			}
		}
	}
	.right {
		display: flex;
		font-size: 20rpx;
		align-items: center;
		color: #9a9a9a;
		.like {
			margin-left: 6rpx;
		}
		.num{
			font-size: 26rpx;
			color: #9a9a9a;
		}
	}
	.highlight {
		color: $mianColor;
		.num{
			color: $mianColor;
		}
	}
}
.all-reply {
	height: 100vh;
	margin-top: 10rpx;
	padding-top: 20rpx;
	background-color: #ffffff;
	.all-reply-top {
		margin-left: 20rpx;
		padding-left: 20rpx;
		border-left: solid 4rpx $mianColor;
		font-size: 30rpx;
		font-weight: bold;
	}
	.item {
		border-bottom: solid 2rpx $u-border-color;
	}
	.reply {
		padding: 20rpx;
		background-color: rgb(242, 242, 242);
		border-radius: 12rpx;
		margin: 10rpx 0;
		.username {
			font-size: 24rpx;
			color: #7a7a7a;
		}
	}
}
.loadmore {
  padding: 20rpx 0;
	background: #fff;
}
</style>
