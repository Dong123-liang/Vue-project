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