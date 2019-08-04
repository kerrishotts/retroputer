import { ALU, COMMANDS, SIZES } from "../src/core/ALU.js";
import { executeTask, TASKS } from "../src/isa/tasks.js";
import { RegisterFile } from "../src/core/RegisterFile.js";
import { Stack } from "../src/util/Stack.js";

const AMAX = 1000;
const BMAX = 1000;

const add = (a, b, bytes, flags = {c : 0}) => {
    let c = flags.c;
    let v = 0;
    var i, l, bA, bB, bV;
    for (i = bytes, l = 0; i > 0; i--, l += 8) {
        bA = a & 0xFF;
        bB = b & 0xFF;
        bV = bA + bB + c;
        c = (bV & 0x100) && 1;
        v = v | ((bV & 0xFF) << l);
        a = a >> 8;
        b = b >> 8;
    }
    flags.c = c;
    return v;
};

{
const carryBit = [0x100, 0x10000, 0x1000000, 0x100000000];
const signBit = [0x080, 0x08000, 0x0800000, 0x080000000];
const maskBit = [0x0FF, 0x0FFFF, 0x0FFFFFF, 0x0FFFFFFFF];

const add2 = (a, b, bytes, flags = {c : 0, z: 0, n: 0, v: 0}) => {
    let c = flags.c;
    let v = a + b + c;
    if (v & (carryBit[bytes])) flags.c = 1;
    if (v === 0) flags.z = 1;
    if (v & signBit[bytes]) flags.n = 1;
    return v & maskBit[bytes];
}

const add3 = (a, b, bytes, flags = {c : 0}) => {
    let c = flags.c;
    let v = a + b + c;
    (v & (carryBit[bytes])) ? (flags.c = 1) : 0;
    (v === 0) ? (flags.z = 1) : 0;
    (v & signBit[bytes]) ? (flags.n = 1): 0;
    return v & maskBit[bytes];
}

var a, b, z;
console.time("add");
for (a = 0; a < AMAX; a++) {
    for (b = 0; b < BMAX; b++) {
        z = (a|0) + (b|0);
    }
}
console.timeEnd("add");

console.time("add-c");
for (a = 0; a < AMAX; a++) {
    for (b = 0; b < BMAX; b++) {
        z = add(a, b, 2, {c: 0});
    }
}
console.timeEnd("add-c");

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
const withFlags = 1;
const eatReturn = false;
const command = COMMANDS.ADD;
console.time("add-alu2");
for (a = 0; a < AMAX; a++) {
    for (b = 0; b < BMAX; b++) {
        const [s0, sz0] = [a | 0, SIZES.WORD];                      // s1, op2, b
        const [s1, sz1] = [b | 0, SIZES.WORD];                      // s0, op1, a
        const retSize = Math.max(sz0, sz1);
        alu.op1Bus.data = s1;
        alu.op2Bus.data = s0;
        // set the flags ONLY if this is a WITH_FLAGS operation
        alu.flagsBus.data = (withFlags === 0)
            ? 0
            : ((registerFile.FLAGS & 0b10) << 1);
        alu.commandBus.data = (retSize << 8) | (sz0 << 6) | (sz1 << 4) | command;
        alu.executeBus.signal();
        const ret = alu.retBus.data;
        const flags = alu.flagsBus.data;
        //if (!eatReturn) push(stack, ret, retSize);
        if (withFlags) {
            // pull back the flags
            registerFile.FLAGS = (registerFile.FLAGS & 0b00111100) |
                                 ((flags & 0b1000) << 4) |
                                 ((flags & 0b0100) >> 1) |
                                 ((flags & 0b0010) << 5) |
                                 ((flags & 0b0001));
            /*registerFile.NEGATIVE = (flags & 0b1000) && 1; // >> 3;
            registerFile.CARRY = (flags & 0b0100) && 1; // >> 2;
            registerFile.OVERFLOW = (flags & 0b0010) && 1; // >> 1;
            registerFile.ZERO = (flags & 0b0001);*/
        }
    }
}
console.timeEnd("add-alu2");
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
                    TASKS.ADD_WITH_FLAGS,
                ];
        for (var i = 0; i < tasks.length; i++) {
            executeTask(tasks[i], { stack, alu, registerFile} );
        }
        z = stack.pop() & 0xFFFF;
    }
}
console.timeEnd("add-tasks");
}
