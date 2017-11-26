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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGV4VXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZXhVdGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0lBQ1gsS0FBSyxZQUFDLENBQUMsRUFBRSxNQUFlLEVBQUUsTUFBYTtRQUE5Qix1QkFBQSxFQUFBLGVBQWU7UUFBRSx1QkFBQSxFQUFBLGFBQWE7UUFDbkMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEQsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUN4RSxNQUFNLENBQUMsS0FBRyxNQUFNLEdBQUcsUUFBVSxDQUFDO0lBQ2xDLENBQUM7SUFDRCxNQUFNLFlBQUMsQ0FBQyxFQUFFLE1BQWE7UUFBYix1QkFBQSxFQUFBLGFBQWE7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsTUFBTSxZQUFDLENBQUMsRUFBRSxNQUFhO1FBQWIsdUJBQUEsRUFBQSxhQUFhO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNELE1BQU0sWUFBQyxDQUFDLEVBQUUsTUFBYTtRQUFiLHVCQUFBLEVBQUEsYUFBYTtRQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDRCxNQUFNLFlBQUMsQ0FBQyxFQUFFLE1BQWE7UUFBYix1QkFBQSxFQUFBLGFBQWE7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsY0FBYyxZQUFDLEdBQUcsRUFBRSxNQUFXO1FBQS9CLGlCQUVDO1FBRm1CLHVCQUFBLEVBQUEsV0FBVztRQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FDSixDQUFDIn0=

/***/ }),

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (immutable) */ __webpack_exports__["a"] = log;
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
if (typeof window !== "undefined") {
    window.log = log;
}
if (typeof global !== "undefined") {
    global.log = log;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUVkOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE9BQU87SUFBYyxjQUFPO1NBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztRQUFQLHlCQUFPOztJQUMvQixFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDWCxDQUFDO1FBQ0QsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM5RyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDO0FBQ0wsQ0FBQztBQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDaEMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDckIsQ0FBQztBQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDaEMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDckIsQ0FBQyJ9
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(5)))

/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdvc0NvbXBsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0d29zQ29tcGxlbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0lBQ1gsS0FBSyxZQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsTUFBTSxZQUFDLENBQUM7UUFDSixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsR0FBRyxZQUFDLENBQUM7UUFDRCxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFBSSxZQUFDLENBQUM7UUFDRixNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUN0QixDQUFDO0NBQ0osQ0FBQSJ9

/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_log_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_hexUtils_js__ = __webpack_require__(0);
/* globals SharedArrayBuffer */


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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_log_js__["a" /* default */])("mem stats | reads  8: " + this.stats.byteReadsTotal + "  16: " + this.stats.wordReadsTotal + "  All: " + this.stats.readsTotal);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_log_js__["a" /* default */])("mem stats | writes 8: " + this.stats.byteWritesTotal + "  16: " + this.stats.wordWritesTotal + "  All: " + this.stats.writesTotal);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_log_js__["a" /* default */])("mem stats | last read: " + __WEBPACK_IMPORTED_MODULE_1__util_hexUtils_js__["a" /* default */].toHex4(this.stats.lastValueRead) + "@" + __WEBPACK_IMPORTED_MODULE_1__util_hexUtils_js__["a" /* default */].toHex4(this.stats.lastReadAddr) + "  write: " + __WEBPACK_IMPORTED_MODULE_1__util_hexUtils_js__["a" /* default */].toHex4(this.stats.lastValueWritten) + "@" + __WEBPACK_IMPORTED_MODULE_1__util_hexUtils_js__["a" /* default */].toHex4(this.stats.lastWriteAddr));
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
/* harmony default export */ __webpack_exports__["a"] = Memory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtb3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTWVtb3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUUvQixPQUFPLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqQyxPQUFPLFFBQVEsTUFBTSxxQkFBcUIsQ0FBQztBQUUzQztJQUNFLGdCQUFZLE1BQU0sRUFBRSxFQUEwRDtZQUExRCw0QkFBMEQsRUFBeEQsY0FBYyxFQUFkLG1DQUFjLEVBQUUsNkJBQWlDLEVBQWpDLHNEQUFpQztRQUNyRSxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUkscUJBQXFCLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLHFCQUFxQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLEdBQUcsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN4RyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxzQkFBSSwwQkFBTTthQUFWO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxxQ0FBaUI7YUFBckI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztR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

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Screen_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Memory_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_memoryLayout_js__ = __webpack_require__(4);
/* globals self */



var ScreenWorker = (function () {
    function ScreenWorker() {
        this.screen = new __WEBPACK_IMPORTED_MODULE_0__core_Screen_js__["a" /* default */](null, null, null, {
            worker: true,
            shared: true
        });
    }
    ScreenWorker.prototype.setSharedMemory = function (sharedArrayBuffer) {
        this.screen._memory = new __WEBPACK_IMPORTED_MODULE_1__core_Memory_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__core_memoryLayout_js__["a" /* default */], {
            shared: true,
            withSharedArrayBuffer: sharedArrayBuffer
        });
        this.screen._layout = __WEBPACK_IMPORTED_MODULE_2__core_memoryLayout_js__["a" /* default */];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NyZWVuV29ya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2NyZWVuV29ya2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGtCQUFrQjtBQUNsQixPQUFPLE1BQU0sTUFBTSxtQkFBbUIsQ0FBQztBQUN2QyxPQUFPLE1BQU0sTUFBTSxtQkFBbUIsQ0FBQztBQUV2QyxPQUFPLFlBQVksTUFBTSx5QkFBeUIsQ0FBQztBQUVuRDtJQUNJO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtZQUN2QyxNQUFNLEVBQUUsSUFBSTtZQUNaLE1BQU0sRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHNDQUFlLEdBQWYsVUFBZ0IsaUJBQWlCO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUMzQyxNQUFNLEVBQUUsSUFBSTtZQUNaLHFCQUFxQixFQUFFLGlCQUFpQjtTQUMzQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7SUFDdkMsQ0FBQztJQUVELDJDQUFvQixHQUFwQixVQUFxQixpQkFBaUI7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCwyQkFBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsNkJBQU0sR0FBTixVQUFPLENBQUMsRUFBRSxXQUFXO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckIsV0FBVyxDQUFDLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQztBQUVELElBQU0sWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7QUFDeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDLENBQUM7SUFDL0IsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDdkIsSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDekIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5QyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==

/***/ }),

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export memoryLayout */
/* eslint-disable */
/* eslint-disable */ var memoryLayout = {
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
/* harmony default export */ __webpack_exports__["a"] = memoryLayout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb3J5TGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVtb3J5TGF5b3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQUNwQixBQURBLG9CQUFvQixDQUNwQixNQUFNLENBQUMsSUFBSSxZQUFZLEdBQUc7SUFDeEIsSUFBSSxFQUFFLEdBQUc7SUFDUCxNQUFNLEVBQUUsT0FBTztJQUNmLE1BQU0sRUFBRSxPQUFPO0lBQ2YsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsT0FBTztJQUNkLGFBQWEsRUFBRSxPQUFPO0lBQ3RCLGNBQWMsRUFBRSxPQUFPO0lBQ3ZCLGNBQWMsRUFBRSxPQUFPO0lBQ3ZCLG9CQUFvQixFQUFFLE9BQU87SUFDN0IsYUFBYSxFQUFFLE9BQU87SUFDdEIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsb0JBQW9CLEVBQUUsT0FBTztJQUM3QixhQUFhLEVBQUUsT0FBTztJQUN0QixjQUFjLEVBQUUsT0FBTztJQUN2QixjQUFjLEVBQUUsT0FBTztJQUN2QixvQkFBb0IsRUFBRSxPQUFPO0lBQzdCLGFBQWEsRUFBRSxPQUFPO0lBQ3RCLGNBQWMsRUFBRSxPQUFPO0lBQ3ZCLGNBQWMsRUFBRSxPQUFPO0lBQ3ZCLG9CQUFvQixFQUFFLE9BQU8sQ0FBRSx1SEFBdUg7O0lBQ3RKLFlBQVksRUFBRSxPQUFPO0lBQ3JCLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLFlBQVksRUFBRSxPQUFPO0lBQ3JCLGNBQWMsRUFBRSxPQUFPO0lBQ3ZCLGNBQWMsRUFBRSxPQUFPO0lBQ3ZCLGlCQUFpQixFQUFFLE9BQU87SUFDMUIsbUJBQW1CLEVBQUUsT0FBTztJQUM1QixrQkFBa0IsRUFBRSxPQUFPO0lBQzNCLGlCQUFpQixFQUFFLE9BQU87SUFDMUIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixxQkFBcUIsRUFBRSxPQUFPO0lBQzlCLG1CQUFtQixFQUFFLE9BQU87SUFDNUIsa0JBQWtCLEVBQUUsT0FBTztJQUMzQixpQkFBaUIsRUFBRSxPQUFPO0lBQzFCLGdCQUFnQixFQUFFLE9BQU87SUFDekIscUJBQXFCLEVBQUUsT0FBTztJQUM5QixtQkFBbUIsRUFBRSxPQUFPO0lBQzVCLGtCQUFrQixFQUFFLE9BQU87SUFDM0IsaUJBQWlCLEVBQUUsT0FBTztJQUMxQixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLHFCQUFxQixFQUFFLE9BQU87SUFDOUIsbUJBQW1CLEVBQUUsT0FBTztJQUM1QixrQkFBa0IsRUFBRSxPQUFPO0lBQzNCLGlCQUFpQixFQUFFLE9BQU87SUFDMUIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixxQkFBcUIsRUFBRSxPQUFPLENBQUUsNkhBQTZIOztJQUM3SixvQkFBb0IsRUFBRSxPQUFPO0lBQzdCLG1CQUFtQixFQUFFLE9BQU87SUFDNUIsb0JBQW9CLEVBQUUsT0FBTztJQUM3QixLQUFLLEVBQUUsT0FBTztJQUNkLFdBQVcsRUFBRSxFQUFFO0lBQ2YsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsYUFBYSxFQUFFLE9BQU87SUFDdEIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsV0FBVyxFQUFFLE9BQU87SUFDcEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsV0FBVyxFQUFFLE9BQU87SUFDcEIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsY0FBYyxFQUFFLE9BQU87SUFDdkIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsWUFBWSxFQUFFLE9BQU87SUFDckIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLGdCQUFnQixFQUFFLE9BQU87SUFDekIsZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLFlBQVksRUFBRSxPQUFPO0lBQ3JCLFlBQVksRUFBRSxPQUFPO0lBQ3JCLFlBQVksRUFBRSxPQUFPO0lBQ3JCLFlBQVksRUFB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

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_twosComplement_js__ = __webpack_require__(2);
/* global SharedArrayBuffer */

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
        offsetX = __WEBPACK_IMPORTED_MODULE_0__util_twosComplement_js__["a" /* default */].from8(offsetX);
        offsetY = __WEBPACK_IMPORTED_MODULE_0__util_twosComplement_js__["a" /* default */].from8(offsetY);
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
        offsetX = __WEBPACK_IMPORTED_MODULE_0__util_twosComplement_js__["a" /* default */].from8(offsetX);
        offsetY = __WEBPACK_IMPORTED_MODULE_0__util_twosComplement_js__["a" /* default */].from8(offsetY);
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
/* harmony default export */ __webpack_exports__["a"] = Screen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NyZWVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2NyZWVuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhCQUE4QjtBQUM5QixPQUFPLGNBQWMsTUFBTSwyQkFBMkIsQ0FBQztBQUV2RDtJQUNJLGdCQUFZLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQTBFO1lBQTFFLDRCQUEwRSxFQUF4RSxjQUFjLEVBQWQsbUNBQWMsRUFBRSxjQUFjLEVBQWQsbUNBQWMsRUFBRSw2QkFBaUMsRUFBakMsc0RBQWlDO1FBQ2pHLElBQUksS0FBSyxHQUFHLEdBQUcsRUFBRSxNQUFNLEdBQUcsR0FBRyxFQUFFLE1BQU0sR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUVoRSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUkscUJBQXFCLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUV0QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxQyxJQUFJLENB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R0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUM7WUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFCLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDLENBQUM7SUFDTixDQUFDO0lBRUQsNEJBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUNWLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTVCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFF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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmFlZmZhZmEzYTI5YzU4Nzk5MTc/MTU0MioiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvaGV4VXRpbHMuanM/ZWM0YyoiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvbG9nLmpzP2UyNTQqIiwid2VicGFjazovLy8uLi91dGlsL3R3b3NDb21wbGVtZW50LmpzP2ZkOGIqIiwid2VicGFjazovLy8uLi9jb3JlL01lbW9yeS5qcz82Y2JjKiIsIndlYnBhY2s6Ly8vLi4vd29ya2Vycy9TY3JlZW5Xb3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvbWVtb3J5TGF5b3V0LmpzP2RlMDcqIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanM/MzY5OCoiLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvU2NyZWVuLmpzP2JlMTEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0EsZ0NBQWdDLGlCQUFpQjtBQUNqRCxnQ0FBZ0MsZUFBZTtBQUMvQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxnQ0FBZ0MsZUFBZTtBQUMvQztBQUNBLEtBQUs7QUFDTDtBQUNBLGdDQUFnQyxlQUFl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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyx1bFM7Ozs7Ozs7QUNuVjNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7Ozs7QUNwQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFDdkM7QUFDQSxvQ0FBb0M7QUFDcEMsMEJBQTBCLFVBQVU7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGNBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0U7QUFDcEUsOENBQThDO0FBQzlDLGdEQUFnRDtBQUNoRCwyQ0FBMkM7QUFDM0MseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUMsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZ0JBQWdCO0FBQ2pELGlDQUFpQyxnQkFBZ0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELFNBQVM7QUFDekQsbURBQW1ELFNBQVM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFVBQVU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsVUFBVTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxRQUFRO0FBQzlEO0FBQ0EsMERBQTBELFFBQVE7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUM7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLFFBQVE7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUMseUNBQXlDLFFBQVE7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxRQUFRO0FBQzlDLHlDQUF5QyxRQUFRO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsVUFBVTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUM7QUFDQSxtQ0FBbUMsNEJBQTRCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSwyQ0FBMkMsMnd6QiIsImZpbGUiOiJTY3JlZW5Xb3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYmFlZmZhZmEzYTI5YzU4Nzk5MTciLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgdG9IZXg6IGZ1bmN0aW9uICh2LCBmb3JtYXQsIHByZWZpeCkge1xuICAgICAgICBpZiAoZm9ybWF0ID09PSB2b2lkIDApIHsgZm9ybWF0ID0gXCIwMDAwXCI7IH1cbiAgICAgICAgaWYgKHByZWZpeCA9PT0gdm9pZCAwKSB7IHByZWZpeCA9IFwiMHhcIjsgfVxuICAgICAgICB2YXIgaGV4VmFsdWUgPSAodiA9PT0gdW5kZWZpbmVkID8gXCIwXCIgOiB2KS50b1N0cmluZygxNik7XG4gICAgICAgIGhleFZhbHVlID0gZm9ybWF0LnN1YnN0cigwLCBmb3JtYXQubGVuZ3RoIC0gaGV4VmFsdWUubGVuZ3RoKSArIGhleFZhbHVlO1xuICAgICAgICByZXR1cm4gXCJcIiArIHByZWZpeCArIGhleFZhbHVlO1xuICAgIH0sXG4gICAgdG9IZXgyOiBmdW5jdGlvbiAodiwgcHJlZml4KSB7XG4gICAgICAgIGlmIChwcmVmaXggPT09IHZvaWQgMCkgeyBwcmVmaXggPSBcIjB4XCI7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMudG9IZXgodiwgXCIwMFwiLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgdG9IZXg0OiBmdW5jdGlvbiAodiwgcHJlZml4KSB7XG4gICAgICAgIGlmIChwcmVmaXggPT09IHZvaWQgMCkgeyBwcmVmaXggPSBcIjB4XCI7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMudG9IZXgodiwgXCIwMDAwXCIsIHByZWZpeCk7XG4gICAgfSxcbiAgICB0b0hleDU6IGZ1bmN0aW9uICh2LCBwcmVmaXgpIHtcbiAgICAgICAgaWYgKHByZWZpeCA9PT0gdm9pZCAwKSB7IHByZWZpeCA9IFwiMHhcIjsgfVxuICAgICAgICByZXR1cm4gdGhpcy50b0hleCh2LCBcIjAwMDAwXCIsIHByZWZpeCk7XG4gICAgfSxcbiAgICB0b0hleDg6IGZ1bmN0aW9uICh2LCBwcmVmaXgpIHtcbiAgICAgICAgaWYgKHByZWZpeCA9PT0gdm9pZCAwKSB7IHByZWZpeCA9IFwiMHhcIjsgfVxuICAgICAgICByZXR1cm4gdGhpcy50b0hleCh2LCBcIjAwMDAwMDAwXCIsIHByZWZpeCk7XG4gICAgfSxcbiAgICBieXRlQXJyYXlUb0hleDogZnVuY3Rpb24gKGFyciwgcHJlZml4KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChwcmVmaXggPT09IHZvaWQgMCkgeyBwcmVmaXggPSBcIlwiOyB9XG4gICAgICAgIHJldHVybiBhcnIubWFwKGZ1bmN0aW9uIChiKSB7IHJldHVybiBfdGhpcy50b0hleDIoYiwgcHJlZml4KTsgfSkuam9pbihcIiBcIik7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFHVjRWWFJwYkhNdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUpvWlhoVmRHbHNjeTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeGxRVUZsTzBsQlExZ3NTMEZCU3l4WlFVRkRMRU5CUVVNc1JVRkJSU3hOUVVGbExFVkJRVVVzVFVGQllUdFJRVUU1UWl4MVFrRkJRU3hGUVVGQkxHVkJRV1U3VVVGQlJTeDFRa0ZCUVN4RlFVRkJMR0ZCUVdFN1VVRkRia01zU1VGQlNTeFJRVUZSTEVkQlFVY3NRMEZCUXl4RFFVRkRMRXRCUVVzc1UwRkJVeXhIUVVGSExFZEJRVWNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03VVVGRGVFUXNVVUZCVVN4SFFVRkhMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eEZRVUZGTEUxQlFVMHNRMEZCUXl4TlFVRk5MRWRCUVVjc1VVRkJVU3hEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEZGQlFWRXNRMEZCUXp0UlFVTjRSU3hOUVVGTkxFTkJRVU1zUzBGQlJ5eE5RVUZOTEVkQlFVY3NVVUZCVlN4RFFVRkRPMGxCUTJ4RExFTkJRVU03U1VGRFJDeE5RVUZOTEZsQlFVTXNRMEZCUXl4RlFVRkZMRTFCUVdFN1VVRkJZaXgxUWtGQlFTeEZRVUZCTEdGQlFXRTdVVUZEYmtJc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWxCUVVrc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF6dEpRVU4yUXl4RFFVRkRPMGxCUTBRc1RVRkJUU3haUVVGRExFTkJRVU1zUlVGQlJTeE5RVUZoTzFGQlFXSXNkVUpCUVVFc1JVRkJRU3hoUVVGaE8xRkJRMjVDTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUlVGQlJTeE5RVUZOTEVWQlFVVXNUVUZCVFN4RFFVRkRMRU5CUVVNN1NVRkRla01zUTBGQlF6dEpRVU5FTEUxQlFVMHNXVUZCUXl4RFFVRkRMRVZCUVVVc1RVRkJZVHRSUVVGaUxIVkNRVUZCTEVWQlFVRXNZVUZCWVR0UlFVTnVRaXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRVZCUVVVc1QwRkJUeXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzBsQlF6RkRMRU5CUVVNN1NVRkRSQ3hOUVVGTkxGbEJRVU1zUTBGQlF5eEZRVUZGTEUxQlFXRTdVVUZCWWl4MVFrRkJRU3hGUVVGQkxHRkJRV0U3VVVGRGJrSXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eEZRVUZGTEZWQlFWVXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVNM1F5eERRVUZETzBsQlEwUXNZMEZCWXl4WlFVRkRMRWRCUVVjc1JVRkJSU3hOUVVGWE8xRkJRUzlDTEdsQ1FVVkRPMUZCUm0xQ0xIVkNRVUZCTEVWQlFVRXNWMEZCVnp0UlFVTXpRaXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4VlFVRkJMRU5CUVVNc1NVRkJTU3hQUVVGQkxFdEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RlFVRkZMRTFCUVUwc1EwRkJReXhGUVVGMFFpeERRVUZ6UWl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzBsQlF6RkVMRU5CUVVNN1EwRkRTaXhEUVVGREluMD1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi91dGlsL2hleFV0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgX2xvZyA9IFtdO1xuLyoqXG4gKiBsb2cgaW5mb3JtYXRpb24gdG8gdGhlIGNvbnNvbGUgLS0gd29ya3MgZm9yIHRoZSBicm93c2VyIG9yIGluIGEgbm9kZSBlbnZpcm9ubWVudFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgICAgICBkYXRhIHRvIGxvZ1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9nKCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBfbG9nLnVuc2hpZnQoYXJncy5qb2luKFwiIFwiKSk7XG4gICAgICAgIGlmIChfbG9nLmxlbmd0aCA+IDI0KSB7XG4gICAgICAgICAgICBfbG9nLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nXCIpLnRleHRDb250ZW50ID0gX2xvZy5qb2luKFN0cmluZy5mcm9tQ2hhckNvZGUoMTMpICsgU3RyaW5nLmZyb21DaGFyQ29kZSgxMCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYXJncy5qb2luKFwiIFwiKSk7XG4gICAgfVxufVxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW5kb3cubG9nID0gbG9nO1xufVxuaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBnbG9iYWwubG9nID0gbG9nO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYkc5bkxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpYkc5bkxtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCTEVsQlFVa3NTVUZCU1N4SFFVRkhMRVZCUVVVc1EwRkJRenRCUVVWa096czdPenRIUVV0SE8wRkJRMGdzVFVGQlRTeERRVUZETEU5QlFVODdTVUZCWXl4alFVRlBPMU5CUVZBc1ZVRkJUeXhGUVVGUUxIRkNRVUZQTEVWQlFWQXNTVUZCVHp0UlFVRlFMSGxDUVVGUE96dEpRVU12UWl4RlFVRkZMRU5CUVVNc1EwRkJReXhQUVVGUExFMUJRVTBzUzBGQlN5eFhRVUZYTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTJoRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlF6ZENMRVZCUVVVc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOMlFpeEpRVUZKTEVOQlFVTXNSMEZCUnl4RlFVRkZMRU5CUVVNN1VVRkRXQ3hEUVVGRE8xRkJRMFFzVVVGQlVTeERRVUZETEdOQlFXTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhYUVVGWExFZEJRVWNzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1dVRkJXU3hEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZITEUxQlFVMHNRMEZCUXl4WlFVRlpMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU01Unl4RFFVRkRPMGxCUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRFNpeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTm9ReXhEUVVGRE8wRkJRMHdzUTBGQlF6dEJRVU5FTEVWQlFVVXNRMEZCUXl4RFFVRkRMRTlCUVU4c1RVRkJUU3hMUVVGTExGZEJRVmNzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEYUVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUjBGQlJ5eEhRVUZITEVOQlFVTTdRVUZEY2tJc1EwRkJRenRCUVVORUxFVkJRVVVzUTBGQlF5eERRVUZETEU5QlFVOHNUVUZCVFN4TFFVRkxMRmRCUVZjc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRGFFTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1IwRkJSeXhIUVVGSExFTkJRVU03UVVGRGNrSXNRMEZCUXlKOVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3V0aWwvbG9nLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgZnJvbTg6IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiAtKG4gJiAweDgwKSArIChuICYgMHg3Rik7XG4gICAgfSxcbiAgICBmcm9tMTY6IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiAtKG4gJiAweDgwMDApICsgKG4gJiAweDdGRkYpO1xuICAgIH0sXG4gICAgdG84OiBmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbiAmIDB4RkY7XG4gICAgfSxcbiAgICB0bzE2OiBmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbiAmIDB4RkZGRjtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEhkdmMwTnZiWEJzWlcxbGJuUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lKMGQyOXpRMjl0Y0d4bGJXVnVkQzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeGxRVUZsTzBsQlExZ3NTMEZCU3l4WlFVRkRMRU5CUVVNN1VVRkRTQ3hOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTndReXhEUVVGRE8wbEJRMFFzVFVGQlRTeFpRVUZETEVOQlFVTTdVVUZEU2l4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU1zUTBGQlF6dEpRVU40UXl4RFFVRkRPMGxCUTBRc1IwRkJSeXhaUVVGRExFTkJRVU03VVVGRFJDeE5RVUZOTEVOQlFVTXNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJRenRKUVVOd1FpeERRVUZETzBsQlEwUXNTVUZCU1N4WlFVRkRMRU5CUVVNN1VVRkRSaXhOUVVGTkxFTkJRVU1zUTBGQlF5eEhRVUZITEUxQlFVMHNRMEZCUXp0SlFVTjBRaXhEUVVGRE8wTkJRMG9zUTBGQlFTSjlcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi91dGlsL3R3b3NDb21wbGVtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvKiBnbG9iYWxzIFNoYXJlZEFycmF5QnVmZmVyICovXG5pbXBvcnQgbG9nIGZyb20gXCIuLi91dGlsL2xvZy5qc1wiO1xuaW1wb3J0IGhleFV0aWxzIGZyb20gXCIuLi91dGlsL2hleFV0aWxzLmpzXCI7XG52YXIgTWVtb3J5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZW1vcnkobGF5b3V0LCBfYSkge1xuICAgICAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8ge30gOiBfYSwgX2MgPSBfYi5zaGFyZWQsIHNoYXJlZCA9IF9jID09PSB2b2lkIDAgPyBmYWxzZSA6IF9jLCBfZCA9IF9iLndpdGhTaGFyZWRBcnJheUJ1ZmZlciwgd2l0aFNoYXJlZEFycmF5QnVmZmVyID0gX2QgPT09IHZvaWQgMCA/IHVuZGVmaW5lZCA6IF9kO1xuICAgICAgICB0aGlzLl9wcm90ZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2hhcmVkID0gQm9vbGVhbihzaGFyZWQgfHwgd2l0aFNoYXJlZEFycmF5QnVmZmVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBsYXlvdXQ7XG4gICAgICAgIHRoaXMuX2J1ZiA9IHdpdGhTaGFyZWRBcnJheUJ1ZmZlciB8fCBuZXcgKHNoYXJlZCA/IFNoYXJlZEFycmF5QnVmZmVyIDogQXJyYXlCdWZmZXIpKGxheW91dC5zaXplICogMTAyNCk7XG4gICAgICAgIHRoaXMuX21lbSA9IG5ldyBVaW50OEFycmF5KHRoaXMuX2J1Zik7XG4gICAgICAgIHRoaXMuX3JvbSA9IG5ldyBVaW50OEFycmF5KHRoaXMuX2J1ZiwgbGF5b3V0LnJvbVN0YXJ0LCBsYXlvdXQucm9tTGVuZ3RoKTtcbiAgICAgICAgdGhpcy5yZXNldFN0YXRzKCk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNZW1vcnkucHJvdG90eXBlLCBcInNoYXJlZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NoYXJlZDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1lbW9yeS5wcm90b3R5cGUsIFwic2hhcmVkQXJyYXlCdWZmZXJcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNoYXJlZCA/IHRoaXMuX2J1ZiA6IHVuZGVmaW5lZDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1lbW9yeS5wcm90b3R5cGUsIFwicHJvdGVjdGVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJvdGVjdGVkO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB0aGlzLl9wcm90ZWN0ZWQgPSB2O1xuICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb20gPSB0aGlzLmNvcHlGcm9tUmFuZ2UodGhpcy5sYXlvdXQucm9tU3RhcnQsIHRoaXMubGF5b3V0LnJvbUxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE1lbW9yeS5wcm90b3R5cGUucmVzZXRTdGF0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zdGF0cyA9IHtcbiAgICAgICAgICAgIHJlYWRzVG90YWw6IDAsXG4gICAgICAgICAgICBieXRlUmVhZHNUb3RhbDogMCxcbiAgICAgICAgICAgIHdvcmRSZWFkc1RvdGFsOiAwLFxuICAgICAgICAgICAgd3JpdGVzVG90YWw6IDAsXG4gICAgICAgICAgICBieXRlV3JpdGVzVG90YWw6IDAsXG4gICAgICAgICAgICB3b3JkV3JpdGVzVG90YWw6IDAsXG4gICAgICAgICAgICBsYXN0UmVhZEFkZHI6IDAsXG4gICAgICAgICAgICBsYXN0V3JpdGVBZGRyOiAwLFxuICAgICAgICAgICAgbGFzdFZhbHVlUmVhZDogMCxcbiAgICAgICAgICAgIGxhc3RWYWx1ZVdyaXR0ZW46IDAsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBNZW1vcnkucHJvdG90eXBlLmR1bXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZyhcIm1lbSBzdGF0cyB8IHJlYWRzICA4OiBcIiArIHRoaXMuc3RhdHMuYnl0ZVJlYWRzVG90YWwgKyBcIiAgMTY6IFwiICsgdGhpcy5zdGF0cy53b3JkUmVhZHNUb3RhbCArIFwiICBBbGw6IFwiICsgdGhpcy5zdGF0cy5yZWFkc1RvdGFsKTtcbiAgICAgICAgbG9nKFwibWVtIHN0YXRzIHwgd3JpdGVzIDg6IFwiICsgdGhpcy5zdGF0cy5ieXRlV3JpdGVzVG90YWwgKyBcIiAgMTY6IFwiICsgdGhpcy5zdGF0cy53b3JkV3JpdGVzVG90YWwgKyBcIiAgQWxsOiBcIiArIHRoaXMuc3RhdHMud3JpdGVzVG90YWwpO1xuICAgICAgICBsb2coXCJtZW0gc3RhdHMgfCBsYXN0IHJlYWQ6IFwiICsgaGV4VXRpbHMudG9IZXg0KHRoaXMuc3RhdHMubGFzdFZhbHVlUmVhZCkgKyBcIkBcIiArIGhleFV0aWxzLnRvSGV4NCh0aGlzLnN0YXRzLmxhc3RSZWFkQWRkcikgKyBcIiAgd3JpdGU6IFwiICsgaGV4VXRpbHMudG9IZXg0KHRoaXMuc3RhdHMubGFzdFZhbHVlV3JpdHRlbikgKyBcIkBcIiArIGhleFV0aWxzLnRvSGV4NCh0aGlzLnN0YXRzLmxhc3RXcml0ZUFkZHIpKTtcbiAgICB9O1xuICAgIE1lbW9yeS5wcm90b3R5cGUubG9hZEZyb21KUyA9IGZ1bmN0aW9uIChkYXRhLCBhZGRyT3ZlcnJpZGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGFkZHIgPSBkYXRhLmFkZHI7XG4gICAgICAgIGlmIChhZGRyT3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIGFkZHIgPSBhZGRyT3ZlcnJpZGU7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5kYXRhLmZvckVhY2goZnVuY3Rpb24gKHYsIGkpIHtcbiAgICAgICAgICAgIF90aGlzLnBva2UoaSArIGFkZHIsIHYpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qXG4gICAgICBsb2FkRnJvbUJJTihiaW4pIHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgfVxuICAgICovXG4gICAgTWVtb3J5LnByb3RvdHlwZS5wb2tlID0gZnVuY3Rpb24gKGFkZHIsIHZhbCkge1xuICAgICAgICBhZGRyICY9IDB4M0ZGRkY7XG4gICAgICAgIHZhciB2ID0gKHZhbCAmIDB4RkYpO1xuICAgICAgICB0aGlzLl9tZW1bYWRkcl0gPSB2O1xuICAgICAgICAvKlxuICAgICAgICB0aGlzLnN0YXRzLmxhc3RWYWx1ZVdyaXR0ZW4gPSB2O1xuICAgICAgICB0aGlzLnN0YXRzLndyaXRlc1RvdGFsKys7XG4gICAgICAgIHRoaXMuc3RhdHMuYnl0ZVdyaXRlc1RvdGFsKys7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFZhbHVlV3JpdHRlbiA9ICh2YWwgJiAweEZGKTtcbiAgICAgICAgdGhpcy5zdGF0cy5sYXN0V3JpdGVBZGRyID0gYWRkcjtcbiAgICAgICAgKi9cbiAgICB9O1xuICAgIE1lbW9yeS5wcm90b3R5cGUucG9rZTE2ID0gZnVuY3Rpb24gKGFkZHIsIHZhbCkge1xuICAgICAgICBhZGRyICY9IDB4M0ZGRkY7XG4gICAgICAgIHZhciB2ID0gKHZhbCAmIDB4RkZGRik7XG4gICAgICAgIHRoaXMuX21lbVthZGRyXSA9ICh2ICYgMHhGRjAwKSA+PiA4O1xuICAgICAgICB0aGlzLl9tZW1bYWRkciArIDFdID0gKHYgJiAweDAwRkYpO1xuICAgICAgICAvKlxuICAgICAgICB0aGlzLnN0YXRzLndyaXRlc1RvdGFsKys7XG4gICAgICAgIHRoaXMuc3RhdHMud29yZFdyaXRlc1RvdGFsKys7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFZhbHVlV3JpdHRlbiA9IHY7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFdyaXRlQWRkciA9IGFkZHI7XG4gICAgICAgICovXG4gICAgfTtcbiAgICBNZW1vcnkucHJvdG90eXBlLnBva2UzMiA9IGZ1bmN0aW9uIChhZGRyLCB2YWwpIHtcbiAgICAgICAgYWRkciAmPSAweDNGRkZGO1xuICAgICAgICB2YXIgdiA9ICh2YWwgJiAweEZGRkZGRkZGKTtcbiAgICAgICAgdGhpcy5fbWVtW2FkZHJdID0gKHYgJiAweEZGMDAwMDAwKSA+PiAyNDtcbiAgICAgICAgdGhpcy5fbWVtW2FkZHIgKyAxXSA9ICh2ICYgMHgwMEZGMDAwMCkgPj4gMTY7XG4gICAgICAgIHRoaXMuX21lbVthZGRyICsgMl0gPSAodiAmIDB4MDAwMEZGMDApID4+IDg7XG4gICAgICAgIHRoaXMuX21lbVthZGRyICsgM10gPSAodiAmIDB4MDAwMDAwRkYpO1xuICAgICAgICAvKlxuICAgICAgICB0aGlzLnN0YXRzLndyaXRlc1RvdGFsKys7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFZhbHVlV3JpdHRlbiA9IHY7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFdyaXRlQWRkciA9IGFkZHI7XG4gICAgICAgICovXG4gICAgfTtcbiAgICBNZW1vcnkucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiAoYWRkcikge1xuICAgICAgICBhZGRyICY9IDB4M0ZGRkY7XG4gICAgICAgIHZhciB2ID0gdGhpcy5fbWVtW2FkZHJdO1xuICAgICAgICBpZiAodGhpcy5fcHJvdGVjdGVkKSB7XG4gICAgICAgICAgICBpZiAoYWRkciA+PSB0aGlzLmxheW91dC5yb21TdGFydCAmJiBhZGRyIDw9IHRoaXMubGF5b3V0LnJvbUVuZCkge1xuICAgICAgICAgICAgICAgIHYgPSB0aGlzLl9yb21bYWRkciAtIHRoaXMubGF5b3V0LnJvbVN0YXJ0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKlxuICAgICAgICB0aGlzLnN0YXRzLnJlYWRzVG90YWwrKztcbiAgICAgICAgdGhpcy5zdGF0cy5ieXRlUmVhZHNUb3RhbCsrO1xuICAgICAgICB0aGlzLnN0YXRzLmxhc3RWYWx1ZVJlYWQgPSB2O1xuICAgICAgICB0aGlzLnN0YXRzLmxhc3RSZWFkQWRkciA9IGFkZHI7XG4gICAgICAgICovXG4gICAgICAgIHJldHVybiB2O1xuICAgIH07XG4gICAgTWVtb3J5LnByb3RvdHlwZS5wZWVrMTYgPSBmdW5jdGlvbiAoYWRkcikge1xuICAgICAgICBhZGRyICY9IDB4M0ZGRkY7XG4gICAgICAgIHZhciB2ID0gKHRoaXMucGVlayhhZGRyKSA8PCA4KSB8IHRoaXMucGVlayhhZGRyICsgMSk7XG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuc3RhdHMucmVhZHNUb3RhbCsrO1xuICAgICAgICB0aGlzLnN0YXRzLndvcmRSZWFkc1RvdGFsKys7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFZhbHVlUmVhZCA9IHY7XG4gICAgICAgIHRoaXMuc3RhdHMubGFzdFJlYWRBZGRyID0gYWRkcjtcbiAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfTtcbiAgICBNZW1vcnkucHJvdG90eXBlLnBlZWszMiA9IGZ1bmN0aW9uIChhZGRyKSB7XG4gICAgICAgIGFkZHIgJj0gMHgzRkZGRjtcbiAgICAgICAgdmFyIHYgPSAodGhpcy5wZWVrKGFkZHIpIDw8IDI0KSB8ICh0aGlzLnBlZWsoYWRkciArIDEpIDw8IDE2KSB8ICh0aGlzLnBlZWsoYWRkciArIDIpIDw8IDgpIHwgKHRoaXMucGVlayhhZGRyICsgMykpO1xuICAgICAgICAvKlxuICAgICAgICB0aGlzLnN0YXRzLnJlYWRzVG90YWwrKztcbiAgICAgICAgdGhpcy5zdGF0cy53b3JkUmVhZHNUb3RhbCsrO1xuICAgICAgICB0aGlzLnN0YXRzLmxhc3RWYWx1ZVJlYWQgPSB2O1xuICAgICAgICB0aGlzLnN0YXRzLmxhc3RSZWFkQWRkciA9IGFkZHI7XG4gICAgICAgICovXG4gICAgICAgIHJldHVybiB2O1xuICAgIH07XG4gICAgTWVtb3J5LnByb3RvdHlwZS5yYW5nZSA9IGZ1bmN0aW9uIChhZGRyLCBsZW4pIHtcbiAgICAgICAgaWYgKGFkZHIgKyBsZW4gPD0gdGhpcy5sYXlvdXQubWVtdG9wKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodGhpcy5fYnVmLCBhZGRyLCBsZW4pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIG92ZXJmbG93ID0gKGFkZHIgKyBsZW4pIC0gdGhpcy5sYXlvdXQubWVtdG9wO1xuICAgICAgICAgICAgbGVuIC09IG92ZXJmbG93O1xuICAgICAgICAgICAgaWYgKGxlbiA8IDApIHtcbiAgICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHRoaXMuX2J1ZiwgYWRkciwgbGVuKTsgLy8uY29uY2F0KHRoaXMuY29weUZyb21SYW5nZSgwLCBvdmVyZmxvdykpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNZW1vcnkucHJvdG90eXBlLmNvcHlGcm9tUmFuZ2UgPSBmdW5jdGlvbiAoYWRkciwgbGVuKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LmZyb20odGhpcy5yYW5nZShhZGRyLCBsZW4pKTtcbiAgICB9O1xuICAgIE1lbW9yeS5wcm90b3R5cGUuY29weVdpdGhpbiA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8ge30gOiBfYSwgc3JjID0gX2Iuc3JjLCBkZXN0ID0gX2IuZGVzdCwgbGVuID0gX2IubGVuO1xuICAgICAgICBpZiAoc3JjICsgbGVuID4gdGhpcy5sYXlvdXQubWVtdG9wIHx8XG4gICAgICAgICAgICBkZXN0ICsgbGVuID4gdGhpcy5sYXlvdXQubWVtdG9wKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWVtLmNvcHlXaXRoaW4oZGVzdCwgc3JjLCBzcmMgKyBsZW4pO1xuICAgIH07XG4gICAgTWVtb3J5LnByb3RvdHlwZS5maWxsV2l0aGluID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBfYiA9IF9hID09PSB2b2lkIDAgPyB7fSA6IF9hLCB2YWx1ZSA9IF9iLnZhbHVlLCBhZGRyID0gX2IuYWRkciwgbGVuID0gX2IubGVuO1xuICAgICAgICBpZiAobGVuICsgYWRkciA+IHRoaXMubGF5b3V0Lm1lbXRvcCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21lbS5maWxsKHZhbHVlICYgMHhGRiwgYWRkciwgYWRkciArIGxlbik7XG4gICAgfTtcbiAgICBNZW1vcnkucHJvdG90eXBlLnNldFdpdGhpbiA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8ge30gOiBfYSwgZGF0YSA9IF9iLmRhdGEsIGFkZHIgPSBfYi5hZGRyO1xuICAgICAgICBpZiAoYWRkciArIChkYXRhLmxlbmd0aCkgPiB0aGlzLmxheW91dC5tZW10b3ApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tZW0uc2V0KGRhdGEsIGFkZHIpO1xuICAgIH07XG4gICAgTWVtb3J5LnByb3RvdHlwZS5yYW5nZTMyID0gZnVuY3Rpb24gKGFkZHIsIGxlbikge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQzMkFycmF5KHRoaXMuX2J1ZiwgYWRkciwgbGVuKTtcbiAgICB9O1xuICAgIE1lbW9yeS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5wcm90ZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAodGhpcy5sYXlvdXQuc2l6ZSAqIDEwMjQpOyBpKyspIHtcbiAgICAgICAgICAgIC8vIHNpbXVsYXRlIG9sZC1zdHlsZSBtZW1vcnkgYmVpbmcgcmFuZG9tIGF0IGJvb3RcbiAgICAgICAgICAgIHRoaXMucG9rZShpLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB3ZSBuZWVkIHRocmVlIFJFVHMgYXQga25vd24gaW1wb3J0YW50IHZlY3RvcnNcbiAgICAgICAgWzB4MEZFMDAsIDB4MEZGMDAsIDB4MEZGRkZdLmZvckVhY2goZnVuY3Rpb24gKGFkZHIpIHtcbiAgICAgICAgICAgIF90aGlzLnBva2UoYWRkciwgMHhGRik7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBBbGwgdHJhcCB2ZWN0b3JzIGluaXRpYWxseSBwb2ludCBhdCAweEZGRkZcbiAgICAgICAgZm9yICh2YXIgYWRkciA9IDA7IGFkZHIgPCA1MTI7IGFkZHIrKykge1xuICAgICAgICAgICAgdGhpcy5wb2tlKGFkZHIsIDB4RkYpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGJ1dCB3ZSBkbyBuZWVkIGEgdmFsaWQgRlJBTUUgYW5kIFJFU0VUIHZlY3RvclxuICAgICAgICB0aGlzLnBva2UxNigweDAwMDAwLCAweEZGMDApO1xuICAgICAgICB0aGlzLnBva2UxNigweDAwMUUwLCAweEZFMDApO1xuICAgICAgICAvLyBsb2FkaW5nIGJvb3QgUk9NIGlzIHRoZSByZXNwb25zaWJpbGl0eSBvZiBvdXIgb3duZXIuXG4gICAgfTtcbiAgICByZXR1cm4gTWVtb3J5O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE1lbW9yeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVRXVnRiM0o1TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lUV1Z0YjNKNUxtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCTEN0Q1FVRXJRanRCUVVVdlFpeFBRVUZQTEVkQlFVY3NUVUZCVFN4blFrRkJaMElzUTBGQlF6dEJRVU5xUXl4UFFVRlBMRkZCUVZFc1RVRkJUU3h4UWtGQmNVSXNRMEZCUXp0QlFVVXpRenRKUVVORkxHZENRVUZaTEUxQlFVMHNSVUZCUlN4RlFVRXdSRHRaUVVFeFJDdzBRa0ZCTUVRc1JVRkJlRVFzWTBGQll5eEZRVUZrTEcxRFFVRmpMRVZCUVVVc05rSkJRV2xETEVWQlFXcERMSE5FUVVGcFF6dFJRVU55UlN4SlFVRkpMRU5CUVVNc1ZVRkJWU3hIUVVGSExFdEJRVXNzUTBGQlF6dFJRVU40UWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFOUJRVThzUTBGQlF5eE5RVUZOTEVsQlFVa3NjVUpCUVhGQ0xFTkJRVU1zUTBGQlF6dFJRVU40UkN4SlFVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExFMUJRVTBzUTBGQlF6dFJRVU55UWl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExIRkNRVUZ4UWl4SlFVRkpMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzYVVKQlFXbENMRWRCUVVjc1YwRkJWeXhEUVVGRExFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVONFJ5eEpRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWxCUVVrc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTjBReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEVsQlFVa3NWVUZCVlN4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzVFVGQlRTeERRVUZETEZGQlFWRXNSVUZCUlN4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03VVVGRGVrVXNTVUZCU1N4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRE8wbEJRM0JDTEVOQlFVTTdTVUZGUkN4elFrRkJTU3d3UWtGQlRUdGhRVUZXTzFsQlEwVXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU03VVVGRGRFSXNRMEZCUXpzN08wOUJRVUU3U1VGRlJDeHpRa0ZCU1N4eFEwRkJhVUk3WVVGQmNrSTdXVUZEUlN4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRk5CUVZNc1EwRkJRenRSUVVNM1F5eERRVUZET3pzN1QwRkJRVHRKUVVWRUxITkNRVUZKTERaQ1FVRlRPMkZCUVdJN1dVRkRSU3hOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXp0UlFVTjZRaXhEUVVGRE8yRkJSVVFzVlVGQll5eERRVUZETzFsQlEySXNTVUZCU1N4RFFVRkRMRlZCUVZVc1IwRkJSeXhEUVVGRExFTkJRVU03V1VGRGNFSXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEVGl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eGhRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhSUVVGUkxFVkJRVVVzU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJRenRaUVVNNVJTeERRVUZETzFGQlEwZ3NRMEZCUXpzN08wOUJVRUU3U1VGVFJDd3lRa0ZCVlN4SFFVRldPMUZCUTBVc1NVRkJTU3hEUVVGRExFdEJRVXNzUjBGQlJ6dFpRVU5ZTEZWQlFWVXNSVUZCUlN4RFFVRkRPMWxCUTJJc1kwRkJZeXhGUVVGRkxFTkJRVU03V1VGRGFrSXNZMEZCWXl4RlFVRkZMRU5CUVVNN1dVRkRha0lzVjBGQlZ5eEZRVUZGTEVOQlFVTTdXVUZEWkN4bFFVRmxMRVZCUVVVc1EwRkJRenRaUVVOc1FpeGxRVUZsTEVWQlFVVXNRMEZCUXp0WlFVTnNRaXhaUVVGWkxFVkJRVVVzUTBGQlF6dFpRVU5tTEdGQlFXRXNSVUZCUlN4RFFVRkRPMWxCUTJoQ0xHRkJRV0VzUlVGQlJTeERRVUZETzFsQlEyaENMR2RDUVVGblFpeEZRVUZGTEVOQlFVTTdVMEZEY0VJc1EwRkJRenRKUVVOS0xFTkJRVU03U1VGRlJDeHhRa0ZCU1N4SFFVRktPMUZCUTBVc1IwRkJSeXhEUVVGRExESkNRVUY1UWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExHTkJRV01zWTBGQlV5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMR05CUVdNc1pVRkJWU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZWQlFWa3NRMEZCUXl4RFFVRkRPMUZCUXpOSUxFZEJRVWNzUTBGQlF5d3lRa0ZCZVVJc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eGxRVUZsTEdOQlFWTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhsUVVGbExHVkJRVlVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WFFVRmhMRU5CUVVNc1EwRkJRenRSUVVNNVNDeEhRVUZITEVOQlFVTXNORUpCUVRCQ0xGRkJRVkVzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhoUVVGaExFTkJRVU1zVTBGQlNTeFJRVUZSTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zV1VGQldTeERRVUZETEdsQ1FVRlpMRkZCUVZFc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4blFrRkJaMElzUTBGQlF5eFRRVUZKTEZGQlFWRXNRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eGhRVUZoTEVOQlFVY3NRMEZCUXl4RFFVRkRPMGxCUXpsT0xFTkJRVU03U1VGRlJDd3lRa0ZCVlN4SFFVRldMRlZCUVZjc1NVRkJTU3hGUVVGRkxGbEJRVms3VVVGQk4wSXNhVUpCVVVNN1VVRlFReXhKUVVGSkxFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRPMUZCUTNKQ0xFVkJRVVVzUTBGQlF5eERRVUZETEZsQlFWa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRha0lzU1VGQlNTeEhRVUZITEZsQlFWa3NRMEZCUXp0UlFVTjBRaXhEUVVGRE8xRkJRMFFzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1ZVRkJReXhEUVVGRExFVkJRVVVzUTBGQlF6dFpRVU55UWl4TFFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRla0lzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVEN4RFFVRkRPMGxCUlVRN096czdUVUZKUlR0SlFVVkdMSEZDUVVGSkxFZEJRVW9zVlVGQlN5eEpRVUZKTEVWQlFVVXNSMEZCUnp0UlFVTmFMRWxCUVVrc1NVRkJTU3hQUVVGUExFTkJRVU03VVVGRGFFSXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFZEJRVWNzU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEY2tJc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1VVRkZjRUk3T3pzN096dFZRVTFGTzBsQlEwb3NRMEZCUXp0SlFVVkVMSFZDUVVGTkxFZEJRVTRzVlVGQlR5eEpRVUZKTEVWQlFVVXNSMEZCUnp0UlFVTmtMRWxCUVVrc1NVRkJTU3hQUVVGUExFTkJRVU03VVVGRGFFSXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFZEJRVWNzVFVGQlRTeERRVUZETEVOQlFVTTdVVUZEZGtJc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEY0VNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFZEJRVWNzVFVGQlRTeERRVUZETEVOQlFVTTdVVUZGYmtNN096czdPMVZCUzBVN1NVRkRTaXhEUVVGRE8wbEJSVVFzZFVKQlFVMHNSMEZCVGl4VlFVRlBMRWxCUVVrc1JVRkJSU3hIUVVGSE8xRkJRMlFzU1VGQlNTeEpRVUZKTEU5QlFVOHNRMEZCUXp0UlFVTm9RaXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NSMEZCUnl4VlFVRlZMRU5CUVVNc1EwRkJRenRSUVVNelFpeEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEhRVUZITEZWQlFWVXNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVONlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSMEZCUnl4VlFVRlZMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU03VVVGRE4wTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWRCUVVjc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF6VkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhIUVVGSExGVkJRVlVzUTBGQlF5eERRVUZETzFGQlJYWkRPenM3TzFWQlNVVTdTVUZEU2l4RFFVRkRPMGxCUjBRc2NVSkJRVWtzUjBGQlNpeFZRVUZMTEVsQlFVazdVVUZEVUN4SlFVRkpMRWxCUVVrc1QwRkJUeXhEUVVGRE8xRkJRMmhDTEVsQlFVa3NRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEZUVJc1JVRkJSU3hEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRjRUlzUlVGQlJTeERRVUZETEVOQlFVTXNTVUZCU1N4SlFVRkpMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zVVVGQlVTeEpRVUZKTEVsQlFVa3NTVUZCU1N4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUXk5RUxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMWxCUXpkRExFTkJRVU03VVVGRFNDeERRVUZETzFGQlJVUTdPenM3TzFWQlMwVTdVVUZGUml4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMWdzUTBGQlF6dEpRVVZFTEhWQ1FVRk5MRWRCUVU0c1ZVRkJUeXhKUVVGSk8xRkJRMVFzU1VGQlNTeEpRVUZKTEU5QlFVOHNRMEZCUXp0UlFVTm9RaXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZGY2tRN096czdPMVZCUzBVN1VVRkZSaXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExZ3NRMEZCUXp0SlFVVkVMSFZDUVVGTkxFZEJRVTRzVlVGQlR5eEpRVUZKTzFGQlExUXNTVUZCU1N4SlFVRkpMRTlCUVU4c1EwRkJRenRSUVVOb1FpeEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVWdVNEczdPenM3VlVGTFJUdFJRVVZHTEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRXQ3hEUVVGRE8wbEJSVVFzYzBKQlFVc3NSMEZCVEN4VlFVRk5MRWxCUVVrc1JVRkJSU3hIUVVGSE8xRkJRMklzUlVGQlJTeERRVUZETEVOQlFVTXNTVUZCU1N4SFFVRkhMRWRCUVVjc1NVRkJTU3hKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRja01zVFVGQlRTeERRVUZETEVsQlFVa3NWVUZCVlN4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzU1VGQlNTeEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUXpsRExFTkJRVU03VVVGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0WlFVTk9MRWxCUVVrc1VVRkJVU3hIUVVGSExFTkJRVU1zU1VGQlNTeEhRVUZITEVkQlFVY3NRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETzFsQlEycEVMRWRCUVVjc1NVRkJTU3hSUVVGUkxFTkJRVU03V1VGRGFFSXNSVUZCUlN4RFFVRkRMRU5CUVVNc1IwRkJSeXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUVVNc1IwRkJSeXhIUVVGSExFTkJRVU1zUTBGQlF6dFpRVUZETEVOQlFVTTdXVUZEZWtJc1RVRkJUU3hEUVVGRExFbEJRVWtzVlVGQlZTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1NVRkJTU3hGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNNa05CUVRKRE8xRkJRekZHTEVOQlFVTTdTVUZEU0N4RFFVRkRPMGxCUlVRc09FSkJRV0VzUjBGQllpeFZRVUZqTEVsQlFVa3NSVUZCUlN4SFFVRkhPMUZCUTNKQ0xFMUJRVTBzUTBGQlF5eFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRhRVFzUTBGQlF6dEpRVVZFTERKQ1FVRlZMRWRCUVZZc1ZVRkJWeXhGUVVGMVFqdFpRVUYyUWl3MFFrRkJkVUlzUlVGQmNrSXNXVUZCUnl4RlFVRkZMR05CUVVrc1JVRkJSU3haUVVGSE8xRkJRM3BDTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWRCUVVjc1IwRkJSeXhIUVVGSExFZEJRVWNzU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5PMWxCUTJoRExFbEJRVWtzUjBGQlJ5eEhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEyeERMRTFCUVUwc1EwRkJRenRSUVVOVUxFTkJRVU03VVVGRFJDeEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhKUVVGSkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQlFVY3NSMEZCUnl4SFFVRkhMRU5CUVVNc1EwRkJRenRKUVVNM1F5eERRVUZETzBsQlJVUXNNa0pCUVZVc1IwRkJWaXhWUVVGWExFVkJRWGxDTzFsQlFYcENMRFJDUVVGNVFpeEZRVUYyUWl4blFrRkJTeXhGUVVGRkxHTkJRVWtzUlVGQlJTeFpRVUZITzFGQlF6TkNMRVZCUVVVc1EwRkJReXhEUVVGRExFZEJRVWNzUjBGQlJ5eEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEzQkRMRTFCUVUwc1EwRkJRenRSUVVOVUxFTkJRVU03VVVGRFJDeEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFZEJRVWNzU1VGQlNTeEZRVUZGTEVsQlFVa3NSVUZCUlN4SlFVRkpMRWRCUVVjc1IwRkJSeXhEUVVGRExFTkJRVU03U1VGRGFrUXNRMEZCUXp0SlFVVkVMREJDUVVGVExFZEJRVlFzVlVGQlZTeEZRVUZ0UWp0WlFVRnVRaXcwUWtGQmJVSXNSVUZCYWtJc1kwRkJTU3hGUVVGRkxHTkJRVWs3VVVGRGNFSXNSVUZCUlN4RFFVRkRMRU5CUVVNc1NVRkJTU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTTVReXhOUVVGTkxFTkJRVU03VVVGRFZDeERRVUZETzFGQlEwUXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMGxCUXpWQ0xFTkJRVU03U1VGRlJDeDNRa0ZCVHl4SFFVRlFMRlZCUVZFc1NVRkJTU3hGUVVGRkxFZEJRVWM3VVVGRFppeE5RVUZOTEVOQlFVTXNTVUZCU1N4WFFVRlhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeEpRVUZKTEVWQlFVVXNSMEZCUnl4RFFVRkRMRU5CUVVNN1NVRkRMME1zUTBGQlF6dEpRVVZFTEhGQ1FVRkpMRWRCUVVvN1VVRkJRU3hwUWtGMVFrTTdVVUYwUWtNc1NVRkJTU3hEUVVGRExGTkJRVk1zUjBGQlJ5eExRVUZMTEVOQlFVTTdVVUZEZGtJc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhGUVVGRkxFTkJRVU1zUlVGQlJTeEZRVUZGTEVOQlFVTTdXVUZEYmtRc2FVUkJRV2xFTzFsQlEycEVMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUlVGQlJTeEhRVUZITEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRhRVFzUTBGQlF6dFJRVVZFTEdkRVFVRm5SRHRSUVVOb1JDeERRVUZETEU5QlFVOHNSVUZCUlN4UFFVRlBMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU1zVDBGQlR5eERRVUZETEZWQlFVTXNTVUZCU1R0WlFVTjJReXhMUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVONFFpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVVklMRFpEUVVFMlF6dFJRVU0zUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFbEJRVWtzUjBGQlJ5eERRVUZETEVWQlFVVXNTVUZCU1N4SFFVRkhMRWRCUVVjc1JVRkJSU3hKUVVGSkxFVkJRVVVzUlVGQlJTeERRVUZETzFsQlEzUkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTNoQ0xFTkJRVU03VVVGRlJDeG5SRUZCWjBRN1VVRkRhRVFzU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBMRVZCUVVVc1RVRkJUU3hEUVVGRExFTkJRVU03VVVGRE4wSXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdVVUZGTjBJc2RVUkJRWFZFTzBsQlJYcEVMRU5CUVVNN1NVRnRRa2dzWVVGQlF6dEJRVUZFTEVOQlFVTXNRVUZxVUVRc1NVRnBVRU1pZlE9PVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2NvcmUvTWVtb3J5LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvKiBnbG9iYWxzIHNlbGYgKi9cbmltcG9ydCBTY3JlZW4gZnJvbSBcIi4uL2NvcmUvU2NyZWVuLmpzXCI7XG5pbXBvcnQgTWVtb3J5IGZyb20gXCIuLi9jb3JlL01lbW9yeS5qc1wiO1xuaW1wb3J0IG1lbW9yeUxheW91dCBmcm9tIFwiLi4vY29yZS9tZW1vcnlMYXlvdXQuanNcIjtcbnZhciBTY3JlZW5Xb3JrZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNjcmVlbldvcmtlcigpIHtcbiAgICAgICAgdGhpcy5zY3JlZW4gPSBuZXcgU2NyZWVuKG51bGwsIG51bGwsIG51bGwsIHtcbiAgICAgICAgICAgIHdvcmtlcjogdHJ1ZSxcbiAgICAgICAgICAgIHNoYXJlZDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgU2NyZWVuV29ya2VyLnByb3RvdHlwZS5zZXRTaGFyZWRNZW1vcnkgPSBmdW5jdGlvbiAoc2hhcmVkQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgdGhpcy5zY3JlZW4uX21lbW9yeSA9IG5ldyBNZW1vcnkobWVtb3J5TGF5b3V0LCB7XG4gICAgICAgICAgICBzaGFyZWQ6IHRydWUsXG4gICAgICAgICAgICB3aXRoU2hhcmVkQXJyYXlCdWZmZXI6IHNoYXJlZEFycmF5QnVmZmVyXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNjcmVlbi5fbGF5b3V0ID0gbWVtb3J5TGF5b3V0O1xuICAgIH07XG4gICAgU2NyZWVuV29ya2VyLnByb3RvdHlwZS5zZXRTaGFyZWRGcmFtZUJ1ZmZlciA9IGZ1bmN0aW9uIChzaGFyZWRBcnJheUJ1ZmZlcikge1xuICAgICAgICB0aGlzLnNjcmVlbi5zZXRTaGFyZWRBcnJheUJ1ZmZlcihzaGFyZWRBcnJheUJ1ZmZlcik7XG4gICAgfTtcbiAgICBTY3JlZW5Xb3JrZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2NyZWVuLmluaXQoKTtcbiAgICB9O1xuICAgIFNjcmVlbldvcmtlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKF8sIHBvc3RNZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuc2NyZWVuLnVwZGF0ZSgpO1xuICAgICAgICBwb3N0TWVzc2FnZSh7IGNtZDogXCJ1cGRhdGVkXCIgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gU2NyZWVuV29ya2VyO1xufSgpKTtcbnZhciBzY3JlZW5Xb3JrZXIgPSBuZXcgU2NyZWVuV29ya2VyKCk7XG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGNtZCA9IGUuZGF0YS5jbWQ7XG4gICAgdmFyIGRhdGEgPSBlLmRhdGEuZGF0YTtcbiAgICBpZiAoc2NyZWVuV29ya2VyW2NtZF0pIHtcbiAgICAgICAgc2NyZWVuV29ya2VyW2NtZF0oZGF0YSwgc2VsZi5wb3N0TWVzc2FnZSk7XG4gICAgfVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lVMk55WldWdVYyOXlhMlZ5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lVMk55WldWdVYyOXlhMlZ5TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVRkJMR3RDUVVGclFqdEJRVU5zUWl4UFFVRlBMRTFCUVUwc1RVRkJUU3h0UWtGQmJVSXNRMEZCUXp0QlFVTjJReXhQUVVGUExFMUJRVTBzVFVGQlRTeHRRa0ZCYlVJc1EwRkJRenRCUVVWMlF5eFBRVUZQTEZsQlFWa3NUVUZCVFN4NVFrRkJlVUlzUTBGQlF6dEJRVVZ1UkR0SlFVTkpPMUZCUTBrc1NVRkJTU3hEUVVGRExFMUJRVTBzUjBGQlJ5eEpRVUZKTEUxQlFVMHNRMEZCUXl4SlFVRkpMRVZCUVVVc1NVRkJTU3hGUVVGRkxFbEJRVWtzUlVGQlJUdFpRVU4yUXl4TlFVRk5MRVZCUVVVc1NVRkJTVHRaUVVOYUxFMUJRVTBzUlVGQlJTeEpRVUZKTzFOQlEyWXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJRenRKUVVWRUxITkRRVUZsTEVkQlFXWXNWVUZCWjBJc2FVSkJRV2xDTzFGQlF6ZENMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zVDBGQlR5eEhRVUZITEVsQlFVa3NUVUZCVFN4RFFVRkRMRmxCUVZrc1JVRkJSVHRaUVVNelF5eE5RVUZOTEVWQlFVVXNTVUZCU1R0WlFVTmFMSEZDUVVGeFFpeEZRVUZGTEdsQ1FVRnBRanRUUVVNelF5eERRVUZETEVOQlFVTTdVVUZEU0N4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFOUJRVThzUjBGQlJ5eFpRVUZaTEVOQlFVTTdTVUZEZGtNc1EwRkJRenRKUVVWRUxESkRRVUZ2UWl4SFFVRndRaXhWUVVGeFFpeHBRa0ZCYVVJN1VVRkRiRU1zU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4dlFrRkJiMElzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhEUVVGRE8wbEJRM2hFTEVOQlFVTTdTVUZGUkN3eVFrRkJTU3hIUVVGS08xRkJRMGtzU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJRenRKUVVOMlFpeERRVUZETzBsQlJVUXNOa0pCUVUwc1IwRkJUaXhWUVVGUExFTkJRVU1zUlVGQlJTeFhRVUZYTzFGQlEycENMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zVFVGQlRTeEZRVUZGTEVOQlFVTTdVVUZEY2tJc1YwRkJWeXhEUVVGRExFVkJRVVVzUjBGQlJ5eEZRVUZGTEZOQlFWTXNSVUZCUlN4RFFVRkRMRU5CUVVNN1NVRkRjRU1zUTBGQlF6dEpRVU5NTEcxQ1FVRkRPMEZCUVVRc1EwRkJReXhCUVRWQ1JDeEpRVFJDUXp0QlFVVkVMRWxCUVUwc1dVRkJXU3hIUVVGSExFbEJRVWtzV1VGQldTeEZRVUZGTEVOQlFVTTdRVUZEZUVNc1NVRkJTU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRk5CUVZNc1JVRkJSU3hWUVVGRExFTkJRVU03U1VGREwwSXNTVUZCVFN4SFFVRkhMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTTdTVUZEZGtJc1NVRkJUU3hKUVVGSkxFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNN1NVRkRla0lzUlVGQlJTeERRVUZETEVOQlFVTXNXVUZCV1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU53UWl4WlFVRlpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJRenRKUVVNNVF5eERRVUZETzBGQlEwd3NRMEZCUXl4RFFVRkRMRU5CUVVNaWZRPT1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi93b3JrZXJzL1NjcmVlbldvcmtlci5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qIGVzbGludC1kaXNhYmxlICovIGV4cG9ydCB2YXIgbWVtb3J5TGF5b3V0ID0ge1xuICAgIHNpemU6IDI1NixcbiAgICBtZW1sZW46IDB4NDAwMDAsXG4gICAgbWVtdG9wOiAweDNGRkZGLFxuICAgIGlvbGVuOiAyNTYsXG4gICAgaW90b3A6IDB4M0ZGRkYsXG4gICAgaW9Db21tM0RhdGFJbjogMHgzRkY0RixcbiAgICBpb0NvbW0zRGF0YU91dDogMHgzRkY0RSxcbiAgICBpb0NvbW0zQ29tbWFuZDogMHgzRkY0RCxcbiAgICBpb0NvbW0zQ29uZmlndXJhdGlvbjogMHgzRkY0QyxcbiAgICBpb0NvbW0yRGF0YUluOiAweDNGRjRCLFxuICAgIGlvQ29tbTJEYXRhT3V0OiAweDNGRjRBLFxuICAgIGlvQ29tbTJDb21tYW5kOiAweDNGRjQ5LFxuICAgIGlvQ29tbTJDb25maWd1cmF0aW9uOiAweDNGRjQ4LFxuICAgIGlvQ29tbTFEYXRhSW46IDB4M0ZGNDcsXG4gICAgaW9Db21tMURhdGFPdXQ6IDB4M0ZGNDYsXG4gICAgaW9Db21tMUNvbW1hbmQ6IDB4M0ZGNDUsXG4gICAgaW9Db21tMUNvbmZpZ3VyYXRpb246IDB4M0ZGNDQsXG4gICAgaW9Db21tMERhdGFJbjogMHgzRkY0MyxcbiAgICBpb0NvbW0wRGF0YU91dDogMHgzRkY0MixcbiAgICBpb0NvbW0wQ29tbWFuZDogMHgzRkY0MSxcbiAgICBpb0NvbW0wQ29uZmlndXJhdGlvbjogMHgzRkY0MCAvLyBiMCA9IG9wZW5lZDsgYjEgPSBjbWQgc2VudDsgYjIgPSBjbWQgYWNrOyBiMyA9IGRhdGEgb3V0IHNlbnQ7IGI0ID0gZGF0YSBvdXQgYWNrOyBiNSA9IGRhdGEgaW4gc2VudDsgYjYgPSBkYXRhIGluIGFja1xuICAgICxcbiAgICBpb1JhbmRvbUhpZ2g6IDB4M0ZGMzksXG4gICAgaW9SYW5kb21Mb3c6IDB4M0ZGMzgsXG4gICAgaW9DbG9ja0hvdXJzOiAweDNGRjMzLFxuICAgIGlvQ2xvY2tNaW51dGVzOiAweDNGRjMyLFxuICAgIGlvQ2xvY2tTZWNvbmRzOiAweDNGRjMxLFxuICAgIGlvQ2xvY2tIdW5kcmVkdGhzOiAweDNGRjMwLFxuICAgIGlvVGltZXIzSGlnaEN1cnJlbnQ6IDB4M0ZGMkMsXG4gICAgaW9UaW1lcjNMb3dDdXJyZW50OiAweDNGRjJCLFxuICAgIGlvVGltZXIzSGlnaFJlc2V0OiAweDNGRjJBLFxuICAgIGlvVGltZXIzTG93UmVzZXQ6IDB4M0ZGMjksXG4gICAgaW9UaW1lcjNDb25maWd1cmF0aW9uOiAweDNGRjI4LFxuICAgIGlvVGltZXIySGlnaEN1cnJlbnQ6IDB4M0ZGMjQsXG4gICAgaW9UaW1lcjJMb3dDdXJyZW50OiAweDNGRjIzLFxuICAgIGlvVGltZXIySGlnaFJlc2V0OiAweDNGRjIyLFxuICAgIGlvVGltZXIyTG93UmVzZXQ6IDB4M0ZGMjEsXG4gICAgaW9UaW1lcjJDb25maWd1cmF0aW9uOiAweDNGRjIwLFxuICAgIGlvVGltZXIxSGlnaEN1cnJlbnQ6IDB4M0ZGMUMsXG4gICAgaW9UaW1lcjFMb3dDdXJyZW50OiAweDNGRjFCLFxuICAgIGlvVGltZXIxSGlnaFJlc2V0OiAweDNGRjFBLFxuICAgIGlvVGltZXIxTG93UmVzZXQ6IDB4M0ZGMTksXG4gICAgaW9UaW1lcjFDb25maWd1cmF0aW9uOiAweDNGRjE4LFxuICAgIGlvVGltZXIwSGlnaEN1cnJlbnQ6IDB4M0ZGMTQsXG4gICAgaW9UaW1lcjBMb3dDdXJyZW50OiAweDNGRjEzLFxuICAgIGlvVGltZXIwSGlnaFJlc2V0OiAweDNGRjEyLFxuICAgIGlvVGltZXIwTG93UmVzZXQ6IDB4M0ZGMTEsXG4gICAgaW9UaW1lcjBDb25maWd1cmF0aW9uOiAweDNGRjEwIC8vIGIwID0gZW5hYmxlZDsgYjE6IDAgPSBvbmUtc2hvdCwgMSA9IGNvbnRpbnVvdXM7IGIyOiAwID0gbm8gaW50ZXJydXB0LCAxID0gdHJpZ2dlciBpbnRlcnJ1cHQ7IGI3ID0gdHJpZ2dlcmVkIChtYW51YWwgcmVzZXQpXG4gICAgLFxuICAgIGlvS2V5Ym9hcmREaXJlY3Rpb25zOiAweDNGRjAyLFxuICAgIGlvS2V5Ym9hcmRNb2RpZmllcnM6IDB4M0ZGMDEsXG4gICAgaW9LZXlib2FyZEtleVByZXNzZWQ6IDB4M0ZGMDAsXG4gICAgaW9ib3Q6IDB4M0ZGMDAsXG4gICAgc3ByaXRlQ291bnQ6IDE2LFxuICAgIHNwcml0ZUZIZWlnaHQ6IDB4MzQwQUYsXG4gICAgc3ByaXRlRUhlaWdodDogMHgzNDBBRSxcbiAgICBzcHJpdGVESGVpZ2h0OiAweDM0MEFELFxuICAgIHNwcml0ZUNIZWlnaHQ6IDB4MzQwQUMsXG4gICAgc3ByaXRlQkhlaWdodDogMHgzNDBBQixcbiAgICBzcHJpdGVBSGVpZ2h0OiAweDM0MEFBLFxuICAgIHNwcml0ZTlIZWlnaHQ6IDB4MzQwQTksXG4gICAgc3ByaXRlOEhlaWdodDogMHgzNDBBOCxcbiAgICBzcHJpdGU3SGVpZ2h0OiAweDM0MEE3LFxuICAgIHNwcml0ZTZIZWlnaHQ6IDB4MzQwQTYsXG4gICAgc3ByaXRlNUhlaWdodDogMHgzNDBBNSxcbiAgICBzcHJpdGU0SGVpZ2h0OiAweDM0MEE0LFxuICAgIHNwcml0ZTNIZWlnaHQ6IDB4MzQwQTMsXG4gICAgc3ByaXRlMkhlaWdodDogMHgzNDBBMixcbiAgICBzcHJpdGUxSGVpZ2h0OiAweDM0MEExLFxuICAgIHNwcml0ZTBIZWlnaHQ6IDB4MzQwQTAsXG4gICAgc3ByaXRlRldpZHRoOiAweDM0MDlGLFxuICAgIHNwcml0ZUVXaWR0aDogMHgzNDA5RSxcbiAgICBzcHJpdGVEV2lkdGg6IDB4MzQwOUQsXG4gICAgc3ByaXRlQ1dpZHRoOiAweDM0MDlDLFxuICAgIHNwcml0ZUJXaWR0aDogMHgzNDA5QixcbiAgICBzcHJpdGVBV2lkdGg6IDB4MzQwOUEsXG4gICAgc3ByaXRlOVdpZHRoOiAweDM0MDk5LFxuICAgIHNwcml0ZThXaWR0aDogMHgzNDA5OCxcbiAgICBzcHJpdGU3V2lkdGg6IDB4MzQwOTcsXG4gICAgc3ByaXRlNldpZHRoOiAweDM0MDk2LFxuICAgIHNwcml0ZTVXaWR0aDogMHgzNDA5NSxcbiAgICBzcHJpdGU0V2lkdGg6IDB4MzQwOTQsXG4gICAgc3ByaXRlM1dpZHRoOiAweDM0MDkzLFxuICAgIHNwcml0ZTJXaWR0aDogMHgzNDA5MixcbiAgICBzcHJpdGUxV2lkdGg6IDB4MzQwOTEsXG4gICAgc3ByaXRlMFdpZHRoOiAweDM0MDkwLFxuICAgIHNwcml0ZUZUaWxlOiAweDM0MDhGLFxuICAgIHNwcml0ZUVUaWxlOiAweDM0MDhFLFxuICAgIHNwcml0ZURUaWxlOiAweDM0MDhELFxuICAgIHNwcml0ZUNUaWxlOiAweDM0MDhDLFxuICAgIHNwcml0ZUJUaWxlOiAweDM0MDhCLFxuICAgIHNwcml0ZUFUaWxlOiAweDM0MDhBLFxuICAgIHNwcml0ZTlUaWxlOiAweDM0MDg5LFxuICAgIHNwcml0ZThUaWxlOiAweDM0MDg4LFxuICAgIHNwcml0ZTdUaWxlOiAweDM0MDg3LFxuICAgIHNwcml0ZTZUaWxlOiAweDM0MDg2LFxuICAgIHNwcml0ZTVUaWxlOiAweDM0MDg1LFxuICAgIHNwcml0ZTRUaWxlOiAweDM0MDg0LFxuICAgIHNwcml0ZTNUaWxlOiAweDM0MDgzLFxuICAgIHNwcml0ZTJUaWxlOiAweDM0MDgyLFxuICAgIHNwcml0ZTFUaWxlOiAweDM0MDgxLFxuICAgIHNwcml0ZTBUaWxlOiAweDM0MDgwLFxuICAgIHNwcml0ZUZUaWxlU2V0OiAweDM0MDdGLFxuICAgIHNwcml0ZUVUaWxlU2V0OiAweDM0MDdFLFxuICAgIHNwcml0ZURUaWxlU2V0OiAweDM0MDdELFxuICAgIHNwcml0ZUNUaWxlU2V0OiAweDM0MDdDLFxuICAgIHNwcml0ZUJUaWxlU2V0OiAweDM0MDdCLFxuICAgIHNwcml0ZUFUaWxlU2V0OiAweDM0MDdBLFxuICAgIHNwcml0ZTlUaWxlU2V0OiAweDM0MDc5LFxuICAgIHNwcml0ZThUaWxlU2V0OiAweDM0MDc4LFxuICAgIHNwcml0ZTdUaWxlU2V0OiAweDM0MDc3LFxuICAgIHNwcml0ZTZUaWxlU2V0OiAweDM0MDc2LFxuICAgIHNwcml0ZTVUaWxlU2V0OiAweDM0MDc1LFxuICAgIHNwcml0ZTRUaWxlU2V0OiAweDM0MDc0LFxuICAgIHNwcml0ZTNUaWxlU2V0OiAweDM0MDczLFxuICAgIHNwcml0ZTJUaWxlU2V0OiAweDM0MDcyLFxuICAgIHNwcml0ZTFUaWxlU2V0OiAweDM0MDcxLFxuICAgIHNwcml0ZTBUaWxlU2V0OiAweDM0MDcwLFxuICAgIHNwcml0ZUZGR0NvbG9yOiAweDM0MDZGLFxuICAgIHNwcml0ZUVGR0NvbG9yOiAweDM0MDZFLFxuICAgIHNwcml0ZURGR0NvbG9yOiAweDM0MDZELFxuICAgIHNwcml0ZUNGR0NvbG9yOiAweDM0MDZDLFxuICAgIHNwcml0ZUJGR0NvbG9yOiAweDM0MDZCLFxuICAgIHNwcml0ZUFGR0NvbG9yOiAweDM0MDZBLFxuICAgIHNwcml0ZTlGR0NvbG9yOiAweDM0MDY5LFxuICAgIHNwcml0ZThGR0NvbG9yOiAweDM0MDY4LFxuICAgIHNwcml0ZTdGR0NvbG9yOiAweDM0MDY3LFxuICAgIHNwcml0ZTZGR0NvbG9yOiAweDM0MDY2LFxuICAgIHNwcml0ZTVGR0NvbG9yOiAweDM0MDY1LFxuICAgIHNwcml0ZTRGR0NvbG9yOiAweDM0MDY0LFxuICAgIHNwcml0ZTNGR0NvbG9yOiAweDM0MDYzLFxuICAgIHNwcml0ZTJGR0NvbG9yOiAweDM0MDYyLFxuICAgIHNwcml0ZTFGR0NvbG9yOiAweDM0MDYxLFxuICAgIHNwcml0ZTBGR0NvbG9yOiAweDM0MDYwLFxuICAgIHNwcml0ZUZCR0NvbG9yOiAweDM0MDVGLFxuICAgIHNwcml0ZUVCR0NvbG9yOiAweDM0MDVFLFxuICAgIHNwcml0ZURCR0NvbG9yOiAweDM0MDVELFxuICAgIHNwcml0ZUNCR0NvbG9yOiAweDM0MDVDLFxuICAgIHNwcml0ZUJCR0NvbG9yOiAweDM0MDVCLFxuICAgIHNwcml0ZUFCR0NvbG9yOiAweDM0MDVBLFxuICAgIHNwcml0ZTlCR0NvbG9yOiAweDM0MDU5LFxuICAgIHNwcml0ZThCR0NvbG9yOiAweDM0MDU4LFxuICAgIHNwcml0ZTdCR0NvbG9yOiAweDM0MDU3LFxuICAgIHNwcml0ZTZCR0NvbG9yOiAweDM0MDU2LFxuICAgIHNwcml0ZTVCR0NvbG9yOiAweDM0MDU1LFxuICAgIHNwcml0ZTRCR0NvbG9yOiAweDM0MDU0LFxuICAgIHNwcml0ZTNCR0NvbG9yOiAweDM0MDUzLFxuICAgIHNwcml0ZTJCR0NvbG9yOiAweDM0MDUyLFxuICAgIHNwcml0ZTFCR0NvbG9yOiAweDM0MDUxLFxuICAgIHNwcml0ZTBCR0NvbG9yOiAweDM0MDUwLFxuICAgIHNwcml0ZUZTY2FsZTogMHgzNDA0RixcbiAgICBzcHJpdGVFU2NhbGU6IDB4MzQwNEUsXG4gICAgc3ByaXRlRFNjYWxlOiAweDM0MDRELFxuICAgIHNwcml0ZUNTY2FsZTogMHgzNDA0QyxcbiAgICBzcHJpdGVCU2NhbGU6IDB4MzQwNEIsXG4gICAgc3ByaXRlQVNjYWxlOiAweDM0MDRBLFxuICAgIHNwcml0ZTlTY2FsZTogMHgzNDA0OSxcbiAgICBzcHJpdGU4U2NhbGU6IDB4MzQwNDgsXG4gICAgc3ByaXRlN1NjYWxlOiAweDM0MDQ3LFxuICAgIHNwcml0ZTZTY2FsZTogMHgzNDA0NixcbiAgICBzcHJpdGU1U2NhbGU6IDB4MzQwNDUsXG4gICAgc3ByaXRlNFNjYWxlOiAweDM0MDQ0LFxuICAgIHNwcml0ZTNTY2FsZTogMHgzNDA0MyxcbiAgICBzcHJpdGUyU2NhbGU6IDB4MzQwNDIsXG4gICAgc3ByaXRlMVNjYWxlOiAweDM0MDQxLFxuICAgIHNwcml0ZTBTY2FsZTogMHgzNDA0MCxcbiAgICBzcHJpdGVGWVBvc2l0aW9uOiAweDM0MDNGLFxuICAgIHNwcml0ZUVZUG9zaXRpb246IDB4MzQwM0UsXG4gICAgc3ByaXRlRFlQb3NpdGlvbjogMHgzNDAzRCxcbiAgICBzcHJpdGVDWVBvc2l0aW9uOiAweDM0MDNDLFxuICAgIHNwcml0ZUJZUG9zaXRpb246IDB4MzQwM0IsXG4gICAgc3ByaXRlQVlQb3NpdGlvbjogMHgzNDAzQSxcbiAgICBzcHJpdGU5WVBvc2l0aW9uOiAweDM0MDM5LFxuICAgIHNwcml0ZThZUG9zaXRpb246IDB4MzQwMzgsXG4gICAgc3ByaXRlN1lQb3NpdGlvbjogMHgzNDAzNyxcbiAgICBzcHJpdGU2WVBvc2l0aW9uOiAweDM0MDM2LFxuICAgIHNwcml0ZTVZUG9zaXRpb246IDB4MzQwMzUsXG4gICAgc3ByaXRlNFlQb3NpdGlvbjogMHgzNDAzNCxcbiAgICBzcHJpdGUzWVBvc2l0aW9uOiAweDM0MDMzLFxuICAgIHNwcml0ZTJZUG9zaXRpb246IDB4MzQwMzIsXG4gICAgc3ByaXRlMVlQb3NpdGlvbjogMHgzNDAzMSxcbiAgICBzcHJpdGUwWVBvc2l0aW9uOiAweDM0MDMwLFxuICAgIHNwcml0ZUZYUG9zaXRpb246IDB4MzQwMUYsXG4gICAgc3ByaXRlRVhQb3NpdGlvbjogMHgzNDAxRSxcbiAgICBzcHJpdGVEWFBvc2l0aW9uOiAweDM0MDFELFxuICAgIHNwcml0ZUNYUG9zaXRpb246IDB4MzQwMUMsXG4gICAgc3ByaXRlQlhQb3NpdGlvbjogMHgzNDAxQixcbiAgICBzcHJpdGVBWFBvc2l0aW9uOiAweDM0MDFBLFxuICAgIHNwcml0ZTlYUG9zaXRpb246IDB4MzQwMTksXG4gICAgc3ByaXRlOFhQb3NpdGlvbjogMHgzNDAxOCxcbiAgICBzcHJpdGU3WFBvc2l0aW9uOiAweDM0MDE3LFxuICAgIHNwcml0ZTZYUG9zaXRpb246IDB4MzQwMTYsXG4gICAgc3ByaXRlNVhQb3NpdGlvbjogMHgzNDAxNSxcbiAgICBzcHJpdGU0WFBvc2l0aW9uOiAweDM0MDE0LFxuICAgIHNwcml0ZTNYUG9zaXRpb246IDB4MzQwMTMsXG4gICAgc3ByaXRlMlhQb3NpdGlvbjogMHgzNDAxMixcbiAgICBzcHJpdGUxWFBvc2l0aW9uOiAweDM0MDExLFxuICAgIHNwcml0ZTBYUG9zaXRpb246IDB4MzQwMTAsXG4gICAgc3ByaXRlRkxheWVyOiAweDM0MDBGLFxuICAgIHNwcml0ZUVMYXllcjogMHgzNDAwRSxcbiAgICBzcHJpdGVETGF5ZXI6IDB4MzQwMEQsXG4gICAgc3ByaXRlQ0xheWVyOiAweDM0MDBDLFxuICAgIHNwcml0ZUJMYXllcjogMHgzNDAwQixcbiAgICBzcHJpdGVBTGF5ZXI6IDB4MzQwMEEsXG4gICAgc3ByaXRlOUxheWVyOiAweDM0MDA5LFxuICAgIHNwcml0ZThMYXllcjogMHgzNDAwOCxcbiAgICBzcHJpdGU3TGF5ZXI6IDB4MzQwMDcsXG4gICAgc3ByaXRlNkxheWVyOiAweDM0MDA2LFxuICAgIHNwcml0ZTVMYXllcjogMHgzNDAwNSxcbiAgICBzcHJpdGU0TGF5ZXI6IDB4MzQwMDQsXG4gICAgc3ByaXRlM0xheWVyOiAweDM0MDAzLFxuICAgIHNwcml0ZTJMYXllcjogMHgzNDAwMixcbiAgICBzcHJpdGUxTGF5ZXI6IDB4MzQwMDEsXG4gICAgc3ByaXRlMExheWVyOiAweDM0MDAwLFxuICAgIHNwcml0ZVN0YXJ0OiAweDM0MDAwLFxuICAgIHRpbGVQYWdlc0xlbmd0aDogMHgwNDAwMCxcbiAgICB0aWxlUGFnZUxlbmd0aDogMHgwMTAwMCxcbiAgICB0aWxlUGFnZTNMYXllcjogMHgzM0ZGRiAvLyAwIC0gNyA9IHZpc2libGUgYXQgbGF5ZXIsIDB4RkYvLTEgPSBub3QgdmlzaWJsZVxuICAgICxcbiAgICB0aWxlUGFnZTNPZmZzZXRZOiAweDMzRkZFIC8vIHNpZ25lZCBZIG9mZnNldCBmb3Igc21vb3RoIHNjcm9sbGluZ1xuICAgICxcbiAgICB0aWxlUGFnZTNPZmZzZXRYOiAweDMzRkZEIC8vIHNpZ25lZCBYIG9mZnNldCBmb3Igc21vb3RoIHNjcm9sbGluZ1xuICAgICxcbiAgICB0aWxlUGFnZTNTZXQ6IDB4MzNGRkMgLy8gMCAtIDMsIHdoaWNoIHRpbGVzZXQgdG8gdXNlXG4gICAgLFxuICAgIHRpbGVQYWdlM1NjYWxlOiAweDMzRkZCIC8vIDAgPSAxeDEgcGl4ZWwsIDEgPSAyeDIgcGl4ZWxcbiAgICAsXG4gICAgdGlsZVBhZ2UzQ3JvcFk6IDB4MzNGRkEgLy8gaGVpZ2h0IG9mIGFyZWEgdG8gaWdub3JlIHdoZW4gY29tcG9zaXRpbmcgKGJvcmRlcilcbiAgICAsXG4gICAgdGlsZVBhZ2UzQ3JvcFg6IDB4MzNGRjkgLy8gd2lkdGggb2YgYXJlYSB0byBpZ25vcmUgd2hlbiBjb21wb3NpdGluZyAoYm9yZGVyKVxuICAgICxcbiAgICB0aWxlUGFnZTNGR0NvbG9yOiAweDMzODAwLFxuICAgIHRpbGVQYWdlM0JHQ29sb3I6IDB4MzM0MDAsXG4gICAgdGlsZVBhZ2UzOiAweDMzMDAwLFxuICAgIHRpbGVQYWdlMkxheWVyOiAweDMyRkZGIC8vIDAgLSA3ID0gdmlzaWJsZSBhdCBsYXllciwgMHhGRi8tMSA9IG5vdCB2aXNpYmxlXG4gICAgLFxuICAgIHRpbGVQYWdlMk9mZnNldFk6IDB4MzJGRkUgLy8gc2lnbmVkIFkgb2Zmc2V0IGZvciBzbW9vdGggc2Nyb2xsaW5nXG4gICAgLFxuICAgIHRpbGVQYWdlMk9mZnNldFg6IDB4MzJGRkQgLy8gc2lnbmVkIFggb2Zmc2V0IGZvciBzbW9vdGggc2Nyb2xsaW5nXG4gICAgLFxuICAgIHRpbGVQYWdlMlNldDogMHgzMkZGQyAvLyAwIC0gMywgd2hpY2ggdGlsZXNldCB0byB1c2VcbiAgICAsXG4gICAgdGlsZVBhZ2UyU2NhbGU6IDB4MzJGRkIgLy8gMCA9IDF4MSBwaXhlbCwgMSA9IDJ4MiBwaXhlbFxuICAgICxcbiAgICB0aWxlUGFnZTJDcm9wWTogMHgzMkZGQSAvLyBoZWlnaHQgb2YgYXJlYSB0byBpZ25vcmUgd2hlbiBjb21wb3NpdGluZyAoYm9yZGVyKVxuICAgICxcbiAgICB0aWxlUGFnZTJDcm9wWDogMHgzMkZGOSAvLyB3aWR0aCBvZiBhcmVhIHRvIGlnbm9yZSB3aGVuIGNvbXBvc2l0aW5nIChib3JkZXIpXG4gICAgLFxuICAgIHRpbGVQYWdlMkZHQ29sb3I6IDB4MzI4MDAsXG4gICAgdGlsZVBhZ2UyQkdDb2xvcjogMHgzMjQwMCxcbiAgICB0aWxlUGFnZTI6IDB4MzIwMDAsXG4gICAgdGlsZVBhZ2UxTGF5ZXI6IDB4MzFGRkYgLy8gMCAtIDcgPSB2aXNpYmxlIGF0IGxheWVyLCAweEZGLy0xID0gbm90IHZpc2libGVcbiAgICAsXG4gICAgdGlsZVBhZ2UxT2Zmc2V0WTogMHgzMUZGRSAvLyBzaWduZWQgWSBvZmZzZXQgZm9yIHNtb290aCBzY3JvbGxpbmdcbiAgICAsXG4gICAgdGlsZVBhZ2UxT2Zmc2V0WDogMHgzMUZGRCAvLyBzaWduZWQgWCBvZmZzZXQgZm9yIHNtb290aCBzY3JvbGxpbmdcbiAgICAsXG4gICAgdGlsZVBhZ2UxU2V0OiAweDMxRkZDIC8vIDAgLSAzLCB3aGljaCB0aWxlc2V0IHRvIHVzZVxuICAgICxcbiAgICB0aWxlUGFnZTFTY2FsZTogMHgzMUZGQiAvLyAwID0gMXgxIHBpeGVsLCAxID0gMngyIHBpeGVsXG4gICAgLFxuICAgIHRpbGVQYWdlMUNyb3BZOiAweDMxRkZBIC8vIGhlaWdodCBvZiBhcmVhIHRvIGlnbm9yZSB3aGVuIGNvbXBvc2l0aW5nIChib3JkZXIpXG4gICAgLFxuICAgIHRpbGVQYWdlMUNyb3BYOiAweDMxRkY5IC8vIHdpZHRoIG9mIGFyZWEgdG8gaWdub3JlIHdoZW4gY29tcG9zaXRpbmcgKGJvcmRlcilcbiAgICAsXG4gICAgdGlsZVBhZ2UxRkdDb2xvcjogMHgzMTgwMCxcbiAgICB0aWxlUGFnZTFCR0NvbG9yOiAweDMxNDAwLFxuICAgIHRpbGVQYWdlMTogMHgzMTAwMCxcbiAgICB0aWxlUGFnZTBMYXllcjogMHgzMEZGRiAvLyAwIC0gNyA9IHZpc2libGUgYXQgbGF5ZXIsIDB4RkYvLTEgPSBub3QgdmlzaWJsZVxuICAgICxcbiAgICB0aWxlUGFnZTBPZmZzZXRZOiAweDMwRkZFIC8vIHNpZ25lZCBZIG9mZnNldCBmb3Igc21vb3RoIHNjcm9sbGluZ1xuICAgICxcbiAgICB0aWxlUGFnZTBPZmZzZXRYOiAweDMwRkZEIC8vIHNpZ25lZCBYIG9mZnNldCBmb3Igc21vb3RoIHNjcm9sbGluZ1xuICAgICxcbiAgICB0aWxlUGFnZTBTZXQ6IDB4MzBGRkMgLy8gMCAtIDMsIHdoaWNoIHRpbGVzZXQgdG8gdXNlXG4gICAgLFxuICAgIHRpbGVQYWdlMFNjYWxlOiAweDMwRkZCIC8vIDAgPSAxeDEgcGl4ZWwsIDEgPSAyeDIgcGl4ZWxcbiAgICAsXG4gICAgdGlsZVBhZ2UwQ3JvcFk6IDB4MzBGRkEgLy8gaGVpZ2h0IG9mIGFyZWEgdG8gaWdub3JlIHdoZW4gY29tcG9zaXRpbmcgKGJvcmRlcilcbiAgICAsXG4gICAgdGlsZVBhZ2UwQ3JvcFg6IDB4MzBGRjkgLy8gd2lkdGggb2YgYXJlYSB0byBpZ25vcmUgd2hlbiBjb21wb3NpdGluZyAoYm9yZGVyKVxuICAgICxcbiAgICB0aWxlUGFnZTBGR0NvbG9yOiAweDMwODAwLFxuICAgIHRpbGVQYWdlMEJHQ29sb3I6IDB4MzA0MDAsXG4gICAgdGlsZVBhZ2UwOiAweDMwMDAwLFxuICAgIHRpbGVQYWdlc1N0YXJ0OiAweDMwMDAwLFxuICAgIHRpbGVTZXRzTGVuZ3RoOiA2NTUzNixcbiAgICB0aWxlU2V0TGVuZ3RoOiAxNjM4NCxcbiAgICB0aWxlU2V0MzogMHgyQzAwMCAvLyB0aWxlc2V0IDNcbiAgICAsXG4gICAgdGlsZVNldDI6IDB4MjgwMDAgLy8gdGlsZXNldCAyXG4gICAgLFxuICAgIHRpbGVTZXQxOiAweDI0MDAwIC8vIHRpbGVzZXQgMVxuICAgICxcbiAgICB0aWxlU2V0MDogMHgyMDAwMCAvLyAxNksgMjU2IDh4OCB0aWxlc2V0IDBcbiAgICAsXG4gICAgdGlsZVNldHNTdGFydDogMHgyMDAwMCxcbiAgICBwYWxldHRlTGVuZ3RoOiAxMDI0LFxuICAgIHBhbGV0dGVMZW5ndGgzMjogMjU2LFxuICAgIHBhbGV0dGVTdGFydDogMHgxRkMwMCAvLyAyNTYgeCA0IGJ5dGVzXG4gICAgLFxuICAgIGJhY2tncm91bmRDb2xvcjogMHgxRkEwQiAvLyBiYWNrZ3JvdW5kIGNvbG9yIGZvciBzY3JlZW5cbiAgICAsXG4gICAgYm9yZGVyU2l6ZVk6IDB4MUZBMDYgLy8gaGVpZ2h0IG9mIHZlcnRpY2FsIGJvcmRlciBpbiBweFxuICAgICxcbiAgICBib3JkZXJTaXplWDogMHgxRkEwNSAvLyB3aWR0aCBvZiBob3Jpem9udGFsIGJvcmRlciBpbiBweFxuICAgICxcbiAgICBib3JkZXJDb2xvcjogMHgxRkEwNCAvLyBCb3JkZXIgQ29sb3JcbiAgICAsXG4gICAgZ3JhcGhpY3NMYXllcjogMHgxRkEwMiAvLyAwIC0gNywgZ3JhcGhpY2EgbGF5ZXI7IEZGID0gbm8gZGlzcGxheVxuICAgICxcbiAgICBzY3JlZW5Db25maWdMZW5ndGg6IDI1NixcbiAgICBzY3JlZW5Db25maWdTdGFydDogMHgxRkEwMCxcbiAgICBncmFwaGljc0xlbmd0aDogNjQwMDAsXG4gICAgZ3JhcGhpY3NTdGFydDogMHgxMDAwMCAvLyAzMjAgeCAyMDAgKDY0MDAwKSBieXRlc1xuICAgICxcbiAgICByb21MZW5ndGg6IDB4MDQwMDAgLy8gbGVuZ3RoIG9mIHJvbVxuICAgICxcbiAgICByb21FbmQ6IDB4MEZGRkYgLy8gRW5kIG9mIFJPTVxuICAgICxcbiAgICByb21TdGFydDogMHgwQzAwMCAvLyBTdGFydCBvZiBST01cbiAgICAsXG4gICAgcm9tU2NyYXRjaFN0YXJ0OiAweDBCMDAwIC8vIFJPTSBzY3JhdGNoIGFyZWFcbiAgICAsXG4gICAgY29kZVN0YXJ0OiAweDAxMDAwIC8vIFN0YXJ0IG9mIGNvZGUgZXhlY3V0aW9uXG4gICAgLFxuICAgIHN0YWNrVG9wOiAweDAwRkZGIC8vIHRvcCBvZiBzdGFjayAoZ3Jvd3MgZG93bilcbiAgICAsXG4gICAgc3RhY2tNYXg6IDB4MDA0MDAgLy8gYm90dG9tIG9mIHN0YWNrXG4gICAgLFxuICAgIHRyYXBSZXNldDogMHgwMDAwMCAvLyBqdW1wIHRvIGluc3RydWN0aW9uIHdoZW4gcmVzZXRcbiAgICAsXG4gICAgdHJhcHM6IDB4MDAwMDAgLy8gMjU2IDItYnl0ZSBsb25nIHBvaW50ZXJzOyBlbmRzIDB4MDAxRkZcbiAgICAsXG4gICAgbWVtYm90OiAweDAwMDAwXG59O1xuZXhwb3J0IGRlZmF1bHQgbWVtb3J5TGF5b3V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYldWdGIzSjVUR0Y1YjNWMExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpYldWdGIzSjVUR0Y1YjNWMExtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCTEc5Q1FVRnZRanRCUVVOd1FpeEJRVVJCTEc5Q1FVRnZRaXhEUVVOd1FpeE5RVUZOTEVOQlFVTXNTVUZCU1N4WlFVRlpMRWRCUVVjN1NVRkRlRUlzU1VGQlNTeEZRVUZGTEVkQlFVYzdTVUZEVUN4TlFVRk5MRVZCUVVVc1QwRkJUenRKUVVObUxFMUJRVTBzUlVGQlJTeFBRVUZQTzBsQlEyWXNTMEZCU3l4RlFVRkZMRWRCUVVjN1NVRkRWaXhMUVVGTExFVkJRVVVzVDBGQlR6dEpRVU5rTEdGQlFXRXNSVUZCUlN4UFFVRlBPMGxCUTNSQ0xHTkJRV01zUlVGQlJTeFBRVUZQTzBsQlEzWkNMR05CUVdNc1JVRkJSU3hQUVVGUE8wbEJRM1pDTEc5Q1FVRnZRaXhGUVVGRkxFOUJRVTg3U1VGRE4wSXNZVUZCWVN4RlFVRkZMRTlCUVU4N1NVRkRkRUlzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNiMEpCUVc5Q0xFVkJRVVVzVDBGQlR6dEpRVU0zUWl4aFFVRmhMRVZCUVVVc1QwRkJUenRKUVVOMFFpeGpRVUZqTEVWQlFVVXNUMEZCVHp0SlFVTjJRaXhqUVVGakxFVkJRVVVzVDBGQlR6dEpRVU4yUWl4dlFrRkJiMElzUlVGQlJTeFBRVUZQTzBsQlF6ZENMR0ZCUVdFc1JVRkJSU3hQUVVGUE8wbEJRM1JDTEdOQlFXTXNSVUZCUlN4UFFVRlBPMGxCUTNaQ0xHTkJRV01zUlVGQlJTeFBRVUZQTzBsQlEzWkNMRzlDUVVGdlFpeEZRVUZGTEU5QlFVOHNRMEZCUlN4MVNFRkJkVWc3TzBsQlEzUktMRmxCUVZrc1JVRkJSU3hQUVVGUE8wbEJRM0pDTEZkQlFWY3NSVUZCUlN4UFFVRlBPMGxCUTNCQ0xGbEJRVmtzUlVGQlJTeFBRVUZQTzBsQlEzSkNMR05CUVdNc1JVRkJSU3hQUVVGUE8wbEJRM1pDTEdOQlFXTXNSVUZCUlN4UFFVRlBPMGxCUTNaQ0xHbENRVUZwUWl4RlFVRkZMRTlCUVU4N1NVRkRNVUlzYlVKQlFXMUNMRVZCUVVVc1QwRkJUenRKUVVNMVFpeHJRa0ZCYTBJc1JVRkJSU3hQUVVGUE8wbEJRek5DTEdsQ1FVRnBRaXhGUVVGRkxFOUJRVTg3U1VGRE1VSXNaMEpCUVdkQ0xFVkJRVVVzVDBGQlR6dEpRVU42UWl4eFFrRkJjVUlzUlVGQlJTeFBRVUZQTzBsQlF6bENMRzFDUVVGdFFpeEZRVUZGTEU5QlFVODdTVUZETlVJc2EwSkJRV3RDTEVWQlFVVXNUMEZCVHp0SlFVTXpRaXhwUWtGQmFVSXNSVUZCUlN4UFFVRlBPMGxCUXpGQ0xHZENRVUZuUWl4RlFVRkZMRTlCUVU4N1NVRkRla0lzY1VKQlFYRkNMRVZCUVVVc1QwRkJUenRKUVVNNVFpeHRRa0ZCYlVJc1JVRkJSU3hQUVVGUE8wbEJRelZDTEd0Q1FVRnJRaXhGUVVGRkxFOUJRVTg3U1VGRE0wSXNhVUpCUVdsQ0xFVkJRVVVzVDBGQlR6dEpRVU14UWl4blFrRkJaMElzUlVGQlJTeFBRVUZQTzBsQlEzcENMSEZDUVVGeFFpeEZRVUZGTEU5QlFVODdTVUZET1VJc2JVSkJRVzFDTEVWQlFVVXNUMEZCVHp0SlFVTTFRaXhyUWtGQmEwSXNSVUZCUlN4UFFVRlBPMGxCUXpOQ0xHbENRVUZwUWl4RlFVRkZMRTlCUVU4N1NVRkRNVUlzWjBKQlFXZENMRVZCUVVVc1QwRkJUenRKUVVONlFpeHhRa0ZCY1VJc1JVRkJSU3hQUVVGUExFTkJRVVVzTmtoQlFUWklPenRKUVVNM1NpeHZRa0ZCYjBJc1JVRkJSU3hQUVVGUE8wbEJRemRDTEcxQ1FVRnRRaXhGUVVGRkxFOUJRVTg3U1VGRE5VSXNiMEpCUVc5Q0xFVkJRVVVzVDBGQlR6dEpRVU0zUWl4TFFVRkxMRVZCUVVVc1QwRkJUenRKUVVOa0xGZEJRVmNzUlVGQlJTeEZRVUZGTzBsQlEyWXNZVUZCWVN4RlFVRkZMRTlCUVU4N1NVRkRkRUlzWVVGQllTeEZRVUZGTEU5QlFVODdTVUZEZEVJc1lVRkJZU3hGUVVGRkxFOUJRVTg3U1VGRGRFSXNZVUZCWVN4RlFVRkZMRTlCUVU4N1NVRkRkRUlzWVVGQllTeEZRVUZGTEU5QlFVODdTVUZEZEVJc1lVRkJZU3hGUVVGRkxFOUJRVTg3U1VGRGRFSXNZVUZCWVN4RlFVRkZMRTlCUVU4N1NVRkRkRUlzWVVGQllTeEZRVUZGTEU5QlFVODdTVUZEZEVJc1lVRkJZU3hGUVVGRkxFOUJRVTg3U1VGRGRFSXNZVUZCWVN4RlFVRkZMRTlCUVU4N1NVRkRkRUlzWVVGQllTeEZRVUZGTEU5QlFVODdTVUZEZEVJc1lVRkJZU3hGUVVGRkxFOUJRVTg3U1VGRGRFSXNZVUZCWVN4RlFVRkZMRTlCUVU4N1NVRkRkRUlzWVVGQllTeEZRVUZGTEU5QlFVODdTVUZEZEVJc1lVRkJZU3hGUVVGRkxFOUJRVTg3U1VGRGRFSXNZVUZCWVN4RlFVRkZMRTlCUVU4N1NVRkRkRUlzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1YwRkJWeXhGUVVGRkxFOUJRVTg3U1VGRGNFSXNWMEZCVnl4RlFVRkZMRTlCUVU4N1NVRkRjRUlzVjBGQlZ5eEZRVUZGTEU5QlFVODdTVUZEY0VJc1YwRkJWeXhGUVVGRkxFOUJRVTg3U1VGRGNFSXNWMEZCVnl4RlFVRkZMRTlCUVU4N1NVRkRjRUlzVjBGQlZ5eEZRVUZGTEU5QlFVODdTVUZEY0VJc1YwRkJWeXhGUVVGRkxFOUJRVTg3U1VGRGNFSXNWMEZCVnl4RlFVRkZMRTlCUVU4N1NVRkRjRUlzVjBGQlZ5eEZRVUZGTEU5QlFVODdTVUZEY0VJc1YwRkJWeXhGUVVGRkxFOUJRVTg3U1VGRGNFSXNWMEZCVnl4RlFVRkZMRTlCUVU4N1NVRkRjRUlzVjBGQlZ5eEZRVUZGTEU5QlFVODdTVUZEY0VJc1YwRkJWeXhGUVVGRkxFOUJRVTg3U1VGRGNFSXNWMEZCVnl4RlFVRkZMRTlCUVU4N1NVRkRjRUlzVjBGQlZ5eEZRVUZGTEU5QlFVODdTVUZEY0VJc1YwRkJWeXhGUVVGRkxFOUJRVTg3U1VGRGNFSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNZMEZCWXl4RlFVRkZMRTlCUVU4N1NVRkRka0lzWTBGQll5eEZRVUZGTEU5QlFVODdTVUZEZGtJc1kwRkJZeXhGUVVGRkxFOUJRVTg3U1VGRGRrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzV1VGQldTeEZRVUZGTEU5QlFVODdTVUZEY2tJc1dVRkJXU3hGUVVGRkxFOUJRVTg3U1VGRGNrSXNXVUZCV1N4RlFVRkZMRTlCUVU4N1NVRkRja0lzWjBKQlFXZENMRVZCUVVVc1QwRkJUenRKUVVONlFpeG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUE8wbEJRM3BDTEdkQ1FVRm5RaXhGUVVGRkxFOUJRVTg3U1VGRGVrSXNaMEpCUVdkQ0xFVkJRVVVzVDBGQlR6dEpRVU42UWl4blFrRkJaMElzUlVGQlJTeFBRVUZQTzBsQlEzcENMR2RDUVVGblFpeEZRVUZGTEU5QlFVODdTVUZEZWtJc1owSkJRV2RDTEVWQlFVVXNUMEZCVHp0SlFVTjZRaXhuUWtGQlowSXNSVUZCUlN4UFFVRlBPMGxCUTNwQ0xHZENRVUZuUWl4RlFVRkZMRTlCUVU4N1NVRkRla0lzWjBKQlFXZENMRVZCUVVVc1QwRkJUenRKUVVONlFpeG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUE8wbEJRM3BDTEdkQ1FVRm5RaXhGUVVGRkxFOUJRVTg3U1VGRGVrSXNaMEpCUVdkQ0xFVkJRVVVzVDBGQlR6dEpRVU42UWl4blFrRkJaMElzUlVGQlJTeFBRVUZQTzBsQlEzcENMR2RDUVVGblFpeEZRVUZGTEU5QlFVODdTVUZEZWtJc1owSkJRV2RDTEVWQlFVVXNUMEZCVHp0SlFVTjZRaXhuUWtGQlowSXNSVUZCUlN4UFFVRlBPMGxCUTNwQ0xHZENRVUZuUWl4RlFVRkZMRTlCUVU4N1NVRkRla0lzWjBKQlFXZENMRVZCUVVVc1QwRkJUenRKUVVONlFpeG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUE8wbEJRM3BDTEdkQ1FVRm5RaXhGUVVGRkxFOUJRVTg3U1VGRGVrSXNaMEpCUVdkQ0xFVkJRVVVzVDBGQlR6dEpRVU42UWl4blFrRkJaMElzUlVGQlJTeFBRVUZQTzBsQlEzcENMR2RDUVVGblFpeEZRVUZGTEU5QlFVODdTVUZEZWtJc1owSkJRV2RDTEVWQlFVVXNUMEZCVHp0SlFVTjZRaXhuUWtGQlowSXNSVUZCUlN4UFFVRlBPMGxCUTNwQ0xHZENRVUZuUWl4RlFVRkZMRTlCUVU4N1NVRkRla0lzWjBKQlFXZENMRVZCUVVVc1QwRkJUenRKUVVONlFpeG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUE8wbEJRM3BDTEdkQ1FVRm5RaXhGUVVGRkxFOUJRVTg3U1VGRGVrSXNaMEpCUVdkQ0xFVkJRVVVzVDBGQlR6dEpRVU42UWl4blFrRkJaMElzUlVGQlJTeFBRVUZQTzBsQlEzcENMRmxCUVZrc1JVRkJSU3hQUVVGUE8wbEJRM0pDTEZsQlFWa3NSVUZCUlN4UFFVRlBPMGxCUTNKQ0xGbEJRVmtzUlVGQlJTeFBRVUZQTzBsQlEzSkNMRmxCUVZrc1JVRkJSU3hQUVVGUE8wbEJRM0pDTEZsQlFWa3NSVUZCUlN4UFFVRlBPMGxCUTNKQ0xGbEJRVmtzUlVGQlJTeFBRVUZQTzBsQlEzSkNMRmxCUVZrc1JVRkJSU3hQUVVGUE8wbEJRM0pDTEZsQlFWa3NSVUZCUlN4UFFVRlBPMGxCUTNKQ0xGbEJRVmtzUlVGQlJTeFBRVUZQTzBsQlEzSkNMRmxCUVZrc1JVRkJSU3hQUVVGUE8wbEJRM0pDTEZsQlFWa3NSVUZCUlN4UFFVRlBPMGxCUTNKQ0xGbEJRVmtzUlVGQlJTeFBRVUZQTzBsQlEzSkNMRmxCUVZrc1JVRkJSU3hQUVVGUE8wbEJRM0pDTEZsQlFWa3NSVUZCUlN4UFFVRlBPMGxCUTNKQ0xGbEJRVmtzUlVGQlJTeFBRVUZQTzBsQlEzSkNMRmxCUVZrc1JVRkJSU3hQUVVGUE8wbEJRM0pDTEZkQlFWY3NSVUZCUlN4UFFVRlBPMGxCUTNCQ0xHVkJRV1VzUlVGQlJTeFBRVUZQTzBsQlEzaENMR05CUVdNc1JVRkJSU3hQUVVGUE8wbEJRM1pDTEdOQlFXTXNSVUZCUlN4UFFVRlBMRU5CUVVVc2EwUkJRV3RFT3p0SlFVTXpSU3huUWtGQlowSXNSVUZCUlN4UFFVRlBMRU5CUVVVc2RVTkJRWFZET3p0SlFVTnNSU3huUWtGQlowSXNSVUZCUlN4UFFVRlBMRU5CUVVVc2RVTkJRWFZET3p0SlFVTnNSU3haUVVGWkxFVkJRVVVzVDBGQlR5eERRVUZGTERoQ1FVRTRRanM3U1VGRGNrUXNZMEZCWXl4RlFVRkZMRTlCUVU4c1EwRkJSU3dyUWtGQkswSTdPMGxCUTNoRUxHTkJRV01zUlVGQlJTeFBRVUZQTEVOQlFVVXNjVVJCUVhGRU96dEpRVU01UlN4alFVRmpMRVZCUVVVc1QwRkJUeXhEUVVGRkxHOUVRVUZ2UkRzN1NVRkROMFVzWjBKQlFXZENMRVZCUVVVc1QwRkJUenRKUVVONlFpeG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUE8wbEJRM3BDTEZOQlFWTXNSVUZCUlN4UFFVRlBPMGxCUTJ4Q0xHTkJRV01zUlVGQlJTeFBRVUZQTEVOQlFVVXNhMFJCUVd0RU96dEpRVU16UlN4blFrRkJaMElzUlVGQlJTeFBRVUZQTEVOQlFVVXNkVU5CUVhWRE96dEpRVU5zUlN4blFrRkJaMElzUlVGQlJTeFBRVUZQTEVOQlFVVXNkVU5CUVhWRE96dEpRVU5zUlN4WlFVRlpMRVZCUVVVc1QwRkJUeXhEUVVGRkxEaENRVUU0UWpzN1NVRkRja1FzWTBGQll5eEZRVUZGTEU5QlFVOHNRMEZCUlN3clFrRkJLMEk3TzBsQlEzaEVMR05CUVdNc1JVRkJSU3hQUVVGUExFTkJRVVVzY1VSQlFYRkVPenRKUVVNNVJTeGpRVUZqTEVWQlFVVXNUMEZCVHl4RFFVRkZMRzlFUVVGdlJEczdTVUZETjBVc1owSkJRV2RDTEVWQlFVVXNUMEZCVHp0SlFVTjZRaXhuUWtGQlowSXNSVUZCUlN4UFFVRlBPMGxCUTNwQ0xGTkJRVk1zUlVGQlJTeFBRVUZQTzBsQlEyeENMR05CUVdNc1JVRkJSU3hQUVVGUExFTkJRVVVzYTBSQlFXdEVPenRKUVVNelJTeG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUExFTkJRVVVzZFVOQlFYVkRPenRKUVVOc1JTeG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUExFTkJRVVVzZFVOQlFYVkRPenRKUVVOc1JTeFpRVUZaTEVWQlFVVXNUMEZCVHl4RFFVRkZMRGhDUVVFNFFqczdTVUZEY2tRc1kwRkJZeXhGUVVGRkxFOUJRVThzUTBGQlJTd3JRa0ZCSzBJN08wbEJRM2hFTEdOQlFXTXNSVUZCUlN4UFFVRlBMRU5CUVVVc2NVUkJRWEZFT3p0SlFVTTVSU3hqUVVGakxFVkJRVVVzVDBGQlR5eERRVUZGTEc5RVFVRnZSRHM3U1VGRE4wVXNaMEpCUVdkQ0xFVkJRVVVzVDBGQlR6dEpRVU42UWl4blFrRkJaMElzUlVGQlJTeFBRVUZQTzBsQlEzcENMRk5CUVZNc1JVRkJSU3hQUVVGUE8wbEJRMnhDTEdOQlFXTXNSVUZCUlN4UFFVRlBMRU5CUVVVc2EwUkJRV3RFT3p0SlFVTXpSU3huUWtGQlowSXNSVUZCUlN4UFFVRlBMRU5CUVVVc2RVTkJRWFZET3p0SlFVTnNSU3huUWtGQlowSXNSVUZCUlN4UFFVRlBMRU5CUVVVc2RVTkJRWFZET3p0SlFVTnNSU3haUVVGWkxFVkJRVVVzVDBGQlR5eERRVUZGTERoQ1FVRTRRanM3U1VGRGNrUXNZMEZCWXl4RlFVRkZMRTlCUVU4c1EwRkJSU3dyUWtGQkswSTdPMGxCUTNoRUxHTkJRV01zUlVGQlJTeFBRVUZQTEVOQlFVVXNjVVJCUVhGRU96dEpRVU01UlN4alFVRmpMRVZCUVVVc1QwRkJUeXhEUVVGRkxHOUVRVUZ2UkRzN1NVRkROMFVzWjBKQlFXZENMRVZCUVVVc1QwRkJUenRKUVVONlFpeG5Ra0ZCWjBJc1JVRkJSU3hQUVVGUE8wbEJRM3BDTEZOQlFWTXNSVUZCUlN4UFFVRlBPMGxCUTJ4Q0xHTkJRV01zUlVGQlJTeFBRVUZQTzBsQlEzWkNMR05CUVdNc1JVRkJSU3hMUVVGTE8wbEJRM0pDTEdGQlFXRXNSVUZCUlN4TFFVRkxPMGxCUTNCQ0xGRkJRVkVzUlVGQlJTeFBRVUZQTEVOQlFVVXNXVUZCV1RzN1NVRkRMMElzVVVGQlVTeEZRVUZGTEU5QlFVOHNRMEZCUlN4WlFVRlpPenRKUVVNdlFpeFJRVUZSTEVWQlFVVXNUMEZCVHl4RFFVRkZMRmxCUVZrN08wbEJReTlDTEZGQlFWRXNSVUZCUlN4UFFVRlBMRU5CUVVVc2QwSkJRWGRDT3p0SlFVTXpReXhoUVVGaExFVkJRVVVzVDBGQlR6dEpRVU4wUWl4aFFVRmhMRVZCUVVVc1NVRkJTVHRKUVVOdVFpeGxRVUZsTEVWQlFVVXNSMEZCUnp0SlFVTndRaXhaUVVGWkxFVkJRVVVzVDBGQlR5eERRVUZGTEdkQ1FVRm5RanM3U1VGRGRrTXNaVUZCWlN4RlFVRkZMRTlCUVU4c1EwRkJSU3c0UWtGQk9FSTdPMGxCUzNoRUxGZEJRVmNzUlVGQlJTeFBRVUZQTEVOQlFVVXNhME5CUVd0RE96dEpRVU40UkN4WFFVRlhMRVZCUVVVc1QwRkJUeXhEUVVGRkxHMURRVUZ0UXpzN1NVRkRla1FzVjBGQlZ5eEZRVUZGTEU5QlFVOHNRMEZCUlN4bFFVRmxPenRKUVVWeVF5eGhRVUZoTEVWQlFVVXNUMEZCVHl4RFFVRkZMSGxEUVVGNVF6czdTVUZOYWtVc2EwSkJRV3RDTEVWQlFVVXNSMEZCUnp0SlFVTjJRaXhwUWtGQmFVSXNSVUZCUlN4UFFVRlBPMGxCUXpGQ0xHTkJRV01zUlVGQlJTeExRVUZMTzBsQlEzSkNMR0ZCUVdFc1JVRkJSU3hQUVVGUExFTkJRVVVzTUVKQlFUQkNPenRKUVVOc1JDeFRRVUZUTEVWQlFVVXNUMEZCVHl4RFFVRkZMR2RDUVVGblFqczdTVUZEY0VNc1RVRkJUU3hGUVVGRkxFOUJRVThzUTBGQlJTeGhRVUZoT3p0SlFVTTVRaXhSUVVGUkxFVkJRVVVzVDBGQlR5eERRVUZGTEdWQlFXVTdPMGxCUTJ4RExHVkJRV1VzUlVGQlJTeFBRVUZQTEVOQlFVTXNiVUpCUVcxQ096dEpRVU0xUXl4VFFVRlRMRVZCUVVVc1QwRkJUeXhEUVVGRkxEQkNRVUV3UWpzN1NVRkRPVU1zVVVGQlVTeEZRVUZGTEU5QlFVOHNRMEZCUlN3MFFrRkJORUk3TzBsQlF5OURMRkZCUVZFc1JVRkJSU3hQUVVGUExFTkJRVVVzYTBKQlFXdENPenRKUVVOeVF5eFRRVUZUTEVWQlFVVXNUMEZCVHl4RFFVRkZMR2xEUVVGcFF6czdTVUZGY2tRc1MwRkJTeXhGUVVGRkxFOUJRVThzUTBGQlJTeDVRMEZCZVVNN08wbEJRM3BFTEUxQlFVMHNSVUZCUlN4UFFVRlBPME5CUTJ4Q0xFTkJRVU03UVVGRlJpeGxRVUZsTEZsQlFWa3NRMEZCUXlKOVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2NvcmUvbWVtb3J5TGF5b3V0LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8qIGdsb2JhbCBTaGFyZWRBcnJheUJ1ZmZlciAqL1xuaW1wb3J0IHR3b3NDb21wbGVtZW50IGZyb20gXCIuLi91dGlsL3R3b3NDb21wbGVtZW50LmpzXCI7XG52YXIgU2NyZWVuID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTY3JlZW4oaWQsIGJvcmRlcklkLCBtZW1vcnksIF9hKSB7XG4gICAgICAgIHZhciBfYiA9IF9hID09PSB2b2lkIDAgPyB7fSA6IF9hLCBfYyA9IF9iLndvcmtlciwgd29ya2VyID0gX2MgPT09IHZvaWQgMCA/IGZhbHNlIDogX2MsIF9kID0gX2Iuc2hhcmVkLCBzaGFyZWQgPSBfZCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfZCwgX2UgPSBfYi53aXRoU2hhcmVkQXJyYXlCdWZmZXIsIHdpdGhTaGFyZWRBcnJheUJ1ZmZlciA9IF9lID09PSB2b2lkIDAgPyB1bmRlZmluZWQgOiBfZTtcbiAgICAgICAgdmFyIHdpZHRoID0gMzIwLCBoZWlnaHQgPSAyMDAsIGxheW91dCA9IG1lbW9yeSAmJiBtZW1vcnkubGF5b3V0O1xuICAgICAgICB0aGlzLl9zaGFyZWQgPSBCb29sZWFuKHNoYXJlZCB8fCB3aXRoU2hhcmVkQXJyYXlCdWZmZXIpO1xuICAgICAgICB0aGlzLl93b3JrZXIgPSB3b3JrZXI7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5fdGlsZVdpZHRoID0gODtcbiAgICAgICAgdGhpcy5fdGlsZUhlaWdodCA9IDg7XG4gICAgICAgIHRoaXMuX3RpbGVDb2x1bW5zID0gd2lkdGggLyB0aGlzLl90aWxlV2lkdGg7XG4gICAgICAgIHRoaXMuX3RpbGVSb3dzID0gaGVpZ2h0IC8gdGhpcy5fdGlsZUhlaWdodDtcbiAgICAgICAgaWYgKCF3b3JrZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3NjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgICAgIHRoaXMuX3NjcmVlbi5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCB3aWR0aCk7XG4gICAgICAgICAgICB0aGlzLl9zY3JlZW4uc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLl9zY3JlZW5DdHggPSB0aGlzLl9zY3JlZW4uZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCB3aWR0aCk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXNDdHggPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgdGhpcy5fc2NyZWVuQm9yZGVyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChib3JkZXJJZCk7XG4gICAgICAgICAgICB0aGlzLl9mcmFtZURhdGEgPSB0aGlzLl9jYW52YXNDdHguY3JlYXRlSW1hZ2VEYXRhKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21lbW9yeSA9IG1lbW9yeTtcbiAgICAgICAgdGhpcy5fbGF5b3V0ID0gbGF5b3V0O1xuICAgICAgICAvLyB3ZSBhbHNvIG5lZWQgdGhlIDMyLWJpdCBhcnJheSB0aGF0IHRoZSBjYW52YXMgd2lsbCB1c2VcbiAgICAgICAgaWYgKHdpdGhTaGFyZWRBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgdGhpcy5fZnJhbWVCdWZmZXIgPSB3aXRoU2hhcmVkQXJyYXlCdWZmZXI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXdvcmtlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lQnVmID0gbmV3IChzaGFyZWQgPyBTaGFyZWRBcnJheUJ1ZmZlciA6IEFycmF5QnVmZmVyKSh0aGlzLl9mcmFtZURhdGEuZGF0YS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gbmV3IFVpbnQzMkFycmF5KHRoaXMuX2ZyYW1lQnVmKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZTggPSBuZXcgVWludDhBcnJheSh0aGlzLl9mcmFtZUJ1Zik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc29tZSB0aGluZ3MgZGVwZW5kIHVwb24gb3VyIGJyb3dzZXJcbiAgICAgICAgdGhpcy5yZW5kZXJUaWxlUGFnZVRvQ2FudmFzID0gdGhpcy5yZW5kZXJUaWxlUGFnZVRvQ2FudmFzU2FmYXJpO1xuICAgICAgICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiY2hyb21lXCIpID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRpbGVQYWdlVG9DYW52YXMgPSB0aGlzLnJlbmRlclRpbGVQYWdlVG9DYW52YXNDaHJvbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0IHVwIG91ciBpbml0aWFsIHZhbHVlc1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgU2NyZWVuLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbWVtb3J5ID0gdGhpcy5fbWVtb3J5O1xuICAgICAgICB2YXIgbGF5b3V0ID0gdGhpcy5fbGF5b3V0O1xuICAgICAgICBpZiAobWVtb3J5KSB7XG4gICAgICAgICAgICB0aGlzLl9wYWxldHRlID0gbWVtb3J5LnJhbmdlMzIobGF5b3V0LnBhbGV0dGVTdGFydCwgbGF5b3V0LnBhbGV0dGVMZW5ndGgzMik7XG4gICAgICAgICAgICAvLyB0aWxlc2V0c1xuICAgICAgICAgICAgdGhpcy5fdGlsZXNldHMgPSBtZW1vcnkucmFuZ2UobGF5b3V0LnRpbGVTZXRzU3RhcnQsIGxheW91dC50aWxlU2V0c0xlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLl90aWxlcyA9IG1lbW9yeS5yYW5nZShsYXlvdXQudGlsZVBhZ2VzU3RhcnQsIGxheW91dC50aWxlUGFnZXNMZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2NyZWVuLnByb3RvdHlwZSwgXCJzaGFyZWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaGFyZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTY3JlZW4ucHJvdG90eXBlLCBcInNoYXJlZEFycmF5QnVmZmVyXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQgPyB0aGlzLl9mcmFtZUJ1ZiA6IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFNjcmVlbi5wcm90b3R5cGUuc2V0U2hhcmVkQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiAoc2hhcmVkQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgdGhpcy5fZnJhbWVCdWYgPSBzaGFyZWRBcnJheUJ1ZmZlcjtcbiAgICAgICAgdGhpcy5fZnJhbWUgPSBuZXcgVWludDMyQXJyYXkodGhpcy5fZnJhbWVCdWYpO1xuICAgICAgICB0aGlzLl9mcmFtZTggPSBuZXcgVWludDhBcnJheSh0aGlzLl9mcmFtZUJ1Zik7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnNldFBhbGV0dGVFbnRyeSA9IGZ1bmN0aW9uIChpZHgsIHIsIGcsIGIpIHtcbiAgICAgICAgdmFyIGFkZHIgPSB0aGlzLl9sYXlvdXQucGFsZXR0ZVN0YXJ0ICsgKGlkeCA8PCAyKTtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UoYWRkciArIDMsIDB4RkYpO1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZShhZGRyICsgMiwgYik7XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKGFkZHIgKyAxLCBnKTtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UoYWRkciArIDAsIHIpO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5nZXRQYWxldHRlRW50cnkgPSBmdW5jdGlvbiAoaWR4KSB7XG4gICAgICAgIHZhciBhZGRyID0gdGhpcy5fbGF5b3V0LnBhbGV0dGVTdGFydCArIChpZHggPDwgMik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiB0aGlzLl9tZW1vcnkucGVlayhhZGRyKSxcbiAgICAgICAgICAgIGc6IHRoaXMuX21lbW9yeS5wZWVrKGFkZHIgKyAxKSxcbiAgICAgICAgICAgIGI6IHRoaXMuX21lbW9yeS5wZWVrKGFkZHIgKyAyKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5pbml0UGFsZXR0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHIsIGcsIGIsIG0sIG1hID0gWzAsIDEyOCwgMTkyLCAyNTVdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgICAgICAgICBtID0gbWFbKCgoaSAmIDB4QzApID4+IDYpKV07XG4gICAgICAgICAgICByID0gbWFbKChpICYgMHgzMCkgPj4gNCldIHx8IG07XG4gICAgICAgICAgICBnID0gbWFbKChpICYgMHgwQykgPj4gMildIHx8IG07XG4gICAgICAgICAgICBiID0gbWFbKChpICYgMHgwMykgPj4gMCldIHx8IG07XG4gICAgICAgICAgICB0aGlzLnNldFBhbGV0dGVFbnRyeShpLCByLCBnLCBiKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5zZXRCYWNrZ3JvdW5kQ29sb3IgPSBmdW5jdGlvbiAoYykge1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZSh0aGlzLl9sYXlvdXQuYmFja2dyb3VuZENvbG9yLCBjKTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuZ2V0QmFja2dyb3VuZENvbG9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVtb3J5LnBlZWsodGhpcy5fbGF5b3V0LmJhY2tncm91bmRDb2xvcik7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnNldEJvcmRlclNpemUgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZSh0aGlzLl9sYXlvdXQuYm9yZGVyU2l6ZVgsIHgpO1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZSh0aGlzLl9sYXlvdXQuYm9yZGVyU2l6ZVksIHkpO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5nZXRCb3JkZXJTaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gW3RoaXMuX21lbW9yeS5wZWVrKHRoaXMuX2xheW91dC5ib3JkZXJTaXplWCkgJiAweDNGLFxuICAgICAgICAgICAgdGhpcy5fbWVtb3J5LnBlZWsodGhpcy5fbGF5b3V0LmJvcmRlclNpemVZKSAmIDB4M0ZdO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5zZXRCb3JkZXJDb2xvciA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKHRoaXMuX2xheW91dC5ib3JkZXJDb2xvciwgYyk7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLmdldEJvcmRlckNvbG9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVtb3J5LnBlZWsodGhpcy5fbGF5b3V0LmJvcmRlckNvbG9yKTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuc2V0R3JhcGhpY3NMYXllciA9IGZ1bmN0aW9uIChsKSB7XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKHRoaXMuX2xheW91dC5ncmFwaGljc0xheWVyLCBsKTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuZ2V0R3JhcGhpY3NMYXllciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lbW9yeS5wZWVrKHRoaXMuX2xheW91dC5ncmFwaGljc0xheWVyKSAmIDB4ODc7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnNldFRpbGVQYWdlTGF5ZXIgPSBmdW5jdGlvbiAocGFnZSwgbCkge1xuICAgICAgICB2YXIgbGF5ZXJzID0gW3RoaXMuX2xheW91dC50aWxlUGFnZTBMYXllcixcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTFMYXllcixcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTJMYXllcixcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTNMYXllcl07XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKGxheWVyc1twYWdlXSwgbCk7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLmdldFRpbGVQYWdlTGF5ZXIgPSBmdW5jdGlvbiAocGFnZSkge1xuICAgICAgICB2YXIgbGF5ZXJzID0gW3RoaXMuX2xheW91dC50aWxlUGFnZTBMYXllcixcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTFMYXllcixcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTJMYXllcixcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTNMYXllcl07XG4gICAgICAgIHJldHVybiB0aGlzLl9tZW1vcnkucGVlayhsYXllcnNbcGFnZV0pICYgMHg4NztcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuc2V0VGlsZVBhZ2VPZmZzZXRzID0gZnVuY3Rpb24gKHBhZ2UsIHgsIHkpIHtcbiAgICAgICAgdmFyIG9mZnNldFggPSBbdGhpcy5fbGF5b3V0LnRpbGVQYWdlME9mZnNldFgsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UxT2Zmc2V0WCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTJPZmZzZXRYLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlM09mZnNldFhdO1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZShvZmZzZXRYW3BhZ2VdLCB4IDwgMCA/IHggKyAyNTYgOiB4KTtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2Uob2Zmc2V0WFtwYWdlXSArIDEsIHkgPCAwID8geSArIDI1NiA6IHkpO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5nZXRUaWxlUGFnZU9mZnNldHMgPSBmdW5jdGlvbiAocGFnZSkge1xuICAgICAgICB2YXIgb2Zmc2V0WCA9IFt0aGlzLl9sYXlvdXQudGlsZVBhZ2UwT2Zmc2V0WCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTFPZmZzZXRYLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMk9mZnNldFgsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UzT2Zmc2V0WF07XG4gICAgICAgIHJldHVybiBbdGhpcy5fbWVtb3J5LnBlZWsob2Zmc2V0WFtwYWdlXSksXG4gICAgICAgICAgICB0aGlzLl9tZW1vcnkucGVlayhvZmZzZXRYW3BhZ2VdICsgMSldO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5zZXRUaWxlUGFnZUNyb3BzID0gZnVuY3Rpb24gKHBhZ2UsIHgsIHkpIHtcbiAgICAgICAgdmFyIGNyb3BYID0gW3RoaXMuX2xheW91dC50aWxlUGFnZTBDcm9wWCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTFDcm9wWCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTJDcm9wWCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTNDcm9wWF07XG4gICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKGNyb3BYW3BhZ2VdLCB4KTtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UoY3JvcFhbcGFnZV0gKyAxLCB5KTtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuZ2V0VGlsZVBhZ2VDcm9wcyA9IGZ1bmN0aW9uIChwYWdlKSB7XG4gICAgICAgIHZhciBjcm9wWCA9IFt0aGlzLl9sYXlvdXQudGlsZVBhZ2UwQ3JvcFgsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UxQ3JvcFgsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UyQ3JvcFgsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UzQ3JvcFhdO1xuICAgICAgICByZXR1cm4gW3RoaXMuX21lbW9yeS5wZWVrKGNyb3BYW3BhZ2VdKSAmIDB4M0YsXG4gICAgICAgICAgICB0aGlzLl9tZW1vcnkucGVlayhjcm9wWFtwYWdlXSArIDEpICYgMHgzRl07XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnNldFRpbGVQYWdlU2V0ID0gZnVuY3Rpb24gKHBhZ2UsIHNldCkge1xuICAgICAgICB2YXIgbGF5ZXJzID0gW3RoaXMuX2xheW91dC50aWxlUGFnZTBTZXQsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UxU2V0LFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMlNldCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTNTZXRdO1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZShsYXllcnNbcGFnZV0sIHNldCk7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLmdldFRpbGVQYWdlU2V0ID0gZnVuY3Rpb24gKHBhZ2UpIHtcbiAgICAgICAgdmFyIGxheWVycyA9IFt0aGlzLl9sYXlvdXQudGlsZVBhZ2UwU2V0LFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMVNldCxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTJTZXQsXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQudGlsZVBhZ2UzU2V0XTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lbW9yeS5wZWVrKGxheWVyc1twYWdlXSkgJiAweDAzO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5zZXRUaWxlUGFnZVNjYWxlID0gZnVuY3Rpb24gKHBhZ2UsIHNjYWxlKSB7XG4gICAgICAgIHZhciBsYXllcnMgPSBbdGhpcy5fbGF5b3V0LnRpbGVQYWdlMFNjYWxlLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMVNjYWxlLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlMlNjYWxlLFxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnRpbGVQYWdlM1NjYWxlXTtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UobGF5ZXJzW3BhZ2VdLCBzY2FsZSk7XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLmdldFRpbGVQYWdlU2NhbGUgPSBmdW5jdGlvbiAocGFnZSkge1xuICAgICAgICB2YXIgbGF5ZXJzID0gW3RoaXMuX2xheW91dC50aWxlUGFnZTBTY2FsZSxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTFTY2FsZSxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTJTY2FsZSxcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50aWxlUGFnZTNTY2FsZV07XG4gICAgICAgIHJldHVybiB0aGlzLl9tZW1vcnkucGVlayhsYXllcnNbcGFnZV0pICYgMHgwRjtcbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUuaW5pdFNjcmVlbkNvbmZpZ3VyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2V0QmFja2dyb3VuZENvbG9yKDB4MDEpOyAvLyBkYXJrIGJsdWVcbiAgICAgICAgdGhpcy5zZXRCb3JkZXJTaXplKDB4MDEsIDB4MDEpOyAvLyA4cHggb24gYWxsIHNpZGVzXG4gICAgICAgIHRoaXMuc2V0Qm9yZGVyQ29sb3IoMHgwQSk7XG4gICAgICAgIHRoaXMuc2V0R3JhcGhpY3NMYXllcigweEZGKTsgLy8gZ3JhcGhpY3MgaGlkZGVuIGJ5IGRlZmF1bHQ7XG4gICAgICAgIGZvciAodmFyIHBhZ2UgPSAwOyBwYWdlIDwgNDsgcGFnZSsrKSB7XG4gICAgICAgICAgICB2YXIgdGlsZVBhZ2VCYXNlID0gdGhpcy5fbGF5b3V0LnRpbGVQYWdlMCArICh0aGlzLl9sYXlvdXQudGlsZVBhZ2VMZW5ndGggKiBwYWdlKTtcbiAgICAgICAgICAgIHZhciB0aWxlQkdDb2xvciA9IHRpbGVQYWdlQmFzZSArIDB4MDQwMDtcbiAgICAgICAgICAgIHZhciB0aWxlRkdDb2xvciA9IHRpbGVCR0NvbG9yICsgMHgwNDAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgMHgwNDAwOyBpZHgrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKHRpbGVQYWdlQmFzZSArIGlkeCwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UodGlsZUJHQ29sb3IgKyBpZHgsIDApO1xuICAgICAgICAgICAgICAgIHRoaXMuX21lbW9yeS5wb2tlKHRpbGVGR0NvbG9yICsgaWR4LCAweEZGKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0VGlsZVBhZ2VMYXllcihwYWdlLCAocGFnZSA9PT0gMCkgPyAweDAxIDogMHhGRik7IC8vIG9ubHkgdGlsZSBwYWdlIDAgaXMgdmlzaWJsZSBieSBkZWZhdWx0XG4gICAgICAgICAgICB0aGlzLnNldFRpbGVQYWdlQ3JvcHMocGFnZSwgMCwgMCk7IC8vIG5vIGNyb3BzXG4gICAgICAgICAgICB0aGlzLnNldFRpbGVQYWdlT2Zmc2V0cyhwYWdlLCAwLCAwKTsgLy8gbm8gb2Zmc2V0c1xuICAgICAgICAgICAgdGhpcy5zZXRUaWxlUGFnZVNjYWxlKHBhZ2UsIDApOyAvLyBubyBzY2FsaW5nXG4gICAgICAgICAgICB0aGlzLnNldFRpbGVQYWdlU2V0KHBhZ2UsIDApOyAvLyBmaXJzdCB0aWxlIHNldFxuICAgICAgICB9XG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnNldFBpeGVsID0gZnVuY3Rpb24gKHgsIHksIGMpIHtcbiAgICAgICAgLy8gbGV0IGFkZHIgPSAoKCh5ICogdGhpcy5fd2lkdGgpICsgeCkgJiAweEZGRkYpO1xuICAgICAgICAvLyBsZXQgYWRkciA9ICgoeSAqIHRoaXMuX3dpZHRoKSArIHgpO1xuICAgICAgICAvLyBsZXQgYWRkciA9ICgoKHkgPDwgOCkgKyAoeSA8PCA2KSArIHgpICYgMHhGRkZGKTtcbiAgICAgICAgdmFyIGFkZHIgPSAoKHkgPDwgOCkgKyAoeSA8PCA2KSArIHgpO1xuICAgICAgICB0aGlzLl9mcmFtZVthZGRyXSA9IGM7IC8vdGhpcy5fcGFsZXR0ZVtjXSB8IDB4RkYwMDAwMDA7XG4gICAgfTtcbiAgICAvKlxuICAgIHNldFBpeGVsICh4LCB5LCBjKSB7XG4gICAgICBsZXQgYWRkciA9ICgoeSA8PCA4KSArICh5IDw8IDYpICsgeCkgPDwgMjtcbiAgICAgIGxldCBjb2xvciA9IHRoaXMuX3BhbGV0dGVbY107XG4gICAgICB0aGlzLl9mcmFtZUJ1ZlthZGRyKytdID0gY29sb3IgJiAweEZGOyBjb2xvciA+Pj0gODtcbiAgICAgIHRoaXMuX2ZyYW1lQnVmW2FkZHIrK10gPSBjb2xvciAmIDB4RkY7IGNvbG9yID4+PSA4O1xuICAgICAgdGhpcy5fZnJhbWVCdWZbYWRkcisrXSA9IGNvbG9yICYgMHhGRjtcbiAgICAgIHRoaXMuX2ZyYW1lQnVmW2FkZHJdICAgPSAweEZGO1xuICAgIH1cbiAgICAqL1xuICAgIFNjcmVlbi5wcm90b3R5cGUuc2V0VGlsZSA9IGZ1bmN0aW9uIChwYWdlLCByb3csIGNvbCwgdGlsZSwgYmdDb2xvciwgZmdDb2xvcikge1xuICAgICAgICBpZiAoYmdDb2xvciA9PT0gdm9pZCAwKSB7IGJnQ29sb3IgPSAweDAwOyB9XG4gICAgICAgIGlmIChmZ0NvbG9yID09PSB2b2lkIDApIHsgZmdDb2xvciA9IDB4RkY7IH1cbiAgICAgICAgdmFyIGJhc2VBZGRyID0gdGhpcy5fbGF5b3V0LnRpbGVQYWdlMCArICh0aGlzLl9sYXlvdXQudGlsZVBhZ2VMZW5ndGggKiBwYWdlKTtcbiAgICAgICAgdmFyIHRpbGVBZGRyID0gYmFzZUFkZHIgKyAocm93ICogdGhpcy5fdGlsZUNvbHVtbnMpICsgY29sO1xuICAgICAgICB2YXIgYmdBZGRyID0gdGlsZUFkZHIgKyAweDA0MDA7XG4gICAgICAgIHZhciBmZ0FkZHIgPSB0aWxlQWRkciArIDB4MDgwMDtcbiAgICAgICAgdGhpcy5fbWVtb3J5LnBva2UodGlsZUFkZHIsIHRpbGUpO1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZShiZ0FkZHIsIGJnQ29sb3IpO1xuICAgICAgICB0aGlzLl9tZW1vcnkucG9rZShmZ0FkZHIsIGZnQ29sb3IpO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5yZW5kZXJCYWNrZ3JvdW5kQ29sb3JUb0NhbnZhcyA9IGZ1bmN0aW9uIChwYWxldHRlKSB7XG4gICAgICAgIHZhciBjID0gdGhpcy5nZXRCYWNrZ3JvdW5kQ29sb3IoKTtcbiAgICAgICAgdGhpcy5fZnJhbWUuZmlsbChwYWxldHRlW2NdKTtcbiAgICAgICAgLyplc2xpbnQtZGlzYWJsZSBuby12YXIsIHZhcnMtb24tdG9wKi9cbiAgICAgICAgLy8gICAgICAgIGZvciAodmFyIHkgPSB0aGlzLl9oZWlnaHQgLSAxOyB5ICE9PSAwOyB5LS0pIHtcbiAgICAgICAgLy8gICAgICAgICAgICBmb3IgKHZhciB4ID0gdGhpcy5fd2lkdGggLSAxOyB4ICE9PSAwOyB4LS0pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhpcy5zZXRQaXhlbCh4LCB5LCBjKTtcbiAgICAgICAgLy8gICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICB9XG4gICAgICAgIC8qZXNsaW50LWVuYWJsZSBuby12YXIsIHZhcnMtb24tdG9wKi9cbiAgICB9O1xuICAgIC8qZXNsaW50LWRpc2FibGUgbWF4LWRlcHRoKi9cbiAgICBTY3JlZW4ucHJvdG90eXBlLnJlbmRlclRpbGVQYWdlVG9DYW52YXNDaHJvbWUgPSBmdW5jdGlvbiAocGFnZSwgcGFsZXR0ZSkge1xuICAgICAgICAvKmVzbGludC1kaXNhYmxlIG5vLXZhciwgdmFycy1vbi10b3AqL1xuICAgICAgICB2YXIgX2EgPSB0aGlzLmdldFRpbGVQYWdlQ3JvcHMocGFnZSksIGNyb3BYID0gX2FbMF0sIGNyb3BZID0gX2FbMV0sIGNyb3BMZWZ0ID0gY3JvcFgsIGNyb3BMZWZ0TWFza2VkID0gY3JvcExlZnQgJiAweEZGOCwgY3JvcFJpZ2h0ID0gdGhpcy5fd2lkdGggLSBjcm9wWCwgY3JvcFJpZ2h0TWFza2VkID0gKGNyb3BSaWdodCAmIDB4RkY4KSArIDEsIGNyb3BUb3AgPSBjcm9wWSwgY3JvcFRvcE1hc2tlZCA9IGNyb3BUb3AgJiAweEZGOCwgY3JvcEJvdHRvbSA9IHRoaXMuX2hlaWdodCAtIGNyb3BZLCBjcm9wQm90dG9tTWFza2VkID0gKGNyb3BCb3R0b20gJiAweEZGOCkgKyAxLCBfYiA9IHRoaXMuZ2V0VGlsZVBhZ2VPZmZzZXRzKHBhZ2UpLCBvZmZzZXRYID0gX2JbMF0sIG9mZnNldFkgPSBfYlsxXSwgc2NhbGUgPSB0aGlzLmdldFRpbGVQYWdlU2NhbGUocGFnZSkgJiAweDA3LCB0aWxlU2V0ID0gdGhpcy5nZXRUaWxlUGFnZVNldChwYWdlKSwgdGlsZVNldEJhc2UgPSB0aWxlU2V0ICogMTYzODQsIHRpbGVQYWdlQmFzZSA9IHBhZ2UgKiAweDEwMDAsIHRpbGVGb3JlZ3JvdW5kQ29sb3IsIHRpbGVCYWNrZ3JvdW5kQ29sb3IsIGFkZHIsIHRpbGUsIHRpbGVTZXRBZGRyLCB0cGl4LCBuZXd4LCBuZXd5LCBiYXNlWCwgYmFzZVksIHNoaWZ0ID0gMyArIHNjYWxlO1xuICAgICAgICBvZmZzZXRYID0gdHdvc0NvbXBsZW1lbnQuZnJvbTgob2Zmc2V0WCk7XG4gICAgICAgIG9mZnNldFkgPSB0d29zQ29tcGxlbWVudC5mcm9tOChvZmZzZXRZKTtcbiAgICAgICAgLy8gaXRlcmF0ZSByb3cgLS0tPiBjb2wgb3ZlciB0aGUgdGlsZSBwYWdlXG4gICAgICAgIGZvciAodmFyIHJvdyA9IHRoaXMuX3RpbGVSb3dzIC0gMTsgcm93ID4gLTE7IHJvdy0tKSB7XG4gICAgICAgICAgICAvLyBiYXNlWSBzaG91bGQgYmUgdGhlIHRvcG1vc3QgWSBwb3NpdGlvbiBvZiB0aGUgdGlsZVxuICAgICAgICAgICAgYmFzZVkgPSAocm93IDw8IHNoaWZ0KSArIG9mZnNldFk7XG4gICAgICAgICAgICAvLyBvbmx5IHBhaW50IHRpbGVzIHRoYXQgaGF2ZSB2aXNpYmxlIHBvcnRpb25zIG9uIHNjcmVlblxuICAgICAgICAgICAgaWYgKGJhc2VZID49IGNyb3BUb3BNYXNrZWQgJiYgYmFzZVkgPD0gY3JvcEJvdHRvbU1hc2tlZCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGNvbCA9IHRoaXMuX3RpbGVDb2x1bW5zIC0gMTsgY29sID4gLTE7IGNvbC0tKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGJhc2VYIHNob3VsZCBpbmRpY2F0ZSB0aGUgbGVmdG1vc3QgWCBwb3NpdGlvbiBvZiB0aGUgdGlsZVxuICAgICAgICAgICAgICAgICAgICBiYXNlWCA9IChjb2wgPDwgc2hpZnQpICsgb2Zmc2V0WDtcbiAgICAgICAgICAgICAgICAgICAgLy8gb25seSBkcmF3IGlmIHRoZSB0aWxlIGlzIHZpc2libGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VYID49IGNyb3BMZWZ0TWFza2VkICYmIGJhc2VYIDw9IGNyb3BSaWdodE1hc2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkciBzaG91bGQgaW5kaWNhdGUgdGhlIHRpbGUgcGFnZSBhZGRyZXNzIG9mIHRoZSB0aWxlXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRyID0gKHJvdyA8PCA1KSArIChyb3cgPDwgMykgKyBjb2wgKyB0aWxlUGFnZUJhc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHRpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGUgPSB0aGlzLl90aWxlc1thZGRyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVTZXRBZGRyID0gdGlsZVNldEJhc2UgKyAodGlsZSA8PCA2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBjb3JyZXNwb25kaW5nIGNvbG9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZUJhY2tncm91bmRDb2xvciA9IHRoaXMuX3RpbGVzW2FkZHIgKyAweDA0MDBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZUZvcmVncm91bmRDb2xvciA9IHRoaXMuX3RpbGVzW2FkZHIgKyAweDA4MDBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCwgZHJhdyBlYWNoIHBpeGVsIG9mIHRoZSB0aWxlXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB5ID0gKDggPDwgc2NhbGUpIC0gMTsgeSA+IC0xOyB5LS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXd5ID0geSArIGJhc2VZO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAoOCA8PCBzY2FsZSkgLSAxOyB4ID4gLTE7IHgtLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cGl4ID0gdGhpcy5fdGlsZXNldHNbdGlsZVNldEFkZHIgKyAoKCh5ID4+IHNjYWxlKSA8PCAzKSArICh4ID4+IHNjYWxlKSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHBpeCA9PT0gMHgwMCB8fCB0cGl4ID09PSAweEZGKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cGl4ID0gKHRwaXggPT09IDB4RkYgPyB0aWxlRm9yZWdyb3VuZENvbG9yIDogdGlsZUJhY2tncm91bmRDb2xvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRwaXggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXd4ID0geCArIGJhc2VYO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgobmV3eCA+PSBjcm9wTGVmdCkgJiYgKG5ld3ggPCBjcm9wUmlnaHQpKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgobmV3eSA+PSBjcm9wVG9wKSAmJiAobmV3eSA8IGNyb3BCb3R0b20pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGl4ZWwobmV3eCwgbmV3eSwgcGFsZXR0ZVt0cGl4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qZXNsaW50LWVuYWJsZSBtYXgtZGVwdGgqL1xuICAgIFNjcmVlbi5wcm90b3R5cGUucmVuZGVyVGlsZVBhZ2VUb0NhbnZhc1NhZmFyaSA9IGZ1bmN0aW9uIChwYWdlLCBwYWxldHRlKSB7XG4gICAgICAgIC8qZXNsaW50LWRpc2FibGUgbm8tdmFyLCB2YXJzLW9uLXRvcCovXG4gICAgICAgIHZhciBfYSA9IHRoaXMuZ2V0VGlsZVBhZ2VDcm9wcyhwYWdlKSwgY3JvcFggPSBfYVswXSwgY3JvcFkgPSBfYVsxXSwgY3JvcExlZnQgPSBjcm9wWCwgY3JvcFJpZ2h0ID0gdGhpcy5fd2lkdGggLSBjcm9wWCwgY3JvcFRvcCA9IGNyb3BZLCBjcm9wQm90dG9tID0gdGhpcy5faGVpZ2h0IC0gY3JvcFksIF9iID0gdGhpcy5nZXRUaWxlUGFnZU9mZnNldHMocGFnZSksIG9mZnNldFggPSBfYlswXSwgb2Zmc2V0WSA9IF9iWzFdLCBzY2FsZSA9IHRoaXMuZ2V0VGlsZVBhZ2VTY2FsZShwYWdlKSAmIDB4MDcsIHRpbGVTZXQgPSB0aGlzLmdldFRpbGVQYWdlU2V0KHBhZ2UpLCB0aWxlU2V0QmFzZSA9IHRpbGVTZXQgKiAxNjM4NCwgdGlsZVBhZ2VCYXNlID0gcGFnZSAqIDB4MTAwMCwgdGlsZUZvcmVncm91bmRDb2xvciwgdGlsZUJhY2tncm91bmRDb2xvciwgYWRkciwgdGlsZSwgdGlsZVNldEFkZHIsIHRwaXgsIG5ld3gsIG5ld3ksIHNoaWZ0ID0gMyArIHNjYWxlLCBzaGlmdGVkWSwgc2NhbGVkWTtcbiAgICAgICAgb2Zmc2V0WCA9IHR3b3NDb21wbGVtZW50LmZyb204KG9mZnNldFgpO1xuICAgICAgICBvZmZzZXRZID0gdHdvc0NvbXBsZW1lbnQuZnJvbTgob2Zmc2V0WSk7XG4gICAgICAgIGZvciAodmFyIHkgPSB0aGlzLl9oZWlnaHQgLSAxOyB5ID4gLTE7IHktLSkge1xuICAgICAgICAgICAgc2hpZnRlZFkgPSB5ID4+IHNoaWZ0O1xuICAgICAgICAgICAgc2NhbGVkWSA9IHkgPj4gc2NhbGU7XG4gICAgICAgICAgICBuZXd5ID0geSArIG9mZnNldFk7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gdGhpcy5fd2lkdGggLSAxOyB4ID4gLTE7IHgtLSkge1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgdGlsZSBpbmRleFxuICAgICAgICAgICAgICAgIC8vYWRkciA9ICgoeSA+PiBzaGlmdCkgKiB0aGlzLl90aWxlQ29sdW1ucykgKyAoeCA+PiBzaGlmdCk7XG4gICAgICAgICAgICAgICAgYWRkciA9IChzaGlmdGVkWSA8PCA1KSArIChzaGlmdGVkWSA8PCAzKSArICh4ID4+IHNoaWZ0KSArIHRpbGVQYWdlQmFzZTtcbiAgICAgICAgICAgICAgICB0aWxlID0gdGhpcy5fdGlsZXNbYWRkcl07XG4gICAgICAgICAgICAgICAgLy8gZ2V0IGNvcnJlc3BvbmRpbmcgY29sb3JzXG4gICAgICAgICAgICAgICAgdGlsZUJhY2tncm91bmRDb2xvciA9IHRoaXMuX3RpbGVzW2FkZHIgKyAweDA0MDBdO1xuICAgICAgICAgICAgICAgIHRpbGVGb3JlZ3JvdW5kQ29sb3IgPSB0aGlzLl90aWxlc1thZGRyICsgMHgwODAwXTtcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHRpbGUgcGl4ZWxcbiAgICAgICAgICAgICAgICB0aWxlU2V0QWRkciA9ICgoc2NhbGVkWSAmIDB4MDcpIDw8IDMpICsgKCh4ID4+IHNjYWxlKSAmIDB4MDcpICsgKHRpbGUgPDwgNikgKyB0aWxlU2V0QmFzZTtcbiAgICAgICAgICAgICAgICB0cGl4ID0gdGhpcy5fdGlsZXNldHNbdGlsZVNldEFkZHJdO1xuICAgICAgICAgICAgICAgIGlmICh0cGl4ID09PSAweDAwIHx8IHRwaXggPT09IDB4RkYpIHtcbiAgICAgICAgICAgICAgICAgICAgdHBpeCA9ICh0cGl4ID09PSAweEZGID8gdGlsZUZvcmVncm91bmRDb2xvciA6IHRpbGVCYWNrZ3JvdW5kQ29sb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXd4ID0geCArIG9mZnNldFg7XG4gICAgICAgICAgICAgICAgaWYgKHRwaXggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoKG5ld3ggPj0gY3JvcExlZnQpICYmIChuZXd4IDwgY3JvcFJpZ2h0KSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICgobmV3eSA+PSBjcm9wVG9wKSAmJiAobmV3eSA8IGNyb3BCb3R0b20pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQaXhlbChuZXd4LCBuZXd5LCBwYWxldHRlW3RwaXhdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKmVzbGludC1lbmFibGUgbm8tdmFyLCB2YXJzLW9uLXRvcCovXG4gICAgfTtcbiAgICBTY3JlZW4ucHJvdG90eXBlLnJlbmRlckdyYXBoaWNzVG9DYW52YXMgPSBmdW5jdGlvbiAocGFsZXR0ZSkge1xuICAgICAgICB2YXIgZ3BpeCwgYWRkciA9IHRoaXMuX2xheW91dC5ncmFwaGljc1N0YXJ0O1xuICAgICAgICAvKmVzbGludC1kaXNhYmxlIG5vLXZhciwgdmFycy1vbi10b3AqL1xuICAgICAgICBmb3IgKHZhciB5ID0gdGhpcy5faGVpZ2h0IC0gMTsgeSA+IC0xOyB5LS0pIHtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSB0aGlzLl93aWR0aCAtIDE7IHggPiAtMTsgeC0tKSB7XG4gICAgICAgICAgICAgICAgYWRkcisrO1xuICAgICAgICAgICAgICAgIGdwaXggPSB0aGlzLl9tZW1vcnkucGVlayhhZGRyKTtcbiAgICAgICAgICAgICAgICBpZiAoZ3BpeCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQaXhlbCh4LCB5LCBwYWxldHRlW2dwaXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyplc2xpbnQtZW5hYmxlIG5vLXZhciwgdmFycy1vbi10b3AqL1xuICAgIH07XG4gICAgLypcbiAgICBUT0RPOlxuICAgIHJlbmRlclNwcml0ZVRvQ2FudmFzKHNwcml0ZSkge1xuXG4gICAgfVxuICAgICovXG4gICAgU2NyZWVuLnByb3RvdHlwZS5yZW5kZXJCb3JkZXJUb1NjcmVlbkJvcmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJvcmRlckNvbG9yID0gdGhpcy5nZXRCb3JkZXJDb2xvcigpO1xuICAgICAgICB2YXIgY29sb3IgPSAodGhpcy5fcGFsZXR0ZVtib3JkZXJDb2xvcl0gfCAweEZGMDAwMDAwKTtcbiAgICAgICAgdmFyIGIgPSAoY29sb3IgJiAweDAwRkYwMDAwKSA+PiAxNjtcbiAgICAgICAgdmFyIGcgPSAoY29sb3IgJiAweDAwMDBGRjAwKSA+PiA4O1xuICAgICAgICB2YXIgciA9IChjb2xvciAmIDB4MDAwMDAwRkYpO1xuICAgICAgICB2YXIgY3NzID0gXCJyZ2IoXCIgKyByICsgXCIsIFwiICsgZyArIFwiLCBcIiArIGIgKyBcIilcIjtcbiAgICAgICAgdGhpcy5fc2NyZWVuQm9yZGVyRWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY3NzO1xuICAgICAgICB0aGlzLl9zY3JlZW4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY3NzO1xuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5yZW5kZXJCb3JkZXJUb0NhbnZhcyA9IGZ1bmN0aW9uIChwYWxldHRlKSB7XG4gICAgICAgIHZhciBib3JkZXJDb2xvciA9IHRoaXMuZ2V0Qm9yZGVyQ29sb3IoKSwgX2EgPSB0aGlzLmdldEJvcmRlclNpemUoKSwgYm9yZGVyU2l6ZVggPSBfYVswXSwgYm9yZGVyU2l6ZVkgPSBfYVsxXSwgbGVmdEJvcmRlciA9IGJvcmRlclNpemVYLCByaWdodEJvcmRlciA9IHRoaXMuX3dpZHRoIC0gYm9yZGVyU2l6ZVgsIHRvcEJvcmRlciA9IGJvcmRlclNpemVZLCBib3R0b21Cb3JkZXIgPSB0aGlzLl9oZWlnaHQgLSBib3JkZXJTaXplWTtcbiAgICAgICAgLyplc2xpbnQtZGlzYWJsZSBuby12YXIsIHZhcnMtb24tdG9wKi9cbiAgICAgICAgZm9yICh2YXIgeSA9IHRoaXMuX2hlaWdodCAtIDE7IHkgPiAtMTsgeS0tKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gdGhpcy5fd2lkdGggLSAxOyB4ID4gLTE7IHgtLSkge1xuICAgICAgICAgICAgICAgIGlmICgoKHggPCBsZWZ0Qm9yZGVyKSB8fCAoeCA+PSByaWdodEJvcmRlcikpIHx8XG4gICAgICAgICAgICAgICAgICAgICgoeSA8IHRvcEJvcmRlcikgfHwgKHkgPj0gYm90dG9tQm9yZGVyKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQaXhlbCh4LCB5LCBwYWxldHRlW2JvcmRlckNvbG9yXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qZXNsaW50LWVuYWJsZSBuby12YXIsIHZhcnMtb24tdG9wKi9cbiAgICB9O1xuICAgIFNjcmVlbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGF5ZXIsIHBhbGV0dGUgPSBbXTtcbiAgICAgICAgdmFyIGxheWVycyA9IFtcbiAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgW10sXG4gICAgICAgICAgICBbXSxcbiAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgW10sXG4gICAgICAgICAgICBbXSxcbiAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgW11cbiAgICAgICAgXTtcbiAgICAgICAgLy8gYmFja2dyb3VuZCBjb2xvciBnb2VzIGZpcnN0XG4gICAgICAgIGxheWVyc1swXS5wdXNoKHRoaXMucmVuZGVyQmFja2dyb3VuZENvbG9yVG9DYW52YXMuYmluZCh0aGlzKSk7XG4gICAgICAgIC8vIG5leHQgZmlndXJlIG91dCB3aGVyZSB0aGUgdGlsZSBwYWdlcyBnb1xuICAgICAgICBmb3IgKHZhciBwYWdlID0gMDsgcGFnZSA8IDQ7IHBhZ2UrKykge1xuICAgICAgICAgICAgbGF5ZXIgPSB0aGlzLmdldFRpbGVQYWdlTGF5ZXIocGFnZSk7XG4gICAgICAgICAgICBpZiAobGF5ZXIgPCA4KSB7XG4gICAgICAgICAgICAgICAgbGF5ZXJzW2xheWVyXS5wdXNoKHRoaXMucmVuZGVyVGlsZVBhZ2VUb0NhbnZhcy5iaW5kKHRoaXMsIHBhZ2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB0aGVuIHRoZSBncmFwaGljcyBwYWdlXG4gICAgICAgIGxheWVyID0gdGhpcy5nZXRHcmFwaGljc0xheWVyKCk7XG4gICAgICAgIGlmIChsYXllciA8IDgpIHtcbiAgICAgICAgICAgIGxheWVyc1tsYXllcl0ucHVzaCh0aGlzLnJlbmRlckdyYXBoaWNzVG9DYW52YXMuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhlbiB0aGUgc3ByaXRlc1xuICAgICAgICAvLyBUT0RPXG4gICAgICAgIC8vIHRoZW4gdGhlIGJvcmRlclxuICAgICAgICBsYXllcnNbN10ucHVzaCh0aGlzLnJlbmRlckJvcmRlclRvQ2FudmFzLmJpbmQodGhpcykpO1xuICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgY3VycmVudCBwYWxldHRlXG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICAgICAgICAgIHBhbGV0dGUucHVzaCh0aGlzLl9wYWxldHRlW2ldIHwgMHhGRjAwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSAqL1xuICAgICAgICAvLyBhbmQgbm93IGNvbXBvc2l0ZSFcbiAgICAgICAgZm9yICh2YXIgbGF5ZXJJZHggPSAwOyBsYXllcklkeCA8IDg7IGxheWVySWR4KyspIHtcbiAgICAgICAgICAgIHZhciBhY3Rpb25zID0gbGF5ZXJzW2xheWVySWR4XTtcbiAgICAgICAgICAgIGZvciAodmFyIGFjdGlvbklkeCA9IDA7IGFjdGlvbklkeCA8IGFjdGlvbnMubGVuZ3RoOyBhY3Rpb25JZHgrKykge1xuICAgICAgICAgICAgICAgIGFjdGlvbnNbYWN0aW9uSWR4XShwYWxldHRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2NyZWVuLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9mcmFtZURhdGEuZGF0YS5zZXQodGhpcy5fZnJhbWU4KTtcbiAgICAgICAgdGhpcy5fY2FudmFzQ3R4LnB1dEltYWdlRGF0YSh0aGlzLl9mcmFtZURhdGEsIDAsIDApO1xuICAgICAgICB0aGlzLl9zY3JlZW5DdHguZHJhd0ltYWdlKHRoaXMuX2NhbnZhcywgMCwgMCk7XG4gICAgICAgIHRoaXMucmVuZGVyQm9yZGVyVG9TY3JlZW5Cb3JkZXIoKTtcbiAgICB9O1xuICAgIHJldHVybiBTY3JlZW47XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgU2NyZWVuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVTJOeVpXVnVMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaVUyTnlaV1Z1TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVRkJMRGhDUVVFNFFqdEJRVU01UWl4UFFVRlBMR05CUVdNc1RVRkJUU3d5UWtGQk1rSXNRMEZCUXp0QlFVVjJSRHRKUVVOSkxHZENRVUZaTEVWQlFVVXNSVUZCUlN4UlFVRlJMRVZCUVVVc1RVRkJUU3hGUVVGRkxFVkJRVEJGTzFsQlFURkZMRFJDUVVFd1JTeEZRVUY0UlN4alFVRmpMRVZCUVdRc2JVTkJRV01zUlVGQlJTeGpRVUZqTEVWQlFXUXNiVU5CUVdNc1JVRkJSU3cyUWtGQmFVTXNSVUZCYWtNc2MwUkJRV2xETzFGQlEycEhMRWxCUVVrc1MwRkJTeXhIUVVGSExFZEJRVWNzUlVGQlJTeE5RVUZOTEVkQlFVY3NSMEZCUnl4RlFVRkZMRTFCUVUwc1IwRkJSeXhOUVVGTkxFbEJRVWtzVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXp0UlFVVm9SU3hKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEU5QlFVOHNRMEZCUXl4TlFVRk5MRWxCUVVrc2NVSkJRWEZDTEVOQlFVTXNRMEZCUXp0UlFVTjRSQ3hKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEUxQlFVMHNRMEZCUXp0UlFVVjBRaXhKUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEV0QlFVc3NRMEZCUXp0UlFVTndRaXhKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEUxQlFVMHNRMEZCUXp0UlFVTjBRaXhKUVVGSkxFTkJRVU1zVlVGQlZTeEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVTndRaXhKUVVGSkxFTkJRVU1zVjBGQlZ5eEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVTnlRaXhKUVVGSkxFTkJRVU1zV1VGQldTeEhRVUZITEV0QlFVc3NSMEZCUnl4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRE8xRkJRelZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRWRCUVVjc1RVRkJUU3hIUVVGSExFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTTdVVUZGTTBNc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTFZc1NVRkJTU3hEUVVGRExFOUJRVThzUjBGQlJ5eFJRVUZSTEVOQlFVTXNZMEZCWXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRE8xbEJRek5ETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1dVRkJXU3hEUVVGRExFOUJRVThzUlVGQlJTeExRVUZMTEVOQlFVTXNRMEZCUXp0WlFVTXhReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEZsQlFWa3NRMEZCUXl4UlFVRlJMRVZCUVVVc1RVRkJUU3hEUVVGRExFTkJRVU03V1VGRE5VTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1IwRkJSeXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRaUVVWb1JDeEpRVUZKTEVOQlFVTXNUMEZCVHl4SFFVRkhMRkZCUVZFc1EwRkJReXhoUVVGaExFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdXVUZEYUVRc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFpRVUZaTEVOQlFVTXNUMEZCVHl4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRE8xbEJRekZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1dVRkJXU3hEUVVGRExGRkJRVkVzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0WlFVTTFReXhKUVVGSkxFTkJRVU1zVlVGQlZTeEhRVUZITEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFsQlJXaEVMRWxCUVVrc1EwRkJReXhsUVVGbExFZEJRVWNzVVVGQlVTeERRVUZETEdOQlFXTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRaUVVONlJDeEpRVUZKTEVOQlFVTXNWVUZCVlN4SFFVRkhMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zWlVGQlpTeERRVUZETEV0QlFVc3NSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRSUVVOeVJTeERRVUZETzFGQlJVUXNTVUZCU1N4RFFVRkRMRTlCUVU4c1IwRkJSeXhOUVVGTkxFTkJRVU03VVVGRGRFSXNTVUZCU1N4RFFVRkRMRTlCUVU4c1IwRkJSeXhOUVVGTkxFTkJRVU03VVVGRmRFSXNlVVJCUVhsRU8xRkJRM3BFTEVWQlFVVXNRMEZCUXl4RFFVRkRMSEZDUVVGeFFpeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjRRaXhKUVVGSkxFTkJRVU1zV1VGQldTeEhRVUZITEhGQ1FVRnhRaXhEUVVGRE8xRkJRemxETEVOQlFVTTdVVUZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRaUVVOS0xFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRFZpeEpRVUZKTEVOQlFVTXNVMEZCVXl4SFFVRkhMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzYVVKQlFXbENMRWRCUVVjc1YwRkJWeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03WjBKQlF6ZEdMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzU1VGQlNTeFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8yZENRVU01UXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFbEJRVWtzVlVGQlZTeERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJRenRaUVVOc1JDeERRVUZETzFGQlEwd3NRMEZCUXp0UlFVZEVMSE5EUVVGelF6dFJRVU4wUXl4SlFVRkpMRU5CUVVNc2MwSkJRWE5DTEVkQlFVY3NTVUZCU1N4RFFVRkRMRFJDUVVFMFFpeERRVUZETzFGQlJXaEZMRVZCUVVVc1EwRkJReXhEUVVGRExFOUJRVThzVTBGQlV5eExRVUZMTEZkQlFWY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRia01zUlVGQlJTeERRVUZETEVOQlFVTXNVMEZCVXl4RFFVRkRMRk5CUVZNc1EwRkJReXhYUVVGWExFVkJRVVVzUTBGQlF5eFBRVUZQTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTXpSQ3hKUVVGSkxFTkJRVU1zYzBKQlFYTkNMRWRCUVVjc1NVRkJTU3hEUVVGRExEUkNRVUUwUWl4RFFVRkRPMWxCUTNCRkxFTkJRVU03VVVGRFRDeERRVUZETzFGQlJVUXNORUpCUVRSQ08xRkJRelZDTEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJRenRKUVVOb1FpeERRVUZETzBsQlJVUXNjVUpCUVVrc1IwRkJTanRSUVVOSkxFbEJRVTBzVFVGQlRTeEhRVUZITEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNN1VVRkROVUlzU1VGQlRTeE5RVUZOTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJRenRSUVVNMVFpeEZRVUZGTEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRMVFzU1VGQlNTeERRVUZETEZGQlFWRXNSMEZCUnl4TlFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExFMUJRVTBzUTBGQlF5eFpRVUZaTEVWQlFVVXNUVUZCVFN4RFFVRkRMR1ZCUVdVc1EwRkJReXhEUVVGRE8xbEJSVFZGTEZkQlFWYzdXVUZEV0N4SlFVRkpMRU5CUVVNc1UwRkJVeXhIUVVGSExFMUJRVTBzUTBGQlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMR0ZCUVdFc1JVRkJSU3hOUVVGTkxFTkJRVU1zWTBGQll5eERRVUZETEVOQlFVTTdXVUZETTBVc1NVRkJTU3hEUVVGRExFMUJRVTBzUjBGQlJ5eE5RVUZOTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhqUVVGakxFVkJRVVVzVFVGQlRTeERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkRPMUZCUXpsRkxFTkJRVU03U1VGRFRDeERRVUZETzBsQlJVUXNjMEpCUVVrc01FSkJRVTA3WVVGQlZqdFpRVU5KTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRE8xRkJRM2hDTEVOQlFVTTdPenRQUVVGQk8wbEJSVVFzYzBKQlFVa3NjVU5CUVdsQ08yRkJRWEpDTzFsQlEwa3NUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZETEZOQlFWTXNSMEZCUnl4SlFVRkpMRU5CUVVNN1VVRkRMME1zUTBGQlF6czdPMDlCUVVFN1NVRkZSQ3h4UTBGQmIwSXNSMEZCY0VJc1ZVRkJjVUlzYVVKQlFXbENPMUZCUTJ4RExFbEJRVWtzUTBGQlF5eFRRVUZUTEVkQlFVY3NhVUpCUVdsQ0xFTkJRVU03VVVGRGJrTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1IwRkJSeXhKUVVGSkxGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1VVRkRPVU1zU1VGQlNTeERRVUZETEU5QlFVOHNSMEZCUnl4SlFVRkpMRlZCUVZVc1EwRkJReXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdTVUZGYkVRc1EwRkJRenRKUVVWRUxHZERRVUZsTEVkQlFXWXNWVUZCWjBJc1IwRkJSeXhGUVVGRkxFTkJRVU1zUlVGQlJTeERRVUZETEVWQlFVVXNRMEZCUXp0UlFVTjRRaXhKUVVGSkxFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRmxCUVZrc1IwRkJSeXhEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnNSQ3hKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEyeERMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03VVVGREwwSXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVNdlFpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTI1RExFTkJRVU03U1VGRlJDeG5RMEZCWlN4SFFVRm1MRlZCUVdkQ0xFZEJRVWM3VVVGRFppeEpRVUZKTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExGbEJRVmtzUjBGQlJ5eERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOc1JDeE5RVUZOTEVOQlFVTTdXVUZEU0N4RFFVRkRMRVZCUVVVc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRPMWxCUXpGQ0xFTkJRVU1zUlVGQlJTeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzUTBGQlF5eERRVUZETzFsQlF6bENMRU5CUVVNc1JVRkJSU3hKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1EwRkJReXhEUVVGRE8xTkJRMnBETEVOQlFVTTdTVUZEVGl4RFFVRkRPMGxCUlVRc05FSkJRVmNzUjBGQldEdFJRVU5KTEVsQlFVa3NRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJSU3hEUVVGRExFVkJRVVVzUTBGQlF5eEZRVU5XTEVWQlFVVXNSMEZCUnl4RFFVRkRMRU5CUVVNc1JVRkJSU3hIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUlRWQ0xFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRExFZEJRVWNzUjBGQlJ5eEZRVUZGTEVOQlFVTXNSVUZCUlN4RlFVRkZMRU5CUVVNN1dVRkRNMElzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRelZDTEVOQlFVTXNSMEZCUnl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFpRVU12UWl4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZETDBJc1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUXk5Q0xFbEJRVWtzUTBGQlF5eGxRVUZsTEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJSU3hEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEY2tNc1EwRkJRenRKUVVOTUxFTkJRVU03U1VGRlJDeHRRMEZCYTBJc1IwRkJiRUlzVlVGQmJVSXNRMEZCUXp0UlFVTm9RaXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHVkJRV1VzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTjJSQ3hEUVVGRE8wbEJRMFFzYlVOQlFXdENMRWRCUVd4Q08xRkJRMGtzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNN1NVRkRNMFFzUTBGQlF6dEpRVVZFTERoQ1FVRmhMRWRCUVdJc1ZVRkJZeXhEUVVGRExFVkJRVVVzUTBGQlF6dFJRVU5rTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNWMEZCVnl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJReTlETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNWMEZCVnl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMjVFTEVOQlFVTTdTVUZEUkN3NFFrRkJZU3hIUVVGaU8xRkJRMGtzVFVGQlRTeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4WFFVRlhMRU5CUVVNc1IwRkJSeXhKUVVGSk8xbEJRekZFTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFTkJRVU03U1VGRGVFUXNRMEZCUXp0SlFVVkVMQ3RDUVVGakxFZEJRV1FzVlVGQlpTeERRVUZETzFGQlExb3NTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRGJrUXNRMEZCUXp0SlFVTkVMQ3RDUVVGakxFZEJRV1E3VVVGRFNTeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJRenRKUVVOMlJDeERRVUZETzBsQlJVUXNhVU5CUVdkQ0xFZEJRV2hDTEZWQlFXbENMRU5CUVVNN1VVRkRaQ3hKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHRkJRV0VzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTnlSQ3hEUVVGRE8wbEJRMFFzYVVOQlFXZENMRWRCUVdoQ08xRkJRMGtzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNZVUZCWVN4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRE8wbEJRMmhGTEVOQlFVTTdTVUZGUkN4cFEwRkJaMElzUjBGQmFFSXNWVUZCYVVJc1NVRkJTU3hGUVVGRkxFTkJRVU03VVVGRGNFSXNTVUZCU1N4TlFVRk5MRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdOQlFXTTdXVUZEZWtNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eGpRVUZqTzFsQlF6TkNMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWTBGQll6dFpRVU16UWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETzFGQlF6ZENMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU4yUXl4RFFVRkRPMGxCUTBRc2FVTkJRV2RDTEVkQlFXaENMRlZCUVdsQ0xFbEJRVWs3VVVGRGFrSXNTVUZCU1N4TlFVRk5MRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdOQlFXTTdXVUZEZWtNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eGpRVUZqTzFsQlF6TkNMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zWTBGQll6dFpRVU16UWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETzFGQlF6ZENMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTTdTVUZEYkVRc1EwRkJRenRKUVVWRUxHMURRVUZyUWl4SFFVRnNRaXhWUVVGdFFpeEpRVUZKTEVWQlFVVXNRMEZCUXl4RlFVRkZMRU5CUVVNN1VVRkRla0lzU1VGQlNTeFBRVUZQTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHZENRVUZuUWp0WlFVTTFReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdkQ1FVRm5RanRaUVVNM1FpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMR2RDUVVGblFqdFpRVU0zUWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHZENRVUZuUWl4RFFVRkRMRU5CUVVNN1VVRkRMMElzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFZEJRVWNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTjBSQ3hKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFZEJRVWNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTTVSQ3hEUVVGRE8wbEJRMFFzYlVOQlFXdENMRWRCUVd4Q0xGVkJRVzFDTEVsQlFVazdVVUZEYmtJc1NVRkJTU3hQUVVGUExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMR2RDUVVGblFqdFpRVU0xUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHZENRVUZuUWp0WlFVTTNRaXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdkQ1FVRm5RanRaUVVNM1FpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMR2RDUVVGblFpeERRVUZETEVOQlFVTTdVVUZETDBJc1RVRkJUU3hEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFsQlEzaERMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzBsQlF6RkRMRU5CUVVNN1NVRkZSQ3hwUTBGQlowSXNSMEZCYUVJc1ZVRkJhVUlzU1VGQlNTeEZRVUZGTEVOQlFVTXNSVUZCUlN4RFFVRkRPMUZCUTNaQ0xFbEJRVWtzUzBGQlN5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhqUVVGak8xbEJRM2hETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1kwRkJZenRaUVVNelFpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMR05CUVdNN1dVRkRNMElzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJRenRSUVVNM1FpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRiRU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVNeFF5eERRVUZETzBsQlEwUXNhVU5CUVdkQ0xFZEJRV2hDTEZWQlFXbENMRWxCUVVrN1VVRkRha0lzU1VGQlNTeExRVUZMTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHTkJRV003V1VGRGVFTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhqUVVGak8xbEJRek5DTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1kwRkJZenRaUVVNelFpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMR05CUVdNc1EwRkJReXhEUVVGRE8xRkJRemRDTEUxQlFVMHNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhIUVVGSExFbEJRVWs3V1VGRE4wTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eERRVUZETzBsQlF5OURMRU5CUVVNN1NVRkZSQ3dyUWtGQll5eEhRVUZrTEZWQlFXVXNTVUZCU1N4RlFVRkZMRWRCUVVjN1VVRkRjRUlzU1VGQlNTeE5RVUZOTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExGbEJRVms3V1VGRGRrTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhaUVVGWk8xbEJRM3BDTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1dVRkJXVHRaUVVONlFpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRmxCUVZrc1EwRkJReXhEUVVGRE8xRkJRek5DTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJRenRKUVVONlF5eERRVUZETzBsQlEwUXNLMEpCUVdNc1IwRkJaQ3hWUVVGbExFbEJRVWs3VVVGRFppeEpRVUZKTEUxQlFVMHNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zV1VGQldUdFpRVU4yUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExGbEJRVms3V1VGRGVrSXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhaUVVGWk8xbEJRM3BDTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU03VVVGRE0wSXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF6dEpRVU5zUkN4RFFVRkRPMGxCUlVRc2FVTkJRV2RDTEVkQlFXaENMRlZCUVdsQ0xFbEJRVWtzUlVGQlJTeExRVUZMTzFGQlEzaENMRWxCUVVrc1RVRkJUU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4alFVRmpPMWxCUTNwRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNZMEZCWXp0WlFVTXpRaXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdOQlFXTTdXVUZETTBJc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXp0UlFVTTNRaXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTTdTVUZETTBNc1EwRkJRenRKUVVORUxHbERRVUZuUWl4SFFVRm9RaXhWUVVGcFFpeEpRVUZKTzFGQlEycENMRWxCUVVrc1RVRkJUU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4alFVRmpPMWxCUTNwRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNZMEZCWXp0WlFVTXpRaXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdOQlFXTTdXVUZETTBJc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXp0UlFVTTNRaXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRPMGxCUTJ4RUxFTkJRVU03U1VGSFJDeDNRMEZCZFVJc1IwRkJka0k3VVVGRFNTeEpRVUZKTEVOQlFVTXNhMEpCUVd0Q0xFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUlN4WlFVRlpPMUZCUXpWRExFbEJRVWtzUTBGQlF5eGhRVUZoTEVOQlFVTXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zYlVKQlFXMUNPMUZCUTI1RUxFbEJRVWtzUTBGQlF5eGpRVUZqTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRNVUlzU1VGQlNTeERRVUZETEdkQ1FVRm5RaXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNPRUpCUVRoQ08xRkJRek5FTEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1NVRkJTU3hIUVVGSExFTkJRVU1zUlVGQlJTeEpRVUZKTEVkQlFVY3NRMEZCUXl4RlFVRkZMRWxCUVVrc1JVRkJSU3hGUVVGRkxFTkJRVU03V1VGRGJFTXNTVUZCU1N4WlFVRlpMRWRCUVVjc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFRRVUZUTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExHTkJRV01zUjBGQlJ5eEpRVUZKTEVOQlFVTXNRMEZCUXp0WlFVTnFSaXhKUVVGSkxGZEJRVmNzUjBGQlJ5eFpRVUZaTEVkQlFVY3NUVUZCVFN4RFFVRkRPMWxCUTNoRExFbEJRVWtzVjBGQlZ5eEhRVUZITEZkQlFWY3NSMEZCUnl4TlFVRk5MRU5CUVVNN1dVRkRka01zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4SFFVRkhMRWRCUVVjc1EwRkJReXhGUVVGRkxFZEJRVWNzUjBGQlJ5eE5RVUZOTEVWQlFVVXNSMEZCUnl4RlFVRkZMRVZCUVVVc1EwRkJRenRuUWtGRGNFTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zV1VGQldTeEhRVUZITEVkQlFVY3NSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRGVrTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zVjBGQlZ5eEhRVUZITEVkQlFVY3NSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRGVFTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zVjBGQlZ5eEhRVUZITEVkQlFVY3NSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRaUVVNdlF5eERRVUZETzFsQlEwUXNTVUZCU1N4RFFVRkRMR2RDUVVGblFpeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1MwRkJTeXhEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXg1UTBGQmVVTTdXVUZEYkVjc1NVRkJTU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4WFFVRlhPMWxCUXpsRExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1lVRkJZVHRaUVVOc1JDeEpRVUZKTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1lVRkJZVHRaUVVNM1F5eEpRVUZKTEVOQlFVTXNZMEZCWXl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEdsQ1FVRnBRanRSUVVOdVJDeERRVUZETzBsQlEwd3NRMEZCUXp0SlFVZEVMSGxDUVVGUkxFZEJRVklzVlVGQlV5eERRVUZETEVWQlFVVXNRMEZCUXl4RlFVRkZMRU5CUVVNN1VVRkRXaXhwUkVGQmFVUTdVVUZEYWtRc2MwTkJRWE5ETzFGQlEzUkRMRzFFUVVGdFJEdFJRVU51UkN4SlFVRkpMRWxCUVVrc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTNKRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zWjBOQlFXZERPMGxCUXpORUxFTkJRVU03U1VGSFJEczdPenM3T3pzN08wMUJVMFU3U1VGRlJpeDNRa0ZCVHl4SFFVRlFMRlZCUVZFc1NVRkJTU3hGUVVGRkxFZEJRVWNzUlVGQlJTeEhRVUZITEVWQlFVVXNTVUZCU1N4RlFVRkZMRTlCUVdNc1JVRkJSU3hQUVVGak8xRkJRVGxDTEhkQ1FVRkJMRVZCUVVFc1kwRkJZenRSUVVGRkxIZENRVUZCTEVWQlFVRXNZMEZCWXp0UlFVTjRSQ3hKUVVGSkxGRkJRVkVzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNZMEZCWXl4SFFVRkhMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRemRGTEVsQlFVa3NVVUZCVVN4SFFVRkhMRkZCUVZFc1IwRkJSeXhEUVVGRExFZEJRVWNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWRCUVVjc1IwRkJSeXhEUVVGRE8xRkJRekZFTEVsQlFVa3NUVUZCVFN4SFFVRkhMRkZCUVZFc1IwRkJSeXhOUVVGTkxFTkJRVU03VVVGREwwSXNTVUZCU1N4TlFVRk5MRWRCUVVjc1VVRkJVU3hIUVVGSExFMUJRVTBzUTBGQlF6dFJRVVV2UWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRiRU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hGUVVGRkxFOUJRVThzUTBGQlF5eERRVUZETzFGQlEyNURMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNSVUZCUlN4UFFVRlBMRU5CUVVNc1EwRkJRenRKUVVOMlF5eERRVUZETzBsQlJVUXNPRU5CUVRaQ0xFZEJRVGRDTEZWQlFUaENMRTlCUVU4N1VVRkRha01zU1VGQlNTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMR3RDUVVGclFpeEZRVUZGTEVOQlFVTTdVVUZGYkVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRk4wSXNjME5CUVhORE8xRkJRM1JETEhkRVFVRjNSRHRSUVVONFJDd3lSRUZCTWtRN1VVRkRNMFFzZVVOQlFYbERPMUZCUTNwRExHVkJRV1U3VVVGRFppeFhRVUZYTzFGQlJWZ3NjVU5CUVhGRE8wbEJRM3BETEVOQlFVTTdTVUZGUkN3MFFrRkJORUk3U1VGRE5VSXNOa05CUVRSQ0xFZEJRVFZDTEZWQlFUWkNMRWxCUVVrc1JVRkJSU3hQUVVGUE8xRkJSWFJETEhORFFVRnpRenRSUVVOc1F5eEpRVUZCTEdkRFFVRTBReXhGUVVFelF5eGhRVUZMTEVWQlFVVXNZVUZCU3l4RlFVTmlMRkZCUVZFc1IwRkJSeXhMUVVGTExFVkJRVVVzWTBGQll5eEhRVUZITEZGQlFWRXNSMEZCUnl4TFFVRkxMRVZCUTI1RUxGTkJRVk1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCVFN4SFFVRkhMRXRCUVVzc1JVRkJSU3hsUVVGbExFZEJRVWNzUTBGQlF5eFRRVUZUTEVkQlFVY3NTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVNeFJTeFBRVUZQTEVkQlFVY3NTMEZCU3l4RlFVRkZMR0ZCUVdFc1IwRkJSeXhQUVVGUExFZEJRVWNzUzBGQlN5eEZRVU5vUkN4VlFVRlZMRWRCUVVjc1NVRkJTU3hEUVVGRExFOUJRVThzUjBGQlJ5eExRVUZMTEVWQlFVVXNaMEpCUVdkQ0xFZEJRVWNzUTBGQlF5eFZRVUZWTEVkQlFVY3NTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVNNVJTeHJRMEZCYTBRc1JVRkJha1FzWlVGQlR5eEZRVUZGTEdWQlFVOHNSVUZEYWtJc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVWQlF6RkRMRTlCUVU4c1IwRkJSeXhKUVVGSkxFTkJRVU1zWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVTnVReXhYUVVGWExFZEJRVWNzVDBGQlR5eEhRVUZITEV0QlFVc3NSVUZETjBJc1dVRkJXU3hIUVVGSExFbEJRVWtzUjBGQlJ5eE5RVUZOTEVWQlF6VkNMRzFDUVVGdFFpeEZRVUZGTEcxQ1FVRnRRaXhGUVVONFF5eEpRVUZKTEVWQlFVVXNTVUZCU1N4RlFVRkZMRmRCUVZjc1JVRkJSU3hKUVVGSkxFVkJRemRDTEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVVc1MwRkJTeXhGUVVGRkxFdEJRVXNzUlVGRGVFSXNTMEZCU3l4SFFVRkhMRU5CUVVNc1IwRkJSeXhMUVVGTExFTkJRVU03VVVGRmRFSXNUMEZCVHl4SFFVRkhMR05CUVdNc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdVVUZEZUVNc1QwRkJUeXhIUVVGSExHTkJRV01zUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkZlRU1zTUVOQlFUQkRPMUZCUXpGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NSMEZCUnl4SFFVRkhMRWxCUVVrc1EwRkJReXhUUVVGVExFZEJRVWNzUTBGQlF5eEZRVUZGTEVkQlFVY3NSMEZCUnl4RFFVRkRMRU5CUVVNc1JVRkJSU3hIUVVGSExFVkJRVVVzUlVGQlJTeERRVUZETzFsQlEycEVMSEZFUVVGeFJEdFpRVU55UkN4TFFVRkxMRWRCUVVjc1EwRkJReXhIUVVGSExFbEJRVWtzUzBGQlN5eERRVUZETEVkQlFVY3NUMEZCVHl4RFFVRkRPMWxCUldwRExIZEVRVUYzUkR0WlFVTjRSQ3hGUVVGRkxFTkJRVU1zUTBGQlF5eExRVUZMTEVsQlFVa3NZVUZCWVN4SlFVRkpMRXRCUVVzc1NVRkJTU3huUWtGQlowSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRM1JFTEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1IwRkJSeXhIUVVGSExFbEJRVWtzUTBGQlF5eFpRVUZaTEVkQlFVY3NRMEZCUXl4RlFVRkZMRWRCUVVjc1IwRkJSeXhEUVVGRExFTkJRVU1zUlVGQlJTeEhRVUZITEVWQlFVVXNSVUZCUlN4RFFVRkRPMjlDUVVOd1JDdzBSRUZCTkVRN2IwSkJRelZFTEV0QlFVc3NSMEZCUnl4RFFVRkRMRWRCUVVjc1NVRkJTU3hMUVVGTExFTkJRVU1zUjBGQlJ5eFBRVUZQTEVOQlFVTTdiMEpCUldwRExHMURRVUZ0UXp0dlFrRkRia01zUlVGQlJTeERRVUZETEVOQlFVTXNTMEZCU3l4SlFVRkpMR05CUVdNc1NVRkJTU3hMUVVGTExFbEJRVWtzWlVGQlpTeERRVUZETEVOQlFVTXNRMEZCUXp0M1FrRkZkRVFzZVVSQlFYbEVPM2RDUVVONlJDeEpRVUZKTEVkQlFVY3NRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4RFFVRkRMRWRCUVVjc1IwRkJSeXhIUVVGSExGbEJRVmtzUTBGQlF6dDNRa0ZGY0VRc1pVRkJaVHQzUWtGRFppeEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dDNRa0ZEZWtJc1YwRkJWeXhIUVVGSExGZEJRVmNzUjBGQlJ5eERRVUZETEVsQlFVa3NTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJRenQzUWtGRmVFTXNNa0pCUVRKQ08zZENRVU16UWl4dFFrRkJiVUlzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1IwRkJSeXhOUVVGTkxFTkJRVU1zUTBGQlF6dDNRa0ZEYWtRc2JVSkJRVzFDTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFZEJRVWNzVFVGQlRTeERRVUZETEVOQlFVTTdkMEpCUldwRUxHOURRVUZ2UXp0M1FrRkRjRU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETEVWQlFVVXNSVUZCUlN4RFFVRkRPelJDUVVONlF5eEpRVUZKTEVkQlFVY3NRMEZCUXl4SFFVRkhMRXRCUVVzc1EwRkJRenMwUWtGRGFrSXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSVUZCUlN4RFFVRkRMRVZCUVVVc1JVRkJSU3hEUVVGRE8yZERRVU42UXl4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eFhRVUZYTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0blEwRkRNVVVzUlVGQlJTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRWxCUVVrc1NVRkJTU3hKUVVGSkxFdEJRVXNzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0dlEwRkRha01zU1VGQlNTeEhRVUZITEVOQlFVTXNTVUZCU1N4TFFVRkxMRWxCUVVrc1IwRkJSeXh0UWtGQmJVSXNSMEZCUnl4dFFrRkJiVUlzUTBGQlF5eERRVUZETzJkRFFVTjJSU3hEUVVGRE8yZERRVU5FTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzI5RFFVTllMRWxCUVVrc1IwRkJSeXhEUVVGRExFZEJRVWNzUzBGQlN5eERRVUZETzI5RFFVTnFRaXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4SlFVRkpMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEZOQlFWTXNRMEZCUXl4RFFVRkRPM2REUVVNeFF5eERRVUZETEVOQlFVTXNTVUZCU1N4SlFVRkpMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEZWQlFWVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8zZERRVU0zUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUlVGQlJTeEpRVUZKTEVWQlFVVXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03YjBOQlF6ZERMRU5CUVVNN1owTkJRMHdzUTBGQlF6czBRa0ZEVEN4RFFVRkRPM2RDUVVOTUxFTkJRVU03YjBKQlEwd3NRMEZCUXp0blFrRkRUQ3hEUVVGRE8xbEJRMHdzUTBGQlF6dFJRVU5NTEVOQlFVTTdTVUZEVEN4RFFVRkRPMGxCUlVRc01rSkJRVEpDTzBsQlJUTkNMRFpEUVVFMFFpeEhRVUUxUWl4VlFVRTJRaXhKUVVGSkxFVkJRVVVzVDBGQlR6dFJRVVYwUXl4elEwRkJjME03VVVGRGJFTXNTVUZCUVN4blEwRkJORU1zUlVGQk0wTXNZVUZCU3l4RlFVRkZMR0ZCUVVzc1JVRkRZaXhSUVVGUkxFZEJRVWNzUzBGQlN5eEZRVU5vUWl4VFFVRlRMRWRCUVVjc1NVRkJTU3hEUVVGRExFMUJRVTBzUjBGQlJ5eExRVUZMTEVWQlF5OUNMRTlCUVU4c1IwRkJSeXhMUVVGTExFVkJRMllzVlVGQlZTeEhRVUZITEVsQlFVa3NRMEZCUXl4UFFVRlBMRWRCUVVjc1MwRkJTeXhGUVVOcVF5eHJRMEZCYTBRc1JVRkJha1FzWlVGQlR5eEZRVUZGTEdWQlFVOHNSVUZEYWtJc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVWQlF6RkRMRTlCUVU4c1IwRkJSeXhKUVVGSkxFTkJRVU1zWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVTnVReXhYUVVGWExFZEJRVWNzVDBGQlR5eEhRVUZITEV0QlFVc3NSVUZETjBJc1dVRkJXU3hIUVVGSExFbEJRVWtzUjBGQlJ5eE5RVUZOTEVWQlF6VkNMRzFDUVVGdFFpeEZRVUZGTEcxQ1FVRnRRaXhGUVVONFF5eEpRVUZKTEVWQlFVVXNTVUZCU1N4RlFVRkZMRmRCUVZjc1JVRkJSU3hKUVVGSkxFVkJRemRDTEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUTFZc1MwRkJTeXhIUVVGSExFTkJRVU1zUjBGQlJ5eExRVUZMTEVWQlFVVXNVVUZCVVN4RlFVRkZMRTlCUVU4c1EwRkJRenRSUVVWNlF5eFBRVUZQTEVkQlFVY3NZMEZCWXl4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFJRVU40UXl4UFFVRlBMRWRCUVVjc1kwRkJZeXhEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0UlFVVjRReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVVzUTBGQlF6dFpRVU42UXl4UlFVRlJMRWRCUVVjc1EwRkJReXhKUVVGSkxFdEJRVXNzUTBGQlF6dFpRVU4wUWl4UFFVRlBMRWRCUVVjc1EwRkJReXhKUVVGSkxFdEJRVXNzUTBGQlF6dFpRVU55UWl4SlFVRkpMRWRCUVVjc1EwRkJReXhIUVVGSExFOUJRVThzUTBGQlF6dFpRVVZ1UWl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCVFN4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVc1EwRkJRenRuUWtGRmVFTXNjVUpCUVhGQ08yZENRVU55UWl3eVJFRkJNa1E3WjBKQlF6TkVMRWxCUVVrc1IwRkJSeXhEUVVGRExGRkJRVkVzU1VGQlNTeERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRkZCUVZFc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRU5CUVVNc1IwRkJSeXhaUVVGWkxFTkJRVU03WjBKQlEzWkZMRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMmRDUVVWNlFpd3lRa0ZCTWtJN1owSkJRek5DTEcxQ1FVRnRRaXhIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4SFFVRkhMRTFCUVUwc1EwRkJReXhEUVVGRE8yZENRVU5xUkN4dFFrRkJiVUlzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1IwRkJSeXhOUVVGTkxFTkJRVU1zUTBGQlF6dG5Ra0ZGYWtRc2NVSkJRWEZDTzJkQ1FVTnlRaXhYUVVGWExFZEJRVWNzUTBGQlF5eERRVUZETEU5QlFVOHNSMEZCUnl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4SlFVRkpMRU5CUVVNc1EwRkJReXhIUVVGSExGZEJRVmNzUTBGQlF6dG5Ra0ZETVVZc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNN1owSkJSVzVETEVWQlFVVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1MwRkJTeXhKUVVGSkxFbEJRVWtzU1VGQlNTeExRVUZMTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN2IwSkJRMnBETEVsQlFVa3NSMEZCUnl4RFFVRkRMRWxCUVVrc1MwRkJTeXhKUVVGSkxFZEJRVWNzYlVKQlFXMUNMRWRCUVVjc2JVSkJRVzFDTEVOQlFVTXNRMEZCUXp0blFrRkRka1VzUTBGQlF6dG5Ra0ZGUkN4SlFVRkpMRWRCUVVjc1EwRkJReXhIUVVGSExFOUJRVThzUTBGQlF6dG5Ra0ZGYmtJc1JVRkJSU3hEUVVGRExFTkJRVU1zU1VGQlNTeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN2IwSkJRMWdzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1NVRkJTU3hSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4VFFVRlRMRU5CUVVNc1EwRkJRenQzUWtGRE1VTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1NVRkJTU3hQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4VlFVRlZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dDNRa0ZETjBNc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVWQlFVVXNTVUZCU1N4RlFVRkZMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETzI5Q1FVTTNReXhEUVVGRE8yZENRVU5NTEVOQlFVTTdXVUZEVEN4RFFVRkRPMUZCUTB3c1EwRkJRenRSUVVWRUxIRkRRVUZ4UXp0SlFVTjZReXhEUVVGRE8wbEJSVVFzZFVOQlFYTkNMRWRCUVhSQ0xGVkJRWFZDTEU5QlFVODdVVUZETVVJc1NVRkJTU3hKUVVGSkxFVkJRMG9zU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRE8xRkJSWFJETEhORFFVRnpRenRSUVVOMFF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVXNRMEZCUXp0WlFVTjZReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVVzUTBGQlF6dG5Ra0ZEZUVNc1NVRkJTU3hGUVVGRkxFTkJRVU03WjBKQlExQXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMmRDUVVNdlFpeEZRVUZGTEVOQlFVTXNRMEZCUXl4SlFVRkpMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dHZRa0ZEV0N4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETEVWQlFVVXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEzWkRMRU5CUVVNN1dVRkRUQ3hEUVVGRE8xRkJRMHdzUTBGQlF6dFJRVVZFTEhGRFFVRnhRenRKUVVONlF5eERRVUZETzBsQlJVUTdPenM3TzAxQlMwVTdTVUZGUml3eVEwRkJNRUlzUjBGQk1VSTdVVUZEU1N4SlFVRkpMRmRCUVZjc1IwRkJSeXhKUVVGSkxFTkJRVU1zWTBGQll5eEZRVUZGTEVOQlFVTTdVVUZEZUVNc1NVRkJTU3hMUVVGTExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRmRCUVZjc1EwRkJReXhIUVVGSExGVkJRVlVzUTBGQlF5eERRVUZETzFGQlEzUkVMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUzBGQlN5eEhRVUZITEZWQlFWVXNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVOdVF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRXRCUVVzc1IwRkJSeXhWUVVGVkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEYkVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eExRVUZMTEVkQlFVY3NWVUZCVlN4RFFVRkRMRU5CUVVNN1VVRkROMElzU1VGQlNTeEhRVUZITEVkQlFVY3NVMEZCVHl4RFFVRkRMRlZCUVVzc1EwRkJReXhWUVVGTExFTkJRVU1zVFVGQlJ5eERRVUZETzFGQlEyeERMRWxCUVVrc1EwRkJReXhsUVVGbExFTkJRVU1zUzBGQlN5eERRVUZETEdWQlFXVXNSMEZCUnl4SFFVRkhMRU5CUVVNN1VVRkRha1FzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc1pVRkJaU3hIUVVGSExFZEJRVWNzUTBGQlF6dEpRVU0zUXl4RFFVRkRPMGxCUlVRc2NVTkJRVzlDTEVkQlFYQkNMRlZCUVhGQ0xFOUJRVTg3VVVGRGVFSXNTVUZCU1N4WFFVRlhMRWRCUVVjc1NVRkJTU3hEUVVGRExHTkJRV01zUlVGQlJTeEZRVU51UXl4NVFrRkJhVVFzUlVGQmFFUXNiVUpCUVZjc1JVRkJSU3h0UWtGQlZ5eEZRVU42UWl4VlFVRlZMRWRCUVVjc1YwRkJWeXhGUVVONFFpeFhRVUZYTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1IwRkJSeXhYUVVGWExFVkJRM1pETEZOQlFWTXNSMEZCUnl4WFFVRlhMRVZCUTNaQ0xGbEJRVmtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUMEZCVHl4SFFVRkhMRmRCUVZjc1EwRkJRenRSUVVVNVF5eHpRMEZCYzBNN1VVRkRkRU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFOUJRVThzUjBGQlJ5eERRVUZETEVWQlFVVXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUlVGQlJTeEZRVUZGTEVOQlFVTTdXVUZEZWtNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJSU3hGUVVGRkxFTkJRVU03WjBKQlEzaERMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NWVUZCVlN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFbEJRVWtzVjBGQlZ5eERRVUZETEVOQlFVTTdiMEpCUTNoRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NVMEZCVXl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFbEJRVWtzV1VGQldTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN2IwSkJRek5ETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUlVGQlJTeFBRVUZQTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRE9VTXNRMEZCUXp0WlFVTk1MRU5CUVVNN1VVRkRUQ3hEUVVGRE8xRkJSVVFzY1VOQlFYRkRPMGxCUTNwRExFTkJRVU03U1VGRlJDeDFRa0ZCVFN4SFFVRk9PMUZCUTBrc1NVRkJTU3hMUVVGTExFVkJRVVVzVDBGQlR5eEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTjRRaXhKUVVGSkxFMUJRVTBzUjBGQlJ6dFpRVU5VTEVWQlFVVTdXVUZEUml4RlFVRkZPMWxCUTBZc1JVRkJSVHRaUVVOR0xFVkJRVVU3V1VGRFJpeEZRVUZGTzFsQlEwWXNSVUZCUlR0WlFVTkdMRVZCUVVVN1dVRkRSaXhGUVVGRk8xTkJRMHdzUTBGQlF6dFJRVVZHTERoQ1FVRTRRanRSUVVNNVFpeE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5dzJRa0ZCTmtJc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVVTVSQ3d3UTBGQk1FTTdVVUZETVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeEpRVUZKTEVkQlFVY3NRMEZCUXl4RlFVRkZMRWxCUVVrc1IwRkJSeXhEUVVGRExFVkJRVVVzU1VGQlNTeEZRVUZGTEVWQlFVVXNRMEZCUXp0WlFVTnNReXhMUVVGTExFZEJRVWNzU1VGQlNTeERRVUZETEdkQ1FVRm5RaXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFsQlEzQkRMRVZCUVVVc1EwRkJReXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVOYUxFMUJRVTBzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExITkNRVUZ6UWl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTnlSU3hEUVVGRE8xRkJRMHdzUTBGQlF6dFJRVVZFTEhsQ1FVRjVRanRSUVVONlFpeExRVUZMTEVkQlFVY3NTVUZCU1N4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEVOQlFVTTdVVUZEYUVNc1JVRkJSU3hEUVVGRExFTkJRVU1zUzBGQlN5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRXaXhOUVVGTkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXh6UWtGQmMwSXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU12UkN4RFFVRkRPMUZCUlVRc2JVSkJRVzFDTzFGQlEyNUNMRTlCUVU4N1VVRkZVQ3hyUWtGQmEwSTdVVUZEYkVJc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc2IwSkJRVzlDTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRmNrUXNLMEpCUVN0Q08xRkJSUzlDTEc5Q1FVRnZRanRSUVVOd1FpeEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZITEVkQlFVY3NSVUZCUlN4RFFVRkRMRVZCUVVVc1JVRkJSU3hEUVVGRE8xbEJRek5DTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4VlFVRlZMRU5CUVVNc1EwRkJRenRSUVVOb1JDeERRVUZETzFGQlJVUXNiVUpCUVcxQ08xRkJRMjVDTEhGQ1FVRnhRanRSUVVOeVFpeEhRVUZITEVOQlFVTXNRMEZCUXl4SlFVRkpMRkZCUVZFc1IwRkJSeXhEUVVGRExFVkJRVVVzVVVGQlVTeEhRVUZITEVOQlFVTXNSVUZCUlN4UlFVRlJMRVZCUVVVc1JVRkJSU3hEUVVGRE8xbEJRemxETEVsQlFVa3NUMEZCVHl4SFFVRkhMRTFCUVUwc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFpRVU12UWl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxGTkJRVk1zUjBGQlJ5eERRVUZETEVWQlFVVXNVMEZCVXl4SFFVRkhMRTlCUVU4c1EwRkJReXhOUVVGTkxFVkJRVVVzVTBGQlV5eEZRVUZGTEVWQlFVVXNRMEZCUXp0blFrRkRPVVFzVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xbEJRMmhETEVOQlFVTTdVVUZEVEN4RFFVRkRPMGxCUTB3c1EwRkJRenRKUVVWRUxIRkNRVUZKTEVkQlFVbzdVVUZEU1N4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xRkJRM1pETEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRM0JFTEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1UwRkJVeXhEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRemxETEVsQlFVa3NRMEZCUXl3d1FrRkJNRUlzUlVGQlJTeERRVUZETzBsQlEzUkRMRU5CUVVNN1NVRkRUQ3hoUVVGRE8wRkJRVVFzUTBGQlF5eEJRVFZvUWtRc1NVRTBhRUpESW4wPVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2NvcmUvU2NyZWVuLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIl0sInNvdXJjZVJvb3QiOiIifQ==