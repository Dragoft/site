/* 
   这些代码本来应该更加优雅地呈现在你眼前，只是那条笨龙不肯做优化。
   最后更新 2024-3-10
 */ 



BoxTYPE = 'ALL';
BlogTEMP = BlogList;
setTimeout(function (){init()},500);

function init() {

	// 计算页数
	long = Math.ceil(BlogTEMP.length/5);
	BlogAll = long;

	// 动态加载
	ToBlogPage(parseInt(document.getElementById("go").name));

	document.getElementById("total").innerHTML = '/ㅤ' + BlogAll;

	document.onkeydown = function(e) {
		var ev = (typeof event!= 'undefined') ? window.event : e;
			 if(ev.keyCode == 13) {
				return false;
			}
	}
}



// 动态加载函数	屎山(划掉)

function ToBlogPage(value){
	if(!isNaN(value)) {
		if(parseInt(value - 1)<parseInt(BlogAll)) {
			if(eval(0)<parseInt(value)) {
				document.getElementById("go").value = value;
				document.getElementById("go").name = value;


				var BlogBody = document.querySelector('.box-1');
				BlogBody.classList.remove('box-1-active');
				PageLONG = 0;

				// 手动写入内容

				if (BlogTEMP.length>value * 5 - 5) {
					PageLONG++;
					var Path = "'" +  BlogTEMP[value * 5 - 5]['src'].slice(0, -1) + "'";
 					var a1 = '<a onclick="URLStatic(`id`, `' + BlogTEMP[value * 5 - 5]['src'].slice(0, -1) + '`); var rs = [`博客`, window.location.href, `Jump(' + Path + ')`]; window.parent.postMessage(rs,`*`);" class="blog-a" ><div class="blog-title" ><img class="blog-img" src="../' + BlogTEMP[value * 5 - 5]['src'] + 'icon.png" onload="$(this).addClass(`fade-in-1`)" id="load-blog" /><br /><span  class="blog-span-1" >' + BlogTEMP[value * 5 - 5]['name'] + '</span><br /><span  class="blog-span-2" >' + BlogTEMP[value * 5 - 5]['details'] + '</span></div></a><br />'
				} else {
					var a1 = '';
				}

				if (BlogTEMP.length>value * 5 - 4) {
					PageLONG++;
					var Path = "'" +  BlogTEMP[value * 5 - 4]['src'].slice(0, -1) + "'";
 					var a2 = '<a onclick="URLStatic(`id`, `' + BlogTEMP[value * 5 - 4]['src'].slice(0, -1) + '`); var rs = [`博客`, window.location.href, `Jump(' + Path + ')`]; window.parent.postMessage(rs,`*`);" class="blog-a" ><div class="blog-title" ><img class="blog-img" src="../' + BlogTEMP[value * 5 - 4]['src'] + 'icon.png" onload="$(this).addClass(`fade-in-1`)" id="load-blog" /><br /><span  class="blog-span-1" >' + BlogTEMP[value * 5 - 4]['name'] + '</span><br /><span  class="blog-span-2" >' + BlogTEMP[value * 5 - 4]['details'] + '</span></div></a><br />'
				} else {
					var a2 = '';
				}

				if (BlogTEMP.length>value * 5 - 3) {
					PageLONG++;
					var Path = "'" +  BlogTEMP[value * 5 - 3]['src'].slice(0, -1) + "'";
 					var a3 = '<a onclick="URLStatic(`id`, `' + BlogTEMP[value * 5 - 3]['src'].slice(0, -1) + '`); var rs = [`博客`, window.location.href, `Jump(' + Path + ')`]; window.parent.postMessage(rs,`*`);" class="blog-a" ><div class="blog-title" ><img class="blog-img" src="../' + BlogTEMP[value * 5 - 3]['src'] + 'icon.png" onload="$(this).addClass(`fade-in-1`)" id="load-blog" /><br /><span  class="blog-span-1" >' + BlogTEMP[value * 5 - 3]['name'] + '</span><br /><span  class="blog-span-2" >' + BlogTEMP[value * 5 - 3]['details'] + '</span></div></a><br />'
				} else {
					var a3 = '';
				}

				if (BlogTEMP.length>value * 5 - 2) {
					PageLONG++;
					var Path = "'" +  BlogTEMP[value * 5 - 2]['src'].slice(0, -1) + "'";
 					var a4 = '<a onclick="URLStatic(`id`, `' + BlogTEMP[value * 5 - 2]['src'].slice(0, -1) + '`); var rs = [`博客`, window.location.href, `Jump(' + Path + ')`]; window.parent.postMessage(rs,`*`);" class="blog-a" ><div class="blog-title" ><img class="blog-img" src="../' + BlogTEMP[value * 5 - 2]['src'] + 'icon.png" onload="$(this).addClass(`fade-in-1`)" id="load-blog" /><br /><span  class="blog-span-1" >' + BlogTEMP[value * 5 - 2]['name'] + '</span><br /><span  class="blog-span-2" >' + BlogTEMP[value * 5 - 2]['details'] + '</span></div></a><br />'
				} else {
					var a4 = '';
				}

				if (BlogTEMP.length>value * 5 - 1) {
					PageLONG++;
					var Path = "'" +  BlogTEMP[value * 5 - 1]['src'].slice(0, -1) + "'";
 					var a5 = '<a onclick="URLStatic(`id`, `' + BlogTEMP[value * 5 - 5]['src'].slice(0, -1) + '`); var rs = [`博客`, window.location.href, `Jump(' + Path + ')`]; window.parent.postMessage(rs,`*`);" class="blog-a" ><div class="blog-title" ><img class="blog-img" src="../' + BlogTEMP[value * 5 - 1]['src'] + 'icon.png" onload="$(this).addClass(`fade-in-1`)" id="load-blog" /><br /><span  class="blog-span-1" >' + BlogTEMP[value * 5 - 1]['name'] + '</span><br /><span  class="blog-span-2" >' + BlogTEMP[value * 5 - 1]['details'] + '</span></div></a><br />'
				} else {
					var a5 = '';
				}

				setTimeout(function (){
					BlogBody.innerHTML =  a1  + a2 + a3 + a4 + a5;
					BlogBody.classList.add('box-1-active');
					BlogBody.style.height = PageLONG * 220 + 'px';
				},400)

				// 翻页按钮样式

				if (value==1) {
					$('.subpage-blog-last').removeClass('subpage-blog-button-active');
				} else {
					$('.subpage-blog-last').addClass('subpage-blog-button-active');
				}

				if (value==BlogAll) {
					$('.subpage-blog-next').removeClass('subpage-blog-button-active');
				} else {
					$('.subpage-blog-next').addClass('subpage-blog-button-active');
				}

			} else {
				document.getElementById("go").value = document.getElementById("go").name
			}
		} else {
			document.getElementById("go").value = document.getElementById("go").name
		}
	} else {
		document.getElementById("go").value = document.getElementById("go").name
	}
}



// 一些按钮的函数

function BlogNext(){
	if (parseInt(document.getElementById("go").name)<BlogAll) {
		ToBlogPage(parseInt(document.getElementById("go").name) + 1);
	}
};
function BlogLast(){
	if (parseInt(document.getElementById("go").name)>1) {
		ToBlogPage(parseInt(document.getElementById("go").name) - 1);
	}
};

function BlogSubmit(e) {
	 if (e.keyCode == 13) {
		ToBlogPage(document.getElementById("go").value);
	}
};

function BlogPage(value) {
	ToBlogPage(value);
};

$('#searchInput').on('keyup', function () {
	new Search('.search-list', $('#searchInput'), 'rgba(244, 183, 188, 1)')
})


var ul = document.querySelector('ul');
document.getElementById('searchInput').name = BlogList.length;

for (var i = 0; i < BlogTEMP.length; i++) {
	var a = document.createElement('a')
	a.innerHTML = BlogList[i]['type'] + ' ' + BlogList[i]['name'];
	a.setAttribute('class', 'search-list');
	a.setAttribute('id', BlogList[i]['type'] + ' ' + BlogList[i]['name']);

	a.setAttribute('onclick', 'var rs = [`博客`, window.location.href, `Jump("' + BlogList[i]['src'].slice(0, -1) + '")`]; window.parent.postMessage(rs,`*`); URLStatic(`id`, `' + BlogList[i]['src'].slice(0, -1) + '`);');

	ul.appendChild(a);
}

$('html').click(function(e){
	var e = e || window.event;
	var elem = e.target;
	if($(elem).is('#search') || $(elem).is('#search *')){
		$('.search-result').addClass('search-result-active');
		$('#searchInput').addClass('searchInputt-active');
			if (document.getElementById('searchInput').name > 5) {
				$('.search-result').css('height', '225px');
			} else {
				$('.search-result').css('height', document.getElementById('searchInput').name * 45 + 'px');
			}
	}else{
		$('.search-result').removeClass('search-result-active');
		$('#searchInput').removeClass('searchInputt-active');
		$('.search-result').css('height', '0');
	}
})

function URLStatic(name, value) {
	if (document.domain!='') {
		parent.changeURLStatic(name, value);
	};
}



// 统计文章数量 还是 ChatGPT 写的...
function countOccurrences(arr, key, value) {
	return arr.reduce((count, obj) => {
		return obj[key] === value ? count + 1 : count;
	}, 0);
}

function filterAndCombine(arr, key, value) {
	return arr.filter(obj => obj[key] === value);
}



function changeTEMP(value) {
	if (BoxTYPE!=value) {
		if (value=='ALL') {
			BlogTEMP = BlogList;
			document.querySelector('.t-10').style.transition = '1s';
			document.querySelector('.t-10').style.transform = 'rotate(720deg)';
			setTimeout(function (){
				document.querySelector('.t-10').style.transition = 'none';
				document.querySelector('.t-10').style.transform = '';
				document.querySelector('.t-10').classList.remove('t-11');
				setTimeout(function (){
					document.querySelector('.t-10').style.transition = '0.3s';
				},300)
			},1000)
		} else {
			BlogTEMP = filterAndCombine(BlogList, 'type', value);
			document.querySelector('.t-10').classList.add('t-11');
		}
		BoxTYPE = value;
		init();
		ToBlogPage(1);
	}
}


document.getElementById('update').innerHTML = Update;

document.querySelector('.n1').innerHTML = countOccurrences(BlogList, 'type', '');
document.querySelector('.n2').innerHTML = countOccurrences(BlogList, 'type', '');
document.querySelector('.n3').innerHTML = countOccurrences(BlogList, 'type', '');
