const base = require("../base.js");

function process(input) {
    const stack = [];
    let depth = 0;
    let score = 0;
    let num = 0;
    let canceled = 0;
    let skip = false;

    for (const c of input) {
        if (skip) {
            skip = false;
            continue;
        }

        const current = stack.peek();

        if (current === "<" && c === "!") {
            skip = true;
            continue;
        }

        if (current === "<" && c !== ">") {
            num++;
            continue;
        }

        switch (c) {
            case "{":
                stack.push(c);
                depth++;
                break;

            case "}":
                score += depth;
                stack.pop();
                depth--;
                break;

            case "<":
                stack.push(c);
                num = 0;
                break;

            case ">":
                stack.pop();
                canceled += num;
                break;
        }
    }

    return [score, canceled];
}

function day9_part1(input) {
    return process(input)[0];
}

function day9_part2(input) {
    return process(input)[1];
}

base.start("day9.in", day9_part1);
base.start("day9.in", day9_part2);
