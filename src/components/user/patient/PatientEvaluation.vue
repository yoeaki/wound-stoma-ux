<template>
    <div>
        <div>
            <el-button type="success"
                       icon="el-icon-edit"
                       @click="handleEdit()"
                       style="margin: 15px"
            >我要评论</el-button>
            <!--编辑弹窗-->
            <el-dialog title="写下你对教练的评价吧！" :visible.sync="editVisible" width="30%">
                <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="评论内容">
                        <el-input type="textarea" rows="5" v-model="form.evaContent"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
            </el-dialog>
        </div>
        <div>
            <el-collapse v-model="activeNames" style="padding: 10px">
                <div v-for="eva in evaluations">
                    <el-collapse-item :title="eva.evaContent.substring(0,15) + '    (点击查看详情)'" style="border-bottom: 1px solid #a6a9ad;color: #00d1b2">
                        <div style="padding: 15px 30px;">
                            <div>{{eva.evaContent}}</div>
                            <div style="margin-left: 80%; color: #a6a9ad" >
                                {{$moment(eva.evaTime).format('YYYY-MM-DD HH:MM:ss')}}
                            </div>
                        </div>

                    </el-collapse-item>
                </div>

            </el-collapse>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
export default {
    data(){
        return {
            visible: false,
            activeNames: ['1'],
            editVisible: false,
            coachId:'',
            studentId:'',
            evaluations:[],
            form:{
                studentId:'',
                coachId:'',
                evaContent:'',
                evaTime:''
            }
        }
    },
    created(){
        this.queryById();
    },
    methods:{
        queryById(){
            let _this = this;
            console.log(localStorage.getItem('ms_id'))
            axios.get('/api/patient/evaluation/pro/'+ localStorage.getItem('ms_id')).then(function(res) {

                let data = res.data.data;
                _this.evaluations = data;
            })
        },
        handleEdit(){
            this.editVisible = true;
        },
        saveEdit(){
            let _this = this;
            console.log(localStorage.getItem('ms_id'));
            axios.get('/api/patient/patient/'+ localStorage.getItem('ms_id')).then(function(res) {
                let data = res.data.data;
                _this.form.coachId = data.coachId;
                _this.form.studentId = data.id;
                _this.form.evaTime = new Date();
                _this.saveEva(data.coachId);
            })
        },
        saveEva(coachId){
            let _this = this;
            axios.post('/api/patient/evaluation',this.form).then(function(res) {
                _this.queryById();
                console.log("提交");
            });
            _this.editVisible = false;
            _this.$message.success("评论成功");
        }
    }
}
</script>

<style>
    .el-collapse-item__header {
        padding: 0 10px;
    }
</style>
