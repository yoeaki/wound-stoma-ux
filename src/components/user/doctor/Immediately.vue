<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"

                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="patientName" label="用户名称"></el-table-column>
                <el-table-column prop="doctorName" label="医生名称"></el-table-column>
                <el-table-column prop="disaseName" label="病因"></el-table-column>
                <el-table-column prop="diagnosis" label="诊断信息"></el-table-column>
                <el-table-column label="诊断信息">
                    <template slot-scope="scope">
                    <span v-if="JSON.stringify(scope.row.casePic)=='{}'">
                        <el-button @click="uploadCasePic(scope.row.id)" type="primary"><i class="el-icon-upload2"></i>上传病图</el-button>
                    </span>
                        <span v-else>
                            <a :href="root+scope.row.casePic" target="_blank" :download="scope.row.casePic">
                                <el-button  type="success"><i class="el-icon-view"></i> 查看图片</el-button>
                            </a>
                            <iframe   width=0   height=0   frameborder=0   name="hrong"   style="display:none"></iframe>
                        </span>
                    </template>>
                </el-table-column>
                <el-table-column prop="recommendation" label="医生建议"></el-table-column>
                <el-table-column label="就诊时间">
                    <template slot-scope="scope">{{$moment(scope.row.seeTime).format('YYYY-MM-DD HH:MM:ss')}}</template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="dialogCase(scope.row.id,scope.$index, scope.row)"
                        >填写病例</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="病例填写" :visible.sync="dialogCaseEdit" width="30%">
            <el-form ref="form" :model="caseForm" label-width="80px">
                <el-form-item label="病因">
                    <el-select v-model="disaseValue" placeholder="请选择">
                        <el-option
                                v-for="item in disase"
                                :key="item.diseaseName"
                                :label="item.diseaseName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="诊断信息">
                    <el-input type="textarea" v-model="caseForm.diagnosis"></el-input>
                </el-form-item>
                <el-form-item label="医生建议">
                    <el-input type="textarea" v-model="caseForm.recommendation"></el-input>
                </el-form-item>
                <!--<el-form-item label="就诊时间">-->
                    <!--<el-input v-model="CaseForm.seeTime"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button @click="dialogCaseEdit = false">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../../api';
import axios from 'axios';

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            aCase:{
                id: '',
                casePic:''
            },
            disaseValue:'',
            caseForm:{},
            dialogCaseEdit:false,
            id: '',
            fileUrl: '',
            file: '',
            casePic:'',
            tableData: [],
            disase: [],
            editVisible: false,
            urlPic: 'http://localhost:8083/lala.jpg',
            root: 'http://localhost:8083/',
            doctorId_equal:'',

        };
    },
    created() {
        // this.getData();
        this.list();
        this.doctorId_equal = localStorage.getItem('ms_id')
        this.getDisase();
    },
    methods: {
        list() {
            let path = '/api/doc/doctor/list/' + localStorage.getItem('ms_role');
            let _this = this;
            console.log(path)
            axios.get(path).then(function(res) {
                _this.tableData = res.data.data
                console.log(res.data.data)
            }).catch(function(error) {
                console.log(error)
            })
        },
        getDisase(){
            let _this = this;
            console.log("=====================")
            axios.get('/api/dis/disease/list').then(function (response) {
                _this.disase = response.data.data;
                console.log(_this.disase)
            })
        },
        // 获取 easy-mock 的模拟数据
        uploadCasePic(id) {
            this.aCase.id = id;
            console.log(id)
            this.editVisible = true;
        },
        downs(casePic) {
            console.log(this.root+casePic)
            let alink = document.createElement("a");
            alink.href = this.root+casePic;
            alink.download = casePic; //图片名
            alink.click();
            alink.target = "_blank"
        },
        getFile: function (event) {
            this.file = event.target.files[0];
            console.log(this.file);
        },
        dialogCase(id,indexRow,row){
            console.log("id: " + id)
            let _this = this;
            this.caseForm.id = id;
            this.tableData.filter(function(item,index) {
                if (index == indexRow){
                    _this.CaseForm = item
                }
            })
            this.dialogCaseEdit = true
            console.log(_this.CaseForm)
        },
        onSubmit(){
            this.caseForm.disaseId = this.disaseValue;
            console.log("病例id：" + this.disaseValue)
            console.log(this.caseForm)
            let _this = this;
            axios.put('/api/cas/case/update', this.caseForm).then(function (response) {
                console.log(response.data.msg)
                _this.dialogCaseEdit = false;
                // _this.list();
            })
        },
        submit: function (event) {
            //阻止元素发生默认的行为
            event.preventDefault();
            let _this = this;
            let formData = new FormData();
            formData.append("file", this.file);
            axios.post('/api/cas/case/upload', formData).then(function (response) {
                    let data = response.data.data;
                    _this.aCase.casePic = data;
                    console.log("fileUrl:" + _this.casePic)
                    console.log(data);
                axios.put('/api/cas/case/casePic',_this.aCase
                ).then(function(res) {
                    console.log(res.data.data)
                })
                }).catch(function(res) {
                console.log("失败")
            })
            this.editVisible = false;
        },
        // list() {
        //     let path = '/api/pat/patient/list/' + localStorage.getItem('ms_id');
        //     let _this = this;
        //     console.log(path)
        //     axios.get(path).then(function(res) {
        //         _this.tableData = res.data.data
        //         console.log(res.data.data)
        //     }).catch(function(error) {
        //         console.log(error)
        //     })
        // },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(id, index, row) {
            let _this = this
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                axios.delete('/api/pat/reservation/' + id).then(function(data) {
                    _this.$message.success("删除成功");
                    _this.tableData.splice(index, 1);
                })
            }).catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            let _this = this
            _this.form = row;
            _this.idx = index;
            _this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
            let _this = thisd
            console.log(this.form)
            axios.put('/api/patient/reservation/modify',_this.form).then(function(data) {
                _this.$message("修改成功")
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
