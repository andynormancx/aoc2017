var _ = require('lodash');
//require('sugar');

//console.log(solve(65, 8921))

function solve(aStart, bStart) {
    const aFactor = 16807
    const bFactor = 48271

    let aValue = aStart
    let bValue = bStart
    let matches = 0

    for (let round = 0; round < 5000000; round++) {
        aValue = generate(aValue, aFactor, 4);
        bValue = generate(bValue, bFactor, 8);

        if ((aValue & 0xffff) == (bValue & 0xffff)) {
            matches++;
        }
    }

    return matches;

    function generate(value, factor, step) {
        let result;
        do {
            result = value = (value * factor) % 2147483647
        } while(result % step != 0)

        return result;
    }
}


let input = [

];

console.log(solve(783, 325));
