const base = require("../base.js");

function day6_part1(input) {
    const data = input.split_whitespace().as_numbers();
    const hashes = [];
    let cycles = 0;

    while (true) {
        const hash = data.join(",");

        if (hashes.indexOf(hash) !== -1) {
            break;
        }

        let index = data.indexOf(Math.max(...data));
        let num = data[index];

        data[index] = 0;

        for (let i = num; i > 0; i--) {
            index = (index + 1) % data.length;

            data[index]++;
        }

        hashes.push(hash);
        cycles++;
    }

    return cycles;
}

function day6_part2(input) {
    const data = input.split_whitespace().as_numbers();
    const hashes = {};
    let cycles = 0;

    while (true) {
        const hash = data.join(",");

        if (typeof hashes[hash] !== "undefined") {
            cycles = cycles - hashes[hash];
            break;
        }

        let index = data.indexOf(Math.max(...data));
        let num = data[index];

        data[index] = 0;

        for (let i = num; i > 0; i--) {
            index = (index + 1) % data.length;

            data[index]++;
        }

        hashes[hash] = cycles;
        cycles++;
    }

    return cycles;
}

base.start("day6.in", day6_part1);
base.start("day6.in", day6_part2);
