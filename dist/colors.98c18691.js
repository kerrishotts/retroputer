parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"z7cG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=d;var e=n(require("react")),r=require("@mdx-js/react");function n(e){return e&&e.__esModule?e:{default:e}}function o(){return(o=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}const t=e=>(function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.mdx)("div",n)}),i={},a="wrapper";function d({components:e,...n}){return(0,r.mdx)(a,o({},i,n,{components:e,mdxType:"MDXLayout"}),(0,r.mdx)("h1",null,"Colors"),(0,r.mdx)("p",null,"The VGP can render 256 colors at once from a much larger palette. For most color values, the resulting palette entry directly corresponds to the color value. That is, color ",(0,r.mdx)("inlineCode",{parentName:"p"},"0x01")," maps to palette entry ",(0,r.mdx)("inlineCode",{parentName:"p"},"0x01"),". Except for the background and border color, however, ",(0,r.mdx)("inlineCode",{parentName:"p"},"0x00")," and ",(0,r.mdx)("inlineCode",{parentName:"p"},"0xFF")," refer instead to the ",(0,r.mdx)("em",{parentName:"p"},"resource background")," and ",(0,r.mdx)("em",{parentName:"p"},"foreground color")," respectively. If the ",(0,r.mdx)("em",{parentName:"p"},"resource background")," or ",(0,r.mdx)("em",{parentName:"p"},"foreground color")," is also ",(0,r.mdx)("inlineCode",{parentName:"p"},"0x00"),", that color is considered to be ",(0,r.mdx)("em",{parentName:"p"},"transparent"),"."),(0,r.mdx)("p",null,"Determining the resource's corresponding background or foreground color depends upon the resource itself:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},"The background color for the screen is derived from port ",(0,r.mdx)("inlineCode",{parentName:"li"},"0x11"),". Should this value be ",(0,r.mdx)("inlineCode",{parentName:"li"},"0x00"),", palette entry ",(0,r.mdx)("inlineCode",{parentName:"li"},"0x00")," is used. ","(","No transparency",")"),(0,r.mdx)("li",{parentName:"ul"},"The border color for the screen is derived from ",(0,r.mdx)("inlineCode",{parentName:"li"},"0x2B"),". Should this value be ",(0,r.mdx)("inlineCode",{parentName:"li"},"0x00"),", palette entry ",(0,r.mdx)("inlineCode",{parentName:"li"},"0x00")," is used. ","(","No transparency",")"),(0,r.mdx)("li",{parentName:"ul"},"When rendering tiles, the background color is obtained from the memory address ",(0,r.mdx)("inlineCode",{parentName:"li"},"0x2000")," higher than the tile's address. Any ",(0,r.mdx)("inlineCode",{parentName:"li"},"0x00")," pixel from the corresponding tile definition will be rendered in the background color. If this background color is ",(0,r.mdx)("inlineCode",{parentName:"li"},"0x00"),", the pixel is transparent. The foreground color is obtained from the memory address ",(0,r.mdx)("inlineCode",{parentName:"li"},"0x1000")," higher than the tile's address. Any ",(0,r.mdx)("inlineCode",{parentName:"li"},"0xFF")," pixel from the corresponding tile definition is rendered as the foreground color. As with the background color, an ",(0,r.mdx)("inlineCode",{parentName:"li"},"0x00")," result is considered transparent."),(0,r.mdx)("li",{parentName:"ul"},"When rendering Hires Graphics, ",(0,r.mdx)("inlineCode",{parentName:"li"},"0x00")," is considered to be transparent."),(0,r.mdx)("li",{parentName:"ul"},"When rendering sprites, tile definitions are used. However, instead of obtaining colors from tile page memory, background and foreground colors are obtained from the sprite configuration settings. The foreground color is stored ",(0,r.mdx)("inlineCode",{parentName:"li"},"0x40")," bytes from the sprite data, and the background is stored ",(0,r.mdx)("inlineCode",{parentName:"li"},"0x80")," bytes from the sprite data.")))}d.isMDXComponent=!0;
},{"react":"SAdv","@mdx-js/react":"QaRW"}]},{},[], null)
//# sourceMappingURL=/colors.98c18691.js.map