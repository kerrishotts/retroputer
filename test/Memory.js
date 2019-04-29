import test from "ava";

import layout from "../src/core/memoryLayout.js";
import { Memory } from "../src/core/Memory.js";
import { SystemBus } from "../src/core/SystemBus.js";

test.before(t => {
    t.context.systemBus = new SystemBus();
});

test("Can create memory with the desired layout", t => {
    let memory;
    const systemBus = t.context.systemBus;
    t.notThrows(() => memory = new Memory({ systemBus, layout }));
    t.is(memory.banks.length, 5);
    t.is(memory.size, 256 * 1024);
});

test("Can write to memory from the system bus", t => {
    const systemBus = t.context.systemBus;
    const memory = new Memory({ systemBus, layout });

    systemBus.writeByte(0x1234, 123);
    t.is(memory.readByte(0x1234), 123);
});

test("Can read memory from the system bus", t => {
    const systemBus = t.context.systemBus;
    const memory = new Memory({ systemBus, layout });

    memory.writeByte(0x1234, 123);
    const byte = systemBus.readByte(0x1234);
    t.is(byte, 123);
});

test.todo("Can't write to rom");