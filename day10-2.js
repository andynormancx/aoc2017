//var _ = require('lodash');
require('sugar');

let testInputs = [
    { text: "", hash: "a2582a3a0e66e6e86e3812dcb672a272"},
    { text: "AoC 2017", hash: "33efeb34ea91902bb2f59c9920caa6cd"},
    { text: "1,2,3", hash: "3efbe78a8d82f29979031a4aa0b16a9d"},
    { text: "1,2,4", hash: "63960835bcdc130f0b66d7ff4f6a5a8e"},
    { text: "147,37,249,1,31,2,226,0,161,71,254,243,183,255,30,70", hash: "70b856a24d586194331398c7fcfa0aaf"},
    
];


testInputs.forEach(input => {
    var output = solve(input.text);

    if (output == input.hash) {
        console.log("PASS: '" + input.text + "' " + input.hash);
    } else {
        console.log("FAIL: '" + input.text + "' " + output + " != " + input.hash);        
    }
});

function solve(inputText) {
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