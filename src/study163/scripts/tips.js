'use strict';
(function () {
	var tips=document.getElementById('J_top-tips');
	var tipsClose=document.getElementById('J_tips-close');
	tips.style.display='none';
	var cookies=document.cookie;//读取cookie
	/*console.log(cookies);*/
	var k='tipsHidden=1';
	if (cookies.indexOf(k)==-1) {//判断cookie中是否存在'tipsHidden=1'值
		tips.style.display='block';//如过不存在，则显示tips通知条
		tipsClose.addEventListener('click', function () {
		tips.style.display='none'; //添加鼠标点击事件，点击关闭通知条
		document.cookie += k; 		//并在cookie上加上内容
		/*console.log(document.cookie);*/
		})
	}/*else {
		tips.style.display='none';//如果判断不存在
	} */
	
})();

