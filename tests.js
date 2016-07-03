
var tests = [];
tests[0] = function test_LD_r_r() {
    console.log("test_LD_r_r");
    cpu[7] = 6;
    cpu[5] = 2;
    var byte = 0 | 64 | 32 | 16 | 8 | 4 | 1;
    memory[cpu["IP"]] = byte;
    execute();
    console.log(cpu[7] == cpu[5]);
};

tests[1] = function test_LD_r_n(value) {
    console.log("test_LD_r_n");
    cpu[7] = 6;
    var byte = 0 | 32 | 16 | 8 | 4 | 2;
    memory[cpu["IP"]] = byte;
    memory[cpu["IP"] + 1] = value;
    execute(memory[0]);
    console.log(cpu[7] == value);
};

tests[2] = function test_LD_r_contHL(value) {
    console.log("test_LD_r_contHL");
    cpu[7] = 6;
    var byte = 0 | 64 | 32 | 16 | 8 | 4 | 2;
    memory[cpu["IP"]] = byte;
    set8bit(2, value);
    memory[value] = 66;
    execute();
    console.log(cpu[7] == 66);
};
tests[3] = function test_LD_r_contIX_D(value) {
    console.log("test_LD_r_contIX_D");
    cpu[7] = 6;
    cpu["IX"] = 5;
    memory[cpu["IX"] + value] = 77;
    var byte = 0 | 64 | 32 | 16 | 8 | 4 | 2;
    memory[cpu["IP"]] = 221;
    memory[cpu["IP"] + 1] = byte;
    memory[cpu["IP"] + 2] = value;
    execute();
    console.log(cpu[7] == 77);
};
tests[4] = function test_LD_r_contIY_D() {
    console.log("test_LD_r_contIY_D");
    cpu[7] = 6;
    cpu["IY"] = 3;
    memory[cpu["IY"] + 55] = 33;
    var byte = 0 | 64 | 32 | 16 | 8 | 4 | 2;
    memory[cpu["IP"]] = 253;
    memory[cpu["IP"] + 1] = byte;
    memory[cpu["IP"] + 2] = 55;
    execute();
    console.log(cpu[7] == 33);
};
tests[5] = function test_LD_contHL_r() {
    console.log("test_LD_contHL_r");
    cpu[7] = 6;
    var byte = 0 | 64 | 32 | 16 | 4 | 2 | 1;
    memory[cpu["IP"]] = byte;
    execute();
    console.log(memory[get16bitFromRegs(2)] == 6);
};
tests[6] = function test_LD_contIX_D_r() {
    console.log("test_LD_contIX_D_r");
    cpu[7] = 6;
    var byte = 0 | 64 | 32 | 16 | 4 | 2 | 1;
    memory[cpu["IP"]] = 221;
    memory[cpu["IP"] + 1] = byte;
    memory[cpu["IP"] + 2] = 5;
    execute();
    console.log(memory[cpu["IX"] + 5] == 6);
};
tests[7] = function test_LD_contIY_D_r() {
    console.log("test_LD_contIY_D_r");
    cpu[7] = 6;
    var byte = 0 | 64 | 32 | 16 | 4 | 2 | 1;
    cpu["IY"] = 0;
    memory[cpu["IP"]] = 253;
    memory[cpu["IP"] + 1] = byte;
    memory[cpu["IP"] + 2] = 5;
    execute();
    console.log(memory[cpu["IY"] + 5] == 6);
};
tests[8] = function test_LD_contHL_n(value) {
    console.log("test_LD_contHL_n");
    cpu[7] = 6;
    memory[cpu["IP"]] = 54;
    memory[cpu["IP"] + 1] = value;
    execute();
    console.log(memory[get16bitFromRegs(2)] == value);
};
tests[9] = function test_LD_contIX_D_n(value) {
    console.log("test_LD_contIX_D_n");
    cpu[7] = 6;
    memory[cpu["IP"]] = 221;
    memory[cpu["IP"] + 1] = 54;
    memory[cpu["IP"] + 2] = 5;
    memory[cpu["IP"] + 3] = value;
    execute();
    console.log(memory[cpu["IX"] + 5] == value);
};
tests[10] = function test_LD_contIY_D_n(value) {
    console.log("test_LD_contIY_D_n");
    cpu[7] = 6;
    memory[cpu["IP"]] = 253;
    memory[cpu["IP"] + 1] = 54;
    memory[cpu["IP"] + 2] = 9;
    memory[cpu["IP"] + 3] = value;
    execute();
    console.log(memory[cpu["IY"] + 9] == value);
};
tests[11] = function test_LD_A_contBC(value) {
    console.log("test_LD_A_contBC");
    memory[cpu["IP"]] = 10;
    set8bit(0, value);
    execute();
    console.log(cpu[7] == memory[value]);
};
tests[12] = function test_LD_A_contDE(value) {
    console.log("test_ LD_A_contDE");
    memory[cpu["IP"]] = 26;
    set8bit(1, value);
    execute();
    console.log(cpu[7] == memory[value]);
};
tests[13] = function test_LD_A_cont_nn(value) {
    console.log("LD_A_cont_nn");
    memory[cpu["IP"]] = 58;
    memory[cpu["IP"] + 1] = get8bit(value)[0];
    memory[cpu["IP"] + 2] = get8bit(value)[1];
    execute();
    console.log(cpu[7] == memory[value]);
};
tests[14] = function test_LD_contBC_A() {
    memory[cpu["IP"]] = 2;
    console.log("test_LD_contBC_A");
    execute();
    console.log(memory[get16bitFromRegs(0)] == cpu[7]);
};
tests[15] = function test_LD_contDE_A() {
    memory[cpu["IP"]] = 18;
    console.log("test_LD_contDE_A");
    execute();
    console.log(memory[get16bitFromRegs(1)] == cpu[7]);
};
tests[16] = function test_LD_cont_nn_A(value) {
    console.log("test_LD_cont_nn_A");
    memory[cpu["IP"]] = 50;
    memory[cpu["IP"] + 1] = get8bit(value)[0];
    memory[cpu["IP"] + 2] = get8bit(value)[1];
    execute();
    console.log(cpu[7] == memory[value]);
};
tests[17] = function test_LD_A_I() {
    memory[cpu["IP"]] = 237;
    memory[cpu["IP"] + 1] = 87;
    console.log("test_LD_A_I");
    cpu["I"] = 5;
    execute();
    console.log(cpu[7] == cpu["I"]);
};
tests[18] = function test_LD_A_R() {
    cpu["I"] = 2;
    console.log("test_LD_A_R");
    memory[cpu["IP"]] = 237;
    memory[cpu["IP"] + 1] = 95;
    execute();
    console.log(cpu[7] == cpu["R"]);
};
tests[19] = function test_LD_I_A() {
    memory[cpu["IP"]] = 237;
    memory[cpu["IP"] + 1] = 71;
    console.log("test_LD_I_A");
    cpu["I"] = 2;
    execute();
    console.log(cpu[7] == cpu["I"]);
};
tests[20] = function test_LD_R_A() {
    cpu["I"] = 9;
    console.log("test_LD_A_R");
    memory[cpu["IP"]] = 237;
    memory[cpu["IP"] + 1] = 79;
    execute();
    console.log(cpu[7] == cpu["R"]);
};
tests[21] = function test_LD_dd_nn() {
    console.log("test_LD_dd_nn");
    var byte = 0 | 32 | 1;
    memory[cpu["IP"]] = byte;
    memory[cpu["IP"] + 1] = get8bit(270)[0];
    memory[cpu["IP"] + 2] = get8bit(270)[1];
    execute();
    console.log(get16bitFromRegs(2) == 270);
};
tests[22] = function test_LD_IX_nn() {
    console.log("test_LD_IX_nn");
    memory[cpu["IP"]] = 221;
    memory[cpu["IP"] + 1] = 33;
    memory[cpu["IP"] + 2] = get8bit(290)[0];
    memory[cpu["IP"] + 3] = get8bit(290)[1];
    execute();
    console.log(cpu["IX"] == 290);
};
tests[22] = function test_LD_IY_nn() {
    console.log("test_LD_IY_nn");
    memory[cpu["IP"]] = 253;
    memory[cpu["IP"] + 1] = 33;
    memory[cpu["IP"] + 2] = get8bit(300)[0];
    memory[cpu["IP"] + 3] = get8bit(300)[1];
    execute();
    console.log(cpu["IY"] == 300);
};
tests[22] = function test_HL_cont_nn() {
    console.log("test_HL_cont_nn");
    memory[298]=500;
    memory[cpu["IP"]] = 42;
    memory[cpu["IP"] + 1] = get8bit(298)[0];
    memory[cpu["IP"] + 2] = get8bit(298)[1];
    execute();
    console.log(get16bitFromRegs(2) == 500);
};
tests[23] = function test_LD_dd_cont_nn(dd) {
    console.log("test_LD_dd_cont_nn");
    memory[700]=345;
    memory[cpu["IP"]] = 237;
    memory[cpu["IP"]+1] = 0|64|16|8|1|2;
    memory[cpu["IP"] + 2] = get8bit(700)[0];
    memory[cpu["IP"] + 3] = get8bit(700)[1];
    execute();
    console.log(get16bitFromRegs(1) == 345);
};
tests[24] = function LD_IX_cont_nn() {
    console.log("test_LD_IX_cont_nn");
    memory[888]=333;
    memory[cpu["IP"]] = 221;
    memory[cpu["IP"]+1] = 42;
    memory[cpu["IP"] + 2] = get8bit(888)[0];
    memory[cpu["IP"] + 3] = get8bit(888)[1];
    execute();
    console.log(cpu["IX"] == 333);
};
tests[25] = function LD_IY_cont_nn() {
    console.log("test_LD_IY_cont_nn");
    memory[987]=980;
    memory[cpu["IP"]] = 253;
    memory[cpu["IP"]+1] = 42;
    memory[cpu["IP"] + 2] = get8bit(987)[0];
    memory[cpu["IP"] + 3] = get8bit(987)[1];
    execute();
    console.log(cpu["IY"] == 980);
};
tests[26] = function  test_LD_cont_nn_HL() {
    console.log("test_LD_cont_nn_HL");
    memory[700]=456;
    memory[cpu["IP"]] = 34;
    memory[cpu["IP"]+1] = get8bit(700)[0];
    memory[cpu["IP"] + 2] = get8bit(700)[1];
    execute();
    console.log(get16bitFromRegs("2")==get16bit(memory[700],memory[701]));
};
tests[27] = function  test_LD_cont_nn_dd() {
    console.log("test_LD_cont_nn_dd");
    memory[702]=654;
    memory[cpu["IP"]] = 237;
    memory[cpu["IP"]+1] =115;
    memory[cpu["IP"]+2] = get8bit(702)[0];
    memory[cpu["IP"] + 3] = get8bit(702)[1];
    execute();
    console.log(get16bitFromRegs("3")==get16bit(memory[702],memory[703]));
};
tests[28] = function  test_LD_cont_nn_IX() {
    console.log("test_LD_cont_nn_IX");
    memory[704]=654;
    memory[cpu["IP"]] = 221;
    memory[cpu["IP"]+1] =34;
    memory[cpu["IP"]+2] = get8bit(704)[0];
    memory[cpu["IP"] + 3] = get8bit(704)[1];
    execute();
    console.log(cpu["IX"]==get16bit(memory[704],memory[705]));
};
tests[29] = function  test_LD_cont_nn_IY() {
    console.log("test_LD_cont_nn_IY");
    memory[966]=654;
    memory[cpu["IP"]] = 253;
    memory[cpu["IP"]+1] =34;
    memory[cpu["IP"]+2] = get8bit(966)[0];
    memory[cpu["IP"] + 3] = get8bit(966)[1];
    execute();
    console.log(cpu["IY"]==get16bit(memory[966],memory[967]));
};
tests[30] = function  test_LD_SP_HL() {
    console.log("test_LD_SP_HL");
    memory[cpu["IP"]] = 249;
    execute();
    console.log(get16bitFromRegs(3)==get16bitFromRegs(2));
};
tests[31] = function  test_LD_SP_IX() {
    console.log("test_LD_SP_IX");
    memory[cpu["IP"]] = 221;
    memory[cpu["IP"]+1] = 249;
    execute();
    console.log(get16bitFromRegs(3)==cpu["IX"]);
};
tests[32] = function  test_LD_SP_HL() {
    console.log("test_LD_cont_nn_IY");
    memory[cpu["IP"]] = 253;
    memory[cpu["IP"]+1] = 249;
    execute();
    console.log(get16bitFromRegs(3)==cpu["IY"]);
};

function test() {
    for (var i = 0; i < tests.length; i++)
        tests[i](i);
}