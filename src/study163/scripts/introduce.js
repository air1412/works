/*机构介绍视频*/
!function (){
	var intVideo=document.getElementById('J_int_video');
	var videoWindow=document.getElementById('J_video_window');
	var video=videoWindow.getElementsByTagName('video')[0];
	var play=document.getElementById('J_video_play');
	var closeVideoWin=videoWindow.getElementsByTagName('i')[0];
	console.log(video)
	if (!!document.createElement('video').canPlayType) {
		//如果浏览器能播放视频，这执行函数
		openVideo();
	}
	else {
		//如果浏览器不能播放视频，提示用户
		document.getElementById('J_cant_play_video').style.display="block";
	}


	function openVideo () {
		/*弹出视频窗口*/
		addEventListener(intVideo,'click',function () {
			videoWindow.style.display='block';
			document.body.style.overflowY='hidden';
			/*重新加载视频*/
			video.load();
			play.style.display='block';
		})
		/*关闭视频窗口*/
		addEventListener(closeVideoWin,'click',function () {
			videoWindow.style.display='none';
			document.body.style.overflowY='auto';
			video.pause();
		})
		/*点击播放按钮开始播放*/
		addEventListener(play,'click',function () {
			video.play();
			play.style.display='none';
		})
		/*点击视频窗口，如果已经暂停，则开始播放，否则就暂停视频*/
		addEventListener(video,'click',function () {
			
			if (!video.paused) {
				video.pause();
				play.style.display='block';
			}else {
				video.play();
				play.style.display='none';
			}
		})
	}


}();
