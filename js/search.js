
function Search(output, input, color) {
	/* 方法说明
	*@param{String} output 需要被搜索内容表格的id或class
	*@param{String} input 搜索框的id或class
	*@param{String} color 搜索内容以什么颜色返回

	* 在ChatGPT 的帮助下完成了编写，目前仍无法搜索同名选项。本核心借鉴了lin_search.js
 
							—— 2023.12.23

	*/

	// 重置搜索结果列表高度
	if (BlogList.length > 5) {
		$('.search-result').css('height', '225px');
	} else {
		$('.search-result').css('height', BlogList.length * 45 + 'px');
	}
	document.getElementById('searchInput').name = BlogList.length;



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
			span[0].setAttribute('style', 'color: rgba(151, 153, 153, 1)');
		}
	}



	// 定义一个输入的关键词
	var search = escapeRegExp(input.val().trim());

	// 使用filter()方法和正则表达式来进行模糊搜索
	var result = contentArray.filter(function(word) {
		// i表示不区分大小写
		var regex = new RegExp(search, "i");
		return word.match(regex);
	});



	$('#content-null').remove();
	$(output).css('display', 'none');

	if (result.length==0) {
		var a = document.createElement('a');
		a.innerHTML = '没有找到指定内容...'
		a.setAttribute('id', 'content-null');
		a.setAttribute('css', 'search-list');
		ul.appendChild(a);

		// 更新搜索结果列表高度
		$('.search-result').css('height', '45px');
		document.getElementById('searchInput').name = 1;
		return;
	}

	for (var a = 0; a < result.length; a++) {
		document.getElementById(result[a].toString()).style.display = "block";

		// 渲染搜索结果
		var str = result[a].toString()
		// 先用特殊字符串替换第一个符合搜索结果的字符串
		var newStr = str.replace(new RegExp(search, "i"), '#####');
		// 删除特殊字符串，将原字符串分为2部分
		var contentsArr = newStr.split('#####'); 

		// 将数组里的第一个值取出
		var contentArrFirst = contentsArr[0];
		var content = result[a].substr(contentsArr[0].length, input.val().trim().length);

		if (content.length!=0) {
			// 搜索结果为 头 + 颜色项 + 尾
			var contentHtml = contentArrFirst + "<span style='color:" + color + "'>" + content + "</span>" + contentsArr[1];
			document.getElementById(result[a].toString()).innerHTML = contentHtml;
		}
	}

	// 更新搜索结果列表高度
	if (result.length > 5) {
		$('.search-result').css('height', '225px');
	} else {
		$('.search-result').css('height', result.length * 45 + 'px');
	}
	document.getElementById('searchInput').name = result.length;
}



function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $&表示匹配的子串
}


