const inputArr = input.split("\n").map(num => Number(num))

function findFault(arr) {
    for (let i = 0; i < arr.length; i++) {
        let targetValue = arr[i + 25]
        let notFound = true
        let isValid = false
        for (let x = i; x < i + 24; x++) {
            let value = arr[x]
            for (let y = i; y < i + 25; y++) {
                let pairValue = arr[y]
                if (value === pairValue) continue
                if (value + pairValue === targetValue) isValid = true
            }
        }
        if (isValid) notFound = false
        if (notFound) return targetValue
    }
}

function findContiguous(arr) {
    const targetValue = findFault(arr)
    for (let i = 0; i < arr.length; i++) {
        for (let x = 1; x < arr.length; x++) {
            const numSet = arr.slice(i, x + 1)
            const sum = numSet.reduce((acc, num) => acc + num, 0)
            if(sum === targetValue) return Math.min(...numSet) + Math.max(...numSet)
        }
    }
}
