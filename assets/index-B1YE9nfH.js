import{j as s,L as l}from"./index-CQUQLjpX.js";import{BookmarkItem as c}from"./BookmarkItem-fXNAr24d.js";import"./vendor-SppV482W.js";import"./utils-BBaAu8xq.js";function o({bookmarks:e,isLoading:t,onEdit:r,onDelete:n,onCopyUrl:a}){return t?s.jsx(l,{text:"正在加载书签..."}):!e||e.length===0?s.jsx("div",{className:"list-section",children:s.jsxs("div",{className:"empty-state",children:[s.jsx("p",{children:"暂无书签"}),s.jsx("p",{className:"empty-tip",children:'点击"添加书签"按钮开始添加'})]})}):s.jsxs("div",{className:"list-section",children:[s.jsxs("div",{className:"section-header",children:[s.jsx("h2",{children:"书签列表"}),s.jsxs("span",{className:"item-count",children:[e.length," 个书签"]})]}),s.jsx("div",{className:"bookmark-list bookmark-list-wrap",children:e.map(i=>s.jsx(c,{bookmark:i,onEdit:r,onDelete:n,onCopyUrl:a},i.id))})]})}export{o as default};
