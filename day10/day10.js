const base = require("../base.js");

function create_list(length) {
    return [...Array(length).keys()];
}

function execute(lengths, list, position, skipSize) {
    lengths.forEach(x => {
        list = list.reverse_slice(position, x);

        const skip = skipSize + x;
        position = (position + skip) % list.length;

        skipSize++;
    });

    return {
        list,
        position,
        skipSize
    };
}

function setup() {
    return {
        list: [...Array(256).keys()],
        position: 0,
        skipSize: 0
    };
}

function day10_part1(input) {
    let obj = setup();
    obj = execute(input.split(",").as_numbers(), obj.list, obj.position, obj.skipSize);

    return obj.list[0] * obj.list[1];
}

function day10_part2(input) {
    let obj = setup();
    let data = [...[...input].map(x => x.charCodeAt(0)), 17, 31, 73, 47, 23];

    for (let i = 0; i < 64; i++) {
        obj = execute(data, obj.list, obj.position, obj.skipSize);
    }

    return [...Array(16).keys()]
        .map(x => obj.list.slice(x * 16, x * 16 + 16))
        .map(x => x.reduce((a, b) => a ^ b))
        .map(x => x < 0xF ? "0" + x.toString(16) : x.toString(16))
        .join("");
}

base.start("day10.in", day10_part1);
base.start("day10.in", day10_part2);
