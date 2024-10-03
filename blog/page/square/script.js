/*
	This script is used to interact with a database...
	Last change: 2024/8/27
*/

function sent() {
	if (wait==0) {
		var name = document.querySelector('.Tname').value.replace(/\n/g, '');
		var content = document.querySelector('.Tcontent').value;

		if (name.length <= 0 || name.length > 20) {
			return	
		}

		if (content.length <= 0 || content.length > 200) {
			return
		}

		wait = 1;
		message('<span class="t-8" ></span> 加载中', 'info', -1);

		fetch('https://tatsuno.top/remark.api', {
			method: "POST",
			headers: {
				"Token": 1
			},
			body: JSON.stringify({
				"name": name,
				"content": content,
			})
		})
		.then(response => {
			if (!response.ok) {
				if (response.status === 429) {
					fetchfailed();
				}
			} else {
				return response.json();
			}
		}); 

		if (errN==0) {
			document.querySelector('.Tcontent').value = '';
			document.querySelector('.Tcontent').style.height = '48px';
			document.querySelector('.count').innerHTML = '200 words remaining.';

			ComNum = Number(ComNum) + 1;
			PageAll = Math.ceil(ComNum/10);
			document.querySelector('.page0').innerHTML = PageAll;
			document.querySelector('.page').title = '共 ' + ComNum + ' 条留言';

			setTimeout(function (){
				loadComment(1);
				page = 1;
			}, 1500);
		}
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
	.then(response => {
		if (!response.ok) {
			if (response.status === 429) {
				fetchfailed();
			}
		} else {
			return response.json();
		}
	})
	.then(json => showComment(json)); 
}


function showComment(data) {
	if (errN==0) {
		var box = document.querySelector('.commentBox');
		box.style.opacity = '0';
		box.innerHTML = '';

		setTimeout(function (){
			// 获取当前时间
			var now = new Date();
			var options = {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
			var formatter = new Intl.DateTimeFormat('en-US', options);
			var parts = formatter.formatToParts(now).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {});
			var time = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '');

			for (var i = 0; i < data['results'].length; i++) {
				var span = document.createElement('span');
				span.setAttribute('class', 'comment');
				box.appendChild(span);

				// 昵称
				var span1 = document.createElement('span');
				span1.innerText = data.results[i].name.replace(/\n/g, '') + ':  ';
				span1.setAttribute('class', 'title');
				span.appendChild(span1);

				// 内容
				var span2 = document.createElement('span');
				span2.innerText = data.results[i].content;
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
				span3.innerText = '[' + data.results[i].id.substring(0, 16) + ']';
				span3.setAttribute('class', 'time');
				span.appendChild(span3);

				if (data['results'][i]['deletable']=="1") {

					// 超过 7 天的留言无法删除
					if (parseInt(data.results[i].id.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')) + 7000000 > parseInt(time)) {
						var a = document.createElement('a');
						a.innerHTML = '删除'
						a.setAttribute('class', 'delete');
						a.setAttribute('onclick', 'deleteComment("' + data['results'][i]['id'] + '")');
						span3.appendChild(a);
					}
				}

				if (data['results'][i]['deletable']=="0") {
					var span5 = document.createElement('span');
					span5.innerHTML = 'admin'
					span5.setAttribute('class', 'admin');
					span3.appendChild(span5);
				}
			}
		}, 500);

		setTimeout(function (){
			message.Close()
			wait = 0;
			box.style.opacity = '1';
		}, 1000);
	}
}

function deleteComment(id) {
	$('#body').addClass('body-scroll');
	$('.del').fadeIn(150);
	document.querySelector('.del-id').innerHTML = id;
	document.querySelector('.delbtn').setAttribute('onclick', 'Delete(`' + id + '`)');
}

function deleteCancel() {
	$('.del').fadeOut(200);	
	$('#body').removeClass('body-scroll');
}

function Delete(id) {
	if (wait==0) {
		wait = 1;
		$('.del').fadeOut(200);	
		$('#body').removeClass('body-scroll');

		setTimeout(function (){
			message('<span class="t-8" ></span> 加载中', 'info', -1);
			$('#body').removeClass('body-scroll');
		}, 1000);

		fetch('https://tatsuno.top/remark.api', {
			method: "POST",
			headers: {
				"Token": 0,
			},
			body: JSON.stringify({
				"id": id,
			})
		})
		.then(response => {
			if (!response.ok) {
				if (response.status === 429) {
					fetchfailed();
				}
			} else {
				return response.json();
			}
		}); 

		if (errN==0) {
			ComNum = Number(ComNum) - 1;
			PageAll = Math.ceil(ComNum/10);
			document.querySelector('.page0').innerHTML = PageAll;
			document.querySelector('.page').title = '共 ' + ComNum + ' 条留言';

			setTimeout(function (){
				loadComment(page);
			}, 2000);
		}
	}
}

function init() {
	page = 1

	if (wait==0) {
		wait = 1;
		message('<span class="t-8" ></span> 加载中', 'info', -1);
		loadComment(page);

		fetch('https://tatsuno.top/remark.api', {
			method: "POST",
			headers: {
				"Token": 3,
			},
			body: JSON.stringify({})
		})
		.then(response => {
			if (!response.ok) {
				if (response.status === 429) {
					fetchfailed();
				}
			} else {
				return response.json();
			}
		})
		.then(json => getComNum(json)); 

		function getComNum(data) {
			if (errN==0) {
				ComNum = Number(data.results[0].content);
				PageAll = Math.ceil(ComNum/10);
				document.querySelector('.page0').innerHTML = PageAll;
				document.querySelector('.page').title = '共 ' + ComNum + ' 条留言';
			}
		}
	}
}

function turnPage(n) {
	if (wait==0) {
		if (page + n >= 1) {
			if (page + n <= PageAll) {
				wait = 1;
				message('<span class="t-8" ></span> 加载中', 'info', -1);

				page = page + n
				document.querySelector('.Tpage').value = page;
				loadComment(page);
			}
		}
	}
}

// 日期格式化	blog.csdn.net/qq_42415827/article/details/114630461
function dateFormatter(formatter, date) {
	date = (date ? new Date(date) : new Date)
	const Y = date.getFullYear() + '',
		M = date.getMonth() + 1,
		D = date.getDate(),
		H = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds()
	return formatter.replace(/YYYY|yyyy/g, Y)
		.replace(/YY|yy/g, Y.substr(2, 2))
		.replace(/MM/g, (M < 10 ? '0' : '') + M)
		.replace(/DD/g, (D < 10 ? '0' : '') + D)
		.replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
		.replace(/mm/g, (m < 10 ? '0' : '') + m)
		.replace(/ss/g, (s < 10 ? '0' : '') + s)
}



// 弹窗
function message(content, type, time) {
	$('.message-box').html(content);
	$('.message').addClass('message-active');
	if (time != -1) {
		setTimeout(function (){
			$('.message').removeClass('message-active');
		}, time);
	}

	// 关闭消息框
	message.Close=function(){
		$('.message').removeClass('message-active');
	}
}

function fetchfailed() {
	errN = 1;
	wait = 1;
	message.Close();
	setTimeout(function (){
		wait = 1;
		message('<span class="t-8" ></span>　请求速度过快，请稍候', 'info', -1);
	}, 1000);
	setTimeout(function (){
		wait = 0;
		errN = 0;
		message.Close();
	}, 11000);
} 


function escapeRegExp(string) {
	return string.replace(/[\r\n\s]+/g, '');
}

function YautoResize(e) {
	const t = document.querySelector(e);
	t.style.height = 'auto';
	t.style.height = t.scrollHeight + 'px';
	$("html,body").animate({scrollTop: $(document).height()}, 0);
}

function XautoResize(e) {
	const t = document.querySelector(e);
	const h = document.querySelector('.Tname-2');

	h.innerHTML = t.value;
	t.value = escapeRegExp(t.value)
	t.style.width = (h.offsetWidth || 80) + 'px';
}

function addOpen() {
	if($('.add').hasClass('add-active')!=true) {
		$('.add').addClass('add-active');
		$('.new').addClass('new-active');
		$('.bar2').fadeOut(300);
	} else {
		document.querySelector('.Tcontent').value = '';
		document.querySelector('.Tcontent').style.height = '48px';
		$('.add').removeClass('add-active');
		$('.new').removeClass('new-active');
		$('.bar2').fadeIn(300);
	}
}


