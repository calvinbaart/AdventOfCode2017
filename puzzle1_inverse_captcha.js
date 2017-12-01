function captcha_part1(input) {
    let num = 0;

    for (let i = 0; i < input.length; i++) {
        const c = input.charAt(i);
        const t = input.charAt((i + 1) % input.length);

        if (c === t) {
            num += parseInt(c);
        }
    }

    console.log(num);
}

function captcha_part2(input) {
    let num = 0;

    for (let i = 0; i < input.length; i++) {
        const c = input.charAt(i);
        const t = input.charAt((i + (input.length / 2)) % input.length);

        if (c === t) {
            num += parseInt(c);
        }
    }

    console.log(num);
}
