<script>
import Vue from 'vue';
import { SHttp } from '@/utils/http.js';
const wxsdk = require('utils/jweixin.js');
export default {
	onLaunch: function() {
		// 初始化SHttp
		const httpIns = new SHttp({
			apiUrl: 'http://shiyao.deo2o.net/',
			interceptor: {
				request: req => {
					const { data } = req;
					// 请求加入mid验证信息
					data.mid = uni.getStorageSync('mid');
					if (!data.mid) {
						uni.showToast({
							title:'请登录',
							icon:'none'
						})
						setTimeout(()=>{
							uni.reLaunch({
								url: '/pages/login/login'
							});
						},500)
					}
					const reqParsed = { ...req, data };
					return reqParsed;
				},
				response: res => {
					//成功回调
					if (res.data.msg == '请登录') {
						uni.showToast({
							title:'请登录',
							icon:'none'
						})
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}
					console.log('成功:', res);
					return res;
				},
				errResponse: err => {
					//错误回调
					console.log('错误:', err);
					switch (err.statusCode) {
						case 400:err.message = '请求错误(400)';
							break;
						case 401:err.message = '未授权，请重新登录(401)';
							break;
						case 403:err.message = '拒绝访问(403)';
							break;
						case 404:err.message = '请求出错(404)';
							break;
						case 408:err.message = '请求超时(408)';
							break;
						case 500:err.message = '服务器错误(500)';
							break;
						case 501:err.message = '服务未实现(501)';
							break;
						case 502:err.message = '网络错误(502)';
							break;
						case 503:err.message = '服务不可用(503)';
							break;
						case 504:err.message = '网络超时(504)';
							break;
						case 505:err.message = 'HTTP版本不受支持(505)';
							break;
						default:
							err.message = '连接出错';
					}
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
					return err;
				}
			}
		});
		Vue.prototype.$http = httpIns;
		console.log('httpIns', Vue.prototype);
		// let url = encodeURIComponent(location.href.split('#')[0])
		let url = location.href.split('#')[0]
		this.$http.post('Home/Index/jssdk',{url:url})
		.then(res=>{
			let data = res.data
			wxsdk.config({
			    beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
			    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId:data.appId, // 必填，企业微信的corpID
			    timestamp:data.timestamp, // 必填，生成签名的时间戳
			    nonceStr:data.nonceStr, // 必填，生成签名的随机串
			    signature:data.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
			    jsApiList:['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareWechat','shareAppMessage']
			});
			wxsdk.ready(()=> {
			   //禁用右上角菜单按钮
			   wxsdk.hideOptionMenu();                                
			});
		
		})
		.catch(err=>{})
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>
<style lang="scss">
@import './App.scss';
// text 文字
// s: 16rpx;
// m: 20rpx;
// l: 24rpx;
// xl: 30rpx;
// xxl: 70rpx;

// radius 圆角
// m: 4rpx;
// l: 8rpx;
// xl: 16rpx;
// xxl: 27rpx;
// circle: 100%;

// mar pad 间距
// s: 4rpx;
// m: 8rpx;
// l: 20rpx;
// xl: 30rpx;
// xxl: 50rpx;
</style>
