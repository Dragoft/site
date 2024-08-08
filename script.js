


/*	script.js
 *	created by Tatsuno Yuu, 2024/7/30

	*/



// 通知列表
Notice = [
	{
		date: '6.10',
		event: '停更通知.',
		content: '网站暂时停止更新',
	},
	{
		date: '6.8',
		event: '留言板正式上线.',
		content: '网站新增留言板功能！',
	},
	{
		date: '4.27',
		event: '细节优化.',
		content: '对主页、博客样式进行了调整\n修复手机端界面最小宽度小于 380px 的问题',
	},
	{
		date: '4.26',
		event: '调整主页面样式.',
		content: '对主页样式进行了细微调整',
	},
	{
		date: '4.6',
		event: '启用域名: tatsuno.top/',
		content: '新的域名，新的开始！',
	},

];







// 计算网站上线时间

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






// 参数初始化
playerMode = 1
lang = navigator.language
timer0 = null;
device = $(window).width() < 900 && 'Mobile' || 'Desktop';
states = document.domain == '' && 'Local' || 'Network';
changeBlog = 0;
visit = 0;

history.pushState(null, null, location.href);



// 清除 url 参数
$('title').text('tatsuno.top/');
let url = window.location.href
if (url.indexOf('?') !== -1) {
	url = url.replace(/(\?|#)[^'"]*/, '')
	history.replaceState(null, null, url);
}



// 强制初始化页面
setTimeout(function (){
	if(document.querySelector('.Avatar').style.opacity!=1){
		message('初始化异常，已强制加载页面', 'warn', 3000);
		init();
	}
}, 30000);






/*
	Messager
	To exchange data between parent page and child pages.

	@param{string} event	JS code

*/

function pagePost(event) {
	document.getElementById('iframe').contentWindow.postMessage(event, document.domain.length == 0 && '*' || '/');
}
window.addEventListener('message', function(event) {
	if (event.origin == 'null' || event.origin.includes('https://tatsuno.top')) {
		eval(event.data);
	}
});



// 博客面板

// INIT
BlogTEMP = filterAndCombine(BlogList, 'type', 'hide');


function filterAndCombine(arr, key, value) {
	return arr.filter(obj => obj[key] != value);
}



function BlogListInit() {
	// 动态输出博客文章列表
	ul = document.querySelector('ul');

	for (var i = 0; i < BlogTEMP.length; i++) {
		if (BlogTEMP[i]['type'] != 'hide') {
			var a = document.createElement('a')
			a.innerHTML = BlogTEMP[i]['type'] + ' ' + BlogTEMP[i]['name'];
			a.setAttribute('class', 'search-list');
			a.setAttribute('onclick', 'Blog(`open`, `' + BlogTEMP[i]['src'].slice(0, -1) + '`)');
			a.setAttribute('id', BlogTEMP[i]['type'] + ' ' + BlogTEMP[i]['name']);
			a.setAttribute('title', BlogTEMP[i]['details']);

			ul.appendChild(a);
		}
	}

	// 显示博客文章数量
	document.querySelector('.blog-num').innerHTML = BlogTEMP.length;

	// 博客搜索引擎
	document.onkeydown = function(e) {
		var ev = (typeof event!= 'undefined') ? window.event : e;
			 if(ev.keyCode == 13) {
				return false;
			}
	}

	// 初始化搜索引擎
	$('#searchInput').on('keyup', function () {
		new Search('.search-list', $('#searchInput'), 'rgba(244, 183, 188, 1)')
	})

	// 初始化列表高度
	if (BlogTEMP.length > 10) {
		$('#search').css('height', '275px');
		document.getElementById('searchInput').name = 10;
	} else {
		$('#search').css('height', BlogTEMP.length * 22 +55 + 'px');
		document.getElementById('searchInput').name = BlogTEMP.length;
	}

}



// 初始化通知列表
function NoticeListInit() {
	NoticeList = document.querySelectorAll(".news-box")
	for (var i = 0; i < 5; i++) {
		NoticeList[i].innerHTML = '<span class="news-date" >' + Notice[i]['date'] + '</span><span title="' + Notice[i]['content'] + '" >' + Notice[i]['event'] + '</span>'
	}
}






// 博客文章切换
function Blog(action, id) {
	if (action=='close') {
		// 关闭博客页面
		pageloading(0);

		$('.blog').fadeOut(600);
		$('.iframe').fadeOut(600);
		$('.menu-btn-3').css('transition', 'none');
		$('.menu-btn-3').fadeOut(400);
		$('.blog').removeClass('blog-active');

		if (document.domain!='') {
			history.replaceState(null, null, window.location.href.split('top',1)[0] + 'top/');
		} else {
			ClearURLParam();
		}

		$('title').text('tatsuno.top/');
		if(!$('.menu').hasClass('menu-active')){
			$('#body').removeClass('body-scroll');
		}
	} else {
		// 打开博客界面
		pageloading(1);

		$('.iframe').css('display', 'none');
		$('.blog').fadeIn(300);
		$('#body').addClass('body-scroll');
		$('.blog').addClass('blog-active');

		// 修改地址栏参数
		if (document.domain!='') {
			history.replaceState(null, null, window.location.href.split('top',1)[0] + 'top/blog?id=' + id);
		} else {
			changeURLStatic('id', id);
		}

		setTimeout(function (){
			// 跳转指定文章
			changeBlog = 1;
			if (states == "Local") {
				document.getElementById('iframe').src = 'blog/' + id + '/page.html';
			} else {
				document.getElementById('iframe').src = window.location.href.split('top',1)[0] + 'top/blog/' + id + '/page';
			}

			$('.menu-btn-3').css('transition', '0.3s');
		},400)

		// 返回按钮
		$('.menu-btn-3').fadeIn(400);


	}
}

// 博客页面加载完成后执行
function pageloaded(title) {
	if (title.slice(0, 1) == '-') {
		$('title').text('tatsuno.top/ ' + title);
	} else {
		$('title').text(title);
	}

	setTimeout(function (){
		pageloading(0);
		$('.iframe').fadeIn(400);
	},1000)
}

// 后退，前进时直接关闭博客页面
$('#iframe').on('load', function() {
	if (changeBlog != 1) {
		Blog('close', '');
		changeBlog = 0;
	} else {
		changeBlog = 0;
	}
});



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

/* From https://blog.csdn.net/qq_41090476/article/details/96111016 */
$(body).click(function(e){
	var e = e || window.event;
	var elem = e.target;
	if($(elem).is('.Avatar') || $(elem).is('.Avatar *')){
		if(!$('.Avatar').hasClass('Avatar-active')){
			$('.Avatar').addClass('Avatar-active');
		} else {
			$('.Avatar').removeClass('Avatar-active');
		}
	}else{
		$('.Avatar').removeClass('Avatar-active');
	}	
})

function Typewriter() {
	var sentence = [
		// 标题语列表

		['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'][new Date().getDay()],
		'これは何ですか。',
		'ここは…',
		'不准再碰我的尾巴！',
		'一个很懒的博主.',
		'Html！',
		'Hello world.',
		'はーい',
		'小白一只.',
		'私は新米です。',
		'Java^1000Script！',
		'Python！',
		'不准再碰我的尾巴！',
		'こんにちは。',
		'今日は^500' + ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'][new Date().getDay()] + '^300ですか。',
		'看上去很不错的样子...',
		'美味しかったです！',
		'誰もいません。',
		'何もありません。',
		'パンを食べる。',
		'不准再碰我的尾巴！',
		'Cookie required...',
		'Encyclopedia.',
		'   ',
		'昨日は寒かったです。',
		'Safebooru.',
		'一夜鱼龙舞！',
		'Have a good day !',
		'undefined'

		];

	var RandomSentence = sentence[Math.floor(Math.random() * sentence.length)];
	$('.Typewriter-1').typed({
		strings: [RandomSentence],
		typeSpeed: 100,
		showCursor: false,
	});
}



// 页脚文字
document.getElementById('onlineDate').innerHTML = runtime;



// 操作 Cookie	by ChatGPT
function setCookie(Value) {
	var now = new Date();
	var oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); 
	var expires = oneWeekLater.toUTCString();
	document.cookie = "Cookie=" + Value + "; expires=" + expires;
	return expires;
}

function getCookie(name) {
	var pattern = new RegExp('(?:^|; )' + name + '=([^;]*)');
	var matches = document.cookie.match(pattern);
	if (matches) {
		return decodeURIComponent(matches[1]);
	}
	return undefined;
}

// 生成[min, max]范围内的随机整数
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 检测浏览器类型
function getBrowserType() {
	var userAgent = window.navigator.userAgent;

	if (userAgent.indexOf("Chrome") !== -1) {
		return "Chrome";
	} else if (userAgent.indexOf("Firefox") !== -1) {
		return "Firefox";
	} else if (userAgent.indexOf("Safari") !== -1) {
		return "Safari";
	} else if (userAgent.indexOf("Edge") !== -1) {
		return "Edge";
	} else if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident/") !== -1) {
		return "IE";
	} else {
		return "Unknown";
	}
}
browser = getBrowserType();



function Welcome() {
	if (ShowAlert==1) {
		// 浏览器检查
		var browserWarning = '某些元素可能无法在您的 ' + browser + ' 浏览器上正常渲染.';
		if (browser=='Chrome') {
			var browserWarning = '';
		}
		if (browser=='Edge') {
			var browserWarning = '';
		}
		if (browser=='Unknown') {
			var browserWarning = '某些元素可能无法在您的浏览器上正常渲染.';
		}
		if ($(window).width() < 600) {
			var browserWarning = '';
		}

		if (browserWarning=='') {
			// 弹出问候语
			message('Hello 🎉', 'info', 2500);
		} else {
			message(browserWarning, 'error', 5000);
		}
	}
}



// 菜单
function MenuOpen() {
	$('.menu').addClass('menu-active');
	$('#body').addClass('body-scroll');
	$('.menu-btn-2').fadeIn(300);
	if($('ul')
.hasClass('ok')!=true) {
		$('ul')
.addClass('ok');
		BlogListInit()
;
		NoticeListInit()
;
	}
}

function MenuClose() {
	$('#body').removeClass('body-scroll');
 	$('.menu').removeClass('menu-active');
	$('.menu-btn-2').fadeOut(300);
}

function MenuCheck1() {
	$('#search').css('transition', 'all 0.3s ease-out 0s');
	if($('#menu-check-1').hasClass('menu-check-active')!=true) {
		$('#menu-check-1').addClass('menu-check-active');
		$('#search').css('opacity', '1');
		$('#search').css('height', document.getElementById('searchInput').name * 22 +55 + 'px');
	} else {
		$('#menu-check-1').removeClass('menu-check-active');
		$('#search').css('height', '0px');
		$('#search').css('opacity', '0');
	}
}

function MenuCheck2() {
	if($('#menu-check-2').hasClass('menu-check-active')!=true) {
		$('#menu-check-2').addClass('menu-check-active');
		$('.MenuCheck2-inner').css('height', '120px');
		$('.MenuCheck2-inner').css('opacity', '1');
	} else {
		$('#menu-check-2').removeClass('menu-check-active');
		$('.MenuCheck2-inner').css('height', '0px');
		$('.MenuCheck2-inner').css('opacity', '0');
	}
}

function MenuCheck3() {
	if($('#menu-check-3').hasClass('menu-check-active')!=true) {
		$('#menu-check-3').addClass('menu-check-active');
		$('.MenuCheck3-inner').fadeIn(240);
	} else {
		$('#menu-check-3').removeClass('menu-check-active');
		$('.MenuCheck3-inner').fadeOut(240);
	}
}



function pageloading(m) {
	if(m==1) {
		clearInterval(timer0);
		$('.pageloading').fadeIn(150);
		$('.pageloading1').css('display', 'none');

		timer0 = setInterval(() => {
			$('.pageloading1').fadeIn(150);
			clearInterval(timer0);
		},20000)

	} else {
		clearInterval(timer0);
		$('.pageloading1').css('display', 'none');
		$('.pageloading').fadeOut(300);
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



/* Console.log */
console.log( 
	'\n%c Theme %c S E K A I %c		ver.1.0.17\n',
	'background-color: rgba(57, 145, 216, 0.5); color: white; font-weight: bolder;',
	'background-color: rgba(57, 145, 216, 0.3); color: white;',
	'color: rgba(192, 194, 194, 1);',
);

setTimeout(console.groupCollapsed.bind(
	console, 
	'%cDetails%c()',
	'color: rgba(100, 102, 102, 0.8)',
	'color: rgba(100, 102, 102, 1)',
));
setTimeout(console.log.bind(
	console, 
`	%cOnline:		` + runtime + ` Days
	Device:		` + device + `: ` + $(window).width() + ` × ` + $(window).height()  + `
	States:		` + states + `
	Browser:	` + browser + ` [` + lang +`]

	%c` + new Date() + `
`,
	'color: rgba(100, 102, 102, 0.8)',
	'color: rgba(192, 194, 194, 1);'
));
setTimeout(console.groupEnd.bind());






exam = 'ok';


