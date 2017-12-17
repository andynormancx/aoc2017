var _ = require('lodash')
//require('sugar')

if (solve(3) == 638) {
    console.log('OK')
} else {
    console.log('Fail ')
}

console.log(solve(367))

function solve(skip) {
    let buffer = [0]
    let position = 0

    for (let index = 1; index < 2018; index++) {
        //console.log(buffer.join(' '))
        position = (position + skip) % buffer.length
        buffer.splice(position + 1, 0, index)
        position++ // move on to inserted value
        //console.log(buffer[position + 1])
    }
    //console.log(buffer[position + 1])
    return buffer[position + 1]
}