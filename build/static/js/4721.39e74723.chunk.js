"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template_cra=self.webpackChunk_coreui_coreui_free_react_admin_template_cra||[]).push([[4721],{24721:(e,s,r)=>{r.r(s),r.d(s,{default:()=>w});var a=r(3550),t=r(85961),c=r(3354),n=r(3526),l=r(44101),i=r(44227),o=r(94590),d=r(80861),h=r(96105),m=r(81917),x=r(85504),p=r(30347),j=r(10825),u=r(25917),g=r(84709),y=r(97929),N=r(83910),f=r(65043),_=r(73216),b=r(35475),v=r(70579);const w=()=>{const[e,s]=(0,f.useState)(""),[r,w]=(0,f.useState)(""),[S,C]=(0,f.useState)(""),[k,I]=(0,f.useState)(!1),T=(0,_.Zp)();return(0,v.jsx)("div",{className:"bg-body-tertiary min-vh-100 d-flex flex-row align-items-center",children:(0,v.jsx)(n.T,{children:(0,v.jsx)(l.s,{className:"justify-content-center",children:(0,v.jsx)(i.U,{md:8,children:(0,v.jsxs)(o.x,{children:[(0,v.jsx)(d.E,{className:"p-4",children:(0,v.jsx)(h.W,{children:(0,v.jsxs)(m.q,{onSubmit:async s=>{s.preventDefault(),C("");try{if(!e||!r)return void C("\u0411\u04af\u0445 \u0442\u0430\u043b\u0431\u0430\u0440\u044b\u0433 \u0431\u04e9\u0433\u043b\u04e9\u043d\u04e9 \u04af\u04af");const s=new Headers;s.append("Content-Type","application/json");const a={method:"POST",headers:s,body:JSON.stringify({username:e,password:r})},t=await fetch("https://api.majorsoft.mn/api/login",a),c=await t.json();if(t.ok)if(c.isOK){const e=JSON.parse(c.json),s=(new Date).getTime()+1e3*e.expiresIn;localStorage.setItem("token",e.accessToken),localStorage.setItem("user-info",e.userId),localStorage.setItem("expiresIn",s),localStorage.setItem("isAuthenticated","true"),T("/dashboard")}else C(c.message);else C(c.message)}catch(a){C(a.message)}},children:[(0,v.jsx)("h1",{children:"\u041d\u044d\u0432\u0442\u0440\u044d\u0445"}),(0,v.jsx)("p",{className:"text-body-secondary",children:"\u0422\u0430 \u04e9\u04e9\u0440\u0438\u0439\u043d \u0431\u04af\u0440\u0442\u0433\u044d\u043b\u0442\u044d\u0439 \u0445\u0430\u044f\u0433\u0430\u0430\u0440 \u043d\u044d\u0432\u0442\u0440\u044d\u043d\u044d \u04af\u04af"}),(0,v.jsxs)(x.B,{className:"mb-3",children:[(0,v.jsx)(p.s,{children:(0,v.jsx)(c.Ay,{icon:a.o})}),(0,v.jsx)(j.O,{placeholder:"\u0425\u044d\u0440\u044d\u0433\u043b\u044d\u0433\u0447\u0438\u0439\u043d \u043d\u044d\u0440",autoComplete:"username",value:e,onChange:e=>s(e.target.value)})]}),(0,v.jsxs)(x.B,{className:"mb-4",children:[(0,v.jsx)(p.s,{children:(0,v.jsx)(c.Ay,{icon:t.q})}),(0,v.jsx)(j.O,{type:k?"text":"password",placeholder:"\u041d\u0443\u0443\u0446 \u04af\u0433",autoComplete:"current-password",value:r,onChange:e=>w(e.target.value)}),(0,v.jsx)(p.s,{type:"button",onClick:()=>{I(!k)},children:(0,v.jsx)(N.g,{icon:k?y.k6j:y.pS3})})]}),S&&(0,v.jsx)(u.k,{color:"danger",dismissible:!0,onClose:()=>C(""),children:S}),(0,v.jsxs)(l.s,{children:[(0,v.jsx)(i.U,{xs:6,children:(0,v.jsx)(g.Q,{type:"submit",color:"primary",className:"px-4",children:"\u041d\u044d\u0432\u0442\u0440\u044d\u0445"})}),(0,v.jsx)(i.U,{xs:6,className:"text-right",children:(0,v.jsx)(b.N_,{to:"/reset-password",children:(0,v.jsx)(g.Q,{color:"link",className:"px-0",children:"\u041d\u0443\u0443\u0446 \u04af\u0433 \u043c\u0430\u0440\u0442\u0441\u0430\u043d"})})})]})]})})}),(0,v.jsx)(d.E,{className:"text-white bg-primary py-5",children:(0,v.jsx)(h.W,{className:"text-center",children:(0,v.jsxs)("div",{children:[(0,v.jsx)("h2",{children:"\u0411\u04af\u0440\u0442\u0433\u04af\u04af\u043b\u044d\u0445"}),(0,v.jsx)("p",{children:"\u0411\u0438\u0437\u043d\u0435\u0441\u044d\u044d \u0443\u0445\u0430\u0430\u043b\u0433\u0430\u0430\u0440 \u0445\u044f\u043d\u0430"}),(0,v.jsx)(b.N_,{to:"/register",children:(0,v.jsx)(g.Q,{color:"primary",className:"mt-3",children:"\u041e\u0434\u043e\u043e \u0431\u04af\u0440\u0442\u0433\u04af\u04af\u043b\u044d\u0445"})})]})})})]})})})})})}},94590:(e,s,r)=>{r.d(s,{x:()=>i});var a=r(22378),t=r(65043),c=r(65173),n=r.n(c),l=r(25196),i=(0,t.forwardRef)((function(e,s){var r=e.children,c=e.className,n=(0,a.Tt)(e,["children","className"]);return t.createElement("div",(0,a.Cl)({className:(0,l.A)("card-group",c)},n,{ref:s}),r)}));i.propTypes={children:n().node,className:n().string},i.displayName="CCardGroup"}}]);
//# sourceMappingURL=4721.39e74723.chunk.js.map