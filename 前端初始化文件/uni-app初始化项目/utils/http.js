export class SHttp {
	apiUrl = '';
	interceptor = {};
	/*
	 * apiUrl:为接口地址。
	 * interceptor:为拦截器。
	 */
	constructor({apiUrl, interceptor}) {
	    this.apiUrl = apiUrl;
		this.interceptor = interceptor;
	}
	post(path, data, options) {
		return this.request('POST', path, data || {}, options || '');
	}
	get(path, data, options) {
		return this.request('GET', path, data || {}, options || '');
	}

	request(method, path, data, options) {
		const { data: dataParsed, options:optionsParsed} = this.interceptor.request({data,options});
		return new Promise ((resolve, reject)=>{
			uni.request({
				url: this.apiUrl + path,
				method:method,
				header:{
					'content-type':optionsParsed || 'application/x-www-form-urlencoded',
				},
				data:dataParsed ,
				success:(res)=>{
					if(res.statusCode === 200){
						const resParsed = this.interceptor.response(res);
						resolve(resParsed)
					}else{
						const errParsed = this.interceptor.errResponse(res);
						reject(errParsed)
					}
				},
				fail:(err)=>{
					const errParsed = this.interceptor.errResponse(err);
					reject(errParsed)
				}
			})
		})
		
	}
}


