var _ = require('lodash')
//require('sugar')

let testInput = [
    'snd 1',
    'snd 2',
    'snd p',
    'rcv a',
    'rcv b',
    'rcv c',
    'rcv d'
]

if (solve(testInput) == 3) {
    console.log('OK')
} else {
    console.log('Fail ')
}

let input =[
    'set i 31',
    'set a 1',
    'mul p 17',
    'jgz p p',
    'mul a 2',
    'add i -1',
    'jgz i -2',
    'add a -1',
    'set i 127',
    'set p 826',
    'mul p 8505',
    'mod p a',
    'mul p 129749',
    'add p 12345',
    'mod p a',
    'set b p',
    'mod b 10000',
    'snd b',
    'add i -1',
    'jgz i -9',
    'jgz a 3',
    'rcv b',
    'jgz b -1',
    'set f 0',
    'set i 126',
    'rcv a',
    'rcv b',
    'set p a',
    'mul p -1',
    'add p b',
    'jgz p 4',
    'snd a',
    'set a b',
    'jgz 1 3',
    'snd b',
    'set f 1',
    'add i -1',
    'jgz i -11',
    'snd a',
    'jgz f -16',
    'jgz a -19',    
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

    let progs = [
        { name: 'One', ip: 0, registers: { p: 0}, sentMessages: [], messagesSentCount: 0, running: true},
        { name: 'Two', ip: 0, registers: { p: 1}, sentMessages: [], messagesSentCount: 0, running: true},
    ];
    progs[0].otherProg = progs[1]
    progs[1].otherProg = progs[0]

    let prog = progs[0];

    while(progs[0].running || progs[1].running) {
        dispatch(progs[0])
        dispatch(progs[1])
    }

    return progs[1].messagesSentCount

    
    function dispatch(prog) {
        prog.running = true;
        let instruction = instructions[prog.ip]
        switch (instruction.op) {
            case 'set':
                setReg(instruction, prog.registers)
                break
            case 'add':
                addReg(instruction, prog.registers)
                break
            case 'mul':
                mulReg(instruction, prog.registers)
                break
            case 'mod':
                modReg(instruction, prog.registers)
                break
            case 'rcv':
                if (prog.otherProg.sentMessages.length > 0) {
                    prog.registers[instruction.targetReg] = prog.otherProg.sentMessages[0]
                    prog.otherProg.sentMessages.splice(0, 1)
                    // ip is incremented after the switch
                } else {
                    prog.running = false;
                    return // need to wait
                }
                break
            case 'snd':
                prog.sentMessages.push(getRegOrValTarget(instruction, prog.registers))
                prog.messagesSentCount++
                break
        }
        if (instruction.op == 'jgz') {
            let check = getRegOrValTarget(instruction, prog.registers)
            if (check > 0) {
                prog.ip = prog.ip + getRegOrVal(instruction, prog.registers)
            } else {
                prog.ip++
            }
        } else {
            prog.ip++
        }
    }

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
    function mulReg(instruction, registers) {
        if (registers[instruction.targetReg] == undefined) {
            registers[instruction.targetReg] = 0
        } else {
            registers[instruction.targetReg] *= getRegOrVal(instruction, registers)
        }
    }
    function modReg(instruction, registers) {
        if (registers[instruction.targetReg] == undefined) {
            registers[instruction.targetReg] = 0
        } else {
            registers[instruction.targetReg] = getRegOrValTarget(instruction, registers) % getRegOrVal(instruction, registers)
        }
    }
    console.log(instructions)
}