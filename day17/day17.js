const base = require("../base.js");

function day17_part1(input) {
    let steps = Number(input);
    let data = [0];
    let current = 0;

    for (let i = 1; i < 2018; i++) {
        let index = (current + steps) % data.length;
        data.splice(index + 1, 0, i);

        current = index + 1;
    }

    return data[(data.indexOf(2017) + 1) % data.length];
}

function day17_part2(input) {
    let steps = Number(input);
    let current = 0;
    let length = 1;
    let value = 0;

    for (let i = 1; i <= 50000000; i++) {
        let index = (current + steps) % length;

        if (index === 0) {
            value = i;
        }
        
        length++;
        current = index + 1;
    }

    return value;
}

base.start("day17.in", day17_part1);
base.start("day17.in", day17_part2);
