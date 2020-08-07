<template>
	<view>
		<u-navbar back-text="返回" title="我的" :custom-back="back"></u-navbar>
		<view class="content">
			<u-avatar :src="src"></u-avatar>
			<u-grid :col="3" :border="false">
				<u-grid-item>
					<u-icon name="photo" :size="46"></u-icon>
					<view class="grid-text">观影记录</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">历史</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="star" :size="46"></u-icon>
					<view class="grid-text">收藏</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="heart" :size="46"></u-icon>
					<view class="grid-text">关注</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="setting" :size="46"></u-icon>
					<view class="grid-text">设置</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="account" :size="46"></u-icon>
					<view class="grid-text">个人信息</view>
				</u-grid-item>
			</u-grid>
		</view>
		<u-tabbar v-model="current" :list="list1" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: ['寒雨连江夜入吴', '平明送客楚山孤', '洛阳亲友如相问', '一片冰心在玉壶'],
			current: 0,
			src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
		};
	},
	computed: {
		list1() {
			return this.$store.state.list1;
		}
	},
	methods: {
		back() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.content {
		padding: 40rpx 40rpx;
	}
</style>
