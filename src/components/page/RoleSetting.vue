<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <!-- icon需要修改 -->
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i>系统管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>角色设置</el-breadcrumb-item>
                <el-breadcrumb-item>设置</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="handle-box" style="margin-top: 20px;margin-left: 20px;">
                <el-form ref="form" :inline="true" :model="form_search">
                    <el-form-item label="角色名称 : ">
                        <el-input v-model="form_search.qxmc" placeholder="权限名称"></el-input>
                    </el-form-item>
                    <el-button type="primary">保存</el-button>
                    <el-button style="background: #e6e6e6;color:black" @click="cacel">取消</el-button>
                </el-form>
            </div>
        </div>

        <div class="set" style="margin-left: 20px;">
            <el-col  class="set-nav" :span="4">
                <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
                    <el-menu-item index="1" class="ticket">反诈中心接警单</el-menu-item>
                    <el-submenu index="2" class="sys-nav">
                        <template slot="title">系统管理</template>
                        <el-menu-item index="2-1">用户管理</el-menu-item>
                        <el-menu-item index="2-2">查看日志</el-menu-item>
                        <el-menu-item index="2-2">权限管理</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>


            <el-col :span="20" class="powerBox">
                <div class="title" style="width:30%">
                    <span>设置可查看权限</span>
                </div>
                <el-checkbox-group v-model="checkList" style="margin-top: 30px;padding-left: 10px">
                    <el-row style="border-bottom:1px dashed #ccc;padding: 15px 0;">
                        <el-col :span="8">
                            <el-checkbox label=" 登 录 名 " ></el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox label=" 性 别 "></el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox label=" 头 像 " ></el-checkbox>
                        </el-col>
                    </el-row>

                    <el-row style="border-bottom:1px dashed #ccc;padding: 15px 0;">
                        <el-col :span="8">
                            <el-checkbox label=" 密 码 " ></el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox label=" 警 号 "></el-checkbox>
                        </el-col>
                    </el-row>

                    <el-row style="border-bottom:1px dashed #ccc;padding: 15px 0;">
                        <el-col :span="8">
                            <el-checkbox label=" 姓 名 "></el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox label=" 技术职务 "></el-checkbox>
                        </el-col>
                    </el-row>

                    <el-row style="border-bottom:1px dashed #ccc;padding: 15px 0;">
                        <el-col :span="8">
                            <el-checkbox label=" 身份类型 "></el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox label=" 状 态 "></el-checkbox>
                        </el-col>
                    </el-row>

                    <el-row style="border-bottom:1px dashed #ccc;padding: 15px 0;">
                        <el-col :span="8">
                            <el-checkbox label=" 行政职务 "></el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox label=" 角 色 "></el-checkbox>
                        </el-col>
                    </el-row>

                    <el-row style="border-bottom:1px dashed #ccc;padding: 15px 0;">
                        <el-col :span="8">
                            <el-checkbox label=" 所属单位 "></el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox label=" 移动短号 "></el-checkbox>
                        </el-col>
                    </el-row>

                    <el-row style="border-bottom:1px dashed #ccc;padding: 15px 0;">
                        <el-col :span="8">
                            <el-checkbox label=" 是否是行政指挥人员 "></el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox label=" 电信短号 "></el-checkbox>
                        </el-col>
                    </el-row>

                    <el-row style="border-bottom:1px dashed #ccc;padding: 15px 0;">
                        <el-col :span="8">
                            <el-checkbox label=" 移动长号 "></el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox label=" 其他号码 "></el-checkbox>
                        </el-col>
                    </el-row>

                    <el-row style="border-bottom:1px dashed #ccc;padding: 15px 0;">
                        <el-col :span="8">
                            <el-checkbox label=" 电信长号 "></el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox label=" 公安邮箱 "></el-checkbox>
                        </el-col>
                    </el-row>

                    <el-row style="border-bottom:1px dashed #ccc;padding: 15px 0;">
                        <el-col :span="8">
                            <el-checkbox label=" 身份证号 "></el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox label=" 备 注 "></el-checkbox>
                        </el-col>
                    </el-row>

                </el-checkbox-group>
            </el-col>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                form_search:{
                    qxmc:''
                },
                checkList: ['选中且禁用','复选框 A']
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            cacel() {
                this.$router.push('/roleManage')
            }
        }
    }
</script>

<style>
    .content{
        background:#eff0f0
    }
    .set{
        height: 700px;
        background: #fff;
    }
    .set-nav{
        background: #f4f4f4;
        height: 700px;background:#e4e4e4
    }
    /*.ticket{*/
        /*background: #e4e4e4;*/
    /*}*/
    .powerBox{
        padding: 30px 40px;
        /*margin-top: ;*/
    }
</style>
