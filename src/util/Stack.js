export class Stack {
    constructor(size = 512, width = 4) {
        this._ary = Array(size); //new Uint32Array(new ArrayBuffer(size * width));
        this._size = size;
        this._mask = size - 1;
        this._width = width;
        this._leftIdx = 0;
        this._rightIdx = 0;
        this._len = 0;
    }

    clear() {
        this._len = 0;
        this._leftIdx = 0;
        this._rightIdx = 0;
    }

    get length() {
        return this._len;
    }

    push(data) {
        this._ary[this._rightIdx] = data;
        this._rightIdx = (this._rightIdx + 1) & this._mask;
        this._len += 1;
        if (this._len > this._size) {
            throw new Error("Stack overflow");
        }
    }

    pop() {
        this._rightIdx = (this._rightIdx - 1) & this._mask;
        this._len -= 1;
        if (this._len < 0) {
            throw new Error("Stack underflow");
        }
        return this._ary[this._rightIdx];
    }

    pushMany(...data) {
        for (var i = 0, l = data.length; i < l; i++) {
            this.push(data[i]);
        }
    }

    popMany(n = 1) {
        if (n === 1) { return this.pop(); }
        const newArr = new Uint32Array(new ArrayBuffer(n * this._width));
        for (var i = 0; i < n; i++) {
            newArr[i] = this.length > 0 ? this.pop() : 0;
        }
    }

    enq(data) {
        this.push(data);
    }

    deq() {
        const v = this._ary[this._leftIdx];
        this._leftIdx = (this._leftIdx + 1) & this._mask;
        this._len -= 1;
        if (this._len < 0) {
            throw new Error("Queue underflow");
        }
        return v;
    }

}