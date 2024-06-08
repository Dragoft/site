/*
	This script is used to interact with a database...
	Last change: 2024/6/7
*/

// 页面加载完成后执行
window.addEventListener('load',function(){
	pageLoad = 1;

	// 统计网站访客数量	自 2024/2/25 15:54 起
	if (document.domain!="") {

		// 一周内的重复访问不计数
		if (getCookie('Cookie')==undefined) {
			if (document.domain=='tatsuno.top') {
				counterMode = 1
			}
		} else {
			counterMode = 0
		}
		fetch('https://tatsuno.top/counter.api', {
			method: "POST",
			headers: {
				"Token": counterMode
			}
		})
		.then(response => {
			if (!response.ok) {
				if (response.status === 429) {
					console.error('[' + dateFormatter('HH:mm:ss', new Date()) + '] Your request has been blocked by the API Firewall, please wait a moment.');
				}
			} else {
				return response.json();
			}
		})
		.then(json => counter(json))
		.catch(err => console.error('Request Failed', err)); 

	} else {
		if (document.getElementById('visit_counter')!=undefined) {
			setTimeout(function (){
				$('#visit_counter_outer').fadeIn(300);
			},2000)
		}
	}

	function counter(DATA) {
		if (document.getElementById('visit_counter')!=undefined) {
			document.getElementById('visit_counter').innerHTML = DATA['content'];
			setTimeout(function (){
				$('#visit_counter_outer').fadeIn(300);
			},2000)
		}
		setCookie('Cookie !');
	}

})


