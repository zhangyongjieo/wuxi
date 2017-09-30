<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <!-- icon需要修改 -->
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i>数据管理
                </el-breadcrumb-item>
                <el-breadcrumb-item @click="vehicleTrackInfo">320车辆轨迹信息</el-breadcrumb-item>
                <el-breadcrumb-item>编辑信息</el-breadcrumb-item>
            </el-breadcrumb>

            <el-form ref="form" :inline="true" :model="filters" class="box" style="float:right;margin-top: -30px">
                <div class="block">
                    <el-form-item label="">
                        <el-button type="primary"  @click="save">保存</el-button>
                        <el-button style="background:#e8e8e8"  @click="cacel">取消</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>

        <div class="trackInfoBox">
            <div class="trackTitle"><h3>车辆轨迹信息</h3></div>
            <el-row style="padding: 20px 30px">
                <el-col span="24">
                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">车牌号码</div>
                        <el-input v-model="cphm" placeholder="" style=""></el-input>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">号牌颜色</div>
                        <el-select v-model="select_hpys" placeholder="">
                            <el-option
                                v-for="item in flapperColor"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">号牌种类</div>
                        <el-select v-model="value" placeholder="">
                            <el-option
                                v-for="item in flapperType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">车辆品牌1</div>
                        <el-input v-model="clpp1" placeholder=""></el-input>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">车辆品牌2</div>
                        <el-input v-model="clpp2" placeholder=""></el-input>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">车辆类型</div>
                        <el-select v-model="select_cllx" placeholder="">
                            <el-option
                                v-for="item in vehicleType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">车辆速度</div>
                        <el-input v-model="clsd" placeholder=""></el-input>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">行驶状态</div>
                        <el-input v-model="xszt" placeholder=""></el-input>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">行驶方向</div>
                        <el-input v-model="xsfx" placeholder=""></el-input>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">经过时刻</div>
                        <div class="block">
                            <el-date-picker
                                v-model="jgsk"
                                type="datetime"
                                placeholder="">
                            </el-date-picker>
                        </div>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">颜色深浅</div>
                        <el-select v-model="select_yssq" placeholder="">
                            <el-option
                                v-for="item in yssq"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">车身颜色</div>
                        <el-input v-model="csys" placeholder=""></el-input>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">照片数量</div>
                        <el-input v-model="zpsl" placeholder=""></el-input>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">车道编号</div>
                        <el-input v-model="cdbh" placeholder=""></el-input>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">经过时间</div>
                        <div class="block">
                            <el-date-picker
                                v-model="jgsj"
                                type="datetime"
                                placeholder="">
                            </el-date-picker>
                        </div>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">车道信息编号</div>
                        <el-input v-model="cdxxbh" placeholder=""></el-input>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">点位编号</div>
                        <el-input v-model="cdxxbh" placeholder=""></el-input>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">监控设备编号</div>
                        <el-input v-model="jksbbh" placeholder=""></el-input>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">车外廓长</div>
                        <el-input v-model="cykc" placeholder=""></el-input>
                    </el-col>

                    <el-col :span="4" style="margin-right: 20px;margin-bottom: 20px;">
                        <div class="head">处理标记</div>
                        <el-input v-model="clbj" placeholder=""></el-input>
                    </el-col>

                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                cphm:'',
                flapperType:[{
                    value:'',
                    label:'',
                }],
                flapperColor:[{
                    value:'',
                    label:''
                }],
                vehicleType:[{
                    value:'',
                    label:''
                }],
                clpp1:'',
                clpp2:'',
                clsd:'',
                xszt:'',
                xsfx:'',
                jgsk:'',
                csys:'',
                jgsj:'',
                cdxxbh:'',
                jksbbh:'',
                cykc:'',
                clbj:'',
                yssq:[],
                select_yssq:'',
                select_hpys:'',
                select_cllx:'',
            }
        },
        methods: {
            cacel() {
                this.$router.push({path:'/vehicleTrackInfo'})
            },
            save() {

            },
            vehicleTrackInfo() {
                this.$router.push({path:'/vehicleTrackInfo'})
            }
        }
    }

</script>

<style>
    .content{
        background: #e8eef8;
    }
    .trackInfoBox{
        height: 500px;
        width: 100%;
        background: #fff;
    }
    .trackTitle{
        padding: 10px 20px ;
        border-bottom: 1px solid #e8eef8;
    }
    .head{
        margin-bottom: 10px;
    }
    .el-select{
        width:100%;
    }
    .el-date-editor.el-input{
        width:100%;
    }
</style>
