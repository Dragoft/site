/*
   调用网易云的 API , 自己乱搞搞出来的播放器.
   最后更新 2024-2-10

   同步歌单: https://music.163.com/#/playlist?id=8087950314
*/

var music = [
	{
		name: 'End Credits (Xeuphoria Piano Ver.) - Xeuphoria',
		src: 'https://music.163.com/song/media/outer/url?id=1872016809.mp3',
		img: 'src/End Credits (Cover).webp',
	},
	{
		name: 'One Day - KISNOU',
		src: 'https://music.163.com/song/media/outer/url?id=448316625.mp3',
		img: 'https://p2.music.126.net/9QkYHkN8UCiybMg-qHempw==/109951168047707020.jpg',
	},
	{
		name: 'アシタカとサン - 久石譲',
		src: 'https://music.163.com/song/media/outer/url?id=444805.mp3',
		img: 'https://p1.music.126.net/ssLtfKomzOOqn_e26E802w==/109951164728014642.jpg',
	},
	{
		name: 'ワタリドリ - KOKIA',
		src: 'https://music.163.com/song/media/outer/url?id=2101452199.mp3',
		img: 'https://p1.music.126.net/rLHKvau26Wt2KA5DJc_u6A==/109951169067925149.jpg',
	},
	{
		name: 'ビー玉 - HACHI',
		src: 'https://music.163.com/song/media/outer/url?id=2067064660.mp3',
		img: 'https://p2.music.126.net/gV3GNl_4wk4GfzgxrLEAFA==/109951168763893211.jpg',
	},
	{
		name: 'yol - 古川本舗 / 佐藤千亜妃',
		src: 'https://music.163.com/song/media/outer/url?id=2080132803.mp3',
		img: 'https://p1.music.126.net/_blxLIGhNHF4BgBEduSDzA==/109951168898710595.jpg',
	},
	{
		name: '星の寿命 - whoo',
		src: 'https://music.163.com/song/media/outer/url?id=34999786.mp3',
		img: 'https://p2.music.126.net/0B1PBp9g5l_Fl12Qwspw8Q==/3261151489004368.jpg',
	},
	{
		name: '春弦 - 塞壬唱片-MSR / 横山克',
		src: 'https://music.163.com/song/media/outer/url?id=1436614177.mp3',
		img: 'https://p2.music.126.net/UXMjt2DLm7N2NCuW1NbXoA==/109951164860965324.jpg',
	},
	{
		name: 'Friend - Kozoro',
		src: 'https://music.163.com/song/media/outer/url?id=33004707.mp3',
		img: 'https://p2.music.126.net/FR7zKYB8ujNRoWQuGCHbGg==/109951163288692527.jpg',
	},
	{
		name: 'Together - Bcalm / Purrple Cat',
		src: 'https://music.163.com/song/media/outer/url?id=1916742663.mp3',
		img: 'https://p2.music.126.net/zJBR2s3mTC06Z-v4npw2Jw==/109951168736565471.jpg',
	},
	{
		name: 'Aurora - Sappheiros',
		src: 'https://music.163.com/song/media/outer/url?id=446875940.mp3',
		img: 'https://p2.music.126.net/WLktzGKNbuF6N7a7OrgtCA==/109951168552453961.jpg',
	},
	{
		name: 'Saudade (Original Mix) - Kupla',
		src: 'https://music.163.com/song/media/outer/url?id=518904157.mp3',
		img: 'https://p2.music.126.net/c04kf5BCGexeunM4MfAkHw==/109951165069828217.jpg',
	},
	{
		name: 'Shelter (Piano version) - Porter Robinson / Madeon',
		src: 'https://music.163.com/song/media/outer/url?id=461347460.mp3',
		img: 'https://p2.music.126.net/nEaSbkg_Cn8gN9vLoSz0gQ==/18494885092595843.jpg',
	},
	{
		name: 'Theme of ONE PUNCH MAN~sadness~ - 宮崎誠',
		src: 'https://music.163.com/song/media/outer/url?id=41632439.mp3',
		img: 'https://p1.music.126.net/03pcOtiYji76c55s64mbzw==/6639950721829070.jpg',
	},
	{
		name: "Arrietty’s Song (カラオケ) - Cécile Corbel",
		src: 'https://music.163.com/song/media/outer/url?id=2324515.mp3',
		img: 'https://p2.music.126.net/7HGqzeDKWw9ZIGSj4yRs3A==/109951163914469067.jpg',
	},
	{
		name: "カメリア - 大神ミオ",
		src: 'https://music.163.com/song/media/outer/url?id=2110680224.mp3',
		img: 'https://p2.music.126.net/JlxHCRJi7i4OjvxsqhImog==/109951169195605007.jpg',
	},
	{
		name: "Fragile Voices - Adib Sin / Bao The Whale",
		src: 'https://music.163.com/song/media/outer/url?id=1302091532.mp3',
		img: 'https://p1.music.126.net/-BeDc-pw84wsfmTC_DX0nQ==/109951164659012739.jpg',
	},
	{
		name: "原風景(instrumental) - mamomo",
		src: 'https://music.163.com/song/media/outer/url?id=1811160889.mp3',
		img: 'https://p1.music.126.net/ct9bs4VXR1mrbVRsX9iboA==/3372202162443903.jpg',
	},
	{
		name: 'like water - Park Bird / Chance Thrash',
		src: 'https://music.163.com/song/media/outer/url?id=1847674461.mp3',
		img: 'https://p2.music.126.net/FPZrJuBWnJKtR9_4zXmMOQ==/109951166009136375.jpg',
	},
	{
		name: 'Shenandoah - Goldmund',
		src: 'https://music.163.com/song/media/outer/url?id=2640546.mp3',
		img: 'https://p1.music.126.net/tS_y-3xB-BjWuYU-tZGcEQ==/109951163678759858.jpg',
	},
	{
		name: 'Bittersweet - 渡星',
		src: 'https://music.163.com/song/media/outer/url?id=1473212760.mp3',
		img: 'https://p1.music.126.net/MMASnAgdlP9e_Zpzo3lOUQ==/109951165258328565.jpg',
	},
];



// Player Setting
song = 0;
MusicNum = music.length;

var player = document.getElementById('player');
var MusicName = document.getElementById('MusicName');
var MusicControl1 = document.getElementById('Prev');
var MusicControl2 = document.getElementById('Next');
var MusicImg = document.getElementById('PlayerImg');
var PlayerDownloadP = document.getElementById('PlayerDownloadP');
var PlayerDownloadM = document.getElementById('PlayerDownloadM');

player.volume = 0.4;



MusicInfo();
function MusicInfo() {
	MusicName.innerHTML = music[song]['name'];
	player.src = music[song]['src'];
	PlayerDownloadP.href = music[song]['img'];
	PlayerDownloadM.href = music[song]['src'];
	PlayerDownloadM.download = music[song]['name'].replace(/\//g, '&');

	// 封面加载
	MusicImg.src = music[song]['img'];

	// 计算是否为歌曲名添加滚动效果.
	if (MusicName.offsetWidth>130) {
		MusicName.classList.add('loop-animation');
	} else {
		MusicName.classList.remove('loop-animation');
	}
}

function MusicNext() {
	if (song==MusicNum-1) {
		song = -1;
	}
	song++
	MusicInfo();
	player.play();
}

function MusicLast() {
	if (song==0) {
		song = MusicNum;
	}
	song--
	MusicInfo();
	player.play();
}

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
		MusicNext();
}, false);

// 显示 隐藏播放器
function Player() {
	if($('.Player').hasClass('PlayerWait')==true) {
		return null;
	}
	setTimeout(function (){
		$('.Player').removeClass('PlayerWait');
	},800)

	// 复杂
	if(playerMode==1){
		$('.Player').addClass('Player-mode2');
		$('.Player').addClass('PlayerWait');
		$('.Player').removeClass('Player-mode1');
		$('.Player-menu').fadeIn(800);
		PlayerList();

		// 计算是否为歌曲名添加滚动效果.
		if (MusicName.offsetWidth>130) {
			MusicName.classList.add('loop-animation');
		} else {
			MusicName.classList.remove('loop-animation');
		}

		playerMode = 2;
		return null;
	}
	// 极简
	if(playerMode==2){
		$('.Player').addClass('PlayerWait');
		setTimeout(function (){
			$('.Player').addClass('Player-mode3');
			$('.Player').removeClass('Player-mode2');
		},200)
		$('#player').fadeOut(300);
		$('.Player-menu').fadeOut(300);
		$('.PlayerImgBox').fadeOut(300);
		$('.Player-Button').html('');

		playerMode = 3;
		handle();
		return null;
	}
	// 简单
	if(playerMode==3){
		$('.Player').addClass('PlayerWait');
		$('.Player').addClass('Player-mode1');
		$('.Player').addClass('Player-active');
		$('.Player').removeClass('Player-mode3');
		$('.Player-Button').html('');

		setTimeout(function (){
			$('.PlayerImgBox').fadeIn(200);
			$('.player').fadeIn(200);
			$('#player').fadeIn(300);
		},500)
		playerMode = 1;
		return null;
	}
}

// 播放 & 暂停
playerPause = 1
function Play() {
	if(playerPause==1){
		player.play();
		$('#PlayerPlay').html('');
		playerPause = 0;
	} else {
		player.pause();
		$('#PlayerPlay').html('');
		playerPause = 1;
	}
}

// 函数调用
function play(num, auto) {
	song = num;
	MusicInfo();
	if (auto==true) {
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
			a.setAttribute('onclick', 'play(' + i + '); player.play(); playerPause = 0;');

			document.querySelector('.PlayerListInner').appendChild(a);
		}

	}
}


