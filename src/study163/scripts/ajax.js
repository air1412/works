/*
ajax封装
 */
function ajax(data) {
	//第一步 创建ajax对象
	var xhr = null;
	if (window.XMLHttpRequest) { //标准浏览器
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP"); //低版本IE
	}

	//第二部 准备发送一些请求
	var type = data.type == 'get' ? 'get' : 'post'; //请求方式
	var url = ''; //请求地址
	if (data.url) {
		url = data.url;
	}
	var flag = data.asyn == 'true' ? 'true' : 'false'; //请求方式，默认是true表示异步，false表示同步

	xhr.open(type, url, flag);

	//第三步 执行发送的动作
	xhr.send(null);

	//第四步 指定回调函数

	xhr.onreadystatechange = function() {
		if (this.readyState == 4) {//this指向xhr，4 浏览器已经接收到服务器返回的数据
			if (this.status==200) { //200表示http请求成功，404表示页面找不到，503服务器端有错
				/*var jsdata=JSON.parse(this.responseText)*/
				data.success(this.responseText);//接收服务器返回的数据
			}
		}
	}
}
/*(function () {
	var data={
		type:'get',//请求方式
		//请求地址
		//{
		//pageNo:当前页码
		//psize:每页返回数据个数
		//type:筛选类型（ 10：产品设计； 20： 编程语言）
		//}
		url:'http://study.163.com/webDev/couresByCategory.htm?pageNo=1&psize=10&type=10',
		//同步异步方式
		asyn:true,
		success:fn
	}
	function fn (e) {
		console.log(e)
	}
	console.log(data);
	console.log(ajax(data)) ;

})();*/



