var _ = require('lodash');
require('sugar');

let testInput = [
    '0: 3',
    '1: 2',
    '4: 4',
    '6: 4',
];

let tests = [
    { program: "2", connections:  6},    
];


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
//solve(testInput);

function solve(input) {
    let layers = [];
    input.forEach(line => {
        let parts = line.split(': ');
        layers[parseInt(parts[0])] = {
            depth: parseInt(parts[0]),
            range: parseInt(parts[1]),
        };
    });

    let maxLayerDepth = layers.reduce((max, layer) => {
        return (layer.depth > max ? layer.depth : max);
    }, 0);

    let delay = 0;
    let found = false;

    while (!found) {
        let caught = false;

        for (let picoSecond = delay; picoSecond <= maxLayerDepth + delay; picoSecond++) {
            let layerWeAreIn = layers[picoSecond - delay];
        
            if (layerWeAreIn != undefined) {              
                if (isLayerAtZero(picoSecond, layerWeAreIn.range)) {
                    caught = true;
                    break
                }
            }            
        }
        if (!caught) {
            console.log('Escape: ' + delay);
            found = true;
        }
        delay++;
    }

    function isLayerAtZero(picoSecond, range) {
        return picoSecond % ((range * 2) - 2) == 0 ? true : false;
    }

    function vis(picoSecond) {
        let header = '';
        let lines = [];
        
        console.log('Picosecond ' + picoSecond + ':');

        for (let layerIndex = 0; layerIndex <= maxLayerDepth; layerIndex++) {
            header += ' ' + layerIndex + '  ';   
        }
        console.log(header);
        
        for (let rangeIndex = 0; rangeIndex <= maxLayerRange; rangeIndex++) {
            let line = '';            
            for (let layerIndex = 0; layerIndex <= maxLayerDepth; layerIndex++) {
                let layer = layers[layerIndex];
                if (layer == null) {
                    if (ourLayerPos == layerIndex && ourPos == rangeIndex) {
                        line += '( ) ';                        
                    } else {
                        line += '    ';                        
                    }
                } else {
                    if (rangeIndex >= layer.range) {
                        line += '    ';
                    } else {
                        if (ourLayerPos == layerIndex && ourPos == rangeIndex) {
                            if (layer.pos == rangeIndex) {
                                line += '(S) ';                                                        
                            } else {
                                line += '( ) ';                            
                            }    
                        } else {
                            if (layer.pos == rangeIndex) {
                                line += '[S] ';                                                        
                            } else {
                                line += '[ ] ';                            
                            }    
                        }
                    }
                }
            }
            lines.push(line);
        }

        lines.forEach(line => {
            console.log(line);
        });
    }
}


let input = [
    '0: 3',
    '1: 2',
    '2: 4',
    '4: 6',
    '6: 5',
    '8: 8',
    '10: 6',
    '12: 4',
    '14: 8',
    '16: 6',
    '18: 8',
    '20: 8',
    '22: 6',
    '24: 8',
    '26: 9',
    '28: 12',
    '30: 8',
    '32: 14',
    '34: 10',
    '36: 12',
    '38: 12',
    '40: 10',
    '42: 12',
    '44: 12',
    '46: 12',
    '48: 12',
    '50: 14',
    '52: 12',
    '54: 14',
    '56: 12',
    '60: 14',
    '62: 12',
    '64: 14',
    '66: 14',
    '68: 14',
    '70: 14',
    '72: 14',
    '74: 14',
    '78: 26',
    '80: 18',
    '82: 17',
    '86: 18',
    '88: 14',
    '96: 18',
];

console.log(solve(input));
