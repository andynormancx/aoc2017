var _ = require('lodash');
require('sugar');

let testInput = [
    '0: 3',
    '1: 2',
    '4: 4',
    '6: 4',
];

let tests = [
    { program: "2", connections:  6},    
];


/*
tests.forEach(input => {
    var output = solve(testInput);

    if (output.connections == input.connections) {
        console.log("PASS: '" + input.program + "' " + input.connections);
    } else {
        console.log("FAIL: '" + input.program + "' " + output.connections + " != " + input.connections);        
    }
});
*/
//console.log(solve(65, 8921))
// 1242

function solve(aStart, bStart) {
    const aFactor = 16807
    const bFactor = 48271
    const rounds = 40000000;
    const divisor = 2147483647
    const mask = 0xffff

    let aValue = aStart
    let bValue = bStart
    let matches = 0

    for (let round = 0; round < rounds; round++) {
        aValue = (aValue * aFactor) % divisor
        bValue = (bValue * bFactor) % divisor

        //vis(aValue, bValue)

        //console.log(aValue.toString(2))

        //console.log((aValue & mask).toString(2))
        //console.log((aValue & ~mask).toString(2))

        //if (round % 500000 == 0) {
        //    console.log(round)
        //}

        if ((aValue & mask) == (bValue & mask)) {
            //vis(aValue, bValue)
            //console.log('Match');
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
