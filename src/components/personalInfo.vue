<script type="text/javascript">

	export default {
		data() {
			return {
				schoolNum: sessionStorage.user_schoolNum,//获取学号
				personalInfo: null//获取个人信息
			}
		},
		created(){
			//检查学号是否被注册过
			this.$axios.post('user/findUserBySchool_num',{
				school_num: sessionStorage.user_schoolNum
			},{
				transformRequest: function (data) {
					// 做任何你想要的数据转换
					return $.param(data);
				}
			})
			.then(res => {
			    if(res.data.data != null){
			    	this.personalInfo = res.data.data;
			    }
			    if(res.data.data == null){
			    	this.$message.error('获取用户信息失败！请重试！');
			    }
			})
			.catch(err => {
				this.$message.error('未连接服务器！请重试！');
			})
		},
		methods:{
		},
		components:{
		}
	}
</script>

<style type="text/css">

</style>

<template>
	<div class="personalInfo">
		<ul class="list-group">
		    <li class="list-group-item">学号：{{personalInfo.school_num}}</li>
		    <li class="list-group-item">姓名：{{personalInfo.name}}</li>
		    <li class="list-group-item">联系方式：{{personalInfo.phone}}</li>
		    <li class="list-group-item">班级：{{personalInfo.user_class}}</li>
		    <li class="list-group-item">备注：</li>
		</ul>
	</div>
</template>