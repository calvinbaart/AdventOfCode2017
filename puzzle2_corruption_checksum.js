function day2_part1(input) {
    const lines = input.split("\n");
    let sum = 0;

    for(const line of lines) {
        const numbers = line.split("	");

        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;

        for(const num of numbers) {
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

        for (const num of numbers) {
            const n = parseInt(num);

            const result = numbers
                .map(x => n / parseInt(x))
                .filter(x => Math.round(x) === x)
                .reduce((x, y) => Math.max(x, y));
            
            if (result === 1) {
                continue;
            }

            sum += result;
        }
    }

    console.log(sum);
}
