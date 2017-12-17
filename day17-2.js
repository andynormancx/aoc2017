var _ = require('lodash')
//require('sugar')

console.log(solve(367))

function solve(skip) {
    let position = 0
    let lastInsertAfterZero;

    for (let index = 1; index <= 50000000; index++) {
        position = (position + skip) % index
        if (position == 0) lastInsertAfterZero = index
        position++ // move on to inserted value
    }
    return lastInsertAfterZero
}