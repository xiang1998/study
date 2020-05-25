/*
  *	date:2020年4月1日
  * file:常用js方法
 */
 
/* 
  *   功能:实现dateadd功能(获取间隔时间)
  *   参数:interval,字符串表达式，表示要添加的时间间隔. 
  *   参数:number,数值表达式，表示要添加的时间间隔的个数. 
  *   参数:date,时间对象. 
  *   返回:新的时间对象. 
  *   var   now   =   new   Date(); 
  *   var   newDate   =   DateAdd( "d",1,now); 
  *---------------   DateAdd(interval,number,date)   ----------------- 
  */  
function DateAdd(interval,number,date){  
        switch(interval)  
        {  
                case   "y"   :   {  
                        date.setFullYear(date.getFullYear()+number);  
                        return   date;  
                        break;  
                }  
                case   "q"   :   {  
                        date.setMonth(date.getMonth()+number*3);  
                        return   date;  
                        break;  
                }  
                case   "m"   :   {  
                        date.setMonth(date.getMonth()+number);  
                        return  date ;  
                        break;  
                }  
                case   "w"   :   {  
                        date.setDate(date.getDate()+number*7);  
                        return   date;  
                        break;  
                }  
                case   "d"   :   {  
                        date.setDate(date.getDate()+number);  
                        return   date;  
                        break;  
                }  
                case   "h"   :   {  
                        date.setHours(date.getHours()+number);  
                        return   date;  
                        break;  
                }  
                case   "m"   :   {  
                        date.setMinutes(date.getMinutes()+number);  
                        return   date;  
                        break;  
                }  
                case   "s"   :   {  
                        date.setSeconds(date.getSeconds()+number);  
                        return   date;  
                        break;  
                }  
                default   :   {  
                        date.setDate(date.getDate()+number);  
                        return   date;  
                        break;  
                }  
        }  
}  

/* 
  *   功能:时间戳转换
  *   参数:interval,字符串表达式，表示要添加的时间间隔. 
  *   参数:number,数值表达式，表示要添加的时间戳. 
  *   参数:date,时间格式 'Y-M-D h:m:s'. 
  *   返回:新的时间日期. 
  *---------------   formatTime(number,format)   ----------------- 
  */  
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function formatTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

/* 
  *   功能:获取input本地路径
  *   参数:file：input Change事件获取的文件信息
  *   返回:文件路径. 
  *---------------   getObjectURL(file)   ----------------- 
  */  
function getObjectURL (file) {
	let url = null ;
	if (window.createObjectURL!=undefined) { // basic
		url = window.createObjectURL(file) ;
	}else if (window.webkitURL!=undefined) { // webkit or chrome
	  url = window.webkitURL.createObjectURL(file) ;
	}else if (window.URL!=undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file) ;
	}
	 return url ;
}

/* 
  *   功能:测试项目倒计时方法
  *   参数:ceshiDay:限定测试天数 , ceshiTime:测试剩余时间 该参数为callback
  *   返回:测试剩余时间. 
  *---------------   getObjectURL(ceshiDay,ceshiTime)   ----------------- 
  */  
function ceshiDaojishi(ceshiDay,callback){
	var new_time = Date.now();  //当前时间
	if(!uni.getStorageSync('ceshi_time')){
		uni.setStorageSync('ceshi_time',new_time)
	}
	var ceshi_times = uni.getStorageSync('ceshi_time') || new_time  //第一次登陆测试的时间
	var new_time = Date.now();  //更新当前时间
	var ceshiTime = ceshiDay - (new_time - ceshi_times) / (10000 * 60 * 60)  //剩余测试时间 
	console.log(ceshiTime,'剩余测试时间')
	if(ceshiTime <1 && ceshiTime > 0){
		ceshiTime = String(ceshiTime).replace(/^(.*\..{1}).*$/,"$1");  //当剩余时间不足1天时,按保留一位小数显示剩余时间
		ceshiTime = Number(ceshiTime); 
	} else if (ceshiTime >= 1){
		ceshiTime = Math.round(ceshiTime)  //当剩余时间大于等于一天时按整数天数计算显示剩余时间
	} else {
		ceshiTime = 0
	}
	console.log(ceshiTime)
	callback(ceshiTime);
};


module.exports = {
  DateAdd,
  formatTime,
  getObjectURL,
  ceshiDaojishi
}