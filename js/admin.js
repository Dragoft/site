
adminKey = '';
visit = '';
page = 1;



function login() {
	adminKey = document.querySelector('.t1').value.toString();
	adminKey64 = $.base64.encode(adminKey);

	fetch('https://tatsuno.top/admin.api', {
		method: "POST",
		headers: {
			"Authorization": 0,
			"Token": adminKey64
		}
	})
	.then(response => {return response.json();})
	.then(json => check(json))
	.catch(err => console.error('Request Failed', err)); 

	function check(data) {
		if (data['login']==1) {
			$('.b1').html(`
				<div class="t5" >
					<span class="t10" ></span>
					<a class="t7" id="b1" href="javascript:;" onclick="BTNall()" style="margin-left: -5px;" >综合面板</a><a class="t7" id="b2" href="javascript:;" onclick="BTNaddremark()" >发表留言</a><a class="t7" id="b3" href="javascript:;" onclick="BTNdelete()" >删除留言</a><a class="t7" id="b4" href="javascript:;" onclick="BTNbase64()" >Base64</a>
				</div>

				<div class="t6" ></div>

				<div class="t8" ></div>
				<pre class="t1 t12"></pre>
				<textarea class="t13" ></textarea>
				<a class="t14" href="javascript:;" onclick="copyToClipboard()" >复制</a>
				<div class="t22" >
					<div class="t25" >
						<span class="t24" >第</span>
						<textarea class="t1 t23" maxlength="3" onfocus="this.select();" >1</textarea>
						<span class="t24" >页:</span>
					</div>
					<a class="t15" href="javascript:;" onclick="loadComment(page)" >刷新</a>
				</div>
			`);

			BTNall()
			loadComment(page);

			// 跳转页面
			$('.t23').on('keyup', function () {
				 if(event.which == 13){
					var Tpage = Number(document.querySelector('.t23').value);
					document.querySelector('.t23').value = page;
					$('.t23').focus()

					if (typeof Tpage === 'number') {
						if (Tpage != page) {
							page = Tpage;
							loadComment(page);
							document.querySelector('.t23').value = page;
							$('.t23').focus()
						}
					}
				}
			})



		} else {
			alert('密码错误');
		} 
	}
}



function BTNall() {
	$('.t7').removeClass('t7-active');
	$('#b1').addClass('t7-active');

	$('.t6').html(`
		<div class="t9" >综合面板</div>
		<br />
		<span>访客数: </span>
		<br />
		<textarea class="t1 t27 c1" maxlength="10" ></textarea>
		<a class="t4 t28" href="javascript:;" onclick="changeVisit()" >更新</a>
		<a class="t4 t29" href="javascript:;" onclick="getVisit()" >刷新</a>
		<br />
		<br />
		<span>adminKey: </span>
		<br />
		<input class="t1 t27 c2" maxlength="10" type="password" ></input>
		<a class="t4 t28" href="javascript:;" onclick="changeCode()" >更新</a>
		<br />
		<br />
		<span>已上线: </span>
		<br />
		<textarea class="t1 t27 c3" maxlength="10" ></textarea>
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<div class="t9" >关于此 admin 系统</div>
		<br />
		<span>这里是 tatsuno.top/ 的网站后台管理系统，欢迎回来！</span>
		<br />
		<br />
		<span>介绍:</span>
		<br />
		<span>此管理系统由 Tatsuno Yuu 于 2024/6/9 完成开发，使用了 Mervi 的json渲染工具。当前版本:　[BETA 0.00.012]</span>
		<br />
		<span>其意义在于通过前端的简单操作，控制后台的数据库，节省时间！</span>
		<br />
		<br />
		<br />
		<br />
		<span>Copyright © 2023-` + new Date().getFullYear() + ` Tatsuno Yuu.</span>
	`);

	if (visit=='') {
		getVisit();
	} else {
		document.querySelector('.c1').value = visit;
	}
	getTime();
	document.querySelector('.c2').value = adminKey;
}



function BTNaddremark() {
	$('.t7').removeClass('t7-active');
	$('#b2').addClass('t7-active');

	$('.t6').html(`
		<div class="t9" >基本参数</div>
		<br />
		<textarea class="t1 t16" maxlength="20" placeholder="昵称" ></textarea>
		<br />
		<br />
		<textarea class="t1 t17" maxlength="100" placeholder="留言" ></textarea>
		<br />
		<span class="t26" >剩余 100 字</span>
		<br />
		<br />
		<br />
		<br />
		<br />
		<div class="t9" >高级设置</div>
		<br />

		<span>Deletable: </span>
		<select id="fruits" class="t18 t19">
			<option value="0">0</option>
			<option value="1" selected="selected">1</option>
			<option value="2">2</option>
		</select>
		<br />
		<br />

		<span>ID: </span>
		<textarea class="t1 t20" maxlength="19" placeholder="ID" ></textarea>
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<a class="t4 t21" href="javascript:;" onclick="sent()" >留 言</a>
		<br />
		<br />
		<br />
	`);

	// 统计字数
	$('.t17').on('keyup', function () {
		if (document.querySelector('.t17').value.length>=90) {
			$('.t26').css('color', 'rgba(255, 50, 50, 0.7)');
		} else {
			$('.t26').css('color', 'rgba(151, 153, 153, 1)');
		}
		var n = 100 - document.querySelector('.t17').value.length;
		document.querySelector('.t26').innerHTML = '剩余 ' + n + ' 字';
	})
}



function BTNdelete() {
	$('.t7').removeClass('t7-active');
	$('#b3').addClass('t7-active');

	$('.t6').html(`
		<div class="t9" >基本参数</div>
		<br />
		<span>注意，此 api 无视留言的 Deletable 值，这意味着它可以删除一切留言数据。请小心操作！</span>
		<br />
		<span>输入留言的 ID 即可将其删除。</span>
		<br />
		<br />
		<br />
		<span>ID:</span>
		<textarea class="t1 t20" maxlength="19" placeholder="ID" ></textarea>
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<a class="t4 t21" href="javascript:;" onclick="deleteComment()" >删 除</a>
		<br />
		<br />
		<br />
	`);
}



function BTNbase64() {
	$('.t7').removeClass('t7-active');
	$('#b4').addClass('t7-active');

	$('.t6').html(`
		<div class="t9" >Base64 编码</div>
		<br />
		<textarea class="t1 t30" placeholder="输入" ></textarea>
		<br />
		<br />
		<textarea class="t1 t31" placeholder="输出" ></textarea>
		<br />
		<br />
		<br />
		<br />
		<br />
		<a class="t4 t21" href="javascript:;" onclick="b64(1)" >编码</a>
		<a class="t4 t21" href="javascript:;" style="margin-left: 10px;" onclick="b64(2)" >解码</a>
		<a class="t4 t21" href="javascript:;" style="margin-left: 10px;" onclick="b64(3)" >交换</a>
		<br />
		<br />
		<br />
	`);
}






function loadComment(page) {
	fetch('https://tatsuno.top/remark.api', {
		method: "POST",
		headers: {
			"Authorization": 2,
			"Token": (page - 1) * 10
		}
	})
	.then(response => {return response.json();})
	.then(json => showComment(json)); 
}

function showComment(data) {
	var box = document.querySelector('.t8');
	box.innerHTML = '';

	var textbox = document.querySelector('.t13');
	textbox.innerHTML = JSON.stringify(data);
	commentData = data;

	for (var i = 0; i < data['results'].length; i++) {
		var span = document.createElement('span');
		span.setAttribute('class', 'comment');
		box.appendChild(span);

		// 昵称
		var span1 = document.createElement('span');
		span1.innerText = $.base64.decode(data['results'][i]['name']) + ':  ';
		span1.setAttribute('class', 'title');
		span.appendChild(span1);

		// 内容
		var span2 = document.createElement('span');
		span2.innerText = $.base64.decode(data['results'][i]['content']);
		span2.setAttribute('class', 'content');
		span.appendChild(span2);

		if (span2.offsetHeight>120) {
			span2.setAttribute('style', 'height: 120px');

			var span4 = document.createElement('span');
			span4.innerHTML = '[ 展开 ]';
			span4.setAttribute('class', 'open');
			span4.setAttribute('onclick', '$(this).css("display", "none");$(this).siblings(".content").css("height", "unset");');
			span.appendChild(span4);
		}

		// 日期
		var span3 = document.createElement('span');
		span3.innerText = '[' + data['results'][i]['id'].substring(0, 16) + ']';
		span3.setAttribute('class', 'time');
		span.appendChild(span3);

		if (data['results'][i]['deletable']=="1") {
			var a = document.createElement('a');
			a.innerHTML = '删除'
			a.setAttribute('class', 'delete');
			span3.appendChild(a);
		}

		if (data['results'][i]['deletable']=="2") {
			var span5 = document.createElement('span');
			span5.innerHTML = 'admin'
			span5.setAttribute('class', 'admin');
			span3.appendChild(span5);
		}
	}


	var options = {
		 collapsed: false,
		withQuotes: true
	};
	$('.t12').jsonViewer(data, options);
}



function copyToClipboard() {
	var textbox = document.querySelector('.t13');
	textbox.select();
	document.execCommand('copy');
}



function sent() {
	var nicknameBox = document.querySelector('.t16');
	var cotentBox = document.querySelector('.t17');

	var name = nicknameBox.value;
	var content = cotentBox.value;
	var name64 = $.base64.encode(name);
	var content64 = $.base64.encode(content);

	var id = document.querySelector('.t20').value;
	var d = document.querySelector('.t19').value;



	if (name=='') {return};
	if (content=='') {return};
	if (adminKey=='') {return};
	if (id=='') {var id = 'null'};

	
	fetch('https://tatsuno.top/admin.api', {
		method: "POST",
		headers: {
			"Authorization": 1,
			"Token": adminKey64 + "###" + id + "###" + d + "###" + name64 + "###" + content64
		}
	})
	.then(response => {return response.json();})
	.catch(err => console.error('Request Failed', err)); 

	cotentBox.value = '';
	setTimeout(function (){
		loadComment(1);
	},1500)

}



function deleteComment() {
	var Box = document.querySelector('.t20');
	var id = Box.value;

	if (adminKey=='') {return};
	if (id.length!=19) {return};

	fetch('https://tatsuno.top/admin.api', {
		method: "POST",
		headers: {
			"Authorization": 2,
			"Token": adminKey64 + "###" + id
		}
	})
	.then(response => {return response.json();})
	.catch(err => console.error('Request Failed', err)); 


	Box.value = '';
	setTimeout(function (){
		loadComment(1);
	},1500)

}



function getVisit() {
	fetch('https://tatsuno.top/counter.api', {
		method: "POST",
		headers: {
			"Token": 0
		}
	})
	.then(response => {return response.json();})
	.then(json => counter(json))
	.catch(err => console.error('Request Failed', err)); 

	function counter(data) {
		document.querySelector('.c1').value = data['content'];
		visit = data['content'];
	}
}



function getTime() {
	var seconds = 1000
	var minutes = seconds * 60
	var hours = minutes * 60
	var days = hours * 24
	var years = days * 365
	var today = new Date()
	var todaySecond = today.getSeconds()
	var t1 = Date.UTC(2023,1,3,11,23,35)
	var t2 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds())
	var diff = t2-t1
	var diffYears = Math.floor(diff/years)
	var diffDays = Math.floor((diff/days)-diffYears*365)
	var diffHours = Math.floor((diff-(diffYears*365+diffDays)*days)/hours)
	var diffMinutes = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours)/minutes)
	var diffSeconds = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours-diffMinutes*minutes)/seconds)
	var runtime = diffYears*365+diffDays;
	document.querySelector('.c3').value = runtime + ' 天';
}



function changeVisit() {
	var Box = document.querySelector('.c1');
	var visit = Number(Box.value);

	if (visit==NaN) {return};
	if (visit<0) {return};
	if (adminKey=='') {return};


	fetch('https://tatsuno.top/admin.api', {
		method: "POST",
		headers: {
			"Authorization": 3,
			"Token": adminKey64 + "###" + visit
		}
	})
	.then(response => {return response.json();})
	.catch(err => console.error('Request Failed', err)); 

	setTimeout(function (){
		getTime();
	},1500)
}



function changeCode() {
	var Box = document.querySelector('.c2');
	var code = Box.value

	if (code=='') {return};
	if (adminKey=='') {return};
	if (adminKey==code) {return};

	var check = prompt("请输入原来的 adminKey", "");
	if (check!=null) {
		if (check!=adminKey) {
			alert('输入值有误')
			return;
		}
	} else {
		alert('操作取消')
		return;
	}

	fetch('https://tatsuno.top/admin.api', {
		method: "POST",
		headers: {
			"Authorization": 4,
			"Token": adminKey64 + "###" + $.base64.encode(code)
		}
	})
	.then(response => {return response.json();})
	.then(json => location.reload())
	.catch(err => console.error('Request Failed', err)); 

}



function b64(n) {
	var c1 = document.querySelector('.t30');
	var c2 = document.querySelector('.t31');

	var t1 = c1.value;
	var t2 = c2.value;

	if (n==1) {
		c2.value = $.base64.encode(t1);
	}
	if (n==2) {
		c2.value = $.base64.decode(t1);
	}
	if (n==3) {
		var t3 = t1;
		var t1 = t2;
		var t2 = t3;

		c1.value = t1;
		c2.value = t2;
	}
}



