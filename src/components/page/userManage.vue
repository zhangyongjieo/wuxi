<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <!-- icon需要修改 -->
                <el-breadcrumb-item :to="{path: '/systemManage'}">
                    <i class="el-icon-date"></i>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row>
            <el-col :span="10">
                <el-button @click="exportData" style="float:left;" type="primary">导出</el-button>
                <el-upload action="xxxxxxxxxx" style="display:inline-block;">
                    <el-button type="primary">EXCEL导入</el-button>
                </el-upload>
            </el-col>
            <el-col :span="14" align="right">
                <el-input style="width:300px;" v-model="filters.searchKey" placeholder="请输入关键字">
                    <el-button style="color:#20A0FF" slot="append" @click="getUserInfoData" icon="search"></el-button>
                </el-input>
                <el-button style="margin-left:10px" type="primary">
                    <i class="el-icon-plus"></i> 添加用户</el-button>
                <el-button type="danger" @click="deleteById(-100)">
                    <i class="el-icon-close"></i> 删除</el-button>
            </el-col>
        </el-row>

        <el-row style="margin-top:20px">
            <el-col :span="24">
                <el-table ref="userInfoTable" :data="userList" tooltip-effect="dark" style="width:100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection">
                    </el-table-column>
                    <el-table-column prop="tx" label="头像" align="center">
                        <template scope="scope">
                            <img class="tx_img" style="width:30px;" :src="scope.row.tx" >
                        </template>
                    </el-table-column>
                    <el-table-column prop="xm" width="100px" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="ydch" label="移动长号" align="center"></el-table-column>
                    <el-table-column prop="jh" label="警号" align="center"></el-table-column>
                    <el-table-column prop="ssdw" label="所属单位" align="center"></el-table-column>
                    <el-table-column prop="xzzw" label="行政职务" align="center"></el-table-column>
                    <el-table-column prop="szzh" label="身份证号" align="center"></el-table-column>
                    <el-table-column label="操作" width="300px" align="center">
                        <template scope="scope">
                            <span @click="editUserInfo(scope.row)" class="linkstyle">编辑▪</span>
                            <span @click="resetPassWord(scope.row)" class="linkstyle">重置密码▪</span>
                            <span @click="deleteById(scope.row.id)" class="linkstyle">删除</span>
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

        <el-dialog @close="colseDialog" title="修改密码" :visible.sync="dialogVisible" size="tiny">
            <el-form ref="passwordResetForm" :model="resetPass" label-width="80px" :rules="Passrules" >
                <el-form-item label="旧密码">
                    <el-input v-model="resetPass.Oldpwd"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input v-model="resetPass.newPwd"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="reSurePwd">
                    <el-input v-model="resetPass.reSurePwd"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer">
                <el-button @click="dialogVisible=false">取消</el-button>
                <el-button type="success" @click="resetpass('passwordResetForm')">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchUserInfoList, downUserInfoData, deleteUserById } from 'src/api/PoliceCase'

export default {
    data() {
        var checkPassWord = (rule,value,callback) =>{
            if(value===''){
                callback(new Error('请输入密码!'))
            }else if(value!=this.resetPass.newPwd){
                callback(new Error('两次输入的密码密码不一致!请重新输入!'))
            }else{
                callback()
            }
        };
        return {
            Passrules: {
                reSurePwd: [
                    { validator:checkPassWord, trigger: 'blur'}
                ],
                newPwd:[
                   { required: true, message: '密码不能为空', trigger: 'blur' },
                   { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            },
            filters: { // (分页+关键字）查询
                searchKey: null,//查询的关键字
                page: 1,//页码
                pageSize: 12//每页的数据行数
            },
            userList: [
                {
                    id: 1,//id
                    tx: '../../../static/img/logo2.png',//头像
                    xm: '张三',//姓名
                    dlm: "白龙马",//登录名
                    pwd: '123456',//密码
                    sex: true,//性别
                    zt: '在岗',//状态
                    sfzhry: true,//是否为指挥人员
                    js: '',//角色
                    sflx: '警察',//身份类型
                    jh: '9527',//警号
                    ssdw: '香港皇家警察',//所属单位
                    xzzw: '局长',//行政职务
                    ydch: '1388888888',//移动长号
                    yddh: '213',//移动短号
                    dxch: '21321312',//电信长号
                    dxdh: '12312321',//电信短号
                    qthm: '1231233213',//其他号码
                    gayx: 'xxxx@qq.com',//公安邮箱
                    szzh: '2134875878978234',//身份证号
                    bz: ''//备注
                },
                {
                    id: 2,//id
                    tx: '',//头像
                    xm: '张三',//姓名
                    dlm: "白龙马",//登录名
                    pwd: '123456',//密码
                    sex: true,//性别
                    zt: '在岗',//状态
                    sfzhry: true,//是否为指挥人员
                    js: '',//角色
                    sflx: '警察',//身份类型
                    jh: '9527',//警号
                    ssdw: '香港皇家警察',//所属单位
                    xzzw: '局长',//行政职务
                    ydch: '1388888888',//移动长号
                    yddh: '213',//移动短号
                    dxch: '21321312',//电信长号
                    dxdh: '12312321',//电信短号
                    qthm: '1231233213',//其他号码
                    gayx: 'xxxx@qq.com',//公安邮箱
                    szzh: '2134875878978234',//身份证号
                    bz: ''//备注
                }
            ],//用户列表
            mutipartSelection: [],//多选参数
            userListTotal: 100,//用户总数
            showFile: false,
            dialogVisible: false,
            rowMsg: {},//当前选中行的数据
            resetPass: {
                id:'',//用户的id
                oldPwd:'',//旧密码
                newPwd: '',//新密码
                reSurePwd: ''//再次确认密码
            },

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
        handleSelectionChange(row) {//处理多选框
            this.mutipartSelection = []
            for(let i=0;i<row.length;i++){
                this.mutipartSelection.push(row[i].id)
            }
            console.log(this.mutipartSelection)
        },
        handleCurrentChange(val) {
            this.filters.page = val
            this.getUserInfoData();
        },
        exportData() {
            downUserInfoData();
        },
        //根据id删除成员信息
        deleteById(id) {
            let query = [];
            if(id===-100){
                query = this.mutipartSelection
            }else{
                query.push(id)
            }
            alert(JSON.stringify(query))
            this.$confirm('确定删除此用户吗？', '提示', {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "danger"
            }).then(() => {
                //开始删除
                // deleteUserById(id).then(res=>{

                // }).catch(err=>{

                // })
                this.getUserInfoData();
            }).catch(() => {

            })
        },
        //编辑用户信息
        editUserInfo(row) {
        },
        //密码重置
        resetPassWord(row) {
            this.resetPass.Oldpwd = row.pwd;
            this.resetpass.id = row.id;
            this.dialogVisible = true
        },
        resetpass(formname) {
            this.$refs[formname].validate((valid)=>{
                if(valid){
                     updatePassWord(this.resetPass).then(res=>{

                     }).catch(err=>{

                     })
                }else{
                   return false
                }
            })
        },
        colseDialog(){
            this.resetPass.newPwd = ''
            this.resetPass.reSurePwd = ''
        }
    },
    mounted() {
        this.getUserInfoData();
    }
}
</script>

<style>
.linkstyle {
    color: #20A0FF;
    display: inline-block;
    cursor: pointer;
}

.fileUpload {
    color: #20A0FF;
}

.el-upload,
.el-upload--text {
    width: 100%;
    height: 100%;
    display: inline-block;
    margin-left: 20px
}

.tx_img{
    border-radius: 20px;
}
</style>
