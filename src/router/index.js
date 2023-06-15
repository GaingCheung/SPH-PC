import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../pages/Home'
// import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'
import myCenter from '../pages/Center/myCenter'
import groupCenter from '../pages/Center/groupCenter'

import store from '../store'
Vue.use(VueRouter)

// 重写push和replace方法，防止多次点击跳转同一个地址时报错
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,() => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,() => {}, () => {})
    }
}

const routes = [
    {
        path: '/home',
        component: () => import('../pages/Home'),
        meta:{
            footerShow: true
        }
    },
    {
        path: '/center',
        component: Center,
        meta:{
            footerShow: true
        },
        children:[
            {
                path:'groupcenter',
                component: groupCenter,
            },
            {
                path:'mycenter',
                component: myCenter,
            },
            {
                path:'/center',
                redirect:'/center/mycenter'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta:{
            footerShow: true
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path == '/pay'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        meta:{
            footerShow: true
        },
        beforeEnter: (to, from, next) => {
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta:{
            footerShow: true
        },
    },{
        path: '/trade',
        component: Trade,
        meta:{
            footerShow: true
        },
        beforeEnter: (to, from, next) => {
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta:{
            footerShow: true
        },
    },
    {
        path: '/search/:keyword?',
        component: () => import('../pages/Search'),
        meta:{
            footerShow: true
        },
        name: 'search'
    },
    {
        path: '/login',
        component: Login,
        meta:{
            footerShow: false
        }
    },
    {
        path: '/register',
        component: Register,
        meta:{
            footerShow: false
        }
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta:{
            footerShow: true
        }
    },
    {
        path:'/',
        redirect: '/home'
    }
]

const router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { y: 0 }
      }
})

router.beforeEach(async (to, from, next) => {
    next()
    let token = store.state.user.token
    let name = store.state.user.userInfo.loginName
    if(token){
        if(to.path == '/login'){
            next('/')
        }else{
            // 已经登录去的不是login
            if(!name){
                try{
                    await store.dispatch('getUserInfo')
                    next()
                }
                catch(error){
                    await store.dispatch('logout')
                    next('/login')
                }
            }else{
                next()
            }
        }
    }else{
        let path = to.path
        if(path.indexOf('/center')!=-1 || path.indexOf('/pay')!=-1 ||path.indexOf('/trade')!=-1){
            next('/login?redirect='+path)
        }else{
            next()
        }
    }
})

export default router