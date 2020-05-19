<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" >
                    <div class="user-info">
                        <img src="../../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">
                                <span>{{name}}</span>
                                <span style="padding-left: 20px"><i class="el-icon-edit" type="primary" @click="editMyInfo" style="font-size: 24px;color: #67C23A;"></i></span>
                            </div>
                            <div style="color: #20a0ff">{{role}}</div>
                        </div>
                    </div>
                </el-card>
                <el-card shadow="hover" >
                    <div slot="header" class="clearfix">
                        <span>病例详情</span>
                    </div>
                    <div  v-for="item in disease">
                        {{item.diseaseName}} : {{item.diseaseNum}}<el-progress :percentage="((item.diseaseNum/desNum)*100).toFixed(1)" color="#42b983"></el-progress>

                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{doctorNum}}</div>
                                    <div>医生数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{caseNum}}</div>
                                    <div>病因数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-phone-outline grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{patientResNum}}</div>
                                    <div>病人预约数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-truck grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{patientNum}}</div>
                                    <div>普通用户数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-plus grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div>添加新模块</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../../common/bus';
    import axios from 'axios'
    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                patientNum: '病人数量',
                doctorNum: '医生数量',
                desNum: '病例数',
                patientResNum: '预约数量',
                caseNum:'病种数量',
                carNum: '0',
                ms_id: '',
                disease: [],
                diseaseCount:'',
                myInfo: {}
            };
        },
        components: {
            Schart
        },
        computed: {
            role() {
                return '超级管理员';
            }

        },
        created() {
            this.ms_id = localStorage.getItem('ms_id');
            this.queryPatientNum();
            this.queryDoctorNum();
            this.queryPatientResNum();
            this.queryCaseNum();
            this.queryDisease();
            this.queryDesNum();
            // this.queryMyInfo();
            // this.queryCoachAuditNum();
            // this.queryCoachNum();
            // this.queryAdminAnnouncement();
            console.log("=======")
            console.log(this.disease)
            console.log("=======")
        },
        // activated() {
        //     this.handleListener();
        // },
        // deactivated() {
        //     window.removeEventListener('resize', this.renderChart);
        //     bus.$off('collapse', this.handleBus);
        // },
        methods: {
            changeDate() {
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                });
            },
            editMyInfo(){
                this.$router.push('/doctorInfo');
            },
            queryPatientNum(){
                let path = '/api/pat/patient/count';
                let param = "patientNum";
                this.query(path,param);
            },
            queryDoctorNum(){
                let path = '/api/doc/doctor/count';
                let param = "doctorNum";
                this.query(path,param);
            },
            queryPatientResNum(){
                let path = '/api/pat/reservation/count';
                let param = "patientResNum";
                this.query(path,param);
            },
            queryDisease(){
                let path = '/api/adm/admin/case/sameCount';
                let param = "disease";
                this.query(path,param);
            },
            queryDesNum(){
                let path = '/api/cas/case/count';
                let param = "desNum";
                this.query(path,param);
            },
            querySystemMsg(){
                let path = '/api/patient/evaluation/count/' + this.ms_id;
                let param = "systemMsg";
                this.query(path,param);
            },
            queryCaseNum(){
                let path = '/api/cas/case/count/';
                let param = "caseNum";
                this.query(path,param);
            },
            queryMyInfo(){
                let path = '/api/doctor/doctor/pro/' + this.ms_id;
                let param = "myInfo";
                this.query(path,param);
            },
            //封装查询方法
            query(path,params){
                let _this = this;
                axios.get(path).then(function(res) {
                    let data = res.data.data;
                    console.log(params + data)
                    if (params === 'patientNum') {
                        _this.patientNum = data;
                    }else if (params === 'doctorNum'){
                        _this.doctorNum = data;
                    }else if (params === 'systemMsg'){
                        _this.systemMsg = data;
                    } else if (params === 'caseNum'){
                        _this.caseNum = data;
                    }else if (params === 'patientResNum'){
                        _this.patientResNum = data;
                    }else if (params === 'myInfo'){
                        _this.myInfo = data;
                    }else if (params === 'coachAuditNum'){
                        _this.coachAuditNum = data;
                    }else if (params === 'announcementNum'){
                        _this.announcementNum = data;
                    }else if (params === 'disease'){
                        _this.disease = data;
                    }else if (params === 'desNum'){
                        _this.desNum = data;
                    }
                    params = res.data.data;
                    console.log(res.data.data)
                }).catch(function(error) {
                    console.log(error)
                })
            }
            // handleListener() {
            //     bus.$on('collapse', this.handleBus);
            //     // 调用renderChart方法对图表进行重新渲染
            //     window.addEventListener('resize', this.renderChart);
            // },
            // handleBus(msg) {
            //     setTimeout(() => {
            //         this.renderChart();
            //     }, 200);
            // },
            // renderChart() {
            //     this.$refs.bar.renderChart();
            //     this.$refs.line.renderChart();
            // }
        }
    };
</script>


<style scoped>
    .user-info-list {
        padding:10px 0px;
    }
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }



    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }
    .user-info-list > span{
        text-align: right;
    }
</style>
