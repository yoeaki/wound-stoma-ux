<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 预约
                </el-breadcrumb-item>
                <el-breadcrumb-item>预约填写</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="reservation" label-width="80px">
                    <el-form-item label="预约医生">
                        <el-select v-model="doctorValue" placeholder="请选择">
                            <el-option
                                    v-for="item in doctors"
                                    :key="item.realName"
                                    :label="item.realName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="预约病因">-->
                        <!--<el-select v-model="diseaseName" placeholder="请选择">-->
                            <!--<el-option-->
                                    <!--v-for="item in diseases"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.diseaseName"-->
                                    <!--:value="item.id">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->

                    <el-form-item label="预约时间">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="reservation.reservationTime"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker
                                placeholder="选择时间"
                                v-model="reservation.startTime"
                                style="width: 100%;"
                            ></el-time-picker>
                        </el-col>
                    </el-form-item>

                    <!--<el-form-item label="图片上传">
                        <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>-->
                    <el-form-item label="预约备注">
                        <el-input type="textarea" rows="5" v-model="reservation.remarks"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">点击预约</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

export default {
    name: 'baseform',
    data() {
        return {
            reservation:{
                patientId: '',
                doctorId: '',
                reservationTime: '',
                remarks: '',
                schedule: '',
            },
            doctors:[

            ],
            diseases:[
                {
                    id: '1',
                    diseaseName: '头疼'
                },
                {
                    id: '2',
                    diseaseName: '肚子疼'
                }
            ],
            doctorValue: '',
            diseaseName: '',
            //fileList: [{name: 'food.jpeg', url: 'http://127.0.0.1:8086/lala.jpg'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]

        };
    },
    created(){
        // this.getStudent();
        this.getDoctor();
    },
    methods: {
        // submit() {
        //     formData.append('file', document.querySelector('input[type=file]').files[0]) // 'file' 这个名字要和后台获取文件的名字一样;
        //     formData.append('user',this.name)
        //     //'userfile'是formData这个对象的键名
        //     axios({
        //         url: '/api/cas/case/upload',   //****: 你的ip地址
        //         data: formData,
        //         method: 'post',
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //             // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8080'
        //             //这里是为了解决跨域问题，但是博主并没有用这种方式解决。后面会给出解决方案
        //         }
        //     }).then((res) => {
        //         console.log(res.data);
        //     }) // 发送请求
        // },
        onSubmit() {
            console.log(this.reservation)
            let _this = this;
            this.$message.success('提交成功！');
            console.log("====================")
            _this.reservation.doctorId = _this.doctorValue;
            _this.reservation.patientId = localStorage.getItem("ms_id");
            _this.reservation.schedule = 0;
            console.log(this.reservation)
            axios.post('/api/pat/reservation',this.reservation).then(function(res) {
                let data = res.data;
                _this.$message.success(data.msg);
                _this.$router.push('/table')
            })
        },
        getDoctor() {
            let path = '/api/doc/doctor/list';
            console.log(path)
            let _this = this;
            axios.get(path).then(function(res) {
                let data = res.data.data;
                _this.doctors = data;
            }).catch(function(error) {
                console.log(error)
            })
        },
        // getCoach() {
        //     let _this = this;
        //     console.log( "cccc" + _this.reservation.coachId)
        //     let path = '/api/doctor/doctor/pro/' + _this.reservation.coachId;
        //     console.log(path)
        //     axios.get(path).then(function(res) {
        //         let data = res.data.data;
        //         _this.reservation.coachName = data.username;
        //         console.log(_this.reservation.coachName)
        //         console.log(_this.reservation.studentName)
        //     }).catch(function(error) {
        //         console.log(error)
        //     })
        // }
    }
};
</script>
