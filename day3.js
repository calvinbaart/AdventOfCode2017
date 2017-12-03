const base = require("./base.js");

function day3_part1(input) {
    return Math.spiral(input, true);
}

function day3_part2(input) {
    const num = Number(input);
    let size = Math.spiral(num, true) * 2;

    let tmp = [];
    tmp.multidimensional(size, size, { value: 0, filled: false });

    let startx = size / 2;
    let starty = startx;

    let radius = 1;
    let current = 1;
    let move = 1;

    tmp.at(startx, starty, { value: 1, filled: true });

    let currentx = startx + 1;
    let currenty = starty;

    const moveFunc = [
        () => currentx++,
        () => currenty--,
        () => currentx--,
        () => currenty++
    ];

    while (true) {
        const sum = tmp.sum_around(currentx, currenty, x => x && x.filled ? x.value : 0);

        if (sum >= num) {
            current = sum;
            break;
        }

        tmp.at(currentx, currenty, { filled: true, value: sum });

        moveFunc[move]();

        if ((++current) >= radius) {
            current = 0;
            move = (move + 1) % 4;

            if (move === 0 || move === 2) {
                radius++;
            }
        }
    }

    return current;
}

base.start("day3.in", day3_part1);
base.start("day3.in", day3_part2);