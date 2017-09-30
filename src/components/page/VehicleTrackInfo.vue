<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i>数据管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>320车辆轨迹信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-row>
            <el-col :span="24" align="right">
                <el-form ref="form" :inline="true" :model="filters" class="box" >
                    <div class="block">
                        <el-form-item label="">
                            <el-input v-model="filters.carNumber" placeholder="车牌号码" class="searchBox" style="width: 150px"></el-input>
                            <el-input v-model="filters.searchKey" placeholder="请输入关键字" class="searchBox" style="width: 150px"></el-input>
                            <el-button type="primary" icon="search" @click="getUserInfoData">查询</el-button>
                            <el-button type="primary" icon="plus" @click="dialogFormVisible = true"> 添加</el-button>
                        </el-form-item>
                    </div>
                </el-form>
             </el-col>
        </el-row>

        <div class="logbox">
            <el-row>
                <el-col :span="24">
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            prop="order"
                            label="序号"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="carNumber"
                            label="车牌号码">
                        </el-table-column>
                        <el-table-column
                            prop="vehicleBrand"
                            label="车辆品牌">
                        </el-table-column>
                        <el-table-column
                            prop="vehicleType"
                            label="车辆类型">
                        </el-table-column>
                        <el-table-column
                            prop="pointNumber"
                            label="点位编号">
                        </el-table-column>
                        <el-table-column
                            prop="elapsedTime"
                            label="经过时间">
                        </el-table-column>
                        <el-table-column
                            prop="updateTime"
                            label="更新时间">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template scope="scope">
                                <el-button type="primary" @click="setDetail">编辑详情</el-button>
                                <el-button type="danger" @click="handleDel">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-row style="margin-top:10px">
                        <el-col :span="12" align="left">
                            <el-button>条例总数:{{userListTotal}}</el-button>
                        </el-col>
                        <el-col :span="12" align="right">
                            <el-pagination layout="prev,pager,next" :total="userListTotal" @current-change="handleCurrentChange">
                            </el-pagination>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                filters: { // (分页+关键字）查询
                    carNumber:'',
                    searchKey: null,//查询的关键字
                    page: 1,//页码
                    pageSize: 12//每页的数据行数
                },
                userListTotal: 100,//用户总数
                rowMsg: {},//当前选中行的数据
                tableData: [{
                    order:'1',
                    carNumber:'苏E8888',
                    vehicleBrand:'宝马',
                    vehicleType:'跑车',
                    pointNumber:'020-050-030',
                    elapsedTime:'2017-8-22 10:22',
                    updateTime:'2017-8-22 10:22',
                },
                {
                    order:'1',
                    carNumber:'苏E8888',
                    vehicleBrand:'宝马',
                    vehicleType:'跑车',
                    pointNumber:'020-050-030',
                    elapsedTime:'2017-8-22 10:22',
                    updateTime:'2017-8-22 10:22',
                }],
            }
        },
        methods: {
            handleDel() {
               this.$confirm('确认删除该记录吗','提示',{
                   type:'warning'
               }).then(() => {
                   this.$message({
                       message: '成功删除',
                       type: 'success'
                   })
               })
            },
            getUserInfoData() {
                // //获取用户列表的数据
                // fetchUserInfoList(this.filters).then(res=>{

                // }).catch(err=>{

                // })
                //查询完之后，把查询关键字变为空
                this.filters.searchKey = null
            },
            getData() {
                let self = this;
                //请求初始化菜单
                fetchLog().then(response => {
                    self.lxList = response.data.data.lxList;
                    console.log(response)
                }).catch(err => {
                    console.log(err)
                });
            },
            handleCurrentChange(val) {
                this.filter.page = val
                this.getUserInfoData();
            },
            search() {
                let self = this;
                let fromDate = '';
                let toDate = '';
                if (self.form_search.date.length > 0) {
                    fromDate = this.formatDate(self.form_search.date[0], 'yyyy-MM-dd hh:mm:ss');
                    toDate = this.formatDate(self.form_search.date[1], 'yyyy-MM-dd hh:mm:ss');
                }
                let query = {
                    czr: self.form_search.czr,
                    kssj: fromDate,
                    jssj: toDate
                };
                fetchLog(query).then(response => {
                    console.log(response)
                    self.statisticResultList = response.data.data;
                }).catch(err => {
                    console.log(err)
                });
            },
            setDetail() {
                this.$router.push({path:'/editTrack'})
            }
        },
    }
</script>

<style>
    .el-table td{
        height: 65px;
    }
</style>
