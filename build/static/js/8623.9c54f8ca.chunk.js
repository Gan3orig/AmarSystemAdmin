"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template_cra=self.webpackChunk_coreui_coreui_free_react_admin_template_cra||[]).push([[8623,1004],{88623:(e,n,l)=>{l.r(n),l.d(n,{default:()=>D});var s=l(65043),a=l(44468),c=l(64214),r=l(88169),i=l(40031),d=l(3354),t=l(28589),o=l(3526),h=l(82316),x=l(1431),m=l(6139),u=l(39920),j=l(85976),f=l(77483),p=l(96105),v=l(80861),b=l(25104),y=l(44101),N=l(65823),C=l(56805),g=l(84709),E=l(93891),A=l(4303),w=l(67861),k=l(96528),T=l(3805),O=l(92845),S=l(2657),L=l(85504),B=l(10825),$=l(97397),P=l(4398),Q=l(12382),R=l(89689),_=l(16323),M=l(81917),I=l(44227),Y=l(85968),z=l(70579);const D=()=>{const[e,n]=(0,s.useState)(!1),[l,D]=(0,s.useState)(!1),[V,G]=(0,s.useState)(!1),[W,H]=(0,s.useState)([]),[Z,F]=(0,s.useState)([]),[q,U]=(0,s.useState)(""),[X,K]=(0,s.useState)(!1),[J,ee]=(0,s.useState)(!1),[ne,le]=(0,s.useState)(""),[se,ae]=(0,s.useState)(""),[ce,re]=(0,s.useState)(""),[ie,de]=(0,s.useState)(!1),[te,oe]=(0,s.useState)(""),[he,xe]=(0,s.useState)(""),[me,ue]=(0,s.useState)(""),[je,fe]=(0,s.useState)(""),[pe,ve]=(0,s.useState)(null);(0,s.useEffect)((()=>{(async()=>{const e={method:"GET",headers:{Accept:"application/json"}};try{const n=await fetch("https://api.ebarimt.mn/api/info/check/getBranchInfo",e),l=await n.json();console.log("API Data:",l);const s=Array.isArray(l)?l:l.data||[];if(Array.isArray(s)){const e=s.reduce(((e,n)=>{const{branchCode:l,branchName:s,subBranchCode:a,subBranchName:c}=n;return e[l]||(e[l]={branchCode:l,branchName:s,subBranches:[],location:"",contact:""}),e[l].subBranches.push({subBranchCode:a,subBranchName:c}),e}),{});H(Object.values(e))}else console.error("Unexpected data format:",s)}catch(n){console.error("Error fetching branch data:",n)}})()}),[]);const be=e=>{const n=e.target.value;U(n);const l=W.find((e=>e.branchCode===n));F(l?l.subBranches:[])};return(0,z.jsxs)("div",{className:"app-container d-flex flex-column",children:[(0,z.jsx)(t.O,{expand:"lg",className:"border rounded-3",children:(0,z.jsxs)(o.T,{fluid:!0,children:[(0,z.jsxs)(h.Z,{children:[" ",(0,z.jsxs)("h3",{children:[(0,z.jsx)(d.Ay,{icon:a.e})," \u0422\u043e\u0445\u0438\u0440\u0433\u043e\u043e"]})]}),(0,z.jsx)(x.S,{"aria-label":"Toggle navigation","aria-expanded":e,onClick:()=>n(!e)}),(0,z.jsx)(m.x,{className:"navbar-collapse",visible:e,children:(0,z.jsxs)(u.L,{children:[(0,z.jsx)(j.g,{className:"".concat(J?"border-bottom fw-bold":""),children:(0,z.jsx)(f.H,{active:!0,onClick:()=>{K(!1),ee(!0)},children:"\u041d\u044d\u043c\u044d\u043b\u0442 \u0442\u043e\u0445\u0438\u0440\u0433\u043e\u043e"})}),(0,z.jsx)(j.g,{className:"".concat(X?"border-bottom fw-bold":""," "),children:(0,z.jsx)(f.H,{onClick:()=>{K(!0),ee(!1)},className:"cursour-pointer",children:"\u0421\u0430\u043b\u0431\u0430\u0440\u0443\u0443\u0434"})})]})})]})}),(0,z.jsx)("main",{className:"content",children:(0,z.jsxs)(p.W,{className:"mx-2",children:[J&&(0,z.jsxs)(v.E,{children:[(0,z.jsx)(b.V,{children:"\u041d\u044d\u043c\u044d\u043b\u0442 \u0442\u043e\u0445\u0438\u0440\u0433\u043e\u043e"}),(0,z.jsxs)(p.W,{children:[(0,z.jsx)(y.s,{children:(0,z.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,z.jsxs)("div",{className:"d-flex flex-column gap-0",children:[(0,z.jsx)(N.A,{children:(0,z.jsx)("b",{children:"\u0417\u0430\u0445\u0438\u0430\u043b\u0433\u0430 \u0430\u0432\u0430\u0445"})}),(0,z.jsx)(N.A,{className:"md-2",children:(0,z.jsx)("i",{children:"\u0417\u0430\u0445\u0438\u0430\u043b\u0433\u0430 \u0445\u0430\u0434\u0433\u0430\u043b\u0430\u0445, \u0437\u0430\u0441\u0432\u0430\u0440\u043b\u0430\u0445, \u0437\u04e9\u0432\u0448\u04e9\u04e9\u0440\u04e9\u0445  \u0414\u044d\u043b\u0433\u044d\u0440\u044d\u043d\u0433\u04af\u0439"})})]}),(0,z.jsx)(C.Q,{className:"d-flex align-items-center",defaultChecked:!0})]})}),(0,z.jsx)(y.s,{children:(0,z.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,z.jsxs)("div",{className:"d-flex flex-column gap-0",children:[(0,z.jsx)(N.A,{children:(0,z.jsx)("b",{children:"\u041a\u0430\u0441\u0441 \u0445\u04af\u043b\u044d\u044d\u043b\u0446\u044d\u0445"})}),(0,z.jsx)(N.A,{children:(0,z.jsx)("i",{children:"\u041a\u0430\u0441\u0441\u044b\u043d \u04af\u043b\u0434\u044d\u0433\u0434\u043b\u0438\u0439\u043d \u0445\u044f\u043d\u0430\u043b\u0442, \u0431\u04af\u0440\u0442\u0433\u044d\u043b\u0414\u044d\u043b\u0433\u044d\u0440\u044d\u043d\u0433\u04af\u0439"})})]}),(0,z.jsx)(C.Q,{className:"d-flex align-items-center",defaultChecked:!0})]})}),(0,z.jsx)(y.s,{children:(0,z.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,z.jsxs)("div",{className:"d-flex flex-column gap-0",children:[(0,z.jsx)(N.A,{children:(0,z.jsx)("b",{children:"\u0426\u0430\u0433\u0438\u0439\u043d \u0442\u043e\u0445\u0438\u0440\u0433\u043e\u043e"})}),(0,z.jsx)(N.A,{children:(0,z.jsx)("i",{children:"\u0410\u0436\u0438\u043b\u0447\u0434\u044b\u043d \u0446\u0430\u0433\u0438\u0439\u043d \u0431\u04af\u0440\u0442\u0433\u044d\u043b, \u0446\u0430\u0433\u0438\u0439\u043d \u0442\u043e\u0445\u0438\u0440\u0443\u0443\u043b\u0433\u044b\u043d \u0445\u044f\u043d\u0430\u043b\u0442\u0414\u044d\u043b\u0433\u044d\u0440\u044d\u043d\u0433\u04af\u0439"})})]}),(0,z.jsx)(C.Q,{className:"d-flex align-items-center",defaultChecked:!0})]})}),(0,z.jsx)(y.s,{children:(0,z.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,z.jsxs)("div",{className:"d-flex flex-column gap-0",children:[(0,z.jsx)(N.A,{children:(0,z.jsx)("b",{children:"\u0413\u0430\u043b \u0442\u043e\u0433\u043e\u043e\u043d\u044b \u0417\u0430\u0445\u0438\u0430\u043b\u0433\u0430"})}),(0,z.jsx)(N.A,{children:(0,z.jsx)("i",{children:"\u0413\u0430\u043b  \u0442\u043e\u0433\u043e\u043e\u043d\u044b \u0437\u0430\u0445\u0438\u0430\u043b\u0433\u044b\u0433 \u0431\u0430\u0440\u0438\u043c\u0442 \u0445\u044d\u0432\u043b\u044d\u0433\u0447 \u0431\u043e\u043b\u043e\u043d \u0434\u044d\u043b\u0433\u044d\u0446 \u0440\u04af\u04af \u0438\u043b\u0433\u044d\u044d\u0445\u0414\u044d\u043b\u0433\u044d\u0440\u044d\u043d\u0433\u04af\u0439"})})]}),(0,z.jsx)(C.Q,{className:"d-flex align-items-center",defaultChecked:!0})]})}),(0,z.jsx)(y.s,{children:(0,z.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,z.jsxs)("div",{className:"d-flex flex-column gap-0",children:[(0,z.jsx)(N.A,{children:(0,z.jsx)("b",{children:"\u0425\u044d\u0440\u044d\u0433\u043b\u044d\u0433\u0447\u0438\u0439\u043d \u0434\u044d\u043b\u0433\u044d\u0446"})}),(0,z.jsx)(N.A,{children:(0,z.jsx)("i",{children:"\u0425\u0443\u0434\u0430\u043b\u0434\u0430\u043d \u0430\u0432\u0430\u043b\u0442 \u0445\u0438\u0439\u0445\u044d\u0434 \u0437\u0430\u0445\u0438\u0430\u043b\u0433\u044b\u043d \u043c\u044d\u0434\u044d\u044d\u043b\u043b\u0438\u0439\u0433 \u04af\u0439\u043b\u0447\u043b\u04af\u04af\u043b\u044d\u0433\u0447\u0438\u0434 \u0445\u0430\u0440\u0443\u0443\u043b\u0430\u0445\u0414\u044d\u043b\u0433\u044d\u0440\u044d\u043d\u0433\u04af\u0439"})})]}),(0,z.jsx)(C.Q,{className:"d-flex align-items-center",defaultChecked:!0})]})}),(0,z.jsx)(y.s,{children:(0,z.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,z.jsxs)("div",{className:"d-flex flex-column gap-0",children:[(0,z.jsx)(N.A,{children:(0,z.jsx)("b",{children:"\u0425\u043e\u043e\u043b\u043d\u044b \u0442\u04e9\u043b\u04e9\u0432"})}),(0,z.jsx)(N.A,{children:(0,z.jsx)("i",{children:"\u0425\u043e\u043e\u043b\u043d\u044b \u0437\u0430\u0445\u0438\u0430\u043b\u0433\u044b\u0433 \u044d\u043d\u0434 \u0438\u0434\u044d\u0445, \u0430\u0432\u0447 \u044f\u0432\u0430\u0445, \u0445\u04af\u0440\u0433\u044d\u043b\u0442\u0442\u044d\u0439 \u0433\u044d\u0441\u044d\u043d \u043c\u04e9\u043d \u0431\u0443\u0441\u0430\u0434 \u043d\u044d\u043c\u044d\u043b\u0442 \u0442\u04e9\u043b\u04e9\u0432\u0438\u0439\u0433 \u0442\u044d\u043c\u0434\u044d\u0433\u043b\u044d\u0445 \u0431\u043e\u043b\u043e\u043c\u0436\u0442\u043e\u0439\u0414\u044d\u043b\u0433\u044d\u0440\u044d\u043d\u0433\u04af\u0439"})})]}),(0,z.jsx)(C.Q,{className:"d-flex align-items-center",defaultChecked:!0})]})}),(0,z.jsx)(y.s,{children:(0,z.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,z.jsxs)("div",{className:"d-flex flex-column gap-0",children:[(0,z.jsx)(N.A,{children:(0,z.jsx)("b",{children:"\u0410\u044e\u0443\u043b\u0433\u04af\u0439 \u043d\u04e9\u04e9\u0446\u0438\u0439\u043d \u04af\u043b\u0434\u044d\u0433\u0434\u044d\u043b"})}),(0,z.jsx)(N.A,{children:(0,z.jsx)("i",{children:"\u0426\u04e9\u04e9\u043d \u0431\u0443\u044e\u0443 \u043d\u04e9\u04e9\u0446\u0433\u04af\u0439 \u0431\u0430\u0440\u0430\u0430\u043d\u044b \u043c\u044d\u0434\u044d\u044d\u043b\u044d\u043b \u0430\u0432\u0430\u0445\u0414\u044d\u043b\u0433\u044d\u0440\u044d\u043d\u0433\u04af\u0439"})})]}),(0,z.jsx)(C.Q,{className:"d-flex align-items-center",defaultChecked:!0})]})}),(0,z.jsx)(y.s,{children:(0,z.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,z.jsxs)("div",{className:"d-flex flex-column gap-0",children:[(0,z.jsx)(N.A,{children:(0,z.jsx)("b",{children:"\u0425\u0430\u0441\u0430\u0445 \u0431\u043e\u0440\u043b\u0443\u0443\u043b\u0430\u043b\u0442\u044b\u043d \u043c\u044d\u0434\u044d\u044d\u043b\u044d\u043b"})}),(0,z.jsx)(N.A,{children:(0,z.jsx)("i",{children:"\u04ae\u043b\u0434\u044d\u0433\u0434\u043b\u044d\u044d\u0441 \u0438\u0445 \u0431\u0430\u0440\u0430\u0430 \u0437\u0430\u0440\u0430\u0433\u0434\u0430\u0445 \u0433\u044d\u0436 \u0431\u0430\u0439\u0433\u0430\u0430\u0433 \u043a\u0430\u0441\u0441 \u0434\u044d\u044d\u0440 \u0441\u0430\u043d\u0443\u0443\u043b\u0430\u0445\u0414\u044d\u043b\u0433\u044d\u0440\u044d\u043d\u0433\u04af\u0439"})})]}),(0,z.jsx)(C.Q,{className:"d-flex align-items-center",defaultChecked:!0})]})}),(0,z.jsx)(y.s,{children:(0,z.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,z.jsxs)("div",{className:"d-flex flex-column gap-0",children:[(0,z.jsx)(N.A,{children:(0,z.jsx)("b",{children:"\u0411\u0430\u0440 \u043a\u043e\u0434\u043e\u043e\u0441 \u0436\u0438\u043d \u043e\u0440\u0443\u0443\u043b\u0430\u0445"})}),(0,z.jsx)(N.A,{children:(0,z.jsx)("i",{children:"\u0416\u0438\u043d \u043e\u0440\u0443\u0443\u043b\u0441\u0430\u043d \u0431\u0430\u0440\u0430\u0430\u043d\u044b \u0431\u0430\u0440 \u043a\u043e\u0434\u044b\u0433 \u0443\u043d\u0448\u0438\u0445\u0430\u0434 \u0436\u0438\u043d \u0431\u04af\u0440\u0442\u0433\u044d\u0445\u0414\u044d\u043b\u0433\u044d\u0440\u044d\u043d\u0433\u04af\u0439"})})]}),(0,z.jsx)(C.Q,{className:"d-flex align-items-center",defaultChecked:!0})]})})]})]}),(0,z.jsxs)(p.W,{className:"max-2",children:[J&&(0,z.jsxs)(v.E,{children:[(0,z.jsx)(b.V,{children:"\u041a\u0430\u0441\u0441\u044b\u043d \u0442\u04e9\u043b\u0431\u04e9\u0440\u0438\u0439\u043d \u0442\u04e9\u0440\u04e9\u043b"}),(0,z.jsx)(p.W,{children:(0,z.jsxs)(y.s,{children:[(0,z.jsx)("div",{className:"d-flex justify-content-between",children:(0,z.jsx)(g.Q,{color:"primary",children:" +\u0422\u04e9\u0440\u04e9\u043b \u043d\u044d\u043c\u044d\u0445"})}),(0,z.jsxs)(E._,{children:[(0,z.jsx)(A.w,{children:(0,z.jsxs)(w.Y,{children:[(0,z.jsx)(k.$,{children:(0,z.jsx)(T.C,{defaultChecked:!0})}),(0,z.jsx)(k.$,{children:"\u041d\u044d\u0440"}),(0,z.jsx)(k.$,{children:"\u0410\u043d\u0433\u0438\u043b\u0430\u043b"})]})}),(0,z.jsxs)(O.C,{children:[(0,z.jsxs)(w.Y,{children:[(0,z.jsx)(S.c,{children:(0,z.jsx)(T.C,{defaultChecked:!0})}),(0,z.jsx)(S.c,{children:"\u0411\u044d\u043b\u044d\u043d \u043c\u04e9\u043d\u0433\u04e9"}),(0,z.jsx)(S.c,{children:"\u0411\u044d\u043b\u044d\u043d \u043c\u04e9\u043d\u0433\u04e9"})]}),(0,z.jsxs)(w.Y,{children:[(0,z.jsx)(S.c,{children:(0,z.jsx)(T.C,{defaultChecked:!0})}),(0,z.jsx)(S.c,{children:"\u0414\u0430\u043d\u0441\u0430\u0430\u0440"}),(0,z.jsx)(S.c,{children:"\u0411\u044d\u043b\u044d\u043d \u0431\u0443\u0441"})]}),(0,z.jsxs)(w.Y,{children:[(0,z.jsx)(S.c,{children:(0,z.jsx)(T.C,{defaultChecked:!0})}),(0,z.jsx)(S.c,{children:"\u041a\u0430\u0440\u0442\u0430\u0430\u0440"}),(0,z.jsx)(S.c,{children:"\u0411\u044d\u043b\u044d\u043d \u0431\u0443\u0441"})]}),(0,z.jsxs)(w.Y,{children:[(0,z.jsx)(S.c,{children:(0,z.jsx)(T.C,{defaultChecked:!0})}),(0,z.jsx)(S.c,{children:"Voucher"}),(0,z.jsx)(S.c,{children:"\u0411\u044d\u043b\u044d\u043d \u0431\u0443\u0441"})]}),(0,z.jsxs)(w.Y,{children:[(0,z.jsx)(S.c,{children:(0,z.jsx)(T.C,{defaultChecked:!0})}),(0,z.jsx)(S.c,{children:"GiftCard"}),(0,z.jsx)(S.c,{children:"\u0411\u0443\u0441\u0430\u0434"})]})]})]})]})})]}),(0,z.jsx)(p.W,{className:"max-2",children:J&&(0,z.jsxs)(v.E,{children:[(0,z.jsx)(b.V,{children:"\u041d\u04e8\u0410\u0422-\u044b\u043d \u0431\u0430\u0440\u0438\u043c\u0442 \u0445\u044d\u0432\u043b\u044d\u0445"}),(0,z.jsxs)(p.W,{children:[(0,z.jsxs)("div",{className:"container mt-5",children:[!l&&(0,z.jsx)(g.Q,{color:"primary",onClick:()=>{D(!0)},children:"+\u0425\u04af\u0441\u044d\u043b\u0442 \u043d\u044d\u043c\u044d\u0445"}),l&&(0,z.jsxs)("div",{className:"mt-2",children:[(0,z.jsx)(N.A,{children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0435\u0440\u0438\u0439\u043d \u0434\u0443\u0433\u0430\u0430\u0440"}),(0,z.jsxs)(L.B,{className:"mb-2",children:[(0,z.jsx)(B.O,{id:"registrationNumber",placeholder:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0439\u043d \u0434\u0443\u0433\u0430\u0430\u0440",value:ne,onChange:e=>le(e.target.value)}),(0,z.jsx)(g.Q,{color:"primary",onClick:async()=>{const e="https://api.ebarimt.mn/api/info/check/getTinInfo?regNo=".concat(ne),n={method:"GET",headers:{Accept:"application/json"}};try{const l=await fetch(e,n),s=await l.json(),a=null===s||void 0===s?void 0:s.data;if(a){const e="https://api.ebarimt.mn/api/info/check/getInfo?tin=".concat(a),n={method:"GET",headers:{Accept:"application/json"}},l=await fetch(e,n),s=await l.json();console.log(s),ae(s.data.name),re(a),de(s.data.vatPayer)}}catch(l){console.error(l)}},children:"\u0428\u0430\u043b\u0433\u0430\u0445"})]}),(0,z.jsx)(N.A,{children:"\u0422\u0430\u0442\u0432\u0430\u0440 \u0442\u04e9\u043b\u04e9\u0433\u0447\u0438\u0439\u043d \u043d\u044d\u0440"}),(0,z.jsx)(B.O,{id:"taxPayerName",placeholder:"\u0422\u0430\u0442\u0432\u0430\u0440 \u0442\u04e9\u043b\u04e9\u0433\u0447\u0438\u0439\u043d \u043d\u044d\u0440",value:se,readOnly:!0}),(0,z.jsx)(N.A,{children:"\u0422\u0430\u0442\u0432\u0430\u0440 \u0442\u04e9\u043b\u04e9\u0433\u0447\u0438\u0439\u043d \u0434\u0443\u0433\u0430\u0430\u0440"}),(0,z.jsx)(B.O,{id:"taxpayerNo",placeholder:"\u0422\u0430\u0442\u0432\u0430\u0440 \u0442\u04e9\u043b\u04e9\u0433\u0447\u0438\u0439\u043d \u0434\u0443\u0433\u0430\u0430\u0440",value:ce,readOnly:!0}),(0,z.jsx)(T.C,{id:"flexCheckDefault",label:"\u041d\u04e8\u0410\u0422 \u0442\u04e9\u043b\u04e9\u0433\u0447 \u044d\u0441\u044d\u0445",checked:ie,readOnly:!0})]})]}),(0,z.jsxs)(E._,{children:[(0,z.jsxs)(w.Y,{children:[(0,z.jsx)(k.$,{children:(0,z.jsx)(T.C,{})}),(0,z.jsx)(k.$,{children:"\u0421\u0430\u043b\u0431\u0430\u0440"}),(0,z.jsx)(k.$,{children:"\u0414\u04af\u04af\u0440\u044d\u0433/\u0410\u0439\u043c\u0430\u0433"}),(0,z.jsx)(k.$,{children:"\u0425\u043e\u0440\u043e\u043e/\u0421\u0443\u043c "}),(0,z.jsx)(k.$,{children:"\u0422\u0435\u0440\u043c\u0438\u043d\u0430\u043b"}),(0,z.jsx)(k.$,{children:"\u0421\u0438\u0441\u0442\u0435\u043c\u0438\u0439\u043d \u0442\u04e9\u0440\u04e9\u043b "})]}),(0,z.jsx)(S.c,{children:(0,z.jsx)(T.C,{})}),(0,z.jsx)(S.c,{children:"hii"}),(0,z.jsx)(S.c,{children:(0,z.jsxs)($.M,{value:q,onChange:be,children:[(0,z.jsx)("option",{value:"",disabled:!0,children:"\u0421\u043e\u043d\u0433\u043e\u043d\u043e \u0443\u0443..."}),W.map((e=>(0,z.jsx)("option",{value:e.branchCode,children:e.branchName},e.branchCode)))]})}),(0,z.jsxs)(S.c,{children:[" ",(0,z.jsxs)($.M,{value:"",onChange:e=>{},children:[(0,z.jsx)("option",{value:"",disabled:!0,children:"\u0421\u043e\u043d\u0433\u043e\u043d\u043e \u0443\u0443..."}),Z.map((e=>(0,z.jsx)("option",{value:e.subBranchCode,children:e.subBranchName},e.subBranchCode)))]})]})]})]})]})}),(0,z.jsx)("div",{children:X&&(0,z.jsxs)("div",{children:[(0,z.jsxs)("div",{children:[(0,z.jsx)(g.Q,{color:"primary",onClick:()=>n(!0),children:"\u0421\u0430\u043b\u0431\u0430\u0440 \u043d\u044d\u043c\u044d\u0445"}),(0,z.jsxs)(E._,{children:[(0,z.jsx)(A.w,{children:(0,z.jsxs)(w.Y,{children:[(0,z.jsx)(k.$,{children:"#"}),(0,z.jsx)(k.$,{children:"\u041d\u044d\u0440"}),(0,z.jsx)(k.$,{children:"\u0425\u0430\u044f\u0433"}),(0,z.jsx)(k.$,{children:"\u041f\u043e\u0441 \u0442\u043e\u043e"}),(0,z.jsx)(k.$,{children:"Actions"})]})}),(0,z.jsx)(O.C,{children:W.map(((e,l)=>(0,z.jsxs)(w.Y,{children:[(0,z.jsx)(S.c,{children:l+1})," ",(0,z.jsx)(S.c,{children:e.branchName}),(0,z.jsx)(S.c,{children:e.location||"N/A"}),(0,z.jsx)(S.c,{children:e.subBranches.length}),(0,z.jsxs)(S.c,{children:[(0,z.jsx)(g.Q,{color:"warning",onClick:()=>(e=>{ve(e),oe(e.branchName),ue(e.location),fe(e.contact),n(!0)})(e),children:(0,z.jsx)(d.Ay,{icon:c.I})}),(0,z.jsx)(g.Q,{color:"danger",onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this branch?")){const l="https://api.ebarimt.mn/api/info/check/deleteBranch/".concat(e),s={method:"DELETE",headers:{Accept:"application/json"}};try{const n=await fetch(l,s);n.ok?H(W.filter((n=>n.branchCode!==e))):console.error("Failed to delete branch:",n.statusText)}catch(n){console.error("Error deleting branch:",n)}}})(e.branchCode),children:(0,z.jsx)(d.Ay,{icon:r.X})})]})]},e.branchCode)))})]})]}),(0,z.jsxs)("div",{children:[(0,z.jsx)(g.Q,{color:"primary",onClick:()=>G(!0),children:"\u041f\u043e\u0441 \u0442\u04e9\u0445\u04e9\u04e9\u0440\u04e9\u043c\u0436"}),(0,z.jsxs)(E._,{children:[(0,z.jsx)(A.w,{children:(0,z.jsxs)(w.Y,{children:[(0,z.jsx)(k.$,{children:"#"}),(0,z.jsx)(k.$,{children:"\u041d\u044d\u0440"}),(0,z.jsx)(k.$,{children:"\u0421\u0430\u043b\u0431\u0430\u0440"}),(0,z.jsx)(k.$,{children:"\u0422\u04e9\u043b\u04e9\u0432"}),(0,z.jsx)(k.$,{children:"\u0421\u0438\u0441\u0442\u0435\u043c"}),(0,z.jsx)(k.$,{children:"\u041d\u04e8\u0410\u0422"}),(0,z.jsx)(k.$,{children:"Actions"})]})}),(0,z.jsx)(O.C,{children:(0,z.jsxs)(w.Y,{children:[(0,z.jsx)(S.c,{children:"1"}),(0,z.jsx)(S.c,{children:"POS Device 1"}),(0,z.jsx)(S.c,{children:"Branch A"}),(0,z.jsx)(S.c,{children:"Active"}),(0,z.jsx)(S.c,{children:"Type 1"}),(0,z.jsx)(S.c,{children:"VAT Included"}),(0,z.jsxs)(S.c,{children:[(0,z.jsx)(g.Q,{color:"warning",onClick:()=>{return e=1,void console.log("Edit POS with ID: ".concat(e));var e},children:"Edit"}),(0,z.jsx)(g.Q,{color:"danger",onClick:()=>{return e=1,void console.log("Delete POS with ID: ".concat(e));var e},children:"Delete"})]})]})})]})]})]})})]}),(0,z.jsxs)(P.z,{visible:e,onClose:()=>n(!1),"aria-labelledby":"LiveDemoExampleLabel",children:[(0,z.jsx)(Q.E,{children:(0,z.jsx)(R.l,{id:"LiveDemoExampleLabel",children:pe?"\u0421\u0430\u043b\u0431\u0430\u0440 \u0437\u0430\u0441\u0430\u0445":"\u0421\u0430\u043b\u0431\u0430\u0440 \u0431\u04af\u0440\u0442\u0433\u04af\u04af\u043b\u044d\u0445"})}),(0,z.jsx)(_.T,{children:(0,z.jsxs)(M.q,{className:"row g-3",children:[(0,z.jsx)(y.s,{md:4,children:(0,z.jsx)(B.O,{type:"text",id:"OrganizationName",label:"\u0421\u0430\u043b\u0431\u0430\u0440\u044b\u043d \u043d\u044d\u0440",value:te,onChange:e=>oe(e.target.value)})}),(0,z.jsx)(y.s,{md:4,children:(0,z.jsxs)($.M,{id:"OrganizationType",label:"\u0421\u0430\u043b\u0431\u0430\u0440\u044b\u043d \u0442\u04e9\u0440\u04e9\u043b",value:he,onChange:e=>xe(e.target.value),children:[(0,z.jsx)("option",{value:"",disabled:!0,children:"\u0421\u043e\u043d\u0433\u043e\u043d\u043e \u0443\u0443..."}),(0,z.jsx)("option",{value:"store",children:"\u0414\u044d\u043b\u0433\u04af\u04af\u0440"}),(0,z.jsx)("option",{value:"restaurant",children:"\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d"}),(0,z.jsx)("option",{value:"fastfood",children:"\u0422\u04af\u0440\u0433\u044d\u043d \u0445\u043e\u043e\u043b"}),(0,z.jsx)("option",{value:"salon",children:"\u0421\u0430\u043b\u043e\u043d"}),(0,z.jsx)("option",{value:"pharmacy",children:"\u042d\u043c\u0438\u0439\u043d \u0441\u0430\u043d"}),(0,z.jsx)("option",{value:"hotel",children:"\u0417\u043e\u0447\u0438\u0434 \u0411\u0443\u0443\u0434\u0430\u043b"})]})}),(0,z.jsx)(y.s,{md:4,children:(0,z.jsxs)($.M,{id:"branchName",label:"\u0410\u0439\u043c\u0430\u0433/X\u043e\u0442",value:q,onChange:be,children:[(0,z.jsx)("option",{value:"",disabled:!0,children:"\u0421\u043e\u043d\u0433\u043e\u043d\u043e \u0443\u0443..."}),W.map((e=>(0,z.jsx)("option",{value:e.branchCode,children:e.branchName},e.branchCode)))]})}),(0,z.jsx)(y.s,{md:4,children:(0,z.jsxs)($.M,{id:"subbranchName",label:"C\u0443\u043c/\u0414\u04af\u04af\u0440\u044d\u0433",value:"",onChange:e=>{},children:[(0,z.jsx)("option",{value:"",disabled:!0,children:"\u0421\u043e\u043d\u0433\u043e\u043d\u043e \u0443\u0443..."}),Z.map((e=>(0,z.jsx)("option",{value:e.subBranchCode,children:e.subBranchName},e.subBranchCode)))]})}),(0,z.jsx)(y.s,{md:4,children:(0,z.jsx)(B.O,{type:"text",id:"branchAddress",label:"\u0421\u0430\u043b\u0431\u0430\u0440\u044b\u043d \u0445\u0430\u044f\u0433",value:me,onChange:e=>ue(e.target.value)})}),(0,z.jsx)(y.s,{md:3,children:(0,z.jsx)(d.Ay,{icon:i.z})}),(0,z.jsx)(y.s,{md:3,children:(0,z.jsx)(B.O,{type:"text",id:"branchPhoneNumber",label:"\u0423\u0442\u0430\u0441",value:je,onChange:e=>fe(e.target.value)})}),(0,z.jsx)(I.U,{xs:12,children:(0,z.jsx)(g.Q,{color:"primary",type:"button",onClick:()=>{const e={branchCode:Date.now(),branchName:te,location:me,contact:je,subBranches:[]};pe?(H(W.map((n=>n.branchCode===pe.branchCode?e:n))),ve(null)):H([...W,e]),oe(""),xe(""),ue(""),fe(""),n(!1)},children:"Save changes"})})]})}),(0,z.jsx)(Y.I,{children:(0,z.jsx)(g.Q,{color:"secondary",onClick:()=>n(!1)})})]}),(0,z.jsxs)(P.z,{visible:V,onClose:()=>G(!1),"aria-labelledby":"PosModalLabel",children:[(0,z.jsx)(Q.E,{children:(0,z.jsx)(R.l,{id:"PosModalLabel",children:"\u041f\u041e\u0421 \u0442\u04e9\u0445\u04e9\u04e9\u0440\u04e9\u043c\u0436 \u0431\u04af\u0440\u0442\u0433\u04af\u04af\u043b\u044d\u0445"})}),(0,z.jsx)(_.T,{children:(0,z.jsxs)(M.q,{className:"row g-3",children:[(0,z.jsx)(y.s,{md:4,children:(0,z.jsx)(B.O,{type:"text",id:"posName",label:"\u041f\u041e\u0421 \u043d\u044d\u0440"})}),(0,z.jsx)(y.s,{md:4,children:(0,z.jsxs)($.M,{id:"posBranch",label:"\u0421\u0430\u043b\u0431\u0430\u0440",value:"",onChange:()=>{},children:[(0,z.jsx)("option",{value:"",disabled:!0,children:"\u0421\u043e\u043d\u0433\u043e\u043d\u043e \u0443\u0443..."}),W.map((e=>(0,z.jsx)("option",{value:e.branchCode,children:e.branchName},e.branchCode)))]})}),(0,z.jsx)(y.s,{md:4,children:(0,z.jsxs)($.M,{id:"posSystemType",label:"\u0421\u0438\u0441\u0442\u0435\u043c\u0438\u0439\u043d \u0442\u04e9\u0440\u04e9\u043b",value:"",onChange:()=>{},children:[(0,z.jsx)("option",{value:"",disabled:!0,children:"\u0421\u043e\u043d\u0433\u043e\u043d\u043e \u0443\u0443..."}),(0,z.jsx)("option",{value:"type1",children:"\u0422\u04e9\u0440\u04e9\u043b 1"}),(0,z.jsx)("option",{value:"type2",children:"\u0422\u04e9\u0440\u04e9\u043b 2"}),(0,z.jsx)("option",{value:"type3",children:"\u0422\u04e9\u0440\u04e9\u043b 3"})]})})]})}),(0,z.jsx)(Y.I,{})]})]})})]})}},44468:(e,n,l)=>{l.d(n,{e:()=>s});var s=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z' class='ci-primary'/>"]},46125:(e,n,l)=>{l.d(n,{W:()=>o});var s=l(22378),a=l(65043),c=l(65173),r=l.n(c),i=l(25196),d=l(94462),t=l(80413),o=(0,a.forwardRef)((function(e,n){var l=e.className,c=void 0===l?"modal-backdrop":l,r=e.visible,o=(0,s.Tt)(e,["className","visible"]),h=(0,a.useRef)(null),x=(0,d.E2)(n,h);return a.createElement(t.Ay,{in:r,mountOnEnter:!0,nodeRef:h,timeout:150,unmountOnExit:!0},(function(e){return a.createElement("div",(0,s.Cl)({className:(0,i.A)(c,"fade",{show:"entered"===e})},o,{ref:x}))}))}));o.propTypes={className:r().string,visible:r().bool},o.displayName="CBackdrop"},372:(e,n,l)=>{l.d(n,{Y:()=>i});var s=l(65043),a=l(97950),c=l(65173),r=l.n(c),i=function(e){var n=e.children,l=e.container,c=e.portal,r=(0,s.useState)(null),i=r[0],d=r[1];return(0,s.useEffect)((function(){c&&d(function(e){return e?"function"===typeof e?e():e:document.body}(l)||document.body)}),[l,c]),"undefined"!==typeof window&&c&&i?(0,a.createPortal)(n,i):s.createElement(s.Fragment,null,n)};i.propTypes={children:r().node,container:r().any,portal:r().bool},i.displayName="CConditionalPortal"},4398:(e,n,l)=>{l.d(n,{z:()=>j,m:()=>u});var s=l(22378),a=l(65043),c=l(65173),r=l.n(c),i=l(25196),d=l(46125),t=l(372),o=(0,a.forwardRef)((function(e,n){var l=e.children,c=e.className,r=(0,s.Tt)(e,["children","className"]);return a.createElement("div",(0,s.Cl)({className:(0,i.A)("modal-content",c)},r,{ref:n}),l)}));o.propTypes={children:r().node,className:r().string},o.displayName="CModalContent";var h=(0,a.forwardRef)((function(e,n){var l,c=e.children,r=e.alignment,d=e.className,t=e.fullscreen,o=e.scrollable,h=e.size,x=(0,s.Tt)(e,["children","alignment","className","fullscreen","scrollable","size"]);return a.createElement("div",(0,s.Cl)({className:(0,i.A)("modal-dialog",(l={"modal-dialog-centered":"center"===r},l["boolean"===typeof t?"modal-fullscreen":"modal-fullscreen-".concat(t,"-down")]=t,l["modal-dialog-scrollable"]=o,l["modal-".concat(h)]=h,l),d)},x,{ref:n}),c)}));h.propTypes={alignment:r().oneOf(["top","center"]),children:r().node,className:r().string,fullscreen:r().oneOfType([r().bool,r().oneOf(["sm","md","lg","xl","xxl"])]),scrollable:r().bool,size:r().oneOf(["sm","lg","xl"])},h.displayName="CModalDialog";var x=l(94462),m=l(80413),u=(0,a.createContext)({}),j=(0,a.forwardRef)((function(e,n){var l=e.children,c=e.alignment,r=e.backdrop,j=void 0===r||r,f=e.className,p=e.duration,v=void 0===p?150:p,b=e.focus,y=void 0===b||b,N=e.fullscreen,C=e.keyboard,g=void 0===C||C,E=e.onClose,A=e.onClosePrevented,w=e.onShow,k=e.portal,T=void 0===k||k,O=e.scrollable,S=e.size,L=e.transition,B=void 0===L||L,$=e.unmountOnClose,P=void 0===$||$,Q=e.visible,R=(0,s.Tt)(e,["children","alignment","backdrop","className","duration","focus","fullscreen","keyboard","onClose","onClosePrevented","onShow","portal","scrollable","size","transition","unmountOnClose","visible"]),_=(0,a.useRef)(null),M=(0,a.useRef)(null),I=(0,a.useRef)(null),Y=(0,x.E2)(n,M),z=(0,a.useState)(Q),D=z[0],V=z[1],G=(0,a.useState)(!1),W=G[0],H=G[1],Z={visible:D,setVisible:V};(0,a.useEffect)((function(){V(Q)}),[Q]),(0,a.useEffect)((function(){var e;return D?(_.current=document.activeElement,document.addEventListener("mouseup",q),document.addEventListener("keydown",U)):null===(e=_.current)||void 0===e||e.focus(),function(){document.removeEventListener("mouseup",q),document.removeEventListener("keydown",U)}}),[D]);var F=function(){return"static"===j?H(!0):(V(!1),E&&E())};(0,a.useLayoutEffect)((function(){A&&A(),setTimeout((function(){return H(!1)}),v)}),[W]),(0,a.useLayoutEffect)((function(){return D?(document.body.classList.add("modal-open"),j&&(document.body.style.overflow="hidden",document.body.style.paddingRight="0px"),setTimeout((function(){var e;y&&(null===(e=M.current)||void 0===e||e.focus())}),B?v:0)):(document.body.classList.remove("modal-open"),j&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))),function(){document.body.classList.remove("modal-open"),j&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))}}),[D]);var q=function(e){M.current&&M.current==e.target&&F()},U=function(e){"Escape"===e.key&&g&&F()};return a.createElement(a.Fragment,null,a.createElement(m.Ay,{in:D,mountOnEnter:!0,nodeRef:M,onEnter:w,onExit:E,unmountOnExit:P,timeout:B?v:0},(function(e){return a.createElement(t.Y,{portal:T},a.createElement(u.Provider,{value:Z},a.createElement("div",(0,s.Cl)({className:(0,i.A)("modal",{"modal-static":W,fade:B,show:"entered"===e},f),tabIndex:-1},D?{"aria-modal":!0,role:"dialog"}:{"aria-hidden":"true"},{style:(0,s.Cl)({},"exited"!==e&&{display:"block"})},R,{ref:Y}),a.createElement(h,{alignment:c,fullscreen:N,scrollable:O,size:S},a.createElement(o,{ref:I},l)))))})),j&&a.createElement(t.Y,{portal:T},a.createElement(d.W,{visible:D})))}));j.propTypes={alignment:r().oneOf(["top","center"]),backdrop:r().oneOfType([r().bool,r().oneOf(["static"])]),children:r().node,className:r().string,duration:r().number,focus:r().bool,fullscreen:r().oneOfType([r().bool,r().oneOf(["sm","md","lg","xl","xxl"])]),keyboard:r().bool,onClose:r().func,onClosePrevented:r().func,onShow:r().func,portal:r().bool,scrollable:r().bool,size:r().oneOf(["sm","lg","xl"]),transition:r().bool,unmountOnClose:r().bool,visible:r().bool},j.displayName="CModal"},16323:(e,n,l)=>{l.d(n,{T:()=>d});var s=l(22378),a=l(65043),c=l(65173),r=l.n(c),i=l(25196),d=(0,a.forwardRef)((function(e,n){var l=e.children,c=e.className,r=(0,s.Tt)(e,["children","className"]);return a.createElement("div",(0,s.Cl)({className:(0,i.A)("modal-body",c)},r,{ref:n}),l)}));d.propTypes={children:r().node,className:r().string},d.displayName="CModalBody"},85968:(e,n,l)=>{l.d(n,{I:()=>d});var s=l(22378),a=l(65043),c=l(65173),r=l.n(c),i=l(25196),d=(0,a.forwardRef)((function(e,n){var l=e.children,c=e.className,r=(0,s.Tt)(e,["children","className"]);return a.createElement("div",(0,s.Cl)({className:(0,i.A)("modal-footer",c)},r,{ref:n}),l)}));d.propTypes={children:r().node,className:r().string},d.displayName="CModalFooter"},12382:(e,n,l)=>{l.d(n,{E:()=>o});var s=l(22378),a=l(65043),c=l(65173),r=l.n(c),i=l(25196),d=l(90436),t=l(4398),o=(0,a.forwardRef)((function(e,n){var l=e.children,c=e.className,r=e.closeButton,o=void 0===r||r,h=(0,s.Tt)(e,["children","className","closeButton"]),x=(0,a.useContext)(t.m).setVisible;return a.createElement("div",(0,s.Cl)({className:(0,i.A)("modal-header",c)},h,{ref:n}),l,o&&a.createElement(d.E,{onClick:function(){return x(!1)}}))}));o.propTypes={children:r().node,className:r().string,closeButton:r().bool},o.displayName="CModalHeader"},85976:(e,n,l)=>{l.d(n,{g:()=>t});var s=l(22378),a=l(65043),c=l(65173),r=l.n(c),i=l(25196),d=l(77483),t=(0,a.forwardRef)((function(e,n){var l=e.children,c=e.as,r=void 0===c?"li":c,t=e.className,o=(0,s.Tt)(e,["children","as","className"]);return a.createElement(r,{className:(0,i.A)("nav-item",t),ref:n},o.href||o.to?a.createElement(d.H,(0,s.Cl)({className:t},o),l):l)}));t.propTypes={as:r().elementType,children:r().node,className:r().string},t.displayName="CNavItem"},77483:(e,n,l)=>{l.d(n,{H:()=>h});var s=l(22378),a=l(65043),c=l(65173),r=l.n(c),i=l(25196),d=l(90777),t=l(476),o=l(94462),h=(0,a.forwardRef)((function(e,n){var l=e.children,c=e.className,r=e.idx,h=(0,s.Tt)(e,["children","className","idx"]),x=(0,a.useRef)(null),m=(0,o.E2)(n,x),u=(0,a.useContext)(t.c).setVisibleGroup;return(0,a.useEffect)((function(){var e;h.active=null===(e=x.current)||void 0===e?void 0:e.classList.contains("active"),r&&h.active&&u(r)}),[h.active,c]),a.createElement(d.K,(0,s.Cl)({className:(0,i.A)("nav-link",c)},h,{ref:m}),l)}));h.propTypes={active:r().bool,as:r().elementType,children:r().node,className:r().string,disabled:r().bool,idx:r().string},h.displayName="CNavLink"},476:(e,n,l)=>{l.d(n,{T:()=>o,c:()=>d});var s=l(22378),a=l(65043),c=l(65173),r=l.n(c),i=l(25196),d=(0,a.createContext)({}),t=function(e,n,l){return a.Children.map(e,(function(e,s){if(!a.isValidElement(e)||"CNavGroup"!==e.type.displayName&&"CNavLink"!==e.type.displayName&&"CNavItem"!==e.type.displayName)return e;var c=n?l?"".concat(n,".").concat(s):"".concat(n):"".concat(s);return e.props&&e.props.children?a.cloneElement(e,{idx:c,children:t(e.props.children,c,"CNavItem"!==e.type.displayName)}):a.cloneElement(e,{idx:c})}))},o=(0,a.forwardRef)((function(e,n){var l=e.children,c=e.as,r=void 0===c?"ul":c,o=e.className,h=(0,s.Tt)(e,["children","as","className"]),x=(0,a.useState)(""),m={visibleGroup:x[0],setVisibleGroup:x[1]};return a.createElement(d.Provider,{value:m},a.createElement(r,(0,s.Cl)({className:(0,i.A)("sidebar-nav",o),ref:n},h),t(l)))}));o.propTypes={as:r().elementType,children:r().node,className:r().string},o.displayName="CSidebarNav"}}]);
//# sourceMappingURL=8623.9c54f8ca.chunk.js.map