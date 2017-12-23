let a = 1
let b = 0
let c = 0
let d = 0
let e = 0
let f = 0
let g = 0
let h = 0
b = 79// 0 set b 79
c = b// 1 set c b
// 2 jnz a 2
// 3 jnz 1 5
b = b * 100// 4 mul b 100
b = b + 100000// 5 sub b -100000
c = b// 6 set c b
c = c + 17000// 7 sub c -17000
do {
    f = 1// 8 set f 1
    d = 2// 9 set d 2
    do {
        e = 2// 10 set e 2
        do {
            g = d// 11 set g d
            g = g * e// 12 mul g e
            g = g - b// 13 sub g b
            if (g !== 0) {// 14 jnz g 2
                f = 0// 15 set f 0
            }
            e = e + 1// 16 sub e -1
            g = e// 17 set g e
            g = g - b// 18 sub g b
        }
        while (g != 0) // 19 jnz g -8
        d = d + 1// 20 sub d -1
        g = d// 21 set g d
        g = g - b// 22 sub g b
    }
    while (g != 0)// 23 jnz g -13
    if (f == 0) {// 24 jnz f 2
        h = h + 1// 25 sub h -1
    }
    g =  b// 26 set g b
    g = g - c// 27 sub g c
    if (g == 0) {// 28 jnz g 2
        debugger// 29 jnz 1 3
    }
    b = b + 17// 30 sub b -17
}
while(true)// 31 jnz 1 -23