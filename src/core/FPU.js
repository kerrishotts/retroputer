export class FPU {
    constructor() {
        this.init();
    }

    init() {
        this.stack = new Float64Array(8);
        this.flags = {
            overflow: false,
            underflow: false,
            infinity: false,
            nan: false,
            negative: false,
            zero: false,
            stackException: false,
            divideByZero: false,
        };
        this.SP = 0;
    }

    updateFlags() {
        const v = this.peek();
        this.flags.infinity = !Number.isFinite(v);
        this.flags.nan = Number.isNaN(v);
        this.flags.negative = v < 0;
        this.flags.zero = v === 0;
    }

    pop() {
        this.SP--;
        if (this.SP < 0) {
            this.SP = this.stack.length - 1;
            this.flags.stackException = true;
        }
        this.SP = (this.SP - 1) & 7;
        return this.stack[this.SP];
    }

    peek() {
        return this.stack[(this.SP - 1) & 7];
    }

    push(v) {
        this.stack[this.SP] = v;
        this.SP++;
        if (this.SP > this.stack.length - 1) {
            this.SP = 0;
            this.flags.stackException = true;
        }
    }

    dup() {
        const v = this.peek();
        this.push(v);
    }

    swap() {
        const a = this.pop();
        const b = this.pop();
        this.push(a);
        this.push(b);
    }

    add() {
        const b = this.pop();
        const a = this.pop();
        this.push(a + b);
    }

    sub() {
        const b = this.pop();
        const a = this.pop();
        this.push(a - b);
    }

    mul() {
        const b = this.pop();
        const a = this.pop();
        this.push(a * b);
    }

    div() {
        const b = this.pop();
        const a = this.pop();
        if (b === 0) {
            this.flags.divideByZero = true;
            this.push(0);
            return;
        }
        this.push(a / b);
    }

    mod() {
        const b = this.pop();
        const a = this.pop();
        if (b === 0) {
            this.flags.divideByZero = true;
            this.push(0);
            return;
        }
        this.push(a % b);
    }

    pow() {
        const b = this.pop();
        const a = this.pop();
        this.push(Math.pow(a, b));
    }

    sqrt() {
        const b = this.pop();
        const a = this.pop();
        this.push(Math.sqrt(a, b));
    }

    abs() {
        const a = this.pop();
        this.push(Math.abs(a));
    }

    neg() {
        const a = this.pop();
        this.push(-a);
    }

    sin() {
        const a = this.pop();
        this.push(Math.sin(a));
    }
    cos() {
        const a = this.pop();
        this.push(Math.cos(a));
    }
    tan() {
        const a = this.pop();
        this.push(Math.tan(a));
    }
    asin() {
        const a = this.pop();
        this.push(Math.asin(a));
    }
    acos() {
        const a = this.pop();
        this.push(Math.acos(a));
    }
    atan() {
        const a = this.pop();
        this.push(Math.atan(a));
    }

    log() {
        const a = this.pop();
        this.push(Math.log(a));
    }
    log2() {
        const a = this.pop();
        this.push(Math.log2(a));
    }
    log10() {
        const a = this.pop();
        this.push(Math.log10(a));
    }

    e() {
        this.push(Math.E);
    }

    pi() {
        this.push(Math.PI);
    }

    

}