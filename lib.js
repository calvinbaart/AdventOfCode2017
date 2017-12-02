class Iterator {
    constructor(array, index) {
        this._array = array;
        this._index = index;
    }

    next(num = 1, wrap = false) {
        let it = null;

        if (wrap) {
            it = new Iterator(this._array, (this._index + num) % this._array.length);
        } else if(this._index + num < this._array.length) {
            it = new Iterator(this._array, this._index + num);
        }

        return it;
    }

    get value() {
        return this._array[this._index];
    }

    get length() {
        return this._array.length;
    }
}

Array.prototype.sum = function () {
    if (this.length === 0) {
        return 0;
    }

    return this.reduce((a, b) => a + b);
}

Array.prototype.min = function () {
    if (this.length === 0) {
        return 0;
    }

    return this.reduce((a, b) => Math.min(a, b));
}

Array.prototype.max = function () {
    if (this.length === 0) {
        return 0;
    }

    return this.reduce((a, b) => Math.max(a, b));
}

Array.prototype.as_numbers = function () {
    return this.map(Number);
}

Array.prototype.divide = function (y) {
    return this.map(x => y / x);
}

Array.prototype.keep_int = function () {
    return this.filter(x => Math.round(x) === x);
}

Array.prototype.keep_above = function (a) {
    return this.filter(x => x > a);
}

Array.prototype.keep_below = function (a) {
    return this.filter(x => x < a);
}

Array.prototype.keep_above_equal = function (a) {
    return this.filter(x => x >= a);
}

Array.prototype.keep_below_equal = function (a) {
    return this.filter(x => x < a);
}

Array.prototype.keep_equal = function (a) {
    return this.filter(x => x === a);
}

Array.prototype.keep_same = function () {
    return this.filter((x, i) => this.filter((y, j) => x === y && i !== j).length > 0);
}

Array.prototype.print = function () {
    console.log(this.join(", "));
    return this;
}

Array.prototype.first = function () {
    if (this.length === 0) {
        return 0;
    }

    return this[0];
}

Array.prototype.last = function () {
    if (this.length === 0) {
        return 0;
    }

    return this[this.length - 1];
}

Array.prototype.filter_it = function (callback) {
    return this.filter((a, b, c) => {
        const iterator = new Iterator(c, b);
        return callback(iterator);
    });
}

String.prototype.split_newline = function () {
    return this.split(/\r?\n/);
}

String.prototype.split_whitespace = function () {
    return this.split(/\s/);
}