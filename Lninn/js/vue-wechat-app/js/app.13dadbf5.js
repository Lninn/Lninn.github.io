(function(e){function t(t){for(var a,r,u=t[0],s=t[1],o=t[2],l=0,f=[];l<u.length;l++)r=u[l],i[r]&&f.push(i[r][0]),i[r]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);d&&d(t);while(f.length)f.shift()();return c.push.apply(c,o||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],a=!0,r=1;r<n.length;r++){var u=n[r];0!==i[u]&&(a=!1)}a&&(c.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},r={app:0},i={app:0},c=[];function u(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-08ab6566":"86fe2a24","chunk-17c648f4":"480c167f","chunk-2d221c06":"b7c8181b","chunk-305eb17d":"a5ced9d2","chunk-534ff66a":"e2126cfe","chunk-5df94018":"7d912a53","chunk-6f5360c2":"b0f6a801","chunk-74d89fb3":"9edbe16d","chunk-777c8beb":"9a4e8eb2"}[e]+".js"}function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-08ab6566":1,"chunk-17c648f4":1,"chunk-305eb17d":1,"chunk-534ff66a":1,"chunk-5df94018":1,"chunk-6f5360c2":1,"chunk-74d89fb3":1,"chunk-777c8beb":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise(function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-08ab6566":"07b1f9b3","chunk-17c648f4":"55a1ba1b","chunk-2d221c06":"31d6cfe0","chunk-305eb17d":"9ceb4cd3","chunk-534ff66a":"3ef8d78b","chunk-5df94018":"0d814f6e","chunk-6f5360c2":"3c3933dd","chunk-74d89fb3":"fa5187cb","chunk-777c8beb":"f60be3d4"}[e]+".css",r=s.p+a,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var u=i[c],o=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(o===a||o===r))return t()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++){u=l[c],o=u.getAttribute("data-href");if(o===a||o===r)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var a=t&&t.target&&t.target.src||r,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.request=a,n(i)},f.href=r;var d=document.getElementsByTagName("head")[0];d.appendChild(f)}).then(function(){r[e]=0}));var a=i[e];if(0!==a)if(a)t.push(a[2]);else{var c=new Promise(function(t,n){a=i[e]=[t,n]});t.push(a[2]=c);var o,l=document.getElementsByTagName("head")[0],f=document.createElement("script");f.charset="utf-8",f.timeout=120,s.nc&&f.setAttribute("nonce",s.nc),f.src=u(e),o=function(t){f.onerror=f.onload=null,clearTimeout(d);var n=i[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,c=new Error("Loading chunk "+e+" failed.\n("+a+": "+r+")");c.type=a,c.request=r,n[1](c)}i[e]=void 0}};var d=setTimeout(function(){o({type:"timeout",target:f})},12e4);f.onerror=f.onload=o,l.appendChild(f)}return Promise.all(t)},s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s.oe=function(e){throw console.error(e),e};var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var f=0;f<o.length;f++)t(o[f]);var d=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("64a9"),r=n.n(a);r.a},"0f9a":function(e,t,n){"use strict";n.r(t);var a=n("ade3"),r=(n("7f7f"),n("b775")),i=function(e){return e.token&&localStorage.setItem("user",JSON.stringify(e)),e};function c(e){var t=JSON.stringify(e);return Object(r["a"])({url:"/users/register/",method:"POST",data:t}).then(i)}function u(e){var t=e.username,n=e.password,a=JSON.stringify({username:t,password:n});return Object(r["a"])({url:"/users/login",method:"POST",data:a}).then(i)}function s(){localStorage.removeItem("user")}var o=n("9fb0"),l=n("a18c"),f=n("57c4"),d=n.n(f),p=function(e){var t=JSON.parse(localStorage.getItem(e));return t?{status:{loggedIn:!0},user:t}:{status:{},user:null}},m=p("user"),v={loginName:function(e){return e.user.name},userType:function(e){return e.user.type}},b=Object(a["a"])({},o["i"],function(e,t){e.user=t}),h={authenticate:function(e,t){var n=e.commit,a=t.username,r=t.password;u({username:a,password:r}).then(function(e){n(o["i"],e),d.a.toast("登录成功",1500),l["a"].push("/")},function(e){d.a.topTips(e,{duration:1500})})},logout:function(){s(),l["a"].push("/")},register:function(e,t){var n=e.commit;c(t).then(function(e){n(o["i"],e),d.a.toast("注册成功",1500),l["a"].push("/")},function(e){d.a.topTips(e,{duration:1500})})},onRegister:function(){l["a"].push("/register")}};t["default"]={state:m,getters:v,mutations:b,actions:h}},"177f":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"weui-cells__title"},[e._v(e._s(e.title))]),n("div",{staticClass:"weui-cells weui-cells_form"},[n("div",{staticClass:"weui-cell"},[n("div",{staticClass:"weui-cell__bd app-input-textarea"},[n("textarea",e._g(e._b({attrs:{rows:"4"},domProps:{value:e.value}},"textarea",e.$attrs,!1),e.listeners)),n("div",{staticClass:"weui-textarea-counter"},[n("span",[e._v(e._s(e.wordsCount))]),e._v("/200")])])])])])},r=[],i=n("be94"),c=(n("6b54"),{name:"AppInputTextarea",inheritAttrs:!1,data:function(){return{value:null}},computed:{wordsCount:function(){return this.value?this.value.toString().length:0},listeners:function(){var e=this;return Object(i["a"])({},this.$listeners,{input:function(t){e.$emit("input",t.target.value)}})}},props:{title:{type:String,required:!0}}}),u=c,s=(n("b0f7"),n("2877")),o=Object(s["a"])(u,a,r,!1,null,null,null);o.options.__file="app-input-textarea.vue";t["default"]=o.exports},"24e6":function(e,t,n){},"2a1e":function(e,t,n){"use strict";n.r(t);var a=n("ade3"),r=(n("6762"),n("2fdb"),n("b775"));function i(){return Object(r["a"])({url:"/workorders/",method:"GET"})}function c(e){return Object(r["a"])({url:"/workorders/",method:"GET",params:{id:e}})}var u,s=n("ed08"),o=n("9fb0"),l={list:[],ItemState:"ALL",item:{information:[{name:"number",value:""},{name:"date",value:""}],device:[{name:"name",value:""},{name:"model",value:""},{name:"address",value:""},{name:"company",value:""}],connection:[{name:"name",value:""},{name:"phone",value:""}],descibe:"",descibeImage:[],feedback:"",feedbackImage:[],evaluate:""}},f={information:function(e){return e.item.information},device:function(e){return e.item.device},connection:function(e){return e.item.connection},descibe:function(e){return e.item.descibe},descibeImage:function(e){var t=e.item;if(t.descibeImage&&t.descibeImage.length)return t.descibeImage},feedback:function(e){return e.item.feedback},feedbackImage:function(e){var t=e.item;if(t.feedbackImage&&t.feedbackImage.length)return t.feedbackImage},evaluate:function(e){return e.item.evaluate},filterState:function(e){var t=e.ItemState;return"WAITING"===t?["INITIALIZED"]:"PROCESSING"===t?["RECEIVED","PROCESSING"]:"COMPLETED"===t?[t]:["ALL"]},filterList:function(e,t){var n=t.filterState,a=e.list.slice();return n&&(a=a.filter(function(e){return n.includes(e.state)||n.includes("ALL")})),a}},d=(u={},Object(a["a"])(u,o["j"],function(e,t){var n=t.list;e.list=n}),Object(a["a"])(u,o["k"],function(e,t){var n=t.item;Object(s["a"])(e.item,n)}),Object(a["a"])(u,o["h"],function(e,t){e.ItemState=t}),u),p={getWorkOrders:function(e){var t=e.commit;i().then(function(e){t(o["j"],{list:e.items})})},getWorkOrder:function(e,t){var n=e.commit;c(t).then(function(e){n(o["k"],{item:e})})}};t["default"]={state:l,actions:p,getters:f,mutations:d}},"2a74":function(e,t,n){"use strict";n.r(t);var a=n("be94"),r=(n("a481"),n("ac6a"),n("bba4")),i=n.n(r),c=n("d307"),u={};c.keys().forEach(function(e){if("./index.js"!==e){var t=i()(e.replace(/(\.\/|\.js)/g,""));u[t]=Object(a["a"])({namespaced:!0},c(e).default)}}),t["default"]=u},"2a8b":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"weui-cells__title"},[e._v(e._s(e.data.name))]),n("div",{staticClass:"weui-cells"},e._l(e.data.list,function(e){return n("AppCell",{key:e.name,attrs:{label:e.label,icon:e.icon,value:e.value}})}))])},r=[],i=n("b55e"),c={name:"AppImgTextCells",props:{data:{type:Object,required:!0}},components:{AppCell:i["default"]}},u=c,s=(n("5f41"),n("2877")),o=Object(s["a"])(u,a,r,!1,null,null,null);o.options.__file="app-img-text-cells.vue";t["default"]=o.exports},"35e1":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"weui-tabbar wx-bottom"},[3===e.userType?a("router-link",{staticClass:"weui-tabbar__item",attrs:{to:"/",exact:""}},[a("img",{staticClass:"weui-tabbar__icon",attrs:{src:n("d359")}}),a("p",{staticClass:"weui-tabbar__label"},[e._v("主页")])]):e._e(),a("router-link",{staticClass:"weui-tabbar__item",attrs:{to:"/workOrder"}},[a("img",{staticClass:"weui-tabbar__icon",attrs:{src:n("d359")}}),a("p",{staticClass:"weui-tabbar__label"},[e._v("工单")])]),a("router-link",{staticClass:"weui-tabbar__item",attrs:{to:"/user"}},[a("span",{staticStyle:{display:"inline-block",position:"relative"}},[a("img",{staticClass:"weui-tabbar__icon",attrs:{src:n("d359")}})]),a("p",{staticClass:"weui-tabbar__label"},[e._v("我的")])])],1)},r=[],i=n("be94"),c=n("2f62"),u={name:"AppFooter",computed:Object(i["a"])({},Object(c["d"])("user",["userType"]))},s=u,o=(n("de3b"),n("2877")),l=Object(o["a"])(s,a,r,!1,null,null,null);l.options.__file="app-footer.vue";t["default"]=l.exports},"3d48":function(e,t,n){},"41b5":function(e,t,n){"use strict";var a=n("d4fc"),r=n.n(a);r.a},"4b76":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("6b54"),n("cadf"),n("551c"),n("097d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container",attrs:{id:"app"}},[n("transition",[n("router-view")],1)],1)},i=[],c={name:"app"},u=c,s=(n("034f"),n("2877")),o=Object(s["a"])(u,r,i,!1,null,null,null);o.options.__file="App.vue";for(var l=o.exports,f=n("a18c"),d=(n("f5df"),n("0540"),n("c7d7"),n("455b"),n("e29a"),n("96eb")),p=n.n(d),m=(n("55dd"),n("7f7f"),n("ed08")),v=p.a.Random,b=[],h=10,g="我是测试数据",_=0;_<h;_++)b.push(p.a.mock({id:p.a.mock("@guid"),"name|1":["身份证自助取证机","身份证自助发证机","身份证自助受理机"],model:p.a.mock("@id()"),address:p.a.mock("@county(true)"),date:p.a.mock("@datetime()"),company:p.a.mock("@csentence(5)"),describe:g,img:v.dataImage("400x550","Hello Mock.js!")}));for(var k=[],w=0;w<3;w++)k.push({id:p.a.mock("@guid"),path:v.dataImage("750x860","Hello Mock.js!")});for(var y=[],C=0;C<3;C++)y.push({id:p.a.mock("@guid"),path:v.dataImage("1125x1467","Hello Mock.js!")});for(var O=function(e){for(var t=[],n=0;n<e;n++){var a={id:p.a.mock("@guid"),name:p.a.mock("@csentence(3, 5)"),text:p.a.mock("@cparagraph(1, 3)")};t.push(a)}return t},A=function(e){for(var t=[],n=0;n<e;n++){var a={id:p.a.mock("@guid"),title:p.a.mock("@csentence(5)"),children:O(Object(m["c"])(3,5))};t.push(a)}return t},S=function(){return{information:{name:p.a.mock("@csentence(5)"),model:p.a.mock("@id"),date:p.a.mock("@date()"),company:p.a.mock("@csentence(5)"),address:p.a.mock("@county(true)")},images:{titleList:k,mainList:y},parameters:A(Object(m["c"])(3,6))}},E={getList:function(e){var t=Object(m["d"])(e.url),n=t.name,a=t.page,r=void 0===a?1:a,i=t.limit,c=void 0===i?20:i,u=t.sort,s=b.filter(function(e){return!(n&&e.title.indexOf(n)<0)});"-id"===u&&(s=s.reverse());var o=s.filter(function(e,t){return t<c*r&&t>=c*(r-1)});return{ok:!0,text:JSON.stringify({total:s.length,items:o})}},getDevice:function(){return{ok:!0,text:JSON.stringify(S())}},maintainDevice:function(){var e={msg:"提交成功"};return{ok:!0,text:JSON.stringify(e)}}},x=p.a.Random,j=[],I=20,T=0;T<I;T++)j.push(p.a.mock({id:p.a.mock("@guid"),workorderNumber:p.a.mock("@id"),deviceNumber:p.a.mock("@id"),"state|1":["INITIALIZED","RECEIVED","PROCESSING","COMPLETED"],date:p.a.mock("@datetime()"),image:x.dataImage("400x550","Hello Mock.js!")}));var D=function(){return{date:p.a.mock("@datetime()"),number:p.a.mock("@id()")}},P=function(){return{address:p.a.mock("@county(true)"),company:p.a.mock("@cword(3, 5)"),model:p.a.mock("@id()"),name:p.a.mock("@cword(3, 5)")}},L=function(){return{name:p.a.mock("@cword(3)"),phone:x.string("number",11)}},M=function(e){for(var t=[],n=0;n<e;n++)t.push({id:p.a.mock("@id()"),path:x.dataImage("400x550","Hello Mock.js!")});return t},N={getList:function(e){var t=Object(m["d"])(e.url),n=t.title,a=t.page,r=void 0===a?1:a,i=t.limit,c=void 0===i?20:i,u=t.sort,s=j.filter(function(e){return!(n&&e.title.indexOf(n)<0)});"-id"===u&&(s=s.reverse());var o=s.filter(function(e,t){return t<c*r&&t>=c*(r-1)});return{ok:!0,text:JSON.stringify({total:s.length,items:o})}},getWorkOrder:function(){var e={information:D(),device:P(),connection:L(),descibe:p.a.mock("@cparagraph()"),descibeImage:M(4),feedback:p.a.mock("@cparagraph()"),feedbackImage:M(4),evaluate:p.a.mock("@csentence")};return{ok:!0,text:JSON.stringify(e)}}},R=p.a.Random,J=JSON.parse(localStorage.getItem("users"))||[],q=p.a.mock({id:p.a.mock("@guid"),name:p.a.mock("@csentence(3)"),username:p.a.mock("@id()"),address:p.a.mock("@county(true)"),phone:R.string("number",11),img:R.dataImage("400x550","My Avator!"),organize:p.a.mock("@csentence(5)"),lastLogin:p.a.mock("@datetime()"),token:"fake-jwt-token"}),B={getProfile:function(){return q},register:function(e){var t=JSON.parse(e.body),n=J.filter(function(e){return e.username===t.username}).length;return n?'Username "'+t.username+'" is already taken':(t.id=p.a.mock("@guid"),t["token"]="fake-jwt-token",t["lastTime"]=new Date,J.push(t),localStorage.setItem("users",JSON.stringify(J)),{ok:!0,text:JSON.stringify(t)})},login:function(e){var t=JSON.parse(e.body),n=J.filter(function(e){return e.username===t.username&&e.password===t.password});if(n.length){var a=n[0],r={id:a.id,username:a.username,type:a.type,name:a.name,phone:a.phone,address:a.address,token:"fake-jwt-token",lastTime:new Date};return{ok:!0,text:JSON.stringify(r)}}return{ok:!1,message:"用户名或者密码错误"}}};p.a.XHR.prototype.proxy_send=p.a.XHR.prototype.send,p.a.XHR.prototype.send=function(){this.custom.xhr&&(this.custom.xhr.withCredentials=this.withCredentials||!1),this.proxy_send.apply(this,arguments)},p.a.setup({timeout:"350-600"}),p.a.mock(/\/users\/profile/,"get",B.getProfile),p.a.mock(/\/users\/register/,"post",B.register),p.a.mock(/\/users\/login/,"post",B.login),p.a.mock(/\/devices\/$/,"get",E.getList),p.a.mock(/\/devices\/*/,"get",E.getDevice),p.a.mock(/\/maintain\//,"post",E.maintainDevice),p.a.mock(/\/workorders\/$/,"get",N.getList),p.a.mock(/\/workorders\/*/,"get",N.getWorkOrder);p.a;var H=n("2f62"),U=n("2a74");a["a"].use(H["b"]);var G=!1,K=new H["b"].Store({modules:U["default"],strict:G}),F=(n("a481"),n("ac6a"),n("8103")),$=n.n(F),z=n("bba4"),Y=n.n(z),V=n("c137");V.keys().forEach(function(e){var t=V(e),n=$()(Y()(e.replace(/^\.\//,"").replace(/\.\w+$/,"")));a["a"].component(n,t.default||t)}),a["a"].config.productionTip=!0,a["a"].filter("capitalize",function(e){return e?(e=e.toString(),e.charAt(0).toUpperCase()+e.slice(1)):""}),new a["a"]({render:function(e){return e(l)},router:f["a"],store:K}).$mount("#app")},"5f41":function(e,t,n){"use strict";var a=n("ce33"),r=n.n(a);r.a},"63ae":function(e,t,n){"use strict";var a=n("e80d"),r=n.n(a);r.a},"64a9":function(e,t,n){},"66b8":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"weui-cell"},[n("div",{staticClass:"weui-cell__hd"},[n("label",{staticClass:"weui-label"},[n("i",{staticClass:"iconfont"},[e._v(e._s(e.icon))])])]),n("div",{staticClass:"weui-cell__bd"},[n("input",e._g(e._b({staticClass:"weui-input",domProps:{value:e.value}},"input",e.$attrs,!1),e.listeners))])])},r=[],i=n("be94"),c={name:"AppInput",inheritAttrs:!1,props:{icon:{type:String,required:!0},value:{required:!1}},computed:{listeners:function(){var e=this;return Object(i["a"])({},this.$listeners,{input:function(t){e.$emit("input",t.target.value)}})}}},u=c,s=n("2877"),o=Object(s["a"])(u,a,r,!1,null,null,null);o.options.__file="app-input.vue";t["default"]=o.exports},7061:function(e,t,n){},7095:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"weui-gallery",style:e.previewStyle,on:{click:function(t){e.isPreview=!1}}},[n("span",{staticClass:"weui-gallery__img",style:{backgroundImage:"url("+e.currentImage.path+")"}})]),n("div",{staticClass:"weui-cells weui-cells_form"},[n("div",{staticClass:"weui-cell"},[n("div",{staticClass:"weui-cell__bd"},[n("div",{staticClass:"weui-uploader"},[n("div",{staticClass:"weui-uploader__hd"},[n("p",{staticClass:"weui-uploader__title"},[e._v(e._s(e.title))]),n("div",{staticClass:"weui-uploader__info"})]),n("div",{staticClass:"weui-uploader__bd"},e._l(e.list,function(t,a){return n("ul",{key:a,staticClass:"weui-uploader__files"},[n("li",{staticClass:"weui-uploader__file",style:{backgroundImage:"url("+t.path+")"},on:{click:function(n){e.preview(t)}}})])}))])])])])])},r=[],i={name:"AppPreviewImage",props:{title:{type:String,required:!0},list:{type:Array}},data:function(){return{isPreview:!1,currentImage:""}},computed:{previewStyle:function(){return this.isPreview?{display:"block"}:{display:"none"}}},methods:{preview:function(e){this.isPreview=!0,this.currentImage=e}}},c=i,u=n("2877"),s=Object(u["a"])(c,a,r,!1,null,null,null);s.options.__file="app-preview-image.vue";t["default"]=s.exports},"72e4":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"weui-panel weui-panel_access",staticStyle:{"margin-top":"3rem"}},[n("div",{staticClass:"weui-panel__bd"},[n("div",{staticClass:"swiper-container"},[n("div",{staticClass:"swiper-wrapper"},[e._l(e.imageList,function(e){return[n("div",{key:e.id,staticClass:"swiper-slide swiper-items"},[n("img",{attrs:{id:e.id,src:e.path}})])]})],2),e._m(0),n("div",{staticClass:"swiper-button-prev hide-arrow",attrs:{tabindex:"0",role:"button","aria-label":"Previous slide"}}),n("div",{staticClass:"swiper-button-next hide-arrow",attrs:{tabindex:"0",role:"button","aria-label":"Next slide"}}),n("div",{staticClass:"swiper-scrollbar"}),n("span",{staticClass:"swiper-notification",attrs:{"aria-live":"assertive","aria-atomic":"true"}})])])])},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"swiper-pagination swiper-pagination-bullets"},[n("span",{staticClass:"swiper-pagination-bullet swiper-pagination-bullet-active"})])}],i=n("41d6"),c={name:"AppSwiper",props:{imageList:{type:Array,required:!0}},updated:function(){new i["a"](".swiper-container",{direction:"horizontal",loop:!0,autoplay:{delay:2500,disableOnInteraction:!1},pagination:{el:".swiper-pagination"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}},u=c,s=(n("63ae"),n("2877")),o=Object(s["a"])(u,a,r,!1,null,null,null);o.options.__file="app-swiper.vue";t["default"]=o.exports},7762:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-button"},[n("a",{staticClass:"weui-btn weui-btn_primary",attrs:{href:"javascript:;"},on:{click:e.onClick}},[e._v(e._s(e.text))])])},r=[],i={name:"AppLargeButton",props:{text:{type:String,default:"CLICK"}},methods:{onClick:function(){this.$emit("onClick")}}},c=i,u=(n("a818"),n("2877")),s=Object(u["a"])(c,a,r,!1,null,null,null);s.options.__file="app-large-button.vue";t["default"]=s.exports},9618:function(e,t,n){},"9f51":function(e,t,n){"use strict";var a=n("9618"),r=n.n(a);r.a},"9fb0":function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r}),n.d(t,"d",function(){return i}),n.d(t,"e",function(){return c}),n.d(t,"g",function(){return u}),n.d(t,"f",function(){return s}),n.d(t,"c",function(){return o}),n.d(t,"j",function(){return l}),n.d(t,"k",function(){return f}),n.d(t,"h",function(){return d}),n.d(t,"i",function(){return p});var a="SET_DEVICES_LIST",r="SET_DEVICE_ITEM",i="SET_FORMDATA_CONNECT",c="SET_FORMDATA_DETAIL",u="SET_FORMDATA_REMARK",s="SET_FORMDATA_FILES",o="SET_FORMDATA_CLEAR",l="SET_WORKORDERS_LIST",f="SET_WORKORDER_ITEM",d="SET_ITEMSTATE",p="SET_USER_PROFILE"},a18c:function(e,t,n){"use strict";n.d(t,"a",function(){return i});n("6762"),n("cadf"),n("551c"),n("097d");var a=n("2b0e"),r=n("8c4f");a["a"].use(r["a"]);var i=new r["a"]({scrollBehavior:function(){return{y:0}},mode:"hash",routes:[{path:"/",name:"home",component:function(){return n.e("chunk-534ff66a").then(n.bind(null,"16c0"))}},{path:"/login",name:"login",component:function(){return n.e("chunk-74d89fb3").then(n.bind(null,"d9c9"))}},{path:"/register",name:"register",component:function(){return n.e("chunk-2d221c06").then(n.bind(null,"cc4d"))}},{path:"/devices/:id",name:"detail",component:function(){return n.e("chunk-17c648f4").then(n.bind(null,"8ed7"))}},{path:"/maintain/:id",name:"maintain",component:function(){return n.e("chunk-6f5360c2").then(n.bind(null,"0154"))}},{path:"/user",name:"user",component:function(){return n.e("chunk-5df94018").then(n.bind(null,"926c"))}},{path:"/user/profile",name:"profile",component:function(){return n.e("chunk-777c8beb").then(n.bind(null,"c59e"))}},{path:"/workOrder",name:"workOrder",component:function(){return n.e("chunk-305eb17d").then(n.bind(null,"a96e"))}},{path:"/workorders/:id",name:"workOrderDetail",component:function(){return n.e("chunk-08ab6566").then(n.bind(null,"b9d9"))}}]});i.beforeEach(function(e,t,n){var a=["/login","/register"],r=!a.includes(e.path),i=localStorage.getItem("user");if(r&&!i)return n("/login");n()})},a426:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"weui-cells__title"},[e._v(e._s(e.title))]),n("div",{staticClass:"weui-cells weui-cells_form"},[n("div",{staticClass:"weui-cell"},[n("div",{staticClass:"weui-cell__bd app-output-textarea"},[n("p",[e._v(e._s(e.text))])])])])])},r=[],i={name:"AppOutputTextarea",props:{title:{type:String,required:!0},text:{type:String,required:!0}}},c=i,u=(n("ce60"),n("2877")),s=Object(u["a"])(c,a,r,!1,null,null,null);s.options.__file="app-output-textarea.vue";t["default"]=s.exports},a69e:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"weui-cell"},[n("div",{staticClass:"weui-cell__hd"}),n("div",{staticClass:"weui-cell__bd"},[n("div",{staticClass:"weui-cells select"},[n("div",{staticClass:"weui-cell weui-cell_select"},[n("div",{staticClass:"weui-cell__bd"},[n("select",e._g({staticClass:"weui-select",domProps:{value:e.currentState}},e.listeners),[n("option",{attrs:{selected:"",value:"ALL"}},[e._v("工单列表")]),n("option",{attrs:{value:"WAITING"}},[e._v("等待处理")]),n("option",{attrs:{value:"PROCESSING"}},[e._v("正在处理")]),n("option",{attrs:{value:"COMPLETED"}},[e._v("处理完成")])])])])])])])},r=[],i=n("be94"),c={name:"AppSelect",props:{currentState:{type:String,required:!0,default:"ALL"}},computed:{listeners:function(){var e=this;return Object(i["a"])({},this.$listeners,{change:function(t){e.$emit("changeState",t.target.value)}})}}},u=c,s=(n("9f51"),n("2877")),o=Object(s["a"])(u,a,r,!1,null,"91a69bcc",null);o.options.__file="app-select.vue";t["default"]=o.exports},a818:function(e,t,n){"use strict";var a=n("24e6"),r=n.n(a);r.a},b0f7:function(e,t,n){"use strict";var a=n("4b76"),r=n.n(a);r.a},b1ad:function(e,t,n){"use strict";var a=n("e9fc"),r=n.n(a);r.a},b55e:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"weui-cell"},[n("div",{staticClass:"weui-cell__hd"},[n("i",{staticClass:"iconfont"},[e._v(e._s(e.icon))])]),n("div",{staticClass:"weui-cell__bd"},[n("span",[e._v(e._s(e.label))])]),n("div",{staticClass:"weui-cell__ft"},[e._v("\n        "+e._s(e.value)+"\n    ")])])},r=[],i={name:"AppCell",props:{label:{type:String,required:!0},icon:{type:String,required:!0},value:{type:String,required:!0}}},c=i,u=n("2877"),s=Object(u["a"])(c,a,r,!1,null,null,null);s.options.__file="app-cell.vue";t["default"]=s.exports},b57e:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"weui-cell wx-header-back"},[n("div",{staticClass:"weui-cell__hd"},[e.showBtn?n("a",{attrs:{href:"javascript:;"},on:{click:e.back}},[n("i",{staticClass:"iconfont"},[e._v("")]),e._v("返回\n        ")]):e._e()]),n("div",{staticClass:"weui-cell__bd",class:e.textAlign},[n("p",[e._v(e._s(e.title))])]),n("div",{staticClass:"weui-cell__ft"},[e._t("default")],2)])},r=[],i={name:"AppBackHeader",props:{title:{type:String,required:!0},showBtn:{type:Boolean,default:!0}},computed:{textAlign:function(){return this.showBtn?"text-align":""}},methods:{back:function(){this.$router.back()}}},c=i,u=(n("f6da"),n("2877")),s=Object(u["a"])(c,a,r,!1,null,null,null);s.options.__file="app-back-header.vue";t["default"]=s.exports},b775:function(e,t,n){"use strict";var a=n("bc3a"),r=n.n(a),i=r.a.create({baseURL:Object({NODE_ENV:"production",BASE_URL:""}).BASE_API,timeout:5e3});i.interceptors.response.use(function(e){var t=e.data,n=t.text&&JSON.parse(t.text);if(!t.ok){401===e.status&&location.reload(!0);var a=t&&t.message||e.statusText;return Promise.reject(a)}return n},function(e){return Promise.reject(e)}),t["a"]=i},ba6e:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-button-plain"},[n("a",{staticClass:"weui-btn weui-btn_mini weui-btn_default",attrs:{href:"javascript:;"},on:{click:e.onClick}},[e._v(e._s(e.text))])])},r=[],i={name:"AppSmallButton",props:{text:{type:String,default:"CLICK"}},methods:{onClick:function(){this.$emit("onClick")}}},c=i,u=(n("b1ad"),n("2877")),s=Object(u["a"])(c,a,r,!1,null,null,null);s.options.__file="app-small-button.vue";t["default"]=s.exports},c137:function(e,t,n){var a={"./app-back-header.vue":"b57e","./app-cell.vue":"b55e","./app-footer.vue":"35e1","./app-header.vue":"daaa","./app-img-text-cells.vue":"2a8b","./app-input-textarea.vue":"177f","./app-input.vue":"66b8","./app-large-button.vue":"7762","./app-output-textarea.vue":"a426","./app-preview-image.vue":"7095","./app-select.vue":"a69e","./app-small-button.vue":"ba6e","./app-swiper.vue":"72e4"};function r(e){var t=i(e);return n(t)}function i(e){var t=a[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}r.keys=function(){return Object.keys(a)},r.resolve=i,e.exports=r,r.id="c137"},c8e5:function(e,t,n){},ce33:function(e,t,n){},ce60:function(e,t,n){"use strict";var a=n("7061"),r=n.n(a);r.a},d307:function(e,t,n){var a={"./devices.js":"fb9c","./index.js":"2a74","./user.js":"0f9a","./workOrder.js":"2a1e"};function r(e){var t=i(e);return n(t)}function i(e){var t=a[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}r.keys=function(){return Object.keys(a)},r.resolve=i,e.exports=r,r.id="d307"},d359:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAMAAAC7m5rvAAAAllBMVEUAAAC/v7+qqqrHx8evr6/ExMS5ubmxsbGsrKysrKytra2pqam8vLy9vb2lpaXExMT////s7Oz8/Pz09PTu7u729vb5+fnp6enMzMzLy8vm5ub4+Pjj4+O3t7fx8fHb29vAwMDHx8ePj4/S0tLf39+rq6ulpaWSkpK7u7vY2NjR0dGnp6eenp6ampqysrLPz8+fn5+ioqKXtObzAAAAEHRSTlMA6wT4/e/f0KyZSy/z8mz4uKbH2gAAA6FJREFUSMellody2zAMhuXEGU6TVBgkbGp529np+79cKREUpbrxdfxnn7g+cYACkKku7m5vricPl4v5Yq5arWLJN14+TK5vbu8udLhCsyuHeY6QD0Q0rEHb765mA/DbJIw4j4XGybdIPV5q13lMC9NHnWvKpxhiAVBYPMX4ezffxSQnHmFoahFgkRpEmHCEMeWTdn8zygOnmAVhkxZZ1AImYdyOnvnJrrohrBiymF/3ZgGsYty1XV1kdy6MATKGnJRgoiAVuRRH/inhTe4uu9U1Q8MMmy0nOcdJ5bMwbEs9g9vsJg8yjq2UXxugdJYBtHKTXUeM64bO2c00bGP/dTbBIAIBERyIaFgTASHQyiS7hyC3KaHcQNSm2r2+vbwvBFRt91OjlfssXizZ+q2WjN3yqvXrcfWxmS/362lYGJfYjQm6zBah4InWbtRyy3UlGPaGvDxU6B8EvqVo9NgX2TwUGDosJzb7vQyPBHafxNSZ2zq9hXOdzYoJWM6Hyo5P0h4PkAcMwI5mAxOx/bvgGEOpfqBihoezoeSKLffWAA4xBLIvS8VywYR5RjFaix8PmDBs77+sa8XYDDA2ilVV9xbAiCF0cFUpZniASa6Yn0y5aICO8tMplkvCMGKbV8x7jqhbYSf8fI4YJgwUq46+FjmillIdK8UgYQUrtlvliaspUflqpxgXHbYiIhD/d77w+kG9oGkg1T5eiYhLImkbV2PsbUO96qcnStq8jbCwyFoX+TJPjhK8kpucv+gi66LfmwXF3peJMkQmcct3xcCeGmCxx55qDdBzuF8kA5yYW9bcUy3Wc7x2p+bOuQgYTJdKxctVBG65g4AVMMCoVgwOECjFlOMDKFbTbz+camcRilwxvS84rX79cPQztYrh51HM+DMtZPmGilkYOQUDiuX1iVPA44F7p2DGLghYZwP+8SJDjKdvADqbg+SCOtmyw9p94anDKwCDw7Pq8JJ7LduTga69rtaf0b3uIJyneAySe32AIPdc+r8D1bM6c23oulzvzB9S6BDnf1+HDifkUugYBCrT1OcCVd1QClQpLALQubDoHAGlsBiDMG3J0pMUthdzKhfw5LtLiUE4hnx0AgDNtnEQVZYQ5XyHf8jWasjXBAPBxgQDziQYFqwmGNmMlIrpDH+ZzihHs5A8+co4eeKUPEFKngKHIXnKvn0H++epmoWppoaP079JDL8//lsa+p9Jb0qx77sUexG0WmmhS7HvRyn2TxZ1zUyK+LY0AAAAAElFTkSuQmCC"},d4fc:function(e,t,n){},daaa:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"weui-cells app-header"},[e._t("default",[e._v("Defalut Header")])],2)},r=[],i={name:"AppHeader"},c=i,u=(n("41b5"),n("2877")),s=Object(u["a"])(c,a,r,!1,null,null,null);s.options.__file="app-header.vue";t["default"]=s.exports},de3b:function(e,t,n){"use strict";var a=n("c8e5"),r=n.n(a);r.a},e29a:function(e,t,n){},e80d:function(e,t,n){},e9fc:function(e,t,n){},ed08:function(e,t,n){"use strict";n.d(t,"d",function(){return a}),n.d(t,"b",function(){return r}),n.d(t,"c",function(){return i}),n.d(t,"e",function(){return c}),n.d(t,"a",function(){return u});n("456d"),n("5df3"),n("1c4c"),n("ac6a"),n("f751"),n("7f7f"),n("55dd"),n("a481"),n("28a5");function a(e){var t=e.split("?")[1];return t?JSON.parse('{"'+decodeURIComponent(t).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=e.slice().sort(function(e,t){return e.name[0].localeCompare(t.name[0])}),a=t.slice().sort(function(e,t){return e.name[0].localeCompare(t.name[0])}),r=n.map(function(e,t){return Object.assign({},e,a[t])});return r}function i(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}function c(e,t){e.classList.add(t),Array.from(e.parentNode.children).forEach(function(t){t!==e&&t.classList.remove("weui-bar__item_on")})}function u(e,t){var n=Object.keys(e);n.forEach(function(n){var a=e[n];Array.isArray(a)&&0!==a.length?a.map(function(e){return e.value=t[n][e.name],e}):e[n]=t[n]})}},f6da:function(e,t,n){"use strict";var a=n("3d48"),r=n.n(a);r.a},fb9c:function(e,t,n){"use strict";n.r(t);var a,r=n("ade3"),i=(n("456d"),n("ac6a"),n("7f7f"),n("7514"),n("9fb0")),c=n("57c4"),u=n.n(c),s=n("b775");function o(){return Object(s["a"])({url:"/devices/",method:"GET"})}function l(e){return Object(s["a"])({url:"/devices/",method:"GET",params:{id:e}})}function f(e){return Object(s["a"])({url:"/maintain/",method:"POST",data:e})}var d={list:[],item:{images:{},information:{},parameters:[]},formData:{connection:null,detail:null,remark:null,files:null}},p={imageList:function(e){return function(t){var n=e.item.images;return e.item.images.hasOwnProperty(t)?n[t]:[]}},information:function(e){return e.item.information},parameters:function(e){return e.item.parameters},getItemById:function(e){return function(t){return e.list.find(function(e){return e.id===t})}},validForm:function(e){return e.formData.connection?!!e.formData.detail||(u.a.topTips("请输入故障描述",{duration:1500}),!1):(u.a.topTips("请输入联系方式",{duration:1500}),!1)},getPostData:function(e){var t=new URLSearchParams,n=e.formData,a=n.connection,r=n.detail,i=n.remark,c=n.files;if(t.append("name",a.name),t.append("phone",a.phone),t.append("descibe",r),t.append("remark",i),c&&c.length)for(var u=0,s=c.length;u<s;u++)t.append("file-image"+u,c);return t}},m=(a={},Object(r["a"])(a,i["a"],function(e,t){var n=t.list;e.list=n}),Object(r["a"])(a,i["b"],function(e,t){var n=t.item;e.item=n}),Object(r["a"])(a,i["d"],function(e,t){e.formData.connection=t}),Object(r["a"])(a,i["e"],function(e,t){e.formData.detail=t}),Object(r["a"])(a,i["g"],function(e,t){e.formData.remark=t}),Object(r["a"])(a,i["f"],function(e,t){e.formData.files=t}),Object(r["a"])(a,i["c"],function(e){Object.keys(e.formData).forEach(function(t){e.formData[t]=null})}),a),v={getDevices:function(e){var t=e.commit;o().then(function(e){t("SET_DEVICES_LIST",{list:e.items})})},getDevice:function(e,t){var n=e.commit;l(t).then(function(e){n("SET_DEVICE_ITEM",{item:e})})},submit:function(e){var t=e.getters,n=e.commit;return new Promise(function(e,a){f(t.getPostData).then(function(t){n(i["c"]),e(t)}).catch(function(e){return a(e)})})}};t["default"]={state:d,actions:v,getters:p,mutations:m}}});
//# sourceMappingURL=app.13dadbf5.js.map