/* eslint-disable comma-style */
export default {
    ioComm3DataIn: 0x4F
    , ioComm3DataOut: 0x4E
    , ioComm3Command: 0x4D
    , ioComm3Configuration: 0x4C
    , ioComm2DataIn: 0x4B
    , ioComm2DataOut: 0x4A
    , ioComm2Command: 0x49
    , ioComm2Configuration: 0x48
    , ioComm1DataIn: 0x47
    , ioComm1DataOut: 0x46
    , ioComm1Command: 0x45
    , ioComm1Configuration: 0x44
    , ioComm0DataIn: 0x43
    , ioComm0DataOut: 0x42
    , ioComm0Command: 0x41
    , ioComm0Configuration: 0x40  // b0 = opened; b1 = cmd sent; b2 = cmd ack; b3 = data out sent; b4 = data out ack; b5 = data in sent; b6 = data in ack
    , ioRandomHigh: 0x39
    , ioRandomLow: 0x38
    , ioClockHours: 0x33
    , ioClockMinutes: 0x32
    , ioClockSeconds: 0x31
    , ioClockHundredths: 0x30
    , ioTimer3HighCurrent: 0x2C
    , ioTimer3LowCurrent: 0x2B
    , ioTimer3HighReset: 0x2A
    , ioTimer3LowReset: 0x29
    , ioTimer3Configuration: 0x28
    , ioTimer2HighCurrent: 0x24
    , ioTimer2LowCurrent: 0x23
    , ioTimer2HighReset: 0x22
    , ioTimer2LowReset: 0x21
    , ioTimer2Configuration: 0x20
    , ioTimer1HighCurrent: 0x1C
    , ioTimer1LowCurrent: 0x1B
    , ioTimer1HighReset: 0x1A
    , ioTimer1LowReset: 0x19
    , ioTimer1Configuration: 0x18
    , ioTimer0HighCurrent: 0x14
    , ioTimer0LowCurrent: 0x13
    , ioTimer0HighReset: 0x12
    , ioTimer0LowReset: 0x11
    , ioTimer0Configuration: 0x10  // b0 = enabled; b1: 0 = one-shot, 1 = continuous; b2: 0 = no interrupt, 1 = trigger interrupt; b7 = triggered (manual reset)
    , ioKeyboardDirections: 0x02
    , ioKeyboardModifiers: 0x01
    , ioKeyboardKeyPressed: 0x00
}