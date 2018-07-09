<script>

export default {
  data(){
  	return{
  		school_num: null,//学号
  		password: null,//密码
  		name: null,//姓名
  		user_class: null,//班级
  		phone: null,//电话号码
  		checked: false,//是否检查过学号是否重复
  		rules: {//二次密码是否相同
          password: null,
          check_password: null
        },
        loading: false
  	}
  },
  created(){
  },
  methods:{
  	//监控键盘
  	show: function (ev) {
        if(ev.keyCode==13){
            this.reg_check();
    	}
    },
    check_num() {
		//>函数与function函数不一样，箭头方法可以和父方法共享变量
		//检查学号是否被注册过
		this.$axios.post('user/findUserBySchool_num',{
			school_num: this.school_num
		},{
			transformRequest: function (data) {
				// 做任何你想要的数据转换
				return $.param(data);
			}
		})
		.then(res => {
		    if(res.data.data != null){
		    	this.checked = false;
		    	this.$message.error('该学号已被注册！请检查学号是否有误！');
		    	this.loading = false;
		    }
		    if(res.data.data == null){
		    	this.checked = true;
		    }
		})
		.catch(err => {
			this.$message.error('未连接服务器！请重试！');
			this.loading = false;
		})
    },
    //注册检查
  	reg_check(){
  		//可用from validation
  		//检查表格数据
  		this.loading = true;
  		//判断学号是否为空
  		if(this.school_num == null){
  			//调用饿了么消息弹窗组件
  			this.$message.error('学号不能为空！');
  			this.loading = false;
  			return false;
  		}
  		//判断姓名是否为空
  		if(this.name == null){
  			this.$message.error('姓名不能为空！');
  			this.loading = false;
  			return false;
  		}
  		//判断密码是否一致
  		if(this.rules.password == null){
  			this.$message.error('密码不能为空！');
  			this.loading = false;
  			return false;
  		}else if(this.rules.password != this.rules.check_password){
  			this.$message.error('两次密码不一致！');
  			this.loading = false;
  			return false;
  		}
  		if(this.checked == true){//学号不重复才能注册
			//>函数与function函数不一样，箭头方法可以和父方法共享变量
			this.$axios.post('user/add',{
				school_num: this.school_num,
				name: this.name,
				user_class: this.user_class,
				phone: this.phone,
				password: this.rules.password
			},{
				transformRequest: function (data) {
					// 做任何你想要的数据转换
					return $.param(data);
				}
			})
			.then(res => {
				// console.log(username)
			    // console.log(res.data);
			    if(res.data.msg == '成功'){
				    this.$message.success('恭喜您！注册成功！即将跳转登录！');
				    setTimeout(() => {
		                this.$router.push({
		                	name: 'Login',
		                	params: {
		                		pre_route: this.$route.params.pre_route
		                	}
		                });
		            }, 1000);
			    }
			    if(res.data.msg == '失败'){
			    	this.$message.error('注册失败！请稍后重试！');
			    	this.loading = false;
			    }
			})
			.catch(err => {
				this.$message.error('未连接服务器！请重试！');
				this.loading = false;
			})
  		}
  		else this.$message.error('该学号已被注册！请检查学号是否有误！');
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
		<div class="satic-area">
		<div class="dynamic-area1"></div>
		<div class="dynamic-area2"></div>
		</div>
		<div id="login" style="display: flex;justify-content: center;align-items: center;border: 0px solid;">
			<div class="div_top" style="border: 0px solid;">
				<nav>
					<ul>
						<li><a href="#"><h2>注册</h2></a></li>
					</ul>
				</nav>
				<div class="header" style="border: 0px solid;">
					<div class="header_fir">
						<form @keyup="show($event)">
							<table class="table" id="table_reg" algin="center" border="0">
								<tr>
									<td align="right"><span class="glyphicon glyphicon-user"></span></td>
							        <td><input class="input" type="text" name="school_num"length="10" placeholder="学号" 
							        v-model='school_num' @blur="check_num"/></td>
								</tr>
								<tr>
									<td align="right"><span class="glyphicon glyphicon-bookmark"></span></td>
							        <td><input class="input" type="text" name="name"length="10" placeholder="姓名" 
							        v-model='name'/></td>
								</tr>
								<tr>
									<td align="right"><span class="glyphicon glyphicon-tag"></span></td>
							        <td><input class="input" type="text" name="class_oth"length="10" placeholder="班级" 
							        v-model='user_class'/></td>
								</tr>
								<tr>
									<td align="right"><span class="glyphicon glyphicon-earphone"></span></td>
							        <td><input class="input" type="text" name="phone"length="10" placeholder="联系方式" 
							        v-model='phone'/></td>
								</tr>
								<tr>
									<td align="right"><span class="glyphicon glyphicon-lock"></span></td>
							        <td><input class="input" type="password" name="rule.password"length="10" placeholder="密码" 
							        v-model='rules.password'/></td>
								</tr>
								<tr>
									<td align="right"><span class="glyphicon glyphicon-lock"></span></td>
							        <td><input class="input" type="password" name="rule.check_password"length="10" placeholder="确认密码" 
							        v-model='rules.check_password'/></td>
								</tr>
								<br>
								<tr>
									<td colspan="2" align="center">
										<el-button type="primary" @click="reg_check" style="width: 100%;" v-loading="loading">注册</el-button>
									</td>
								</tr>
								<tr>
									<td colspan="2">
										<router-link :to="{name:'Login'}">已有账号？点我登录</router-link>
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