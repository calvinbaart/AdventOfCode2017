function day2_part1(input) {
    const lines = input.split("\n");
    let sum = 0;

    for (const line of lines) {
        const numbers = line.split("	");

        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;

        for (const num of numbers) {
            const n = parseInt(num);

            min = Math.min(min, n);
            max = Math.max(max, n);
        }

        sum += max - min;
    }

    console.log(sum);
}

function day2_part2(input) {
    const lines = input.split("\n");
    let sum = 0;

    for (const line of lines) {
        const numbers = line.split("	");

        let min = 1;
        let max = 1;

        for (const num of numbers) {
            const n = parseInt(num);

            // This is horrible code, I should feel bad about this
            for (const num2 of numbers) {
                const n2 = parseInt(num2);

                if(n2 === n) {
                    continue;
                }

                const div = n / parseInt(n2);
                if(Math.round(div) === div && div > (max / min)) {
                    max = n;
                    min = n2;

                    break;
                }
            }
        }

        sum += max / min;
    }

    console.log(sum);
}
