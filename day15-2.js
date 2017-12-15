var _ = require('lodash');
//require('sugar');

//console.log(solve(65, 8921))

function solve(aStart, bStart) {
    const aFactor = 16807
    const bFactor = 48271
    const rounds = 5000000;
    const divisor = 2147483647
    const mask = 0xffff

    let aValue = aStart
    let bValue = bStart
    let matches = 0
    let aValues = []
    let bValues = []

    while(aValues.length < rounds || bValues.length < rounds) {
        aValue = (aValue * aFactor) % divisor
        bValue = (bValue * bFactor) % divisor

        if (aValue % 4 == 0) aValues.push(aValue)
        if (bValue % 8 == 0) bValues.push(bValue)
    }

    for (let round = 0; round < rounds; round++) {
        aValue = aValues[round];
        bValue = bValues[round];

        if ((aValue & mask) == (bValue & mask)) {
            matches++;
        }
    }

    return matches;

    function vis(a, b) {

        console.log(_.padStart(a.toString(2), 16, 0).slice(-16))
        console.log(_.padStart(b.toString(2), 16, 0).slice(-16))
        console.log()
    }
}


let input = [

];

console.log(solve(783, 325));
