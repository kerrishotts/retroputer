parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"w8JB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=r;var e=t(require("react")),n=require("@mdx-js/react");function t(e){return e&&e.__esModule?e:{default:e}}function i(){return(i=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e}).apply(this,arguments)}const a=e=>(function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,n.mdx)("div",t)}),o={},l="wrapper";function r({components:e,...t}){return(0,n.mdx)(l,i({},o,t,{components:e,mdxType:"MDXLayout"}),(0,n.mdx)("h1",null,"Palette"),(0,n.mdx)("p",null,"The 4025 Video Generator is capable of rendering up to 256 colors onscreen at once, from an overall palette of 24-bit color. Changing the palette will affect everything onscreen, making it possible to create faux-animation simply by cycling portions of the palette ","(","color cycling",")",", or making it possible to fade content in and out simply by changing brightness levels."),(0,n.mdx)("p",null,"The palette is located at 0x74000 and continues to 0x743FF. There are 256 entries each consisting of an ignored byte ","(","set to 0xFF",")"," and the red, green, and blue component of the color. "),(0,n.mdx)("p",null,"An initial palette is configured upon cold boot, however this palette can be overridden at any time."),(0,n.mdx)("h3",null,"The initial palette"),(0,n.mdx)("p",null,"The initial palette is stored in ROM at ",(0,n.mdx)("inlineCode",{parentName:"p"},"0x74000"),", and the VGP is configured to read from this address ","(","page 29",")"," on ",(0,n.mdx)("inlineCode",{parentName:"p"},"RESET"),"."),(0,n.mdx)("p",null,"The palette consists of the following:"),(0,n.mdx)("ul",null,(0,n.mdx)("li",{parentName:"ul"},"24 RGBI color entries ","(","indices 0–23",")"),(0,n.mdx)("li",{parentName:"ul"},"16 shades of gray ","(","indices 24–39",")"),(0,n.mdx)("li",{parentName:"ul"},"216 6-level RGB colors ","(","indicies 40–255",")",(0,n.mdx)("ul",{parentName:"li"},(0,n.mdx)("li",{parentName:"ul"},"These can be accessed by using ",(0,n.mdx)("inlineCode",{parentName:"li"},"40 + ((R/51)*36) + ((G/51)*6) + (B/51)"),", where ",(0,n.mdx)("inlineCode",{parentName:"li"},"R"),", ",(0,n.mdx)("inlineCode",{parentName:"li"},"G"),", and ",(0,n.mdx)("inlineCode",{parentName:"li"},"B")," are between ",(0,n.mdx)("inlineCode",{parentName:"li"},"0")," and ",(0,n.mdx)("inlineCode",{parentName:"li"},"255")," inclusive.")))),(0,n.mdx)("p",null,"In the initial palette some colors are duplicated, meaning that there aren't 256 distinct colors available for use, but the palette can be redefined to whatever values are needed."))}r.isMDXComponent=!0;
},{"react":"SAdv","@mdx-js/react":"QaRW"}]},{},[], null)
//# sourceMappingURL=/palette.7ce4faf3.js.map