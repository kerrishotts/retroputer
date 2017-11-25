/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    toHex: function (v, format, prefix) {
        if (format === void 0) { format = "0000"; }
        if (prefix === void 0) { prefix = "0x"; }
        var hexValue = (v === undefined ? "0" : v).toString(16);
        hexValue = format.substr(0, format.length - hexValue.length) + hexValue;
        return "" + prefix + hexValue;
    },
    toHex2: function (v, prefix) {
        if (prefix === void 0) { prefix = "0x"; }
        return this.toHex(v, "00", prefix);
    },
    toHex4: function (v, prefix) {
        if (prefix === void 0) { prefix = "0x"; }
        return this.toHex(v, "0000", prefix);
    },
    toHex5: function (v, prefix) {
        if (prefix === void 0) { prefix = "0x"; }
        return this.toHex(v, "00000", prefix);
    },
    toHex8: function (v, prefix) {
        if (prefix === void 0) { prefix = "0x"; }
        return this.toHex(v, "00000000", prefix);
    },
    byteArrayToHex: function (arr, prefix) {
        var _this = this;
        if (prefix === void 0) { prefix = ""; }
        return arr.map(function (b) { return _this.toHex2(b, prefix); }).join(" ");
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGV4VXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZXhVdGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtCQUFlO0lBQ1gsS0FBSyxZQUFDLENBQUMsRUFBRSxNQUFlLEVBQUUsTUFBYTtRQUE5Qix1QkFBQSxFQUFBLGVBQWU7UUFBRSx1QkFBQSxFQUFBLGFBQWE7UUFDbkMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEQsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUN4RSxNQUFNLENBQUMsS0FBRyxNQUFNLEdBQUcsUUFBVSxDQUFDO0lBQ2xDLENBQUM7SUFDRCxNQUFNLFlBQUMsQ0FBQyxFQUFFLE1BQWE7UUFBYix1QkFBQSxFQUFBLGFBQWE7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsTUFBTSxZQUFDLENBQUMsRUFBRSxNQUFhO1FBQWIsdUJBQUEsRUFBQSxhQUFhO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNELE1BQU0sWUFBQyxDQUFDLEVBQUUsTUFBYTtRQUFiLHVCQUFBLEVBQUEsYUFBYTtRQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDRCxNQUFNLFlBQUMsQ0FBQyxFQUFFLE1BQWE7UUFBYix1QkFBQSxFQUFBLGFBQWE7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsY0FBYyxZQUFDLEdBQUcsRUFBRSxNQUFXO1FBQS9CLGlCQUVDO1FBRm1CLHVCQUFBLEVBQUEsV0FBVztRQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FDSixDQUFDIn0=

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var _log = [];
/**
 * log information to the console -- works for the browser or in a node environment
 *
 * @param {Array} args      data to log
 * @return {void}
 */
function log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof window !== "undefined") {
        _log.unshift(args.join(" "));
        if (_log.length > 24) {
            _log.pop();
        }
        document.getElementById("log").textContent = _log.join(String.fromCharCode(13) + String.fromCharCode(10));
    }
    else {
        console.log(args.join(" "));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = log;
if (typeof window !== "undefined") {
    window.log = log;
}
if (typeof global !== "undefined") {
    global.log = log;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFFZDs7Ozs7R0FLRztBQUNIO0lBQTRCLGNBQU87U0FBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1FBQVAseUJBQU87O0lBQy9CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLENBQUM7UUFDRCxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlHLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7QUFDTCxDQUFDOztBQVZELHNCQVVDO0FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNoQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNyQixDQUFDO0FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNoQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNyQixDQUFDIn0=
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals SharedArrayBuffer */

var log_js_1 = __webpack_require__(1);
var hexUtils_js_1 = __webpack_require__(0);
var Memory = (function () {
    function Memory(layout, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.shared, shared = _c === void 0 ? false : _c, _d = _b.withSharedArrayBuffer, withSharedArrayBuffer = _d === void 0 ? undefined : _d;
        this._protected = false;
        this._shared = Boolean(shared || withSharedArrayBuffer);
        this.layout = layout;
        this._buf = withSharedArrayBuffer || new (shared ? SharedArrayBuffer : ArrayBuffer)(layout.size * 1024);
        this._mem = new Uint8Array(this._buf);
        this._rom = new Uint8Array(this._buf, layout.romStart, layout.romLength);
        this.resetStats();
    }
    Object.defineProperty(Memory.prototype, "shared", {
        get: function () {
            return this._shared;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Memory.prototype, "sharedArrayBuffer", {
        get: function () {
            return this.shared ? this._buf : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Memory.prototype, "protected", {
        get: function () {
            return this._protected;
        },
        set: function (v) {
            this._protected = v;
            if (v) {
                this._rom = this.copyFromRange(this.layout.romStart, this.layout.romLength);
            }
        },
        enumerable: true,
        configurable: true
    });
    Memory.prototype.resetStats = function () {
        this.stats = {
            readsTotal: 0,
            byteReadsTotal: 0,
            wordReadsTotal: 0,
            writesTotal: 0,
            byteWritesTotal: 0,
            wordWritesTotal: 0,
            lastReadAddr: 0,
            lastWriteAddr: 0,
            lastValueRead: 0,
            lastValueWritten: 0,
        };
    };
    Memory.prototype.dump = function () {
        log_js_1.default("mem stats | reads  8: " + this.stats.byteReadsTotal + "  16: " + this.stats.wordReadsTotal + "  All: " + this.stats.readsTotal);
        log_js_1.default("mem stats | writes 8: " + this.stats.byteWritesTotal + "  16: " + this.stats.wordWritesTotal + "  All: " + this.stats.writesTotal);
        log_js_1.default("mem stats | last read: " + hexUtils_js_1.default.toHex4(this.stats.lastValueRead) + "@" + hexUtils_js_1.default.toHex4(this.stats.lastReadAddr) + "  write: " + hexUtils_js_1.default.toHex4(this.stats.lastValueWritten) + "@" + hexUtils_js_1.default.toHex4(this.stats.lastWriteAddr));
    };
    Memory.prototype.loadFromJS = function (data, addrOverride) {
        var _this = this;
        var addr = data.addr;
        if (addrOverride) {
            addr = addrOverride;
        }
        data.data.forEach(function (v, i) {
            _this.poke(i + addr, v);
        });
    };
    /*
      loadFromBIN(bin) {
        // TODO
      }
    */
    Memory.prototype.poke = function (addr, val) {
        addr &= 0x3FFFF;
        var v = (val & 0xFF);
        this._mem[addr] = v;
        /*
        this.stats.lastValueWritten = v;
        this.stats.writesTotal++;
        this.stats.byteWritesTotal++;
        this.stats.lastValueWritten = (val & 0xFF);
        this.stats.lastWriteAddr = addr;
        */
    };
    Memory.prototype.poke16 = function (addr, val) {
        addr &= 0x3FFFF;
        var v = (val & 0xFFFF);
        this._mem[addr] = (v & 0xFF00) >> 8;
        this._mem[addr + 1] = (v & 0x00FF);
        /*
        this.stats.writesTotal++;
        this.stats.wordWritesTotal++;
        this.stats.lastValueWritten = v;
        this.stats.lastWriteAddr = addr;
        */
    };
    Memory.prototype.poke32 = function (addr, val) {
        addr &= 0x3FFFF;
        var v = (val & 0xFFFFFFFF);
        this._mem[addr] = (v & 0xFF000000) >> 24;
        this._mem[addr + 1] = (v & 0x00FF0000) >> 16;
        this._mem[addr + 2] = (v & 0x0000FF00) >> 8;
        this._mem[addr + 3] = (v & 0x000000FF);
        /*
        this.stats.writesTotal++;
        this.stats.lastValueWritten = v;
        this.stats.lastWriteAddr = addr;
        */
    };
    Memory.prototype.peek = function (addr) {
        addr &= 0x3FFFF;
        var v = this._mem[addr];
        if (this._protected) {
            if (addr >= this.layout.romStart && addr <= this.layout.romEnd) {
                v = this._rom[addr - this.layout.romStart];
            }
        }
        /*
        this.stats.readsTotal++;
        this.stats.byteReadsTotal++;
        this.stats.lastValueRead = v;
        this.stats.lastReadAddr = addr;
        */
        return v;
    };
    Memory.prototype.peek16 = function (addr) {
        addr &= 0x3FFFF;
        var v = (this.peek(addr) << 8) | this.peek(addr + 1);
        /*
        this.stats.readsTotal++;
        this.stats.wordReadsTotal++;
        this.stats.lastValueRead = v;
        this.stats.lastReadAddr = addr;
        */
        return v;
    };
    Memory.prototype.peek32 = function (addr) {
        addr &= 0x3FFFF;
        var v = (this.peek(addr) << 24) | (this.peek(addr + 1) << 16) | (this.peek(addr + 2) << 8) | (this.peek(addr + 3));
        /*
        this.stats.readsTotal++;
        this.stats.wordReadsTotal++;
        this.stats.lastValueRead = v;
        this.stats.lastReadAddr = addr;
        */
        return v;
    };
    Memory.prototype.range = function (addr, len) {
        if (addr + len <= this.layout.memtop) {
            return new Uint8Array(this._buf, addr, len);
        }
        else {
            var overflow = (addr + len) - this.layout.memtop;
            len -= overflow;
            if (len < 0) {
                len = 0;
            }
            return new Uint8Array(this._buf, addr, len); //.concat(this.copyFromRange(0, overflow));
        }
    };
    Memory.prototype.copyFromRange = function (addr, len) {
        return Uint8Array.from(this.range(addr, len));
    };
    Memory.prototype.copyWithin = function (_a) {
        var _b = _a === void 0 ? {} : _a, src = _b.src, dest = _b.dest, len = _b.len;
        if (src + len > this.layout.memtop ||
            dest + len > this.layout.memtop) {
            return;
        }
        this._mem.copyWithin(dest, src, src + len);
    };
    Memory.prototype.fillWithin = function (_a) {
        var _b = _a === void 0 ? {} : _a, value = _b.value, addr = _b.addr, len = _b.len;
        if (len + addr > this.layout.memtop) {
            return;
        }
        this._mem.fill(value & 0xFF, addr, addr + len);
    };
    Memory.prototype.setWithin = function (_a) {
        var _b = _a === void 0 ? {} : _a, data = _b.data, addr = _b.addr;
        if (addr + (data.length) > this.layout.memtop) {
            return;
        }
        this._mem.set(data, addr);
    };
    Memory.prototype.range32 = function (addr, len) {
        return new Uint32Array(this._buf, addr, len);
    };
    Memory.prototype.init = function () {
        var _this = this;
        this.protected = false;
        for (var i = 0; i < (this.layout.size * 1024); i++) {
            // simulate old-style memory being random at boot
            this.poke(i, Math.floor(Math.random() * 256));
        }
        // we need three RETs at known important vectors
        [0x0FE00, 0x0FF00, 0x0FFFF].forEach(function (addr) {
            _this.poke(addr, 0xFF);
        });
        // All trap vectors initially point at 0xFFFF
        for (var addr = 0; addr < 512; addr++) {
            this.poke(addr, 0xFF);
        }
        // but we do need a valid FRAME and RESET vector
        this.poke16(0x00000, 0xFF00);
        this.poke16(0x001E0, 0xFE00);
        // loading boot ROM is the responsibility of our owner.
    };
    return Memory;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Memory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtb3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTWVtb3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjs7QUFFL0IseUNBQWlDO0FBQ2pDLG1EQUEyQztBQUUzQztJQUNFLGdCQUFZLE1BQU0sRUFBRSxFQUEwRDtZQUExRCw0QkFBMEQsRUFBeEQsY0FBYyxFQUFkLG1DQUFjLEVBQUUsNkJBQWlDLEVBQWpDLHNEQUFpQztRQUNyRSxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUkscUJBQXFCLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLHFCQUFxQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLEdBQUcsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN4RyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxzQkFBSSwwQkFBTTthQUFWO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxxQ0FBaUI7YUFBckI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDZCQUFTO2FBQWI7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

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* globals self */
var Screen_js_1 = __webpack_require__(7);
var Memory_js_1 = __webpack_require__(2);
var memoryLayout_js_1 = __webpack_require__(3);
var ScreenWorker = (function () {
    function ScreenWorker() {
        this.screen = new Screen_js_1.default(null, null, null, {
            worker: true,
            shared: true
        });
    }
    ScreenWorker.prototype.setSharedMemory = function (sharedArrayBuffer) {
        this.screen._memory = new Memory_js_1.default(memoryLayout_js_1.default, {
            shared: true,
            withSharedArrayBuffer: sharedArrayBuffer
        });
        this.screen._layout = memoryLayout_js_1.default;
    };
    ScreenWorker.prototype.setSharedFrameBuffer = function (sharedArrayBuffer) {
        this.screen.setSharedArrayBuffer(sharedArrayBuffer);
    };
    ScreenWorker.prototype.init = function () {
        this.screen.init();
    };
    ScreenWorker.prototype.update = function (_, postMessage) {
        this.screen.update();
        postMessage({ cmd: "updated" });
    };
    return ScreenWorker;
}());
var screenWorker = new ScreenWorker();
self.addEventListener("message", function (e) {
    var cmd = e.data.cmd;
    var data = e.data.data;
    if (screenWorker[cmd]) {
        screenWorker[cmd](data, self.postMessage);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NyZWVuV29ya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2NyZWVuV29ya2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrQkFBa0I7QUFDbEIsK0NBQXVDO0FBQ3ZDLCtDQUF1QztBQUV2QywyREFBbUQ7QUFFbkQ7SUFDSTtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxtQkFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO1lBQ3ZDLE1BQU0sRUFBRSxJQUFJO1lBQ1osTUFBTSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsc0NBQWUsR0FBZixVQUFnQixpQkFBaUI7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxtQkFBTSxDQUFDLHlCQUFZLEVBQUU7WUFDM0MsTUFBTSxFQUFFLElBQUk7WUFDWixxQkFBcUIsRUFBRSxpQkFBaUI7U0FDM0MsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcseUJBQVksQ0FBQztJQUN2QyxDQUFDO0lBRUQsMkNBQW9CLEdBQXBCLFVBQXFCLGlCQUFpQjtRQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELDJCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCw2QkFBTSxHQUFOLFVBQU8sQ0FBQyxFQUFFLFdBQVc7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQixXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBNUJELElBNEJDO0FBRUQsSUFBTSxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBQztJQUMvQixJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUN2QixJQUFNLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN6QixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzlDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable */
exports.memoryLayout = {
    size: 256,
    memlen: 0x40000,
    memtop: 0x3FFFF,
    spriteCount: 16,
    sprite0Height: 0x340A0,
    sprite0Width: 0x34090,
    sprite0Tile: 0x34080,
    sprite0TileSet: 0x34070,
    sprite0FGColor: 0x34060,
    sprite0BGColor: 0x34050,
    sprite0Scale: 0x34040,
    sprite0YPosition: 0x34030,
    sprite0XPosition: 0x34010,
    sprite0Layer: 0x34000,
    spriteStart: 0x34000,
    tilePagesLength: 0x04000,
    tilePageLength: 0x01000,
    tilePage3Layer: 0x33FFF // 0 - 7 = visible at layer, 0xFF/-1 = not visible
    ,
    tilePage3OffsetY: 0x33FFE // signed Y offset for smooth scrolling
    ,
    tilePage3OffsetX: 0x33FFD // signed X offset for smooth scrolling
    ,
    tilePage3Set: 0x33FFC // 0 - 3, which tileset to use
    ,
    tilePage3Scale: 0x33FFB // 0 = 1x1 pixel, 1 = 2x2 pixel
    ,
    tilePage3CropY: 0x33FFA // height of area to ignore when compositing (border)
    ,
    tilePage3CropX: 0x33FF9 // width of area to ignore when compositing (border)
    ,
    tilePage3FGColor: 0x33800,
    tilePage3BGColor: 0x33400,
    tilePage3: 0x33000,
    tilePage2Layer: 0x32FFF // 0 - 7 = visible at layer, 0xFF/-1 = not visible
    ,
    tilePage2OffsetY: 0x32FFE // signed Y offset for smooth scrolling
    ,
    tilePage2OffsetX: 0x32FFD // signed X offset for smooth scrolling
    ,
    tilePage2Set: 0x32FFC // 0 - 3, which tileset to use
    ,
    tilePage2Scale: 0x32FFB // 0 = 1x1 pixel, 1 = 2x2 pixel
    ,
    tilePage2CropY: 0x32FFA // height of area to ignore when compositing (border)
    ,
    tilePage2CropX: 0x32FF9 // width of area to ignore when compositing (border)
    ,
    tilePage2FGColor: 0x32800,
    tilePage2BGColor: 0x32400,
    tilePage2: 0x32000,
    tilePage1Layer: 0x31FFF // 0 - 7 = visible at layer, 0xFF/-1 = not visible
    ,
    tilePage1OffsetY: 0x31FFE // signed Y offset for smooth scrolling
    ,
    tilePage1OffsetX: 0x31FFD // signed X offset for smooth scrolling
    ,
    tilePage1Set: 0x31FFC // 0 - 3, which tileset to use
    ,
    tilePage1Scale: 0x31FFB // 0 = 1x1 pixel, 1 = 2x2 pixel
    ,
    tilePage1CropY: 0x31FFA // height of area to ignore when compositing (border)
    ,
    tilePage1CropX: 0x31FF9 // width of area to ignore when compositing (border)
    ,
    tilePage1FGColor: 0x31800,
    tilePage1BGColor: 0x31400,
    tilePage1: 0x31000,
    tilePage0Layer: 0x30FFF // 0 - 7 = visible at layer, 0xFF/-1 = not visible
    ,
    tilePage0OffsetY: 0x30FFE // signed Y offset for smooth scrolling
    ,
    tilePage0OffsetX: 0x30FFD // signed X offset for smooth scrolling
    ,
    tilePage0Set: 0x30FFC // 0 - 3, which tileset to use
    ,
    tilePage0Scale: 0x30FFB // 0 = 1x1 pixel, 1 = 2x2 pixel
    ,
    tilePage0CropY: 0x30FFA // height of area to ignore when compositing (border)
    ,
    tilePage0CropX: 0x30FF9 // width of area to ignore when compositing (border)
    ,
    tilePage0FGColor: 0x30800,
    tilePage0BGColor: 0x30400,
    tilePage0: 0x30000,
    tilePagesStart: 0x30000,
    tileSetsLength: 65536,
    tileSetLength: 16384,
    tileSet3: 0x2C000 // tileset 3
    ,
    tileSet2: 0x28000 // tileset 2
    ,
    tileSet1: 0x24000 // tileset 1
    ,
    tileSet0: 0x20000 // 16K 256 8x8 tileset 0
    ,
    tileSetsStart: 0x20000,
    paletteLength: 1024,
    paletteLength32: 256,
    paletteStart: 0x1FC00 // 256 x 4 bytes
    ,
    backgroundColor: 0x1FA0B // background color for screen
    ,
    borderSizeY: 0x1FA06 // height of vertical border in px
    ,
    borderSizeX: 0x1FA05 // width of horizontal border in px
    ,
    borderColor: 0x1FA04 // Border Color
    ,
    graphicsLayer: 0x1FA02 // 0 - 7, graphica layer; FF = no display
    ,
    screenConfigLength: 256,
    screenConfigStart: 0x1FA00,
    graphicsLength: 64000,
    graphicsStart: 0x10000 // 320 x 200 (64000) bytes
    ,
    romLength: 0x04000 // length of rom
    ,
    romEnd: 0x0FFFF // End of ROM
    ,
    romStart: 0x0C000 // Start of ROM
    ,
    codeStart: 0x01000 // Start of code execution
    ,
    stackTop: 0x00FFF // top of stack (grows down)
    ,
    stackMax: 0x00400 // bottom of stack
    ,
    trapReset: 0x00000 // jump to instruction when reset
    ,
    traps: 0x00000 // 256 2-byte long pointers; ends 0x001FF
    ,
    membot: 0x00000
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.memoryLayout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb3J5TGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVtb3J5TGF5b3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDVCxRQUFBLFlBQVksR0FBRztJQUN4QixJQUFJLEVBQWlCLEdBQUc7SUFDeEIsTUFBTSxFQUFXLE9BQU87SUFDeEIsTUFBTSxFQUFXLE9BQU87SUFDeEIsV0FBVyxFQUFXLEVBQUU7SUFDeEIsYUFBYSxFQUFJLE9BQU87SUFDeEIsWUFBWSxFQUFLLE9BQU87SUFDeEIsV0FBVyxFQUFNLE9BQU87SUFDeEIsY0FBYyxFQUFHLE9BQU87SUFDeEIsY0FBYyxFQUFHLE9BQU87SUFDeEIsY0FBYyxFQUFHLE9BQU87SUFDeEIsWUFBWSxFQUFLLE9BQU87SUFDeEIsZ0JBQWdCLEVBQUMsT0FBTztJQUN4QixnQkFBZ0IsRUFBQyxPQUFPO0lBQ3hCLFlBQVksRUFBSyxPQUFPO0lBQ3hCLFdBQVcsRUFBTSxPQUFPO0lBQ3hCLGVBQWUsRUFBRSxPQUFPO0lBQ3hCLGNBQWMsRUFBRyxPQUFPO0lBQ3hCLGNBQWMsRUFBRyxPQUFPLENBQUUsa0RBQWtEOztJQUM1RSxnQkFBZ0IsRUFBQyxPQUFPLENBQUUsdUNBQXVDOztJQUNqRSxnQkFBZ0IsRUFBQyxPQUFPLENBQUUsdUNBQXVDOztJQUNqRSxZQUFZLEVBQUssT0FBTyxDQUFFLDhCQUE4Qjs7SUFDeEQsY0FBYyxFQUFHLE9BQU8sQ0FBRSwrQkFBK0I7O0lBQ3pELGNBQWMsRUFBRyxPQUFPLENBQUUscURBQXFEOztJQUMvRSxjQUFjLEVBQUcsT0FBTyxDQUFFLG9EQUFvRDs7SUFDOUUsZ0JBQWdCLEVBQUMsT0FBTztJQUN4QixnQkFBZ0IsRUFBQyxPQUFPO0lBQ3hCLFNBQVMsRUFBUSxPQUFPO0lBQ3hCLGNBQWMsRUFBRyxPQUFPLENBQUUsa0RBQWtEOztJQUM1RSxnQkFBZ0IsRUFBQyxPQUFPLENBQUUsdUNBQXVDOztJQUNqRSxnQkFBZ0IsRUFBQyxP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

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    from8: function (n) {
        return -(n & 0x80) + (n & 0x7F);
    },
    from16: function (n) {
        return -(n & 0x8000) + (n & 0x7FFF);
    },
    to8: function (n) {
        return n & 0xFF;
    },
    to16: function (n) {
        return n & 0xFFFF;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdvc0NvbXBsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0d29zQ29tcGxlbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtCQUFlO0lBQ1gsS0FBSyxZQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsTUFBTSxZQUFDLENBQUM7UUFDSixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsR0FBRyxZQUFDLENBQUM7UUFDRCxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFBSSxZQUFDLENBQUM7UUFDRixNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUN0QixDQUFDO0NBQ0osQ0FBQSJ9

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global SharedArrayBuffer */
var twosComplement_js_1 = __webpack_require__(4);
var Screen = (function () {
    function Screen(id, borderId, memory, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.worker, worker = _c === void 0 ? false : _c, _d = _b.shared, shared = _d === void 0 ? false : _d, _e = _b.withSharedArrayBuffer, withSharedArrayBuffer = _e === void 0 ? undefined : _e;
        var width = 320, height = 200, layout = memory && memory.layout;
        this._shared = Boolean(shared || withSharedArrayBuffer);
        this._worker = worker;
        this._width = width;
        this._height = height;
        this._tileWidth = 8;
        this._tileHeight = 8;
        this._tileColumns = width / this._tileWidth;
        this._tileRows = height / this._tileHeight;
        if (!worker) {
            this._screen = document.getElementById(id);
            this._screen.setAttribute("width", width);
            this._screen.setAttribute("height", height);
            this._screenCtx = this._screen.getContext("2d");
            this._canvas = document.createElement("canvas");
            this._canvas.setAttribute("width", width);
            this._canvas.setAttribute("height", height);
            this._canvasCtx = this._canvas.getContext("2d");
            this._screenBorderEl = document.getElementById(borderId);
            this._frameData = this._canvasCtx.createImageData(width, height);
        }
        this._memory = memory;
        this._layout = layout;
        // we also need the 32-bit array that the canvas will use
        if (withSharedArrayBuffer) {
            this._frameBuffer = withSharedArrayBuffer;
        }
        else {
            if (!worker) {
                this._frameBuf = new (shared ? SharedArrayBuffer : ArrayBuffer)(this._frameData.data.length);
                this._frame = new Uint32Array(this._frameBuf);
                this._frame8 = new Uint8Array(this._frameBuf);
            }
        }
        // some things depend upon our browser
        this.renderTilePageToCanvas = this.renderTilePageToCanvasSafari;
        if (typeof navigator !== "undefined") {
            if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                this.renderTilePageToCanvas = this.renderTilePageToCanvasChrome;
            }
        }
        // set up our initial values
        this.init();
    }
    Screen.prototype.init = function () {
        var memory = this._memory;
        var layout = this._layout;
        if (memory) {
            this._palette = memory.range32(layout.paletteStart, layout.paletteLength32);
            // tilesets
            this._tilesets = memory.range(layout.tileSetsStart, layout.tileSetsLength);
            this._tiles = memory.range(layout.tilePagesStart, layout.tilePagesLength);
        }
    };
    Object.defineProperty(Screen.prototype, "shared", {
        get: function () {
            return this._shared;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Screen.prototype, "sharedArrayBuffer", {
        get: function () {
            return this.shared ? this._frameBuf : null;
        },
        enumerable: true,
        configurable: true
    });
    Screen.prototype.setSharedArrayBuffer = function (sharedArrayBuffer) {
        this._frameBuf = sharedArrayBuffer;
        this._frame = new Uint32Array(this._frameBuf);
        this._frame8 = new Uint8Array(this._frameBuf);
    };
    Screen.prototype.setPaletteEntry = function (idx, r, g, b) {
        var addr = this._layout.paletteStart + (idx << 2);
        this._memory.poke(addr + 3, 0xFF);
        this._memory.poke(addr + 2, b);
        this._memory.poke(addr + 1, g);
        this._memory.poke(addr + 0, r);
    };
    Screen.prototype.getPaletteEntry = function (idx) {
        var addr = this._layout.paletteStart + (idx << 2);
        return {
            r: this._memory.peek(addr),
            g: this._memory.peek(addr + 1),
            b: this._memory.peek(addr + 2)
        };
    };
    Screen.prototype.initPalette = function () {
        var r, g, b, m, ma = [0, 128, 192, 255];
        for (var i = 0; i < 256; i++) {
            m = ma[(((i & 0xC0) >> 6))];
            r = ma[((i & 0x30) >> 4)] || m;
            g = ma[((i & 0x0C) >> 2)] || m;
            b = ma[((i & 0x03) >> 0)] || m;
            this.setPaletteEntry(i, r, g, b);
        }
    };
    Screen.prototype.setBackgroundColor = function (c) {
        this._memory.poke(this._layout.backgroundColor, c);
    };
    Screen.prototype.getBackgroundColor = function () {
        return this._memory.peek(this._layout.backgroundColor);
    };
    Screen.prototype.setBorderSize = function (x, y) {
        this._memory.poke(this._layout.borderSizeX, x);
        this._memory.poke(this._layout.borderSizeY, y);
    };
    Screen.prototype.getBorderSize = function () {
        return [this._memory.peek(this._layout.borderSizeX) & 0x3F,
            this._memory.peek(this._layout.borderSizeY) & 0x3F];
    };
    Screen.prototype.setBorderColor = function (c) {
        this._memory.poke(this._layout.borderColor, c);
    };
    Screen.prototype.getBorderColor = function () {
        return this._memory.peek(this._layout.borderColor);
    };
    Screen.prototype.setGraphicsLayer = function (l) {
        this._memory.poke(this._layout.graphicsLayer, l);
    };
    Screen.prototype.getGraphicsLayer = function () {
        return this._memory.peek(this._layout.graphicsLayer) & 0x87;
    };
    Screen.prototype.setTilePageLayer = function (page, l) {
        var layers = [this._layout.tilePage0Layer,
            this._layout.tilePage1Layer,
            this._layout.tilePage2Layer,
            this._layout.tilePage3Layer];
        this._memory.poke(layers[page], l);
    };
    Screen.prototype.getTilePageLayer = function (page) {
        var layers = [this._layout.tilePage0Layer,
            this._layout.tilePage1Layer,
            this._layout.tilePage2Layer,
            this._layout.tilePage3Layer];
        return this._memory.peek(layers[page]) & 0x87;
    };
    Screen.prototype.setTilePageOffsets = function (page, x, y) {
        var offsetX = [this._layout.tilePage0OffsetX,
            this._layout.tilePage1OffsetX,
            this._layout.tilePage2OffsetX,
            this._layout.tilePage3OffsetX];
        this._memory.poke(offsetX[page], x < 0 ? x + 256 : x);
        this._memory.poke(offsetX[page] + 1, y < 0 ? y + 256 : y);
    };
    Screen.prototype.getTilePageOffsets = function (page) {
        var offsetX = [this._layout.tilePage0OffsetX,
            this._layout.tilePage1OffsetX,
            this._layout.tilePage2OffsetX,
            this._layout.tilePage3OffsetX];
        return [this._memory.peek(offsetX[page]),
            this._memory.peek(offsetX[page] + 1)];
    };
    Screen.prototype.setTilePageCrops = function (page, x, y) {
        var cropX = [this._layout.tilePage0CropX,
            this._layout.tilePage1CropX,
            this._layout.tilePage2CropX,
            this._layout.tilePage3CropX];
        this._memory.poke(cropX[page], x);
        this._memory.poke(cropX[page] + 1, y);
    };
    Screen.prototype.getTilePageCrops = function (page) {
        var cropX = [this._layout.tilePage0CropX,
            this._layout.tilePage1CropX,
            this._layout.tilePage2CropX,
            this._layout.tilePage3CropX];
        return [this._memory.peek(cropX[page]) & 0x3F,
            this._memory.peek(cropX[page] + 1) & 0x3F];
    };
    Screen.prototype.setTilePageSet = function (page, set) {
        var layers = [this._layout.tilePage0Set,
            this._layout.tilePage1Set,
            this._layout.tilePage2Set,
            this._layout.tilePage3Set];
        this._memory.poke(layers[page], set);
    };
    Screen.prototype.getTilePageSet = function (page) {
        var layers = [this._layout.tilePage0Set,
            this._layout.tilePage1Set,
            this._layout.tilePage2Set,
            this._layout.tilePage3Set];
        return this._memory.peek(layers[page]) & 0x03;
    };
    Screen.prototype.setTilePageScale = function (page, scale) {
        var layers = [this._layout.tilePage0Scale,
            this._layout.tilePage1Scale,
            this._layout.tilePage2Scale,
            this._layout.tilePage3Scale];
        this._memory.poke(layers[page], scale);
    };
    Screen.prototype.getTilePageScale = function (page) {
        var layers = [this._layout.tilePage0Scale,
            this._layout.tilePage1Scale,
            this._layout.tilePage2Scale,
            this._layout.tilePage3Scale];
        return this._memory.peek(layers[page]) & 0x0F;
    };
    Screen.prototype.initScreenConfiguration = function () {
        this.setBackgroundColor(0x01); // dark blue
        this.setBorderSize(0x01, 0x01); // 8px on all sides
        this.setBorderColor(0x0A);
        this.setGraphicsLayer(0xFF); // graphics hidden by default;
        for (var page = 0; page < 4; page++) {
            var tilePageBase = this._layout.tilePage0 + (this._layout.tilePageLength * page);
            var tileBGColor = tilePageBase + 0x0400;
            var tileFGColor = tileBGColor + 0x0400;
            for (var idx = 0; idx < 0x0400; idx++) {
                this._memory.poke(tilePageBase + idx, 0);
                this._memory.poke(tileBGColor + idx, 0);
                this._memory.poke(tileFGColor + idx, 0xFF);
            }
            this.setTilePageLayer(page, (page === 0) ? 0x01 : 0xFF); // only tile page 0 is visible by default
            this.setTilePageCrops(page, 0, 0); // no crops
            this.setTilePageOffsets(page, 0, 0); // no offsets
            this.setTilePageScale(page, 0); // no scaling
            this.setTilePageSet(page, 0); // first tile set
        }
    };
    Screen.prototype.setPixel = function (x, y, c) {
        // let addr = (((y * this._width) + x) & 0xFFFF);
        // let addr = ((y * this._width) + x);
        // let addr = (((y << 8) + (y << 6) + x) & 0xFFFF);
        var addr = ((y << 8) + (y << 6) + x);
        this._frame[addr] = c; //this._palette[c] | 0xFF000000;
    };
    /*
    setPixel (x, y, c) {
      let addr = ((y << 8) + (y << 6) + x) << 2;
      let color = this._palette[c];
      this._frameBuf[addr++] = color & 0xFF; color >>= 8;
      this._frameBuf[addr++] = color & 0xFF; color >>= 8;
      this._frameBuf[addr++] = color & 0xFF;
      this._frameBuf[addr]   = 0xFF;
    }
    */
    Screen.prototype.setTile = function (page, row, col, tile, bgColor, fgColor) {
        if (bgColor === void 0) { bgColor = 0x00; }
        if (fgColor === void 0) { fgColor = 0xFF; }
        var baseAddr = this._layout.tilePage0 + (this._layout.tilePageLength * page);
        var tileAddr = baseAddr + (row * this._tileColumns) + col;
        var bgAddr = tileAddr + 0x0400;
        var fgAddr = tileAddr + 0x0800;
        this._memory.poke(tileAddr, tile);
        this._memory.poke(bgAddr, bgColor);
        this._memory.poke(fgAddr, fgColor);
    };
    Screen.prototype.renderBackgroundColorToCanvas = function (palette) {
        var c = this.getBackgroundColor();
        this._frame.fill(palette[c]);
        /*eslint-disable no-var, vars-on-top*/
        //        for (var y = this._height - 1; y !== 0; y--) {
        //            for (var x = this._width - 1; x !== 0; x--) {
        //                this.setPixel(x, y, c);
        //            }
        //        }
        /*eslint-enable no-var, vars-on-top*/
    };
    /*eslint-disable max-depth*/
    Screen.prototype.renderTilePageToCanvasChrome = function (page, palette) {
        /*eslint-disable no-var, vars-on-top*/
        var _a = this.getTilePageCrops(page), cropX = _a[0], cropY = _a[1], cropLeft = cropX, cropLeftMasked = cropLeft & 0xFF8, cropRight = this._width - cropX, cropRightMasked = (cropRight & 0xFF8) + 1, cropTop = cropY, cropTopMasked = cropTop & 0xFF8, cropBottom = this._height - cropY, cropBottomMasked = (cropBottom & 0xFF8) + 1, _b = this.getTilePageOffsets(page), offsetX = _b[0], offsetY = _b[1], scale = this.getTilePageScale(page) & 0x07, tileSet = this.getTilePageSet(page), tileSetBase = tileSet * 16384, tilePageBase = page * 0x1000, tileForegroundColor, tileBackgroundColor, addr, tile, tileSetAddr, tpix, newx, newy, baseX, baseY, shift = 3 + scale;
        offsetX = twosComplement_js_1.default.from8(offsetX);
        offsetY = twosComplement_js_1.default.from8(offsetY);
        // iterate row ---> col over the tile page
        for (var row = this._tileRows - 1; row > -1; row--) {
            // baseY should be the topmost Y position of the tile
            baseY = (row << shift) + offsetY;
            // only paint tiles that have visible portions on screen
            if (baseY >= cropTopMasked && baseY <= cropBottomMasked) {
                for (var col = this._tileColumns - 1; col > -1; col--) {
                    // baseX should indicate the leftmost X position of the tile
                    baseX = (col << shift) + offsetX;
                    // only draw if the tile is visible
                    if (baseX >= cropLeftMasked && baseX <= cropRightMasked) {
                        // addr should indicate the tile page address of the tile
                        addr = (row << 5) + (row << 3) + col + tilePageBase;
                        // get the tile
                        tile = this._tiles[addr];
                        tileSetAddr = tileSetBase + (tile << 6);
                        // get corresponding colors
                        tileBackgroundColor = this._tiles[addr + 0x0400];
                        tileForegroundColor = this._tiles[addr + 0x0800];
                        // next, draw each pixel of the tile
                        for (var y = (8 << scale) - 1; y > -1; y--) {
                            newy = y + baseY;
                            for (var x = (8 << scale) - 1; x > -1; x--) {
                                tpix = this._tilesets[tileSetAddr + (((y >> scale) << 3) + (x >> scale))];
                                if (tpix === 0x00 || tpix === 0xFF) {
                                    tpix = (tpix === 0xFF ? tileForegroundColor : tileBackgroundColor);
                                }
                                if (tpix > 0) {
                                    newx = x + baseX;
                                    if (((newx >= cropLeft) && (newx < cropRight)) &&
                                        ((newy >= cropTop) && (newy < cropBottom))) {
                                        this.setPixel(newx, newy, palette[tpix]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    /*eslint-enable max-depth*/
    Screen.prototype.renderTilePageToCanvasSafari = function (page, palette) {
        /*eslint-disable no-var, vars-on-top*/
        var _a = this.getTilePageCrops(page), cropX = _a[0], cropY = _a[1], cropLeft = cropX, cropRight = this._width - cropX, cropTop = cropY, cropBottom = this._height - cropY, _b = this.getTilePageOffsets(page), offsetX = _b[0], offsetY = _b[1], scale = this.getTilePageScale(page) & 0x07, tileSet = this.getTilePageSet(page), tileSetBase = tileSet * 16384, tilePageBase = page * 0x1000, tileForegroundColor, tileBackgroundColor, addr, tile, tileSetAddr, tpix, newx, newy, shift = 3 + scale, shiftedY, scaledY;
        offsetX = twosComplement_js_1.default.from8(offsetX);
        offsetY = twosComplement_js_1.default.from8(offsetY);
        for (var y = this._height - 1; y > -1; y--) {
            shiftedY = y >> shift;
            scaledY = y >> scale;
            newy = y + offsetY;
            for (var x = this._width - 1; x > -1; x--) {
                // get the tile index
                //addr = ((y >> shift) * this._tileColumns) + (x >> shift);
                addr = (shiftedY << 5) + (shiftedY << 3) + (x >> shift) + tilePageBase;
                tile = this._tiles[addr];
                // get corresponding colors
                tileBackgroundColor = this._tiles[addr + 0x0400];
                tileForegroundColor = this._tiles[addr + 0x0800];
                // get the tile pixel
                tileSetAddr = ((scaledY & 0x07) << 3) + ((x >> scale) & 0x07) + (tile << 6) + tileSetBase;
                tpix = this._tilesets[tileSetAddr];
                if (tpix === 0x00 || tpix === 0xFF) {
                    tpix = (tpix === 0xFF ? tileForegroundColor : tileBackgroundColor);
                }
                newx = x + offsetX;
                if (tpix > 0) {
                    if (((newx >= cropLeft) && (newx < cropRight)) &&
                        ((newy >= cropTop) && (newy < cropBottom))) {
                        this.setPixel(newx, newy, palette[tpix]);
                    }
                }
            }
        }
        /*eslint-enable no-var, vars-on-top*/
    };
    Screen.prototype.renderGraphicsToCanvas = function (palette) {
        var gpix, addr = this._layout.graphicsStart;
        /*eslint-disable no-var, vars-on-top*/
        for (var y = this._height - 1; y > -1; y--) {
            for (var x = this._width - 1; x > -1; x--) {
                addr++;
                gpix = this._memory.peek(addr);
                if (gpix > 0) {
                    this.setPixel(x, y, palette[gpix]);
                }
            }
        }
        /*eslint-enable no-var, vars-on-top*/
    };
    /*
    TODO:
    renderSpriteToCanvas(sprite) {

    }
    */
    Screen.prototype.renderBorderToScreenBorder = function () {
        var borderColor = this.getBorderColor();
        var color = (this._palette[borderColor] | 0xFF000000);
        var b = (color & 0x00FF0000) >> 16;
        var g = (color & 0x0000FF00) >> 8;
        var r = (color & 0x000000FF);
        var css = "rgb(" + r + ", " + g + ", " + b + ")";
        this._screenBorderEl.style.backgroundColor = css;
        this._screen.style.backgroundColor = css;
    };
    Screen.prototype.renderBorderToCanvas = function (palette) {
        var borderColor = this.getBorderColor(), _a = this.getBorderSize(), borderSizeX = _a[0], borderSizeY = _a[1], leftBorder = borderSizeX, rightBorder = this._width - borderSizeX, topBorder = borderSizeY, bottomBorder = this._height - borderSizeY;
        /*eslint-disable no-var, vars-on-top*/
        for (var y = this._height - 1; y > -1; y--) {
            for (var x = this._width - 1; x > -1; x--) {
                if (((x < leftBorder) || (x >= rightBorder)) ||
                    ((y < topBorder) || (y >= bottomBorder))) {
                    this.setPixel(x, y, palette[borderColor]);
                }
            }
        }
        /*eslint-enable no-var, vars-on-top*/
    };
    Screen.prototype.update = function () {
        var layer, palette = [];
        var layers = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
        // background color goes first
        layers[0].push(this.renderBackgroundColorToCanvas.bind(this));
        // next figure out where the tile pages go
        for (var page = 0; page < 4; page++) {
            layer = this.getTilePageLayer(page);
            if (layer < 8) {
                layers[layer].push(this.renderTilePageToCanvas.bind(this, page));
            }
        }
        // then the graphics page
        layer = this.getGraphicsLayer();
        if (layer < 8) {
            layers[layer].push(this.renderGraphicsToCanvas.bind(this));
        }
        // then the sprites
        // TODO
        // then the border
        layers[7].push(this.renderBorderToCanvas.bind(this));
        // generate the current palette
        /* eslint-disable */
        for (var i = 0; i < 256; i++) {
            palette.push(this._palette[i] | 0xFF000000);
        }
        /* eslint-enable */
        // and now composite!
        for (var layerIdx = 0; layerIdx < 8; layerIdx++) {
            var actions = layers[layerIdx];
            for (var actionIdx = 0; actionIdx < actions.length; actionIdx++) {
                actions[actionIdx](palette);
            }
        }
    };
    Screen.prototype.draw = function () {
        this._frameData.data.set(this._frame8);
        this._canvasCtx.putImageData(this._frameData, 0, 0);
        this._screenCtx.drawImage(this._canvas, 0, 0);
        this.renderBorderToScreenBorder();
    };
    return Screen;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Screen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NyZWVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2NyZWVuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4QkFBOEI7QUFDOUIsK0RBQXVEO0FBRXZEO0lBQ0ksZ0JBQVksRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBMEU7WUFBMUUsNEJBQTBFLEVBQXhFLGNBQWMsRUFBZCxtQ0FBYyxFQUFFLGNBQWMsRUFBZCxtQ0FBYyxFQUFFLDZCQUFpQyxFQUFqQyxzREFBaUM7UUFDakcsSUFBSSxLQUFLLEdBQUcsR0FBRyxFQUFFLE1BQU0sR0FBRyxHQUFHLEVBQUUsTUFBTSxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDO1FBRWhFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBRXRCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUUzQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxD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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTYxYTQxYTkxZGNhMGIwMWY4YmU/MzlhNSoiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvaGV4VXRpbHMuanM/NmMzYSoiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvbG9nLmpzP2FjZTEqIiwid2VicGFjazovLy8uLi9jb3JlL01lbW9yeS5qcz83MjlmKiIsIndlYnBhY2s6Ly8vLi4vd29ya2Vycy9TY3JlZW5Xb3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvbWVtb3J5TGF5b3V0LmpzP2YwMmMqIiwid2VicGFjazovLy8uLi91dGlsL3R3b3NDb21wbGVtZW50LmpzPzJkMDUqIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanM/MzY5OCoiLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvU2NyZWVuLmpzPzYxN2EiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ2hFQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQSxnQ0FBZ0MsaUJBQWlCO0FBQ2pELGdDQUFnQyxlQUFlO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGdDQUFnQyxlQUFlO0FBQy9DO0FBQ0EsS0FB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NUQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxtcEI7Ozs7Ozs7QUNoQjNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFDdkM7QUFDQSxvQ0FBb0M7QUFDcEMsMEJBQTBCLFVBQVU7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGNBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0U7QUFDcEUsOENBQThDO0FBQzlDLGdEQUFnRDtBQUNoRCwyQ0FBMkM7QUFDM0MseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUMsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZ0JBQWdCO0FBQ2pELGlDQUFpQyxnQkFBZ0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELFNBQVM7QUFDekQsbURBQW1ELFNBQVM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFVBQVU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsVUFBVTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxRQUFRO0FBQzlEO0FBQ0EsMERBQTBELFFBQVE7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUM7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLFFBQVE7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUMseUNBQXlDLFFBQVE7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxRQUFRO0FBQzlDLHlDQUF5QyxRQUFRO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsVUFBVTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUM7QUFDQSxtQ0FBbUMsNEJBQTRCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSwyQ0FBMkMsdXZ6QiIsImZpbGUiOiJTY3JlZW5Xb3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTYxYTQxYTkxZGNhMGIwMWY4YmUiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgICB0b0hleDogZnVuY3Rpb24gKHYsIGZvcm1hdCwgcHJlZml4KSB7XG4gICAgICAgIGlmIChmb3JtYXQgPT09IHZvaWQgMCkgeyBmb3JtYXQgPSBcIjAwMDBcIjsgfVxuICAgICAgICBpZiAocHJlZml4ID09PSB2b2lkIDApIHsgcHJlZml4ID0gXCIweFwiOyB9XG4gICAgICAgIHZhciBoZXhWYWx1ZSA9ICh2ID09PSB1bmRlZmluZWQgPyBcIjBcIiA6IHYpLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgaGV4VmFsdWUgPSBmb3JtYXQuc3Vic3RyKDAsIGZvcm1hdC5sZW5ndGggLSBoZXhWYWx1ZS5sZW5ndGgpICsgaGV4VmFsdWU7XG4gICAgICAgIHJldHVybiBcIlwiICsgcHJlZml4ICsgaGV4VmFsdWU7XG4gICAgfSxcbiAgICB0b0hleDI6IGZ1bmN0aW9uICh2LCBwcmVmaXgpIHtcbiAgICAgICAgaWYgKHByZWZpeCA9PT0gdm9pZCAwKSB7IHByZWZpeCA9IFwiMHhcIjsgfVxuICAgICAgICByZXR1cm4gdGhpcy50b0hleCh2LCBcIjAwXCIsIHByZWZpeCk7XG4gICAgfSxcbiAgICB0b0hleDQ6IGZ1bmN0aW9uICh2LCBwcmVmaXgpIHtcbiAgICAgICAgaWYgKHByZWZpeCA9PT0gdm9pZCAwKSB7IHByZWZpeCA9IFwiMHhcIjsgfVxuICAgICAgICByZXR1cm4gdGhpcy50b0hleCh2LCBcIjAwMDBcIiwgcHJlZml4KTtcbiAgICB9LFxuICAgIHRvSGV4NTogZnVuY3Rpb24gKHYsIHByZWZpeCkge1xuICAgICAgICBpZiAocHJlZml4ID09PSB2b2lkIDApIHsgcHJlZml4ID0gXCIweFwiOyB9XG4gICAgICAgIHJldHVybiB0aGlzLnRvSGV4KHYsIFwiMDAwMDBcIiwgcHJlZml4KTtcbiAgICB9LFxuICAgIHRvSGV4ODogZnVuY3Rpb24gKHYsIHByZWZpeCkge1xuICAgICAgICBpZiAocHJlZml4ID09PSB2b2lkIDApIHsgcHJlZml4ID0gXCIweFwiOyB9XG4gICAgICAgIHJldHVybiB0aGlzLnRvSGV4KHYsIFwiMDAwMDAwMDBcIiwgcHJlZml4KTtcbiAgICB9LFxuICAgIGJ5dGVBcnJheVRvSGV4OiBmdW5jdGlvbiAoYXJyLCBwcmVmaXgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHByZWZpeCA9PT0gdm9pZCAwKSB7IHByZWZpeCA9IFwiXCI7IH1cbiAgICAgICAgcmV0dXJuIGFyci5tYXAoZnVuY3Rpb24gKGIpIHsgcmV0dXJuIF90aGlzLnRvSGV4MihiLCBwcmVmaXgpOyB9KS5qb2luKFwiIFwiKTtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYUdWNFZYUnBiSE11YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5Sm9aWGhWZEdsc2N5NXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQkxHdENRVUZsTzBsQlExZ3NTMEZCU3l4WlFVRkRMRU5CUVVNc1JVRkJSU3hOUVVGbExFVkJRVVVzVFVGQllUdFJRVUU1UWl4MVFrRkJRU3hGUVVGQkxHVkJRV1U3VVVGQlJTeDFRa0ZCUVN4RlFVRkJMR0ZCUVdFN1VVRkRia01zU1VGQlNTeFJRVUZSTEVkQlFVY3NRMEZCUXl4RFFVRkRMRXRCUVVzc1UwRkJVeXhIUVVGSExFZEJRVWNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03VVVGRGVFUXNVVUZCVVN4SFFVRkhMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eEZRVUZGTEUxQlFVMHNRMEZCUXl4TlFVRk5MRWRCUVVjc1VVRkJVU3hEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEZGQlFWRXNRMEZCUXp0UlFVTjRSU3hOUVVGTkxFTkJRVU1zUzBGQlJ5eE5RVUZOTEVkQlFVY3NVVUZCVlN4RFFVRkRPMGxCUTJ4RExFTkJRVU03U1VGRFJDeE5RVUZOTEZsQlFVTXNRMEZCUXl4RlFVRkZMRTFCUVdFN1VVRkJZaXgxUWtGQlFTeEZRVUZCTEdGQlFXRTdVVUZEYmtJc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWxCUVVrc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF6dEpRVU4yUXl4RFFVRkRPMGxCUTBRc1RVRkJUU3haUVVGRExFTkJRVU1zUlVGQlJTeE5RVUZoTzFGQlFXSXNkVUpCUVVFc1JVRkJRU3hoUVVGaE8xRkJRMjVDTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUlVGQlJTeE5RVUZOTEVWQlFVVXNUVUZCVFN4RFFVRkRMRU5CUVVNN1NVRkRla01zUTBGQlF6dEpRVU5FTEUxQlFVMHNXVUZCUXl4RFFVRkRMRVZCUVVVc1RVRkJZVHRSUVVGaUxIVkNRVUZCTEVWQlFVRXNZVUZCWVR0UlFVTnVRaXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRVZCUVVVc1QwRkJUeXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzBsQlF6RkRMRU5CUVVNN1NVRkRSQ3hOUVVGTkxGbEJRVU1zUTBGQlF5eEZRVUZGTEUxQlFXRTdVVUZCWWl4MVFrRkJRU3hGUVVGQkxHRkJRV0U3VVVGRGJrSXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eEZRVUZGTEZWQlFWVXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVNM1F5eERRVUZETzBsQlEwUXNZMEZCWXl4WlFVRkRMRWRCUVVjc1JVRkJSU3hOUVVGWE8xRkJRUzlDTEdsQ1FVVkRPMUZCUm0xQ0xIVkNRVUZCTEVWQlFVRXNWMEZCVnp0UlFVTXpRaXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4VlFVRkJMRU5CUVVNc1NVRkJTU3hQUVVGQkxFdEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RlFVRkZMRTFCUVUwc1EwRkJReXhGUVVGMFFpeERRVUZ6UWl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzBsQlF6RkVMRU5CUVVNN1EwRkRTaXhEUVVGREluMD1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi91dGlsL2hleFV0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfbG9nID0gW107XG4vKipcbiAqIGxvZyBpbmZvcm1hdGlvbiB0byB0aGUgY29uc29sZSAtLSB3b3JrcyBmb3IgdGhlIGJyb3dzZXIgb3IgaW4gYSBub2RlIGVudmlyb25tZW50XG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJncyAgICAgIGRhdGEgdG8gbG9nXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBsb2coKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIF9sb2cudW5zaGlmdChhcmdzLmpvaW4oXCIgXCIpKTtcbiAgICAgICAgaWYgKF9sb2cubGVuZ3RoID4gMjQpIHtcbiAgICAgICAgICAgIF9sb2cucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dcIikudGV4dENvbnRlbnQgPSBfbG9nLmpvaW4oU3RyaW5nLmZyb21DaGFyQ29kZSgxMykgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDEwKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhhcmdzLmpvaW4oXCIgXCIpKTtcbiAgICB9XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBsb2c7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbmRvdy5sb2cgPSBsb2c7XG59XG5pZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGdsb2JhbC5sb2cgPSBsb2c7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2liRzluTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2liRzluTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRU3hKUVVGSkxFbEJRVWtzUjBGQlJ5eEZRVUZGTEVOQlFVTTdRVUZGWkRzN096czdSMEZMUnp0QlFVTklPMGxCUVRSQ0xHTkJRVTg3VTBGQlVDeFZRVUZQTEVWQlFWQXNjVUpCUVU4c1JVRkJVQ3hKUVVGUE8xRkJRVkFzZVVKQlFVODdPMGxCUXk5Q0xFVkJRVVVzUTBGQlF5eERRVUZETEU5QlFVOHNUVUZCVFN4TFFVRkxMRmRCUVZjc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRGFFTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkROMElzUlVGQlJTeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1IwRkJSeXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzWkNMRWxCUVVrc1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU5ZTEVOQlFVTTdVVUZEUkN4UlFVRlJMRU5CUVVNc1kwRkJZeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEZkQlFWY3NSMEZCUnl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eFpRVUZaTEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1RVRkJUU3hEUVVGRExGbEJRVmtzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUXpsSExFTkJRVU03U1VGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTktMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMmhETEVOQlFVTTdRVUZEVEN4RFFVRkRPenRCUVZaRUxITkNRVlZETzBGQlEwUXNSVUZCUlN4RFFVRkRMRU5CUVVNc1QwRkJUeXhOUVVGTkxFdEJRVXNzVjBGQlZ5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTm9ReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEhRVUZITEVkQlFVY3NRMEZCUXp0QlFVTnlRaXhEUVVGRE8wRkJRMFFzUlVGQlJTeERRVUZETEVOQlFVTXNUMEZCVHl4TlFVRk5MRXRCUVVzc1YwRkJWeXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5vUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhIUVVGSExFZEJRVWNzUTBGQlF6dEJRVU55UWl4RFFVRkRJbjA9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vdXRpbC9sb2cuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8qIGdsb2JhbHMgU2hhcmVkQXJyYXlCdWZmZXIgKi9cblwidXNlIHN0cmljdFwiO1xudmFyIGxvZ19qc18xID0gcmVxdWlyZShcIi4uL3V0aWwvbG9nLmpzXCIpO1xudmFyIGhleFV0aWxzX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9oZXhVdGlscy5qc1wiKTtcbnZhciBNZW1vcnkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1lbW9yeShsYXlvdXQsIF9hKSB7XG4gICAgICAgIHZhciBfYiA9IF9hID09PSB2b2lkIDAgPyB7fSA6IF9hLCBfYyA9IF9iLnNoYXJlZCwgc2hhcmVkID0gX2MgPT09IHZvaWQgMCA/IGZhbHNlIDogX2MsIF9kID0gX2Iud2l0aFNoYXJlZEFycmF5QnVmZmVyLCB3aXRoU2hhcmVkQXJyYXlCdWZmZXIgPSBfZCA9PT0gdm9pZCAwID8gdW5kZWZpbmVkIDogX2Q7XG4gICAgICAgIHRoaXMuX3Byb3RlY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zaGFyZWQgPSBCb29sZWFuKHNoYXJlZCB8fCB3aXRoU2hhcmVkQXJyYXlCdWZmZXIpO1xuICAgICAgICB0aGlzLmxheW91dCA9IGxheW91dDtcbiAgICAgICAgdGhpcy5fYnVmID0gd2l0aFNoYXJlZEFycmF5QnVmZmVyIHx8IG5ldyAoc2hhcmVkID8gU2hhcmVkQXJyYXlCdWZmZXIgOiBBcnJheUJ1ZmZlcikobGF5b3V0LnNpemUgKiAxMDI0KTtcbiAgICAgICAgdGhpcy5fbWVtID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fYnVmKTtcbiAgICAgICAgdGhpcy5fcm9tID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fYnVmLCBsYXlvdXQucm9tU3RhcnQsIGxheW91dC5yb21MZW5ndGgpO1xuICAgICAgICB0aGlzLnJlc2V0U3RhdHMoKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1lbW9yeS5wcm90b3R5cGUsIFwic2hhcmVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2hhcmVkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWVtb3J5LnByb3RvdHlwZSwgXCJzaGFyZWRBcnJheUJ1ZmZlclwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkID8gdGhpcy5fYnVmIDogdW5kZWZpbmVkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWVtb3J5LnByb3RvdHlwZSwgXCJwcm90ZWN0ZWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm90ZWN0ZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb3RlY3RlZCA9IHY7XG4gICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JvbSA9IHRoaXMuY29weUZyb21SYW5nZSh0aGlzLmxheW91dC5yb21TdGFydCwgdGhpcy5sYXlvdXQucm9tTGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgTWVtb3J5LnByb3RvdHlwZS5yZXNldFN0YXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnN0YXRzID0ge1xuICAgICAgICAgICAgcmVhZHNUb3RhbDogMCxcbiAgICAgICAgICAgIGJ5dGVSZWFkc1RvdGFsOiAwLFxuICAgICAgICAgICAgd29yZFJlYWRzVG90YWw6IDAsXG4gICAgICAgICAgICB3cml0ZXNUb3RhbDogMCxcbiAgICAgICAgICAgIGJ5dGVXcml0ZXNUb3RhbDogMCxcbiAgICAgICAgICAgIHdvcmRXcml0ZXNUb3RhbDogMCxcbiAgICAgICAgICAgIGxhc3RSZWFkQWRkcjogMCxcbiAgICAgICAgICAgIGxhc3RXcml0ZUFkZHI6IDAsXG4gICAgICAgICAgICBsYXN0VmFsdWVSZWFkOiAwLFxuICAgICAgICAgICAgbGFzdFZhbHVlV3JpdHRlbjogMCxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE1lbW9yeS5wcm90b3R5cGUuZHVtcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nX2pzXzEuZGVmYXVsdChcIm1lbSBzdGF0cyB8IHJlYWRzICA4OiBcIiArIHRoaXMuc3RhdHMuYnl0ZVJlYWRzVG90YWwgKyBcIiAgMTY6IFwiICsgdGhpcy5zdGF0cy53b3JkUmVhZHNUb3RhbCArIFwiICBBbGw6IFwiICsgdGhpcy5zdGF0cy5yZWFkc1RvdGFsKTtcbiAgICAgICAgbG9nX2pzXzEuZGVmYXVsdChcIm1lbSBzdGF0cyB8IHdyaXRlcyA4OiBcIiArIHRoaXMuc3RhdHMuYnl0ZVdyaXRlc1RvdGFsICsgXCIgIDE2OiBcIiArIHRoaXMuc3RhdHMud29yZFdyaXRlc1RvdGFsICsgXCIgIEFsbDogXCIgKyB0aGlzLnN0YXRzLndyaXRlc1RvdGFsKTtcbiAgICAgICAgbG9nX2pzXzEuZGVmYXVsdChcIm1lbSBzdGF0cyB8IGxhc3QgcmVhZDogXCIgKyBoZXhVdGlsc19qc18xLmRlZmF1bHQudG9IZXg0KHRoaXMuc3RhdHMubGFzdFZhbHVlUmVhZCkgKyBcIkBcIiArIGhleFV0aWxzX2pzXzEuZGVmYXVsdC50b0hleDQodGhpcy5zdGF0cy5sYXN0UmVhZEFkZHIpICsgXCIgIHdyaXRlOiBcIiArIGhleFV0aWxzX2pzXzEuZGVmYXVsdC50b0hleDQodGhpcy5zdGF0cy5sYXN0VmFsdWVXcml0dGVuKSArIFwiQFwiICsgaGV4VXRpbHNfanNfMS5kZWZhdWx0LnRvSGV4NCh0aGlzLnN0YXRzLmxhc3RXcml0ZUFkZHIpKTtcbiAgICB9O1xuICAgIE1lbW9yeS5wcm90b3R5cGUubG9hZEZyb21KUyA9IGZ1bmN0aW9uIChkYXRhLCBhZGRyT3ZlcnJpZGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGFkZHIgPSBkYXRhLmFkZHI7XG4gICAgICAgIGlmIChhZGRyT3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIGFkZHIgPSBhZGRyT3ZlcnJpZGU7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5kYXRhLmZvckVhY2goZnVuY3Rpb24gKHYsIGkpIHtcbiAgICAgICAgICAgIF90aGlzLnBva2UoaSArIGFkZHIsIHYpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qXG4gICAgICBsb2FkRnJvbUJJTihiaW4pIHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgfVxuICAgICovXG4gICAgTWVtb3J5LnByb3RvdHlwZS5wb2tlID0gZnVuY3Rpb24gKGFkZHIsIHZhbCkge1xuICAgICAgICBhZGRyICY9IDB4M0ZGRkY7XG4gICAgICAgIHZhciB2ID0gKHZhbCAmIDB4RkYpO1xuICAgICAgICB0aGlzLl9tZW1bYWRkcl0gPSB2O1xuICAgICAgICAvKlxuICAgICAgICB0aGlzLnN0YXRzLmxhc3RWYWx1ZVdyaXR0ZW4gPSB2O1xuICAgICAgICB0aGlzLnN0YXRzLndyaXRlc1RvdGFsKys7XG4gICAgICAgIHRoaXMuc3RhdHMuYnl0ZVdyaXRlc1RvdGFsKys7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFZhbHVlV3JpdHRlbiA9ICh2YWwgJiAweEZGKTtcbiAgICAgICAgdGhpcy5zdGF0cy5sYXN0V3JpdGVBZGRyID0gYWRkcjtcbiAgICAgICAgKi9cbiAgICB9O1xuICAgIE1lbW9yeS5wcm90b3R5cGUucG9rZTE2ID0gZnVuY3Rpb24gKGFkZHIsIHZhbCkge1xuICAgICAgICBhZGRyICY9IDB4M0ZGRkY7XG4gICAgICAgIHZhciB2ID0gKHZhbCAmIDB4RkZGRik7XG4gICAgICAgIHRoaXMuX21lbVthZGRyXSA9ICh2ICYgMHhGRjAwKSA+PiA4O1xuICAgICAgICB0aGlzLl9tZW1bYWRkciArIDFdID0gKHYgJiAweDAwRkYpO1xuICAgICAgICAvKlxuICAgICAgICB0aGlzLnN0YXRzLndyaXRlc1RvdGFsKys7XG4gICAgICAgIHRoaXMuc3RhdHMud29yZFdyaXRlc1RvdGFsKys7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFZhbHVlV3JpdHRlbiA9IHY7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFdyaXRlQWRkciA9IGFkZHI7XG4gICAgICAgICovXG4gICAgfTtcbiAgICBNZW1vcnkucHJvdG90eXBlLnBva2UzMiA9IGZ1bmN0aW9uIChhZGRyLCB2YWwpIHtcbiAgICAgICAgYWRkciAmPSAweDNGRkZGO1xuICAgICAgICB2YXIgdiA9ICh2YWwgJiAweEZGRkZGRkZGKTtcbiAgICAgICAgdGhpcy5fbWVtW2FkZHJdID0gKHYgJiAweEZGMDAwMDAwKSA+PiAyNDtcbiAgICAgICAgdGhpcy5fbWVtW2FkZHIgKyAxXSA9ICh2ICYgMHgwMEZGMDAwMCkgPj4gMTY7XG4gICAgICAgIHRoaXMuX21lbVthZGRyICsgMl0gPSAodiAmIDB4MDAwMEZGMDApID4+IDg7XG4gICAgICAgIHRoaXMuX21lbVthZGRyICsgM10gPSAodiAmIDB4MDAwMDAwRkYpO1xuICAgICAgICAvKlxuICAgICAgICB0aGlzLnN0YXRzLndyaXRlc1RvdGFsKys7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFZhbHVlV3JpdHRlbiA9IHY7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFdyaXRlQWRkciA9IGFkZHI7XG4gICAgICAgICovXG4gICAgfTtcbiAgICBNZW1vcnkucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiAoYWRkcikge1xuICAgICAgICBhZGRyICY9IDB4M0ZGRkY7XG4gICAgICAgIHZhciB2ID0gdGhpcy5fbWVtW2FkZHJdO1xuICAgICAgICBpZiAodGhpcy5fcHJvdGVjdGVkKSB7XG4gICAgICAgICAgICBpZiAoYWRkciA+PSB0aGlzLmxheW91dC5yb21TdGFydCAmJiBhZGRyIDw9IHRoaXMubGF5b3V0LnJvbUVuZCkge1xuICAgICAgICAgICAgICAgIHYgPSB0aGlzLl9yb21bYWRkciAtIHRoaXMubGF5b3V0LnJvbVN0YXJ0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKlxuICAgICAgICB0aGlzLnN0YXRzLnJlYWRzVG90YWwrKztcbiAgICAgICAgdGhpcy5zdGF0cy5ieXRlUmVhZHNUb3RhbCsrO1xuICAgICAgICB0aGlzLnN0YXRzLmxhc3RWYWx1ZVJlYWQgPSB2O1xuICAgICAgICB0aGlzLnN0YXRzLmxhc3RSZWFkQWRkciA9IGFkZHI7XG4gICAgICAgICovXG4gICAgICAgIHJldHVybiB2O1xuICAgIH07XG4gICAgTWVtb3J5LnByb3RvdHlwZS5wZWVrMTYgPSBmdW5jdGlvbiAoYWRkcikge1xuICAgICAgICBhZGRyICY9IDB4M0ZGRkY7XG4gICAgICAgIHZhciB2ID0gKHRoaXMucGVlayhhZGRyKSA8PCA4KSB8IHRoaXMucGVlayhhZGRyICsgMSk7XG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuc3RhdHMucmVhZHNUb3RhbCsrO1xuICAgICAgICB0aGlzLnN0YXRzLndvcmRSZWFkc1RvdGFsKys7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFZhbHVlUmVhZCA9IHY7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFJlYWRBZGRyID0gYWRkcjtcbiAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfTtcbiAgICBNZW1vcnkucHJvdG90eXBlLnBlZWszMiA9IGZ1bmN0aW9uIChhZGRyKSB7XG4gICAgICAgIGFkZHIgJj0gMHgzRkZGRjtcbiAgICAgICAgdmFyIHYgPSAodGhpcy5wZWVrKGFkZHIpIDw8IDI0KSB8ICh0aGlzLnBlZWsoYWRkciArIDEpIDw8IDE2KSB8ICh0aGlzLnBlZWsoYWRkciArIDIpIDw8IDgpIHwgKHRoaXMucGVlayhhZGRyICsgMykpO1xuICAgICAgICAvKlxuICAgICAgICB0aGlzLnN0YXRzLnJlYWRzVG90YWwrKztcbiAgICAgICAgdGhpcy5zdGF0cy53b3JkUmVhZHNUb3RhbCsrO1xuICAgICAgICB0aGlzLnN0YXRzLmxhc3RWYWx1ZVJlYWQgPSB2O1xuICAgICAgICB0aGlzLnN0YXRzLmxhc3RSZWFkQWRkciA9IGFkZHI7XG4gICAgICAgICovXG4gICAgICAgIHJldHVybiB2O1xuICAgIH07XG4gICAgTWVtb3J5LnByb3RvdHlwZS5yYW5nZSA9IGZ1bmN0aW9uIChhZGRyLCBsZW4pIHtcbiAgICAgICAgaWYgKGFkZHIgKyBsZW4gPD0gdGhpcy5sYXlvdXQubWVtdG9wKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodGhpcy5fYnVmLCBhZGRyLCBsZW4pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIG92ZXJmbG93ID0gKGFkZHIgKyBsZW4pIC0gdGhpcy5sYXlvdXQubWVtdG9wO1xuICAgICAgICAgICAgbGVuIC09IG92ZXJmbG93O1xuICAgICAgICAgICAgaWYgKGxlbiA8IDApIHtcbiAgICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHRoaXMuX2J1ZiwgYWRkciwgbGVuKTsgLy8uY29uY2F0KHRoaXMuY29weUZyb21SYW5nZSgwLCBvdmVyZmxvdykpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNZW1vcnkucHJvdG90eXBlLmNvcHlGcm9tUmFuZ2UgPSBmdW5jdGlvbiAoYWRkciwgbGVuKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LmZyb20odGhpcy5yYW5nZShhZGRyLCBsZW4pKTtcbiAgICB9O1xuICAgIE1lbW9yeS5wcm90b3R5cGUuY29weVdpdGhpbiA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8ge30gOiBfYSwgc3JjID0gX2Iuc3JjLCBkZXN0ID0gX2IuZGVzdCwgbGVuID0gX2IubGVuO1xuICAgICAgICBpZiAoc3JjICsgbGVuID4gdGhpcy5sYXlvdXQubWVtdG9wIHx8XG4gICAgICAgICAgICBkZXN0ICsgbGVuID4gdGhpcy5sYXlvdXQubWVtdG9wKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWVtLmNvcHlXaXRoaW4oZGVzdCwgc3JjLCBzcmMgKyBsZW4pO1xuICAgIH07XG4gICAgTWVtb3J5LnByb3RvdHlwZS5maWxsV2l0aGluID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBfYiA9IF9hID09PSB2b2lkIDAgPyB7fSA6IF9hLCB2YWx1ZSA9IF9iLnZhbHVlLCBhZGRyID0gX2IuYWRkciwgbGVuID0gX2IubGVuO1xuICAgICAgICBpZiAobGVuICsgYWRkciA+IHRoaXMubGF5b3V0Lm1lbXRvcCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21lbS5maWxsKHZhbHVlICYgMHhGRiwgYWRkciwgYWRkciArIGxlbik7XG4gICAgfTtcbiAgICBNZW1vcnkucHJvdG90eXBlLnNldFdpdGhpbiA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8ge30gOiBfYSwgZGF0YSA9IF9iLmRhdGEsIGFkZHIgPSBfYi5hZGRyO1xuICAgICAgICBpZiAoYWRkciArIChkYXRhLmxlbmd0aCkgPiB0aGlzLmxheW91dC5tZW10b3ApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tZW0uc2V0KGRhdGEsIGFkZHIpO1xuICAgIH07XG4gICAgTWVtb3J5LnByb3RvdHlwZS5yYW5nZTMyID0gZnVuY3Rpb24gKGFkZHIsIGxlbikge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQzMkFycmF5KHRoaXMuX2J1ZiwgYWRkciwgbGVuKTtcbiAgICB9O1xuICAgIE1lbW9yeS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5wcm90ZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAodGhpcy5sYXlvdXQuc2l6ZSAqIDEwMjQpOyBpKyspIHtcbiAgICAgICAgICAgIC8vIHNpbXVsYXRlIG9sZC1zdHlsZSBtZW1vcnkgYmVpbmcgcmFuZG9tIGF0IGJvb3RcbiAgICAgICAgICAgIHRoaXMucG9rZShpLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB3ZSBuZWVkIHRocmVlIFJFVHMgYXQga25vd24gaW1wb3J0YW50IHZlY3RvcnNcbiAgICAgICAgWzB4MEZFMDAsIDB4MEZGMDAsIDB4MEZGRkZdLmZvckVhY2goZnVuY3Rpb24gKGFkZHIpIHtcbiAgICAgICAgICAgIF90aGlzLnBva2UoYWRkciwgMHhGRik7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBBbGwgdHJhcCB2ZWN0b3JzIGluaXRpYWxseSBwb2ludCBhdCAweEZGRkZcbiAgICAgICAgZm9yICh2YXIgYWRkciA9IDA7IGFkZHIgPCA1MTI7IGFkZHIrKykge1xuICAgICAgICAgICAgdGhpcy5wb2tlKGFkZHIsIDB4RkYpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGJ1dCB3ZSBkbyBuZWVkIGEgdmFsaWQgRlJBTUUgYW5kIFJFU0VUIHZlY3RvclxuICAgICAgICB0aGlzLnBva2UxNigweDAwMDAwLCAweEZGMDApO1xuICAgICAgICB0aGlzLnBva2UxNigweDAwMUUwLCAweEZFMDApO1xuICAgICAgICAvLyBsb2FkaW5nIGJvb3QgUk9NIGlzIHRoZSByZXNwb25zaWJpbGl0eSBvZiBvdXIgb3duZXIuXG4gICAgfTtcbiAgICByZXR1cm4gTWVtb3J5O1xufSgpKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IE1lbW9yeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVRXVnRiM0o1TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lUV1Z0YjNKNUxtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCTEN0Q1FVRXJRanM3UVVGRkwwSXNlVU5CUVdsRE8wRkJRMnBETEcxRVFVRXlRenRCUVVVelF6dEpRVU5GTEdkQ1FVRlpMRTFCUVUwc1JVRkJSU3hGUVVFd1JEdFpRVUV4UkN3MFFrRkJNRVFzUlVGQmVFUXNZMEZCWXl4RlFVRmtMRzFEUVVGakxFVkJRVVVzTmtKQlFXbERMRVZCUVdwRExITkVRVUZwUXp0UlFVTnlSU3hKUVVGSkxFTkJRVU1zVlVGQlZTeEhRVUZITEV0QlFVc3NRMEZCUXp0UlFVTjRRaXhKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEU5QlFVOHNRMEZCUXl4TlFVRk5MRWxCUVVrc2NVSkJRWEZDTEVOQlFVTXNRMEZCUXp0UlFVTjRSQ3hKUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEUxQlFVMHNRMEZCUXp0UlFVTnlRaXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEhGQ1FVRnhRaXhKUVVGSkxFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NhVUpCUVdsQ0xFZEJRVWNzVjBGQlZ5eERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU40Unl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFbEJRVWtzVlVGQlZTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOMFF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWxCUVVrc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNUVUZCVFN4RFFVRkRMRkZCUVZFc1JVRkJSU3hOUVVGTkxFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdVVUZEZWtVc1NVRkJTU3hEUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETzBsQlEzQkNMRU5CUVVNN1NVRkZSQ3h6UWtGQlNTd3dRa0ZCVFR0aFFVRldPMWxCUTBVc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTTdVVUZEZEVJc1EwRkJRenM3TzA5QlFVRTdTVUZGUkN4elFrRkJTU3h4UTBGQmFVSTdZVUZCY2tJN1dVRkRSU3hOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNSMEZCUnl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExGTkJRVk1zUTBGQlF6dFJRVU0zUXl4RFFVRkRPenM3VDBGQlFUdEpRVVZFTEhOQ1FVRkpMRFpDUVVGVE8yRkJRV0k3V1VGRFJTeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJRenRSUVVONlFpeERRVUZETzJGQlJVUXNWVUZCWXl4RFFVRkRPMWxCUTJJc1NVRkJTU3hEUVVGRExGVkJRVlVzUjBGQlJ5eERRVUZETEVOQlFVTTdXVUZEY0VJc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRUaXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4aFFVRmhMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eFJRVUZSTEVWQlFVVXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dFpRVU01UlN4RFFVRkRPMUZCUTBnc1EwRkJRenM3TzA5QlVFRTdTVUZUUkN3eVFrRkJWU3hIUVVGV08xRkJRMFVzU1VGQlNTeERRVUZETEV0QlFVc3NSMEZCUnp0WlFVTllMRlZCUVZVc1JVRkJSU3hEUVVGRE8xbEJRMklzWTBGQll5eEZRVUZGTEVOQlFVTTdXVUZEYWtJc1kwRkJZeXhGUVVGRkxFTkJRVU03V1VGRGFrSXNWMEZCVnl4RlFVRkZMRU5CUVVNN1dVRkRaQ3hsUVVGbExFVkJRVVVzUTBGQlF6dFpRVU5zUWl4bFFVRmxMRVZCUVVVc1EwRkJRenRaUVVOc1FpeFpRVUZaTEVWQlFVVXNRMEZCUXp0WlFVTm1MR0ZCUVdFc1JVRkJSU3hEUVVGRE8xbEJRMmhDTEdGQlFXRXNSVUZCUlN4RFFVRkRPMWxCUTJoQ0xHZENRVUZuUWl4RlFVRkZMRU5CUVVNN1UwRkRjRUlzUTBGQlF6dEpRVU5LTEVOQlFVTTdTVUZGUkN4eFFrRkJTU3hIUVVGS08xRkJRMFVzWjBKQlFVY3NRMEZCUXl3eVFrRkJlVUlzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4alFVRmpMR05CUVZNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eGpRVUZqTEdWQlFWVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhWUVVGWkxFTkJRVU1zUTBGQlF6dFJRVU16U0N4blFrRkJSeXhEUVVGRExESkNRVUY1UWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExHVkJRV1VzWTBGQlV5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMR1ZCUVdVc1pVRkJWU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZkQlFXRXNRMEZCUXl4RFFVRkRPMUZCUXpsSUxHZENRVUZITEVOQlFVTXNORUpCUVRCQ0xIRkNRVUZSTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zWVVGQllTeERRVUZETEZOQlFVa3NjVUpCUVZFc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WlFVRlpMRU5CUVVNc2FVSkJRVmtzY1VKQlFWRXNRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhUUVVGSkxIRkNRVUZSTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zWVVGQllTeERRVUZITEVOQlFVTXNRMEZCUXp0SlFVTTVUaXhEUVVGRE8wbEJSVVFzTWtKQlFWVXNSMEZCVml4VlFVRlhMRWxCUVVrc1JVRkJSU3haUVVGWk8xRkJRVGRDTEdsQ1FWRkRPMUZCVUVNc1NVRkJTU3hKUVVGSkxFZEJRVWNzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXp0UlFVTnlRaXhGUVVGRkxFTkJRVU1zUTBGQlF5eFpRVUZaTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTJwQ0xFbEJRVWtzUjBGQlJ5eFpRVUZaTEVOQlFVTTdVVUZEZEVJc1EwRkJRenRSUVVORUxFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRlZCUVVNc1EwRkJReXhGUVVGRkxFTkJRVU03V1VGRGNrSXNTMEZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFZEJRVWNzU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTNwQ0xFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEwd3NRMEZCUXp0SlFVVkVPenM3TzAxQlNVVTdTVUZGUml4eFFrRkJTU3hIUVVGS0xGVkJRVXNzU1VGQlNTeEZRVUZGTEVkQlFVYzdVVUZEV2l4SlFVRkpMRWxCUVVrc1QwRkJUeXhEUVVGRE8xRkJRMmhDTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhIUVVGSExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEzSkNMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUlhCQ096czdPenM3VlVGTlJUdEpRVU5LTEVOQlFVTTdTVUZGUkN4MVFrRkJUU3hIUVVGT0xGVkJRVThzU1VGQlNTeEZRVUZGTEVkQlFVYzdVVUZEWkN4SlFVRkpMRWxCUVVrc1QwRkJUeXhEUVVGRE8xRkJRMmhDTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhIUVVGSExFMUJRVTBzUTBGQlF5eERRVUZETzFGQlEzWkNMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWRCUVVjc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEzQkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhIUVVGSExFMUJRVTBzUTBGQlF5eERRVUZETzFGQlJXNURPenM3T3p0VlFVdEZPMGxCUTBvc1EwRkJRenRKUVVWRUxIVkNRVUZOTEVkQlFVNHNWVUZCVHl4SlFVRkpMRVZCUVVVc1IwRkJSenRSUVVOa0xFbEJRVWtzU1VGQlNTeFBRVUZQTEVOQlFVTTdVVUZEYUVJc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVkQlFVY3NWVUZCVlN4RFFVRkRMRU5CUVVNN1VVRkRNMElzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUjBGQlJ5eFZRVUZWTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNN1VVRkRla01zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVkQlFVY3NWVUZCVlN4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRE8xRkJRemRETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRkhMRlZCUVZVc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU0xUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUjBGQlJ5eERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1IwRkJSeXhWUVVGVkxFTkJRVU1zUTBGQlF6dFJRVVYyUXpzN096dFZRVWxGTzBsQlEwb3NRMEZCUXp0SlFVZEVMSEZDUVVGSkxFZEJRVW9zVlVGQlN5eEpRVUZKTzFGQlExQXNTVUZCU1N4SlFVRkpMRTlCUVU4c1EwRkJRenRSUVVOb1FpeEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEzaENMRVZCUVVVc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNCQ0xFVkJRVVVzUTBGQlF5eERRVUZETEVsQlFVa3NTVUZCU1N4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExGRkJRVkVzU1VGQlNTeEpRVUZKTEVsQlFVa3NTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTXZSQ3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0WlFVTTNReXhEUVVGRE8xRkJRMGdzUTBGQlF6dFJRVVZFT3pzN096dFZRVXRGTzFGQlJVWXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOWUxFTkJRVU03U1VGRlJDeDFRa0ZCVFN4SFFVRk9MRlZCUVU4c1NVRkJTVHRSUVVOVUxFbEJRVWtzU1VGQlNTeFBRVUZQTEVOQlFVTTdVVUZEYUVJc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlJYSkVPenM3T3p0VlFVdEZPMUZCUlVZc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5ZTEVOQlFVTTdTVUZGUkN4MVFrRkJUU3hIUVVGT0xGVkJRVThzU1VGQlNUdFJRVU5VTEVsQlFVa3NTVUZCU1N4UFFVRlBMRU5CUVVNN1VVRkRhRUlzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkZia2c3T3pzN08xVkJTMFU3VVVGRlJpeE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFnc1EwRkJRenRKUVVWRUxITkNRVUZMTEVkQlFVd3NWVUZCVFN4SlFVRkpMRVZCUVVVc1IwRkJSenRSUVVOaUxFVkJRVVVzUTBGQlF5eERRVUZETEVsQlFVa3NSMEZCUnl4SFFVRkhMRWxCUVVrc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNKRExFMUJRVTBzUTBGQlF5eEpRVUZKTEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFbEJRVWtzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVTTVReXhEUVVGRE8xRkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZEVGl4SlFVRkpMRkZCUVZFc1IwRkJSeXhEUVVGRExFbEJRVWtzUjBGQlJ5eEhRVUZITEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF6dFpRVU5xUkN4SFFVRkhMRWxCUVVrc1VVRkJVU3hEUVVGRE8xbEJRMmhDTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWRCUVVjc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVRkRMRWRCUVVjc1IwRkJSeXhEUVVGRExFTkJRVU03V1VGQlF5eERRVUZETzFsQlEzcENMRTFCUVUwc1EwRkJReXhKUVVGSkxGVkJRVlVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRWxCUVVrc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETERKRFFVRXlRenRSUVVNeFJpeERRVUZETzBsQlEwZ3NRMEZCUXp0SlFVVkVMRGhDUVVGaExFZEJRV0lzVlVGQll5eEpRVUZKTEVWQlFVVXNSMEZCUnp0UlFVTnlRaXhOUVVGTkxFTkJRVU1zVlVGQlZTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTJoRUxFTkJRVU03U1VGRlJDd3lRa0ZCVlN4SFFVRldMRlZCUVZjc1JVRkJkVUk3V1VGQmRrSXNORUpCUVhWQ0xFVkJRWEpDTEZsQlFVY3NSVUZCUlN4alFVRkpMRVZCUVVVc1dVRkJSenRSUVVONlFpeEZRVUZGTEVOQlFVTXNRMEZCUXl4SFFVRkhMRWRCUVVjc1IwRkJSeXhIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNUVUZCVFR0WlFVTm9ReXhKUVVGSkxFZEJRVWNzUjBGQlJ5eEhRVUZITEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5zUXl4TlFVRk5MRU5CUVVNN1VVRkRWQ3hEUVVGRE8xRkJRMFFzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1NVRkJTU3hGUVVGRkxFZEJRVWNzUlVGQlJTeEhRVUZITEVkQlFVY3NSMEZCUnl4RFFVRkRMRU5CUVVNN1NVRkROME1zUTBGQlF6dEpRVVZFTERKQ1FVRlZMRWRCUVZZc1ZVRkJWeXhGUVVGNVFqdFpRVUY2UWl3MFFrRkJlVUlzUlVGQmRrSXNaMEpCUVVzc1JVRkJSU3hqUVVGSkxFVkJRVVVzV1VGQlJ6dFJRVU16UWl4RlFVRkZMRU5CUVVNc1EwRkJReXhIUVVGSExFZEJRVWNzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU53UXl4TlFVRk5MRU5CUVVNN1VVRkRWQ3hEUVVGRE8xRkJRMFFzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhIUVVGSExFbEJRVWtzUlVGQlJTeEpRVUZKTEVWQlFVVXNTVUZCU1N4SFFVRkhMRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJRMnBFTEVOQlFVTTdTVUZGUkN3d1FrRkJVeXhIUVVGVUxGVkJRVlVzUlVGQmJVSTdXVUZCYmtJc05FSkJRVzFDTEVWQlFXcENMR05CUVVrc1JVRkJSU3hqUVVGSk8xRkJRM0JDTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZET1VNc1RVRkJUU3hEUVVGRE8xRkJRMVFzUTBGQlF6dFJRVU5FTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTTFRaXhEUVVGRE8wbEJSVVFzZDBKQlFVOHNSMEZCVUN4VlFVRlJMRWxCUVVrc1JVRkJSU3hIUVVGSE8xRkJRMllzVFVGQlRTeERRVUZETEVsQlFVa3NWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzU1VGQlNTeEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCUXk5RExFTkJRVU03U1VGRlJDeHhRa0ZCU1N4SFFVRktPMUZCUVVFc2FVSkJkVUpETzFGQmRFSkRMRWxCUVVrc1EwRkJReXhUUVVGVExFZEJRVWNzUzBGQlN5eERRVUZETzFGQlEzWkNMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1JVRkJSU3hEUVVGRExFVkJRVVVzUlVGQlJTeERRVUZETzFsQlEyNUVMR2xFUVVGcFJEdFpRVU5xUkN4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVVzUjBGQlJ5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTJoRUxFTkJRVU03VVVGRlJDeG5SRUZCWjBRN1VVRkRhRVFzUTBGQlF5eFBRVUZQTEVWQlFVVXNUMEZCVHl4RlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eFZRVUZETEVsQlFVazdXVUZEZGtNc1MwRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRlRUlzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZGU0N3MlEwRkJOa003VVVGRE4wTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hKUVVGSkxFZEJRVWNzUTBGQlF5eEZRVUZGTEVsQlFVa3NSMEZCUnl4SFFVRkhMRVZCUVVVc1NVRkJTU3hGUVVGRkxFVkJRVVVzUTBGQlF6dFpRVU4wUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTjRRaXhEUVVGRE8xRkJSVVFzWjBSQlFXZEVPMUZCUTJoRUxFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNUMEZCVHl4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRE8xRkJRemRDTEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1QwRkJUeXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzFGQlJUZENMSFZFUVVGMVJEdEpRVVY2UkN4RFFVRkRPMGxCYlVKSUxHRkJRVU03UVVGQlJDeERRVUZETEVGQmFsQkVMRWxCYVZCREluMD1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9jb3JlL01lbW9yeS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiBnbG9iYWxzIHNlbGYgKi9cbnZhciBTY3JlZW5fanNfMSA9IHJlcXVpcmUoXCIuLi9jb3JlL1NjcmVlbi5qc1wiKTtcbnZhciBNZW1vcnlfanNfMSA9IHJlcXVpcmUoXCIuLi9jb3JlL01lbW9yeS5qc1wiKTtcbnZhciBtZW1vcnlMYXlvdXRfanNfMSA9IHJlcXVpcmUoXCIuLi9jb3JlL21lbW9yeUxheW91dC5qc1wiKTtcbnZhciBTY3JlZW5Xb3JrZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNjcmVlbldvcmtlcigpIHtcbiAgICAgICAgdGhpcy5zY3JlZW4gPSBuZXcgU2NyZWVuX2pzXzEuZGVmYXVsdChudWxsLCBudWxsLCBudWxsLCB7XG4gICAgICAgICAgICB3b3JrZXI6IHRydWUsXG4gICAgICAgICAgICBzaGFyZWQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFNjcmVlbldvcmtlci5wcm90b3R5cGUuc2V0U2hhcmVkTWVtb3J5ID0gZnVuY3Rpb24gKHNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgICAgIHRoaXMuc2NyZWVuLl9tZW1vcnkgPSBuZXcgTWVtb3J5X2pzXzEuZGVmYXVsdChtZW1vcnlMYXlvdXRfanNfMS5kZWZhdWx0LCB7XG4gICAgICAgICAgICBzaGFyZWQ6IHRydWUsXG4gICAgICAgICAgICB3aXRoU2hhcmVkQXJyYXlCdWZmZXI6IHNoYXJlZEFycmF5QnVmZmVyXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNjcmVlbi5fbGF5b3V0ID0gbWVtb3J5TGF5b3V0X2pzXzEuZGVmYXVsdDtcbiAgICB9O1xuICAgIFNjcmVlbldvcmtlci5wcm90b3R5cGUuc2V0U2hhcmVkRnJhbWVCdWZmZXIgPSBmdW5jdGlvbiAoc2hhcmVkQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgdGhpcy5zY3JlZW4uc2V0U2hhcmVkQXJyYXlCdWZmZXIoc2hhcmVkQXJyYXlCdWZmZXIpO1xuICAgIH07XG4gICAgU2NyZWVuV29ya2VyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNjcmVlbi5pbml0KCk7XG4gICAgfTtcbiAgICBTY3JlZW5Xb3JrZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChfLCBwb3N0TWVzc2FnZSkge1xuICAgICAgICB0aGlzLnNjcmVlbi51cGRhdGUoKTtcbiAgICAgICAgcG9zdE1lc3NhZ2UoeyBjbWQ6IFwidXBkYXRlZFwiIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFNjcmVlbldvcmtlcjtcbn0oKSk7XG52YXIgc2NyZWVuV29ya2VyID0gbmV3IFNjcmVlbldvcmtlcigpO1xuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBjbWQgPSBlLmRhdGEuY21kO1xuICAgIHZhciBkYXRhID0gZS5kYXRhLmRhdGE7XG4gICAgaWYgKHNjcmVlbldvcmtlcltjbWRdKSB7XG4gICAgICAgIHNjcmVlbldvcmtlcltjbWRdKGRhdGEsIHNlbGYucG9zdE1lc3NhZ2UpO1xuICAgIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVTJOeVpXVnVWMjl5YTJWeUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpVTJOeVpXVnVWMjl5YTJWeUxtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVN4clFrRkJhMEk3UVVGRGJFSXNLME5CUVhWRE8wRkJRM1pETEN0RFFVRjFRenRCUVVWMlF5d3lSRUZCYlVRN1FVRkZia1E3U1VGRFNUdFJRVU5KTEVsQlFVa3NRMEZCUXl4TlFVRk5MRWRCUVVjc1NVRkJTU3h0UWtGQlRTeERRVUZETEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVVc1NVRkJTU3hGUVVGRk8xbEJRM1pETEUxQlFVMHNSVUZCUlN4SlFVRkpPMWxCUTFvc1RVRkJUU3hGUVVGRkxFbEJRVWs3VTBGRFppeERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRPMGxCUlVRc2MwTkJRV1VzUjBGQlppeFZRVUZuUWl4cFFrRkJhVUk3VVVGRE4wSXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFZEJRVWNzU1VGQlNTeHRRa0ZCVFN4RFFVRkRMSGxDUVVGWkxFVkJRVVU3V1VGRE0wTXNUVUZCVFN4RlFVRkZMRWxCUVVrN1dVRkRXaXh4UWtGQmNVSXNSVUZCUlN4cFFrRkJhVUk3VTBGRE0wTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eFBRVUZQTEVkQlFVY3NlVUpCUVZrc1EwRkJRenRKUVVOMlF5eERRVUZETzBsQlJVUXNNa05CUVc5Q0xFZEJRWEJDTEZWQlFYRkNMR2xDUVVGcFFqdFJRVU5zUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExHOUNRVUZ2UWl4RFFVRkRMR2xDUVVGcFFpeERRVUZETEVOQlFVTTdTVUZEZUVRc1EwRkJRenRKUVVWRUxESkNRVUZKTEVkQlFVbzdVVUZEU1N4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETzBsQlEzWkNMRU5CUVVNN1NVRkZSQ3cyUWtGQlRTeEhRVUZPTEZWQlFVOHNRMEZCUXl4RlFVRkZMRmRCUVZjN1VVRkRha0lzU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJRenRSUVVOeVFpeFhRVUZYTEVOQlFVTXNSVUZCUlN4SFFVRkhMRVZCUVVVc1UwRkJVeXhGUVVGRkxFTkJRVU1zUTBGQlF6dEpRVU53UXl4RFFVRkRPMGxCUTB3c2JVSkJRVU03UVVGQlJDeERRVUZETEVGQk5VSkVMRWxCTkVKRE8wRkJSVVFzU1VGQlRTeFpRVUZaTEVkQlFVY3NTVUZCU1N4WlFVRlpMRVZCUVVVc1EwRkJRenRCUVVONFF5eEpRVUZKTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zVTBGQlV5eEZRVUZGTEZWQlFVTXNRMEZCUXp0SlFVTXZRaXhKUVVGTkxFZEJRVWNzUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJRenRKUVVOMlFpeEpRVUZOTEVsQlFVa3NSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF6dEpRVU42UWl4RlFVRkZMRU5CUVVNc1EwRkJReXhaUVVGWkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTNCQ0xGbEJRVmtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eERRVUZETzBsQlF6bERMRU5CUVVNN1FVRkRUQ3hEUVVGRExFTkJRVU1zUTBGQlF5SjlcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi93b3JrZXJzL1NjcmVlbldvcmtlci5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuZXhwb3J0cy5tZW1vcnlMYXlvdXQgPSB7XG4gICAgc2l6ZTogMjU2LFxuICAgIG1lbWxlbjogMHg0MDAwMCxcbiAgICBtZW10b3A6IDB4M0ZGRkYsXG4gICAgc3ByaXRlQ291bnQ6IDE2LFxuICAgIHNwcml0ZTBIZWlnaHQ6IDB4MzQwQTAsXG4gICAgc3ByaXRlMFdpZHRoOiAweDM0MDkwLFxuICAgIHNwcml0ZTBUaWxlOiAweDM0MDgwLFxuICAgIHNwcml0ZTBUaWxlU2V0OiAweDM0MDcwLFxuICAgIHNwcml0ZTBGR0NvbG9yOiAweDM0MDYwLFxuICAgIHNwcml0ZTBCR0NvbG9yOiAweDM0MDUwLFxuICAgIHNwcml0ZTBTY2FsZTogMHgzNDA0MCxcbiAgICBzcHJpdGUwWVBvc2l0aW9uOiAweDM0MDMwLFxuICAgIHNwcml0ZTBYUG9zaXRpb246IDB4MzQwMTAsXG4gICAgc3ByaXRlMExheWVyOiAweDM0MDAwLFxuICAgIHNwcml0ZVN0YXJ0OiAweDM0MDAwLFxuICAgIHRpbGVQYWdlc0xlbmd0aDogMHgwNDAwMCxcbiAgICB0aWxlUGFnZUxlbmd0aDogMHgwMTAwMCxcbiAgICB0aWxlUGFnZTNMYXllcjogMHgzM0ZGRiAvLyAwIC0gNyA9IHZpc2libGUgYXQgbGF5ZXIsIDB4RkYvLTEgPSBub3QgdmlzaWJsZVxuICAgICxcbiAgICB0aWxlUGFnZTNPZmZzZXRZOiAweDMzRkZFIC8vIHNpZ25lZCBZIG9mZnNldCBmb3Igc21vb3RoIHNjcm9sbGluZ1xuICAgICxcbiAgICB0aWxlUGFnZTNPZmZzZXRYOiAweDMzRkZEIC8vIHNpZ25lZCBYIG9mZnNldCBmb3Igc21vb3RoIHNjcm9sbGluZ1xuICAgICxcbiAgICB0aWxlUGFnZTNTZXQ6IDB4MzNGRkMgLy8gMCAtIDMsIHdoaWNoIHRpbGVzZXQgdG8gdXNlXG4gICAgLFxuICAgIHRpbGVQYWdlM1NjYWxlOiAweDMzRkZCIC8vIDAgPSAxeDEgcGl4ZWwsIDEgPSAyeDIgcGl4ZWxcbiAgICAsXG4gICAgdGlsZVBhZ2UzQ3JvcFk6IDB4MzNGRkEgLy8gaGVpZ2h0IG9mIGFyZWEgdG8gaWdub3JlIHdoZW4gY29tcG9zaXRpbmcgKGJvcmRlcilcbiAgICAsXG4gICAgdGlsZVBhZ2UzQ3JvcFg6IDB4MzNGRjkgLy8gd2lkdGggb2YgYXJlYSB0byBpZ25vcmUgd2hlbiBjb21wb3NpdGluZyAoYm9yZGVyKVxuICAgICxcbiAgICB0aWxlUGFnZTNGR0NvbG9yOiAweDMzODAwLFxuICAgIHRpbGVQYWdlM0JHQ29sb3I6IDB4MzM0MDAsXG4gICAgdGlsZVBhZ2UzOiAweDMzMDAwLFxuICAgIHRpbGVQYWdlMkxheWVyOiAweDMyRkZGIC8vIDAgLSA3ID0gdmlzaWJsZSBhdCBsYXllciwgMHhGRi8tMSA9IG5vdCB2aXNpYmxlXG4gICAgLFxuICAgIHRpbGVQYWdlMk9mZnNldFk6IDB4MzJGRkUgLy8gc2lnbmVkIFkgb2Zmc2V0IGZvciBzbW9vdGggc2Nyb2xsaW5nXG4gICAgLFxuICAgIHRpbGVQYWdlMk9mZnNldFg6IDB4MzJGRkQgLy8gc2lnbmVkIFggb2Zmc2V0IGZvciBzbW9vdGggc2Nyb2xsaW5nXG4gICAgLFxuICAgIHRpbGVQYWdlMlNldDogMHgzMkZGQyAvLyAwIC0gMywgd2hpY2ggdGlsZXNldCB0byB1c2VcbiAgICAsXG4gICAgdGlsZVBhZ2UyU2NhbGU6IDB4MzJGRkIgLy8gMCA9IDF4MSBwaXhlbCwgMSA9IDJ4MiBwaXhlbFxuICAgICxcbiAgICB0aWxlUGFnZTJDcm9wWTogMHgzMkZGQSAvLyBoZWlnaHQgb2YgYXJlYSB0byBpZ25vcmUgd2hlbiBjb21wb3NpdGluZyAoYm9yZGVyKVxuICAgICxcbiAgICB0aWxlUGFnZTJDcm9wWDogMHgzMkZGOSAvLyB3aWR0aCBvZiBhcmVhIHRvIGlnbm9yZSB3aGVuIGNvbXBvc2l0aW5nIChib3JkZXIpXG4gICAgLFxuICAgIHRpbGVQYWdlMkZHQ29sb3I6IDB4MzI4MDAsXG4gICAgdGlsZVBhZ2UyQkdDb2xvcjogMHgzMjQwMCxcbiAgICB0aWxlUGFnZTI6IDB4MzIwMDAsXG4gICAgdGlsZVBhZ2UxTGF5ZXI6IDB4MzFGRkYgLy8gMCAtIDcgPSB2aXNpYmxlIGF0IGxheWVyLCAweEZGLy0xID0gbm90IHZpc2libGVcbiAgICAsXG4gICAgdGlsZVBhZ2UxT2Zmc2V0WTogMHgzMUZGRSAvLyBzaWduZWQgWSBvZmZzZXQgZm9yIHNtb290aCBzY3JvbGxpbmdcbiAgICAsXG4gICAgdGlsZVBhZ2UxT2Zmc2V0WDogMHgzMUZGRCAvLyBzaWduZWQgWCBvZmZzZXQgZm9yIHNtb290aCBzY3JvbGxpbmdcbiAgICAsXG4gICAgdGlsZVBhZ2UxU2V0OiAweDMxRkZDIC8vIDAgLSAzLCB3aGljaCB0aWxlc2V0IHRvIHVzZVxuICAgICxcbiAgICB0aWxlUGFnZTFTY2FsZTogMHgzMUZGQiAvLyAwID0gMXgxIHBpeGVsLCAxID0gMngyIHBpeGVsXG4gICAgLFxuICAgIHRpbGVQYWdlMUNyb3BZOiAweDMxRkZBIC8vIGhlaWdodCBvZiBhcmVhIHRvIGlnbm9yZSB3aGVuIGNvbXBvc2l0aW5nIChib3JkZXIpXG4gICAgLFxuICAgIHRpbGVQYWdlMUNyb3BYOiAweDMxRkY5IC8vIHdpZHRoIG9mIGFyZWEgdG8gaWdub3JlIHdoZW4gY29tcG9zaXRpbmcgKGJvcmRlcilcbiAgICAsXG4gICAgdGlsZVBhZ2UxRkdDb2xvcjogMHgzMTgwMCxcbiAgICB0aWxlUGFnZTFCR0NvbG9yOiAweDMxNDAwLFxuICAgIHRpbGVQYWdlMTogMHgzMTAwMCxcbiAgICB0aWxlUGFnZTBMYXllcjogMHgzMEZGRiAvLyAwIC0gNyA9IHZpc2libGUgYXQgbGF5ZXIsIDB4RkYvLTEgPSBub3QgdmlzaWJsZVxuICAgICxcbiAgICB0aWxlUGFnZTBPZmZzZXRZOiAweDMwRkZFIC8vIHNpZ25lZCBZIG9mZnNldCBmb3Igc21vb3RoIHNjcm9sbGluZ1xuICAgICxcbiAgICB0aWxlUGFnZTBPZmZzZXRYOiAweDMwRkZEIC8vIHNpZ25lZCBYIG9mZnNldCBmb3Igc21vb3RoIHNjcm9sbGluZ1xuICAgICxcbiAgICB0aWxlUGFnZTBTZXQ6IDB4MzBGRkMgLy8gMCAtIDMsIHdoaWNoIHRpbGVzZXQgdG8gdXNlXG4gICAgLFxuICAgIHRpbGVQYWdlMFNjYWxlOiAweDMwRkZCIC8vIDAgPSAxeDEgcGl4ZWwsIDEgPSAyeDIgcGl4ZWxcbiAgICAsXG4gICAgdGlsZVBhZ2UwQ3JvcFk6IDB4MzBGRkEgLy8gaGVpZ2h0IG9mIGFyZWEgdG8gaWdub3JlIHdoZW4gY29tcG9zaXRpbmcgKGJvcmRlcilcbiAgICAsXG4gICAgdGlsZVBhZ2UwQ3JvcFg6IDB4MzBGRjkgLy8gd2lkdGggb2YgYXJlYSB0byBpZ25vcmUgd2hlbiBjb21wb3NpdGluZyAoYm9yZGVyKVxuICAgICxcbiAgICB0aWxlUGFnZTBGR0NvbG9yOiAweDMwODAwLFxuICAgIHRpbGVQYWdlMEJHQ29sb3I6IDB4MzA0MDAsXG4gICAgdGlsZVBhZ2UwOiAweDMwMDAwLFxuICAgIHRpbGVQYWdlc1N0YXJ0OiAweDMwMDAwLFxuICAgIHRpbGVTZXRzTGVuZ3RoOiA2NTUzNixcbiAgICB0aWxlU2V0TGVuZ3RoOiAxNjM4NCxcbiAgICB0aWxlU2V0MzogMHgyQzAwMCAvLyB0aWxlc2V0IDNcbiAgICAsXG4gICAgdGlsZVNldDI6IDB4MjgwMDAgLy8gdGlsZXNldCAyXG4gICAgLFxuICAgIHRpbGVTZXQxOiAweDI0MDAwIC8vIHRpbGVzZXQgMVxuICAgICxcbiAgICB0aWxlU2V0MDogMHgyMDAwMCAvLyAxNksgMjU2IDh4OCB0aWxlc2V0IDBcbiAgICAsXG4gICAgdGlsZVNldHNTdGFydDogMHgyMDAwMCxcbiAgICBwYWxldHRlTGVuZ3RoOiAxMDI0LFxuICAgIHBhbGV0dGVMZW5ndGgzMjogMjU2LFxuICAgIHBhbGV0dGVTdGFydDogMHgxRkMwMCAvLyAyNTYgeCA0IGJ5dGVzXG4gICAgLFxuICAgIGJhY2tncm91bmRDb2xvcjogMHgxRkEwQiAvLyBiYWNrZ3JvdW5kIGNvbG9yIGZvciBzY3JlZW5cbiAgICAsXG4gICAgYm9yZGVyU2l6ZVk6IDB4MUZBMDYgLy8gaGVpZ2h0IG9mIHZlcnRpY2FsIGJvcmRlciBpbiBweFxuICAgICxcbiAgICBib3JkZXJTaXplWDogMHgxRkEwNSAvLyB3aWR0aCBvZiBob3Jpem9udGFsIGJvcmRlciBpbiBweFxuICAgICxcbiAgICBib3JkZXJDb2xvcjogMHgxRkEwNCAvLyBCb3JkZXIgQ29sb3JcbiAgICAsXG4gICAgZ3JhcGhpY3NMYXllcjogMHgxRkEwMiAvLyAwIC0gNywgZ3JhcGhpY2EgbGF5ZXI7IEZGID0gbm8gZGlzcGxheVxuICAgICxcbiAgICBzY3JlZW5Db25maWdMZW5ndGg6IDI1NixcbiAgICBzY3JlZW5Db25maWdTdGFydDogMHgxRkEwMCxcbiAgICBncmFwaGljc0xlbmd0aDogNjQwMDAsXG4gICAgZ3JhcGhpY3NTdGFydDogMHgxMDAwMCAvLyAzMjAgeCAyMDAgKDY0MDAwKSBieXRlc1xuICAgICxcbiAgICByb21MZW5ndGg6IDB4MDQwMDAgLy8gbGVuZ3RoIG9mIHJvbVxuICAgICxcbiAgICByb21FbmQ6IDB4MEZGRkYgLy8gRW5kIG9mIFJPTVxuICAgICxcbiAgICByb21TdGFydDogMHgwQzAwMCAvLyBTdGFydCBvZiBST01cbiAgICAsXG4gICAgY29kZVN0YXJ0OiAweDAxMDAwIC8vIFN0YXJ0IG9mIGNvZGUgZXhlY3V0aW9uXG4gICAgLFxuICAgIHN0YWNrVG9wOiAweDAwRkZGIC8vIHRvcCBvZiBzdGFjayAoZ3Jvd3MgZG93bilcbiAgICAsXG4gICAgc3RhY2tNYXg6IDB4MDA0MDAgLy8gYm90dG9tIG9mIHN0YWNrXG4gICAgLFxuICAgIHRyYXBSZXNldDogMHgwMDAwMCAvLyBqdW1wIHRvIGluc3RydWN0aW9uIHdoZW4gcmVzZXRcbiAgICAsXG4gICAgdHJhcHM6IDB4MDAwMDAgLy8gMjU2IDItYnl0ZSBsb25nIHBvaW50ZXJzOyBlbmRzIDB4MDAxRkZcbiAgICAsXG4gICAgbWVtYm90OiAweDAwMDAwXG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5tZW1vcnlMYXlvdXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2liV1Z0YjNKNVRHRjViM1YwTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2liV1Z0YjNKNVRHRjViM1YwTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRU3h2UWtGQmIwSTdRVUZEVkN4UlFVRkJMRmxCUVZrc1IwRkJSenRKUVVONFFpeEpRVUZKTEVWQlFXbENMRWRCUVVjN1NVRkRlRUlzVFVGQlRTeEZRVUZYTEU5QlFVODdTVUZEZUVJc1RVRkJUU3hGUVVGWExFOUJRVTg3U1VGRGVFSXNWMEZCVnl4RlFVRlhMRVZCUVVVN1NVRkRlRUlzWVVGQllTeEZRVUZKTEU5QlFVODdTVUZEZUVJc1dVRkJXU3hGUVVGTExFOUJRVTg3U1VGRGVFSXNWMEZCVnl4RlFVRk5MRTlCUVU4N1NVRkRlRUlzWTBGQll5eEZRVUZITEU5QlFVODdTVUZEZUVJc1kwRkJZeXhGUVVGSExFOUJRVTg3U1VGRGVFSXNZMEZCWXl4RlFVRkhMRTlCUVU4N1NVRkRlRUlzV1VGQldTeEZRVUZMTEU5QlFVODdTVUZEZUVJc1owSkJRV2RDTEVWQlFVTXNUMEZCVHp0SlFVTjRRaXhuUWtGQlowSXNSVUZCUXl4UFFVRlBPMGxCUTNoQ0xGbEJRVmtzUlVGQlN5eFBRVUZQTzBsQlEzaENMRmRCUVZjc1JVRkJUU3hQUVVGUE8wbEJRM2hDTEdWQlFXVXNSVUZCUlN4UFFVRlBPMGxCUTNoQ0xHTkJRV01zUlVGQlJ5eFBRVUZQTzBsQlEzaENMR05CUVdNc1JVRkJSeXhQUVVGUExFTkJRVVVzYTBSQlFXdEVPenRKUVVNMVJTeG5Ra0ZCWjBJc1JVRkJReXhQUVVGUExFTkJRVVVzZFVOQlFYVkRPenRKUVVOcVJTeG5Ra0ZCWjBJc1JVRkJReXhQUVVGUExFTkJRVVVzZFVOQlFYVkRPenRKUVVOcVJTeFpRVUZaTEVWQlFVc3NUMEZCVHl4RFFVRkZMRGhDUVVFNFFqczdTVUZEZUVRc1kwRkJZeXhGUVVGSExFOUJRVThzUTBGQlJTd3JRa0ZCSzBJN08wbEJRM3BFTEdOQlFXTXNSVUZCUnl4UFFVRlBMRU5CUVVVc2NVUkJRWEZFT3p0SlFVTXZSU3hqUVVGakxFVkJRVWNzVDBGQlR5eERRVUZGTEc5RVFVRnZSRHM3U1VGRE9VVXNaMEpCUVdkQ0xFVkJRVU1zVDBGQlR6dEpRVU40UWl4blFrRkJaMElzUlVGQlF5eFBRVUZQTzBsQlEzaENMRk5CUVZNc1JVRkJVU3hQUVVGUE8wbEJRM2hDTEdOQlFXTXNSVUZCUnl4UFFVRlBMRU5CUVVVc2EwUkJRV3RFT3p0SlFVTTFSU3huUWtGQlowSXNSVUZCUXl4UFFVRlBMRU5CUVVVc2RVTkJRWFZET3p0SlFVTnFSU3huUWtGQlowSXNSVUZCUXl4UFFVRlBMRU5CUVVVc2RVTkJRWFZET3p0SlFVTnFSU3haUVVGWkxFVkJRVXNzVDBGQlR5eERRVUZGTERoQ1FVRTRRanM3U1VGRGVFUXNZMEZCWXl4RlFVRkhMRTlCUVU4c1EwRkJSU3dyUWtGQkswSTdPMGxCUTNwRUxHTkJRV01zUlVGQlJ5eFBRVUZQTEVOQlFVVXNjVVJCUVhGRU96dEpRVU12UlN4alFVRmpMRVZCUVVjc1QwRkJUeXhEUVVGRkxHOUVRVUZ2UkRzN1NVRkRPVVVzWjBKQlFXZENMRVZCUVVNc1QwRkJUenRKUVVONFFpeG5Ra0ZCWjBJc1JVRkJReXhQUVVGUE8wbEJRM2hDTEZOQlFWTXNSVUZCVVN4UFFVRlBPMGxCUTNoQ0xHTkJRV01zUlVGQlJ5eFBRVUZQTEVOQlFVVXNhMFJCUVd0RU96dEpRVU0xUlN4blFrRkJaMElzUlVGQlF5eFBRVUZQTEVOQlFVVXNkVU5CUVhWRE96dEpRVU5xUlN4blFrRkJaMElzUlVGQlF5eFBRVUZQTEVOQlFVVXNkVU5CUVhWRE96dEpRVU5xUlN4WlFVRlpMRVZCUVVzc1QwRkJUeXhEUVVGRkxEaENRVUU0UWpzN1NVRkRlRVFzWTBGQll5eEZRVUZITEU5QlFVOHNRMEZCUlN3clFrRkJLMEk3TzBsQlEzcEVMR05CUVdNc1JVRkJSeXhQUVVGUExFTkJRVVVzY1VSQlFYRkVPenRKUVVNdlJTeGpRVUZqTEVWQlFVY3NUMEZCVHl4RFFVRkZMRzlFUVVGdlJEczdTVUZET1VVc1owSkJRV2RDTEVWQlFVTXNUMEZCVHp0SlFVTjRRaXhuUWtGQlowSXNSVUZCUXl4UFFVRlBPMGxCUTNoQ0xGTkJRVk1zUlVGQlVTeFBRVUZQTzBsQlEzaENMR05CUVdNc1JVRkJSeXhQUVVGUExFTkJRVVVzYTBSQlFXdEVPenRKUVVNMVJTeG5Ra0ZCWjBJc1JVRkJReXhQUVVGUExFTkJRVVVzZFVOQlFYVkRPenRKUVVOcVJTeG5Ra0ZCWjBJc1JVRkJReXhQUVVGUExFTkJRVVVzZFVOQlFYVkRPenRKUVVOcVJTeFpRVUZaTEVWQlFVc3NUMEZCVHl4RFFVRkZMRGhDUVVFNFFqczdTVUZEZUVRc1kwRkJZeXhGUVVGSExFOUJRVThzUTBGQlJTd3JRa0ZCSzBJN08wbEJRM3BFTEdOQlFXTXNSVUZCUnl4UFFVRlBMRU5CUVVVc2NVUkJRWEZFT3p0SlFVTXZSU3hqUVVGakxFVkJRVWNzVDBGQlR5eERRVUZGTEc5RVFVRnZSRHM3U1VGRE9VVXNaMEpCUVdkQ0xFVkJRVU1zVDBGQlR6dEpRVU40UWl4blFrRkJaMElzUlVGQlF5eFBRVUZQTzBsQlEzaENMRk5CUVZNc1JVRkJVU3hQUVVGUE8wbEJRM2hDTEdOQlFXTXNSVUZCUnl4UFFVRlBPMGxCUTNoQ0xHTkJRV01zUlVGQlN5eExRVUZMTzBsQlEzaENMR0ZCUVdFc1JVRkJUU3hMUVVGTE8wbEJRM2hDTEZGQlFWRXNSVUZCVXl4UFFVRlBMRU5CUVVVc1dVRkJXVHM3U1VGRGRFTXNVVUZCVVN4RlFVRlRMRTlCUVU4c1EwRkJSU3haUVVGWk96dEpRVU4wUXl4UlFVRlJMRVZCUVZNc1QwRkJUeXhEUVVGRkxGbEJRVms3TzBsQlEzUkRMRkZCUVZFc1JVRkJVeXhQUVVGUExFTkJRVVVzZDBKQlFYZENPenRKUVVOc1JDeGhRVUZoTEVWQlFVa3NUMEZCVHp0SlFVTjRRaXhoUVVGaExFVkJRVThzU1VGQlNUdEpRVU40UWl4bFFVRmxMRVZCUVUwc1IwRkJSenRKUVVONFFpeFpRVUZaTEVWQlFVc3NUMEZCVHl4RFFVRkZMR2RDUVVGblFqczdTVUZETVVNc1pVRkJaU3hGUVVGRkxFOUJRVThzUTBGQlJTdzRRa0ZCT0VJN08wbEJTM2hFTEZkQlFWY3NSVUZCVFN4UFFVRlBMRU5CUVVVc2EwTkJRV3RET3p0SlFVTTFSQ3hYUVVGWExFVkJRVTBzVDBGQlR5eERRVUZGTEcxRFFVRnRRenM3U1VGRE4wUXNWMEZCVnl4RlFVRk5MRTlCUVU4c1EwRkJSU3hsUVVGbE96dEpRVVY2UXl4aFFVRmhMRVZCUVVrc1QwRkJUeXhEUVVGRkxIbERRVUY1UXpzN1NVRk5ia1VzYTBKQlFXdENMRVZCUVVjc1IwRkJSenRKUVVONFFpeHBRa0ZCYVVJc1JVRkJReXhQUVVGUE8wbEJRM3BDTEdOQlFXTXNSVUZCU3l4TFFVRkxPMGxCUTNoQ0xHRkJRV0VzUlVGQlNTeFBRVUZQTEVOQlFVVXNNRUpCUVRCQ096dEpRVU53UkN4VFFVRlRMRVZCUVZFc1QwRkJUeXhEUVVGRkxHZENRVUZuUWpzN1NVRkRNVU1zVFVGQlRTeEZRVUZYTEU5QlFVOHNRMEZCUlN4aFFVRmhPenRKUVVOMlF5eFJRVUZSTEVWQlFWTXNUMEZCVHl4RFFVRkZMR1ZCUVdVN08wbEJRM3BETEZOQlFWTXNSVUZCVVN4UFFVRlBMRU5CUVVVc01FSkJRVEJDT3p0SlFVTndSQ3hSUVVGUkxFVkJRVk1zVDBGQlR5eERRVUZGTERSQ1FVRTBRanM3U1VGRGRFUXNVVUZCVVN4RlFVRlRMRTlCUVU4c1EwRkJSU3hyUWtGQmEwSTdPMGxCUXpWRExGTkJRVk1zUlVGQlVTeFBRVUZQTEVOQlFVVXNhVU5CUVdsRE96dEpRVVV6UkN4TFFVRkxMRVZCUVZrc1QwRkJUeXhEUVVGRkxIbERRVUY1UXpzN1NVRkRia1VzVFVGQlRTeEZRVUZYTEU5QlFVODdRMEZEZWtJc1EwRkJRenM3UVVGRlJpeHJRa0ZCWlN4dlFrRkJXU3hEUVVGREluMD1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9jb3JlL21lbW9yeUxheW91dC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gICAgZnJvbTg6IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiAtKG4gJiAweDgwKSArIChuICYgMHg3Rik7XG4gICAgfSxcbiAgICBmcm9tMTY6IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiAtKG4gJiAweDgwMDApICsgKG4gJiAweDdGRkYpO1xuICAgIH0sXG4gICAgdG84OiBmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbiAmIDB4RkY7XG4gICAgfSxcbiAgICB0bzE2OiBmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbiAmIDB4RkZGRjtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEhkdmMwTnZiWEJzWlcxbGJuUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lKMGQyOXpRMjl0Y0d4bGJXVnVkQzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJMR3RDUVVGbE8wbEJRMWdzUzBGQlN5eFpRVUZETEVOQlFVTTdVVUZEU0N4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU53UXl4RFFVRkRPMGxCUTBRc1RVRkJUU3haUVVGRExFTkJRVU03VVVGRFNpeE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSMEZCUnl4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVONFF5eERRVUZETzBsQlEwUXNSMEZCUnl4WlFVRkRMRU5CUVVNN1VVRkRSQ3hOUVVGTkxFTkJRVU1zUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXp0SlFVTndRaXhEUVVGRE8wbEJRMFFzU1VGQlNTeFpRVUZETEVOQlFVTTdVVUZEUml4TlFVRk5MRU5CUVVNc1EwRkJReXhIUVVGSExFMUJRVTBzUTBGQlF6dEpRVU4wUWl4RFFVRkRPME5CUTBvc1EwRkJRU0o5XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vdXRpbC90d29zQ29tcGxlbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJcInVzZSBzdHJpY3RcIjtcbi8qIGdsb2JhbCBTaGFyZWRBcnJheUJ1ZmZlciAqL1xudmFyIHR3b3NDb21wbGVtZW50X2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC90d29zQ29tcGxlbWVudC5qc1wiKTtcbnZhciBTY3JlZW4gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNjcmVlbihpZCwgYm9yZGVySWQsIG1lbW9yeSwgX2EpIHtcbiAgICAgICAgdmFyIF9iID0gX2EgPT09IHZvaWQgMCA/IHt9IDogX2EsIF9jID0gX2Iud29ya2VyLCB3b3JrZXIgPSBfYyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfYywgX2QgPSBfYi5zaGFyZWQsIHNoYXJlZCA9IF9kID09PSB2b2lkIDAgPyBmYWxzZSA6IF9kLCBfZSA9IF9iLndpdGhTaGFyZWRBcnJheUJ1ZmZlciwgd2l0aFNoYXJlZEFycmF5QnVmZmVyID0gX2UgPT09IHZvaWQgMCA/IHVuZGVmaW5lZCA6IF9lO1xuICAgICAgICB2YXIgd2lkdGggPSAzMjAsIGhlaWdodCA9IDIwMCwgbGF5b3V0ID0gbWVtb3J5ICYmIG1lbW9yeS5sYXlvdXQ7XG4gICAgICAgIHRoaXMuX3NoYXJlZCA9IEJvb2xlYW4oc2hhcmVkIHx8IHdpdGhTaGFyZWRBcnJheUJ1ZmZlcik7XG4gICAgICAgIHRoaXMuX3dvcmtlciA9IHdvcmtlcjtcbiAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLl90aWxlV2lkdGggPSA4O1xuICAgICAgICB0aGlzLl90aWxlSGVpZ2h0ID0gODtcbiAgICAgICAgdGhpcy5fdGlsZUNvbHVtbnMgPSB3aWR0aCAvIHRoaXMuX3RpbGVXaWR0aDtcbiAgICAgICAgdGhpcy5fdGlsZVJvd3MgPSBoZWlnaHQgLyB0aGlzLl90aWxlSGVpZ2h0O1xuICAgICAgICBpZiAoIXdvcmtlcikge1xuICAgICAgICAgICAgdGhpcy5fc2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICAgICAgdGhpcy5fc2NyZWVuLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHdpZHRoKTtcbiAgICAgICAgICAgIHRoaXMuX3NjcmVlbi5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuX3NjcmVlbkN0eCA9IHRoaXMuX3NjcmVlbi5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHdpZHRoKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhc0N0eCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICB0aGlzLl9zY3JlZW5Cb3JkZXJFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJvcmRlcklkKTtcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lRGF0YSA9IHRoaXMuX2NhbnZhc0N0eC5jcmVhdGVJbWFnZURhdGEod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWVtb3J5ID0gbWVtb3J5O1xuICAgICAgICB0aGlzLl9sYXlvdXQgPSBsYXlvdXQ7XG4gICAgICAgIC8vIHdlIGFsc28gbmVlZCB0aGUgMzItYml0IGFycmF5IHRoYXQgdGhlIGNhbnZhcyB3aWxsIHVzZVxuICAgICAgICBpZiAod2l0aFNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9mcmFtZUJ1ZmZlciA9IHdpdGhTaGFyZWRBcnJheUJ1ZmZlcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghd29ya2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnJhbWVCdWYgPSBuZXcgKHNoYXJlZCA/IFNoYXJlZEFycmF5QnVmZmVyIDogQXJyYXlCdWZmZXIpKHRoaXMuX2ZyYW1lRGF0YS5kYXRhLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSBuZXcgVWludDMyQXJyYXkodGhpcy5fZnJhbWVCdWYpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lOCA9IG5ldyBVaW50OEFycmF5KHRoaXMuX2ZyYW1lQnVmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzb21lIHRoaW5ncyBkZXBlbmQgdXBvbiBvdXIgYnJvd3NlclxuICAgICAgICB0aGlzLnJlbmRlclRpbGVQYWdlVG9DYW52YXMgPSB0aGlzLnJlbmRlclRpbGVQYWdlVG9DYW52YXNTYWZhcmk7XG4gICAgICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJjaHJvbWVcIikgPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGlsZVBhZ2VUb0NhbnZhcyA9IHRoaXMucmVuZGVyVGlsZVBhZ2VUb0NhbnZhc0Nocm9tZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgdXAgb3VyIGluaXRpYWwgdmFsdWVzXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBTY3JlZW4ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtZW1vcnkgPSB0aGlzLl9tZW1vcnk7XG4gICAgICAgIHZhciBsYXlvdXQgPSB0aGlzLl9sYXlvdXQ7XG4gICAgICAgIGlmIChtZW1vcnkpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhbGV0dGUgPSBtZW1vcnkucmFuZ2UzMihsYXlvdXQucGFsZXR0ZVN0YXJ0LCBsYXlvdXQucGFsZXR0ZUxlbmd0aDMyKTtcbiAgICAgICAgICAgIC8vIHRpbGVzZXRzXG4gICAgICAgICAgICB0aGlzLl90aWxlc2V0cyA9IG1lbW9yeS5yYW5nZShsYXlvdXQudGlsZVNldHNTdGFydCwgbGF5b3V0LnRpbGVTZXRzTGVuZ3RoKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbGVzID0gbWVtb3J5LnJhbmdlKGxheW91dC50aWxlUGFnZXNTdGFydCwgbGF5b3V0LnRpbGVQYWdlc0xlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTY3JlZW4ucHJvdG90eXBlLCBcInNoYXJlZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NoYXJlZDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNjcmVlbi5wcm90b3R5cGUsIFwic2hhcmVkQXJyYXlCdWZmZXJcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNoYXJlZCA/IHRoaXMuX2ZyYW1lQnVmIDogbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgU2NyZWVuLnByb3RvdHlwZS5zZXRTaGFyZWRBcnJheUJ1ZmZlciA9IGZ1bmN0aW9uIChzaGFyZWRBcnJheUJ1ZmZlcikge1xuICAgICAgICB0aGlzLl9mcmFtZUJ1ZiA9IHNoYXJlZEFycmF5QnVmZmVyO1xuICAgICAgICB0aGlzLl9mcmFtZSA9IG5ldyBVaW50MzJBcnJheSh0aGlzLl9mcmFtZUJ1Zik7XG4gICAgICAgIHRoaXMuX2ZyYW1lOCA9IG5ldyBVaW50OEFycmF5KHRoaXMuX2ZyYW1lQnVmKTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuc2V0UGFsZXR0ZUVudHJ5ID0gZnVuY3Rpb24gKGlkeCwgciwgZywgYikge1xuICAgICAgICB2YXIgYWRkciA9IHRoaXMuX2xheW91dC5wYWxldHRlU3RhcnQgKyAoaWR4IDw8IDIpO1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZShhZGRyICsgMywgMHhGRik7XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKGFkZHIgKyAyLCBiKTtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UoYWRkciArIDEsIGcpO1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZShhZGRyICsgMCwgcik7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLmdldFBhbGV0dGVFbnRyeSA9IGZ1bmN0aW9uIChpZHgpIHtcbiAgICAgICAgdmFyIGFkZHIgPSB0aGlzLl9sYXlvdXQucGFsZXR0ZVN0YXJ0ICsgKGlkeCA8PCAyKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHI6IHRoaXMuX21lbW9yeS5wZWVrKGFkZHIpLFxuICAgICAgICAgICAgZzogdGhpcy5fbWVtb3J5LnBlZWsoYWRkciArIDEpLFxuICAgICAgICAgICAgYjogdGhpcy5fbWVtb3J5LnBlZWsoYWRkciArIDIpXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLmluaXRQYWxldHRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgciwgZywgYiwgbSwgbWEgPSBbMCwgMTI4LCAxOTIsIDI1NV07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICAgICAgICAgIG0gPSBtYVsoKChpICYgMHhDMCkgPj4gNikpXTtcbiAgICAgICAgICAgIHIgPSBtYVsoKGkgJiAweDMwKSA+PiA0KV0gfHwgbTtcbiAgICAgICAgICAgIGcgPSBtYVsoKGkgJiAweDBDKSA+PiAyKV0gfHwgbTtcbiAgICAgICAgICAgIGIgPSBtYVsoKGkgJiAweDAzKSA+PiAwKV0gfHwgbTtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFsZXR0ZUVudHJ5KGksIHIsIGcsIGIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnNldEJhY2tncm91bmRDb2xvciA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKHRoaXMuX2xheW91dC5iYWNrZ3JvdW5kQ29sb3IsIGMpO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5nZXRCYWNrZ3JvdW5kQ29sb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZW1vcnkucGVlayh0aGlzLl9sYXlvdXQuYmFja2dyb3VuZENvbG9yKTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuc2V0Qm9yZGVyU2l6ZSA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKHRoaXMuX2xheW91dC5ib3JkZXJTaXplWCwgeCk7XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKHRoaXMuX2xheW91dC5ib3JkZXJTaXplWSwgeSk7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLmdldEJvcmRlclNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5fbWVtb3J5LnBlZWsodGhpcy5fbGF5b3V0LmJvcmRlclNpemVYKSAmIDB4M0YsXG4gICAgICAgICAgICB0aGlzLl9tZW1vcnkucGVlayh0aGlzLl9sYXlvdXQuYm9yZGVyU2l6ZVkpICYgMHgzRl07XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnNldEJvcmRlckNvbG9yID0gZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UodGhpcy5fbGF5b3V0LmJvcmRlckNvbG9yLCBjKTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuZ2V0Qm9yZGVyQ29sb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZW1vcnkucGVlayh0aGlzLl9sYXlvdXQuYm9yZGVyQ29sb3IpO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5zZXRHcmFwaGljc0xheWVyID0gZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UodGhpcy5fbGF5b3V0LmdyYXBoaWNzTGF5ZXIsIGwpO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5nZXRHcmFwaGljc0xheWVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVtb3J5LnBlZWsodGhpcy5fbGF5b3V0LmdyYXBoaWNzTGF5ZXIpICYgMHg4NztcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuc2V0VGlsZVBhZ2VMYXllciA9IGZ1bmN0aW9uIChwYWdlLCBsKSB7XG4gICAgICAgIHZhciBsYXllcnMgPSBbdGhpcy5fbGF5b3V0LnRpbGVQYWdlMExheWVyLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMUxheWVyLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMkxheWVyLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlM0xheWVyXTtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UobGF5ZXJzW3BhZ2VdLCBsKTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuZ2V0VGlsZVBhZ2VMYXllciA9IGZ1bmN0aW9uIChwYWdlKSB7XG4gICAgICAgIHZhciBsYXllcnMgPSBbdGhpcy5fbGF5b3V0LnRpbGVQYWdlMExheWVyLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMUxheWVyLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMkxheWVyLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlM0xheWVyXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lbW9yeS5wZWVrKGxheWVyc1twYWdlXSkgJiAweDg3O1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5zZXRUaWxlUGFnZU9mZnNldHMgPSBmdW5jdGlvbiAocGFnZSwgeCwgeSkge1xuICAgICAgICB2YXIgb2Zmc2V0WCA9IFt0aGlzLl9sYXlvdXQudGlsZVBhZ2UwT2Zmc2V0WCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTFPZmZzZXRYLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMk9mZnNldFgsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UzT2Zmc2V0WF07XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKG9mZnNldFhbcGFnZV0sIHggPCAwID8geCArIDI1NiA6IHgpO1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZShvZmZzZXRYW3BhZ2VdICsgMSwgeSA8IDAgPyB5ICsgMjU2IDogeSk7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLmdldFRpbGVQYWdlT2Zmc2V0cyA9IGZ1bmN0aW9uIChwYWdlKSB7XG4gICAgICAgIHZhciBvZmZzZXRYID0gW3RoaXMuX2xheW91dC50aWxlUGFnZTBPZmZzZXRYLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMU9mZnNldFgsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UyT2Zmc2V0WCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTNPZmZzZXRYXTtcbiAgICAgICAgcmV0dXJuIFt0aGlzLl9tZW1vcnkucGVlayhvZmZzZXRYW3BhZ2VdKSxcbiAgICAgICAgICAgIHRoaXMuX21lbW9yeS5wZWVrKG9mZnNldFhbcGFnZV0gKyAxKV07XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnNldFRpbGVQYWdlQ3JvcHMgPSBmdW5jdGlvbiAocGFnZSwgeCwgeSkge1xuICAgICAgICB2YXIgY3JvcFggPSBbdGhpcy5fbGF5b3V0LnRpbGVQYWdlMENyb3BYLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMUNyb3BYLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMkNyb3BYLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlM0Nyb3BYXTtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UoY3JvcFhbcGFnZV0sIHgpO1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZShjcm9wWFtwYWdlXSArIDEsIHkpO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5nZXRUaWxlUGFnZUNyb3BzID0gZnVuY3Rpb24gKHBhZ2UpIHtcbiAgICAgICAgdmFyIGNyb3BYID0gW3RoaXMuX2xheW91dC50aWxlUGFnZTBDcm9wWCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTFDcm9wWCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTJDcm9wWCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTNDcm9wWF07XG4gICAgICAgIHJldHVybiBbdGhpcy5fbWVtb3J5LnBlZWsoY3JvcFhbcGFnZV0pICYgMHgzRixcbiAgICAgICAgICAgIHRoaXMuX21lbW9yeS5wZWVrKGNyb3BYW3BhZ2VdICsgMSkgJiAweDNGXTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuc2V0VGlsZVBhZ2VTZXQgPSBmdW5jdGlvbiAocGFnZSwgc2V0KSB7XG4gICAgICAgIHZhciBsYXllcnMgPSBbdGhpcy5fbGF5b3V0LnRpbGVQYWdlMFNldCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTFTZXQsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UyU2V0LFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlM1NldF07XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKGxheWVyc1twYWdlXSwgc2V0KTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuZ2V0VGlsZVBhZ2VTZXQgPSBmdW5jdGlvbiAocGFnZSkge1xuICAgICAgICB2YXIgbGF5ZXJzID0gW3RoaXMuX2xheW91dC50aWxlUGFnZTBTZXQsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UxU2V0LFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMlNldCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTNTZXRdO1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVtb3J5LnBlZWsobGF5ZXJzW3BhZ2VdKSAmIDB4MDM7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnNldFRpbGVQYWdlU2NhbGUgPSBmdW5jdGlvbiAocGFnZSwgc2NhbGUpIHtcbiAgICAgICAgdmFyIGxheWVycyA9IFt0aGlzLl9sYXlvdXQudGlsZVBhZ2UwU2NhbGUsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UxU2NhbGUsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UyU2NhbGUsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UzU2NhbGVdO1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZShsYXllcnNbcGFnZV0sIHNjYWxlKTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuZ2V0VGlsZVBhZ2VTY2FsZSA9IGZ1bmN0aW9uIChwYWdlKSB7XG4gICAgICAgIHZhciBsYXllcnMgPSBbdGhpcy5fbGF5b3V0LnRpbGVQYWdlMFNjYWxlLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMVNjYWxlLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMlNjYWxlLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlM1NjYWxlXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lbW9yeS5wZWVrKGxheWVyc1twYWdlXSkgJiAweDBGO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5pbml0U2NyZWVuQ29uZmlndXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3IoMHgwMSk7IC8vIGRhcmsgYmx1ZVxuICAgICAgICB0aGlzLnNldEJvcmRlclNpemUoMHgwMSwgMHgwMSk7IC8vIDhweCBvbiBhbGwgc2lkZXNcbiAgICAgICAgdGhpcy5zZXRCb3JkZXJDb2xvcigweDBBKTtcbiAgICAgICAgdGhpcy5zZXRHcmFwaGljc0xheWVyKDB4RkYpOyAvLyBncmFwaGljcyBoaWRkZW4gYnkgZGVmYXVsdDtcbiAgICAgICAgZm9yICh2YXIgcGFnZSA9IDA7IHBhZ2UgPCA0OyBwYWdlKyspIHtcbiAgICAgICAgICAgIHZhciB0aWxlUGFnZUJhc2UgPSB0aGlzLl9sYXlvdXQudGlsZVBhZ2UwICsgKHRoaXMuX2xheW91dC50aWxlUGFnZUxlbmd0aCAqIHBhZ2UpO1xuICAgICAgICAgICAgdmFyIHRpbGVCR0NvbG9yID0gdGlsZVBhZ2VCYXNlICsgMHgwNDAwO1xuICAgICAgICAgICAgdmFyIHRpbGVGR0NvbG9yID0gdGlsZUJHQ29sb3IgKyAweDA0MDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCAweDA0MDA7IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UodGlsZVBhZ2VCYXNlICsgaWR4LCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZW1vcnkucG9rZSh0aWxlQkdDb2xvciArIGlkeCwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UodGlsZUZHQ29sb3IgKyBpZHgsIDB4RkYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRUaWxlUGFnZUxheWVyKHBhZ2UsIChwYWdlID09PSAwKSA/IDB4MDEgOiAweEZGKTsgLy8gb25seSB0aWxlIHBhZ2UgMCBpcyB2aXNpYmxlIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgIHRoaXMuc2V0VGlsZVBhZ2VDcm9wcyhwYWdlLCAwLCAwKTsgLy8gbm8gY3JvcHNcbiAgICAgICAgICAgIHRoaXMuc2V0VGlsZVBhZ2VPZmZzZXRzKHBhZ2UsIDAsIDApOyAvLyBubyBvZmZzZXRzXG4gICAgICAgICAgICB0aGlzLnNldFRpbGVQYWdlU2NhbGUocGFnZSwgMCk7IC8vIG5vIHNjYWxpbmdcbiAgICAgICAgICAgIHRoaXMuc2V0VGlsZVBhZ2VTZXQocGFnZSwgMCk7IC8vIGZpcnN0IHRpbGUgc2V0XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuc2V0UGl4ZWwgPSBmdW5jdGlvbiAoeCwgeSwgYykge1xuICAgICAgICAvLyBsZXQgYWRkciA9ICgoKHkgKiB0aGlzLl93aWR0aCkgKyB4KSAmIDB4RkZGRik7XG4gICAgICAgIC8vIGxldCBhZGRyID0gKCh5ICogdGhpcy5fd2lkdGgpICsgeCk7XG4gICAgICAgIC8vIGxldCBhZGRyID0gKCgoeSA8PCA4KSArICh5IDw8IDYpICsgeCkgJiAweEZGRkYpO1xuICAgICAgICB2YXIgYWRkciA9ICgoeSA8PCA4KSArICh5IDw8IDYpICsgeCk7XG4gICAgICAgIHRoaXMuX2ZyYW1lW2FkZHJdID0gYzsgLy90aGlzLl9wYWxldHRlW2NdIHwgMHhGRjAwMDAwMDtcbiAgICB9O1xuICAgIC8qXG4gICAgc2V0UGl4ZWwgKHgsIHksIGMpIHtcbiAgICAgIGxldCBhZGRyID0gKCh5IDw8IDgpICsgKHkgPDwgNikgKyB4KSA8PCAyO1xuICAgICAgbGV0IGNvbG9yID0gdGhpcy5fcGFsZXR0ZVtjXTtcbiAgICAgIHRoaXMuX2ZyYW1lQnVmW2FkZHIrK10gPSBjb2xvciAmIDB4RkY7IGNvbG9yID4+PSA4O1xuICAgICAgdGhpcy5fZnJhbWVCdWZbYWRkcisrXSA9IGNvbG9yICYgMHhGRjsgY29sb3IgPj49IDg7XG4gICAgICB0aGlzLl9mcmFtZUJ1ZlthZGRyKytdID0gY29sb3IgJiAweEZGO1xuICAgICAgdGhpcy5fZnJhbWVCdWZbYWRkcl0gICA9IDB4RkY7XG4gICAgfVxuICAgICovXG4gICAgU2NyZWVuLnByb3RvdHlwZS5zZXRUaWxlID0gZnVuY3Rpb24gKHBhZ2UsIHJvdywgY29sLCB0aWxlLCBiZ0NvbG9yLCBmZ0NvbG9yKSB7XG4gICAgICAgIGlmIChiZ0NvbG9yID09PSB2b2lkIDApIHsgYmdDb2xvciA9IDB4MDA7IH1cbiAgICAgICAgaWYgKGZnQ29sb3IgPT09IHZvaWQgMCkgeyBmZ0NvbG9yID0gMHhGRjsgfVxuICAgICAgICB2YXIgYmFzZUFkZHIgPSB0aGlzLl9sYXlvdXQudGlsZVBhZ2UwICsgKHRoaXMuX2xheW91dC50aWxlUGFnZUxlbmd0aCAqIHBhZ2UpO1xuICAgICAgICB2YXIgdGlsZUFkZHIgPSBiYXNlQWRkciArIChyb3cgKiB0aGlzLl90aWxlQ29sdW1ucykgKyBjb2w7XG4gICAgICAgIHZhciBiZ0FkZHIgPSB0aWxlQWRkciArIDB4MDQwMDtcbiAgICAgICAgdmFyIGZnQWRkciA9IHRpbGVBZGRyICsgMHgwODAwO1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZSh0aWxlQWRkciwgdGlsZSk7XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKGJnQWRkciwgYmdDb2xvcik7XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKGZnQWRkciwgZmdDb2xvcik7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnJlbmRlckJhY2tncm91bmRDb2xvclRvQ2FudmFzID0gZnVuY3Rpb24gKHBhbGV0dGUpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzLmdldEJhY2tncm91bmRDb2xvcigpO1xuICAgICAgICB0aGlzLl9mcmFtZS5maWxsKHBhbGV0dGVbY10pO1xuICAgICAgICAvKmVzbGludC1kaXNhYmxlIG5vLXZhciwgdmFycy1vbi10b3AqL1xuICAgICAgICAvLyAgICAgICAgZm9yICh2YXIgeSA9IHRoaXMuX2hlaWdodCAtIDE7IHkgIT09IDA7IHktLSkge1xuICAgICAgICAvLyAgICAgICAgICAgIGZvciAodmFyIHggPSB0aGlzLl93aWR0aCAtIDE7IHggIT09IDA7IHgtLSkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGlzLnNldFBpeGVsKHgsIHksIGMpO1xuICAgICAgICAvLyAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgIH1cbiAgICAgICAgLyplc2xpbnQtZW5hYmxlIG5vLXZhciwgdmFycy1vbi10b3AqL1xuICAgIH07XG4gICAgLyplc2xpbnQtZGlzYWJsZSBtYXgtZGVwdGgqL1xuICAgIFNjcmVlbi5wcm90b3R5cGUucmVuZGVyVGlsZVBhZ2VUb0NhbnZhc0Nocm9tZSA9IGZ1bmN0aW9uIChwYWdlLCBwYWxldHRlKSB7XG4gICAgICAgIC8qZXNsaW50LWRpc2FibGUgbm8tdmFyLCB2YXJzLW9uLXRvcCovXG4gICAgICAgIHZhciBfYSA9IHRoaXMuZ2V0VGlsZVBhZ2VDcm9wcyhwYWdlKSwgY3JvcFggPSBfYVswXSwgY3JvcFkgPSBfYVsxXSwgY3JvcExlZnQgPSBjcm9wWCwgY3JvcExlZnRNYXNrZWQgPSBjcm9wTGVmdCAmIDB4RkY4LCBjcm9wUmlnaHQgPSB0aGlzLl93aWR0aCAtIGNyb3BYLCBjcm9wUmlnaHRNYXNrZWQgPSAoY3JvcFJpZ2h0ICYgMHhGRjgpICsgMSwgY3JvcFRvcCA9IGNyb3BZLCBjcm9wVG9wTWFza2VkID0gY3JvcFRvcCAmIDB4RkY4LCBjcm9wQm90dG9tID0gdGhpcy5faGVpZ2h0IC0gY3JvcFksIGNyb3BCb3R0b21NYXNrZWQgPSAoY3JvcEJvdHRvbSAmIDB4RkY4KSArIDEsIF9iID0gdGhpcy5nZXRUaWxlUGFnZU9mZnNldHMocGFnZSksIG9mZnNldFggPSBfYlswXSwgb2Zmc2V0WSA9IF9iWzFdLCBzY2FsZSA9IHRoaXMuZ2V0VGlsZVBhZ2VTY2FsZShwYWdlKSAmIDB4MDcsIHRpbGVTZXQgPSB0aGlzLmdldFRpbGVQYWdlU2V0KHBhZ2UpLCB0aWxlU2V0QmFzZSA9IHRpbGVTZXQgKiAxNjM4NCwgdGlsZVBhZ2VCYXNlID0gcGFnZSAqIDB4MTAwMCwgdGlsZUZvcmVncm91bmRDb2xvciwgdGlsZUJhY2tncm91bmRDb2xvciwgYWRkciwgdGlsZSwgdGlsZVNldEFkZHIsIHRwaXgsIG5ld3gsIG5ld3ksIGJhc2VYLCBiYXNlWSwgc2hpZnQgPSAzICsgc2NhbGU7XG4gICAgICAgIG9mZnNldFggPSB0d29zQ29tcGxlbWVudF9qc18xLmRlZmF1bHQuZnJvbTgob2Zmc2V0WCk7XG4gICAgICAgIG9mZnNldFkgPSB0d29zQ29tcGxlbWVudF9qc18xLmRlZmF1bHQuZnJvbTgob2Zmc2V0WSk7XG4gICAgICAgIC8vIGl0ZXJhdGUgcm93IC0tLT4gY29sIG92ZXIgdGhlIHRpbGUgcGFnZVxuICAgICAgICBmb3IgKHZhciByb3cgPSB0aGlzLl90aWxlUm93cyAtIDE7IHJvdyA+IC0xOyByb3ctLSkge1xuICAgICAgICAgICAgLy8gYmFzZVkgc2hvdWxkIGJlIHRoZSB0b3Btb3N0IFkgcG9zaXRpb24gb2YgdGhlIHRpbGVcbiAgICAgICAgICAgIGJhc2VZID0gKHJvdyA8PCBzaGlmdCkgKyBvZmZzZXRZO1xuICAgICAgICAgICAgLy8gb25seSBwYWludCB0aWxlcyB0aGF0IGhhdmUgdmlzaWJsZSBwb3J0aW9ucyBvbiBzY3JlZW5cbiAgICAgICAgICAgIGlmIChiYXNlWSA+PSBjcm9wVG9wTWFza2VkICYmIGJhc2VZIDw9IGNyb3BCb3R0b21NYXNrZWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjb2wgPSB0aGlzLl90aWxlQ29sdW1ucyAtIDE7IGNvbCA+IC0xOyBjb2wtLSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBiYXNlWCBzaG91bGQgaW5kaWNhdGUgdGhlIGxlZnRtb3N0IFggcG9zaXRpb24gb2YgdGhlIHRpbGVcbiAgICAgICAgICAgICAgICAgICAgYmFzZVggPSAoY29sIDw8IHNoaWZ0KSArIG9mZnNldFg7XG4gICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgZHJhdyBpZiB0aGUgdGlsZSBpcyB2aXNpYmxlXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXNlWCA+PSBjcm9wTGVmdE1hc2tlZCAmJiBiYXNlWCA8PSBjcm9wUmlnaHRNYXNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZHIgc2hvdWxkIGluZGljYXRlIHRoZSB0aWxlIHBhZ2UgYWRkcmVzcyBvZiB0aGUgdGlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkciA9IChyb3cgPDwgNSkgKyAocm93IDw8IDMpICsgY29sICsgdGlsZVBhZ2VCYXNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSB0aWxlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlID0gdGhpcy5fdGlsZXNbYWRkcl07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlU2V0QWRkciA9IHRpbGVTZXRCYXNlICsgKHRpbGUgPDwgNik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgY29ycmVzcG9uZGluZyBjb2xvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVCYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLl90aWxlc1thZGRyICsgMHgwNDAwXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVGb3JlZ3JvdW5kQ29sb3IgPSB0aGlzLl90aWxlc1thZGRyICsgMHgwODAwXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQsIGRyYXcgZWFjaCBwaXhlbCBvZiB0aGUgdGlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9ICg4IDw8IHNjYWxlKSAtIDE7IHkgPiAtMTsgeS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3eSA9IHkgKyBiYXNlWTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gKDggPDwgc2NhbGUpIC0gMTsgeCA+IC0xOyB4LS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHBpeCA9IHRoaXMuX3RpbGVzZXRzW3RpbGVTZXRBZGRyICsgKCgoeSA+PiBzY2FsZSkgPDwgMykgKyAoeCA+PiBzY2FsZSkpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRwaXggPT09IDB4MDAgfHwgdHBpeCA9PT0gMHhGRikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHBpeCA9ICh0cGl4ID09PSAweEZGID8gdGlsZUZvcmVncm91bmRDb2xvciA6IHRpbGVCYWNrZ3JvdW5kQ29sb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cGl4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3eCA9IHggKyBiYXNlWDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoKG5ld3ggPj0gY3JvcExlZnQpICYmIChuZXd4IDwgY3JvcFJpZ2h0KSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKG5ld3kgPj0gY3JvcFRvcCkgJiYgKG5ld3kgPCBjcm9wQm90dG9tKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBpeGVsKG5ld3gsIG5ld3ksIHBhbGV0dGVbdHBpeF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKmVzbGludC1lbmFibGUgbWF4LWRlcHRoKi9cbiAgICBTY3JlZW4ucHJvdG90eXBlLnJlbmRlclRpbGVQYWdlVG9DYW52YXNTYWZhcmkgPSBmdW5jdGlvbiAocGFnZSwgcGFsZXR0ZSkge1xuICAgICAgICAvKmVzbGludC1kaXNhYmxlIG5vLXZhciwgdmFycy1vbi10b3AqL1xuICAgICAgICB2YXIgX2EgPSB0aGlzLmdldFRpbGVQYWdlQ3JvcHMocGFnZSksIGNyb3BYID0gX2FbMF0sIGNyb3BZID0gX2FbMV0sIGNyb3BMZWZ0ID0gY3JvcFgsIGNyb3BSaWdodCA9IHRoaXMuX3dpZHRoIC0gY3JvcFgsIGNyb3BUb3AgPSBjcm9wWSwgY3JvcEJvdHRvbSA9IHRoaXMuX2hlaWdodCAtIGNyb3BZLCBfYiA9IHRoaXMuZ2V0VGlsZVBhZ2VPZmZzZXRzKHBhZ2UpLCBvZmZzZXRYID0gX2JbMF0sIG9mZnNldFkgPSBfYlsxXSwgc2NhbGUgPSB0aGlzLmdldFRpbGVQYWdlU2NhbGUocGFnZSkgJiAweDA3LCB0aWxlU2V0ID0gdGhpcy5nZXRUaWxlUGFnZVNldChwYWdlKSwgdGlsZVNldEJhc2UgPSB0aWxlU2V0ICogMTYzODQsIHRpbGVQYWdlQmFzZSA9IHBhZ2UgKiAweDEwMDAsIHRpbGVGb3JlZ3JvdW5kQ29sb3IsIHRpbGVCYWNrZ3JvdW5kQ29sb3IsIGFkZHIsIHRpbGUsIHRpbGVTZXRBZGRyLCB0cGl4LCBuZXd4LCBuZXd5LCBzaGlmdCA9IDMgKyBzY2FsZSwgc2hpZnRlZFksIHNjYWxlZFk7XG4gICAgICAgIG9mZnNldFggPSB0d29zQ29tcGxlbWVudF9qc18xLmRlZmF1bHQuZnJvbTgob2Zmc2V0WCk7XG4gICAgICAgIG9mZnNldFkgPSB0d29zQ29tcGxlbWVudF9qc18xLmRlZmF1bHQuZnJvbTgob2Zmc2V0WSk7XG4gICAgICAgIGZvciAodmFyIHkgPSB0aGlzLl9oZWlnaHQgLSAxOyB5ID4gLTE7IHktLSkge1xuICAgICAgICAgICAgc2hpZnRlZFkgPSB5ID4+IHNoaWZ0O1xuICAgICAgICAgICAgc2NhbGVkWSA9IHkgPj4gc2NhbGU7XG4gICAgICAgICAgICBuZXd5ID0geSArIG9mZnNldFk7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gdGhpcy5fd2lkdGggLSAxOyB4ID4gLTE7IHgtLSkge1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgdGlsZSBpbmRleFxuICAgICAgICAgICAgICAgIC8vYWRkciA9ICgoeSA+PiBzaGlmdCkgKiB0aGlzLl90aWxlQ29sdW1ucykgKyAoeCA+PiBzaGlmdCk7XG4gICAgICAgICAgICAgICAgYWRkciA9IChzaGlmdGVkWSA8PCA1KSArIChzaGlmdGVkWSA8PCAzKSArICh4ID4+IHNoaWZ0KSArIHRpbGVQYWdlQmFzZTtcbiAgICAgICAgICAgICAgICB0aWxlID0gdGhpcy5fdGlsZXNbYWRkcl07XG4gICAgICAgICAgICAgICAgLy8gZ2V0IGNvcnJlc3BvbmRpbmcgY29sb3JzXG4gICAgICAgICAgICAgICAgdGlsZUJhY2tncm91bmRDb2xvciA9IHRoaXMuX3RpbGVzW2FkZHIgKyAweDA0MDBdO1xuICAgICAgICAgICAgICAgIHRpbGVGb3JlZ3JvdW5kQ29sb3IgPSB0aGlzLl90aWxlc1thZGRyICsgMHgwODAwXTtcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHRpbGUgcGl4ZWxcbiAgICAgICAgICAgICAgICB0aWxlU2V0QWRkciA9ICgoc2NhbGVkWSAmIDB4MDcpIDw8IDMpICsgKCh4ID4+IHNjYWxlKSAmIDB4MDcpICsgKHRpbGUgPDwgNikgKyB0aWxlU2V0QmFzZTtcbiAgICAgICAgICAgICAgICB0cGl4ID0gdGhpcy5fdGlsZXNldHNbdGlsZVNldEFkZHJdO1xuICAgICAgICAgICAgICAgIGlmICh0cGl4ID09PSAweDAwIHx8IHRwaXggPT09IDB4RkYpIHtcbiAgICAgICAgICAgICAgICAgICAgdHBpeCA9ICh0cGl4ID09PSAweEZGID8gdGlsZUZvcmVncm91bmRDb2xvciA6IHRpbGVCYWNrZ3JvdW5kQ29sb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXd4ID0geCArIG9mZnNldFg7XG4gICAgICAgICAgICAgICAgaWYgKHRwaXggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoKG5ld3ggPj0gY3JvcExlZnQpICYmIChuZXd4IDwgY3JvcFJpZ2h0KSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICgobmV3eSA+PSBjcm9wVG9wKSAmJiAobmV3eSA8IGNyb3BCb3R0b20pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQaXhlbChuZXd4LCBuZXd5LCBwYWxldHRlW3RwaXhdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKmVzbGludC1lbmFibGUgbm8tdmFyLCB2YXJzLW9uLXRvcCovXG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnJlbmRlckdyYXBoaWNzVG9DYW52YXMgPSBmdW5jdGlvbiAocGFsZXR0ZSkge1xuICAgICAgICB2YXIgZ3BpeCwgYWRkciA9IHRoaXMuX2xheW91dC5ncmFwaGljc1N0YXJ0O1xuICAgICAgICAvKmVzbGludC1kaXNhYmxlIG5vLXZhciwgdmFycy1vbi10b3AqL1xuICAgICAgICBmb3IgKHZhciB5ID0gdGhpcy5faGVpZ2h0IC0gMTsgeSA+IC0xOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSB0aGlzLl93aWR0aCAtIDE7IHggPiAtMTsgeC0tKSB7XG4gICAgICAgICAgICAgICAgYWRkcisrO1xuICAgICAgICAgICAgICAgIGdwaXggPSB0aGlzLl9tZW1vcnkucGVlayhhZGRyKTtcbiAgICAgICAgICAgICAgICBpZiAoZ3BpeCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQaXhlbCh4LCB5LCBwYWxldHRlW2dwaXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyplc2xpbnQtZW5hYmxlIG5vLXZhciwgdmFycy1vbi10b3AqL1xuICAgIH07XG4gICAgLypcbiAgICBUT0RPOlxuICAgIHJlbmRlclNwcml0ZVRvQ2FudmFzKHNwcml0ZSkge1xuXG4gICAgfVxuICAgICovXG4gICAgU2NyZWVuLnByb3RvdHlwZS5yZW5kZXJCb3JkZXJUb1NjcmVlbkJvcmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJvcmRlckNvbG9yID0gdGhpcy5nZXRCb3JkZXJDb2xvcigpO1xuICAgICAgICB2YXIgY29sb3IgPSAodGhpcy5fcGFsZXR0ZVtib3JkZXJDb2xvcl0gfCAweEZGMDAwMDAwKTtcbiAgICAgICAgdmFyIGIgPSAoY29sb3IgJiAweDAwRkYwMDAwKSA+PiAxNjtcbiAgICAgICAgdmFyIGcgPSAoY29sb3IgJiAweDAwMDBGRjAwKSA+PiA4O1xuICAgICAgICB2YXIgciA9IChjb2xvciAmIDB4MDAwMDAwRkYpO1xuICAgICAgICB2YXIgY3NzID0gXCJyZ2IoXCIgKyByICsgXCIsIFwiICsgZyArIFwiLCBcIiArIGIgKyBcIilcIjtcbiAgICAgICAgdGhpcy5fc2NyZWVuQm9yZGVyRWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY3NzO1xuICAgICAgICB0aGlzLl9zY3JlZW4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY3NzO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5yZW5kZXJCb3JkZXJUb0NhbnZhcyA9IGZ1bmN0aW9uIChwYWxldHRlKSB7XG4gICAgICAgIHZhciBib3JkZXJDb2xvciA9IHRoaXMuZ2V0Qm9yZGVyQ29sb3IoKSwgX2EgPSB0aGlzLmdldEJvcmRlclNpemUoKSwgYm9yZGVyU2l6ZVggPSBfYVswXSwgYm9yZGVyU2l6ZVkgPSBfYVsxXSwgbGVmdEJvcmRlciA9IGJvcmRlclNpemVYLCByaWdodEJvcmRlciA9IHRoaXMuX3dpZHRoIC0gYm9yZGVyU2l6ZVgsIHRvcEJvcmRlciA9IGJvcmRlclNpemVZLCBib3R0b21Cb3JkZXIgPSB0aGlzLl9oZWlnaHQgLSBib3JkZXJTaXplWTtcbiAgICAgICAgLyplc2xpbnQtZGlzYWJsZSBuby12YXIsIHZhcnMtb24tdG9wKi9cbiAgICAgICAgZm9yICh2YXIgeSA9IHRoaXMuX2hlaWdodCAtIDE7IHkgPiAtMTsgeS0tKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gdGhpcy5fd2lkdGggLSAxOyB4ID4gLTE7IHgtLSkge1xuICAgICAgICAgICAgICAgIGlmICgoKHggPCBsZWZ0Qm9yZGVyKSB8fCAoeCA+PSByaWdodEJvcmRlcikpIHx8XG4gICAgICAgICAgICAgICAgICAgICgoeSA8IHRvcEJvcmRlcikgfHwgKHkgPj0gYm90dG9tQm9yZGVyKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQaXhlbCh4LCB5LCBwYWxldHRlW2JvcmRlckNvbG9yXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qZXNsaW50LWVuYWJsZSBuby12YXIsIHZhcnMtb24tdG9wKi9cbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGF5ZXIsIHBhbGV0dGUgPSBbXTtcbiAgICAgICAgdmFyIGxheWVycyA9IFtcbiAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgW10sXG4gICAgICAgICAgICBbXSxcbiAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgW10sXG4gICAgICAgICAgICBbXSxcbiAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgW11cbiAgICAgICAgXTtcbiAgICAgICAgLy8gYmFja2dyb3VuZCBjb2xvciBnb2VzIGZpcnN0XG4gICAgICAgIGxheWVyc1swXS5wdXNoKHRoaXMucmVuZGVyQmFja2dyb3VuZENvbG9yVG9DYW52YXMuYmluZCh0aGlzKSk7XG4gICAgICAgIC8vIG5leHQgZmlndXJlIG91dCB3aGVyZSB0aGUgdGlsZSBwYWdlcyBnb1xuICAgICAgICBmb3IgKHZhciBwYWdlID0gMDsgcGFnZSA8IDQ7IHBhZ2UrKykge1xuICAgICAgICAgICAgbGF5ZXIgPSB0aGlzLmdldFRpbGVQYWdlTGF5ZXIocGFnZSk7XG4gICAgICAgICAgICBpZiAobGF5ZXIgPCA4KSB7XG4gICAgICAgICAgICAgICAgbGF5ZXJzW2xheWVyXS5wdXNoKHRoaXMucmVuZGVyVGlsZVBhZ2VUb0NhbnZhcy5iaW5kKHRoaXMsIHBhZ2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB0aGVuIHRoZSBncmFwaGljcyBwYWdlXG4gICAgICAgIGxheWVyID0gdGhpcy5nZXRHcmFwaGljc0xheWVyKCk7XG4gICAgICAgIGlmIChsYXllciA8IDgpIHtcbiAgICAgICAgICAgIGxheWVyc1tsYXllcl0ucHVzaCh0aGlzLnJlbmRlckdyYXBoaWNzVG9DYW52YXMuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhlbiB0aGUgc3ByaXRlc1xuICAgICAgICAvLyBUT0RPXG4gICAgICAgIC8vIHRoZW4gdGhlIGJvcmRlclxuICAgICAgICBsYXllcnNbN10ucHVzaCh0aGlzLnJlbmRlckJvcmRlclRvQ2FudmFzLmJpbmQodGhpcykpO1xuICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgY3VycmVudCBwYWxldHRlXG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICAgICAgICAgIHBhbGV0dGUucHVzaCh0aGlzLl9wYWxldHRlW2ldIHwgMHhGRjAwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSAqL1xuICAgICAgICAvLyBhbmQgbm93IGNvbXBvc2l0ZSFcbiAgICAgICAgZm9yICh2YXIgbGF5ZXJJZHggPSAwOyBsYXllcklkeCA8IDg7IGxheWVySWR4KyspIHtcbiAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbGF5ZXJzW2xheWVySWR4XTtcbiAgICAgICAgICAgIGZvciAodmFyIGFjdGlvbklkeCA9IDA7IGFjdGlvbklkeCA8IGFjdGlvbnMubGVuZ3RoOyBhY3Rpb25JZHgrKykge1xuICAgICAgICAgICAgICAgIGFjdGlvbnNbYWN0aW9uSWR4XShwYWxldHRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9mcmFtZURhdGEuZGF0YS5zZXQodGhpcy5fZnJhbWU4KTtcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4LnB1dEltYWdlRGF0YSh0aGlzLl9mcmFtZURhdGEsIDAsIDApO1xuICAgICAgICB0aGlzLl9zY3JlZW5DdHguZHJhd0ltYWdlKHRoaXMuX2NhbnZhcywgMCwgMCk7XG4gICAgICAgIHRoaXMucmVuZGVyQm9yZGVyVG9TY3JlZW5Cb3JkZXIoKTtcbiAgICB9O1xuICAgIHJldHVybiBTY3JlZW47XG59KCkpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gU2NyZWVuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVTJOeVpXVnVMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaVUyTnlaV1Z1TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRU3c0UWtGQk9FSTdRVUZET1VJc0swUkJRWFZFTzBGQlJYWkVPMGxCUTBrc1owSkJRVmtzUlVGQlJTeEZRVUZGTEZGQlFWRXNSVUZCUlN4TlFVRk5MRVZCUVVVc1JVRkJNRVU3V1VGQk1VVXNORUpCUVRCRkxFVkJRWGhGTEdOQlFXTXNSVUZCWkN4dFEwRkJZeXhGUVVGRkxHTkJRV01zUlVGQlpDeHRRMEZCWXl4RlFVRkZMRFpDUVVGcFF5eEZRVUZxUXl4elJFRkJhVU03VVVGRGFrY3NTVUZCU1N4TFFVRkxMRWRCUVVjc1IwRkJSeXhGUVVGRkxFMUJRVTBzUjBGQlJ5eEhRVUZITEVWQlFVVXNUVUZCVFN4SFFVRkhMRTFCUVUwc1NVRkJTU3hOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETzFGQlJXaEZMRWxCUVVrc1EwRkJReXhQUVVGUExFZEJRVWNzVDBGQlR5eERRVUZETEUxQlFVMHNTVUZCU1N4eFFrRkJjVUlzUTBGQlF5eERRVUZETzFGQlEzaEVMRWxCUVVrc1EwRkJReXhQUVVGUExFZEJRVWNzVFVGQlRTeERRVUZETzFGQlJYUkNMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzUzBGQlN5eERRVUZETzFGQlEzQkNMRWxCUVVrc1EwRkJReXhQUVVGUExFZEJRVWNzVFVGQlRTeERRVUZETzFGQlEzUkNMRWxCUVVrc1EwRkJReXhWUVVGVkxFZEJRVWNzUTBGQlF5eERRVUZETzFGQlEzQkNMRWxCUVVrc1EwRkJReXhYUVVGWExFZEJRVWNzUTBGQlF5eERRVUZETzFGQlEzSkNMRWxCUVVrc1EwRkJReXhaUVVGWkxFZEJRVWNzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNN1VVRkROVU1zU1VGQlNTeERRVUZETEZOQlFWTXNSMEZCUnl4TlFVRk5MRWRCUVVjc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF6dFJRVVV6UXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEVml4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExGRkJRVkVzUTBGQlF5eGpRVUZqTEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNN1dVRkRNME1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4WlFVRlpMRU5CUVVNc1QwRkJUeXhGUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZETzFsQlF6RkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zV1VGQldTeERRVUZETEZGQlFWRXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRaUVVNMVF5eEpRVUZKTEVOQlFVTXNWVUZCVlN4SFFVRkhMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zVlVGQlZTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUldoRUxFbEJRVWtzUTBGQlF5eFBRVUZQTEVkQlFVY3NVVUZCVVN4RFFVRkRMR0ZCUVdFc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFpRVU5vUkN4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExGbEJRVmtzUTBGQlF5eFBRVUZQTEVWQlFVVXNTMEZCU3l4RFFVRkRMRU5CUVVNN1dVRkRNVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4WlFVRlpMRU5CUVVNc1VVRkJVU3hGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzFsQlF6VkRMRWxCUVVrc1EwRkJReXhWUVVGVkxFZEJRVWNzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03V1VGRmFFUXNTVUZCU1N4RFFVRkRMR1ZCUVdVc1IwRkJSeXhSUVVGUkxFTkJRVU1zWTBGQll5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMWxCUTNwRUxFbEJRVWtzUTBGQlF5eFZRVUZWTEVkQlFVY3NTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhsUVVGbExFTkJRVU1zUzBGQlN5eEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMUZCUTNKRkxFTkJRVU03VVVGRlJDeEpRVUZKTEVOQlFVTXNUMEZCVHl4SFFVRkhMRTFCUVUwc1EwRkJRenRSUVVOMFFpeEpRVUZKTEVOQlFVTXNUMEZCVHl4SFFVRkhMRTFCUVUwc1EwRkJRenRSUVVWMFFpeDVSRUZCZVVRN1VVRkRla1FzUlVGQlJTeERRVUZETEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzaENMRWxCUVVrc1EwRkJReXhaUVVGWkxFZEJRVWNzY1VKQlFYRkNMRU5CUVVNN1VVRkRPVU1zUTBGQlF6dFJRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUTBvc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVOV0xFbEJRVWtzUTBGQlF5eFRRVUZUTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1IwRkJSeXhwUWtGQmFVSXNSMEZCUnl4WFFVRlhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRuUWtGRE4wWXNTVUZCU1N4RFFVRkRMRTFCUVUwc1IwRkJSeXhKUVVGSkxGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1owSkJRemxETEVsQlFVa3NRMEZCUXl4UFFVRlBMRWRCUVVjc1NVRkJTU3hWUVVGVkxFTkJRVU1zU1VGQlNTeERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPMWxCUTJ4RUxFTkJRVU03VVVGRFRDeERRVUZETzFGQlIwUXNjME5CUVhORE8xRkJRM1JETEVsQlFVa3NRMEZCUXl4elFrRkJjMElzUjBGQlJ5eEpRVUZKTEVOQlFVTXNORUpCUVRSQ0xFTkJRVU03VVVGRmFFVXNSVUZCUlN4RFFVRkRMRU5CUVVNc1QwRkJUeXhUUVVGVExFdEJRVXNzVjBGQlZ5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnVReXhGUVVGRkxFTkJRVU1zUTBGQlF5eFRRVUZUTEVOQlFVTXNVMEZCVXl4RFFVRkRMRmRCUVZjc1JVRkJSU3hEUVVGRExFOUJRVThzUTBGQlF5eFJRVUZSTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlF6TkVMRWxCUVVrc1EwRkJReXh6UWtGQmMwSXNSMEZCUnl4SlFVRkpMRU5CUVVNc05FSkJRVFJDTEVOQlFVTTdXVUZEY0VVc1EwRkJRenRSUVVOTUxFTkJRVU03VVVGRlJDdzBRa0ZCTkVJN1VVRkROVUlzU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRPMGxCUTJoQ0xFTkJRVU03U1VGRlJDeHhRa0ZCU1N4SFFVRktPMUZCUTBrc1NVRkJUU3hOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXp0UlFVTTFRaXhKUVVGTkxFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRPMUZCUXpWQ0xFVkJRVVVzUTBGQlF5eERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRWQ3hKUVVGSkxFTkJRVU1zVVVGQlVTeEhRVUZITEUxQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1RVRkJUU3hEUVVGRExGbEJRVmtzUlVGQlJTeE5RVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNN1dVRkZOVVVzVjBGQlZ6dFpRVU5ZTEVsQlFVa3NRMEZCUXl4VFFVRlRMRWRCUVVjc1RVRkJUU3hEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNZVUZCWVN4RlFVRkZMRTFCUVUwc1EwRkJReXhqUVVGakxFTkJRVU1zUTBGQlF6dFpRVU16UlN4SlFVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExFMUJRVTBzUTBGQlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMR05CUVdNc1JVRkJSU3hOUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTTdVVUZET1VVc1EwRkJRenRKUVVOTUxFTkJRVU03U1VGRlJDeHpRa0ZCU1N3d1FrRkJUVHRoUVVGV08xbEJRMGtzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNN1VVRkRlRUlzUTBGQlF6czdPMDlCUVVFN1NVRkZSQ3h6UWtGQlNTeHhRMEZCYVVJN1lVRkJja0k3V1VGRFNTeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1IwRkJSeXhKUVVGSkxFTkJRVU1zVTBGQlV5eEhRVUZITEVsQlFVa3NRMEZCUXp0UlFVTXZReXhEUVVGRE96czdUMEZCUVR0SlFVVkVMSEZEUVVGdlFpeEhRVUZ3UWl4VlFVRnhRaXhwUWtGQmFVSTdVVUZEYkVNc1NVRkJTU3hEUVVGRExGTkJRVk1zUjBGQlJ5eHBRa0ZCYVVJc1EwRkJRenRSUVVOdVF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4SFFVRkhMRWxCUVVrc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0UlFVTTVReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEVsQlFVa3NWVUZCVlN4RFFVRkRMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dEpRVVZzUkN4RFFVRkRPMGxCUlVRc1owTkJRV1VzUjBGQlppeFZRVUZuUWl4SFFVRkhMRVZCUVVVc1EwRkJReXhGUVVGRkxFTkJRVU1zUlVGQlJTeERRVUZETzFGQlEzaENMRWxCUVVrc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNXVUZCV1N4SFFVRkhMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEyeEVMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4RFFVRkRMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGJFTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVNdlFpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUXk5Q0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEYmtNc1EwRkJRenRKUVVWRUxHZERRVUZsTEVkQlFXWXNWVUZCWjBJc1IwRkJSenRSUVVObUxFbEJRVWtzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1dVRkJXU3hIUVVGSExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTJ4RUxFMUJRVTBzUTBGQlF6dFpRVU5JTEVOQlFVTXNSVUZCUlN4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTTdXVUZETVVJc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhEUVVGRExFTkJRVU03V1VGRE9VSXNRMEZCUXl4RlFVRkZMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4RFFVRkRMRU5CUVVNN1UwRkRha01zUTBGQlF6dEpRVU5PTEVOQlFVTTdTVUZGUkN3MFFrRkJWeXhIUVVGWU8xRkJRMGtzU1VGQlNTeERRVUZETEVWQlFVVXNRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJSU3hEUVVGRExFVkJRMVlzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXl4RlFVRkZMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzUjBGQlJ5eERRVUZETEVOQlFVTTdVVUZGTlVJc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhIUVVGSExFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVXNRMEZCUXp0WlFVTXpRaXhEUVVGRExFZEJRVWNzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkROVUlzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xbEJReTlDTEVOQlFVTXNSMEZCUnl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFpRVU12UWl4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZETDBJc1NVRkJTU3hEUVVGRExHVkJRV1VzUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU55UXl4RFFVRkRPMGxCUTB3c1EwRkJRenRKUVVWRUxHMURRVUZyUWl4SFFVRnNRaXhWUVVGdFFpeERRVUZETzFGQlEyaENMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1pVRkJaU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEzWkVMRU5CUVVNN1NVRkRSQ3h0UTBGQmEwSXNSMEZCYkVJN1VVRkRTU3hOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eGxRVUZsTEVOQlFVTXNRMEZCUXp0SlFVTXpSQ3hEUVVGRE8wbEJSVVFzT0VKQlFXRXNSMEZCWWl4VlFVRmpMRU5CUVVNc1JVRkJSU3hEUVVGRE8xRkJRMlFzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFhRVUZYTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRMME1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFhRVUZYTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRia1FzUTBGQlF6dEpRVU5FTERoQ1FVRmhMRWRCUVdJN1VVRkRTU3hOUVVGTkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEZkQlFWY3NRMEZCUXl4SFFVRkhMRWxCUVVrN1dVRkRNVVFzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVONFJDeERRVUZETzBsQlJVUXNLMEpCUVdNc1IwRkJaQ3hWUVVGbExFTkJRVU03VVVGRFdpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEZkQlFWY3NSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOdVJDeERRVUZETzBsQlEwUXNLMEpCUVdNc1IwRkJaRHRSUVVOSkxFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMGxCUTNaRUxFTkJRVU03U1VGRlJDeHBRMEZCWjBJc1IwRkJhRUlzVlVGQmFVSXNRMEZCUXp0UlFVTmtMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1lVRkJZU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEzSkVMRU5CUVVNN1NVRkRSQ3hwUTBGQlowSXNSMEZCYUVJN1VVRkRTU3hOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eGhRVUZoTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNN1NVRkRhRVVzUTBGQlF6dEpRVVZFTEdsRFFVRm5RaXhIUVVGb1FpeFZRVUZwUWl4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVOd1FpeEpRVUZKTEUxQlFVMHNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWTBGQll6dFpRVU42UXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHTkJRV003V1VGRE0wSXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhqUVVGak8xbEJRek5DTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1kwRkJZeXhEUVVGRExFTkJRVU03VVVGRE4wSXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRM1pETEVOQlFVTTdTVUZEUkN4cFEwRkJaMElzUjBGQmFFSXNWVUZCYVVJc1NVRkJTVHRSUVVOcVFpeEpRVUZKTEUxQlFVMHNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWTBGQll6dFpRVU42UXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHTkJRV003V1VGRE0wSXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhqUVVGak8xbEJRek5DTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1kwRkJZeXhEUVVGRExFTkJRVU03VVVGRE4wSXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF6dEpRVU5zUkN4RFFVRkRPMGxCUlVRc2JVTkJRV3RDTEVkQlFXeENMRlZCUVcxQ0xFbEJRVWtzUlVGQlJTeERRVUZETEVWQlFVVXNRMEZCUXp0UlFVTjZRaXhKUVVGSkxFOUJRVThzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1owSkJRV2RDTzFsQlF6VkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWjBKQlFXZENPMWxCUXpkQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNaMEpCUVdkQ08xbEJRemRDTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNRMEZCUXp0UlFVTXZRaXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1IwRkJSeXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEzUkVMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1IwRkJSeXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETzBsQlF6bEVMRU5CUVVNN1NVRkRSQ3h0UTBGQmEwSXNSMEZCYkVJc1ZVRkJiVUlzU1VGQlNUdFJRVU51UWl4SlFVRkpMRTlCUVU4c1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNaMEpCUVdkQ08xbEJRelZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1owSkJRV2RDTzFsQlF6ZENMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWjBKQlFXZENPMWxCUXpkQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF6dFJRVU12UWl4TlFVRk5MRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03V1VGRGVFTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRE1VTXNRMEZCUXp0SlFVVkVMR2xEUVVGblFpeEhRVUZvUWl4VlFVRnBRaXhKUVVGSkxFVkJRVVVzUTBGQlF5eEZRVUZGTEVOQlFVTTdVVUZEZGtJc1NVRkJTU3hMUVVGTExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMR05CUVdNN1dVRkRlRU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4alFVRmpPMWxCUXpOQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNZMEZCWXp0WlFVTXpRaXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdOQlFXTXNRMEZCUXl4RFFVRkRPMUZCUXpkQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnNReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUXpGRExFTkJRVU03U1VGRFJDeHBRMEZCWjBJc1IwRkJhRUlzVlVGQmFVSXNTVUZCU1R0UlFVTnFRaXhKUVVGSkxFdEJRVXNzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1kwRkJZenRaUVVONFF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMR05CUVdNN1dVRkRNMElzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4alFVRmpPMWxCUXpOQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUVVNN1VVRkROMElzVFVGQlRTeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRWRCUVVjc1NVRkJTVHRaUVVNM1F5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFTkJRVU03U1VGREwwTXNRMEZCUXp0SlFVVkVMQ3RDUVVGakxFZEJRV1FzVlVGQlpTeEpRVUZKTEVWQlFVVXNSMEZCUnp0UlFVTndRaXhKUVVGSkxFMUJRVTBzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1dVRkJXVHRaUVVOMlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRmxCUVZrN1dVRkRla0lzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4WlFVRlpPMWxCUTNwQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNXVUZCV1N4RFFVRkRMRU5CUVVNN1VVRkRNMElzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCUTNwRExFTkJRVU03U1VGRFJDd3JRa0ZCWXl4SFFVRmtMRlZCUVdVc1NVRkJTVHRSUVVObUxFbEJRVWtzVFVGQlRTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhaUVVGWk8xbEJRM1pETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1dVRkJXVHRaUVVONlFpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRmxCUVZrN1dVRkRla0lzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4WlFVRlpMRU5CUVVNc1EwRkJRenRSUVVNelFpeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRE8wbEJRMnhFTEVOQlFVTTdTVUZGUkN4cFEwRkJaMElzUjBGQmFFSXNWVUZCYVVJc1NVRkJTU3hGUVVGRkxFdEJRVXM3VVVGRGVFSXNTVUZCU1N4TlFVRk5MRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdOQlFXTTdXVUZEZWtNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eGpRVUZqTzFsQlF6TkNMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWTBGQll6dFpRVU16UWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETzFGQlF6ZENMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hMUVVGTExFTkJRVU1zUTBGQlF6dEpRVU16UXl4RFFVRkRPMGxCUTBRc2FVTkJRV2RDTEVkQlFXaENMRlZCUVdsQ0xFbEJRVWs3VVVGRGFrSXNTVUZCU1N4TlFVRk5MRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdOQlFXTTdXVUZEZWtNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eGpRVUZqTzFsQlF6TkNMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWTBGQll6dFpRVU16UWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETzFGQlF6ZENMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTTdTVUZEYkVRc1EwRkJRenRKUVVkRUxIZERRVUYxUWl4SFFVRjJRanRSUVVOSkxFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZGTEZsQlFWazdVVUZETlVNc1NVRkJTU3hEUVVGRExHRkJRV0VzUTBGQlF5eEpRVUZKTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXh0UWtGQmJVSTdVVUZEYmtRc1NVRkJTU3hEUVVGRExHTkJRV01zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTXhRaXhKUVVGSkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5dzRRa0ZCT0VJN1VVRkRNMFFzUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4SlFVRkpMRWRCUVVjc1EwRkJReXhGUVVGRkxFbEJRVWtzUjBGQlJ5eERRVUZETEVWQlFVVXNTVUZCU1N4RlFVRkZMRVZCUVVVc1EwRkJRenRaUVVOc1F5eEpRVUZKTEZsQlFWa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExGTkJRVk1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1kwRkJZeXhIUVVGSExFbEJRVWtzUTBGQlF5eERRVUZETzFsQlEycEdMRWxCUVVrc1YwRkJWeXhIUVVGSExGbEJRVmtzUjBGQlJ5eE5RVUZOTEVOQlFVTTdXVUZEZUVNc1NVRkJTU3hYUVVGWExFZEJRVWNzVjBGQlZ5eEhRVUZITEUxQlFVMHNRMEZCUXp0WlFVTjJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVkQlFVY3NSMEZCUnl4RFFVRkRMRVZCUVVVc1IwRkJSeXhIUVVGSExFMUJRVTBzUlVGQlJTeEhRVUZITEVWQlFVVXNSVUZCUlN4RFFVRkRPMmRDUVVOd1F5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhaUVVGWkxFZEJRVWNzUjBGQlJ5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVONlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFZEJRVWNzUjBGQlJ5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVONFF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFZEJRVWNzUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUXk5RExFTkJRVU03V1VGRFJDeEpRVUZKTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNTVUZCU1N4TFFVRkxMRU5CUVVNc1EwRkJReXhIUVVGSExFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMSGxEUVVGNVF6dFpRVU5zUnl4SlFVRkpMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEZkQlFWYzdXVUZET1VNc1NVRkJTU3hEUVVGRExHdENRVUZyUWl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4aFFVRmhPMWxCUTJ4RUxFbEJRVWtzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4aFFVRmhPMWxCUXpkRExFbEJRVWtzUTBGQlF5eGpRVUZqTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zYVVKQlFXbENPMUZCUTI1RUxFTkJRVU03U1VGRFRDeERRVUZETzBsQlIwUXNlVUpCUVZFc1IwRkJVaXhWUVVGVExFTkJRVU1zUlVGQlJTeERRVUZETEVWQlFVVXNRMEZCUXp0UlFVTmFMR2xFUVVGcFJEdFJRVU5xUkN4elEwRkJjME03VVVGRGRFTXNiVVJCUVcxRU8xRkJRMjVFTEVsQlFVa3NTVUZCU1N4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEY2tNc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhuUTBGQlowTTdTVUZETTBRc1EwRkJRenRKUVVkRU96czdPenM3T3pzN1RVRlRSVHRKUVVWR0xIZENRVUZQTEVkQlFWQXNWVUZCVVN4SlFVRkpMRVZCUVVVc1IwRkJSeXhGUVVGRkxFZEJRVWNzUlVGQlJTeEpRVUZKTEVWQlFVVXNUMEZCWXl4RlFVRkZMRTlCUVdNN1VVRkJPVUlzZDBKQlFVRXNSVUZCUVN4alFVRmpPMUZCUVVVc2QwSkJRVUVzUlVGQlFTeGpRVUZqTzFGQlEzaEVMRWxCUVVrc1VVRkJVU3hIUVVGSExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNVMEZCVXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eGpRVUZqTEVkQlFVY3NTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkROMFVzU1VGQlNTeFJRVUZSTEVkQlFVY3NVVUZCVVN4SFFVRkhMRU5CUVVNc1IwRkJSeXhIUVVGSExFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTXNSMEZCUnl4SFFVRkhMRU5CUVVNN1VVRkRNVVFzU1VGQlNTeE5RVUZOTEVkQlFVY3NVVUZCVVN4SFFVRkhMRTFCUVUwc1EwRkJRenRSUVVNdlFpeEpRVUZKTEUxQlFVMHNSMEZCUnl4UlFVRlJMRWRCUVVjc1RVRkJUU3hEUVVGRE8xRkJSUzlDTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTnNReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03VVVGRGJrTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeEZRVUZGTEU5QlFVOHNRMEZCUXl4RFFVRkRPMGxCUTNaRExFTkJRVU03U1VGRlJDdzRRMEZCTmtJc1IwRkJOMElzVlVGQk9FSXNUMEZCVHp0UlFVTnFReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNhMEpCUVd0Q0xFVkJRVVVzUTBGQlF6dFJRVVZzUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVVM1FpeHpRMEZCYzBNN1VVRkRkRU1zZDBSQlFYZEVPMUZCUTNoRUxESkVRVUV5UkR0UlFVTXpSQ3g1UTBGQmVVTTdVVUZEZWtNc1pVRkJaVHRSUVVObUxGZEJRVmM3VVVGRldDeHhRMEZCY1VNN1NVRkRla01zUTBGQlF6dEpRVVZFTERSQ1FVRTBRanRKUVVNMVFpdzJRMEZCTkVJc1IwRkJOVUlzVlVGQk5rSXNTVUZCU1N4RlFVRkZMRTlCUVU4N1VVRkZkRU1zYzBOQlFYTkRPMUZCUTJ4RExFbEJRVUVzWjBOQlFUUkRMRVZCUVRORExHRkJRVXNzUlVGQlJTeGhRVUZMTEVWQlEySXNVVUZCVVN4SFFVRkhMRXRCUVVzc1JVRkJSU3hqUVVGakxFZEJRVWNzVVVGQlVTeEhRVUZITEV0QlFVc3NSVUZEYmtRc1UwRkJVeXhIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NTMEZCU3l4RlFVRkZMR1ZCUVdVc1IwRkJSeXhEUVVGRExGTkJRVk1zUjBGQlJ5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUXpGRkxFOUJRVThzUjBGQlJ5eExRVUZMTEVWQlFVVXNZVUZCWVN4SFFVRkhMRTlCUVU4c1IwRkJSeXhMUVVGTExFVkJRMmhFTEZWQlFWVXNSMEZCUnl4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFdEJRVXNzUlVGQlJTeG5Ra0ZCWjBJc1IwRkJSeXhEUVVGRExGVkJRVlVzUjBGQlJ5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUXpsRkxHdERRVUZyUkN4RlFVRnFSQ3hsUVVGUExFVkJRVVVzWlVGQlR5eEZRVU5xUWl4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFbEJRVWtzUlVGRE1VTXNUMEZCVHl4SFFVRkhMRWxCUVVrc1EwRkJReXhqUVVGakxFTkJRVU1zU1VGQlNTeERRVUZETEVWQlEyNURMRmRCUVZjc1IwRkJSeXhQUVVGUExFZEJRVWNzUzBGQlN5eEZRVU0zUWl4WlFVRlpMRWRCUVVjc1NVRkJTU3hIUVVGSExFMUJRVTBzUlVGRE5VSXNiVUpCUVcxQ0xFVkJRVVVzYlVKQlFXMUNMRVZCUTNoRExFbEJRVWtzUlVGQlJTeEpRVUZKTEVWQlFVVXNWMEZCVnl4RlFVRkZMRWxCUVVrc1JVRkROMElzU1VGQlNTeEZRVUZGTEVsQlFVa3NSVUZCUlN4TFFVRkxMRVZCUVVVc1MwRkJTeXhGUVVONFFpeExRVUZMTEVkQlFVY3NRMEZCUXl4SFFVRkhMRXRCUVVzc1EwRkJRenRSUVVWMFFpeFBRVUZQTEVkQlFVY3NNa0pCUVdNc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdVVUZEZUVNc1QwRkJUeXhIUVVGSExESkNRVUZqTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xRkJSWGhETERCRFFVRXdRenRSUVVNeFF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRWRCUVVjc1IwRkJSeXhKUVVGSkxFTkJRVU1zVTBGQlV5eEhRVUZITEVOQlFVTXNSVUZCUlN4SFFVRkhMRWRCUVVjc1EwRkJReXhEUVVGRExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVWQlFVVXNRMEZCUXp0WlFVTnFSQ3h4UkVGQmNVUTdXVUZEY2tRc1MwRkJTeXhIUVVGSExFTkJRVU1zUjBGQlJ5eEpRVUZKTEV0QlFVc3NRMEZCUXl4SFFVRkhMRTlCUVU4c1EwRkJRenRaUVVWcVF5eDNSRUZCZDBRN1dVRkRlRVFzUlVGQlJTeERRVUZETEVOQlFVTXNTMEZCU3l4SlFVRkpMR0ZCUVdFc1NVRkJTU3hMUVVGTExFbEJRVWtzWjBKQlFXZENMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU4wUkN4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFZEJRVWNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNXVUZCV1N4SFFVRkhMRU5CUVVNc1JVRkJSU3hIUVVGSExFZEJRVWNzUTBGQlF5eERRVUZETEVWQlFVVXNSMEZCUnl4RlFVRkZMRVZCUVVVc1EwRkJRenR2UWtGRGNFUXNORVJCUVRSRU8yOUNRVU0xUkN4TFFVRkxMRWRCUVVjc1EwRkJReXhIUVVGSExFbEJRVWtzUzBGQlN5eERRVUZETEVkQlFVY3NUMEZCVHl4RFFVRkRPMjlDUVVWcVF5eHRRMEZCYlVNN2IwSkJRMjVETEVWQlFVVXNRMEZCUXl4RFFVRkRMRXRCUVVzc1NVRkJTU3hqUVVGakxFbEJRVWtzUzBGQlN5eEpRVUZKTEdWQlFXVXNRMEZCUXl4RFFVRkRMRU5CUVVNN2QwSkJSWFJFTEhsRVFVRjVSRHQzUWtGRGVrUXNTVUZCU1N4SFFVRkhMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1EwRkJReXhIUVVGSExFZEJRVWNzUjBGQlJ5eFpRVUZaTEVOQlFVTTdkMEpCUlhCRUxHVkJRV1U3ZDBKQlEyWXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdkMEpCUTNwQ0xGZEJRVmNzUjBGQlJ5eFhRVUZYTEVkQlFVY3NRMEZCUXl4SlFVRkpMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03ZDBKQlJYaERMREpDUVVFeVFqdDNRa0ZETTBJc2JVSkJRVzFDTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFZEJRVWNzVFVGQlRTeERRVUZETEVOQlFVTTdkMEpCUTJwRUxHMUNRVUZ0UWl4SFFVRkhMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeEhRVUZITEUxQlFVMHNRMEZCUXl4RFFVRkRPM2RDUVVWcVJDeHZRMEZCYjBNN2QwSkJRM0JETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVc1EwRkJRenMwUWtGRGVrTXNTVUZCU1N4SFFVRkhMRU5CUVVNc1IwRkJSeXhMUVVGTExFTkJRVU03TkVKQlEycENMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVVzUTBGQlF6dG5RMEZEZWtNc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNWMEZCVnl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owTkJRekZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1MwRkJTeXhKUVVGSkxFbEJRVWtzU1VGQlNTeExRVUZMTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN2IwTkJRMnBETEVsQlFVa3NSMEZCUnl4RFFVRkRMRWxCUVVrc1MwRkJTeXhKUVVGSkxFZEJRVWNzYlVKQlFXMUNMRWRCUVVjc2JVSkJRVzFDTEVOQlFVTXNRMEZCUXp0blEwRkRka1VzUTBGQlF6dG5RMEZEUkN4RlFVRkZMRU5CUVVNc1EwRkJReXhKUVVGSkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0dlEwRkRXQ3hKUVVGSkxFZEJRVWNzUTBGQlF5eEhRVUZITEV0QlFVc3NRMEZCUXp0dlEwRkRha0lzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1NVRkJTU3hSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4VFFVRlRMRU5CUVVNc1EwRkJRenQzUTBGRE1VTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1NVRkJTU3hQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4VlFVRlZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dDNRMEZETjBNc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVWQlFVVXNTVUZCU1N4RlFVRkZMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETzI5RFFVTTNReXhEUVVGRE8yZERRVU5NTEVOQlFVTTdORUpCUTB3c1EwRkJRenQzUWtGRFRDeERRVUZETzI5Q1FVTk1MRU5CUVVNN1owSkJRMHdzUTBGQlF6dFpRVU5NTEVOQlFVTTdVVUZEVEN4RFFVRkRPMGxCUTB3c1EwRkJRenRKUVVWRUxESkNRVUV5UWp0SlFVVXpRaXcyUTBGQk5FSXNSMEZCTlVJc1ZVRkJOa0lzU1VGQlNTeEZRVUZGTEU5QlFVODdVVUZGZEVNc2MwTkJRWE5ETzFGQlEyeERMRWxCUVVFc1owTkJRVFJETEVWQlFUTkRMR0ZCUVVzc1JVRkJSU3hoUVVGTExFVkJRMklzVVVGQlVTeEhRVUZITEV0QlFVc3NSVUZEYUVJc1UwRkJVeXhIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NTMEZCU3l4RlFVTXZRaXhQUVVGUExFZEJRVWNzUzBGQlN5eEZRVU5tTEZWQlFWVXNSMEZCUnl4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFdEJRVXNzUlVGRGFrTXNhME5CUVd0RUxFVkJRV3BFTEdWQlFVOHNSVUZCUlN4bFFVRlBMRVZCUTJwQ0xFdEJRVXNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NTVUZCU1N4RlFVTXhReXhQUVVGUExFZEJRVWNzU1VGQlNTeERRVUZETEdOQlFXTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkRia01zVjBGQlZ5eEhRVUZITEU5QlFVOHNSMEZCUnl4TFFVRkxMRVZCUXpkQ0xGbEJRVmtzUjBGQlJ5eEpRVUZKTEVkQlFVY3NUVUZCVFN4RlFVTTFRaXh0UWtGQmJVSXNSVUZCUlN4dFFrRkJiVUlzUlVGRGVFTXNTVUZCU1N4RlFVRkZMRWxCUVVrc1JVRkJSU3hYUVVGWExFVkJRVVVzU1VGQlNTeEZRVU0zUWl4SlFVRkpMRVZCUVVVc1NVRkJTU3hGUVVOV0xFdEJRVXNzUjBGQlJ5eERRVUZETEVkQlFVY3NTMEZCU3l4RlFVRkZMRkZCUVZFc1JVRkJSU3hQUVVGUExFTkJRVU03VVVGRmVrTXNUMEZCVHl4SFFVRkhMREpDUVVGakxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMUZCUTNoRExFOUJRVThzUjBGQlJ5d3lRa0ZCWXl4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFJRVVY0UXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNUMEZCVHl4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVc1EwRkJRenRaUVVONlF5eFJRVUZSTEVkQlFVY3NRMEZCUXl4SlFVRkpMRXRCUVVzc1EwRkJRenRaUVVOMFFpeFBRVUZQTEVkQlFVY3NRMEZCUXl4SlFVRkpMRXRCUVVzc1EwRkJRenRaUVVOeVFpeEpRVUZKTEVkQlFVY3NRMEZCUXl4SFFVRkhMRTlCUVU4c1EwRkJRenRaUVVWdVFpeEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVXNRMEZCUXp0blFrRkZlRU1zY1VKQlFYRkNPMmRDUVVOeVFpd3lSRUZCTWtRN1owSkJRek5FTEVsQlFVa3NSMEZCUnl4RFFVRkRMRkZCUVZFc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEZGQlFWRXNTVUZCU1N4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEVOQlFVTXNSMEZCUnl4WlFVRlpMRU5CUVVNN1owSkJRM1pGTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzJkQ1FVVjZRaXd5UWtGQk1rSTdaMEpCUXpOQ0xHMUNRVUZ0UWl4SFFVRkhMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeEhRVUZITEUxQlFVMHNRMEZCUXl4RFFVRkRPMmRDUVVOcVJDeHRRa0ZCYlVJc1IwRkJSeXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NSMEZCUnl4TlFVRk5MRU5CUVVNc1EwRkJRenRuUWtGRmFrUXNjVUpCUVhGQ08yZENRVU55UWl4WFFVRlhMRWRCUVVjc1EwRkJReXhEUVVGRExFOUJRVThzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEV0QlFVc3NRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeEpRVUZKTEVOQlFVTXNRMEZCUXl4SFFVRkhMRmRCUVZjc1EwRkJRenRuUWtGRE1VWXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTTdaMEpCUlc1RExFVkJRVVVzUTBGQlF5eERRVUZETEVsQlFVa3NTMEZCU3l4SlFVRkpMRWxCUVVrc1NVRkJTU3hMUVVGTExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTTdiMEpCUTJwRExFbEJRVWtzUjBGQlJ5eERRVUZETEVsQlFVa3NTMEZCU3l4SlFVRkpMRWRCUVVjc2JVSkJRVzFDTEVkQlFVY3NiVUpCUVcxQ0xFTkJRVU1zUTBGQlF6dG5Ra0ZEZGtVc1EwRkJRenRuUWtGRlJDeEpRVUZKTEVkQlFVY3NRMEZCUXl4SFFVRkhMRTlCUVU4c1EwRkJRenRuUWtGRmJrSXNSVUZCUlN4RFFVRkRMRU5CUVVNc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdiMEpCUTFnc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NTVUZCU1N4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUjBGQlJ5eFRRVUZUTEVOQlFVTXNRMEZCUXp0M1FrRkRNVU1zUTBGQlF5eERRVUZETEVsQlFVa3NTVUZCU1N4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUjBGQlJ5eFZRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenQzUWtGRE4wTXNTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFVkJRVVVzU1VGQlNTeEZRVUZGTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8yOUNRVU0zUXl4RFFVRkRPMmRDUVVOTUxFTkJRVU03V1VGRFRDeERRVUZETzFGQlEwd3NRMEZCUXp0UlFVVkVMSEZEUVVGeFF6dEpRVU42UXl4RFFVRkRPMGxCUlVRc2RVTkJRWE5DTEVkQlFYUkNMRlZCUVhWQ0xFOUJRVTg3VVVGRE1VSXNTVUZCU1N4SlFVRkpMRVZCUTBvc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNZVUZCWVN4RFFVRkRPMUZCUlhSRExITkRRVUZ6UXp0UlFVTjBReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVVzUTBGQlF6dFpRVU42UXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCVFN4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVc1EwRkJRenRuUWtGRGVFTXNTVUZCU1N4RlFVRkZMRU5CUVVNN1owSkJRMUFzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzJkQ1FVTXZRaXhGUVVGRkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenR2UWtGRFdDeEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNc1JVRkJSU3hEUVVGRExFVkJRVVVzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRM1pETEVOQlFVTTdXVUZEVEN4RFFVRkRPMUZCUTB3c1EwRkJRenRSUVVWRUxIRkRRVUZ4UXp0SlFVTjZReXhEUVVGRE8wbEJSVVE3T3pzN08wMUJTMFU3U1VGRlJpd3lRMEZCTUVJc1IwRkJNVUk3VVVGRFNTeEpRVUZKTEZkQlFWY3NSMEZCUnl4SlFVRkpMRU5CUVVNc1kwRkJZeXhGUVVGRkxFTkJRVU03VVVGRGVFTXNTVUZCU1N4TFFVRkxMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEZkQlFWY3NRMEZCUXl4SFFVRkhMRlZCUVZVc1EwRkJReXhEUVVGRE8xRkJRM1JFTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1MwRkJTeXhIUVVGSExGVkJRVlVzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXp0UlFVTnVReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEV0QlFVc3NSMEZCUnl4VlFVRlZMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGJFTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhMUVVGTExFZEJRVWNzVlVGQlZTeERRVUZETEVOQlFVTTdVVUZETjBJc1NVRkJTU3hIUVVGSExFZEJRVWNzVTBGQlR5eERRVUZETEZWQlFVc3NRMEZCUXl4VlFVRkxMRU5CUVVNc1RVRkJSeXhEUVVGRE8xRkJRMnhETEVsQlFVa3NRMEZCUXl4bFFVRmxMRU5CUVVNc1MwRkJTeXhEUVVGRExHVkJRV1VzUjBGQlJ5eEhRVUZITEVOQlFVTTdVVUZEYWtRc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTXNaVUZCWlN4SFFVRkhMRWRCUVVjc1EwRkJRenRKUVVNM1F5eERRVUZETzBsQlJVUXNjVU5CUVc5Q0xFZEJRWEJDTEZWQlFYRkNMRTlCUVU4N1VVRkRlRUlzU1VGQlNTeFhRVUZYTEVkQlFVY3NTVUZCU1N4RFFVRkRMR05CUVdNc1JVRkJSU3hGUVVOdVF5eDVRa0ZCYVVRc1JVRkJhRVFzYlVKQlFWY3NSVUZCUlN4dFFrRkJWeXhGUVVONlFpeFZRVUZWTEVkQlFVY3NWMEZCVnl4RlFVTjRRaXhYUVVGWExFZEJRVWNzU1VGQlNTeERRVUZETEUxQlFVMHNSMEZCUnl4WFFVRlhMRVZCUTNaRExGTkJRVk1zUjBGQlJ5eFhRVUZYTEVWQlEzWkNMRmxCUVZrc1IwRkJSeXhKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEZkQlFWY3NRMEZCUXp0UlFVVTVReXh6UTBGQmMwTTdVVUZEZEVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRTlCUVU4c1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJSU3hGUVVGRkxFTkJRVU03V1VGRGVrTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNSVUZCUlN4RlFVRkZMRU5CUVVNN1owSkJRM2hETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzVlVGQlZTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRWxCUVVrc1YwRkJWeXhEUVVGRExFTkJRVU03YjBKQlEzaERMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzVTBGQlV5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRWxCUVVrc1dVRkJXU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdiMEpCUXpORExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJSU3hQUVVGUExFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRPVU1zUTBGQlF6dFpRVU5NTEVOQlFVTTdVVUZEVEN4RFFVRkRPMUZCUlVRc2NVTkJRWEZETzBsQlEzcERMRU5CUVVNN1NVRkZSQ3gxUWtGQlRTeEhRVUZPTzFGQlEwa3NTVUZCU1N4TFFVRkxMRVZCUVVVc1QwRkJUeXhIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU40UWl4SlFVRkpMRTFCUVUwc1IwRkJSenRaUVVOVUxFVkJRVVU3V1VGRFJpeEZRVUZGTzFsQlEwWXNSVUZCUlR0WlFVTkdMRVZCUVVVN1dVRkRSaXhGUVVGRk8xbEJRMFlzUlVGQlJUdFpRVU5HTEVWQlFVVTdXVUZEUml4RlFVRkZPMU5CUTB3c1EwRkJRenRSUVVWR0xEaENRVUU0UWp0UlFVTTVRaXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXcyUWtGQk5rSXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVVU1UkN3d1EwRkJNRU03VVVGRE1VTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hKUVVGSkxFZEJRVWNzUTBGQlF5eEZRVUZGTEVsQlFVa3NSMEZCUnl4RFFVRkRMRVZCUVVVc1NVRkJTU3hGUVVGRkxFVkJRVVVzUTBGQlF6dFpRVU5zUXl4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xbEJRM0JETEVWQlFVVXNRMEZCUXl4RFFVRkRMRXRCUVVzc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTmFMRTFCUVUwc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMSE5DUVVGelFpeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU55UlN4RFFVRkRPMUZCUTB3c1EwRkJRenRSUVVWRUxIbENRVUY1UWp0UlFVTjZRaXhMUVVGTExFZEJRVWNzU1VGQlNTeERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFTkJRVU03VVVGRGFFTXNSVUZCUlN4RFFVRkRMRU5CUVVNc1MwRkJTeXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEV2l4TlFVRk5MRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4elFrRkJjMElzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVNdlJDeERRVUZETzFGQlJVUXNiVUpCUVcxQ08xRkJRMjVDTEU5QlFVODdVVUZGVUN4clFrRkJhMEk3VVVGRGJFSXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNiMEpCUVc5Q0xFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkZja1FzSzBKQlFTdENPMUZCUlM5Q0xHOUNRVUZ2UWp0UlFVTndRaXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhIUVVGSExFZEJRVWNzUlVGQlJTeERRVUZETEVWQlFVVXNSVUZCUlN4RFFVRkRPMWxCUXpOQ0xFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eFZRVUZWTEVOQlFVTXNRMEZCUXp0UlFVTm9SQ3hEUVVGRE8xRkJSVVFzYlVKQlFXMUNPMUZCUTI1Q0xIRkNRVUZ4UWp0UlFVTnlRaXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEZGQlFWRXNSMEZCUnl4RFFVRkRMRVZCUVVVc1VVRkJVU3hIUVVGSExFTkJRVU1zUlVGQlJTeFJRVUZSTEVWQlFVVXNSVUZCUlN4RFFVRkRPMWxCUXpsRExFbEJRVWtzVDBGQlR5eEhRVUZITEUxQlFVMHNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRaUVVNdlFpeEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRk5CUVZNc1IwRkJSeXhEUVVGRExFVkJRVVVzVTBGQlV5eEhRVUZITEU5QlFVOHNRMEZCUXl4TlFVRk5MRVZCUVVVc1UwRkJVeXhGUVVGRkxFVkJRVVVzUTBGQlF6dG5Ra0ZET1VRc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMWxCUTJoRExFTkJRVU03VVVGRFRDeERRVUZETzBsQlEwd3NRMEZCUXp0SlFVVkVMSEZDUVVGSkxFZEJRVW83VVVGRFNTeEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMUZCUTNaRExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGVkxFVkJRVVVzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTNCRUxFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNVMEZCVXl4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUXpsRExFbEJRVWtzUTBGQlF5d3dRa0ZCTUVJc1JVRkJSU3hEUVVGRE8wbEJRM1JETEVOQlFVTTdTVUZEVEN4aFFVRkRPMEZCUVVRc1EwRkJReXhCUVRWb1FrUXNTVUUwYUVKREluMD1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9jb3JlL1NjcmVlbi5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiJdLCJzb3VyY2VSb290IjoiIn0=