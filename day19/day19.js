const base = require("../base.js");
const fs = require("fs");

class Turtle
{
    constructor(x, y, map) {
        this._x = x;
        this._y = y;
        this._map = map;
        this._direction = 0;
        this._steps = 1;

        this._moves = [
            () => this._y++,
            () => this._y--,
            () => this._x++,
            () => this._x--
        ];
    }

    step() {
        this._moves[this._direction]();

        if (this._x < 0 || this._y < 0 || this._x >= this._map[0].length || this._y >= this._map.length) {
            return false;
        }

        const current = this.get(this._x, this._y);
        if (current.trim().length === 0) {
            return false;
        }

        this._steps++;

        if (current === "+") {
            const data = [
                this.get(this._x, this._y + 1),
                this.get(this._x, this._y - 1),
                this.get(this._x + 1, this._y),
                this.get(this._x - 1, this._y)
            ];

            for (let i = 0; i < data.length; i++) {
                let skip = false;

                switch (this._direction) {
                    case 0:
                        skip = i === 1;
                        break;

                    case 1:
                        skip = i === 0;
                        break;

                    case 2:
                        skip = i === 3;
                        break;

                    case 3:
                        skip = i === 2;
                        break;
                }

                if (skip) {
                    continue;
                }

                if (data[i].trim().length > 0) {
                    this._direction = i;
                    break;
                }
            }
        }

        return current;
    }

    get(x, y) {
        if (x < 0 || y < 0 || x >= this._map[0].length || y >= this._map.length) {
            return " ";
        }

        return this._map[y][x];
    }
}

function get_turtle(input) {
    let map = input.split_newline().map(x => x.split(""));
    let x = 0;
    let y = 0;

    for (let i = 0; i < map[0].length; i++) {
        if (map[0][i] === "|") {
            x = i;
            break;
        }
    }

    return new Turtle(x, y, map);
}

function day19_part1(input) {
    let turtle = get_turtle(input);

    let letters = "";
    while (true) {
        const current = turtle.step();
        if (current === false) {
            break;
        }

        if (/[a-zA-Z]/.exec(current) !== null) {
            letters += current;
        }
    }

    return letters;
}

function day19_part2(input) {
    let turtle = get_turtle(input);

    while (turtle.step()) {
        // empty
    }

    return turtle._steps;
}

base.start("day19.in", day19_part1);
base.start("day19.in", day19_part2);
