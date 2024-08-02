/*
   调用网易云了的 API
   参考了 www.jq22.com/jquery-info14295 的 UI 设计.
   最后更新 2024-6-6

   同步歌单: https://music.163.com/#/playlist?id=8087950314
*/

var music = [
	{
		name: 'End Credits (Xeuphoria Piano Ver.) - Xeuphoria',
		src: 'https://music.163.com/song/media/outer/url?id=1872016809.mp3',
		img: 'src/End Credits (Cover).webp',
	},
	{
		name: "原風景 - mamomo / 丘咲アンナ",
		src: 'https://music.163.com/song/media/outer/url?id=33469247.mp3',
		img: 'https://p1.music.126.net/ct9bs4VXR1mrbVRsX9iboA==/3372202162443903.jpg?param=300y300',
	},
	{
		name: 'ワタリドリ - KOKIA',
		src: 'https://music.163.com/song/media/outer/url?id=2101452199.mp3',
		img: 'https://p1.music.126.net/rLHKvau26Wt2KA5DJc_u6A==/109951169067925149.jpg?param=300y300',
	},
	{
		name: 'アシタカとサン - 久石譲',
		src: 'https://music.163.com/song/media/outer/url?id=444805.mp3',
		img: 'https://p1.music.126.net/ssLtfKomzOOqn_e26E802w==/109951164728014642.jpg?param=300y300',
	},
	{
		name: 'Calling - MAROK / mamomo',
		src: 'https://music.163.com/song/media/outer/url?id=1944649836.mp3',
		img: 'https://p2.music.126.net/vrXsouN6rhgah68sHv4Akg==/109951169530454564.jpg?param=300y300',
	},
	{
		name: 'One Day - KISNOU',
		src: 'https://music.163.com/song/media/outer/url?id=448316625.mp3',
		img: 'https://p2.music.126.net/9QkYHkN8UCiybMg-qHempw==/109951168047707020.jpg?param=300y300',
	},
	{
		name: 'Saudade (Original Mix) - Kupla',
		src: 'https://music.163.com/song/media/outer/url?id=518904157.mp3',
		img: 'https://p2.music.126.net/c04kf5BCGexeunM4MfAkHw==/109951165069828217.jpg?param=300y300',
	},
	{
		name: 'Friend - Kozoro',
		src: 'https://music.163.com/song/media/outer/url?id=33004707.mp3',
		img: 'https://p2.music.126.net/FR7zKYB8ujNRoWQuGCHbGg==/109951163288692527.jpg?param=300y300',
	},
	{
		name: 'Together - Bcalm / Purrple Cat',
		src: 'https://music.163.com/song/media/outer/url?id=1916742663.mp3',
		img: 'https://p2.music.126.net/zJBR2s3mTC06Z-v4npw2Jw==/109951168736565471.jpg?param=300y300',
	},
	{
		name: 'Shelter (Piano version) - Porter Robinson / Madeon',
		src: 'https://music.163.com/song/media/outer/url?id=461347460.mp3',
		img: 'https://p2.music.126.net/nEaSbkg_Cn8gN9vLoSz0gQ==/18494885092595843.jpg?param=300y300',
	},
	{
		name: 'Disappear in Light - Equal Stones / Endless Melancholy',
		src: 'https://music.163.com/song/media/outer/url?id=29406314.mp3',
		img: 'https://p2.music.126.net/JIeHyV-yad8BDq_4GmsVuA==/2572857209028564.jpg?param=300y300',
	},
	{
		name: 'There Is Still Wonder Left To Behold - reche',
		src: 'https://music.163.com/song/media/outer/url?id=2017419119.mp3',
		img: 'https://p1.music.126.net/b4dFvmdWVTmHv6gKgdgzEQ==/109951168261721978.jpg?param=300y300',
	},
	{
		name: "Fragile Voices - Adib Sin / Bao The Whale",
		src: 'https://music.163.com/song/media/outer/url?id=1302091532.mp3',
		img: 'https://p1.music.126.net/-BeDc-pw84wsfmTC_DX0nQ==/109951164659012739.jpg?param=300y300',
	},
	{
		name: "Snowflakes - 佐々木恵梨",
		src: 'https://music.163.com/song/media/outer/url?id=2107925574.mp3',
		img: 'https://p2.music.126.net/Hf2sKfCVb91e1BtFncKe_w==/109951169156986673.jpg?param=300y300',
	},
	{
		name: "お天道様は笑ってる - KOKIA",
		src: 'https://music.163.com/song/media/outer/url?id=2101452195.mp3',
		img: 'https://p1.music.126.net/rLHKvau26Wt2KA5DJc_u6A==/109951169067925149.jpg?param=300y300',
	},
	{
		name: 'like water - Park Bird / Chance Thrash',
		src: 'https://music.163.com/song/media/outer/url?id=1847674461.mp3',
		img: 'https://p2.music.126.net/FPZrJuBWnJKtR9_4zXmMOQ==/109951166009136375.jpg?param=300y300',
	},
	{
		name: 'Bittersweet - 渡星',
		src: 'https://music.163.com/song/media/outer/url?id=1473212760.mp3',
		img: 'https://p1.music.126.net/MMASnAgdlP9e_Zpzo3lOUQ==/109951165258328565.jpg?param=300y300',
	},
	{
		name: '変わり行く世界のために - 茶太',
		src: 'https://music.163.com/song/media/outer/url?id=697291.mp3',
		img: 'https://p2.music.126.net/eiR5oFPitGtu1hzka4Vm5g==/814738116182197.jpg?param=300y300',
	}

];



// Player Setting

var player = document.getElementById('player');
var MusicImg = document.querySelector('.MusicImg');
var MusicName = document.querySelector('.MusicName');
var bar0 = document.querySelector('.bar0');
var bar1 = document.querySelector('.bar1');

song = 0;
MusicNum = music.length;
list = ""
long = "03:09"

player.volume = 0.4;



MusicInfo();
function MusicInfo() {
	MusicName.innerHTML = music[song]['name'];
	player.src = music[song]['src'];
	MusicImg.src = music[song]['img'];

	bar1.style.width = '0px';

	setTimeout(function (){
		if (!isNaN(player.duration)) {
			long = conversion(player.duration);
		}
	}, 1000);

	// 为当前播放歌曲添加样式
	if (list[song]!=undefined) {
		if (document.getElementById('list-item-active')!=undefined) {
			$('#list-item-active').removeAttr('id');
		}
		list[song].id = 'list-item-active'
	}
}



// 进度条
setInterval(() => {
	if(playerPause==0){
		var playtime = conversion(player.currentTime);
		var play_p = (Math.floor(player.currentTime) / Math.floor(player.duration)).toFixed(3);
		bar1.style.width = play_p * 100 + '%';
	}
}, 1000)



function MusicMode() {
	var MusicMode = document.getElementById('Mod');
	if (MusicMode.innerHTML=='') {
		// 列表循环
		MusicMode.innerHTML = '';
		MusicMode.title = '列表循环';
		player.loop = false;
	} else {
		// 单曲循环
		MusicMode.innerHTML = '';
		MusicMode.title = '单曲循环';
		player.loop = true;
	}
	
}

// 列表播放
player.addEventListener('ended', function () {
	if (song==MusicNum-1) {
		song = -1;
	}
	song++
	MusicInfo();
	player.play();
}, false);

// 播放器样式
function Player(m) {
	if($('.Player').hasClass('PlayerWait')==true) {
		return null;
	}
	setTimeout(function (){
		$('.Player').removeClass('PlayerWait');
	},250)

	// 展开
	if(playerMode==1){
		$('.Player').addClass('PlayerWait');
		$('.Player-menu').fadeIn(200);
		if (device == 'Mobile') {$('.MusicShow1').fadeOut(200)};
		PlayerList();

		playerMode = 2;
		return null;
	}
	// 简单
	if(playerMode==2){
		$('.Player').addClass('PlayerWait');
		$('.Player').addClass('Player-active');
		$('.Player-menu').fadeOut(200);
		if (device == 'Mobile') {$('.MusicShow1').fadeIn(400)};

		setTimeout(function (){
			$('.PlayerImgBox').fadeIn(200);
			$('.player').fadeIn(200);
			$('#player').fadeIn(300);
		},500)
		playerMode = 1;
		return null;
	}
}

// 显示 隐藏播放器
function MusicShow() {
	if($('.Player').hasClass('Player-phone')==true) {
		$('.Player').removeClass('Player-phone');
		$('.MusicShow0').css('display', 'block');
	} else {
		$('.Player').addClass('Player-phone');
		$('.MusicShow0').css('display', 'none');
	}
}

if (device == 'Mobile') {
	$('.Player').css('transform', 'translateX(182px)');
}

// 播放 & 暂停
playerPause = 1
function Play() {
	if(playerPause==1){
		player.play();
		$('.PlayerButton').addClass('PlayerButton-play');
		$('.PlayerButton').removeClass('PlayerButton-pause');
		playerPause = 0;
	} else {
		player.pause();
		$('.PlayerButton').addClass('PlayerButton-pause');
		$('.PlayerButton').removeClass('PlayerButton-play');
		playerPause = 1;
	}
}

// 函数调用
function play(num, auto) {
	song = num;
	MusicInfo();
	$('.PlayerButton').addClass('PlayerButton-pause');
	$('.PlayerButton').removeClass('PlayerButton-play');
	if (auto==true) {
		$('.PlayerButton').addClass('PlayerButton-play');
		$('.PlayerButton').removeClass('PlayerButton-pause');
		playerPause = 0;
		player.play();
	}
	return '' + music[song]['name'];
}

//显示播放列表
function PlayerList() {
	if(!$('.list-item').length) {

		$('#ListLength').html(MusicNum);
		for (var i = 0; i < MusicNum; i++) {
			var a = document.createElement('a')
			a.innerHTML = music[i]['name'];
			a.setAttribute('class', 'list-item');
			a.setAttribute('onclick', 'play(' + i + ', true)');

			document.querySelector('.PlayerListInner').appendChild(a);
		}

		list = document.querySelectorAll(".list-item")
		list[song].id = 'list-item-active'
	}
}

function conversion(value) {
	let minute = Math.floor(value / 60)
	minute = minute.toString().length === 1 ? ('0' + minute) : minute
	let second = Math.round(value % 60)
	second = second.toString().length === 1 ? ('0' + second) : second
	return `${minute}:${second}`
  }


