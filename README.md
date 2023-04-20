# Vue-project
Vue2全家桶+axios+Element-UI+Mock+swiper 仿站京东前台项目
**项目源码地址：** [https://github.com/Dong123-liang/Vue-project.git](https://github.com/Dong123-liang/Vue-project.git)<br />**心得**<br />终于做完了商品汇项目,在写的过程中也是对vue2所学的知识点一个实际运用，对之前学习的知识点在项目中如何实际运用，发挥着怎样的功能有了一个全新的理解，也发现自己学习的过程中有许多疏漏的地方。做完此次项目也是对于整个vue2学习的一个知识总结。

<a name="f1cf9f08"></a>
# 1.创建vue项目

安装脚手架(选择vue2/3)<br />使用前置：<br />第一步(没有安装过的执行)：全局安装 @vue/cli<br />npm install -g @vue/cli<br />第二步：切换到要创建项目的目录，然后使用命令创建项目<br />vue create xxxxx<br />第三步：启动项目<br />npm run serve

<a name="0d4d51e3"></a>
# 2.脚手架目录说明

**node_modules**:放置项目依赖的地方<br />**public**:一般放置一些共用的静态资源，打包上线的时候，public文件夹里面资源原封不动打包到dist文件夹里面<br />**src**：程序员源代码文件夹<br />**assets文件夹**：经常放置一些静态资源（图片），assets文件夹里面资源webpack会进行打包为一个模块（js文件夹里面）   **components文件夹**:一般放置非路由组件（或者项目共用的组件）<br />**App.vue** 唯一的根组件<br />**main.js** 入口文件【程序最先执行的文件】<br />**babel.config.js**:babel配置文件<br />**package.json**：看到项目描述、项目依赖、项目运行指令<br />**README.md**:项目说明文件

<a name="a16c114a"></a>
# 3. 项目中配置说明

**3.1项目中使用过的插件**

下载时需要注意相关的版本问题，否则可能会引起报错：<br />_ **swiper** (轮播图)| **nprogress**(进度条)|**mock**(模拟数据)|**element-ui**(此项目中在支付组件中使用)**|vue-lazyload**(图片懒加载)|**vee-validate**（验证表单数据例如：手机号，密码等)|**lodash**(依赖包中自带，可以引入节流和防抖函数)|**qrcode**(生成二维码)...._

本项目中相关依赖包的版本<br />![](https://img-blog.csdnimg.cn/3cd18a13ef4f48b8aff7e8a355382b2d.png#id=wU9Hs&originHeight=306&originWidth=337&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

**3.2关闭eslint校验工具(不关闭会有各种规范，不按规范就会报错)**

在文件夹根目录中创建vue.config.js进行配置

![](https://img-blog.csdnimg.cn/50cb0d5e6ead48439f29671276353726.png#id=eYybY&originHeight=218&originWidth=384&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />**3.3.jsconfig.json文件中,配置用@/代替src/**<br />![](https://img-blog.csdnimg.cn/e9ba7dc182964b3a8123156da33c5687.png#id=by7JY&originHeight=199&originWidth=301&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />**3.4 组件页面样式**<br />组件页面的样式使用的是less样式，浏览器不识别该样式，需要下载相关的依赖包

在终端中输入 npm install --save less less-loader@7

如果想让组件识别less样式，需要在相关的组件中设置

```javascript
<style scoped lang="less">
```

<a name="a2da796f"></a>
# **4.路由**

<a name="6d437ade"></a>
## 4.1安装vue-router

执行命令npm i vue-router@3(目前版本为4但不支持vue2，所以版本下载时最好为3)

<a name="0d578638"></a>
## 4.2注册路由

**安装后在mian.js中注册路由**

```javascript
//注册路由功能
import router from './router';
  beforeCreate() {
    //关闭vue中生产提示
    Vue.config.productionTip = false
  },
  //下面代码作用:给项目添加路由功能,给全部VC实例身上拥有属性,$router
  router,
  render: h => h(App),
}).$mount('#app');
```

**创建router文件夹，在src/router/index.js 文件中进行路由配置**，最终在main.js中引入注册<br />此外项目中在此文件中进行了路由跳转时的push和replace方法的重写（在这里我们思考一下为什么要进行push和replace方法的重写），及其配置全局路由守卫。

```javascript
//配置路由
//第一步：引入插件、安装插件
import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);
//引入路由相关的配置项
import routes from './routes'


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

export default router;
```

**在创建router文件夹中，在src/router/routes.js文件中，进行引入具体的路由组件进行注册**，可以使用import方式进行模块引用，也可以使用路由懒加载的方式，以函数的形式进行引入注册。此外可以进行**路由独享守卫**<br />![](https://img-blog.csdnimg.cn/979214ff8e264348816d08a33ca53479.png#id=tfATl&originHeight=476&originWidth=488&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="0e1fa81a"></a>
# 5.push和replace方法的重写

在项目进行的过程中，发现当路由跳转时多次执行相同的push问题，控制台会出现错误<br />例如：使用this.$router.push({name:‘Search’,params:{keyword:"…"||undefined}})时，如果多次执行相同的push，控制台会出现警告。

```javascript
let result = this.$router.push({name:"Search",query:{keyword:this.keyword}})
console.log(result)
```

当我们第一次执行时返回一个成功的promise<br />![](https://img-blog.csdnimg.cn/5f67d6e3cc0b4bd2855e319fcf31c9ce.png#id=a4H4a&originHeight=191&originWidth=356&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />但多次执行后，控制台就会产生报错<br />![](https://img-blog.csdnimg.cn/8751b217e00b4849b71500ec1f943cb8.png#id=Fc5tV&originHeight=133&originWidth=787&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />原因：push是一个promise，promise需要传递成功和失败两个参数，我们的push中没有传递。<br />方法：this.$router.push({name:‘Search’,params:{keyword:"…"||undefined}},()=>{},()=>{})后面两项分别代表执行成功和失败的回调函数。<br />这种写法治标不治本，将来在别的组件中push|replace,编程式导航还是会有类似错误<br />push是VueRouter.prototype的一个方法，在router中的index.js重写该方法即可。这里博主理解依然不够透彻。

```javascript
//把人家原本原型对象的push方法进行保存
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
VueRouter.prototype.push = function (location, resolve, reject) {
    //当前函数this：即为VueRouter类的实例
    //相当于push方法里面this，是windows
    //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例
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
```

**总结：**

路由组件和非路由组件区别：<br />非路由组件放在components中，路由组件放在pages或者views中<br />非路由组件通过标签使用，路由组件通过路由使用<br />在main.js注册完路由，所有的路由和路由组件身上都会拥有$router和$route属性<br />$router：一般进行编程式路由导航进行路由跳转$route：一般获取路由信息(name,path,params,query,meta)

<a name="1e2f7f48"></a>
# **6.vuex**

<a name="75610f81"></a>
## **6.1 概念**

 在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

<a name="619a915a"></a>
## **6.2 搭建vuex环境**

(1).在main.js中创建vm时传入store配置项

```javascript
......
//引入store
import store from './store'
......

//创建vm
new Vue({
  //下面代码作用:给项目添加路由功能,给全部VC实例身上拥有两个属性,$router|$route
  router,
  store,
  render: h => h(App),
}).$mount('#app');
```

(2).创建文件：src/store/index.js<br />作用：引用和使用 vuex 插件 ，将配置各个组件相关的vuex配置统一在index.js文件中引入，并对mian.js文件中暴露

```javascript
//仓库
import Vuex from 'vuex';
import Vue from 'vue';
//安装插件
Vue.use(Vuex);

//引入小仓库
import home from './home';
import search from './search';
import detail from './detail';

//对外暴露仓库
//第一个注意:需要关键字new，你没有new会报错的
//第二个注意:Store构造函数,书写的时候别小写
export default new Vuex.Store({
    //大仓库需要注册全部小仓库
    //vuex新增的一个配置项:模块式开发.右侧V也是对象
    modules: {
        home,
        search,
        detail,
    }
})
```

(3).在store文件夹中创建各个路由组件所需要配置的vuex信息,最后在index.js文件中统一引入：

![](https://img-blog.csdnimg.cn/bf5c213f41c94964bca8e97671ee9c62.png#id=U491O&originHeight=197&originWidth=192&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />例如:在detail仓库中，配置detail路由组件相关的信息<br />![](https://img-blog.csdnimg.cn/b043db1ccf8542f3907d1f67d497f7d0.png#id=Pl26g&originHeight=401&originWidth=500&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="1ce7eac1"></a>
## **6.3 何时使用？**

 多个组件需要共享数据时，项目中一般使用vuex进行发送和接收请求，获取的数据可以全局进行调用。<br />例如

```javascript
const action={
 async getCode({commit},phone){
   let result =  await reqgetCode(phone)
	 if(result.code == 200){
	 commit('GETCODE',result.data)
	 }else{
		return  Promise.reject(new Error('faile') )
	 }
 }
 },
const mutations={
GETCODE(state,code){
	state.code = code
	},
},
const state={
  code:''
}

export default{
	actions,
	mutations,
	state

}
```

在组件中发送请求：

```javascript
//一般在事件触发时或页面挂载时派发
 this.$store.dispatch(" getCode");
```

在组件中接收state中数据

```javascript
//使用mapState方法，使用计算属性，接收仓库中的数据
import { mapState } from "vuex";
  export default{
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
  }
```

<a name="d9528a6d"></a>
# 7.axios二次封装

创建/src/api/requests.js文件。对axios进行二次封装，实则是创建一个axios实例。设置请求拦截器和响应拦截器。<br />**在请求拦截器中**，每次请求时调用进度条函数，使每次请求有一个进度条动画效果。其次判断store仓库中是否有游客身份uuid_token或登录后返回的token。如果有，则作为请求头发送给服务器，已证明用户当前身份，返回相应的数据。<br />**在响应拦截器中**，若返回成功的回调，则将数据返回，进度条动画结束。若返回失败的回调，弹出错误信息，并终止promise链

```javascript
//对于axios进行二次封装
import axios from "axios";
//获取仓库:存储数据
import store from "@/store";
//引入进度条
import nprogress from 'nprogress';
//引入相关进度条的样式
import "nprogress/nprogress.css";


let requests = axios.create({
    //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
    baseURL: "/api",
    //超时的设置
    timeout: 5000
});

//请求拦截器:将来项目中【N个请求】，只要发请求,会触发请求拦截器!!!
requests.interceptors.request.use(config => {
    //请求拦截器:请求头【header】,请求头能否给服务器携带参数
    //请求拦截器：其实项目中还有一个重要的作用,给服务器携带请求们的公共的参数
    //进度条开始
    nprogress.start();
//给向服务器获取购物车信息接口时添加一个请求头，标记一个临时用户身份
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token;
    }

   // 携带token[公共参数]进行登录

    if(store.state.login.token){
        config.headers.token = store.state.login.token;
        // console.log(store.state.login.token)
    }

    //每一次发请求,请求头携带用户临时身份
    // config.headers.userTempId = SET_USERID();
    //不管那个模块发请求,请求拦截器，都可以触发。请求拦截器可以通过请求头每一次协大公共参数给服务器【用户未登录的临时身份】 */
    return config;
});


//响应拦截器：请求数据返回会执行
requests.interceptors.response.use((res) => {
    //res:实质就是项目中发请求、服务器返回的数据
    //进度条结束
    nprogress.done();
    return res.data;
}, (err) => {
    //温馨提示:某一天发请求,请求失败,请求失败的信息打印出来
    alert(err.message);
    //终止Promise链
    return new Promise();
});

//最后需要暴露:暴露的是添加新的功能的axios,即为requests
export default requests;
```

<a name="8b545266"></a>
# 8.请求接口统一封装

在文件夹api中创建index.js文件，用于封装所有请求<br />将每个请求封装为一个函数，并暴露出去，组件只需要调用相应函数即可，这样当我们的接口比较多时，如果需要修改只需要修改该文件即可。<br />例如：

```javascript
//当前模块，API进行统一管理，即对请求接口统一管理
import requests from "@/api/request";//调用封装好的axios
//封装函数:复用
//将来这个函数可以在别的地方使用,需要对外暴露【分别暴露】
//获取商品分类的数据
export const reqCategory = () => {
   //箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
   //下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
   return requests({ method: 'get', url: '/product/getBaseCategoryList' });
}
//获取首页轮播图数据的接口
export const reqBannerList = () => mockRequests({ url: '/banner', method: 'get' });

//获取Floor数据接口
export const reqFloorList = ()=>mockRequests({url:'/floor',method:'get'});
```

<a name="0ee3e29d"></a>
# 9.Vue中通过代理解决跨域问题

**在根目录下的vue.config.js中配置,proxy为通过代理解决跨域问题.**<br />我们在封装axios的时候已经设置了baseURL为api,所以所有的请求都会携带/api，这里我们就将/api进行了转换。如果你的项目没有封装axios，或者没有配置baseURL，建议进行配置。要保证baseURL和这里的代理映射相同，此处都为’/api’

```javascript
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
    //项目打包时关闭生产Map文件
    productionSourceMap:false,
    // 关闭ESLINT校验工具
    lintOnSave: false,
    //配置代理跨域
    devServer: {
      proxy: {
        "/api": {
          target: "http://gmall-h5-api.atguigu.cn",
        },
      },
    }，
})
```

<a name="ea95f7fb"></a>
# 10. mock插件使用

mock用来拦截前端ajax请求，返回我么们自定义的数据用于测试前端接口。<br />将不同的数据类型封装为不同的json文件，创建mockServer.js文件

```javascript
//引入mockjs插件开始模拟数据
import Mock from 'mockjs';
//引入数据：JSON数据格式数据
//比如:图片资源、JSON资源【里面不能书写export关键字】，这些资源默认对外暴露【默认暴露】
import banner from './banner.json';
import floor from './floor.json';

//接口:相当于nodejs里面中间件
//第一个参数：接口的地址 第二个参数:向这个接口发请求获取到的数据 
//Mock插件：中间件默认是GET请求
Mock.mock("/mock/banner", { code: 200, data: banner });
//Mock插件：中间件默认是GET请求
Mock.mock('/mock/floor', { code: 200, data: floor });
```

创建src/api/mockRequest.js文件,与上文的axios二次封装相比把baseURL改为‘/mock’

```javascript
let requests = axios.create({
    //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
    baseURL: "/mock",
    //超时的设置
    timeout: 5000
});
```

在src/api/index.js文件中，调用封装后的mock，以函数形式封装接口

```javascript
import mockRequests from './mockRequests';

//获取首页轮播图数据的接口
export const reqBannerList = () => mockRequests({ url: '/banner', method: 'get' });

//获取Floor数据接口
export const reqFloorList = ()=>mockRequests({url:'/floor',method:'get'});
```

<a name="21b301e8"></a>
# 11. 商品三级联动模块开发

三级联动是home路由中一个重要的模块，当我们点击商品列表时，需要把我们点击的商品信息作为参数，携带给服务器，服务器根据相应的参数返回对应的数据。

![](https://img-blog.csdnimg.cn/2890fd99fbe34477a1286736b784d53d.png#id=ZRjwW&originHeight=427&originWidth=594&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

但是这里有两个难点<br />**第一个问题**:由于我们使用的是事件委托，给父节点绑定的goSearch方法，但div父节点子元素太多【h3、h2、em、dt、dd、dl...a】？你怎么知道你点击的一定是a<br />**第二个问题**:要区分一级分类、二级分类、三级分类的a标签【category1Id|category2Id|category2Id】，把对应的商品id带给服务器呢。<br />思考后解决第一个问题方法是：给我们需要点击的a标签内容绑定一个自定义属性，来确保我们点击的是a标签，那我们可以把他们的id和名字作为自定义属性的值。然后再使用event.target.dataset方法（注意该方法返回的自定义属性统一都是小写的方式），可以获取到我们当前点击元素的自定义属性。判断是否有categoryname属性，来判断我们是否点击的是a标签。<br />![](https://img-blog.csdnimg.cn/e58f4c5f6c9e4849ac6c9ab8079e3184.png#id=sFYWd&originHeight=48&originWidth=567&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />点击元素，控制台输出event.target.dataset方法返回的信息<br />![](https://img-blog.csdnimg.cn/57702d9f430d4379be9501315f2a5c5f.png#id=LP1lK&originHeight=92&originWidth=523&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />那么这里自然第二个问题也就解决了，**为了区分我们点击的是几级商品。在使用v-for遍历数据时，我们设置data-categoryId自定属性，对于不同的几级商品，我们设置自定义属性就为几级,属性值就为商品id**。

例如：一级商品 我们自定义属性为data-category1Id<br />![](https://img-blog.csdnimg.cn/69a8d5caad2e42769875e6a4f6a02490.png#id=QxtzK&originHeight=45&originWidth=665&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

二级商品 我们自定义属性为data-category2Id<br />![](https://img-blog.csdnimg.cn/c7c0f85d7e164427b71a250b1733c32a.png#id=dsF2u&originHeight=56&originWidth=585&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

三级商品 我们自定义属性为data-category3Id<br />![](https://img-blog.csdnimg.cn/00df5af4061f4a4aa66ee87c9de9b745.png#id=Mz5im&originHeight=52&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />这样我们根据自定义属性就知道我们点击的商品为几级。

解决问题后，我们就可以点击对应商品的a标签，在跳转Search路由时携带query参数跳转。

```javascript
  goSearch (event) {
      //第一个问题:div父节点子元素太多【h3、h2、em、dt、dd、dl...a】？你怎么知道你点击的一定是a
      //第二个问题:要区分一级分类、二级分类、三级分类的a标签【category1Id|category2Id|category2Id】
      let targetNode = event.target;
      //获取触发事件节点的自定义属性【a:data-categoryName】
      let { categoryname, category1id, category2id, category3id } =
        targetNode.dataset;
        console.log(targetNode.dataset)
      //判断点击的是a【不管是1|2|3】
      if (categoryname) {
        //点击只要是a,就是往search模块跳转
        var locations = {
          name: "search",
          query: { categoryName: categoryname },
        };
        //一级分类的a
        if (category1id) {
          locations.query.category1Id = category1id;
        } else if (category2id) {
          //二级分类的a
          locations.query.category2Id = category2id;
        } else {
          //三级分类的a
          locations.query.category3Id = category3id;
        }
        //点击商品分类按钮的时候,如果路径当中携带params参数,需要合并携带给search模块
        if (this.$route.params.keyword) {
          locations.params = this.$route.params;
        }
        //目前商品分类这里携带参数只有query参数
        this.$router.push(locations);
      }
    }
```

<a name="fcbd642d"></a>
# 12.封装轮播图组件

在home页面中我们多次用到了轮播图展示商品，我们可以直接封装一个轮播图全局组件，实现组件复用，简化代码。<br />具体实现轮播图效果，我们跟着pink拿原生JS都写过，可以去回顾一下，这里我们直接使用的swiper插件实现。<br />![](https://img-blog.csdnimg.cn/16aae28d39054676a84c5753eee29442.png#id=aLrYd&originHeight=475&originWidth=732&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />但是在vue中直接使用轮播图是有几个注意点，否则都会导致我们失败

<a name="e4b2e78e"></a>
## 12.1安装swiper

（1）.目前可以使用到8版本 ，此项目使用时swiper6.8.4

```javascript
npm iswiper@6/7/8
```

（2）.然后可以在main.js全局引入

```javascript
//swiper使用步骤:
//第一步:引入依赖包、样式
import Swiper from "swiper/swiper-bundle";
import 'swiper/swiper-bundle.min.css'
```

（3）在组件中创建swiper需要的dom标签（html代码，参考官网代码）<br />（4）创建swiper实例

<a name="cf70b2cf"></a>
## 12.2使用Swiper

使用之前我们需要记住一个知识，初始化swiper实例之前，页面中的节点（结构）务必要有，否则轮播图是无法实现轮播效果的。对于Vue一个组件而言，mounted[组件挂载完毕：相应的结构不就有了吗]<br />所以我们第一反应是直接在mounted里创建swiper实例<br />但由于轮播图的数据是我们动态向服务器中获取的，请求是异步的，然后使用v-for遍历数据生成dom节点，那么就会存在可能因为网络原因，数据返回的时间由于延迟，导致先创建了swiper实例，而Swiper需要获取到轮播图的节点DOM的时候，页面dom并未完全渲染。以至于轮播图的效果失败。那我们如何去解决这个问题呢？

**那在生命周期的mounted之前的created里面就发送请求获取数据？**

也是**不行的，**因为两者其实执行的时间间隔极短，依旧不能解决问题。

**那我们使用watch去监听bannerList数组，当发生变化后再去创建Swiper实例？**

我们可以使用watch监听bannerList轮播图列表属性，因为bannerList初始值为空，当它有数据时，我们就可以创建swiper对象，**即使这样也还是无法实现轮播图**，原因是，我们轮播图的html中有v-for的循环，我们是通过v-for遍历bannerList中的图片数据，然后展示。我们的watch只能保证在bannerList变化时创建swiper对象，但是并不能保证此时v-for已经执行完了。假如watch先监听到bannerList数据变化，执行回调函数创建了swiper对象，之后v-for才执行，这样也是无法渲染轮播图图片（因为swiper对象生效的前提是html即dom结构已经完全渲染好了）

**正确的做法是：****使用watch+this.$nextTick()**

**_nextTick官网解释:_**<br />在下次DOM更新, 循环结束之后,执行延迟回调。在 修改数据之后 立即使用这个方法，获取更新后的DOM。

**什么时候用**：当改变数据后，**要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行**。<br />所以用watch去监听bannerList数组发生改变，表明已经接收到数据。再使用nextTick（）方法，确保当创建swiper实例之前，所有的dom结构完全遍历渲染完毕。就可以完美解决该问题

```javascript
  watch: {
    List: {
      //能在这里直接初始化Swiper类的实例吗?
      //不能在当前状态直接初始化Swiper类的实例,因为这里只能保证数据发生变化了[服务器数据回来了],
      //但是你不能保证v-for遍历的结构完事了.
      immediate: true,
      handler (newvalue, oldvalue) {
        this.$nextTick(() => {
          //初始化Swiper类的实例
          var mySwiper = new Swiper('.swiper-container', {
            //设置轮播图防线

            direction: "horizontal",
            //开启循环模shi
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //分页器类型
              type: "bullets",
              //点击分页器，切换轮播
              clickable: true,
            },
            //自动轮播
            autoplay: {
              delay: 2000,
              //新版本的写法：目前是5版本
              pauseOnMouseEnter: true,
              //如果设置为true，当切换到最后一个slide时停止自动切换
              stopOnLastSlide: true,
              //用户操作swiper之后，是否禁止autoplay
              disableOnInteraction: false,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

        });
      },
    },
  }
```

<a name="2ae5c77c"></a>
## 12.3在项目中使用轮播图其他常见问题

**项目中使用Swiper出现的问题总结：**

**问题一**：点击左右切换轮播图按钮功能失效？<br />在mounted中挂载生成dom元素后才new swiper，由于是封装组件，ListContainer（父组件）组件通过props数据传递数据给轮播图组件，但先触发的是轮播图组件的mounted，此时会渲染dom元素，却还没有拿到数据。

*解决办法：所以利用 watch监听 到父组件传递来数据才进行初始化。

**问题二**：虽然有数据但左右切换功能还是失效？<br />由于vue响应式更新是异步的，此时监视到数据变化，dep.notify就会通知watcher去更新视图图，watch就被塞到异步队列中，数据同步更新，但轮播图组件dom元素还未重新遍历更新。

*解决办法：利用 this.nextTick 等数据渲染成DOM元素加载完成后才触发（只会触发一次）。

**问题三**：轮播图移入停止移出播放功能出问题？<br />由于多处调用组件，复用的是同一个swiper实例，都通过类选择器找对用dom元素。

*解决办法：利用 下标、绑定ref 来进行区分不同的实例。

**问题四**：Floor组件中调用的轮播图自动轮播功能失效？<br />由于先对Floor组件进行遍历，然后又在每个Floor组件中调调轮播图组件，数据初始化为空数组，此时Floor组件根本还未遍历渲染。而等Floor组件请求到数据后把数据通过props传给轮播图组件，此时轮播图组件监视到的数据是无变化（他会监听这个数据抑制剂就存在），所以new swiper不会触发。

*解决办法：使用 immediate: true 先初始化一次就可监视到数据变化。

<a name="dc59a5d2"></a>
# 13.利用路由信息变化实现动态搜索

最初想法：在每个三级列表和收缩按钮加一个点击触发事件，只要点击了就执行搜索函数。<br />这是一个很蠢的想法，如果这样就会生成很多回调函数，很耗性能。<br />最佳方法：我们每次进行新的搜索时，我们的query和params参数中的部分内容肯定会改变，而且这两个参数是路由的属性。我们可以通过监听路由信息的变化来动态发起搜索请求。

如下图所示，$route是组件的属性，所以watch是可以监听的（watch可以监听组件data中所有的属性）<br />注意：组件中data的属性包括：自己定义的、系统自带的（如 $route）、父组件向子组件传递的等等。

```javascript
watch:{
      $route(newValue,oldValue){
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        this.searchInfo()
        //如果下一次搜索时只有params参数，拷贝后会发现searchParams会保留上一次的query参数
        //所以每次请求结束后将相应参数制空
        this.searchParams.category1Id = '';
        this.searchParams.category2Id = '';
        this.searchParams.category3Id = '';
        this.$route.params.keyword = '';
      }
    },
```

<a name="f8d5a762"></a>
# 14.面包屑相关操作

面包屑的相关操作就是，当我们选则一些的商品属性或搜索框进行进一步搜索时，会重新发送请求展示对应的数据，而全部结果那里会显示我们所选的属性，路由信息也会发送改变。<br />![](https://img-blog.csdnimg.cn/a3e19699d1b0461c870c54d8e829e911.png#id=YPtyH&originHeight=582&originWidth=1251&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />这里其实就是将对query参数和params做出一些更新或删除操作，做后参数合并一起一并发送给服务器。<br />**这里重点一**：子组件SearchSelector把用户每次点击的品牌ID和名字，以及点击对应的品牌属性，属性值，属性id。用自定义事件，把数据传给父组件Search。涉及一个知识点，子传父最好可以使用自定义事件的方式<br />**子组件发送数据**<br />![](https://img-blog.csdnimg.cn/84d57645c2864cc38cca8ac53c956378.png#id=AJTcF&originHeight=93&originWidth=875&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

![](https://img-blog.csdnimg.cn/1afce44d363741b696e95e3808d98766.png#id=K9KcG&originHeight=88&originWidth=897&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />**父组件回调函数进行接收**

```javascript
    getTradeMark (tmId, tmName) {
      // console.log("父组件", tmId, tmName);
      //整理品牌相关的搜索条件
      this.searchParams.trademark = `${tmId}:${tmName}`;
      //再次发请求即可
      this.getData();
    },
    getAttrAndAttrValue (attrId, attrName, attrValue) {
      //整理最新的搜索的条件
      //整理为字符串
      let newProps = `${attrId}:${attrValue}:${attrName}`;

      if (this.searchParams.props.indexOf(newProps) == -1) {
        this.searchParams.props.push(newProps);
        //再次发请求，获取最新的数据展示即可
        this.getData();
      }
    },
```

**重点二**：**本次项目的面包屑操作主要就是两个删除逻辑**。<br />分为：<br />当**删除分类属性**(query):删除面包屑同时修改路由信息。<br />当**删除搜索关键字** params删除面包屑、修改路由信息、同时删除输入框内的关键字。<br />1、query删除时<br />因为此部分在面包屑中是通过categoryName展示的，所所以删除时应将该属性值制空或undefined。<br />可以通过路由再次跳转修改路由信息和url链接

```javascript
    removeCategoryName () {
      //搜索条件商品名字清空
      this.searchParams.categoryName = "";
      //骚操作:路由自己跳自己
      this.$router.push({ name: "search", params: this.$route.params });
      //为什么这里没有调用发请求函数？
     因为改变的时query参数的categoryName属性，之前我们监听了$route，当query参数或者parmas参数发生改变时会自动发送请求
    },
```

2、params删除时<br />和query删除的唯一不同点是此部分会多一步操作：删除输入框内的关键字（因为params参数是从输入框内获取的）<br />输入框实在Header组件中的

header和search组件是兄弟组件，要实现该操作就要通过兄弟组件之间进行通信完成。

这里通过$bus实现header和search组件的通信。$bus使用<br />（1）在main.js中注册

```javascript
new Vue({
  //全局事件总线$bus配置
  beforeCreate() {
    //此处的this就是这个new Vue()对象
    //网络有很多bus通信总结，原理相同，换汤不换药
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  //router2、注册路由，此时组件中都会拥有$router $route属性
  router,
  //注册store,此时组件中都会拥有$store
  store
}).$mount('#app')
```

（2）search组件使用$bus通信，第一个参数可以理解为为通信的暗号，还可以有第二个参数（用于传递数据），我们这里只是用于通知header组件进行相应操作，所以没有设置第二个参数。

```javascript
//删除搜索关键字
      removeBreadParams(){
        this.searchParams.keyword = undefined
        //通知兄弟组件header删除输入框的keyword关键字
        this.$bus.$emit("clear")
        this.$router.push({name:'Search',query:this.$route.query})
      },
```

（3）header组件接受$bus通信<br />注意：组件挂载时就监听clear事件

```javascript
mounted() {
  //  组件挂载时就监听clear事件，clear事件在search模块中定义
  //  当删除关键字面包屑时，触发该事件，同时header的输入框绑定的keyword要删除
    this.$bus.$on("clear",()=>{
      this.keyword = ''
    })
  }
```

<a name="6318ed16"></a>
# 15.分页器

分页器一个重点知识，那么如何封装一个分页器组件呢？<br />**分页器封装业务分析**:<br />封装分页器组件的时候：需要知道哪些条件？

1:分页器组件需要知道我一共展示多少条数据 ----total【100条数据】

2:每一个需要展示几条数据------pageSize【每一页3条数据】<br />3.通过1和2，计算出总共有多少页----totalSIze【总共页数】<br />4:需要知道当前在第几页-------pageNo[当前在第几页]<br />5:需要知道连续页码数【起始数字、结束数字：连续页码数，市场当中一般5、7、9】奇数，因为对称好看 ------continues<br />![](https://img-blog.csdnimg.cn/c414834da8ff44d0b36607ad554268fb.png#id=iSUPT&originHeight=91&originWidth=739&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

首先我们不管样式如何，先思考如何正确显示中间连续页码数。<br />例如有99条数据，每页展示3条，那共有33页，假如我们设置连续页面为5，那么当我们点击第五页的时候，连续页码为34567，效果图见上图。我们先定义两个变量start和end，用来记录连续页码的开始和结束页码是多少。首先我们先基本判断start，end的取值情况。<br />当总页数小于连续页码数时，那么start=1，end=totalpage。反之，正常情况下 start = 当前的页码数 -  取整(连续页码数 / 2）<br />end = 当前的页码数 -+ 取整(连续页码数 / 2）。但是这样约束条件并不够，假设我当前点击的为第一页，那么start = -1 同理假设我点击了最后一页，end 已经超出了页码的总数。<br />**我举例来说明我们当前计算方式出现错误**：<br />已知条件: total=【99】  pageSize =【3】  pageNo= 1    continues 5

错误:-1 0 1 2 3<br />正确: 1 2 3 4 5<br />已知条件: total=【99】  pageSize =【3】  pageNo= 2    continues 5

错误: 0 1 2 3 4<br />正确：1 2 3 4 5

已知条件: total=【99】  pageSize =【3】  pageNo= 33    continues 5

错误: 31 32  33 34 35<br />正确：29 30  31 32 33

所以我们还得继续判断

**如果****start小于1****时（也就说明我们点击的当前页码数等于或着小于连续页码数的一半） 此时：start = 1;end = pagerCount;**

**如果****end > 总页码数****（也就说明我们点击的当前页码数等于或着大于总页数减去连续页码数的一半）此时start = 总页数 - 连续页码数+1，end=总页数 即可**<br />具体思路见以下代码

```javascript
    startAndEnd() {
      //算出连续页码:开始与结束这两个数字
      let start = 0,
        end = 0;
      const { totalPage, pagerCount, pageNo } = this;
      //特殊情况:总共页数小于连续页码数
      if (totalPage < pagerCount) {
        start = 1;
        end = totalPage;
      } else {
        //正常情况：分页器总页数大于连续页码数
        start = pageNo - parseInt(pagerCount / 2);
        end = pageNo + parseInt(pagerCount / 2);
        //约束start|end在合理范围之内
        //约束头部
        if (start < 1) {
          start = 1;
          end = pagerCount;
        }
        //约束尾部
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - pagerCount + 1;
        }
      }
      return { start, end };
    },
```

其实这里我们最重要的就是思考一下，当start=1和end=totalpage时的具体情况。<br />做出连续页码数后我们再考虑样式的细节问题，例如当连续页码数刚好为1....2345或者为1...23456...时，省略点...应该消失才对。具体方式可以直接见以下代码（ **这里还有个注意点，我们遍历中间连续页的时候，使用v-for遍历了数字 startAndEnd.end,原理和数组类似，但 v-for 遍历数组，索引从0开始，v-for遍历数字索引从1开始** ）。

```javascript
<template>
  <div class="pagination">
    <h1>开始页{{ startAndEnd.start }}结束页{{ startAndEnd.End }}当前页{{ pageNo }}</h1>
    <button @click="$emit('currentPage',pageNo - 1)" :disabled="pageNo==1">上一页</button>
    <button v-if="startAndEnd.start > 1" @click="$emit('currentPage',1)">1</button>
    <button v-if="startAndEnd.start > 2">.....</button>

    <!-- 中间连续页码的地方:v-for、数组、对象、数字、字符串 -->
    <!--   这里使用v-for遍历了数字 startAndEnd.end,原理和数组类似，但 v-for 遍历数组，索引从0开始，v-for遍历数字索引从1开始 -->
    <button v-for="page in startAndEnd.end" :key="page" v-show="page >= startAndEnd.start" @click="$emit('currentPage',page)" :class="{active:pageNo==page}">{{ page }}</button>

    <button v-if="startAndEnd.end < totalPage - 1 ">......</button>
    <button v-if="startAndEnd.end < totalPage" @click="$emit('currentPage',totalPage)">{{ totalPage }}</button>

    <button  @click="$emit('currentPage',pageNo + 1)" :disabled="pageNo==totalPage">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
```

分页器这里还有的注意点就是，每次将点击的当前页使用自定义事件，给父组件传递数据。

<a name="f3b701c7"></a>
# 16. 商品排序

当我们点击价格或者综合的时候，根据上升或者下降的方式进行排序。前端做的效果是比较简单的，我们只需根据不同的状态发送对应的参数给服务器，然后服务器给我们返回排序后的产品进行展示即可，<br />![](https://img-blog.csdnimg.cn/7212a305bdc248ee8889e2f0cc6499b9.png#id=whJcS&originHeight=631&originWidth=1353&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />![](https://img-blog.csdnimg.cn/612afb3c14364251bfe6a8ccddbd99f5.png#id=RYTSG&originHeight=312&originWidth=858&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />**这里的难点是，我们如何判断用户是想给点击的按钮增添高亮样式，还是改变它的排序方式。**<br />最开始我们获取服务器传来的默认参数，但是每次点击后我们会改变状态修改参数。所以这里我们设置两个变量用来记录上一次改变后的参数值originFlag（1或2），originSortTyp（ "desc" 或"asc" ），首先进行高亮判断，如果我们这次点击后flag==originFlag，代表我们这次点击与上一次点击的按钮相同，所以用户是想改变它的排序方式。若不同，则表明用户改变了点击按钮，那么修改它的高亮样式。

```javascript
method：{
    sort (flag) {
      //获取每一次order初始值,与用户点击传递进来的flag进行判断
      let originFlag = this.searchParams.order.split(":")[0];
      let originSortType = this.searchParams.order.split(":")[1];
      //准备一个新的数值，将来赋值给order
      let newOrder = "";
      //高亮的判断
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSortType == "desc" ? "asc" : "desc"}`;
      } else {
        //不是高亮的按钮
        newOrder = `${flag}:desc`;
      }
      //重新给order赋予新的数值
      this.searchParams.order = newOrder;
      //重新发一次请求
      this.getData();
    },
}
  computed: {
    isOne () {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo () {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isDesc () {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    isAsc () {
      return this.searchParams.order.indexOf("asc") != -1;
    },
  },
```

<a name="fff2b7bb"></a>
# 17.放大镜效果

到了商品详情页的开发，一个比较重要的模块就是放大镜效果，我们之前再学原生JS的时候，大家应该也都跟着老师实现了一次。这次也相当于是一个回顾吧。<br />![](https://img-blog.csdnimg.cn/234666e6f39545f7bc02a47d396a2b6a.png#id=d6ZA9&originHeight=559&originWidth=931&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />这不过这里我们不能直接操作dom获取节点，而是使用ref标记。我们通过改变设置绝对定位的遮罩层，到设置相对定位的父盒子的left值和top，实现遮罩层的移动效果。不过这里我们需要考虑一下边界情况，而放大后的盒子我们根据比例也可以直接获取到图片在大盒子的移动距离值。<br />比例公式为：<br />遮挡层移动距离/遮挡层移动的最大距离(400-mask.offsetWidth(200)) === 大图片移动的距离/大图片移动的最大距离(大图片宽度(800)-大盒子宽度(400))

```javascript
<template>
  <div class="spec-preview">
    <img :src="objInfo.imgUrl" />
    <div class="event"
         @mousemove="handler"></div>
    <div class="big" >
      <!-- 放大镜后的大图盒子 -->
      <img :src="objInfo.imgUrl" ref="big"/>
    </div>
    <div class="mask"
         ref="mask"></div><!-- 遮罩层 -->
  </div>
</template>

<script>
export default {
  name: "UseZoom",
  props: ['skuIamgeList'],
  data () {
    return {
      index: 0
    }
  },
  computed: {
    objInfo () {
      /* 如果服务器没有及时返回数据，那么skuIamgeList就是初始值一个空数组，空数组[0](此接口返回地类型为对象).imgUrl即为undefined，会引起报错，
      所以当没有返回数据时候返回{}(此数组的第零项为对象类型)*/
      return this.skuIamgeList[this.index] || {}
    }
  },
  mounted () {
    this.$bus.$on('GetcurrentImage', (curIndex) => this.index = curIndex)
  },
  methods: {
   handler (event) {
      // 计算遮罩层到相对定位盒子的距离，来改变遮罩层的位置
      let mask = this.$refs.mask
      let big = this.$refs.big
      let left = event.offsetX - mask.offsetWidth / 2
      let top = event.offsetY - mask.offsetHeight / 2
      // console.log(event.offsetX , left,top, big.offsetWidth , mask.offsetWidth)
      if (left <= 0) left = 0
      if (left >= 400 - mask.offsetWidth) { left = 400 - mask.offsetWidth   }
      if(top<= 0) top = 0
      if(top >= 400 - mask.offsetHeight ) { top =  400 - mask.offsetHeight}
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      big.style.left = - 2 * left +'px'//此项目中大图与遮罩层的比例为2，若不知道可以用下面的公式
      big.style.top =  - 2 * top +'px'
      //遮挡层移动距离/遮挡层移动的最大距离(400-mask.offsetWidth(200)) === 大图片移动的距离/大图片移动的最大距离(大图片宽度(800)-大盒子宽度(400))
    },
   }
}
</script>
```

<a name="7f335643"></a>
# 18.改变放大镜展示的图片

商品详情页面还有个较难点就是点击轮播图图片时，改变放大镜组件展示的图片。<br />![](https://img-blog.csdnimg.cn/a129869db43446b29b8fd95fcdb8897f.png#id=ryMrq&originHeight=586&originWidth=583&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />老师的方法很巧妙：在轮播图组件中设置一个currendIndex，用来记录所点击图片的下标，并用currendIndex实现点击图片高亮设置。当符合图片的下标满足currentIndex===index时，该图片就会被标记为选中。使用事件总线，将用户所点击的图片索引值给放大镜组件，进行展示。

```javascript
<template>
      <div class="swiper-slide"
           v-for="(skuIamgeList,index) in skuIamgeList"
           :key="skuIamgeList.id">
        <img :src="skuIamgeList.imgUrl" :class="{active:currentIndex == index}" @click=" GetActive(index)">
      </div>
    </div>
</template>

  data(){
    return{
      currentIndex:0
    }
  },
    methods:{
    GetActive(index){
    this.currentIndex =index 
    this.$bus.$emit('GetcurrentImage',this.currentIndex)
    }
  },
```

<a name="46704c0b"></a>
# 19.购物车组件开发

根据api接口文档封装请求函数

```javascript
export const reqGetCartList = () => {return requests({url:'/cart/cartList',method:'GET'})}
```

但是如果想要获取详细信息，还需要一个用户的uuidToken，用来验证用户身份。但是该请求函数没有参数，所以我们只能把uuidToken加在请求头中。

创建utils工具包文件夹，创建生成uuid的js文件，对外暴露为函数（记得导入uuid => npm install uuid）。<br />生成临时游客的uuid（随机字符串）,每个用户的uuid不能发生变化，还要持久存储

```javascript
import {v4 as uuidv4} from 'uuid'
//生成临时游客的uuid（随机字符串）,每个用户的uuid不能发生变化，还要持久存储
export const getUUID = () => {
    //1、判断本地存储是否由uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //2、本地存储没有uuid
    if(!uuid_token){
        //2.1生成uuid
        uuid_token = uuidv4()
        //2.2存储本地
        localStorage.setItem("UUIDTOKEN",uuid_token)
    }
    //当用户有uuid时就不会再生成
    return uuid_token
}
```

用户的uuid_token定义在store中的detail模块

```javascript
import {getUUID} from '@/utils/USER_ID'
let state = {
     //商品详情的数据
     detailInfo: {},
     uuid_token:getUUID()
};
```

然后我们在api文件封装的二次axios文件的请求拦截器中可以添加请求头

```javascript
requests.interceptors.request.use(config => {
    //请求拦截器:请求头【header】,请求头能否给服务器携带参数
    //请求拦截器：其实项目中还有一个重要的作用,给服务器携带请求们的公共的参数
    //进度条开始
    nprogress.start();
//给向服务器获取购物车信息接口时添加一个请求头，标记一个临时用户身份
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //不管那个模块发请求,请求拦截器，都可以触发。请求拦截器可以通过请求头每一次协大公共参数给服务器【用户未登录的临时身份】 */
    return config;
});
```

注意this.$store只能在组件中使用，不能再js文件中使用。如果要在js中使用，需要引入import store from '@/store';

<a name="062ec4e2"></a>
# 20.购物车商品数量修改

![](https://img-blog.csdnimg.cn/abd4a437ebb34f38b0ea066af7fb18c6.png#id=fNAX4&originHeight=554&originWidth=1374&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="94a61497"></a>
## 20.1.当选中所有商品时，全选自动选中

这里我们需要every函数使用

> every遍历某个数组，判断数组中的元素是否满足表达式，全部为满足返回true，否则返回false


```javascript
//判断底部勾选框是否全部勾选
      isAllCheck() {
        //every遍历某个数组，判断数组中的元素是否满足表达式，全部为满足返回true，否则返回false
        return this.cartInfoList.every(item => item.isChecked === 1)
      }
```

<a name="05180263"></a>
## 20.2.一键全选或全不选

当我们勾选或取消了全选按钮，会改变每单个按钮的选中状态。但是接口中只向我们提供了改变单个按钮的选中状态的接口，所有我们不得不需要遍历多次派发单个按钮状态改变的接口，来实现一键全选或者全不选。

给全选按钮绑定updateAllChecked事件

```javascript
async updateAllChecked (e) {
  //获取全选的复选框勾选的状态,接口需要的1|0
  let isChecked = e.target.checked ? "1" : "0";
  try {
    //await等待成功:购物车全部商品勾选状态成功以后
    await this.$store.dispatch("allUpdateChecked", isChecked);
  
    this.getShopCartdata()
  } catch (error) {
    alert('修改失败');
  }
},
```

给修改全部商品的勾选的状态的allUpdateChecked函数派发，但实则时遍历又调用了改变单个按钮状态函数CheckCart，由于服务器返回的结果是一个promsie，所以我们可以使用Promise.all()，当所有单个按钮状态都改变成功，整个promise才会返回状态为成功。

这里补充一下相关的promsie.all知识

> Promise.all():参数需要的是一个数组【数组里面需要promise】<br />Promise.all()执行一次,返回的是一个Promise对象,Promise对象状态：成功、失败取决于什么?<br />成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！！


```javascript

	//修改产品的状态
	async CheckCart({commit},{skuId,isChecked}){
		let result = await reqcheackCart(skuId,isChecked)
		// console.log(`*********`,result)
		if(result.code == 200){
			return 'ok'
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	     //修改全部商品的勾选的状态
	allUpdateChecked({ commit, state, dispatch }, isChecked) {
		let arr = [];
				//获取购物车商品的个数,进行遍历
				state.cartList[0].cartInfoList.forEach(item => {
						 //调用修改某一个商品的action【四次】
						 let ps = dispatch("CheckCart", { skuId: item.skuId, isChecked });
			
						 arr.push(ps);
				})
				//Promise.all():参数需要的是一个数组【数组里面需要promise】
				//Promise.all()执行一次,返回的是一个Promise对象,Promise对象状态：成功、失败取决于什么?
				//成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！！
				return Promise.all(arr);
	},
```

<a name="a563a9e2"></a>
## 20.3.删除单个商品

这里指的是我们点击删除按钮，将当前单个商品删除即可。那我们只需要发送请求即可<br />![](https://img-blog.csdnimg.cn/fc648135ca2f4adfaad8fa91b9c8a578.png#id=nxnfJ&originHeight=156&originWidth=1100&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

```javascript
	async	DeleteShop({commit},skuId){
		let result = await reqDeleteShop(skuId)
	if(result.code == 200){
		// console.log(result)
		return 'ok'
	}else{
		return Promise.reject(new Error('faile'))
	}
	},
```

<a name="22a5e24a"></a>
## 20.4.删除选中的商品

前面的工作做好了，这里就很简单了。我们判断选中的商品，然后发送请求进行删除即可。

```javascript
	deleteAllCart({state,dispatch}){
		let arr = []
    state.cartList[0].cartInfoList.forEach(item =>{
      if(item.isChecked == 1){
        let ps = dispatch('DeleteShop',item.skuId)
        arr.push(ps)
      }
    })
    return Promise.all(arr)
	}
},
```

<a name="e667c4bc"></a>
## 20.5.节流和防抖

![](https://img-blog.csdnimg.cn/213f766d3c7847929ef50d2bcd473afa.png#id=Ro6vW&originHeight=408&originWidth=348&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />**节流**：当我们修改单个数量的时候，例如减少商品数量，可能由于我们点击频率过快，当上一次服务器数据还未返回时，又进行了大量相同操作，导致最后页面数量出现为负数，这个时候我们需要进行节流操作，在一定时间间隔内，用户的点击操作只能生效一次。<br />**防抖**：当用户直接输入数字改变数量的时候，每输入一个数字时就会发送一次请求，比如用户想输入1000，就得发四次请求，但其实前三次是不必要的，于是我们可以使用防抖，在一定时间间隔内，用户没有了新的输入，再统一重新发送请求。减少了我们请求次数。<br />下面是项目中我们直接使用了lodash插件，调用的节流和防抖函数。但其实我们自己是必须学会手写的。

```javascript
//按需引入lodash节流函数
import throttle from "lodash/throttle";
//按需引入lodash防抖函数
import debounce from "lodash/debounce";```

  //修改商品数据-减的操作
    minusSkuNum: throttle(async function (cart) {
      if (cart.skuNum > 1) {
        //整理参数:至少加入购物车的数量最低1个
        let params = { skuId: cart.skuId, skuNum: -1 };
        //修改商品的数据
        try {
          //修改商品的个数、成功以后再次获取购物车的数据
          await this.$store.dispatch('AddShopCar', params);
          this.getShopCartdata();
        } catch (error) { }
      }
    }, 2000),
    changeSkuNum: debounce(async function (cart, e) {

      //整理参数
      let params = { skuId: cart.skuId };
      //计算出SkuNum携带的数据
      let userResultValue = e.target.value * 1;
      //用户输入完毕，最终结果【非法条件】
      if (isNaN(userResultValue) || userResultValue < 1) {
        params.skuNum = 0;
      } else {
        //正常情况
        params.skuNum = parseInt(userResultValue) - cart.skuNum;
      }
      //发请求：修改商品的个数
      try {
        //修改商品的个数、成功以后再次获取购物车的数据
        await this.$store.dispatch('AddShopCar', params);
        this.getShopCartdata();
      } catch (error) { }
    }, 500),
```

简单手写节流防抖函数

```javascript
//防抖
 function debounced(fn, time) {
        let timer = null;
        return function () {
          clearTimeout(timer);
          timer = setTimeout(() => {
            fn();
          }, time);
        };
      }
  //节流
  function throttle(fn, time) {
        let flag = false;
        return function () {
          if (flag) {
            return;
          }
          flag = true;
          setTimeout(() => {
            fn();
            flag = false;
          }, time);
        };
      }
```

<a name="7512a988"></a>
## 20.6.其余注意点

1.computed中的cartInfoList没有写[ ]返回值。当后台返回的购物车数据为空时，cartInfoList 就会为undefined，会导致后面的total、isAllCheck等计算属性使用到cartInfoList时产生计算错误。

正确代码:

```javascript
 cartInfoList(){
        return this.getCartList.cartInfoList || [];
      }
```

2.当用户向手动输入修改改变产品数量的时候，我们怎么判断用户输入的一定是数字呢？<br />我们可以让用户输入的值乘以1，若不是数字number类型，返回的值都是NaN，然后我们再判断是否是isNaN()，若不是再证明输入的是数字类型<br />![](https://img-blog.csdnimg.cn/f0545ce9eddc41c1ad827a5d365a7670.png#id=UtXlR&originHeight=45&originWidth=149&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

```javascript
let userResultValue = e.target.value * 1;
  if (isNaN(userResultValue) || userResultValue < 1) {
 	 params.skuNum = 0;
  }
```

<a name="d3373c3e"></a>
# 21.登录注册流程

登录注册对于新手来说是一个重要的知识点，要明白登录注册流程。

<a name="4bc39e3a"></a>
## 21.1.完成注册

![](https://img-blog.csdnimg.cn/bc9794bbec084122a0664981b15d439a.png#id=yKt5E&originHeight=490&originWidth=916&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />这里的重点是发送请求获取验证码以及完成表单的校验功能，当我们输入的信息不符合规则的时候，会进行对应的提示。这里校验功能我们使用的VeeValidate插件，具体使用方法可以去官网查看，这里我们直接附上代码。<br />在utils/VeeValidate.js

```javascript
import  Vue from 'vue'
//表单验证插件
import VeeValidate from 'vee-validate';
//安装插件:给全局添加全局自定义指令v-validate
//给全部VC的原型原型vue.ptototype添加属性$validator
Vue.use(VeeValidate);
//默认提示文字英文:大多数项目应该中文
import zh_CN from 'vee-validate/dist/locale/zh_CN'   // 引入中文 message


//插件中文提示
VeeValidate.Validator.localize('zh_CN', {
    //插件提示消息,变为中文
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: { // 给校验的 field 属性名映射中文名称
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        agree: '协议'
    }
})

//vee-validate:有一些表单元素并非是文本框[单选|复选框]
//没有办法书写正则表达式,自定义校验规则
VeeValidate.Validator.extend('agree', {
    validate: value => {
        return value
    },
    getMessage: field => field + '必须同意'
})
```

在main.js进行全局引入

```javascript
import '@/utils/veeValidate'
```

<a name="30c3e298"></a>
## 21.2.完成登录功能

![](https://img-blog.csdnimg.cn/669cfc17346b4e7789c9808e8bb450d2.png#id=rsu50&originHeight=557&originWidth=607&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

当我们完成注册，输入手机号，和密码。向服务器发送请求，服务器向我们返回token，有了token我们才能验证用户身份，发送请求服务器给我们返回用户信息。但是token我们如何保存呢，如果直接存储在vuex中，页面刷新后，vuex中的信息就会消失，那么我们就需要再次登录，显然这是不合理的，所以我们可以存储在本地浏览器中，这样就不会产生页面刷新后的问题。第一次发送请求，服务器验证身份，返回token并保存到本地

```javascript
async userLogin({commit},data){
	let result =  await reqLogin(data)
	// console.log(result)
	if(result.code == 200){
		commit('USERLOGIN',result.data.token)
		localStorage.setItem('token',result.data.token)//存储token 
	}else{
		return Promise.reject(new Error('登录失败'))
	}
},
```

在请求拦截器中，在请求头中加入token信息，服务器验证后才会返回用户信息

```javascript
requests.interceptors.request.use(config => {

    nprogress.start();

    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token;
    }

   // 携带token[公共参数]进行登录

    if(store.state.login.token){
        config.headers.token = store.state.login.token;
        // console.log(store.state.login.token)
    }
    return config;
});
```

那有了token后在哪里发送获取用户信息的请求呢?是直接在登录页面获取，判断有了用户信息才能跳转页面？还是登录成功后跳转到home页面挂载的时候?其实都不是，因为这样我们的用户信息请求只会发送一次，跳转路由后刷新页面信息就会消失。因为别的路由组件又没有发送获取的用户信息请求，是拿到不用户信息的，一但刷新信息就会消失。所以我们只能在每次路由跳转前进行发送获取用户信息的请求。这里就需要使用全局路由导航守卫。<br />在router/index文件中设置路由守卫

这里补充一下路由守卫的知识

> router.beforeEach(async (to,from,next)=>{<br />console.log(to,from,next)<br />}<br />可以获取到你要跳转到那个路由的信息<br />from：可以获取到你从那个路由而来的信息<br />next：放行函数 next()放行 next(path)<br />用户是否登录:取决于仓库里面是否有token！！！<br />每一次路由跳转之前需要用有用户信息再跳转,没有发请求获取用户信息再跳转！！！！


这里直接附上整个项目完整用到全局路由守卫的条件

```javascript
router.beforeEach(async (to,from,next)=>{
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
```

发送获取用户信息的请求

```javascript
async getUserInfo({commit}){
	let result = await reqgetUserInfo()
	// console.log(result)
	if(result.code == 200){
		commit("GETUSERINFO",result.data)
		return 'ok'
	}else{
		return Promise.reject(new Error(result.messge))
	}
},
```

成功获取用户信息才说明登录流程完成

<a name="da6a37ac"></a>
## 21.3.退出登录

退出登录其实就很简单，我们登录所有的操作是基于有了token之后，那么退出token，我们只需要发送请求通知服务器清除token以及我们自身清除浏览器中的token即可

```javascript
const action={
	async LoginOut({commit}){
	  let result =  await reqLoginout()
		if(result.code ==200){ 
		commit('LOGINOUT')
		return 'ok'
	}else{
		return Promise.reject(new Error(result.messge))
	}
}
const mutation={
	LOGINOUT(state){
		state.token = localStorage.removeItem('token')
		state.UserInfo = {}
	}
}
```

到这里那么整个登录注册流程就结束了

<a name="cc8e112d"></a>
# 22.其余模块开发

其他模块开发，也无非就是以下几步操作<br />（1）写静态页面、拆分为静态组件；<br />（2）发请求（API）；<br />（3）vuex（actions、mutations、state三连操作）；<br />（4）组件获取仓库数据，动态展示；<br />这里我们就不具体展示了，此外这个项目中其实还可以继续优化，小伙伴们在这个项目中有更好更简洁的方法，也可以私信告诉我哦，大家一起进步！接下来就带大家复习一下，关于此项目的一些重点知识。

<a name="31b02ca4"></a>
# 23.组件间通信方式

这里列举一些作者常用且知道的，可能会有遗漏别的一些。

<a name="503ff84f"></a>
## 23.1.组件自定义事件

1.组件自定义事件是一种组件间通信的方式，适用于： **子组件 ===>  父组件**

使用场景

A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）。

**绑定自定义事件**：<br />第一种方式，在父组件中：`<Demo @atguigu="test"/>`或 `<Demo v-on:atguigu="test"/>`<br />App.vue

```javascript
<template>
	<div class="app">
		<!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法，使用@或v-on） -->
		<Student @atguigu="getStudentName"/> 
	</div>
</template>

<script>
	import Student from './components/Student'

	export default {
		name:'App',
		components:{Student},
		data() {
			return {
				msg:'你好啊！',
				studentName:''
			}
		},
		methods: {
			getStudentName(name,...params){
				console.log('App收到了学生名：',name,params)
				this.studentName = name
			}
		}
	}
</script>

<style scoped>
	.app{
		background-color: gray;
		padding: 5px;
	}
</style>
```

Student.vue

```javascript
<template>
	<div class="student">
		<button @click="sendStudentlName">把学生名给App</button>
	</div>
</template>

<script>
	export default {
		name:'Student',
		data() {
			return {
				name:'张三',
			}
		},
		methods: {
			sendStudentlName(){
				//触发Student组件实例身上的atguigu事件
				this.$emit('atguigu',this.name,666,888,900)
			}
		},
	}
</script>

<style lang="less" scoped>
	.student{
		background-color: pink;
		padding: 5px;
		margin-top: 30px;
	}
</style>
```

> 若想让自定义事件只能触发一次，可以使用once修饰符，或$once方法。
触发自定义事件：this.$emit('atguigu',数据)使用 this.$emit() 就可以子组件向父组件传数据


<a name="b04b1956"></a>
## 23.2.全局事件总线

一种组件间通信的方式，适用于任意组件间通信。

eventBus  又称为事件总线，在vue中可以使用它来作为沟通桥梁的概念, 就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件， 所以组件都可以通知其他组件。

> eventBus也有不方便之处, 当项目较大,就容易造成难以维护的灾难


在Vue的项目中怎么使用eventBus来实现组件之间的数据通信呢?具体通过下面几个步骤

安装全局事件总线

```javascript
new Vue({
	......
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
	},
    ......
})
```

使用事件总线：

接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身。

```javascript
methods(){
  demo(data){......}
}
......
mounted() {
  this.$bus.$on('xxxx',this.demo)
}
```

提供数据:this.$bus.$emit('xxx数据)

<a name="7618e908"></a>
## 23.3.消息订阅与发布

一种组件间通信的方式，适用于任意组件间通信。

使用步骤：

安装`pubsub：npm i pubsub-js`<br />在mian.js中<br />引入: `import pubsub from 'pubsub-js'`

**接收数据**：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。

```javascript
methods:{
  demo(data){......}
}
......
mounted() {
  this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
}
```

**提供数据**：pubsub.publish('xxx',数据)

**最好在beforeDestroy钩子中，用PubSub.unsubscribe(pid)去取消订阅。**

<a name="ae656f14"></a>
## 23.4.provide/ inject

**概念:**<br />provide/ inject 是vue2.2.0新增的api, 简单来说就是父组件中通过provide来提供变量, 然后再子组件中通过inject来注入变量。

注意: **这里不论子组件嵌套有多深, 只要调用了inject 那么就可以注入provide中的数据，而不局限于只能从当前父组件的props属性中回去数据**

举例验证<br />接下来就用一个例子来验证上面的描述:<br />假设有三个组件: A.vue、B.vue、C.vue 其中 C是B的子组件，B是A的子组件

```javascript
// A.vue

<template>
  <div>
	<comB></comB>
  </div>
</template>

<script>
  import comB from '../components/test/comB.vue'
  export default {
    name: "A",
    provide: {
      for: "demo"
    },
    components:{
      comB
    }
  }
</script>
```

```javascript
// B.vue

<template>
  <div>
    {{demo}}
    <comC></comC>
  </div>
</template>

<script>
  import comC from '../components/test/comC.vue'
  export default {
    name: "B",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    },
    components: {
      comC
    }
  }
</script>
```

```javascript
// C.vue
<template>
  <div>
    {{demo}}
  </div>
</template>

<script>
  export default {
    name: "C",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    }
  }
</script>
```

<a name="ade16c3c"></a>
## 23.5. ref / refs

**ref**：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据， 我们看一个ref 来访问组件的例子:

```javascript
// 子组件 A.vue

export default {
  data () {
    return {
      name: 'Vue.js'
    }
  },
  methods: {
    sayHello () {
      console.log('hello')
    }
  }
}
```

```javascript
// 父组件 app.vue

<template>
  <component-a ref="comA"></component-a>
</template>
<script>
  export default {
    mounted () {
      const comA = this.$refs.comA;
      console.log(comA.name);  // Vue.js
      comA.sayHello();  // hello
    }
  }
</script>
```

<a name="44e3fcf8"></a>
## 23. 6.父组件向子组件传值props

下面通过一个例子说明父组件如何向子组件传递数据：在子组件article.vue中如何获取父组件section.vue中的数据articles:['红楼梦', '西游记','三国演义']

```javascript
// section父组件
<template>
  <div class="section">
    <com-article :articles="articleList"></com-article>
  </div>
</template>

<script>
import comArticle from './test/article.vue'
export default {
  name: 'HelloWorld',
  components: { comArticle },
  data() {
    return {
      articleList: ['红楼梦', '西游记', '三国演义']
    }
  }
}
</script>
```

```javascript
// 子组件 article.vue
<template>
  <div>
    <span v-for="(item, index) in articles" :key="index">{{item}}</span>
  </div>
</template>

<script>
export default {
  props: ['articles']
}
</script>
```

**总结**: prop 只可以从上一级组件传递到下一级组件（父子组件），即所谓的单向数据流。而且**props只读**，不可被修改，**所有修改都会失效并警告**。

<a name="1db47801"></a>
## 23.7.$parent 与 $children

官网的解释<br />![](https://img-blog.csdnimg.cn/b5ae8451dc244afe817754425b2bb480.png#id=z4K3Y&originHeight=397&originWidth=854&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />通过$parent 和 $children就可以访问组件的实例，拿到实例代表什么？代表可以访问此组件的所有方法和data。接下来就是怎么实现拿到指定组件的实例。

```javascript
// 父组件中
<template>
  <div class="hello_world">
    <div>{{msg}}</div>
    <com-a></com-a>
    <button @click="changeA">点击改变子组件值</button>
  </div>
</template>

<script>
import ComA from './test/comA.vue'
export default {
  name: 'HelloWorld',
  components: { ComA },
  data() {
    return {
      msg: 'Welcome'
    }
  },

  methods: {
    changeA() {
      // 获取到子组件A
      this.$children[0].messageA = 'this is new value'
    }
  }
}
</script>
```

```javascript
// 子组件中
<template>
  <div class="com_a">
    <span>{{messageA}}</span>
    <p>获取父组件的值为:  {{parentVal}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageA: 'this is old'
    }
  },
  computed:{
    parentVal(){
      return this.$parent.msg;
    }
  }
}
</script>
```

> 要注意边界情况，如在#app上拿  $parent 得到的是new Vue()的实例，在这实例上再拿 $parent得到的是undefined，而在最底层的子组件拿 $children是个空数组。也要注意得到 $parent和 $children的值不一样， $children 的值是数组，而 $parent是个对象


其他方式其实vuex以及本地存储和会话存储都可以实现组件间通信。

<a name="25f9c7fa"></a>
# 总结

本次项目的一些重要模块就是这些，具体关于vue的知识这里也就不详细说明了。虽然很多人觉得商城项目已经烂大街，但总的来说做完此次项目，收获也还是很多，也知道实际操作是如何运用的，也教会我们遇到bug时要多去思考，深入学习，一起继续加油奋斗下去吧！！！共勉。
