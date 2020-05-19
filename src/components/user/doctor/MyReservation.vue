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
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
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
                <el-table-column prop="patientName" width="130px" label="用户名称"></el-table-column>
                <el-table-column label="预约时间" width="200px">
                    <template slot-scope="scope">{{$moment(scope.row.reservationTime).format('YYYY-MM-DD HH:MM:ss')}}</template>
                </el-table-column>
                <el-table-column prop="remarks" label="预约备注"></el-table-column>
                <el-table-column label="预约状态" width="130px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.schedule==='0'">正在预约</span>
                        <span style="color: #50FF0A;" v-if="scope.row.schedule==='1'">同意预约</span>
                        <span style="color: red" v-if="scope.row.schedule==='2'">拒绝预约</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250px" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="agree(scope.row.id,scope.row.patientId,scope.$index, scope.row)"
                        >同意并智能生成病例</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="reject(scope.row.id, scope.$index, scope.row)"
                        >拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="智能生成病例表" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="预约备注">
                    <el-input type="textarea" rows="5" v-model="form.remarks"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="70px">
                提示用户上传病例！
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
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
            updateReservation: {
                id:'',
                schedule:''
            },
            data:{},
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            form: {},
            params: {
                patientId: '',
                doctorId: '',
                seeTime: ''
            }
        };
    },
    created() {
        // this.getData();
        this.list();
    },
    methods: {
        list() {
            let path = '/api/pat/reservation/info/doctor/' + localStorage.getItem('ms_id');
            let _this = this;
            console.log(path)
            axios.get(path).then(function(res) {
                _this.tableData = res.data.data
                console.log(res.data.data)
            }).catch(function(error) {
                console.log(error)
            })
        },
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
                axios.delete('/api/patient/reservation/' + id).then(function(data) {
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
        agree(id,patientId,rowIndex, row) {
            // console.log("id:" + rowIndex)
            this.tableData.filter((item,index) => {
                if (rowIndex == index) {
                    this.params.seeTime = new Date();
                    this.params.patientId = patientId;
                    this.params.doctorId = localStorage.getItem('ms_role')
                    let _this = this;
                    console.log(_this.params)
                    if(index === rowIndex){
                        if (item.schedule === '1') {
                            this.$message.error("已经同意预约，无需再次点击")
                            return;
                        }else {
                            axios.post('/api/cas/case',_this.params).then(function(res) {
                                let result = res.data;
                                if (result.status == 1) {
                                    return;
                                }
                                _this.$message.success("智能生成成功！")
                            })
                            item.schedule = '1';
                            this.updateReservation.id = id;
                            this.updateReservation.schedule = '1';
                            this.updateReser('/api/pat/reservation/modify/res',"同意");
                        }
                    }


                }

            })
        },
        reject(id,rowIndex, row){
            this.tableData.filter((item,index) => {
                if (index === rowIndex){
                    if (item.schedule === '2') {
                        this.$message.error("已经拒绝预约，无需再次点击")
                        return;
                    }else {
                        item.schedule = '2';
                        this.updateReservation.id = id;
                        this.updateReservation.schedule = '2';
                        this.updateReser('/api/pat/reservation/modify/res',"拒绝");
                    }
                }
            })
        },
        updateReser(path,msg){
            console.log(path)
            let _this = this;
            axios.put(path,this.updateReservation).then(function(res){
                _this.$message.success(msg + "预约，并已发出提醒");
            })
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
