<script type="text/javascript">
	export default {
		data() {
			return {
				awardInfo: null,//用于存放参加的比赛信息
			}
		},
		created() {
			this.$axios.post('award/findAwardbyUserId',{
				userId : sessionStorage.user_schoolNum
			},{
				transformRequest: function (data) {
					// 做任何你想要的数据转换
					return $.param(data);
				}
			})
			.then(response => {
				// console.log((String)(response.data.data).length)
				if((String)(response.data.data).length > 0){
					this.$message.success('请求数据成功！');
					// console.log(JSON.stringify(response.data.data))
					this.awardInfo = response.data.data;
				}
				else if((String)(response.data.data).length == 0){
					this.$message.error('暂未参加任何比赛！');
				}else{
					this.$message.error('请求数据失败！请重试！');
				}
			})
			.catch(error => {
				this.$message.error('请求出错！');
			   	console.log(error)
			});
		}
	}
</script>

<style type="text/css">
	
</style>

<template>
	<div id="_myCompetition">
		<ul class="list-group" v-for="item in awardInfo">
		    <li class="list-group-item">竞赛名称：{{item.message_board.competition.name}}</li>
		    <li class="list-group-item">主办方：{{item.message_board.competition.host_unit}}</li>
		    <li class="list-group-item">竞赛等级：{{item.message_board.competition.lev}}</li>
		    <li class="list-group-item">竞赛描述：{{item.message_board.competition.competition_describe}}</li>
		    <li class="list-group-item">团队规模：{{item.message_board.competition.competition_way}}</li>
		    <li class="list-group-item">竞赛类型：{{item.message_board.competition.type}}</li>
		    <li class="list-group-item">比赛地点：{{item.message_board.place}}</li>
		</ul>
	</div>
</template>