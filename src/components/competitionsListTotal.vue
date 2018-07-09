<script type="text/javascript">
	export default {
		data(){
			return{
				competitionsList: null,
			   	loading: true,//是否启用table加载动画
			   	competitionList: null,//渲染界面--比赛模块
			   	details: null,//用于报名或者详情跳转
			   	//报名要用到的数据
				dialogFormVisible: false,//弹出报名表单
				dialogVisible_login: false,//弹出未登录提示
				dialogVisible_team: false,//弹出提示多人报名需前往详情页报名的信息
			    form: {//报名表内部数据
			    	schoolNum: sessionStorage.user_schoolNum,//存放用户学号（非用户ID）
			        name: '',
			        phone: '',
			        user_class: ''
			    },
			    formLabelWidth: '60px',//表格宽度
				currentPage:1,//分页-当前页面
        		pagesize:10,//分页-页面大小
        		personalId: null,//个人报名所需的竞赛id（迂回）
			}
		},
		created(){
			// alert()
			//>函数与function函数不一样，箭头方法可以和父方法共享变量
			// this.$axios.get('http://127.0.0.1:8881/competition/list')
	  		// .then(response => {
	  		//  	this.competitionsList = response.data.data;
	  		// })
	  		// .catch(error => {
	  		// 		console.log(error)
	  		// });
	    	//获取竞赛时间、地点情况
			this.$axios.get('message_board/list')
	    	.then(response => {
	    		this.messageboardList = response.data.data;
	    		this.loading = false;
	    	})
	    	.catch(error => {
	       		console.log(error)
	   		});
		},
		watch: {
		},
		methods:{
			getInfo() {//获取该学号的学生信息
				if(this.form.schoolNum != null){
					//检查学号是否被注册过
					this.$axios.post('user/findUserBySchool_num',{
						school_num: sessionStorage.user_schoolNum
					},{
						transformRequest: function (data) {
							// 做任何你想要的数据转换
							return $.param(data);}
					})
					.then(res => {
					    if(res.data.data != null){
					    	this.form.name = res.data.data.name;
					    	this.form.phone = res.data.data.phone;
					    	this.form.user_class = res.data.data.user_class;
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
		    handleSizeChange: function(size){
		        this.pagesize = size;
		    },
		    handleCurrentChange: function(currentPage){
		        this.currentPage = currentPage;
		    },
			//前往比赛详情界面
			toDetailsInfo(details){
			    this.$router.push({
			    	name: 'CompetitionInfo',
			    	query: {
			    		details_id: details.id
			    	},
			    	params: {
			    		details
			    	}
			    })
			},
			//报名用到的方法——start
			//检测用户是否登录
			enroll_check(id){
				if(sessionStorage.user_schoolNum == null){
					this.dialogVisible_login = true;
				}
				else this.dialogFormVisible = true;
			},
			//前往登录界面
			toLogin() {
				this.$router.push({
					name: 'Login',
					params: {
						pre_route: this.$route.name
					}
				})
			},
			//个人报名
			personal () {
				//>函数与function函数不一样，箭头方法可以和父方法共享变量
				this.$axios.post('award/add',{
					message_board: {id: this.personalId},
					userList: [{
						id: this.form.schoolNum
					}]
				},{
					transformRequest: function (data) {
						// 做任何你想要的数据转换
						return JSON.stringify(data);
					},
					headers: {
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
			},
			//报名用到的方法——end
			//报名方法
			toEnroll(details) {
				this.getInfo();
				if(details.competition.competition_way > 1) {
					this.details = details;
					this.dialogVisible_team = true;
				}
				else {
					if(sessionStorage.user_schoolNum == null){
						this.dialogVisible_login = true;
					}
					else {
						this.details = details.competition;
						this.competition_name = details.competition.name;
						this.dialogFormVisible = true;
						this.personalId = details.id;
					}
				}
			}
		}
	}
</script>

<style type="text/css"></style>

<template>
	<div class="total">
	    <el-table
	      v-loading="loading"
	      :data="messageboardList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
	      style="width: 100%"
	      stripe>
	      <el-table-column
	        prop="competition.name"
	        label="竞赛名称">
	      </el-table-column>
	      <el-table-column
	        prop="competition.host_unit"
	        label="举办方">
	      </el-table-column>
	      <el-table-column
	        prop="competition.type"
	        label="竞赛类型">
	      </el-table-column>
	      <el-table-column
	        prop="competition.lev"
	        label="竞赛等级">
	      </el-table-column>
	      <el-table-column
	        prop="competition.competition_way"
	        label="团队规模">
	      </el-table-column>
	      <el-table-column>
		      <template slot-scope="scope">
				<el-button plain @click="toDetailsInfo(scope.row)">详情</el-button>
		        <el-button type="danger" @click="toEnroll(scope.row)" plain>报名</el-button>
		      </template>
	      </el-table-column>
	    </el-table>
		<el-pagination
		    @size-change="handleSizeChange"
		    @current-change="handleCurrentChange"
		    :current-page="currentPage"
		    :page-sizes="[10, 20, 50, 100]"
		    :page-size="pagesize"
		    layout="total, sizes, prev, pager, next, jumper"
		    :total="messageboardList.length">
		</el-pagination>
		<br>
		<br>
		<!-- 弹出框 -->
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
		<el-dialog title="参赛信息填写" :visible.sync="dialogFormVisible" style="width: 60%;margin: 0 auto;">
		  <el-form :model="form">
		  	<el-form-item label="竞赛名" :label-width="formLabelWidth">
		      <el-input v-model="competition_name" auto-complete="off" disabled></el-input>
		    </el-form-item>
		    <el-form-item label="学号" :label-width="formLabelWidth">
		      <el-input v-model="form.schoolNum" auto-complete="off" disabled></el-input>
		    </el-form-item>
		    <el-form-item label="姓名" :label-width="formLabelWidth">
		      <el-input v-model="form.name" auto-complete="off" disabled></el-input>
		    </el-form-item>
		    <el-form-item label="班级" :label-width="formLabelWidth">
		      <el-input v-model="form.user_class" auto-complete="off" disabled></el-input>
		    </el-form-item>
		    <el-form-item label="电话" :label-width="formLabelWidth">
		      <el-input v-model="form.phone" auto-complete="off" disabled></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="personal">确 定</el-button>
		  </div>
		</el-dialog>
		<!-- 多人参赛框 -->
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible_team"
		  width="30%">
		  <span>此比赛非个人赛，请按确定键转到详情页报名！</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible_team = false">取 消</el-button>
		    <router-link :to="{name:'CompetitionInfo',params:{details}}">
		    	<el-button type="primary" @click="dialogVisible_team = false">确 定</el-button>
			</router-link>
		  </span>
		</el-dialog>
	</div>
</template>