<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 反诈中心接警单</el-breadcrumb-item>
                <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
            <el-form ref="form" :inline="true" :model="form_search">
                <el-form-item label="案件类别">
                    <el-select v-model="form_search.ajlx" placeholder="请选择" class="handle-select">
                        <el-option
                            v-for="item in lxList['100005']"
                            :key="item.id"
                            :label="item.lval"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="案发地点">
                    <el-input v-model="form_search.afdd"></el-input>
                </el-form-item>

                <el-form-item label="警单性质">
                    <el-select v-model="form_search.jdxz" placeholder="请选择" class="handle-select">
                        <el-option
                            v-for="item in lxList['100001']"
                            :key="item.id"
                            :label="item.lval"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="案发时间">
                    <el-date-picker
                        v-model="form_search.afsj_date_range"
                        type="datetimerange"
                        :picker-options="datePickerOptions"
                        placeholder="选择时间范围"
                        format="yyyy-MM-dd HH:mm:ss"
                        align="right">
                    </el-date-picker>
                </el-form-item>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </el-form>
        </div>
        <div class="statistics-box">
            <div class="statistics-title">统计结果</div>
            <div class="statistics-content" v-for="item in statisticResultList">
                <div class="statistics-item">
                    <div>
                        <img src="../../../static/img/leixing.png" height="86" width="86"/></div>
                    <div class="item-data-box">
                        <div>案件类型</div>
                        <div class="item-data-1">{{ item.lval }}</div>
                    </div>
                </div>
                <div class="statistics-item">
                    <div>
                        <img src="../../../static/img/cishu.png" height="86" width="86"/></div>
                    <div class="item-data-box">
                        <div>案件次数</div>
                        <div class="item-data-2">{{ item.totalcount }}</div>
                    </div>
                </div>
                <div class="statistics-item">
                    <div>
                        <img src="../../../static/img/jine.png" height="86" width="86"/>
                    </div>
                    <div class="item-data-box">
                        <div>涉案金额</div>
                        <div class="item-data-3">{{ item.totalsaje }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {fetchStatistics} from 'src/api/DataStatistics'
    import {fetchMenu} from 'src/api/PoliceCase'

    export default {
        data() {
            return {
                form_search: {
                    ajlx: '',
                    afdd: '',
                    jdxz: '',
                    afsj_date_range: ''
                },
                lxList: [],
                statisticResultList: [],
                datePickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                let self = this;

                //请求初始化菜单

                fetchMenu().then(response => {
                    self.lxList = response.data.data.lxList;
                    console.log(response)
                }).catch(err => {
                    console.log(err)
                });

//                jQuery.ajax({
//                    type: "GET",
//                    url: self.$config.request_prefix + self.$config.fetch_menu,
//                    dataType: "json",
//                    success: function (res) {
//                        console.log(res);
//                        self.lxList = res.data.lxList;
//                    }
//                });
            },
            search() {
                let self = this;
                let fromDate = '';
                let toDate = '';
                if (self.form_search.afsj_date_range.length > 0) {
                    fromDate = this.formatDate(self.form_search.afsj_date_range[0], 'yyyy-MM-dd hh:mm:ss');
                    toDate = this.formatDate(self.form_search.afsj_date_range[1], 'yyyy-MM-dd hh:mm:ss');
                }
                let query = {
                        ajlx: self.form_search.ajlx,
                        afdd: self.form_search.afdd,
                        jdxz: self.form_search.jdxz,
                        kssj: fromDate,
                        jssj: toDate
                };
                fetchStatistics(query).then(response => {
                    console.log(response)
                    self.statisticResultList = response.data.data;
                }).catch(err => {

                });

//                jQuery.ajax({
//                    type: "GET",
//                    url: self.$config.request_prefix + self.$config.fetch_statistics + "?ajlx=" + self.form_search.ajlx + "&afdd=" +
//                    self.form_search.afdd+ "&jdxz=" + self.form_search.jdxz  + "&kssj=" + fromDate + "&jssj=" + toDate,
//                    dataType: "json",
//                    success: function (res) {
//                        console.log(res);
//                        self.statisticResultList = res.data;
//                    }
//                });
            }
        }
    }
</script>
<style>
    .statistics-box .statistics-title{
        text-align: center;
        font-weight: bolder;
        font-size: 25px;
        margin-top: 20px;
        margin-bottom: 80px;
    }
    .statistics-box .statistics-content{
        display: flex;
        align-items: center;
        justify-items: center;
        margin-bottom: 20px;
    }
    .statistics-box .statistics-content .statistics-item{
        width: 33.33%;
        display: flex;
        align-items: center;
        justify-items: center;
    }
    .statistics-box .statistics-content .statistics-item .item-data-box{
        margin-left: 15px;
    }
    .statistics-box .statistics-content .statistics-item .item-data-1{
        color: #5dbca4;
        font-size: 30px;
        margin-top: 20px;
    }
    .statistics-box .statistics-content .statistics-item .item-data-2{
        color: #ca3633;
        font-size: 30px;
        margin-top: 20px;
    }
    .statistics-box .statistics-content .statistics-item .item-data-3{
        color: #b9b937;
        font-size: 30px;
        margin-top: 20px;
    }
</style>
