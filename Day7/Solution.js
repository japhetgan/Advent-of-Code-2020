// Challenge 1
function search(str) {
	const arr =  str.split("\n")
    let temp = ["shiny gold"]
    for (let i = 0; i < temp.length; i++) {
        let search = temp[i]
        for (let x = 0; x < arr.length; x++) {
            const string = arr[x]
            const stringArr = arr[x].split(" ")
            const bagColor = stringArr.slice(0, stringArr.indexOf("bags")).join(" ")

            if (string.includes(search) && bagColor !== search) {
                if (!(temp.includes(bagColor))) temp.push(bagColor)
            }
        }
    }

    return temp.length - 1
}

search(input);


//Challenge 2
const bagObj ={}
input.split("\n").map(str => {
    const [color, innerColor] = str.split(" bags contain ")
    const innerBags = innerColor.split(", ").map(innerColor => {
        return decodeColor(innerColor)
    }).filter(innerColor => innerColor)
     bagObj[color] = {
        color,
        innerBags
    }
})

function decodeColor(encoded) {
    let count = 0
    let color = ''
    if (encoded.includes("no other bags")) {
        return null
    }
    [, count, color] = /([0-9])\s(([a-z]+\s){2})bag(s?)/.exec(encoded)
    return {
        count: Number(count),
        color: color.trim()
    }
}

function findTotal(color){
	const baseBag = bagObj[color];
	return baseBag.innerBags.reduce((count, innerBag) =>{
		const innerCount = findTotal(innerBag.color)
		return count + innerBag.count + innerBag.count * innerCount
	}, 0)
}

findTotal("shiny gold")
