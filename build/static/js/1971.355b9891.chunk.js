"use strict";(self.webpackChunk_coreui_AmarSystem=self.webpackChunk_coreui_AmarSystem||[]).push([[1971],{48068:(e,n,s)=>{s.r(n),s.d(n,{default:()=>O});var a=s(65043),t=s(99419),r=s(12023),i=s(76036),o=s(13318),l=(s(66433),s(80228)),c=s.n(l);const d="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQUlEQVR4nKWUTUoDQRCFXzYew5+FGHIBNamaQdAr6DbiTwhewJxAcgDjKcRlFoILXegmZ9Cl4ELRjQjJkx4TnPRUOj1a8DbD66+rX9c0ECgqVqhoUdHNJDhmiuXQmhDoiooRFfQ0ouCSm1iKgyXYouDNAE1L8EpBGoYJahR8zIX96p0pqiHgjbdgSMU5BduZFL3xt7zn2oalqBodtIxN2wVfglXrIg68jB4JVAo+oELFk+fdt4Adb+f+zGgUfc/bsfI7+nOHisMisI41YzTaRncnURm6ouLOuOUeE+xkElwUhl1wi1lFxV6JGZx0tzsb+JPPQwngvZXzNLSBDWN4LQ0pWA/CckfvRvzLZ1EwV6xhgYJBADZwHpQpNrBIwbMBe3HPWykYJlBFnYLPHPBr7pMVAW2OZ8+p+S9YDnrqFGP+Bmuioor4sxbOAAAAAElFTkSuQmCC";var p=s(91071),m=s(3526),u=s(25917),h=s(54101),f=s(6122),v=s(72717),g=s(45153),x=s(57919),N=s(85504),E=s(10825),y=s(30347),A=s(93891),C=s(4303),b=s(67861),j=s(96528),w=s(92845),T=s(2657),S=s(59609),R=s(25478),B=s(34653),k=s(3354),I=s(70579);const L=()=>{const[e,n]=(0,a.useState)([]),[s,t]=(0,a.useState)(!0),[r,i]=(0,a.useState)(""),[o,l]=(0,a.useState)(1);(0,a.useEffect)((()=>{(async()=>{localStorage.getItem("token");try{const e=await fetch("https://api.majorsoft.mn/api/terminalMap",{method:"GET",headers:{Authorization:"Bearer ${token}","Content-Type":"application/json"}});if(e.ok){const s=await e.json();console.log(s);const a=await e.json();n(a)}else console.error("Failed to fetch data")}catch(e){console.error("Error fetching data:",e)}finally{t(!1)}})()}),[]);const c=e.filter((e=>e.businessName.toLowerCase().includes(r.toLowerCase())||e.entityName.toLowerCase().includes(r.toLowerCase())||e.phone1.includes(r)||e.registerNo.includes(r))),d=15*o,p=d-15,u=c.slice(p,d),h=Math.ceil(c.length/15);return(0,I.jsx)(m.T,{children:s?(0,I.jsx)("div",{className:"text-center",children:(0,I.jsx)(x.J,{})}):(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(N.B,{className:"mb-3",children:[(0,I.jsx)(E.O,{type:"text",placeholder:"\u0425\u0430\u0439\u0445",value:r,onChange:e=>i(e.target.value)}),(0,I.jsx)(y.s,{children:(0,I.jsx)(k.Ay,{icon:B.B})})]}),(0,I.jsxs)(A._,{align:"middle",hover:!0,responsive:!0,bordered:!0,children:[(0,I.jsx)(C.w,{color:"primary",children:(0,I.jsxs)(b.Y,{children:[(0,I.jsx)(j.$,{children:"*"}),(0,I.jsx)(j.$,{children:"\u041d\u044d\u0440"}),(0,I.jsx)(j.$,{children:"\u0411\u0430\u0439\u0433\u0443\u0443\u043b\u043b\u0430\u0433\u044b\u043d \u043d\u044d\u0440"}),(0,I.jsx)(j.$,{children:"\u0423\u0442\u0430\u0441\u043d\u044b \u0434\u0443\u0433\u0430\u0430\u0440"}),(0,I.jsx)(j.$,{children:"\u0420\u0435\u0433\u0438\u0441\u0440\u0442\u0438\u0439\u043d \u0434\u0443\u0433\u0430\u0430\u0440"}),(0,I.jsx)(j.$,{children:"\u0414\u0443\u0443\u0441\u0430\u0445 \u043e\u0433\u043d\u043e\u043e"})]})}),(0,I.jsx)(w.C,{children:u.map(((e,n)=>(0,I.jsxs)(b.Y,{children:[(0,I.jsx)(T.c,{children:p+n+1}),(0,I.jsx)(T.c,{children:e.businessName}),(0,I.jsx)(T.c,{children:e.entityName}),(0,I.jsxs)(T.c,{children:[e.phone1,", ",e.phone2]}),(0,I.jsx)(T.c,{children:e.registerNo}),(0,I.jsx)(T.c,{children:new Date(e.licenseExpireDate).toLocaleDateString()})]},e.terminalId)))})]}),(0,I.jsxs)(S._,{"aria-label":"Page navigation example",className:"mt-3",children:[(0,I.jsx)(R.X,{onClick:()=>l((e=>Math.max(e-1,1))),disabled:1===o,children:"\u04e8\u043c\u043d\u04e9\u0445"}),Array.from({length:h},((e,n)=>{const s=n+1;return 1===s||s===h||s>=o-1&&s<=o+1?(0,I.jsx)(R.X,{onClick:()=>l(s),active:o===s,children:s},s):2===s&&o>3?(0,I.jsx)(R.X,{disabled:!0,children:"..."},"ellipsis-left"):s===h-1&&o<h-2?(0,I.jsx)(R.X,{disabled:!0,children:"..."},"ellipsis-right"):null})),(0,I.jsx)(R.X,{onClick:()=>l((e=>Math.min(e+1,h))),disabled:o===h,children:"\u0414\u0430\u0440\u0430\u0430\u0445"})]})]})})};delete c().Icon.Default.prototype._getIconUrl,c().Icon.Default.mergeOptions({iconUrl:d,shadowUrl:p,iconSize:[20,20],shadowSize:[12,12]});const O=()=>{const[e,n]=(0,a.useState)([]),[s,l]=(0,a.useState)(!1),x=new(c().Icon)({iconUrl:d,iconSize:[20,20],iconAnchor:[21,21],popupAnchor:[1,-34],shadowUrl:p,shadowSize:[12,12]});return(0,a.useEffect)((()=>{(async()=>{const e=localStorage.getItem("token");try{const s=await fetch("https://api.majorsoft.mn/api/terminalMap",{method:"GET",headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/json"}});if(s.ok){l(!1);const e=await s.json();n(e)}else l(!0),console.error("Failed to fetch locations:",s.status)}catch(s){console.error("Error fetching locations:",s)}})()}),[]),(0,I.jsxs)(m.T,{children:[(0,I.jsxs)(u.k,{color:"warning",visible:s,closeButton:!0,onShowChange:l,children:[(0,I.jsx)("strong",{children:"\u0410\u043d\u0445\u0430\u0430\u0440\u0443\u0443\u043b\u0433\u0430!"})," \u0425\u044d\u0440\u044d\u0433\u043b\u044d\u0433\u0447\u044d\u044d\u0440 \u043d\u044d\u0432\u0442\u0440\u044d\u044d\u0433\u04af\u0439 \u0431\u0430\u0439\u043d\u0430. ",(0,I.jsx)("a",{href:"/login",className:"alert-link",children:"\u041d\u044d\u0432\u0442\u0440\u044d\u0445"}),"."]}),(0,I.jsxs)(h.E,{activeItemKey:1,children:[(0,I.jsxs)(f.l,{itemKey:1,children:[(0,I.jsx)(v.B,{children:"\u0422\u0435\u0440\u043c\u0438\u043d\u0430\u043b \u0431\u0430\u0439\u0440\u0448\u0438\u043b (Terminal Map)"}),(0,I.jsx)(g.i,{children:(0,I.jsxs)(t.W,{center:[47,106],zoom:6,style:{height:"80vh",width:"100%"},children:[(0,I.jsx)(r.e,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),e.map((e=>(0,I.jsx)(i.p,{position:[e.locationLat,e.locationLng],icon:x,children:(0,I.jsxs)(o.z,{children:[(0,I.jsx)("strong",{children:e.businessName}),(0,I.jsx)("br",{}),e.entityName,(0,I.jsx)("br",{}),"\u2706",e.phone1,",",e.phone2,(0,I.jsx)("br",{}),"\xae",e.registerNo,(0,I.jsx)("br",{}),e.createDate]})},e.terminalId)))]})})]}),(0,I.jsxs)(f.l,{itemKey:2,alwaysopen:!0,children:[(0,I.jsx)(v.B,{children:"\u0421\u0430\u043b\u0431\u0430\u0440\u044b\u043d \u043c\u044d\u0434\u044d\u044d\u043b\u044d\u043b (Terminal table)"}),(0,I.jsx)(g.i,{children:(0,I.jsx)(L,{})})]})]})]})}},34653:(e,n,s)=>{s.d(n,{B:()=>a});var a=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z' class='ci-primary'/>"]},54101:(e,n,s)=>{s.d(n,{E:()=>c,b:()=>l});var a=s(22378),t=s(65043),r=s(65173),i=s.n(r),o=s(25196),l=(0,t.createContext)({}),c=(0,t.forwardRef)((function(e,n){var s=e.children,r=e.activeItemKey,i=e.alwaysOpen,c=void 0!==i&&i,d=e.className,p=e.flush,m=(0,a.Tt)(e,["children","activeItemKey","alwaysOpen","className","flush"]),u=(0,t.useState)(r),h=u[0],f=u[1];return t.createElement("div",(0,a.Cl)({className:(0,o.A)("accordion",{"accordion-flush":p},d)},m,{ref:n}),t.createElement(l.Provider,{value:{_activeItemKey:h,alwaysOpen:c,setActiveKey:f}},s))}));c.propTypes={alwaysOpen:i().bool,activeItemKey:i().oneOfType([i().number,i().string]),children:i().node,className:i().string,flush:i().bool},c.displayName="CAccordion"},45153:(e,n,s)=>{s.d(n,{i:()=>d});var a=s(22378),t=s(65043),r=s(65173),i=s.n(r),o=s(25196),l=s(6122),c=s(6139),d=(0,t.forwardRef)((function(e,n){var s=e.children,r=e.className,i=(0,a.Tt)(e,["children","className"]),d=(0,t.useContext)(l.k).visible;return t.createElement(c.x,{className:"accordion-collapse",visible:d},t.createElement("div",(0,a.Cl)({className:(0,o.A)("accordion-body",r)},i,{ref:n}),s))}));d.propTypes={children:i().node,className:i().string},d.displayName="CAccordionBody"},72717:(e,n,s)=>{s.d(n,{B:()=>d});var a=s(22378),t=s(65043),r=s(65173),i=s.n(r),o=s(25196),l=s(6122),c=(0,t.forwardRef)((function(e,n){var s=e.children,r=e.className,i=(0,a.Tt)(e,["children","className"]),c=(0,t.useContext)(l.k),d=c.visible,p=c.setVisible;return t.createElement("button",(0,a.Cl)({type:"button",className:(0,o.A)("accordion-button",{collapsed:!d},r),"aria-expanded":!d,onClick:function(){return p(!d)}},i,{ref:n}),s)}));c.propTypes={children:i().node,className:i().string},c.displayName="CAccordionButton";var d=(0,t.forwardRef)((function(e,n){var s=e.children,r=e.className,i=(0,a.Tt)(e,["children","className"]);return t.createElement("div",(0,a.Cl)({className:(0,o.A)("accordion-header",r)},i,{ref:n}),t.createElement(c,null,s))}));d.propTypes={children:i().node,className:i().string},d.displayName="CAccordionHeader"},6122:(e,n,s)=>{s.d(n,{k:()=>c,l:()=>d});var a=s(22378),t=s(65043),r=s(65173),i=s.n(r),o=s(25196),l=s(54101),c=(0,t.createContext)({}),d=(0,t.forwardRef)((function(e,n){var s=e.children,r=e.className,i=e.itemKey,d=(0,a.Tt)(e,["children","className","itemKey"]),p=(0,t.useRef)(null!==i&&void 0!==i?i:Math.random().toString(36).slice(2,11)),m=(0,t.useContext)(l.b),u=m._activeItemKey,h=m.alwaysOpen,f=m.setActiveKey,v=(0,t.useState)(Boolean(u===p.current)),g=v[0],x=v[1];return(0,t.useEffect)((function(){!h&&g&&f(p.current)}),[g]),(0,t.useEffect)((function(){x(Boolean(u===p.current))}),[u]),t.createElement("div",(0,a.Cl)({className:(0,o.A)("accordion-item",r)},d,{ref:n}),t.createElement(c.Provider,{value:{setVisible:x,visible:g}},s))}));d.propTypes={children:i().node,className:i().string,itemKey:i().oneOfType([i().number,i().string])},d.displayName="CAccordionItem"},25917:(e,n,s)=>{s.d(n,{k:()=>m});var a=s(22378),t=s(65043),r=s(65173),i=s.n(r),o=s(25196),l=s(90436),c=s(94462),d=s(75232),p=s(80413),m=(0,t.forwardRef)((function(e,n){var s=e.children,r=e.className,i=e.color,d=void 0===i?"primary":i,m=e.dismissible,u=e.variant,h=e.visible,f=void 0===h||h,v=e.onClose,g=(0,a.Tt)(e,["children","className","color","dismissible","variant","visible","onClose"]),x=(0,t.useRef)(null),N=(0,c.E2)(n,x),E=(0,t.useState)(f),y=E[0],A=E[1];return(0,t.useEffect)((function(){A(f)}),[f]),t.createElement(p.Ay,{in:y,mountOnEnter:!0,nodeRef:x,onExit:v,timeout:150,unmountOnExit:!0},(function(e){return t.createElement("div",(0,a.Cl)({className:(0,o.A)("alert","solid"===u?"bg-".concat(d," text-white"):"alert-".concat(d),{"alert-dismissible fade":m,show:"entered"===e},r),role:"alert"},g,{ref:N}),s,m&&t.createElement(l.E,{onClick:function(){return A(!1)}}))}))}));m.propTypes={children:i().node,className:i().string,color:d.TX.isRequired,dismissible:i().bool,onClose:i().func,variant:i().string,visible:i().bool},m.displayName="CAlert"},6139:(e,n,s)=>{s.d(n,{x:()=>x});var a=s(22378),t=s(65043),r=s(65173),i=s.n(r),o=s(25196),l=s(94462);function c(){return c=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var s=arguments[n];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e},c.apply(this,arguments)}var d=s(23474),p=s(55597);function m(e,n){return e.replace(new RegExp("(^|\\s)"+n+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}var u=s(80413),h=s(78458),f=function(e,n){return e&&n&&n.split(" ").forEach((function(n){return a=n,void((s=e).classList?s.classList.add(a):function(e,n){return e.classList?!!n&&e.classList.contains(n):-1!==(" "+(e.className.baseVal||e.className)+" ").indexOf(" "+n+" ")}(s,a)||("string"===typeof s.className?s.className=s.className+" "+a:s.setAttribute("class",(s.className&&s.className.baseVal||"")+" "+a)));var s,a}))},v=function(e,n){return e&&n&&n.split(" ").forEach((function(n){return a=n,void((s=e).classList?s.classList.remove(a):"string"===typeof s.className?s.className=m(s.className,a):s.setAttribute("class",m(s.className&&s.className.baseVal||"",a)));var s,a}))},g=function(e){function n(){for(var n,s=arguments.length,a=new Array(s),t=0;t<s;t++)a[t]=arguments[t];return(n=e.call.apply(e,[this].concat(a))||this).appliedClasses={appear:{},enter:{},exit:{}},n.onEnter=function(e,s){var a=n.resolveArguments(e,s),t=a[0],r=a[1];n.removeClasses(t,"exit"),n.addClass(t,r?"appear":"enter","base"),n.props.onEnter&&n.props.onEnter(e,s)},n.onEntering=function(e,s){var a=n.resolveArguments(e,s),t=a[0],r=a[1]?"appear":"enter";n.addClass(t,r,"active"),n.props.onEntering&&n.props.onEntering(e,s)},n.onEntered=function(e,s){var a=n.resolveArguments(e,s),t=a[0],r=a[1]?"appear":"enter";n.removeClasses(t,r),n.addClass(t,r,"done"),n.props.onEntered&&n.props.onEntered(e,s)},n.onExit=function(e){var s=n.resolveArguments(e)[0];n.removeClasses(s,"appear"),n.removeClasses(s,"enter"),n.addClass(s,"exit","base"),n.props.onExit&&n.props.onExit(e)},n.onExiting=function(e){var s=n.resolveArguments(e)[0];n.addClass(s,"exit","active"),n.props.onExiting&&n.props.onExiting(e)},n.onExited=function(e){var s=n.resolveArguments(e)[0];n.removeClasses(s,"exit"),n.addClass(s,"exit","done"),n.props.onExited&&n.props.onExited(e)},n.resolveArguments=function(e,s){return n.props.nodeRef?[n.props.nodeRef.current,e]:[e,s]},n.getClassNames=function(e){var s=n.props.classNames,a="string"===typeof s,t=a?""+(a&&s?s+"-":"")+e:s[e];return{baseClassName:t,activeClassName:a?t+"-active":s[e+"Active"],doneClassName:a?t+"-done":s[e+"Done"]}},n}(0,p.A)(n,e);var s=n.prototype;return s.addClass=function(e,n,s){var a=this.getClassNames(n)[s+"ClassName"],t=this.getClassNames("enter").doneClassName;"appear"===n&&"done"===s&&t&&(a+=" "+t),"active"===s&&e&&(0,h.F)(e),a&&(this.appliedClasses[n][s]=a,f(e,a))},s.removeClasses=function(e,n){var s=this.appliedClasses[n],a=s.base,t=s.active,r=s.done;this.appliedClasses[n]={},a&&v(e,a),t&&v(e,t),r&&v(e,r)},s.render=function(){var e=this.props;e.classNames;var n=(0,d.A)(e,["classNames"]);return t.createElement(u.Ay,c({},n,{onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}))},n}(t.Component);g.defaultProps={classNames:""},g.propTypes={};var x=(0,t.forwardRef)((function(e,n){var s=e.children,r=e.className,i=e.horizontal,c=e.onHide,d=e.onShow,p=e.visible,m=(0,a.Tt)(e,["children","className","horizontal","onHide","onShow","visible"]),u=(0,t.useRef)(null),h=(0,l.E2)(n,u),f=(0,t.useState)(),v=f[0],x=f[1],N=(0,t.useState)(),E=N[0],y=N[1];return t.createElement(g,{in:p,nodeRef:u,onEntering:function(){d&&d(),i?u.current&&y(u.current.scrollWidth):u.current&&x(u.current.scrollHeight)},onEntered:function(){i?y(0):x(0)},onExit:function(){i?u.current&&y(u.current.scrollWidth):u.current&&x(u.current.scrollHeight)},onExiting:function(){c&&c(),i?y(0):x(0)},onExited:function(){i?y(0):x(0)},timeout:350},(function(e){var n=0===v?null:{height:v},l=0===E?null:{width:E};return t.createElement("div",(0,a.Cl)({className:(0,o.A)(r,{"collapse-horizontal":i,collapsing:"entering"===e||"exiting"===e,"collapse show":"entered"===e,collapse:"exited"===e}),style:(0,a.Cl)((0,a.Cl)({},n),l)},m,{ref:h}),s)}))}));x.propTypes={children:i().node,className:i().string,horizontal:i().bool,onHide:i().func,onShow:i().func,visible:i().bool},x.displayName="CCollapse"},30347:(e,n,s)=>{s.d(n,{s:()=>l});var a=s(22378),t=s(65043),r=s(65173),i=s.n(r),o=s(25196),l=(0,t.forwardRef)((function(e,n){var s=e.children,r=e.as,i=void 0===r?"span":r,l=e.className,c=(0,a.Tt)(e,["children","as","className"]);return t.createElement(i,(0,a.Cl)({className:(0,o.A)("input-group-text",l)},c,{ref:n}),s)}));l.propTypes={as:i().elementType,children:i().node,className:i().string},l.displayName="CInputGroupText"},59609:(e,n,s)=>{s.d(n,{_:()=>l});var a=s(22378),t=s(65043),r=s(65173),i=s.n(r),o=s(25196),l=(0,t.forwardRef)((function(e,n){var s,r=e.children,i=e.align,l=e.className,c=e.size,d=(0,a.Tt)(e,["children","align","className","size"]);return t.createElement("nav",(0,a.Cl)({ref:n},d),t.createElement("ul",{className:(0,o.A)("pagination",(s={},s["justify-content-".concat(i)]=i,s["pagination-".concat(c)]=c,s),l)},r))}));l.propTypes={align:i().oneOf(["start","center","end"]),children:i().node,className:i().string,size:i().oneOf(["sm","lg"])},l.displayName="CPagination"},25478:(e,n,s)=>{s.d(n,{X:()=>c});var a=s(22378),t=s(65043),r=s(65173),i=s.n(r),o=s(25196),l=s(90777),c=(0,t.forwardRef)((function(e,n){var s=e.children,r=e.as,i=e.className,c=(0,a.Tt)(e,["children","as","className"]),d=null!==r&&void 0!==r?r:c.active?"span":"a";return t.createElement("li",(0,a.Cl)({className:(0,o.A)("page-item",{active:c.active,disabled:c.disabled},i)},c.active&&{"aria-current":"page"}),"a"===d?t.createElement(l.K,(0,a.Cl)({className:"page-link",as:d},c,{ref:n}),s):t.createElement(d,{className:"page-link",ref:n},s))}));c.propTypes={as:i().elementType,children:i().node,className:i().string},c.displayName="CPaginationItem"}}]);
//# sourceMappingURL=1971.355b9891.chunk.js.map