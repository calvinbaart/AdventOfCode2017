const base = require("../base.js");

function get_position(x, y) {
    const z = x / (y - 1);
    const w = Math.floor(z);
    return Math.round(w % 2 === 0 ? (z - w) * (y - 1) : (y - 1) - ((z - w) * (y - 1)));
}

function get_data(input) {
    const lines = {};
    const data = input.split_newline().map(x => x.split(":").as_numbers());

    data.forEach(x => lines[x[0]] = x[1]);

    return lines;
}

function process(lines, delay) {
    delay = delay || 0;

    const highest = Number(Object.keys(lines).sort().pop());
    let complexity = 0;
    let caught = 0;

    for (let i = 0; i < highest + 1; i++) {
        if (lines[i] !== undefined && get_position(delay + i, lines[i]) === 0) {
            complexity += i * lines[i];
            caught++;
        }
    }

    return { caught, complexity };
}

function day13_part1(input) {
    return process(get_data(input), 0).complexity;
}

function day13_part2(input) {
    const lines = get_data(input);

    let i = 1000000;
    while (true) {
        const tmp = process(lines, i++);

        if (tmp.caught === 0) {
            return i - 1;
        }
    }
}

base.start("day13.in", day13_part1);
base.start("day13.in", day13_part2);
