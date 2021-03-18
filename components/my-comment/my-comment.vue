<template>
	<view class="my-comment">
		<view class="main_title">全部评论</view>
		<template v-if="commentList.length">
			<view class="comment" v-for="(res, index) in commentList" :key="index">
				<view class="left"><image :src="res.avatar" mode="aspectFill"></image></view>
				<view class="right">
					<view class="top">
						<view class="name">{{ res.name }}</view>
						<view class="like" :class="{ highlight: res.is_like }" @click="postLike(res)">
							<view class="num">{{ res.likes }}</view>
							<u-icon v-if="!res.is_like" name="thumb-up" :size="30" color="#9a9a9a"></u-icon>
							<u-icon v-if="res.is_like" name="thumb-up-fill" :size="30"></u-icon>
						</view>
					</view>
					<view class="content">{{ res.content }}</view>
					<view class="reply-box" v-if="res.subs.length">
						<view class="item" v-for="(item, index) in res.subs" :key="item.index">
							<view class="username">{{ item.name }}</view>
							<view class="text">{{ item.content }}</view>
						</view>
						<view class="all-reply" @click="toAllReply" v-if="res.subs.length">
							共{{ res.subs.length }}条回复
							<u-icon class="more" name="arrow-right" :size="26"></u-icon>
						</view>
					</view>
					<view class="bottom">
						{{ res.time_stamp | timeFrom }}
						<view class="reply" @click="emitShowReport(res.id)">回复TA</view>
					</view>
				</view>
			</view>
		</template>
		<u-empty v-else text="暂无评论，快来抢沙发"></u-empty>
	</view>
</template>

<script>
/**
 * myComment 文章视频评论列表
 * @description 文章或视频底部评论区
 * @property {Array} commentList 评论数组
 * @event {Function} emitShowReport 派送父级id并展示评论组件
 */
import { likeComment } from "api/home.js";
export default {
  name: 'myComment',
	props: {
		commentList: {
			type: Array,
			default () {
				return []
			}
		}
	},
	methods: {
		toAllReply() {
			this.$Router.push({ path: "/pages/comment/reply" });
		},
		emitShowReport(id) {
      this.$emit("emitShowReport", id);
    },
		getLike(item) {
			item.is_like = !item.is_like;
			if (item.is_like == 1) {
				item.likes++;
			} else {
				item.likes--;
			}
		},
		async postLike(item) {
			let params = {
				token: this.vuex_token,
				id: item.id,
				type: item.is_like ? 2 : 1
			}
			let { data } = await likeComment(params);
			this.getLike(item);
		}
	}
};
</script>

<style lang="scss" scoped>
$mianColor: #F04323;
.main_title {
	color: #333333;
	font-size: 30rpx;
	font-weight: bold;
	padding: 20rpx 0 0 30rpx;
}
.u-empty {
	padding-top: 90rpx;
	zoom: 1.15;
}
.comment {
	display: flex;
	padding: 30rpx;
	.left {
		image {
			width: 62rpx;
			height: 62rpx;
			border-radius: 50%;
			background-color: #f2f2f2;
		}
	}
	.right {
		flex: 1;
		padding-left: 24rpx;
		font-size: 30rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 10rpx auto;
			.name {
				color: #333333;
				font-weight: bold;
			}
			.like {
				display: flex;
				align-items: center;
				color: #9a9a9a;
				font-size: 26rpx;
				.num {
					margin-right: 4rpx;
					color: #9a9a9a;
				}
			}
			.highlight {
				color: $mianColor;
				.num {
					color: $mianColor;
				}
			}
		}
		.content {
			margin-bottom: 10rpx;
		}
		.reply-box {
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			.item {
				padding: 20rpx;
				border-bottom: solid 2rpx $u-border-color;
				.username {
					font-size: 24rpx;
					color: #999999;
				}
			}
			.all-reply {
				padding: 20rpx;
				display: flex;
				color: $mianColor;
				align-items: center;
				.more {
					margin-left: 6rpx;
				}
			}
		}
		.bottom {
			margin-top: 20rpx;
			display: flex;
			font-size: 24rpx;
			color: #9a9a9a;
			.reply {
				color: $mianColor;
				margin-left: 20rpx;
			}
		}
	}
}
</style>
