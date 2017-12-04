const base = require("../base.js");

function day1_part1(input) {
    return input
        .split("")
        .as_numbers()
        .filter_it(it => it.next(1, true).value == it.value)
        .sum();
}

function day1_part2(input) {
    return input
        .split("")
        .as_numbers()
        .filter_it(it => it.next(it.length / 2, true).value == it.value)
        .sum();
}

base.start("day1.in", day1_part1);
base.start("day1.in", day1_part2);