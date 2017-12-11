const base = require("../base.js");

class HexCoord {
    constructor(q, r, s) {
        if (typeof s === "undefined") {
            s = -q - r;
        }

        this._v = [q, r, s];
    }

    neighbor(direction) {
        return this.add(HexDirections[direction]);
    }

    add(v) {
        return new HexCoord(this.q + v.q, this.r + v.r, this.s + v.s);
    }

    distance(v) {
        return (Math.abs(this.q, v.q) + Math.abs(this.r, v.r) + Math.abs(this.s, v.s)) / 2.0;
    }

    get q() {
        return this._v[0];
    }

    get r() {
        return this._v[1];
    }

    get s() {
        return this._v[2];
    }
}

const HexDirections = [
    new HexCoord(1, -1, 0), new HexCoord(1, 0, -1), new HexCoord(0, 1, -1),
    new HexCoord(-1, 1, 0), new HexCoord(-1, 0, 1), new HexCoord(0, -1, 1)
];

function day11_part1(input) {
    let position = new HexCoord(0, 0);

    const moves = {
        "n": () => position = position.neighbor(2),
        "ne": () => position = position.neighbor(1),
        "se": () => position = position.neighbor(0),
        "s": () => position = position.neighbor(5),
        "sw": () => position = position.neighbor(4),
        "nw": () => position = position.neighbor(3)
    };

    input.split(",").forEach(x => moves[x]());
    return position.distance(new HexCoord(0, 0));
}

function day11_part2(input) {
    let position = new HexCoord(0, 0);
    let furthest = 0;

    const moves = {
        "n": () => position = position.neighbor(2),
        "ne": () => position = position.neighbor(1),
        "se": () => position = position.neighbor(0),
        "s": () => position = position.neighbor(5),
        "sw": () => position = position.neighbor(4),
        "nw": () => position = position.neighbor(3)
    };

    input.split(",").forEach(x => {
        moves[x]();
        furthest = Math.max(furthest, position.distance(new HexCoord(0, 0)));
    });

    return furthest;
}

base.start("day11.in", day11_part1);
base.start("day11.in", day11_part2);
