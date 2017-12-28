solve()
function solve() {
    let b = 107900
    let c = 124900
    let h = 0

    do {

        if (!isPrime(b)) {// 'jnz f 2', //25 -
            console.log(h)
            h = h + 1// 'sub h -1', //26 - 
        }
        if (b - c === 0) {// 'jnz g 2', //29 - 
            console.log(h)
            return// 'jnz 1 3', //30 - 
        }
        b = b + 17
    }
    while (true)// 'jnz 1 -23', //32 - 9

    function isPrime(num) {
        for(var i = 2; i < num; i++)
          if(num % i === 0) return false;
        return num !== 1;
      }
}