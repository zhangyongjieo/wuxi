<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i>数据管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>案件嫌疑人信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-row>
            <el-col :span="24" align="right">
                <el-form ref="form" :inline="true" :model="filters" class="box" >
                    <div class="block">
                        <el-form-item label="">
                            <el-input v-model="filters.caseType" placeholder="案件类别" class="searchBox" style="width: 150px"></el-input>
                            <el-input v-model="filters.place" placeholder="抓获地点" class="searchBox" style="width: 150px"></el-input>
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
                            label="序号">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名">
                        </el-table-column>
                        <el-table-column
                            prop="sex"
                            label="性别">
                        </el-table-column>
                        <el-table-column
                            prop="caseType"
                            label="案件类别">
                        </el-table-column>
                        <el-table-column
                            prop="caseNumber"
                            label="案件编号">
                        </el-table-column>
                        <el-table-column
                            prop="arrestLocation"
                            label="抓获地点">
                        </el-table-column>
                        <el-table-column
                            prop="arrestTime"
                            label="抓获日期">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template scope="scope">
                                <el-button type="primary" @click="handleEdit">编辑详情</el-button>
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
                userListTotal: 100,
                rowMsg: {},//当前选中行的数据
                filters: {
                    caseType: '',
                    place: '',
                    searchKey: '',
                    page: 1,//页码
                    pageSize: 12//每页的数据行数
                },
                tableData: [{
                    order: '1',
                    name: '张伟',
                    sex: '男',
                    caseType: '类别一',
                    caseNumber: 'J12345678987456321',
                    arrestLocation: '上海',
                    arrestTime: '2017-08-08 11:20'
                },
                {
                    order: '2',
                    name: '李伟',
                    sex: '男',
                    caseType: '类别二',
                    caseNumber: 'J12345678987456321',
                    arrestLocation: '无锡',
                    arrestTime: '2017-08-08 11:20'
                }]
            }
        },
        methods:{
            handleDel() {
                this.$confirm('确认删除该记录吗','提示',{
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                }).catch((err) =>{
                    console.log(err)
                })
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUserInfoData();
            },
            getUserInfoData() {
                //获取用户列表的数据
                // fetchUserInfoList(this.filters).then(res=>{

                // }).catch(err=>{

                // })
                //查询完之后，把查询关键字变为空
                this.filters.searchKey = null
            },
            handleEdit() {

            }
        }
    }
</script>

<style>
    .el-table td{
        height: 65px;
    }
</style>
