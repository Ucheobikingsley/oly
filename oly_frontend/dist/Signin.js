import{d as E,r as _,x as U,g as L,s as N,U as O,G as A,u as q,a as z,o as h,b as f,e,y as B,w as j,A as S,h as t,H as k,I as F,f as b,z as M,t as V,J as $,K as H,l as W,L as G,M as P,N as J,O as K,P as Q,Q as X,R as Y,S as Z,T as ee,V as se,W as ae,p as oe,k as te,_ as ie}from"./index.js";import{c as re,a as R,b as ne,u as le,d as T}from"./object.js";const v=u=>(oe("data-v-ae808d1c"),u=u(),te(),u),de={class:"view entry signin"},ce=v(()=>e("p",{class:"welcome"},"Welcome Back",-1)),ue={class:"form"},pe=["onSubmit"],ve={class:"group"},ge=v(()=>e("label",{for:"login_email"},"email",-1)),me={key:0,class:"error"},_e={class:"group"},he=v(()=>e("label",{for:"login_password"},"password",-1)),fe=["type"],we={key:0,class:"error"},ye=W('<div class="prompt" data-v-ae808d1c> Signing in or logging in the platform, you automatically accept our <span class="highlight" data-v-ae808d1c>privacy</span> and <span class="highlight" data-v-ae808d1c>Terms and Conditions</span></div><div class="remember_me" data-v-ae808d1c><input type="checkbox" name="" id="" data-v-ae808d1c><span data-v-ae808d1c>Remember me</span></div><button class="btn_signin" data-v-ae808d1c>Sign in</button>',3),Se=v(()=>e("div",{class:"forget_password"},"Forget your password?",-1)),ke=E({__name:"Signin",setup(u){const x=re({email:R().email("Please input a valid email address").required("Please input a valid email address"),password:R().required("Please input a valid password"),keepMeLogged:ne()}),w=le({validationSchema:x,initialValues:{email:"",password:""}}),l=T("email",void 0,{validateOnValueUpdate:!0}),d=T("password",void 0,{validateOnValueUpdate:!0}),p=_(!1),s=_("login"),a=U(),g=L(O,N),c=A(),C=q(),m=_(!1),D=()=>{C.push({name:"register"})},I=async y=>{if(y.preventDefault(),m.value)return;const{valid:n}=await w.validate();if(!n){a.error("Ooops... invalid login credentials",{timeout:7e3,id:s.value});return}if(!(G||P&&c&&await c.recaptchaLoaded()))return a.error("Oops! Cannot submit request at this time.. Please refresh this page",{id:s.value,timeout:5e3}),!1;m.value=!0,a.info("Logging user...",{id:s.value,timeout:0});try{const i=P?await(c==null?void 0:c.executeRecaptcha("login")):"token",o=await J.post("login",{json:{...w.values,"g-captcha-key":i}});if(o.status===200){const r=await o.json();if(K(r)){Q.isLoading.value=!0,await g.setToken(r.data.token),await g.setState({userData:r.data.user}),a.success("User logged successfully",{id:s.value,timeout:3500}),await g.goToDashboard();return}}else a.error("Please refresh this page...",{id:s.value,timeout:4e3})}catch(i){a.dismiss(s.value),i||window.location.reload(),(async()=>{if(i instanceof X){const o=Y(i,"response.status");if(console.log("status",o),o>=400){const r=await i.response.json();if(console.log("status",o),Z(r))a.error(r.message,{id:s.value,timeout:4e3});else{if(ee(r))return a.error(r.error.message,{id:s.value});if(se(r))return a.error("Authorization Error",{id:s.value})}}}else{if(i instanceof ae)return a.error("Oops! An error occured while sending request. Please check your internet connection",{id:s.value});a.error("An error occurred while logging in user",{id:s.value})}})()}m.value=!1};return(y,n)=>{const i=z("icon");return h(),f("div",de,[ce,e("p",{class:"hint"},[B(" Don't have any account yet? "),e("span",{onClick:D},"Register here")]),e("div",ue,[e("form",{onSubmit:j(I,["prevent"])},[e("div",ve,[ge,e("span",{class:S(["input-icon",{"has-error":t(l).errorMessage.value}])},[k(e("input",{id:"login_email","onUpdate:modelValue":n[0]||(n[0]=o=>t(l).value.value=o),type:"email",name:"email"},null,512),[[F,t(l).value.value]]),b(i,{class:"icon",data:"@/assets/svg-icon/mail.svg?icon"})],2),t(l).errorMessage.value?(h(),f("div",me,M(t(l).errorMessage.value),1)):V("v-if",!0)]),e("div",_e,[he,e("span",{class:S(["input-icon",{"has-error":t(d).errorMessage.value}])},[k(e("input",{id:"login_password","onUpdate:modelValue":n[1]||(n[1]=o=>t(d).value.value=o),type:p.value?"text":"password",name:"password"},null,8,fe),[[$,t(d).value.value]]),b(i,{class:"icon toggle",data:t(H)(p.value),onClick:n[2]||(n[2]=o=>p.value=!p.value)},null,8,["data"])],2),t(d).errorMessage.value?(h(),f("div",we,M(t(d).errorMessage.value),1)):V("v-if",!0)]),ye],40,pe),Se])])}}});const Ve=ie(ke,[["__scopeId","data-v-ae808d1c"],["__file","/home/uche/apps/oly/oly_frontend/src/views/Signin.vue"]]);export{Ve as default};
//# sourceMappingURL=Signin.js.map
