import { Bus } from "../src/core/Bus.js";
import test from "ava";

test('Can create a bus', t => {
    let bus;
    t.notThrows(() => bus = new Bus(1));
    t.is(bus.size, 1);
});

[1, 2, 4].forEach(size => {
    test(`Can create with size ${size}`, t => {
        let bus;
        t.notThrows(() => bus = new Bus(size));
        t.is(bus.size, size);
    });
});

[0, 1, 0xFF, 0xFFFF, 0xFFFFF, 0x3FFFF, 127, 32767].forEach(v => {
    test(`Can assign ${v} to each supported size`, t => {
        let busses = [1, 2, 4].map(size => new Bus(size));
        busses.forEach(bus => bus.value = v);
        busses.forEach(bus => {
            const mask = [undefined, 0xFF, 0xFFFF, undefined, 0xFFFFFFFF][bus.size];
            t.is(bus.value, v & mask, `bus with size ${bus.size} with value ${bus.value} and ${v & mask}`);
        });
    });
});

test(`Can signal a receiver`, t => {
    let bus = new Bus(1);
    let called = 0;
    bus.addReceiver(() => called++);
    bus.signal();
    t.is(called, 1);
})