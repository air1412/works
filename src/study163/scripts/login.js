/**
 * 登录弹窗模块
 */

! function() {



	var closelg = document.getElementById("J_close_loginwd");
	var loginwd = document.getElementById('J_login');
	var loginbg = document.getElementById('J_loginbg')

	/*点击x关闭登录框*/
	addEventListener(closelg, 'click', function() {
		loginwd.style.display = 'none';
		document.body.style.overflowY='auto';
	})
	addEventListener(loginbg, 'click', function() {
			document.body.style.overflowY='auto';
			loginwd.style.display = 'none';
		})
		/**
		 * 登录表单验证
		 */
	var userName = document.getElementById('userName');
	var password = document.getElementById('password');
	var button = document.getElementById('J_login_buttom');
	var tips = document.getElementById('J_login_validation');
	/*输入框鼠标焦点事件，清空内容*/
	addEventListener(userName, 'focus', onFocus);
	addEventListener(userName,'blur',outFocus);
	addEventListener(password, 'focus', onFocus);
	addEventListener(password,'blur',outFocus);
	/**
	 * 输入框获得焦点
	 * 清空输入值
	 * 隐藏输入提示信息
	 */
	function onFocus(event) {
		var e = event || window.event;
		var target = e.target || e.srcElement;
		target.value = '';
		target.parentNode.lastChild.style.display='none';
		
	}
	/**
	 * 输入框失去焦点
	 * 如果没有输入值，显示输入提示信息
	 * 
	 */
	function outFocus (event) {
		var e = event || window.event;
		var target = e.target || e.srcElement;
		
		if (!target.value) {
			target.parentNode.lastChild.style.display='block';
		}
	}

	/**
	 * 登陆按钮点击事件
	 * 判断是否已经输入账号密码
	 * 把输入的账号密码进行md5加密，传送给后台，根据返回的数据判断是否输入正确
	 */

	addEventListener(button, 'click', function(e) {
		var e = e || window.event;
		console.log(userName.value);
		console.log(password.value);
		var data = {
				type: 'get', //请求类型
				asyn: true,
				url: '//study.163.com/webDev/login.htm' + '?userName=' + MD5(userName.value) + '&password=' + MD5(password.value)
			}
			/*处理服务器返回数据的回调函数*/
		data.success = function(data) {
			if (data == 0) {
				/*如果账号密码错误，提示用户继续输入*/
				tips.innerHTML = '账号或密码错误!请重新输入！';
			} else {
				tips.innerHTML = '';
				/*如果账号密码正确，执行函数*/
				/*设置登录cookie*/
				setCookie('loginSuc', 1)
				loginSuccessful();
				document.body.style.overflow='auto';
			}
		};
		/*向服务器发送请求之前先判断用户是否已经输入*/
		if (userName.value == '') {
			tips.innerHTML = '请输入账号!'
		} else if (password.value == '') {
			tips.innerHTML = '请输入密码!'
		} else {
			/*如果用户已经输入，则向服务器发送请求*/
			ajax(data);
		}

		/*阻止默认的button事件*/
		stopDefault(e);
	})

	/*关注模块*/
	var attention = document.getElementById('J_attention');
	var focused = document.getElementById('J_focused');
	var fans = document.getElementById('J_fans');
	var cFocuse = focused.getElementsByTagName('span')[0];
	/*如果已登录并且已经关注，直接调用关注成功函数*/
	if (getCookie().loginSuc && getCookie().followSuc) {
		attentioned();
	}
	/**
	 * 给关注按钮添加点击事件，
	 * 首先登录的cookie是否已经设置(loginSuc);
	 * 如未设置，则弹出登录框;
	 */
	addEventListener(attention, 'click', function() {
		/*alert(1);*/
		var cookies = getCookie();
		/*查看本地cookie，如果登录的cookie没有设置，则弹出登录框登录*/
		if (!cookies.loginSuc) {
			loginwd.style.display = 'block';
			/*初始化登录框内的数据*/
			userName.value='';
			userName.parentNode.lastChild.style.display='block';
			password.value='';
			password.parentNode.lastChild.style.display='block';
			/*q取消Y方向的滚动条*/
			document.body.style.overflowY='hidden';
		} else {
			/*如果已经设置登录cookie,直接调用登录成功函数发送关注请求*/
			loginSuccessful();
		}
	})


	/**
	 * 登录成功调用函数：
	 * 设置登录cookie(loginSuc)
	 * 调用关注API，并设置关注成功的cookie（followSuc）
	 * “关注”按钮变成不可点的“已关注”状态。
	 */
	function loginSuccessful() {
		
		
			//调用关注api,并设置关注成功的cookie（followSuc）
		var data = {
			type: 'get',
			asyn: true,
			url: '//study.163.com/webDev/attention.htm',
		};
		data.success = function(data) {
			if (data == 1) {
				attentioned();
				setCookie('followSuc', 1);
				console.log(data);
			}
		}
		ajax(data);
	}
	/**
	 * 关注成功后调用函数
	 * @return {[type]} [description]
	 */
	function attentioned() {

		attention.style.visibility = 'hidden';
		focused.style.display = 'block';
		fans.style.marginLeft = '60px';
		loginwd.style.display = 'none';

	}
	/*取消关注*/
	addEventListener(cFocuse, 'click', function() {
		attention.style.visibility = 'visible';
		focused.style.display = 'none';
		fans.style.marginLeft = '14px';
		removeCookie('followSuc');
	})
	/*鼠标点击时取消输入提示信息函数*/
	var userNameText=document.getElementById('J_userName_test');
	var passwordText=document.getElementById('J_password_test');
	function deleteText () {
		userNameText.innerHTML='123';

	}
}();
/**
 * 阻止浏览器默认事件函数兼容写法
 
 */
function stopDefault(e) {
	//阻止默认浏览器动作(W3C) 
	if (e && e.preventDefault)
		e.preventDefault();
	//IE中阻止函数器默认动作的方式 
	else
		window.event.returnValue = false;
	return false;
}