var Ee=Object.defineProperty,we=Object.defineProperties;var Pe=Object.getOwnPropertyDescriptors;var ae=Object.getOwnPropertySymbols;var _e=Object.prototype.hasOwnProperty,be=Object.prototype.propertyIsEnumerable;var oe=(e,a,s)=>a in e?Ee(e,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[a]=s,M=(e,a)=>{for(var s in a||(a={}))_e.call(a,s)&&oe(e,s,a[s]);if(ae)for(var s of ae(a))be.call(a,s)&&oe(e,s,a[s]);return e},Y=(e,a)=>we(e,Pe(a));import{d as I,c as v,t as Ae,a as b,b as g,r as O,n as A,o as h,e as ne,f as R,g as Ce,h as Fe,w as D,i as Le,j as ke,F as W,k as H,u as p,l as N,m as Se,p as X,v as $e,q as Be,s as C,x as De,y as F,z as y,A as se,B as re,C as Ne,D as Te,E as Me,G as Ye}from"./vendor.da5b8135.js";const Ie=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}};Ie();var x=(e,a)=>{const s=e.__vccOpts||e;for(const[r,t]of a)s[r]=t;return s};const Oe=I({name:"MPanel",props:{title:{type:String,default:"\u9762\u677F\u6807\u9898"},isTitle:{type:Boolean,default:!0},cClass:{type:String,default:""}},setup(e,a){}}),Re={class:"m-panel-wrapper"},We={key:0,class:"m-panel-title"};function He(e,a,s,r,t,n){return h(),v("div",Re,[e.isTitle?(h(),v("div",We,Ae(e.title),1)):b("",!0),g("div",{class:A(["m-panel-content",e.cClass])},[O(e.$slots,"default",{},void 0,!0)],2)])}var Xe=x(Oe,[["render",He],["__scopeId","data-v-00815f40"]]);const xe=()=>{const e=navigator.userAgent,a=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"];let s=!1;for(let r=0;r<a.length;r++)if(e.indexOf(a[r])>0){s=!0;break}return s},je=()=>window.navigator.userAgent.toLowerCase().indexOf("firefox")!=-1;function Ve(e,a,s){if(e.attachEvent){e.attachEvent("on"+a,s);return}e.addEventListener&&e.addEventListener(a,s,!1)}function qe(e,a,s){if(e.detachEvent){debugger;e.detachEvent("on"+a,s);return}e.removeEventListener&&e.removeEventListener(a,s,!1)}function le(e){const a=e.composedPath&&e.composedPath()||e.path,s=e.target;if(a!=null)return a.indexOf(window)<0?a.concat(window):a;if(s===window)return[window];function r(t,n){n=n||[];const d=t.parentNode;return d?r(d,n.concat(d)):n}return[s].concat(r(s),window)}/*! iNoBounce - v0.2.0
* https://github.com/lazd/iNoBounce/
* Copyright (c) 2013 Larry Davis <lazdnet@gmail.com>; Licensed BSD */var j=0,V=!1,q=!1;try{var ze=Object.defineProperty({},"passive",{get:function(){q=!0}});window.addEventListener("test",null,ze)}catch{}var ie=function(e){var a=e.target,s=window.innerWidth/window.document.documentElement.clientWidth;if(!(e.touches.length>1||s!==1)){for(;a!==document.body&&a!==document;){var r=window.getComputedStyle(a);if(!r)break;if(a.nodeName==="INPUT"&&a.getAttribute("type")==="range")return;var t=r.getPropertyValue("-webkit-overflow-scrolling"),n=r.getPropertyValue("overflow-y"),d=parseInt(r.getPropertyValue("height"),10),i=t==="touch"&&(n==="auto"||n==="scroll"),f=a.scrollHeight>a.offsetHeight;if(i&&f){var S=e.touches?e.touches[0].screenY:e.screenY,E=j<=S&&a.scrollTop===0,P=j>=S&&a.scrollHeight-a.scrollTop===d;(E||P)&&e.preventDefault();return}a=a.parentNode}e.preventDefault()}},ue=function(e){j=e.touches?e.touches[0].screenY:e.screenY},ce=function(){window.addEventListener("touchstart",ue,q?{passive:!1}:!1),window.addEventListener("touchmove",ie,q?{passive:!1}:!1),V=!0},Ue=function(){window.removeEventListener("touchstart",ue,!1),window.removeEventListener("touchmove",ie,!1),V=!1},Ge=function(){return V},T=document.createElement("div");document.documentElement.appendChild(T);T.style.WebkitOverflowScrolling="touch";var Ke="getComputedStyle"in window&&window.getComputedStyle(T)["-webkit-overflow-scrolling"]==="touch";document.documentElement.removeChild(T);Ke&&ce();var w={enable:ce,disable:Ue,isEnabled:Ge};const Qe=["data-num"],Je=["src","onLoad"],Ze={key:1,class:"page-box"},et={key:2,class:"page-box"},tt=["onClick","onMouseover"],at={name:"MvFullPage"},ot=I(Y(M({},at),{props:{pages:{type:Number,default:1},page:{type:Number,default:1},config:{type:Object}},emits:["pointerMouseover","update:page","rollEnd"],setup(e,{expose:a,emit:s}){const r=e,t=ne({pagesArr:[],isPc:!1,fullHeight:0,fullWidth:0,maxY:0,maxX:0,startY:0,endY:0,startX:0,endX:0,currentPage:1,isRock:!1,isUp:!1,subScrollEl:null,wheelEventName:null,isInitTranslate:!1,playInterval:null,isForward:!0,isInitPage:!1,autoPlayFinished:!1}),n=R(),d=R(),i=Ce(()=>Se({position:"fixed",width:"100%",height:"100%",direction:"v",poi:{pointer:!0,position:"right"},cache:!0,bgArr:[],bgConfig:{fit:"cover"},transition:{duration:"1000ms",timingFun:"ease",delay:"0s"},loop:!1,arrow:{last:!1,next:!1},autoPlay:{play:!1,interval:1e3}},r.config)),f=o=>{!$()||(o=="last"&&m(!1),o=="next"&&m(!0))},S=(o,u)=>{s("pointerMouseover",{event:o,index:u})},E=()=>{setTimeout(()=>{m(!0)},i.value.autoPlay.interval)},P=(o=0,u=!1)=>{u&&Z(!0),n.value;let l=`translate${i.value.direction=="v"?"Y":"X"}(${o}px)`;n.value.style.transform=l,u&&setTimeout(()=>{Z(!1)},500)},z=Fe(()=>{U()},500),de=o=>{!$()||(_(o,!0),s("update:page",o))},U=()=>{t.fullHeight=d.value.clientHeight,t.fullWidth=d.value.clientWidth,t.maxY=r.pages*t.fullHeight,t.maxX=r.pages*t.fullWidth},pe=()=>{n.value.style.height=n.value.querySelectorAll(".page").length*t.fullHeight+"px",n.value.style.width=n.value.querySelectorAll(".page").length*t.fullWidth+"px"},ge=()=>{t.isPc?(t.wheelEventName=je()?"DOMMouseScroll":"mousewheel",Ve(n.value,t.wheelEventName,G)):(n.value.addEventListener("touchstart",K,!1),n.value.addEventListener("touchmove",Q,!1),n.value.addEventListener("touchend",J,!1))},fe=()=>{t.isPc?qe(n.value,t.wheelEventName,G):(w.disable(),n.value.removeEventListener("touchstart",K),n.value.removeEventListener("touchmove",Q),n.value.removeEventListener("touchend",J))},$=()=>!(t.isRock||i.value.autoPlay.play&&!t.autoPlayFinished),G=o=>{if(!$())return;let u=le(o);Array.from(u).some(c=>!!(c.dataset&&c.dataset.scroll=="true"))||(o.deltaY>0||o.detail>0||o.wheelDelta<0?m(!0):m(!1))},K=o=>{console.log(o),le(o).forEach(l=>{l.dataset&&l.dataset.scroll=="true"&&(t.subScrollEl=l)}),t.subScrollEl?w.disable():w.enable(),t.startY=o.changedTouches[0].pageY,t.startX=o.changedTouches[0].pageX},Q=o=>{t.subScrollEl&&t.subScrollEl.scrollTop==0&&o.changedTouches[0].pageY-t.startY>0&&w.enable()},J=o=>{if(!!$()&&!t.isRock){if(t.subScrollEl){t.subScrollEl=null,w.enable();return}i.value.direction=="v"?o.changedTouches[0].pageY-t.startY<-50?(t.startY=0,m(!0)):o.changedTouches[0].pageY-t.startY>50&&(t.startY=0,m(!1)):o.changedTouches[0].pageX-t.startX<-50?(t.startX=0,m(!0)):o.changedTouches[0].pageX-t.startX>50&&(t.startX=0,m(!1))}},_=(o,u,l)=>{if(n.value&&t.fullHeight>0&&t.fullWidth>0){let c=-(o*(i.value.direction=="v"?t.fullHeight:t.fullWidth));u&&(n.value.style.transitionProperty="none");let B=`translate${i.value.direction=="v"?"Y":"X"}(${c}px)`;if(n.value.style.transform=B,u)setTimeout(()=>{n.value.style.transitionProperty="transform"},1);else{t.isRock=!0;const te=()=>{t.isRock=!1,s("rollEnd",r.page),n.value.removeEventListener("transitionend",te),l&&l>0&&_(l,!0),i.value.autoPlay.play&&(i.value.loop||r.page<r.pages&&!t.autoPlayFinished?E():t.autoPlayFinished=!0)};n.value.addEventListener("transitionend",te)}}},m=(o=!0,u=!1)=>{if(n.value){let l,c;if(o?(l=r.page+1,c=r.page==r.pages&&1):(l=r.page-1,c=r.page==1&&r.pages),c){_(l,u,c),s("update:page",c);return}_(l,u),s("update:page",l)}},Z=(o=!0)=>{const u=n.value;o?u.classList.add("transition-clear"):u.classList.remove("transition-clear")},ve=()=>{const o=n.value;if(o.firstChild&&o.lastChild){const u=o.querySelector(".page[data-num = '1']"),l=o.querySelector(`.page[data-num = '${r.pages}']`),c=u.cloneNode(!0),B=l.cloneNode(!0);o.append(c),o.prepend(B)}},he=()=>{t.isPc=!xe(),t.isPc?console.log("\u5F53\u524Dmv-full-page\u8FD0\u884C\u73AF\u5883\u4E3A: PC\u7AEF"):(console.log("\u5F53\u524Dmv-full-page\u8FD0\u884C\u73AF\u5883\u4E3A: \u79FB\u52A8\u7AEF"),w.enable()),U(),ge(),window.addEventListener("resize",z)},me=(o,u)=>{_(o,u)};let ee=0;const ye=o=>{ee+=1,ee==r.pages&&i.value.autoPlay.play&&(console.log("\u5168\u90E8\u80CC\u666F\u56FE\u7247\u521D\u59CB\u5316\u5B8C\u6210"),setTimeout(()=>{E()},i.value.autoPlay.interval))};return D(()=>r.page,o=>{C(()=>{if(!t.isInitPage){const u=-(o*t.fullHeight);P(u,!0),t.isInitPage=!0;return}})},{immediate:!0}),D(()=>r.pages,o=>{if(!(!r.pages||r.pages<=0)){t.pagesArr.length=0;for(let u=0;u<r.pages;u++)t.pagesArr.push({page:u+1});r.page>1&&t.isInitPage&&(n.value&&n.value.classList.add("transition-clear"),t.isInitTranslate=!0),t.isInitPage?s("update:page",1):s("update:page",r.page),C(()=>{C(()=>{ve(),pe()})})}},{immediate:!0}),D(()=>i.value.direction,o=>{C(()=>{const u=n.value;o=="h"?(P(-t.fullWidth,!0),u.querySelectorAll(".page").forEach(l=>{l.classList.add("floatLeft")})):(P(-t.fullHeight,!0),u.querySelectorAll(".page").forEach(l=>{l.classList.remove("floatLeft")}))})},{immediate:!0}),D(()=>i.value.autoPlay.play,o=>{o&&C(()=>{E()})},{immediate:!1}),a({goPage:me}),Le(()=>{he()}),ke(()=>{fe(),window.removeEventListener("resize",z),console.log("\u9500\u6BC1\u9875\u9762\u4E8B\u4EF6\u6210\u529F")}),(o,u)=>(h(),v("div",{class:"mv-page-container",style:N({position:p(i).position,width:"100%",height:"100%"}),ref_key:"outContainerRef",ref:d},[g("div",{class:"mv-all-page",ref_key:"allPageRef",ref:n,style:N({"transition-duration":p(i).transition.duration,"transition-timing-function":p(i).transition.timingFun,"transition-delay":p(i).transition.delay})},[(h(!0),v(W,null,H(p(t).pagesArr,(l,c)=>(h(),v("div",{key:c,class:A(["page",{floatLeft:p(i).direction!="v"}]),style:N({height:p(t).fullHeight+"px",width:p(t).fullWidth+"px","background-color":p(i).bgArr[c]&&p(i).bgArr[c].color}),ref_for:!0,ref:`page${l.page}`,"data-num":c+1},[p(i).bgArr[c]&&p(i).bgArr[c].image?(h(),v("img",{key:0,class:"page-bg-img",src:`${p(i).bgArr[c].image}`,style:N({"object-fit":p(i).bgConfig.fit}),onLoad:B=>ye()},null,44,Je)):b("",!0),p(i).cache?(h(),v("div",Ze,[O(o.$slots,`page${l.page}`,{data:l},void 0,!0)])):X((h(),v("div",et,[O(o.$slots,`page${l.page}`,{data:l},void 0,!0)],512)),[[$e,e.page==l.page]])],14,Qe))),128))],4),p(i).poi.pointer?(h(),v("div",{key:0,class:A(["mv-pointer-wrapper",[p(i).poi.position,p(i).poi.className]])},[g("ul",{class:A(p(t).isPc&&"hover")},[(h(!0),v(W,null,H(e.pages,l=>(h(),v("li",{class:A({active:e.page==l}),onClick:Be(c=>de(l),["stop"]),key:l,onMouseover:c=>S(c,l)},null,42,tt))),128))],2)],2)):b("",!0),p(i).arrow.last?(h(),v("div",{key:1,class:"last-arrow iconfont icon-jiantoushang",onClick:u[0]||(u[0]=l=>f("last"))})):b("",!0),p(i).arrow.next?(h(),v("div",{key:2,class:"next-arrow iconfont icon-jiantouxia",onClick:u[1]||(u[1]=l=>f("next"))})):b("",!0)],4))}}));var L=x(ot,[["__scopeId","data-v-a63b98c8"]]);L.install=(e,a)=>{e.component(L.name,L)};const nt=I({components:{MPanel:Xe,[L.name]:L},setup(){const e=ne({dynamicSlotName:"page",pages:4,tempPage:1,page:1,config:{direction:"v",cache:!0,bgArr:[{image:"https://dongman-10014144.cos.ap-shanghai.myqcloud.com/demo1.jpg"},{image:"https://dongman-10014144.cos.ap-shanghai.myqcloud.com/demo2.jpg"},{image:"https://dongman-10014144.cos.ap-shanghai.myqcloud.com/demo3.jpg"},{image:"https://dongman-10014144.cos.ap-shanghai.myqcloud.com/demo4.jpg"}],loop:!0,autoPlay:{play:!1,interval:1e3},arrow:{last:!0,next:!0},poi:{className:"my-poi"}}}),a=R(),s=({event:d,index:i})=>{console.log(d,i)},r=d=>{console.log("\u5F53\u524D\u9875\u9762\u4E3A",d)},t=()=>{e.page=e.tempPage,a.value.goPage(e.page,!0)},n=()=>{e.config.direction=="v"?e.config.direction="h":e.config.direction="v"};return Y(M({},De(e)),{pointerMouseover:s,onRollEnd:r,toPage:t,switchDire:n,myFullPage:a})}}),k=e=>(Ne("data-v-38a94ed4"),e=e(),Te(),e),st={class:"home"},rt={class:"page1",style:{"line-height":"30px"}},lt=k(()=>g("h2",null,"mv-full-page",-1)),it=k(()=>g("h3",{style:{"margin-bottom":"10px"}},"\u4E00\u6B3E\u517C\u5BB9PC\u7AEF\u79FB\u52A8\u7AEF\u7684Vue\u5168\u5C4F\u6EDA\u52A8\u7EC4\u4EF6",-1)),ut=Me(" \u65F6\u95F4\u95F4\u9694\uFF1A "),ct={class:"sub_scroll-test-box","data-scroll":"true"},dt=k(()=>g("div",{class:"page2"},"2",-1)),pt=k(()=>g("div",{class:"page3"},"3",-1)),gt=k(()=>g("div",{class:"page4"},"4",-1));function ft(e,a,s,r,t,n){const d=se("m-panel"),i=se("mv-full-page");return h(),v("div",st,[F(i,{ref:"myFullPage",pages:e.pages,page:e.page,"onUpdate:page":a[5]||(a[5]=f=>e.page=f),config:e.config,onRollEnd:e.onRollEnd,onPointerMouseover:e.pointerMouseover},{page1:y(()=>[g("div",rt,[lt,it,F(d,{title:"\u5207\u6362\u65B9\u5411"},{default:y(()=>[g("button",{class:"btn btn-s1",onClick:a[0]||(a[0]=(...f)=>e.switchDire&&e.switchDire(...f))},"\u5207\u6362\u6ED1\u52A8\u65B9\u5411(\u9ED8\u8BA4\u5782\u76F4\u65B9\u5411)")]),_:1}),F(d,{title:"\u624B\u52A8\u5207\u6362\u5230\u5177\u4F53\u9875\u7801"},{default:y(()=>[X(g("input",{type:"text","onUpdate:modelValue":a[1]||(a[1]=f=>e.tempPage=f)},null,512),[[re,e.tempPage]]),g("p",null,[g("button",{class:"btn btn-s1",onClick:a[2]||(a[2]=(...f)=>e.toPage&&e.toPage(...f))},"\u5207\u6362")])]),_:1}),F(d,{title:"\u81EA\u52A8\u64AD\u653E"},{default:y(()=>[ut,X(g("input",{type:"text","onUpdate:modelValue":a[3]||(a[3]=f=>e.config.autoPlay.interval=f)},null,512),[[re,e.config.autoPlay.interval]]),g("button",{class:"btn btn-s1",onClick:a[4]||(a[4]=()=>{e.config.loop=!0,e.config.autoPlay.play=!0})},"\u5F00\u542F\u81EA\u52A8\u4E14\u5FAA\u73AF\u64AD\u653E")]),_:1}),F(d,{title:"\u79FB\u52A8\u7AEF\u5C40\u90E8\u5217\u8868\u6EDA\u52A8demo"},{default:y(()=>[g("div",ct,[(h(),v(W,null,H(99,f=>g("p",{key:f},"\u6EDA\u52A8\u6D4B\u8BD5\u6570\u636E")),64))])]),_:1})])]),page2:y(()=>[dt]),page3:y(()=>[pt]),page4:y(()=>[gt]),_:1},8,["pages","page","config","onRollEnd","onPointerMouseover"])])}var vt=x(nt,[["render",ft],["__scopeId","data-v-38a94ed4"]]);Ye(vt).mount("#app");
