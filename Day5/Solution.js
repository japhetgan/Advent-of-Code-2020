function solve(str) {
    const input = str.split("\n")
    let largestId = 0
    let idArr = []

    for (let x = 0; x < input.length; x++) {
        let value = input[x],
            row = [...(value.substring(0, 7))],
            column = [...(value.substring(7, 10))],
            arr = [0, 128, 64, 0, 7, 4]

            row.forEach(row => {
                if (row === "F") arr[1] = (arr[0] + arr[2]) - 1;
                if (row === "B") arr[0] = (arr[1] - arr[2]) + 1;
                arr[2] /= 2
            })

        column.forEach(column => {
            if (column === "L") arr[4] = (arr[3] + arr[5]) - 1;
            if (column === "R") arr[3] = (arr[4] - arr[5]) + 1;
            arr[5] /= 2
        })

        temp = (row[0] === "F" ? arr[0] : arr[0] - 1) * 8 + arr[3]
        idArr.push(temp)
        if (temp > largestId) largestId = temp
    }

    const id = idArr.sort().filter((eachId, index, arr) => eachId + 2 === arr[index + 1])

    console.log(largestId);
    console.log(id[0] + 1);

}

solve(input);
