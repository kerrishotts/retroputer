parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"in3O":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=l;var t=a(require("react")),e=require("@mdx-js/react");function a(t){return t&&t.__esModule?t:{default:t}}function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t}).apply(this,arguments)}const n=t=>(function(a){return console.warn("Component "+t+" was not imported, exported, or provided by MDXProvider as global scope"),(0,e.mdx)("div",a)}),d={},m="wrapper";function l({components:t,...a}){return(0,e.mdx)(m,r({},d,a,{components:t,mdxType:"MDXLayout"}),(0,e.mdx)("h1",null,"Debugger (14)"),(0,e.mdx)("p",null,"This device enables the developer to debug the processor state."),(0,e.mdx)("h3",null,"Trap (0xF0)"),(0,e.mdx)("p",null,"When the processor encounters a breakpoint, Trap 0xF0 is raised to trigger the monitor."),(0,e.mdx)("h3",null,"Ports"),(0,e.mdx)("table",null,(0,e.mdx)("thead",{parentName:"table"},(0,e.mdx)("tr",{parentName:"thead"},(0,e.mdx)("th",r({parentName:"tr"},{align:"left"}),"Port"),(0,e.mdx)("th",r({parentName:"tr"},{align:"left"}),"Name"),(0,e.mdx)("th",r({parentName:"tr"},{align:"left"}),"Notes"))),(0,e.mdx)("tbody",{parentName:"table"},(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xE0"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Register Select"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Selects the internal processor register")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xE1"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Register Value (High)"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Renders the high bits of the selected register")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xE2"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Register Value (Low)"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Renders the low bits of the selected register")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xE3"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Register Read/Write"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0: Reads the register",(0,e.mdx)("br",null)," 1: Writes the values of 0xE1:0xE2 to the register")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xE4"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Breakpoint Select"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Selects a breakpoint (0-255)")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xE5"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Breakpoint Address (High)"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"The high bits of the breakpoint")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xE6"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Breakpoint Address (Low)"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"The low bits of the breakpoint")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xE7"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Breakpoint Mode"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"If the high bit is set, the breakpoint is ",(0,e.mdx)("em",{parentName:"td"},"enabled"),"; otherwise it is disabled. ",(0,e.mdx)("br",null)," If the low bit is set, the breakpoint is ",(0,e.mdx)("em",{parentName:"td"},"set"),". Breakpoint address is only updated when this port is modified.")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xE8"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Port Select"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Selects a data port")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xE9"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Port Value"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Renders the data on the port")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xEA"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Port Read/Write"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0: Reads the port",(0,e.mdx)("br",null)," 1: Writes the value to the port")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xEB"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Port Breakpoint Mode"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"If the high bit is set, the breakpoint is enabled and will fire when the port matches the set value. If the low bit is set, the breakpoint value is set to 0xE9.")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xEC"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Break on Invalid Instruction"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Indicates the TRAP to use when an invalid instruciton is encountered")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xED"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Break on Exception"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Indicates the TRAP to use when an exception occurs")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xEE"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}))),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"0xEF"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"Debug Mode"),(0,e.mdx)("td",r({parentName:"tr"},{align:"left"}),"If 0xFF, breakpoints are checked at each instruction.")))))}l.isMDXComponent=!0;
},{"react":"SAdv","@mdx-js/react":"QaRW"}]},{},[], null)
//# sourceMappingURL=/debugger.024e5679.js.map