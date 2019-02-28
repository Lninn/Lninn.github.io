/**
 * 功能：给定元素移动到目标位置(横向)
 * @param ele,target
 */
function animate_X(ele, target){
    //要用定时器，先清除定时器
    //一个盒子只能有一个定时器，这样儿的话，不会和其他盒子出现定时器冲突
    //而定时器本身讲成为盒子的一个属性
    clearInterval(ele.timer);
    //我们要求盒子既能向前又能向后，那么我们的步长就得有正有负
    //目标值如果大于当前值取正，目标值如果小于当前值取负
    var speed = target>ele.offsetLeft?10:-10;
	console.log(ele.offsetLeft);
	console.log(target);
    ele.timer = setInterval(function () {
        //在执行之前就获取当前值和目标值之差
        var val = target - ele.offsetLeft;
        ele.style.left = ele.offsetLeft + speed + "px";
        //目标值和当前值只差如果小于步长，那么就不能在前进了
        //因为步长有正有负，所有转换成绝对值来比较
        if(Math.abs(val)<Math.abs(speed)){
            ele.style.left = target + "px";
            clearInterval(ele.timer);
        }
    },10)
}

window.onload = function () {
	var searchBtn = document.querySelector("#navContent .search"),
		advWrapper = document.querySelectorAll(".adv-wrapper"),
		searchItem = document.querySelectorAll("#navContent .nav-search"),
		navIcon = document.querySelectorAll("#navContent .nav-icon"),
		searchBar = document.querySelectorAll(".search-bar"),
		icright = document.querySelectorAll(".search-bar .icright");
	
	advWrapper[0] = advWrapper[0].style.display;
	searchBtn.onclick = function () {
		
		//隐藏广告栏和导航栏
		advWrapper[0].style.display = "none";
		for (var i = 0; i <　searchItem.length; ++i) {
			searchItem[i].style.visibility = "hidden";
		}
		
		searchBar[0].style.display = "block";
		/*
		//重新定义导航栏图标的位置导航栏
		navIcon[0].style.borderSize = "3px";
		navIcon[0].style.borderStyle = "solid";
		navIcon[0].style.borderColor = "red";
		*/
		
	}
	icright[0].onclick = function () {
		//alert("关闭搜索框");
		advWrapper[0].style.display = "block";
		for (var i = 0; i <　searchItem.length; ++i) {
			searchItem[i].style.visibility = "visible";
		}
		
		searchBar[0].style.display = "none";
	}
	/*
	var btn = document.querySelectorAll("#sliderList li"),
		slider = document.querySelectorAll("#slider .img"),
		index = 0;
		
	
	setInterval(function () {
		index = (index === 2)? 0: index+1;
		for (var i = 0; i < slider.length; ++i) {
			slider[i].style.display = "none";
		}
		slider[index].style.display = "block";
	}, 1000);
	
	var slider = document.querySelector("#slider"),
		imgWidth = slider.offsetWidth,
		imgs = document.querySelectorAll("#slider .img"),
		btns = document.querySelectorAll("#sliderList li");
		
	 //循环绑定（自定义属性参数盒子的索引值）
	for(var i=0;i<btns.length - 2;i++){
		//绑定的是索引值,为了移动盒子的时候方便。
		btns[i].index=i;
		//点亮鼠标经过的盒子
		btns[i].onclick = function(){
			//鼠标放上去的时候pic和squareness的值要和他相等
			pic = squareness = this.index;
			//利用事先封装好的移动盒子的函数
			animate_X(slider,-this.index*imgWidth);
		}		
	}
	
	//添加定时器
	var timer = setInterval(autoPlay,1000);
	//两个定时器，一个记录图片，一个记录小方块。
	var pic = 0;
	var squareness = 0;
	
	function autoPlay(){
		pic++;
		//图片的索引值不能超过图片的数量，否则会出现bug。
		if(pic>imgs.length){
			slider.style.left = 0;
			pic = 0;
		}
		animate_X(slider,-pic*imgWidth);
		squareness++;
		if(squareness>spanArr.length-1){
			squareness = 0;
		}
	}
	
	
	var slider = document.querySelector("#slider");
	var sliderList = document.querySelector("#sliderList");
    var imgs = document.querySelectorAll("#slider .img");
    var btns = document.querySelectorAll("#sliderList li");
	var imgWidth = slider.offsetWidth;
	
	var target = 0;
	var leader = 0;
	var timer = null;
	
	for (var i = 0; i < btns.length - 2; ++i) {
		//属性绑定索引值
		btns[i].index = i;
		btns[i].onclick = function () {
			//获取目标位置
			//获取索引值。
			animate_X(imgs[this.index], -this.index*imgWidth);
		}			
	}
	*/
}









