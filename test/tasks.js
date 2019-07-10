import test from "ava";
import {
    TASKS, executeTask,
    STACK_ADDR, STACK_BYTE, STACK_WORD,
    mapTask
} from "../src/isa/tasks.js";

import { RegisterFile, REGISTER_INDEX } from "../src/core/RegisterFile.js";
import { Memory } from "../src/core/Memory.js";
import memoryLayout from "../src/core/memoryLayout.js";
import { SystemBus } from "../src/core/SystemBus.js";
import { ALU } from "../src/core/ALU.js";

export function execTaskMacro(t, { setup, tasks }, cb) {
    const stack = [];
    const systemBus = new SystemBus();
    const memory = new Memory({ systemBus, layout: memoryLayout });
    const alu = new ALU();
    const registerFile = new RegisterFile();
    if (setup) { setup({ registerFile, memory, stack, alu }); }
    t.log(`Tasks: \n    ${tasks.map(mapTask).join("\n    ")}`);
    tasks.forEach(task =>
        executeTask(task, { stack, registerFile, alu, memory })
    );

    t.notThrows(() => cb(t, { stack, registerFile, alu, memory }));
}

test("Can execute a simple task and check validity", execTaskMacro,
    { tasks: [TASKS.PUSH_BYTE | 0x00] },
    (t, { stack }) => t.deepEqual(stack, [0x00 | STACK_BYTE]));

test.only("Can get a word-sized register and put it on the stack", execTaskMacro,
    {
        setup({ registerFile }) { registerFile.C = 1234; },
        tasks: [TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.C]
    },
    (t, { stack }) => t.deepEqual(stack, [1234 | STACK_WORD]));

test("Can get a byte-sized register and put it on the stack", execTaskMacro,
    {
        setup({ registerFile }) { registerFile.BL = 12; },
        tasks: [TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.BL]
    },
    (t, { stack }) => t.deepEqual(stack, [12 | STACK_BYTE]));

test("Can we add two bytes", execTaskMacro,
    {
        tasks: [TASKS.PUSH_BYTE | 0x20,
        TASKS.PUSH_BYTE | 0x09,
        TASKS.ADD]
    },
    (t, { stack }) => t.deepEqual(stack, [0x29 | STACK_BYTE]));

test("Can we add two words", execTaskMacro,
    {
        tasks: [TASKS.PUSH_WORD | 0x2041,
        TASKS.PUSH_WORD | 0x0109,
        TASKS.ADD]
    },
    (t, { stack }) => t.deepEqual(stack, [0x214A | STACK_WORD]));

test("Can we add a byte and a word", execTaskMacro,
    {
        tasks: [TASKS.PUSH_BYTE | 0x0041,
        TASKS.PUSH_WORD | 0x0109,
        TASKS.ADD]
    },
    (t, { stack }) => t.deepEqual(stack, [0x014A | STACK_WORD]));

test("Can we add a word and an address", execTaskMacro,
    {
        tasks: [TASKS.PUSH_WORD | 0x03041,
        TASKS.PUSH_ADDR | 0x20000,
        TASKS.ADD]
    },
    (t, { stack }) => t.deepEqual(stack, [0x23041 | STACK_ADDR]));

test("Can we add two unsigned bytes, generating carry, and pull flags", execTaskMacro,
    {
        tasks: [TASKS.PUSH_BYTE | 0xA0,
        TASKS.PUSH_BYTE | 0xB9,
        TASKS.ADD_WITH_FLAGS]
    },
    (t, { stack, registerFile }) => {
        t.deepEqual(stack, [0x59 | STACK_BYTE]);
        t.is(registerFile.ZERO, 0, "ZERO should be unset");
        t.is(registerFile.NEGATIVE, 0, "NEGATIVE should be unset");
        t.is(registerFile.CARRY, 1, "CARRY should be set");
    });

test("Can we compare two equal numbers, pulling flags", execTaskMacro,
    {
        tasks: [
            TASKS.PUSH_BYTE | 0xA1,
            TASKS.PUSH_BYTE | 0xA1,
            TASKS.CMP_WITH_FLAGS
        ]
    },
    (t, { stack, registerFile }) => {
        t.deepEqual(stack, []);
        t.is(registerFile.ZERO, 1, "ZERO should be set");
        t.is(registerFile.NEGATIVE, 0, "NEGATIVE should be unset");
        t.is(registerFile.CARRY, 0, "CARRY should be unset");
    });

test("Can we compare two numbers, a < b, pulling flags", execTaskMacro,
    {
        tasks: [
            TASKS.PUSH_BYTE | 0xA1,
            TASKS.PUSH_BYTE | 0xA9,
            TASKS.CMP_WITH_FLAGS
        ]
    },
    (t, { stack, registerFile }) => {
        t.deepEqual(stack, []);
        t.is(registerFile.ZERO, 0, "ZERO should be unset");
        t.is(registerFile.NEGATIVE, 1, "NEGATIVE should be set");
        t.is(registerFile.CARRY, 0, "CARRY should be unset");
    });

test("Can we compare two numbers, a > b, pulling flags", execTaskMacro,
    {
        tasks: [
            TASKS.PUSH_BYTE | 0xA9,
            TASKS.PUSH_BYTE | 0xA1,
            TASKS.CMP_WITH_FLAGS
        ]
    },
    (t, { stack, registerFile }) => {
        t.deepEqual(stack, []);
        t.is(registerFile.ZERO, 0, "ZERO should be unset");
        t.is(registerFile.NEGATIVE, 0, "NEGATIVE should be unset");
        t.is(registerFile.CARRY, 0, "CARRY should be unset");
    });

test("Can we transfer a value from a byte register into memory?", execTaskMacro,
    {
        setup({ registerFile }) { registerFile.BL = 0x34; },
        tasks: [
            TASKS.PUSH_ADDR | 0x01000,
            TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.BL,
            TASKS.POP_BYTE_INTO_MEMORY
        ]
    },
    (t, { stack, memory }) => {
        t.deepEqual(stack, []);
        t.is(memory.readByte(0x01000), 0x34, "[0x01000] = 34")
    }
);

test("Can we transfer a value from a word register into memory?", execTaskMacro,
    {
        setup({ registerFile }) { registerFile.B = 0x349A; },
        tasks: [
            TASKS.PUSH_ADDR | 0x01000,
            TASKS.GET_REGISTER_AND_PUSH | REGISTER_INDEX.B,
            TASKS.POP_WORD_INTO_MEMORY
        ]
    },
    (t, { stack, memory }) => {
        t.deepEqual(stack, []);
        t.is(memory.readWord(0x01000), 0x349A, "[0x01000, 0x01001] = 349A")
    }
);

