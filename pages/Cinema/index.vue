<template>
	<view>
		<u-navbar back-text="返回" title="放映厅" :custom-back="back"></u-navbar>
		<view class="content">
			<view class="list">
				<view class="item" v-for="(item, index) in list" :key="index">
					<u-image width="100%" height="300rpx" :src="item.images.small"></u-image>
					<text>{{ item.title }}</text>
				</view>
			</view>
		</view>
		<u-tabbar v-model="current" :list="list1" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			src: 'http://img9.doubanio.com/view/photo/s_ratio_poster/public/p2615015805.jpg',
			current: 0,
			list: [],
			currenPage: 1,
			pageSize: 10
		};
	},
	computed: {
		list1() {
			return this.$store.state.list1;
		}
	},
	onLoad() {
		this.getList();
	},
	onReachBottom() {
		//这里重置数据发请求
		var self = this;
		uni.showLoading({
			success() {
				self.getList();
			}
		});
		setTimeout(function() {
			uni.stopPullDownRefresh(); //停止下拉刷新
		}, 1000);
	},
	methods: {
		back() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		getList() {
			let opts = {
				url: '/static/js/data/list.json',
				method: 'get'
			};
			let param = {};
			this.$http.httpTokenRequest(opts, param).then(res => {
				uni.hideLoading();
				// console.log('成功了吗', res.data.subjects);
				if (res.statusCode == 200) {
						res.data.subjects.map(item => {
							//处理防盗链图片
							item.images.small = item.images.small.replace(/^(http)[s]*(\:\/\/)/, 'https://images.weserv.nl/?url=');
							return;
						});
						let arr = res.data.subjects.slice((this.currenPage - 1) * this.pageSize, this.currenPage * this.pageSize)
						if (arr.length > 0) {
						this.list = this.list.concat(arr);
						this.currenPage += 1;
						// console.log('这是什么？',this.currenPage,arr,this.list)
					} else {
						uni.showToast({
							title: '没有更多了',
							icon: 'none'
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding: 40rpx 40rpx;
	.list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 49%;
		}
	}
}
.grid-text {
	font-size: 28rpx;
	margin-top: 4rpx;
	color: $u-type-info;
}
</style>
