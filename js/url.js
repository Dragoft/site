/* 	Powered By https://blog.csdn.net/weixin_42403306/article/details/105861346
	Read data from Url.							 */



function changeURLStatic(name, value) {
	let url = changeURLParam(location.href, name, value);
	history.replaceState(null, null, url);
}



function changeURLParam(url, name, value) {
	if (typeof value === 'string') {
		value = value.toString().replace(/(^\s*)|(\s*$)/, "");
	}
	let url2;
	if (!value) { // remove
		let reg = eval('/(([\?|&])' + name + '=[^&]*)(&)?/i');
		let res = url.match(reg);
		if (res) {
			if (res[2] && res[2] === '?') { // before has ?
				if (res[3]) { // after has &
					url2 = url.replace(reg, '?');
				} else {
					url2 = url.replace(reg, '');
				}
			} else {
				url2 = url.replace(reg, '$3');
			}
		}
	} else {
		let reg = eval('/([\?|&]' + name + '=)[^&]*/i');
		if (url.match(reg)) { // edit
			url2 = url.replace(reg, '$1' + value);
		} else { // add
			let reg = /([?](\w+=?)?)[^&]*/i;
			let res = url.match(reg);
			url2 = url;
			if (res) {
				if (res[0] !== '?') {
					url2 += '&';
				}
			} else {
				url2 += '?';
			}
			url2 += name + '=' + value;
		}
	}
	return url2;
}

function ClearURLParam(){
	let url = window.location.href
	if (url.indexOf('?') !== -1) {
		url = url.replace(/(\?|#)[^'"]*/, '')
		history.replaceState(null, null, url);
	}
}


