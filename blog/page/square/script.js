/*
	This script is used to interact with a database...
	Last change: 2024/6/8
*/

function sent() {
	if (wait==0) {
		var name = document.querySelector('.Tname').value;
		var content = document.querySelector('.Tcontent').value;
		var name64 = 0;
		var content64 = 0;

		if (name.length > 0) {
			if (name.length <= 20) {
				var name64 = $.base64.encode(name)		
			}
		}

		if (content.length > 0) {
			if (content.length <= 140) {
				var content64 = $.base64.encode(content)	
			}
		}

		if (name64!=0) {
			if (content64!=0) {
				wait = 1;
				message('<span class="t-8" ></span> 加载中', 'info', -1);

				fetch('https://tatsuno.top/remark.api', {
					method: "POST",
					headers: {
						"Authorization": 1,
						"Token": name64 + "###" + content64
					}
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
					document.querySelector('.count').innerHTML = '剩余 100 字';

					ComNum = Number(ComNum) + 1;
					PageAll = Math.ceil(ComNum/10);
					document.querySelector('.page0').innerHTML = PageAll;
					document.querySelector('.page0').title = '共' + ComNum + '条留言';

					setTimeout(function (){
						loadComment(1);
						page = 1;
					}, 1500);
				}
			}
		}
	}
}



function loadComment(page) {
	fetch('https://tatsuno.top/remark.api', {
		method: "POST",
		headers: {
			"Authorization": 2,
			"Token": (page - 1) * 10
		}
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
				a.setAttribute('onclick', 'deleteComment("' + data['results'][i]['id'] + '")');
				span3.appendChild(a);
			}

			if (data['results'][i]['deletable']=="2") {
				var span5 = document.createElement('span');
				span5.innerHTML = 'admin'
				span5.setAttribute('class', 'admin');
				span3.appendChild(span5);
			}
		}

		setTimeout(function (){
			message.Close()
			wait = 0;
			box.style.opacity = '1';
		}, 1500);
	}
}



function deleteComment(id) {
	$('#body').addClass('body-scroll');
	$('.del').fadeIn(200);
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
		message.Close()
		setTimeout(function (){
			message('<span class="t-8" ></span> 加载中', 'info', -1);
			$('#body').removeClass('body-scroll');
		}, 1000);

		fetch('https://tatsuno.top/remark.api', {
			method: "POST",
			headers: {
				"Authorization": 0,
				"Token": id
			}
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
			document.querySelector('.page0').title = '共' + ComNum + '条留言';

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
				"Authorization": 3,
			}
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

		function getComNum(DATA) {
			if (errN==0) {
				ComNum = Number(DATA['content']);
				PageAll = Math.ceil(ComNum/10);
				document.querySelector('.page0').innerHTML = PageAll;
				document.querySelector('.page0').title = '共' + ComNum + '条留言';
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
	$('.message-box').removeClass('message-info');
	$('.message-box').removeClass('message-warn');
	$('.message-box').removeClass('message-error');

	$('.message-box').addClass('message-' + type);
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




