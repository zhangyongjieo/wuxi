<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <!-- icon需要修改 -->
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i>数据管理
                </el-breadcrumb-item>
                <el-breadcrumb-item @click="">320卡口信息</el-breadcrumb-item>
                <el-breadcrumb-item>编辑详情</el-breadcrumb-item>
            </el-breadcrumb>

            <el-row>
                <el-col :span="24" align="right">
                    <div class="box">
                        <el-button type="primary"  @click="save">保存</el-button>
                        <el-button style="background:#e8e8e8"  @click="cacel">取消</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="bayonetInfo">
            <div class="title">
                <h3>卡口信息</h3>
            </div>
            <el-row style="padding:20px 30px">
                <el-col :span="5" style="margin-right: 20px">
                    <div class="head">点位名称</div>
                    <el-input v-model="dwmc" placeholder="" style=""></el-input>
                </el-col>

                <el-col :span="5" style="margin-right: 20px">
                    <div class="head">点位编号</div>
                    <el-input v-model="dwbh" placeholder="" style=""></el-input>
                </el-col>

                <el-col :span="5" style="margin-right: 20px">
                    <div class="head">经度</div>
                    <el-input v-model="jd" placeholder="" style=""></el-input>
                </el-col>

                <el-col :span="5" style="margin-right: 20px">
                    <div class="head">纬度</div>
                    <el-input v-model="wd" placeholder="" style=""></el-input>
                </el-col>
            </el-row>
        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                dwmc: '',
                dwbh: '',
                jd: '',
                wd: ''
            }
        },
        methods: {
            save(){

            },
            cacel () {
                this.$router.push({path: '/bayonetInfo'})
            }
        }
    }

</script>

<style>
    .content{
        background: #e8eef8;
    }
    .title{
        padding: 10px 20px ;
        border-bottom: 1px solid #e8eef8;
    }
    .head{
        margin-bottom: 10px;
    }
    .bayonetInfo{
        background: #fff;
    }
</style>
