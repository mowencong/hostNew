<template>
	<view>
		<u-navbar back-text="返回" title="直播" :custom-back="back"></u-navbar>
		<u-notice-bar mode="horizontal" :more-icon="true" :close-icon="true" :list="list"></u-notice-bar>
		<view class="content">
		</view>
		<u-tabbar v-model="current" :list="list1" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: ['寒雨连江夜入吴', '平明送客楚山孤', '洛阳亲友如相问', '一片冰心在玉壶'],
			current:0
		};
	},
	computed:{
		list1(){
			return this.$store.state.list1
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

<style></style>
