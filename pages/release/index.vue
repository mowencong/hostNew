<template>
	<view>
		<u-navbar back-text="返回" title="发布" :custom-back="back"></u-navbar>
		<u-notice-bar mode="horizontal" :more-icon="true" :close-icon="true" :list="list"></u-notice-bar>
		<view class="content">
			<u-form :model="form" ref="uForm">
				<u-form-item label="姓名" prop="name"><u-input v-model="form.name" /></u-form-item>
				<u-form-item label="简介" prop="intro"><u-input v-model="form.intro" /></u-form-item>
				<u-form-item label="性别" prop="sex">
					<u-input v-model="form.sex" type="select" @click="show = true" :select-open="show"/>
					<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
				</u-form-item>
				<u-form-item label="水果">
					<u-checkbox-group>
						<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index" :name="item.name">{{ item.name }}</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="味道">
					<u-radio-group v-model="radio">
						<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled">{{ item.name }}</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="开关"><u-switch slot="right" v-model="switchVal"></u-switch></u-form-item>
			</u-form>
			<u-button @click="submit">提交</u-button>
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
			show: false,
			actionSheetList: [
				{
					text: '男'
				},
				{
					text: '女'
				},
				{
					text: '保密'
				}
			],
			form: {
				name: '',
				intro: '',
				sex: ''
			},
			checkboxList: [
				{
					name: '苹果',
					checked: false,
					disabled: false
				},
				{
					name: '雪梨',
					checked: false,
					disabled: false
				},
				{
					name: '柠檬',
					checked: false,
					disabled: false
				}
			],
			radioList: [
				{
					name: '鲜甜',
					disabled: false
				},
				{
					name: '麻辣',
					disabled: false
				}
			],
			radio: '',
			switchVal: false,
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				],
				intro: [
					{
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change'
					}
				]
			}
		};
	},
	computed: {
		list1() {
			return this.$store.state.list1;
		}
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		console.log('触发了吗');
		this.$refs.uForm.setRules(this.rules);
		console.log('完成了吗');
	},
	methods: {
		back() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		actionSheetCallback(index){
			this.form.sex = this.actionSheetList[index].text;
		},
		//提交
		submit() {
			console.log('进来了吗', this.$refs.uForm);
			this.$refs.uForm.validate(valid => {
				console.log('条件允许吗');
				if (valid) {
					console.log('验证通过');
				} else {
					console.log('验证失败');
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding: 0 40rpx;
}
</style>
