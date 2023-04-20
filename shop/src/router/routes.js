//引入相应的路由组件
import home from '@/pages/home';
import Search from '@/pages/search';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Detail from '@/pages/Detail';
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from '@/pages/Trade'
import Pay from "@/pages/Pay"
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/center'
import teamOrder from '@/pages/center/teamOrder'
import myOrder from '@/pages/center/myOrder'

export default [
    {
        path: '/home',
        name: 'erha',
        component: ()=>import('@/pages/home'),//路由懒加载，写为函数形式，使用时才会执行，提高效率
        //路由元信息,新学习的一个配置项!!!!给当前路由添加一些额外数据
        //它的右侧是一个对象[可以有多个键值对]
        //路由配置项：书写的时候不要胡写、乱写、瞎写【在VC组件身上获取不到,没有任何意义】
        meta: { show: true },
    }
    ,
    {
        //命名路由,给路由起一个名字
        name: 'search',
        //在注册路由的时候,如果这里占位，切记务必要传递params
        path: '/search/:keyword?',
        component:()=>import('@/pages/search'),
        meta: { show: true },
        //新增配置项:props,给路由组件传递props参数
        //第一种布尔模式,相当于把params参数，作为props属性值传递给这个路由组件
        // props:true,

        //第二种:对象形式
        // props:{a:1,b:'我爱你'}

        //第三种写法:函数写法.一般是把query参数与params参数当中props传递给路由组件!!!
        //route就是当前路由
        // props:(route)=>{
        //      //是将当前箭头函数返回结果，作为props传递给search路由组件!!!
        //      return {a:route.params.keyword,b:'可以传递参数'};
        // }
    }
    ,
    {
        path: '/login',
        component: ()=>import('@/pages/login'),
        meta: { show: false },
    }
    ,
    {
        path: '/register',
        component:()=>import('@/pages/register'),
        meta: { show: false },
    }
    ,
    //重定向到首页
    {
        path: '/',
        redirect: '/home'
    }
    ,
    {
        path: '/detail/:skuId?',
        component: ()=>import('@/pages/Detail'),
        //路由元信息,控制当前路由是否需要Footer组件
        meta: { show: true },
    },
   {
    path:'/addcartsuccess',
    name:"addcartsuccess",
    component:()=>import('@/pages/AddCartSuccess'),
    meta: { show: true },
   },
   {
    path:"/shopcart",
    component:()=>import('@/pages/ShopCart'),
    meta: { show: true },
   },
   {
    path:"/trade",
    component:()=>import('@/pages/Trade'),
    meta:{show:true},
    //路由独享守卫
    beforeEnter: (to, from, next) => {
        //去trade页面前必须时从shopcart来
        if(from.path == '/shopcart'){
            next()
        }else{
            next(false)
        }
    }
   },
   {
    path:"/pay",
    component:()=>import('@/pages/Pay'),
    meta:{show:true},
    beforeEnter:(to,from,next)=>{
     if(from.path == '/trade'){
        next()
     }else{
        next(false)
     }
    }
   },
   {
    path:'/paysuccess',
    component:()=>import('@/pages/PaySuccess') ,
    meta:{show:true},
    beforeEnter:(to,from,next)=>{
        if(from.path== '/pay'){
            next()
        }else{
            next(false)
        }
    }
   },
   {
    path:'/center',
    component:()=>import('@/pages/center'),
    meta:{show:true},
    //二级路由
    children:[
        {
            path:"teamorder", //！！！二级路由这里不要加 /
            component:()=>import('@/pages/center/teamOrder')
        },
        {
            path:'myorder',
            component:()=>import('@/pages/center/myOrder')
        },
        {
            path:'/center',
            redirect:'/center/myorder'
        }
    ]
   },


]