"use strict";(self.webpackChunkreact_homework_template=self.webpackChunkreact_homework_template||[]).push([[36],{36:function(n,e,t){t.r(e),t.d(e,{default:function(){return P}});var r,o,i,a,u=t(5861),s=t(885),c=t(4687),l=t.n(c),p=t(6731),d=t(2791),f=t(6795),g=t(4653),x=t(4916),h=t(2134),m=t(168),b=t(7402),v=b.Z.div(r||(r=(0,m.Z)(["\n  position: sticky;\n  top: 25px;\n  z-index: 1100;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 64px;\n  padding-right: 24px;\n  padding-left: 24px;\n  padding-top: 12px;\n  padding-bottom: 12px;\n  color: #fff;\n  background-color: #3f51b5;\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),\n    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n"]))),k=b.Z.form(o||(o=(0,m.Z)(["\n  display: flex;\n  align-items: center;\n  width: 100%;\n  max-width: 600px;\n  background-color: #fff;\n  border-radius: 3px;\n  overflow: hidden;\n"]))),w=b.Z.input(i||(i=(0,m.Z)(["\n  display: inline-block;\n  width: 100%;\n  font: inherit;\n  font-size: 20px;\n  border: none;\n  outline: none;\n  padding-left: 4px;\n  padding-right: 4px;\n  ::placeholder {\n    font: inherit;\n    font-size: 18px;\n  }\n"]))),y=b.Z.button(a||(a=(0,m.Z)(["\n  display: inline-block;\n  width: 48px;\n  height: 48px;\n  border: 0;\n  background-image: url('https://image.flaticon.com/icons/svg/149/149852.svg');\n  background-size: 40%;\n  background-repeat: no-repeat;\n  background-position: center;\n  opacity: 0.6;\n  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);\n  cursor: pointer;\n  outline: none;\n  :hover {\n    opacity: 1;\n  }\n"]))),Z=t(184),j=function(n){var e,t=n.onSubmit,r=(0,p.lr)(),o=(0,s.Z)(r,2),i=o[0],a=o[1],u=null!==(e=i.get("query"))&&void 0!==e?e:"";return(0,Z.jsx)(v,{children:(0,Z.jsxs)(k,{children:[(0,Z.jsx)(y,{type:"submit",onClick:function(n){n.preventDefault();var e=u.trim().toLowerCase();e?t(e):(0,f.Am)("Enter something")},children:(0,Z.jsx)(h.RB5,{size:"20"})}),(0,Z.jsx)(w,{type:"text",autoComplete:"off",autoFocus:!0,placeholder:"Search movies",maxLength:"20",value:u,onChange:function(n){var e=n.currentTarget.value;a(""!==e?{query:e}:{})}})]})})},S=t(4723),C=t(7595),q=t(9694),z=t(6366),P=function(){var n=(0,p.lr)(),e=(0,s.Z)(n,1)[0],t=(0,d.useState)(null),r=(0,s.Z)(t,2),o=r[0],i=r[1],a=(0,d.useState)((function(){return e.get("query")})),c=(0,s.Z)(a,2),h=c[0],m=c[1],b=(0,d.useState)(!1),v=(0,s.Z)(b,2),k=v[0],w=v[1],y=(0,d.useState)((function(){var n,e,t=sessionStorage.getItem("scrollPositions");return null!==(n=null===(e=JSON.parse(t))||void 0===e?void 0:e.moviesPage)&&void 0!==n?n:0})),P=(0,s.Z)(y,1)[0];(0,d.useEffect)((function(){0!==(null===o||void 0===o?void 0:o.length)&&window.scrollTo(0,P)}),[P,o]),(0,d.useEffect)((function(){var n=new AbortController,e=function(){var e=(0,u.Z)(l().mark((function e(){var t,r;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,w(!0),e.next=6,C.Z.getByQuery({query:h,controller:n});case 6:t=e.sent,r=t.data,i((0,x.Fw)(r.results)),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),"canceled"!==e.t0.message&&((0,f.Am)("Something went wrong. Please reload page..."),console.log(e.t0));case 14:return e.prev=14,w(!1),e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[2,11,14,17]])})));return function(){return e.apply(this,arguments)}}();return e(),function(){n.abort()}}),[h]);return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(j,{onSubmit:function(n){i(null),m(n)}}),k&&(0,Z.jsx)(z.Z,{}),null!==o&&0!==o.length&&(0,Z.jsx)(S.Z,{onMovieCardClick:function(){return(0,g.q)("moviesPage")},movies:o}),null!==o&&0===o.length&&(0,Z.jsx)("img",{src:q,alt:"bad request"})]})}},9694:function(n,e,t){n.exports=t.p+"static/media/badRequestImg.28cf33fa7f1ba7fae972.png"}}]);
//# sourceMappingURL=36.8c81a630.chunk.js.map