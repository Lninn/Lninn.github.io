import{e as r,j as s}from"./index-CYHeoGIu.js";import{b as c,d as i}from"./vendor-D6FSTBK7.js";const m=({type:o,content:u,onClose:n})=>{const[a,d]=c.useState(!1);return c.useEffect(()=>{const l=setTimeout(()=>{d(!0),setTimeout(n,300)},3e3);return()=>clearTimeout(l)},[n]),i.createPortal(s.jsxs("div",{className:`message ${o} ${a?"fade-out":""}`,children:[s.jsx("span",{className:"message-icon",children:o==="success"?"✅":"❌"}),s.jsx("span",{className:"message-content",children:u})]}),document.body)};let e=null,t=null;const h={success:o=>{e&&(t.unmount(),document.body.removeChild(e)),e=document.createElement("div"),document.body.appendChild(e),t=r.createRoot(e),t.render(s.jsx(m,{type:"success",content:o,onClose:()=>{t.unmount(),document.body.removeChild(e),e=null,t=null}}))},error:o=>{e&&(t.unmount(),document.body.removeChild(e)),e=document.createElement("div"),document.body.appendChild(e),t=r.createRoot(e),t.render(s.jsx(m,{type:"error",content:o,onClose:()=>{t.unmount(),document.body.removeChild(e),e=null,t=null}}))}};export{h as M};
