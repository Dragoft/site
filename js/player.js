/*
   调用网易云了的 API
   参考了 www.jq22.com/jquery-info14295 的 UI 设计.
   最后更新 2024-6-6

   同步歌单: https://music.163.com/#/playlist?id=8087950314
*/



function loadMusicData() {
	return [

	{
		name: 'End Credits (Xeuphoria Piano Ver.) - Xeuphoria',
		src: '1872016809',
		img: 'src/End Credits (Cover).webp',
	},
	{
		name: "原風景 - mamomo / 丘咲アンナ",
		src: '33469247',
		img: 'https://p1.music.126.net/ct9bs4VXR1mrbVRsX9iboA==/3372202162443903.jpg?param=300y300',
	},
	{
		name: 'ワタリドリ - KOKIA',
		src: '2101452199',
		img: 'https://p1.music.126.net/rLHKvau26Wt2KA5DJc_u6A==/109951169067925149.jpg?param=300y300',
	},
	{
		name: 'アシタカとサン - 久石譲',
		src: '444805',
		img: 'https://p1.music.126.net/ssLtfKomzOOqn_e26E802w==/109951164728014642.jpg?param=300y300',
	},
	{
		name: 'Calling - MAROK / mamomo',
		src: '1944649836',
		img: 'https://p2.music.126.net/vrXsouN6rhgah68sHv4Akg==/109951169530454564.jpg?param=300y300',
	},
	{
		name: 'One Day - KISNOU',
		src: '448316625',
		img: 'https://p2.music.126.net/9QkYHkN8UCiybMg-qHempw==/109951168047707020.jpg?param=300y300',
	},
	{
		name: 'Saudade (Original Mix) - Kupla',
		src: '518904157',
		img: 'https://p2.music.126.net/c04kf5BCGexeunM4MfAkHw==/109951165069828217.jpg?param=300y300',
	},
	{
		name: 'Friend - Kozoro',
		src: '33004707',
		img: 'https://p2.music.126.net/FR7zKYB8ujNRoWQuGCHbGg==/109951163288692527.jpg?param=300y300',
	},
	{
		name: 'Together - Bcalm / Purrple Cat',
		src: '1916742663',
		img: 'https://p2.music.126.net/zJBR2s3mTC06Z-v4npw2Jw==/109951168736565471.jpg?param=300y300',
	},
	{
		name: 'Shelter (Piano version) - Porter Robinson / Madeon',
		src: '461347460',
		img: 'https://p2.music.126.net/nEaSbkg_Cn8gN9vLoSz0gQ==/18494885092595843.jpg?param=300y300',
	},
	{
		name: 'Disappear in Light - Equal Stones / Endless Melancholy',
		src: '29406314',
		img: 'https://p2.music.126.net/JIeHyV-yad8BDq_4GmsVuA==/2572857209028564.jpg?param=300y300',
	},
	{
		name: 'There Is Still Wonder Left To Behold - reche',
		src: '2017419119',
		img: 'https://p1.music.126.net/b4dFvmdWVTmHv6gKgdgzEQ==/109951168261721978.jpg?param=300y300',
	},
	{
		name: "Fragile Voices - Adib Sin / Bao The Whale",
		src: '1302091532',
		img: 'https://p1.music.126.net/-BeDc-pw84wsfmTC_DX0nQ==/109951164659012739.jpg?param=300y300',
	},
	{
		name: "Snowflakes - 佐々木恵梨",
		src: '2107925574',
		img: 'https://p2.music.126.net/Hf2sKfCVb91e1BtFncKe_w==/109951169156986673.jpg?param=300y300',
	},
	{
		name: "お天道様は笑ってる - KOKIA",
		src: '2101452195',
		img: 'https://p1.music.126.net/rLHKvau26Wt2KA5DJc_u6A==/109951169067925149.jpg?param=300y300',
	},
	{
		name: 'like water - Park Bird / Chance Thrash',
		src: '1847674461',
		img: 'https://p2.music.126.net/FPZrJuBWnJKtR9_4zXmMOQ==/109951166009136375.jpg?param=300y300',
	},
	{
		name: 'Bittersweet - 渡星',
		src: '1473212760',
		img: 'https://p1.music.126.net/MMASnAgdlP9e_Zpzo3lOUQ==/109951165258328565.jpg?param=300y300',
	},
	{
		name: '変わり行く世界のために - 茶太',
		src: '697291',
		img: 'https://p2.music.126.net/eiR5oFPitGtu1hzka4Vm5g==/814738116182197.jpg?param=300y300',
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

player.data.timer = {}
player.data.timer.t1 = null
player.data.timer.t2 = null
player.data.timer.t3 = null

player.data.nowplay = {}
player.data.nowplay.id = 0
player.data.nowplay.long = "03:09"
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

		cover0: document.querySelector('.MusicShow0'),
		cover1: document.querySelector('.MusicShow1'),
	}


 
player.f = {}

// 加载音乐信息
player.f.load = function(){
	var id = player.data.nowplay.id;

	player.e.name.innerHTML = player.list[id]['name']
	player.e.body.src = 'https://music.163.com/song/media/outer/url?id=' + player.list[id]['src'] + '.mp3'
	player.e.img.src = player.list[id]['img']
	player.e.bar.style.width = '0px'
	player.data.nowplay.now = 0

	setTimeout(function (){
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
			if (env.data.device == 'Mobile') {$(player.e.cover1).fadeOut(160)}
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
			if (env.data.device == 'Mobile') {$(player.e.cover1).fadeIn(400)}
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
			a.innerHTML = player.list[i]['name']
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

			setTimeout(function (){
				if (!isNaN(player.e.body.duration)) {
					player.e.body.currentTime = player.e.body.duration * player.data.nowplay.now
					player.e.body.volume = player.data.nowplay.vol

					player.data.pause = 0
					$(player.e.btn).addClass('PlayerButton-play')
					$(player.e.btn).removeClass('PlayerButton-pause')
				}
			},300)
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
player.f.add = function(name, src, img) {
		player.list = [
			{
				'name': name,
				'src': src,
				'img': img,
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
	player.f.add.ask = function(mode, name, src, img) {
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
				if (env.data.device == 'Mobile') {$(player.e.cover1).fadeOut(200)}
				player.data.timer.t1 = setInterval(() => {
					if(player.data.subwin == 1) {
						player.f.add.ask(0)
						clearInterval(player.data.timer.t2)
					}
				}, 20000)

				if (env.data.device == 'Mobile') {
					$(player.e.cove1).fadeOut(200)
					$(player.e.frame).addClass('Player-phone')
					$(player.e.cover0).css('display',  'none')
				}
				$(player.e.subwin).fadeIn(200)
				$('.Player-menu-info-open').attr('onclick', 'player.f.add("' + name + '", "' + src + '", "' + img + '")')
				clearInterval(player.data.timer.t2)

			}, 3000)

			return
		}
		if (mode == 0) {
			player.data.subwin = 0
			$(player.e.subwin).fadeOut(200)
			if (player.data.subwin == 0) {if(player.data.mode == 0){ if (env.data.device == 'Mobile') {$(player.e.cover1).fadeIn(200)}}}
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



player.f.load()
player.e.body.volume = 0.4
player.data.nowplay.vol = 0.4

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
	var size = 100 - (player.e.s1.scrollTop / 10).toFixed(0)
	if (size < 0) {var size = 0}
	if (size > 100) {var size = 100}

	player.e.s2.innerHTML = size
	player.e.body.volume = size / 100
	player.data.nowplay.vol = size / 100
})

// 手机样式
if (env.data.device == 'Mobile') {
	$(player.e.frame).css('transform', 'translateX(182px)')
}


