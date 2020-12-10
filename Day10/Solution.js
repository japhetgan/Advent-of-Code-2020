const inputArr = input.split("\n").map(num => Number(num)).sort((a, b) => a - b)
inputArr.push(inputArr[inputArr.length - 1] + 3);
inputArr.unshift(0);

function jolt(arr) {
    let previous = 0
    let oneDiff = 0
    let threeDiff = 0

    for (let i = 0; i < arr.length; i++) {
        let currentValue = arr[i]
        if (currentValue - previous === 1) {
            oneDiff++
        }
        if (currentValue - previous === 3) {
            threeDiff++
        }
        previous = currentValue

    }
    return oneDiff * threeDiff
}


function arrange(input) {
    console.log(input);
    const diffList = {};
    for (let i = 0; i < input.length; i++) {
        const value = input[i];
        for (let j = 1; j < 4; j++) {
            const nextValue = input[i + j];
            if (nextValue - value <= 3) {
                diffList[nextValue] = diffList[nextValue] || [];
                diffList[nextValue].push(value);
            }
        }
    }
    const countMap = {};
    for (let i = 1; i < input.length; i++) {
        const n = input[i];
        const prevs = diffList[n];

        for (let x = 0; x < prevs.length; x++) {
            const prev = prevs[x];
            if (prev === 0) countMap[n] =  1;
            else countMap[n] = (countMap[n] || 0) + countMap[prev];
        }
    }
    return countMap[input[input.length - 1]]
}
