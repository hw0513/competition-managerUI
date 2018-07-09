<template>
	<div class="footer" style="padding: 0; background-color: white; z-index: -1;">
		<div id="_img" style="position: relative; height: 60px;">
			<div id="_img1" style="overflow: hidden;">
				<ul><li>
				<img src="../../static/img/wave_01.png" style="animation: move_wave 80s infinite;">
				<img src="../../static/img/wave_01.png" style="animation: move_wave 80s infinite;">
				</li></ul>
			</div>
			<div id="_img2" style="overflow: hidden;">
				<ul><li>
				<img src="../../static/img/wave_02.png" style="animation: move_wave 50s infinite;">
				<img src="../../static/img/wave_02.png" style="animation: move_wave 50s infinite;">
				</li></ul>
			</div>
		</div>
		<div style="background-color: rgb(0,159,217);">
			<div style="width: 80%; margin: 0 auto;">
				<div class="fot-l"> 成都校区：四川省成都市郫都区团结镇学院街65号 邮编：611745<br>
				      眉山校区：眉山市眉州大道岷东段9号 邮编：620000<br>
				      联系电话&nbsp;&nbsp;&nbsp;&nbsp;招办：(028)87953080 校办:(028)87953896 人事处：(028)87953900 后勤处：(028)87953092<br>
				      Email：yb@stbu.edu.cn&nbsp;&nbsp; <br>
				      技术支持：四川工商学院11栋11506 
				</div>
				<div class="font-r">
				      <ul id="_footer_ul">
				        <li style="margin-left: 0;"> <span><img src="../../static/img/weixin.jpg" width="100%" height="100%" style=""></span> <i>微信</i> </li>
				        <li> <span><img src="../../static/img/QQ.jpg" width="100%" height="100%"></span> <i>QQ智慧校园</i> </li>
				        <li> <span><img src="../../static/img/weibo.jpg" width="100%" height="100%"></span> <i>微博</i> </li>
				        <li> <span><img src="../../static/img/vr.png" width="100%" height="100%"></span> <i>VR工商</i> </li>
				      </ul>
				</div>
			</div>
			<br>
		</div>
	</div>
</template>

<script type="text/javascript"></script>

<style type="text/css">
	@keyframes move_wave {
	  0% {
	    transform: translateX(0);
	  }
	  50% {
	    transform: translateX(-30%);
	  }
	  100% {
	    transform: translateX(0);
	  }
	}
	#_img1 {
		height: 60px;
		width: 100%;
		position: absolute;
		z-index: 15;
	}
	#_img2 {
		height: 60px;
		width: 100%;
		position: absolute;
		z-index: 10;
	}
	#_img1>ul, #_img2>ul {
		padding: 0;
	}
	#_img1>ul>li, #_img2>ul>li {
		list-style-type: none;
	}
	#_footer_ul {
		list-style-type: none;
		padding: 0;
		margin: 10px 0;
		display: flex;
	}
	#_footer_ul li {
		list-style-type: none;
		width: 100px;
		height: 100px;
		margin: 0 10px;
		text-align:center;
	}
</style>