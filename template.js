const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());
const day = dirs("./").filter(x => x.startsWith("day")).map(x => Number(x.substr("day".length))).reduce((x, y) => Math.max(x, y)) + 1;

fs.mkdirSync(`./day${day}`);

const template = `const base = require("../base.js");

function day${day}_part1(input) {

}

function day${day}_part2(input) {

}

base.start("day${day}.in", day${day}_part1);
base.start("day${day}.in", day${day}_part2);
`;

fs.writeFileSync(`./day${day}/day${day}.js`, template);
fs.writeFileSync(`./day${day}/day${day}.in`, "");

child_process.exec(`git add ./day${day}/day${day}.js ./day${day}/day${day}.in`);