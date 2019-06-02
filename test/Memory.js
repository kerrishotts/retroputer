import test from "ava";

import layout from "../src/core/memoryLayout.js";
import { Memory } from "../src/core/Memory.js";
import { SystemBus } from "../src/core/SystemBus.js";

test("Can create memory with the desired layout", t => {
    let memory;
    const systemBus = new SystemBus();
    t.notThrows(() => memory = new Memory({ systemBus }));
    t.is(memory.pages.length, 32);
    t.is(memory.size, 512 * 1024);
});

test("Can write byte to memory directly", t => {
    const systemBus = new SystemBus();
    const memory = new Memory({ systemBus });

    memory.writeByte(0x1234, 123);
    t.is(memory.readByte(0x1234), 123);
});

test("Can write word to memory directly", t => {
    const systemBus = new SystemBus();
    const memory = new Memory({ systemBus });

    memory.writeWord(0x1234, 513);
    t.is(memory.readWord(0x1234), 513);
});

test("Can write to memory from the system bus", t => {
    const systemBus = new SystemBus();
    const memory = new Memory({ systemBus });

    systemBus.writeByte(0x1234, 123);
    t.is(memory.readByte(0x1234), 123);
});

test("Can write word to memory from the system bus", t => {
    const systemBus = new SystemBus();
    const memory = new Memory({ systemBus });

    systemBus.writeWord(0x1234, 514);
    t.is(memory.readWord(0x1234), 514);
});

test("Can read byte of memory from the system bus", t => {
    const systemBus = new SystemBus();
    const memory = new Memory({ systemBus });

    memory.writeByte(0x1234, 123);
    const byte = systemBus.readByte(0x1234);
    t.is(byte, 123);
});

test("Can read word of memory from the system bus", t => {
    const systemBus = new SystemBus();
    const memory = new Memory({ systemBus });

    memory.writeWord(0x1234, 517);
    const byte = systemBus.readWord(0x1234);
    t.is(byte, 517);
});

test.todo("Can't write to rom");