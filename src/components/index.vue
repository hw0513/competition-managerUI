<script>
import FooterVue from '@/components/footer'
import HeaderVue from '@/components/header'

export default {
	data () {
		return {
		    imgList_ind:[{url:require('../../static/img/baidu_lq_zp_banner.jpg')},//轮播图
		    {url:require('../../static/img/baidu_lq_zp_banner.jpg')},
		   	{url:require('../../static/img/baidu_lq_zp_banner.jpg')},
		   	{url:require('../../static/img/baidu_lq_zp_banner.jpg')},
		   	{url:require('../../static/img/baidu_lq_zp_banner.jpg')},
		   	{url:require('../../static/img/baidu_lq_zp_banner.jpg')}
		   	],
			imgList: [//数据库暂无比赛图片，以此代替
			   	{url:require('../../static/img/match_pic1.png')},
			   	{url:require('../../static/img/match_pic2.jpg')},
			   	{url:require('../../static/img/match_pic3.jpg')},
			   	{url:require('../../static/img/match_pic4.jpg')},
			   	{url:require('../../static/img/match_pic5.jpg')},
			   	{url:require('../../static/img/match_pic6.png')},
			   	{url:require('../../static/img/match_pic7.jpg')},
			   	{url:require('../../static/img/match_pic8.jpg')}
			],
		   	newsList: null,//存放新闻
		   	loading: true,//是否启用table加载动画
		   	competitionList: null,//渲染界面--比赛模块
		   	details: null,//用于报名
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
		    personalId: null,//个人报名所需的竞赛id（迂回）
		    // date: [//新闻信息日期
		    // 	{'2015-10-10'},
		    // 	{'2015-10-10'},
		    // 	{'2015-10-10'}
		    // ]
		}
	},
	components:{
		FooterVue,
		HeaderVue
	},
	created(){
		//>函数与function函数不一样，箭头方法可以和父方法共享变量
		//获取新闻
		this.$axios.get('news/list')
	   	.then(response => {
	   		this.newsList = response.data.data;
	   		this.loading = false;
	   	})
	   	.catch(error => {
	       	console.log(error)
	   	});
	   	//获取比赛信息
	   	this.$axios.get('message_board/endRegistration')
	    .then(response => {
	    	this.competitionList = response.data.data;
	    })
		.catch(err => {
			this.$message.error('未连接服务器！请重试！');
		})
	},
	mounted(){
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
			//失败！！！
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
			    	this.$router.push({name:'Total'});
			    	this.dialogFormVisible = false;
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

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 400px;
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
	<div id="_index">
		<!--导航页-->
		<header-vue></header-vue>
		<!--轮播图-->
		<template>
		  <el-carousel indicator-position="inside" :interval="4000" height="400px">
		    <el-carousel-item v-for="item in imgList_ind" :key="item.url">
		      <img :src="item.url" style="height: 400px; max-width: 100%;" ref="img">
		    </el-carousel-item>
		  </el-carousel>
		</template>
		
		<div style="width: 80%; margin: 0 auto; background-color: white">
			<!--竞赛	信息-->
			<el-container>
				<el-header style="margin-top: 2rem; height: 2rem; font-size: .8rem;">
					<div style="display: flex; width: 100%;border-bottom: 1px solid #ebeef5">
						<!-- <div style="width: 215px;"><div style="width: 60px; border-bottom: 1px solid #409eff;"><b>信息展示</b></div></div> -->
						<div style="width: 100%; display: flex; justify-content: space-between;">
							<div style="border-bottom: 1px solid #409eff; color: #409eff;"><b>推荐竞赛</b></div>
							<div style="margin-left: auto; border-bottom: 1px solid #409eff; font-size: .6rem;"><router-link :to="{name: 'Total'}">查看全部竞赛 ></router-link></div>
						</div>
					</div>
				</el-header>
			</el-container>
			<el-container>
			    <el-main>
					<!--缩略图-->
					<div class="row">
						<div class="col-sm-6 col-md-3" v-for="match in competitionList.slice(0, 4)" :key="match.id">
							<div class="thumbnail">
								<img src="static/img/match_pic1.png">
								<div class="caption">
									<p style="color: hotpink;font-size: .7rem;">{{match.competition.name}}</p>
									<p style="font-size: .8rem">{{match.competition.type}}</p>
									<p>
									  <el-button type="primary" plain @click="toEnroll(match)">报名</el-button>
									  <el-button plain @click="toDetailsInfo(match)">详情</el-button>
									</p>
								</div>
							</div>
						</div>
					</div>
			    </el-main>
			</el-container>

			<!-- 新闻消息板块 -->
			<div id="_news" style="margin: 0 20px; display:flex; flex-wrap: wrap;">
				<div style="width: 25.5rem; border: 0px solid black; margin-right: .4rem; margin-bottom: 2rem; max-width: 100%;">
					<div style="border-bottom: 1px solid #409eff">
						<span style="font-size: .8rem; color: #409eff;"><b>通知</b></span>
						<span style="font-size: .6rem; color: #409eff; float: right;">更多></span>
					</div>
					<el-table
					    :data="newsList"
					    style="width: 100%"
					    :default-sort = "{prop: 'date', order: 'descending'}"
					    >
					    <el-table-column
					      prop="title"
					      label="信息">
					    </el-table-column>
					    <el-table-column
					      prop="date"
					      label="日期"
					      sortable
					      width="80">
					    </el-table-column>
					</el-table>
				</div>
				<div style="width: 25.5rem; border: 0px solid black; margin-left: .4rem; margin-bottom: 2rem; max-width: 100%;">
					<div style="border-bottom: 1px solid #409eff">
						<span style="font-size: .8rem; color: #409eff;"><b>通知</b></span>
						<span style="font-size: .6rem; color: #409eff; float: right;">更多></span>
					</div>
					<el-table
					    :data="newsList"
					    style="width: 100%"
					    :default-sort = "{prop: 'date', order: 'descending'}"
					    >
					    <el-table-column
					      prop="title"
					      label="信息">
					    </el-table-column>
					    <el-table-column
					      prop="date"
					      label="日期"
					      sortable
					      width="80">
					    </el-table-column>
					</el-table>
				</div>
				<div style="width: 25.5rem; border: 0px solid black; margin-right: .4rem; margin-bottom: 2rem; max-width: 100%;">
					<div style="border-bottom: 1px solid #409eff">
						<span style="font-size: .8rem; color: #409eff;"><b>通知</b></span>
						<span style="font-size: .6rem; color: #409eff; float: right;">更多></span>
					</div>
					<el-table
					    :data="newsList"
					    style="width: 100%"
					    :default-sort = "{prop: 'date', order: 'descending'}"
					    >
					    <el-table-column
					      prop="title"
					      label="信息">
					    </el-table-column>
					    <el-table-column
					      prop="date"
					      label="日期"
					      sortable
					      width="80">
					    </el-table-column>
					</el-table>
				</div>
				<div style="width: 25.5rem; border: 0px solid black; margin-left: .4rem; margin-bottom: 2rem; max-width: 100%;">
					<div style="border-bottom: 1px solid #409eff">
						<span style="font-size: .8rem; color: #409eff;"><b>通知</b></span>
						<span style="font-size: .6rem; color: #409eff; float: right;">更多></span>
					</div>
					<el-table
					    :data="newsList"
					    style="width: 100%"
					    :default-sort = "{prop: 'date', order: 'descending'}"
					    >
					    <el-table-column
					      prop="title"
					      label="信息">
					    </el-table-column>
					    <el-table-column
					      prop="date"
					      label="日期"
					      sortable
					      width="80">
					    </el-table-column>
					</el-table>
				</div>
			</div>
		</div>

		<!--底部导航-->
		<footer-vue></footer-vue>

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