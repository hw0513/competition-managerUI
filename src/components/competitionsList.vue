<script type="text/javascript">
import HeaderVue from '@/components/header'
import FooterVue from '@/components/footer'

	export default {
		data() {
			return {
		    	imgList_com:[{
		    		url:require('../../static/img/match_pic5.jpg')
		    	},
		    	{
		    		url:require('../../static/img/match_pic6.png')
		    	},
		    	{
		    		url:require('../../static/img/match_pic7.jpg')
		    	},
		    	{
		    		url:require('../../static/img/match_pic8.jpg')
		    	},
		    	{
		    		url:require('../../static/img/baidu_lq_zp_banner.jpg')
		    	},
		    	{
		    		url:require('../../static/img/login_back.png')
		    	}]
			}
		},
		created(){
		},
		methods:{
			getData(){
			}
		},
		components:{
			HeaderVue,
			FooterVue
		}
	}
</script>

<style type="text/css">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

<template>
	<div id="_competitionsList">
		<!-- 头部 -->
		<header-vue></header-vue>
		<div style="width: 80%; margin: 0 auto; background-color: white">
			<el-carousel :interval="4000" type="card" height="300px">
			  <el-carousel-item v-for="item in imgList_com" :key="item.url">
			    <img :src="item.url" style="max-width: 100%; height: 300px;">
			  </el-carousel-item>
			</el-carousel>
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{name:'Index'}">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{name:'CompetitionsList'}">竞赛列表</el-breadcrumb-item>
			</el-breadcrumb>
			<br/>
			<router-view></router-view>
		</div>
		<footer-vue></footer-vue>
	</div>
</template>