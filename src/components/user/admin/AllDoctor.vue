<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 我的学员
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
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="openAdd">新增教练</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="username" label="学员名称"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="phone" label="电话"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-<!-- 编辑弹出框 -->
        <el-dialog title="新增教练" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="教练名称">
                    <el-input v-model="coach.username"></el-input>
                </el-form-item>
                <el-form-item label="登录密码">
                    <el-input v-model="coach.password"></el-input>
                </el-form-item>
                <el-form-item label="车辆名称">
                    <el-input v-model="car.name"></el-input>
                </el-form-item>
                <el-form-item label="车牌号">
                    <el-input v-model="car.number"></el-input>
                </el-form-item>
            </el-form>
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCoach">确 定</el-button>
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
            car:{
                name:'',
                number:'',
                coachId:''
            },
            coach:{
                username:'',
                password:'123456',
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        // this.getData();
        this.list();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        list() {
            let path = '/api/doctor/doctor/list';
            let _this = this;
            console.log(path)
            axios.get(path).then(function(res) {
                _this.tableData = res.data.data
                console.log(res.data.data)
            }).catch(function(error) {
                console.log(error)
            })
        },
        openAdd(){
            this.editVisible = true;
        },
        addCoach(){
            let _this = this;
            _this.editVisible = false;
            axios.post('/api/doctor/doctor',_this.coach).then(function(res) {
                _this.load();
                axios.post('/api/doctor/car',_this.car).then(function(res) {
                    _this.$message.success("新增成功")
                    _this.list()
                });
            });
        },
        load(){
            let _this = this;
            axios.get('/api/doctor/doctor/load',_this.coach.username).then(function(res) {
                let data = res.data.data;
                console.log(data)
                _this.car.coachId = data.id;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
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
