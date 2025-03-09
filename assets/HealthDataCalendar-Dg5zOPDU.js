import{j as e}from"./index-DqCV7gAo.js";import{r as f}from"./vendor-DS5US8IS.js";import{Statistic as C,CalendarIcon as A,FireIcon as $}from"./UIComponents-DBUHehI_.js";import{M as T}from"./index-BtkZZNk7.js";import{C as D}from"./styles-BISkjBTA.js";import{S as L,R as Y,C as w}from"./Col-DIHFKfB6.js";/* empty css                           */import"./utils-BxBsLso0.js";/* empty css                     */const I=({children:s,title:i,placement:r="top",delay:c=0})=>{const[j,o]=f.useState(!1),h=f.useRef(null),y=f.useRef(null),v=f.useRef(null),S=()=>{c>0?v.current=setTimeout(()=>{o(!0)},c):o(!0)},b=()=>{v.current&&clearTimeout(v.current),o(!1)};return f.useEffect(()=>()=>{v.current&&clearTimeout(v.current)},[]),e.jsxs("div",{className:"tooltip-container",onMouseEnter:S,onMouseLeave:b,ref:y,children:[s,j&&e.jsx("div",{className:`tooltip tooltip-${r}`,ref:h,children:i})]})},F=(s,i)=>{if(s===0||i===0)return 0;const r=s/i;return r<=.25?1:r<=.5?2:r<=.75?3:4},J=(s,i="apple-health-data.json")=>{const r=JSON.stringify(s,null,2),c=new Blob([r],{type:"application/json"});M(c,i)},U=(s,i="apple-health-data.csv")=>{if(!s||!s.data||!Array.isArray(s.data))throw new Error("无效的数据格式");const r=s.activityTypes||[];let c="Date,RecordCount";r.forEach(o=>{c+=`,${o}`}),c+=`
`,s.data.forEach(o=>{c+=`${o.date},${o.count||0}`,r.forEach(h=>{const y=o.details&&o.details[h]?o.details[h]:0;c+=`,${y}`}),c+=`
`});const j=new Blob([c],{type:"text/csv;charset=utf-8;"});M(j,i)},M=(s,i)=>{const r=document.createElement("a");r.href=URL.createObjectURL(s),r.download=i,document.body.appendChild(r),r.click(),document.body.removeChild(r),setTimeout(()=>{URL.revokeObjectURL(r.href)},100)},P=({data:s})=>{const[i,r]=f.useState("HKQuantityTypeIdentifierStepCount"),{calendarData:c,years:j,activityTypes:o,stats:h}=f.useMemo(()=>{if(!s||!s.data)return{calendarData:[],years:[],activityTypes:[],stats:{}};const t=[...new Set(s.data.map(n=>new Date(n.date).getFullYear()))].sort(),l={};t.forEach(n=>{l[n]=Array(53).fill().map(()=>Array(7).fill(null));const a=new Date(n,0,1),d=a.getDay(),m=new Date(n,11,31),g=Math.ceil((m-a)/(24*60*60*1e3))+1;for(let u=0;u<g;u++){const x=new Date(n,0,u+1),N=Math.floor((u+d)/7),k=x.getDay();l[n][N]&&(l[n][N][k]={date:x.toISOString().split("T")[0],count:0,details:{}})}}),s.data.forEach(n=>{const a=new Date(n.date),d=a.getFullYear(),m=new Date(d,0,1),g=m.getDay(),u=Math.floor((a-m)/(24*60*60*1e3)),x=Math.floor((u+g)/7),N=a.getDay();l[d]&&l[d][x]&&(l[d][x][N]={date:n.date,count:n.count,details:n.details})});const p={totalDays:s.data.length,totalActivities:s.data.reduce((n,a)=>n+a.count,0),maxDailyActivities:Math.max(...s.data.map(n=>n.count)),averageDailyActivities:Math.round(s.data.reduce((n,a)=>n+a.count,0)/s.data.length)};return{calendarData:l,years:t,activityTypes:["all",...s.activityTypes],stats:p}},[s]),y=t=>t?i==="all"?t.count:t.details[i]||0:0,v=f.useMemo(()=>{const t={};return j.forEach(l=>{let p=0;c[l].forEach(n=>{n.forEach(a=>{if(a){const d=y(a);d>p&&(p=d)}})}),t[l]=p}),t},[c,j,i]),S=()=>{const t=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];return e.jsx("div",{className:"month-labels",children:t.map((l,p)=>e.jsx("div",{className:"month-label",style:{left:`${p*8.3+2}%`},children:l},l))})},b=()=>{const t=["周日","周一","周二","周三","周四","周五","周六"];return e.jsx("div",{className:"weekday-labels",children:t.map(l=>e.jsx("div",{className:"weekday-label",children:l},l))})},O=t=>{const l=v[t];return e.jsxs("div",{className:"year-calendar",children:[e.jsxs("h3",{children:[t,"年"]}),e.jsxs("div",{className:"calendar-grid",children:[S(),e.jsxs("div",{className:"calendar-body",children:[b(),e.jsx("div",{className:"calendar-cells",children:c[t].map((p,n)=>e.jsx("div",{className:"calendar-week",children:p.map((a,d)=>{const m=y(a),g=F(m,l),u=a&&i==="StepCount"?a.details.StepCount||0:a&&a.stepCount||0;let x=a?`${a.date}: ${m} 活动`:"无数据";return a&&u>0&&(x=i==="StepCount"?`${a.date}: ${Math.round(u)} 步`:`${a.date}: ${m} 活动 (${Math.round(u)} 步)`),e.jsx(I,{title:x,children:e.jsx("div",{className:`calendar-day intensity-${g}`,"data-date":a?a.date:""})},`${t}-w${n}-d${d}`)})},`${t}-w${n}`))})]})]})]},t)},E=()=>{try{J(s,`apple-health-data-${new Date().toISOString().split("T")[0]}.json`)}catch(t){T.error(`导出 JSON 失败: ${t.message}`)}},R=()=>{try{U(s,`apple-health-data-${new Date().toISOString().split("T")[0]}.csv`)}catch(t){T.error(`导出 CSV 失败: ${t.message}`)}};return e.jsxs("div",{className:"health-data-calendar",children:[e.jsxs("div",{className:"calendar-header",children:[e.jsx("div",{className:"calendar-title",children:e.jsx("h3",{children:"健康数据日历"})}),e.jsxs("div",{className:"calendar-actions",children:[e.jsx(L,{value:i,onChange:r,options:[{value:"all",label:"所有活动"},...o.map(t=>({value:t,label:t}))]}),e.jsx("button",{className:"export-button",onClick:E,style:{marginLeft:"10px"},children:"导出 JSON"}),e.jsx("button",{className:"export-button",onClick:R,style:{marginLeft:"10px"},children:"导出 CSV"})]})]}),e.jsxs(Y,{gutter:16,className:"stats-cards",children:[e.jsx(w,{span:6,children:e.jsx(D,{children:e.jsx(C,{title:"记录天数",value:h.totalDays,prefix:e.jsx(A,{}),suffix:"天"})})}),e.jsx(w,{span:6,children:e.jsx(D,{children:e.jsx(C,{title:"总活动数",value:h.totalActivities,prefix:e.jsx($,{})})})}),e.jsx(w,{span:6,children:e.jsx(D,{children:e.jsx(C,{title:"单日最高活动",value:h.maxDailyActivities,prefix:e.jsx($,{})})})}),e.jsx(w,{span:6,children:e.jsx(D,{children:e.jsx(C,{title:"日均活动",value:h.averageDailyActivities,prefix:e.jsx($,{})})})})]}),e.jsxs("div",{className:"calendar-legend",children:[e.jsx("span",{children:"活动频率: "}),e.jsxs("div",{className:"legend-items",children:[e.jsxs("div",{className:"legend-item",children:[e.jsx("div",{className:"legend-color intensity-0"}),e.jsx("span",{children:"无"})]}),e.jsxs("div",{className:"legend-item",children:[e.jsx("div",{className:"legend-color intensity-1"}),e.jsx("span",{children:"低"})]}),e.jsxs("div",{className:"legend-item",children:[e.jsx("div",{className:"legend-color intensity-2"}),e.jsx("span",{children:"中"})]}),e.jsxs("div",{className:"legend-item",children:[e.jsx("div",{className:"legend-color intensity-3"}),e.jsx("span",{children:"高"})]}),e.jsxs("div",{className:"legend-item",children:[e.jsx("div",{className:"legend-color intensity-4"}),e.jsx("span",{children:"很高"})]})]})]}),j.map(t=>O(t))]})};export{P as default};
