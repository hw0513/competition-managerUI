<template>
	<div id="_header">
		<div style="background-color: #8f000b; height: 100px;">
			<img src="../../static/img/scgsxy_logo.png" style="margin-left: 10%; margin-top: 1rem;">
			<img src="../../static/img/pkucloud1h100.png" style="float: right;">
		</div>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
		  <el-menu-item index="0"></el-menu-item>
		  <el-menu-item index="0"></el-menu-item>
		  <el-menu-item index="1">四川工商学院竞赛网</el-menu-item>
		  <el-menu-item index="2"><router-link :to="{name:'Index'}">首页</router-link></el-menu-item>
		  <el-menu-item index="3"><router-link :to="{name:'Total'}">竞赛</router-link></el-menu-item>
		  <el-menu-item index="4"><router-link :to="{name:'MyCompetition'}">我的竞赛</router-link></el-menu-item>
		  <el-menu-item index="5">竞赛佳绩</el-menu-item>
		  <el-menu-item index="6" style="float: right; margin: auto 0;" v-if="!show_ind">
			  	<router-link :to="{name:'Login'}"><el-button type="primary" plain>登录</el-button></router-link>
			  	<router-link :to="{name:'Register'}"><el-button type="danger" plain @click="toRegister">注册</el-button></router-link>
		  </el-menu-item>
		  <!-- 已登录组件 -->
		  <el-submenu index="6" style="float: right;" v-if="show_ind">
			<img src="../assets/logo.png" style="width: 2.6rem;">
			<template slot="title"><router-link :to="{name:'PersonalInfo'}">欢迎您！{{schoolNum}}</router-link></template>
			<el-menu-item index="6-1"><router-link :to="{name:'PersonalInfo'}">个人信息</router-link></el-menu-item>
			<el-menu-item index="6-2"><router-link :to="{name:'MyCompetition'}">我的比赛</router-link></el-menu-item>
			<el-menu-item index="6-3"><router-link :to="{name:'UpdatePW'}">我的获奖</router-link></el-menu-item>
			<el-menu-item index="6-4" @click="logout" style="color: ;">登出</el-menu-item>
		  </el-submenu>
		  <img src="../assets/logo.png" style="width: 1.6rem; float: right; margin-top: 1rem;">
		</el-menu>
	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				activeIndex: '',
				show_ind: true,
				schoolNum: sessionStorage.user_schoolNum
			}
		},
		methods: {
			handleSelect(){
				
			},
			logout(){
				sessionStorage.clear();
				this.$router.push({name:'Login'})
			},
			toRegister() {
				this.$router.push({
					name: 'Register',
					params: {
						pre_route: this.$route.name
					}
				})
			}
		},
		mounted() {
			if(this.$route.name == 'Index') this.activeIndex = '2';
			if(this.$route.name == 'Total') this.activeIndex = '3';
		},
		created() {
			// 判断用户是否登录
			if(sessionStorage.user_schoolNum == null) {
				this.show_ind = false;
			}
		}
	}
</script>

<style type="text/css"></style>