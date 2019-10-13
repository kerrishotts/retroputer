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
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
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

/***/ 3:
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
            //this.poke(i, Math.floor(Math.random() * 256));
            this.poke(i, 0);
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

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* globals self */
var Screen_js_1 = __webpack_require__(8);
var Memory_js_1 = __webpack_require__(3);
var memoryLayout_js_1 = __webpack_require__(4);
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

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable */
exports.memoryLayout = {
    size: 256,
    memlen: 0x40000,
    memtop: 0x3FFFF,
    iolen: 256,
    iotop: 0x3FFFF,
    ioComm3DataIn: 0x3FF4F,
    ioComm3DataOut: 0x3FF4E,
    ioComm3Command: 0x3FF4D,
    ioComm3Configuration: 0x3FF4C,
    ioComm2DataIn: 0x3FF4B,
    ioComm2DataOut: 0x3FF4A,
    ioComm2Command: 0x3FF49,
    ioComm2Configuration: 0x3FF48,
    ioComm1DataIn: 0x3FF47,
    ioComm1DataOut: 0x3FF46,
    ioComm1Command: 0x3FF45,
    ioComm1Configuration: 0x3FF44,
    ioComm0DataIn: 0x3FF43,
    ioComm0DataOut: 0x3FF42,
    ioComm0Command: 0x3FF41,
    ioComm0Configuration: 0x3FF40 // b0 = opened; b1 = cmd sent; b2 = cmd ack; b3 = data out sent; b4 = data out ack; b5 = data in sent; b6 = data in ack
    ,
    ioRandomHigh: 0x3FF39,
    ioRandomLow: 0x3FF38,
    ioClockHours: 0x3FF33,
    ioClockMinutes: 0x3FF32,
    ioClockSeconds: 0x3FF31,
    ioClockHundredths: 0x3FF30,
    ioTimer3HighCurrent: 0x3FF2C,
    ioTimer3LowCurrent: 0x3FF2B,
    ioTimer3HighReset: 0x3FF2A,
    ioTimer3LowReset: 0x3FF29,
    ioTimer3Configuration: 0x3FF28,
    ioTimer2HighCurrent: 0x3FF24,
    ioTimer2LowCurrent: 0x3FF23,
    ioTimer2HighReset: 0x3FF22,
    ioTimer2LowReset: 0x3FF21,
    ioTimer2Configuration: 0x3FF20,
    ioTimer1HighCurrent: 0x3FF1C,
    ioTimer1LowCurrent: 0x3FF1B,
    ioTimer1HighReset: 0x3FF1A,
    ioTimer1LowReset: 0x3FF19,
    ioTimer1Configuration: 0x3FF18,
    ioTimer0HighCurrent: 0x3FF14,
    ioTimer0LowCurrent: 0x3FF13,
    ioTimer0HighReset: 0x3FF12,
    ioTimer0LowReset: 0x3FF11,
    ioTimer0Configuration: 0x3FF10 // b0 = enabled; b1: 0 = one-shot, 1 = continuous; b2: 0 = no interrupt, 1 = trigger interrupt; b7 = triggered (manual reset)
    ,
    ioKeyboardDirections: 0x3FF02,
    ioKeyboardModifiers: 0x3FF01,
    ioKeyboardKeyPressed: 0x3FF00,
    iobot: 0x3FF00,
    spriteCount: 16,
    spriteFHeight: 0x340AF,
    spriteEHeight: 0x340AE,
    spriteDHeight: 0x340AD,
    spriteCHeight: 0x340AC,
    spriteBHeight: 0x340AB,
    spriteAHeight: 0x340AA,
    sprite9Height: 0x340A9,
    sprite8Height: 0x340A8,
    sprite7Height: 0x340A7,
    sprite6Height: 0x340A6,
    sprite5Height: 0x340A5,
    sprite4Height: 0x340A4,
    sprite3Height: 0x340A3,
    sprite2Height: 0x340A2,
    sprite1Height: 0x340A1,
    sprite0Height: 0x340A0,
    spriteFWidth: 0x3409F,
    spriteEWidth: 0x3409E,
    spriteDWidth: 0x3409D,
    spriteCWidth: 0x3409C,
    spriteBWidth: 0x3409B,
    spriteAWidth: 0x3409A,
    sprite9Width: 0x34099,
    sprite8Width: 0x34098,
    sprite7Width: 0x34097,
    sprite6Width: 0x34096,
    sprite5Width: 0x34095,
    sprite4Width: 0x34094,
    sprite3Width: 0x34093,
    sprite2Width: 0x34092,
    sprite1Width: 0x34091,
    sprite0Width: 0x34090,
    spriteFTile: 0x3408F,
    spriteETile: 0x3408E,
    spriteDTile: 0x3408D,
    spriteCTile: 0x3408C,
    spriteBTile: 0x3408B,
    spriteATile: 0x3408A,
    sprite9Tile: 0x34089,
    sprite8Tile: 0x34088,
    sprite7Tile: 0x34087,
    sprite6Tile: 0x34086,
    sprite5Tile: 0x34085,
    sprite4Tile: 0x34084,
    sprite3Tile: 0x34083,
    sprite2Tile: 0x34082,
    sprite1Tile: 0x34081,
    sprite0Tile: 0x34080,
    spriteFTileSet: 0x3407F,
    spriteETileSet: 0x3407E,
    spriteDTileSet: 0x3407D,
    spriteCTileSet: 0x3407C,
    spriteBTileSet: 0x3407B,
    spriteATileSet: 0x3407A,
    sprite9TileSet: 0x34079,
    sprite8TileSet: 0x34078,
    sprite7TileSet: 0x34077,
    sprite6TileSet: 0x34076,
    sprite5TileSet: 0x34075,
    sprite4TileSet: 0x34074,
    sprite3TileSet: 0x34073,
    sprite2TileSet: 0x34072,
    sprite1TileSet: 0x34071,
    sprite0TileSet: 0x34070,
    spriteFFGColor: 0x3406F,
    spriteEFGColor: 0x3406E,
    spriteDFGColor: 0x3406D,
    spriteCFGColor: 0x3406C,
    spriteBFGColor: 0x3406B,
    spriteAFGColor: 0x3406A,
    sprite9FGColor: 0x34069,
    sprite8FGColor: 0x34068,
    sprite7FGColor: 0x34067,
    sprite6FGColor: 0x34066,
    sprite5FGColor: 0x34065,
    sprite4FGColor: 0x34064,
    sprite3FGColor: 0x34063,
    sprite2FGColor: 0x34062,
    sprite1FGColor: 0x34061,
    sprite0FGColor: 0x34060,
    spriteFBGColor: 0x3405F,
    spriteEBGColor: 0x3405E,
    spriteDBGColor: 0x3405D,
    spriteCBGColor: 0x3405C,
    spriteBBGColor: 0x3405B,
    spriteABGColor: 0x3405A,
    sprite9BGColor: 0x34059,
    sprite8BGColor: 0x34058,
    sprite7BGColor: 0x34057,
    sprite6BGColor: 0x34056,
    sprite5BGColor: 0x34055,
    sprite4BGColor: 0x34054,
    sprite3BGColor: 0x34053,
    sprite2BGColor: 0x34052,
    sprite1BGColor: 0x34051,
    sprite0BGColor: 0x34050,
    spriteFScale: 0x3404F,
    spriteEScale: 0x3404E,
    spriteDScale: 0x3404D,
    spriteCScale: 0x3404C,
    spriteBScale: 0x3404B,
    spriteAScale: 0x3404A,
    sprite9Scale: 0x34049,
    sprite8Scale: 0x34048,
    sprite7Scale: 0x34047,
    sprite6Scale: 0x34046,
    sprite5Scale: 0x34045,
    sprite4Scale: 0x34044,
    sprite3Scale: 0x34043,
    sprite2Scale: 0x34042,
    sprite1Scale: 0x34041,
    sprite0Scale: 0x34040,
    spriteFYPosition: 0x3403F,
    spriteEYPosition: 0x3403E,
    spriteDYPosition: 0x3403D,
    spriteCYPosition: 0x3403C,
    spriteBYPosition: 0x3403B,
    spriteAYPosition: 0x3403A,
    sprite9YPosition: 0x34039,
    sprite8YPosition: 0x34038,
    sprite7YPosition: 0x34037,
    sprite6YPosition: 0x34036,
    sprite5YPosition: 0x34035,
    sprite4YPosition: 0x34034,
    sprite3YPosition: 0x34033,
    sprite2YPosition: 0x34032,
    sprite1YPosition: 0x34031,
    sprite0YPosition: 0x34030,
    spriteFXPosition: 0x3401F,
    spriteEXPosition: 0x3401E,
    spriteDXPosition: 0x3401D,
    spriteCXPosition: 0x3401C,
    spriteBXPosition: 0x3401B,
    spriteAXPosition: 0x3401A,
    sprite9XPosition: 0x34019,
    sprite8XPosition: 0x34018,
    sprite7XPosition: 0x34017,
    sprite6XPosition: 0x34016,
    sprite5XPosition: 0x34015,
    sprite4XPosition: 0x34014,
    sprite3XPosition: 0x34013,
    sprite2XPosition: 0x34012,
    sprite1XPosition: 0x34011,
    sprite0XPosition: 0x34010,
    spriteFLayer: 0x3400F,
    spriteELayer: 0x3400E,
    spriteDLayer: 0x3400D,
    spriteCLayer: 0x3400C,
    spriteBLayer: 0x3400B,
    spriteALayer: 0x3400A,
    sprite9Layer: 0x34009,
    sprite8Layer: 0x34008,
    sprite7Layer: 0x34007,
    sprite6Layer: 0x34006,
    sprite5Layer: 0x34005,
    sprite4Layer: 0x34004,
    sprite3Layer: 0x34003,
    sprite2Layer: 0x34002,
    sprite1Layer: 0x34001,
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
    romScratchStart: 0x0B000 // ROM scratch area
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb3J5TGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVtb3J5TGF5b3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDVCxRQUFBLFlBQVksR0FBRztJQUN4QixJQUFJLEVBQUUsR0FBRztJQUNQLE1BQU0sRUFBRSxPQUFPO0lBQ2YsTUFBTSxFQUFFLE9BQU87SUFDZixLQUFLLEVBQUUsR0FBRztJQUNWLEtBQUssRUFBRSxPQUFPO0lBQ2QsYUFBYSxFQUFFLE9BQU87SUFDdEIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsb0JBQW9CLEVBQUUsT0FBTztJQUM3QixhQUFhLEVBQUUsT0FBTztJQUN0QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixvQkFBb0IsRUFBRSxPQUFPO0lBQzdCLGFBQWEsRUFBRSxPQUFPO0lBQ3RCLGNBQWMsRUFBRSxPQUFPO0lBQ3ZCLGNBQWMsRUFBRSxPQUFPO0lBQ3ZCLG9CQUFvQixFQUFFLE9BQU87SUFDN0IsYUFBYSxFQUFFLE9BQU87SUFDdEIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsb0JBQW9CLEVBQUUsT0FBTyxDQUFFLHVIQUF1SDs7SUFDdEosWUFBWSxFQUFFLE9BQU87SUFDckIsV0FBVyxFQUFFLE9BQU87SUFDcEIsWUFBWSxFQUFFLE9BQU87SUFDckIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsaUJBQWlCLEVBQUUsT0FBTztJQUMxQixtQkFBbUIsRUFBRSxPQUFPO0lBQzVCLGtCQUFrQixFQUFFLE9BQU87SUFDM0IsaUJBQWlCLEVBQUUsT0FBTztJQUMxQixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLHFCQUFxQixFQUFFLE9BQU87SUFDOUIsbUJBQW1CLEVBQUUsT0FBTztJQUM1QixrQkFBa0IsRUFBRSxPQUFPO0lBQzNCLGlCQUFpQixFQUFFLE9BQU87SUFDMUIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixxQkFBcUIsRUFBRSxPQUFPO0lBQzlCLG1CQUFtQixFQUFFLE9BQU87SUFDNUIsa0JBQWtCLEVBQUUsT0FBTztJQUMzQixpQkFBaUIsRUFBRSxPQUFPO0lBQzFCLGdCQUFnQixFQUFFLE9BQU87SUFDekIscUJBQXFCLEVBQUUsT0FBTztJQUM5QixtQkFBbUIsRUFBRSxPQUFPO0lBQzVCLGtCQUFrQixFQUFFLE9BQU87SUFDM0IsaUJBQWlCLEVBQUUsT0FBTztJQUMxQixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLHFCQUFxQixFQUFFLE9BQU8sQ0FBRSw2SEFBNkg7O0lBQzdKLG9CQUFvQixFQUFFLE9BQU87SUFDN0IsbUJBQW1CLEVBQUUsT0FBTztJQUM1QixvQkFBb0IsRUFBRSxPQUFPO0lBQzdCLEtBQUssRUFBRSxPQUFPO0lBQ2QsV0FBVyxFQUFFLEVBQUU7SUFDZixhQUFhLEVBQUUsT0FBTztJQUN0QixhQUFhLEVBQUUsT0FBTztJQUN0QixhQUFhLEVBQUUsT0FBTztJQUN0QixhQUFhLEVBQUUsT0FBTztJQUN0QixhQUFhLEVBQUUsT0FBTztJQUN0QixhQUFhLEVBQUUsT0FBTztJQUN0QixhQUFhLEVBQUUsT0FBTztJQUN0QixhQUFhLEVBQUUsT0FBTztJQUN0QixhQUFhLEVBQUUsT0FBTztJQUN0QixhQUFhLEVBQUUsT0FBTztJQUN0QixhQUFhLEVBQUUsT0FBTztJQUN0QixhQUFhLEVBQUUsT0FBTztJQUN0QixhQUFhLEVBQUUsT0FBTztJQUN0QixhQUFhLEVBQUUsT0FBTztJQUN0QixhQUFhLEVBQUUsT0FBTztJQUN0QixhQUFhLEVBQUUsT0FBTztJQUN0QixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixXQUFXLEVBQUUsT0FBTztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixZQUFZLEVBQUUsT0FBTztJQUNyQixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87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

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

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global SharedArrayBuffer */
var twosComplement_js_1 = __webpack_require__(2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjU1MGY3ZDlhOTAzNDY5NTk3NzY/NDdhNioiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvaGV4VXRpbHMuanM/ZWM0YyoiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvbG9nLmpzP2UyNTQqIiwid2VicGFjazovLy8uLi91dGlsL3R3b3NDb21wbGVtZW50LmpzP2ZkOGIqIiwid2VicGFjazovLy8uLi9jb3JlL01lbW9yeS5qcz82Y2JjKiIsIndlYnBhY2s6Ly8vLi4vd29ya2Vycy9TY3JlZW5Xb3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvbWVtb3J5TGF5b3V0LmpzP2RlMDcqIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanM/MzY5OCoiLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvU2NyZWVuLmpzP2JlMTEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ2hFQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQSxnQ0FBZ0MsaUJBQWlCO0FBQ2pELGdDQUFnQyxlQUFlO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGdDQUFnQyxlQUFlO0FBQy9DO0FBQ0EsS0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsMkNBQTJDLHVqUzs7Ozs7OztBQ3JWM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixVQUFVO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsY0FBYztBQUM1QztBQUNBLG1DQUFtQyw0QkFBNEI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLDJDQUEyQyx1dnpCIiwiZmlsZSI6IlNjcmVlbldvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiNTUwZjdkOWE5MDM0Njk1OTc3NiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICAgIHRvSGV4OiBmdW5jdGlvbiAodiwgZm9ybWF0LCBwcmVmaXgpIHtcbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gdm9pZCAwKSB7IGZvcm1hdCA9IFwiMDAwMFwiOyB9XG4gICAgICAgIGlmIChwcmVmaXggPT09IHZvaWQgMCkgeyBwcmVmaXggPSBcIjB4XCI7IH1cbiAgICAgICAgdmFyIGhleFZhbHVlID0gKHYgPT09IHVuZGVmaW5lZCA/IFwiMFwiIDogdikudG9TdHJpbmcoMTYpO1xuICAgICAgICBoZXhWYWx1ZSA9IGZvcm1hdC5zdWJzdHIoMCwgZm9ybWF0Lmxlbmd0aCAtIGhleFZhbHVlLmxlbmd0aCkgKyBoZXhWYWx1ZTtcbiAgICAgICAgcmV0dXJuIFwiXCIgKyBwcmVmaXggKyBoZXhWYWx1ZTtcbiAgICB9LFxuICAgIHRvSGV4MjogZnVuY3Rpb24gKHYsIHByZWZpeCkge1xuICAgICAgICBpZiAocHJlZml4ID09PSB2b2lkIDApIHsgcHJlZml4ID0gXCIweFwiOyB9XG4gICAgICAgIHJldHVybiB0aGlzLnRvSGV4KHYsIFwiMDBcIiwgcHJlZml4KTtcbiAgICB9LFxuICAgIHRvSGV4NDogZnVuY3Rpb24gKHYsIHByZWZpeCkge1xuICAgICAgICBpZiAocHJlZml4ID09PSB2b2lkIDApIHsgcHJlZml4ID0gXCIweFwiOyB9XG4gICAgICAgIHJldHVybiB0aGlzLnRvSGV4KHYsIFwiMDAwMFwiLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgdG9IZXg1OiBmdW5jdGlvbiAodiwgcHJlZml4KSB7XG4gICAgICAgIGlmIChwcmVmaXggPT09IHZvaWQgMCkgeyBwcmVmaXggPSBcIjB4XCI7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMudG9IZXgodiwgXCIwMDAwMFwiLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgdG9IZXg4OiBmdW5jdGlvbiAodiwgcHJlZml4KSB7XG4gICAgICAgIGlmIChwcmVmaXggPT09IHZvaWQgMCkgeyBwcmVmaXggPSBcIjB4XCI7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMudG9IZXgodiwgXCIwMDAwMDAwMFwiLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgYnl0ZUFycmF5VG9IZXg6IGZ1bmN0aW9uIChhcnIsIHByZWZpeCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAocHJlZml4ID09PSB2b2lkIDApIHsgcHJlZml4ID0gXCJcIjsgfVxuICAgICAgICByZXR1cm4gYXJyLm1hcChmdW5jdGlvbiAoYikgeyByZXR1cm4gX3RoaXMudG9IZXgyKGIsIHByZWZpeCk7IH0pLmpvaW4oXCIgXCIpO1xuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhR1Y0VlhScGJITXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lKb1pYaFZkR2xzY3k1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCTEd0Q1FVRmxPMGxCUTFnc1MwRkJTeXhaUVVGRExFTkJRVU1zUlVGQlJTeE5RVUZsTEVWQlFVVXNUVUZCWVR0UlFVRTVRaXgxUWtGQlFTeEZRVUZCTEdWQlFXVTdVVUZCUlN4MVFrRkJRU3hGUVVGQkxHRkJRV0U3VVVGRGJrTXNTVUZCU1N4UlFVRlJMRWRCUVVjc1EwRkJReXhEUVVGRExFdEJRVXNzVTBGQlV5eEhRVUZITEVkQlFVY3NSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhSUVVGUkxFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTTdVVUZEZUVRc1VVRkJVU3hIUVVGSExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RlFVRkZMRTFCUVUwc1EwRkJReXhOUVVGTkxFZEJRVWNzVVVGQlVTeERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRkZCUVZFc1EwRkJRenRSUVVONFJTeE5RVUZOTEVOQlFVTXNTMEZCUnl4TlFVRk5MRWRCUVVjc1VVRkJWU3hEUVVGRE8wbEJRMnhETEVOQlFVTTdTVUZEUkN4TlFVRk5MRmxCUVVNc1EwRkJReXhGUVVGRkxFMUJRV0U3VVVGQllpeDFRa0ZCUVN4RlFVRkJMR0ZCUVdFN1VVRkRia0lzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhGUVVGRkxFbEJRVWtzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0SlFVTjJReXhEUVVGRE8wbEJRMFFzVFVGQlRTeFpRVUZETEVOQlFVTXNSVUZCUlN4TlFVRmhPMUZCUVdJc2RVSkJRVUVzUlVGQlFTeGhRVUZoTzFGQlEyNUNMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNSVUZCUlN4TlFVRk5MRVZCUVVVc1RVRkJUU3hEUVVGRExFTkJRVU03U1VGRGVrTXNRMEZCUXp0SlFVTkVMRTFCUVUwc1dVRkJReXhEUVVGRExFVkJRVVVzVFVGQllUdFJRVUZpTEhWQ1FVRkJMRVZCUVVFc1lVRkJZVHRSUVVOdVFpeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFVkJRVVVzVDBGQlR5eEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMGxCUXpGRExFTkJRVU03U1VGRFJDeE5RVUZOTEZsQlFVTXNRMEZCUXl4RlFVRkZMRTFCUVdFN1VVRkJZaXgxUWtGQlFTeEZRVUZCTEdGQlFXRTdVVUZEYmtJc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RlFVRkZMRlZCUVZVc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF6dEpRVU0zUXl4RFFVRkRPMGxCUTBRc1kwRkJZeXhaUVVGRExFZEJRVWNzUlVGQlJTeE5RVUZYTzFGQlFTOUNMR2xDUVVWRE8xRkJSbTFDTEhWQ1FVRkJMRVZCUVVFc1YwRkJWenRSUVVNelFpeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhWUVVGQkxFTkJRVU1zU1VGQlNTeFBRVUZCTEV0QlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhGUVVGRkxFMUJRVTBzUTBGQlF5eEZRVUYwUWl4RFFVRnpRaXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCUXpGRUxFTkJRVU03UTBGRFNpeERRVUZESW4wPVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3V0aWwvaGV4VXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9sb2cgPSBbXTtcbi8qKlxuICogbG9nIGluZm9ybWF0aW9uIHRvIHRoZSBjb25zb2xlIC0tIHdvcmtzIGZvciB0aGUgYnJvd3NlciBvciBpbiBhIG5vZGUgZW52aXJvbm1lbnRcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzICAgICAgZGF0YSB0byBsb2dcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGxvZygpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgX2xvZy51bnNoaWZ0KGFyZ3Muam9pbihcIiBcIikpO1xuICAgICAgICBpZiAoX2xvZy5sZW5ndGggPiAyNCkge1xuICAgICAgICAgICAgX2xvZy5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ1wiKS50ZXh0Q29udGVudCA9IF9sb2cuam9pbihTdHJpbmcuZnJvbUNoYXJDb2RlKDEzKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoMTApKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3Muam9pbihcIiBcIikpO1xuICAgIH1cbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGxvZztcbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luZG93LmxvZyA9IGxvZztcbn1cbmlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgZ2xvYmFsLmxvZyA9IGxvZztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWJHOW5MbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaWJHOW5MbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFTeEpRVUZKTEVsQlFVa3NSMEZCUnl4RlFVRkZMRU5CUVVNN1FVRkZaRHM3T3pzN1IwRkxSenRCUVVOSU8wbEJRVFJDTEdOQlFVODdVMEZCVUN4VlFVRlBMRVZCUVZBc2NVSkJRVThzUlVGQlVDeEpRVUZQTzFGQlFWQXNlVUpCUVU4N08wbEJReTlDTEVWQlFVVXNRMEZCUXl4RFFVRkRMRTlCUVU4c1RVRkJUU3hMUVVGTExGZEJRVmNzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEYUVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRE4wSXNSVUZCUlN4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUjBGQlJ5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNaQ0xFbEJRVWtzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTllMRU5CUVVNN1VVRkRSQ3hSUVVGUkxFTkJRVU1zWTBGQll5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRmRCUVZjc1IwRkJSeXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4WlFVRlpMRU5CUVVNc1JVRkJSU3hEUVVGRExFZEJRVWNzVFVGQlRTeERRVUZETEZsQlFWa3NRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRemxITEVOQlFVTTdTVUZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOS0xFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEyaERMRU5CUVVNN1FVRkRUQ3hEUVVGRE96dEJRVlpFTEhOQ1FWVkRPMEZCUTBRc1JVRkJSU3hEUVVGRExFTkJRVU1zVDBGQlR5eE5RVUZOTEV0QlFVc3NWMEZCVnl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOb1F5eE5RVUZOTEVOQlFVTXNSMEZCUnl4SFFVRkhMRWRCUVVjc1EwRkJRenRCUVVOeVFpeERRVUZETzBGQlEwUXNSVUZCUlN4RFFVRkRMRU5CUVVNc1QwRkJUeXhOUVVGTkxFdEJRVXNzVjBGQlZ5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTm9ReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEhRVUZITEVkQlFVY3NRMEZCUXp0QlFVTnlRaXhEUVVGREluMD1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi91dGlsL2xvZy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gICAgZnJvbTg6IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiAtKG4gJiAweDgwKSArIChuICYgMHg3Rik7XG4gICAgfSxcbiAgICBmcm9tMTY6IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiAtKG4gJiAweDgwMDApICsgKG4gJiAweDdGRkYpO1xuICAgIH0sXG4gICAgdG84OiBmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbiAmIDB4RkY7XG4gICAgfSxcbiAgICB0bzE2OiBmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbiAmIDB4RkZGRjtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEhkdmMwTnZiWEJzWlcxbGJuUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lKMGQyOXpRMjl0Y0d4bGJXVnVkQzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJMR3RDUVVGbE8wbEJRMWdzUzBGQlN5eFpRVUZETEVOQlFVTTdVVUZEU0N4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU53UXl4RFFVRkRPMGxCUTBRc1RVRkJUU3haUVVGRExFTkJRVU03VVVGRFNpeE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSMEZCUnl4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVONFF5eERRVUZETzBsQlEwUXNSMEZCUnl4WlFVRkRMRU5CUVVNN1VVRkRSQ3hOUVVGTkxFTkJRVU1zUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXp0SlFVTndRaXhEUVVGRE8wbEJRMFFzU1VGQlNTeFpRVUZETEVOQlFVTTdVVUZEUml4TlFVRk5MRU5CUVVNc1EwRkJReXhIUVVGSExFMUJRVTBzUTBGQlF6dEpRVU4wUWl4RFFVRkRPME5CUTBvc1EwRkJRU0o5XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vdXRpbC90d29zQ29tcGxlbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLyogZ2xvYmFscyBTaGFyZWRBcnJheUJ1ZmZlciAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgbG9nX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9sb2cuanNcIik7XG52YXIgaGV4VXRpbHNfanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2hleFV0aWxzLmpzXCIpO1xudmFyIE1lbW9yeSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWVtb3J5KGxheW91dCwgX2EpIHtcbiAgICAgICAgdmFyIF9iID0gX2EgPT09IHZvaWQgMCA/IHt9IDogX2EsIF9jID0gX2Iuc2hhcmVkLCBzaGFyZWQgPSBfYyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfYywgX2QgPSBfYi53aXRoU2hhcmVkQXJyYXlCdWZmZXIsIHdpdGhTaGFyZWRBcnJheUJ1ZmZlciA9IF9kID09PSB2b2lkIDAgPyB1bmRlZmluZWQgOiBfZDtcbiAgICAgICAgdGhpcy5fcHJvdGVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3NoYXJlZCA9IEJvb2xlYW4oc2hhcmVkIHx8IHdpdGhTaGFyZWRBcnJheUJ1ZmZlcik7XG4gICAgICAgIHRoaXMubGF5b3V0ID0gbGF5b3V0O1xuICAgICAgICB0aGlzLl9idWYgPSB3aXRoU2hhcmVkQXJyYXlCdWZmZXIgfHwgbmV3IChzaGFyZWQgPyBTaGFyZWRBcnJheUJ1ZmZlciA6IEFycmF5QnVmZmVyKShsYXlvdXQuc2l6ZSAqIDEwMjQpO1xuICAgICAgICB0aGlzLl9tZW0gPSBuZXcgVWludDhBcnJheSh0aGlzLl9idWYpO1xuICAgICAgICB0aGlzLl9yb20gPSBuZXcgVWludDhBcnJheSh0aGlzLl9idWYsIGxheW91dC5yb21TdGFydCwgbGF5b3V0LnJvbUxlbmd0aCk7XG4gICAgICAgIHRoaXMucmVzZXRTdGF0cygpO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWVtb3J5LnByb3RvdHlwZSwgXCJzaGFyZWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaGFyZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNZW1vcnkucHJvdG90eXBlLCBcInNoYXJlZEFycmF5QnVmZmVyXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQgPyB0aGlzLl9idWYgOiB1bmRlZmluZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNZW1vcnkucHJvdG90eXBlLCBcInByb3RlY3RlZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3RlY3RlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdGhpcy5fcHJvdGVjdGVkID0gdjtcbiAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm9tID0gdGhpcy5jb3B5RnJvbVJhbmdlKHRoaXMubGF5b3V0LnJvbVN0YXJ0LCB0aGlzLmxheW91dC5yb21MZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBNZW1vcnkucHJvdG90eXBlLnJlc2V0U3RhdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3RhdHMgPSB7XG4gICAgICAgICAgICByZWFkc1RvdGFsOiAwLFxuICAgICAgICAgICAgYnl0ZVJlYWRzVG90YWw6IDAsXG4gICAgICAgICAgICB3b3JkUmVhZHNUb3RhbDogMCxcbiAgICAgICAgICAgIHdyaXRlc1RvdGFsOiAwLFxuICAgICAgICAgICAgYnl0ZVdyaXRlc1RvdGFsOiAwLFxuICAgICAgICAgICAgd29yZFdyaXRlc1RvdGFsOiAwLFxuICAgICAgICAgICAgbGFzdFJlYWRBZGRyOiAwLFxuICAgICAgICAgICAgbGFzdFdyaXRlQWRkcjogMCxcbiAgICAgICAgICAgIGxhc3RWYWx1ZVJlYWQ6IDAsXG4gICAgICAgICAgICBsYXN0VmFsdWVXcml0dGVuOiAwLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgTWVtb3J5LnByb3RvdHlwZS5kdW1wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2dfanNfMS5kZWZhdWx0KFwibWVtIHN0YXRzIHwgcmVhZHMgIDg6IFwiICsgdGhpcy5zdGF0cy5ieXRlUmVhZHNUb3RhbCArIFwiICAxNjogXCIgKyB0aGlzLnN0YXRzLndvcmRSZWFkc1RvdGFsICsgXCIgIEFsbDogXCIgKyB0aGlzLnN0YXRzLnJlYWRzVG90YWwpO1xuICAgICAgICBsb2dfanNfMS5kZWZhdWx0KFwibWVtIHN0YXRzIHwgd3JpdGVzIDg6IFwiICsgdGhpcy5zdGF0cy5ieXRlV3JpdGVzVG90YWwgKyBcIiAgMTY6IFwiICsgdGhpcy5zdGF0cy53b3JkV3JpdGVzVG90YWwgKyBcIiAgQWxsOiBcIiArIHRoaXMuc3RhdHMud3JpdGVzVG90YWwpO1xuICAgICAgICBsb2dfanNfMS5kZWZhdWx0KFwibWVtIHN0YXRzIHwgbGFzdCByZWFkOiBcIiArIGhleFV0aWxzX2pzXzEuZGVmYXVsdC50b0hleDQodGhpcy5zdGF0cy5sYXN0VmFsdWVSZWFkKSArIFwiQFwiICsgaGV4VXRpbHNfanNfMS5kZWZhdWx0LnRvSGV4NCh0aGlzLnN0YXRzLmxhc3RSZWFkQWRkcikgKyBcIiAgd3JpdGU6IFwiICsgaGV4VXRpbHNfanNfMS5kZWZhdWx0LnRvSGV4NCh0aGlzLnN0YXRzLmxhc3RWYWx1ZVdyaXR0ZW4pICsgXCJAXCIgKyBoZXhVdGlsc19qc18xLmRlZmF1bHQudG9IZXg0KHRoaXMuc3RhdHMubGFzdFdyaXRlQWRkcikpO1xuICAgIH07XG4gICAgTWVtb3J5LnByb3RvdHlwZS5sb2FkRnJvbUpTID0gZnVuY3Rpb24gKGRhdGEsIGFkZHJPdmVycmlkZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgYWRkciA9IGRhdGEuYWRkcjtcbiAgICAgICAgaWYgKGFkZHJPdmVycmlkZSkge1xuICAgICAgICAgICAgYWRkciA9IGFkZHJPdmVycmlkZTtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAodiwgaSkge1xuICAgICAgICAgICAgX3RoaXMucG9rZShpICsgYWRkciwgdik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLypcbiAgICAgIGxvYWRGcm9tQklOKGJpbikge1xuICAgICAgICAvLyBUT0RPXG4gICAgICB9XG4gICAgKi9cbiAgICBNZW1vcnkucHJvdG90eXBlLnBva2UgPSBmdW5jdGlvbiAoYWRkciwgdmFsKSB7XG4gICAgICAgIGFkZHIgJj0gMHgzRkZGRjtcbiAgICAgICAgdmFyIHYgPSAodmFsICYgMHhGRik7XG4gICAgICAgIHRoaXMuX21lbVthZGRyXSA9IHY7XG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFZhbHVlV3JpdHRlbiA9IHY7XG4gICAgICAgIHRoaXMuc3RhdHMud3JpdGVzVG90YWwrKztcbiAgICAgICAgdGhpcy5zdGF0cy5ieXRlV3JpdGVzVG90YWwrKztcbiAgICAgICAgdGhpcy5zdGF0cy5sYXN0VmFsdWVXcml0dGVuID0gKHZhbCAmIDB4RkYpO1xuICAgICAgICB0aGlzLnN0YXRzLmxhc3RXcml0ZUFkZHIgPSBhZGRyO1xuICAgICAgICAqL1xuICAgIH07XG4gICAgTWVtb3J5LnByb3RvdHlwZS5wb2tlMTYgPSBmdW5jdGlvbiAoYWRkciwgdmFsKSB7XG4gICAgICAgIGFkZHIgJj0gMHgzRkZGRjtcbiAgICAgICAgdmFyIHYgPSAodmFsICYgMHhGRkZGKTtcbiAgICAgICAgdGhpcy5fbWVtW2FkZHJdID0gKHYgJiAweEZGMDApID4+IDg7XG4gICAgICAgIHRoaXMuX21lbVthZGRyICsgMV0gPSAodiAmIDB4MDBGRik7XG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuc3RhdHMud3JpdGVzVG90YWwrKztcbiAgICAgICAgdGhpcy5zdGF0cy53b3JkV3JpdGVzVG90YWwrKztcbiAgICAgICAgdGhpcy5zdGF0cy5sYXN0VmFsdWVXcml0dGVuID0gdjtcbiAgICAgICAgdGhpcy5zdGF0cy5sYXN0V3JpdGVBZGRyID0gYWRkcjtcbiAgICAgICAgKi9cbiAgICB9O1xuICAgIE1lbW9yeS5wcm90b3R5cGUucG9rZTMyID0gZnVuY3Rpb24gKGFkZHIsIHZhbCkge1xuICAgICAgICBhZGRyICY9IDB4M0ZGRkY7XG4gICAgICAgIHZhciB2ID0gKHZhbCAmIDB4RkZGRkZGRkYpO1xuICAgICAgICB0aGlzLl9tZW1bYWRkcl0gPSAodiAmIDB4RkYwMDAwMDApID4+IDI0O1xuICAgICAgICB0aGlzLl9tZW1bYWRkciArIDFdID0gKHYgJiAweDAwRkYwMDAwKSA+PiAxNjtcbiAgICAgICAgdGhpcy5fbWVtW2FkZHIgKyAyXSA9ICh2ICYgMHgwMDAwRkYwMCkgPj4gODtcbiAgICAgICAgdGhpcy5fbWVtW2FkZHIgKyAzXSA9ICh2ICYgMHgwMDAwMDBGRik7XG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuc3RhdHMud3JpdGVzVG90YWwrKztcbiAgICAgICAgdGhpcy5zdGF0cy5sYXN0VmFsdWVXcml0dGVuID0gdjtcbiAgICAgICAgdGhpcy5zdGF0cy5sYXN0V3JpdGVBZGRyID0gYWRkcjtcbiAgICAgICAgKi9cbiAgICB9O1xuICAgIE1lbW9yeS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uIChhZGRyKSB7XG4gICAgICAgIGFkZHIgJj0gMHgzRkZGRjtcbiAgICAgICAgdmFyIHYgPSB0aGlzLl9tZW1bYWRkcl07XG4gICAgICAgIGlmICh0aGlzLl9wcm90ZWN0ZWQpIHtcbiAgICAgICAgICAgIGlmIChhZGRyID49IHRoaXMubGF5b3V0LnJvbVN0YXJ0ICYmIGFkZHIgPD0gdGhpcy5sYXlvdXQucm9tRW5kKSB7XG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuX3JvbVthZGRyIC0gdGhpcy5sYXlvdXQucm9tU3RhcnRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuc3RhdHMucmVhZHNUb3RhbCsrO1xuICAgICAgICB0aGlzLnN0YXRzLmJ5dGVSZWFkc1RvdGFsKys7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFZhbHVlUmVhZCA9IHY7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFJlYWRBZGRyID0gYWRkcjtcbiAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfTtcbiAgICBNZW1vcnkucHJvdG90eXBlLnBlZWsxNiA9IGZ1bmN0aW9uIChhZGRyKSB7XG4gICAgICAgIGFkZHIgJj0gMHgzRkZGRjtcbiAgICAgICAgdmFyIHYgPSAodGhpcy5wZWVrKGFkZHIpIDw8IDgpIHwgdGhpcy5wZWVrKGFkZHIgKyAxKTtcbiAgICAgICAgLypcbiAgICAgICAgdGhpcy5zdGF0cy5yZWFkc1RvdGFsKys7XG4gICAgICAgIHRoaXMuc3RhdHMud29yZFJlYWRzVG90YWwrKztcbiAgICAgICAgdGhpcy5zdGF0cy5sYXN0VmFsdWVSZWFkID0gdjtcbiAgICAgICAgdGhpcy5zdGF0cy5sYXN0UmVhZEFkZHIgPSBhZGRyO1xuICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdjtcbiAgICB9O1xuICAgIE1lbW9yeS5wcm90b3R5cGUucGVlazMyID0gZnVuY3Rpb24gKGFkZHIpIHtcbiAgICAgICAgYWRkciAmPSAweDNGRkZGO1xuICAgICAgICB2YXIgdiA9ICh0aGlzLnBlZWsoYWRkcikgPDwgMjQpIHwgKHRoaXMucGVlayhhZGRyICsgMSkgPDwgMTYpIHwgKHRoaXMucGVlayhhZGRyICsgMikgPDwgOCkgfCAodGhpcy5wZWVrKGFkZHIgKyAzKSk7XG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuc3RhdHMucmVhZHNUb3RhbCsrO1xuICAgICAgICB0aGlzLnN0YXRzLndvcmRSZWFkc1RvdGFsKys7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFZhbHVlUmVhZCA9IHY7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFJlYWRBZGRyID0gYWRkcjtcbiAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfTtcbiAgICBNZW1vcnkucHJvdG90eXBlLnJhbmdlID0gZnVuY3Rpb24gKGFkZHIsIGxlbikge1xuICAgICAgICBpZiAoYWRkciArIGxlbiA8PSB0aGlzLmxheW91dC5tZW10b3ApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSh0aGlzLl9idWYsIGFkZHIsIGxlbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgb3ZlcmZsb3cgPSAoYWRkciArIGxlbikgLSB0aGlzLmxheW91dC5tZW10b3A7XG4gICAgICAgICAgICBsZW4gLT0gb3ZlcmZsb3c7XG4gICAgICAgICAgICBpZiAobGVuIDwgMCkge1xuICAgICAgICAgICAgICAgIGxlbiA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodGhpcy5fYnVmLCBhZGRyLCBsZW4pOyAvLy5jb25jYXQodGhpcy5jb3B5RnJvbVJhbmdlKDAsIG92ZXJmbG93KSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1lbW9yeS5wcm90b3R5cGUuY29weUZyb21SYW5nZSA9IGZ1bmN0aW9uIChhZGRyLCBsZW4pIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkuZnJvbSh0aGlzLnJhbmdlKGFkZHIsIGxlbikpO1xuICAgIH07XG4gICAgTWVtb3J5LnByb3RvdHlwZS5jb3B5V2l0aGluID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBfYiA9IF9hID09PSB2b2lkIDAgPyB7fSA6IF9hLCBzcmMgPSBfYi5zcmMsIGRlc3QgPSBfYi5kZXN0LCBsZW4gPSBfYi5sZW47XG4gICAgICAgIGlmIChzcmMgKyBsZW4gPiB0aGlzLmxheW91dC5tZW10b3AgfHxcbiAgICAgICAgICAgIGRlc3QgKyBsZW4gPiB0aGlzLmxheW91dC5tZW10b3ApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tZW0uY29weVdpdGhpbihkZXN0LCBzcmMsIHNyYyArIGxlbik7XG4gICAgfTtcbiAgICBNZW1vcnkucHJvdG90eXBlLmZpbGxXaXRoaW4gPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIF9iID0gX2EgPT09IHZvaWQgMCA/IHt9IDogX2EsIHZhbHVlID0gX2IudmFsdWUsIGFkZHIgPSBfYi5hZGRyLCBsZW4gPSBfYi5sZW47XG4gICAgICAgIGlmIChsZW4gKyBhZGRyID4gdGhpcy5sYXlvdXQubWVtdG9wKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWVtLmZpbGwodmFsdWUgJiAweEZGLCBhZGRyLCBhZGRyICsgbGVuKTtcbiAgICB9O1xuICAgIE1lbW9yeS5wcm90b3R5cGUuc2V0V2l0aGluID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBfYiA9IF9hID09PSB2b2lkIDAgPyB7fSA6IF9hLCBkYXRhID0gX2IuZGF0YSwgYWRkciA9IF9iLmFkZHI7XG4gICAgICAgIGlmIChhZGRyICsgKGRhdGEubGVuZ3RoKSA+IHRoaXMubGF5b3V0Lm1lbXRvcCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21lbS5zZXQoZGF0YSwgYWRkcik7XG4gICAgfTtcbiAgICBNZW1vcnkucHJvdG90eXBlLnJhbmdlMzIgPSBmdW5jdGlvbiAoYWRkciwgbGVuKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDMyQXJyYXkodGhpcy5fYnVmLCBhZGRyLCBsZW4pO1xuICAgIH07XG4gICAgTWVtb3J5LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnByb3RlY3RlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICh0aGlzLmxheW91dC5zaXplICogMTAyNCk7IGkrKykge1xuICAgICAgICAgICAgLy8gc2ltdWxhdGUgb2xkLXN0eWxlIG1lbW9yeSBiZWluZyByYW5kb20gYXQgYm9vdFxuICAgICAgICAgICAgLy90aGlzLnBva2UoaSwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSk7XG4gICAgICAgICAgICB0aGlzLnBva2UoaSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gd2UgbmVlZCB0aHJlZSBSRVRzIGF0IGtub3duIGltcG9ydGFudCB2ZWN0b3JzXG4gICAgICAgIFsweDBGRTAwLCAweDBGRjAwLCAweDBGRkZGXS5mb3JFYWNoKGZ1bmN0aW9uIChhZGRyKSB7XG4gICAgICAgICAgICBfdGhpcy5wb2tlKGFkZHIsIDB4RkYpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gQWxsIHRyYXAgdmVjdG9ycyBpbml0aWFsbHkgcG9pbnQgYXQgMHhGRkZGXG4gICAgICAgIGZvciAodmFyIGFkZHIgPSAwOyBhZGRyIDwgNTEyOyBhZGRyKyspIHtcbiAgICAgICAgICAgIHRoaXMucG9rZShhZGRyLCAweEZGKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBidXQgd2UgZG8gbmVlZCBhIHZhbGlkIEZSQU1FIGFuZCBSRVNFVCB2ZWN0b3JcbiAgICAgICAgdGhpcy5wb2tlMTYoMHgwMDAwMCwgMHhGRjAwKTtcbiAgICAgICAgdGhpcy5wb2tlMTYoMHgwMDFFMCwgMHhGRTAwKTtcbiAgICAgICAgLy8gbG9hZGluZyBib290IFJPTSBpcyB0aGUgcmVzcG9uc2liaWxpdHkgb2Ygb3VyIG93bmVyLlxuICAgIH07XG4gICAgcmV0dXJuIE1lbW9yeTtcbn0oKSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBNZW1vcnk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUV1Z0YjNKNUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpVFdWdGIzSjVMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQkxDdENRVUVyUWpzN1FVRkZMMElzZVVOQlFXbERPMEZCUTJwRExHMUVRVUV5UXp0QlFVVXpRenRKUVVORkxHZENRVUZaTEUxQlFVMHNSVUZCUlN4RlFVRXdSRHRaUVVFeFJDdzBRa0ZCTUVRc1JVRkJlRVFzWTBGQll5eEZRVUZrTEcxRFFVRmpMRVZCUVVVc05rSkJRV2xETEVWQlFXcERMSE5FUVVGcFF6dFJRVU55UlN4SlFVRkpMRU5CUVVNc1ZVRkJWU3hIUVVGSExFdEJRVXNzUTBGQlF6dFJRVU40UWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFOUJRVThzUTBGQlF5eE5RVUZOTEVsQlFVa3NjVUpCUVhGQ0xFTkJRVU1zUTBGQlF6dFJRVU40UkN4SlFVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExFMUJRVTBzUTBGQlF6dFJRVU55UWl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExIRkNRVUZ4UWl4SlFVRkpMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzYVVKQlFXbENMRWRCUVVjc1YwRkJWeXhEUVVGRExFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVONFJ5eEpRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWxCUVVrc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTjBReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEVsQlFVa3NWVUZCVlN4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzVFVGQlRTeERRVUZETEZGQlFWRXNSVUZCUlN4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03VVVGRGVrVXNTVUZCU1N4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRE8wbEJRM0JDTEVOQlFVTTdTVUZGUkN4elFrRkJTU3d3UWtGQlRUdGhRVUZXTzFsQlEwVXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU03VVVGRGRFSXNRMEZCUXpzN08wOUJRVUU3U1VGRlJDeHpRa0ZCU1N4eFEwRkJhVUk3WVVGQmNrSTdXVUZEUlN4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRk5CUVZNc1EwRkJRenRSUVVNM1F5eERRVUZET3pzN1QwRkJRVHRKUVVWRUxITkNRVUZKTERaQ1FVRlRPMkZCUVdJN1dVRkRSU3hOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXp0UlFVTjZRaXhEUVVGRE8yRkJSVVFzVlVGQll5eERRVUZETzFsQlEySXNTVUZCU1N4RFFVRkRMRlZCUVZVc1IwRkJSeXhEUVVGRExFTkJRVU03V1VGRGNFSXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEVGl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eGhRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhSUVVGUkxFVkJRVVVzU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJRenRaUVVNNVJTeERRVUZETzFGQlEwZ3NRMEZCUXpzN08wOUJVRUU3U1VGVFJDd3lRa0ZCVlN4SFFVRldPMUZCUTBVc1NVRkJTU3hEUVVGRExFdEJRVXNzUjBGQlJ6dFpRVU5ZTEZWQlFWVXNSVUZCUlN4RFFVRkRPMWxCUTJJc1kwRkJZeXhGUVVGRkxFTkJRVU03V1VGRGFrSXNZMEZCWXl4RlFVRkZMRU5CUVVNN1dVRkRha0lzVjBGQlZ5eEZRVUZGTEVOQlFVTTdXVUZEWkN4bFFVRmxMRVZCUVVVc1EwRkJRenRaUVVOc1FpeGxRVUZsTEVWQlFVVXNRMEZCUXp0WlFVTnNRaXhaUVVGWkxFVkJRVVVzUTBGQlF6dFpRVU5tTEdGQlFXRXNSVUZCUlN4RFFVRkRPMWxCUTJoQ0xHRkJRV0VzUlVGQlJTeERRVUZETzFsQlEyaENMR2RDUVVGblFpeEZRVUZGTEVOQlFVTTdVMEZEY0VJc1EwRkJRenRKUVVOS0xFTkJRVU03U1VGRlJDeHhRa0ZCU1N4SFFVRktPMUZCUTBVc1owSkJRVWNzUTBGQlF5d3lRa0ZCZVVJc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eGpRVUZqTEdOQlFWTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhqUVVGakxHVkJRVlVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4VlFVRlpMRU5CUVVNc1EwRkJRenRSUVVNelNDeG5Ra0ZCUnl4RFFVRkRMREpDUVVGNVFpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMR1ZCUVdVc1kwRkJVeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEdWQlFXVXNaVUZCVlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGZEJRV0VzUTBGQlF5eERRVUZETzFGQlF6bElMR2RDUVVGSExFTkJRVU1zTkVKQlFUQkNMSEZDUVVGUkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1lVRkJZU3hEUVVGRExGTkJRVWtzY1VKQlFWRXNRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFpRVUZaTEVOQlFVTXNhVUpCUVZrc2NVSkJRVkVzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhuUWtGQlowSXNRMEZCUXl4VFFVRkpMSEZDUVVGUkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1lVRkJZU3hEUVVGSExFTkJRVU1zUTBGQlF6dEpRVU01VGl4RFFVRkRPMGxCUlVRc01rSkJRVlVzUjBGQlZpeFZRVUZYTEVsQlFVa3NSVUZCUlN4WlFVRlpPMUZCUVRkQ0xHbENRVkZETzFGQlVFTXNTVUZCU1N4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF6dFJRVU55UWl4RlFVRkZMRU5CUVVNc1EwRkJReXhaUVVGWkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEycENMRWxCUVVrc1IwRkJSeXhaUVVGWkxFTkJRVU03VVVGRGRFSXNRMEZCUXp0UlFVTkVMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEZWQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNN1dVRkRja0lzUzBGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRWRCUVVjc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEzcENMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMHdzUTBGQlF6dEpRVVZFT3pzN08wMUJTVVU3U1VGRlJpeHhRa0ZCU1N4SFFVRktMRlZCUVVzc1NVRkJTU3hGUVVGRkxFZEJRVWM3VVVGRFdpeEpRVUZKTEVsQlFVa3NUMEZCVHl4RFFVRkRPMUZCUTJoQ0xFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4SFFVRkhMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM0pDTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFGQlJYQkNPenM3T3pzN1ZVRk5SVHRKUVVOS0xFTkJRVU03U1VGRlJDeDFRa0ZCVFN4SFFVRk9MRlZCUVU4c1NVRkJTU3hGUVVGRkxFZEJRVWM3VVVGRFpDeEpRVUZKTEVsQlFVa3NUMEZCVHl4RFFVRkRPMUZCUTJoQ0xFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4SFFVRkhMRTFCUVUwc1EwRkJReXhEUVVGRE8xRkJRM1pDTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVkQlFVY3NUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM0JETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRkhMRTFCUVUwc1EwRkJReXhEUVVGRE8xRkJSVzVET3pzN096dFZRVXRGTzBsQlEwb3NRMEZCUXp0SlFVVkVMSFZDUVVGTkxFZEJRVTRzVlVGQlR5eEpRVUZKTEVWQlFVVXNSMEZCUnp0UlFVTmtMRWxCUVVrc1NVRkJTU3hQUVVGUExFTkJRVU03VVVGRGFFSXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFZEJRVWNzVlVGQlZTeERRVUZETEVOQlFVTTdVVUZETTBJc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1IwRkJSeXhWUVVGVkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTTdVVUZEZWtNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFZEJRVWNzVlVGQlZTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRPMUZCUXpkRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRU5CUVVNc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEhRVUZITEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVNMVF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSMEZCUnl4VlFVRlZMRU5CUVVNc1EwRkJRenRSUVVWMlF6czdPenRWUVVsRk8wbEJRMG9zUTBGQlF6dEpRVWRFTEhGQ1FVRkpMRWRCUVVvc1ZVRkJTeXhKUVVGSk8xRkJRMUFzU1VGQlNTeEpRVUZKTEU5QlFVOHNRMEZCUXp0UlFVTm9RaXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM2hDTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzQkNMRVZCUVVVc1EwRkJReXhEUVVGRExFbEJRVWtzU1VGQlNTeEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRkZCUVZFc1NVRkJTU3hKUVVGSkxFbEJRVWtzU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU12UkN4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFpRVU0zUXl4RFFVRkRPMUZCUTBnc1EwRkJRenRSUVVWRU96czdPenRWUVV0Rk8xRkJSVVlzVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTllMRU5CUVVNN1NVRkZSQ3gxUWtGQlRTeEhRVUZPTEZWQlFVOHNTVUZCU1R0UlFVTlVMRWxCUVVrc1NVRkJTU3hQUVVGUExFTkJRVU03VVVGRGFFSXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJSWEpFT3pzN096dFZRVXRGTzFGQlJVWXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOWUxFTkJRVU03U1VGRlJDeDFRa0ZCVFN4SFFVRk9MRlZCUVU4c1NVRkJTVHRSUVVOVUxFbEJRVWtzU1VGQlNTeFBRVUZQTEVOQlFVTTdVVUZEYUVJc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZGYmtnN096czdPMVZCUzBVN1VVRkZSaXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExZ3NRMEZCUXp0SlFVVkVMSE5DUVVGTExFZEJRVXdzVlVGQlRTeEpRVUZKTEVWQlFVVXNSMEZCUnp0UlFVTmlMRVZCUVVVc1EwRkJReXhEUVVGRExFbEJRVWtzUjBGQlJ5eEhRVUZITEVsQlFVa3NTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzSkRMRTFCUVUwc1EwRkJReXhKUVVGSkxGVkJRVlVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRWxCUVVrc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU01UXl4RFFVRkRPMUZCUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03V1VGRFRpeEpRVUZKTEZGQlFWRXNSMEZCUnl4RFFVRkRMRWxCUVVrc1IwRkJSeXhIUVVGSExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJRenRaUVVOcVJDeEhRVUZITEVsQlFVa3NVVUZCVVN4RFFVRkRPMWxCUTJoQ0xFVkJRVVVzUTBGQlF5eERRVUZETEVkQlFVY3NSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVUZETEVkQlFVY3NSMEZCUnl4RFFVRkRMRU5CUVVNN1dVRkJReXhEUVVGRE8xbEJRM3BDTEUxQlFVMHNRMEZCUXl4SlFVRkpMRlZCUVZVc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExESkRRVUV5UXp0UlFVTXhSaXhEUVVGRE8wbEJRMGdzUTBGQlF6dEpRVVZFTERoQ1FVRmhMRWRCUVdJc1ZVRkJZeXhKUVVGSkxFVkJRVVVzUjBGQlJ6dFJRVU55UWl4TlFVRk5MRU5CUVVNc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEyaEVMRU5CUVVNN1NVRkZSQ3d5UWtGQlZTeEhRVUZXTEZWQlFWY3NSVUZCZFVJN1dVRkJka0lzTkVKQlFYVkNMRVZCUVhKQ0xGbEJRVWNzUlVGQlJTeGpRVUZKTEVWQlFVVXNXVUZCUnp0UlFVTjZRaXhGUVVGRkxFTkJRVU1zUTBGQlF5eEhRVUZITEVkQlFVY3NSMEZCUnl4SFFVRkhMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zVFVGQlRUdFpRVU5vUXl4SlFVRkpMRWRCUVVjc1IwRkJSeXhIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOc1F5eE5RVUZOTEVOQlFVTTdVVUZEVkN4RFFVRkRPMUZCUTBRc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNTVUZCU1N4RlFVRkZMRWRCUVVjc1JVRkJSU3hIUVVGSExFZEJRVWNzUjBGQlJ5eERRVUZETEVOQlFVTTdTVUZETjBNc1EwRkJRenRKUVVWRUxESkNRVUZWTEVkQlFWWXNWVUZCVnl4RlFVRjVRanRaUVVGNlFpdzBRa0ZCZVVJc1JVRkJka0lzWjBKQlFVc3NSVUZCUlN4alFVRkpMRVZCUVVVc1dVRkJSenRSUVVNelFpeEZRVUZGTEVOQlFVTXNRMEZCUXl4SFFVRkhMRWRCUVVjc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOd1F5eE5RVUZOTEVOQlFVTTdVVUZEVkN4RFFVRkRPMUZCUTBRc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4SFFVRkhMRWxCUVVrc1JVRkJSU3hKUVVGSkxFVkJRVVVzU1VGQlNTeEhRVUZITEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCUTJwRUxFTkJRVU03U1VGRlJDd3dRa0ZCVXl4SFFVRlVMRlZCUVZVc1JVRkJiVUk3V1VGQmJrSXNORUpCUVcxQ0xFVkJRV3BDTEdOQlFVa3NSVUZCUlN4alFVRkpPMUZCUTNCQ0xFVkJRVVVzUTBGQlF5eERRVUZETEVsQlFVa3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRE9VTXNUVUZCVFN4RFFVRkRPMUZCUTFRc1EwRkJRenRSUVVORUxFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU0xUWl4RFFVRkRPMGxCUlVRc2QwSkJRVThzUjBGQlVDeFZRVUZSTEVsQlFVa3NSVUZCUlN4SFFVRkhPMUZCUTJZc1RVRkJUU3hEUVVGRExFbEJRVWtzVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1NVRkJTU3hGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzBsQlF5OURMRU5CUVVNN1NVRkZSQ3h4UWtGQlNTeEhRVUZLTzFGQlFVRXNhVUpCZDBKRE8xRkJka0pETEVsQlFVa3NRMEZCUXl4VFFVRlRMRWRCUVVjc1MwRkJTeXhEUVVGRE8xRkJRM1pDTEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNSVUZCUlN4RFFVRkRMRVZCUVVVc1JVRkJSU3hEUVVGRE8xbEJRMjVFTEdsRVFVRnBSRHRaUVVOcVJDeG5SRUZCWjBRN1dVRkRhRVFzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRGJFSXNRMEZCUXp0UlFVVkVMR2RFUVVGblJEdFJRVU5vUkN4RFFVRkRMRTlCUVU4c1JVRkJSU3hQUVVGUExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTXNUMEZCVHl4RFFVRkRMRlZCUVVNc1NVRkJTVHRaUVVOMlF5eExRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU40UWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVWSUxEWkRRVUUyUXp0UlFVTTNReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVsQlFVa3NSMEZCUnl4RFFVRkRMRVZCUVVVc1NVRkJTU3hIUVVGSExFZEJRVWNzUlVGQlJTeEpRVUZKTEVWQlFVVXNSVUZCUlN4RFFVRkRPMWxCUTNSRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM2hDTEVOQlFVTTdVVUZGUkN4blJFRkJaMFE3VVVGRGFFUXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdVVUZETjBJc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eFBRVUZQTEVWQlFVVXNUVUZCVFN4RFFVRkRMRU5CUVVNN1VVRkZOMElzZFVSQlFYVkVPMGxCUlhwRUxFTkJRVU03U1VGdFFrZ3NZVUZCUXp0QlFVRkVMRU5CUVVNc1FVRnNVRVFzU1VGclVFTWlmUT09XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vY29yZS9NZW1vcnkuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIlwidXNlIHN0cmljdFwiO1xuLyogZ2xvYmFscyBzZWxmICovXG52YXIgU2NyZWVuX2pzXzEgPSByZXF1aXJlKFwiLi4vY29yZS9TY3JlZW4uanNcIik7XG52YXIgTWVtb3J5X2pzXzEgPSByZXF1aXJlKFwiLi4vY29yZS9NZW1vcnkuanNcIik7XG52YXIgbWVtb3J5TGF5b3V0X2pzXzEgPSByZXF1aXJlKFwiLi4vY29yZS9tZW1vcnlMYXlvdXQuanNcIik7XG52YXIgU2NyZWVuV29ya2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTY3JlZW5Xb3JrZXIoKSB7XG4gICAgICAgIHRoaXMuc2NyZWVuID0gbmV3IFNjcmVlbl9qc18xLmRlZmF1bHQobnVsbCwgbnVsbCwgbnVsbCwge1xuICAgICAgICAgICAgd29ya2VyOiB0cnVlLFxuICAgICAgICAgICAgc2hhcmVkOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTY3JlZW5Xb3JrZXIucHJvdG90eXBlLnNldFNoYXJlZE1lbW9yeSA9IGZ1bmN0aW9uIChzaGFyZWRBcnJheUJ1ZmZlcikge1xuICAgICAgICB0aGlzLnNjcmVlbi5fbWVtb3J5ID0gbmV3IE1lbW9yeV9qc18xLmRlZmF1bHQobWVtb3J5TGF5b3V0X2pzXzEuZGVmYXVsdCwge1xuICAgICAgICAgICAgc2hhcmVkOiB0cnVlLFxuICAgICAgICAgICAgd2l0aFNoYXJlZEFycmF5QnVmZmVyOiBzaGFyZWRBcnJheUJ1ZmZlclxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zY3JlZW4uX2xheW91dCA9IG1lbW9yeUxheW91dF9qc18xLmRlZmF1bHQ7XG4gICAgfTtcbiAgICBTY3JlZW5Xb3JrZXIucHJvdG90eXBlLnNldFNoYXJlZEZyYW1lQnVmZmVyID0gZnVuY3Rpb24gKHNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgICAgIHRoaXMuc2NyZWVuLnNldFNoYXJlZEFycmF5QnVmZmVyKHNoYXJlZEFycmF5QnVmZmVyKTtcbiAgICB9O1xuICAgIFNjcmVlbldvcmtlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zY3JlZW4uaW5pdCgpO1xuICAgIH07XG4gICAgU2NyZWVuV29ya2VyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoXywgcG9zdE1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5zY3JlZW4udXBkYXRlKCk7XG4gICAgICAgIHBvc3RNZXNzYWdlKHsgY21kOiBcInVwZGF0ZWRcIiB9KTtcbiAgICB9O1xuICAgIHJldHVybiBTY3JlZW5Xb3JrZXI7XG59KCkpO1xudmFyIHNjcmVlbldvcmtlciA9IG5ldyBTY3JlZW5Xb3JrZXIoKTtcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgY21kID0gZS5kYXRhLmNtZDtcbiAgICB2YXIgZGF0YSA9IGUuZGF0YS5kYXRhO1xuICAgIGlmIChzY3JlZW5Xb3JrZXJbY21kXSkge1xuICAgICAgICBzY3JlZW5Xb3JrZXJbY21kXShkYXRhLCBzZWxmLnBvc3RNZXNzYWdlKTtcbiAgICB9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVUyTnlaV1Z1VjI5eWEyVnlMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaVUyTnlaV1Z1VjI5eWEyVnlMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFTeHJRa0ZCYTBJN1FVRkRiRUlzSzBOQlFYVkRPMEZCUTNaRExDdERRVUYxUXp0QlFVVjJReXd5UkVGQmJVUTdRVUZGYmtRN1NVRkRTVHRSUVVOSkxFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NTVUZCU1N4dFFrRkJUU3hEUVVGRExFbEJRVWtzUlVGQlJTeEpRVUZKTEVWQlFVVXNTVUZCU1N4RlFVRkZPMWxCUTNaRExFMUJRVTBzUlVGQlJTeEpRVUZKTzFsQlExb3NUVUZCVFN4RlFVRkZMRWxCUVVrN1UwRkRaaXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETzBsQlJVUXNjME5CUVdVc1IwRkJaaXhWUVVGblFpeHBRa0ZCYVVJN1VVRkROMElzU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBMRWRCUVVjc1NVRkJTU3h0UWtGQlRTeERRVUZETEhsQ1FVRlpMRVZCUVVVN1dVRkRNME1zVFVGQlRTeEZRVUZGTEVsQlFVazdXVUZEV2l4eFFrRkJjVUlzUlVGQlJTeHBRa0ZCYVVJN1UwRkRNME1zUTBGQlF5eERRVUZETzFGQlEwZ3NTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFZEJRVWNzZVVKQlFWa3NRMEZCUXp0SlFVTjJReXhEUVVGRE8wbEJSVVFzTWtOQlFXOUNMRWRCUVhCQ0xGVkJRWEZDTEdsQ1FVRnBRanRSUVVOc1F5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRzlDUVVGdlFpeERRVUZETEdsQ1FVRnBRaXhEUVVGRExFTkJRVU03U1VGRGVFUXNRMEZCUXp0SlFVVkVMREpDUVVGSkxFZEJRVW83VVVGRFNTeEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRE8wbEJRM1pDTEVOQlFVTTdTVUZGUkN3MlFrRkJUU3hIUVVGT0xGVkJRVThzUTBGQlF5eEZRVUZGTEZkQlFWYzdVVUZEYWtJc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXp0UlFVTnlRaXhYUVVGWExFTkJRVU1zUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkZMRU5CUVVNc1EwRkJRenRKUVVOd1F5eERRVUZETzBsQlEwd3NiVUpCUVVNN1FVRkJSQ3hEUVVGRExFRkJOVUpFTEVsQk5FSkRPMEZCUlVRc1NVRkJUU3haUVVGWkxFZEJRVWNzU1VGQlNTeFpRVUZaTEVWQlFVVXNRMEZCUXp0QlFVTjRReXhKUVVGSkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1UwRkJVeXhGUVVGRkxGVkJRVU1zUTBGQlF6dEpRVU12UWl4SlFVRk5MRWRCUVVjc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXp0SlFVTjJRaXhKUVVGTkxFbEJRVWtzUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJRenRKUVVONlFpeEZRVUZGTEVOQlFVTXNRMEZCUXl4WlFVRlpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEzQkNMRmxCUVZrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNTVUZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRE8wbEJRemxETEVOQlFVTTdRVUZEVEN4RFFVRkRMRU5CUVVNc1EwRkJReUo5XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vd29ya2Vycy9TY3JlZW5Xb3JrZXIuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIlwidXNlIHN0cmljdFwiO1xuLyogZXNsaW50LWRpc2FibGUgKi9cbmV4cG9ydHMubWVtb3J5TGF5b3V0ID0ge1xuICAgIHNpemU6IDI1NixcbiAgICBtZW1sZW46IDB4NDAwMDAsXG4gICAgbWVtdG9wOiAweDNGRkZGLFxuICAgIGlvbGVuOiAyNTYsXG4gICAgaW90b3A6IDB4M0ZGRkYsXG4gICAgaW9Db21tM0RhdGFJbjogMHgzRkY0RixcbiAgICBpb0NvbW0zRGF0YU91dDogMHgzRkY0RSxcbiAgICBpb0NvbW0zQ29tbWFuZDogMHgzRkY0RCxcbiAgICBpb0NvbW0zQ29uZmlndXJhdGlvbjogMHgzRkY0QyxcbiAgICBpb0NvbW0yRGF0YUluOiAweDNGRjRCLFxuICAgIGlvQ29tbTJEYXRhT3V0OiAweDNGRjRBLFxuICAgIGlvQ29tbTJDb21tYW5kOiAweDNGRjQ5LFxuICAgIGlvQ29tbTJDb25maWd1cmF0aW9uOiAweDNGRjQ4LFxuICAgIGlvQ29tbTFEYXRhSW46IDB4M0ZGNDcsXG4gICAgaW9Db21tMURhdGFPdXQ6IDB4M0ZGNDYsXG4gICAgaW9Db21tMUNvbW1hbmQ6IDB4M0ZGNDUsXG4gICAgaW9Db21tMUNvbmZpZ3VyYXRpb246IDB4M0ZGNDQsXG4gICAgaW9Db21tMERhdGFJbjogMHgzRkY0MyxcbiAgICBpb0NvbW0wRGF0YU91dDogMHgzRkY0MixcbiAgICBpb0NvbW0wQ29tbWFuZDogMHgzRkY0MSxcbiAgICBpb0NvbW0wQ29uZmlndXJhdGlvbjogMHgzRkY0MCAvLyBiMCA9IG9wZW5lZDsgYjEgPSBjbWQgc2VudDsgYjIgPSBjbWQgYWNrOyBiMyA9IGRhdGEgb3V0IHNlbnQ7IGI0ID0gZGF0YSBvdXQgYWNrOyBiNSA9IGRhdGEgaW4gc2VudDsgYjYgPSBkYXRhIGluIGFja1xuICAgICxcbiAgICBpb1JhbmRvbUhpZ2g6IDB4M0ZGMzksXG4gICAgaW9SYW5kb21Mb3c6IDB4M0ZGMzgsXG4gICAgaW9DbG9ja0hvdXJzOiAweDNGRjMzLFxuICAgIGlvQ2xvY2tNaW51dGVzOiAweDNGRjMyLFxuICAgIGlvQ2xvY2tTZWNvbmRzOiAweDNGRjMxLFxuICAgIGlvQ2xvY2tIdW5kcmVkdGhzOiAweDNGRjMwLFxuICAgIGlvVGltZXIzSGlnaEN1cnJlbnQ6IDB4M0ZGMkMsXG4gICAgaW9UaW1lcjNMb3dDdXJyZW50OiAweDNGRjJCLFxuICAgIGlvVGltZXIzSGlnaFJlc2V0OiAweDNGRjJBLFxuICAgIGlvVGltZXIzTG93UmVzZXQ6IDB4M0ZGMjksXG4gICAgaW9UaW1lcjNDb25maWd1cmF0aW9uOiAweDNGRjI4LFxuICAgIGlvVGltZXIySGlnaEN1cnJlbnQ6IDB4M0ZGMjQsXG4gICAgaW9UaW1lcjJMb3dDdXJyZW50OiAweDNGRjIzLFxuICAgIGlvVGltZXIySGlnaFJlc2V0OiAweDNGRjIyLFxuICAgIGlvVGltZXIyTG93UmVzZXQ6IDB4M0ZGMjEsXG4gICAgaW9UaW1lcjJDb25maWd1cmF0aW9uOiAweDNGRjIwLFxuICAgIGlvVGltZXIxSGlnaEN1cnJlbnQ6IDB4M0ZGMUMsXG4gICAgaW9UaW1lcjFMb3dDdXJyZW50OiAweDNGRjFCLFxuICAgIGlvVGltZXIxSGlnaFJlc2V0OiAweDNGRjFBLFxuICAgIGlvVGltZXIxTG93UmVzZXQ6IDB4M0ZGMTksXG4gICAgaW9UaW1lcjFDb25maWd1cmF0aW9uOiAweDNGRjE4LFxuICAgIGlvVGltZXIwSGlnaEN1cnJlbnQ6IDB4M0ZGMTQsXG4gICAgaW9UaW1lcjBMb3dDdXJyZW50OiAweDNGRjEzLFxuICAgIGlvVGltZXIwSGlnaFJlc2V0OiAweDNGRjEyLFxuICAgIGlvVGltZXIwTG93UmVzZXQ6IDB4M0ZGMTEsXG4gICAgaW9UaW1lcjBDb25maWd1cmF0aW9uOiAweDNGRjEwIC8vIGIwID0gZW5hYmxlZDsgYjE6IDAgPSBvbmUtc2hvdCwgMSA9IGNvbnRpbnVvdXM7IGIyOiAwID0gbm8gaW50ZXJydXB0LCAxID0gdHJpZ2dlciBpbnRlcnJ1cHQ7IGI3ID0gdHJpZ2dlcmVkIChtYW51YWwgcmVzZXQpXG4gICAgLFxuICAgIGlvS2V5Ym9hcmREaXJlY3Rpb25zOiAweDNGRjAyLFxuICAgIGlvS2V5Ym9hcmRNb2RpZmllcnM6IDB4M0ZGMDEsXG4gICAgaW9LZXlib2FyZEtleVByZXNzZWQ6IDB4M0ZGMDAsXG4gICAgaW9ib3Q6IDB4M0ZGMDAsXG4gICAgc3ByaXRlQ291bnQ6IDE2LFxuICAgIHNwcml0ZUZIZWlnaHQ6IDB4MzQwQUYsXG4gICAgc3ByaXRlRUhlaWdodDogMHgzNDBBRSxcbiAgICBzcHJpdGVESGVpZ2h0OiAweDM0MEFELFxuICAgIHNwcml0ZUNIZWlnaHQ6IDB4MzQwQUMsXG4gICAgc3ByaXRlQkhlaWdodDogMHgzNDBBQixcbiAgICBzcHJpdGVBSGVpZ2h0OiAweDM0MEFBLFxuICAgIHNwcml0ZTlIZWlnaHQ6IDB4MzQwQTksXG4gICAgc3ByaXRlOEhlaWdodDogMHgzNDBBOCxcbiAgICBzcHJpdGU3SGVpZ2h0OiAweDM0MEE3LFxuICAgIHNwcml0ZTZIZWlnaHQ6IDB4MzQwQTYsXG4gICAgc3ByaXRlNUhlaWdodDogMHgzNDBBNSxcbiAgICBzcHJpdGU0SGVpZ2h0OiAweDM0MEE0LFxuICAgIHNwcml0ZTNIZWlnaHQ6IDB4MzQwQTMsXG4gICAgc3ByaXRlMkhlaWdodDogMHgzNDBBMixcbiAgICBzcHJpdGUxSGVpZ2h0OiAweDM0MEExLFxuICAgIHNwcml0ZTBIZWlnaHQ6IDB4MzQwQTAsXG4gICAgc3ByaXRlRldpZHRoOiAweDM0MDlGLFxuICAgIHNwcml0ZUVXaWR0aDogMHgzNDA5RSxcbiAgICBzcHJpdGVEV2lkdGg6IDB4MzQwOUQsXG4gICAgc3ByaXRlQ1dpZHRoOiAweDM0MDlDLFxuICAgIHNwcml0ZUJXaWR0aDogMHgzNDA5QixcbiAgICBzcHJpdGVBV2lkdGg6IDB4MzQwOUEsXG4gICAgc3ByaXRlOVdpZHRoOiAweDM0MDk5LFxuICAgIHNwcml0ZThXaWR0aDogMHgzNDA5OCxcbiAgICBzcHJpdGU3V2lkdGg6IDB4MzQwOTcsXG4gICAgc3ByaXRlNldpZHRoOiAweDM0MDk2LFxuICAgIHNwcml0ZTVXaWR0aDogMHgzNDA5NSxcbiAgICBzcHJpdGU0V2lkdGg6IDB4MzQwOTQsXG4gICAgc3ByaXRlM1dpZHRoOiAweDM0MDkzLFxuICAgIHNwcml0ZTJXaWR0aDogMHgzNDA5MixcbiAgICBzcHJpdGUxV2lkdGg6IDB4MzQwOTEsXG4gICAgc3ByaXRlMFdpZHRoOiAweDM0MDkwLFxuICAgIHNwcml0ZUZUaWxlOiAweDM0MDhGLFxuICAgIHNwcml0ZUVUaWxlOiAweDM0MDhFLFxuICAgIHNwcml0ZURUaWxlOiAweDM0MDhELFxuICAgIHNwcml0ZUNUaWxlOiAweDM0MDhDLFxuICAgIHNwcml0ZUJUaWxlOiAweDM0MDhCLFxuICAgIHNwcml0ZUFUaWxlOiAweDM0MDhBLFxuICAgIHNwcml0ZTlUaWxlOiAweDM0MDg5LFxuICAgIHNwcml0ZThUaWxlOiAweDM0MDg4LFxuICAgIHNwcml0ZTdUaWxlOiAweDM0MDg3LFxuICAgIHNwcml0ZTZUaWxlOiAweDM0MDg2LFxuICAgIHNwcml0ZTVUaWxlOiAweDM0MDg1LFxuICAgIHNwcml0ZTRUaWxlOiAweDM0MDg0LFxuICAgIHNwcml0ZTNUaWxlOiAweDM0MDgzLFxuICAgIHNwcml0ZTJUaWxlOiAweDM0MDgyLFxuICAgIHNwcml0ZTFUaWxlOiAweDM0MDgxLFxuICAgIHNwcml0ZTBUaWxlOiAweDM0MDgwLFxuICAgIHNwcml0ZUZUaWxlU2V0OiAweDM0MDdGLFxuICAgIHNwcml0ZUVUaWxlU2V0OiAweDM0MDdFLFxuICAgIHNwcml0ZURUaWxlU2V0OiAweDM0MDdELFxuICAgIHNwcml0ZUNUaWxlU2V0OiAweDM0MDdDLFxuICAgIHNwcml0ZUJUaWxlU2V0OiAweDM0MDdCLFxuICAgIHNwcml0ZUFUaWxlU2V0OiAweDM0MDdBLFxuICAgIHNwcml0ZTlUaWxlU2V0OiAweDM0MDc5LFxuICAgIHNwcml0ZThUaWxlU2V0OiAweDM0MDc4LFxuICAgIHNwcml0ZTdUaWxlU2V0OiAweDM0MDc3LFxuICAgIHNwcml0ZTZUaWxlU2V0OiAweDM0MDc2LFxuICAgIHNwcml0ZTVUaWxlU2V0OiAweDM0MDc1LFxuICAgIHNwcml0ZTRUaWxlU2V0OiAweDM0MDc0LFxuICAgIHNwcml0ZTNUaWxlU2V0OiAweDM0MDczLFxuICAgIHNwcml0ZTJUaWxlU2V0OiAweDM0MDcyLFxuICAgIHNwcml0ZTFUaWxlU2V0OiAweDM0MDcxLFxuICAgIHNwcml0ZTBUaWxlU2V0OiAweDM0MDcwLFxuICAgIHNwcml0ZUZGR0NvbG9yOiAweDM0MDZGLFxuICAgIHNwcml0ZUVGR0NvbG9yOiAweDM0MDZFLFxuICAgIHNwcml0ZURGR0NvbG9yOiAweDM0MDZELFxuICAgIHNwcml0ZUNGR0NvbG9yOiAweDM0MDZDLFxuICAgIHNwcml0ZUJGR0NvbG9yOiAweDM0MDZCLFxuICAgIHNwcml0ZUFGR0NvbG9yOiAweDM0MDZBLFxuICAgIHNwcml0ZTlGR0NvbG9yOiAweDM0MDY5LFxuICAgIHNwcml0ZThGR0NvbG9yOiAweDM0MDY4LFxuICAgIHNwcml0ZTdGR0NvbG9yOiAweDM0MDY3LFxuICAgIHNwcml0ZTZGR0NvbG9yOiAweDM0MDY2LFxuICAgIHNwcml0ZTVGR0NvbG9yOiAweDM0MDY1LFxuICAgIHNwcml0ZTRGR0NvbG9yOiAweDM0MDY0LFxuICAgIHNwcml0ZTNGR0NvbG9yOiAweDM0MDYzLFxuICAgIHNwcml0ZTJGR0NvbG9yOiAweDM0MDYyLFxuICAgIHNwcml0ZTFGR0NvbG9yOiAweDM0MDYxLFxuICAgIHNwcml0ZTBGR0NvbG9yOiAweDM0MDYwLFxuICAgIHNwcml0ZUZCR0NvbG9yOiAweDM0MDVGLFxuICAgIHNwcml0ZUVCR0NvbG9yOiAweDM0MDVFLFxuICAgIHNwcml0ZURCR0NvbG9yOiAweDM0MDVELFxuICAgIHNwcml0ZUNCR0NvbG9yOiAweDM0MDVDLFxuICAgIHNwcml0ZUJCR0NvbG9yOiAweDM0MDVCLFxuICAgIHNwcml0ZUFCR0NvbG9yOiAweDM0MDVBLFxuICAgIHNwcml0ZTlCR0NvbG9yOiAweDM0MDU5LFxuICAgIHNwcml0ZThCR0NvbG9yOiAweDM0MDU4LFxuICAgIHNwcml0ZTdCR0NvbG9yOiAweDM0MDU3LFxuICAgIHNwcml0ZTZCR0NvbG9yOiAweDM0MDU2LFxuICAgIHNwcml0ZTVCR0NvbG9yOiAweDM0MDU1LFxuICAgIHNwcml0ZTRCR0NvbG9yOiAweDM0MDU0LFxuICAgIHNwcml0ZTNCR0NvbG9yOiAweDM0MDUzLFxuICAgIHNwcml0ZTJCR0NvbG9yOiAweDM0MDUyLFxuICAgIHNwcml0ZTFCR0NvbG9yOiAweDM0MDUxLFxuICAgIHNwcml0ZTBCR0NvbG9yOiAweDM0MDUwLFxuICAgIHNwcml0ZUZTY2FsZTogMHgzNDA0RixcbiAgICBzcHJpdGVFU2NhbGU6IDB4MzQwNEUsXG4gICAgc3ByaXRlRFNjYWxlOiAweDM0MDRELFxuICAgIHNwcml0ZUNTY2FsZTogMHgzNDA0QyxcbiAgICBzcHJpdGVCU2NhbGU6IDB4MzQwNEIsXG4gICAgc3ByaXRlQVNjYWxlOiAweDM0MDRBLFxuICAgIHNwcml0ZTlTY2FsZTogMHgzNDA0OSxcbiAgICBzcHJpdGU4U2NhbGU6IDB4MzQwNDgsXG4gICAgc3ByaXRlN1NjYWxlOiAweDM0MDQ3LFxuICAgIHNwcml0ZTZTY2FsZTogMHgzNDA0NixcbiAgICBzcHJpdGU1U2NhbGU6IDB4MzQwNDUsXG4gICAgc3ByaXRlNFNjYWxlOiAweDM0MDQ0LFxuICAgIHNwcml0ZTNTY2FsZTogMHgzNDA0MyxcbiAgICBzcHJpdGUyU2NhbGU6IDB4MzQwNDIsXG4gICAgc3ByaXRlMVNjYWxlOiAweDM0MDQxLFxuICAgIHNwcml0ZTBTY2FsZTogMHgzNDA0MCxcbiAgICBzcHJpdGVGWVBvc2l0aW9uOiAweDM0MDNGLFxuICAgIHNwcml0ZUVZUG9zaXRpb246IDB4MzQwM0UsXG4gICAgc3ByaXRlRFlQb3NpdGlvbjogMHgzNDAzRCxcbiAgICBzcHJpdGVDWVBvc2l0aW9uOiAweDM0MDNDLFxuICAgIHNwcml0ZUJZUG9zaXRpb246IDB4MzQwM0IsXG4gICAgc3ByaXRlQVlQb3NpdGlvbjogMHgzNDAzQSxcbiAgICBzcHJpdGU5WVBvc2l0aW9uOiAweDM0MDM5LFxuICAgIHNwcml0ZThZUG9zaXRpb246IDB4MzQwMzgsXG4gICAgc3ByaXRlN1lQb3NpdGlvbjogMHgzNDAzNyxcbiAgICBzcHJpdGU2WVBvc2l0aW9uOiAweDM0MDM2LFxuICAgIHNwcml0ZTVZUG9zaXRpb246IDB4MzQwMzUsXG4gICAgc3ByaXRlNFlQb3NpdGlvbjogMHgzNDAzNCxcbiAgICBzcHJpdGUzWVBvc2l0aW9uOiAweDM0MDMzLFxuICAgIHNwcml0ZTJZUG9zaXRpb246IDB4MzQwMzIsXG4gICAgc3ByaXRlMVlQb3NpdGlvbjogMHgzNDAzMSxcbiAgICBzcHJpdGUwWVBvc2l0aW9uOiAweDM0MDMwLFxuICAgIHNwcml0ZUZYUG9zaXRpb246IDB4MzQwMUYsXG4gICAgc3ByaXRlRVhQb3NpdGlvbjogMHgzNDAxRSxcbiAgICBzcHJpdGVEWFBvc2l0aW9uOiAweDM0MDFELFxuICAgIHNwcml0ZUNYUG9zaXRpb246IDB4MzQwMUMsXG4gICAgc3ByaXRlQlhQb3NpdGlvbjogMHgzNDAxQixcbiAgICBzcHJpdGVBWFBvc2l0aW9uOiAweDM0MDFBLFxuICAgIHNwcml0ZTlYUG9zaXRpb246IDB4MzQwMTksXG4gICAgc3ByaXRlOFhQb3NpdGlvbjogMHgzNDAxOCxcbiAgICBzcHJpdGU3WFBvc2l0aW9uOiAweDM0MDE3LFxuICAgIHNwcml0ZTZYUG9zaXRpb246IDB4MzQwMTYsXG4gICAgc3ByaXRlNVhQb3NpdGlvbjogMHgzNDAxNSxcbiAgICBzcHJpdGU0WFBvc2l0aW9uOiAweDM0MDE0LFxuICAgIHNwcml0ZTNYUG9zaXRpb246IDB4MzQwMTMsXG4gICAgc3ByaXRlMlhQb3NpdGlvbjogMHgzNDAxMixcbiAgICBzcHJpdGUxWFBvc2l0aW9uOiAweDM0MDExLFxuICAgIHNwcml0ZTBYUG9zaXRpb246IDB4MzQwMTAsXG4gICAgc3ByaXRlRkxheWVyOiAweDM0MDBGLFxuICAgIHNwcml0ZUVMYXllcjogMHgzNDAwRSxcbiAgICBzcHJpdGVETGF5ZXI6IDB4MzQwMEQsXG4gICAgc3ByaXRlQ0xheWVyOiAweDM0MDBDLFxuICAgIHNwcml0ZUJMYXllcjogMHgzNDAwQixcbiAgICBzcHJpdGVBTGF5ZXI6IDB4MzQwMEEsXG4gICAgc3ByaXRlOUxheWVyOiAweDM0MDA5LFxuICAgIHNwcml0ZThMYXllcjogMHgzNDAwOCxcbiAgICBzcHJpdGU3TGF5ZXI6IDB4MzQwMDcsXG4gICAgc3ByaXRlNkxheWVyOiAweDM0MDA2LFxuICAgIHNwcml0ZTVMYXllcjogMHgzNDAwNSxcbiAgICBzcHJpdGU0TGF5ZXI6IDB4MzQwMDQsXG4gICAgc3ByaXRlM0xheWVyOiAweDM0MDAzLFxuICAgIHNwcml0ZTJMYXllcjogMHgzNDAwMixcbiAgICBzcHJpdGUxTGF5ZXI6IDB4MzQwMDEsXG4gICAgc3ByaXRlMExheWVyOiAweDM0MDAwLFxuICAgIHNwcml0ZVN0YXJ0OiAweDM0MDAwLFxuICAgIHRpbGVQYWdlc0xlbmd0aDogMHgwNDAwMCxcbiAgICB0aWxlUGFnZUxlbmd0aDogMHgwMTAwMCxcbiAgICB0aWxlUGFnZTNMYXllcjogMHgzM0ZGRiAvLyAwIC0gNyA9IHZpc2libGUgYXQgbGF5ZXIsIDB4RkYvLTEgPSBub3QgdmlzaWJsZVxuICAgICxcbiAgICB0aWxlUGFnZTNPZmZzZXRZOiAweDMzRkZFIC8vIHNpZ25lZCBZIG9mZnNldCBmb3Igc21vb3RoIHNjcm9sbGluZ1xuICAgICxcbiAgICB0aWxlUGFnZTNPZmZzZXRYOiAweDMzRkZEIC8vIHNpZ25lZCBYIG9mZnNldCBmb3Igc21vb3RoIHNjcm9sbGluZ1xuICAgICxcbiAgICB0aWxlUGFnZTNTZXQ6IDB4MzNGRkMgLy8gMCAtIDMsIHdoaWNoIHRpbGVzZXQgdG8gdXNlXG4gICAgLFxuICAgIHRpbGVQYWdlM1NjYWxlOiAweDMzRkZCIC8vIDAgPSAxeDEgcGl4ZWwsIDEgPSAyeDIgcGl4ZWxcbiAgICAsXG4gICAgdGlsZVBhZ2UzQ3JvcFk6IDB4MzNGRkEgLy8gaGVpZ2h0IG9mIGFyZWEgdG8gaWdub3JlIHdoZW4gY29tcG9zaXRpbmcgKGJvcmRlcilcbiAgICAsXG4gICAgdGlsZVBhZ2UzQ3JvcFg6IDB4MzNGRjkgLy8gd2lkdGggb2YgYXJlYSB0byBpZ25vcmUgd2hlbiBjb21wb3NpdGluZyAoYm9yZGVyKVxuICAgICxcbiAgICB0aWxlUGFnZTNGR0NvbG9yOiAweDMzODAwLFxuICAgIHRpbGVQYWdlM0JHQ29sb3I6IDB4MzM0MDAsXG4gICAgdGlsZVBhZ2UzOiAweDMzMDAwLFxuICAgIHRpbGVQYWdlMkxheWVyOiAweDMyRkZGIC8vIDAgLSA3ID0gdmlzaWJsZSBhdCBsYXllciwgMHhGRi8tMSA9IG5vdCB2aXNpYmxlXG4gICAgLFxuICAgIHRpbGVQYWdlMk9mZnNldFk6IDB4MzJGRkUgLy8gc2lnbmVkIFkgb2Zmc2V0IGZvciBzbW9vdGggc2Nyb2xsaW5nXG4gICAgLFxuICAgIHRpbGVQYWdlMk9mZnNldFg6IDB4MzJGRkQgLy8gc2lnbmVkIFggb2Zmc2V0IGZvciBzbW9vdGggc2Nyb2xsaW5nXG4gICAgLFxuICAgIHRpbGVQYWdlMlNldDogMHgzMkZGQyAvLyAwIC0gMywgd2hpY2ggdGlsZXNldCB0byB1c2VcbiAgICAsXG4gICAgdGlsZVBhZ2UyU2NhbGU6IDB4MzJGRkIgLy8gMCA9IDF4MSBwaXhlbCwgMSA9IDJ4MiBwaXhlbFxuICAgICxcbiAgICB0aWxlUGFnZTJDcm9wWTogMHgzMkZGQSAvLyBoZWlnaHQgb2YgYXJlYSB0byBpZ25vcmUgd2hlbiBjb21wb3NpdGluZyAoYm9yZGVyKVxuICAgICxcbiAgICB0aWxlUGFnZTJDcm9wWDogMHgzMkZGOSAvLyB3aWR0aCBvZiBhcmVhIHRvIGlnbm9yZSB3aGVuIGNvbXBvc2l0aW5nIChib3JkZXIpXG4gICAgLFxuICAgIHRpbGVQYWdlMkZHQ29sb3I6IDB4MzI4MDAsXG4gICAgdGlsZVBhZ2UyQkdDb2xvcjogMHgzMjQwMCxcbiAgICB0aWxlUGFnZTI6IDB4MzIwMDAsXG4gICAgdGlsZVBhZ2UxTGF5ZXI6IDB4MzFGRkYgLy8gMCAtIDcgPSB2aXNpYmxlIGF0IGxheWVyLCAweEZGLy0xID0gbm90IHZpc2libGVcbiAgICAsXG4gICAgdGlsZVBhZ2UxT2Zmc2V0WTogMHgzMUZGRSAvLyBzaWduZWQgWSBvZmZzZXQgZm9yIHNtb290aCBzY3JvbGxpbmdcbiAgICAsXG4gICAgdGlsZVBhZ2UxT2Zmc2V0WDogMHgzMUZGRCAvLyBzaWduZWQgWCBvZmZzZXQgZm9yIHNtb290aCBzY3JvbGxpbmdcbiAgICAsXG4gICAgdGlsZVBhZ2UxU2V0OiAweDMxRkZDIC8vIDAgLSAzLCB3aGljaCB0aWxlc2V0IHRvIHVzZVxuICAgICxcbiAgICB0aWxlUGFnZTFTY2FsZTogMHgzMUZGQiAvLyAwID0gMXgxIHBpeGVsLCAxID0gMngyIHBpeGVsXG4gICAgLFxuICAgIHRpbGVQYWdlMUNyb3BZOiAweDMxRkZBIC8vIGhlaWdodCBvZiBhcmVhIHRvIGlnbm9yZSB3aGVuIGNvbXBvc2l0aW5nIChib3JkZXIpXG4gICAgLFxuICAgIHRpbGVQYWdlMUNyb3BYOiAweDMxRkY5IC8vIHdpZHRoIG9mIGFyZWEgdG8gaWdub3JlIHdoZW4gY29tcG9zaXRpbmcgKGJvcmRlcilcbiAgICAsXG4gICAgdGlsZVBhZ2UxRkdDb2xvcjogMHgzMTgwMCxcbiAgICB0aWxlUGFnZTFCR0NvbG9yOiAweDMxNDAwLFxuICAgIHRpbGVQYWdlMTogMHgzMTAwMCxcbiAgICB0aWxlUGFnZTBMYXllcjogMHgzMEZGRiAvLyAwIC0gNyA9IHZpc2libGUgYXQgbGF5ZXIsIDB4RkYvLTEgPSBub3QgdmlzaWJsZVxuICAgICxcbiAgICB0aWxlUGFnZTBPZmZzZXRZOiAweDMwRkZFIC8vIHNpZ25lZCBZIG9mZnNldCBmb3Igc21vb3RoIHNjcm9sbGluZ1xuICAgICxcbiAgICB0aWxlUGFnZTBPZmZzZXRYOiAweDMwRkZEIC8vIHNpZ25lZCBYIG9mZnNldCBmb3Igc21vb3RoIHNjcm9sbGluZ1xuICAgICxcbiAgICB0aWxlUGFnZTBTZXQ6IDB4MzBGRkMgLy8gMCAtIDMsIHdoaWNoIHRpbGVzZXQgdG8gdXNlXG4gICAgLFxuICAgIHRpbGVQYWdlMFNjYWxlOiAweDMwRkZCIC8vIDAgPSAxeDEgcGl4ZWwsIDEgPSAyeDIgcGl4ZWxcbiAgICAsXG4gICAgdGlsZVBhZ2UwQ3JvcFk6IDB4MzBGRkEgLy8gaGVpZ2h0IG9mIGFyZWEgdG8gaWdub3JlIHdoZW4gY29tcG9zaXRpbmcgKGJvcmRlcilcbiAgICAsXG4gICAgdGlsZVBhZ2UwQ3JvcFg6IDB4MzBGRjkgLy8gd2lkdGggb2YgYXJlYSB0byBpZ25vcmUgd2hlbiBjb21wb3NpdGluZyAoYm9yZGVyKVxuICAgICxcbiAgICB0aWxlUGFnZTBGR0NvbG9yOiAweDMwODAwLFxuICAgIHRpbGVQYWdlMEJHQ29sb3I6IDB4MzA0MDAsXG4gICAgdGlsZVBhZ2UwOiAweDMwMDAwLFxuICAgIHRpbGVQYWdlc1N0YXJ0OiAweDMwMDAwLFxuICAgIHRpbGVTZXRzTGVuZ3RoOiA2NTUzNixcbiAgICB0aWxlU2V0TGVuZ3RoOiAxNjM4NCxcbiAgICB0aWxlU2V0MzogMHgyQzAwMCAvLyB0aWxlc2V0IDNcbiAgICAsXG4gICAgdGlsZVNldDI6IDB4MjgwMDAgLy8gdGlsZXNldCAyXG4gICAgLFxuICAgIHRpbGVTZXQxOiAweDI0MDAwIC8vIHRpbGVzZXQgMVxuICAgICxcbiAgICB0aWxlU2V0MDogMHgyMDAwMCAvLyAxNksgMjU2IDh4OCB0aWxlc2V0IDBcbiAgICAsXG4gICAgdGlsZVNldHNTdGFydDogMHgyMDAwMCxcbiAgICBwYWxldHRlTGVuZ3RoOiAxMDI0LFxuICAgIHBhbGV0dGVMZW5ndGgzMjogMjU2LFxuICAgIHBhbGV0dGVTdGFydDogMHgxRkMwMCAvLyAyNTYgeCA0IGJ5dGVzXG4gICAgLFxuICAgIGJhY2tncm91bmRDb2xvcjogMHgxRkEwQiAvLyBiYWNrZ3JvdW5kIGNvbG9yIGZvciBzY3JlZW5cbiAgICAsXG4gICAgYm9yZGVyU2l6ZVk6IDB4MUZBMDYgLy8gaGVpZ2h0IG9mIHZlcnRpY2FsIGJvcmRlciBpbiBweFxuICAgICxcbiAgICBib3JkZXJTaXplWDogMHgxRkEwNSAvLyB3aWR0aCBvZiBob3Jpem9udGFsIGJvcmRlciBpbiBweFxuICAgICxcbiAgICBib3JkZXJDb2xvcjogMHgxRkEwNCAvLyBCb3JkZXIgQ29sb3JcbiAgICAsXG4gICAgZ3JhcGhpY3NMYXllcjogMHgxRkEwMiAvLyAwIC0gNywgZ3JhcGhpY2EgbGF5ZXI7IEZGID0gbm8gZGlzcGxheVxuICAgICxcbiAgICBzY3JlZW5Db25maWdMZW5ndGg6IDI1NixcbiAgICBzY3JlZW5Db25maWdTdGFydDogMHgxRkEwMCxcbiAgICBncmFwaGljc0xlbmd0aDogNjQwMDAsXG4gICAgZ3JhcGhpY3NTdGFydDogMHgxMDAwMCAvLyAzMjAgeCAyMDAgKDY0MDAwKSBieXRlc1xuICAgICxcbiAgICByb21MZW5ndGg6IDB4MDQwMDAgLy8gbGVuZ3RoIG9mIHJvbVxuICAgICxcbiAgICByb21FbmQ6IDB4MEZGRkYgLy8gRW5kIG9mIFJPTVxuICAgICxcbiAgICByb21TdGFydDogMHgwQzAwMCAvLyBTdGFydCBvZiBST01cbiAgICAsXG4gICAgcm9tU2NyYXRjaFN0YXJ0OiAweDBCMDAwIC8vIFJPTSBzY3JhdGNoIGFyZWFcbiAgICAsXG4gICAgY29kZVN0YXJ0OiAweDAxMDAwIC8vIFN0YXJ0IG9mIGNvZGUgZXhlY3V0aW9uXG4gICAgLFxuICAgIHN0YWNrVG9wOiAweDAwRkZGIC8vIHRvcCBvZiBzdGFjayAoZ3Jvd3MgZG93bilcbiAgICAsXG4gICAgc3RhY2tNYXg6IDB4MDA0MDAgLy8gYm90dG9tIG9mIHN0YWNrXG4gICAgLFxuICAgIHRyYXBSZXNldDogMHgwMDAwMCAvLyBqdW1wIHRvIGluc3RydWN0aW9uIHdoZW4gcmVzZXRcbiAgICAsXG4gICAgdHJhcHM6IDB4MDAwMDAgLy8gMjU2IDItYnl0ZSBsb25nIHBvaW50ZXJzOyBlbmRzIDB4MDAxRkZcbiAgICAsXG4gICAgbWVtYm90OiAweDAwMDAwXG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5tZW1vcnlMYXlvdXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2liV1Z0YjNKNVRHRjViM1YwTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2liV1Z0YjNKNVRHRjViM1YwTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRU3h2UWtGQmIwSTdRVUZEVkN4UlFVRkJMRmxCUVZrc1IwRkJSenRKUVVONFFpeEpRVUZKTEVWQlFVVXNSMEZCUnp0SlFVTlFMRTFCUVUwc1JVRkJSU3hQUVVGUE8wbEJRMllzVFVGQlRTeEZRVUZGTEU5QlFVODdTVUZEWml4TFFVRkxMRVZCUVVVc1IwRkJSenRKUVVOV0xFdEJRVXNzUlVGQlJTeFBRVUZQTzBsQlEyUXNZVUZCWVN4RlFVRkZMRTlCUVU4N1NVRkRkRUlzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNiMEpCUVc5Q0xFVkJRVVVzVDBGQlR6dEpRVU0zUWl4aFFVRmhMRVZCUVVVc1QwRkJUenRKUVVOMFFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4dlFrRkJiMElzUlVGQlJTeFBRVUZQTzBsQlF6ZENMR0ZCUVdFc1JVRkJSU3hQUVVGUE8wbEJRM1JDTEdOQlFXTXNSVUZCUlN4UFFVRlBPMGxCUTNaQ0xHTkJRV01zUlVGQlJTeFBRVUZQTzBsQlEzWkNMRzlDUVVGdlFpeEZRVUZGTEU5QlFVODdTVUZETjBJc1lVRkJZU3hGUVVGRkxFOUJRVTg3U1VGRGRFSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc2IwSkJRVzlDTEVWQlFVVXNUMEZCVHl4RFFVRkZMSFZJUVVGMVNEczdTVUZEZEVvc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNWMEZCVnl4RlFVRkZMRTlCUVU4N1NVRkRjRUlzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzYVVKQlFXbENMRVZCUVVVc1QwRkJUenRKUVVNeFFpeHRRa0ZCYlVJc1JVRkJSU3hQUVVGUE8wbEJRelZDTEd0Q1FVRnJRaXhGUVVGRkxFOUJRVTg3U1VGRE0wSXNhVUpCUVdsQ0xFVkJRVVVzVDBGQlR6dEpRVU14UWl4blFrRkJaMElzUlVGQlJTeFBRVUZQTzBsQlEzcENMSEZDUVVGeFFpeEZRVUZGTEU5QlFVODdTVUZET1VJc2JVSkJRVzFDTEVWQlFVVXNUMEZCVHp0SlFVTTFRaXhyUWtGQmEwSXNSVUZCUlN4UFFVRlBPMGxCUXpOQ0xHbENRVUZwUWl4RlFVRkZMRTlCUVU4N1NVRkRNVUlzWjBKQlFXZENMRVZCUVVVc1QwRkJUenRKUVVONlFpeHhRa0ZCY1VJc1JVRkJSU3hQUVVGUE8wbEJRemxDTEcxQ1FVRnRRaXhGUVVGRkxFOUJRVTg3U1VGRE5VSXNhMEpCUVd0Q0xFVkJRVVVzVDBGQlR6dEpRVU16UWl4cFFrRkJhVUlzUlVGQlJTeFBRVUZQTzBsQlF6RkNMR2RDUVVGblFpeEZRVUZGTEU5QlFVODdTVUZEZWtJc2NVSkJRWEZDTEVWQlFVVXNUMEZCVHp0SlFVTTVRaXh0UWtGQmJVSXNSVUZCUlN4UFFVRlBPMGxCUXpWQ0xHdENRVUZyUWl4RlFVRkZMRTlCUVU4N1NVRkRNMElzYVVKQlFXbENMRVZCUVVVc1QwRkJUenRKUVVNeFFpeG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUE8wbEJRM3BDTEhGQ1FVRnhRaXhGUVVGRkxFOUJRVThzUTBGQlJTdzJTRUZCTmtnN08wbEJRemRLTEc5Q1FVRnZRaXhGUVVGRkxFOUJRVTg3U1VGRE4wSXNiVUpCUVcxQ0xFVkJRVVVzVDBGQlR6dEpRVU0xUWl4dlFrRkJiMElzUlVGQlJTeFBRVUZQTzBsQlF6ZENMRXRCUVVzc1JVRkJSU3hQUVVGUE8wbEJRMlFzVjBGQlZ5eEZRVUZGTEVWQlFVVTdTVUZEWml4aFFVRmhMRVZCUVVVc1QwRkJUenRKUVVOMFFpeGhRVUZoTEVWQlFVVXNUMEZCVHp0SlFVTjBRaXhoUVVGaExFVkJRVVVzVDBGQlR6dEpRVU4wUWl4aFFVRmhMRVZCUVVVc1QwRkJUenRKUVVOMFFpeGhRVUZoTEVWQlFVVXNUMEZCVHp0SlFVTjBRaXhoUVVGaExFVkJRVVVzVDBGQlR6dEpRVU4wUWl4aFFVRmhMRVZCUVVVc1QwRkJUenRKUVVOMFFpeGhRVUZoTEVWQlFVVXNUMEZCVHp0SlFVTjBRaXhoUVVGaExFVkJRVVVzVDBGQlR6dEpRVU4wUWl4aFFVRmhMRVZCUVVVc1QwRkJUenRKUVVOMFFpeGhRVUZoTEVWQlFVVXNUMEZCVHp0SlFVTjBRaXhoUVVGaExFVkJRVVVzVDBGQlR6dEpRVU4wUWl4aFFVRmhMRVZCUVVVc1QwRkJUenRKUVVOMFFpeGhRVUZoTEVWQlFVVXNUMEZCVHp0SlFVTjBRaXhoUVVGaExFVkJRVVVzVDBGQlR6dEpRVU4wUWl4aFFVRmhMRVZCUVVVc1QwRkJUenRKUVVOMFFpeFpRVUZaTEVWQlFVVXNUMEZCVHp0SlFVTnlRaXhaUVVGWkxFVkJRVVVzVDBGQlR6dEpRVU55UWl4WlFVRlpMRVZCUVVVc1QwRkJUenRKUVVOeVFpeFpRVUZaTEVWQlFVVXNUMEZCVHp0SlFVTnlRaXhaUVVGWkxFVkJRVVVzVDBGQlR6dEpRVU55UWl4WlFVRlpMRVZCUVVVc1QwRkJUenRKUVVOeVFpeFpRVUZaTEVWQlFVVXNUMEZCVHp0SlFVTnlRaXhaUVVGWkxFVkJRVVVzVDBGQlR6dEpRVU55UWl4WlFVRlpMRVZCUVVVc1QwRkJUenRKUVVOeVFpeFpRVUZaTEVWQlFVVXNUMEZCVHp0SlFVTnlRaXhaUVVGWkxFVkJRVVVzVDBGQlR6dEpRVU55UWl4WlFVRlpMRVZCUVVVc1QwRkJUenRKUVVOeVFpeFpRVUZaTEVWQlFVVXNUMEZCVHp0SlFVTnlRaXhaUVVGWkxFVkJRVVVzVDBGQlR6dEpRVU55UWl4WlFVRlpMRVZCUVVVc1QwRkJUenRKUVVOeVFpeFpRVUZaTEVWQlFVVXNUMEZCVHp0SlFVTnlRaXhYUVVGWExFVkJRVVVzVDBGQlR6dEpRVU53UWl4WFFVRlhMRVZCUVVVc1QwRkJUenRKUVVOd1FpeFhRVUZYTEVWQlFVVXNUMEZCVHp0SlFVTndRaXhYUVVGWExFVkJRVVVzVDBGQlR6dEpRVU53UWl4WFFVRlhMRVZCUVVVc1QwRkJUenRKUVVOd1FpeFhRVUZYTEVWQlFVVXNUMEZCVHp0SlFVTndRaXhYUVVGWExFVkJRVVVzVDBGQlR6dEpRVU53UWl4WFFVRlhMRVZCUVVVc1QwRkJUenRKUVVOd1FpeFhRVUZYTEVWQlFVVXNUMEZCVHp0SlFVTndRaXhYUVVGWExFVkJRVVVzVDBGQlR6dEpRVU53UWl4WFFVRlhMRVZCUVVVc1QwRkJUenRKUVVOd1FpeFhRVUZYTEVWQlFVVXNUMEZCVHp0SlFVTndRaXhYUVVGWExFVkJRVVVzVDBGQlR6dEpRVU53UWl4WFFVRlhMRVZCUVVVc1QwRkJUenRKUVVOd1FpeFhRVUZYTEVWQlFVVXNUMEZCVHp0SlFVTndRaXhYUVVGWExFVkJRVVVzVDBGQlR6dEpRVU53UWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4alFVRmpMRVZCUVVVc1QwRkJUenRKUVVOMlFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4WlFVRlpMRVZCUVVVc1QwRkJUenRKUVVOeVFpeFpRVUZaTEVWQlFVVXNUMEZCVHp0SlFVTnlRaXhaUVVGWkxFVkJRVVVzVDBGQlR6dEpRVU55UWl4WlFVRlpMRVZCUVVVc1QwRkJUenRKUVVOeVFpeFpRVUZaTEVWQlFVVXNUMEZCVHp0SlFVTnlRaXhaUVVGWkxFVkJRVVVzVDBGQlR6dEpRVU55UWl4WlFVRlpMRVZCUVVVc1QwRkJUenRKUVVOeVFpeFpRVUZaTEVWQlFVVXNUMEZCVHp0SlFVTnlRaXhaUVVGWkxFVkJRVVVzVDBGQlR6dEpRVU55UWl4WlFVRlpMRVZCUVVVc1QwRkJUenRKUVVOeVFpeFpRVUZaTEVWQlFVVXNUMEZCVHp0SlFVTnlRaXhaUVVGWkxFVkJRVVVzVDBGQlR6dEpRVU55UWl4WlFVRlpMRVZCUVVVc1QwRkJUenRKUVVOeVFpeFpRVUZaTEVWQlFVVXNUMEZCVHp0SlFVTnlRaXhaUVVGWkxFVkJRVVVzVDBGQlR6dEpRVU55UWl4WlFVRlpMRVZCUVVVc1QwRkJUenRKUVVOeVFpeG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUE8wbEJRM3BDTEdkQ1FVRm5RaXhGUVVGRkxFOUJRVTg3U1VGRGVrSXNaMEpCUVdkQ0xFVkJRVVVzVDBGQlR6dEpRVU42UWl4blFrRkJaMElzUlVGQlJTeFBRVUZQTzBsQlEzcENMR2RDUVVGblFpeEZRVUZGTEU5QlFVODdTVUZEZWtJc1owSkJRV2RDTEVWQlFVVXNUMEZCVHp0SlFVTjZRaXhuUWtGQlowSXNSVUZCUlN4UFFVRlBPMGxCUTNwQ0xHZENRVUZuUWl4RlFVRkZMRTlCUVU4N1NVRkRla0lzWjBKQlFXZENMRVZCUVVVc1QwRkJUenRKUVVONlFpeG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUE8wbEJRM3BDTEdkQ1FVRm5RaXhGUVVGRkxFOUJRVTg3U1VGRGVrSXNaMEpCUVdkQ0xFVkJRVVVzVDBGQlR6dEpRVU42UWl4blFrRkJaMElzUlVGQlJTeFBRVUZQTzBsQlEzcENMR2RDUVVGblFpeEZRVUZGTEU5QlFVODdTVUZEZWtJc1owSkJRV2RDTEVWQlFVVXNUMEZCVHp0SlFVTjZRaXhuUWtGQlowSXNSVUZCUlN4UFFVRlBPMGxCUTNwQ0xHZENRVUZuUWl4RlFVRkZMRTlCUVU4N1NVRkRla0lzWjBKQlFXZENMRVZCUVVVc1QwRkJUenRKUVVONlFpeG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUE8wbEJRM3BDTEdkQ1FVRm5RaXhGUVVGRkxFOUJRVTg3U1VGRGVrSXNaMEpCUVdkQ0xFVkJRVVVzVDBGQlR6dEpRVU42UWl4blFrRkJaMElzUlVGQlJTeFBRVUZQTzBsQlEzcENMR2RDUVVGblFpeEZRVUZGTEU5QlFVODdTVUZEZWtJc1owSkJRV2RDTEVWQlFVVXNUMEZCVHp0SlFVTjZRaXhuUWtGQlowSXNSVUZCUlN4UFFVRlBPMGxCUTNwQ0xHZENRVUZuUWl4RlFVRkZMRTlCUVU4N1NVRkRla0lzWjBKQlFXZENMRVZCUVVVc1QwRkJUenRKUVVONlFpeG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUE8wbEJRM3BDTEdkQ1FVRm5RaXhGUVVGRkxFOUJRVTg3U1VGRGVrSXNaMEpCUVdkQ0xFVkJRVVVzVDBGQlR6dEpRVU42UWl4blFrRkJaMElzUlVGQlJTeFBRVUZQTzBsQlEzcENMR2RDUVVGblFpeEZRVUZGTEU5QlFVODdTVUZEZWtJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNWMEZCVnl4RlFVRkZMRTlCUVU4N1NVRkRjRUlzWlVGQlpTeEZRVUZGTEU5QlFVODdTVUZEZUVJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4c1EwRkJSU3hyUkVGQmEwUTdPMGxCUXpORkxHZENRVUZuUWl4RlFVRkZMRTlCUVU4c1EwRkJSU3gxUTBGQmRVTTdPMGxCUTJ4RkxHZENRVUZuUWl4RlFVRkZMRTlCUVU4c1EwRkJSU3gxUTBGQmRVTTdPMGxCUTJ4RkxGbEJRVmtzUlVGQlJTeFBRVUZQTEVOQlFVVXNPRUpCUVRoQ096dEpRVU55UkN4alFVRmpMRVZCUVVVc1QwRkJUeXhEUVVGRkxDdENRVUVyUWpzN1NVRkRlRVFzWTBGQll5eEZRVUZGTEU5QlFVOHNRMEZCUlN4eFJFRkJjVVE3TzBsQlF6bEZMR05CUVdNc1JVRkJSU3hQUVVGUExFTkJRVVVzYjBSQlFXOUVPenRKUVVNM1JTeG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUE8wbEJRM3BDTEdkQ1FVRm5RaXhGUVVGRkxFOUJRVTg3U1VGRGVrSXNVMEZCVXl4RlFVRkZMRTlCUVU4N1NVRkRiRUlzWTBGQll5eEZRVUZGTEU5QlFVOHNRMEZCUlN4clJFRkJhMFE3TzBsQlF6TkZMR2RDUVVGblFpeEZRVUZGTEU5QlFVOHNRMEZCUlN4MVEwRkJkVU03TzBsQlEyeEZMR2RDUVVGblFpeEZRVUZGTEU5QlFVOHNRMEZCUlN4MVEwRkJkVU03TzBsQlEyeEZMRmxCUVZrc1JVRkJSU3hQUVVGUExFTkJRVVVzT0VKQlFUaENPenRKUVVOeVJDeGpRVUZqTEVWQlFVVXNUMEZCVHl4RFFVRkZMQ3RDUVVFclFqczdTVUZEZUVRc1kwRkJZeXhGUVVGRkxFOUJRVThzUTBGQlJTeHhSRUZCY1VRN08wbEJRemxGTEdOQlFXTXNSVUZCUlN4UFFVRlBMRU5CUVVVc2IwUkJRVzlFT3p0SlFVTTNSU3huUWtGQlowSXNSVUZCUlN4UFFVRlBPMGxCUTNwQ0xHZENRVUZuUWl4RlFVRkZMRTlCUVU4N1NVRkRla0lzVTBGQlV5eEZRVUZGTEU5QlFVODdTVUZEYkVJc1kwRkJZeXhGUVVGRkxFOUJRVThzUTBGQlJTeHJSRUZCYTBRN08wbEJRek5GTEdkQ1FVRm5RaXhGUVVGRkxFOUJRVThzUTBGQlJTeDFRMEZCZFVNN08wbEJRMnhGTEdkQ1FVRm5RaXhGUVVGRkxFOUJRVThzUTBGQlJTeDFRMEZCZFVNN08wbEJRMnhGTEZsQlFWa3NSVUZCUlN4UFFVRlBMRU5CUVVVc09FSkJRVGhDT3p0SlFVTnlSQ3hqUVVGakxFVkJRVVVzVDBGQlR5eERRVUZGTEN0Q1FVRXJRanM3U1VGRGVFUXNZMEZCWXl4RlFVRkZMRTlCUVU4c1EwRkJSU3h4UkVGQmNVUTdPMGxCUXpsRkxHTkJRV01zUlVGQlJTeFBRVUZQTEVOQlFVVXNiMFJCUVc5RU96dEpRVU0zUlN4blFrRkJaMElzUlVGQlJTeFBRVUZQTzBsQlEzcENMR2RDUVVGblFpeEZRVUZGTEU5QlFVODdTVUZEZWtJc1UwRkJVeXhGUVVGRkxFOUJRVTg3U1VGRGJFSXNZMEZCWXl4RlFVRkZMRTlCUVU4c1EwRkJSU3hyUkVGQmEwUTdPMGxCUXpORkxHZENRVUZuUWl4RlFVRkZMRTlCUVU4c1EwRkJSU3gxUTBGQmRVTTdPMGxCUTJ4RkxHZENRVUZuUWl4RlFVRkZMRTlCUVU4c1EwRkJSU3gxUTBGQmRVTTdPMGxCUTJ4RkxGbEJRVmtzUlVGQlJTeFBRVUZQTEVOQlFVVXNPRUpCUVRoQ096dEpRVU55UkN4alFVRmpMRVZCUVVVc1QwRkJUeXhEUVVGRkxDdENRVUVyUWpzN1NVRkRlRVFzWTBGQll5eEZRVUZGTEU5QlFVOHNRMEZCUlN4eFJFRkJjVVE3TzBsQlF6bEZMR05CUVdNc1JVRkJSU3hQUVVGUExFTkJRVVVzYjBSQlFXOUVPenRKUVVNM1JTeG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUE8wbEJRM3BDTEdkQ1FVRm5RaXhGUVVGRkxFOUJRVTg3U1VGRGVrSXNVMEZCVXl4RlFVRkZMRTlCUVU4N1NVRkRiRUlzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFdEJRVXM3U1VGRGNrSXNZVUZCWVN4RlFVRkZMRXRCUVVzN1NVRkRjRUlzVVVGQlVTeEZRVUZGTEU5QlFVOHNRMEZCUlN4WlFVRlpPenRKUVVNdlFpeFJRVUZSTEVWQlFVVXNUMEZCVHl4RFFVRkZMRmxCUVZrN08wbEJReTlDTEZGQlFWRXNSVUZCUlN4UFFVRlBMRU5CUVVVc1dVRkJXVHM3U1VGREwwSXNVVUZCVVN4RlFVRkZMRTlCUVU4c1EwRkJSU3gzUWtGQmQwSTdPMGxCUXpORExHRkJRV0VzUlVGQlJTeFBRVUZQTzBsQlEzUkNMR0ZCUVdFc1JVRkJSU3hKUVVGSk8wbEJRMjVDTEdWQlFXVXNSVUZCUlN4SFFVRkhPMGxCUTNCQ0xGbEJRVmtzUlVGQlJTeFBRVUZQTEVOQlFVVXNaMEpCUVdkQ096dEpRVU4yUXl4bFFVRmxMRVZCUVVVc1QwRkJUeXhEUVVGRkxEaENRVUU0UWpzN1NVRkxlRVFzVjBGQlZ5eEZRVUZGTEU5QlFVOHNRMEZCUlN4clEwRkJhME03TzBsQlEzaEVMRmRCUVZjc1JVRkJSU3hQUVVGUExFTkJRVVVzYlVOQlFXMURPenRKUVVONlJDeFhRVUZYTEVWQlFVVXNUMEZCVHl4RFFVRkZMR1ZCUVdVN08wbEJSWEpETEdGQlFXRXNSVUZCUlN4UFFVRlBMRU5CUVVVc2VVTkJRWGxET3p0SlFVMXFSU3hyUWtGQmEwSXNSVUZCUlN4SFFVRkhPMGxCUTNaQ0xHbENRVUZwUWl4RlFVRkZMRTlCUVU4N1NVRkRNVUlzWTBGQll5eEZRVUZGTEV0QlFVczdTVUZEY2tJc1lVRkJZU3hGUVVGRkxFOUJRVThzUTBGQlJTd3dRa0ZCTUVJN08wbEJRMnhFTEZOQlFWTXNSVUZCUlN4UFFVRlBMRU5CUVVVc1owSkJRV2RDT3p0SlFVTndReXhOUVVGTkxFVkJRVVVzVDBGQlR5eERRVUZGTEdGQlFXRTdPMGxCUXpsQ0xGRkJRVkVzUlVGQlJTeFBRVUZQTEVOQlFVVXNaVUZCWlRzN1NVRkRiRU1zWlVGQlpTeEZRVUZGTEU5QlFVOHNRMEZCUXl4dFFrRkJiVUk3TzBsQlF6VkRMRk5CUVZNc1JVRkJSU3hQUVVGUExFTkJRVVVzTUVKQlFUQkNPenRKUVVNNVF5eFJRVUZSTEVWQlFVVXNUMEZCVHl4RFFVRkZMRFJDUVVFMFFqczdTVUZETDBNc1VVRkJVU3hGUVVGRkxFOUJRVThzUTBGQlJTeHJRa0ZCYTBJN08wbEJRM0pETEZOQlFWTXNSVUZCUlN4UFFVRlBMRU5CUVVVc2FVTkJRV2xET3p0SlFVVnlSQ3hMUVVGTExFVkJRVVVzVDBGQlR5eERRVUZGTEhsRFFVRjVRenM3U1VGRGVrUXNUVUZCVFN4RlFVRkZMRTlCUVU4N1EwRkRiRUlzUTBGQlF6czdRVUZGUml4clFrRkJaU3h2UWtGQldTeERRVUZESW4wPVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2NvcmUvbWVtb3J5TGF5b3V0LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIlwidXNlIHN0cmljdFwiO1xuLyogZ2xvYmFsIFNoYXJlZEFycmF5QnVmZmVyICovXG52YXIgdHdvc0NvbXBsZW1lbnRfanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsL3R3b3NDb21wbGVtZW50LmpzXCIpO1xudmFyIFNjcmVlbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2NyZWVuKGlkLCBib3JkZXJJZCwgbWVtb3J5LCBfYSkge1xuICAgICAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8ge30gOiBfYSwgX2MgPSBfYi53b3JrZXIsIHdvcmtlciA9IF9jID09PSB2b2lkIDAgPyBmYWxzZSA6IF9jLCBfZCA9IF9iLnNoYXJlZCwgc2hhcmVkID0gX2QgPT09IHZvaWQgMCA/IGZhbHNlIDogX2QsIF9lID0gX2Iud2l0aFNoYXJlZEFycmF5QnVmZmVyLCB3aXRoU2hhcmVkQXJyYXlCdWZmZXIgPSBfZSA9PT0gdm9pZCAwID8gdW5kZWZpbmVkIDogX2U7XG4gICAgICAgIHZhciB3aWR0aCA9IDMyMCwgaGVpZ2h0ID0gMjAwLCBsYXlvdXQgPSBtZW1vcnkgJiYgbWVtb3J5LmxheW91dDtcbiAgICAgICAgdGhpcy5fc2hhcmVkID0gQm9vbGVhbihzaGFyZWQgfHwgd2l0aFNoYXJlZEFycmF5QnVmZmVyKTtcbiAgICAgICAgdGhpcy5fd29ya2VyID0gd29ya2VyO1xuICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuX3RpbGVXaWR0aCA9IDg7XG4gICAgICAgIHRoaXMuX3RpbGVIZWlnaHQgPSA4O1xuICAgICAgICB0aGlzLl90aWxlQ29sdW1ucyA9IHdpZHRoIC8gdGhpcy5fdGlsZVdpZHRoO1xuICAgICAgICB0aGlzLl90aWxlUm93cyA9IGhlaWdodCAvIHRoaXMuX3RpbGVIZWlnaHQ7XG4gICAgICAgIGlmICghd29ya2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9zY3JlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgICAgICB0aGlzLl9zY3JlZW4uc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgd2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5fc2NyZWVuLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBoZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5fc2NyZWVuQ3R4ID0gdGhpcy5fc2NyZWVuLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgd2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBoZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzQ3R4ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgIHRoaXMuX3NjcmVlbkJvcmRlckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYm9yZGVySWQpO1xuICAgICAgICAgICAgdGhpcy5fZnJhbWVEYXRhID0gdGhpcy5fY2FudmFzQ3R4LmNyZWF0ZUltYWdlRGF0YSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tZW1vcnkgPSBtZW1vcnk7XG4gICAgICAgIHRoaXMuX2xheW91dCA9IGxheW91dDtcbiAgICAgICAgLy8gd2UgYWxzbyBuZWVkIHRoZSAzMi1iaXQgYXJyYXkgdGhhdCB0aGUgY2FudmFzIHdpbGwgdXNlXG4gICAgICAgIGlmICh3aXRoU2hhcmVkQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lQnVmZmVyID0gd2l0aFNoYXJlZEFycmF5QnVmZmVyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF3b3JrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZUJ1ZiA9IG5ldyAoc2hhcmVkID8gU2hhcmVkQXJyYXlCdWZmZXIgOiBBcnJheUJ1ZmZlcikodGhpcy5fZnJhbWVEYXRhLmRhdGEubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZSA9IG5ldyBVaW50MzJBcnJheSh0aGlzLl9mcmFtZUJ1Zik7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnJhbWU4ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fZnJhbWVCdWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHNvbWUgdGhpbmdzIGRlcGVuZCB1cG9uIG91ciBicm93c2VyXG4gICAgICAgIHRoaXMucmVuZGVyVGlsZVBhZ2VUb0NhbnZhcyA9IHRoaXMucmVuZGVyVGlsZVBhZ2VUb0NhbnZhc1NhZmFyaTtcbiAgICAgICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImNocm9tZVwiKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUaWxlUGFnZVRvQ2FudmFzID0gdGhpcy5yZW5kZXJUaWxlUGFnZVRvQ2FudmFzQ2hyb21lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHNldCB1cCBvdXIgaW5pdGlhbCB2YWx1ZXNcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIFNjcmVlbi5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1lbW9yeSA9IHRoaXMuX21lbW9yeTtcbiAgICAgICAgdmFyIGxheW91dCA9IHRoaXMuX2xheW91dDtcbiAgICAgICAgaWYgKG1lbW9yeSkge1xuICAgICAgICAgICAgdGhpcy5fcGFsZXR0ZSA9IG1lbW9yeS5yYW5nZTMyKGxheW91dC5wYWxldHRlU3RhcnQsIGxheW91dC5wYWxldHRlTGVuZ3RoMzIpO1xuICAgICAgICAgICAgLy8gdGlsZXNldHNcbiAgICAgICAgICAgIHRoaXMuX3RpbGVzZXRzID0gbWVtb3J5LnJhbmdlKGxheW91dC50aWxlU2V0c1N0YXJ0LCBsYXlvdXQudGlsZVNldHNMZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5fdGlsZXMgPSBtZW1vcnkucmFuZ2UobGF5b3V0LnRpbGVQYWdlc1N0YXJ0LCBsYXlvdXQudGlsZVBhZ2VzTGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNjcmVlbi5wcm90b3R5cGUsIFwic2hhcmVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2hhcmVkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2NyZWVuLnByb3RvdHlwZSwgXCJzaGFyZWRBcnJheUJ1ZmZlclwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkID8gdGhpcy5fZnJhbWVCdWYgOiBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnNldFNoYXJlZEFycmF5QnVmZmVyID0gZnVuY3Rpb24gKHNoYXJlZEFycmF5QnVmZmVyKSB7XG4gICAgICAgIHRoaXMuX2ZyYW1lQnVmID0gc2hhcmVkQXJyYXlCdWZmZXI7XG4gICAgICAgIHRoaXMuX2ZyYW1lID0gbmV3IFVpbnQzMkFycmF5KHRoaXMuX2ZyYW1lQnVmKTtcbiAgICAgICAgdGhpcy5fZnJhbWU4ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fZnJhbWVCdWYpO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5zZXRQYWxldHRlRW50cnkgPSBmdW5jdGlvbiAoaWR4LCByLCBnLCBiKSB7XG4gICAgICAgIHZhciBhZGRyID0gdGhpcy5fbGF5b3V0LnBhbGV0dGVTdGFydCArIChpZHggPDwgMik7XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKGFkZHIgKyAzLCAweEZGKTtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UoYWRkciArIDIsIGIpO1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZShhZGRyICsgMSwgZyk7XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKGFkZHIgKyAwLCByKTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuZ2V0UGFsZXR0ZUVudHJ5ID0gZnVuY3Rpb24gKGlkeCkge1xuICAgICAgICB2YXIgYWRkciA9IHRoaXMuX2xheW91dC5wYWxldHRlU3RhcnQgKyAoaWR4IDw8IDIpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcjogdGhpcy5fbWVtb3J5LnBlZWsoYWRkciksXG4gICAgICAgICAgICBnOiB0aGlzLl9tZW1vcnkucGVlayhhZGRyICsgMSksXG4gICAgICAgICAgICBiOiB0aGlzLl9tZW1vcnkucGVlayhhZGRyICsgMilcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuaW5pdFBhbGV0dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByLCBnLCBiLCBtLCBtYSA9IFswLCAxMjgsIDE5MiwgMjU1XTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICAgICAgICAgICAgbSA9IG1hWygoKGkgJiAweEMwKSA+PiA2KSldO1xuICAgICAgICAgICAgciA9IG1hWygoaSAmIDB4MzApID4+IDQpXSB8fCBtO1xuICAgICAgICAgICAgZyA9IG1hWygoaSAmIDB4MEMpID4+IDIpXSB8fCBtO1xuICAgICAgICAgICAgYiA9IG1hWygoaSAmIDB4MDMpID4+IDApXSB8fCBtO1xuICAgICAgICAgICAgdGhpcy5zZXRQYWxldHRlRW50cnkoaSwgciwgZywgYik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuc2V0QmFja2dyb3VuZENvbG9yID0gZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UodGhpcy5fbGF5b3V0LmJhY2tncm91bmRDb2xvciwgYyk7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLmdldEJhY2tncm91bmRDb2xvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lbW9yeS5wZWVrKHRoaXMuX2xheW91dC5iYWNrZ3JvdW5kQ29sb3IpO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5zZXRCb3JkZXJTaXplID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UodGhpcy5fbGF5b3V0LmJvcmRlclNpemVYLCB4KTtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UodGhpcy5fbGF5b3V0LmJvcmRlclNpemVZLCB5KTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuZ2V0Qm9yZGVyU2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLl9tZW1vcnkucGVlayh0aGlzLl9sYXlvdXQuYm9yZGVyU2l6ZVgpICYgMHgzRixcbiAgICAgICAgICAgIHRoaXMuX21lbW9yeS5wZWVrKHRoaXMuX2xheW91dC5ib3JkZXJTaXplWSkgJiAweDNGXTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuc2V0Qm9yZGVyQ29sb3IgPSBmdW5jdGlvbiAoYykge1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZSh0aGlzLl9sYXlvdXQuYm9yZGVyQ29sb3IsIGMpO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5nZXRCb3JkZXJDb2xvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lbW9yeS5wZWVrKHRoaXMuX2xheW91dC5ib3JkZXJDb2xvcik7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnNldEdyYXBoaWNzTGF5ZXIgPSBmdW5jdGlvbiAobCkge1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZSh0aGlzLl9sYXlvdXQuZ3JhcGhpY3NMYXllciwgbCk7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLmdldEdyYXBoaWNzTGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZW1vcnkucGVlayh0aGlzLl9sYXlvdXQuZ3JhcGhpY3NMYXllcikgJiAweDg3O1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5zZXRUaWxlUGFnZUxheWVyID0gZnVuY3Rpb24gKHBhZ2UsIGwpIHtcbiAgICAgICAgdmFyIGxheWVycyA9IFt0aGlzLl9sYXlvdXQudGlsZVBhZ2UwTGF5ZXIsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UxTGF5ZXIsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UyTGF5ZXIsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UzTGF5ZXJdO1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZShsYXllcnNbcGFnZV0sIGwpO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5nZXRUaWxlUGFnZUxheWVyID0gZnVuY3Rpb24gKHBhZ2UpIHtcbiAgICAgICAgdmFyIGxheWVycyA9IFt0aGlzLl9sYXlvdXQudGlsZVBhZ2UwTGF5ZXIsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UxTGF5ZXIsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UyTGF5ZXIsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UzTGF5ZXJdO1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVtb3J5LnBlZWsobGF5ZXJzW3BhZ2VdKSAmIDB4ODc7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnNldFRpbGVQYWdlT2Zmc2V0cyA9IGZ1bmN0aW9uIChwYWdlLCB4LCB5KSB7XG4gICAgICAgIHZhciBvZmZzZXRYID0gW3RoaXMuX2xheW91dC50aWxlUGFnZTBPZmZzZXRYLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMU9mZnNldFgsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UyT2Zmc2V0WCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTNPZmZzZXRYXTtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2Uob2Zmc2V0WFtwYWdlXSwgeCA8IDAgPyB4ICsgMjU2IDogeCk7XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKG9mZnNldFhbcGFnZV0gKyAxLCB5IDwgMCA/IHkgKyAyNTYgOiB5KTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuZ2V0VGlsZVBhZ2VPZmZzZXRzID0gZnVuY3Rpb24gKHBhZ2UpIHtcbiAgICAgICAgdmFyIG9mZnNldFggPSBbdGhpcy5fbGF5b3V0LnRpbGVQYWdlME9mZnNldFgsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UxT2Zmc2V0WCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTJPZmZzZXRYLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlM09mZnNldFhdO1xuICAgICAgICByZXR1cm4gW3RoaXMuX21lbW9yeS5wZWVrKG9mZnNldFhbcGFnZV0pLFxuICAgICAgICAgICAgdGhpcy5fbWVtb3J5LnBlZWsob2Zmc2V0WFtwYWdlXSArIDEpXTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuc2V0VGlsZVBhZ2VDcm9wcyA9IGZ1bmN0aW9uIChwYWdlLCB4LCB5KSB7XG4gICAgICAgIHZhciBjcm9wWCA9IFt0aGlzLl9sYXlvdXQudGlsZVBhZ2UwQ3JvcFgsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UxQ3JvcFgsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UyQ3JvcFgsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UzQ3JvcFhdO1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZShjcm9wWFtwYWdlXSwgeCk7XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKGNyb3BYW3BhZ2VdICsgMSwgeSk7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLmdldFRpbGVQYWdlQ3JvcHMgPSBmdW5jdGlvbiAocGFnZSkge1xuICAgICAgICB2YXIgY3JvcFggPSBbdGhpcy5fbGF5b3V0LnRpbGVQYWdlMENyb3BYLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMUNyb3BYLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMkNyb3BYLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlM0Nyb3BYXTtcbiAgICAgICAgcmV0dXJuIFt0aGlzLl9tZW1vcnkucGVlayhjcm9wWFtwYWdlXSkgJiAweDNGLFxuICAgICAgICAgICAgdGhpcy5fbWVtb3J5LnBlZWsoY3JvcFhbcGFnZV0gKyAxKSAmIDB4M0ZdO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5zZXRUaWxlUGFnZVNldCA9IGZ1bmN0aW9uIChwYWdlLCBzZXQpIHtcbiAgICAgICAgdmFyIGxheWVycyA9IFt0aGlzLl9sYXlvdXQudGlsZVBhZ2UwU2V0LFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMVNldCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTJTZXQsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UzU2V0XTtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UobGF5ZXJzW3BhZ2VdLCBzZXQpO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5nZXRUaWxlUGFnZVNldCA9IGZ1bmN0aW9uIChwYWdlKSB7XG4gICAgICAgIHZhciBsYXllcnMgPSBbdGhpcy5fbGF5b3V0LnRpbGVQYWdlMFNldCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTFTZXQsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UyU2V0LFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlM1NldF07XG4gICAgICAgIHJldHVybiB0aGlzLl9tZW1vcnkucGVlayhsYXllcnNbcGFnZV0pICYgMHgwMztcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuc2V0VGlsZVBhZ2VTY2FsZSA9IGZ1bmN0aW9uIChwYWdlLCBzY2FsZSkge1xuICAgICAgICB2YXIgbGF5ZXJzID0gW3RoaXMuX2xheW91dC50aWxlUGFnZTBTY2FsZSxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTFTY2FsZSxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTJTY2FsZSxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTNTY2FsZV07XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKGxheWVyc1twYWdlXSwgc2NhbGUpO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5nZXRUaWxlUGFnZVNjYWxlID0gZnVuY3Rpb24gKHBhZ2UpIHtcbiAgICAgICAgdmFyIGxheWVycyA9IFt0aGlzLl9sYXlvdXQudGlsZVBhZ2UwU2NhbGUsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UxU2NhbGUsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UyU2NhbGUsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UzU2NhbGVdO1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVtb3J5LnBlZWsobGF5ZXJzW3BhZ2VdKSAmIDB4MEY7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLmluaXRTY3JlZW5Db25maWd1cmF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNldEJhY2tncm91bmRDb2xvcigweDAxKTsgLy8gZGFyayBibHVlXG4gICAgICAgIHRoaXMuc2V0Qm9yZGVyU2l6ZSgweDAxLCAweDAxKTsgLy8gOHB4IG9uIGFsbCBzaWRlc1xuICAgICAgICB0aGlzLnNldEJvcmRlckNvbG9yKDB4MEEpO1xuICAgICAgICB0aGlzLnNldEdyYXBoaWNzTGF5ZXIoMHhGRik7IC8vIGdyYXBoaWNzIGhpZGRlbiBieSBkZWZhdWx0O1xuICAgICAgICBmb3IgKHZhciBwYWdlID0gMDsgcGFnZSA8IDQ7IHBhZ2UrKykge1xuICAgICAgICAgICAgdmFyIHRpbGVQYWdlQmFzZSA9IHRoaXMuX2xheW91dC50aWxlUGFnZTAgKyAodGhpcy5fbGF5b3V0LnRpbGVQYWdlTGVuZ3RoICogcGFnZSk7XG4gICAgICAgICAgICB2YXIgdGlsZUJHQ29sb3IgPSB0aWxlUGFnZUJhc2UgKyAweDA0MDA7XG4gICAgICAgICAgICB2YXIgdGlsZUZHQ29sb3IgPSB0aWxlQkdDb2xvciArIDB4MDQwMDtcbiAgICAgICAgICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IDB4MDQwMDsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZW1vcnkucG9rZSh0aWxlUGFnZUJhc2UgKyBpZHgsIDApO1xuICAgICAgICAgICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKHRpbGVCR0NvbG9yICsgaWR4LCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZW1vcnkucG9rZSh0aWxlRkdDb2xvciArIGlkeCwgMHhGRik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldFRpbGVQYWdlTGF5ZXIocGFnZSwgKHBhZ2UgPT09IDApID8gMHgwMSA6IDB4RkYpOyAvLyBvbmx5IHRpbGUgcGFnZSAwIGlzIHZpc2libGUgYnkgZGVmYXVsdFxuICAgICAgICAgICAgdGhpcy5zZXRUaWxlUGFnZUNyb3BzKHBhZ2UsIDAsIDApOyAvLyBubyBjcm9wc1xuICAgICAgICAgICAgdGhpcy5zZXRUaWxlUGFnZU9mZnNldHMocGFnZSwgMCwgMCk7IC8vIG5vIG9mZnNldHNcbiAgICAgICAgICAgIHRoaXMuc2V0VGlsZVBhZ2VTY2FsZShwYWdlLCAwKTsgLy8gbm8gc2NhbGluZ1xuICAgICAgICAgICAgdGhpcy5zZXRUaWxlUGFnZVNldChwYWdlLCAwKTsgLy8gZmlyc3QgdGlsZSBzZXRcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5zZXRQaXhlbCA9IGZ1bmN0aW9uICh4LCB5LCBjKSB7XG4gICAgICAgIC8vIGxldCBhZGRyID0gKCgoeSAqIHRoaXMuX3dpZHRoKSArIHgpICYgMHhGRkZGKTtcbiAgICAgICAgLy8gbGV0IGFkZHIgPSAoKHkgKiB0aGlzLl93aWR0aCkgKyB4KTtcbiAgICAgICAgLy8gbGV0IGFkZHIgPSAoKCh5IDw8IDgpICsgKHkgPDwgNikgKyB4KSAmIDB4RkZGRik7XG4gICAgICAgIHZhciBhZGRyID0gKCh5IDw8IDgpICsgKHkgPDwgNikgKyB4KTtcbiAgICAgICAgdGhpcy5fZnJhbWVbYWRkcl0gPSBjOyAvL3RoaXMuX3BhbGV0dGVbY10gfCAweEZGMDAwMDAwO1xuICAgIH07XG4gICAgLypcbiAgICBzZXRQaXhlbCAoeCwgeSwgYykge1xuICAgICAgbGV0IGFkZHIgPSAoKHkgPDwgOCkgKyAoeSA8PCA2KSArIHgpIDw8IDI7XG4gICAgICBsZXQgY29sb3IgPSB0aGlzLl9wYWxldHRlW2NdO1xuICAgICAgdGhpcy5fZnJhbWVCdWZbYWRkcisrXSA9IGNvbG9yICYgMHhGRjsgY29sb3IgPj49IDg7XG4gICAgICB0aGlzLl9mcmFtZUJ1ZlthZGRyKytdID0gY29sb3IgJiAweEZGOyBjb2xvciA+Pj0gODtcbiAgICAgIHRoaXMuX2ZyYW1lQnVmW2FkZHIrK10gPSBjb2xvciAmIDB4RkY7XG4gICAgICB0aGlzLl9mcmFtZUJ1ZlthZGRyXSAgID0gMHhGRjtcbiAgICB9XG4gICAgKi9cbiAgICBTY3JlZW4ucHJvdG90eXBlLnNldFRpbGUgPSBmdW5jdGlvbiAocGFnZSwgcm93LCBjb2wsIHRpbGUsIGJnQ29sb3IsIGZnQ29sb3IpIHtcbiAgICAgICAgaWYgKGJnQ29sb3IgPT09IHZvaWQgMCkgeyBiZ0NvbG9yID0gMHgwMDsgfVxuICAgICAgICBpZiAoZmdDb2xvciA9PT0gdm9pZCAwKSB7IGZnQ29sb3IgPSAweEZGOyB9XG4gICAgICAgIHZhciBiYXNlQWRkciA9IHRoaXMuX2xheW91dC50aWxlUGFnZTAgKyAodGhpcy5fbGF5b3V0LnRpbGVQYWdlTGVuZ3RoICogcGFnZSk7XG4gICAgICAgIHZhciB0aWxlQWRkciA9IGJhc2VBZGRyICsgKHJvdyAqIHRoaXMuX3RpbGVDb2x1bW5zKSArIGNvbDtcbiAgICAgICAgdmFyIGJnQWRkciA9IHRpbGVBZGRyICsgMHgwNDAwO1xuICAgICAgICB2YXIgZmdBZGRyID0gdGlsZUFkZHIgKyAweDA4MDA7XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKHRpbGVBZGRyLCB0aWxlKTtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UoYmdBZGRyLCBiZ0NvbG9yKTtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UoZmdBZGRyLCBmZ0NvbG9yKTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUucmVuZGVyQmFja2dyb3VuZENvbG9yVG9DYW52YXMgPSBmdW5jdGlvbiAocGFsZXR0ZSkge1xuICAgICAgICB2YXIgYyA9IHRoaXMuZ2V0QmFja2dyb3VuZENvbG9yKCk7XG4gICAgICAgIHRoaXMuX2ZyYW1lLmZpbGwocGFsZXR0ZVtjXSk7XG4gICAgICAgIC8qZXNsaW50LWRpc2FibGUgbm8tdmFyLCB2YXJzLW9uLXRvcCovXG4gICAgICAgIC8vICAgICAgICBmb3IgKHZhciB5ID0gdGhpcy5faGVpZ2h0IC0gMTsgeSAhPT0gMDsgeS0tKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgZm9yICh2YXIgeCA9IHRoaXMuX3dpZHRoIC0gMTsgeCAhPT0gMDsgeC0tKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoaXMuc2V0UGl4ZWwoeCwgeSwgYyk7XG4gICAgICAgIC8vICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgfVxuICAgICAgICAvKmVzbGludC1lbmFibGUgbm8tdmFyLCB2YXJzLW9uLXRvcCovXG4gICAgfTtcbiAgICAvKmVzbGludC1kaXNhYmxlIG1heC1kZXB0aCovXG4gICAgU2NyZWVuLnByb3RvdHlwZS5yZW5kZXJUaWxlUGFnZVRvQ2FudmFzQ2hyb21lID0gZnVuY3Rpb24gKHBhZ2UsIHBhbGV0dGUpIHtcbiAgICAgICAgLyplc2xpbnQtZGlzYWJsZSBuby12YXIsIHZhcnMtb24tdG9wKi9cbiAgICAgICAgdmFyIF9hID0gdGhpcy5nZXRUaWxlUGFnZUNyb3BzKHBhZ2UpLCBjcm9wWCA9IF9hWzBdLCBjcm9wWSA9IF9hWzFdLCBjcm9wTGVmdCA9IGNyb3BYLCBjcm9wTGVmdE1hc2tlZCA9IGNyb3BMZWZ0ICYgMHhGRjgsIGNyb3BSaWdodCA9IHRoaXMuX3dpZHRoIC0gY3JvcFgsIGNyb3BSaWdodE1hc2tlZCA9IChjcm9wUmlnaHQgJiAweEZGOCkgKyAxLCBjcm9wVG9wID0gY3JvcFksIGNyb3BUb3BNYXNrZWQgPSBjcm9wVG9wICYgMHhGRjgsIGNyb3BCb3R0b20gPSB0aGlzLl9oZWlnaHQgLSBjcm9wWSwgY3JvcEJvdHRvbU1hc2tlZCA9IChjcm9wQm90dG9tICYgMHhGRjgpICsgMSwgX2IgPSB0aGlzLmdldFRpbGVQYWdlT2Zmc2V0cyhwYWdlKSwgb2Zmc2V0WCA9IF9iWzBdLCBvZmZzZXRZID0gX2JbMV0sIHNjYWxlID0gdGhpcy5nZXRUaWxlUGFnZVNjYWxlKHBhZ2UpICYgMHgwNywgdGlsZVNldCA9IHRoaXMuZ2V0VGlsZVBhZ2VTZXQocGFnZSksIHRpbGVTZXRCYXNlID0gdGlsZVNldCAqIDE2Mzg0LCB0aWxlUGFnZUJhc2UgPSBwYWdlICogMHgxMDAwLCB0aWxlRm9yZWdyb3VuZENvbG9yLCB0aWxlQmFja2dyb3VuZENvbG9yLCBhZGRyLCB0aWxlLCB0aWxlU2V0QWRkciwgdHBpeCwgbmV3eCwgbmV3eSwgYmFzZVgsIGJhc2VZLCBzaGlmdCA9IDMgKyBzY2FsZTtcbiAgICAgICAgb2Zmc2V0WCA9IHR3b3NDb21wbGVtZW50X2pzXzEuZGVmYXVsdC5mcm9tOChvZmZzZXRYKTtcbiAgICAgICAgb2Zmc2V0WSA9IHR3b3NDb21wbGVtZW50X2pzXzEuZGVmYXVsdC5mcm9tOChvZmZzZXRZKTtcbiAgICAgICAgLy8gaXRlcmF0ZSByb3cgLS0tPiBjb2wgb3ZlciB0aGUgdGlsZSBwYWdlXG4gICAgICAgIGZvciAodmFyIHJvdyA9IHRoaXMuX3RpbGVSb3dzIC0gMTsgcm93ID4gLTE7IHJvdy0tKSB7XG4gICAgICAgICAgICAvLyBiYXNlWSBzaG91bGQgYmUgdGhlIHRvcG1vc3QgWSBwb3NpdGlvbiBvZiB0aGUgdGlsZVxuICAgICAgICAgICAgYmFzZVkgPSAocm93IDw8IHNoaWZ0KSArIG9mZnNldFk7XG4gICAgICAgICAgICAvLyBvbmx5IHBhaW50IHRpbGVzIHRoYXQgaGF2ZSB2aXNpYmxlIHBvcnRpb25zIG9uIHNjcmVlblxuICAgICAgICAgICAgaWYgKGJhc2VZID49IGNyb3BUb3BNYXNrZWQgJiYgYmFzZVkgPD0gY3JvcEJvdHRvbU1hc2tlZCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGNvbCA9IHRoaXMuX3RpbGVDb2x1bW5zIC0gMTsgY29sID4gLTE7IGNvbC0tKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGJhc2VYIHNob3VsZCBpbmRpY2F0ZSB0aGUgbGVmdG1vc3QgWCBwb3NpdGlvbiBvZiB0aGUgdGlsZVxuICAgICAgICAgICAgICAgICAgICBiYXNlWCA9IChjb2wgPDwgc2hpZnQpICsgb2Zmc2V0WDtcbiAgICAgICAgICAgICAgICAgICAgLy8gb25seSBkcmF3IGlmIHRoZSB0aWxlIGlzIHZpc2libGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VYID49IGNyb3BMZWZ0TWFza2VkICYmIGJhc2VYIDw9IGNyb3BSaWdodE1hc2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkciBzaG91bGQgaW5kaWNhdGUgdGhlIHRpbGUgcGFnZSBhZGRyZXNzIG9mIHRoZSB0aWxlXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRyID0gKHJvdyA8PCA1KSArIChyb3cgPDwgMykgKyBjb2wgKyB0aWxlUGFnZUJhc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHRpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGUgPSB0aGlzLl90aWxlc1thZGRyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVTZXRBZGRyID0gdGlsZVNldEJhc2UgKyAodGlsZSA8PCA2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBjb3JyZXNwb25kaW5nIGNvbG9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZUJhY2tncm91bmRDb2xvciA9IHRoaXMuX3RpbGVzW2FkZHIgKyAweDA0MDBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZUZvcmVncm91bmRDb2xvciA9IHRoaXMuX3RpbGVzW2FkZHIgKyAweDA4MDBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCwgZHJhdyBlYWNoIHBpeGVsIG9mIHRoZSB0aWxlXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB5ID0gKDggPDwgc2NhbGUpIC0gMTsgeSA+IC0xOyB5LS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXd5ID0geSArIGJhc2VZO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAoOCA8PCBzY2FsZSkgLSAxOyB4ID4gLTE7IHgtLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cGl4ID0gdGhpcy5fdGlsZXNldHNbdGlsZVNldEFkZHIgKyAoKCh5ID4+IHNjYWxlKSA8PCAzKSArICh4ID4+IHNjYWxlKSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHBpeCA9PT0gMHgwMCB8fCB0cGl4ID09PSAweEZGKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cGl4ID0gKHRwaXggPT09IDB4RkYgPyB0aWxlRm9yZWdyb3VuZENvbG9yIDogdGlsZUJhY2tncm91bmRDb2xvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRwaXggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXd4ID0geCArIGJhc2VYO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgobmV3eCA+PSBjcm9wTGVmdCkgJiYgKG5ld3ggPCBjcm9wUmlnaHQpKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgobmV3eSA+PSBjcm9wVG9wKSAmJiAobmV3eSA8IGNyb3BCb3R0b20pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGl4ZWwobmV3eCwgbmV3eSwgcGFsZXR0ZVt0cGl4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qZXNsaW50LWVuYWJsZSBtYXgtZGVwdGgqL1xuICAgIFNjcmVlbi5wcm90b3R5cGUucmVuZGVyVGlsZVBhZ2VUb0NhbnZhc1NhZmFyaSA9IGZ1bmN0aW9uIChwYWdlLCBwYWxldHRlKSB7XG4gICAgICAgIC8qZXNsaW50LWRpc2FibGUgbm8tdmFyLCB2YXJzLW9uLXRvcCovXG4gICAgICAgIHZhciBfYSA9IHRoaXMuZ2V0VGlsZVBhZ2VDcm9wcyhwYWdlKSwgY3JvcFggPSBfYVswXSwgY3JvcFkgPSBfYVsxXSwgY3JvcExlZnQgPSBjcm9wWCwgY3JvcFJpZ2h0ID0gdGhpcy5fd2lkdGggLSBjcm9wWCwgY3JvcFRvcCA9IGNyb3BZLCBjcm9wQm90dG9tID0gdGhpcy5faGVpZ2h0IC0gY3JvcFksIF9iID0gdGhpcy5nZXRUaWxlUGFnZU9mZnNldHMocGFnZSksIG9mZnNldFggPSBfYlswXSwgb2Zmc2V0WSA9IF9iWzFdLCBzY2FsZSA9IHRoaXMuZ2V0VGlsZVBhZ2VTY2FsZShwYWdlKSAmIDB4MDcsIHRpbGVTZXQgPSB0aGlzLmdldFRpbGVQYWdlU2V0KHBhZ2UpLCB0aWxlU2V0QmFzZSA9IHRpbGVTZXQgKiAxNjM4NCwgdGlsZVBhZ2VCYXNlID0gcGFnZSAqIDB4MTAwMCwgdGlsZUZvcmVncm91bmRDb2xvciwgdGlsZUJhY2tncm91bmRDb2xvciwgYWRkciwgdGlsZSwgdGlsZVNldEFkZHIsIHRwaXgsIG5ld3gsIG5ld3ksIHNoaWZ0ID0gMyArIHNjYWxlLCBzaGlmdGVkWSwgc2NhbGVkWTtcbiAgICAgICAgb2Zmc2V0WCA9IHR3b3NDb21wbGVtZW50X2pzXzEuZGVmYXVsdC5mcm9tOChvZmZzZXRYKTtcbiAgICAgICAgb2Zmc2V0WSA9IHR3b3NDb21wbGVtZW50X2pzXzEuZGVmYXVsdC5mcm9tOChvZmZzZXRZKTtcbiAgICAgICAgZm9yICh2YXIgeSA9IHRoaXMuX2hlaWdodCAtIDE7IHkgPiAtMTsgeS0tKSB7XG4gICAgICAgICAgICBzaGlmdGVkWSA9IHkgPj4gc2hpZnQ7XG4gICAgICAgICAgICBzY2FsZWRZID0geSA+PiBzY2FsZTtcbiAgICAgICAgICAgIG5ld3kgPSB5ICsgb2Zmc2V0WTtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSB0aGlzLl93aWR0aCAtIDE7IHggPiAtMTsgeC0tKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSB0aWxlIGluZGV4XG4gICAgICAgICAgICAgICAgLy9hZGRyID0gKCh5ID4+IHNoaWZ0KSAqIHRoaXMuX3RpbGVDb2x1bW5zKSArICh4ID4+IHNoaWZ0KTtcbiAgICAgICAgICAgICAgICBhZGRyID0gKHNoaWZ0ZWRZIDw8IDUpICsgKHNoaWZ0ZWRZIDw8IDMpICsgKHggPj4gc2hpZnQpICsgdGlsZVBhZ2VCYXNlO1xuICAgICAgICAgICAgICAgIHRpbGUgPSB0aGlzLl90aWxlc1thZGRyXTtcbiAgICAgICAgICAgICAgICAvLyBnZXQgY29ycmVzcG9uZGluZyBjb2xvcnNcbiAgICAgICAgICAgICAgICB0aWxlQmFja2dyb3VuZENvbG9yID0gdGhpcy5fdGlsZXNbYWRkciArIDB4MDQwMF07XG4gICAgICAgICAgICAgICAgdGlsZUZvcmVncm91bmRDb2xvciA9IHRoaXMuX3RpbGVzW2FkZHIgKyAweDA4MDBdO1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgdGlsZSBwaXhlbFxuICAgICAgICAgICAgICAgIHRpbGVTZXRBZGRyID0gKChzY2FsZWRZICYgMHgwNykgPDwgMykgKyAoKHggPj4gc2NhbGUpICYgMHgwNykgKyAodGlsZSA8PCA2KSArIHRpbGVTZXRCYXNlO1xuICAgICAgICAgICAgICAgIHRwaXggPSB0aGlzLl90aWxlc2V0c1t0aWxlU2V0QWRkcl07XG4gICAgICAgICAgICAgICAgaWYgKHRwaXggPT09IDB4MDAgfHwgdHBpeCA9PT0gMHhGRikge1xuICAgICAgICAgICAgICAgICAgICB0cGl4ID0gKHRwaXggPT09IDB4RkYgPyB0aWxlRm9yZWdyb3VuZENvbG9yIDogdGlsZUJhY2tncm91bmRDb2xvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld3ggPSB4ICsgb2Zmc2V0WDtcbiAgICAgICAgICAgICAgICBpZiAodHBpeCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCgobmV3eCA+PSBjcm9wTGVmdCkgJiYgKG5ld3ggPCBjcm9wUmlnaHQpKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKChuZXd5ID49IGNyb3BUb3ApICYmIChuZXd5IDwgY3JvcEJvdHRvbSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBpeGVsKG5ld3gsIG5ld3ksIHBhbGV0dGVbdHBpeF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qZXNsaW50LWVuYWJsZSBuby12YXIsIHZhcnMtb24tdG9wKi9cbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUucmVuZGVyR3JhcGhpY3NUb0NhbnZhcyA9IGZ1bmN0aW9uIChwYWxldHRlKSB7XG4gICAgICAgIHZhciBncGl4LCBhZGRyID0gdGhpcy5fbGF5b3V0LmdyYXBoaWNzU3RhcnQ7XG4gICAgICAgIC8qZXNsaW50LWRpc2FibGUgbm8tdmFyLCB2YXJzLW9uLXRvcCovXG4gICAgICAgIGZvciAodmFyIHkgPSB0aGlzLl9oZWlnaHQgLSAxOyB5ID4gLTE7IHktLSkge1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IHRoaXMuX3dpZHRoIC0gMTsgeCA+IC0xOyB4LS0pIHtcbiAgICAgICAgICAgICAgICBhZGRyKys7XG4gICAgICAgICAgICAgICAgZ3BpeCA9IHRoaXMuX21lbW9yeS5wZWVrKGFkZHIpO1xuICAgICAgICAgICAgICAgIGlmIChncGl4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBpeGVsKHgsIHksIHBhbGV0dGVbZ3BpeF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKmVzbGludC1lbmFibGUgbm8tdmFyLCB2YXJzLW9uLXRvcCovXG4gICAgfTtcbiAgICAvKlxuICAgIFRPRE86XG4gICAgcmVuZGVyU3ByaXRlVG9DYW52YXMoc3ByaXRlKSB7XG5cbiAgICB9XG4gICAgKi9cbiAgICBTY3JlZW4ucHJvdG90eXBlLnJlbmRlckJvcmRlclRvU2NyZWVuQm9yZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9yZGVyQ29sb3IgPSB0aGlzLmdldEJvcmRlckNvbG9yKCk7XG4gICAgICAgIHZhciBjb2xvciA9ICh0aGlzLl9wYWxldHRlW2JvcmRlckNvbG9yXSB8IDB4RkYwMDAwMDApO1xuICAgICAgICB2YXIgYiA9IChjb2xvciAmIDB4MDBGRjAwMDApID4+IDE2O1xuICAgICAgICB2YXIgZyA9IChjb2xvciAmIDB4MDAwMEZGMDApID4+IDg7XG4gICAgICAgIHZhciByID0gKGNvbG9yICYgMHgwMDAwMDBGRik7XG4gICAgICAgIHZhciBjc3MgPSBcInJnYihcIiArIHIgKyBcIiwgXCIgKyBnICsgXCIsIFwiICsgYiArIFwiKVwiO1xuICAgICAgICB0aGlzLl9zY3JlZW5Cb3JkZXJFbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjc3M7XG4gICAgICAgIHRoaXMuX3NjcmVlbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjc3M7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnJlbmRlckJvcmRlclRvQ2FudmFzID0gZnVuY3Rpb24gKHBhbGV0dGUpIHtcbiAgICAgICAgdmFyIGJvcmRlckNvbG9yID0gdGhpcy5nZXRCb3JkZXJDb2xvcigpLCBfYSA9IHRoaXMuZ2V0Qm9yZGVyU2l6ZSgpLCBib3JkZXJTaXplWCA9IF9hWzBdLCBib3JkZXJTaXplWSA9IF9hWzFdLCBsZWZ0Qm9yZGVyID0gYm9yZGVyU2l6ZVgsIHJpZ2h0Qm9yZGVyID0gdGhpcy5fd2lkdGggLSBib3JkZXJTaXplWCwgdG9wQm9yZGVyID0gYm9yZGVyU2l6ZVksIGJvdHRvbUJvcmRlciA9IHRoaXMuX2hlaWdodCAtIGJvcmRlclNpemVZO1xuICAgICAgICAvKmVzbGludC1kaXNhYmxlIG5vLXZhciwgdmFycy1vbi10b3AqL1xuICAgICAgICBmb3IgKHZhciB5ID0gdGhpcy5faGVpZ2h0IC0gMTsgeSA+IC0xOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSB0aGlzLl93aWR0aCAtIDE7IHggPiAtMTsgeC0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKCgoeCA8IGxlZnRCb3JkZXIpIHx8ICh4ID49IHJpZ2h0Qm9yZGVyKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgKCh5IDwgdG9wQm9yZGVyKSB8fCAoeSA+PSBib3R0b21Cb3JkZXIpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBpeGVsKHgsIHksIHBhbGV0dGVbYm9yZGVyQ29sb3JdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyplc2xpbnQtZW5hYmxlIG5vLXZhciwgdmFycy1vbi10b3AqL1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsYXllciwgcGFsZXR0ZSA9IFtdO1xuICAgICAgICB2YXIgbGF5ZXJzID0gW1xuICAgICAgICAgICAgW10sXG4gICAgICAgICAgICBbXSxcbiAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgW10sXG4gICAgICAgICAgICBbXSxcbiAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgW10sXG4gICAgICAgICAgICBbXVxuICAgICAgICBdO1xuICAgICAgICAvLyBiYWNrZ3JvdW5kIGNvbG9yIGdvZXMgZmlyc3RcbiAgICAgICAgbGF5ZXJzWzBdLnB1c2godGhpcy5yZW5kZXJCYWNrZ3JvdW5kQ29sb3JUb0NhbnZhcy5iaW5kKHRoaXMpKTtcbiAgICAgICAgLy8gbmV4dCBmaWd1cmUgb3V0IHdoZXJlIHRoZSB0aWxlIHBhZ2VzIGdvXG4gICAgICAgIGZvciAodmFyIHBhZ2UgPSAwOyBwYWdlIDwgNDsgcGFnZSsrKSB7XG4gICAgICAgICAgICBsYXllciA9IHRoaXMuZ2V0VGlsZVBhZ2VMYXllcihwYWdlKTtcbiAgICAgICAgICAgIGlmIChsYXllciA8IDgpIHtcbiAgICAgICAgICAgICAgICBsYXllcnNbbGF5ZXJdLnB1c2godGhpcy5yZW5kZXJUaWxlUGFnZVRvQ2FudmFzLmJpbmQodGhpcywgcGFnZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoZW4gdGhlIGdyYXBoaWNzIHBhZ2VcbiAgICAgICAgbGF5ZXIgPSB0aGlzLmdldEdyYXBoaWNzTGF5ZXIoKTtcbiAgICAgICAgaWYgKGxheWVyIDwgOCkge1xuICAgICAgICAgICAgbGF5ZXJzW2xheWVyXS5wdXNoKHRoaXMucmVuZGVyR3JhcGhpY3NUb0NhbnZhcy5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGVuIHRoZSBzcHJpdGVzXG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgLy8gdGhlbiB0aGUgYm9yZGVyXG4gICAgICAgIGxheWVyc1s3XS5wdXNoKHRoaXMucmVuZGVyQm9yZGVyVG9DYW52YXMuYmluZCh0aGlzKSk7XG4gICAgICAgIC8vIGdlbmVyYXRlIHRoZSBjdXJyZW50IHBhbGV0dGVcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICAgICAgICAgICAgcGFsZXR0ZS5wdXNoKHRoaXMuX3BhbGV0dGVbaV0gfCAweEZGMDAwMDAwKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgICAgIC8vIGFuZCBub3cgY29tcG9zaXRlIVxuICAgICAgICBmb3IgKHZhciBsYXllcklkeCA9IDA7IGxheWVySWR4IDwgODsgbGF5ZXJJZHgrKykge1xuICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSBsYXllcnNbbGF5ZXJJZHhdO1xuICAgICAgICAgICAgZm9yICh2YXIgYWN0aW9uSWR4ID0gMDsgYWN0aW9uSWR4IDwgYWN0aW9ucy5sZW5ndGg7IGFjdGlvbklkeCsrKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uc1thY3Rpb25JZHhdKHBhbGV0dGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2ZyYW1lRGF0YS5kYXRhLnNldCh0aGlzLl9mcmFtZTgpO1xuICAgICAgICB0aGlzLl9jYW52YXNDdHgucHV0SW1hZ2VEYXRhKHRoaXMuX2ZyYW1lRGF0YSwgMCwgMCk7XG4gICAgICAgIHRoaXMuX3NjcmVlbkN0eC5kcmF3SW1hZ2UodGhpcy5fY2FudmFzLCAwLCAwKTtcbiAgICAgICAgdGhpcy5yZW5kZXJCb3JkZXJUb1NjcmVlbkJvcmRlcigpO1xuICAgIH07XG4gICAgcmV0dXJuIFNjcmVlbjtcbn0oKSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBTY3JlZW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lVMk55WldWdUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpVTJOeVpXVnVMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFTdzRRa0ZCT0VJN1FVRkRPVUlzSzBSQlFYVkVPMEZCUlhaRU8wbEJRMGtzWjBKQlFWa3NSVUZCUlN4RlFVRkZMRkZCUVZFc1JVRkJSU3hOUVVGTkxFVkJRVVVzUlVGQk1FVTdXVUZCTVVVc05FSkJRVEJGTEVWQlFYaEZMR05CUVdNc1JVRkJaQ3h0UTBGQll5eEZRVUZGTEdOQlFXTXNSVUZCWkN4dFEwRkJZeXhGUVVGRkxEWkNRVUZwUXl4RlFVRnFReXh6UkVGQmFVTTdVVUZEYWtjc1NVRkJTU3hMUVVGTExFZEJRVWNzUjBGQlJ5eEZRVUZGTEUxQlFVMHNSMEZCUnl4SFFVRkhMRVZCUVVVc1RVRkJUU3hIUVVGSExFMUJRVTBzU1VGQlNTeE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRPMUZCUldoRkxFbEJRVWtzUTBGQlF5eFBRVUZQTEVkQlFVY3NUMEZCVHl4RFFVRkRMRTFCUVUwc1NVRkJTU3h4UWtGQmNVSXNRMEZCUXl4RFFVRkRPMUZCUTNoRUxFbEJRVWtzUTBGQlF5eFBRVUZQTEVkQlFVY3NUVUZCVFN4RFFVRkRPMUZCUlhSQ0xFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NTMEZCU3l4RFFVRkRPMUZCUTNCQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVkQlFVY3NUVUZCVFN4RFFVRkRPMUZCUTNSQ0xFbEJRVWtzUTBGQlF5eFZRVUZWTEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUTNCQ0xFbEJRVWtzUTBGQlF5eFhRVUZYTEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUTNKQ0xFbEJRVWtzUTBGQlF5eFpRVUZaTEVkQlFVY3NTMEZCU3l4SFFVRkhMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU03VVVGRE5VTXNTVUZCU1N4RFFVRkRMRk5CUVZNc1IwRkJSeXhOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXp0UlFVVXpReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRWaXhKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEZGQlFWRXNRMEZCUXl4alFVRmpMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03V1VGRE0wTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhaUVVGWkxFTkJRVU1zVDBGQlR5eEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMWxCUXpGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNXVUZCV1N4RFFVRkRMRkZCUVZFc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF6dFpRVU0xUXl4SlFVRkpMRU5CUVVNc1ZVRkJWU3hIUVVGSExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNWVUZCVlN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xbEJSV2hFTEVsQlFVa3NRMEZCUXl4UFFVRlBMRWRCUVVjc1VVRkJVU3hEUVVGRExHRkJRV0VzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0WlFVTm9SQ3hKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEZsQlFWa3NRMEZCUXl4UFFVRlBMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03V1VGRE1VTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhaUVVGWkxFTkJRVU1zVVVGQlVTeEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMWxCUXpWRExFbEJRVWtzUTBGQlF5eFZRVUZWTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhWUVVGVkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZGYUVRc1NVRkJTU3hEUVVGRExHVkJRV1VzUjBGQlJ5eFJRVUZSTEVOQlFVTXNZMEZCWXl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8xbEJRM3BFTEVsQlFVa3NRMEZCUXl4VlFVRlZMRWRCUVVjc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eGxRVUZsTEVOQlFVTXNTMEZCU3l4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRE8xRkJRM0pGTEVOQlFVTTdVVUZGUkN4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFMUJRVTBzUTBGQlF6dFJRVU4wUWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFMUJRVTBzUTBGQlF6dFJRVVYwUWl4NVJFRkJlVVE3VVVGRGVrUXNSVUZCUlN4RFFVRkRMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNoQ0xFbEJRVWtzUTBGQlF5eFpRVUZaTEVkQlFVY3NjVUpCUVhGQ0xFTkJRVU03VVVGRE9VTXNRMEZCUXp0UlFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xbEJRMG9zUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU5XTEVsQlFVa3NRMEZCUXl4VFFVRlRMRWRCUVVjc1NVRkJTU3hEUVVGRExFMUJRVTBzUjBGQlJ5eHBRa0ZCYVVJc1IwRkJSeXhYUVVGWExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dG5Ra0ZETjBZc1NVRkJTU3hEUVVGRExFMUJRVTBzUjBGQlJ5eEpRVUZKTEZkQlFWY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03WjBKQlF6bERMRWxCUVVrc1EwRkJReXhQUVVGUExFZEJRVWNzU1VGQlNTeFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8xbEJRMnhFTEVOQlFVTTdVVUZEVEN4RFFVRkRPMUZCUjBRc2MwTkJRWE5ETzFGQlEzUkRMRWxCUVVrc1EwRkJReXh6UWtGQmMwSXNSMEZCUnl4SlFVRkpMRU5CUVVNc05FSkJRVFJDTEVOQlFVTTdVVUZGYUVVc1JVRkJSU3hEUVVGRExFTkJRVU1zVDBGQlR5eFRRVUZUTEV0QlFVc3NWMEZCVnl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOdVF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4VFFVRlRMRU5CUVVNc1UwRkJVeXhEUVVGRExGZEJRVmNzUlVGQlJTeERRVUZETEU5QlFVOHNRMEZCUXl4UlFVRlJMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUXpORUxFbEJRVWtzUTBGQlF5eHpRa0ZCYzBJc1IwRkJSeXhKUVVGSkxFTkJRVU1zTkVKQlFUUkNMRU5CUVVNN1dVRkRjRVVzUTBGQlF6dFJRVU5NTEVOQlFVTTdVVUZGUkN3MFFrRkJORUk3VVVGRE5VSXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRE8wbEJRMmhDTEVOQlFVTTdTVUZGUkN4eFFrRkJTU3hIUVVGS08xRkJRMGtzU1VGQlRTeE5RVUZOTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJRenRSUVVNMVFpeEpRVUZOTEUxQlFVMHNSMEZCUnl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRE8xRkJRelZDTEVWQlFVVXNRMEZCUXl4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRFZDeEpRVUZKTEVOQlFVTXNVVUZCVVN4SFFVRkhMRTFCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETEZsQlFWa3NSVUZCUlN4TlFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVU03V1VGRk5VVXNWMEZCVnp0WlFVTllMRWxCUVVrc1EwRkJReXhUUVVGVExFZEJRVWNzVFVGQlRTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1lVRkJZU3hGUVVGRkxFMUJRVTBzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXp0WlFVTXpSU3hKUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEUxQlFVMHNRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExHTkJRV01zUlVGQlJTeE5RVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNN1VVRkRPVVVzUTBGQlF6dEpRVU5NTEVOQlFVTTdTVUZGUkN4elFrRkJTU3d3UWtGQlRUdGhRVUZXTzFsQlEwa3NUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU03VVVGRGVFSXNRMEZCUXpzN08wOUJRVUU3U1VGRlJDeHpRa0ZCU1N4eFEwRkJhVUk3WVVGQmNrSTdXVUZEU1N4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTXNVMEZCVXl4SFFVRkhMRWxCUVVrc1EwRkJRenRSUVVNdlF5eERRVUZET3pzN1QwRkJRVHRKUVVWRUxIRkRRVUZ2UWl4SFFVRndRaXhWUVVGeFFpeHBRa0ZCYVVJN1VVRkRiRU1zU1VGQlNTeERRVUZETEZOQlFWTXNSMEZCUnl4cFFrRkJhVUlzUTBGQlF6dFJRVU51UXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExFbEJRVWtzVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJRenRSUVVNNVF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4SFFVRkhMRWxCUVVrc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0SlFVVnNSQ3hEUVVGRE8wbEJSVVFzWjBOQlFXVXNSMEZCWml4VlFVRm5RaXhIUVVGSExFVkJRVVVzUTBGQlF5eEZRVUZGTEVOQlFVTXNSVUZCUlN4RFFVRkRPMUZCUTNoQ0xFbEJRVWtzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1dVRkJXU3hIUVVGSExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTJ4RUxFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhEUVVGRExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEYkVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU12UWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJReTlDTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUjBGQlJ5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRia01zUTBGQlF6dEpRVVZFTEdkRFFVRmxMRWRCUVdZc1ZVRkJaMElzUjBGQlJ6dFJRVU5tTEVsQlFVa3NTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zV1VGQldTeEhRVUZITEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMnhFTEUxQlFVMHNRMEZCUXp0WlFVTklMRU5CUVVNc1JVRkJSU3hKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNN1dVRkRNVUlzUTBGQlF5eEZRVUZGTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUjBGQlJ5eERRVUZETEVOQlFVTTdXVUZET1VJc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhEUVVGRExFTkJRVU03VTBGRGFrTXNRMEZCUXp0SlFVTk9MRU5CUVVNN1NVRkZSQ3cwUWtGQlZ5eEhRVUZZTzFGQlEwa3NTVUZCU1N4RFFVRkRMRVZCUVVVc1EwRkJReXhGUVVGRkxFTkJRVU1zUlVGQlJTeERRVUZETEVWQlExWXNSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJReXhGUVVGRkxFZEJRVWNzUlVGQlJTeEhRVUZITEVWQlFVVXNSMEZCUnl4RFFVRkRMRU5CUVVNN1VVRkZOVUlzUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRkxFTkJRVU1zUjBGQlJ5eEhRVUZITEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVc1EwRkJRenRaUVVNelFpeERRVUZETEVkQlFVY3NSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRE5VSXNRMEZCUXl4SFFVRkhMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFsQlF5OUNMRU5CUVVNc1IwRkJSeXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0WlFVTXZRaXhEUVVGRExFZEJRVWNzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1dVRkRMMElzU1VGQlNTeERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhGUVVGRkxFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnlReXhEUVVGRE8wbEJRMHdzUTBGQlF6dEpRVVZFTEcxRFFVRnJRaXhIUVVGc1FpeFZRVUZ0UWl4RFFVRkRPMUZCUTJoQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWlVGQlpTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTNaRUxFTkJRVU03U1VGRFJDeHRRMEZCYTBJc1IwRkJiRUk3VVVGRFNTeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4bFFVRmxMRU5CUVVNc1EwRkJRenRKUVVNelJDeERRVUZETzBsQlJVUXNPRUpCUVdFc1IwRkJZaXhWUVVGakxFTkJRVU1zUlVGQlJTeERRVUZETzFGQlEyUXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03VVVGREwwTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRGJrUXNRMEZCUXp0SlFVTkVMRGhDUVVGaExFZEJRV0k3VVVGRFNTeE5RVUZOTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExFbEJRVWs3V1VGRE1VUXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4WFFVRlhMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU40UkN4RFFVRkRPMGxCUlVRc0swSkJRV01zUjBGQlpDeFZRVUZsTEVOQlFVTTdVVUZEV2l4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRmRCUVZjc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU51UkN4RFFVRkRPMGxCUTBRc0swSkJRV01zUjBGQlpEdFJRVU5KTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRE8wbEJRM1pFTEVOQlFVTTdTVUZGUkN4cFEwRkJaMElzUjBGQmFFSXNWVUZCYVVJc1EwRkJRenRSUVVOa0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWVVGQllTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTNKRUxFTkJRVU03U1VGRFJDeHBRMEZCWjBJc1IwRkJhRUk3VVVGRFNTeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4aFFVRmhMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU03U1VGRGFFVXNRMEZCUXp0SlFVVkVMR2xEUVVGblFpeEhRVUZvUWl4VlFVRnBRaXhKUVVGSkxFVkJRVVVzUTBGQlF6dFJRVU53UWl4SlFVRkpMRTFCUVUwc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNZMEZCWXp0WlFVTjZReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdOQlFXTTdXVUZETTBJc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eGpRVUZqTzFsQlF6TkNMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWTBGQll5eERRVUZETEVOQlFVTTdVVUZETjBJc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEzWkRMRU5CUVVNN1NVRkRSQ3hwUTBGQlowSXNSMEZCYUVJc1ZVRkJhVUlzU1VGQlNUdFJRVU5xUWl4SlFVRkpMRTFCUVUwc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNZMEZCWXp0WlFVTjZReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdOQlFXTTdXVUZETTBJc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eGpRVUZqTzFsQlF6TkNMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWTBGQll5eERRVUZETEVOQlFVTTdVVUZETjBJc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXp0SlFVTnNSQ3hEUVVGRE8wbEJSVVFzYlVOQlFXdENMRWRCUVd4Q0xGVkJRVzFDTEVsQlFVa3NSVUZCUlN4RFFVRkRMRVZCUVVVc1EwRkJRenRSUVVONlFpeEpRVUZKTEU5QlFVOHNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWjBKQlFXZENPMWxCUXpWRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNaMEpCUVdkQ08xbEJRemRDTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1owSkJRV2RDTzFsQlF6ZENMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1EwRkJRenRSUVVNdlFpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVXNRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUjBGQlJ5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTNSRUxFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVWQlFVVXNRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUjBGQlJ5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUXpsRUxFTkJRVU03U1VGRFJDeHRRMEZCYTBJc1IwRkJiRUlzVlVGQmJVSXNTVUZCU1R0UlFVTnVRaXhKUVVGSkxFOUJRVThzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1owSkJRV2RDTzFsQlF6VkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWjBKQlFXZENPMWxCUXpkQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNaMEpCUVdkQ08xbEJRemRDTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNRMEZCUXp0UlFVTXZRaXhOUVVGTkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZEZUVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdTVUZETVVNc1EwRkJRenRKUVVWRUxHbERRVUZuUWl4SFFVRm9RaXhWUVVGcFFpeEpRVUZKTEVWQlFVVXNRMEZCUXl4RlFVRkZMRU5CUVVNN1VVRkRka0lzU1VGQlNTeExRVUZMTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHTkJRV003V1VGRGVFTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhqUVVGak8xbEJRek5DTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1kwRkJZenRaUVVNelFpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMR05CUVdNc1EwRkJReXhEUVVGRE8xRkJRemRDTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOc1F5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRekZETEVOQlFVTTdTVUZEUkN4cFEwRkJaMElzUjBGQmFFSXNWVUZCYVVJc1NVRkJTVHRSUVVOcVFpeEpRVUZKTEV0QlFVc3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWTBGQll6dFpRVU40UXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHTkJRV003V1VGRE0wSXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhqUVVGak8xbEJRek5DTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1kwRkJZeXhEUVVGRExFTkJRVU03VVVGRE4wSXNUVUZCVFN4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFZEJRVWNzU1VGQlNUdFpRVU0zUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEVOQlFVTTdTVUZETDBNc1EwRkJRenRKUVVWRUxDdENRVUZqTEVkQlFXUXNWVUZCWlN4SlFVRkpMRVZCUVVVc1IwRkJSenRSUVVOd1FpeEpRVUZKTEUxQlFVMHNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zV1VGQldUdFpRVU4yUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExGbEJRVms3V1VGRGVrSXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhaUVVGWk8xbEJRM3BDTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU03VVVGRE0wSXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJRM3BETEVOQlFVTTdTVUZEUkN3clFrRkJZeXhIUVVGa0xGVkJRV1VzU1VGQlNUdFJRVU5tTEVsQlFVa3NUVUZCVFN4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFpRVUZaTzFsQlEzWkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zV1VGQldUdFpRVU42UWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExGbEJRVms3V1VGRGVrSXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhaUVVGWkxFTkJRVU1zUTBGQlF6dFJRVU16UWl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETzBsQlEyeEVMRU5CUVVNN1NVRkZSQ3hwUTBGQlowSXNSMEZCYUVJc1ZVRkJhVUlzU1VGQlNTeEZRVUZGTEV0QlFVczdVVUZEZUVJc1NVRkJTU3hOUVVGTkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMR05CUVdNN1dVRkRla01zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4alFVRmpPMWxCUXpOQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNZMEZCWXp0WlFVTXpRaXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdOQlFXTXNRMEZCUXl4RFFVRkRPMUZCUXpkQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeExRVUZMTEVOQlFVTXNRMEZCUXp0SlFVTXpReXhEUVVGRE8wbEJRMFFzYVVOQlFXZENMRWRCUVdoQ0xGVkJRV2xDTEVsQlFVazdVVUZEYWtJc1NVRkJTU3hOUVVGTkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMR05CUVdNN1dVRkRla01zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4alFVRmpPMWxCUXpOQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNZMEZCWXp0WlFVTXpRaXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdOQlFXTXNRMEZCUXl4RFFVRkRPMUZCUXpkQ0xFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNN1NVRkRiRVFzUTBGQlF6dEpRVWRFTEhkRFFVRjFRaXhIUVVGMlFqdFJRVU5KTEVsQlFVa3NRMEZCUXl4clFrRkJhMElzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkZMRmxCUVZrN1VVRkROVU1zU1VGQlNTeERRVUZETEdGQlFXRXNRMEZCUXl4SlFVRkpMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eHRRa0ZCYlVJN1VVRkRia1FzU1VGQlNTeERRVUZETEdOQlFXTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVNeFFpeEpRVUZKTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl3NFFrRkJPRUk3VVVGRE0wUXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hKUVVGSkxFZEJRVWNzUTBGQlF5eEZRVUZGTEVsQlFVa3NSMEZCUnl4RFFVRkRMRVZCUVVVc1NVRkJTU3hGUVVGRkxFVkJRVVVzUTBGQlF6dFpRVU5zUXl4SlFVRkpMRmxCUVZrc1IwRkJSeXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEZOQlFWTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWTBGQll5eEhRVUZITEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUTJwR0xFbEJRVWtzVjBGQlZ5eEhRVUZITEZsQlFWa3NSMEZCUnl4TlFVRk5MRU5CUVVNN1dVRkRlRU1zU1VGQlNTeFhRVUZYTEVkQlFVY3NWMEZCVnl4SFFVRkhMRTFCUVUwc1EwRkJRenRaUVVOMlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRWRCUVVjc1IwRkJSeXhEUVVGRExFVkJRVVVzUjBGQlJ5eEhRVUZITEUxQlFVMHNSVUZCUlN4SFFVRkhMRVZCUVVVc1JVRkJSU3hEUVVGRE8yZENRVU53UXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eFpRVUZaTEVkQlFVY3NSMEZCUnl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU42UXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVkQlFVY3NSMEZCUnl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU40UXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVkQlFVY3NSMEZCUnl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xbEJReTlETEVOQlFVTTdXVUZEUkN4SlFVRkpMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1NVRkJTU3hMUVVGTExFTkJRVU1zUTBGQlF5eEhRVUZITEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExIbERRVUY1UXp0WlFVTnNSeXhKUVVGSkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRmRCUVZjN1dVRkRPVU1zU1VGQlNTeERRVUZETEd0Q1FVRnJRaXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhoUVVGaE8xbEJRMnhFTEVsQlFVa3NRMEZCUXl4blFrRkJaMElzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhoUVVGaE8xbEJRemRETEVsQlFVa3NRMEZCUXl4alFVRmpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNhVUpCUVdsQ08xRkJRMjVFTEVOQlFVTTdTVUZEVEN4RFFVRkRPMGxCUjBRc2VVSkJRVkVzUjBGQlVpeFZRVUZUTEVOQlFVTXNSVUZCUlN4RFFVRkRMRVZCUVVVc1EwRkJRenRSUVVOYUxHbEVRVUZwUkR0UlFVTnFSQ3h6UTBGQmMwTTdVVUZEZEVNc2JVUkJRVzFFTzFGQlEyNUVMRWxCUVVrc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRja01zU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eG5RMEZCWjBNN1NVRkRNMFFzUTBGQlF6dEpRVWRFT3pzN096czdPenM3VFVGVFJUdEpRVVZHTEhkQ1FVRlBMRWRCUVZBc1ZVRkJVU3hKUVVGSkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQlFVY3NSVUZCUlN4SlFVRkpMRVZCUVVVc1QwRkJZeXhGUVVGRkxFOUJRV003VVVGQk9VSXNkMEpCUVVFc1JVRkJRU3hqUVVGak8xRkJRVVVzZDBKQlFVRXNSVUZCUVN4alFVRmpPMUZCUTNoRUxFbEJRVWtzVVVGQlVTeEhRVUZITEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4alFVRmpMRWRCUVVjc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE4wVXNTVUZCU1N4UlFVRlJMRWRCUVVjc1VVRkJVU3hIUVVGSExFTkJRVU1zUjBGQlJ5eEhRVUZITEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1IwRkJSeXhIUVVGSExFTkJRVU03VVVGRE1VUXNTVUZCU1N4TlFVRk5MRWRCUVVjc1VVRkJVU3hIUVVGSExFMUJRVTBzUTBGQlF6dFJRVU12UWl4SlFVRkpMRTFCUVUwc1IwRkJSeXhSUVVGUkxFZEJRVWNzVFVGQlRTeERRVUZETzFGQlJTOUNMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEZGQlFWRXNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOc1F5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdVVUZEYmtNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRE8wbEJRM1pETEVOQlFVTTdTVUZGUkN3NFEwRkJOa0lzUjBGQk4wSXNWVUZCT0VJc1QwRkJUenRSUVVOcVF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc2EwSkJRV3RDTEVWQlFVVXNRMEZCUXp0UlFVVnNReXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVVUzUWl4elEwRkJjME03VVVGRGRFTXNkMFJCUVhkRU8xRkJRM2hFTERKRVFVRXlSRHRSUVVNelJDeDVRMEZCZVVNN1VVRkRla01zWlVGQlpUdFJRVU5tTEZkQlFWYzdVVUZGV0N4eFEwRkJjVU03U1VGRGVrTXNRMEZCUXp0SlFVVkVMRFJDUVVFMFFqdEpRVU0xUWl3MlEwRkJORUlzUjBGQk5VSXNWVUZCTmtJc1NVRkJTU3hGUVVGRkxFOUJRVTg3VVVGRmRFTXNjME5CUVhORE8xRkJRMnhETEVsQlFVRXNaME5CUVRSRExFVkJRVE5ETEdGQlFVc3NSVUZCUlN4aFFVRkxMRVZCUTJJc1VVRkJVU3hIUVVGSExFdEJRVXNzUlVGQlJTeGpRVUZqTEVkQlFVY3NVVUZCVVN4SFFVRkhMRXRCUVVzc1JVRkRia1FzVTBGQlV5eEhRVUZITEVsQlFVa3NRMEZCUXl4TlFVRk5MRWRCUVVjc1MwRkJTeXhGUVVGRkxHVkJRV1VzUjBGQlJ5eERRVUZETEZOQlFWTXNSMEZCUnl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRekZGTEU5QlFVOHNSMEZCUnl4TFFVRkxMRVZCUVVVc1lVRkJZU3hIUVVGSExFOUJRVThzUjBGQlJ5eExRVUZMTEVWQlEyaEVMRlZCUVZVc1IwRkJSeXhKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEV0QlFVc3NSVUZCUlN4blFrRkJaMElzUjBGQlJ5eERRVUZETEZWQlFWVXNSMEZCUnl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRemxGTEd0RFFVRnJSQ3hGUVVGcVJDeGxRVUZQTEVWQlFVVXNaVUZCVHl4RlFVTnFRaXhMUVVGTExFZEJRVWNzU1VGQlNTeERRVUZETEdkQ1FVRm5RaXhEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVsQlFVa3NSVUZETVVNc1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF5eGpRVUZqTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUTI1RExGZEJRVmNzUjBGQlJ5eFBRVUZQTEVkQlFVY3NTMEZCU3l4RlFVTTNRaXhaUVVGWkxFZEJRVWNzU1VGQlNTeEhRVUZITEUxQlFVMHNSVUZETlVJc2JVSkJRVzFDTEVWQlFVVXNiVUpCUVcxQ0xFVkJRM2hETEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVVc1YwRkJWeXhGUVVGRkxFbEJRVWtzUlVGRE4wSXNTVUZCU1N4RlFVRkZMRWxCUVVrc1JVRkJSU3hMUVVGTExFVkJRVVVzUzBGQlN5eEZRVU40UWl4TFFVRkxMRWRCUVVjc1EwRkJReXhIUVVGSExFdEJRVXNzUTBGQlF6dFJRVVYwUWl4UFFVRlBMRWRCUVVjc01rSkJRV01zUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkRlRU1zVDBGQlR5eEhRVUZITERKQ1FVRmpMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFGQlJYaERMREJEUVVFd1F6dFJRVU14UXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFZEJRVWNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNVMEZCVXl4SFFVRkhMRU5CUVVNc1JVRkJSU3hIUVVGSExFZEJRVWNzUTBGQlF5eERRVUZETEVWQlFVVXNSMEZCUnl4RlFVRkZMRVZCUVVVc1EwRkJRenRaUVVOcVJDeHhSRUZCY1VRN1dVRkRja1FzUzBGQlN5eEhRVUZITEVOQlFVTXNSMEZCUnl4SlFVRkpMRXRCUVVzc1EwRkJReXhIUVVGSExFOUJRVThzUTBGQlF6dFpRVVZxUXl4M1JFRkJkMFE3V1VGRGVFUXNSVUZCUlN4RFFVRkRMRU5CUVVNc1MwRkJTeXhKUVVGSkxHRkJRV0VzU1VGQlNTeExRVUZMTEVsQlFVa3NaMEpCUVdkQ0xFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTjBSQ3hIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVkQlFVY3NSMEZCUnl4SlFVRkpMRU5CUVVNc1dVRkJXU3hIUVVGSExFTkJRVU1zUlVGQlJTeEhRVUZITEVkQlFVY3NRMEZCUXl4RFFVRkRMRVZCUVVVc1IwRkJSeXhGUVVGRkxFVkJRVVVzUTBGQlF6dHZRa0ZEY0VRc05FUkJRVFJFTzI5Q1FVTTFSQ3hMUVVGTExFZEJRVWNzUTBGQlF5eEhRVUZITEVsQlFVa3NTMEZCU3l4RFFVRkRMRWRCUVVjc1QwRkJUeXhEUVVGRE8yOUNRVVZxUXl4dFEwRkJiVU03YjBKQlEyNURMRVZCUVVVc1EwRkJReXhEUVVGRExFdEJRVXNzU1VGQlNTeGpRVUZqTEVsQlFVa3NTMEZCU3l4SlFVRkpMR1ZCUVdVc1EwRkJReXhEUVVGRExFTkJRVU03ZDBKQlJYUkVMSGxFUVVGNVJEdDNRa0ZEZWtRc1NVRkJTU3hIUVVGSExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zUTBGQlF5eEhRVUZITEVkQlFVY3NSMEZCUnl4WlFVRlpMRU5CUVVNN2QwSkJSWEJFTEdWQlFXVTdkMEpCUTJZc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN2QwSkJRM3BDTEZkQlFWY3NSMEZCUnl4WFFVRlhMRWRCUVVjc1EwRkJReXhKUVVGSkxFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTTdkMEpCUlhoRExESkNRVUV5UWp0M1FrRkRNMElzYlVKQlFXMUNMRWRCUVVjc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVkQlFVY3NUVUZCVFN4RFFVRkRMRU5CUVVNN2QwSkJRMnBFTEcxQ1FVRnRRaXhIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4SFFVRkhMRTFCUVUwc1EwRkJReXhEUVVGRE8zZENRVVZxUkN4dlEwRkJiME03ZDBKQlEzQkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVVzUTBGQlF6czBRa0ZEZWtNc1NVRkJTU3hIUVVGSExFTkJRVU1zUjBGQlJ5eExRVUZMTEVOQlFVTTdORUpCUTJwQ0xFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVXNRMEZCUXp0blEwRkRla01zU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1YwRkJWeXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03WjBOQlF6RkZMRVZCUVVVc1EwRkJReXhEUVVGRExFbEJRVWtzUzBGQlN5eEpRVUZKTEVsQlFVa3NTVUZCU1N4TFFVRkxMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03YjBOQlEycERMRWxCUVVrc1IwRkJSeXhEUVVGRExFbEJRVWtzUzBGQlN5eEpRVUZKTEVkQlFVY3NiVUpCUVcxQ0xFZEJRVWNzYlVKQlFXMUNMRU5CUVVNc1EwRkJRenRuUTBGRGRrVXNRMEZCUXp0blEwRkRSQ3hGUVVGRkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenR2UTBGRFdDeEpRVUZKTEVkQlFVY3NRMEZCUXl4SFFVRkhMRXRCUVVzc1EwRkJRenR2UTBGRGFrSXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzU1VGQlNTeFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhUUVVGVExFTkJRVU1zUTBGQlF6dDNRMEZETVVNc1EwRkJReXhEUVVGRExFbEJRVWtzU1VGQlNTeFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhWUVVGVkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0M1EwRkROME1zU1VGQlNTeERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRVZCUVVVc1NVRkJTU3hGUVVGRkxFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRPMjlEUVVNM1F5eERRVUZETzJkRFFVTk1MRU5CUVVNN05FSkJRMHdzUTBGQlF6dDNRa0ZEVEN4RFFVRkRPMjlDUVVOTUxFTkJRVU03WjBKQlEwd3NRMEZCUXp0WlFVTk1MRU5CUVVNN1VVRkRUQ3hEUVVGRE8wbEJRMHdzUTBGQlF6dEpRVVZFTERKQ1FVRXlRanRKUVVVelFpdzJRMEZCTkVJc1IwRkJOVUlzVlVGQk5rSXNTVUZCU1N4RlFVRkZMRTlCUVU4N1VVRkZkRU1zYzBOQlFYTkRPMUZCUTJ4RExFbEJRVUVzWjBOQlFUUkRMRVZCUVRORExHRkJRVXNzUlVGQlJTeGhRVUZMTEVWQlEySXNVVUZCVVN4SFFVRkhMRXRCUVVzc1JVRkRhRUlzVTBGQlV5eEhRVUZITEVsQlFVa3NRMEZCUXl4TlFVRk5MRWRCUVVjc1MwRkJTeXhGUVVNdlFpeFBRVUZQTEVkQlFVY3NTMEZCU3l4RlFVTm1MRlZCUVZVc1IwRkJSeXhKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEV0QlFVc3NSVUZEYWtNc2EwTkJRV3RFTEVWQlFXcEVMR1ZCUVU4c1JVRkJSU3hsUVVGUExFVkJRMnBDTEV0QlFVc3NSMEZCUnl4SlFVRkpMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1NVRkJTU3hGUVVNeFF5eFBRVUZQTEVkQlFVY3NTVUZCU1N4RFFVRkRMR05CUVdNc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGRGJrTXNWMEZCVnl4SFFVRkhMRTlCUVU4c1IwRkJSeXhMUVVGTExFVkJRemRDTEZsQlFWa3NSMEZCUnl4SlFVRkpMRWRCUVVjc1RVRkJUU3hGUVVNMVFpeHRRa0ZCYlVJc1JVRkJSU3h0UWtGQmJVSXNSVUZEZUVNc1NVRkJTU3hGUVVGRkxFbEJRVWtzUlVGQlJTeFhRVUZYTEVWQlFVVXNTVUZCU1N4RlFVTTNRaXhKUVVGSkxFVkJRVVVzU1VGQlNTeEZRVU5XTEV0QlFVc3NSMEZCUnl4RFFVRkRMRWRCUVVjc1MwRkJTeXhGUVVGRkxGRkJRVkVzUlVGQlJTeFBRVUZQTEVOQlFVTTdVVUZGZWtNc1QwRkJUeXhIUVVGSExESkNRVUZqTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xRkJRM2hETEU5QlFVOHNSMEZCUnl3eVFrRkJZeXhEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0UlFVVjRReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVVzUTBGQlF6dFpRVU42UXl4UlFVRlJMRWRCUVVjc1EwRkJReXhKUVVGSkxFdEJRVXNzUTBGQlF6dFpRVU4wUWl4UFFVRlBMRWRCUVVjc1EwRkJReXhKUVVGSkxFdEJRVXNzUTBGQlF6dFpRVU55UWl4SlFVRkpMRWRCUVVjc1EwRkJReXhIUVVGSExFOUJRVThzUTBGQlF6dFpRVVZ1UWl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCVFN4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVc1EwRkJRenRuUWtGRmVFTXNjVUpCUVhGQ08yZENRVU55UWl3eVJFRkJNa1E3WjBKQlF6TkVMRWxCUVVrc1IwRkJSeXhEUVVGRExGRkJRVkVzU1VGQlNTeERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRkZCUVZFc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRU5CUVVNc1IwRkJSeXhaUVVGWkxFTkJRVU03WjBKQlEzWkZMRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMmRDUVVWNlFpd3lRa0ZCTWtJN1owSkJRek5DTEcxQ1FVRnRRaXhIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4SFFVRkhMRTFCUVUwc1EwRkJReXhEUVVGRE8yZENRVU5xUkN4dFFrRkJiVUlzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1IwRkJSeXhOUVVGTkxFTkJRVU1zUTBGQlF6dG5Ra0ZGYWtRc2NVSkJRWEZDTzJkQ1FVTnlRaXhYUVVGWExFZEJRVWNzUTBGQlF5eERRVUZETEU5QlFVOHNSMEZCUnl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4SlFVRkpMRU5CUVVNc1EwRkJReXhIUVVGSExGZEJRVmNzUTBGQlF6dG5Ra0ZETVVZc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNN1owSkJSVzVETEVWQlFVVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1MwRkJTeXhKUVVGSkxFbEJRVWtzU1VGQlNTeExRVUZMTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN2IwSkJRMnBETEVsQlFVa3NSMEZCUnl4RFFVRkRMRWxCUVVrc1MwRkJTeXhKUVVGSkxFZEJRVWNzYlVKQlFXMUNMRWRCUVVjc2JVSkJRVzFDTEVOQlFVTXNRMEZCUXp0blFrRkRka1VzUTBGQlF6dG5Ra0ZGUkN4SlFVRkpMRWRCUVVjc1EwRkJReXhIUVVGSExFOUJRVThzUTBGQlF6dG5Ra0ZGYmtJc1JVRkJSU3hEUVVGRExFTkJRVU1zU1VGQlNTeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN2IwSkJRMWdzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1NVRkJTU3hSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4VFFVRlRMRU5CUVVNc1EwRkJRenQzUWtGRE1VTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1NVRkJTU3hQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4VlFVRlZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dDNRa0ZETjBNc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVWQlFVVXNTVUZCU1N4RlFVRkZMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETzI5Q1FVTTNReXhEUVVGRE8yZENRVU5NTEVOQlFVTTdXVUZEVEN4RFFVRkRPMUZCUTB3c1EwRkJRenRSUVVWRUxIRkRRVUZ4UXp0SlFVTjZReXhEUVVGRE8wbEJSVVFzZFVOQlFYTkNMRWRCUVhSQ0xGVkJRWFZDTEU5QlFVODdVVUZETVVJc1NVRkJTU3hKUVVGSkxFVkJRMG9zU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRE8xRkJSWFJETEhORFFVRnpRenRSUVVOMFF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVXNRMEZCUXp0WlFVTjZReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVVzUTBGQlF6dG5Ra0ZEZUVNc1NVRkJTU3hGUVVGRkxFTkJRVU03WjBKQlExQXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMmRDUVVNdlFpeEZRVUZGTEVOQlFVTXNRMEZCUXl4SlFVRkpMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dHZRa0ZEV0N4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETEVWQlFVVXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEzWkRMRU5CUVVNN1dVRkRUQ3hEUVVGRE8xRkJRMHdzUTBGQlF6dFJRVVZFTEhGRFFVRnhRenRKUVVONlF5eERRVUZETzBsQlJVUTdPenM3TzAxQlMwVTdTVUZGUml3eVEwRkJNRUlzUjBGQk1VSTdVVUZEU1N4SlFVRkpMRmRCUVZjc1IwRkJSeXhKUVVGSkxFTkJRVU1zWTBGQll5eEZRVUZGTEVOQlFVTTdVVUZEZUVNc1NVRkJTU3hMUVVGTExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExGVkJRVlVzUTBGQlF5eERRVUZETzFGQlEzUkVMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUzBGQlN5eEhRVUZITEZWQlFWVXNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVOdVF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRXRCUVVzc1IwRkJSeXhWUVVGVkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEYkVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eExRVUZMTEVkQlFVY3NWVUZCVlN4RFFVRkRMRU5CUVVNN1VVRkROMElzU1VGQlNTeEhRVUZITEVkQlFVY3NVMEZCVHl4RFFVRkRMRlZCUVVzc1EwRkJReXhWUVVGTExFTkJRVU1zVFVGQlJ5eERRVUZETzFGQlEyeERMRWxCUVVrc1EwRkJReXhsUVVGbExFTkJRVU1zUzBGQlN5eERRVUZETEdWQlFXVXNSMEZCUnl4SFFVRkhMRU5CUVVNN1VVRkRha1FzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc1pVRkJaU3hIUVVGSExFZEJRVWNzUTBGQlF6dEpRVU0zUXl4RFFVRkRPMGxCUlVRc2NVTkJRVzlDTEVkQlFYQkNMRlZCUVhGQ0xFOUJRVTg3VVVGRGVFSXNTVUZCU1N4WFFVRlhMRWRCUVVjc1NVRkJTU3hEUVVGRExHTkJRV01zUlVGQlJTeEZRVU51UXl4NVFrRkJhVVFzUlVGQmFFUXNiVUpCUVZjc1JVRkJSU3h0UWtGQlZ5eEZRVU42UWl4VlFVRlZMRWRCUVVjc1YwRkJWeXhGUVVONFFpeFhRVUZYTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1IwRkJSeXhYUVVGWExFVkJRM1pETEZOQlFWTXNSMEZCUnl4WFFVRlhMRVZCUTNaQ0xGbEJRVmtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUMEZCVHl4SFFVRkhMRmRCUVZjc1EwRkJRenRSUVVVNVF5eHpRMEZCYzBNN1VVRkRkRU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFOUJRVThzUjBGQlJ5eERRVUZETEVWQlFVVXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUlVGQlJTeEZRVUZGTEVOQlFVTTdXVUZEZWtNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJSU3hGUVVGRkxFTkJRVU03WjBKQlEzaERMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NWVUZCVlN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFbEJRVWtzVjBGQlZ5eERRVUZETEVOQlFVTTdiMEpCUTNoRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NVMEZCVXl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFbEJRVWtzV1VGQldTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN2IwSkJRek5ETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUlVGQlJTeFBRVUZQTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRE9VTXNRMEZCUXp0WlFVTk1MRU5CUVVNN1VVRkRUQ3hEUVVGRE8xRkJSVVFzY1VOQlFYRkRPMGxCUTNwRExFTkJRVU03U1VGRlJDeDFRa0ZCVFN4SFFVRk9PMUZCUTBrc1NVRkJTU3hMUVVGTExFVkJRVVVzVDBGQlR5eEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTjRRaXhKUVVGSkxFMUJRVTBzUjBGQlJ6dFpRVU5VTEVWQlFVVTdXVUZEUml4RlFVRkZPMWxCUTBZc1JVRkJSVHRaUVVOR0xFVkJRVVU3V1VGRFJpeEZRVUZGTzFsQlEwWXNSVUZCUlR0WlFVTkdMRVZCUVVVN1dVRkRSaXhGUVVGRk8xTkJRMHdzUTBGQlF6dFJRVVZHTERoQ1FVRTRRanRSUVVNNVFpeE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5dzJRa0ZCTmtJc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVVTVSQ3d3UTBGQk1FTTdVVUZETVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeEpRVUZKTEVkQlFVY3NRMEZCUXl4RlFVRkZMRWxCUVVrc1IwRkJSeXhEUVVGRExFVkJRVVVzU1VGQlNTeEZRVUZGTEVWQlFVVXNRMEZCUXp0WlFVTnNReXhMUVVGTExFZEJRVWNzU1VGQlNTeERRVUZETEdkQ1FVRm5RaXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFsQlEzQkRMRVZCUVVVc1EwRkJReXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVOYUxFMUJRVTBzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExITkNRVUZ6UWl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnlSU3hEUVVGRE8xRkJRMHdzUTBGQlF6dFJRVVZFTEhsQ1FVRjVRanRSUVVONlFpeExRVUZMTEVkQlFVY3NTVUZCU1N4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEVOQlFVTTdVVUZEYUVNc1JVRkJSU3hEUVVGRExFTkJRVU1zUzBGQlN5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRXaXhOUVVGTkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXh6UWtGQmMwSXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU12UkN4RFFVRkRPMUZCUlVRc2JVSkJRVzFDTzFGQlEyNUNMRTlCUVU4N1VVRkZVQ3hyUWtGQmEwSTdVVUZEYkVJc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc2IwSkJRVzlDTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRmNrUXNLMEpCUVN0Q08xRkJSUzlDTEc5Q1FVRnZRanRSUVVOd1FpeEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZITEVkQlFVY3NSVUZCUlN4RFFVRkRMRVZCUVVVc1JVRkJSU3hEUVVGRE8xbEJRek5DTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4VlFVRlZMRU5CUVVNc1EwRkJRenRSUVVOb1JDeERRVUZETzFGQlJVUXNiVUpCUVcxQ08xRkJRMjVDTEhGQ1FVRnhRanRSUVVOeVFpeEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRkZCUVZFc1IwRkJSeXhEUVVGRExFVkJRVVVzVVVGQlVTeEhRVUZITEVOQlFVTXNSVUZCUlN4UlFVRlJMRVZCUVVVc1JVRkJSU3hEUVVGRE8xbEJRemxETEVsQlFVa3NUMEZCVHl4SFFVRkhMRTFCUVUwc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFpRVU12UWl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxGTkJRVk1zUjBGQlJ5eERRVUZETEVWQlFVVXNVMEZCVXl4SFFVRkhMRTlCUVU4c1EwRkJReXhOUVVGTkxFVkJRVVVzVTBGQlV5eEZRVUZGTEVWQlFVVXNRMEZCUXp0blFrRkRPVVFzVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xbEJRMmhETEVOQlFVTTdVVUZEVEN4RFFVRkRPMGxCUTB3c1EwRkJRenRKUVVWRUxIRkNRVUZKTEVkQlFVbzdVVUZEU1N4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xRkJRM1pETEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRM0JFTEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1UwRkJVeXhEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRemxETEVsQlFVa3NRMEZCUXl3d1FrRkJNRUlzUlVGQlJTeERRVUZETzBsQlEzUkRMRU5CUVVNN1NVRkRUQ3hoUVVGRE8wRkJRVVFzUTBGQlF5eEJRVFZvUWtRc1NVRTBhRUpESW4wPVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2NvcmUvU2NyZWVuLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIl0sInNvdXJjZVJvb3QiOiIifQ==