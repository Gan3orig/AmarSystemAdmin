"use strict";(self.webpackChunk_coreui_AmarSystem=self.webpackChunk_coreui_AmarSystem||[]).push([[7545],{27545:(e,a,l)=>{l.r(a),l.d(a,{default:()=>y});var n=l(65043),t=l(4398),r=l(12382),i=l(89689),s=l(16323),c=l(81917),d=l(44101),o=l(10825),m=l(97397),u=l(65823),b=l(85504),h=l(3805),p=l(61706),f=l(84709),v=l(85968),x=(l(83910),l(3354)),j=l(70579);const y=()=>{const[e,a]=(0,n.useState)(!1),[l,y]=(0,n.useState)([]),[k,g]=(0,n.useState)([]),[C,N]=(0,n.useState)(""),[E,A]=(0,n.useState)(null),[S,B]=(0,n.useState)("");(0,n.useEffect)((()=>{(async()=>{const e={method:"GET",headers:{Accept:"application/json"}};try{const a=await fetch("https://api.ebarimt.mn/api/info/check/getBranchInfo",e),l=await a.json();console.log("API Data:",l);const n=Array.isArray(l)?l:l.data||[];if(Array.isArray(n)){const e=n.reduce(((e,a)=>{const{branchCode:l,branchName:n,subBranchCode:t,subBranchName:r}=a;return e[l]||(e[l]={branchCode:l,branchName:n,subBranches:[]}),e[l].subBranches.push({subBranchCode:t,subBranchName:r}),e}),{});y(Object.values(e))}else console.error("Unexpected data format:",n)}catch(a){console.error("Error fetching branch data:",a)}})();const e=document.createElement("script");return e.src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places",e.async=!0,e.onload=()=>{if(window.google){const e=new window.google.maps.places.Autocomplete(document.getElementById("addressInput"),{types:["address"]});A(e),e.addListener("place_changed",(()=>{const a=e.getPlace();B(a.formatted_address||"")}))}},document.head.appendChild(e),()=>{document.head.removeChild(e)}}),[]);return(0,j.jsxs)("div",{className:"app-container",children:[(0,j.jsxs)("nav",{className:"sidebar",children:[(0,j.jsx)("h2",{children:"\u0422\u043e\u0445\u0438\u0440\u0433\u043e\u043e"}),(0,j.jsx)("h3",{children:"\u0421\u0430\u043b\u0431\u0430\u0440\u0443\u0443\u0434"}),(0,j.jsxs)("ul",{children:[(0,j.jsx)("li",{onClick:()=>a(!0),children:"\u0421\u0430\u043b\u0431\u0430\u0440"}),(0,j.jsx)("li",{children:"\u041f\u043e\u0441 \u0442\u04e9\u0445\u04e9\u04e9\u0440\u04e9\u043c\u0436"}),(0,j.jsx)("li",{children:"\u0417\u0430\u0445\u0438\u0430\u043b\u0433\u0430 \u0430\u0432\u0430\u0445 \u0431\u0430\u0439\u0440\u0448\u0438\u043b"}),(0,j.jsx)("li",{children:"\u0420\u0435\u043a\u043b\u0430\u043c"})]})]}),(0,j.jsx)("main",{className:"content",children:(0,j.jsxs)(t.z,{visible:e,onClose:()=>a(!1),"aria-labelledby":"LiveDemoExampleLabel",children:[(0,j.jsx)(r.E,{children:(0,j.jsx)(i.l,{id:"LiveDemoExampleLabel",children:"\u0421\u0430\u043b\u0431\u0430\u0440 \u0431\u04af\u0440\u0442\u0433\u04af\u04af\u043b\u044d\u0445"})}),(0,j.jsx)(s.T,{children:(0,j.jsxs)(c.q,{className:"row g-3",onSubmit:e=>{e.preventDefault(),console.log("Form submitted with address:",S)},children:[(0,j.jsx)(d.s,{md:4,children:(0,j.jsx)(o.O,{type:"text",id:"OrganizationName",label:"\u0421\u0430\u043b\u0431\u0430\u0440\u044b\u043d \u043d\u044d\u0440",defaultValue:"\u0421\u0430\u043b\u0431\u0430\u0440\u044b\u043d \u043d\u044d\u0440 \u0431\u0443\u0441\u0430\u0434 \u0441\u0430\u043b\u0431\u0430\u0440\u0430\u0430\u0441 \u044f\u043b\u0433\u0430\u0430\u0442\u0430\u0439 \u0431\u0430\u0439\u0445 \u0451\u0441\u0442\u043e\u0439",required:!0})}),(0,j.jsx)(d.s,{md:4,children:(0,j.jsxs)(m.M,{id:"branchName",label:"\u0421\u0443\u043c \u0434\u04af\u04af\u0440\u044d\u0433",value:C,onChange:e=>{const a=e.target.value;N(a);const n=l.find((e=>e.branchCode===a));g(n?n.subBranches:[])},required:!0,children:[(0,j.jsx)("option",{value:"",disabled:!0,children:"\u0421\u043e\u043d\u0433\u043e\u043d\u043e \u0443\u0443..."}),l.map((e=>(0,j.jsx)("option",{value:e.branchCode,children:e.branchName},e.branchCode)))]})}),(0,j.jsx)(d.s,{md:4,children:(0,j.jsxs)(m.M,{id:"subbranchName",label:"\u0425\u043e\u0440\u043e\u043e",required:!0,children:[(0,j.jsx)("option",{value:"",disabled:!0,children:"\u0421\u043e\u043d\u0433\u043e\u043d\u043e \u0443\u0443..."}),k.map((e=>(0,j.jsx)("option",{value:e.subBranchCode,children:e.subBranchName},e.subBranchCode)))]})}),(0,j.jsxs)(d.s,{md:4,children:[(0,j.jsx)(u.A,{htmlFor:"addressInput",children:"\u0411\u0430\u0439\u0440\u0448\u0438\u043b"}),(0,j.jsxs)(b.B,{className:"has-validation",children:[(0,j.jsx)(b.B.Prepend,{children:(0,j.jsx)(b.B.Text,{children:(0,j.jsx)(x.Ay,{})})}),(0,j.jsx)(o.O,{type:"text",id:"addressInput",value:S,"aria-describedby":"inputGroupPrepend03",onChange:e=>B(e.target.value),required:!0})]})]}),(0,j.jsxs)(d.s,{md:6,children:[(0,j.jsx)(u.A,{htmlFor:"validationServer03",children:"\u0421\u0430\u043b\u0431\u0430\u0440 \u0431\u0430\u0439\u0440\u0448\u0438\u043b"}),(0,j.jsx)(o.O,{type:"text",id:"validationServer03",value:S,onChange:e=>B(e.target.value),required:!0})]}),(0,j.jsx)(d.s,{md:3,children:(0,j.jsx)(o.O,{type:"text",id:"validationServer05",label:"\u0423\u0442\u0430\u0441\u043d\u044b \u0434\u0443\u0433\u0430\u0430\u0440",required:!0})}),(0,j.jsxs)(d.s,{xs:12,children:[(0,j.jsx)(h.C,{type:"checkbox",id:"invalidCheck",label:"Agree to terms and conditions",required:!0}),(0,j.jsx)(p.T,{invalid:!0,children:"You must agree before submitting."})]}),(0,j.jsx)(d.s,{xs:12,children:(0,j.jsx)(f.Q,{color:"primary",type:"submit",children:"Submit form"})})]})}),(0,j.jsxs)(v.I,{children:[(0,j.jsx)(f.Q,{color:"secondary",onClick:()=>a(!1),children:"Close"}),(0,j.jsx)(f.Q,{color:"primary",type:"submit",children:"Save changes"})]})]})})]})}},3805:(e,a,l)=>{l.d(a,{C:()=>m});var n=l(22378),t=l(65043),r=l(65173),i=l.n(r),s=l(25196),c=l(41935),d=l(65823),o=l(94462),m=(0,t.forwardRef)((function(e,a){var l=e.className,r=e.button,i=e.feedback,m=e.feedbackInvalid,u=e.feedbackValid,b=e.floatingLabel,h=e.tooltipFeedback,p=e.hitArea,f=e.id,v=e.indeterminate,x=e.inline,j=e.invalid,y=e.label,k=e.reverse,g=e.type,C=void 0===g?"checkbox":g,N=e.valid,E=(0,n.Tt)(e,["className","button","feedback","feedbackInvalid","feedbackValid","floatingLabel","tooltipFeedback","hitArea","id","indeterminate","inline","invalid","label","reverse","type","valid"]),A=(0,t.useRef)(null),S=(0,o.E2)(a,A);(0,t.useEffect)((function(){A.current&&v&&(A.current.indeterminate=v)}),[v,A.current]);var B=function(){return t.createElement("input",(0,n.Cl)({type:C,className:(0,s.A)(r?"btn-check":"form-check-input",{"is-invalid":j,"is-valid":N,"me-2":p}),id:f},E,{ref:S}))},F=function(){return t.createElement(c._,{describedby:E["aria-describedby"],feedback:i,feedbackInvalid:m,feedbackValid:u,floatingLabel:b,invalid:j,tooltipFeedback:h,valid:N})},T=function(){var e;return t.createElement(d.A,(0,n.Cl)({customClassName:(0,s.A)(r?(0,s.A)("btn",r.variant?"btn-".concat(r.variant,"-").concat(r.color):"btn-".concat(r.color),(e={},e["btn-".concat(r.size)]=r.size,e),"".concat(r.shape)):"form-check-label")},f&&{htmlFor:f}),y)};return t.createElement((function(){return r?t.createElement(t.Fragment,null,t.createElement(B,null),y&&t.createElement(T,null),t.createElement(F,null)):y?p?t.createElement(t.Fragment,null,t.createElement(B,null),t.createElement(d.A,(0,n.Cl)({customClassName:(0,s.A)("form-check-label stretched-link",l)},f&&{htmlFor:f}),y),t.createElement(F,null)):t.createElement("div",{className:(0,s.A)("form-check",{"form-check-inline":x,"form-check-reverse":k,"is-invalid":j,"is-valid":N},l)},t.createElement(B,null),t.createElement(T,null),t.createElement(F,null)):t.createElement(B,null)}),null)}));m.propTypes=(0,n.Cl)({button:i().object,className:i().string,hitArea:i().oneOf(["full"]),id:i().string,indeterminate:i().bool,inline:i().bool,label:i().oneOfType([i().string,i().node]),reverse:i().bool,type:i().oneOf(["checkbox","radio"])},c._.propTypes),m.displayName="CFormCheck"},97397:(e,a,l)=>{l.d(a,{M:()=>d});var n=l(22378),t=l(65043),r=l(65173),i=l.n(r),s=l(25196),c=l(81138),d=(0,t.forwardRef)((function(e,a){var l,r=e.children,i=e.className,d=e.feedback,o=e.feedbackInvalid,m=e.feedbackValid,u=e.floatingClassName,b=e.floatingLabel,h=e.htmlSize,p=e.id,f=e.invalid,v=e.label,x=e.options,j=e.size,y=e.text,k=e.tooltipFeedback,g=e.valid,C=(0,n.Tt)(e,["children","className","feedback","feedbackInvalid","feedbackValid","floatingClassName","floatingLabel","htmlSize","id","invalid","label","options","size","text","tooltipFeedback","valid"]);return t.createElement(c.O,{describedby:C["aria-describedby"],feedback:d,feedbackInvalid:o,feedbackValid:m,floatingClassName:u,floatingLabel:b,id:p,invalid:f,label:v,text:y,tooltipFeedback:k,valid:g},t.createElement("select",(0,n.Cl)({id:p,className:(0,s.A)("form-select",(l={},l["form-select-".concat(j)]=j,l["is-invalid"]=f,l["is-valid"]=g,l),i),size:h},C,{ref:a}),x?x.map((function(e,a){return t.createElement("option",(0,n.Cl)({},"object"===typeof e&&e.disabled&&{disabled:e.disabled},"object"===typeof e&&void 0!==e.value&&{value:e.value},{key:a}),"string"===typeof e?e:e.label)})):r))}));d.propTypes=(0,n.Cl)({className:i().string,htmlSize:i().number,options:i().array},c.O.propTypes),d.displayName="CFormSelect"},89689:(e,a,l)=>{l.d(a,{l:()=>c});var n=l(22378),t=l(65043),r=l(65173),i=l.n(r),s=l(25196),c=(0,t.forwardRef)((function(e,a){var l=e.children,r=e.as,i=void 0===r?"h5":r,c=e.className,d=(0,n.Tt)(e,["children","as","className"]);return t.createElement(i,(0,n.Cl)({className:(0,s.A)("modal-title",c)},d,{ref:a}),l)}));c.propTypes={as:i().elementType,children:i().node,className:i().string},c.displayName="CModalTitle"}}]);
//# sourceMappingURL=7545.289dc6de.chunk.js.map