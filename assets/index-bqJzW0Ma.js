import{s as N,j as t,E as M}from"./index-XHlQqMK0.js";import{b as c,R as w}from"./vendor-C_ovgAfI.js";import{c as T,f as W}from"./utils-CWHH1IbV.js";import{M as A}from"./index-2v3-59hQ.js";import{z as H}from"./zh-CN-CCt-M6vz.js";import{b as U}from"./bookmark-1XO1abH1.js";const P=T(e=>({list:[],fetchBookmarks:async()=>{const{data:s,error:r}=await N.from("bookmark").select("*").order("create_at",{ascending:!1});if(r){console.error("Failed to fetch bookmark data:",r);return}e({list:s})}})),V=async e=>{var s,r,n,o;try{const i="https://api.allorigins.win/get?url="+encodeURIComponent(e),m=await(await fetch(i)).json();if(!m.contents)throw new Error("无法获取网站内容");const u=new DOMParser().parseFromString(m.contents,"text/html");let a=((s=u.querySelector("title"))==null?void 0:s.textContent)||"";a||(a=((r=u.querySelector('meta[property="og:title"]'))==null?void 0:r.getAttribute("content"))||"");let l="";const g=u.querySelector('link[rel="icon"]')||u.querySelector('link[rel="shortcut icon"]');g&&(l=new URL(g.getAttribute("href"),e).href),l||(l=`https://www.google.com/s2/favicons?domain=${e}`);let x=((n=u.querySelector('meta[name="keywords"]'))==null?void 0:n.getAttribute("content"))||"",y=((o=u.querySelector('meta[name="description"]'))==null?void 0:o.getAttribute("content"))||"",b=G(x+" "+y)||D(new URL(e).hostname);return{title:a||R(e),icon:l,suggestedCategory:b}}catch(i){return console.error("获取网站信息失败:",i),K(e)}},G=(e="")=>{const s=e.toLowerCase(),r={技术:["programming","developer","coding","编程","开发","技术"],新闻:["news","daily","report","新闻","资讯"],购物:["shop","store","buy","price","商城","购物"],教育:["learn","course","education","study","教育","学习"],娱乐:["game","entertainment","movie","music","游戏","电影","音乐"],社交:["social","community","forum","社区","论坛"]};for(const[n,o]of Object.entries(r))if(o.some(i=>s.includes(i)))return n;return null},R=e=>{try{const s=new URL(e).hostname;return s.split(".")[0].charAt(0).toUpperCase()+s.split(".")[0].slice(1)}catch{return e}},K=e=>{try{const s=new URL(e).hostname;return{title:R(e),icon:`https://www.google.com/s2/favicons?domain=${e}`,suggestedCategory:D(s)}}catch{throw new Error("无效的URL格式")}},D=e=>{const s={github:"开发工具",stackoverflow:"开发工具",youtube:"视频",bilibili:"视频",google:"搜索",baidu:"搜索",zhihu:"社交",weibo:"社交",twitter:"社交",facebook:"社交",instagram:"社交",amazon:"购物",taobao:"购物",jd:"购物"};for(const[r,n]of Object.entries(s))if(e.includes(r))return n;return"其他"},_=(e,s)=>{const r=e.toLowerCase().replace(/\/$/,"");return s.some(n=>n.url.toLowerCase().replace(/\/$/,"")===r)};function J({formData:e,setFormData:s,categories:r,onSubmit:n,onCancel:o}){const[i,p]=c.useState(!1),[m,d]=c.useState(!1);c.useEffect(()=>{const a=l=>{i&&!l.target.closest(".category-select-container")&&p(!1)};return document.addEventListener("mousedown",a),()=>document.removeEventListener("mousedown",a)},[i]);const u=async a=>{if(a.preventDefault(),!m){d(!0);try{await n(e)}catch{throw new Error("添加书签失败")}finally{d(!1)}}};return t.jsxs("form",{onSubmit:u,className:"bookmark-form",children:[t.jsx("h3",{children:"书签信息"}),t.jsxs("div",{className:"form-group",children:[t.jsx("label",{children:"名称"}),t.jsx("input",{type:"text",value:e.name,onChange:a=>s(l=>({...l,name:a.target.value})),placeholder:"书签名称",required:!0})]}),t.jsxs("div",{className:"form-group",children:[t.jsx("label",{children:"分类"}),t.jsxs("div",{className:"category-select-container",children:[t.jsx("input",{type:"text",value:e.category,onChange:a=>s(l=>({...l,category:a.target.value})),onFocus:()=>p(!0),placeholder:"选择或输入新分类",required:!0}),i&&r.length>0&&t.jsx("div",{className:"category-dropdown",children:r.map((a,l)=>t.jsx("div",{className:`category-option ${e.category===a?"selected":""}`,onClick:()=>{s(g=>({...g,category:a})),p(!1)},children:a},l))})]})]}),t.jsxs("div",{className:"form-group",children:[t.jsx("label",{children:"图标"}),t.jsxs("div",{className:"icon-input-container",children:[t.jsx("input",{type:"text",value:e.icon,onChange:a=>s(l=>({...l,icon:a.target.value})),placeholder:"图标URL"}),e.icon&&t.jsx("div",{className:"icon-preview",children:t.jsx("img",{src:e.icon,alt:"网站图标",onError:a=>a.target.src="/fallback-icon.svg"})})]})]}),t.jsxs("div",{className:"modal-actions",children:[t.jsx("button",{type:"button",className:"cancel-button",onClick:o,disabled:m,children:"取消"}),t.jsx("button",{type:"submit",className:`submit-button ${m?"loading":""}`,disabled:m,children:m?"添加中...":"添加书签"})]})]})}function Q({analyzing:e,analysisStep:s,analysisError:r,urlExists:n}){const o=["开始分析","验证URL格式","获取网站元数据","处理分析结果","分析完成"];return t.jsxs(t.Fragment,{children:[e&&t.jsxs("div",{className:"analysis-status",children:[t.jsx("h3",{children:"正在分析网站..."}),t.jsx("div",{className:"analysis-steps",children:o.map((i,p)=>t.jsxs("div",{className:`analysis-step ${s===i?"active":""} ${o.indexOf(i)<o.indexOf(s)?"complete":""}`,children:[t.jsx("div",{className:"step-indicator",children:p+1}),t.jsx("div",{className:"step-label",children:i})]},p))})]}),n&&t.jsxs("div",{className:"analysis-error",children:[t.jsx("p",{children:"该URL已存在于您的书签中"}),t.jsx("p",{className:"error-tip",children:"提示：您可以在书签列表中查找此网站。"})]}),r&&!n&&t.jsxs("div",{className:"analysis-error",children:[t.jsx("p",{children:r}),t.jsx("p",{className:"error-tip",children:"提示：请检查网址是否正确，或稍后再试。"})]})]})}function X({onClose:e,onSubmit:s}){const{list:r}=P(),[n,o]=c.useState(""),[i,p]=c.useState({url:"",name:"",category:"",icon:""}),[m,d]=c.useState(!1),[u,a]=c.useState(null),[l,g]=c.useState(null),[x,y]=c.useState(!1),[b,h]=c.useState([]),[j,k]=c.useState(!1);c.useEffect(()=>{if(r&&r.length>0){const f=[...new Set(r.map(v=>v.category).filter(Boolean))];h(f)}},[r]);const L=async()=>{if(!(!n||!n.trim())){d(!0),a("开始分析"),g(null),y(!1),k(!1);try{a("验证URL格式");let f=n;!n.startsWith("http://")&&!n.startsWith("https://")&&(f="https://"+n);const v=f.toLowerCase().replace(/\/$/,"");if(_(v,r)){k(!0),g("该URL已存在于您的书签中"),d(!1);return}a("获取网站元数据");const B=await V(f);a("处理分析结果"),p({url:f,name:B.title||"",icon:B.icon||"",category:B.suggestedCategory||""}),a("分析完成"),y(!0)}catch(f){g(`在"${u}"步骤失败: ${f.message}`)}finally{d(!1)}}},O=async f=>{try{const v=f.url.toLowerCase().replace(/\/$/,"");if(_(v,r)){k(!0),g("该URL已存在于您的书签中");return}await s(f),e()}catch(v){console.error("添加书签失败:",v),g("添加书签失败，请重试")}};return t.jsx(A,{isOpen:!0,onClose:e,title:"添加新书签",size:"md",position:"center",children:t.jsxs("div",{className:"bookmark-modal-content",children:[t.jsxs("div",{className:"form-group",children:[t.jsx("label",{children:"网址"}),t.jsxs("div",{className:"url-input-container",children:[t.jsx("input",{type:"url",value:n,onChange:f=>o(f.target.value),placeholder:"输入网站地址",required:!0}),t.jsx("button",{type:"button",className:`analyze-button ${m?"loading":""}`,onClick:L,disabled:m||!n,children:m?"分析中...":"分析"})]})]}),t.jsx(Q,{analyzing:m,analysisStep:u,analysisError:l,urlExists:j}),x&&t.jsx(J,{formData:i,setFormData:p,categories:b,onSubmit:O,onCancel:e})]})})}function Y({bookmark:e,onClose:s,onSubmit:r}){const{list:n}=P(),[o,i]=c.useState({name:e.name,category:e.category,icon:e.icon}),[p,m]=c.useState([]),[d,u]=c.useState(!1),[a,l]=c.useState(!1),[g,x]=c.useState(!1),y=c.useRef({name:e.name,category:e.category,icon:e.icon}).current;c.useEffect(()=>{const h=o.name!==y.name||o.category!==y.category||o.icon!==y.icon;x(h)},[o,y]),c.useEffect(()=>{if(n&&n.length>0){const h=[...new Set(n.map(j=>j.category).filter(Boolean))];m(h)}},[n]),c.useEffect(()=>{const h=j=>{d&&!j.target.closest(".category-select-container")&&u(!1)};return document.addEventListener("mousedown",h),()=>document.removeEventListener("mousedown",h)},[d]);const b=async h=>{if(h.preventDefault(),!(!g||a)){l(!0);try{await r({...e,...o}),s()}catch(j){console.error("保存书签失败:",j)}finally{l(!1)}}};return t.jsx(A,{isOpen:!0,onClose:s,title:"编辑书签",size:"md",position:"center",children:t.jsx("div",{className:"bookmark-modal-content",children:t.jsxs("form",{onSubmit:b,children:[t.jsxs("div",{className:"form-group",children:[t.jsx("label",{children:"名称"}),t.jsx("input",{type:"text",value:o.name,onChange:h=>i({...o,name:h.target.value}),required:!0})]}),t.jsxs("div",{className:"form-group",children:[t.jsx("label",{children:"图标"}),t.jsxs("div",{className:"icon-input-container",children:[t.jsx("input",{type:"text",value:o.icon,onChange:h=>i({...o,icon:h.target.value}),placeholder:"输入图标 URL"}),o.icon&&t.jsx("div",{className:"icon-preview",children:t.jsx("img",{src:o.icon,alt:"图标预览",onError:h=>h.target.src="/fallback-icon.svg"})})]})]}),t.jsxs("div",{className:"form-group",children:[t.jsx("label",{children:"分类"}),t.jsxs("div",{className:"category-select-container",children:[t.jsx("input",{type:"text",value:o.category,onChange:h=>i({...o,category:h.target.value}),onFocus:()=>u(!0),placeholder:"选择或输入新分类"}),d&&p.length>0&&t.jsx("div",{className:"category-dropdown",children:p.map(h=>t.jsx("div",{className:`category-option ${h===o.category?"selected":""}`,onClick:()=>{i({...o,category:h}),u(!1)},children:h},h))})]})]}),t.jsxs("div",{className:"modal-actions",children:[t.jsx("button",{type:"button",className:"cancel-button",onClick:s,disabled:a,children:"取消"}),t.jsx("button",{type:"submit",className:`submit-button ${a?"loading":""}`,disabled:!g||a,children:a?"保存中...":"保存修改"})]})]})})})}function Z({message:e,type:s="success",onClose:r,duration:n=3e3}){return c.useEffect(()=>{const o=setTimeout(()=>{r()},n);return()=>clearTimeout(o)},[n,r]),t.jsxs("div",{className:`notification notification-${s}`,children:[t.jsx("span",{className:"notification-icon",children:s==="success"?"✓":"✕"}),t.jsx("span",{className:"notification-message",children:e})]})}function ee({onRestore:e,onNotify:s}){const[r,n]=c.useState([]),[o,i]=c.useState(!1),[p,m]=c.useState(new Set),d=async()=>{i(!0);try{const{data:a}=await N.from("bookmark_history").select("restored_from_id").not("restored_from_id","is",null),l=new Set((a==null?void 0:a.map(y=>y.restored_from_id))||[]);m(l);const{data:g,error:x}=await N.from("bookmark_history").select("*").order("created_at",{ascending:!1});if(x)throw x;n(g)}catch(a){console.error("获取历史记录失败:",a),s==null||s({type:"error",message:"获取历史记录失败"})}finally{i(!1)}};c.useEffect(()=>{d()},[]);const u=async a=>{try{const{bookmark_data:l}=a,{error:g}=await N.from("bookmark").insert([l]);if(g)throw g;const{error:x}=await N.from("bookmark_history").insert([{action:"restore",bookmark_id:l.id,bookmark_data:l,restored_from_id:a.id}]);if(x)throw x;s==null||s({type:"success",message:"书签恢复成功"}),e==null||e(),d()}catch(l){console.error("恢复书签失败:",l),s==null||s({type:"error",message:"恢复书签失败"})}};return t.jsxs("div",{className:"list-section",children:[t.jsxs("div",{className:"section-header",children:[t.jsx("h2",{children:"操作历史"}),t.jsx("span",{className:"history-count",children:o?"加载中...":`${r.length} 条记录`})]}),o?t.jsxs("div",{className:"loading-state",children:[t.jsx("div",{className:"loading-spinner"}),t.jsx("p",{children:"正在加载历史记录..."})]}):t.jsx("div",{className:"history-list",children:r.map(a=>t.jsxs("div",{className:"history-item",children:[t.jsxs("div",{className:"history-content",children:[t.jsxs("span",{className:"history-action",children:[a.action==="add"&&"添加了",a.action==="delete"&&"删除了",a.action==="update"&&"修改了",a.action==="restore"&&"恢复了"]}),t.jsx("span",{className:"history-name",children:a.bookmark_data.name}),t.jsx("span",{className:"history-time",children:W(new Date(a.created_at),{addSuffix:!0,locale:H})})]}),a.action==="delete"&&!p.has(a.id)&&t.jsx("button",{className:"restore-button",onClick:()=>u(a),children:"恢复"})]},a.id))})]})}function te(){const[e,s]=c.useState(null);return{notification:e,notify:(o,i)=>{s({type:o,message:i})},clearNotification:()=>{s(null)}}}function se(e,s){const[r,n]=c.useState(!1);return{isProcessing:r,addBookmark:async d=>{n(!0);try{await U.create(d),s("success","成功添加书签"),await e()}catch(u){console.error("添加书签失败:",u),s("error","添加书签失败，请稍后重试")}finally{n(!1)}},updateBookmark:async d=>{n(!0);try{await U.update(d),s("success","成功更新书签"),await e()}catch(u){console.error("更新书签失败:",u),s("error","更新书签失败，请稍后重试")}finally{n(!1)}},deleteBookmark:async d=>{n(!0);try{await U.delete(d),s("success","成功删除书签"),await e()}catch(u){console.error("删除书签失败:",u),s("error","删除书签失败")}finally{n(!1)}},copyUrl:d=>{navigator.clipboard.writeText(d).then(()=>s("success","URL已复制到剪贴板")).catch(()=>s("error","复制失败，请手动复制"))}}}var q={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},$=w.createContext&&w.createContext(q),re=["attr","size","title"];function ne(e,s){if(e==null)return{};var r=ae(e,s),n,o;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],!(s.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function ae(e,s){if(e==null)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(s.indexOf(n)>=0)continue;r[n]=e[n]}return r}function S(){return S=Object.assign?Object.assign.bind():function(e){for(var s=1;s<arguments.length;s++){var r=arguments[s];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},S.apply(this,arguments)}function z(e,s){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);s&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function C(e){for(var s=1;s<arguments.length;s++){var r=arguments[s]!=null?arguments[s]:{};s%2?z(Object(r),!0).forEach(function(n){oe(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):z(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function oe(e,s,r){return s=ie(s),s in e?Object.defineProperty(e,s,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[s]=r,e}function ie(e){var s=ce(e,"string");return typeof s=="symbol"?s:s+""}function ce(e,s){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,s);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(s==="string"?String:Number)(e)}function F(e){return e&&e.map((s,r)=>w.createElement(s.tag,C({key:r},s.attr),F(s.child)))}function E(e){return s=>w.createElement(le,S({attr:C({},e.attr)},s),F(e.child))}function le(e){var s=r=>{var{attr:n,size:o,title:i}=e,p=ne(e,re),m=o||r.size||"1em",d;return r.className&&(d=r.className),e.className&&(d=(d?d+" ":"")+e.className),w.createElement("svg",S({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,n,p,{className:d,style:C(C({color:e.color||r.color},r.style),e.style),height:m,width:m,xmlns:"http://www.w3.org/2000/svg"}),i&&w.createElement("title",null,i),e.children)};return $!==void 0?w.createElement($.Consumer,null,r=>s(r)):s(q)}function de(e){return E({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"9",y:"9",width:"13",height:"13",rx:"2",ry:"2"},child:[]},{tag:"path",attr:{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"},child:[]}]})(e)}function ue(e){return E({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"},child:[]}]})(e)}function me(e){return E({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"12",y1:"5",x2:"12",y2:"19"},child:[]},{tag:"line",attr:{x1:"5",y1:"12",x2:"19",y2:"12"},child:[]}]})(e)}function he(e){return E({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"3 6 5 6 21 6"},child:[]},{tag:"path",attr:{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"},child:[]},{tag:"line",attr:{x1:"10",y1:"11",x2:"10",y2:"17"},child:[]},{tag:"line",attr:{x1:"14",y1:"11",x2:"14",y2:"17"},child:[]}]})(e)}function fe({onAddClick:e,bookmarkCount:s}){return t.jsxs("div",{className:"dashboard-header",children:[t.jsxs("div",{className:"header-title",children:[t.jsx("h1",{children:"我的书签"}),s!==void 0&&t.jsxs("span",{className:"bookmark-counter",children:[s," 个书签"]})]}),t.jsx("div",{className:"header-actions",children:t.jsxs("button",{className:"add-button",onClick:e,children:[t.jsx("span",{className:"button-icon",children:t.jsx(me,{})}),"添加书签"]})})]})}function pe({bookmark:e,onEdit:s,onDelete:r,onCopyUrl:n}){return t.jsxs("div",{className:"bookmark-item",children:[t.jsx("div",{className:"bookmark-icon-wrapper",children:e.icon?t.jsx("img",{src:e.icon,alt:e.name,className:"bookmark-icon",onError:o=>o.target.src="/favicon.ico"}):t.jsx("div",{className:"bookmark-icon-placeholder"})}),t.jsxs("div",{className:"bookmark-info",children:[t.jsx("h3",{title:e.name,children:e.name}),e.category&&t.jsx("span",{className:"category-tag",children:e.category}),t.jsxs("div",{className:"url-container",children:[t.jsx("a",{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.url,children:e.url}),t.jsx("button",{className:"copy-button",onClick:()=>n(e.url),title:"复制链接",children:t.jsx(de,{})})]})]}),t.jsxs("div",{className:"bookmark-actions",children:[t.jsx("button",{className:"edit-button",onClick:()=>s(e),title:"编辑",children:t.jsx(ue,{className:"edit-icon"})}),t.jsx("button",{className:"delete-button",onClick:()=>r(e),title:"删除",children:t.jsx(he,{className:"delete-icon"})})]})]})}function ge({bookmarks:e,isLoading:s,onEdit:r,onDelete:n,onCopyUrl:o}){return console.log("BookmarkList 渲染:",{isLoading:s,bookmarksLength:e==null?void 0:e.length}),s?t.jsxs("div",{className:"loading-state",children:[t.jsx("div",{className:"loading-spinner"}),t.jsx("p",{children:"正在加载书签..."})]}):!e||e.length===0?t.jsxs("div",{className:"empty-state",children:[t.jsx("p",{children:"暂无书签"}),t.jsx("p",{className:"empty-tip",children:'点击"添加书签"按钮开始添加'})]}):t.jsx("div",{className:"bookmark-list",children:e.map(i=>t.jsx(pe,{bookmark:i,onEdit:r,onDelete:n,onCopyUrl:o},i.id))})}function xe({activeTab:e,onTabChange:s}){return t.jsxs("div",{className:"dashboard-tabs",children:[t.jsx("button",{className:`tab-button ${e==="bookmarks"?"active":""}`,onClick:()=>s("bookmarks"),children:"我的书签"}),t.jsx("button",{className:`tab-button ${e==="history"?"active":""}`,onClick:()=>s("history"),children:"历史记录"})]})}function Ne(){const[e,s]=c.useState(!0),{list:r,fetchBookmarks:n}=P(),[o,i]=c.useState("bookmarks"),[p,m]=c.useState(!1),[d,u]=c.useState(null),{notification:a,notify:l,clearNotification:g}=te(),{addBookmark:x,updateBookmark:y,deleteBookmark:b,copyUrl:h}=se(n,l);c.useEffect(()=>{(async()=>{s(!0);try{await n(),console.log("书签加载完成")}catch(v){console.error("加载书签失败:",v),l("error","加载书签失败")}finally{s(!1)}})()},[]);const j=async f=>{await x(f),m(!1)},k=async f=>{await y(f),u(null)},L=async f=>{window.confirm(`确定要删除书签 "${f.name}" 吗？`)&&await b(f)},O=async()=>{await n(),l("success","书签已恢复")};return t.jsx(M,{children:t.jsxs("div",{className:"dashboard",children:[t.jsx(fe,{onAddClick:()=>m(!0),bookmarkCount:(r==null?void 0:r.length)||0}),t.jsx(xe,{activeTab:o,onTabChange:i}),t.jsx("div",{className:"dashboard-content",children:t.jsxs("div",{className:"list-section",children:[t.jsxs("div",{className:"section-header",children:[t.jsx("h2",{children:o==="bookmarks"?"我的书签":"历史记录"}),o==="bookmarks"&&t.jsx("span",{className:"bookmark-count",children:e?"加载中...":`${(r==null?void 0:r.length)||0} 个书签`})]}),o==="bookmarks"?t.jsx(ge,{bookmarks:r,isLoading:e,onEdit:u,onDelete:L,onCopyUrl:h}):t.jsx(ee,{onRestore:O,onNotify:l})]})}),p&&t.jsx(X,{onClose:()=>m(!1),onSubmit:j}),d&&t.jsx(Y,{bookmark:d,onClose:()=>u(null),onSubmit:k}),a&&t.jsx(Z,{type:a.type,message:a.message,onClose:g})]})})}export{Ne as default};
