import{d as P,g as A,s as I,U as B,v as F,c as v,u as M,r as U,x as V,a as $,o as z,b as R,e as s,w as l,f as o,y as g,z as C,h as i,A as p,j as W,p as Y,k as j,_ as E}from"./index.js";import{_ as H}from"./Rectangle.js";import{f as L}from"./footer.js";import{l as O}from"./logo.js";const t=c=>(Y("data-v-718618e6"),c=c(),j(),c),q={class:"component entry unlogged"},G={class:"header"},J={class:"header-list"},K=["onClick"],Q=["onClick"],X=["onClick"],Z=["onClick"],ss=t(()=>s("li",null,"Providers items",-1)),os={class:"header-list"},ts=t(()=>s("span",null,"Therapist",-1)),es={class:"btn"},is=t(()=>s("span",null,"Cart",-1)),as={class:"body"},ns={class:"side_nav"},ls={class:"profile"},cs=t(()=>s("div",{class:"img"},[s("img",{src:H,alt:""})],-1)),_s={class:"profile_info"},ds={class:"nav"},rs=t(()=>s("span",null,"Account Details",-1)),ps={class:"list_item"},us=t(()=>s("span",null,"Messages",-1)),hs=t(()=>s("span",null,"Your Therapies",-1)),ms={class:"list_item"},fs=t(()=>s("span",null,"Your Diseases",-1)),vs={class:"list_item"},gs=t(()=>s("span",null,"Wallet",-1)),Cs={class:"list_item"},ks=t(()=>s("span",null,"Notifications",-1)),Ts=["onClick"],ws=t(()=>s("span",null,"Sign Out",-1)),bs={class:"component_footer"},ys=P({__name:"PatientFrame",setup(c){const u=A(B,I),k=F(),_=v(()=>k.name),d=v(()=>u.userData),a=M(),r=U(!1),T=V(),w=()=>{a.push({name:"home"})},b=()=>{a.push({name:"disease"})},y=()=>{a.push({name:"therapists"})},D=()=>{a.push({name:"therapies"})},N=async()=>{await u.logout(),T.error("User Logged out",{timeout:3e3}),console.log("here"),a.push({name:"login"})},S=()=>r.value=!r.value;return(x,n)=>{var h,m,f;const e=$("font-awesome-icon");return z(),R("div",q,[s("div",G,[s("header",null,[s("ul",J,[s("li",{onClick:l(w,["stop"])},[o(O)],8,K),s("li",{onClick:l(b,["stop"])},"Disease",8,Q),s("li",{onClick:l(y,["stop"])},"Therapists",8,X),s("li",{onClick:l(D,["stop"])},"Therapies",8,Z),ss]),s("ul",os,[s("li",null,[g(" Patient "),o(e,{icon:r.value?"fa -solid fa-toggle-on":"fa-solid fa-toggle-off",class:"icon",onClick:S},null,8,["icon"]),ts]),s("button",es,[o(e,{icon:"fa-solid fa-cart-shopping",class:"icon"}),is])])])]),s("div",as,[s("div",ns,[s("div",ls,[cs,s("div",_s,[s("h3",null,C(`${(h=i(d))==null?void 0:h.firstName} ${(m=i(d))==null?void 0:m.lastName}`),1),s("p",null,C((f=i(d))==null?void 0:f.email),1)])]),s("div",ds,[s("div",{class:p(["list_item",[i(_)==="patient.dashboard"?"active":""]]),onClick:n[0]||(n[0]=()=>i(a).push({name:"patient.dashboard"}))}," Wall ",2),s("div",{class:p(["list_item",[i(_)==="patient.account"?"active":""]]),onClick:n[1]||(n[1]=()=>i(a).push({name:"patient.account"}))},[o(e,{icon:"fa-solid fa-gear"}),rs],2),s("div",ps,[o(e,{icon:"fa-solid fa-message"}),us]),s("div",{class:p(["list_item",[i(_)==="patient.therapies"?"active":""]]),onClick:n[2]||(n[2]=()=>i(a).push({name:"patient.therapies"}))},[o(e,{icon:"fa-solid fa-file-medical"}),hs],2),s("div",ms,[o(e,{icon:"fa-solid fa-disease"}),fs]),s("div",vs,[o(e,{icon:"fa-solid fa-wallet"}),g(),gs]),s("div",Cs,[o(e,{icon:"fa-solid fa-bell"}),ks]),s("div",{class:"list_item",onClick:l(N,["stop"])},[o(e,{icon:"fa-solid fa-power-off"}),ws],8,Ts)])]),W(x.$slots,"default",{},void 0,!0)]),s("div",bs,[o(L)])])}}});const Ps=E(ys,[["__scopeId","data-v-718618e6"]]);export{Ps as default};
//# sourceMappingURL=PatientFrame.js.map