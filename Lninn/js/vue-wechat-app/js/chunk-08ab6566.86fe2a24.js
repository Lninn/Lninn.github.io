(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-08ab6566"],{"5f19":function(e,t,a){"use strict";var r=a("64a3"),n=a.n(r);n.a},"64a3":function(e,t,a){},8721:function(e,t,a){},"959d":function(e,t,a){"use strict";var r=a("bd47"),n=a.n(r);n.a},9927:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("AppImgTextCells",{attrs:{data:e.filterData}})},n=[],i=(a("7f7f"),a("ed08")),l=[{name:"name",label:"名称",icon:""},{name:"model",label:"型号",icon:""},{name:"company",label:"公司",icon:""},{name:"address",label:"位置",icon:""}],o={name:"EquipmentCell",data:function(){return{name:"设备信息",originalData:l}},props:{ArrayData:{type:Array,required:!0}},computed:{filterData:function(){var e=Object(i["b"])(this.originalData,this.ArrayData);return{name:this.name,list:e}}}},s=o,u=(a("959d"),a("2877")),c=Object(u["a"])(s,r,n,!1,null,"6ef6dab7",null);c.options.__file="EquipmentCell.vue";t["a"]=c.exports},b9d9:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("Layout",{attrs:{hideFooter:!0,title:"工单详情"}},[a("WorkOrderCell",{attrs:{ArrayData:e.information}}),a("EquipmentCell",{attrs:{ArrayData:e.device}}),a("ConnectCell",{attrs:{ArrayData:e.connection}}),a("MaintainCell",{attrs:{title:"故障描述",text:e.descibe,imageList:e.descibeImage}}),a("FeedbackCell",{attrs:{title:"反馈内容",text:e.feedback,imageList:e.feedbackImage}}),a("EvaluateCell",{attrs:{title:"评价",text:e.evaluate}})],1)},n=[],i=a("be94"),l=a("e134"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("AppImgTextCells",{style:{marginTop:"3rem"},attrs:{data:e.filterData}})},s=[],u=(a("7f7f"),a("ed08")),c=[{name:"number",label:"编号",icon:""},{name:"date",label:"创建时间",icon:""}],p={name:"WorkOrderCell",data:function(){return{name:"工单信息",originalData:c}},props:{ArrayData:{type:Array,required:!0}},computed:{filterData:function(){var e=Object(u["b"])(this.originalData,this.ArrayData);return{name:this.name,list:e}}}},d=p,m=(a("e2cb"),a("2877")),f=Object(m["a"])(d,o,s,!1,null,"b749eef8",null);f.options.__file="WorkOrderCell.vue";var b=f.exports,v=a("9927"),_=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("AppImgTextCells",{attrs:{data:e.filterData}})},g=[],y=[{name:"person",label:"联系人",icon:""},{name:"phone",label:"电话",icon:""}],C={name:"ConnectCell",data:function(){return{name:"联系信息",originalData:y}},props:{ArrayData:{type:Array,required:!0}},computed:{filterData:function(){var e=Object(u["b"])(this.originalData,this.ArrayData);return{name:this.name,list:e}}}},h=C,x=(a("5f19"),Object(m["a"])(h,_,g,!1,null,"4691ead6",null));x.options.__file="ConnectCell.vue";var A=x.exports,O=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("AppOutputTextarea",{attrs:{title:e.title,text:e.text}}),a("AppPreviewImage",{attrs:{title:"图片预览",list:e.imageList}})],1)},D=[],k={name:"MaintainCell",props:{title:{type:String,required:!0},text:{type:String,required:!0},imageList:{type:Array}}},E=k,j=Object(m["a"])(E,O,D,!1,null,null,null);j.options.__file="MaintainCell.vue";var q=j.exports,I=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("AppOutputTextarea",{attrs:{title:e.title,text:e.text}}),a("AppPreviewImage",{attrs:{title:"图片预览",list:e.imageList}})],1)},$=[],w={name:"FeedbackCell",props:{title:{type:String,required:!0},text:{type:String,required:!0},imageList:{type:Array}}},L=w,F=Object(m["a"])(L,I,$,!1,null,null,null);F.options.__file="FeedbackCell.vue";var S=F.exports,T=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("AppOutputTextarea",{attrs:{title:e.title,text:e.text}})],1)},W=[],M={name:"EvaluateCell",props:{title:{type:String,required:!0},text:{type:String,required:!0}}},B=M,H=Object(m["a"])(B,T,W,!1,null,null,null);H.options.__file="EvaluateCell.vue";var J=H.exports,P=a("2f62"),G=Object(P["a"])("workOrder"),z=G.mapGetters,K=G.mapActions,N={name:"WorkOrderInformation",components:{Layout:l["a"],WorkOrderCell:b,EquipmentCell:v["a"],ConnectCell:A,MaintainCell:q,FeedbackCell:S,EvaluateCell:J},computed:Object(i["a"])({},z(["information","device","connection","descibe","feedback","evaluate","descibeImage","feedbackImage"])),created:function(){var e=this.$route.params&&this.$route.params.id;this.getWorkOrder(e)},methods:Object(i["a"])({},K(["getWorkOrder"]))},Q=N,R=Object(m["a"])(Q,r,n,!1,null,null,null);R.options.__file="index.vue";t["default"]=R.exports},bd47:function(e,t,a){},e134:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("AppHeader",[e._t("header",[a("AppBackHeader",{attrs:{title:e.title}})])],2),e._t("default"),e.hideFooter?e._e():a("AppFooter")],2)},n=[],i={name:"Layout",props:{hideFooter:{type:Boolean,default:!1},title:{type:String}}},l=i,o=a("2877"),s=Object(o["a"])(l,r,n,!1,null,null,null);s.options.__file="index.vue";t["a"]=s.exports},e2cb:function(e,t,a){"use strict";var r=a("8721"),n=a.n(r);n.a}}]);
//# sourceMappingURL=chunk-08ab6566.86fe2a24.js.map