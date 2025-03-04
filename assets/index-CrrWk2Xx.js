import{r as i,j as e}from"./index-BXKbAJSp.js";function f({onSubmit:t}){const[a,l]=i.useState({url:"",name:"",category:"",icon:""}),o=n=>{n.preventDefault(),t(a),l({url:"",name:"",category:"",icon:""})};return e.jsxs("form",{className:"bookmark-form",onSubmit:o,children:[e.jsx("div",{className:"form-group",children:e.jsx("input",{type:"text",placeholder:"URL",value:a.url,onChange:n=>l(r=>({...r,url:n.target.value})),required:!0})}),e.jsx("div",{className:"form-group",children:e.jsx("input",{type:"text",placeholder:"名称",value:a.name,onChange:n=>l(r=>({...r,name:n.target.value})),required:!0})}),e.jsx("div",{className:"form-group",children:e.jsx("input",{type:"text",placeholder:"分类",value:a.category,onChange:n=>l(r=>({...r,category:n.target.value})),required:!0})}),e.jsx("div",{className:"form-group",children:e.jsx("input",{type:"text",placeholder:"图标URL",value:a.icon,onChange:n=>l(r=>({...r,icon:n.target.value})),required:!0})}),e.jsx("button",{type:"submit",children:"添加书签"})]})}function p({original:t,modified:a}){return e.jsxs("div",{className:"diff-view",children:[e.jsxs("div",{className:"diff-column",children:[e.jsx("h3",{children:"原数据"}),e.jsx("pre",{children:JSON.stringify(t,null,2)})]}),e.jsxs("div",{className:"diff-column",children:[e.jsx("h3",{children:"新数据"}),e.jsx("pre",{children:JSON.stringify(a,null,2)})]})]})}function g(){const[t,a]=i.useState([]),[l,o]=i.useState([]),[n,r]=i.useState(!1);i.useEffect(()=>{d()},[]);const d=async()=>{try{const c=await(await fetch("/data.json")).json();a(c),o(c)}catch(s){console.error("Failed to load bookmarks:",s)}},h=s=>{a(c=>[...c,s])},u=s=>{a(c=>c.filter(j=>j.url!==s))},m=async()=>{r(!0)},x=async()=>{console.log("Syncing changes:",t),r(!1)};return e.jsxs("div",{className:"dashboard",children:[e.jsxs("div",{className:"dashboard-header",children:[e.jsx("h1",{children:"书签管理"}),e.jsx("button",{className:"sync-button",onClick:m,children:"同步更改"})]}),e.jsxs("div",{className:"dashboard-content",children:[e.jsxs("div",{className:"form-section",children:[e.jsx("h2",{children:"添加新书签"}),e.jsx(f,{onSubmit:h})]}),e.jsxs("div",{className:"list-section",children:[e.jsx("h2",{children:"书签列表"}),e.jsx("div",{className:"bookmark-list",children:t.map(s=>e.jsxs("div",{className:"bookmark-item",children:[e.jsx("img",{src:s.icon,alt:"",className:"bookmark-icon"}),e.jsxs("div",{className:"bookmark-info",children:[e.jsx("h3",{children:s.name}),e.jsx("p",{children:s.category}),e.jsx("a",{href:s.url,target:"_blank",rel:"noopener noreferrer",children:s.url})]}),e.jsx("button",{className:"delete-button",onClick:()=>u(s.url),children:"删除"})]},s.url))})]})]}),n&&e.jsx("div",{className:"modal",children:e.jsxs("div",{className:"modal-content",children:[e.jsx("h2",{children:"确认更改"}),e.jsx(p,{original:l,modified:t}),e.jsxs("div",{className:"modal-actions",children:[e.jsx("button",{onClick:x,children:"确认"}),e.jsx("button",{onClick:()=>r(!1),children:"取消"})]})]})})]})}export{g as default};
