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
                .filter(x => x !== 1 && Math.round(x) === x);
            
            if (result.length === 0) {
                continue;
            }

            sum += result[0];
        }
    }

    console.log(sum);
}
