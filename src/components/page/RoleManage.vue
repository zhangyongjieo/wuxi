<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-row>
            <el-col :span="24" align="right">
                <el-form ref="form" :inline="true" :model="form_search" class="box">
                    <el-form-item label="">
                        <el-input v-model="form_search.czr" placeholder="角色名称" class="searchBox"></el-input>
                        <el-button type="primary" icon="search" @click="getUserInfoData"></el-button>
                        <el-button type="primary" icon="plus" @click="dialogFormVisible = true"> 创建角色</el-button>
                    </el-form-item>
                </el-form>
                <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="创建角色名称 : " :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addRole">确 定
                            <router-link to="{path:'./roleSetting'}"></router-link>
                        </el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>

        <div class="logbox">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="order"
                    label="序号"
                    width="230">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="角色名称"
                    width="280">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="创建时间"
                    width="280">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="warning">权限设置</el-button>
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
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                filter: {
                    serchkey: '',
                    page: '1',
                    pageSize:'20'
                },
                currentPage4: 4,
                form_search:{
                    czr:'',
                    date:''
                },
                tableData: [{
                    order: '1',
                    name: '这里是角色名称',
                    context: '',
                    time: '2017-08-10 13:58'
                },
                {
                    order: '1',
                    name: '这里是角色名称',
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
            handleCurrentChange(val) {
                this.filters.page = val
                this.getUserInfoData();
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
            search() {
                let self = this;
                fetchLog(query).then(response => {
                    console.log(response)
                    self.statisticResultList = response.data.data;
                }).catch(err => {
                    console.log(err)
                });
            },
            addRole() {
                this.$router.push({path:'/roleSetting'})
            }
        },
    }
</script>

<style>
    /*.handle-box{*/
        /*margin-top: 30px;*/
    /*}*/
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
    .searchBox{
        width: auto;
    }
    .box{
        float: right;
    }
    .el-table td{
        height: 55px;
    }
    .el-dialog--small {
        width: 20%;
    }
    .el-dialog__title{
        float: left;
    }
</style>
