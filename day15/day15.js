const base = require("../base.js");

function compare_bits(a, b) {
    let match = true;

    for (let j = 0; j < 16; j++) {
        if ((a & (1 << j)) !== (b & (1 << j))) {
            match = false;
            break;
        }
    }

    return match;
}

function day15_part1(input) {
    input = input.split_whitespace().as_numbers();

    let a = input[0];
    let b = input[1];
    let pairs = 0;

    const stepa = () => a = (a * 16807) % 2147483647;
    const stepb = () => b = (b * 48271) % 2147483647;

    for (let i = 0; i < 40000000; i++) {
        stepa();
        stepb();

        if (compare_bits(a, b)) {
            pairs++;
        }
    }

    return pairs;
}

function day15_part2(input) {
    input = input.split_whitespace().as_numbers();

    let a = input[0];
    let b = input[1];
    let pairs = 0;

    const stepa = () => a = (a * 16807) % 2147483647;
    const stepb = () => b = (b * 48271) % 2147483647;

    for (let i = 0; i < 5000000;i++) {
        while ((a % 4) !== 0) {
            stepa();
        }

        while ((b % 8) !== 0) {
            stepb();
        }

        if (compare_bits(a, b)) {
            pairs++;
        }

        stepa();
        stepb();
    }

    return pairs;
}

base.start("day15.in", day15_part1);
base.start("day15.in", day15_part2);
