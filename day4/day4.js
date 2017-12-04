const base = require("../base.js");

function day4_part1(input) {
    return input.split_newline()
        .map(x => x.split_whitespace())
        .map(x => x.has_duplicates() ? 0 : 1)
        .sum();
}

function day4_part2(input) {
    return input.split_newline()
        .map(x => x.split_whitespace())
        .map(x => {
            return x
                .map(x => x.split("").sort().join())
                .has_duplicates() ? 0 : 1
        })
        .sum();
}

base.start("day4.in", day4_part1);
base.start("day4.in", day4_part2);