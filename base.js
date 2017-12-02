require("./lib.js");
const fs = require("fs");

module.exports = {
    start: function (input, callback) {
        const result = callback(fs.readFileSync(input, { encoding: "utf8" }));

        console.log(result);
    },
    startBinary: function (input, callback) {
        const result = callback(fs.readFileSync(input));

        console.log(result);
    }
};