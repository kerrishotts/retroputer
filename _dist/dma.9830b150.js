parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Ji9q":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=m;var t=a(require("react")),e=require("@mdx-js/react");function a(t){return t&&t.__esModule?t:{default:t}}function n(){return(n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t}).apply(this,arguments)}const d=t=>(function(a){return console.warn("Component "+t+" was not imported, exported, or provided by MDXProvider as global scope"),(0,e.mdx)("div",a)}),r={},l="wrapper";function m({components:t,...a}){return(0,e.mdx)(l,n({},r,a,{components:t,mdxType:"MDXLayout"}),(0,e.mdx)("h1",null,"DMA (13)"),(0,e.mdx)("p",null,"The DMA device enables fast movement of memory blocks. This enables smoother scrolling, fast copying of large amounts of data, etc."),(0,e.mdx)("blockquote",null,(0,e.mdx)("p",{parentName:"blockquote"},(0,e.mdx)("strong",{parentName:"p"},"Important")),(0,e.mdx)("p",{parentName:"blockquote"},"The DMA device does ",(0,e.mdx)("em",{parentName:"p"},"not")," respect the processor memory map. As such, any DMA operations operate directly on physical memory addresses. Furthermore, only 64K of data can be moved, swapped, or filled at any one time.")),(0,e.mdx)("p",null,"The DMA device supports the following operations:"),(0,e.mdx)("h3",null,"Copy"),(0,e.mdx)("p",null,"Copies the data in the source block to the target block."),(0,e.mdx)("h3",null,"Swap"),(0,e.mdx)("p",null,"Swaps the data in the source and target block."),(0,e.mdx)("h3",null,"Fill"),(0,e.mdx)("p",null,"Fills the range indicated by the source block with a given byte."),(0,e.mdx)("h3",null,"Ports"),(0,e.mdx)("table",null,(0,e.mdx)("thead",{parentName:"table"},(0,e.mdx)("tr",{parentName:"thead"},(0,e.mdx)("th",n({parentName:"tr"},{align:"left"}),"Port"),(0,e.mdx)("th",n({parentName:"tr"},{align:"left"}),"Name"),(0,e.mdx)("th",n({parentName:"tr"},{align:"left"}),"Notes"))),(0,e.mdx)("tbody",{parentName:"table"},(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xD0"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Source Address (18-16)"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Source of the memory operation")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xD1"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Source Address (15-8)"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),'"')),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xD2"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Source Address (7-0)"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),'"')),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xD3"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Unused")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xD4"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Target Address (18-16)"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Target address")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xD5"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Target Address (15-8)"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),'"')),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xD6"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Target Address (7-0)"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),'"')),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xD7"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Unused")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xD8"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Length (15-8)"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Length of data")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xD9"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Length (7-0)"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),'"')),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xDA"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Unused")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xDB"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Unused")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xDC"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Mode"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Indicates the DMA operation: ",(0,e.mdx)("br",null)," 1: Copy ",(0,e.mdx)("br",null)," 2: Swap ",(0,e.mdx)("br",null)," 4: Fill ",(0,e.mdx)("br",null)," Setting this port executes the operation.")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xDD"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Fill"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Specifies the byte to fill with if mode is 4")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xDE"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Unused")),(0,e.mdx)("tr",{parentName:"tbody"},(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"0xDF"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"-"),(0,e.mdx)("td",n({parentName:"tr"},{align:"left"}),"Unused")))),(0,e.mdx)("h3",null,"Examples"),(0,e.mdx)("pre",null,(0,e.mdx)("code",n({parentName:"pre"},{}),".segment code 0x02000 {\n    ld al, 0x00\n    out 0x12, al     # set the layer we're modifying\n    ld al, 2\n    out 0x1B, al     # graphics mode 2\n    ld al, 0\ntop:\n    ld x, 49152\n    ld bl, 0xff\n    ld dl, 0\n    do {\n        st [0x10000,x], al\n        inc al\n        mov bl, al\n        or bl, 0b10100100\n        out 0x2B, bl\n        dec x\n    } while !c\nsetdma:\n    # source\n    ld cl, 0x01\n    out 0xd0, cl\n    ld cl, 0x00\n    out 0xd1, cl\n    ld cl, 0x00\n    out 0xd2, cl\n    # target\n    ld cl, 0x01\n    out 0xd4, cl\n    ld cl, 0x00\n    out 0xd5, cl\n    ld cl, 0x01\n    out 0xd6, cl\n    # length\n    ld cl, 0xBF\n    out 0xd8, cl\n    ld cl, 0xff\n    out 0xd9, cl\n    # execute\n    ld cl, 0x01\ndma:\n    out 0xdc, cl\n    st [0x10000], al\n    inc al\nsleep:\n    inc bl\n    out 0x2B, bl\n    in dl, 0x2E\n    cmp dl, 0xf0\n    br !z sleep\nhold:\n    in dl, 0x2E\n    cmp dl, 0xf0\n    br z hold\n    br dma\n    brk\n}\n")))}m.isMDXComponent=!0;
},{"react":"SAdv","@mdx-js/react":"QaRW"}]},{},[], null)
//# sourceMappingURL=/dma.9830b150.js.map