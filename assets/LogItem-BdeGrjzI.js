import{j as e}from"./index-CQUQLjpX.js";import{M as c}from"./index-Veq5yH1D.js";import{c as d}from"./vendor-SppV482W.js";import{f as m}from"./utils-BBaAu8xq.js";import{z as h}from"./zh-CN-CZuBSqvY.js";function g({log:s}){const[r,i]=d.useState(!1),n=(l,a=120)=>l?l.length>a?`${l.substring(0,a)}...`:l:"",t=m(new Date(s.timestamp),{addSuffix:!0,locale:h}),o=e.jsx("button",{onClick:()=>i(!1),children:"关闭"});return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"log-item",children:[e.jsxs("div",{className:"log-item-header",children:[e.jsx("div",{className:"log-item-time",children:t}),e.jsx("div",{className:"log-item-env",children:s.environment})]}),e.jsxs("div",{className:"log-item-content",children:[e.jsx("div",{className:"log-item-component",children:s.component_info}),e.jsx("div",{className:"log-item-message",children:s.error}),e.jsx("div",{className:"log-item-url",children:e.jsx("a",{href:s.url,target:"_blank",rel:"noopener noreferrer",title:s.url,children:n(s.url,50)})})]}),e.jsx("div",{className:"log-item-actions",children:e.jsxs("button",{className:"log-item-details-btn",onClick:()=>i(!0),children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),"查看详情"]})})]}),e.jsx(c,{isOpen:r,onClose:()=>i(!1),title:"错误日志详情",size:"md",footer:o,children:e.jsxs("div",{className:"log-details",children:[e.jsxs("div",{className:"log-details-section",children:[e.jsx("h4",{children:"基本信息"}),e.jsxs("div",{className:"log-details-row",children:[e.jsx("span",{className:"log-details-label",children:"时间："}),e.jsx("span",{className:"log-details-value",children:new Date(s.timestamp).toLocaleString()})]}),e.jsxs("div",{className:"log-details-row",children:[e.jsx("span",{className:"log-details-label",children:"环境："}),e.jsx("span",{className:"log-details-value",children:s.environment})]}),e.jsxs("div",{className:"log-details-row",children:[e.jsx("span",{className:"log-details-label",children:"组件："}),e.jsx("span",{className:"log-details-value",children:s.component_info})]})]}),e.jsxs("div",{className:"log-details-section",children:[e.jsx("h4",{children:"错误信息"}),e.jsx("div",{className:"log-details-error",children:s.error})]}),e.jsxs("div",{className:"log-details-section",children:[e.jsx("h4",{children:"URL"}),e.jsx("div",{className:"log-details-url",children:e.jsx("a",{href:s.url,target:"_blank",rel:"noopener noreferrer",children:s.url})})]}),e.jsxs("div",{className:"log-details-section",children:[e.jsx("h4",{children:"用户代理"}),e.jsx("div",{className:"log-details-user-agent",children:s.user_agent})]})]})})]})}export{g as LogItem};
