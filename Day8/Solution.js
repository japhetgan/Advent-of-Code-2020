const ruleArr = input.split("\n").map(rule => {
    [action, num] = rule.split(" ")
    return {
        action,
        num: Number(num)
    }
})

//Challenge 1
function solveAcc(arr) {
    let acc = 0
    let index = []

    for (let x = 0; x < arr.length; x++) {
        if (index.includes(x)) {
            return { acc, isInfinite: true }
        }
        index.push(x)
        let num = arr[x].num
        switch (arr[x].action) {
            case "nop": continue
            case "acc": acc += num; continue
            case "jmp": x += num - 1; continue
        }
    }
    return { acc, isInfinite: false }
}
// Challenge 2
function fixCorrupt(arr) {
    for (let x = 0; x < arr.length; x++) {
    	let newAction = ''
        let temp = arr[x]

        switch(temp.action){
        	case "acc" : continue
        	case "jmp" : newAction = "nop"; break
        	case "nop" : newAction = "jmp"; break
        }

        temp.action = newAction
        arr[x] = temp 
        const { acc, isInfinite } = solveAcc(arr)

        if (!isInfinite) {
            return acc
        }

        newAction === "nop"  ? temp.action = "jmp" : temp.action = "nop"
        arr[x] = temp
    }
}


console.log('solveAcc', solveAcc(ruleArr));
console.log('fixCorrupt', findCorrupt(ruleArr));
