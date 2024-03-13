


/*
   Console.log Info.
   F: Fix      +: New function      -: Remove function
   Version: x.xx (version) .x.xx (date)
*/

Version = 'Release.0.02.27.03.10';
Update = `Update:		F 重写播放器样式
`;

playerMode = 1



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



// header 样式

/* 防抖函数	From https://blog.csdn.net/SongZhengxing_/article/details/128188882		*/
function Debounce(handle, delay) {
	let timer = null;
	return function () {
		let _self = this,
		_args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
		handle.apply(_self, _args)
		}, delay)
	}
}

/* 节流函数	From https://blog.csdn.net/weixin_46279019/article/details/121681896		*/
function throttle(fn,wait){
	var pre = Date.now();
	return function(){
		var context = this;
		var args = arguments;
		var now = Date.now();
		if( now - pre >= wait){
			fn.apply(context,args);
		pre = Date.now();
	}
	}
}


 
function handle(){
	if ($(window).scrollTop() > $('.main').offset().top-60) {
		$('#header').addClass('header-active');
		$('.header-item').addClass('link-2');
		$('.header-shell').addClass('header-shell-active');
	} else {
		$('#header').removeClass('header-active');
		$('.header-item').removeClass('link-2');
		$('.header-shell').removeClass('header-shell-active');
	}
	if (playerMode==3) {
		if ($(window).scrollTop() > $('.main').offset().top-$(window).height()+50) {
			$('.Player').addClass('Player-active');
		} else {
			$('.Player').removeClass('Player-active');
		}
	}
}
    

window.addEventListener("scroll",throttle(handle,100));


// 配饰移动设备
if ($(window).width() < 900) {
	var device = 'Mobile';
	setTimeout(function (){
		if($('#load-img').hasClass('fade-in-1')!=true) {
			$('#load-img').addClass('fade-in-1');
		}
	},5000)

	// 把播放器调到最小
	setTimeout(function (){
		$('.Player').addClass('Player-mode3');
		$('.Player').removeClass('Player-mode1');
	},200)
	$('#player').fadeOut(300);
	$('.Player-menu').fadeOut(300);
	$('.PlayerImgBox').fadeOut(300);
	$('.Player-Button').html('');

	playerMode = 3;
} else {
	var device = 'Desktop';
}

if (document.domain=="") {
	var states = 'Local';
} else {
	var states = 'Network';
}



// 初始化样式
Adjust();

// 屏幕适应函数
function Adjust(){
	if ($(window).width() < 900) {
		if ($(window).height() > $(window).width()) {
			// 宽度小于 900px 且 高 > 宽 时尝试以下样式 
			$('#background').css('display', 'block');
			$('.background-title').css('display', 'block');
			$('.container').css('display', 'none');
			$('#background').attr('src', 'src/background smaller.webp' );
		} else {
			$('#background').css('display', 'none');
			$('.container').css('display', 'block');
			$('.background-title').css('display', 'none');
		}

	} else {
		$('#background').css('display', 'none');
		$('.container').css('display', 'block');
		$('.background-title').css('display', 'block');

		// 考虑到电脑有复制粘贴快捷键，所以只屏蔽电脑的右键菜单
		window.document.oncontextmenu = function(){ 
			return false;
		} 
	}
	// 检测窗口大小改变后的滚动条位置
	if ($(window).scrollTop() > $('.main').offset().top-60) {
		$('#header').addClass('header-active');
		$('.header-item').addClass('link-2');
		$('.header-shell').addClass('header-shell-active');
	} else {
		$('#header').removeClass('header-active');
		$('.header-item').removeClass('link-2');
		$('.header-shell').removeClass('header-shell-active');
	}
}



// 监听到窗口大小改变后，执行屏幕适应函数
window.onresize = function(){
	Adjust();
}

// 判定元素是否可见 ( 这是ChatGPT写的... )
function isInViewport(element) {
	var rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= window.innerHeight &&
		rect.right <= window.innerWidth
	);
}



// 显示播放器
if (device!='Mobile') {
	setTimeout(function (){
		$('.Player').addClass('Player-active');
	},500)
}



// Some Normal Functions

function ToMainPage(){
	var target = $(".main");
	var offsetTop = target.offset().top - 80;
	$("html,body").animate({scrollTop: offsetTop}, 500);
};

function ToBlog(){
	var target = $(".blog-3");
	var offsetTop = target.offset().top - 180;
	$("html,body").animate({scrollTop: offsetTop}, 500);

	setTimeout(function (){
		blog();
	},600)
};

function ToTop(){
	if ($('.blog').hasClass('blog-active')==false) {
		$("html,body").animate({scrollTop: 0}, 500);
	}
};

// iframe 监听器 	Borrowed From   https://www.cnblogs.com/JioNote/p/14578483.html
var iframeURL = '';
window.addEventListener('message', function (rs) {
	iframeURL = rs.data;
	$('title').text('Dragoft - ' + iframeURL[0]);
	if (iframeURL[2]!=='undefined') {
		eval(iframeURL[2]);
	}
});

function msg(tite, src, action) {
	window.postMessage([tite, src, action],"*");
	return '已将 iframe 页面的返回值设为' + tite + ', ' + src + ', ' + action;
}


function blog() {
	if ($('.blog').hasClass('blog-active')) {
		if (iframeURL[1]=='Homepage') {
			// 关闭博客页面
			$('.iframe').fadeOut();
			$('.blog-close').fadeOut();
			$('title').text('Dragoft - 主页');
			ClearURLParam();
			if (document.domain!='') {
				history.replaceState(null, null, window.location.href.split('org',1)[0] + 'org/');
			}
			if ($(window).width() > 900) {
				$('.headerbox').fadeIn();
			}
			setTimeout(function (){
				$('.blog').removeClass('blog-active');
				$('#body').removeClass('body-scroll');
			},300)
		} else {
			$('.iframe').fadeOut(400);
			setTimeout(function (){
				// 退回到博客主页
				document.getElementById('iframe').src = window.location.href.split('org',1)[0] + 'org/blog/Homepage/page.html';
			},400)
		}
	} else {
		if($("#iframe").length <1){
			// 第一次打开时，生成博客框架
			var iframe = document.createElement('iframe');
			iframe.setAttribute('name','frame');
			iframe.setAttribute('class','iframe');
			iframe.setAttribute('id','iframe');
			document.querySelector('.blog').appendChild(iframe);
			document.getElementById('iframe').src = window.location.href.split('org',1)[0] + 'org/blog/Homepage/page.html';
		} else {
			setTimeout(function (){
				$('.iframe').fadeIn(400);
			},400)
		}
		$('title').text('Dragoft - 博客');
		$('.blog').addClass('blog-active');
		$('#body').addClass('body-scroll');
		$('.headerbox').fadeOut();
		$('.header').fadeIn();
		$('.blog-close').fadeIn();

		if (document.domain!='') {
			history.replaceState(null, null, window.location.href.split('org',1)[0] + 'org/blog?id=Homepage');
		} else {
			changeURLStatic('id', 'Homepage');
		}
	}
}

// 满足某些博客文章全屏的要求
function fullscreenOFF() {
	if(!$('#header').hasClass('header-active')){
		$('#header').css('display', 'block');
		$('.header-shell').css('display', 'block');
		$('.Player').css('display', 'block');

		$('#header').addClass('header-active');
		$('.header-item').addClass('link-2');
		$('.header-shell').addClass('header-shell-active');
		$('.blog-close').fadeIn();
		$('.Player').removeClass('Player-inactive');
	}
}
function fullscreenON() {
	$('#header').removeClass('header-active');
	$('.header-item').removeClass('link-2');
	$('.header-shell').removeClass('header-shell-active');
	$('.blog-close').fadeOut();
	$('.Player').addClass('Player-inactive');
	setTimeout(function (){
		$('#header').css('display', 'none');
		$('.header-shell').css('display', 'none');
		$('.Player').css('display', 'none');
	},1000)
}

// 博客页面切换
function Jump(Path) {
	$('.iframe').fadeOut(400);
	setTimeout(function (){
		document.getElementById('iframe').src = window.location.href.split('org',1)[0] + 'org/blog/' + Path + '/page.html';
	},400)
}



/* From https://blog.csdn.net/qq_41090476/article/details/96111016 */
$(body).click(function(e){
	var e = e || window.event;
	var elem = e.target;
	if($(elem).is('.Haku') || $(elem).is('.Haku *')){
		if(!$('.Haku').hasClass('Haku-active')){
			$('.Haku').addClass('Haku-active');
		} else {
			$('.Haku').removeClass('Haku-active');
		}
	}else{
		$('.Haku').removeClass('Haku-active');
	}	
})

function Typewriter() {
	var sentence = [
		// 标题语列表

		'^1000吼！',
		'不要揪我的尾巴！',
		'一只很懒的博主.',
		'Html！',
		'不要揪我的尾巴！',
		'一夜鱼龙舞.', 
		'小白一只.',
		'Java^1000Script！',
		'不要揪我的尾巴！',
		'文案写得不好，^300请多谅解！',

		];

	var RandomSentence = sentence[Math.floor(Math.random() * sentence.length)];
	$('.Typewriter-1').typed({
		strings: [RandomSentence],
		typeSpeed: 40,
		showCursor: false,
	});
}

// 打出标题语
let timer1 = setInterval(() => {
	if (isInViewport(document.querySelector('.Haku'))) {
		Typewriter();
       		clearInterval(timer1);
	}
},500)



// 页脚文字
document.getElementById('footer-1').innerHTML = 'Copyright © ' + new Date().getFullYear() + ' Dragoft. All rights reserved.';
document.getElementById('footer-2').innerHTML = '已上线 | ' + runtime + ' 天';

// 显示博客文章数量
document.querySelector('.blog-num').innerHTML = BlogList.length;



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



/* Console.log */
console.log( 
	'\n%cBailong.eu.org \n%c这里是 %cDragoft %c的个人主页!' + '\n\n%c已上线: %c' + runtime + ' %c天.\n',
	'color: rgba(196, 169, 139, 0.8)',
	'color: rgba(100, 102, 102, 0.8)',
	'color: rgba(113, 199, 173, 0.8)',
	'color: rgba(100, 102, 102, 0.8)',
	'color: rgba(100, 102, 102, 0.8)',
	'color: rgba(244, 183, 188, 0.9)',
	'color: rgba(100, 102, 102, 0.8)'
);

setTimeout(console.groupCollapsed.bind(
	console, 
	'%cDetails%c()',
	'color: rgba(100, 102, 102, 0.8)',
	'color: rgba(100, 102, 102, 1)',
));
setTimeout(console.log.bind(
	console, 
`	%cOwner:		Dragoft.
	Online:		2023.2.3
	Device:		` + device + `: ` + $(window).width() + ` × ` + $(window).height()  + `
	States:		` + states + `
	Browser:	` + browser + `

	除了 Cloudflare Web Analytics 的网站访问数据统计, 我们不会收集或储存您的任何信息, 可以放心浏览 :)
`,
	'color: rgba(100, 102, 102, 0.8)',
));
setTimeout(console.groupCollapsed.bind(
	console, 
	'%cVersion:	%c' + Version,
	'color: rgba(100, 102, 102, 1)',
	'color: rgba(244, 183, 188, 1); text-decoration: underline;',
));
setTimeout(console.log.bind(
	console, 
	'%c' + Update,
	'color: rgba(100, 102, 102, 0.8)',
));
setTimeout(console.groupEnd.bind());
setTimeout(console.groupEnd.bind());






/* 弹窗函数 */
if (ShowAlert==1) {
setTimeout(function (){
		var browserWarning = `
			<br />
			<code style='font-size: 15px; background-color: rgb(255, 251, 229); border: 1px solid rgb(255, 245, 194); color: rgb(92, 60, 0);' >某些元素可能无法在您的 ` + browser + ` 浏览器上正常渲染.</code>
		`;
		if (browser=='Chrome') {
			var browserWarning = '';
		}
		if (browser=='Edge') {
			var browserWarning = '';
		}
		if (browser=='Unknown') {
			var browserWarning = `
				<br />
				<code style='font-size: 15px; background-color: rgb(255, 251, 229); border: 1px solid rgb(255, 245, 194); color: rgb(92, 60, 0);' >某些元素可能无法在您的浏览器上正常渲染.</code>
			`;
		}

		swal({
			title: "<div style='text-align: left; margin-left: 10%;' >欢迎 🎉</div>",
			text: `
				<hr style='border: none; border-top: 1px solid rgba(151, 153, 153, 0.3); width: 80%; text-align: center; margin-top: -20px;' />
				<div style='text-align: left; margin-left: 10%; margin-top: 15px; width: 80%;' >
					这里是 <ins>Dragoft</ins> 的个人主页.
					<br />
					<br />
					简单 & 温暖的博客，不定期更新各类文章！
					<br />
					祝您拥有愉快的一天！
					<br />
					` + browserWarning + `
				</div>
			`,
			confirmButtonText: "关闭",
			html: true,
			allowOutsideClick: true,
			timer: 5000,
		},);
	},1200)
}

function Others() {
	swal({
		title: "其他",
		text: "<hr style='border: none; border-top: 1px solid rgba(151, 153, 153, 0.2); width: 80%; text-align: center;' />哈！空的.<br />",
		confirmButtonText: "关闭",
		type: "info",
		html: true,
		allowOutsideClick: true,
	},);
}

function info1() {
	swal({
		title: "<div style='text-align: left; margin-left: 10%;' >背景图片</div>",
		text: `
			<div class='t-28' >
				由于某些原因，我无法与这幅作品的 画师 或 版权所有者 取得联系.
				<br />
				本站属于非营利性网站，未将其应用于任何商业用途. 但为配合网站需求，已对原作进行一定修改.
				<br />
				<a class="link" target="_blank" href="https://www.pinterest.com/pin/290411875981302592/" >原图链接</a>
				 | 
				<a class="link" href="javascript:;" >STUDIO GHIBLI</a>
				<br />
				<br />
				若侵犯了您的权利，请联系 <a class="link hint--top hint--rounded" target="_blank" href="mailto:dragoft@bailong.eu.org" data-hint="请注明您的相关信息" >dragoft@bailong.eu.org</a> 核实后我将会做出调整.
				<br />
				<br />
				<br />
				您可以在这里下载它：
				<br />
				<br />
				<code class="hint--right hint--rounded" data-hint="成品" style="font-family: 'Poppins Regular';" >
					<a class="t-27" target="_blank" href="src/Chihiro and Haku (Spirited Away) 1920×1080.png" download="Chihiro and Haku (Spirited Away) 1920×1080.png" >
						 <span style="opacity: 0.5;">|</span> Chihiro and Haku (1920×1080).png
					</a>
				</code>
				<br />
				<code class="hint--right hint--rounded" data-hint="原始文件" style="margin-top: 8px; font-family: 'Poppins Regular';" >
					<a class="t-27" target="_blank" href="src/Origin.zip" download="Origin.zip" > <span style="opacity: 0.5;">|</span> Resources (Original).zip</a>
				</code>
				<br />
			</div>
		`,
		confirmButtonText: "关闭",

		html: true,
		allowOutsideClick: true,
	},);
}