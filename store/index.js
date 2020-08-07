import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		downloadTask: '',
		progress: {}, //下载进度
		list1: [
			{
				iconPath: 'home',
				pagePath: '/pages/index/index',
				selectedIconPath: 'home-fill',
				text: '首页',
				count: 2,
				isDot: true,
				customIcon: false
			},
			{
				iconPath: 'photo',
				pagePath: '/pages/Cinema/index',
				selectedIconPath: 'photo-fill',
				text: '放映厅',
				customIcon: false
			},
			{
				iconPath: 'https://cdn.uviewui.com/uview/common/min_button.png',
				pagePath:'/pages/release/index',
				selectedIconPath: 'https://cdn.uviewui.com/uview/common/min_button_select.png',
				text: '发布',
				midButton: true,
				customIcon: false
			},
			{
				iconPath: 'play-right',
				pagePath:'/pages/broadcast/index',
				selectedIconPath: 'play-right-fill',
				text: '直播',
				customIcon: false
			},
			{
				iconPath: 'account',
				pagePath: '/pages/mine/index',
				selectedIconPath: 'account-fill',
				text: '我的',
				count: 23,
				isDot: false,
				customIcon: false
			}
		],
	},
	mutations: {
		downloadAPP(state, data) {
			var wgtUrl = data.wgtUrl;
			if (!wgtUrl) {
				wgtUrl = data.appUrl;
			}
			console.log('更新包地址', wgtUrl)
			plus.nativeUI.showWaiting("下载更新文件...");
			state.downloadTask = uni.downloadFile({
				url: wgtUrl,
				success: (res) => {
					if (res.statusCode === 200) {
						store.commit('installWgt', res.tempFilePath); //安装wgt包
					}
				},
				fail: (res) => {
					plus.nativeUI.alert("下载失败！");
				}
			});
			state.downloadTask.onProgressUpdate((res) => {
				if (state.progress.progress < res.progress) {
					state.progress = res
				}
			});
		},
		installWgt(state, path) {
			plus.nativeUI.showWaiting("安装更新文件...");
			plus.runtime.install(path, {}, function() {
				plus.nativeUI.closeWaiting();
				plus.nativeUI.alert("应用资源更新完成！", function() {
					plus.runtime.restart();
				});
			}, function(e) {
				plus.nativeUI.closeWaiting();
				plus.nativeUI.alert("安装更新文件失败[" + e.code + "]：" + e.message);
				if (e.code == 10) {
					alert('请清除临时目录');
				}
			});
		},
	},
	actions: {
		updateApp({
			commit,
			state
		}, is_force) {
			let the_date = new Date().toDateString();
			let device = uni.getSystemInfoSync().platform;
			let json_path = '';
			if (device.toLowerCase() == 'android') {
				json_path = 'android'
			} else {
				json_path = 'ios'
				return;
			}
			state.device = json_path;
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				uni.request({
					url: Vue.prototype.apiUrl('/site/upgrade/' + json_path) + '?t=' + new Date().getTime(), //检查更新的服务器地址
					data: {
						appid: plus.runtime.appid,
						version: plus.runtime.version,
						imei: plus.device.imei
					},
					success: (result) => {
						var data = result.data;
						let cur_v = '1';
						let pass_v = '0';
						try {
							cur_v = parseInt(data.ver.split('.').join(''));
							if (isNaN(cur_v)) {
								cur_v = 1;
							}
							pass_v = parseInt(widgetInfo.version.split('.').join(''));
							if (isNaN(pass_v)) {
								pass_v = 0;
							}
						} catch (e) {}
						if (cur_v > pass_v && data.wgtUrl) {
							uni.showModal({
								title: '更新提示',
								content: data.msg || '检测到有数据包更新，是否进行更新？',
								confirmText: '立即进行',
								success: function(res) {
									if (res.confirm) {
										commit('downloadAPP', data)
									} else if (res.cancel) {}
								}
							});

						} else {
							if (is_force) {
								uni.showToast({
									title: '当前是已最新版本',
									icon: 'none'
								})
							}
						}
					},
					fail(e) {
						console.error(e);
						if (e) {
							uni.showToast({
								title: '更新失败,请联系客服!',
								icon: 'none',
							})
						}
					}
				});

			});
		},
	}
})
export default store
