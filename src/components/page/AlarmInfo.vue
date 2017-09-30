<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i>数据管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>处警信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-row>
            <el-col :span="24" aligh="right">
                <el-form ref="form" :inline="true" :model="filters" class="box" style="float:right;margin-top: -20px;">
                    <div class="block">
                        <el-date-picker
                            v-model="value4"
                            type="datetimerange"
                            :picker-options="pickerOptions2"
                            placeholder="选择事发时间范围"
                            align="right">
                        </el-date-picker>

                        <el-form-item label="">
                            <el-input v-model="filters.searchKey" placeholder="请输入关键字" class="searchBox" style="width: auto"></el-input>
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
                            prop="name"
                            label="处警员姓名">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="处警祥址">
                        </el-table-column>
                        <el-table-column
                            prop="number"
                            label="编号">
                        </el-table-column>
                        <el-table-column
                            prop="start_time"
                            label="事发时间上限">
                        </el-table-column>
                        <el-table-column
                            prop="end_time"
                            label="事发时间下限">
                        </el-table-column>
                        <el-table-column
                            prop="alter_time"
                            label="修改时间">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template scope="scope">
                                <el-button type="primary">编辑详情</el-button>
                                <el-button type="danger">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

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

export default {
    data() {
        return {
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            value4: '',
            userListTotal: 100,//用户总数
            rowMsg: {},//当前选中行的数据
            filters: { // (分页+关键字）查询
                searchKey: null,//查询的关键字
                page: 1,//页码
                pageSize: 12//每页的数据行数
            },
            tableData: [{
                order:'1',
                name:'张伟',
                address:'观山路市民中心',
                number:'430255',
                start_time:'2017-8-22 10:22',
                end_time:'2017-8-22 10:22',
                alter_time:'2017-8-22 10:22',
            },
            {
                order:'1',
                name:'张伟',
                address:'观山路市民中心',
                number:'430255',
                start_time:'2017-8-22 10:22',
                end_time:'2017-8-22 10:22',
                alter_time:'2017-8-22 10:22',
            }],

        }
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
            this.filter.page=val
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
    .el-table td{
        height: 55px;
    }
</style>
