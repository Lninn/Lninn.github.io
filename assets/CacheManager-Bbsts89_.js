import{j as e}from"./index-BFytwfpB.js";/* empty css              */import"./vendor-DaomY4Gh.js";import{Card as n}from"./UIComponents-CNgawJ_A.js";import"./ErrorBoundary-DCDVVhlH.js";import"./utils-DVSSZgyS.js";/* empty css                     */const N=({cachedFiles:a,onLoadCache:c,onDeleteCache:i,onClearAll:t,onClose:l})=>e.jsxs(n,{title:"缓存管理",className:"cache-manager-card",children:[e.jsxs("div",{className:"cache-controls",children:[e.jsx("button",{className:"clear-all-button",onClick:t,disabled:a.length===0,children:"清除所有缓存"}),e.jsx("button",{className:"close-button",onClick:l,children:"关闭"})]}),a.length===0?e.jsx("div",{className:"no-cache-message",children:"没有缓存数据"}):e.jsx("div",{className:"cached-files-list",children:a.map(s=>e.jsxs("div",{className:"cached-file-item",children:[e.jsxs("div",{className:"cache-info",children:[e.jsx("div",{className:"cache-name",children:s.fileName}),e.jsx("div",{className:"cache-date",children:new Date(s.timestamp).toLocaleString()}),e.jsxs("div",{className:"cache-size",children:[(s.fileSize/(1024*1024)).toFixed(2)," MB"]})]}),e.jsxs("div",{className:"cache-actions",children:[e.jsx("button",{className:"load-button",onClick:()=>c(s.id),children:"加载"}),e.jsx("button",{className:"delete-button",onClick:()=>i(s.id),children:"删除"})]})]},s.id))})]});export{N as default};
