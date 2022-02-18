var Gl=Object.defineProperty,zl=Object.defineProperties;var Ul=Object.getOwnPropertyDescriptors;var tt=Object.getOwnPropertySymbols;var Vl=Object.prototype.hasOwnProperty,Wl=Object.prototype.propertyIsEnumerable;var rt=(i,b,w)=>b in i?Gl(i,b,{enumerable:!0,configurable:!0,writable:!0,value:w}):i[b]=w,at=(i,b)=>{for(var w in b||(b={}))Vl.call(b,w)&&rt(i,w,b[w]);if(tt)for(var w of tt(b))Wl.call(b,w)&&rt(i,w,b[w]);return i},nt=(i,b)=>zl(i,Ul(b));(function(i,b){typeof exports=="object"&&typeof module!="undefined"?module.exports=b(require("vue")):typeof define=="function"&&define.amd?define(["vue"],b):(i=typeof globalThis!="undefined"?globalThis:i||self,i.MvFullPage=b(i.Vue))})(this,function(i){"use strict";var b=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function w(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var C=w,it=typeof b=="object"&&b&&b.Object===Object&&b,ue=it,ot=ue,st=typeof self=="object"&&self&&self.Object===Object&&self,lt=ot||st||Function("return this")(),P=lt,ct=P,ut=function(){return ct.Date.now()},ft=ut,dt=/\s/;function pt(e){for(var t=e.length;t--&&dt.test(e.charAt(t)););return t}var vt=pt,gt=vt,ht=/^\s+/;function yt(e){return e&&e.slice(0,gt(e)+1).replace(ht,"")}var bt=yt,_t=P,$t=_t.Symbol,fe=$t,de=fe,pe=Object.prototype,mt=pe.hasOwnProperty,Tt=pe.toString,B=de?de.toStringTag:void 0;function wt(e){var t=mt.call(e,B),r=e[B];try{e[B]=void 0;var n=!0}catch{}var a=Tt.call(e);return n&&(t?e[B]=r:delete e[B]),a}var Ct=wt,Ot=Object.prototype,Pt=Ot.toString;function At(e){return Pt.call(e)}var St=At,ve=fe,Et=Ct,jt=St,xt="[object Null]",It="[object Undefined]",ge=ve?ve.toStringTag:void 0;function Lt(e){return e==null?e===void 0?It:xt:ge&&ge in Object(e)?Et(e):jt(e)}var N=Lt;function Ft(e){return e!=null&&typeof e=="object"}var S=Ft,kt=N,Mt=S,Bt="[object Symbol]";function Nt(e){return typeof e=="symbol"||Mt(e)&&kt(e)==Bt}var Dt=Nt,Ht=bt,he=C,Rt=Dt,ye=0/0,Gt=/^[-+]0x[0-9a-f]+$/i,zt=/^0b[01]+$/i,Ut=/^0o[0-7]+$/i,Vt=parseInt;function Wt(e){if(typeof e=="number")return e;if(Rt(e))return ye;if(he(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=he(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=Ht(e);var r=zt.test(e);return r||Ut.test(e)?Vt(e.slice(2),r?2:8):Gt.test(e)?ye:+e}var Yt=Wt,Xt=C,J=ft,be=Yt,Kt="Expected a function",qt=Math.max,Jt=Math.min;function Qt(e,t,r){var n,a,s,c,o,u,p=0,g=!1,_=!1,T=!0;if(typeof e!="function")throw new TypeError(Kt);t=be(t)||0,Xt(r)&&(g=!!r.leading,_="maxWait"in r,s=_?qt(be(r.maxWait)||0,t):s,T="trailing"in r?!!r.trailing:T);function O(h){var m=n,$=a;return n=a=void 0,p=h,c=e.apply($,m),c}function A(h){return p=h,o=setTimeout(F,t),g?O(h):c}function le(h){var m=h-u,$=h-p,D=t-m;return _?Jt(D,s-$):D}function X(h){var m=h-u,$=h-p;return u===void 0||m>=t||m<0||_&&$>=s}function F(){var h=J();if(X(h))return k(h);o=setTimeout(F,le(h))}function k(h){return o=void 0,T&&n?O(h):(n=a=void 0,c)}function K(){o!==void 0&&clearTimeout(o),p=0,n=u=a=o=void 0}function q(){return o===void 0?c:k(J())}function M(){var h=J(),m=X(h);if(n=arguments,a=this,u=h,m){if(o===void 0)return A(u);if(_)return clearTimeout(o),o=setTimeout(F,t),O(u)}return o===void 0&&(o=setTimeout(F,t)),c}return M.cancel=K,M.flush=q,M}var Zt=Qt,er=Zt,tr=C,rr="Expected a function";function ar(e,t,r){var n=!0,a=!0;if(typeof e!="function")throw new TypeError(rr);return tr(r)&&(n="leading"in r?!!r.leading:n,a="trailing"in r?!!r.trailing:a),er(e,t,{leading:n,maxWait:t,trailing:a})}var nr=ar;function ir(){this.__data__=[],this.size=0}var or=ir;function sr(e,t){return e===t||e!==e&&t!==t}var H=sr,lr=H;function cr(e,t){for(var r=e.length;r--;)if(lr(e[r][0],t))return r;return-1}var R=cr,ur=R,fr=Array.prototype,dr=fr.splice;function pr(e){var t=this.__data__,r=ur(t,e);if(r<0)return!1;var n=t.length-1;return r==n?t.pop():dr.call(t,r,1),--this.size,!0}var vr=pr,gr=R;function hr(e){var t=this.__data__,r=gr(t,e);return r<0?void 0:t[r][1]}var yr=hr,br=R;function _r(e){return br(this.__data__,e)>-1}var $r=_r,mr=R;function Tr(e,t){var r=this.__data__,n=mr(r,e);return n<0?(++this.size,r.push([e,t])):r[n][1]=t,this}var wr=Tr,Cr=or,Or=vr,Pr=yr,Ar=$r,Sr=wr;function E(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}E.prototype.clear=Cr,E.prototype.delete=Or,E.prototype.get=Pr,E.prototype.has=Ar,E.prototype.set=Sr;var G=E,Er=G;function jr(){this.__data__=new Er,this.size=0}var xr=jr;function Ir(e){var t=this.__data__,r=t.delete(e);return this.size=t.size,r}var Lr=Ir;function Fr(e){return this.__data__.get(e)}var kr=Fr;function Mr(e){return this.__data__.has(e)}var Br=Mr,Nr=N,Dr=C,Hr="[object AsyncFunction]",Rr="[object Function]",Gr="[object GeneratorFunction]",zr="[object Proxy]";function Ur(e){if(!Dr(e))return!1;var t=Nr(e);return t==Rr||t==Gr||t==Hr||t==zr}var Q=Ur,Vr=P,Wr=Vr["__core-js_shared__"],Yr=Wr,Z=Yr,_e=function(){var e=/[^.]+$/.exec(Z&&Z.keys&&Z.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();function Xr(e){return!!_e&&_e in e}var Kr=Xr,qr=Function.prototype,Jr=qr.toString;function Qr(e){if(e!=null){try{return Jr.call(e)}catch{}try{return e+""}catch{}}return""}var Zr=Qr,ea=Q,ta=Kr,ra=C,aa=Zr,na=/[\\^$.*+?()[\]{}|]/g,ia=/^\[object .+?Constructor\]$/,oa=Function.prototype,sa=Object.prototype,la=oa.toString,ca=sa.hasOwnProperty,ua=RegExp("^"+la.call(ca).replace(na,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function fa(e){if(!ra(e)||ta(e))return!1;var t=ea(e)?ua:ia;return t.test(aa(e))}var da=fa;function pa(e,t){return e==null?void 0:e[t]}var va=pa,ga=da,ha=va;function ya(e,t){var r=ha(e,t);return ga(r)?r:void 0}var ee=ya,ba=ee,_a=P,$a=ba(_a,"Map"),$e=$a,ma=ee,Ta=ma(Object,"create"),z=Ta,me=z;function wa(){this.__data__=me?me(null):{},this.size=0}var Ca=wa;function Oa(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}var Pa=Oa,Aa=z,Sa="__lodash_hash_undefined__",Ea=Object.prototype,ja=Ea.hasOwnProperty;function xa(e){var t=this.__data__;if(Aa){var r=t[e];return r===Sa?void 0:r}return ja.call(t,e)?t[e]:void 0}var Ia=xa,La=z,Fa=Object.prototype,ka=Fa.hasOwnProperty;function Ma(e){var t=this.__data__;return La?t[e]!==void 0:ka.call(t,e)}var Ba=Ma,Na=z,Da="__lodash_hash_undefined__";function Ha(e,t){var r=this.__data__;return this.size+=this.has(e)?0:1,r[e]=Na&&t===void 0?Da:t,this}var Ra=Ha,Ga=Ca,za=Pa,Ua=Ia,Va=Ba,Wa=Ra;function j(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}j.prototype.clear=Ga,j.prototype.delete=za,j.prototype.get=Ua,j.prototype.has=Va,j.prototype.set=Wa;var Ya=j,Te=Ya,Xa=G,Ka=$e;function qa(){this.size=0,this.__data__={hash:new Te,map:new(Ka||Xa),string:new Te}}var Ja=qa;function Qa(e){var t=typeof e;return t=="string"||t=="number"||t=="symbol"||t=="boolean"?e!=="__proto__":e===null}var Za=Qa,en=Za;function tn(e,t){var r=e.__data__;return en(t)?r[typeof t=="string"?"string":"hash"]:r.map}var U=tn,rn=U;function an(e){var t=rn(this,e).delete(e);return this.size-=t?1:0,t}var nn=an,on=U;function sn(e){return on(this,e).get(e)}var ln=sn,cn=U;function un(e){return cn(this,e).has(e)}var fn=un,dn=U;function pn(e,t){var r=dn(this,e),n=r.size;return r.set(e,t),this.size+=r.size==n?0:1,this}var vn=pn,gn=Ja,hn=nn,yn=ln,bn=fn,_n=vn;function x(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}x.prototype.clear=gn,x.prototype.delete=hn,x.prototype.get=yn,x.prototype.has=bn,x.prototype.set=_n;var $n=x,mn=G,Tn=$e,wn=$n,Cn=200;function On(e,t){var r=this.__data__;if(r instanceof mn){var n=r.__data__;if(!Tn||n.length<Cn-1)return n.push([e,t]),this.size=++r.size,this;r=this.__data__=new wn(n)}return r.set(e,t),this.size=r.size,this}var Pn=On,An=G,Sn=xr,En=Lr,jn=kr,xn=Br,In=Pn;function I(e){var t=this.__data__=new An(e);this.size=t.size}I.prototype.clear=Sn,I.prototype.delete=En,I.prototype.get=jn,I.prototype.has=xn,I.prototype.set=In;var Ln=I,Fn=ee,kn=function(){try{var e=Fn(Object,"defineProperty");return e({},"",{}),e}catch{}}(),we=kn,Ce=we;function Mn(e,t,r){t=="__proto__"&&Ce?Ce(e,t,{configurable:!0,enumerable:!0,value:r,writable:!0}):e[t]=r}var te=Mn,Bn=te,Nn=H;function Dn(e,t,r){(r!==void 0&&!Nn(e[t],r)||r===void 0&&!(t in e))&&Bn(e,t,r)}var Oe=Dn;function Hn(e){return function(t,r,n){for(var a=-1,s=Object(t),c=n(t),o=c.length;o--;){var u=c[e?o:++a];if(r(s[u],u,s)===!1)break}return t}}var Rn=Hn,Gn=Rn,zn=Gn(),Un=zn,re={exports:{}};(function(e,t){var r=P,n=t&&!t.nodeType&&t,a=n&&!0&&e&&!e.nodeType&&e,s=a&&a.exports===n,c=s?r.Buffer:void 0,o=c?c.allocUnsafe:void 0;function u(p,g){if(g)return p.slice();var _=p.length,T=o?o(_):new p.constructor(_);return p.copy(T),T}e.exports=u})(re,re.exports);var Vn=P,Wn=Vn.Uint8Array,Yn=Wn,Pe=Yn;function Xn(e){var t=new e.constructor(e.byteLength);return new Pe(t).set(new Pe(e)),t}var Kn=Xn,qn=Kn;function Jn(e,t){var r=t?qn(e.buffer):e.buffer;return new e.constructor(r,e.byteOffset,e.length)}var Qn=Jn;function Zn(e,t){var r=-1,n=e.length;for(t||(t=Array(n));++r<n;)t[r]=e[r];return t}var ei=Zn,ti=C,Ae=Object.create,ri=function(){function e(){}return function(t){if(!ti(t))return{};if(Ae)return Ae(t);e.prototype=t;var r=new e;return e.prototype=void 0,r}}(),ai=ri;function ni(e,t){return function(r){return e(t(r))}}var ii=ni,oi=ii,si=oi(Object.getPrototypeOf,Object),Se=si,li=Object.prototype;function ci(e){var t=e&&e.constructor,r=typeof t=="function"&&t.prototype||li;return e===r}var Ee=ci,ui=ai,fi=Se,di=Ee;function pi(e){return typeof e.constructor=="function"&&!di(e)?ui(fi(e)):{}}var vi=pi,gi=N,hi=S,yi="[object Arguments]";function bi(e){return hi(e)&&gi(e)==yi}var _i=bi,je=_i,$i=S,xe=Object.prototype,mi=xe.hasOwnProperty,Ti=xe.propertyIsEnumerable,wi=je(function(){return arguments}())?je:function(e){return $i(e)&&mi.call(e,"callee")&&!Ti.call(e,"callee")},Ie=wi,Ci=Array.isArray,Le=Ci,Oi=9007199254740991;function Pi(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=Oi}var Fe=Pi,Ai=Q,Si=Fe;function Ei(e){return e!=null&&Si(e.length)&&!Ai(e)}var ae=Ei,ji=ae,xi=S;function Ii(e){return xi(e)&&ji(e)}var Li=Ii,V={exports:{}};function Fi(){return!1}var ki=Fi;(function(e,t){var r=P,n=ki,a=t&&!t.nodeType&&t,s=a&&!0&&e&&!e.nodeType&&e,c=s&&s.exports===a,o=c?r.Buffer:void 0,u=o?o.isBuffer:void 0,p=u||n;e.exports=p})(V,V.exports);var Mi=N,Bi=Se,Ni=S,Di="[object Object]",Hi=Function.prototype,Ri=Object.prototype,ke=Hi.toString,Gi=Ri.hasOwnProperty,zi=ke.call(Object);function Ui(e){if(!Ni(e)||Mi(e)!=Di)return!1;var t=Bi(e);if(t===null)return!0;var r=Gi.call(t,"constructor")&&t.constructor;return typeof r=="function"&&r instanceof r&&ke.call(r)==zi}var Vi=Ui,Wi=N,Yi=Fe,Xi=S,Ki="[object Arguments]",qi="[object Array]",Ji="[object Boolean]",Qi="[object Date]",Zi="[object Error]",eo="[object Function]",to="[object Map]",ro="[object Number]",ao="[object Object]",no="[object RegExp]",io="[object Set]",oo="[object String]",so="[object WeakMap]",lo="[object ArrayBuffer]",co="[object DataView]",uo="[object Float32Array]",fo="[object Float64Array]",po="[object Int8Array]",vo="[object Int16Array]",go="[object Int32Array]",ho="[object Uint8Array]",yo="[object Uint8ClampedArray]",bo="[object Uint16Array]",_o="[object Uint32Array]",v={};v[uo]=v[fo]=v[po]=v[vo]=v[go]=v[ho]=v[yo]=v[bo]=v[_o]=!0,v[Ki]=v[qi]=v[lo]=v[Ji]=v[co]=v[Qi]=v[Zi]=v[eo]=v[to]=v[ro]=v[ao]=v[no]=v[io]=v[oo]=v[so]=!1;function $o(e){return Xi(e)&&Yi(e.length)&&!!v[Wi(e)]}var mo=$o;function To(e){return function(t){return e(t)}}var wo=To,ne={exports:{}};(function(e,t){var r=ue,n=t&&!t.nodeType&&t,a=n&&!0&&e&&!e.nodeType&&e,s=a&&a.exports===n,c=s&&r.process,o=function(){try{var u=a&&a.require&&a.require("util").types;return u||c&&c.binding&&c.binding("util")}catch{}}();e.exports=o})(ne,ne.exports);var Co=mo,Oo=wo,Me=ne.exports,Be=Me&&Me.isTypedArray,Po=Be?Oo(Be):Co,Ne=Po;function Ao(e,t){if(!(t==="constructor"&&typeof e[t]=="function")&&t!="__proto__")return e[t]}var De=Ao,So=te,Eo=H,jo=Object.prototype,xo=jo.hasOwnProperty;function Io(e,t,r){var n=e[t];(!(xo.call(e,t)&&Eo(n,r))||r===void 0&&!(t in e))&&So(e,t,r)}var Lo=Io,Fo=Lo,ko=te;function Mo(e,t,r,n){var a=!r;r||(r={});for(var s=-1,c=t.length;++s<c;){var o=t[s],u=n?n(r[o],e[o],o,r,e):void 0;u===void 0&&(u=e[o]),a?ko(r,o,u):Fo(r,o,u)}return r}var Bo=Mo;function No(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}var Do=No,Ho=9007199254740991,Ro=/^(?:0|[1-9]\d*)$/;function Go(e,t){var r=typeof e;return t=t==null?Ho:t,!!t&&(r=="number"||r!="symbol"&&Ro.test(e))&&e>-1&&e%1==0&&e<t}var He=Go,zo=Do,Uo=Ie,Vo=Le,Wo=V.exports,Yo=He,Xo=Ne,Ko=Object.prototype,qo=Ko.hasOwnProperty;function Jo(e,t){var r=Vo(e),n=!r&&Uo(e),a=!r&&!n&&Wo(e),s=!r&&!n&&!a&&Xo(e),c=r||n||a||s,o=c?zo(e.length,String):[],u=o.length;for(var p in e)(t||qo.call(e,p))&&!(c&&(p=="length"||a&&(p=="offset"||p=="parent")||s&&(p=="buffer"||p=="byteLength"||p=="byteOffset")||Yo(p,u)))&&o.push(p);return o}var Qo=Jo;function Zo(e){var t=[];if(e!=null)for(var r in Object(e))t.push(r);return t}var es=Zo,ts=C,rs=Ee,as=es,ns=Object.prototype,is=ns.hasOwnProperty;function os(e){if(!ts(e))return as(e);var t=rs(e),r=[];for(var n in e)n=="constructor"&&(t||!is.call(e,n))||r.push(n);return r}var ss=os,ls=Qo,cs=ss,us=ae;function fs(e){return us(e)?ls(e,!0):cs(e)}var Re=fs,ds=Bo,ps=Re;function vs(e){return ds(e,ps(e))}var gs=vs,Ge=Oe,hs=re.exports,ys=Qn,bs=ei,_s=vi,ze=Ie,Ue=Le,$s=Li,ms=V.exports,Ts=Q,ws=C,Cs=Vi,Os=Ne,Ve=De,Ps=gs;function As(e,t,r,n,a,s,c){var o=Ve(e,r),u=Ve(t,r),p=c.get(u);if(p){Ge(e,r,p);return}var g=s?s(o,u,r+"",e,t,c):void 0,_=g===void 0;if(_){var T=Ue(u),O=!T&&ms(u),A=!T&&!O&&Os(u);g=u,T||O||A?Ue(o)?g=o:$s(o)?g=bs(o):O?(_=!1,g=hs(u,!0)):A?(_=!1,g=ys(u,!0)):g=[]:Cs(u)||ze(u)?(g=o,ze(o)?g=Ps(o):(!ws(o)||Ts(o))&&(g=_s(u))):_=!1}_&&(c.set(u,g),a(g,u,n,s,c),c.delete(u)),Ge(e,r,g)}var Ss=As,Es=Ln,js=Oe,xs=Un,Is=Ss,Ls=C,Fs=Re,ks=De;function We(e,t,r,n,a){e!==t&&xs(t,function(s,c){if(a||(a=new Es),Ls(s))Is(e,t,c,r,We,n,a);else{var o=n?n(ks(e,c),s,c+"",e,t,a):void 0;o===void 0&&(o=s),js(e,c,o)}},Fs)}var Ms=We;function Bs(e){return e}var Ye=Bs;function Ns(e,t,r){switch(r.length){case 0:return e.call(t);case 1:return e.call(t,r[0]);case 2:return e.call(t,r[0],r[1]);case 3:return e.call(t,r[0],r[1],r[2])}return e.apply(t,r)}var Ds=Ns,Hs=Ds,Xe=Math.max;function Rs(e,t,r){return t=Xe(t===void 0?e.length-1:t,0),function(){for(var n=arguments,a=-1,s=Xe(n.length-t,0),c=Array(s);++a<s;)c[a]=n[t+a];a=-1;for(var o=Array(t+1);++a<t;)o[a]=n[a];return o[t]=r(c),Hs(e,this,o)}}var Gs=Rs;function zs(e){return function(){return e}}var Us=zs,Vs=Us,Ke=we,Ws=Ye,Ys=Ke?function(e,t){return Ke(e,"toString",{configurable:!0,enumerable:!1,value:Vs(t),writable:!0})}:Ws,Xs=Ys,Ks=800,qs=16,Js=Date.now;function Qs(e){var t=0,r=0;return function(){var n=Js(),a=qs-(n-r);if(r=n,a>0){if(++t>=Ks)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}var Zs=Qs,el=Xs,tl=Zs,rl=tl(el),al=rl,nl=Ye,il=Gs,ol=al;function sl(e,t){return ol(il(e,t,nl),e+"")}var ll=sl,cl=H,ul=ae,fl=He,dl=C;function pl(e,t,r){if(!dl(r))return!1;var n=typeof t;return(n=="number"?ul(r)&&fl(t,r.length):n=="string"&&t in r)?cl(r[t],e):!1}var vl=pl,gl=ll,hl=vl;function yl(e){return gl(function(t,r){var n=-1,a=r.length,s=a>1?r[a-1]:void 0,c=a>2?r[2]:void 0;for(s=e.length>3&&typeof s=="function"?(a--,s):void 0,c&&hl(r[0],r[1],c)&&(s=a<3?void 0:s,a=1),t=Object(t);++n<a;){var o=r[n];o&&e(t,o,n,s)}return t})}var bl=yl,_l=Ms,$l=bl,ml=$l(function(e,t,r){_l(e,t,r)}),Tl=ml;const wl=()=>{const e=navigator.userAgent,t=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"];let r=!1;for(let n=0;n<t.length;n++)if(e.indexOf(t[n])>0){r=!0;break}return r},Cl=()=>window.navigator.userAgent.toLowerCase().indexOf("firefox")!=-1;function Ol(e,t,r){if(e.attachEvent){e.attachEvent("on"+t,r);return}e.addEventListener&&e.addEventListener(t,r,!1)}function Pl(e,t,r){if(e.detachEvent){debugger;e.detachEvent("on"+t,r);return}e.removeEventListener&&e.removeEventListener(t,r,!1)}function qe(e){const t=e.composedPath&&e.composedPath()||e.path,r=e.target;if(t!=null)return t.indexOf(window)<0?t.concat(window):t;if(r===window)return[window];function n(a,s){s=s||[];const c=a.parentNode;return c?n(c,s.concat(c)):s}return[r].concat(n(r),window)}/*! iNoBounce - v0.2.0
* https://github.com/lazd/iNoBounce/
* Copyright (c) 2013 Larry Davis <lazdnet@gmail.com>; Licensed BSD */var ie=0,oe=!1,se=!1;try{var Al=Object.defineProperty({},"passive",{get:function(){se=!0}});window.addEventListener("test",null,Al)}catch{}var Je=function(e){var t=e.target,r=window.innerWidth/window.document.documentElement.clientWidth;if(!(e.touches.length>1||r!==1)){for(;t!==document.body&&t!==document;){var n=window.getComputedStyle(t);if(!n)break;if(t.nodeName==="INPUT"&&t.getAttribute("type")==="range")return;var a=n.getPropertyValue("-webkit-overflow-scrolling"),s=n.getPropertyValue("overflow-y"),c=parseInt(n.getPropertyValue("height"),10),o=a==="touch"&&(s==="auto"||s==="scroll"),u=t.scrollHeight>t.offsetHeight;if(o&&u){var p=e.touches?e.touches[0].screenY:e.screenY,g=ie<=p&&t.scrollTop===0,_=ie>=p&&t.scrollHeight-t.scrollTop===c;(g||_)&&e.preventDefault();return}t=t.parentNode}e.preventDefault()}},Qe=function(e){ie=e.touches?e.touches[0].screenY:e.screenY},Ze=function(){window.addEventListener("touchstart",Qe,se?{passive:!1}:!1),window.addEventListener("touchmove",Je,se?{passive:!1}:!1),oe=!0},Sl=function(){window.removeEventListener("touchstart",Qe,!1),window.removeEventListener("touchmove",Je,!1),oe=!1},El=function(){return oe},W=document.createElement("div");document.documentElement.appendChild(W),W.style.WebkitOverflowScrolling="touch";var jl="getComputedStyle"in window&&window.getComputedStyle(W)["-webkit-overflow-scrolling"]==="touch";document.documentElement.removeChild(W),jl&&Ze();var L={enable:Ze,disable:Sl,isEnabled:El},Yl="",xl=(e,t)=>{const r=e.__vccOpts||e;for(const[n,a]of t)r[n]=a;return r};const Il=["data-num"],Ll=["src"],Fl={key:0,class:"page-box"},kl={key:1,class:"page-box"},Ml=["onClick","onMouseover"],Bl={name:"MvFullPage"},Nl=i.defineComponent(nt(at({},Bl),{props:{pages:{type:Number,default:1},page:{type:Number,default:1},config:{type:Object}},emits:["pointerMouseover","update:page","rollEnd"],setup(e,{expose:t,emit:r}){const n=e,a=i.reactive({pagesArr:[],isPc:!1,fullHeight:0,fullWidth:0,maxY:0,maxX:0,startY:0,endY:0,startX:0,endX:0,currentPage:1,isRock:!1,isUp:!1,subScrollEl:null,wheelEventName:null,isInitTranslate:!1,playInterval:null,isForward:!0,isInitPage:!1,autoPlayFinished:!1}),s=i.ref(),c=i.ref(),o=i.computed(()=>Tl({position:"fixed",width:"100%",height:"100%",direction:"h",poi:{pointer:!0,position:"right"},cache:!0,bgArr:[],bgConfig:{fit:"cover"},transition:{duration:"1000ms",timingFun:"ease",delay:"0s"},loop:!1,arrow:{last:!1,next:!1},autoPlay:{play:!1,interval:1e3}},n.config)),u=l=>{!k()||(l=="last"&&$(!1),l=="next"&&$(!0))},p=(l,f)=>{r("pointerMouseover",{event:l,index:f})},g=()=>{setTimeout(()=>{$(!0)},o.value.autoPlay.interval)},_=(l=0,f=!1)=>{f&&D(!0),s.value;let d=`translate${o.value.direction=="v"?"Y":"X"}(${l}px)`;s.value.style.transform=d,f&&setTimeout(()=>{D(!1)},500)},T=nr(()=>{A()},500),O=l=>{!k()||(m(l,!0),r("update:page",l))},A=()=>{a.fullHeight=c.value.clientHeight,a.fullWidth=c.value.clientWidth,a.maxY=n.pages*a.fullHeight,a.maxX=n.pages*a.fullWidth},le=()=>{s.value.style.height=s.value.querySelectorAll(".page").length*a.fullHeight+"px",s.value.style.width=s.value.querySelectorAll(".page").length*a.fullWidth+"px"},X=()=>{a.isPc?(a.wheelEventName=Cl()?"DOMMouseScroll":"mousewheel",Ol(s.value,a.wheelEventName,K)):(s.value.addEventListener("touchstart",q,!1),s.value.addEventListener("touchmove",M,!1),s.value.addEventListener("touchend",h,!1))},F=()=>{a.isPc?Pl(s.value,a.wheelEventName,K):(L.disable(),s.value.removeEventListener("touchstart",q),s.value.removeEventListener("touchmove",M),s.value.removeEventListener("touchend",h))},k=()=>!(a.isRock||o.value.autoPlay.play&&!a.autoPlayFinished&&!a.isInitPage),K=l=>{let f=qe(l);Array.from(f).some(y=>!!(y.dataset&&y.dataset.scroll=="true"))||(l.deltaY>0||l.detail>0||l.wheelDelta<0?$(!0):$(!1))},q=l=>{console.log(l),qe(l).forEach(d=>{d.dataset&&d.dataset.scroll=="true"&&(a.subScrollEl=d)}),a.subScrollEl?L.disable():L.enable(),a.startY=l.changedTouches[0].pageY,a.startX=l.changedTouches[0].pageX},M=l=>{a.subScrollEl&&a.subScrollEl.scrollTop==0&&l.changedTouches[0].pageY-a.startY>0&&L.enable()},h=l=>{if(!a.isRock){if(a.subScrollEl){a.subScrollEl=null,L.enable();return}o.value.direction=="v"?l.changedTouches[0].pageY-a.startY<-50?(a.startY=0,$(!0)):l.changedTouches[0].pageY-a.startY>50&&(a.startY=0,$(!1)):l.changedTouches[0].pageX-a.startX<-50?(a.startX=0,$(!0)):l.changedTouches[0].pageX-a.startX>50&&(a.startX=0,$(!1))}},m=(l,f,d)=>{if(s.value&&a.fullHeight>0&&a.fullWidth>0){let y=-(l*(o.value.direction=="v"?a.fullHeight:a.fullWidth));f&&(s.value.style.transitionProperty="none");let ce=`translate${o.value.direction=="v"?"Y":"X"}(${y}px)`;if(s.value.style.transform=ce,f)setTimeout(()=>{s.value.style.transitionProperty="transform"},1);else{a.isRock=!0;const et=()=>{a.isRock=!1,r("rollEnd",n.page),s.value.removeEventListener("transitionend",et),d&&d>0&&m(d,!0),o.value.autoPlay.play&&(o.value.loop||n.page<n.pages&&!a.autoPlayFinished?g():a.autoPlayFinished=!0)};s.value.addEventListener("transitionend",et)}}},$=(l=!0,f=!1)=>{if(!!k()&&s.value){let d,y;if(l?(d=n.page+1,y=n.page==n.pages&&1):(d=n.page-1,y=n.page==1&&n.pages),y){m(d,f,y),r("update:page",y);return}m(d,f),r("update:page",d)}},D=(l=!0)=>{const f=s.value;l?f.classList.add("transition-clear"):f.classList.remove("transition-clear")},Dl=()=>{const l=s.value;if(l.firstChild&&l.lastChild){const f=l.querySelector(".page[data-num = '1']"),d=l.querySelector(`.page[data-num = '${n.pages}']`),y=f.cloneNode(!0),ce=d.cloneNode(!0);l.append(y),l.prepend(ce)}},Hl=()=>{a.isPc=!wl(),a.isPc?console.log("\u5F53\u524Dmv-full-page\u8FD0\u884C\u73AF\u5883\u4E3A: PC\u7AEF"):(console.log("\u5F53\u524Dmv-full-page\u8FD0\u884C\u73AF\u5883\u4E3A: \u79FB\u52A8\u7AEF"),L.enable()),A(),X(),window.addEventListener("resize",T),setTimeout(()=>{o.value.autoPlay.play&&g()},o.value.autoPlay.interval+1e3)},Rl=(l,f)=>{m(l,f)};return i.watch(()=>n.page,l=>{i.nextTick(()=>{if(!a.isInitPage){const f=-(l*a.fullHeight);_(f,!0),a.isInitPage=!0;return}})},{immediate:!0}),i.watch(()=>n.pages,l=>{if(!(!n.pages||n.pages<=0)){a.pagesArr.length=0;for(let f=0;f<n.pages;f++)a.pagesArr.push({page:f+1,isShow:f==0});a.pagesArr[0].isShow=!0,n.page>1&&a.isInitPage&&(s.value&&s.value.classList.add("transition-clear"),a.isInitTranslate=!0),a.isInitPage?r("update:page",1):r("update:page",n.page),i.nextTick(()=>{i.nextTick(()=>{Dl(),le()})})}},{immediate:!0}),i.watch(()=>o.value.direction,l=>{const f=s.value;l=="h"&&o.value.loop?(_(-a.fullWidth,!0),f.querySelectorAll(".page").forEach(d=>{d.classList.add("floatLeft")})):(_(-a.fullHeight,!0),f.querySelectorAll(".page").forEach(d=>{d.classList.remove("floatLeft")}))}),i.watch(()=>o.value.autoPlay.play,l=>{l&&i.nextTick(()=>{g()})},{immediate:!1}),t({goPage:Rl}),i.onMounted(()=>{Hl()}),i.onBeforeUnmount(()=>{F(),window.removeEventListener("resize",T),console.log("\u9500\u6BC1\u9875\u9762\u4E8B\u4EF6\u6210\u529F")}),(l,f)=>(i.openBlock(),i.createElementBlock("div",{class:"mv-page-container",style:i.normalizeStyle({position:i.unref(o).position,width:"100%",height:"100%"}),ref_key:"outContainerRef",ref:c},[i.createElementVNode("div",{class:"mv-all-page",ref_key:"allPageRef",ref:s,style:i.normalizeStyle({"transition-duration":i.unref(o).transition.duration,"transition-timing-function":i.unref(o).transition.timingFun,"transition-delay":i.unref(o).transition.delay})},[(i.openBlock(!0),i.createElementBlock(i.Fragment,null,i.renderList(i.unref(a).pagesArr,(d,y)=>(i.openBlock(),i.createElementBlock("div",{key:y,class:i.normalizeClass(["page",{floatLeft:i.unref(o).direction!="v"}]),style:i.normalizeStyle({height:i.unref(a).fullHeight+"px",width:i.unref(a).fullWidth+"px","background-color":i.unref(o).bgArr[y]&&i.unref(o).bgArr[y].color}),ref_for:!0,ref:`page${d.page}`,"data-num":y+1},[i.createElementVNode("img",{class:"page-bg-img",src:i.unref(o).bgArr[y].image&&`${i.unref(o).bgArr[y].image}`,style:i.normalizeStyle({"object-fit":i.unref(o).bgConfig.fit})},null,12,Ll),i.unref(o).cache?(i.openBlock(),i.createElementBlock("div",Fl,[i.renderSlot(l.$slots,`page${d.page}`,{data:d},void 0,!0)])):i.withDirectives((i.openBlock(),i.createElementBlock("div",kl,[i.renderSlot(l.$slots,`page${d.page}`,{data:d},void 0,!0)],512)),[[i.vShow,e.page==d.page]])],14,Il))),128))],4),i.unref(o).poi.pointer?(i.openBlock(),i.createElementBlock("div",{key:0,class:i.normalizeClass(["mv-pointer-wrapper",[i.unref(o).poi.position,i.unref(o).poi.className]])},[i.createElementVNode("ul",{class:i.normalizeClass(i.unref(a).isPc&&"hover")},[(i.openBlock(!0),i.createElementBlock(i.Fragment,null,i.renderList(e.pages,d=>(i.openBlock(),i.createElementBlock("li",{class:i.normalizeClass({active:e.page==d}),onClick:i.withModifiers(y=>O(d),["stop"]),key:d,onMouseover:y=>p(y,d)},null,42,Ml))),128))],2)],2)):i.createCommentVNode("v-if",!0),i.unref(o).arrow.last?(i.openBlock(),i.createElementBlock("div",{key:1,class:"last-arrow iconfont icon-jiantoushang",onClick:f[0]||(f[0]=d=>u("last"))})):i.createCommentVNode("v-if",!0),i.unref(o).arrow.next?(i.openBlock(),i.createElementBlock("div",{key:2,class:"next-arrow iconfont icon-jiantouxia",onClick:f[1]||(f[1]=d=>u("next"))})):i.createCommentVNode("v-if",!0)],4))}}));var Y=xl(Nl,[["__scopeId","data-v-5e88b1b5"]]);return Y.install=(e,t)=>{e.component(Y.name,Y)},Y});
