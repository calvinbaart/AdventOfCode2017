const base = require("../base.js");

class CPU {
    constructor(id, input) {
        this._registers = {
            PC: 0,
            p: id
        };

        this._other = null;
        this._queue = [];
        this._waiting = false;
        this._numSend = 0;

        const get = x => {
            if (Number.isInteger(x)) {
                return x;
            }

            if (this._registers[x] === undefined) {
                this._registers[x] = 0;
                return 0;
            }

            return this._registers[x];
        };

        const set = (x, y) => this._registers[x] = y;
        const send = (x) => {
            this._other._queue.push(x);
            this._numSend++;
        };

        const receive = (x) => {
            if (this._queue.length > 0) {
                this._waiting = false;
                return set(x, this._queue.shift());
            }

            this._waiting = true;
            this._registers.PC--;
        };

        const instructions = {
            snd: (x) => send(get(x)),
            set: (x, y) => set(x, get(y)),
            add: (x, y) => set(x, get(x) + get(y)),
            mul: (x, y) => set(x, get(x) * get(y)),
            mod: (x, y) => set(x, get(x) % get(y)),
            rcv: (x) => set(x, receive()),
            jgz: (x, y) => get(x) > 0 ? this._registers.PC += get(y) - 1 : 0
        };

        this._moves = input
            .split_newline()
            .map(x => x.split(" "))
            .map(x => { return { move: x[0], args: x.slice(1).map(y => Number.isNaN(Number(y)) ? y : Number(y)) }; })
            .map(x => instructions[x.move].bind(this, ...x.args));
    }

    setOther(cpu) {
        this._other = cpu;
    }

    step() {
        const PC = this._registers.PC;
        this._registers.PC++;
        this._moves[PC]();
    }
}

function day18_part1(input) {
    const registers = {
        PC: 0
    };
    let last = 0;
    let stop = false;

    const get = x => {
        if (Number.isInteger(x)) {
            return x;
        }

        if (registers[x] === undefined) {
            registers[x] = 0;
            return 0;
        }

        return registers[x];
    };

    const set = (x, y) => registers[x] = y;
    const recover = (x) => stop = true;

    const instructions = {
        snd: (x) => last = get(x),
        set: (x, y) => set(x, get(y)),
        add: (x, y) => set(x, get(x) + get(y)),
        mul: (x, y) => set(x, get(x) * get(y)),
        mod: (x, y) => set(x, get(x) % get(y)),
        rcv: (x) => get(x) !== 0 ? recover(last) : 0,
        jgz: (x, y) => get(x) > 0 ? registers.PC += get(y) - 1 : 0
    };

    const moves = input
        .split_newline()
        .map(x => x.split(" "))
        .map(x => { return { move: x[0], args: x.slice(1).map(y => Number.isNaN(Number(y)) ? y : Number(y)) }; })
        .map(x => instructions[x.move].bind(this, ...x.args));
    
    while (!stop && registers.PC < moves.length) {
        const PC = registers.PC;
        registers.PC++;
        moves[PC]();
    }

    return last;
}

function day18_part2(input) {
    const cpu1 = new CPU(0, input);
    const cpu2 = new CPU(1, input);

    cpu1.setOther(cpu2);
    cpu2.setOther(cpu1);
    
    while (true) {
        if (cpu1._waiting && cpu2._waiting) {
            break;
        }

        cpu1.step();
        cpu2.step();
    }

    return cpu2._numSend;
}

base.start("day18.in", day18_part1);
base.start("day18.in", day18_part2);
