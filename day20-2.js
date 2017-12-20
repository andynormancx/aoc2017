let _ = require('lodash')
let fs = require('fs');
//require('sugar')

/*
fs.readFile('day20testinput.txt', 'utf-8', (err, data) =>{
    if (solve(data) == 0) {
        console.log('OK')
    } else {
        console.log('Fail')
    }
});
*/


function solve(input) {
    let lineRegex = /p=<(.+?),(.+?),(.+?)>, v=<(.+?),(.+?),(.+?)>, a=<(.+?),(.+?),(.+?)>/;
    let lines = input.split('\n')
    let particles = lines.map((line, index) => {
        let matches = lineRegex.exec(line)
        return {
            number: index,
            pos: {
                x: parseInt(matches[1]),
                y: parseInt(matches[2]),
                z: parseInt(matches[3]),
            },
            vel: {
                x: parseInt(matches[4]),
                y: parseInt(matches[5]),
                z: parseInt(matches[6]),
            },
            acc: {
                x: parseInt(matches[7]),
                y: parseInt(matches[8]),
                z: parseInt(matches[9]),
            },
            lastDistance: Number.MAX_SAFE_INTEGER,
            distance: Number.MAX_SAFE_INTEGER,
            movingTowards: undefined,
            active: true
        }
    });

    let anyoneMovingTowards = true
    let step = 0
    while(anyoneMovingTowards) {
        let positions = {}
        anyoneMovingTowards = false

        particles.forEach((particle, index) => {
            if (particle.active) {
                particle.lastDistance = particle.distance

                particle.vel.x += particle.acc.x
                particle.vel.y += particle.acc.y
                particle.vel.z += particle.acc.z
    
                particle.pos.x += particle.vel.x
                particle.pos.y += particle.vel.y
                particle.pos.z += particle.vel.z
    
                particle.distance = Math.abs(particle.pos.x) + Math.abs(particle.pos.y) + Math.abs(particle.pos.z)
    
                if (canGetCloser(particle)) {
                    particle.movingTowards = true;
                    anyoneMovingTowards = true;
                } else {
                    particle.movingTowards = false;                
                }
    
                let posString = [particle.pos.x, particle.pos.y, particle.pos.z].join('_')
                if (positions[posString] === undefined) {
                    positions[posString] = particle
                } else {
                    particle.active = false
                    positions[posString].active = false
                }    
            }
        });

        console.log('Step ' + step + ' particles active ' + particles.reduce((count, particle) => { return (particle.active ? count + 1 : count)}, 0))
        step++
    }
    let closestParticle = particles[0];

    for (let index = 0; index < particles.length; index++) {
        let particle = particles[index];

        if (particle.distance < closestParticle.distance) {
            closestParticle = particle;
        }
    }

    return particles.reduce((count, particle) => {
        return (particle.active ? count + 1 : count)
    }, 0)
    
    function canGetCloser(particle) {
        if (particle.vel.x + particle.acc.x > 0 && particle.pos.x < 0) return true
        if (particle.vel.x + particle.acc.x < 0 && particle.pos.x > 0) return true

        if (particle.vel.y + particle.acc.y > 0 && particle.pos.y < 0) return true
        if (particle.vel.y + particle.acc.y < 0 && particle.pos.y > 0) return true

        if (particle.vel.z + particle.acc.z > 0 && particle.pos.z < 0) return true
        if (particle.vel.z + particle.acc.z < 0 && particle.pos.z > 0) return true

        return false
    }
}


fs.readFile('day20input.txt', 'utf-8', (err, data) =>{
    console.log(solve(data));
});
