import{j as e,g as u}from"./index-89Nilo7p.js";import{b as o}from"./vendor-CtNg6EUi.js";function x({isOpen:t,onClose:d,title:l,children:c,footer:n,size:m="md",position:i="center"}){const r=o.useRef(null);return o.useEffect(()=>{const s=a=>{a.key==="Escape"&&t&&d()};return document.addEventListener("keydown",s),()=>document.removeEventListener("keydown",s)},[t,d]),o.useEffect(()=>{const s=a=>{r.current&&!r.current.contains(a.target)&&d()};return t&&document.addEventListener("mousedown",s),()=>{document.removeEventListener("mousedown",s)}},[t,d]),o.useEffect(()=>(t?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[t]),t?e.jsx("div",{className:"modal-overlay",style:{alignItems:i==="top"?"flex-start":"center"},children:e.jsxs("div",{ref:r,className:`modal-container modal-size-${m}`,children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h3",{className:"modal-title",children:l}),e.jsx("button",{className:"modal-close-button",onClick:d,"aria-label":"关闭",children:e.jsx(u,{})})]}),e.jsx("div",{className:"modal-body",children:c}),n&&e.jsx("div",{className:"modal-footer",children:n})]})}):null}export{x as M};
