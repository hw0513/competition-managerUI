<!-- 此登录使用sessionStorage保存用户信息，所以需要关闭一次浏览器登录一次，可作优化 -->
<script>
//引入验证码组件
export default {
  data(){
  	return{
  		school_num: this.$route.query.schoolNum,
  		password: null,
  		checked: false,
  		loading: false,
  	}
  },
  components:{
  },
  mounted() {
  },
  created(){
  },
  methods:{
  	//监控键盘
  	show: function (ev) {
        if(ev.keyCode==13){
            this.login_check();
    	}
    },
  	login_check(){
  		//loading
  		this.loading = true;
  		//判断输入格式
  		if(this.school_num==null) {
  			this.$message.error('学号不能为空！');
  			this.loading = false;
  			return false;
  		}
  		if(this.password==null) {
  			this.$message.error('密码不能为空！');
  			this.loading = false;
  			return false;
  		}
		//>函数与function函数不一样，箭头方法可以和父方法共享变量
		this.$axios.post('user/login',{
			school_num: this.school_num,
			password: this.password
		},{
			transformRequest: function (data) {
				// 做任何你想要的数据转换
				return $.param(data);
			}
		})
		.then(res => {
		    if(res.data.msg == '成功'){
		    	this.$message.success('登录成功！');
		    	sessionStorage.setItem('user_schoolNum',this.school_num);
		    	if(this.$route.params.pre_route != null)
			    	this.$router.push({
			    		name: this.$route.params.pre_route,
			    	});
			    else 
			    	this.$router.push({
			    		name: 'Index'
			    	});
		    }
		    if(res.data.msg == '失败'){
		    	console.log(res.data);
		    	this.$message.error('登录失败！请重试！');
		    	this.loading = false;
		    }
		})
		.catch(err => {
			this.$message.error('未连接服务器！请重试！');
			this.loading = false;
		})
  	}
  }
}

//引入背景css
import '../../static/background/css/demo.css'
import '../../static/background/css/normalize.css'
import '../../static/background/css/style.css'
//引入导航css
import '../../static/nav/css/style.css'
</script>

<style scoped>
	.satic-area {
		position: absolute;
	}
	.login_body{
		height: 100%;
	}
</style>

<template>
	<body class="login_body">
		<!-- 背景 -->
		<div class="satic-area">
		<div class="dynamic-area1"></div>
		<div class="dynamic-area2"></div>
		</div>
		<div id="login" style="display: flex;justify-content: center;align-items: center;border: 0px solid;">
			<div class="div_top" style="border: 0px solid;">
				<nav>
					<ul>
						<li><a href="/#/index"><h2>四川工商学院竞赛网</h2></a></li>
					</ul>
				</nav>
				<div class="header" style="border: 0px solid;">
					<div class="header_fir">
						<form @keyup="show($event)">
							<table class="table" id="table_login" algin="center" border="0">
								<tr>
									<td colspan="2" align="center"><h4><b>欢迎登录</b></h4></td>
								</tr>
								<tr class="tr_login">
									<td align="right"><span class="glyphicon glyphicon-user"></span></td>
							        <td><input class="input" type="text" name="username"length="10" placeholder="学号" 
							        v-model='school_num'/></td>
						        </tr>
						        <tr class="tr_login">
							        <td align="right"><span class="glyphicon glyphicon-lock"></span></td>
									<td><input class="input" type="password" name="password" length="10" placeholder="密码" 
									v-model='password'/></td>
								</tr>
								<!-- <tr>
									<td align="right"><span class="glyphicon glyphicon-hand-right"></span></td>
									<td><input class="input" type="text" name="yanzheng" length="10" placeholder="验证码" /></td>
								</tr> -->
								<tr>
									<td colspan="2" align="center">
										<el-button type="primary" @click="login_check" style="width: 100%;" v-loading="loading">登录</el-button>
									</td>
								</tr>
								<tr>
									<td colspan="2">
										<router-link :to="{name:'Register'}">没有账号？点我注册</router-link>
										<a href="https://www.stbu.edu.cn/" style="float: right;">忘记密码？</a>
									</td>
								</tr>
							</table>
						</form>
					</div>
				</div>
			</div>
		</div>
		
	</body>
</template>