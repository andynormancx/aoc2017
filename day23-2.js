var _ = require('lodash')
//require('sugar')


let input =[
    'set b 79',// 1
    'set c b',// 2
    'jnz a 2',// 3
    'jnz 1 5',// 4
    'mul b 100', // 5
    'sub b -100000', // 6
    'set c b', // 7
    'sub c -17000', // 8
    'set f 1', // 9
    'set d 2',// 10
    'set e 2',// 11

    'set g d',// 12 - entry
    'mul g e',// 13
    'sub g b',// 14
    'jnz g 2',// 15 - skips next ;ine
    'set f 0',// 16
    'sub e -1',// 17
    'set g e',// 18
    'sub g b',// 19
    'jnz g -8',// 20 - jumps to 12
    
    'sub d -1',// 21
    'set g d',// 22
    'sub g b',// 23
    'jnz g -13',// 34
    'jnz f 2',// 25 - jumps past next line
    'sub h -1',// 26
    'set g b',// 27
    'sub g c',// 28
    'jnz g 2',// 29 - jumps past next line
    'jnz 1 3',// 30 - jumps to past end
    'sub b -17',// 31
    'jnz 1 -23',// 32 - jumps to 9
]

console.log(solve(input))

function solve(input) {
    let registers = {}

    let instructions = input.map(line => {
        let parts = line.split(' ')

        let instruction = {
            ins: line,
            calls: 0,
            op: parts[0],
        }
        let sourceValue = parseInt(parts[1])
        if (isNaN(sourceValue)) {
            instruction.targetReg = parts[1]
        } else {
            instruction.targetValue = sourceValue
        }

        if (parts.length == 3) {
            let value = parseInt(parts[2])
            if (isNaN(value)) {
                instruction.sourceReg = parts[2]
            } else {
                instruction.value = value
            }
        }

        return instruction
    });

    let mulCount = 0

    let progs = [
        { name: 'One', ip: 0, registers: { a: 1}, },
        //{ name: 'Two', ip: 0, registers: { p: 1}, sentMessages: [], messagesSentCount: 0, running: true},
    ];
    //progs[0].otherProg = progs[1]
    //progs[1].otherProg = progs[0]

    let prog = progs[0];
    let itCount = 0
    let oldD = 0
    while(prog.ip < instructions.length) {
        let instruction = instructions[prog.ip]
        instruction.calls++
        itCount++
        if (itCount % 10000000 === 0) {
            //console.log('itCount ' + itCount)
            //console.log(JSON.stringify(prog.registers))
        }

        if (getReg('d', prog.registers) != oldD) {
            debugger
            oldD = getReg('d', prog.registers)
        }
        switch (instruction.op) {
            case 'set':
                setReg(instruction, prog.registers)
                break
            case 'add':
                addReg(instruction, prog.registers)
                break
            case 'sub':
                subReg(instruction, prog.registers)
                if (instruction.op.targetReg == 'h') {
                    console.log(itCount)
                    console.log(JSON.stringify(prog.registers))
                    prog.ip = 10000
                }
                break
            case 'mul':
                mulCount++
                mulReg(instruction, prog.registers)
                break
        }
        if (instruction.ins === 'sub d -1') {
            console.log(JSON.stringify(prog.registers))
        }
        if (instruction.op == 'jnz') {
            let check = getRegOrValTarget(instruction, prog.registers)
            if (check != 0) {
                prog.ip = prog.ip + getRegOrVal(instruction, prog.registers)
            } else {
                prog.ip++
            }
        } else {
            prog.ip++
        }
    }

    return mulCount

    function getReg(regName, registers) {
        if (registers[regName] == undefined) {
            registers[regName] = 0
        }
        return registers[regName]
    }
    function getRegOrVal(instruction, registers) {
        if (instruction.sourceReg != undefined) {
            return getReg(instruction.sourceReg, registers)            
        } else {
            return instruction.value
        }
    }
    function getRegOrValTarget(instruction, registers) {
        if (instruction.targetReg != undefined) {
            return getReg(instruction.targetReg, registers)            
        } else {
            return instruction.targetValue
        }
    }

    function setReg(instruction, registers) {
        registers[instruction.targetReg] = getRegOrVal(instruction, registers)
    }
    function addReg(instruction, registers) {
        if (registers[instruction.targetReg] == undefined) {
            registers[instruction.targetReg] = getRegOrVal(instruction, registers)
        } else {
            registers[instruction.targetReg] += getRegOrVal(instruction, registers)
        }
    }
    function subReg(instruction, registers) {
        if (registers[instruction.targetReg] == undefined) {
            registers[instruction.targetReg] = getRegOrVal(instruction, registers)
        } else {
            registers[instruction.targetReg] -= getRegOrVal(instruction, registers)
        }
    }
    function mulReg(instruction, registers) {
        if (registers[instruction.targetReg] == undefined) {
            registers[instruction.targetReg] = 0
        } else {
            registers[instruction.targetReg] *= getRegOrVal(instruction, registers)
        }
    }
}