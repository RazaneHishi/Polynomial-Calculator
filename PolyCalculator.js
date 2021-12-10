function bitCount (n) {
    return Math.floor(Math.log2(n)+1);
}

// program to convert decimal to binary
function convertToBinary(x) {
    let bin = 0;
    let rem, i = 1, step = 1;
    while (x != 0) {
        rem = x % 2;
        x = parseInt(x / 2);
        bin = bin + rem * i;
        i = i * 10;
    }
    return bin;
}

function polyModuloReduction(a, b){ //modulo reduction
    var bl;
    bl = bitCount(b);
    var shift;
    while (true){
        shift = bitCount(a) - bl;
        if (shift < 0){
            return convertToBinary(a);
        }
        a ^= b << shift;
    }
    
}

function polyModuloDivision(a, b, m){
    //Binary polynomial division.
    //Divides a by b and returns resulting (quotient, remainder) polynomials.
    //Precondition: b != 0
    var q = 0;
    var bl = bitCount(b);
    var shift;
    while (true){
        shift =  bitCount(a) - bl;
        if (shift < 0){
            q = polyModuloReduction(q, m);
            a = polyModuloReduction(a, m);
            return {"quotient" : q, "remainder": a};
        }
        q ^= 1 << shift;
        a ^= b << shift;
    }
}

function polyDivision(a, b){
    //Binary polynomial division.
    //Divides a by b and returns resulting (quotient, remainder) polynomials.
    //Precondition: b != 0
    var q = 0;
    var bl = bitCount(b);
    var shift;
    while (true){
        shift =  bitCount(a) - bl;
        if (shift < 0){
            // q = polyModuloReduction(q, m);
            // a = polyModuloReduction(a, m);
            return {"quotient" : convertToBinary(q), "remainder": convertToBinary(a)};
        }
        q ^= 1 << shift;
        a ^= b << shift;
    }
}


function polyMultiplication(a, b, m){
    var result = 0;
    while (a && b){
        if (a & 1){
            result ^= b;
        }
        a >>= 1;
        b <<= 1;
    }
    return convertToBinary(result);
}

function polyModuloMultiplication(a, b, m){
    var result = 0;
    var deg = bitCount(b) - 1;

    var assert = require('assert');
    assert(bitCount(b) - 1 <= deg); 
    while (a && b){
        if (a & 1){
            result ^= b;
        }
        a >>= 1;
        b <<= 1;
        if ((b >> deg) & 1){
            b ^= m;
        } 
    }
    return polyModuloReduction(result, m);
}

function inverse(a, m){
    inv = p_egcd(a, m);

    var d = inv[1];
    var x = inv[2];
    var y = inv[3];
    
    if(d == 1){
        return x;
    }
    return -1;
} 

function p_egcd(a, b){
    let A = {"1": convertToBinary(a), "2": 1, "3": 0};
    let B = {"1": convertToBinary(b), "2": 0, "3": 1};
    console.log("A: " + A[1] +"   " + "   " + A[2] +"   "+ A[3])
    console.log("B: " + B[1] +"   " + "   " + B[2] +"   "+ B[3])
    console.log("-----")
    while (true){
        var div = polyDivision(A[1], B[1]);
        var q = div.quotient; 
        var r = div.remainder;
        if(!r){
            return B; 
        }

        A[1] = B[1]; A[2] = B[2]; A[3] = B[3];
        
        console.log("B2 = " + B[22] + " quot = " + q + " XOR = " + (A[2] ^ polyMultiplication(q, B[2])))
        B[1] = r;
        B[2] = (A[2] ^ polyMultiplication(q, B[2]));
        B[3] = (A[3] ^ polyMultiplication(q, B[3]));

        console.log("A: " + A[1] +"   " + "   " + A[2] +"   "+ A[3])
        console.log("B: " + B[1] +"   " + "   " + B[2] +"   "+ B[3])
    }
}

function add_sub(a, b, m){     // addition and subtraction of ploynomials result in the same binary representation, since -1 = 1 mod 2
    var assert = require('assert');
    var bit_a = bitCount(a);
    var bit_b = bitCount(b);

    assert((bit_a-1 == m) && (bit_b-1 == m), "One of your inputs does not belong to the required Galois Field.");
    var result;
    console.log("a = " + convertToBinary(a));
    console.log("b = " + convertToBinary(b));
    result = a ^ b;
    return convertToBinary(result);
}




    var res = polyModuloReduction( 0b10001111, 0b11000111111)
    console.log("a/b mod m = " + res)
    
    var x = 0b100
    var y = 0b100
    var m = 0b10011
    var div = inverse(y,m)
    // console.log(div)
    console.log("x^-1 mod m : " + div)
    // q: 101011001 --> 011
    // rem: 01010 --> 111


    console.log((polyMultiplication(0b11011, 0b1011)))
    console.log((polyModuloReduction(0b1011, 0b0111)))
    console.log((add_sub(0b110000100, 0b110001101, 8)))