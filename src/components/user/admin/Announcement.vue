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
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="publish">发布公告</el-button>
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
                <el-table-column prop="name" label="公告名称"></el-table-column>
                <el-table-column prop="content" label="公告内容"></el-table-column>
                <el-table-column label="发布时间">
                    <template slot-scope="scope">{{$moment(scope.row.annTime).format('YYYY-MM-DD HH:MM:ss')}}</template>
                </el-table-column>
                <el-table-column prop="adminName" label="发布人"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.row.id, scope.$index, scope.row)"
                        >删除</el-button>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="开始时间">
                    <el-col :span="11">
                        <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.startTime"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                        ></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker
                                placeholder="选择时间"
                                v-model="form.startTime"
                                style="width: 100%;"
                        ></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-col :span="11">
                        <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.endTime"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                        ></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker
                                placeholder="选择时间"
                                v-model="form.endTime"
                                style="width: 100%;"
                        ></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="预约备注">
                    <el-input type="textarea" rows="5" v-model="form.remarks"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!--新增公告-->
        <el-dialog title="发布公告" :visible.sync="publishEditVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="发布人">
                    <el-input type="text" rows="5" v-model="username"></el-input>
                </el-form-item>
                <el-form-item label="公告名称">
                    <el-input type="text" rows="5" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="公告内容">
                    <el-input type="textarea" rows="5" v-model="form.content"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="pueditVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAnn">确 定</el-button>
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
                username: '',
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                publishEditVisible: false,
                pageTotal: 0,
                form: {
                    adminId: '',
                    name: '',
                    content: '',
                    annTime: '',
                },
                idx: -1,
                id: -1
            };
        },
        created() {
            // this.getData();
            this.list();
            this.username = localStorage.getItem('ms_username')
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                fetchData(this.query).then(res => {
                    console.log(res);
                    this.tableData = res.list;
                    this.pageTotal = res.pageTotal || 50;
                    console.log(this.tableData)
                });
            },
            list() {
                let path = 'api/admin/announcement/list/all';
                let _this = this;
                console.log(path)
                axios.get(path).then(function(res) {
                    _this.tableData = res.data.data
                    console.log(res.data.data)
                }).catch(function(error) {
                    console.log(error)
                })
            },
            publish(){
                this.publishEditVisible = true;
            },
            saveAnn(){
                let _this = this;
                _this.form.adminId = localStorage.getItem('ms_id');
                _this.form.annTime = new Date();
                axios.post('/api/admin/announcement',_this.form).then(function(res) {
                    console.log(res)
                    _this.$message.success("添加成功！")
                    _this.list();
                })
                _this.publishEditVisible = false;

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
