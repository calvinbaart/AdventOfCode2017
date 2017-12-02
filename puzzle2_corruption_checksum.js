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

// Alternative version
function day2_part1(input) {
    let sum = 0;

    input.split("\n")
         .forEach(x => {
             let min = Number.MAX_VALUE;
             let max = Number.MIN_VALUE;

             x.split("\t")
              .map(Number)
              .forEach(x => { min = Math.min(min, x), max = Math.max(max, x) });
            
             sum += max - min;
         });

    console.log(sum);
}

function day2_part2(input) {
    let sum = input
        .split("\n")
        .map(x => x
            .split("\t")
            .map(Number)
            .map((y, _, a) => a
                .map(x => y / Number(x))
                .filter(x => Math.round(x) === x)
                .reduce((x, y) => Math.max(x, y))
            )
            .filter(x => x !== 1)
            .pop()
        )
        .reduce((a, b) => a + b);
    
    console.log(sum);
}
