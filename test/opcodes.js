import test from "ava";
import { TASKS, mapTask, executeTask} from "../src/isa/tasks.js";
import { _constructArgs, decodeToTasks, OPCODES } from "../src/isa/opcodes.js";
import { RegisterFile, REGISTER_INDEX } from "../src/core/RegisterFile.js";
import { Memory } from "../src/core/Memory.js";
import { SystemBus } from "../src/core/SystemBus.js";
import { ALU } from "../src/core/ALU.js";


export function execTaskMacro(t, {setup, tasks}, cb) {
    const stack = [];
    const systemBus = new SystemBus();
    const memory = new Memory({systemBus});
    const alu = new ALU();
    const registerFile = new RegisterFile();
    if (setup) { setup({registerFile, memory, stack, alu}); }
    tasks.forEach(task => {
        executeTask(task, {stack, registerFile, alu, memory, ioBus: null});
    });

    t.notThrows(() => cb(t, {stack, registerFile, alu, memory}));
}

//
// _constructArgs
///////////////////////////////////////////////////////////////////////////////

test("#_constructArgs: can extract a single bit", t => {
    const args = _constructArgs(0b10101010, {b: [ 5, 5 ]});
    t.deepEqual(args, {b: 0b1});
});

test("#_constructArgs: can extract two bits", t => {
    const args = _constructArgs(0b10111010, {b: [ 5, 4 ]});
    t.deepEqual(args, {b: 0b11});
});

test("#_constructArgs: can extract two args", t => {
    const args = _constructArgs(0b11000110, {d: [7, 4], s: [3, 0]});
    t.deepEqual(args, {d: 0b1100, s: 0b0110});
});

test("#_constructArgs: can extract three args", t => {
    const args = _constructArgs(0b1100110011000110, {b: [15, 8], d: [7, 4], s: [3, 0]});
    t.deepEqual(args, {b: 0b11001100, d: 0b1100, s: 0b0110});
});

test("#_constructArgs: can extract addressing modes ", t => {
    const args = _constructArgs(0b00010010001011011100110011001100,
        {
            opcode: [31, 28],
            d: [27, 24],
            m: [22, 21],
            i: [20, 20],
            x: [19, 19],
            y: [18, 18],
            a: [17, 0]
        });
    t.deepEqual(args, {
        opcode: 0b0001,
        d: 0b0010,
        m: 0b01,
        i: 0b0,
        x: 0b1,
        y: 0b1,
        a: 0b011100110011001100});
});

//
// Opcode Decoding and Task Matching
///////////////////////////////////////////////////////////////////////////////

test("decode nop", t => {
    const bytes = [ 0x00 ];
    const tasks = decodeToTasks(bytes, OPCODES.nop);
    t.deepEqual(tasks, [TASKS.NOP]);
});

const ALL_WORD_REGS = [
    REGISTER_INDEX.A, REGISTER_INDEX.B, REGISTER_INDEX.C, REGISTER_INDEX.D,
    REGISTER_INDEX.X, REGISTER_INDEX.Y, REGISTER_INDEX.SP, REGISTER_INDEX.BP
];
const ALL_BYTE_REGS = [
    REGISTER_INDEX.AL, REGISTER_INDEX.BL, REGISTER_INDEX.CL, REGISTER_INDEX.DL,
    REGISTER_INDEX.XL, REGISTER_INDEX.YL
];

const ALL_DATA_REGS = [
    REGISTER_INDEX.A, REGISTER_INDEX.B, REGISTER_INDEX.C, REGISTER_INDEX.D,
    REGISTER_INDEX.X, REGISTER_INDEX.Y, REGISTER_INDEX.SP, REGISTER_INDEX.BP,
    REGISTER_INDEX.AL, REGISTER_INDEX.BL, REGISTER_INDEX.CL, REGISTER_INDEX.DL,
    REGISTER_INDEX.XL, REGISTER_INDEX.YL
];

ALL_DATA_REGS.forEach(r => {
    test(`decode not r${r}`, t => {
        const bytes = 0x0900 | r;
        const tasks = decodeToTasks(bytes, OPCODES.not);
        t.deepEqual(tasks, [
            TASKS.GET_REGISTER_AND_PUSH | r, // a, op1
            ((r & 0x01) ? TASKS.PUSH_BYTE : TASKS.PUSH_WORD) | ((r & 0x01) ? 0xFF : 0xFFFF), // b, op2
            TASKS.XOR_WITH_FLAGS,
            TASKS.POP_INTO_REGISTER | r
        ]);
    }) ;
});

ALL_DATA_REGS.forEach(r => {
    test(`exec not r${r}`, t=> {
        const bytes = 0x0900 | r;
        const set = [0x12, 0x1234];
        const exp = [0xED, 0xEDCB];
        const regSize = 1 - (r & 0b01);
        execTaskMacro(t, {
            setup({registerFile}) {
                registerFile.setRegister(r, set[regSize]);
            },
            tasks: decodeToTasks(bytes, OPCODES.not)
        },
        (t, {registerFile}) => {
            t.is(registerFile.getRegister(r), exp[regSize]);
        })
    });
});

ALL_DATA_REGS.forEach(r => {
    test(`decode neg r${r}`, t => {
        const bytes = 0x0910 | r ;
        const tasks = decodeToTasks(bytes, OPCODES.neg);
        t.deepEqual(tasks, [
            TASKS.GET_REGISTER_AND_PUSH | r, // a
            ((r & 0x01) ? TASKS.PUSH_BYTE : TASKS.PUSH_WORD) | ((r & 0x01) ? 0xFF : 0xFFFF), // b
            TASKS.XOR,
            ((r & 0x01) ? TASKS.PUSH_BYTE : TASKS.PUSH_WORD) | 0x01,
            TASKS.ADD_WITH_FLAGS,
            TASKS.POP_INTO_REGISTER | r
        ]);
    }) ;
});