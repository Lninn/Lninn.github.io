webpackJsonp([9],{uuQS:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("div",{staticClass:"crumbs"},[l("el-breadcrumb",{attrs:{separator:"/"}},[l("el-breadcrumb-item",[l("i",{staticClass:"el-icon-date"}),e._v("Element-UI表单")]),e._v(" "),l("el-breadcrumb-item",[e._v("基本表单")])],1)],1),e._v(" "),l("div",{staticClass:"form-box"},[l("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[l("el-form-item",{attrs:{label:"表单名称"}},[l("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"选择器"}},[l("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.region,callback:function(t){e.$set(e.form,"region",t)},expression:"form.region"}},[l("el-option",{key:"bbk",attrs:{label:"步步高",value:"bbk"}}),e._v(" "),l("el-option",{key:"xtc",attrs:{label:"小天才",value:"xtc"}}),e._v(" "),l("el-option",{key:"imoo",attrs:{label:"imoo",value:"imoo"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"日期时间"}},[l("el-col",{attrs:{span:11}},[l("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期"},model:{value:e.form.date1,callback:function(t){e.$set(e.form,"date1",t)},expression:"form.date1"}})],1),e._v(" "),l("el-col",{staticClass:"line",attrs:{span:2}},[e._v("-")]),e._v(" "),l("el-col",{attrs:{span:11}},[l("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"fixed-time",placeholder:"选择日期"},model:{value:e.form.date2,callback:function(t){e.$set(e.form,"date2",t)},expression:"form.date2"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"单选框"}},[l("el-radio-group",{model:{value:e.form.resource,callback:function(t){e.$set(e.form,"resource",t)},expression:"form.resource"}},[l("el-radio",{attrs:{label:"步步高"}}),e._v(" "),l("el-radio",{attrs:{label:"小天才"}}),e._v(" "),l("el-radio",{attrs:{label:"imoo"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"文本框"}},[l("el-input",{attrs:{type:"textarea"},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}})],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("提交")]),e._v(" "),l("el-button",[e._v("取消")])],1)],1)],1)])},staticRenderFns:[]},r=l("VU/8")({data:function(){return{form:{name:"",region:"",date1:"",date2:"",delivery:!0,type:["步步高"],resource:"小天才",desc:""}}},methods:{onSubmit:function(){this.$message.success("提交成功！")}}},a,!1,null,null,null);t.default=r.exports}});
//# sourceMappingURL=9.dfd0ef19cc26ba95bcd7.js.map