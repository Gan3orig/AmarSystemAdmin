"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template_cra=self.webpackChunk_coreui_coreui_free_react_admin_template_cra||[]).push([[843],{30843:(e,a,n)=>{n.r(a),n.d(a,{default:()=>u});var s=n(65043),r=n(44101),i=n(44227),l=n(80861),c=n(25104),t=n(96105),o=n(22378),d=n(65173),h=n.n(d),x=n(25196),p=(0,s.forwardRef)((function(e,a){var n,r=e.children,i=e.align,l=e.className,c=e.size,t=(0,o.Tt)(e,["children","align","className","size"]);return s.createElement("nav",(0,o.Cl)({ref:a},t),s.createElement("ul",{className:(0,x.A)("pagination",(n={},n["justify-content-".concat(i)]=i,n["pagination-".concat(c)]=c,n),l)},r))}));p.propTypes={align:h().oneOf(["start","center","end"]),children:h().node,className:h().string,size:h().oneOf(["sm","lg"])},p.displayName="CPagination";var m=n(90777),g=(0,s.forwardRef)((function(e,a){var n=e.children,r=e.as,i=e.className,l=(0,o.Tt)(e,["children","as","className"]),c=null!==r&&void 0!==r?r:l.active?"span":"a";return s.createElement("li",(0,o.Cl)({className:(0,x.A)("page-item",{active:l.active,disabled:l.disabled},i)},l.active&&{"aria-current":"page"}),"a"===c?s.createElement(m.K,(0,o.Cl)({className:"page-link",as:c},l,{ref:a}),n):s.createElement(c,{className:"page-link",ref:a},n))}));g.propTypes={as:h().elementType,children:h().node,className:h().string},g.displayName="CPaginationItem";var j=n(47900),f=n(70579);const u=()=>(0,f.jsxs)(r.s,{children:[(0,f.jsx)(i.U,{xs:12,children:(0,f.jsxs)(l.E,{className:"mb-4",children:[(0,f.jsx)(c.V,{children:(0,f.jsx)("strong",{children:"React Pagination"})}),(0,f.jsxs)(t.W,{children:[(0,f.jsxs)("p",{className:"text-body-secondary small",children:["We use a large block of connected links for our pagination, making links hard to miss and easily scalable\u2014all while providing large hit areas. Pagination is built with list HTML elements so screen readers can announce the number of available links. Use a wrapping ",(0,f.jsx)("code",{children:"<nav>"})," element to identify it as a navigation section to screen readers and other assistive technologies."]}),(0,f.jsxs)("p",{className:"text-body-secondary small",children:["In addition, as pages likely have more than one such navigation section, it's advisable to provide a descriptive ",(0,f.jsx)("code",{children:"aria-label"})," for the"," ",(0,f.jsx)("code",{children:"<nav>"})," to reflect its purpose. For example, if the pagination component is used to navigate between a set of search results, an appropriate label could be ",(0,f.jsx)("code",{children:'aria-label="Search results pages"'}),"."]}),(0,f.jsx)(j.Eb,{href:"components/pagination",children:(0,f.jsxs)(p,{"aria-label":"Page navigation example",children:[(0,f.jsx)(g,{children:"Previous"}),(0,f.jsx)(g,{children:"1"}),(0,f.jsx)(g,{children:"2"}),(0,f.jsx)(g,{children:"3"}),(0,f.jsx)(g,{children:"Next"})]})})]})]})}),(0,f.jsx)(i.U,{xs:12,children:(0,f.jsxs)(l.E,{className:"mb-4",children:[(0,f.jsxs)(c.V,{children:[(0,f.jsx)("strong",{children:"React Pagination"})," ",(0,f.jsx)("small",{children:"Working with icons"})]}),(0,f.jsxs)(t.W,{children:[(0,f.jsxs)("p",{className:"text-body-secondary small",children:["Looking to use an icon or symbol in place of text for some pagination links? Be sure to provide proper screen reader support with ",(0,f.jsx)("code",{children:"aria"})," attributes."]}),(0,f.jsx)(j.Eb,{href:"components/pagination#working-with-icons",children:(0,f.jsxs)(p,{"aria-label":"Page navigation example",children:[(0,f.jsx)(g,{"aria-label":"Previous",children:(0,f.jsx)("span",{"aria-hidden":"true",children:"\xab"})}),(0,f.jsx)(g,{children:"1"}),(0,f.jsx)(g,{children:"2"}),(0,f.jsx)(g,{children:"3"}),(0,f.jsx)(g,{"aria-label":"Next",children:(0,f.jsx)("span",{"aria-hidden":"true",children:"\xbb"})})]})})]})]})}),(0,f.jsx)(i.U,{xs:12,children:(0,f.jsxs)(l.E,{className:"mb-4",children:[(0,f.jsxs)(c.V,{children:[(0,f.jsx)("strong",{children:"React Pagination"})," ",(0,f.jsx)("small",{children:"Disabled and active states"})]}),(0,f.jsxs)(t.W,{children:[(0,f.jsxs)("p",{className:"text-body-secondary small",children:["Pagination links are customizable for different circumstances. Use"," ",(0,f.jsx)("code",{children:"disabled"})," for links that appear un-clickable and ",(0,f.jsx)("code",{children:".active"})," to indicate the current page."]}),(0,f.jsxs)("p",{className:"text-body-secondary small",children:["While the ",(0,f.jsx)("code",{children:"disabled"})," prop uses ",(0,f.jsx)("code",{children:"pointer-events: none"})," to"," ",(0,f.jsx)("em",{children:"try"})," to disable the link functionality of ",(0,f.jsx)("code",{children:"<a>"}),"s, that CSS property is not yet standardized and doesn'taccount for keyboard navigation. As such, we always add ",(0,f.jsx)("code",{children:'tabindex="-1"'})," on disabled links and use custom JavaScript to fully disable their functionality."]}),(0,f.jsx)(j.Eb,{href:"components/pagination#disabled-and-active-states",children:(0,f.jsxs)(p,{"aria-label":"Page navigation example",children:[(0,f.jsx)(g,{"aria-label":"Previous",disabled:!0,children:(0,f.jsx)("span",{"aria-hidden":"true",children:"\xab"})}),(0,f.jsx)(g,{active:!0,children:"1"}),(0,f.jsx)(g,{children:"2"}),(0,f.jsx)(g,{children:"3"}),(0,f.jsx)(g,{"aria-label":"Next",children:(0,f.jsx)("span",{"aria-hidden":"true",children:"\xbb"})})]})})]})]})}),(0,f.jsx)(i.U,{xs:12,children:(0,f.jsxs)(l.E,{className:"mb-4",children:[(0,f.jsxs)(c.V,{children:[(0,f.jsx)("strong",{children:"React Pagination"})," ",(0,f.jsx)("small",{children:"Sizing"})]}),(0,f.jsxs)(t.W,{children:[(0,f.jsxs)("p",{className:"text-body-secondary small",children:["Fancy larger or smaller pagination? Add ",(0,f.jsx)("code",{children:'size="lg"'})," or"," ",(0,f.jsx)("code",{children:'size="sm"'})," for additional sizes."]}),(0,f.jsx)(j.Eb,{href:"components/pagination#sizing",children:(0,f.jsxs)(p,{size:"lg","aria-label":"Page navigation example",children:[(0,f.jsx)(g,{children:"Previous"}),(0,f.jsx)(g,{children:"1"}),(0,f.jsx)(g,{children:"2"}),(0,f.jsx)(g,{children:"3"}),(0,f.jsx)(g,{children:"Next"})]})}),(0,f.jsx)(j.Eb,{href:"components/pagination#sizing",children:(0,f.jsxs)(p,{size:"sm","aria-label":"Page navigation example",children:[(0,f.jsx)(g,{children:"Previous"}),(0,f.jsx)(g,{children:"1"}),(0,f.jsx)(g,{children:"2"}),(0,f.jsx)(g,{children:"3"}),(0,f.jsx)(g,{children:"Next"})]})})]})]})}),(0,f.jsx)(i.U,{xs:12,children:(0,f.jsxs)(l.E,{className:"mb-4",children:[(0,f.jsxs)(c.V,{children:[(0,f.jsx)("strong",{children:"React Pagination"})," ",(0,f.jsx)("small",{children:"Alignment"})]}),(0,f.jsxs)(t.W,{children:[(0,f.jsxs)("p",{className:"text-body-secondary small",children:["Change the alignment of pagination components with"," ",(0,f.jsx)("a",{href:"https://coreui.io/docs/utilities/flex/",children:"flexbox utilities"}),"."]}),(0,f.jsx)(j.Eb,{href:"components/pagination#aligment",children:(0,f.jsxs)(p,{className:"justify-content-center","aria-label":"Page navigation example",children:[(0,f.jsx)(g,{disabled:!0,children:"Previous"}),(0,f.jsx)(g,{children:"1"}),(0,f.jsx)(g,{children:"2"}),(0,f.jsx)(g,{children:"3"}),(0,f.jsx)(g,{children:"Next"})]})}),(0,f.jsx)(j.Eb,{href:"components/pagination#aligment",children:(0,f.jsxs)(p,{className:"justify-content-end","aria-label":"Page navigation example",children:[(0,f.jsx)(g,{disabled:!0,children:"Previous"}),(0,f.jsx)(g,{children:"1"}),(0,f.jsx)(g,{children:"2"}),(0,f.jsx)(g,{children:"3"}),(0,f.jsx)(g,{children:"Next"})]})})]})]})})]})},80861:(e,a,n)=>{n.d(a,{E:()=>o});var s=n(22378),r=n(65043),i=n(65173),l=n.n(i),c=n(25196),t=n(75232),o=(0,r.forwardRef)((function(e,a){var n,i=e.children,l=e.className,t=e.color,o=e.textBgColor,d=e.textColor,h=(0,s.Tt)(e,["children","className","color","textBgColor","textColor"]);return r.createElement("div",(0,s.Cl)({className:(0,c.A)("card",(n={},n["bg-".concat(t)]=t,n["text-".concat(d)]=d,n["text-bg-".concat(o)]=o,n),l)},h,{ref:a}),i)}));o.propTypes={children:l().node,className:l().string,color:t.TX,textBgColor:t.TX,textColor:l().string},o.displayName="CCard"},96105:(e,a,n)=>{n.d(a,{W:()=>t});var s=n(22378),r=n(65043),i=n(65173),l=n.n(i),c=n(25196),t=(0,r.forwardRef)((function(e,a){var n=e.children,i=e.className,l=(0,s.Tt)(e,["children","className"]);return r.createElement("div",(0,s.Cl)({className:(0,c.A)("card-body",i)},l,{ref:a}),n)}));t.propTypes={children:l().node,className:l().string},t.displayName="CCardBody"},25104:(e,a,n)=>{n.d(a,{V:()=>t});var s=n(22378),r=n(65043),i=n(65173),l=n.n(i),c=n(25196),t=(0,r.forwardRef)((function(e,a){var n=e.children,i=e.as,l=void 0===i?"div":i,t=e.className,o=(0,s.Tt)(e,["children","as","className"]);return r.createElement(l,(0,s.Cl)({className:(0,c.A)("card-header",t)},o,{ref:a}),n)}));t.propTypes={as:l().elementType,children:l().node,className:l().string},t.displayName="CCardHeader"},44227:(e,a,n)=>{n.d(a,{U:()=>o});var s=n(22378),r=n(65043),i=n(65173),l=n.n(i),c=n(25196),t=["xxl","xl","lg","md","sm","xs"],o=(0,r.forwardRef)((function(e,a){var n=e.children,i=e.className,l=(0,s.Tt)(e,["children","className"]),o=[];return t.forEach((function(e){var a=l[e];delete l[e];var n="xs"===e?"":"-".concat(e);"number"!==typeof a&&"string"!==typeof a||o.push("col".concat(n,"-").concat(a)),"boolean"===typeof a&&o.push("col".concat(n)),a&&"object"===typeof a&&("number"!==typeof a.span&&"string"!==typeof a.span||o.push("col".concat(n,"-").concat(a.span)),"boolean"===typeof a.span&&o.push("col".concat(n)),"number"!==typeof a.order&&"string"!==typeof a.order||o.push("order".concat(n,"-").concat(a.order)),"number"===typeof a.offset&&o.push("offset".concat(n,"-").concat(a.offset)))})),r.createElement("div",(0,s.Cl)({className:(0,c.A)(o.length>0?o:"col",i)},l,{ref:a}),n)})),d=l().oneOfType([l().bool,l().number,l().string,l().oneOf(["auto"])]),h=l().oneOfType([d,l().shape({span:d,offset:l().oneOfType([l().number,l().string]),order:l().oneOfType([l().oneOf(["first","last"]),l().number,l().string])})]);o.propTypes={children:l().node,className:l().string,xs:h,sm:h,md:h,lg:h,xl:h,xxl:h},o.displayName="CCol"},44101:(e,a,n)=>{n.d(a,{s:()=>o});var s=n(22378),r=n(65043),i=n(65173),l=n.n(i),c=n(25196),t=["xxl","xl","lg","md","sm","xs"],o=(0,r.forwardRef)((function(e,a){var n=e.children,i=e.className,l=(0,s.Tt)(e,["children","className"]),o=[];return t.forEach((function(e){var a=l[e];delete l[e];var n="xs"===e?"":"-".concat(e);"object"===typeof a&&(a.cols&&o.push("row-cols".concat(n,"-").concat(a.cols)),"number"===typeof a.gutter&&o.push("g".concat(n,"-").concat(a.gutter)),"number"===typeof a.gutterX&&o.push("gx".concat(n,"-").concat(a.gutterX)),"number"===typeof a.gutterY&&o.push("gy".concat(n,"-").concat(a.gutterY)))})),r.createElement("div",{className:(0,c.A)("row",o,i),ref:a},n)})),d=l().shape({cols:l().oneOfType([l().oneOf(["auto"]),l().number,l().string]),gutter:l().oneOfType([l().string,l().number]),gutterX:l().oneOfType([l().string,l().number]),gutterY:l().oneOfType([l().string,l().number])});o.propTypes={children:l().node,className:l().string,xs:d,sm:d,md:d,lg:d,xl:d,xxl:d},o.displayName="CRow"}}]);
//# sourceMappingURL=843.c1fd508a.chunk.js.map