/*
获取课程列表模块
 */

/*添加事件兼容ie函数*/
function addEventListener(el, e, fun) {
		if (el.addEventListener) {
			el.addEventListener(e, fun, false);
		} else if (el.attachEvent) { //兼容旧ie版本
			el.attachEvent('on'+e, fun);
		}
}
/*window可视区域变化监听函数*/
function windowOnresize (fun) {
	var oldResize=window.onresize;
	if(typeof window.onresize != 'function'){
		window.onresize=fun;
	}
	else{
		window.onresize=function () {
			oldResize();
			fun();
		}
	}
}

/*获取浏览器可视区域兼容函数*/
function client () {
	if(window.innerWidth != null){
		return{
			width:window.innerWidth,
			height:window.innerHight
		}
	}
	else if(document.compatMode === "CSS1Compat"){
		return{
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}

	}
	return{
			width:document.body.clientWidth,
			width:document.body.clientHeight
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
	var course=document.getElementById('J_course');
		/*设置发送请求的参数*/

	var sendData = {
		type:'get',//请求类型
		pageNo:1,//当前页数
		psize:15,//每页返回数据个数
		stype:10,//筛选类型（ 10：产品设计； 20： 编程语言）
		asyn: true,
		
		sendUrl: function() {
			sendData.url = '//study.163.com/webDev/couresByCategory.htm' + '?pageNo=' + sendData.pageNo + '&psize=' + sendData.psize + '&type=' + sendData.stype;
		}
	}
	setSendData();

	/*console.log(sendData);*/
	/*设置回调函数*/
	sendData.success=function (datas) {
		/*console.log(e);*/
		var e=JSON.parse(datas)
		course.innerHTML='';
		/*遍历获取到的课程数据，添加到li列表*/
		for (var i = 0; i < e.list.length; i++) {
			var eprice=e.list[i].price==0?'免费':'￥'+e.list[i].price;//如果价格为0，则显示免费
			var li=document.createElement('li');
			var div=document.createElement('div')
			li.innerHTML=
						  '<img src='+e.list[i].middlePhotoUrl+'>'+
					  	  '<h3>'+e.list[i].name+'</h3>'+
					      '<span>'+e.list[i].provider+'</span>'+
					 	  '<i>'+e.list[i].learnerCount+'</i>'+
					 	  '<em>'+eprice+'</em>';
			div.innerHTML = '<img src=' + e.list[i].middlePhotoUrl + '>' +
							'<h3>' + e.list[i].name + '</h3>' +
							'<span>发布者：' + e.list[i].provider + '</span>' +
							'<span class="categoryName">分类：' + e.list[i].categoryName + '</span>' +
							'<i>' + e.list[i].learnerCount + '人在学</i>' +
							'<em><p class="p">' + e.list[i].description + '</p></em>';
			div.style.display='none';
			div.className="course-popup";
			/*鼠标悬停弹出浮层*/
			addEventListener(li,'mouseenter',popUp(div));
			/*鼠标移开关闭浮层*/
			addEventListener(li,'mouseleave',popDown(div));
			li.appendChild(div);
			course.appendChild(li);

		}
		
		
	}
	var timer=null;
	function popUp (div) {
		return function () {
			/*悬停一秒后弹出悬浮层*/
			timer=setTimeout(function (argument) {
				div.style.display='block';
			},350);
			
		}
	}
	function popDown(div) {
		return function () {
			/*清除定时器*/
			clearTimeout(timer);
			div.style.display='none';
		}
	}

	sendData.sendUrl();
	function setSendData() {
		/*当窗口宽度小于1205px时，每页15个数据*/
		if (client().width<1205) {	
				
				sendData.psize=15;
				
			
		}
		/*当窗口宽度大于1205px时，每页20个数据*/
		else{		
				sendData.psize=20;
		}
	}

	
	windowOnresize(function () {
		/*当窗口宽度小于1205px时，每页15个数据*/
		if (client().width<1205) {	
			if (sendData.psize==20) {
				sendData.psize=15;
				sendData.sendUrl();
				ajax(sendData);
			}
		}
		/*当窗口宽度大于1205px时，每页20个数据*/
		else{
			if (sendData.psize==15) {
				sendData.psize=20;
				sendData.sendUrl();
				ajax(sendData);
			}		
				
		}
		
		sendData.sendUrl();
		ajax(sendData);
	});
	ajax(sendData);




	/*切换选项卡*/
	/*当选中产品设计时*/
	addEventListener(preocutDesin,'click',function () {
		preocutDesin.className='select';
		proLanguage.className='';
		sendData.pageNo=1;
		sendData.stype=10;
		pages(1)()
		/*sendData.sendUrl();
		ajax(sendData);*/
	});
		/*当选中编程语言时*/
	addEventListener(proLanguage,'click',function () {
		proLanguage.className='select';
		preocutDesin.className=''; 
		sendData.stype=20;
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
