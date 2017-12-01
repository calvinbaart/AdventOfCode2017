function captcha_part1(input) {
    var num = 0;

    for(var i = 0;i<input.length;i++) {
        var c = input.charAt(i);
        var t = input.charAt((i + 1) % input.length);

        if (c === t)
            num += parseInt(c);
    }

    console.log(num);
}

function captcha_part2(input) {
    var num = 0;

    for(var i = 0;i<input.length;i++) {
        var c = input.charAt(i);
        var t = input.charAt((i + (input.length / 2)) % input.length);

        if (c === t)
            num += parseInt(c);
    }

    console.log(num);
}
