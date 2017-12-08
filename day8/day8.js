const base = require("../base.js");

class CPU {
    constructor() {
        this._pc = 0;
        this._registers = {};
        this._instructions = [];
        this._conditions = [];
    }

    load(data) {
        for (const line of data) {
            const instruction = line.split_whitespace();

            this._instructions.push({
                instruction: instruction[1].trim(),
                args: [instruction[0].trim(), instruction[2].trim()]
            });

            this._conditions.push({
                operand: instruction[5].trim(),
                args: [instruction[4].trim(), instruction[6].trim()]
            });
        }
    }

    run() {
        while (this._pc < this._instructions.length) {
            this.step();
        }
    }

    step() {
        const index = this._pc++;
        const instruction = this._instructions[index];
        const condition = this._conditions[index];

        if (!this.validateCondition(condition)) {
            return;
        }

        switch (instruction.instruction) {
            case "inc":
                this.setRegister(instruction.args[0], this.getRegister(instruction.args[0]) + Number(instruction.args[1]));
                break;

            case "dec":
                this.setRegister(instruction.args[0], this.getRegister(instruction.args[0]) - Number(instruction.args[1]));
                break;
        }
    }

    validateCondition(condition) {
        switch (condition.operand) {
            case "<":
                return this.getRegister(condition.args[0]) < Number(condition.args[1]);
            
            case ">":
                return this.getRegister(condition.args[0]) > Number(condition.args[1]);
            
            case "==":
                return this.getRegister(condition.args[0]) == Number(condition.args[1]);
            
            case ">=":
                return this.getRegister(condition.args[0]) >= Number(condition.args[1]);
            
            case "<=":
                return this.getRegister(condition.args[0]) <= Number(condition.args[1]);
            
            case "!=":
                return this.getRegister(condition.args[0]) != Number(condition.args[1]);
        }

        return false;
    }

    getRegister(name) {
        name = name.trim();

        if (this._registers[name] === undefined) {
            this._registers[name] = {
                high: 0,
                low: 0,
                current: 0
            };
        }

        return this._registers[name].current;
    }

    setRegister(name, val) {
        name = name.trim();

        if (this._registers[name] === undefined) {
            this._registers[name] = {
                high: val,
                low: val,
                current: val
            };
        } else {
            this._registers[name].current = val;
            this._registers[name].high = Math.max(this._registers[name].high, val);
            this._registers[name].low = Math.min(this._registers[name].low, val);
        }
    }
}

function day8_part1(input) {
    const cpu = new CPU();
    cpu.load(input.split_newline());
    cpu.run();

    return Object.values(cpu._registers).map(x => x.current).max();
}

function day8_part2(input) {
    const cpu = new CPU();
    cpu.load(input.split_newline());
    cpu.run();

    return Object.values(cpu._registers).map(x => x.high).max();
}

base.start("day8.in", day8_part1);
base.start("day8.in", day8_part2);
