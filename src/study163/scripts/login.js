/**
 * 登录弹窗模块
 */

!function () {
	var closelg=document.getElementById("J_close_loginwd");
	var loginwd=document.getElementById('J_login');
	var loginbg=document.getElementById('J_loginbg')
	/*兼容ie添加事件函数*/
	function addEventListener(el, e, fun) {
		if (el.addEventListener) {
			el.addEventListener(e, fun, false);
		} else if (el.attachEvent) { //兼容旧ie版本
			el.attachEvent('on'+e, fun);
		}
	}
	addEventListener(closelg,'click',function () {
		loginwd.style.display='none';
	})
	addEventListener(loginbg,'click',function () {
		
		loginwd.style.display='none';
	})
}()