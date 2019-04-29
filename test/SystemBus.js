import test from "ava";

import { SystemBus, COMMANDS_MEMORY_READ_BYTE, COMMANDS_MEMORY_READ_WORD,
COMMANDS_MEMORY_WRITE_BYTE, COMMANDS_MEMORY_WRITE_WORD } from "../src/core/SystemBus.js";

test("Can create a new system bus", t => {
    let systemBus;
    t.notThrows(() => systemBus = new SystemBus());
    t.is(systemBus.addressBus.size, 4);
    t.is(systemBus.dataBus.size, 2);
    t.is(systemBus.commandBus.size, 1);
    t.is(systemBus.executeBus.size, 1);
});

test("Can write data to the system bus", t => {
    const systemBus = new SystemBus();
    let writtenByte;
    systemBus.executeBus.addReceiver(() => writtenByte = systemBus.dataBus.value);
    systemBus.writeByte(0x1234, 123);
    t.is(writtenByte, 123);
});

test("Can read data from the system bus", t => {
    const systemBus = new SystemBus();
    systemBus.executeBus.addReceiver(() => {
        if (systemBus.address === 0x1234 && systemBus.command === COMMANDS_MEMORY_READ_BYTE ) {
            systemBus.data = 123;
        }
    });
    const readByte = systemBus.readByte(0x1234);
    t.is(readByte, 123);
});
