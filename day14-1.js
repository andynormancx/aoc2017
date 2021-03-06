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
console.log(solve('flqrgnkx'));

function solve(keyPrefix) {
    let hexMap = {
        "0": [0,0,0,0],
        "1": [0,0,0,1],
        "2": [0,0,1,0],
        "3": [0,0,1,1],
        "4": [0,1,0,0],
        "5": [0,1,0,1],
        "6": [0,1,1,0],
        "7": [0,1,1,1],
        "8": [1,0,0,0],
        "9": [1,0,0,1],
        "a": [1,0,1,0],
        "b": [1,0,1,1],
        "c": [1,1,0,0],
        "d": [1,1,0,1],
        "e": [1,1,1,0],
        "f": [1,1,1,1],
    };

    let used = 0;
    for (let rowIndex = 0; rowIndex < 128; rowIndex++) {
        let key = keyPrefix + '-' + rowIndex;
        let hash = calcHash(key);
        let characters = hash.split('');

        //console.log(hash);
        
        let bits = characters.reduce((last, character) => {
            return last.concat(hexMap[character]);
        }, []);
        console.log(bits.reduce((last, bit) => {
            return last + (bit == 1 ? '#' : '.');
        },''));

        used += bits.reduce((usedCount, bit) => {
            return usedCount + (bit == 1 ? 1 : 0);
        }, 0);
    }


    return used;
    
    function calcHash(inputText) {
        let lengths = inputText.split("").map(x => x.charCodeAt(0));
        lengths = lengths.concat([17, 31, 73, 47, 23]);
    
        let numbers = [];
        let position = 0;
        let skipSize = 0;
    
        for (let index = 0; index <= 255; index++) {
            numbers.push(index);
        }
    
        for (let roundIndex  = 0; roundIndex < 64; roundIndex++) {
            lengths.forEach(length => {
                reverseSection(position, length, numbers);            
                position = (position + length + skipSize) % 256;
                skipSize++;
            });    
        }
        
        function calcHash (input) {
            let denseHash = [];
            for (let subHashIndex = 0; subHashIndex < 16; subHashIndex++) {
                let sparseHash = 0;
                for (let index = 0; index < 16; index++) {
                    sparseHash = sparseHash ^ input[(subHashIndex * 16) + index];
                }
                denseHash.push(sparseHash);
            }
    
            return denseHash.reduce((hash, element) => {
                let hex = element.toString(16);
                return hash + (hex.length != 2 ? "0" + hex : hex);
            }, "");
        }
    
        function reverseSection (start, length, input) {
            var itemsToReverse = [];
    
            for(let offset = 0; offset < length; offset++) {
                itemsToReverse.push(input[(start + offset) % input.length]);
            }
    
            itemsToReverse = itemsToReverse.reverse();
            for(let offset = 0; offset < length; offset++) {
                input[(start + offset) % input.length] = itemsToReverse[offset];
            }
        }
    
        return calcHash(numbers);;
    }

}


let input = [

];

console.log(solve('hxtvlmkl'));
