(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-305eb17d"],{"59a8":function(t,e,a){"use strict";var s=a("669f"),i=a.n(s);i.a},"669f":function(t,e,a){},"6f2c":function(t,e,a){},a96e:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Layout",[t._t("default",[a("AppSelect",{attrs:{currentState:t.ItemState},on:{changeState:t.SET_ITEMSTATE}})],{slot:"header"}),t.filterList.length?a("div",{staticClass:"weui-cells workorder-list"},t._l(t.filterList,function(t){return a("Item",{key:t.id,attrs:{workorder:t}})})):a("div",{staticClass:"no-list"},[a("p",[t._v("暂无工单信息")])])],2)},i=[],r=a("be94"),n=a("e134"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"weui-panel weui-panel_access"},[a("div",{staticClass:"weui-panel__bd"},[a("a",{staticClass:"weui-media-box weui-media-box_appmsg",attrs:{href:"javascript:void(0);"}},[a("div",{staticClass:"weui-media-box__bd"},[a("h4",{staticClass:"weui-media-box__title"},[t._v(t._s(t.workorder.workorderNumber))]),a("p",{staticClass:"weui-media-box__desc"},[a("span",[t._v("设备编号: ")]),a("span",[t._v(t._s(t.workorder.deviceNumber))])]),a("p",{staticClass:"weui-media-box__desc"},[a("span",[t._v("上报时间: ")]),a("span",[t._v(t._s(t.workorder.date))])]),a("p",{staticClass:"weui-media-box__desc"},[a("span",[t._v("状态: ")]),a("span",[t._v(t._s(t.getStateText(t.workorder.state)))])])]),a("div",{staticClass:"weui-media-box__hd product-img"},[a("img",{staticClass:"weui-media-box__thumb",attrs:{src:t.workorder.image,alt:""}})])])]),a("div",{staticClass:"weui-panel__ft"},[a("router-link",{staticClass:"weui-btn weui-btn_mini wx-btn",attrs:{to:"/workorders/"+t.workorder.id}},[a("i",{staticClass:"iconfont"},[t._v("")]),a("span",[t._v("查看详情")])]),a("router-link",{staticClass:"weui-btn weui-btn_mini wx-btn",attrs:{to:"/received"}},[a("i",{staticClass:"iconfont"},[t._v("")]),a("span",[t._v("确认完成")])])],1)])},c=[],u={name:"Item",props:{workorder:{type:Object,required:!0}},methods:{getStateText:function(t){switch(t){case"INITIALIZED":return"等待接收";case"RECEIVED":case"PROCESSING":return"处理中";case"COMPLETED":return"完成";default:return"订单异常"}}}},l=u,d=(a("59a8"),a("2877")),_=Object(d["a"])(l,o,c,!1,null,"e76874ee",null);_.options.__file="Item.vue";var p=_.exports,m=a("2f62"),w=Object(m["a"])("workOrder"),f=w.mapState,v=w.mapGetters,b=w.mapMutations,k=w.mapActions,C={name:"WorkOrderList",components:{Layout:n["a"],Item:p},computed:Object(r["a"])({},f({WorkOrderList:function(t){return t.list},ItemState:function(t){return t.ItemState}}),v(["filterList"])),mounted:function(){this.getWorkOrders()},methods:Object(r["a"])({},k(["getWorkOrders"]),b(["SET_ITEMSTATE"]))},h=C,x=(a("c961"),Object(d["a"])(h,s,i,!1,null,null,null));x.options.__file="index.vue";e["default"]=x.exports},c961:function(t,e,a){"use strict";var s=a("6f2c"),i=a.n(s);i.a},e134:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page"},[a("AppHeader",[t._t("header",[a("AppBackHeader",{attrs:{title:t.title}})])],2),t._t("default"),t.hideFooter?t._e():a("AppFooter")],2)},i=[],r={name:"Layout",props:{hideFooter:{type:Boolean,default:!1},title:{type:String}}},n=r,o=a("2877"),c=Object(o["a"])(n,s,i,!1,null,null,null);c.options.__file="index.vue";e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-305eb17d.a5ced9d2.js.map