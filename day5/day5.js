const base = require("../base.js");

function day5_part1(input) {
    const instructions = input.split_newline().as_numbers();
    let pc = 0;
    let num = 0;

    while (pc < instructions.length) {
        const tmp = instructions[pc];
        instructions[pc]++;

        pc += tmp;
        num++;
    }

    return num;
}

function day5_part2(input) {
    const instructions = input.split_newline().as_numbers();
    let pc = 0;
    let num = 0;

    while (pc < instructions.length) {
        const tmp = instructions[pc];

        if (tmp >= 3) {
            instructions[pc]--;
        } else {
            instructions[pc]++;
        }
        
        pc += tmp;
        num++;
    }

    return num;
}

base.start("day5.in", day5_part1);
base.start("day5.in", day5_part2);
