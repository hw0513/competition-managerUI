<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        //验证原密码
		dialogFormVisible: true,//弹出验证表单
        form: {//报名表内部数据
          schoolNum: sessionStorage.user_schoolNum,//存放用户学号（非用户ID）
          name: '',
          password: ''
        },
        formLabelWidth: '60px',//表格宽度
        checked: true,//是否验证
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            //充重置密码
            this.$axios.post('user/updatePasswordBySchool_num',{
            	school_num: this.form.schoolNum,
            	password: this.ruleForm2.pass
            },{
				transformRequest: function (data) {
					// 做任何你想要的数据转换
					return $.param(data);
				}
            })
            .then(res => {
            	if(res.data.msg == '成功'){
            		this.$message.success('密码重置成功！稍后跳转登录界面~');
            		this.$router.push({
            			name: 'Login',
            			params: {
							pre_route: 'PersonalInfo'//让登录后回到个人信息界面
            			},
            			query: {
            				schoolNum: this.form.schoolNum
            			}
            		})
            	}
            	if(res.data.msg == '失败'){
            		this.$message.error('密码重置失败！请稍后重试！');
            	}
            })
			.catch(err => {
				this.$message.error('未连接服务器！请重试！');
			})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //验证原密码
      check_password() {
		//>函数与function函数不一样，箭头方法可以和父方法共享变量
		this.$axios.post('user/login',{
			school_num: this.form.schoolNum,
			password: this.form.password
		},{
			transformRequest: function (data) {
				// 做任何你想要的数据转换
				return $.param(data);
			}
		})
		.then(res => {
		    if(res.data.msg == '成功'){
		    	this.$message.success('验证成功！');
		    	this.dialogFormVisible = false;
		    	this.checked = false;
		    }
		    if(res.data.msg == '失败'){
		    	console.log(res.data);
		    	this.$message.error('验证失败！请重试！');
		    }
		})
		.catch(err => {
			this.$message.error('未连接服务器！请重试！');
		})
      },
  	  //监控键盘
  	  show_check: function (ev) {
        if(ev.keyCode==13){
            // this.check_password();
            alert()
    	}
      },
  	  //监控键盘
  	  show_update: function (ev) {
        if(ev.keyCode==13){
            // this.submitForm(formName);
    	}
      },
    },
    watch: {
    },
    created() {
    }
  }
</script>

<style>
	.update {
		width: 60%;
	}
</style>

<template>
	<div class="update">
		<br>
		<br>
		<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" @keyup="show_update($event)">
		  <el-form-item label="密码" prop="pass">
		    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码" prop="checkPass">
		    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm2')" :disabled="checked">提交</el-button>
		    <el-button @click="resetForm('ruleForm2')">重置</el-button>
		    <el-button type="danger" :disabled="!checked" @click="dialogFormVisible = true">验证原密码</el-button>
		  </el-form-item>
		</el-form>
		<!-- 验证原密码 -->
		<el-dialog title="请验证原密码" :visible.sync="dialogFormVisible" style="width: 60%;margin: 0 auto;">
		  <el-form :model="form" @keyup="show_check($event)">
		  	<el-form-item label="学号" :label-width="formLabelWidth">
		      <el-input v-model="form.schoolNum" auto-complete="off" disabled></el-input>
		    </el-form-item>
		    <el-form-item label="密码" :label-width="formLabelWidth">
		      <el-input v-model="form.password" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="check_password">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>