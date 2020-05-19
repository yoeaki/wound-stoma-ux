<template>
    <div>
        <el-card class="box-card">
            <div class="container">
                <div class="form-box">
                    <el-form ref="form" :model="info" label-width="60px">
                        <el-form-item label="id">
                            <el-input
                                    v-model="info.id"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="用户名">
                            <el-input
                                    v-model="info.username">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input
                                    v-model="info.password" type="password">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="真实姓名">
                            <el-input
                                    v-model="info.realName">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="身份证">
                            <el-input
                                    v-model="info.identifyNumber">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <el-input
                                    v-model="info.age">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="用户名">
                            <el-input
                                    v-model="info.username">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <el-input
                                    v-model="info.phone">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-input
                                    v-model="info.address">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="update">修改完成</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'StudentInfo',
        data() {
            return {
                info: {
                    id:'',
                    username: '',
                    realName: '',
                    identityNumber: '',
                    password: '',
                    sex: '',
                    age: '',
                    phone: '',
                    address: '',
                    role: ''
                },

            }
        },
        created() {
            this.query()
        },
        methods: {
            query(){
                let _this = this;
                let path = '/api/pat/patient/';
                console.log("路劲" + path)
                console.log("id" + localStorage.getItem('ms_id'))
                axios.get(path + localStorage.getItem('ms_id')).then(function(res) {
                    console.log(res)
                    let data = res.data.data;
                    _this.info = data;
                    console.log(data)
                    console.log(_this.info)
                    _this.info.id = data.id;
                    _this.info.username = data.username;
                    _this.info.realName = data.realName;
                    _this.info.identityNumber = data.identityNumber;
                    _this.info.password = data.password;
                    _this.info.age = data.age;
                    _this.info.sex = data.sex;
                    _this.info.address = data.address;
                    _this.coachId = data.coachId;
                    _this.info.role = data.role;
                }).catch(function(error) {
                    console.log(error)
                })
            },
            update(){
                console.log(this.info)
                let _this = this;
                this.$message.success('提交成功！');
                axios.put('/api/patient/patient/modify',_this.info).then(function(res) {
                    let data = res.data;
                    _this.$message.success(data.msg);
                    _this.$router.push('/patientInfo')
                })
            }
        }
    };
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 700px;
    }
</style>
