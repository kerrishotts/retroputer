enum COMMANDS {
    ADD = 0x01,
    SUB = 0x02,
    MUL = 0x03,
    DIV = 0x04,
    MOD = 0x05,
    SMUL = 0x06,
    SDIV = 0x07,
    SMOD = 0x08,
    NEG = 0x09,
    SHL = 0x0A,
    SHR = 0x0B,
    AND = 0x0C,
    OR = 0x0D,
    XOR = 0x0E,
    NOT = 0x0F,
};

enum SIZES {
    BYTE = 0b00,
    WORD = 0b01,
    ADDR = 0b10,
    RET_8 =  0b0000000000,
    RET_16 = 0b0100000000,
    RET_19 = 0b1000000000,
    RET_32 = 0b1100000000,
    OP1_8 =  0b0000000000,
    OP1_16 = 0b0001000000,
    OP1_19 = 0b0010000000,
    OP1_32 = 0b0011000000,
    OP2_8 =  0b0000000000,
    OP2_16 = 0b0000010000,
    OP2_19 = 0b0000100000,
    OP2_32 = 0b0000110000,
};

/* global ALU state */
signed int op1 = 0;
unsigned int sizeOfOp1 = 0;
signed int op2 = 0;
unsigned int sizeOfOp2 = 0;
signed int ret = 0;
unsigned int sizeOfRet = 0;
unsigned int op = 0;

void setup(signed int op1_in, unsigned int op2_in, unsigned int cmd_in) {
  op1 = op1_in;
  op2 = op2_in;
  op = cmd_in & 0x00F;
  sizeOfRet = (cmd_in & 0b1100000000) >> 8;
  sizeOfOp1 = (cmd_in & 0b0011000000) >> 6;
  sizeOfOp2 = (cmd_in & 0b0000110000) >> 4;
}

// flags
unsigned char zero = 0;
unsigned char negative = 0;
unsigned char carry = 0;
unsigned char overflow = 0;

// masking and bit checking
unsigned int signBit[] =  {0x00000080, 0x00008000, 0x00040000};
unsigned int mask[] =     {0x000000FF, 0x0000FFFF, 0x0007FFFF};
unsigned int carryBit[] = {0x00000100, 0x00010000, 0x00080000};


// get current flags
unsigned char flags() {
  return zero
       | (overflow << 1)
       | (carry    << 2)
       | (negative << 3);
}

void updateFlags() {
  if (ret < 0) {
    ret += carryBit[sizeOfRet];
  }
}


signed int add(signed int a, signed int b, signed int c) {
  signed int r = a + b + c;
  negative = (r < 0);
  zero = (r == 0);
  return r;
}


int main() { 
  return 42;
}