import{j as a}from"./index-CQUQLjpX.js";import{C as f,a as h}from"./DraggableNavItem-Ck2K1syd.js";import"./vendor-SppV482W.js";import"./utils-BBaAu8xq.js";const x=({items:n,droppableId:o,level:s=0,onAddChild:p,onEdit:e,onToggleStatus:i,onDelete:c})=>!n||n.length===0?null:a.jsx(f,{droppableId:o,type:`list-${s}`,children:l=>a.jsxs("ul",{className:`nav-config-list ${s>0?"nav-config-sublist":""}`,ref:l.innerRef,...l.droppableProps,children:[n.map((r,t)=>a.jsxs("li",{className:"nav-config-item-wrapper",children:[a.jsx(h,{item:r,index:t,level:s,onAddChild:p,onEdit:e,onToggleStatus:i,onDelete:c}),r.children&&r.children.length>0&&a.jsx(x,{items:r.children,droppableId:`nav-list-${r.id}`,level:s+1,onAddChild:p,onEdit:e,onToggleStatus:i,onDelete:c})]},r.id)),l.placeholder]})});export{x as default};
