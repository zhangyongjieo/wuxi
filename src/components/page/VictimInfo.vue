<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i>数据管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>案件受害人信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-row>
            <el-col :span="24" align="right">
                <el-form ref="form" :inline="true" :model="filters" class="box" >
                    <div class="block">
                        <el-form-item label="">
                            <el-input v-model="filters.caseType" placeholder="案件类别" class="searchBox" style="width: 150px"></el-input>
                            <el-input v-model="filters.place" placeholder="受害地点" class="searchBox" style="width: 150px"></el-input>
                            <el-input v-model="filters.searchKey" placeholder="请输入关键字" class="searchBox" style="width: 150px"></el-input>
                            <el-button type="primary" icon="search" @click="getUserInfoData">查询</el-button>
                            <el-button type="primary" icon="plus" @click="dialogFormVisible = true"> 添加</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                filters: {
                    caseType: '',
                    place: '',
                    searchKey: ''
                }
            }
        },
        methods:{

        }
    }
</script>

<style>

</style>
