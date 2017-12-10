const base = require("../base.js");

function create_list(length) {
    return Array.apply(null, Array(length)).map((_, i) => i);
}

function execute(lengths, list, position, skipSize) {
    lengths.forEach(x => {
        list = list.reverse_slice(position, x);

        const skip = skipSize + x;
        position = (position + skip) % list.length;

        skipSize++;
    });

    return [list, position, skipSize];
}

function day10_part1(input) {
    const list = execute(input.split(",").as_numbers(), create_list(256), 0, 0)[0];

    return list[0] * list[1];
}

function day10_part2(input) {
    let list = create_list(256);
    let position = 0;
    let skipSize = 0;
    let data = [...input.split("").map(x => x.charCodeAt(0)), 17, 31, 73, 47, 23];

    for (let i = 0; i < 64; i++) {
        const tmp = execute(data, list, position, skipSize);

        list = tmp[0];
        position = tmp[1];
        skipSize = tmp[2];
    }    

    let ret = [];
    for (let i = 0; i < 16; i++) {
        ret.push(list.slice(i * 16, i * 16 + 16).reduce((a, b) => a ^ b));
    }

    return ret.map(x => x < 10 ? "0" + x.toString(16) : x.toString(16)).join("");
}

base.start("day10.in", day10_part1);
base.start("day10.in", day10_part2);
