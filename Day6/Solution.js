

// Challenge 1
function solve1(input) {
    const arr = input.split("\n\n")
    let count = 0
    arr.forEach(str => {
        const arr = str.split("\n").join("").split("")
        let uniqueArray = []
        for (i = 0; i < arr.length; i++) {
            if (uniqueArray.indexOf(arr[i]) === -1) {
                uniqueArray.push(arr[i]);
            }
        }
        count += uniqueArray.length
    })

    return count
}

solve1(input)

// Challenge 2
function solve2(input) {
    const arr = input.split("\n\n")
    let count = 0
    for (let i = 0; i < arr.length; i++) {
        const input = arr[i].split("\n")
        const alphabet = [...input[0]]

        if (input.length === 1) {
            count += alphabet.length
            continue
        }

        alphabet.forEach(char => {
            let temp = 0
            input.forEach(str => {
                if (str.includes(char)) temp++
            })

            if (temp === input.length) count++
        })
    }

    return count
}

solve2(input)
