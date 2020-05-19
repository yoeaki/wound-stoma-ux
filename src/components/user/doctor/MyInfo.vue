<template>
    <div>
        <el-card class="box-card">
            <div class="container" style="float: left">
                <div class="form-box" >
                    <div class="margin-box">个人基本信息</div>
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
                        <el-form-item label="真名">
                            <el-input
                                    v-model="info.realName">
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
                        <el-form-item label="电话">
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
        name: 'Coachcoach',
        data() {
            return {
                editVisible: false,
                info: {
                    id:'',
                    username: '',
                    realName: '',
                    password: '',
                    sex: '',
                    age: '',
                    phone: '',
                    email: '',
                    address: '',
                    role: ''
                },
                car: {
                    coachId: '',
                    name:'',
                    number:''
                },
                cars: []

            }
        },
        created() {
            this.queryCoach()
            this.queryCar()
        },
        methods: {
            queryCoach(){
                let _this = this;
                let path = '/api/doc/doctor/';
                console.log("路劲" + path)
                console.log("id" + localStorage.getItem('ms_id'))
                axios.get(path + localStorage.getItem('ms_id')).then(function(res) {
                    let data = res.data.data;
                    _this.info = data;
                    console.log(data)
                    console.log(_this.info)
                    _this.info.id = data.id;
                    _this.info.username = data.username;
                    _this.info.realName = data.realName;
                    _this.info.identifyNumber = data.identifyNumber;
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
                console.log(this.coach)
                let _this = this;
                this.$message.success('提交成功！');
                axios.put('/api/doctor/doctor/modify',_this.coach).then(function(res) {
                    let data = res.data;
                    _this.$message.success(data.msg);
                    _this.$router.push('/coachInfo')
                })
            },
            queryCar(){
                let _this = this;
                let path = '/api/doctor/car/doctor/';
                console.log("id" + localStorage.getItem('ms_id'))
                axios.get(path + localStorage.getItem('ms_id')).then(function(res) {
                    console.log(res)
                    let data = res.data.data;
                    _this.cars = data;
                }).catch(function(error) {
                    console.log(error)
                })
            },
            handleAdd(){
                this.editVisible = true;
            },
            addCar(){
                let _this = this;
                _this.car.coachId = localStorage.getItem('ms_id');
                axios.post('/api/doctor/car',this.car).then(function(res) {
                    let data = res.data;
                    _this.$message.success(data.msg);
                    _this.editVisible = false;
                    _this.flush()
                })
            },
            handleDelete(id, index, row) {
                let _this = this
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    axios.delete('/api/doctor/car/' + id).then(function(data) {
                        _this.$message.success("删除成功");
                        _this.cars.splice(index, 1);
                    })
                }).catch(() => {});
            },
            flush(){
                this.queryCar();
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

    .margin-box {
        margin-bottom: 15px;
        color: #409EFF;
    }
  el-form-item__label{
      width: 140px;
  }
</style>
