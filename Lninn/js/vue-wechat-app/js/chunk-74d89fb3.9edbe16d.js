(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74d89fb3"],{"196a":function(t,e,s){},bd2d:function(t,e,s){"use strict";var a=s("196a"),i=s.n(a);i.a},d9c9:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page"},[s("AppHeader",[s("AppBackHeader",{attrs:{title:"登录",showBtn:!1}})],1),s("div",{staticClass:"page__bd",staticStyle:{"margin-top":"3rem"}},[s("div",{staticClass:"weui-flex"},[s("div",{staticClass:"weui-flex__item"},[s("div",{staticClass:"weui-cells weui-cells_form"},[s("AppInput",{attrs:{icon:"",type:"text",placeholder:"请输入用户名"},model:{value:t.loginForm.username,callback:function(e){t.$set(t.loginForm,"username",e)},expression:"loginForm.username"}}),s("AppInput",{attrs:{icon:"",type:"password",placeholder:"请输入密码"},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}}),s("div",{staticClass:"weui-cell"},[s("div",{staticClass:"weui-cell__bd"},[s("AppLargeButton",{attrs:{text:"登录"},on:{onClick:t.onLogin}})],1)]),s("div",{staticClass:"weui-cell btn-area"},[s("div",{staticClass:"weui-cell__hd register-btn"},[s("AppSmallButton",{attrs:{text:"注册新用户"},on:{onClick:t.onRegister}}),s("AppSmallButton",{attrs:{text:"忘记密码 ?"}})],1)])],1)])])])],1)},i=[],n=s("be94"),o=s("57c4"),l=s.n(o),r=s("2f62"),c=Object(r["a"])("user"),u=c.mapActions,p={name:"Login",data:function(){return{loginForm:{username:null,password:null}}},created:function(){this.logout()},methods:Object(n["a"])({},u(["authenticate","logout","onRegister"]),{onLogin:function(){this.validForm()&&this.authenticate(this.loginForm)},validForm:function(){var t,e=this.loginForm,s=e.username,a=e.password,i=!1;return s?a?i=!0:t="请输入密码":t="请输入用户名",!1===i&&l.a.topTips(t,{duration:1500}),i}})},d=p,m=(s("bd2d"),s("2877")),g=Object(m["a"])(d,a,i,!1,null,"7365e4e2",null);g.options.__file="index.vue";e["default"]=g.exports}}]);
//# sourceMappingURL=chunk-74d89fb3.9edbe16d.js.map