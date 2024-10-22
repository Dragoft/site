/*
	This script is used to interact with a database...
	Last change: 2024/10/20
*/



const env = {data: {}, f: {}, tmp: {}, timer: {}}

env.data.db = null
env.data.page = 1
env.data.pause = false
env.data.remarkN = null
env.data.pageN = null
env.timer.t1 = null


// 发送评论
env.f.sent = function() {
	if (env.data.pause) {return}

	var name = document.querySelector('.Tname').value.replace(/\n/g, '')
	var content = document.querySelector('.Tcontent').value
	if (name.length <= 0 || name.length > 20 || content.length <= 0 || content.length > 200) {
		return	
	}

	fetch('https://tatsuno.top/remark.api', {
		method: "POST",
		headers: {
			"Token": 1
		},
		body: JSON.stringify({
			"name": name,
			"content": content,
		})
	})
	.then(response => {
		if (!response.ok) {
			env.f.failed()
		} else {
			document.querySelector('.Tcontent').value = ''
			document.querySelector('.Tcontent').style.height = '48px'
			document.querySelector('.count').innerHTML = '剩余 200 字'

			env.data.remarkN ++
			env.data.pageN = Math.ceil(env.data.remarkN / 5)
			document.querySelector('.page0').innerHTML = env.data.pageN
			document.querySelector('.remarkN').innerHTML = env.data.remarkN

			setTimeout(function (){
				env.f.get(1)
				env.data.page = 1
			}, 1500)
		}
	}) 
}


// 获取评论
env.f.get = function(page) {
	if (page != null) {
		fetch('https://tatsuno.top/remark.api', {
			method: "POST",
			headers: {
				"Token": 2,
			},
			body: JSON.stringify({
				"page": (page - 1) * 5,
			})
		})
		.then(response => {
			if (!response.ok) {
				env.f.fail()
			} else {
				return response.json()
			}
		})
		.then(json => {
			env.data.db = json
			env.f.print(json)
		}) 
	} else {
		env.f.print(env.data.db)
	}
}

// 显示评论
env.f.print = function(data) {
	var box = document.querySelector('.commentBox')
	box.style.opacity = '0'
	box.innerHTML = ''

	setTimeout(function (){

		for (var i = 0; i < env.data.db['results'].length; i++) {
			var span = document.createElement('span')
			span.setAttribute('class', 'comment')
			box.appendChild(span)

			// 昵称
			var span1 = document.createElement('span')
			span1.innerText = env.data.db.results[i].name.replace(/\n/g, '') + ':  '
			span1.setAttribute('class', 'title')
			span.appendChild(span1)

			// 内容
			var span2 = document.createElement('span')
			span2.innerText = env.data.db.results[i].content
			span2.setAttribute('class', 'content')
			span.appendChild(span2)

			if (span2.offsetHeight>120) {
				span2.setAttribute('style', 'height: 120px')

				var span4 = document.createElement('span')
				span4.innerHTML = '[ 展开 ]'
				span4.setAttribute('class', 'open')
				span4.setAttribute('onclick', '$(this).css("display", "none"); $(this).siblings(".content").css("height", "unset");');
				span.appendChild(span4)
			}

			// 日期
			var span3 = document.createElement('span')
			span3.innerText = '[' + env.data.db.results[i].id.substring(0, 16) + ']'
			span3.setAttribute('class', 'time')
			span.appendChild(span3)

			if (env.data.db['results'][i]['deletable']=="1") {

				// 超过 7 天的留言无法删除
				if (parseInt(env.data.db.results[i].id.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')) + 7000000 > parseInt(env.f.getTime())) {
					var a = document.createElement('a')
					a.innerHTML = '[删除]'
					a.setAttribute('class', 'delete')
					a.setAttribute('onclick', 'env.f.del($(this), "' + env.data.db['results'][i]['id'] + '")')
					span3.appendChild(a)
				}
			}

			if (env.data.db['results'][i]['deletable'] == "0") {
				var span5 = document.createElement('span')
				span5.innerHTML = '[operater]'
				span5.setAttribute('class', 'admin')
				span3.appendChild(span5)
			}
		}
	}, 500)

	setTimeout(function (){
		box.style.opacity = '1'
		
	}, 1000)

}

env.f.fail = function() {
	env.data.pause = true

	env.timer.t1 = setInterval(() => {
		env.data.pause = false
		clearInterval(env.timer.t1)
	},10000)
} 

// 授时
env.f.getTime = function() {
	var now = new Date()
	var options = {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
	var formatter = new Intl.DateTimeFormat('en-US', options)
	var parts = formatter.formatToParts(now).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})

	env.data.time  = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')
	return env.data.time
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

// 初始化
env.f.init = function() {
	if (env.data.pause) {return}
	env.f.get(env.data.page)

	fetch('https://tatsuno.top/remark.api', {
		method: "POST",
		headers: {
			"Token": 3,
		},
		body: JSON.stringify({})
	})
	.then(response => {
		if (!response.ok) {
				env.f.fail()
		} else {
			return response.json()
		}
	})
	.then(json => {
		env.data.remarkN = Number(json.results[0].content)
		env.data.pageN = Math.ceil(env.data.remarkN / 5)
		document.querySelector('.page0').innerHTML = env.data.pageN
		document.querySelector('.remarkN').innerHTML = env.data.remarkN
	}) 
}

// 跳转指定页数
env.f.toPage = function(page) {
	if (env.data.pause) {return}
	if (env.data.page + page >= 1 && env.data.page + page <= env.data.pageN) {
		env.data.page = env.data.page + page
		document.querySelector('.Tpage').value = env.data.page
		env.f.get(env.data.page)
	}
}

env.f.yResize = function(e) {
	const t = document.querySelector(e)
	t.style.height = 'auto'
	t.style.height = t.scrollHeight + 'px'
	$("html,body").animate({scrollTop: $(document).height()}, 0)
}

env.f.xResize = function(e) {
	const t = document.querySelector(e)
	const h = document.querySelector('.Tname-2')

	h.innerHTML = t.value
	t.value = t.value.replace(/[\r\n\s]+/g, '')
	t.style.width = (h.offsetWidth || 32) + 'px'
}

env.f.open = function() {
	if($('.add').hasClass('add-active')!=true) {
		$('.add').addClass('add-active')
		$('.new').addClass('new-active')
		$('.bar2').fadeOut(300)
	} else {
		document.querySelector('.Tcontent').value = ''
		document.querySelector('.Tcontent').style.height = '48px'
		$('.add').removeClass('add-active')
		$('.new').removeClass('new-active')
		$('.bar2').fadeIn(300)
	}
}

env.f.del = function(e, id) {
	e.html(`<a href="javascript:;" onclick="env.f.del.yes('` + id + `')" >确认删除？</a>`)
	e.attr('onclick', '')
}
	env.f.del.yes = function(id) {
		fetch('https://tatsuno.top/remark.api', {
			method: "POST",
			headers: {
				"Token": 0,
			},
			body: JSON.stringify({
				"id": id,
			})
		})
		.then(response => {
			if (!response.ok) {
				env.f.fail()
			} else {
				return response.json()
			}
		}) 

		if (!env.data.pause) {
			env.data.remarkN --
			env.data.pageN = Math.ceil(env.data.remarkN / 5)
			document.querySelector('.page0').innerHTML = env.data.pageN
			document.querySelector('.remarkN').innerHTML = env.data.remarkN

			setTimeout(function (){
				env.f.get(env.data.page)
			}, 2000)
		}
	}


