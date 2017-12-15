//var _ = require('lodash');
require('sugar');

let testinput = '3,4,1,5';
let input = '147,37,249,1,31,2,226,0,161,71,254,243,183,255,30,70';

// should be 12
console.log(solve(testinput, 4));

console.log(solve(input, 255));
// 5119


function solve(input, maxNumber) {
    let lengths = input.split(",").map(x => parseInt(x));
    let numbers = [];
    let position = 0;
    let skipSize = 0;

    for (let index = 0; index <= maxNumber; index++) {
        numbers.push(index);
    }

    lengths.forEach(length => {
        reverseSection(position, length, numbers);            
        position = (position + length + skipSize) % numbers.length;
        skipSize++;
    });
    
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

    return numbers[0] * numbers[1];
}