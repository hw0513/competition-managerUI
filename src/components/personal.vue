<script type="text/javascript">
import HeaderVue from '@/components/header'
import FooterVue from '@/components/footer'

	export default {
		data() {
			return {
				schoolNum: sessionStorage.user_schoolNum,//获取学号
				_default_active: "1"
			}
		},
		created(){
			if(this.$route.name=='UpdatePW') this._default_active="4";
			if(this.$route.name=='MyAward') this._default_active="3";
			if(this.$route.name=='MyCompetition') this._default_active="2";
		},
		methods:{
			toNext(index) {
				if(index == 1) this.$router.push({
					name: 'PersonalInfo'
				})
				if(index == 2) this.$router.push({
					name: 'MyCompetition'
				})
				if(index == 3) this.$router.push({
					name: 'MyAward'
				})
				if(index == 4) this.$router.push({
					name: 'UpdatePW'
				})
			}
		},
		components:{
			HeaderVue,
			FooterVue
		}
	}
</script>

<style>
	.personal {
		width: 80%;
		margin: 0 auto;
	}
</style>

<template>
	<div class="personal" style="background-color: white;">
		<!-- 头部 -->
		<header-vue></header-vue>
		<br>
		<!-- 左右布局 -->
		<el-container style="height: 25rem;">
		  <el-aside width="200px" style="border-right: 1px solid #e6e6e6;">
		    <el-menu
		      :default-active="_default_active"
		      class="el-menu-vertical-demo"
		      style="border-right: 0px;">
		      <el-menu-item index="1" @click="toNext(1)">
		        <i class="el-icon-location"></i>
		        <span slot="title">个人信息</span>
		      </el-menu-item>
		      <el-menu-item index="2" @click="toNext(2)">
		        <i class="el-icon-menu"></i>
		        <span slot="title">我的比赛</span>
		      </el-menu-item>
		      <el-menu-item index="3" @click="toNext(3)">
		        <i class="el-icon-document"></i>
		        <span slot="title">我的获奖</span>
		      </el-menu-item>
		      <el-menu-item index="4" @click="toNext(4)">
		        <i class="el-icon-setting"></i>
		        <span slot="title">账号安全</span>
		      </el-menu-item>
		    </el-menu>
		  </el-aside>
		  <el-main>
		  	<img src="../assets/logo.png" style="width: 5rem;">
		  	<span style="font-size: 1.3rem;">{{schoolNum}}的个人信息~~</span>
		  	<!-- 子路由 -->
		  	<router-view></router-view>
		  </el-main>
		</el-container>
		<br>
		<!-- 底部 -->
		<footer-vue></footer-vue>
	</div>
</template>