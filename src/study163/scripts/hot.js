!function () {
	var ul=document.getElementById('J_hotlist');
	var timer=null;
	var data={
		type:'get',//请求类型
		asyn: true,
		url: '//study.163.com/webDev/hotcouresByCategory.htm'
	}
	data.success=function (data) {
		var d=JSON.parse(data);
		newUl();
		timer=setInterval(newUl,5000)
		function newUl() {
			ul.innerHTML='';
			
			for(var i=0;i<10;i++){
				var li=document.createElement('li');
				li.innerHTML='<img src="'+ d[i].smallPhotoUrl+'">'+
							 '<div class="r-side">'+
								 '<h4>'+d[i].name+'</h4>'+
								 '<i></i>'+
								 '<span>'+d[i].learnerCount+'</span>'+
							 '</div>';
				ul.appendChild(li);
			}
			d.push(d.shift());
		}
		
	}
	ajax(data);
}();