<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-rank"></i> 我的教练</el-breadcrumb-item>
                <el-breadcrumb-item>教练信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="box">
                <div class="drag-box-item" style="float: left; margin-top: 60px; width: 400px !important;max-width:400px !important;">
                    <div class="item-title">基本信息</div>
                    <div class="container">
                        <div>
                            <el-row class="coach-box">
                                <el-col class="text-label" :span="6">名称：</el-col>
                                <el-col  class="coach-data":span="18">{{coach.username}}</el-col>
                            </el-row>
                        </div>
                        <div>
                            <el-row class="coach-box">
                                <el-col class="text-label" :span="6">性别：</el-col>
                                <el-col  class="coach-data":span="18">{{coach.sex}}</el-col>
                            </el-row>
                        </div>
                        <div>
                            <el-row class="coach-box">
                                <el-col class="text-label" :span="6">联系电话：</el-col>
                                <el-col  class="coach-data":span="18">{{coach.phone}}</el-col>
                            </el-row>
                        </div>
                        <div>
                            <el-row class="coach-box">
                                <el-col class="text-label" :span="6">参考报价：</el-col>
                                <el-col  class="coach-data":span="18">{{coach.price}}</el-col>
                            </el-row>
                        </div>
                        <div>
                            <el-row class="coach-box">
                                <el-col class="text-label" :span="6">电子邮件：</el-col>
                                <el-col  class="coach-data":span="18">{{coach.email}}</el-col>
                            </el-row>
                        </div>
                        <div>
                            <el-row class="coach-box">
                                <el-col class="text-label" :span="6">地址：</el-col>
                                <el-col  class="coach-data":span="18">{{coach.address}}</el-col>
                            </el-row>
                        </div>

                    </div>
                </div>
                <div class="drag-box-item" style="float: left; margin-top: 60px; width:45% !important;max-width: unset !important;" >
                    <div class="item-title">教练车辆信息</div>
                    <div class="container">
                        <div>
                            <el-table
                                    :data="cars"
                                    style="width: 100%">
                                <el-table-column
                                        prop="id"
                                        label="车牌编号"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="车辆名称"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="number"
                                        label="车牌号">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'draglist',
        data() {
            return {
                coach:{
                    username: '',
                    sex: '',
                    phone: '',
                    email:'',
                    address: '',
                    price:''
                },
                cars:[]
            }
        },
        created(){
            this.query();
        },
        methods: {
            removeHandle(event){
                console.log(event);
                this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
            },
            query(){
                let _this = this;
                axios.get('api/patient/patient/pro/' + localStorage.getItem("ms_id")).then(function(res) {
                    let data = res.data;
                    console.log(data)
                    console.log(data.status == 0)
                    if (data.status == 0) {
                        console.log(data.data.coachId);
                        _this.queryById(data.data.coachId);
                        _this.queryCar(data.data.coachId);
                    }
                })
            },
            queryById(coachId){
                let _this = this;
                axios.get('api/doctor/doctor/pro/' + coachId).then(function(res) {
                    let data = res.data.data;
                    console.log(data)
                    _this.coach.username = data.username;
                    _this.coach.sex = data.sex;
                    _this.coach.phone = data.phone;
                    _this.coach.email = data.email;
                    _this.coach.address = data.address;
                    _this.coach.price = data.price;
                })
            },
            queryCar(coachId){
                let _this = this;
                axios.get('api/doctor/car/doctor/' + coachId).then(function(res) {
                    let data = res.data.data;
                    _this.cars = data;
                    console.log(_this.car)
                })
            }
        }
    }

</script>

<style scoped>
    .text-label {
        text-align: right;
    }
    .coach-data {
        text-align: left;
    }
    .coach-box {
        padding: 20px 0px;
    }
    .drag-box{
        display: flex;
        user-select: none;
    }
    .drag-box-item {
        flex: 1;
        max-width: 330px;
        min-width: 300px;
        background-color: #eff1f5;
        margin-right: 16px;
        border-radius: 6px;
        border: 1px #e1e4e8 solid;
    }
    .item-title{
        padding: 8px 8px 8px 12px;
        font-size: 14px;
        line-height: 1.5;
        color: #24292e;
        font-weight: 600;
    }

</style>
