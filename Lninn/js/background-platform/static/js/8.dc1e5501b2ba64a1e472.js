webpackJsonp([8],{JDjH:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("7+uW"),l={name:"My Tree",children:[{name:"hello"},{name:"wat"},{name:"child folder",children:[{name:"child folder",children:[{name:"hello"},{name:"wat"}]},{name:"hello"},{name:"wat"},{name:"child folder",children:[{name:"hello"},{name:"wat"}]}]}]};i.default.component("item",{template:"#item-template",props:{model:Object},data:function(){return{open:!1}},computed:{isFolder:function(){return this.model.children&&this.model.children.length}},methods:{toggle:function(){this.isFolder&&(this.open=!this.open)},changeType:function(){this.isFolder||(i.default.set(this.model,"children",[]),this.addChild(),this.open=!0)},addChild:function(){this.model.children.push({name:"new stuff"})}}}),new i.default({data:function(){return{treeData:l}}}).$mount("#demo");var a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("ul",{attrs:{id:"demo"}},[t("item",{staticClass:"item",attrs:{model:this.treeData}})],1)])},staticRenderFns:[]};var d=n("VU/8")(void 0,a,!1,function(e){n("rx/7")},"data-v-030575c2",null);t.default=d.exports},"rx/7":function(e,t){}});
//# sourceMappingURL=8.dc1e5501b2ba64a1e472.js.map