


/*	script.js
 *	created by Tatsuno Yuu, 2024/8/27

	*/



// 通知列表
env.data.list.notice = [
	{
		date: '8.31',
		event: '第 4 次重构',
		content: '重写了主页 & 播放器的函数结构\n优化了网站的部分 api',
	},
	{
		date: '8.12',
		event: '调整主页样式',
		content: '调整了主页的样式\n更换了头像',
	},
	{
		date: '6.8',
		event: '留言板正式上线',
		content: '网站新增留言板功能！',
	},
	{
		date: '4.27',
		event: '细节优化',
		content: '对主页、博客样式进行了调整\n修复手机端界面最小宽度小于 380px 的问题',
	},
	{
		date: '4.6',
		event: '启用域名: tatsuno.top/',
		content: '新的域名，新的开始！',
	},

];



// 添加方法
env.f = {}
env.timer.t1 = null
env.timer.t2 = null

/* --------------------------------------
已占用的 tmp 变量
env.tmp.t1
env.tmp.t2

*/

// 剔除博客中被隐藏的文章
env.f.filter = function(arr, key, value) {
	return arr.filter(obj => obj[key] != value);
}

// 剔除博客中被隐藏的文章
env.f.filter = function(arr, key, value) {
	return arr.filter(obj => obj[key] != value);
}

// 设置 Cookie
env.f.setCookie = function(value) {
	var now = new Date();
	var oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); 
	var expires = oneWeekLater.toUTCString();
	document.cookie = "Cookie=" + value + "; expires=" + expires;
	return expires;
}

// 读取 Cookie
env.f.getCookie = function(name) {
	var pattern = new RegExp('(?:^|; )' + name + '=([^;]*)');
	var matches = document.cookie.match(pattern);
	if (matches) {
		return decodeURIComponent(matches[1]);
	}
	return undefined;
}

// 生成[min, max]范围内的随机整数
env.f.getRandom = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 获取浏览器类型
env.f.getBrowser = function() {
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

// 日期格式化
env.f.dateFormatter = function(formatter, date) {
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

// 大小格式化
env.f.sizeFormatter = function(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes === 0) return '0 Bytes';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
	return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}

// 计算网站上线时间
env.f.getDate = function() {
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

	document.getElementById('onlineDate').innerHTML = diffYears*365+diffDays
	return diffYears*365+diffDays
}

// iframe 通讯器
env.f.post = function(event) {
	document.getElementById('iframe').contentWindow.postMessage(event, document.domain.length == 0 && '*' || '/');
}

// 清除 url 参数
env.f.clearURL = function() {
	var url = window.location.href
	if (url.indexOf('?') !== -1) {
		var url = url.replace(/(\?|#)[^'"]*/, '')
		history.replaceState(null, null, url);
	}
}

// 清除 url 参数
env.f.blog = {}
	env.f.blog.open = function(id) {
		// 打开博客界面
		env.f.page.loading()

		$('.iframe').css('display', 'none')
		$('.blog').fadeIn(300)
		$('.blog').addClass('blog-active')

		// 修改地址栏参数
		if (document.domain!='') {
			history.replaceState(null, null, window.location.href.split('top',1)[0] + 'top/blog?id=' + id)
		} else {
			changeURLStatic('id', id)
		}

		setTimeout(function (){
			// 跳转指定文章
			env.data.change = 1
			if (env.data.states == "Local") {
				document.getElementById('iframe').src = 'blog/' + id + '/page.html'
			} else {
				document.getElementById('iframe').src = window.location.href.split('top',1)[0] + 'top/blog/' + id + '/page'
			}

			$('.menu-btn-3').css('transition', '0.3s')
		},400)

		// 返回按钮
		$('.menu-btn-3').fadeIn(400)
	}

	env.f.blog.close = function() {
		// 关闭博客页面
		env.f.page.loading.stop()

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
		if(player.data.subwin == 1) {
			player.f.add.ask(0);
		}

		$('title').text('tatsuno.top/');
	}

// 初始化博客、通知面板
env.f.init = function() {
	// 博客
	env.data.list.Bloglist = env.f.filter(env.data.list.Bloglist, 'type', 'hide');
	var BlogTEMP = env.data.list.Bloglist

	var ul = document.querySelector('ul');
	for (var i = 0; i < BlogTEMP.length; i++) {
		if (BlogTEMP[i]['type'] != 'hide') {
			var div = document.createElement('div');
				div.setAttribute('class', 'search-list');
				div.setAttribute('style', 'display: block');
				div.setAttribute('id', BlogTEMP[i]['type'] + ' ' + BlogTEMP[i]['name']);
				ul.appendChild(div);

			var a = document.createElement('a');
				a.setAttribute('onclick', `env.f.blog.open('` + BlogTEMP[i]['src'].slice(0, -1) + `')`);
				a.setAttribute('title', BlogTEMP[i]['details']);
				div.appendChild(a);

			if (BlogTEMP[i]['name'].slice(-1) == '') {
				a.innerHTML = BlogTEMP[i]['type'] + ' ' + BlogTEMP[i]['name'].substring(0, BlogTEMP[i]['name'].length - 1);
				var div1 = document.createElement('div');
					div1.setAttribute('class', 'pin');
					div1.setAttribute('title', 'Pinned');
					div1.innerHTML = '';
					div.appendChild(div1);
			} else {
				a.innerHTML = BlogTEMP[i]['type'] + ' ' + BlogTEMP[i]['name'];
			}
		}
	}

	// 显示博客文章数量
	document.querySelector('.blog-num').innerHTML = BlogTEMP.length;
	// 初始化搜索引擎
	document.onkeydown = function(e) {
		var ev = (typeof event!= 'undefined') ? window.event : e;
			 if(ev.keyCode == 13) {
				return false;
			}
	}
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



	// 通知
	var NoticeList = document.querySelectorAll(".news-box")
	var notice = env.data.list.notice
	for (var i = 0; i < 5; i++) {
		NoticeList[i].innerHTML = '<span class="news-date" >' + notice[i]['date'] + '</span><span title="' + notice[i]['content'] + '" >' + notice[i]['event'] + '</span>'
	}

}

// 循环检测
env.f.check = {}
	env.f.check.run = function() {
		var memory = env.data.memory.obj
		env.timer.t1 = setInterval(() => {
			env.data.memory.check = env.f.sizeFormatter(memory.usedJSHeapSize) + ' / ' + env.f.sizeFormatter(memory.totalJSHeapSize) + ' ' + ((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100).toFixed(1) + '%'
		}, 2000)

	}
	env.f.check.stop = function() {
		clearInterval(env.timer.t1 )
		env.data.memory.check = null
	}

// 变量快照
env.f.snapshot = function() {
	var result = []
	for (let key in window) {
		if (typeof window[key] !== 'function') {
			result.push({name: key, value: window[key], type: typeof window[key]})
		}
	}
	setTimeout(console.groupCollapsed.bind(
		console, 
		'snapshot ' + env.f.dateFormatter('hh:mm:ss', new Date())
	));
	setTimeout(console.table.bind(
		console, 
		result
	));
	setTimeout(console.groupEnd.bind());
}

// 弹窗
env.f.msg = function(content, type, time) {
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
}
	// 关闭消息框
	env.f.msg.close = function() {
		$('.message').removeClass('message-active');
	}

// 菜单
env.f.menu = {}
	env.f.menu.open = function() {
		if ($('ul').hasClass('wait') == true) {
			return
		}
		if ($('ul')
.hasClass('ok') != true) {
			$('ul')
.addClass('ok')
			$('ul')
.addClass('wait')
			env.f.init()
				setTimeout(function (){
				$('ul')
.removeClass('wait');
				$('.menu').addClass('menu-active');
				$('.menu-btn-2').fadeIn(300);
			}, 1000);
		} else {
			$('.menu').addClass('menu-active');
			$('.menu-btn-2').fadeIn(300);
		}
	}

		env.f.menu.close = function() {
 			$('.menu').removeClass('menu-active');
			$('.menu-btn-2').fadeOut(300);
		}

	env.f.menu.c1 = function() {
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

	env.f.menu.c2 = function() {
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

	env.f.menu.c3 = function() {
		if($('#menu-check-3').hasClass('menu-check-active')!=true) {
			$('#menu-check-3').addClass('menu-check-active');
			$('.MenuCheck3-inner').fadeIn(240);
		} else {
			$('#menu-check-3').removeClass('menu-check-active');
			$('.MenuCheck3-inner').fadeOut(240);
		}
	}

env.f.page = {}
	// 博客页面加载动画
	env.f.page.loading = function() {
		clearInterval(env.timer.t2)
		$('.pageloading').fadeIn(150)
		$('.pageloading1').css('display', 'none')

		env.timer.t2 = setInterval(() => {
			$('.pageloading1').fadeIn(150)
			clearInterval(env.timer.t2)
		},20000)
	}
		env.f.page.loading.stop = function() {
			clearInterval(env.timer.t2)
			$('.pageloading1').css('display', 'none')
			$('.pageloading').fadeOut(300)
		}

	// 博客页面加载完成后调用
	env.f.page.ok = function(title) {
		if (title.slice(0, 1) == '-') {
			$('title').text('tatsuno.top/ ' + title)
		} else {
			$('title').text(title)
		}

		setTimeout(function (){
			env.f.page.loading.stop()
			$('.iframe').fadeIn(400)
		},1000)
	}






// 设置环境变量
env.data.time = env.f.getDate()
env.data.visitors = 0
env.data.browser = env.f.getBrowser()
env.data.lang = navigator.language
env.data.device = $(window).width() < 900 && 'Mobile' || 'Desktop'
env.data.states = document.domain == '' && 'Local' || 'Network'
env.data.memory = {}
env.data.memory.obj = performance.memory
env.data.memory.check = null
env.data.change = 0

env.data.shoten = {
	'１階': [{'hall': 'flooded by books, nothing left.'}],
	'２階': [{
		'bedroom': 'yuu tatsuno',
		'living room': 'nothing',
		'toilet': 'nothing',
		'study': 'Chika Shirakawa',
		'kitchen': 'nothing',
	}]
}

$('title').text('tatsuno.top/')
history.pushState(null, null, location.href)

env.f.clearURL()
env.f.check.run()


// 设置全局监听器

// 接受博客页面的信号
window.addEventListener('message', function(event) {
	if (event.origin == 'null' || event.origin.includes('https://tatsuno.top')) {
		eval(event.data);
	}
})

// 页面加载完成后执行
window.addEventListener('load',function(){
	// 计算页面加载时间
	env.data.load = env.f.dateFormatter ('mm:ss', new Date() - new Date(env.tmp.t1)) + ' ' + (new Date() - new Date(env.tmp.t1)).toString() + 'ms'
	env.tmp.t1 = null
	delete env.tmp.t1

	// 获取访问量
	if (env.data.states == 'Network') {
		// 一周内的重复访问不计数
		if (env.f.getCookie('Cookie') == undefined) {
			var mode = 1
		} else {
			var mode = 0
		}

		fetch('https://tatsuno.top/counter.api', {
			method: "POST",
			headers: {
				"Token": mode
			}
		})
		.then(response => {return response.json()})
		.then(json => {
			env.data.visitors = json.results[0].content
			$('#visit_counter').html(env.data.visitors)
			$('#visit_counter_outer').fadeIn(300)

			env.f.setCookie('Cookie !')
		})
	} else {
		$('#visit_counter').html = env.data.visitors
		$('#visit_counter_outer').fadeIn(300)
	}

})

// 检测到后退，前进时，直接关闭博客页面
$('#iframe').on('load', function() {
	if (env.data.change != 1) {
		env.f.blog.close()
		env.data.change = 0
	} else {
		env.data.change = 0
	}
})

/* From https://blog.csdn.net/qq_41090476/article/details/96111016 */
$(body).click(function(e){
	var e = e || window.event;
	var elem = e.target;
	if($(elem).is('.t-21 *')){
		return;
	}
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



// 强制初始化页面
setTimeout(function (){
	if(document.querySelector('.Avatar').style.opacity!=1){
		env.f.msg('初始化异常，已强制加载页面', 'warn', 3000);
		init();
	}
}, 30000);



function Typewriter() {
	if (env.data.device == 'Desktop') {
		var sentence = [
			// 电脑标题语列表

			'あの、^1000今日は^200' + ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'][new Date().getDay()] + '^300ですか。',
			'こんにちは、^300これは TATSUNO のブログです！',
			'すみません、^300わたくしは初心者です。',
			'白川さんは映画が好きです。^400よく映画を見ます。',
			'白川さんは^200金曜日から^200日曜日まで^200休みます。',
			'おいしい！',
			'佐々木さんはもう食べました。',
			'白川さんは歌が好きですよ。',
			'あ！^400これ、^200これは白川さんの猫です！',
			'田中さんは時々図書館で勉強します。',
			'田中さんはいませんね。^400奈良へ行きました。',
			'あれは田中さんの花屋ですか。',
			'花屋に^300誰もいません。',
			'でも、^300昨日は寒くありませんでした。^400今日も。',
			'はい、^300これも私の毎日の仕事です。',
			'奈良より、^300ここの夏のほうが暑いです。',
			'わたしのアパートは^300書店の隣に^300あります。',
			'日本語が下手です。^400でも、^200日本語が好きです。',

		];
	} else {
		var sentence = [
			// 手机标题语列表

			['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'][new Date().getDay()],
			'これは何ですか。',
			'ここは…',
			'一个很懒的博主.',
			'Html！',
			'Hello world.',
			'はーい',
			'小白一只.',
			'私は新米です。',
			'Java^1000Script！',
			'Python！',
			'こんにちは。',
			'今日は^500' + ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'][new Date().getDay()] + '^300ですか。',
			'看上去很不错的样子...',
			'美味しかったです！',
			'   ',
			'昨日は寒かったです。',
			'Have a good day !'

		];
	}
	var RandomSentence = sentence[Math.floor(Math.random() * sentence.length)];
	$('.Typewriter-1').typed({
		strings: [RandomSentence],
		typeSpeed: 100,
		showCursor: false,
	});
}



/* Console.log */
console.log( 
	'\n%c Theme %c S E K A I %c		ver.1.0.18\n',
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
`	%cOnline:		` + env.data.time + ` Days
	Device:		` + env.data.device + `: ` + $(window).width() + ` × ` + $(window).height()  + `
	States:		` + env.data.states + `
	Browser:	` + env.data.browser + ` [` + env.data.lang +`]

	%c` + new Date() + `
`,
	'color: rgba(100, 102, 102, 0.8)',
	'color: rgba(192, 194, 194, 1);'
));
setTimeout(console.groupEnd.bind());






env.tmp.t2 = 'ok'


