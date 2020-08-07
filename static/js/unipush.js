
var bindAlias=function(alias) {
	var isAndorid, PushManager, context, Instance, GeTuiSdk;
 
	if(plus.os.name == 'Android') {
		isAndorid = true;
	} else {
		isAndorid = false;
	}
 
	if(isAndorid) {
		PushManager = plus.android.importClass("com.igexin.sdk.PushManager");
		context = plus.android.runtimeMainActivity().getContext();
		Instance = PushManager.getInstance();
	} else {
		GeTuiSdk = plus.ios.importClass("GeTuiSdk");
	}

    if(isAndorid){
       console.log('获取到cid==', Instance.getClientid(context));
       console.log('获取到版本号==', Instance.getVersion(context));
       console.log('获取到alias==', alias);
       //绑定别名
       Instance.bindAlias(context, alias);
     } else {
       GeTuiSdk.bindAliasandSequenceNum(alias, alias);
     }
	
	// this.bindAlias = function(alias) {
	// 	if(isAndorid) {
	// 		Instance.bindAlias(context, alias);
	// 	} else {
	// 		GeTuiSdk.bindAliasandSequenceNum(alias, alias);
	// 	}
	// }
 
	// this.unbindAlias = function(alias) {
	// 	if(isAndorid) {
	// 		Instance.unBindAlias(context, alias, true);
	// 	} else {
	// 		GeTuiSdk.unbindAliasandSequenceNumandIsSelf(alias, alias, true);
	// 	}
	// }
 
	// this.getVersion = function() {
	// 	if(isAndorid) {
	// 		return Instance.getVersion(context);
	// 	} else {
	// 		return GeTuiSdk.version;
	// 	}
	// }
 
	// //开启推送
	// this.turnOnPush = function() {
	// 	if(isAndorid) {
	// 		Instance.turnOnPush(context);
	// 	} else {
	// 		GeTuiSdk.setPushModeForOff(false);
	// 	}
	// }
 
	// //关闭推送
	// this.turnOffPush = function() {
	// 	if(isAndorid) {
	// 		Instance.turnOffPush(context);
	// 	} else {
	// 		GeTuiSdk.setPushModeForOff(true);
	// 	}
	// }
 
}

module.exports = {
        bindAlias : bindAlias
};