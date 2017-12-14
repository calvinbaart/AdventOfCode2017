const base = require("../base.js");

function day14_part1(input) {
    return [...Array(128).keys()]
        .map(x => Array.hash(`${input}-${x}`).to_bits())
        .map(x => {
            let num = 0;

            [...x].forEach(j => {
                if (j == 1) {
                    num++;
                }
            });

            return num;
        })
        .sum();
}

class Region {
    search(x, y, data) {
        if (x < 0 || y < 0 || x >= 128 || y >= 128 || data[y][x] === 0) {
            return;
        }

        data[y][x] = 0;

        this.search(x - 1, y, data);
        this.search(x + 1, y, data);
        this.search(x, y - 1, data);
        this.search(x, y + 1, data);
    }
}

function day14_part2(input) {
    const regions = [];

    [...Array(128).keys()]
        .map(x => [...Array.hash(`${input}-${x}`).to_bits()].as_numbers())
        .forEach((z, y, k) => {
            z.forEach((j, x) => {
                if (j == 1) {
                    const region = new Region();
                    region.search(x, y, k);

                    regions.push(region);
                }
            });
        });

    return regions.length;
}

base.start("day14.in", day14_part1);
base.start("day14.in", day14_part2);
