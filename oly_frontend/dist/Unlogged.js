import{d as D,u as I,r as d,g as S,s as A,U as B,c as H,a as L,o as p,b as _,e as o,w as t,f as i,h as u,i as M,j as O,p as $,k as q,_ as F}from"./index.js";import{f as N}from"./footer.js";import{l as V}from"./logo.js";import{D as j}from"./popover.js";const a=n=>($("data-v-9a7162bd"),n=n(),q(),n),E={class:"component entry unlogged"},G={class:"header"},Q={class:"header-list"},R=["onClick"],z=["onClick"],J=["onClick"],K=["onClick"],W=a(()=>o("li",null,"Providers items",-1)),X={class:"header-list"},Y=a(()=>o("span",null,"Other",-1)),Z=["onClick"],oo=["onClick"],so=["onClick"],eo=a(()=>o("div",{id:"faq",style:{cursor:"pointer"},class:"faq"},"FAQ",-1)),to=["onClick"],no=a(()=>o("div",{id:"contact",style:{cursor:"pointer"},class:"contact"}," Contact Us ",-1)),io={class:"body"},ao={class:"component_footer"},co=D({__name:"Unlogged",setup(n){const e=I(),c=d(!1),g=d(),m=r=>{const s=r.target;return!(s&&(s.classList.contains("icon")||s.closest("svg.icon_")))},v=S(B,A),f=H(()=>v.isLogged),k=d({show:{type:"pop",from:{scale:0},to:{scale:1}},hide:{type:"fade",from:1,to:0}}),C=()=>{c.value=!0},b=()=>{e.push({name:"about"})},w=()=>{e.push({name:"home"})},h=()=>{e.push({name:"login"})},y=()=>{e.push({name:"pricing"})},T=()=>{e.push({name:"disease"})},U=()=>{e.push({name:"therapists"})},P=()=>{e.push({name:"therapies"})};return(r,s)=>{const x=L("font-awesome-icon");return p(),_("div",E,[o("header",G,[o("ul",Q,[o("li",{onClick:t(w,["stop"])},[i(V)],8,R),o("li",{onClick:t(T,["stop"])},"Disease",8,z),o("li",{onClick:t(U,["stop"])},"Therapists",8,J),o("li",{onClick:t(P,["stop"])},"Therapies",8,K),W]),o("ul",X,[o("li",{class:"other",id:"other",onMouseenter:C},[Y,i(x,{icon:"fa-solid fa-angle-down",id:"icon"})],32),u(f)?(p(),_("button",{key:1,class:"sigin_button",onClick:t(h,["stop"])}," Go to Dashboard ",8,oo)):(p(),_("button",{key:0,class:"sigin_button",onClick:t(h,["stop"])}," Sign-in ",8,Z)),i(u(j),{ref:"actionsPopover",visible:c.value,"onUpdate:visible":s[1]||(s[1]=l=>c.value=l),"hide-on-parent-scroll":!0,width:150,"hide-on-outside-click":m,animation:k.value,target:"#icon",position:"bottom",container:".dx-viewport",onHidden:s[2]||(s[2]=l=>g.value=null)},{default:M(()=>[o("div",{id:"about",class:"about",style:{cursor:"pointer"},onClick:t(b,["stop"])}," About Us ",8,so),o("div",{id:"howitworks",style:{cursor:"pointer"},onClick:s[0]||(s[0]=l=>u(e).push({name:"how.it.works"})),class:"how"}," How it works "),eo,o("div",{id:"pricing",style:{cursor:"pointer"},onClick:t(y,["stop"]),class:"pricing"}," pricing ",8,to),no]),_:1},8,["visible","animation"])])]),o("div",io,[O(r.$slots,"default",{},void 0,!0)]),o("div",ao,[i(N)])])}}});const uo=F(co,[["__scopeId","data-v-9a7162bd"],["__file","/home/uche/apps/oly/oly_frontend/src/components/Frames/Unlogged.vue"]]);export{uo as default};
//# sourceMappingURL=Unlogged.js.map
