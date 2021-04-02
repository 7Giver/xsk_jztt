<template>
	<view class="my-comment">
		<view class="main_title">全部评论</view>
		<view class="comment_list" v-if="commentList.length">
			<scroll-view :scroll-y="true" style="height: 100%;width: 100%;" @scrolltolower="reachBottom" >
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
							<view class="all-reply" @click="toAllReply(res.id)" v-if="res.subs.length">
								共{{ res.replys }}条回复
								<u-icon class="more" name="arrow-right" :size="26"></u-icon>
							</view>
						</view>
						<view class="bottom">
							{{ res.time_stamp | timeFrom }}
							<view class="reply" @click="emitShowReport(res.id)">回复TA</view>
						</view>
					</view>
				</view>
				<view class="loadmore">
					<u-loadmore :status="loadStatus"></u-loadmore>
				</view>
			</scroll-view>
		</view>
		<u-empty v-else text="暂无评论，快来抢沙发"></u-empty>
	</view>
</template>

<script>
/**
 * myComment 文章视频评论列表
 * @description 文章或视频底部评论区
 * @property {Number String} articleId 文章Id
 * @property {Array} commentList 评论数组
 * @event {Function} emitShowReport 派送父级id并展示评论组件
 */
import { articleComment, likeComment } from "@/api/home.js";
export default {
  name: 'myComment',
	data() {
		return {
			articleId: "", //文章id
			limit: 10,
			pageIndex: 1,
			loadStatus: "loadmore", // 加载状态
			commentList: []
		}
	},
	mounted() {
		// this.getComment();
	},
	methods: {
		toAllReply(id) {
			this.$Router.push({
				path: "/pages/comment/reply",
				query: {
					articleId: this.articleId,
					parentId: id
				}
			});
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
		// 触发滚动加载
    reachBottom() {
      if (this.commentList.length >= this.limit) {
        this.loadStatus = "loading";
        setTimeout(() => {
          this.getComment();
        }, 500);
      }
    },
		// 获取文章评论
    async getComment(id) {
			this.articleId ? this.articleId : this.articleId = id;
      let params = {
        token: this.vuex_token,
        article_id: this.articleId,
        page: this.pageIndex,
        limit: this.limit,
      };
      let { data } = await articleComment(params);
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
.comment_list {
	// height: 100vh;
	padding-bottom: 140rpx;
}
.main_title {
	color: #333333;
	font-size: 30rpx;
	font-weight: bold;
	padding: 20rpx 0 10rpx 30rpx;
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
