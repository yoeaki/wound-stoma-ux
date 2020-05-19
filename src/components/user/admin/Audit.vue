<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 注册审核
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
                <el-table-column prop="coachId" label="教练ID"></el-table-column>
                <el-table-column prop="coachName" label="教练名称"></el-table-column>
                <el-table-column label="注册时间">
                    <template slot-scope="scope">{{$moment(scope.row.registime).format('YYYY-MM-DD HH:MM:ss')}}</template>
                </el-table-column>
                <el-table-column label="审核状态" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==='0'">未审核</span>
                        <span v-if="scope.row.status==='1'">已审核</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status==='0'"
                                type="text"
                                icon="el-icon-edit"
                                @click="active(scope.row.coachId)"
                        >同意</el-button>
                        <el-button v-if="scope.row.status==='1'"
                                   type="info"
                                   icon="el-icon-edit"
                        >已审核</el-button>
                    </template>
                </el-table-column>
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
    </div>
</template>

<script>
    import { fetchData } from '../../../api';
    import axios from 'axios';

    export default {
        name: 'audit',
        data() {
            return {
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 10
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
                let path = '/api/admin/verify/all';
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
            handleEdit(index, row) {
                let _this = this
                _this.form = row;
                _this.idx = index;
            },
            // 保存编辑
            active(coachId) {
                let _this = this;
                axios.put('/api/admin/verify/active/' + coachId).then(function(data) {
                    _this.$message("审核通过")
                    _this.list();
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
