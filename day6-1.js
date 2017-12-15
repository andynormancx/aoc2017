var _ = require('lodash');
require('sugar');

var input = "0	5	10	0	11	14	13	4	11	8	8	7	1	4	12	11";
var testInput = "0	2	7	0";

solve(testInput);
solve(input);

function solve(input) {
    let banks = input.split("\t").map(element => parseInt(element));
    let bankHashes =  {};
    let steps = 0;
    let matchedHash = "";
    
    while(true) {
        console.log(banks);
        let hashed = hashBanks(banks);
        if (bankHashes[hashed]) {
            matchedHash = hashed;
            console.log(steps);
            break;
        }
        spreadMemory(banks, highestBank(banks).index);
        bankHashes[hashed] = true;
        steps++;
        
    }
    console.log("part 1: " + steps);
    steps = 0;
    while(true) {
        //console.log(banks);
        spreadMemory(banks, highestBank(banks).index);
        steps++;
        let hashed = hashBanks(banks);
        if (matchedHash == hashed) {
            console.log("part 2: " + steps);
            break;
        }        
    }

    function hashBanks(banks) {
        return banks.reduce((hash, bank) => hash + "_" + bank, "");
    }

    function highestBank(banks) {
        return banks.reduce((working, bank, index) => bank > working.highest ? { index: index, highest: bank} : working , { index: 0, highest: 0});
    }

    function spreadMemory(banks, startingIndex) {
        var memoryToSpread  = banks[startingIndex];
        var index = startingIndex;
        banks[startingIndex] = 0;

        while(memoryToSpread > 0) {
            index++;
            if (index >= banks.length) {
                index = 0;
            }
            banks[index]++;
            memoryToSpread--;
        }
    }   
}