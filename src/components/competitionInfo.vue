<script type="text/javascript">
	export default {
		data () {
			return {
				//渲染界面--比赛模块
				competitionInfo: {
					name: null,
					host_unit: null,
					lev: null,
					competition_describe: null,
					competition_way: null,
					type: null
				},
				place: null,//比赛地点
				dialogFormVisible: false,//弹出个人报名表单
				dialogFormVisible_team: false,//弹出组队报名表单
		        form: [
		        {//报名表内部数据
		          schoolNum: sessionStorage.user_schoolNum,//存放用户学号（非用户ID）
		          name: null,
		          phone: null,
		          user_class: null
		        },
		        {
		          schoolNum: null,//存放用户学号（非用户ID）
		          name: null,
		          phone: null,
		          user_class: null
		        },
		        {
		          schoolNum: null,//存放用户学号（非用户ID）
		          name: null,
		          phone: null,
		          user_class: null
		        }
		        ],
		        formLabelWidth: '60px',//弹出表格宽度
		        dialogVisible_login: false,//弹出未登录提示
		        addDisabled: true,//是否能添加队员
		        personalDisabled: false,//个人报名
		        teamDisabled: true,//组队报名
		        teamEnter: true,//满足队员人数才能报名
		        index: 0,//队员数据索引下表 form
		        idDisabled: true,//除了登录账号队员不能修改学号
		        enrollNum: '第一位参赛选手信息填写',//标签提示第几位参赛信息
			}
		},
		watch: {
			index: function (val){
				if(val == 0){
					this.enrollNum = '第一位参赛选手信息填写';
					this.idDisabled = true;//第一位（登录账号）学号不能更改
					if(this.competitionInfo.competition_way==1){//比赛规模为一人
						this.addDisabled = true;//不可添加队员
						this.teamEnter = false;//可直接报名
					}
					if(this.competitionInfo.competition_way>1){//比赛规模为多人
						this.addDisabled = false;//可以添加队员
						this.teamEnter = true;//不可直接报名
					}
				}
				if(val == 1){
					this.enrollNum = '第二位参赛选手信息填写'
				}
				if(val == 2){
					this.enrollNum = '第三位参赛选手信息填写'
				}
			}
		},
		created(){
			this.getInfo();
			if(this.$route.params.details != null){
				this.competitionInfo = this.$route.params.details.competition;
				this.place = this.$route.params.details.place;
				if(this.competitionInfo.competition_way>1) {
					this.personalDisabled=true;
					this.addDisabled=false;
					this.teamDisabled=false;
				}
				if(this.competitionInfo.competition_way==1) this.teamEnter=false;
			}else{
				this.$message('正在请求数据！');
				this.$axios.post('message_board/findById',{
					id : this.$route.query.details_id
				},{
					transformRequest: function (data) {
						// 做任何你想要的数据转换
						return $.param(data);
					}
				})
				.then(response => {
					if(response.data != null){
						this.$message.success('请求数据成功！');
						this.competitionInfo = response.data.data.competition;
						this.place = response.data.data.place;
						if(this.competitionInfo.competition_way>1) {
							this.personalDisabled=true;
							this.addDisabled=false;
							this.teamDisabled=false;
						}
						if(this.competitionInfo.competition_way==1) this.teamEnter=false;
					}else{
						this.$message.error('请求数据失败！请重试！');
					}
				})
				.catch(error => {
					this.$message.error('请求出错！');
				   	console.log(error)
				});
			}
			//>函数与function函数不一样，箭头方法可以和父方法共享变量
			// this.$axios.get('competition/list')
  	// 		.then(response => {
  	// 			this.competitionInfo = response.data.data;
  	// 		})
  	// 		.catch(error => {
  	// 		 console.log(error)
  	// 		});
		},
		methods:{
			getInfo() {//获取该学号的学生信息
				if(this.form[0].schoolNum != null){
					//检查学号是否被注册过
					this.$axios.post('user/findUserBySchool_num',{
						school_num: this.form[this.index].schoolNum
					},{
						transformRequest: function (data) {
							// 做任何你想要的数据转换
							return $.param(data);}
					})
					.then(res => {
					    if(res.data.data != null){
					    	this.form[this.index].name = res.data.data.name;
					    	this.form[this.index].phone = res.data.data.phone;
					    	this.form[this.index].user_class = res.data.data.user_class;
					    }
					    if(res.data.data == null){
					    	this.$message.error('该用户不存在！请仔细检查再输入！');
					    }
					})
					.catch(err => {
						this.$message.error('未连接服务器！请重试！');
					})
				}
			},
			enroll_check(id){//检查用户登录
				if(sessionStorage.user_schoolNum == null){
					this.dialogVisible_login = true;
				}
				else {
					this.dialogFormVisible = true;

				}
			},
			toLogin () {//前往登录界面
				this.$router.push({
					name: 'Login',
					params: {
						pre_route: this.$route.name
					}
				})
			},
			personal () {
				if(this.competitionInfo.competition_way == 1){
					//个人报名
					//>函数与function函数不一样，箭头方法可以和父方法共享变量
					this.$axios.post('award/add',{
						message_board: {id: this.$route.query.details_id},
						userList: [{
							id: this.form[0].schoolNum
						}]
					},{
						transformRequest: function (data) {// 做任何你想要的数据转换
							return JSON.stringify(data);
						},
						headers: {//更改跨域请求头
	            			'Content-Type': 'application/json;charset=UTF-8'
	        			}
					})
					.then(res => {
					    if(res.data.msg == '成功'){
					    	this.$message.success('参赛成功！');
					    	this.$router.push({name:'Index'});
					    }
					    if(res.data.msg == '失败'){
					    	console.log(res.data);
					    	this.$message.error('报名失败！请重试	！');
					    }
					})
					.catch(err => {
						this.$message.error('未连接服务器！请重试	！');
					})
				}
				if(this.competitionInfo.competition_way == 3){
					//三人报名
					//>函数与function函数不一样，箭头方法可以和父方法共享变量
					this.$axios.post('award/add',{
						message_board: {id: this.$route.query.details_id},
						userList: [{
							id: this.form[0].schoolNum
						},{
							id: this.form[1].schoolNum 
						},{
							id: this.form[2].schoolNum
						}]
					},{
						transformRequest: function (data) {// 做任何你想要的数据转换
							return JSON.stringify(data);
						},
						headers: {//更改跨域请求头
	            			'Content-Type': 'application/json;charset=UTF-8'
	        			}
					})
					.then(res => {
					    if(res.data.msg == '成功'){
					    	this.$message.success('参赛成功！');
					    	this.$router.push({name:'Index'});
					    }
					    if(res.data.msg == '失败'){
					    	console.log(res.data);
					    	this.$message.error('报名失败！请重试	！');
					    }
					})
					.catch(err => {
						this.$message.error('未连接服务器！请重试	！');
					})
				}
			},
			userInfo_check(num) {//检查用户是否存在
				this.$axios.post('user/findUserBySchool_num',{
					school_num: num
				},{
					transformRequest: function (data) {// 做任何你想要的数据转换
						return $.param(data);
					}
				})
				.then(res => {
				    if(res.data.data != null){
						this.index += 1;
						this.idDisabled = false;
						this.$notify.info({ title: '消息', message: '请添加第'+(this.index+1)+'名队员信息' });
						if(this.index == this.competitionInfo.competition_way-1) 
						{
							this.addDisabled = true;//如果达到参赛标准就禁止添加队员
							this.teamEnter = false;//满足人数可以报名
						}
				    }
				    if(res.data.data == null){
						this.$notify.error({ title: '错误', message: '该用户不存在！请仔细检查再输入！' });
				    }
				})
				.catch(err => {
					this.$message.error('未连接服务器！请重试！');
				})
			},
			addPerson() {//添加队员
				this.userInfo_check(this.form[this.index].schoolNum);
			},
			cancel() {
				this.dialogFormVisible = false;
				this.index = 0;

				this.form[1].name = null;
				this.form[1].phone = null;
				this.form[1].user_class = null;
				this.form[2].name = null;
				this.form[2].phone = null;
				this.form[2].user_class = null;
			}
		}
	}
</script>

<style type="text/css">
	
</style>

<template>
	<div class="competitonInfo">
		<el-container>
		  <el-aside width="400px">
		  	<img src="../../static/img/match_pic1.png" style="width: 400px;">
		  </el-aside>
		  <el-main>
			<ul class="list-group">
			    <li class="list-group-item">竞赛名称：{{competitionInfo.name}}</li>
			    <li class="list-group-item">主办方：{{competitionInfo.host_unit}}</li>
			    <li class="list-group-item">竞赛等级：{{competitionInfo.lev}}</li>
			    <li class="list-group-item">竞赛描述：{{competitionInfo.competition_describe}}</li>
			    <li class="list-group-item">团队规模：{{competitionInfo.competition_way}}</li>
			    <li class="list-group-item">竞赛类型：{{competitionInfo.type}}</li>
			    <li class="list-group-item">比赛地点：{{place}}</li>
			    <li class="list-group-item"><el-button type="danger" plain @click="enroll_check(competitionInfo.id)" :disabled="personalDisabled">立即报名</el-button>
			    	<el-button type="primary" plain @click="enroll_check(competitionInfo.id)" :disabled="teamDisabled">组队报名</el-button></li>
			</ul>
		  </el-main>
		</el-container>
		<!-- 验证登录 -->
		<el-dialog
		  title="未登录"
		  :visible.sync="dialogVisible_login"
		  width="30%">
		  <span>当前用户未登录，请按确定键登录！</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible_login = false">取 消</el-button>
		    <el-button type="primary" @click="toLogin">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 报名表单 -->
		<el-dialog :title="enrollNum" :visible.sync="dialogFormVisible" width="30%">
		  <el-form :model="form">
		  	<el-form-item label="竞赛名" :label-width="formLabelWidth">
		      <el-input v-model="competitionInfo.name" auto-complete="off" disabled></el-input>
		    </el-form-item>
		    <el-form-item label="学号" :label-width="formLabelWidth">
		      <el-input v-model="form[index].schoolNum" auto-complete="off" :disabled="idDisabled" @blur="getInfo"></el-input>
		    </el-form-item>
		    <el-form-item label="姓名" :label-width="formLabelWidth">
		      <el-input v-model="form[index].name" auto-complete="off" disabled="ture"></el-input>
		    </el-form-item>
		    <el-form-item label="班级" :label-width="formLabelWidth">
		      <el-input v-model="form[index].user_class" auto-complete="off" disabled="ture"></el-input>
		    </el-form-item>
		    <el-form-item label="电话" :label-width="formLabelWidth">
		      <el-input v-model="form[index].phone" auto-complete="off" disabled="ture"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		  	<el-button type="danger" plain style="float: left;" :disabled="addDisabled" @click="addPerson">添加队员</el-button>
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="personal" :disabled="teamEnter">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>