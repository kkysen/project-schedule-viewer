var e,t;(e=>{function t(t){for(var a,o,l=t[0],i=t[1],c=t[2],p=0,d=[];p<l.length;p++)o=l[p],n[o]&&d.push(n[o][0]),n[o]=0;for(a in i)({}).hasOwnProperty.call(i,a)&&(e[a]=i[a]);for(u&&u(t);d.length;)d.shift()();return s.push.apply(s,c||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],a=!0,l=1;l<r.length;l++){var i=r[l];0!==n[i]&&(a=!1)}a&&(s.splice(t--,1),e=o(o.s=r[0]))}return e}var a={},n={1:0},s=[];function o(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=a,o.d=((e,t,r)=>{o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})}),o.r=(e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}),o.t=((e,t)=>{if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(r,a,(t=>e[t]).bind(null,a));return r}),o.n=(e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,"a",t),t}),o.o=((e,t)=>({}).hasOwnProperty.call(e,t)),o.p="";var l=window.webpackJsonp=window.webpackJsonp||[],i=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=i;s.push([279,0]),r()})({115(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fnv1a=(e=>{let t=2166136261;for(let r=0;r<e.length;r++)t^=e.charCodeAt(r),t+=(t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24);return 0|t})},116(e,t){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),(r=t.regex||(t.regex={})).toSource=(e=>{const{source:t,flags:r}=e;return`/${t}/${r}`}),r.join=((...e)=>{const t=e.map(e=>e.source).join(""),r=e.map(e=>e.flags).join("").split(""),a=r&&[...new Set(r)].join("");return new RegExp(t,a)}),r.matchAll=((e,t)=>{if(!e.global)throw new Error("trying to matchAll with non global regex");const r=[];let a;for(;a=e.exec(t);)r.push(a);return r})},117(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.truthy=(e=>!!e)},12(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.capitalize=(e=>0===e.length?"":e[0].toUpperCase()+e.slice(1)),t.joinWords=(e=>{const t=[...e];switch(t.length){case 0:return"";case 1:return t[0];case 2:return t[0]+" and "+t[1];default:const e=t.pop();return t.join(", ")+", and "+e}}),t.camelCase=(()=>{const e=/-+([a-z])/gi;return t=>(e.lastIndex=0,t.replace(e,(e,t,r)=>0===r?t:t.toUpperCase()))})(),t.separateClassName=(e=>e.replace(/([A-Z])/g," $1").trim()),t.separateFunctionName=(e=>{const[r,...a]=t.separateClassName(e).split(" ");return[t.capitalize(r),...a].join(" ")}),t.joinNodes=((e,t)=>{if(2>e.length)return e;const r=[];for(let a=0;a<e.length;a++)r.push(e[a]),r.push(t&&t._clone());return r.pop(),r}),t.singletonAsArray=(e=>Array.isArray(e)?e:[e]),t.filterInput=((e,t)=>{e.value=e.value.split("").filter(t).join("")}),t.isDigit=(e=>!Number.isNaN(parseInt(e))),t.onlyDigitsInput=(e=>{t.filterInput(e,t.isDigit)}),t.sleep=(e=>new Promise(t=>setTimeout(t,1e3*e)));const r=/\/([^\/]+)\/([gimuy]*)/;t.isRegExpLiteral=(e=>r.test(e)),t.parseRegExpLiteral=(e=>{const t=r.exec(e);if(t){const[,e,r]=t;return new RegExp(e,r)}}),t.escapeRegExp=((e,t)=>new RegExp(e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),t)),t.NotImplementedError=class extends Error{},t.lowerBound=((e,t)=>Math.max(e,t)),t.upperBound=((e,t)=>Math.min(e,t)),t.bound=((e,r,a)=>t.lowerBound(e,t.upperBound(r,a))),t.boundSurrounding=((e,r,a,n)=>[t.lowerBound(e,a-n),t.upperBound(r,a+n)]),t.snippet=((e,r,a)=>{const[n,s]=t.boundSurrounding(0,e.length,r,a);return e.slice(n,s)}),t.boolAsInt=(e=>e?1:0),t.moduloIndexer=(e=>t=>e[t%e.length])},122(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(28),n=r(54),s=r(43),o=r(126),l={positions:s.positions,employees:n.employees,leaders:n.leaders,teams:o.teams};t.data=a.DataAccessor.data(l),t.getAppData=(e=>(t.data.refresh(),t.data.get(e)))},123(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(124),n=r(32),s=r(125);t.DataAccessorFactory={for:()=>({new:({source:e,parse:t,preParsed:r=(()=>[]),create:o,by:l},i)=>n.cache(async n=>{const c=await s.objectFields.awaitFunctions(i,n),u=await e(n)(c),p=u.map(t),d=[...p.filter((e,t)=>o(e,t,c)),...r(c)].mapFilter((e,t)=>o(e,t,c));return{...a.All.of(d,l),parsed:p,raw:u}}),mapped:(e,t,r)=>n.cache(async n=>a.All.of(e(await s.objectFields.awaitFunctions(r,n)),t)),data:e=>n.refreshableCache(t=>{const r=s.objectFields.callEachArgs(e,t);return s.objectFields.awaitAll(r)})})}},124(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.All={of(e,t){const r=Object.keys(t).map(t=>[t,(t=>{const r=(t=>new Map(e.map(e=>[e[t],e])))(t);return e=>r.get(e)})(t)]).toObject();return{all:e,by:Object.assign(r,{index:t=>e[t]})}}}},125(e,r,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});const n=a(15);(t=r.objectFields||(r.objectFields={})).map=((e,t)=>e.mapFields(t)),t.callEach=(e=>t.map(e,e=>e())),t.callEachArgs=((e,r)=>t.map(e,e=>e(r))),t.awaitAll=(e=>Object.values(e).some(n.isPromise)?(async()=>(await Object.entries(e).asyncMap(async([e,t])=>[e,await t])).toObject())():e),t.awaitGetters=(e=>t.awaitAll(t.callEach(e))),t.awaitFunctions=((e,r)=>t.awaitAll(t.callEachArgs(e,r)))},126(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(28),n=r(54),s=r(86),o=r(43);t.teams=a.DataAccessor.new({source:e=>e.teams,parse:e=>({projects:e.map(([e,t,r,a])=>({id:e,name:t,employees:r.map(([e,t])=>({employee:e,months:t.map((e,t)=>({month:t,percentCommitted:e}))})),percentLikelihood:a})).sortBy(e=>e.id)}),create:(e,t,{leaders:r,employees:a})=>((e,t,{projects:r})=>{const a={id:t.leaderId,leader:t,projects:r.map(((e,t,r)=>{const a=e.by.index;return({id:e,name:n,percentLikelihood:o,employees:l})=>{const i=l.map(({employee:e,months:t})=>({employee:{employee:a(e),project:()=>c},months:t.map(({month:e,percentCommitted:t})=>({month:s.Months[e],percentCommitted:t}))})).filter(e=>!!e.employee),c={id:e,team:r,leader:t,name:n,employees:i.map(e=>e.employee),months:s.Months.map((e,t)=>({month:e,employees:i.map(({employee:e,months:r})=>({employee:e,percentCommitted:r[t].percentCommitted}))})),percentLikelihood:o};return c}})(e,t,()=>a))};return t.team=(()=>a),a})(a,r.all[t],e),by:{}},{leaders:n.leaders,employees:n.employees,positions:o.positions})},127(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(1),n=r(18),s=r(128),o=r(165);t.appId="app",t.App=(({data:e})=>(n.globals({data:e}),a.createElement("div",{id:t.appId,style:{margin:25}},a.createElement(s.Graph,{data:e}),a.createElement(o.ProjectTables,{data:e}),a.createElement("button",{onClick:()=>console.log(e)},"Button"))))},128(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(113),n=r(1),s=r(1),o=(r(44),r(131)),l=r(33),i=r(12),c=r(133),u=r(140),p=r(50),d={employee:{get:e=>e.employee,all:e=>e.employees.all,name:e=>e.name},project:{get:e=>e.project(),all:e=>e.teams.all.flatMap(e=>e.projects._()),name:e=>e.name},team:{get:e=>e.project().team(),all:e=>e.teams.all,name:e=>e.leader.name},position:{get:e=>e.employee.position,all:e=>e.positions.all,name:e=>e.name}};t.Graph=class extends s.Component{constructor(){super(...arguments),this.baseColor=i.moduloIndexer(a.schemeSet3),this.state={color:this.baseColor,order:p.indexOrder,orderIndex:-1,filter:p.noFilter,filterIndex:-1},this.set={order:(e,t)=>this.setState({order:e,orderIndex:t}),filter:(e,t)=>this.setState({filter:e,filterIndex:t})}}render(){const{props:e,state:t}=this,{data:r}=e,{color:a,order:s,filter:i}=t;l.Range.closed(1,3).has(t.orderIndex)&&o.doubleEvent()(()=>{},()=>{});const p={data:r,filter:i,order:s,color:a},m=(this.graph||(this.graph=c.CachedGraph(p)))(p);return n.createElement(n.Fragment,null,n.createElement(u.GraphControls,{accessors:d,data:r,set:this.set,current:t}),m)}}},129(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(45),n=r(46),s=r(22);t.ArrayStack={new({elements:e=[],hashEquals:r=s.HashEquals.default()}){const{equals:o}=r,l=a.bind([...e]),{size:i,push:c,pop:u,last:p,clear:d,remove:m}=l;return n.Collection.basedOn({size:i,add:e=>(c(e),!0),remove:n.checkSizeChanged(i,e=>m(e,o)),clear:d,[Symbol.iterator]:()=>l[Symbol.iterator](),push:c,peek:p,pop:u},r,t.ArrayStack.new)}}},130(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(45),n=r(65),s=r(66),o=r(46),l=r(22),i=r(44);t.HashSet={new({elements:e=[],hashEquals:r=l.HashEquals.default()}){if(l.HashEquals.isReferential(r))return t.HashSet.referential({elements:e});const{value:a,done:s}=e[Symbol.iterator]().next();if(!s&&!["object","function"].includes(typeof a))return t.HashSet.referential({elements:e});const{size:c,clear:u,hasKey:p,put:d,removeKey:m,keys:h,replaceAll:y}=i.HashMap.new({elements:n.iterables.map(e,e=>({key:e,value:null})),keysHashEquals:r,valuesHashEquals:{hash:()=>0,equals:()=>!0}});return o.Collection.basedOn({size:c,add:e=>null!==d(e,null),remove:e=>null===m(e),clear:u,[Symbol.iterator]:()=>h()[Symbol.iterator](),has:p,replaceAll:e=>y(({key:t,value:r})=>({key:e(t),value:r}))},r,t.HashSet.new)},referential(e){const{elements:r=[]}=e,n=l.HashEquals.referential(),i=a.bind(new s.NativeSet(r)),{add:c,has:u,delete:p,clear:d,[Symbol.iterator]:m,forEach:h}=i,y=()=>i.size;return o.Collection.basedOn({size:y,add:o.checkSizeChanged(y,c),remove:p,clear:d,[Symbol.iterator]:()=>m(),has:u,forEach(e){let t=0;h(r=>e(r,t++))}},n,t.HashSet.referential)}}},131(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(132);t.multiEvent=((e=500)=>(t,...r)=>{const n=a.globalWindow.setTimeout,s=a.globalWindow.clearTimeout,o=r.length;let l=[],i=0,c=0;if(t){const r=()=>{t(l),l=[],i=performance.now()};return t=>{c&&s(c),l.push(t);const a=performance.now();1===l.length&&(i=a);const o=a-i;i=a,o>e?r():c=n(r,e-o)}}switch(r.length){case 0:return()=>{};case 1:const t=r[0];return e=>t([e]);default:let a=l.length;const u=()=>{r[a-1](l),l=[]};return t=>{c&&s(c),l.push(t),a=l.length;const r=performance.now();1===a&&(i=r);const p=r-i;i=r,p>e||a===o?u():c=n(u,e-p)}}}),t.doubleEvent=((e=500)=>{const r=t.multiEvent(e);return(e,t)=>r(null,e,t)}),t.tripleEvent=((e=500)=>{const r=t.multiEvent(e);return(e,t,a)=>r(null,e,t,a)})},132(e,t,r){"use strict";(e=>{Object.defineProperty(t,"__esModule",{value:!0});const a=r(18);t.globalWindow=a.isBrowser?window:e}).call(this,r(9))},133(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(114),n=r(63),s=r(44),o=r(134);t.CachedGraph=(({data:e,filter:t,order:r,color:l})=>{const i=()=>o.VariableAreaStack({data:((e,t)=>{const r=e=>+e,a=s.HashMap.perfectHash({keysHashEquals:{hash:r,equals:(e,t)=>r(e)===r(t)}});return e.teams.all.flatMap(e=>e.projects._()).flatMap(e=>e.months._()).forEach(({month:e,employees:r})=>a.getOrPutDefault(e.date,[]).addAll(r.filter(e=>t(e.employee)))),a})(e,t),values:{x:e=>e,y:e=>e.percentCommitted*e.employee.project().percentLikelihood,z:e=>e.employee},flat:!0});let c=i();const u=()=>c({orderBy:r,scale:{x:a.scaleTime()},axes:{x:(e,t)=>e.tickFormat(n.timeFormat("%B")).ticks(t.length)},axesNames:{x:"Month",y:"Number of Employees"},size:{width:1e3,height:400},margins:{left:50,top:50,right:50,bottom:50}});let p=u();const d=()=>p({color:(e,t)=>l(r(e,t))});let m=d();return a=>{const n=a.data===e&&a.filter===t;n||(e=a.data,t=a.filter,c=i());const s=a.order===r;n&&s||(r=a.order,p=u());const o=a.color===l;return n&&s&&o||(l=a.color,m=d()),m}})},134(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(34),n=r(8),s=r(278),o=r(114),l=r(113),i=r(276),c=r(1),u=r(42),p=r(55),d=r(33),m=r(15),h=r(12),y=r(67),f=r(135);t.VariableAreaStack=(e=>{const{data:t,values:r,flat:b=!1}=e,v=(()=>{const e=(()=>{const e=[...t];return 0===e.length?[]:m.isArray(e[0])?e.map(([e,t])=>({key:e,value:t})):e})();switch(e.length){case 0:return;case 1:return e;default:return(e=>b?e.flatMap((e,t,r)=>0===t?e:[{key:e.key,value:r[t-1].value},e]):e)(e)}})();if(!v)return()=>()=>null;const g=v.map(e=>e.key),E=g.map(r.x),j=v.map(e=>e.value),O=Math.max(...j.map(e=>e.length)),w=d.Range.new(O),x=w.toArray(),P=w.map(e=>j._().mapFilter(t=>t[e])).mapFilter(e=>{if(0!==e.length){if(p.development&&new Set(e.map(r.z)).size>1)throw new Error("each zDatum contains non-unique keys");return{key:r.z(e[0]),value:e.map(r.y)}}}),_=n.extent(E),A=(e,t)=>t>e.length?0:r.y(e[t]);return e=>{const{orderBy:t,offset:r=i.stackOffsetNone,scale:{x:p=o.scaleLinear(),y:d=o.scaleLinear()}={},axes:{x:b=u.identity,y:v=u.identity}={},axesNames:O={},size:w,margins:M={},className:k,curve:N,defined:S,glyph:F,reverse:C=!1}=e,{width:I,height:q}=w,{left:H=0,top:D=0,bottom:z=0,right:B=0}=M,T={left:H,top:D,bottom:z,right:B},R=I+H+B,L=q+D+z,$=p.range([0,I]).domain(_),G=d.range([q,0]),W=i.area().x((e,t)=>$(E[t])).y0(e=>G(e[0])).y1(e=>G(e[1]));N&&W.curve(N),S&&W.defined((e,t)=>S(e.data,t));const V=i.stack().keys(x).value(A).order(t?e=>e.map((e,t)=>({i:t,value:P[t].key})).sortBy(e=>t(e.value,e.i)).map(e=>e.i):i.stackOrderNone).offset(r)(j._());G.domain(n.extent(V.flatten(2))),C&&V.reverse();const J=V.mapFilter(W),K=a("vx-area-stack",k),U=!!F&&c.createElement("g",{className:"vx-area-stack-glyphs"},g.map(F)),Z=c.createElement("g",null,f.Axes({axes:{x:b(s.axisBottom($),g),y:v(s.axisLeft(G),j)},names:O,size:w,margins:T}));return e=>{const{color:t=l.schemeCategory10}=e,r=m.isReadonlyArray(t)?(e=>{const t=h.moduloIndexer(e);return(e,r)=>t(r)})(t):t;return c.createElement("svg",{width:R,height:L},c.createElement("g",{transform:y.translate(H,D)},c.createElement("g",null,J.map((e,t)=>c.createElement("path",{key:t,className:K,d:e,fill:r(P[t].key,t)}))),U,Z))}}})},135(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(277),n=r(1),s=r(1),o=r(136),l=r(139),i=r(67),c=e=>{const{axes:t,names:r,size:{width:s,height:c},margins:{left:u,top:p,right:d,bottom:m}}=e,[h,y]=Object.values(t).map(e=>{const{element:t,render:r}=o.FauxComponent.new("g");return e(a.select(t)),r()});return l.renderNodesObj({axes:n.createElement(n.Fragment,null,n.createElement("g",{transform:i.translate(0,c)},h),y),names:n.createElement(n.Fragment,null,r.x&&n.createElement("text",{transform:i.translate(s/2,c+p),style:{textAnchor:"middle"}},r.x),r.y&&n.createElement("text",{transform:i.rotate(-90),y:-u,x:-c/2,dy:"1em",style:{textAnchor:"middle"}},r.y))})};t.Axes=(e=>s.createElement(c,e))},136(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(137);t.FauxComponent={new(e){const t=a.FauxElement.new(e);return{element:t,render:t.render}}}},137(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(1),n=r(32),s=r(138),o=r(55),l=r(12),i=r(186);t.FauxElement=(()=>{const e=[/^data-/,/^aria-/],t=new Map([["class","className"]]),r=r=>e.some(e=>e.test(r))?r:t.get(r)||l.camelCase(r),n=(new Map([]),e=>{const t=e;return t.item=(t=>e[t]),t}),u=e=>n(e),p=e=>e;return{new(e,t="http://www.w3.org/1999/xhtml"){const l=c,d=e;let m,h;const y=e=>{h=m=e};let f="";const b=u([]),v={},g=e=>(e.parentElement=w,b.push(p(e)),e),E=e=>void 0===e.nodeType||1===e.nodeType,j=()=>(e=>{const t=n(e);return o.development?s.DebugProxy.for(t,{},"FauxElement.HTMLCollection"):t})(b.filter(E)),O=e=>i(e,w),w={ownerDocument:l,namespaceURI:t,nodeName:d,nodeType:1,get parentNode(){return m},get parentElement(){return h},set parentNode(e){y(e)},set parentElement(e){y(e)},get textContent(){return f},set textContent(e){f=e},childNodes:b,get children(){return j()},getAttribute:e=>v[r(e)]||null,setAttribute(e,t){v[r(e)]=t},removeAttribute(e){delete v[r(e)]},appendChild:g,removeChild(e){if(!b.remove(p(e)))throw new Error("Not Found Error");return e},insertBefore(e,t){if(!t)return g(e);const r=b.indexOf(p(t));return-1===r?g(p(e)):(b.add(r,p(e)),e)},querySelectorAll:O,querySelector:e=>O(e)[0]||null,getElementsByTagName(e){const t=j();if(0===t.length)return u([]);const r=("*"===e?t:t.filter(t=>t.nodeName===e)).flatMap(t=>[...t.getElementsByTagName(e)]);return u(r)},render(e=0){const t=j().map((e,t)=>(e=>!!e.render)(e)?e.render(t):e);f&&t.push(f);const r=v;return r.key=e,a.createElement(d,r,1===t.length?f:t)}};return o.development?s.DebugProxy.for(w,{},"FauxElement"):w}}})();const c=(()=>{const e=n.cache(()=>t.FauxElement.new("html")),r={createElement:e=>t.FauxElement.new(e),createElementNS:t.FauxElement.new,get documentElement(){return e()}};return o.development?s.DebugProxy.for(r,{},"FauxDocument"):r})()},138(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(15);t.DebugProxy={for(e,t={},r="Target"){const n={get(e,t,n){if(!(e.hasProperty(t)||a.isString(t)&&t.startsWith("__")))throw new TypeError(`${t.toString()} is not yet implemented on ${r} ${e}`);return Reflect.get(e,t,n)}};for(const[e,r]of Object.entries(t))!1===r&&(n[e]=void 0);return new Proxy(e,n)}}},139(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(1),n=r(1);t.renderNodes=(e=>e.map((e,t)=>a.createElement(n.Fragment,{key:t},e))),t.renderNodesObj=(e=>t.renderNodes(Object.values(e)))},140(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(1),n=r(141),s=r(15),o=r(143),l=r(50),i=(()=>{const e=e=>{if(s.isBoolean(e))return()=>e;const t=new Set(e);return e=>t.has(e)};return{new:({get:t,all:r,name:a})=>({get:t,order:e=>t(e).id,filter(r,a){const n=e(r),s=e(a);return e=>{const r=t(e);return n(r)&&!s(r)}},all:r,name:a})}})();t.GraphControls=(({data:e,accessors:t,set:r,current:s})=>{const c=Object.entries(t).map(([e,t])=>({key:e,value:i.new(t)}));return a.createElement("div",{style:{textAlign:"center"}},a.createElement(l.OrderControls,{orders:c,setOrder:r.order,currentIndex:s.orderIndex}),a.createElement(n.Br,{times:1}),a.createElement(o.FilterControls,{filters:c,data:e,setFilter:r.filter,currentIndex:s.filterIndex}))})},141(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(1),n=r(142);t.Br=(({times:e=1})=>a.createElement(n.Repeat,{times:e,render:()=>a.createElement("br",null)}))},142(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(1),n=r(1),s=r(33);t.Repeat=(({times:e,render:t})=>{const r=t();return a.createElement(a.Fragment,null,s.Range.new(e).map(e=>a.createElement(n.Fragment,{key:e},r)))})},143(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(1),n=r(87),s=r(91),o=r(12),l=r(50);t.FilterControls=(({filters:e,data:t,setFilter:r,currentIndex:i})=>{const c=(e,t,n)=>a.createElement(s,{key:t,onSelect:()=>r(e,t),active:t===i},n);return a.createElement(a.Fragment,null,e.map(({key:e,value:{filter:r,all:s,name:i}},u)=>a.createElement(n,{key:u,title:o.capitalize(e),id:u.toString()},c(l.noFilter,-1,"All"),s(t).map((e,t)=>c(r([e],!1),t,i(e))))))})},15(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(12);t.isNativeType=(e=>{const t=`[object ${a.capitalize(e)}]`,r={}.toString;return e=>r.call(e)===t}),t.isNull=(e=>null===e),t.isUndefined=(e=>void 0===e),t.isBoolean=(e=>!0===e||!1===e),t.isNumber=t.isNativeType("number"),t.isString=t.isNativeType("string"),t.isFunction=t.isNativeType("Function"),t.isArray=Array.isArray,t.isReadonlyArray=Array.isArray,t.isRegExp=t.isNativeType("RegExp"),t.isDate=t.isNativeType("Date"),t.isObject=t.isNativeType("object"),t.isByConstructor=(e=>t=>t.constructor===e),t.isDataView=t.isByConstructor(DataView),t.isArrayBuffer=t.isByConstructor(ArrayBuffer),t.isPromise=t.isByConstructor(Promise)},165(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(1),n=r(1),s=({project:e})=>{const t={border:"1px solid black"};return a.createElement(a.Fragment,null,a.createElement("br",null),"% Likelihood: ",e.percentLikelihood,a.createElement("br",null),a.createElement("table",{style:{...t,borderCollapse:"collapse"}},a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",{style:t},"Project: ",e.name),e.employees.map((e,r)=>a.createElement("th",{key:r,style:t},e.employee.name)))),a.createElement("tbody",null,e.months.map((e,r)=>a.createElement("tr",{key:r},a.createElement("td",{style:t},e.month.name),e.employees.map((e,r)=>a.createElement("td",{key:r,style:t},e.percentCommitted)))))),a.createElement("br",null))};t.ProjectTables=(({data:e})=>a.createElement("div",null,e.teams.all.map(e=>a.createElement(n.Fragment,{key:e.id},a.createElement("br",null),a.createElement("br",null),"Team ",e.leader.name,a.createElement("br",null),a.createElement("br",null),e.projects.map(e=>a.createElement(s,{project:e,key:e.id})),a.createElement("br",null),a.createElement("br",null)))))},18(e,t,r){"use strict";(e=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isBrowser="undefined"!=typeof window,t.anyWindow=t.isBrowser?window:e,t.globals=(e=>{Object.assign(t.anyWindow,e)}),t.globalProperties=(e=>{Object.assignProperties(t.anyWindow,e)}),t.globals({globals:t.globals,globalProperties:t.globalProperties})}).call(this,r(9))},22(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(32),n=r(42),s=r(115),o=r(116),l=r(15),i=(()=>{const e=/\(([^\s,]*)\s*,\s*([^\s)]*)\)/,t=o.regex.join(/\s*{\s*return/,/\s*\1\s*===\s*\2/,/\s*;\s*}/),r=o.regex.join(/function\s*/,e,t),a=o.regex.join(e,/\s*=>/,t),n=o.regex.join(e,/\s*=>/,/\s*\1\s*===\s*\2/);return e=>[n,a,r].some(t=>t.test(e))})();t.Equals={bind:(e,t)=>r=>e(t,r),default:a.getter((e,r)=>t.Equals.referential()(e,r)||t.Hash.default()(e)===t.Hash.default()(r)),referential:()=>Object.is,fastEquals(e){const r=t.Equals.referential();return e===r||i(e.toString())?r:(t,r)=>t===r||e(t,r)}},t.Hash={makeNumber:e=>l.isNumber(e)?e:s.fnv1a(l.isString(e)?e:t.Hash.default()(e)),default:()=>JSON.stringify,referential:()=>n.identity};const c={hash:t.Hash.referential(),equals:t.Equals.referential()},u={hash:t.Hash.referential(),equals:t.Equals.referential()};t.HashEquals={default:()=>c,referential:()=>u,isReferential:e=>e===u,fastEquals:({hash:e,equals:r})=>({hash:e,equals:t.Equals.fastEquals(r)})}},279(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(53),n=r(280);a.addExtensions(),(async()=>{await n.loadApp()})()},28(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(123);t.DataAccessor=a.DataAccessorFactory.for()},280(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(1),n=r(64),s=r(18),o=r(122),l=r(289),i=r(127),c=r(363);t.loadApp=(async()=>{const e=s.anyWindow.appData?await o.getAppData(l.jsonDataSource):await c.api.getAppData(),t=document.body.appendDiv(),r=document.getElementById(i.appId);r?(console.log("hydrating"),r.remove(),t.appendChild(r),n.hydrate(a.createElement(i.App,{data:e}),t)):(console.log("rendering"),n.render(a.createElement(i.App,{data:e}),t))})},289(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(18),n=r(32),s=JSON.parse(a.anyWindow.appData);t.jsonDataSource=s.mapFields(e=>n.getter(e))},32(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getter=(e=>()=>e),t.makeGetter=(()=>t.getter),t.cache=(e=>{let t;return(...r)=>void 0!==t?t:t=e(...r)}),t.refreshableCache=(e=>{let t;return{get:(...r)=>void 0!==t?t:t=e(...r),refresh:()=>t=void 0}})},33(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(18);t.Range={new(e,t){const r=void 0===t?0:e,a=void 0===t?e:t;return{toArray:()=>[...new Array(a-r)].map((e,t)=>t+r),map(e){return this.toArray().map(e)},filter(e){return this.toArray().filter(e)},forEach(e){for(let t=r;a>t;t++)e(t)},toInterval:()=>[r,a],has:e=>e>=r&&a>e}},open:(e,r)=>t.Range.new(e+1,r),closed:(e,r)=>t.Range.new(e,r+1),ofDomain(e){return this.new(Math.min(...e),Math.max(...e))}},a.globals({range:t.Range})},363(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),(t.api||(t.api={})).getAppData=(async()=>({}))},42(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.identity=(e=>e)},43(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(42),n=r(28);t.positions=n.DataAccessor.new({source:e=>e.positions,parse:([e,t,r])=>({id:e,level:e,name:t,rate:r}),create:a.identity,by:{level:0}},{})},44(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(45),n=r(65),s=r(66),o=r(12),l=r(129),i=r(46),c=r(22),u=r(130);t.HashMap={new({elements:e=[],hashEquals:r,keysHashEquals:p=c.HashEquals.default(),valuesHashEquals:d=c.HashEquals.default()}){const m=e=>e.exists,{hash:h,equals:y}=c.HashEquals.fastEquals(p),{hash:f,equals:b}=c.HashEquals.fastEquals(d);r={hash:({key:e,value:t})=>c.Hash.makeNumber(h(e))^c.Hash.makeNumber(f(t)),equals:(e,t)=>y(e.key,t.key)&&b(e.value,t.value)};const v=a.bind(new s.NativeMap),{clear:g,values:E}=v,j=e=>{const t=h(e);let r,a,n=v.get(t);if(!n)return{exists:!1,key:e,put:r=>void v.set(t,{key:e,value:r}),remove:()=>void 0};if(y(e,n.key)){const r=n;return r.key=e,{exists:!0,key:e,value:r.value,put(e){const t=r.value;return r.value=e,t},remove(){const e=r.value;return v.delete(t),e}}}for(;r=n.next;a=n,n=r){const s=n.key;if(!y(s,e))continue;const o=n;return o.key=e,{exists:!0,key:o.key,value:o.value,put(e){const t=o.value;return o.value=e,t},remove(){const e=o.value;return a?a.next=r:r?v.set(t,r):v.delete(t),e}}}const s=n;return{exists:!1,key:e,put:t=>void(s.next={key:e,value:t}),remove:()=>s.next=void 0}},O=()=>v.size,w=e=>j(e).remove(),x={size:O,clear:g,add({key:e,value:t}){const r=j(e);return r.put(t),!r.exists},remove({key:e,value:t}){const r=j(e);return!(!m(r)||!b(t,r.value)||(r.remove(),0))},*[Symbol.iterator](){for(let e of E())for(let t=e;t;t=t.next)yield t}},P=e=>j(e).exists,_=e=>t=>{for(const{key:r,value:a}of x)if(b(t,a))return e&&w(r),!0;return!1},A=_(!0),M=(e,t)=>(void 0!==t?e.put(t):e.remove(),t),k={...{},put:(e,t)=>j(e).put(t),removeKey:w,removeValue:A,hasKey:P,get:e=>j(e).value,getOrDefault(e,t){const r=j(e);return m(r)?r.value:t},getOrPutDefault(e,t){const r=j(e);return m(r)?r.value:(r.put(t),t)},putIfAbsent(e,t){const r=j(e);r.exists||r.put(t)},putAll(e){C(e)},replace(e,t){const r=j(e);return m(r)?r.put(t):void 0},replaceIfEquals(e,t,r){const a=j(e),n=m(a)&&b(t,a.value);return n&&a.put(r),n},computeIfAbsent(e,t){const r=j(e);return m(r)?r.value:M(r,t(e))},computeIfPresent(e,t){const r=j(e);if(m(r))return M(r,t(e,r.value))},compute(e,t){const r=j(e);return M(r,t(e,r.value))},merge(e,t,r){const a=j(e);return M(a,r(e,m(a)?a.value:t))},hasValue:_(!1),entries:()=>S,keys:()=>i.Collection.basedOn({size:O,clear:g,add(){throw new o.NotImplementedError},remove(e){const t=j(e);return t.remove(),t.exists},...n.iterables.map(S,e=>e.key),has:P},p,u.HashSet.new),values:()=>i.Collection.basedOn({size:O,clear:g,add(){throw new o.NotImplementedError},remove:A,...n.iterables.map(S,e=>e.value)},d,l.ArrayStack.new)},N={has({key:e,value:t}){const r=j(e);return m(r)&&b(t,r.value)},toString:()=>`{${F().map(({key:e,value:t})=>`${e} = ${t}`).join("\n")}`},S=i.Collection.basedOn({...x,...k,...N},r,t.HashMap.new),{toArray:F,addAll:C}=S;return C(e),S},referential:e=>(e.keysHashEquals=c.HashEquals.referential(),t.HashMap.new(e)),perfectHash:e=>t.HashMap.new(e)}},45(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(18);r(53).addExtensions(),t.bind=(e=>{if("object"!=typeof e)throw new Error(`cannot bind non-object: ${e}`);const t=e,r=Object.getAllPropertyNames(e).map(e=>({key:e,value:t[e]})).filter(({value:e})=>(e=>e.bind&&!e.bound)(e)).map(({key:e,value:r})=>[e,(e=>((e=e.bind(t)).bound=!0,e))(r)]).toObject(!0);return Object.defineImmutableProperties(e,r),e}),a.globals({bind:t.bind}),t.bindClass=function(e){return class extends e{constructor(...e){super(...e),t.bind(this)}}}},46(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(22);t.checkSizeChanged=((e,t)=>r=>{const a=e();return t(r),a!==e()}),t.Collection={basedOn(e,r,n){const{size:s,add:o,remove:l,clear:i}=e,{hash:c,equals:u}=a.HashEquals.fastEquals(r),p=e=>t=>[...e].some(a.Equals.bind(u,t)),d=e=>t=>e([...t]),m=e=>d(t=>t.forEach(e)),h=e=>t.checkSizeChanged(s,e),y=()=>n,f=e=>e?(()=>async({hashEquals:e,elements:t})=>y()({hashEquals:e,elements:await t}))():y(),b=(e,t)=>(r,n)=>{const s=O.toArray(),o=e(s).bind(s);return t({...{hashEquals:a.HashEquals.default()},...n||{},...{elements:o(r)}})},v=e=>b(e,e=>e.elements),g=(e,t)=>b(e,f(t)),E=(e,t)=>a=>b(e,f(t))(a,{hashEquals:r}),j={isEmpty:()=>0===s(),has:p(e),hasAll:d(e=>e.every(O.has)),addAll:m(o),removeAll:h(m(l)),retainAll:h(e=>O.retainIf(p(e))),removeIf:h(e=>O.toArray().filter(e).forEach(l)),retainIf:e=>O.removeIf(e.negate()),replaceAll(e){const t=O.toArray().map(e);i(),O.addAll(t)},toString:()=>`[${O.toArray().join(", ")}]`,toArray:()=>[...O],random:()=>O.toArray().random(),forEach:v(e=>e.forEach),asyncForEach:v(e=>e.asyncForEach),equals:e=>s()===e.size()&&(()=>{const t=e.toArray();return O.toArray().every((e,r)=>u(e,t[r]))})(),hash:()=>O.toArray().map(c).map(a.Hash.makeNumber).reduce((e,t)=>31*(0|e)+t,1),filter:E(e=>e.filter,!1),map:g(e=>e.map,!1),mapFilter:g(e=>e.mapFilter,!1),asyncFilter:E(e=>e.asyncFilter,!0),asyncMap:g(e=>e.asyncMap,!0),asyncMapFilter:g(e=>e.asyncMapFilter,!0),clone:()=>O.map(e=>e)},O=Object.assign(e,j);return O}}},50(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(1),n=r(91),s=r(12),o=r(87);t.indexOrder=((e,t)=>t),t.noFilter=(()=>!0),t.OrderControls=(({orders:e,setOrder:r,currentIndex:l})=>{const i=(e,t,s)=>a.createElement(n,{key:t,onSelect:()=>r(e,t),active:t===l},s);return a.createElement(o,{title:"Order",id:""},i(t.indexOrder,-1,"Index"),e.map(({key:e,value:{order:t}},r)=>i(t,r,s.capitalize(e))))})},53(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(22),n=r(117),s=Object.freeze({writable:!1,enumerable:!1,configurable:!0}),o=(e,t,r,a=!0)=>{const n=Object.getOwnPropertyDescriptors(r);Object.entries(n).forEach(([r,s])=>{!a&&e[r]||(((s={...s,...t}).get||s.set)&&delete s.writable,n[r]=s)}),Object.defineProperties(e,n)};o(Object,s,{defineSharedProperties:o,defineImmutableProperties(e,t,r=!0){o(e,s,t,r)}}),Object.defineImmutableProperties(Object,{allKeys:e=>[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)],allValues:e=>Object.allKeys(e).map(t=>e[t]),allEntries:e=>Object.allKeys(e).map(t=>[t,e[t]]),definePolyfillProperties(e,t){Object.defineImmutableProperties(e,t,!1)},getPrototypeChain(e){const t=[];for(let r=e;null!==r;r=Object.getPrototypeOf(r))t.push(r);return t},getAllPropertyNames:e=>Array.from(new Set(Object.getPrototypeChain(e).flatMap(e=>Object.getOwnPropertyNames(e)))),assignProperties(e,...t){for(const r of t)Object.defineProperties(e,Object.getOwnPropertyDescriptors(r))},getting:e=>t=>t[e],deleting:e=>t=>(delete t[e],t)}),Object.defineImmutableProperties(Object.prototype,{hasProperty(e){for(let t=this;null!==t;t=Object.getPrototypeOf(t))if(t.hasOwnProperty(e))return!0;return!1},freeze(){return Object.freeze(this)},seal(){return Object.seal(this)},_clone(){return Object.assign(Object.create(null),this)},fullClone(){return Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this))},mapFields(e){const t={};for(const[r,a]of Object.entries(this))t[r]=e(a);return t},freezeFields(){for(const e of Object.values(this))e.freeze();return this}}),Object.defineImmutableProperties(Function,{compose(...e){const t=e.length;if(0===t)return()=>void 0;const[r,...a]=e;return 1===t?r():()=>{let t=r();for(const r of e)t=r(t);return t}}}),Object.defineImmutableProperties(Function.prototype,{thenCall(e){return t=>e(this(t))},applyReturning(){return e=>(this(e),e)},mapping(){return e=>e.map(this)},applying(){return e=>this(...e)},timed(){return((...e)=>{const{name:t}=this;console.time(t);const r=this(...e);return console.timeEnd(t),r}).named("timing_"+this.name)},setName(e){Object.defineProperties(this,{name:{value:e}})},named(e){return this.setName(e),this},negate(){return(...e)=>!this(...e)}}),Object.defineImmutableProperties(Array.prototype,{size(){return this.length},last(){return this[this.length-1]},clear(){this.length=0},removeAt(e){return this.splice(e,1)[0]},remove(e,t){const r=t?this.findIndex(a.Equals.bind(t,e)):this.indexOf(e);if(-1!==r)return this.removeAt(r)},add(e,t){this.splice(e,0,t)},addAll(e,t=this.length){t===this.length?this.push(...e):this.splice(t,0,...e)},applyOn(e){return e(this)},callOn(e){return e(...this)},toObject(e=!1){let t=e?Object.create(null):{};for(const[e,r]of this)t[e]=r;return t},sortBy(e){return this.sort((t,r)=>e(t)-e(r)),this},random(){return this[Math.floor(Math.random()*this.length)]},mapCall(){return this.map(e=>e())},callEach(e){this.forEach(t=>t(e))},async asyncForEach(e){await Promise.all(this.map(e))},mapFilter(e){return this.map(e).filter(n.truthy)},asyncMap(e){return Promise.all(this.map(e))},async asyncFilter(e){return(await Promise.all(this.map(async(t,r,a)=>({value:t,filtered:await e(t,r,a)})))).filter(e=>e.filtered).map(e=>e.value)},async asyncMapFilter(e){return(await Promise.all(this.map(e))).filter(n.truthy)},readOnly(){return this},_(){return this}}),Object.definePolyfillProperties(Array.prototype,{flatMap(e,t){return t&&(e=e.bind(t)),[].concat(...this.map(e))},flatten(e=-1){return 0===e?this:this.reduce((t,r)=>t.concat(Array.isArray(r)?r.flatten(e-1):r),[])}});const l="".slice;Object.defineImmutableProperties(String.prototype,{equals(e){return this===e},boundEquals(){return e=>this===e},slice(e=0,t=this.length){return 0>t&&(t=this.length+t),l.call(this,e,t)}}),Object.defineImmutableProperties(Number,{isNumber:e=>!Number.isNaN(e),toPixels:e=>Math.round(e)+"px"}),Object.defineImmutableProperties(Map.prototype,{map(e){return new Map([...this].map(([t,r])=>[t,e(r,t)]))}}),Object.defineImmutableProperties(Set.prototype,{map(e){return new Set([...this].map(e))}}),"undefined"!=typeof window&&(Object.defineImmutableProperties(Node.prototype,{appendBefore(e){const{parentNode:t}=this;return t&&t.insertBefore(e,this),e},appendAfter(e){const{nextSibling:t}=this;return t&&t.appendBefore(e),e}}),Object.defineImmutableProperties(Element.prototype,{clearHTML(){this.innerHTML=""},setAttributes(e){for(const[t,r]of Object.entries(e))r&&this.setAttribute(t,r.toString())}}),Object.defineImmutableProperties(HTMLElement.prototype,{appendTo(e){return e.appendChild(this),this},appendNewElement(e){return this.appendChild(document.createElement(e))},appendDiv(){return this.appendNewElement("div")},appendButton(e){const t=this.appendNewElement("button");return t.innerText=e,t},appendBr(){return this.appendNewElement("br")},withInnerText(e){return this.innerText=e,this},withInnerHTML(e){return this.innerHTML=e,this}}),Object.defineImmutableProperties(HTMLIFrameElement.prototype,{activate(){return this.appendTo(document.body),this}})),t.addExtensions=(()=>{})},54(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=r(28),n=r(43),s=e=>e.isLeader,o=e=>({firstName:e.name,lastName:"???",level:e.level,isLeader:!1,isReal:!1}),l=({firstName:e,lastName:t})=>`${e} ${t}`;t.genericEmployeeName=(e=>l(o(e))),t.employees=a.DataAccessor.new({source:e=>e.employees,parse:([e,t,r,a])=>({firstName:e,lastName:t,level:r,isLeader:!!a,isReal:!0}),preParsed:({positions:e})=>e.all.map(o),create(e,t,{positions:r}){const{firstName:a,lastName:n,level:s,isLeader:o,isReal:i}=e,c=r.by.level(s);return c?{id:t,name:l(e),firstName:a,lastName:n,position:c,isLeader:o,isReal:i}:void 0},by:{name:""}},{positions:n.positions}),t.leaders=a.DataAccessor.mapped(({employees:e})=>e.all.filter(s).map((e,t)=>Object.assign(e,{leaderId:t,team:()=>void 0})),{name:""},{employees:t.employees})},55(e,t,r){"use strict";(e=>{Object.defineProperty(t,"__esModule",{value:!0});const r=(e||window).process,a=r&&r.env&&r.env.NODE_ENV;t.production=!!a&&"production"===a.toLowerCase(),t.development=!t.production,t.inProduction=(e=>{t.production&&e()}),t.inDevelopment=(e=>{t.development&&e()})}).call(this,r(9))},65(t,r,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});const n=a(15);(e=r.iterables||(r.iterables={})).ofGenerator=(e=>({[Symbol.iterator]:e})),e.ofIterator=(t=>e.ofGenerator(()=>t)),e.map=((t,r)=>n.isArray(t)?t.map(r):e.ofGenerator(function*(){let e=0;for(const a of t)yield r(a,e++)}))},66(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NativeMap=Map,t.NativeSet=Set},67(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.translate=((e,t)=>`translate(${e},${t})`),t.rotate=(e=>`rotate(${e})`)},86(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=["January","February","March","April","May","June","July","August","September","October","November","December"].map(e=>({name:e}));t.Months=r.map((e,t)=>({...e,ordinal:t,date:new Date(new Date(2e3,1,1).setMonth(t))}))}});