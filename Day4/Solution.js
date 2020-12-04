// Challenge 1
 function solve1(arr) {
    const input = arr.split("\n\n")
    let valid = 0;
    
    input.forEach(string => {
        const key = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
        const eachString = string.split(/\s+/)
        let isQualified = true,
            obj = {}

        eachString.forEach(field => {
            obj[field.substring(0, 3)] = field.substring(4)
        })

        key.forEach(e => {
            if (isQualified) {
                Object.keys(obj).includes(e) ? isQualified = true : isQualified = false
            }
        })

        if (isQualified) {
            valid++
        }
    })

    return valid
}

// Challenge 2
 function solve2(arr) {
 	 const input = arr.split("\n\n")
     let valid = 0;

     input.forEach(string => {
         let isQualified = true,
             obj = {}

         string.split(/\s+/).forEach(field => {
             obj[field.substring(0, 3)] = field.substring(4)
         })

         const key = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
         key.forEach(e => {
             if (isQualified) {
                 if (Object.keys(obj).includes(e)) {
                     const value = obj[e],
                         	height = value.substring(value.length - 2, 0),
                         	color = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'],
                         	measurement = value.substring(value.length - 2)

                     switch (e) {
                         case "byr": (Number(value) >= 1920 && Number(value) <= 2002) ? isQualified = true : isQualified = false; break
                         case "iyr": (Number(value) >= 2010 && Number(value) <= 2020) ? isQualified = true : isQualified = false; break
                         case "eyr": (Number(value) >= 2020 && Number(value) <= 2030) ? isQualified = true : isQualified = false; break
                         case "hgt": 
                             if ( measurement === "cm") {
                                 if (Number(height) >= 150 && Number(height) <= 193) isQualified = true
                                 else isQualified = false
                             } else {
                                 if (Number(height) >= 59 && Number(height) <= 76) isQualified = true
                                 else isQualified = false
                             }
                             break;
                         case "hcl": value.substring(0, 1) === "#" ?  value.length - 1 === 6 ? isQualified = true : isQualified = false :  isQualified = false
                             break
                         case "ecl": color.includes(value) ? isQualified = true : isQualified = false; break
                         case "pid": value.length === 9 ? isQualified = true : isQualified = false; break
                     }
                 } else {
                    isQualified = false
                 }
             }
         })

         if (isQualified) {
             valid++
         }
     })

     return valid
 }

solve1(input)
solve2(input)
