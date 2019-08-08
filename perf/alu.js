import { ALU, COMMANDS, SIZES } from "../src/core/ALU.js";
import { executeTask, TASKS } from "../src/isa/tasks.js";
import { RegisterFile } from "../src/core/RegisterFile.js";
import { Stack } from "../src/util/Stack.js";

const AMAX = 1000;
const BMAX = 10000;

const add = (a, b, bytes, flags = {c: 0, n: 0, z: 0, v: 0}) => {
    let c = flags.c;
    let v = 0;
    var i, l, bA, bB, bV;
    const signMask = (0b1 << (bytes << 3));
    const negMask = signMask << 1;
    const aSign = (a & signMask) && 1;
    const bSign = (b & signMask) && 1;
    for (i = bytes, l = 0; i > 0; i--, l += 8) {
        bA = a & 0xFF;
        bB = b & 0xFF;
        bV = bA + bB + c;
        c = (bV & 0xFFFFFF00) && 1;
        v = v | ((bV & 0xFF) << l);
        a = a >> 8;
        b = b >> 8;
    }
    flags.c = c;
    flags.z = (v === 0) && 1;
    flags.n = (v & negMask) && 1;
    const vSign = (v & signMask) && 1;
    flags.v = (aSign === bSign && vSign !== aSign) ? 1 : 0;
    return v;
};

{
const carryBit = [0x100, 0x10000, 0x1000000, 0x100000000];
const signBit = [0x080, 0x08000, 0x0800000, 0x080000000];
const maskBit = [0x0FF, 0x0FFFF, 0x0FFFFFF, 0x0FFFFFFFF];

const add2 = (a, b, bytes, flags = {c : 0, z: 0, n: 0, v: 0}) => {
    let c = flags.c;
    let v = a + b + c;
    flags.c = (v & ~(maskBit[bytes])) && 1;
    if (v === 0) flags.z = 1;
    if (v & signBit[bytes]) flags.n = 1;
    const signMask = signBit[bytes];
    const aSign = (a & signMask) && 1;
    const bSign = (b & signMask) && 1;
    const vSign = (v & signMask) && 1;
    flags.v = (aSign === bSign && vSign !== aSign) ? 1 : 0;
    return v & maskBit[bytes];
}

const add3 = (a, b, bytes, flags = {c : 0}) => {
    let c = flags.c;
    let v = a + b + c;
    flags.c = (v & ~(maskBit[bytes])) && 1;
    (v === 0) ? (flags.z = 1) : 0;
    (v & signBit[bytes]) ? (flags.n = 1): 0;
    const signMask = signBit[bytes];
    const aSign = (a & signMask) && 1;
    const bSign = (b & signMask) && 1;
    const vSign = (v & signMask) && 1;
    flags.v = (aSign === bSign && vSign !== aSign) ? 1 : 0;
    return v & maskBit[bytes];
}

var a, b, z;
console.time("add-native");
for (a = 0; a < AMAX; a++) {
    for (b = 0; b < BMAX; b++) {
        z = (a|0) + (b|0);
    }
}
console.timeEnd("add-native");

console.time("add");
for (a = 0; a < AMAX; a++) {
    for (b = 0; b < BMAX; b++) {
        z = add(a, b, 2, {c: 0});
    }
}
console.timeEnd("add");

console.time("add-2");
for (a = 0; a < AMAX; a++) {
    for (b = 0; b < BMAX; b++) {
        z = add2(a, b, 2, {c: 0});
    }
}
console.timeEnd("add-2");

console.time("add-3");
for (a = 0; a < AMAX; a++) {
    for (b = 0; b < BMAX; b++) {
        z = add3(a, b, 2, {c: 0});
    }
}
console.timeEnd("add-3");
}

{
const alu = new ALU();
console.time("add-alu");
for (a = 0; a < AMAX; a++) {
    for (b = 0; b < BMAX; b++) {
        alu.op1Bus.data = a;
        alu.op2Bus.data = b;
        alu.flagsBus.data = 0;
        alu.commandBus.data = COMMANDS.ADD | SIZES.OP1_16 | SIZES.OP2_16 | SIZES.RET_16;
        alu.executeBus.signal();
        z = alu.retBus.data;
    }
}
console.timeEnd("add-alu");
}
{
const alu = new ALU();
const registerFile = new RegisterFile;
const arg = 0b10;
const eatReturn = false;
const command = COMMANDS.ADD;
console.time("add-alu-with-flags");
for (a = 0; a < AMAX; a++) {
    for (b = 0; b < BMAX; b++) {
        //const [s0, sz0] = [a, SIZES.WORD];                      // s1, op2, b
        //const [s1, sz1] = [b, SIZES.WORD];                      // s0, op1, a
        const s0 = a, sz0 = SIZES.WORD,
              s1 = b, sz1 = SIZES.WORD;
        //const retSize = sz1 > sz0 ? sz1 : sz0; //Math.max(sz0, sz1);
        alu.op1Bus.data = s1;
        alu.op2Bus.data = s0;
        // set the flags ONLY if this is a WITH_FLAGS operation
        alu.flagsBus.data = (arg & 0b1) ? (registerFile.FLAGS & 0xF) : 0;
        alu.commandBus.data = COMMANDS.ADD | SIZES.OP1_16 | SIZES.OP2_16 | SIZES.RET_16;
        //alu.commandBus.data = (retSize << 8) | (sz0 << 6) | (sz1 << 4) | command;
        alu.executeBus.signal();
        /* if (arg & 0b10) {
            registerFile.FLAGS = (registerFile.FLAGS & 0xF0) | alu.flagsBus.data;
        } */
        z = alu.retBus.data;
        //if (!eatReturn) push(stack, ret, retSize);
    }
}
console.timeEnd("add-alu-with-flags");
}

{
const alu = new ALU();
const registerFile = new RegisterFile();
const stack = new Stack(16, 4);
console.time("add-tasks");
for (a = 0; a < AMAX; a++) {
    for (b = 0; b < BMAX; b++) {
        let tasks = [
                    TASKS.PUSH_WORD | a,
                    TASKS.PUSH_WORD | b,
                    TASKS.ADD | 0,
                ];
        for (var i = 0, l = tasks.length; i < l; i++) {
            executeTask(tasks[i], { stack, alu, registerFile} );
        }
        z = stack.pop() & 0xFFFF;
    }
}
console.timeEnd("add-tasks");
}
