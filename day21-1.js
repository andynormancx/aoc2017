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
test(flipVert, [[['1', '2'], ['3', '4']]], [['3', '4'], ['1', '2']], 'flipVert')
test(flipHorz, [[['1', '2'], ['3', '4']]], [['2', '1'], ['4', '3']], 'flipHorz')

let unchunked = [
    ['1', '2', '3', '4'],
    ['5', '6', '7', '8'],
    ['9', '10', '11', '12'],
    ['13', '14', '15', '16']
]
let chunked = [
    [
        [
            '1', '2'
        ],
        [
            '5', '6'
        ]
    ],
    [
        [
            '3', '4'
        ],
        [
            '7', '8'
        ]
    ],
    [
        [
            '9', '10'
        ],
        [
            '13', '14'
        ]

    ],
    [
        [
            '11', '12'
        ],
        [
            '15', '16'
        ]
    ],
]

test(splitGrid, [unchunked, 2], chunked, 'splitGrid')
console.log(JSON.stringify(chunked))
test(mergeChunks, [chunked, 2, 4], unchunked, 'mergeChunks')

function test(func, args, shouldReturn, desc) {
    let result = func.apply(this, args)
    
    if (_.isEqual(result, shouldReturn)) {
        console.log('PASS: ' + desc + ' ' + JSON.stringify(shouldReturn))
    } else {
        console.log('FAIL: ' + desc + ' returned: \n' + JSON.stringify(result) + ' should be: \n' + JSON.stringify(shouldReturn))
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
        console.log('Adding: '+ patternKey)

        for (let rotate = 0; rotate < 3; rotate++) {
            pattern.in = rotate90CW(pattern.in)
            patternKey = gridToString(pattern.in)
            if (patternsMap[patternKey] === undefined) { // some patterns have rotational symetry
                console.log('Adding: '+ patternKey)
                patternsMap[patternKey] = pattern;
            } else {
                console.log('NOT Adding: '+ patternKey)                
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
        if (grid.length % 2 == 0) {
            
        }
        else if (grid.length % 3 == 0) {
            debugger
            let gridChunks = splitGrid(grid, 3)
            let enhancementPatternKey = gridToPatternKey(grid, patternsMap)
            debugger
        }
    }
}

/*
['1', '2', '3', '4'],
['5', '6', '7', '8'],
['9', '10', '11', '12'],
['13', '14', '15', '16']

[[
    [
        '1', '2'
    ],
    [
        '5', '6'
    ]
],
[
    [
        '3', '4'
    ],
    [
        '7', '8'
    ]
]],
*/

function splitGrid(grid, chunkSize) {
    if (grid.length === chunkSize) {
        return grid.slice(0)
    }
    let output = []
    
    let chunks = []

    for (let rowChunkIndex = 0; rowChunkIndex < grid.length / chunkSize; rowChunkIndex++) {
        let rowChunk = []
        for (let colChunkIndex = 0; colChunkIndex < grid.length / chunkSize; colChunkIndex++) {
            let rowChunkInner = []
            for (let rowInnerChunk = 0; rowInnerChunk < chunkSize; rowInnerChunk++) {
                let colChunkInner = []
                for (let colInnerChunk = 0; colInnerChunk < chunkSize; colInnerChunk++) {
                    colChunkInner.push(grid[(rowChunkIndex * chunkSize) + rowInnerChunk][(colChunkIndex * chunkSize) + colInnerChunk])
                }
                rowChunkInner.push(colChunkInner)
            }
            chunks.push(rowChunkInner)
            rowChunk.push(rowChunkInner)
        }
        output.push(rowChunk)
    }

    return chunks;
}

function mergeChunks(gridChunks, chunkSize, gridSize) {
    let output = []

    for(let outputRow = 0; outputRow < gridSize; outputRow++) {
        output[outputRow] = []
    }

    for (let chunkIndex = 0; chunkIndex < gridChunks.length; chunkIndex++) {
        let outputColIndex = chunkIndex % (gridSize / chunkSize)
        let outputRowIndex = Math.floor(chunkIndex / chunkSize)

        for (let chunkRow = 0; chunkRow < chunkSize; chunkRow++) {
            for (let chunkCol = 0; chunkCol < chunkSize; chunkCol++) {
                output[outputRowIndex * chunkSize + chunkRow][outputColIndex * chunkSize + chunkCol] = gridChunks[chunkIndex][chunkRow][chunkCol]
            }
        }
    }

    return output
}

function gridToPatternKey(grid, patternsMap) {
    let patternKey
    let gridToSearch = grid.slice(0)
    let rotate = 0
    let matchedKey
    while(rotate < 4) {
        patternKey = gridToString(gridToSearch)
        if (patternsMap[patternKey] !== undefined) {
            matchedKey = patternKey
            break
        }
        gridToSearch = rotate90CW(gridToSearch)
        rotate++
    }
    if (matchedKey === undefined) {
        patternKey = gridToString(flipHorz(grid.slice(0)))
        if (patternsMap[patternKey] === undefined) {
            patternKey = gridToString(flipVert(grid.slice(0)))
            if (patternsMap[patternKey] !== undefined) {
                matchedKey = patternKey
            } else {
                console.log('No enhancement for: ' + gridToString(grid))
            }
        } else {
            matchedKey = patternKey
        }
        debugger
    } else {
        matchedKey = patternKey
    }
    return matchedKey
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

function flipVert(input) {
    let output = []
    let size = input.length
    for(let row = 0; row < size; row++) {
        output[size - row - 1] = input[row]
    }
    return output
}

function flipHorz(input) {
    let output = []
    let size = input.length
    for(let row = 0; row < size; row++) {
        output[row] = []
    }
    for(let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            output[row][size - col - 1] = input[row][col]
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

/*
fs = require('fs');
fs.readFile('day21input.txt', 'utf-8', (err, data) =>{
    console.log(solve(5, data));
});
*/