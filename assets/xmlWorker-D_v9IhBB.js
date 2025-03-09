(function(){"use strict";function i(l){const s=[],e=/<Record\b[^>]*?(?:\/>|>[\s\S]*?<\/Record>)/g;let o;for(;(o=e.exec(l))!==null;){const a=o[0],n=/type="([^"]+)"/.exec(a),t=/startDate="([^"]+)"/.exec(a),c=/endDate="([^"]+)"/.exec(a),r=/value="([^"]+)"/.exec(a);if(n&&t&&c&&r){const y={type:n[1],startDate:u(t[1]),endDate:u(c[1]),value:parseFloat(r[1])};s.push(y)}}return s}function p(l){const s={};l.forEach(o=>{if(!o.startDate)return;const a=o.startDate.toISOString().split("T")[0];s[a]||(s[a]=[]),s[a].push(o)});const e={};return Object.keys(s).forEach(o=>{const a=s[o],n={};a.forEach(t=>{t.type&&(n[t.type]||(n[t.type]={type:t.type,date:new Date(o),values:[],totalValue:0}),t.value!==null&&(n[t.type].values.push(t.value),n[t.type].totalValue+=t.value))}),Object.keys(n).forEach(t=>{e[t]||(e[t]=[]),e[t].push(n[t])})}),e}function u(l){const s=l.split(" ");if(s.length>=1){const e=s[0];return new Date(e)}return null}self.onmessage=function(l){const{xmlContent:s}=l.data;try{console.log(`Worker 收到数据，大小约 ${Math.round(s.length/1024)} KB`);const e=(t,c)=>{self.postMessage({type:"progress",data:{progress:t,message:c}}),console.log(`进度更新: ${t}%, ${c}`)};e(10,"正在解析 XML 数据..."),e(30,"正在提取健康数据...");const o=i(s);e(60,`已解析 ${o.length} 条健康记录`),e(70,"正在按日期和类型分组数据...");const a=p(o);e(90,"正在生成可视化数据...");const n=f(a);self.postMessage({type:"result",data:n})}catch(e){console.error("处理健康数据时出错:",e),self.postMessage({type:"error",data:{message:e.message||"处理数据时发生未知错误"}})}};function f(l){const s=Object.keys(l),e={};return s.forEach(a=>{l[a].forEach(t=>{const c=t.date.toISOString().split("T")[0];e[c]||(e[c]={date:c,count:0,details:{}}),e[c].count+=t.values.length,e[c].details[a]=t.totalValue,a==="HKQuantityTypeIdentifierStepCount"&&(e[c].stepCount=t.totalValue)})}),{data:Object.values(e).sort((a,n)=>a.date.localeCompare(n.date)),activityTypes:s}}})();
