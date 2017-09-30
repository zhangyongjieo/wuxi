<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i>数据管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>320卡口信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-row>
            <el-col :span="24" align="right">
                <el-form ref="form" :inline="true" :model="filters" class="box" style="margin-top:-20px;">
                    <div class="block">
                        <el-form-item label="">
                            <el-input v-model="filters.dwmc" placeholder="点位名称" class="searchBox" style="width: 150px"></el-input>
                            <el-input v-model="filters.dwbm" placeholder="点位编码" class="searchBox" style="width: 150px"></el-input>
                            <el-input v-model="filters.jd" placeholder="经度" class="searchBox" style="width: 150px"></el-input>
                            <el-input v-model="filters.wd" placeholder="纬度" class="searchBox" style="width: 150px"></el-input>
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
                        style="width: auto">
                        <el-table-column
                            prop="order"
                            label="序号"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="点位名称">
                        </el-table-column>
                        <el-table-column
                            prop="dwbh"
                            label="点位编号">
                        </el-table-column>
                        <el-table-column
                            prop="jd"
                            label="经度">
                        </el-table-column>
                        <el-table-column
                            prop="wd"
                            label="纬度">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template scope="scope">
                                <el-button type="primary" @click="detail">编辑详情</el-button>
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
                filters: {
                    dwmc:'',
                    dwbm:'',
                    jd:'',
                    wd:'',
                    page: 1,//页码
                    pageSize: 12//每页的数据行数
                },
                userListTotal: 100,//用户总数
                rowMsg: {},//当前选中行的数据
                tableData: [{
                    order: '1',
                    name: '这是一个点位名称',
                    dwbh: '1464653',
                    jd: '116°23′17',
                    wd: '39°54′27'
                },
                {
                    order: '2',
                    name: '这是一个点位名称',
                    dwbh: '1464653',
                    jd: '116°23′17',
                    wd: '39°54′27'
                }]
            }
        },
        methods: {
            handleDel() {
                this.$confirm('确认删除该记录吗','提示',{
                    type: 'warning'
                }).then(()=>{
                    this.$message({
                        message: '删除成功',
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
            detail() {
                this.$router.push({path: '/editBayonetInfo'})
            },
            del() {

            },
            handleCurrentChange(val) {
                this.filter.page = val
                this.getUserInfoData();
            },
        }
    }
</script>

<style>
    .el-table td{
        height: 65px;
    }
</style>
