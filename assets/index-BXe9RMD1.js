import{r,j as s,s as c}from"./index-BfJxXvsD.js";import{f as d,z as m}from"./zh-CN-ZPh2jKaf.js";function g(){const[n,i]=r.useState([]),[l,t]=r.useState(!0);return r.useEffect(()=>{(async()=>{try{const{data:a,error:o}=await c.from("error_logs").select("*").order("timestamp",{ascending:!1}).limit(100);if(o)throw o;i(a)}catch(a){console.error("获取错误日志失败:",a)}finally{t(!1)}})()},[]),s.jsxs("div",{className:"error-logs",children:[s.jsxs("div",{className:"section-header",children:[s.jsx("h2",{children:"错误日志"}),s.jsx("span",{className:"log-count",children:l?"加载中...":`${n.length} 条记录`})]}),l?s.jsxs("div",{className:"loading-state",children:[s.jsx("div",{className:"loading-spinner"}),s.jsx("p",{children:"正在加载错误日志..."})]}):s.jsx("div",{className:"logs-list",children:n.map(e=>s.jsxs("div",{className:"log-item",children:[s.jsxs("div",{className:"log-header",children:[s.jsx("span",{className:"log-time",children:d(new Date(e.timestamp),{addSuffix:!0,locale:m})}),s.jsx("span",{className:"log-environment",children:e.environment})]}),s.jsxs("div",{className:"log-content",children:[s.jsx("div",{className:"log-component",children:e.component_info}),s.jsx("div",{className:"log-message",children:e.error}),s.jsx("div",{className:"log-url",children:e.url})]}),s.jsx("div",{className:"log-footer",children:s.jsx("span",{className:"log-user-agent",children:e.user_agent})})]},e.id))})]})}export{g as default};
