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

test(gridToString, [[['1', '2'], ['3', '4']]], '12/34', 'gridToString')
test(stringToGrid, ['12/34'], [['1', '2'], ['3', '4']], 'stringToGrid')
test(rotate90CW, [[['1', '2'], ['3', '4']]], [['3', '1'], ['4', '2']], 'rotate90CW')

function test(func, args, shouldReturn, desc) {
    let result = func.apply(this, args)
    
    if (_.isEqual(result, shouldReturn)) {
        console.log('PASS: ' + desc + ' ' + shouldReturn)
    } else {
        console.log('FAIL: ' + desc + ' returned: ' + result + ' should be: ' + shouldReturn)
    }
}

function solve(rounds, input) {
    let patterns =
        input.split('\n').map(line => {
            let lineParts = line.split(' => ')
            return {
                in: lineParts[0].split('/').map(row => { return row.split('') }),
                out: lineParts[1].split('/').map(row => { return row.split('') })
            }
        })
    let patternsMap = {}

    patterns.forEach(pattern => {
        let patternKey = gridToString(pattern.in)
        if (patternsMap[patternKey] !== undefined) {
            console.log('Duplicate in pattern: ' + patternKey);
        }
        patternsMap[patternKey] = pattern;

        for (let rotate = 0; rotate < 4; rotate++) {
            pattern.in = rotate90CW(pattern.in)
            patternKey = gridToString(pattern.in)
            if (patternsMap[patternKey] === undefined) { // some patterns have rotational symetry
                patternsMap[patternKey] = pattern;
            }
        }
    });

    let start = [
                    ['.', '#', '.'],
                    ['.', '.', '#'],
                    ['#', '#', '#']
                ]
    let grid = start.slice(0)

    for (let round = 0; round < rounds; round++) {
        if (grid.length % 3 == 0) {

        }
    }
}
function rotate90CW(input) {
    let output = []
    let size = input.length
    for(let row = 0; row < size; row++) {
        output[row] = []
    }
    for(let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            output[col][size - row - 1] = input[row][col]
        }
    }
    return output
}
function gridToString(grid) {
    let output = ''
    for(let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            output += grid[row][col]
        }
        output += (row == grid.length - 1) ? '' : '/'
    }
    return output
}
function stringToGrid(input) {
    return input.split('/').map(row => {
        return row.split('')
    })
}


fs = require('fs');
fs.readFile('day21input.txt', 'utf-8', (err, data) =>{
    console.log(solve(5, data));
});