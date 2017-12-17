const base = require("../base.js");

function day16_part1(input) {

    let data = "abcdefghijklmnop".split("");

    const actions = {
        s: (x) => [...data.slice(-x), ...data.slice(0, data.length - x)],
        x: (x, y) => data.swap(x, y),
        p: (x, y) => data.swap(data.indexOf(x), data.indexOf(y))
    };

    const moves = input.split(",")
        .map(x => x.trim().toLowerCase())
        .map(x => actions[x[0]].bind(null, ...x.substr(1).split("/").map(y => Number.isNaN(Number(y)) ? y : Number(y))));
    
    moves.forEach(x => data = x());

    return data.join("");
}

function day16_part2(input) {
    let original = "abcdefghijklmnop".split("");
    let data = "abcdefghijklmnop".split("");

    const actions = {
        s: (x) => [...data.slice(-x), ...data.slice(0, data.length - x)],
        x: (x, y) => data.swap(x, y),
        p: (x, y) => data.swap(data.indexOf(x), data.indexOf(y))
    };

    const moves = input.split(",")
        .map(x => x.trim().toLowerCase())
        .map(x => actions[x[0]].bind(null, ...x.substr(1).split("/").map(y => Number.isNaN(Number(y)) ? y : Number(y))));

    let loop = 0;
    let found = [];

    while (true) {
        let key = data.join("");

        if (found.indexOf(key) !== -1) {
            break;
        }

        moves.forEach(x => data = x());
        found.push(key);
    }

    return found[1000000000 % found.length];
}

base.start("day16.in", day16_part1);
base.start("day16.in", day16_part2);
