let _ = require('lodash')
let fs = require('fs');
//require('sugar')

fs.readFile('day19testinput.txt', 'utf-8', (err, data) =>{
    if (solve(data) == 'ABCDEF 38') {
        console.log('OK')
    } else {
        console.log('Fail')
    }
});


function solve(input) {
    let lines = input.split('\n')
    let cells = lines.map(line => {
        return line.split('')
    });

    // 0 = down, go clockwise
    let dir = 0
    let directions = [
        { row: 1, col: 0},
        { row: 0, col: -1},
        { row: -1, col: 0},
        { row: 0, col: 1},
    ]
    let pos = { row: 0, col: 0}

    pos = findEntryPoint(cells, pos)

    let atEnd = false
    let letters = ''
    let steps = 0;

    do {
        let cell = getCellAtPos(cells, pos)
        if (cell == '+') {
            let prevDir = dir
            let foundNext = false
            do {
                dir = (dir + 1) % 4
                if ((dir + 2) % 4 != prevDir) {
                    if (getCellInDir(cells, pos, directions[dir]) != ' ') foundNext = true
                }
            } while(!foundNext)
        } else if (cell == ' ') {
            atEnd = true
            continue
        } else {
            if (cell != '|' && cell != '-') {
                letters += cell
            }
        }
        pos = { row: pos.row + directions[dir].row, col: pos.col + directions[dir].col }
        steps++
    } while(!atEnd)

    return letters + ' ' + steps
    function findEntryPoint(cells, pos) {
        let col = 0
        while (col < cells[pos.row].length) {            
            let cell = cells[pos.row][col]
            if (cell == '|') {
                return { row: pos.row, col: col}
            }
            col++
        }
    }
    function validatePos(cells, pos) {
        return !(pos.row < 0 || pos.row >= cells.length || pos.col < 0 || pos.col >= cells[0].length)
    }
    function getCellAtPos(cells, pos) {
        return cells[pos.row][pos.col]
    }
    function getCellInDir(cells, pos, dir) {
        let newPos = { row: pos.row + dir.row, col: pos.col + dir.col} 
        
        if (validatePos(cells, newPos)) {
            return cells[newPos.row][newPos.col]
        } else {
            return ' '
        }
    }
}


fs.readFile('day19input.txt', 'utf-8', (err, data) =>{
    console.log(solve(data));
});
