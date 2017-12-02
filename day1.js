const base = require("./base.js");

function day1_part1(input) {
    return input
        .split("")
        .as_numbers()
        .filter((x, i, a) => a[(i + 1) % a.length] == x)
        .sum();
}

function day1_part2(input) {
    return input
        .split("")
        .as_numbers()
        .filter((x, i, a) => a[(i + a. length / 2) % a.length] == x)
        .sum();
}

base.start("day1.in", day1_part1);