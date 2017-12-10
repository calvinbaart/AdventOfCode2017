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
    return this.filter(x => x <= a);
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

Array.prototype.multidimensional = function (width, height, fill) {
    fill = typeof fill === "undefined" ? true : fill;
    width = width || 1;
    height = height || 1;

    this._multidimensional = true;
    this._width = width;
    this._height = height;

    if (fill) {
        this.splice(0, this.length);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (typeof fill === "object") {
                    this.push(fill);
                } else {
                    this.push(0);
                }
            }
        }
    }
}

Array.prototype.at = function (x, y, setValue) {
    if (typeof this._multidimensional === "undefined" || !this._multidimensional) {
        throw "not a multidimensional array";
    }

    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
        return null;
    }
    
    if (typeof setValue !== "undefined") {
        this[(y * this._width) + x] = setValue;
    }

    return this[(y * this._width) + x];
}

Array.prototype.sum_around = function (x, y, callback) {
    if (typeof callback === "undefined") {
        callback = x => x;
    }

    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            sum += callback(this.at(x + i, y + j));
        }
    }

    return sum;
}

Array.prototype.has_duplicates = function () {
    const tmp = {};

    for (let i = 0; i < this.length; i++) {
        const value = this[i];

        if (value in tmp) {
            return true;
        }

        tmp[value] = true;
    }

    return false;
};

Array.prototype.most_common_value = function () {
    return this.sort((a, b) => this.filter(v => v === a).length - this.filter(v => v === b).length).pop();
};

Array.prototype.peek = function () {
    if (this.length === 0) {
        return null;
    }
    
    return this[this.length - 1];
};

Array.prototype.rotate_left = function (n) {
    n = n || 1;

    for (let i = 0; i < n; i++) {
        this.push(this.shift());
    }

    return this;
};

Array.prototype.rotate_right = function (n) {
    n = n || 1;

    for (let i = 0; i < n; i++) {
        this.unshift(this.pop());
    }

    return this;
};

Array.prototype.reverse_slice = function (position, length) {
    if (position + length >= this.length) {
        const outside = (position + length) - this.length;
        const slice = this.slice(position, this.length).concat(this.slice(0, outside)).reverse();
        const delta = position - ((position + length) - this.length);
        const p1 = slice.slice(slice.length - outside, slice.length);
        const p2 = this.slice(outside, outside + delta);
        const p3 = slice.slice(0, slice.length - outside);

        return p1.concat(p2, p3);
    } else {
        const part1 = this.slice(0, position);
        const part2 = this.slice(position, position + length).reverse();
        const part3 = this.slice(position + length, this.length);

        return part1.concat(part2, part3);
    }
}

String.prototype.split_newline = function () {
    return this.split(/\r?\n/);
}

String.prototype.split_whitespace = function () {
    return this.split(/\s/);
}

Math.spiral = function (n, sum) {
    if (typeof n === "string") {
        n = Number(n);
    }
    
    let ret = x => x;

    if (typeof sum !== "undefined" && sum) {
        ret = x => Math.abs(x[0]) + Math.abs(x[1]);
    }

    let k = Math.ceil((Math.sqrt(n) - 1) / 2);
    let t = 2 * k + 1;
    let m = Math.pow(t, 2);
    t--;

    if (n >= m - t) {
        return ret([k - (m - n), -k]);
    }

    m -= t;

    if (n >= m - t) {
        return ret([-k, -k + (m - n)]);
    }

    m -= t;

    if (n >= m - t) {
        return ret([-k + (m - n), k]);
    }

    return ret([k, k - (m - n - t)]);
};

Math.delta = function (a, b, sum) {
    let ret = x => x;

    if (typeof sum !== "undefined" && sum) {
        ret = x => Math.abs(x[0]) + Math.abs(x[1]);
    }

    let delta = [b[0] - a[0], b[1] - a[1]];

    return ret(delta);
};