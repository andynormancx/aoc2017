var _ = require('lodash')
//require('sugar')

let testInput = [
    '0/2',
    '2/2',
    '2/3',
    '3/4',
    '3/5',
    '0/1',
    '10/1',
    '9/10',
]

let input = [
    '14/42',
    '2/3',
    '6/44',
    '4/10',
    '23/49',
    '35/39',
    '46/46',
    '5/29',
    '13/20',
    '33/9',
    '24/50',
    '0/30',
    '9/10',
    '41/44',
    '35/50',
    '44/50',
    '5/11',
    '21/24',
    '7/39',
    '46/31',
    '38/38',
    '22/26',
    '8/9',
    '16/4',
    '23/39',
    '26/5',
    '40/40',
    '29/29',
    '5/20',
    '3/32',
    '42/11',
    '16/14',
    '27/49',
    '36/20',
    '18/39',
    '49/41',
    '16/6',
    '24/46',
    '44/48',
    '36/4',
    '6/6',
    '13/6',
    '42/12',
    '29/41',
    '39/39',
    '9/3',
    '30/2',
    '25/20',
    '15/6',
    '15/23',
    '28/40',
    '8/7',
    '26/23',
    '48/10',
    '28/28',
    '2/13',
    '48/14',
]

test(solve, [testInput], 31, 'solve test')
test(solve, [input], 1695, 'solve real')


function test(func, args, shouldReturn, desc) {
    let result = func.apply(this, args)
    
    if (_.isEqual(result, shouldReturn)) {
        console.log('PASS: ' + desc + ' ' + JSON.stringify(shouldReturn))
    } else {
        console.log('FAIL: ' + desc + ' returned: \n' + JSON.stringify(result) + ' should be: \n' + JSON.stringify(shouldReturn))
    }
}

function solve(input) {
    let portMap = {}
    let componentsMap = {}

    let components = input.map((line, index) => {
        let parts = line.split('/')

        port1 = parseInt(parts[0])
        port2 = parseInt(parts[1])

        let component = {
            id: line,
            index: index,
            ports: [port1, port2]
        }

        return component
    });

    let bridges = getBridges(0, components, { strength: 0, chainLength: 0, path: '' })

    let maxScore = bridges.reduce((max, bridge) => {
        return Math.max(max, bridge.strength)
    }, 0)

    let longest = bridges.reduce((max, bridge) => {
        return Math.max(max, bridge.chainLength)
    }, 0)

    longestBridges = bridges.filter(bridge => bridge.chainLength === longest)
    longestBridges = longestBridges.sort((a,b) => b.strength - a.strength)
    //_.findIndex(bridges, ['chainLength', longest])


    return { maxScore: maxScore, longest: longestBridges[0].strength }
}

function getBridges(unusedPort, components, bridge) {
    let bridges = []

    components.forEach((component, index) => {
        if (component.ports[0] === unusedPort || component.ports[1] === unusedPort) {
            let nextUnusedPort = unusedPort === component.ports[0] ? component.ports[1] : component.ports[0]
            let nextBridge = {
                strength: bridge.strength + component.ports[0] + component.ports[1],
                chainLength: bridge.chainLength + 1,
                path: bridge.path + unusedPort + '/' + nextUnusedPort + ' '
            }

            let remainingComponents = components.slice()
            remainingComponents.splice(index, 1) // remove the next comp form the list
            bridges.push(nextBridge)


            bridges = bridges.concat(getBridges(nextUnusedPort, remainingComponents, nextBridge))
        }
    })
    
    return bridges
}