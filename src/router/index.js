import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store';
import * as types from '../store/types'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/caselist'
        },
        {
            path: '/caselist',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {
                requireAuth: true
            },
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/CaseList.vue'], resolve)
                },
                {
                    path: '/addcase',
                    component: resolve => require(['../components/page/AddCase.vue'], resolve),
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/statistics',
                    component: resolve => require(['../components/page/DataStatistics.vue'], resolve),
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/editcase/:id',
                    component: resolve => require(['../components/page/AddCase.vue'], resolve),
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/caselist',
                    component: resolve => require(['../components/page/CaseList.vue'], resolve),
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                }
            ]
        },
        {
            path: '/SystemManage',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            redirect:'/userManage',
            meta: {
                requireAuth: true
            },
            children:[
                {
                    path: '/userManage',
                    component: resolve => require(['../components/page/UserManage.vue'], resolve)
                },
                {
                    path: '/logManage',
                    component:resolve => require(['../components/page/LogManage.vue'], resolve)
                },
                {
                    path: '/roleManage',
                    component:resolve => require(['../components/page/RoleManage.vue'], resolve),
                },
                {
                    path: '/roleSetting',
                    component:resolve => require(['../components/page/RoleSetting.vue'], resolve)
                }
            ]
        },
        {
            path: '/DataManage',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            redirect:'/alarmInfo',
            meta: {
                requireAuth: true
            },
            children:[
                {
                    path: '/alarmInfo',
                    component: resolve => require(['../components/page/alarmInfo.vue'], resolve)
                },
                {
                    path: '/receivingAlarmInfo',
                    component: resolve => require(['../components/page/receivingAlarmInfo.vue'], resolve)
                },
                {
                    path: '/vehicleTrackInfo',
                    component: resolve => require(['../components/page/vehicleTrackInfo.vue'], resolve)
                },
                {
                    path: '/editTrack',
                    component: resolve => require(['../components/page/editTrack.vue'], resolve)
                },
                {
                    path: '/bayonetInfo',
                    component: resolve => require(['../components/page/bayonetInfo.vue'], resolve)
                },
                {
                    path: '/editBayonetInfo',
                    component: resolve => require(['../components/page/editBayonetInfo'], resolve)
                },
                {
                    path: '/victimInfo',
                    component: resolve => require(['../components/page/victimInfo'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }
    ]
});

console.log(window.localStorage.getItem('token'));

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

// router.beforeEach((to, from, next) => {
//    if(to.matched.some(r => r.meta.requireAuth)){
//        if(store.state.token){
//            next();
//        }else{
//            next({
//                path: '/login',
//                query: {redirect: to.fullPath}
//            });
//        }
//    } else{
//        next();
//    }
// });

export default router;
