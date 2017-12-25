var _ = require('lodash')
//require('sugar')

let testInput = {
    A: {
        name: "A",
        0: {
            write: 1,
            move: 1,
            nextState: 'B'
        },
        1: {
            write: 0,
            move: -1,
            nextState: 'B'
         }
    },
    B: {
        name: "B",
        0: {
            write: 1,
            move: -1,
            nextState: 'A'
        },
        1: {
            write: 1,
            move: 1,
            nextState: 'A'
         }
    },
}

let input = {
    A: {
        name: "A",
        0: {
            write: 1,
            move: 1,
            nextState: 'B'
        },
        1: {
            write: 0,
            move: 1,
            nextState: 'C'
         }
    },
    B: {
        name: "B",
        0: {
            write: 0,
            move: -1,
            nextState: 'A'
        },
        1: {
            write: 0,
            move: 1,
            nextState: 'D'
         }
    },
    C: {
        name: "C",
        0: {
            write: 1,
            move: 1,
            nextState: 'D'
        },
        1: {
            write: 1,
            move: 1,
            nextState: 'A'
         }
    },
    D: {
        name: "D",
        0: {
            write: 1,
            move: -1,
            nextState: 'E'
        },
        1: {
            write: 0,
            move: -1,
            nextState: 'D'
         }
    },
    E: {
        name: "E",
        0: {
            write: 1,
            move: 1,
            nextState: 'F'
        },
        1: {
            write: 1,
            move: -1,
            nextState: 'B'
         }
    },
    F: {
        name: "F",
        0: {
            write: 1,
            move: 1,
            nextState: 'A'
        },
        1: {
            write: 1,
            move: 1,
            nextState: 'E'
         }
    },
}

//test(solve, [testInput, 6], 3, 'solve test')
test(solve, [input, 12399302], 3, 'solve real')

function test(func, args, shouldReturn, desc) {
    let result = func.apply(this, args)
    
    if (_.isEqual(result, shouldReturn)) {
        console.log('PASS: ' + desc + ' ' + JSON.stringify(shouldReturn))
    } else {
        console.log('FAIL: ' + desc + ' returned: \n' + JSON.stringify(result) + ' should be: \n' + JSON.stringify(shouldReturn))
    }
}

function solve(input, steps) {
    let offset = 0
    let state = input.A
    let step = 0
    let topOffset = 0
    let bottomOffset = 0
    let tape = []

    while (step < steps) {
        if (step % 100000 == 0) console.log(step)
        let tapeValue = getTapeValue(offset)
        let instruction = state[tapeValue]
        tape[offset] = instruction.write
        offset += instruction.move
        state = input[instruction.nextState]
        step++
    }

    function getTapeValue(position) {
        if (tape[position] === undefined) {
            tape[position] = 0
            topOffset = Math.max(position, topOffset)
            bottomOffset = Math.min(position, bottomOffset)
        }
        return tape[position]
    }
    function calcChecksum() {
        let checkSum = 0
        for (let index = bottomOffset; index <= topOffset; index++) {
            if (tape[index] === 1) {
                checkSum++
            }
        }
        return checkSum
    }
    return calcChecksum()
}