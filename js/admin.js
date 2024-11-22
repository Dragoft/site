


/*	admin.js
 *	created by Tatsuno Yuu, 2024/7/29
 *	version: BETA 0.00.014

	*/



adminKey = '';
visit = '';
page = 1;
SQLcmd = '';
fileok = 0;
formData = '';
fileData = '';

fileinfo = [0, 0, 0];
file = [];
sidebar = 0;
timer0 = null;

// 创建FileReader对象
var reader = new FileReader();



document.getElementById('nowyear').innerHTML = "-" + new Date().getFullYear();



function login() {
	adminKey = document.querySelector('.t1').value.toString();
	adminKey64 = $.base64.encode(adminKey);

	if (adminKey=='') {return};

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
					<a class="t7" id="b1" href="javascript:;" onclick="BTNall()" style="margin-left: -5px;" >综合面板</a><a class="t7" id="b2" href="javascript:;" onclick="BTNaddremark()" >发表留言</a><a class="t7" id="b3" href="javascript:;" onclick="BTNdelete()" >删除留言</a><a class="t7" id="b4" href="javascript:;" onclick="BTNbase64()" >Base64</a><a class="t7" id="b5" href="javascript:;" onclick="BTNsql()" >SQL 控制台</a><a class="t7" id="b6" href="javascript:;" onclick="BTNdownload()" >文件传输</a><a class="t7 f-4" id="b7" href="javascript:;" onclick="BTNsidebar()" >评论池</a>
				</div>
				</div>

				<div class="t6" ></div>

				<textarea class="t13" ></textarea>

				<div class="t56" >
				<div class="t8" ></div>
				<div class="t22" >
					<div class="t25" >
						<span class="t24" >第</span>
						<textarea class="t1 t23" maxlength="3" onfocus="this.select();" >1</textarea>
						<span class="t24" >页:</span>
					</div>
					<div class="t15" >
						<a href="javascript:;" onclick="copyToClipboard()" >复制</a>
						<a href="javascript:;" onclick="loadComment(page)" >刷新</a>
					</div>
					<div class="t37" >
						<div class="t38" onclick="showJson()" >json</div>
						<div class="t38" style="margin-left: 5px;" onclick="showFormat()" >format</div>
						<div class="t38" style="margin-left: 5px;" onclick="showRaw()" >raw</div>
					</div>
				</div>

				<div class="t39" >
					<span class="t9" style="line-height: 30px;" >Comment Pool</span>
					<hr style="border: none; border-top: 1px solid rgba(100, 102, 102, 0.3); width: 100%; margin-top: 10px;">
				</div>
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
		<span>访客数</span>
		<br />
		<textarea class="t1 t27 c1" maxlength="10" ></textarea>
		<a class="t4 t28" href="javascript:;" onclick="changeVisit()" >更新</a>
		<a class="t4 t28" href="javascript:;" onclick="getVisit()" >刷新</a>
		<br />
		<br />
		<span>已上线</span>
		<br />
		<textarea class="t1 t27 c3" maxlength="10" ></textarea>
		<br />
		<br />
		<span>Adminkey</span>
		<br />
		<input class="t1 t27 c2" maxlength="10" type="password" ></input>
		<a class="t4 t28" href="javascript:;" onclick="changeCode()" >更新</a>
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
		<div class="f-2">
		<span>介绍:</span>
		<br />
		<span>此管理系统由 Tatsuno Yuu 于 2024/6/9 完成开发，使用了 Mervi 的json渲染工具。当前版本:　[BETA 0.00.014] [STABLE]</span>
		<br />
		<span>其意义在于通过前端的简单操作，控制后台的数据库，节省时间！</span>
		<br />
		<br />
		<br />
		</div>
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
		<textarea class="t1 t16" placeholder="昵称" ></textarea>
		<br />
		<br />
		<textarea class="t1 t17" style="min-height: 100px; max-height: 500px;" placeholder="留言" ></textarea>
		<br />
		<span class="t26" >共有 0 字</span>
		<br />
		<br />
		<br />
		<br />
		<br class="f-2" />
		<div class="t9" >高级设置</div>
		<br />

		<span>Deletable: </span>
		<select id="fruits" class="t18 t19">
			<option value="0">0</option>
			<option value="1" selected="selected">1</option>
		</select>
		<br />
		<br />

		<span>ID: </span>
		<textarea class="t1 t20" maxlength="19" placeholder="ID" ></textarea>
		<br />
		<br />
		<br />
		<br class="f-2" />
		<br class="f-2" />
		<a class="t4 t21" href="javascript:;" onclick="sent()" >留 言</a>
	`);

	// 统计字数
	$('.t17').on('keyup', function () {
		if (document.querySelector('.t17').value.length>140) {
			$('.t26').css('color', 'rgba(255, 50, 50, 0.7)');
		} else {
			$('.t26').css('color', 'rgba(151, 153, 153, 1)');
		}
		var n = document.querySelector('.t17').value.length;
		document.querySelector('.t26').innerHTML = '共有 ' + n + ' 字';
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
		<br class="f-3" />
		<span>输入留言的 ID 即可将其删除。</span>
		<br />
		<br />
		<br />
		<br class="f-3" />
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
		<textarea class="t1 t30" style="min-height: 100px; max-height: 500px;" placeholder="输入" ></textarea>
		<br />
		<br />
		<textarea class="t1 t31" style="min-height: 100px; max-height: 500px;" placeholder="输出" ></textarea>
		<br />
		<br />
		<br class="f-2" />
		<br class="f-2" />
		<br class="f-2" />
		<a class="t4 t21" href="javascript:;" onclick="b64(1)" >编码</a>
		<a class="t4 t21" href="javascript:;" style="margin-left: 10px;" onclick="b64(2)" >解码</a>
		<a class="t4 t21" href="javascript:;" style="margin-left: 10px;" onclick="b64(3)" >交换</a>
		<br />
		<br />
		<br />
	`);
}



function BTNsql() {
	$('.t7').removeClass('t7-active');
	$('#b5').addClass('t7-active');

	$('.t6').html(`
		<div class="t9" >SQL  控制台</div>
		<br />
		<div class="t43" ></div>
		<textarea class="t1 t42" style="min-height: 33px; max-height: 100px;" placeholder='Type "/help" for help information.' ></textarea>
		<a class="t4 t44" href="javascript:;" onclick="runSql()" >RUN</a>
	`);

	document.querySelector('.t43').innerHTML = SQLcmd || 'SQL system 0.0.11<span style="margin-left: 20px;" >2024/7/28</span>';
}


function BTNdownload() {
	$('.t7').removeClass('t7-active');
	$('#b6').addClass('t7-active');

	$('.t6').html(`
		<div class="t9" >文件传输</div>
		<br />
		<span>File system 0.0.11<span style="margin-left: 20px;" >2024/7/28</span></span>
		<br />
		<br />
		<br />
		<div class="t49" >
			<input type="file" id="fileUpload" class="fileUpload" style="vertical-align: middle; width: 80%; max-width: 220px;" >
			<a class="t4 t48" href="javascript:;" onclick="upload()" >Upload</a>
		</div>		
		<div class="t50" >
			<span>等待中...</span>
		</div>

		<br />
		<br />
		<br />

		<div class="t49" >
			<span class="" style="vertical-align: middle; width: 80%; max-width: 220px;" >Chunks: <span id="downloadChunk" >0</span> / <span id="allChunk">0</span></span>
			<a class="t4 t48" href="javascript:;" onclick="fileinfo = [0, 0, 0]; loadfile()" >Refresh</a>
		</div>		
		<div class="t51" >
			<span></span>
		</div>
	`);

	loadfile();

	document.getElementById('fileUpload').addEventListener('change', function(event) {
		file = event.target.files[0];
		var info = document.querySelector('.t50');
		fileok = 0;
		formData = new FormData();
		formData.set('file', file);

		if (formData.get('file').name == undefined) {
			info.innerHTML = '<span>等待上传中...</span>';
			return
		}

		info.innerHTML = '<span>检查文件:</span><br /><span>name: ' + formData.get('file').name + '</span><br /><span>type: ' + formData.get('file').type + '</span><br /><span>size: ' + formatFileSize(formData.get('file').size) + ' ( ' + formData.get('file').size + ' bytes )</span><br />';
		if (formData.get('file').size <= 83886080) {

			var chunkSize = 1 * 960 * 1024;
			chunks = Math.ceil(file.size / chunkSize);
			chunkList = []
			temp = ''

			info.innerHTML = info.innerHTML + '<span>chunks: ' + chunks + ' (960 KB / Chunk)</span><br /><br /><span>preparing for the chunks: <span id="showChunk" ></span></span><br />';
			$(".t50").animate({scrollTop: document.querySelector('.t50').scrollHeight}, 500);

			// 创建分片
			for (var i = 0; i < chunks; i++) {
				const start = i * chunkSize;
				const end = Math.min(file.size, start + chunkSize);
				const chunk = file.slice(start, end);
				chunkList[i] = chunk;

			}

			// 将片转为二进制流
			chunkToBs(chunks);

		} else {
			info.innerHTML = info.innerHTML + '<br /><span>文件过大（超过 10 MB），终止上传</span><br />';
			fileok = 0;
			formData = '';

			$(".t50").animate({scrollTop: document.querySelector('.t50').scrollHeight}, 500);
		}
	});

}



function BTNsidebar() {
	if (sidebar == 0) {
		$('.t57').fadeIn(300);
		$('.t56').addClass('t56-active');
		sidebar = 1;
	} else {
		$('.t57').fadeOut(300);
		$('.t56').removeClass('t56-active');
		sidebar = 0;
	}
}



function chunkToBs(chunks) {
	var i = -1
	clearInterval(timer0);

	timer0 = setInterval(() => {
		if (i == chunks - 2) {
			var info = document.querySelector('.t50');

			info.innerHTML = info.innerHTML + '<span>文件正常，准备上传！</span><br />';
			$(".t50").animate({scrollTop: document.querySelector('.t50').scrollHeight}, 500);

			fileok = 1;
			clearInterval(timer0)
		};
		i ++

		reader.onload = function(e) {
			chunkList[i] = e.target.result;
		}
		reader.readAsArrayBuffer(chunkList[i]);
		document.getElementById('showChunk').innerHTML = i + 1 + ' / ' + chunks;
	},1000)
}






function upload() {
	var info = document.querySelector('.t50');
	if (fileok != 1) {return}
	if (formData == '') {return}

	info.innerHTML = info.innerHTML + '<br /><span>fetch: started.</span><br /><span>uploading chunk: <span id="nowChunk" >0</span> / ' + chunks + '</span><br />';
	$(".t50").animate({scrollTop: document.querySelector('.t50').scrollHeight}, 500);

	temp = 0
	deletefile(0)

	setTimeout(function (){
		sentChunks()
	}, 20000);
};



// Cloudflare 限制数据库的单行长度为 1 MB，这里需要进行分片上传

function sentChunks() {
	var token = $.base64.encode(formData.get('file').name) + '###' + formData.get('file').size + '###' + chunks + '###' + temp;
	var bodyData = chunkList[temp];

	fetch('https://tatsuno.top/admin.api', {
		method: "POST",
		headers: {
			"Authorization": 6,
			"Token": token
		},
		body: bodyData
	})
	.then(response => {return response.json();})
	.then(json => {
		if (temp == chunks - 1) {
			uploaded()
		} else {
			temp ++
			sentChunks()
			document.getElementById('nowChunk').innerHTML = temp + 1;
		}

	})
	.catch(err => uploadfail()); 
}



function uploaded() {
	var info = document.querySelector('.t50');
	info.innerHTML = info.innerHTML + '<span>fetch: succeeded.</span><br />';
	$(".t50").animate({scrollTop: document.querySelector('.t50').scrollHeight}, 500);

	info.innerHTML = info.innerHTML + '<span>文件上传成功！</span><br />';
	$(".t50").animate({scrollTop: document.querySelector('.t50').scrollHeight}, 500);

	formData = '';

	file = [];
	chunks = '';
	fileinfo = [0, 0, 0];
	setTimeout(function (){
		loadfile()
	},2000)
}

function uploadfail() {
	var info = document.querySelector('.t50');
	info.innerHTML = info.innerHTML + '<span>fetch: failed.</span><br />';
	$(".t50").animate({scrollTop: document.querySelector('.t50').scrollHeight}, 500);

	info.innerHTML = info.innerHTML + '<span>文件上传失败，终止操作</span><br />';
	$(".t50").animate({scrollTop: document.querySelector('.t50').scrollHeight}, 500);
}



function getfile() {
	if (file[0] != undefined) {
		download()
		return
	}

	temp = 0
	chunkGroup = [];
	getChunk()
}



// 文件分片下载
function getChunk() {
	document.getElementById('downloadChunk').innerHTML = temp;
	fetch('https://tatsuno.top/admin.api', {
		method: "POST",
		headers: {
			"Authorization": 8,
			"Token": temp
		}
	})
	.then(response => {return response.json();})
	.then(json => {
		if (temp == fileinfo[2]) {
			download()
		} else {
			chunkGroup[temp] = new Uint8Array(json['chunk']).buffer
			temp ++
			setTimeout(function (){
				getChunk()
			}, 2000);
		}
	})
	.catch(err => {
		document.getElementById('downloadChunk').innerHTML = 'ERROR';
	}); 
}



function download() {
	var link = document.createElement('a');
	if (file[0] != undefined) {
		var blob = new Blob(file, { type: 'application/octet-stream' })
		var url = URL.createObjectURL(blob);

		link.href = url;
		link.download = $.base64.decode(fileinfo[0]);
	} else {
		// 创建一个 Blob
		// 数据库中取出的 ArrayBuffer 变成了数组，这里需要还原一下

		var blob = new Blob(chunkGroup, { type: 'application/octet-stream' })
		var url = URL.createObjectURL(blob);

		link.href = url;
		link.download = $.base64.decode(fileinfo[0]);

		file = chunkGroup
	}

	// 模拟点击链接进行下载
	document.body.appendChild(link);
	link.click();

	document.body.removeChild(link);
	URL.revokeObjectURL(url);
	chunkGroup = []
}



function loadfile() {
	if (fileinfo[1] != 0) {
		showfile();
		return
	}
	fetch('https://tatsuno.top/admin.api', {
		method: "POST",
		headers: {
			"Authorization": 7
		}
	})
	.then(response => {return response.json();})
	.then(json => preshowfile(json)); 
}



function preshowfile(fdata) {
	fileinfo = [fdata['name'], formatFileSize(fdata['size']), fdata['chunks']];
	showfile();
}

function showfile() {
	var box = document.querySelector('.t51');
	document.getElementById('allChunk').innerHTML = fileinfo[2];

	if (fileinfo[0] == '0' && fileinfo[1] == '0 Bytes') {
		box.innerHTML = '<div><span class="t52" >undefined</span><span class="t53" >0 Bytes</span><span class="t55" >No action</span></div>'
	} else {
		file = '';
		box.innerHTML = '<div><span class="t52" >' + $.base64.decode(fileinfo[0]) + '</span><span class="t53" >' + fileinfo[1] + '</span><span onclick="deletefile(1)" class="t55" >删除</span><span onclick="getfile()" class="t54" >下载</span></div>'
	}
}

function deletefile(reload) {
	fetch('https://tatsuno.top/admin.api', {
		method: "POST",
		headers: {
			"Authorization": 9
		}
	})

	file = [];
	fileinfo = [0, 0, 0];
	if (reload == 1) {
		setTimeout(function (){
			loadfile()
		},1000)
	}
}




function loadComment(page) {
	fetch('https://tatsuno.top/remark.api', {
		method: "POST",
		headers: {
			"Token": 2,
		},
		body: JSON.stringify({
			"page": (page - 1) * 10,
		})
	})
	.then(response => {return response.json();})
	.then(json => showJson(json)); 
}

function showJson(json) {
	var box = document.querySelector('.t8');
	box.innerHTML = '<div class="t41" ></div>';

	commentData = json || commentData;

	var textbox = document.querySelector('.t13');
	textbox.innerHTML = JSON.stringify(commentData);

	var options = {
		 collapsed: false,
		withQuotes: true
	};
	$('.t41').jsonViewer(commentData, options);
}



function showFormat() {
	var box = document.querySelector('.t8');
	box.innerHTML = '<br />';

	// 获取当前时间
	var now = new Date();
	var options = {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
	var formatter = new Intl.DateTimeFormat('en-US', options);
	var parts = formatter.formatToParts(now).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {});
	var time = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '');



	for (var i = 0; i < commentData['results'].length; i++) {
		var span = document.createElement('span');
		span.setAttribute('class', 'comment');
		box.appendChild(span);

		// 昵称
		var span1 = document.createElement('span');
		span1.innerText = commentData['results'][i]['name'] + ':  ';
		span1.setAttribute('class', 'title');
		span.appendChild(span1);

		// 内容
		var span2 = document.createElement('span');
		span2.innerText = commentData['results'][i]['content'];
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
		span3.innerText = '[' + commentData['results'][i]['id'].substring(0, 16) + ']';
		span3.setAttribute('class', 'time');
		span.appendChild(span3);

		if (commentData['results'][i]['deletable']=="1") {
			// 超过 7 天的留言无法删除
			if (parseInt(commentData.results[i].id.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')) + 7000000 > parseInt(time)) {
				var a = document.createElement('a');
				a.innerHTML = '删除'
				a.setAttribute('class', 'delete');
				span3.appendChild(a);
			}
		}

		if (commentData['results'][i]['deletable']=="0") {
			var span5 = document.createElement('span');
			span5.innerHTML = 'admin'
			span5.setAttribute('class', 'admin');
			span3.appendChild(span5);
		}
	}
}



function showRaw() {
	var box = document.querySelector('.t8');
	box.innerHTML = '<br />' + JSON.stringify(commentData);
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

	var id = document.querySelector('.t20').value;
	var d = document.querySelector('.t19').value;



	if (name=='') {return};
	if (content=='') {return};
	if (adminKey=='') {return};
	if (id=='') {var id = null};
	document.querySelector('.t26').innerHTML = '共有 0 字';
	$('.t26').css('color', 'rgba(151, 153, 153, 1)');
	
	fetch('https://tatsuno.top/admin.api', {
		method: "POST",
		headers: {
			"Authorization": 1,
		},
		body: JSON.stringify({
			"key": adminKey64,
			"name": name,
			"id": id,
			"deletable": d,
			"content": content,
		})
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
	.then(json => {
		document.querySelector('.c1').value = json.results[0].content
		visit = json.results[0].content
	})
	.catch(err => console.error('Request Failed', err)); 
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
	document.querySelector('.c3').value = runtime;
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



function runSql() {
	cmd = document.querySelector('.t42').value;
	res = document.querySelector('.t43');

	document.querySelector('.t42').value = '';

	if (cmd == '') {return}
	if (cmd == '/help') {
		res.innerHTML = res.innerHTML + `<br /><br /><br /><br />` + cmd + `
			<br /><span class='t45' >/clear<span class='t45' style='float: right; user-select: none;' >清除控制台</span></span>
			<br /><br /><span class='t45' >SELECT name from sqlite_schema where type='table' and name != '_cf_KV' ORDER BY name<span class='t45' style='float: right; user-select: none;' >查询所有表名</span></span>
			<br /><br class='f-3'/><span class='t45' >SELECT * from 表名<span class='t45' style='float: right; user-select: none;' >查询指定表的全部数据</span></span>
			<br /><br class='f-3'/><span class='t45' >SELECT * from 表名 where 列名='行名'<span class='t45' style='float: right; user-select: none;' >查询指定表指定行的数据</span></span><br />
			<br class='f-3'/><span class='t45' >SELECT * from pragma_table_xinfo('表名') as tblInfo<span class='t45' style='float: right; user-select: none;' >查询指定表的列信息</span></span>
			<br /><br class='f-3'/><span class='t45' >UPDATE 表名 set 要修改值的列名2='值' where 要修改值的列名1='列名'<span class='t45' style='float: right; user-select: none;' >修改指定位置的数据</span></span>
		`;

		SQLcmd = res.innerHTML;
		$(".t43").animate({scrollTop: document.querySelector('.t43').scrollHeight}, 500);

		return
	}
	if (cmd == '/clear') {
		res.innerHTML = ''
		SQLcmd = res.innerHTML;
		$(".t43").animate({scrollTop: document.querySelector('.t43').scrollHeight}, 500);

		return
	}

	res.innerHTML = res.innerHTML + '<br /><br /><br /><br />' + cmd;
	fetchSql(cmd)

	SQLcmd = res.innerHTML;
}



function fetchSql(cmd) {
	fetch('https://tatsuno.top/admin.api', {
		method: "POST",
		headers: {
			"Authorization": 5,
			"Token": adminKey64 + "###" + cmd
		}
	})
	.then(response => {return response.json();})
	.then(json => showSql(json))
	.catch(err => showfailSql());
}



function showSql(res) {
	obj = document.querySelector('.t43');
	if (res['results'].length != 0) {
		obj.innerHTML = obj.innerHTML + '<br /><div id="table"></div>';
		$.jsontotable(res.results, { id: '#table', header: false });
		$('#table').removeAttr('id');

		obj.innerHTML = obj.innerHTML + `<br /><span><span onclick="$(this).css('display', 'none');$(this).siblings('.t47').css('display', 'unset');" class="rawdata" >[ raw data ]</span><span class="t47" >` + JSON.stringify(res) + `</span></span>`;
	} else {
		obj.innerHTML = obj.innerHTML + '<br /><span class="t45" >' + JSON.stringify(res) + '</span>' ;
	}

	$(".t43").animate({scrollTop: document.querySelector('.t43').scrollHeight}, 500);
	SQLcmd = obj.innerHTML;
}

function showfailSql() {
	document.querySelector('.t43').innerHTML = document.querySelector('.t43').innerHTML + '<br /><span class="t46" >Syntax error.</span>' ;
	console.clear();

	$(".t43").animate({scrollTop: document.querySelector('.t43').scrollHeight}, 500);
	SQLcmd = document.querySelector('.t43').innerHTML;
}


$('.t32').on('keyup', function () {
	 if(event.which == 13){
		login();
	}
})



/**
	* 根据字节数获取文件大小，并转换成 KB、MB、GB、TB 等形式
	* @param {number} bytes - 文件的字节数
	* @returns {string} - 文件大小的字符串表示形式

	* from https://blog.csdn.net/qq_42373946/article/details/130007116
	*/

function formatFileSize(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let size = bytes;
	let unitIndex = 0;

	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex++;
	 }

	// 保留两位小数，四舍五入
	size = Math.round(size * 100) / 100;

	return `${size} ${units[unitIndex]}`;
}



//免密登录，但会对权限进行限制
if (window.location.href.slice(-7) == 'freekey') {
			$('.b1').html(`
				<div class="t5" >
					<span class="t10" ></span>
					<a class="t7" id="b4" href="javascript:;" onclick="BTNbase64()" >Base64</a><a class="t7" id="b6" href="javascript:;" onclick="BTNdownload()" >文件传输</a>
				</div>

				<div class="t6" ></div>

				<textarea class="t13" ></textarea>

				<div class="t56" >
				<div class="t8" ></div>
				<div class="t22" >
					<div class="t25" >
						<span class="t24" >第</span>
						<textarea class="t1 t23" maxlength="3" onfocus="this.select();" >1</textarea>
						<span class="t24" >页:</span>
					</div>
					<div class="t15" >
						<a href="javascript:;" onclick="copyToClipboard()" >复制</a>
						<a href="javascript:;" onclick="loadComment(page)" >刷新</a>
					</div>
					<div class="t37" >
						<div class="t38" onclick="showJson()" >json</div>
						<div class="t38" style="margin-left: 5px;" onclick="showFormat()" >format</div>
						<div class="t38" style="margin-left: 5px;" onclick="showRaw()" >raw</div>
					</div>
				</div>

				<div class="t39" >
					<span class="t9" style="line-height: 30px;" >Comment Pool</span>
					<hr style="border: none; border-top: 1px solid rgba(100, 102, 102, 0.3); width: 100%; margin-top: 10px;">
				</div>
				</div>
			`);

			BTNbase64()
}


