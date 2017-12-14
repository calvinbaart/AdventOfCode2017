const base = require("../base.js");

function day10_part1(input) {
    let obj = Array._hashSetup();
    obj = Array._hashExecute(input.split(",").as_numbers(), obj.list, obj.position, obj.skipSize);

    return obj.list[0] * obj.list[1];
}

function day10_part2(input) {
    return Array.hash(input);
}

base.start("day10.in", day10_part1);
base.start("day10.in", day10_part2);
