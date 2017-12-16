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
    console.log('Fail (not baedc)')
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

    let positionsStart = positions.slice(0);
    let positionsMoves = positions.slice(0);
    let partnerMoves = positions.slice(0);

    let partnerMoveMap = {};
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
                partner(matches[2], matches[3]);
                //partnerMoveMap[matches[2]] = matches[3]
                break
        }
        //console.log(positions.join(''))
    });
    
    let positionsMoveMap = {};
    positionsStart.forEach((startPosition, index) => {
        positionsMoveMap[startPosition] = positionsMoves[index]
        partnerMoveMap[startPosition] = partnerMoves[index];
    });

    for (let dance = 0; dance < 1000000000; dance++) {
        if (dance % 1000000 == 0) console.log(dance + ' ' + positions.join(''))
        let newPositions = [];
        positions.forEach(position => {
            newPositions.push(positionsMoveMap[position])
        });

        //console.log(newPositions.join(''));

        let newPartnerPositions = [];
        _.forEach(newPositions, from => {
            newPartnerPositions.push(partnerMoveMap[from]);
        });
        positions = newPartnerPositions.slice(0)
    }
    console.log(positions.join(''));
    return positions.join('')

    function spin(a) {
        //console.log('Spin ' + a);
        for (let index = 0; index < a; index++) {
            positionsMoves = [positionsMoves.pop()].concat(positionsMoves)
        }
    }
    function exchange(a, b) {
        //console.log('Exchange ' + a + ' ' + b)
        let oldA = positionsMoves[a];
        positionsMoves[a] = positionsMoves[b];
        positionsMoves[b] = oldA
    }
    function partner(a, b) {
        //console.log('Partner ' + a + ' ' + b)
        let aPos = partnerMoves.indexOf(a)
        let bPos = partnerMoves.indexOf(b)
        let oldA = partnerMoves[aPos];
        partnerMoves[aPos] = partnerMoves[bPos];
        partnerMoves[bPos] = oldA
    }
    function swap(a, b, inputArray) {
        //console.log('Partner ' + a + ' ' + b)
        let aPos = inputArray.indexOf(a)
        let bPos = inputArray.indexOf(b)
        let oldA = inputArray[aPos];
        inputArray[aPos] = inputArray[bPos];
        inputArray[bPos] = oldA
    }

}


fs = require('fs');
fs.readFile('day16input.txt', 'utf-8', (err, data) =>{
    console.log(solve('abcdefghijklmnop', data));
    console.log('glnacbhedpfjkiom (should be)');
});
