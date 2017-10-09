<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path: '/systemManage'}">
                    <i class="el-icon-date"></i>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加用户</el-breadcrumb-item>
            </el-breadcrumb>

            <el-form ref="form" :inline="true"  class="box" style="float:right;margin-top: -30px">
                <div class="block">
                    <el-form-item label="">
                        <el-button type="primary"  @click="save">保存</el-button>
                        <el-button style="background:#e8e8e8"  @click="reset">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>

        <div class="basicInfo">
            <div class="basicTitle">
                <h3>基本信息</h3>
            </div>
            <el-row style="padding:30px 30px">
                <el-col :span="3">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>

                <el-col :span="21">
                    <el-col :span="5" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">用户名</div>
                        <el-input v-model="yhm" placeholder="" style=""></el-input>
                    </el-col>

                    <el-col :span="5" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">登录密码</div>
                        <el-input v-model="dlmm" placeholder="" style=""></el-input>
                    </el-col>

                    <el-col :span="5" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">姓名</div>
                        <el-input v-model="xm" placeholder="" style=""></el-input>
                    </el-col>

                    <el-col :span="5" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">性别</div>
                        <el-select v-model="sex" placeholder="">
                            <el-option
                                v-for="item in sex"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="5" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">身份证号</div>
                        <el-input v-model="sfzh" placeholder="" style=""></el-input>
                    </el-col>

                    <el-col :span="5" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">移动长号</div>
                        <el-input v-model="ydch" placeholder="" style=""></el-input>
                    </el-col>

                    <el-col :span="5" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">移动短号</div>
                        <el-input v-model="yddh" placeholder="" style=""></el-input>
                    </el-col>

                    <el-col :span="5" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">电信长号</div>
                        <el-input v-model="dxch" placeholder="" style=""></el-input>
                    </el-col>

                    <el-col :span="5" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">电信短号</div>
                        <el-input v-model="dxdh" placeholder="" style=""></el-input>
                    </el-col>

                    <el-col :span="5" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">其他号码</div>
                        <el-input v-model="qthm" placeholder="" style=""></el-input>
                    </el-col>

                    <el-col :span="5" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">公安邮箱</div>
                        <el-input v-model="gayx" placeholder="" style=""></el-input>
                    </el-col>

                    <el-col :span="5" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">角色</div>
                        <el-select v-model="js" placeholder="">
                            <el-option
                                v-for="item in js"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>
        </div>

        <div class="orgInfo">
            <div class="basicTitle">
                <h3>组织信息</h3>
            </div>
            <el-row style="padding:30px 30px">
                <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                    <div class="head">警号</div>
                    <el-input v-model="jh" placeholder=""></el-input>
                </el-col>

                <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                    <div class="head">身份类型</div>
                    <el-select v-model="sflx" placeholder="">
                        <el-option
                            v-for="item in sflx"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>

                <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                    <div class="head">所属单位</div>
                    <el-select v-model="ssdw" placeholder="">
                        <el-option
                            v-for="item in ssdw"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>

                <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                    <div class="head">行政职务</div>
                    <el-select v-model="xzzw" placeholder="">
                        <el-option
                            v-for="item in xzzw"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>

                <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                    <div class="head">技术职务</div>
                    <el-select v-model="jszw" placeholder="">
                        <el-option
                            v-for="item in jszw"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>

                <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                    <div class="head">状态</div>
                    <el-select v-model="zt" placeholder="">
                        <el-option
                            v-for="item in zt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>

                <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                    <div class="head">是否是指挥人员</div>
                    <el-select v-model="sfszhry" placeholder="">
                        <el-option
                            v-for="item in sfszhry"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>

        <div class="otherInfo">
            <div class="basicTitle">
                <h3>其他信息</h3>
            </div>
            <el-col :span="22" style="margin-left: 20px;margin-top: 20px">
                <div class="head">备注</div>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="textarea">
                </el-input>
            </el-col>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imageUrl: '',
            textarea: '',
            yhm: '',
            dlmm: '',
            xm: '',
            sex: '',
            sfzh: '',
            ydch: '',
            yddh: '',
            dxch: '',
            dxdh: '',
            qthm: '',
            gayx: '',
            js: '',
            jh: '',
            sflx: '',
            ssdw: '',
            xzzw: '',
            jszw: '',
            zt: '',
            sfszhry: ''
        }
    },
    methods: {
        save() {

        },
        reset() {

        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>

<style>
    .content{
        background: #e8eef8;
    }
    .el-select{
        width:100%;
    }
    .el-date-editor.el-input{
        width:100%;
    }
    .orgInfo {
        height: 280px;
        background: #fff;
        margin-top: 20px;
    }
    .basicInfo{
        height: 350px;
        background: #fff;
    }
    .otherInfo {
        height: 220px;
        background: #fff;
        margin-top: 20px;
    }
    .basicTitle{
        padding: 10px 20px ;
        border-bottom: 1px solid #e8eef8;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
    }
    .avatar {
        width: 150px;
        height: 150px;
        display: block;
    }
    .el-upload--text{
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
    .head {
        margin-left: 10px;
        margin-bottom: 10px;
    }
</style>
