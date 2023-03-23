"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[791],{9538:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});var r=t(4165),c=t(5861),a=t(9439),s=t(2791),o=t(9508),i=t(7689),l=t(3373),u=t(3108),d=t(2335),h=t(2921),f=t(9025),x=t(184),m="https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";function p(){return(0,x.jsx)(f.ComposableMap,{children:(0,x.jsx)(f.Geographies,{geography:m,children:function(e){return e.geographies.map((function(e){return(0,x.jsx)(f.Geography,{geography:e},e.rsmKey)}))}})})}var j=t(5434),v=t(9895),g=function(e){var n=(0,i.s0)(),t=(0,o.x)(),f=t.sendRequest,m=t.isLoading,g=t.error,Z=t.clearError,b=(0,s.useContext)(u.V),C=(0,s.useState)(!1),E=(0,a.Z)(C,2),k=E[0],N=E[1],w=(0,s.useState)(!1),y=(0,a.Z)(w,2),_=y[0],D=y[1],S=function(){return N(!1)},I=function(){D(!1)},L=function(){var t=(0,c.Z)((0,r.Z)().mark((function t(){return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return D(!1),t.prev=1,t.next=4,f("".concat("http://localhost:5000/api/","places/").concat(e.id),"DELETE",null,{Authorization:"Bearer "+b.token});case 4:e.onDelete(e.id),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(1);case 9:n("/");case 10:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(){return t.apply(this,arguments)}}();return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(j.Z,{error:g,onClear:Z}),(0,x.jsx)(h.Z,{show:k,onCancel:S,header:e.address,contentClass:"place-item__modal-content",footerClass:"place-item__modal-actions",footer:(0,x.jsx)(d.Z,{onClick:S,children:"CLOSE"}),children:(0,x.jsx)("div",{className:"map-container",children:(0,x.jsx)(p,{center:e.coordinates,zoom:16})})}),(0,x.jsx)(h.Z,{show:_,onCancel:I,header:"Are you sure?",footerClass:"place-item__modal-actions",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(d.Z,{inverse:!0,onClick:I,children:"CANCEL"}),(0,x.jsx)(d.Z,{danger:!0,onClick:L,children:"DELETE"})]}),children:(0,x.jsx)("p",{children:"Do you want to proceed and this delete this place? Please note that it can not be undone thereafter."})}),(0,x.jsx)("li",{className:"place-item",children:(0,x.jsxs)(l.Z,{className:"place-item__content",children:[m&&(0,x.jsx)(v.Z,{asOverlay:!0}),(0,x.jsx)("div",{className:"place-item__image",children:(0,x.jsx)("img",{src:"".concat("http://localhost:5000/").concat(e.image),alt:e.title})}),(0,x.jsxs)("div",{className:"place-item__info",children:[(0,x.jsx)("h2",{children:e.title}),(0,x.jsx)("h3",{children:e.address}),(0,x.jsx)("p",{children:e.description})]}),(0,x.jsx)("div",{children:(0,x.jsxs)("div",{className:"place-item__actions",children:[(0,x.jsx)(d.Z,{inverse:!0,onClick:function(){return N(!0)},children:"VIEW ON MAP"}),b.userId===e.creatorId&&(0,x.jsx)(d.Z,{to:"/places/".concat(e.id),children:"EDIT"}),b.userId===e.creatorId&&(0,x.jsx)(d.Z,{danger:!0,onClick:function(){D(!0)},children:"DELETE"})]})})]})})]})};var Z=function(e){return 0===e.items.length?(0,x.jsx)("div",{className:"place-list center",children:(0,x.jsxs)(l.Z,{children:[(0,x.jsx)("h2",{children:"No Places Found. Maybe create one?"}),(0,x.jsx)(d.Z,{to:"/places/new",children:"Share Place"})]})}):(0,x.jsx)("ul",{className:"place-list",children:e.items.map((function(n){return(0,x.jsx)(g,{id:n.id,image:n.image,title:n.title,description:n.description,address:n.address,creatorId:n.creator,coordinates:n.location,onDelete:e.onDeletePlace},n.id)}))})};var b=function(){var e=(0,s.useState)(),n=(0,a.Z)(e,2),t=n[0],l=n[1],u=(0,o.x)(),d=u.sendRequest,h=u.isLoading,f=u.error,m=u.clearError,p=(0,i.UO)().userId;return(0,s.useEffect)((function(){var e=function(){var e=(0,c.Z)((0,r.Z)().mark((function e(){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d("".concat("http://localhost:5000/api/","places/user/").concat(p));case 3:n=e.sent,l(n.places),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[d,p]),(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(j.Z,{error:f,onClear:m}),h&&(0,x.jsx)("div",{className:"center",children:(0,x.jsx)(v.Z,{})}),!h&&t&&(0,x.jsx)(Z,{items:t,onDeletePlace:function(e){l((function(n){return n.filter((function(n){return n.id!==e}))}))}})]})}},2335:function(e,n,t){t.d(n,{Z:function(){return a}});t(2791);var r=t(1087),c=t(184),a=function(e){return e.href?(0,c.jsx)("a",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),href:e.href,children:e.children}):e.to?(0,c.jsx)(r.rU,{to:e.to,exact:e.exact,className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),children:e.children}):(0,c.jsx)("button",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),type:e.type,onClick:e.onClick,disabled:e.disabled,children:e.children})}},3373:function(e,n,t){t.d(n,{Z:function(){return c}});t(2791);var r=t(184),c=function(e){return(0,r.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})}},5434:function(e,n,t){t(2791);var r=t(2921),c=t(2335),a=t(184);n.Z=function(e){return(0,a.jsx)(r.Z,{onCancel:e.onClear,header:"An Error Occurred!",show:!!e.error,footer:(0,a.jsx)(c.Z,{onClick:e.onClear,children:"Okay"}),children:(0,a.jsx)("p",{children:e.error})})}},2921:function(e,n,t){t.d(n,{Z:function(){return l}});var r=t(1413),c=t(4164),a=t(1176),s=t(9422),o=t(184),i=function(e){var n=(0,o.jsxs)("div",{className:"modal ".concat(e.className),style:e.style,children:[(0,o.jsx)("header",{className:"modal__header ".concat(e.headerClass),children:(0,o.jsx)("h2",{children:e.header})}),(0,o.jsxs)("form",{onSubmit:e.onSubmit?e.onSubmit:function(e){return e.preventDefault()},children:[(0,o.jsx)("div",{className:"modal__content ".concat(e.contentClass),children:e.children}),(0,o.jsx)("footer",{className:"modal__footer ".concat(e.footerClass),children:e.footer})]})]});return c.createPortal(n,document.getElementById("modal-hook"))},l=function(e){return(0,o.jsxs)(o.Fragment,{children:[e.show&&(0,o.jsx)(s.Z,{onClick:e.onCancel}),(0,o.jsx)(a.Z,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:200,classNames:"modal",children:(0,o.jsx)(i,(0,r.Z)({},e))})]})}},9508:function(e,n,t){t.d(n,{x:function(){return o}});var r=t(4165),c=t(5861),a=t(9439),s=t(2791),o=function(){var e=(0,s.useState)(!1),n=(0,a.Z)(e,2),t=n[0],o=n[1],i=(0,s.useState)(),l=(0,a.Z)(i,2),u=l[0],d=l[1],h=(0,s.useRef)([]),f=(0,s.useCallback)(function(){var e=(0,c.Z)((0,r.Z)().mark((function e(n){var t,c,a,s,i,l,u=arguments;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=u.length>1&&void 0!==u[1]?u[1]:"GET",c=u.length>2&&void 0!==u[2]?u[2]:null,a=u.length>3&&void 0!==u[3]?u[3]:{},o(!0),s=new AbortController,h.current.push(s),e.prev=6,e.next=9,fetch(n,{method:t,body:c,headers:a,signal:s.signal});case 9:return i=e.sent,e.next=12,i.json();case 12:if(l=e.sent,h.current=h.current.filter((function(e){return e!==s})),i.ok){e.next=16;break}throw new Error(l.message);case 16:return o(!1),e.abrupt("return",l);case 20:throw e.prev=20,e.t0=e.catch(6),d(e.t0.message),o(!1),e.t0;case 25:case"end":return e.stop()}}),e,null,[[6,20]])})));return function(n){return e.apply(this,arguments)}}(),[]);return(0,s.useEffect)((function(){return function(){h.current.forEach((function(e){return e.abort()}))}}),[]),{isLoading:t,error:u,sendRequest:f,clearError:function(){d(null)}}}}}]);
//# sourceMappingURL=791.18939186.chunk.js.map