var _ = require('lodash')
//require('sugar')

let testInput =
    's1,x3/4,pe/b'

/*
let tests = [
    { program: "2", connections:  6},    
];
*/

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
/*
if (solve('abcde', testInput) == 'baedc') {
    console.log('OK')
} else {
    console.log('Fail')
}
*/
// baedc

function solve(input, inputMoves) {
    let positions = input.split('')
    let moves = inputMoves.split(',')

    let sRegex = /(.)(\d+)/
    let xRegex = /(.)(\d+)\/(\d+)/
    let pRegex = /(p{1})(.+)\/(.+)/
    let matches;

    console.log(positions.join(''))
    moves.forEach(move => {
        switch (move[0]) {
            case 's':
                matches = sRegex.exec(move)
                spin(parseInt(parseInt(matches[2])))
                break
            case 'x':                
                matches = xRegex.exec(move)
                exchange(parseInt(matches[2]), parseInt(matches[3]))
                break
            case 'p':
                matches = pRegex.exec(move)
                partner(matches[2], matches[3])
                break
        }
        //console.log(positions.join(''))
    });

    return positions.join('')

    function spin(a) {
        //console.log('Spin ' + a);
        for (let index = 0; index < a; index++) {
            positions = [positions.pop()].concat(positions)
        }
    }
    function exchange(a, b) {
        //console.log('Exchange ' + a + ' ' + b)
        let oldA = positions[a];
        positions[a] = positions[b];
        positions[b] = oldA
    }
    function partner(a, b) {
        //console.log('Partner ' + a + ' ' + b)
        let aPos = positions.indexOf(a)
        let bPos = positions.indexOf(b)
        exchange(aPos, bPos)
    }
}


fs = require('fs');
fs.readFile('day16input.txt', 'utf-8', (err, data) =>{
    console.log(solve('abcdefghijklmnop', data));
});
