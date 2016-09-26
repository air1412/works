/**
 * 全屏轮播图模块
 */
!function () {
	var ul= document.getElementById('J_slide_images');
	var lis= ul.getElementsByTagName('li');
	var k=0;
	var timer=null;//创建一个空对象，用来存放淡入的定时器
	var lisList=[];
	var pgs=document.getElementById('J_slide_full_pg').getElementsByTagName('li');

	addEventListener(ul.parentNode,'mouseenter',function () {
		clearInterval(slideTimer);
	});
	addEventListener(ul.parentNode,'mouseleave',function () {
		slideTimer=setInterval(slide,2000);
	});


	for (var i = 0; i < lis.length; i++) {
		//给每个图片li绑定对应的按钮小圆点
		lis[i].pg=pgs[i];
		//吧所有li元素添加到一个新的数组
		lisList[i]=lis[i];
		
	
	}

	for (var i = 0; i < lisList.length; i++) {
		/*给每个小圆点绑定一个鼠标点击 事件*/
		addEventListener(lisList[i].pg,'click',pgClick(i))
	}
	function pgClick (k) {
		return function () {
			clearInterval(timer);
			/*console.log(lis[k]);*/
			lisList.push(lis[k]);
			/*console.log(lisList);*/
			lisList[lisList.length-1].style.zIndex=lisList.length-1;
			/*console.log(lisList[k]);*/
			showPic();
			lisList=[];
			for (var i = k+1; i < lis.length; i++) {
				/*console.log(i);
				console.log(lisList);*/
				console.log(lis[i]);
				lisList.push(lis[i]);
				/*console.log(lisList[1]);*/
			}
			for (var i = 0; i <=k; i++) {
				lisList.push(lis[i]);
			}
			console.log(lisList);
		}
	}

	/**
	 * 建立一个数组	lisList，存放轮播图的列表
	 * 把数组的第一个元素放到最后
	 * 然后按顺序设置定位层级z-ingdex
	 * 使数组的最后一个对象显示在最上层
	 */
	sort();
	function sort () {
		var li=lisList.shift();
		lisList.push(li);
		for (var i = 0; i < lisList.length; i++) {
			lisList[i].style.zIndex=i;

		}
	}
	
	/**
	 * 轮播图片函数
	 * 
	 */
	function slide () {
		clearInterval(timer);
		sort();
		showPic();
		/*///*初始化小圆点的样式
		for (var i = 0; i < lisList.length; i++) {
			lisList[i].pg.className='';
		}
		///*给图片对应的小圆点设置classname，改变颜色
		lisList[lisList.length-1].pg.className='select';
		//*最上层的图片透明度设为0，
		//然后在500ms的渐变成1
		//实现淡入效果
	
		lisList[lisList.length-1].style.opacity=0;
		var t=0;
		timer=setInterval(function () {
			lisList[lisList.length-1].style.opacity=t;
			t+=0.02;
			//如果图片的透明度为1，清除定时器
			if (lisList[lisList.length-1].style.opacity>=1.0) {
				clearInterval(timer);

			}
		},25)*/
		
		
	}

	/*图片淡入效果*/
	function showPic () {
		///*初始化小圆点的样式
		for (var i = 0; i < lisList.length; i++) {
			lisList[i].pg.className='';
		}
		/*给图片对应的小圆点设置classname，改变颜色*/
		lisList[lisList.length-1].pg.className='select';
		/*最上层的图片透明度设为0，
		然后在500ms的渐变成1
		实现淡入效果
		*/
		lisList[lisList.length-1].style.opacity=0;
		var t=0;
		timer=setInterval(function () {
			lisList[lisList.length-1].style.opacity=t;
			t+=0.02;
			/*如果图片的透明度为1，清除定时器*/
			if (lisList[lisList.length-1].style.opacity>=1.0) {
				clearInterval(timer);

			}
		},25)
	}

	var slideTimer=null;
	slideTimer=setInterval(slide,2000);
	

}();