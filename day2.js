const base = require("./base.js");

function day2_part1(input) {
    return input.split("\n")
        .map(x => x.split("\t").as_numbers())
        .map(x => x.max() - x.min())
        .sum();
}

function day2_part2(input) {
    return input
        .split("\n")
        .map(x => x.split("\t").as_numbers())
        .map(x => x
            .map((y, _, a) => a
                .as_numbers()
                .divide(y)
                .keep_int()
                .max()
            )
            .keep_above(1)
            .first()
        )
        .sum();
}

base.start("day2.in", day2_part1);