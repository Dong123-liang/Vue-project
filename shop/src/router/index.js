//配置路由
//第一步：引入插件、安装插件
import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);
//引入路由相关的配置项
import routes from './routes'

//引入仓库
import store from '@/store'

//把人家原型对象的push方法进行保存
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
VueRouter.prototype.push = function (location, resolve, reject) {
    //当前函数this：即为VueRouter类的实例
    //相当于push方法里面this，是windows【完犊子了】
    //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

    //面试:函数apply与call区别?
    //相同的地方:都可以篡改函数里面this
    //不同的地方:apply传递参数 数组  call传递参数 逗号分割

    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}


VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

//第二步:暴露VueRouter类的实例
//对外暴露一个路由器,实质是VueRouter类的实例,一个路由器可以管理多个路由
const router = new VueRouter({
    //配置路由
    routes,
    //滚动行为，控制路由跳转时，页面展示的位置
    scrollBehavior(to,from,savePosistion){
        return {y:0}//距离顶部距离为零
    }

});
router.beforeEach(async (to,from,next)=>{
    //可以获取到你要跳转到那个路由的信息
    //from：可以获取到你从那个路由而来的信息
    //next：放行函数 next()放行 next(path)
    //用户是否登录:取决于仓库里面是否有token！！！
    //每一次路由跳转之前需要用有用户信息在跳转,没有发请求获取用户信息在跳转！！！！
  
    // console.log(to,from,next)
    let token = store.state.login.token
    let UserName =store.state.login.UserInfo.name
    if(token){//先判断用户是否登录
        if(to.path == '/login'){//登录后并再次去登录页面时，会直接跳转到首页
            next('/home')
        }else{
            //登录了并且去的时非登录页面
            if(UserName){//判断是否获取了用户信息
                next()
            }else{
                try{//若没有获取到用户信息，则派发请求获取，确保每个路由组件页面刷新后依旧保持登录状态
                  await store.dispatch('getUserInfo')
                  next()
                }catch(e){
                    //意味着token失效了，需要重新登录
                  await store.dispatch('LoginOut')
                   next('/login')
                }
            }
        }
    }else{
        //如果未登录时去的时个人中心center，支付pay，交易页面时直接跳转到home页面
           if(to.path.indexOf('/center') != -1 || to.path.indexOf('/pay')!= -1 || to.path.indexOf('/trade')!= -1){
            alert("请先登录！")   
            next('/login?redirect='+to.path)
           }else{
            //去其他的路由组件的时候放行
            next()
           }
    }
})
export default router;


