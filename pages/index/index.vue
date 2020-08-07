<template>
	<view>
		<u-navbar title="首页" :is-back="false"></u-navbar>
		<view class="content">
			<!-- 正文内容 -->
			<u-swiper :list="swiperlist"></u-swiper>
			<u-tabs :list="tablist" :is-scroll="true" :current="active" @change="change"></u-tabs>
			<water-full></water-full>
		</view>
		<u-tabbar v-model="current" :list="list1" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
import waterFull from '@/components/waterfull.vue'
export default {
	components:{
		waterFull
	},
	data() {
		return {
			tablist: [
				{
					name: '关注'
				},
				{
					name: '推荐'
				},
				{
					name: '电影'
				},
				{
					name: '电视剧'
				},
				{
					name: '小视频'
				},
				{
					name: '游戏'
				},
				{
					name: '校园'
				},
				{
					name:'影视'
				},
				{
					name:'音乐'
				}
			],
			active: 0,
			swiperlist: [
				{
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}
			],
			current: 0
		};
	},
	computed:{
		list1(){
			return this.$store.state.list1
		}
	},
	onLoad() {},
	methods: {
		change(index) {
			this.active = index;
		},
		getList(){
			let opts = {
				url:'http://m.kugou.com/?json=true',
				method:'get'
			}
			let param = {}
			this.$http.httpTokenRequest(opts,param).then(res=>{
				console.log('这是什么',res)
			})
		}
	}
};
</script>

<style lang="scss" scoped></style>
