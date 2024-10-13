/*
	方法说明
	*@param{String} output 需要被搜索内容表格的id或class
	*@param{String} input 搜索框的id或class

	* 在ChatGPT 的帮助下完成了编写，目前仍无法搜索同名选项。本核心借鉴了lin_search.js
 
							—— 2023.12.23

*/



env.f.search = function(output, input) {
	// 初始化
	var BlogTEMP = env.data.list.Bloglist;
	var ul = document.querySelector('ul');
	var key = input.val().trim();

	//  排除搜索违禁词
	if (key.includes('')) {
		return
	}

	// 重置搜索结果列表高度
	if (BlogTEMP.length > 10) {
		$('#search').css('height', '275px');
		document.getElementById('searchInput').name = 10;
	} else {
		$('#search').css('height', BlogTEMP.length * 22 + 55 + 'px');
		document.getElementById('searchInput').name = BlogTEMP.length;
	}

	$('#search').css('transition', 'none');
	$('#content-null').remove();
	$(output).css('display', 'none');

	// 获取所有output的元素内容
	var output_elements = document.querySelectorAll(output);
	var contentArray = [];

	// 将元素内容存储在数组中
	for (var i = 0; i < output_elements.length; i++) {
		contentArray.push(output_elements[i].textContent);

		// 获取指定元素
		var element = output_elements[i];

		// 清空上次搜索留下的 span 颜色
		var span = element.getElementsByTagName('span');
		if (span.length!=0) {
			var str = span[0].parentNode.parentNode.id;
			if (str.slice(-1) == '') {
				var str = str.substring(0, str.length - 1);
			}

			span[0].parentNode.innerHTML = str;
		}

	}



	// 定义一个输入的关键词
	var search = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');


	// 使用filter()方法和正则表达式来进行模糊搜索
	var result = contentArray.filter(function(word) {
		// i表示不区分大小写
		var regex = new RegExp(search, "i");
		return word.match(regex);
	});



	// 如果没有找到搜索结果，便终止后续代码
	if (result.length==0) {
		var div = document.createElement('div');
		div .innerHTML = '没有找到指定内容...'
		div .setAttribute('id', 'content-null');
		div .setAttribute('class', 'search-list');
		div .setAttribute('style', 'cursor: text; user-select: auto;');
		ul.appendChild(div);

		// 更新搜索结果列表高度
		$('#search').css('height', '77px');
		document.getElementById('searchInput').name = 1;
		return;
	}



	// 渲染搜索结果

	for (var a = 0; a < result.length; a++) {
		if (document.getElementById(result[a].toString()) != null) {
			document.getElementById(result[a].toString()).style.display = 'block';
		}

		// 渲染搜索结果
		var str = result[a].toString();
		if (str.slice(-1) == '') {
			var str = str.substring(0, str.length - 1);
		}

		// 利用特殊字符串替换匹配的字符，并将数组一分为二
		var newStr = str.replace(new RegExp(search, "i"), '#####');
		var contentsArr = newStr.split('#####'); 

		// 将数组里的第一个值取出
		var contentArrFirst = contentsArr[0];
		var content = str.substr(contentsArr[0].length, key.length);

		if (content.length!=0) {
			// 搜索结果为 头 + 颜色项 + 尾
			var contentHtml = contentArrFirst + '<span class="search-key">' + content + '</span>' + contentsArr[1];
			document.getElementById(result[a].toString()).childNodes[0].innerHTML = contentHtml;
		}
	}

	// 更新搜索结果列表高度
	if (result.length > 10) {
		$('#search').css('height', '275px');
		document.getElementById('searchInput').name = 10;
	} else {
		// 防止把 #content-null 当做搜索结果
		if (BlogTEMP.length > result.length) {
			$('#search').css('height', result.length * 22 + 55 + 'px');
			document.getElementById('searchInput').name = result.length;
		} else {
			$('#search').css('height', BlogTEMP.length * 22 + 55 + 'px');
			document.getElementById('searchInput').name = BlogTEMP.length;
		}
	}
}


