/* 	https://blog.csdn.net/qq_45793384/article/details/121839968
	B站头部动画						*/

const container = document.querySelector('.FixedBox');
const imgs = document.querySelectorAll('.background');



// 绑定鼠标移入事件
container.addEventListener('mouseenter',function(e) {
	// 移除过度效果
	imgs.forEach(item => {
		item.style.transition = 'none';
	});
});

// 绑定鼠标移动事件
container.addEventListener('mousemove',function(e) {

	// 计算鼠标移动的相对距离
	let disX = e.clientX / $(window).width() - 0.5;

	const blur_1 = (disX * 5).toFixed(1);
	const translateX_1 = ((disX * $(window).width()) / 64).toFixed(1);
	imgs[0].style.filter = `blur(${blur_1}px)`;
	imgs[0].style.transform = `translateX(${translateX_1}px)`;
	
	const blur_2 = ((0.9 - disX) * 5 - 5).toFixed(1);
	const translateX_2 = ((disX * $(window).width()) / 96).toFixed(1);
	imgs[1].style.filter = `blur(${blur_2}px)`;
	imgs[1].style.transform = `translateX(${translateX_2}px)`;

});
// 绑定鼠标离开事件
container.addEventListener('mouseleave', function() {
	// 增加过度效果
	imgs.forEach(item => {
		item.style.transition = '0.5s';
	});
	// 样式清空	
	imgs[0].style.filter = 'blur(0px)';
	imgs[0].style.transform = 'translateX(0px)';
	
	imgs[1].style.filter = 'blur(0px)';
	imgs[1].style.transform = 'translateX(0px)';
});


