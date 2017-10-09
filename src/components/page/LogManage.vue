<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>查看日志</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="handle-box">
                <el-form ref="form" :inline="true" :model="form_search">
                    <el-form-item label="操作人 : ">
                        <el-input v-model="form_search.czr" placeholder="请输入查询姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="日期 : ">
                        <el-date-picker
                            v-model="form_search.date"
                            type="datetimerange"
                            :picker-options="datePickerOptions"
                            placeholder="请选择时间范围"
                            format="yyyy-MM-dd HH:mm:ss"
                            align="right">
                        </el-date-picker>
                        <el-button type="primary" icon="search" @click="search"></el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="logbox">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="order"
                    label="序号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="user"
                    label="用户名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="context"
                    label="操作内容"
                    width="260">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="访问时间">
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
        </div>

    </div>

</template>

<script>
    import {fetchLog} from 'src/api/LogManage'

    export default {
        data() {
            return {
                userListTotal: 100,//用户总数
                rowMsg: {},//当前选中行的数据
                filters: { // (分页+关键字）查询
                    searchKey: null,//查询的关键字
                    page: 1,//页码
                    pageSize: 12//每页的数据行数
                },
                form_search:{
                   czr:'',
                   date:''
                },
                datePickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                tableData: [{
                    order: '1',
                    name: '张强',
                    user: 'admin',
                    context: '登录 退出',
                    time: '2017-08-10 13:58'
                },
                {
                    order: '1',
                    name: '张强',
                    user: 'admin',
                    context: '登录 退出',
                    time: '2017-08-10 13:58'
                }]
            }
        },
        created() {
            this.getData();
        },
        methods: {
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
            }
        },
    }
</script>

<style>
    .handle-box{
        margin-top: 30px;
    }
    .block{
        margin-top: 20px;
    }
    .demonstration{
        float: left;
        display: block;
    }
    .block_right{
        float: right;
    }
</style>
