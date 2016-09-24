/*
获取课程列表模块
 */
function addEventListener(el, e, fun) {
		if (el.addEventListener) {
			el.addEventListener(e, fun, false);
		} else if (el.attachEvent) { //兼容旧ie版本
			el.attachEvent('on'+e, fun);
		}
}

(function () {
	/*
	兼容ie的添加事件函数
	参数：el 事件对象；e 事件类型；fun 事件触发函数
	 */
	
	//给选项卡添加鼠标点击事件
	var JCourseTabes=document.getElementById('J_course-tabs');
	var preocutDesin=JCourseTabes.children[0];
	var proLanguage=JCourseTabes.children[1];
		/*设置发送请求的参数*/
	var sendData = {
		type:'get',//请求类型
		pageNo:1,//当前页数
		psize:20,//每页返回数据个数
		type:10,//筛选类型（ 10：产品设计； 20： 编程语言）
		asyn: true,
		url: '//study.163.com/webDev/couresByCategory.htm' + '?pageNo=' + 1 + '&psize=' + 20 + '&type=' + 10,
		sendUrl: function() {
			sendData.url = '//study.163.com/webDev/couresByCategory.htm' + '?pageNo=' + sendData.pageNo + '&psize=' + sendData.psize + '&type=' + sendData.type;
		}
	}
	
	/*console.log(sendData);*/
	/*设置回调函数*/
	sendData.success=function (e) {
		/*console.log(e);*/
		var course=document.getElementById('J_course');
		course.innerHTML='';
		/*遍历获取到的课程数据，添加到li列表*/
		for (var i = 0; i < e.list.length; i++) {
			var eprice=e.list[i].price==0?'免费':'￥'+e.list[i].price;//如果价格为0，则显示免费
			course.innerHTML+='<li>'+
								  '<img src='+e.list[i].middlePhotoUrl+'>'+
							  	  '<h3>'+e.list[i].name+'</h3>'+
							      '<span>'+e.list[i].provider+'</span>'+
							 	  '<i>'+e.list[i].learnerCount+'</i>'+
							 	  '<em>'+eprice+'</em>'+
						 	  '</li>';
		}

		
	}	
	
	ajax(sendData);//初始化数据


	/*切换选项卡*/
	/*当选中产品设计时*/
	addEventListener(preocutDesin,'click',function () {
		preocutDesin.className='select';
		proLanguage.className='';
		sendData.pageNo=1;
		sendData.type=10;
		pages(1)()
		/*sendData.sendUrl();
		ajax(sendData);*/
	});
		/*当选中编程语言时*/
	addEventListener(proLanguage,'click',function () {
		proLanguage.className='select';
		preocutDesin.className=''; 
		sendData.type=20;
		/*sendData.sendUrl();
		ajax(sendData);*/
		pages(1)();
	});
	
	var page=document.getElementById('J_course_page');
	var lis=page.getElementsByTagName('li');
	/*封装一个页面函数*/
	function pages (i) {
		return function () {
			sendData.pageNo=i;//获取要打开的页码*/
			/*console.log(sendData);*/
			for (var j=0;j<lis.length;j++){
				lis[j].className='';
			}
			lis[i-1].className='select';
			sendData.sendUrl();
			ajax(sendData);

		}
	}


	/*添加鼠标点击事件，点击页码进入相应的页面*/
	for (var i = 0; i < lis.length; i++) {
		addEventListener(lis[i],'click',pages(i+1));
	}

	/*前一页和后一页*/
	var prePage=document.getElementById('J_course_prepage');
	var nextPage=document.getElementById('J_course_nextpage');
	/*前一页*/
	addEventListener(prePage,'click',function () {
		/*alert(sendData.pageNo);*/
		if (sendData.pageNo>1) {
			pages(sendData.pageNo-1)();
		}
	})
	/*后一页*/
	nextPage.onselectstart='return false';
	addEventListener(nextPage,'click',function () {
		if (sendData.pageNo<lis.length) {
			pages(sendData.pageNo+1)();
		}
	})
})();