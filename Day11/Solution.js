const inputArr = input.split('\n')

function predict(arr) {
    let preArrange = arr.map(str => str.replace(/L/g, "#")).map(set => [...set])
    let proceed = true
    let seatCount = 0

    while (proceed) {
        let seatCount = 0

        //Change Analyzer to switch between Puzzle 1 and 2 Outputs
        const info = analyze1(preArrange)
        proceed = info.change
        info.changeMap.forEach(change => {
            // changeDetail = [i, x, replace]
            preArrange[change[0]][change[1]] = change[2]
        })
        info.toOccupyMap.forEach(change => {
            // changeDetail = [i, x, replace]
            preArrange[change[0]][change[1]] = change[2]
        })
    }
    preArrange.forEach(seatSet => seatSet.forEach(seat => {
        if (seat === "#") seatCount++
    }))

    return seatCount
}

console.log(predict(inputArr));

// Puzzle 1
function analyze1(grid) {
    const limit = grid.length
    let changeMap = []
    let toOccupyMap = []
    let change = true
    for (let i = 0; i < limit; i++) {
        for (let x = 0; x < grid[i].length; x++) {
            const currSeat = grid[i][x]
            const replaceSeat = currSeat === "L" ? "#" : "L"
            let occupiedCount = 0
            if (currSeat === ".") continue
            if (i > 0) {
                //up, upL, upR
                if (grid[i - 1][x] === "#") occupiedCount++
                if (grid[i - 1][x - 1] === "#") occupiedCount++
                if (grid[i - 1][x + 1] === "#") occupiedCount++
            }
            if (i < limit - 1) {
                //Low, lowL, lowR
                if (grid[i + 1][x] === "#") occupiedCount++
                if (grid[i + 1][x - 1] === "#") occupiedCount++
                if (grid[i + 1][x + 1] === "#") occupiedCount++
            }
            // right, left
            if (grid[i][x + 1] === "#") occupiedCount++
            if (grid[i][x - 1] === "#") occupiedCount++

            if (occupiedCount >= 4 && currSeat === "#") changeMap.push([i, x, replaceSeat])
            if (occupiedCount === 0 && currSeat === "L") toOccupyMap.push([i, x, replaceSeat])
        }
    }
    if (toOccupyMap.length === 0 && changeMap.length === 0) {
        change = false
    }
    return {
        changeMap,
        toOccupyMap,
        change
    }
}

// Puzzle 2
function analyze2(grid) {
    const limit = grid.length
    let changeMap = []
    let toOccupyMap = []
    let change = true
    for (let i = 0; i < limit; i++) {
        for (let x = 0; x < grid[i].length; x++) {
            const currSeat = grid[i][x]
            const replaceSeat = currSeat === "L" ? "#" : "L"
            let occupiedCount = 0
            if (currSeat === ".") continue
            if (i > 0) {
                //up, upL, upR
                grid[i - 1][x] === "#" ? occupiedCount++ : search(i, x, grid, "up") ? occupiedCount++ : occupiedCount = occupiedCount
                grid[i - 1][x - 1] === "#" ? occupiedCount++ : search(i, x, grid, "upL") ? occupiedCount++ : occupiedCount = occupiedCount
                grid[i - 1][x + 1] === "#" ? occupiedCount++ : search(i, x, grid, "upR") ? occupiedCount++ : occupiedCount = occupiedCount
            }
            if (i < limit - 1) {
                //Low, lowL, lowR
                grid[i + 1][x] === "#" ? occupiedCount++ : search(i, x, grid, "low") ? occupiedCount++ : occupiedCount = occupiedCount
                grid[i + 1][x - 1] === "#" ? occupiedCount++ : search(i, x, grid, "lowL") ? occupiedCount++ : occupiedCount = occupiedCount
                grid[i + 1][x + 1] === "#" ? occupiedCount++ : search(i, x, grid, "lowR") ? occupiedCount++ : occupiedCount = occupiedCount
            }
            // right, left
            grid[i][x + 1] === "#" ? occupiedCount++ : search(i, x, grid, "right") ? occupiedCount++ : occupiedCount = occupiedCount
            grid[i][x - 1] === "#" ? occupiedCount++ : search(i, x, grid, "left") ? occupiedCount++ : occupiedCount = occupiedCount

            if (occupiedCount >= 5 && currSeat === "#") changeMap.push([i, x, replaceSeat])
            if (occupiedCount === 0 && currSeat === "L") toOccupyMap.push([i, x, replaceSeat])
        }
    }
    if (toOccupyMap.length === 0 && changeMap.length === 0) change = false
    return {
        changeMap,
        toOccupyMap,
        change
    }
}

function search(i, x, grid, direction) {
    let inc = 1
    if (direction === "up") {
        while (grid[i - inc]) {
            switch(grid[i - inc][x]){
                case "." : inc++; continue
                case "L" : return false; break
                case "#" : return true; break
            }
            inc++
        }
        return false
    }

    if (direction === "upL") {
        while (grid[i - inc]) {
            switch(grid[i - inc][x - inc]){
                case "." : inc++; continue
                case "L" : return false; break
                case "#" : return true; break
            }
            inc++
        }
        return false
    }

    if (direction === "upR") {
        while (grid[i - inc]) {
            switch(grid[i - inc][x + inc]){
                case "." : inc++; continue
                case "L" : return false; break
                case "#" : return true; break
            }
            inc++
        }
        return false
    }

    if (direction === "low") {
        while (grid[i + inc]) {
            switch(grid[i + inc][x]){
                case "." : inc++; continue
                case "L" : return false; break
                case "#" : return true; break
            }
            inc++
        }
        return false
    }

    if (direction === "lowL") {
        while (grid[i + inc]) {
            switch(grid[i + inc][x - inc]){
                case "." : inc++; continue
                case "L" : return false; break
                case "#" : return true; break
            }
            inc++
        }
        return false
    }

    if (direction === "lowR") {
        while (grid[i + inc]) {
            switch(grid[i + inc][x + inc]){
                case "." : inc++; continue
                case "L" : return false; break
                case "#" : return true; break
            }
            inc++
        }
        return false
    }

    if (direction === "right") {
        while (grid[i][x + inc]) {
             switch(grid[i][x + inc]){
                case "." : inc++; continue
                case "L" : return false; break
                case "#" : return true; break
            }
            inc++
        }
        return false
    }

    if (direction === "left") {
        while (grid[i][x - inc]) {
             switch(grid[i][x - inc]){
                case "." : inc++; continue
                case "L" : return false; break
                case "#" : return true; break
            }
            inc++
        }
        return false
    }
}
