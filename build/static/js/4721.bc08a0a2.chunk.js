"use strict";(self.webpackChunk_coreui_AmarSystem=self.webpackChunk_coreui_AmarSystem||[]).push([[4721],{24721:(e,s,r)=>{r.r(s),r.d(s,{default:()=>A});var a=r(3550),t=r(85961),n=r(3354),l=r(3526),i=r(44101),c=r(44227),o=r(94590),d=r(80861),h=r(96105),x=r(81917),m=r(85504),p=r(30347),j=r(10825),u=r(25917),g=r(84709),y=r(57919),f=r(97929),N=r(83910),S=r(65043),b=r(73216),w=r(35475),C=r(76547),v=r(74117),k=r(70579);const A=()=>{const{t:e,i18n:s}=(0,v.Bd)(),[r,A]=(0,S.useState)(""),[I,O]=(0,S.useState)(""),[T,_]=(0,S.useState)(""),[B,E]=(0,S.useState)(!1),[D,J]=(0,S.useState)(!1),Q=(0,C.k)(),U=(0,b.Zp)();(0,S.useEffect)((()=>{Q&&U("/")}),[Q,U]);return(0,k.jsx)("div",{className:"bg-body-tertiary min-vh-100 d-flex flex-row align-items-center",children:(0,k.jsx)(l.T,{children:(0,k.jsx)(i.s,{className:"justify-content-center",children:(0,k.jsx)(c.U,{md:8,children:(0,k.jsxs)(o.x,{children:[(0,k.jsx)(d.E,{className:"p-4",children:(0,k.jsx)(h.W,{children:(0,k.jsxs)(x.q,{onSubmit:async s=>{if(s.preventDefault(),_(""),!r||!I)return void _(e("fillCredentials"));J(!0);const a=new Headers;a.append("Content-Type","application/json");const t={method:"POST",headers:a,body:JSON.stringify({username:r,password:I})};try{const e=await fetch("https://api.majorsoft.mn/api/login",t),s=await e.json();if(e.ok)if(s.isOK){const e=JSON.parse(s.json),r=e.expiresIn;localStorage.setItem("token",e.accessToken),localStorage.setItem("user-info",e.userId),localStorage.setItem("expiryDate",r),localStorage.setItem("isAuthenticated",!0),U("/Dashboard")}else _(s.message);else _(s.message)}catch(n){_(n.message)}finally{J(!1)}},children:[(0,k.jsx)("h2",{children:e("login")}),(0,k.jsx)("p",{className:"text-body-secondary",children:e("enterCredentials")}),(0,k.jsxs)(m.B,{className:"mb-3",children:[(0,k.jsx)(p.s,{children:(0,k.jsx)(n.Ay,{icon:a.o})}),(0,k.jsx)(j.O,{type:"text",placeholder:e("username"),autoComplete:"username",value:r,onChange:e=>A(e.target.value)})]}),(0,k.jsxs)(m.B,{className:"mb-4",children:[(0,k.jsx)(p.s,{children:(0,k.jsx)(n.Ay,{icon:t.q})}),(0,k.jsx)(j.O,{type:B?"text":"password",placeholder:e("password"),autoComplete:"current-password",value:I,onChange:e=>O(e.target.value)}),(0,k.jsx)(p.s,{type:"button",onClick:()=>{E(!B)},children:(0,k.jsx)(N.g,{icon:B?f.k6j:f.pS3})})]}),T&&(0,k.jsx)(u.k,{color:"danger",dismissible:!0,onClose:()=>_(""),children:T}),(0,k.jsxs)(i.s,{children:[(0,k.jsx)(c.U,{xs:6,children:(0,k.jsx)(g.Q,{type:"submit",color:"primary",className:"px-4",disabled:D,children:D?(0,k.jsx)(y.J,{size:"sm"}):e("login")})}),(0,k.jsx)(c.U,{xs:6,className:"text-right",children:(0,k.jsx)(w.N_,{to:"/reset-password",children:(0,k.jsx)(g.Q,{color:"link",className:"px-0",children:e("forgotPassword")})})})]})]})})}),(0,k.jsx)(d.E,{className:"text-white bg-primary py-5",children:(0,k.jsx)(h.W,{className:"text-center",children:(0,k.jsxs)("div",{children:[(0,k.jsx)("h2",{children:e("register")}),(0,k.jsx)("p",{children:e("registerBusiness")}),(0,k.jsx)(w.N_,{to:"/register",children:(0,k.jsx)(g.Q,{color:"primary",className:"mt-3",children:e("nowRegister")})})]})})})]})})})})})}},94590:(e,s,r)=>{r.d(s,{x:()=>c});var a=r(22378),t=r(65043),n=r(65173),l=r.n(n),i=r(25196),c=(0,t.forwardRef)((function(e,s){var r=e.children,n=e.className,l=(0,a.Tt)(e,["children","className"]);return t.createElement("div",(0,a.Cl)({className:(0,i.A)("card-group",n)},l,{ref:s}),r)}));c.propTypes={children:l().node,className:l().string},c.displayName="CCardGroup"}}]);
//# sourceMappingURL=4721.bc08a0a2.chunk.js.map