var _ = require('lodash')
//require('sugar')


let input =[
    'set b 79',
    'set c b',
    'jnz a 2',
    'jnz 1 5',
    'mul b 100',
    'sub b -100000',
    'set c b',
    'sub c -17000',
    'set f 1',
    'set d 2',
    'set e 2',
    'set g d',
    'mul g e',
    'sub g b',
    'jnz g 2',
    'set f 0',
    'sub e -1',
    'set g e',
    'sub g b',
    'jnz g -8',
    'sub d -1',
    'set g d',
    'sub g b',
    'jnz g -13',
    'jnz f 2',
    'sub h -1',
    'set g b',
    'sub g c',
    'jnz g 2',
    'jnz 1 3',
    'sub b -17',
    'jnz 1 -23',
]

console.log(solve(input))

function solve(input) {
    let registers = {}

    let instructions = input.map(line => {
        let parts = line.split(' ')

        let instruction = {
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
        { name: 'One', ip: 0, registers: { p: 0}, },
        //{ name: 'Two', ip: 0, registers: { p: 1}, sentMessages: [], messagesSentCount: 0, running: true},
    ];
    //progs[0].otherProg = progs[1]
    //progs[1].otherProg = progs[0]

    let prog = progs[0];

    while(prog.ip < instructions.length) {
        let instruction = instructions[prog.ip]
        switch (instruction.op) {
            case 'set':
                setReg(instruction, prog.registers)
                break
            case 'add':
                addReg(instruction, prog.registers)
                break
            case 'sub':
                subReg(instruction, prog.registers)
                break
            case 'mul':
                mulCount++
                mulReg(instruction, prog.registers)
                break
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