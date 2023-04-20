import Vue from 'vue'
import App from './App.vue'

//注册两个全局组件:Header、Footer,全局组件写法【定义一次,可以直接在任意地方使用】
//Vue.component(组件的名字,组件)
//组件:实质是VueComponent构造函数,为什么下面Header组件打印并非是VueComponent构造函数,因为Header组件暴露的
//配置项(JS),并非暴露Vue.extend()[返回VueComponent构造函数],用的是简写方式
import Header from '@/components/header';
import Footer from '@/components/footer';
import TypeNav from '@/components/typeNav';
import Pagination from '@/components/pagination';
import Carousel from '@/components/Carousel'
import 'swiper/swiper-bundle.min.css'
import { Button, MessageBox,Message  } from 'element-ui';

Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
Vue.component(Header.name, Header);
Vue.component(Footer.name, Footer);
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
Vue.component(Carousel.name,Carousel)

//测试获取数据
// import { reqCategory } from '@/api';
// console.log('入口文件地方',reqCategory());
//注册路由功能
import router from './router';
//注册仓库功能
import store from './store';

//引入mockServe文件,让咱们模拟接口跑起来
import "@/mock/mockServe.js";
//引入懒加载插件
import VueLazyload from 'vue-lazyload'
import loadingImg from '@/assets/loading.jpg'
Vue.use(VueLazyload, {
  loading: loadingImg,

})
import '@/utils/veeValidate'

//将项目全部请求函数引入进来[分别暴露]
import  * as http from '@/api';
new Vue({
  //配置全局事件总线
  beforeCreate() {
    //配置全局事件总线
    Vue.config.productionTip = false
    Vue.prototype.$bus = this;
    //通过Vue.prototype原型对象,将全部请求函数挂载到原型对象身上[VC:就可以使用请求函数]
    Vue.prototype.$http = http;
  },
  //下面代码作用:给项目添加路由功能,给全部VC实例身上拥有两个属性,$router|$route
  router,
  //下面的代码作用:给项目添加仓库功能,主要的作用是给全部VC拥有一个$store属性
  store,
  render: h => h(App),
}).$mount('#app');
