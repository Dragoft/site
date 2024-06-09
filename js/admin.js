
adminKey = '';
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
	.catch(err => console.log('Request Failed', err)); 

	function check(data) {
		if (data['login']==1) {



			$('.b1').html(`
				<div class="t5" >
					<span class="t10" ></span>
					<a class="t7" id="b1" href="javascript:;" onclick="BTNvisit()" style="margin-left: -5px;" >访问统计</a><a class="t7" id="b2" href="javascript:;" onclick="BTNaddremark()" >发表留言</a><a class="t7" id="b3" href="javascript:;" >删除留言</a>
				</div>

				<div class="t6" ></div>

				<div class="t8" ></div>
				<pre class="t1 t12"></pre>
				<textarea class="t13" ></textarea>
				<a class="t14" href="javascript:;" onclick="copyToClipboard()" >复制</a>
				<a class="t15" href="javascript:;" onclick="loadComment(page)" >刷新</a>
			`);

			BTNvisit();
			loadComment(page);







		} else {
			alert('密码错误');
		} 
	}
}


function BTNvisit() {
	$('.t7').removeClass('t7-active');
	$('#b1').addClass('t7-active');

	$('.t6').html(`
		<div class="t9" >访问量统计</div>

	`);
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
	var name64 = $.base64.encode(content);

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
			"Token": adminKey64 + "###" + id + "###" + d + "###" + name64 + "###" + name64
		}
	})
	.then(response => {return response.json();})
	.then(json => console.log(json))
	.catch(err => console.log('Request Failed', err)); 

	cotentBox.value = '';
}



