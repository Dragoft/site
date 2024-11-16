


/*	player.js
 *	created by Tatsuno Yuu, 2024/11/16

	*/



function loadMusicData() {
	return [

	{
		name: 'One Last Adventure - Evan Call',
		src: '2116382384',
		img: 'https://p1.music.126.net/8RdmkeoexrTxI7PdasUkhA==/109951169761664617.jpg',
		lrc: false,
	},
	{
		name: 'Calling - MAROK / mamomo',
		src: '1944649836',
		img: 'https://p2.music.126.net/vrXsouN6rhgah68sHv4Akg==/109951169530454564.jpg',
		lrc: false,
	},
	{
		name: "原風景 - mamomo / 丘咲アンナ",
		src: '33469247',
		img: 'https://p1.music.126.net/ct9bs4VXR1mrbVRsX9iboA==/3372202162443903.jpg',
		lrc: true,
	},
	{
		name: 'ワタリドリ - KOKIA',
		src: '2101452199',
		img: 'https://p1.music.126.net/rLHKvau26Wt2KA5DJc_u6A==/109951169067925149.jpg',
		lrc: true,
	},
	{
		name: 'アシタカとサン - 久石譲',
		src: '444805',
		img: 'https://p1.music.126.net/ssLtfKomzOOqn_e26E802w==/109951164728014642.jpg',
		lrc: false,
	},
	{
		name: 'Saudade (Original Mix) - Kupla',
		src: '518904157',
		img: 'https://p2.music.126.net/c04kf5BCGexeunM4MfAkHw==/109951165069828217.jpg',
		lrc: false,
	},
	{
		name: 'Friend - Kozoro',
		src: '33004707',
		img: 'https://p2.music.126.net/FR7zKYB8ujNRoWQuGCHbGg==/109951163288692527.jpg',
		lrc: false,
	},
	{
		name: 'Together - Bcalm / Purrple Cat',
		src: '1916742663',
		img: 'https://p2.music.126.net/zJBR2s3mTC06Z-v4npw2Jw==/109951168736565471.jpg',
		lrc: false,
	},
	{
		name: 'Shelter (Piano version) - Porter Robinson / Madeon',
		src: '461347460',
		img: 'https://p2.music.126.net/nEaSbkg_Cn8gN9vLoSz0gQ==/18494885092595843.jpg',
		lrc: false,
	},
	{
		name: '阔野 - Lcz Sv',
		src: '2049254735',
		img: 'https://p1.music.126.net/Pfyb7uA1nOI1rVhcWOJt9w==/109951168628232296.jpg',
		lrc: false,
	},
	{
		name: 'Disappear in Light - Equal Stones / Endless Melancholy',
		src: '29406314',
		img: 'https://p2.music.126.net/JIeHyV-yad8BDq_4GmsVuA==/2572857209028564.jpg',
		lrc: false,
	},
	{
		name: 'Gusts of Wind Blowing in Different Directions - The Last Dinosaur',
		src: '19498811',
		img: 'https://p1.music.126.net/f3exPjEKfsnrQbsUqUlb2w==/109951169557730207.jpg',
		lrc: false,
	},
	{
		name: 'There Is Still Wonder Left To Behold - reche',
		src: '2017419119',
		img: 'https://p1.music.126.net/b4dFvmdWVTmHv6gKgdgzEQ==/109951168261721978.jpg',
		lrc: true,
	},
	{
		name: 'bliss - milet',
		src: '2122535814',
		img: 'https://p1.music.126.net/b66bKUxVNZlC_S_3u7UCaA==/109951169268030489.jpg',
		lrc: true,
	},
	{
		name: 'One Day - KISNOU',
		src: '448316625',
		img: 'https://p2.music.126.net/9QkYHkN8UCiybMg-qHempw==/109951168047707020.jpg',
		lrc: false,
	},
	{
		name: 'like water - Park Bird / Chance Thrash',
		src: '1847674461',
		img: 'https://p2.music.126.net/FPZrJuBWnJKtR9_4zXmMOQ==/109951166009136375.jpg',
		lrc: false,
	},
	{
		name: 'この空であなたを待ってる - KOKIA',
		src: '1830163710',
		img: 'https://p2.music.126.net/resCPZ3quIJPxdn1HDt3ww==/109951165811423814.jpg',
		lrc: true,
	},
	{
		name: '変わり行く世界のために - 茶太',
		src: '697291',
		img: 'https://p2.music.126.net/eiR5oFPitGtu1hzka4Vm5g==/814738116182197.jpg',
		lrc: true,
	}

	]

}



const player = {}

player.list = loadMusicData()

player.data = {}
player.data.num = player.list.length
player.data.mode = 0
player.data.pause = 1
player.data.subwin = 0
player.data.lastScrollTop = 0
player.data.lrc = {}
player.data.lrc.data = ''
player.data.lrc.leng = null
player.data.lrc.now = null
player.data.lrc.open = 0




player.data.timer = {}
player.data.timer.t1 = null
player.data.timer.t2 = null
player.data.timer.t3 = null

player.data.nowplay = {}
player.data.nowplay.id = 0
player.data.nowplay.long = '03:09'
player.data.nowplay.now = 0

player.e = {
		body: document.getElementById('player'),
		frame: document.querySelector('.Player'),
		img: document.querySelector('.MusicImg'),
		name: document.querySelector('.MusicName'),
		bar0: document.querySelector('.bar2'),
		bar: document.querySelector('.bar1'),
		mode: document.getElementById('Mod'),
		menu: document.querySelector('.Player-menu'),
		list: document.querySelectorAll('.list-item'),
		list_body: document.querySelector('.PlayerListInner'),
		btn: document.querySelector('.PlayerButton'),
		subwin: document.querySelector('.Player-menu-info'),
		s1: document.querySelector('.Player-menu-sound1'),
		s2: document.querySelector('.Player-menu-sound0'),
		lrc: document.querySelector('.lrc'),
		lrcI: document.querySelector('.lrcImg'),
		lrcB: document.querySelector('.lrcBox'),

		cover0: document.querySelector('.MusicShow0'),
		cover1: document.querySelector('.MusicShow1'),
	}


 
player.f = {}

// 加载音乐信息
player.f.load = function(){
	var id = player.data.nowplay.id;

	player.e.name.innerHTML = player.list[id]['name']
	player.e.body.src = 'https://music.163.com/song/media/outer/url?id=' + player.list[id]['src'] + '.mp3'
	player.e.img.src = player.list[id]['img'] + '?param=300y300'
	player.e.bar.style.width = '0px'
	player.data.nowplay.now = 0

	$(player.e.lrcI).css('opacity', '0')
	player.f.lrc.get()

	setTimeout(function (){
		player.e.lrcI.src = player.list[id]['img'] + '?param=300y300'
		if (!isNaN(player.e.body.duration)) {
			player.data.nowplay.long = player.f.conversion0(player.e.body.duration)
		}
	}, 1000)
	if (player.e.list[0]) {
		$('.PlayerListInner').animate({scrollTop: player.e.list[0].offsetHeight * (player.data.nowplay.id - 1)}, 300)
	}

	// 为当前播放歌曲添加样式
	if (player.e.list[id] != undefined) {
		if ($('#list-item-active').length > 0) {
			$('#list-item-active').removeAttr('id');
		}
		player.e.list[id].id = 'list-item-active'
	}
}

// 切换播放模式
player.f.mode = function(){
	if (player.e.mode.innerHTML=='') {
		player.f.mode.set(1)
		return
	} else {
		player.f.mode.set(0)
		return
	}
}
	player.f.mode.set = function(mode){
		if (mode=='1') {
			// 列表循环
			player.e.mode.innerHTML = ''
			player.e.mode.title = '列表循环'
			player.e.body.loop = false
		}
		if (mode=='0') {
			// 单曲循环
			player.e.mode.innerHTML = ''
			player.e.mode.title = '单曲循环'
			player.e.body.loop = true
		}
	}

// 播放器样式变化
player.f.menu = function(){
	if(player.e.body.classList.contains('PlayerWait') || player.data.subwin == 1) {
		return
	}

	// 展开
	if(player.data.mode == 0){
		player.f.menu.set(1)
		return
	}
	// 关闭
	if(player.data.mode == 1){
		player.f.menu.set(0)
		return
	}
}
	player.f.menu.set = function(mode){
		if (mode=='1') {

			player.e.body.classList.add('PlayerWait')
			$(player.e.menu, 160).fadeIn(160)
			if (env.data.isMobile) {$(player.e.cover1).fadeOut(160)}
			player.f.list()

			player.data.mode = 1
			setTimeout(function (){
				$(player.e.body).removeClass('PlayerWait')
			},250)
		}
		if (mode=='0') {
			$(player.e.body).addClass('PlayerWait')
			$(player.e.body).addClass('Player-active')
			$(player.e.menu).fadeOut(160)
			if (env.data.isMobile) {$(player.e.cover1).fadeIn(400)}
			setTimeout(function (){
				$(player.e.body).fadeIn(200)
				$(player.e.frame).fadeIn(300)
				$('.PlayerImgBox').fadeIn(200)
			},500)
			player.data.mode = 0;
			setTimeout(function (){
				$(player.e.body).removeClass('PlayerWait')
			},250)
		}
	}

// 显示播放列表
player.f.list = function(force){
	if(player.e.list.length == 0 || force) {

		player.e.list_body.innerHTML = '';
		for (var i = 0; i < player.data.num; i++) {

			var a = document.createElement('a')
			a.innerHTML = player.list[i]['name'].split('-')[0]
			a.setAttribute('class', 'list-item')
			a.setAttribute('title', player.list[i]['name'])
			a.setAttribute('onclick', 'player.f.play.start(' + i + ', 1)')

			player.e.list_body.appendChild(a)
		}

		player.e.list = document.querySelectorAll(".list-item")
		player.e.list[player.data.nowplay.id].id = 'list-item-active'
		$(player.e.s1).animate({scrollTop: 600}, 0)
	}

}

// 播放、暂停
player.f.play = function(){
	if(player.data.pause == 1){
		player.f.play.set(1)
	} else {
		player.f.play.set(0)
	}
}
	player.f.play.set = function(mode){
		if (mode=='1') {
			player.e.body.volume = 0
			player.e.body.play()
			player.e.body.currentTime = (player.e.body.duration || 0) * player.data.nowplay.now
			player.e.body.volume = player.data.nowplay.vol

			player.data.pause = 0
			$(player.e.btn).addClass('PlayerButton-play')
			$(player.e.btn).removeClass('PlayerButton-pause')
		}
		if (mode=='0') {
			player.e.body.pause();
			$(player.e.btn).addClass('PlayerButton-pause')
			$(player.e.btn).removeClass('PlayerButton-play')
			player.data.pause = 1
		}
	}

	// 函数调用播放器
	player.f.play.start = function(id, autoplay){
		player.data.nowplay.id = id;
		player.f.load();
		$(player.e.btn).addClass('PlayerButton-pause')
		$(player.e.btn).removeClass('PlayerButton-play')
		if (autoplay == 1) {
			player.f.play.set(1)
		}
		return player.list[id]['name'];
	}

// 更新播放器列表
player.f.add = function(name, src, img, lrc) {
	player.list = [
		{
			'name': name,
			'src': src,
			'img': img,
			'lrc': lrc,
		}
	]
	player.data.nowplay.id = 0
	player.data.num = 1
	player.f.menu.set(1)

	if (player.data.pause == 0) {
		player.f.play()
	}

	player.f.add.ask(0)
	setTimeout(function (){
		player.f.load()
		player.f.list(1)
		player.f.menu.set(1)
	}, 500)
}
	player.f.add.ask = function(mode, name, src, img, lrc) {
		if (mode == 1) {
			player.data.subwin = 1
			clearInterval(player.data.timer.t1)
			clearInterval(player.data.timer.t2)

			setTimeout(function (){
				if(player.data.mode == 1){
					player.f.menu.set(0)
				}
			}, 2500)
			player.data.timer.t2 = setInterval(() => {
				if (env.data.isMobile) {$(player.e.cover1).fadeOut(200)}
				player.data.timer.t1 = setInterval(() => {
					if(player.data.subwin == 1) {
						player.f.add.ask(0)
						clearInterval(player.data.timer.t2)
					}
				}, 20000)

				if (env.data.isMobile) {
					$(player.e.cove1).fadeOut(200)
					$(player.e.frame).addClass('Player-phone')
					$(player.e.cover0).css('display',  'none')
				}
				$(player.e.subwin).fadeIn(200)
				$('.Player-menu-info-open').attr('onclick', 'player.f.add("' + name + '", "' + src + '", "' + img + '", ' + lrc + ')')
				clearInterval(player.data.timer.t2)

			}, 3000)

			return
		}
		if (mode == 0) {
			player.data.subwin = 0
			$(player.e.subwin).fadeOut(200)
			if (player.data.subwin == 0) {if(player.data.mode == 0){ if (env.data.isMobile) {$(player.e.cover1).fadeIn(200)}}}
			clearInterval(player.data.timer.t2);

			return
		}
	}

// 重置歌单
player.f.reset = function() {
	player.list = loadMusicData()
	player.data.num = player.list.length
	player.data.nowplay.id = 0
	player.f.list(1)
	player.f.load()

	if (player.data.pause == 0) {
		player.f.play()
	}
}

// 转换 mm:ss 时间
player.f.conversion0 = function(value) {
	var  minute = Math.floor(value / 60)
	var minute = minute.toString().length === 1 ? ('0' + minute) : minute
	var second = Math.round(value % 60)
	var second = second.toString().length === 1 ? ('0' + second) : second
	return `${minute}:${second}`
 }

player.f.conversion1 = function(str) {
	var parts = str.split(':')
	return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10)
}

// 调整音量
player.f.vol = function(n) {
	player.e.body.volume = n
}

// 显示、隐藏播放器
player.f.show = function() {
	if($(player.e.frame).hasClass('Player-phone')) {
		$(player.e.frame).removeClass('Player-phone')
		$(player.e.cover0).css('display',  'block')
	} else {
		$(player.e.frame).addClass('Player-phone')
		$(player.e.cover0).css('display',  'none')
	}
}

// 激活播放器
player.f.loadPlayer = function() {
	if (typeof env.tmp.t3 == 'undefined') {
		env.tmp.t3 = ''
		return
	}

	env.tmp.t3 = null
	delete env.tmp.t3
	$('.Player').addClass('Player-active')
}

player.f.lrc = {}

	player.f.lrc.get = function() {
		$(player.e.lrc).fadeOut(160)
		if (player.list[player.data.nowplay.id]['lrc']) {
			fetch('https://tatsuno.top/src/lrc/' + player.list[player.data.nowplay.id]['src'] + '.lrc')
			.then(response => {
				if (response.ok) {
					return response.text();
				}
			})
			.then(text => {
				player.data.lrc.data = text
				player.f.lrc.load(text)
			})
			.catch(error => {
				setTimeout(function (){$(player.e.lrc).fadeIn(160)}, 1000)
				player.e.lrc.innerHTML = '<br /><br /><br /><br /><br /><br /><div class="mTitle" >' + player.list[player.data.nowplay.id]['name'] + '<br /><br /><span>加载歌词失败</span></div><br /><br /><br /><br /><br /><br />'
			})
		} else {
			setTimeout(function (){
				player.e.lrc.innerHTML = '<br /><br /><br /><br /><br /><br /><div class="mTitle" >' + player.list[player.data.nowplay.id]['name'] + '<br /><br /><span>没有填词的纯音乐哦 ...</span></div><br /><br /><br /><br /><br /><br />'
				$(player.e.lrc).fadeIn(160)
			}, 1000)
		}
	}

	player.f.lrc.load = function(str) {
		player.data.lrc.leng = str.split('\n').length
		player.data.lrc.now = 0

		player.e.lrc.innerHTML = ''
		for (var i = 0; i < player.data.lrc.leng; i++) {

			var div = document.createElement('div')
				div.setAttribute('onclick', 'player.f.lrc.to("' + str.split('\n')[i].substring(1, 10) + '")')
				div.setAttribute('class', 'lrc-' + (i + 1))
				player.e.lrc.appendChild(div)

			var lrc = document.createElement('lrc')
				if (str.split('\n')[i].split('#')[1] != undefined) {
					lrc.innerHTML = (str.split('\n')[i].slice(12) || '<br /><br />').split('#')[0] + '<trans>' + str.split('\n')[i].split('#')[1] + '</trans>'
				} else {
					lrc.innerHTML = (str.split('\n')[i].slice(12) || '<br /><br />').split('#')[0]
				}
				div.appendChild(lrc)

			var span = document.createElement('span')
				span.innerHTML = str.split('\n')[i].substring(1, 6)
				span.setAttribute('class', 'lrcT')
				div.appendChild(span)

		}
		setTimeout(function (){
			player.e.lrc.innerHTML = '<br /><br /><br /><br /><br /><br /><div class="mTitle" >' + player.list[player.data.nowplay.id]['name'] + '</div><br />' +  player.e.lrc.innerHTML + '<br /><br /><br /><br /><br /><br />'
			player.f.lrc.find(player.e.body.currentTime)
			$(player.e.lrc).fadeIn(160)
		}, 1000)
	}

	player.f.lrc.conversion = function(str) {
		return +str.split(':')[0] * 60 + +str.split(':')[1];
	}

	player.f.lrc.read = function(n) {

		return player.data.lrc.data.split('\n')[n - 1] || null
	}

	player.f.lrc.gui = function() {

		if (!player.data.lrc.open) {
			player.f.lrc.find(player.e.body.currentTime)
			$(player.e.lrcB).fadeIn(160)
			player.data.lrc.open = 1
		} else {
			$(player.e.lrcB).fadeOut(160)
			player.data.lrc.open = 0
		}
	}

	player.f.lrc.find = function(n) {

		for (var i = 0; i < player.data.lrc.leng - 1; i++) {
			if (Number(player.f.lrc.conversion((player.f.lrc.read(i) || '[00:00.000]').substring(1, 10))) <= n) {
				player.data.lrc.now = i
			} else {
				$('.highlight').removeClass('highlight')
			}
		}
		$('.lrc-' + player.data.lrc.now).addClass('highlight')
	}

	player.f.lrc.to = function(n) {

		player.f.lrc.find(player.f.lrc.conversion(n))
		player.f.play.set(1)
		player.e.body.currentTime = player.f.lrc.conversion(n)
	}



player.f.load()
player.e.body.volume = 0.5
player.data.nowplay.vol = 0.5

// 进度条
setInterval(() => {
	if(player.data.pause == 0){
		player.data.nowplay.now = (player.e.body.currentTime / player.e.body.duration).toFixed(8) || player.data.nowplay.now
		$(player.e.bar).css('width', player.data.nowplay.now * 100 + '%')
	}
}, 1000)

// 进度调整
player.e.bar0.addEventListener('click', function(event) {
	var percent = ((event.clientX - player.e.bar0.getBoundingClientRect().left) / player.e.bar0.offsetWidth).toFixed(8)

	$(player.e.bar).css('width', percent * 100 + '%')
	player.data.nowplay.now = percent
	if (player.data.pause == 0) {
		player.e.body.currentTime = Math.floor(player.e.body.duration || player.f.conversion1(player.data.nowplay.long)) * percent
	}
})

// 歌词显示
player.e.body.addEventListener('timeupdate', function () {
	if (!player.data.pause && player.data.lrc.open && player.list[player.data.nowplay.id]['lrc'] && document.querySelector('.lrc-' + player.data.lrc.now) != null) {
		if (Number(player.f.lrc.conversion((player.f.lrc.read(player.data.lrc.now) || '[00:00.000]').substring(1, 10))) <= player.e.body.currentTime) {
			$('.highlight').removeClass('highlight')
			$('.lrc-' + player.data.lrc.now).addClass('highlight')
			$(player.e.lrc).animate({scrollTop: $(player.e.lrc).scrollTop() + $('.lrc-' + player.data.lrc.now).offset().top - 200}, 500)

			player.data.lrc.now ++
		}
	}
})

// 列表播放
player.e.body.addEventListener('ended', function () {
	if (player.data.nowplay.id == player.data.num - 1) {
		player.data.nowplay.id = -1
	}
	player.data.nowplay.id ++
	player.f.load()
	player.f.play.set(1)
})

// 调整音量
player.e.s1.addEventListener('scroll', () => {
	var size = 100 - (player.e.s1.scrollTop / 10).toFixed(0) + 10
	if (size < 0) {var size = 0}
	if (size > 100) {var size = 100}

	player.e.s2.innerHTML = size + '%'
	player.e.body.volume = size / 100
	player.data.nowplay.vol = size / 100
})

// 手机样式
if (env.data.isMobile) {
	$(player.e.frame).css('transform', 'translateX(182px)')
}


