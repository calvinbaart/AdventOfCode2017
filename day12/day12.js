const base = require("../base.js");

function process_input(input) {
    const ret = {};

    input.split_newline()
        .map(x => x.split("<->"))
        .forEach(x => ret[Number(x[0])] = x[1].split(",").as_numbers());
    
    return ret;
}

function check_path(key, data, target) {
    let closed = [];
    let open = [key];

    while (open.length > 0) {
        const current = open.pop();
        closed.push(current);

        if (current === target) {
            return true;
        }

        for (let link of data[current]) {
            if (open.indexOf(link) !== -1 || closed.indexOf(link) !== -1) {
                continue;
            }

            open.push(link);
        }
    }

    return false;
}

function day12_part1(input) {
    const data = process_input(input);
    let programs = 0;

    for (const key in data) {
        if (check_path(key, data, 0)) {
            programs++;
        }
    }

    return programs;
}

function day12_part2(input) {
    const data = process_input(input);
    const groups = [];

    for (const key in data) {
        let found = false;

        for (const group of groups) {
            if (check_path(key, data, Number(group))) {
                found = true;
                break;
            }
        }

        if (found) {
            continue;
        }

        groups.push(key);
    }

    return groups.length;
}

base.start("day12.in", day12_part1);
base.start("day12.in", day12_part2);
