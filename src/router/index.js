import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/user/patient/PatientReservation.vue'),
                    meta: { title: '用户预约记录' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/user/patient/ReservationReply.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    path: '/historyCase',
                    component: () => import(/* webpackChunkName: "form" */ '../components/user/patient/HistoryCase.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    path: '/process',
                    component: () => import('../components/page/Process.vue')
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/user/patient/MyCoach.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                },
                //学生嵌套路由
                {
                    path: '/patientDashboard',
                    component: () => import(/* webpackChunkName: "register" */ '../components/user/patient/PatientDashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/patientInfo',
                    component: () => import(/* webpackChunkName: "register" */ '../components/user/patient/MyInfo.vue'),
                    meta: { title: '病人信息' }
                },
                {
                    path: '/patientEvaluation',
                    component: () => import(/* webpackChunkName: "register" */ '../components/user/patient/PatientEvaluation.vue'),
                    meta: { title: '病人评价' }
                },
                //教练模块
                {
                    path: '/doctorInfo',
                    component: () => import(/* webpackChunkName: "register" */ '../components/user/doctor/MyInfo.vue'),
                    meta: { title: '我的个人信息' }
                },
                {
                    path: '/doctorDashboard',
                    component: () => import(/* webpackChunkName: "register" */ '../components/user/doctor/DoctorDashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/patientInfo',
                    component: () => import(/* webpackChunkName: "register" */ '../components/user/doctor/PatientInfo.vue'),
                    meta: { title: '病人信息' }
                },
                {
                    path: '/myReservation',
                    component: () => import(/* webpackChunkName: "register" */ '../components/user/doctor/MyReservation.vue'),
                    meta: { title: '病人预约' }
                },
                //管理员模块
                {
                    path: '/adminInfo',
                    component: () => import(/* webpackChunkName: "register" */ '../components/user/admin/MyInfo.vue'),
                    meta: { title: '我的个人信息' }
                },
                {
                    path: '/adminDashboard',
                    component: () => import(/* webpackChunkName: "register" */ '../components/user/admin/AdminDashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/allPatient',
                    component: () => import(/* webpackChunkName: "register" */ '../components/user/admin/AllPatient.vue'),
                    meta: { title: '用户信息' }
                },
                {
                    path: '/allDoctor',
                    component: () => import(/* webpackChunkName: "register" */ '../components/user/admin/AllDoctor.vue'),
                    meta: { title: '医生信息' }
                },{
                    path: '/doctorReservation',
                    component: () => import(/* webpackChunkName: "register" */ '../components/user/admin/TeachArrange.vue'),
                    meta: { title: '教学安排' }
                },{
                    path: '/announcement',
                    component: () => import(/* webpackChunkName: "register" */ '../components/user/admin/Announcement.vue'),
                    meta: { title: '公告信息' }
                },{
                    path: '/immediately',
                    component: () => import(/* webpackChunkName: "register" */ '../components/user/doctor/Immediately.vue'),
                    meta: { title: '即刻会诊' }
                },
                {
                    path: '/audit',
                    component: () => import(/* webpackChunkName: "register" */ '../components/user/admin/Audit.vue'),
                    meta: { title: '教练注册审核中心' }
                },
            ]
        },
        ////学员路由
        {
            path: '/patientLogin',
            component: () => import(/* webpackChunkName: "login" */ '../components/user/patient/PatientLogin.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/patientRegister',
            component: () => import(/* webpackChunkName: "register" */ '../components/user/patient/PatientRegister.vue'),
            meta: { title: '注册' }
        },
        //教练路由
        {
            path: '/doctorLogin',
            component: () => import(/* webpackChunkName: "login" */ '../components/user/doctor/DoctorLogin.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/doctorRegister',
            component: () => import(/* webpackChunkName: "register" */ '../components/user/doctor/DoctorRegister.vue'),
            meta: { title: '注册' }
        },
        //管理员登录路由
        {
            path: '/adminLogin',
            component: () => import(/* webpackChunkName: "login" */ '../components/user/admin/AdminLogin.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
