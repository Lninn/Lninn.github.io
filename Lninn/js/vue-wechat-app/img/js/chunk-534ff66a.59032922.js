(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-534ff66a"],{"16c0":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("Layout",[a("div",{staticClass:"weui-flex",attrs:{slot:"header"},slot:"header"},[a("Avator",{attrs:{loginName:e.loginName}}),a("Scan")],1),a("DeviceList")],1)},i=[],n=a("cebc"),c=a("e134"),l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"weui-flex__item"},[s("div",{staticClass:"logo-info",attrs:{"data-id":"UserInformation"}},[s("img",{staticClass:"avator",attrs:{src:a("5562"),alt:""}}),s("span",{staticClass:"greet"},[e._v(e._s(e.loginName))])])])},r=[],o={name:"Avator",props:{loginName:{type:String,default:"匿名"}}},u=o,d=(a("97b5"),a("2877")),v=Object(d["a"])(u,l,r,!1,null,null,null),_=v.exports,p=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},m=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"weui-flex__item"},[a("div",{staticClass:"scan",attrs:{id:"scanQRCode"}},[a("p",[a("i",{staticClass:"iconfont"},[e._v("")])])])])}],f={name:"Scan"},b=f,w=(a("2a75"),Object(d["a"])(b,p,m,!1,null,null,null)),C=w.exports,g=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"weui-cells"},e._l(e.deviceList,function(e){return a("Item",{key:e.id,attrs:{device:e}})}),1)},x=[],h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"weui-panel weui-panel_access"},[a("div",{staticClass:"weui-panel__bd"},[a("a",{staticClass:"weui-media-box weui-media-box_appmsg",attrs:{href:"javascript:void(0);"}},[a("div",{staticClass:"equipment-image"},[a("img",{staticClass:"weui-media-box__thumb",attrs:{src:e.device.img}})]),a("div",{staticClass:"weui-media-box__bd"},[a("h4",{staticClass:"weui-media-box__title"},[e._v(e._s(e.device.name))]),a("p",{staticClass:"weui-media-box__desc"},[a("span",[e._v("型号: ")]),a("span",[e._v(e._s(e.device.model))])]),a("p",{staticClass:"weui-media-box__desc"},[a("span",[e._v("产地: ")]),a("span",[e._v(e._s(e.device.address))])]),a("p",{staticClass:"weui-media-box__desc"},[a("span",[e._v("描述: ")]),a("span",[e._v(e._s(e.device.describe))])]),a("p",{staticClass:"weui-media-box__desc"},[a("span",[e._v("出厂日期: ")]),a("span",[e._v(e._s(e.device.date))])])])])]),a("div",{staticClass:"weui-panel__ft"},[a("router-link",{staticClass:"weui-btn weui-btn_mini",attrs:{to:"/devices/"+e.device.id}},[a("i",{staticClass:"iconfont"},[e._v("")]),a("span",[e._v("详细资料")])]),a("router-link",{staticClass:"weui-btn weui-btn_mini",attrs:{to:"/maintain/"+e.device.id}},[a("i",{staticClass:"iconfont"},[e._v("")]),a("span",[e._v("报修")])])],1)])},j=[],O={name:"Item",props:{device:{type:Object,required:!0}}},y=O,L=(a("2e5d"),Object(d["a"])(y,h,j,!1,null,"df5c32b2",null)),k=L.exports,A=a("2f62"),E=Object(A["a"])("devices"),$=E.mapState,S=E.mapActions,D={name:"DeviceList",computed:$({deviceList:function(e){return e.list}}),components:{Item:k},methods:Object(n["a"])({},S(["getDevices"])),mounted:function(){this.getDevices()}},N=D,I=(a("f41d"),Object(d["a"])(N,g,x,!1,null,"6cd14dbc",null)),F=I.exports,H={name:"Home",components:{Avator:_,Scan:C,DeviceList:F,Layout:c["a"]},computed:Object(n["a"])({},Object(A["d"])("user",["loginName"]))},q=H,B=(a("7361"),Object(d["a"])(q,s,i,!1,null,null,null));t["default"]=B.exports},"28c8":function(e,t,a){},"2a75":function(e,t,a){"use strict";var s=a("63eb"),i=a.n(s);i.a},"2e5d":function(e,t,a){"use strict";var s=a("28c8"),i=a.n(s);i.a},"2e5e":function(e,t,a){},"36bf":function(e,t,a){},5562:function(e,t,a){e.exports=a.p+"img/touxiang.d467815d.jpg"},"63eb":function(e,t,a){},7361:function(e,t,a){"use strict";var s=a("bf37"),i=a.n(s);i.a},"97b5":function(e,t,a){"use strict";var s=a("2e5e"),i=a.n(s);i.a},bf37:function(e,t,a){},e134:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("AppHeader",[e._t("header",[a("AppBackHeader",{attrs:{title:e.title}})])],2),e._t("default"),e.hideFooter?e._e():a("AppFooter")],2)},i=[],n={name:"Layout",props:{hideFooter:{type:Boolean,default:!1},title:{type:String}}},c=n,l=a("2877"),r=Object(l["a"])(c,s,i,!1,null,null,null);t["a"]=r.exports},f41d:function(e,t,a){"use strict";var s=a("36bf"),i=a.n(s);i.a}}]);
//# sourceMappingURL=chunk-534ff66a.59032922.js.map