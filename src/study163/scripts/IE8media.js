
/*IE8屏幕适应*/
!function () {
	var IE8media=document.getElementById('IE8media');
	if (IE8media!=null) {
			if (client().width<1206) {
				IE8media.href='/style/media.css';
			}else {
				IE8media.href='javascript:';
			}
		windowOnresize(function () {
			if (client().width<1206) {
				IE8media.href='/style/meidia.css';
			}else {
				IE8media.href='javascript:';
			}
			console.log(IE8media.href);
		})

	}
	
}()