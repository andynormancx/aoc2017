solve()
function solve() {
    let a = 1
    let b = 107900
    let c = 124900
    let d = 0
    let f = 0
    let g = 0
    let h = 0

    do {
        f = 1 // 'set f 1', //9 - 
        d = 2 // 'set d 2', //10 -

        do {
            e = 2 // 'set e 2', //11 - 

            do {
                g = d // 'set g d', //12 - 
                g = g * e // 'mul g e', //13 - 
                g = g - b // 'sub g b', //14 - 
                // 'jnz g 2', //15 - 
                f = 0 // 'set f 0', //16 - 
                e = e + 1// 'sub e -1', //17 - 
                g = e // 'set g e', //18 - 
                g = g - b // 'sub g b', //19 - 
            }
            while (g !== 0)// 'jnz g -8', //20 - 12

            d = d + 1 // 'sub d -1', //21 - 
            g = d // 'set g d', //22 - 
            g = g - b // 'sub g b', //23 -
            console.log({"a":a,"b":b,"c":c,"d":d,"e":e,"f":f,"g":g,"h":h})
        }  
        while(g !== 0)// 'jnz g -13', //24 - 11

        if (f === 0 ) {// 'jnz f 2', //25 -
            console.log('h++')
            h = h + 1// 'sub h -1', //26 - 
        }
        g = b // 'set g b', //27 - 
        console.log({
            "a":a,
            "b":b,
            "c":c,
            "d":d,
            "e":e,
            "f":f,
            "g":g,
            "h":h,
        })
        g = g - c // 'sub g c', //28 - 
        if (g === 0) {// 'jnz g 2', //29 - 
            console.log(h)
            return// 'jnz 1 3', //30 - 
        }
        b += 17 // 'sub b -17', //31 - 
    }
    while (true)// 'jnz 1 -23', //32 - 9
}