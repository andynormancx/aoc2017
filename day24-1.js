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
//test(solve, [input], 31, 'solve real')


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

        addToPortMap(portMap, component)
        return component
    });

    let bridges = []
    components.forEach(component => {
        if (component.ports[0] === 0) {
            //bridge(0, component, portMap, [], bridges)
            bridge(0, component, portMap, [], bridges)
        }
    })

    let maxScore = bridges.reduce((max, bridge) => {
        let bridgeScore = bridge.reduce((score, component) => {
            bridge.score = score
            return score + component.ports[0] + component.ports[1]
        }, 0)

        return Math.max(max, bridgeScore)
    }, 0)
    debugger
    return maxScore
}

function bridge(usedPort, component, portMap, joins, bridges) {
    //if (component.id === '3/4') debugger
    let unusedPort = usedPort === 0 ? 1 : 0
    let unusedPortNumber = component.ports[unusedPort]

    let localJoins = joins.concat([component])

    if (component.ports[unusedPort] === 0) {
        bridges.push(localJoins)
        return
    }
    // get a local copy of the ports map
    let localPortsMap = JSON.parse(JSON.stringify(portMap))
    
    // remove ourselves from the port map

    _.remove(localPortsMap[component.ports[0]], componentCheck => {
        return component.index === componentCheck.index
    })
    _.remove(localPortsMap[component.ports[1]], componentCheck => {
        return component.index === componentCheck.index
    })
    
    let foundMatches = false
    localPortsMap[component.ports[unusedPort]].forEach(childComponent => {
        if (childComponent.ports[0] === unusedPortNumber) {
            bridge(0, childComponent, localPortsMap, localJoins, bridges)
            foundMatches = true     
        }
        if (childComponent.ports[1] === unusedPortNumber) {
            bridge(1, childComponent, localPortsMap, localJoins, bridges)
            foundMatches = true     
        }
    })

    if (!foundMatches) {
        bridges.push(localJoins)
    }

    return
}

function addToPortMap(portMap, component) {
    if (portMap[component.ports[0]] === undefined) {
        portMap[component.ports[0]] = [component]
    } else {
        portMap[component.ports[0]].push(component)
    }
    if (portMap[component.ports[1]] === undefined) {
        portMap[component.ports[1]] = [component]
    } else {
        portMap[component.ports[1]].push(component)
    }
}