parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"drle":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=l;var t=a(require("react")),e=require("@mdx-js/react");function a(t){return t&&t.__esModule?t:{default:t}}function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t}).apply(this,arguments)}const n=t=>(function(a){return console.warn("Component "+t+" was not imported, exported, or provided by MDXProvider as global scope"),(0,e.mdx)("div",a)}),d={},m="wrapper";function l({components:t,...a}){return(0,e.mdx)(m,r({},d,a,{components:t,mdxType:"MDXLayout"}),(0,e.mdx)("h1",null,"Power (15)"),(0,e.mdx)("p",null,"This device controls and responds to power requests."),(0,e.mdx)("h3",null,"Ports"),(0,e.mdx)("table",null,(0,e.mdx)("thead",{parentName:"table"},(0,e.mdx)("tr",{parentName:"thead"},(0,e.mdx)("th",r({parentName:"tr"},{align:"left"}),"Port"),(0,e.mdx)("th",r({parentName:"tr"},{align:"left"}),"Name"),(0,e.mdx)("th",r({parentName:"tr"},{align:"left"}),"Notes"))),(0,e.mdx)("tbody",{parentName:"table"},(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xF0"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Power State"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0x00: Idle ",(0,e.mdx)("br",null)," 0x01: Breakpoint ",(0,e.mdx)("br",null)," 0x80: Full power")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xF1"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}))),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xF2"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}))),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xF3"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}))),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xF4"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}))),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xF5"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}))),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xF6"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}))),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xF7"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}))),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xF8"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}))),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xF9"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}))),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xFA"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}))),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xFB"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}))),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xFC"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}))),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xFD"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}))),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xFE"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}))),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xFF"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Reset Device"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Writing to this port triggers a reset by raising TRAP 0xF8")))))}l.isMDXComponent=!0;
},{"react":"SAdv","@mdx-js/react":"QaRW"}]},{},[], null)
//# sourceMappingURL=/power.94e0226a.js.map