function bitCount (n) {
    return Math.floor(Math.log2(n)+1);
}
//convert From binary to polynomial
function convertFromBinaryToPoly(binaryString) {
    console.log(binaryString);
    console.log( typeof binaryString);
    if (binaryString.charAt(binaryString.length-1) == '1') {
        var s = "+1";
    }
    else {
        var s = "";
    }
    i = binaryString.length-2;
    while (i >= 0) {
        if (binaryString.charAt(i) == '1') {
            s = "x^" + (binaryString.length - i-1).toString() + s;
            s = "+" + s;
        }
        i = i-1;
    }
    console.log(s);
    ans = s.substring(1,s.length)
    console.log(ans);
    return ans;
}
//convert from hex to binary
function hex2bin(hex){
    return ((parseInt(hex, 16)).toString(2));
}
//convert from polynomial to binary
function convertFromPolyToBinary(polyString) {
    //Remove spaces and split at the +s
    arrNoSpace = polyString.split(" ");
    strNoSpace = "";
    for (i = 0; i < arrNoSpace.length; i++) {
        strNoSpace = strNoSpace + arrNoSpace[i];
    }
    splitted = strNoSpace.split("+");
    //Construct original array
    binResult = "0b"
    var binResultArr = []
    if (splitted[0] == "1") {
        var m = 1;
    }
    else {
        m = splitted[0].charAt(splitted[0].length-1)
    }
    for (i = 0; i <= m; i++) {
        binResultArr.push("0");
    }
    var start = 1;
    if (splitted[splitted.length-1] == "1"){
        binResultArr[binResultArr.length-1] = "1";
        var str = splitted[splitted.length-2];
        if (str.charAt(str.length-1) == "1") {
            binResultArr[binResultArr.length-2] = "1"
            start = 3;
        }
        else {
            start = 2;
        }
    }
    for (i = splitted.length-start; i >= 0; i--) {
        var str = splitted[i];
        var pwr = str.charAt(str.length-1);
        if (str.charAt(0) % 2 != 0) {
            binResultArr[i] = "1";
        }
    }
    for (i = 0; i < binResultArr.length; i++){
        binResult = binResult + binResultArr[i];
    }
    return binResult;
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
    console.log("checken ", a, b);
    var shift;
    while (true){
        shift = bitCount(a) - bl;
        if (shift < 0){
            console.log("a: ",a);
            a = convertToBinary(a);
            console.log(a);
            return a;
        }
        a ^= b << shift;
    }
    
}

function polyModuloDivision(a, b, m){
    //Binary polynomial division.
    //Divides a by b and returns resulting (quotient, remainder) polynomials.
    //Precondition: b != 0
    switch(m) {
        case "2":
            m = "0b111";
            break;
        case "3":
            m = "0b1101";
            break;
        case "4":
            m = "0b11001";
            break;
        case "5":
            m = "0b100101";
            break;
        case "6":
            m = "0b1000011";
            break;
        case "7":
            m = "0b10000011";
            break;
           case "8":
            m = "0b100011011";
    }
    console.log(typeof a);
    console.log("checking",a,b,m)
    var q = 0;
    var bl = bitCount(b);
    var shift;
    while (true){
        shift =  bitCount(a) - bl;
        if (shift < 0){
            console.log("checken agein", q,a)
            q = polyModuloReduction(q, m);
            a = polyModuloReduction(a, m);
            console.log("q:", q);   
            console.log("a:", a);
            return {"quotient" : q, "remainder": a};
        }
        q ^= 1 << shift;
        a ^= b << shift;
    }
}





function polyModuloMultiplication(a, b, m){
    switch(m) {
        case "2":
            m = "0b111";
            break;
        case "3":
            m = "0b1101";
            break;
        case "4":
            m = "0b11001";
            break;
        case "5":
            m = "0b100101";
            break;
        case "6":
            m = "0b1000011";
            break;
        case "7":
            m = "0b10000011";
            break;
        case "8":
            m = "0b100011011";
    }

    console.log("a: ", typeof a, " b: ",typeof b ," m: ",typeof m);
    console.log("a: ", a, " b: ",b ," m: ",m);
    var result = 0;
    var deg = bitCount(b)-1;
    if (bitCount(b) - 1 > deg) {
        return -1
    }
    while (a && b){
        if (a & 1){
            result ^= b;
        }
        a >>= 1;
        b <<= 1;x
        if ((b >> deg) & 1){
            b ^= m;
        } 
    }
    console.log("result: ",result)
    console.log("resultbin: ",result.toString(2))
    return polyModuloReduction(result, m);
}
function polyMultiplication(a, b, m){
    var result = 0;
    console.log("a, b inside polyMultiplication:", a, b);
    while (a && b){
        if (a & 1){
            result ^= b;
        }
        a >>= 1;
        b <<= 1;
    }
    console.log("multiplication inside function result", result)
    console.log("multiplication inside function binary result", convertToBinary(result))
    return convertToBinary(result);
}
function polyDivision(a, b){
    //Binary polynomial division.
    //Divides a by b and returns resulting (quotient, remainder) polynomials.
    //Precondition: b != 0
    console.log("checking type and value of a and b in division: ");
    console.log("0b" + a, "0b" + b);
    console.log(typeof a, typeof b);
    a = "0b" + a;
    b = "0b" + b;
    var q = 0;
    var bl = bitCount(b);
    var shift = 2;
    while (true){
        console.log("checking type and value of q and a in division loop: ");
        console.log(q, a);
        console.log(typeof q, typeof q);
        shift =  bitCount(a) - bl;
        if (shift < 0){
            // q = polyModuloReduction(q, m);
            // a = polyModuloReduction(a, m);
            console.log("checking type and value of q and a in division end of loop: ");
            console.log(q, a);
            console.log(typeof convertToBinary(q), typeof convertToBinary(a));
            return {"quotient" : q, "remainder": a};
        }
        console.log("checking type of q and a BEFORE the shifting");
        console.log(q, a);
        q ^= 1 << shift;
        a ^= b << shift;
        console.log("checking type of q and a after the shifting");
        console.log(q, a);
    }
}
function inverse(b, m){
    switch(m) {
        case "2":
            m = "0b111";
            break;
        case "3":
            m = "0b1101";
            break;
        case "4":
            m = "0b11001";
            break;
        case "5":
            m = "0b100101";
            break;
        case "6":
            m = "0b1000011";
            break;
        case "7":
            m = "0b10000011";
            break;
        case "8":
            m = "0b100011011";
    }
    inv = p_egcd(b, m);
    if(inv[3] == 1){
        return inv[2];
    }
    return -1;
} 

function p_egcd(m, b){
    console.log("Checking types and values of b and m: ")
    console.log(b, m)
    console.log(typeof b, typeof m)
    let A = {"1": 1, "2": 0, "3": convertToBinary(m)}; // m stored here
    let B = {"1": 0, "2": 1, "3": convertToBinary(b)}; // b stored here
    console.log("A: " + A[1] +"   " + "   " + A[2] +"   "+ A[3])
    console.log("B: " + B[1] +"   " + "   " + B[2] +"   "+ B[3])
    console.log("m is: ", A[3])
    console.log("B is: ", B[3])
    console.log("-----")
    let temp = {"1":0,"2":0,"3":0};
    while (true){
        console.log("Checking types and values of A[3] and B[3] ")
        console.log(A[3], B[3])
        console.log(typeof A[3], typeof B[3])
        var div = polyDivision(A[3], B[3]);
        console.log("Checking types and values of div quotient and remainder line 266")
        
        var q = div.quotient; 
        var r = div.remainder;
        console.log(convertToBinary(q), convertToBinary(r))
        console.log(typeof q, typeof r)
        if(!r){
            return B; 
        }

        console.log("Checking types and values of A,B, and temp")
        temp[1] = A[1];
        temp[2] = A[2]; 
        temp[3] = A[3];
        A[1] = B[1]; A[2] = B[2]; A[3] = B[3];
        
        console.log("B2 = " + B[2] + " quot = " + convertToBinary(q) + " XOR = " + (temp[2] ^ polyMultiplication(q, B[2])))
        B[3] = convertToBinary(r);
        console.log("multiplying" , "0b" + convertToBinary(q), "0b" + B[2]);
        
        var tempans1 = polyMultiplication("0b" + convertToBinary(q), "0b" + B[2]);
        console.log("tempans1", tempans1, "tempans1 bin", convertToBinary(tempans1));
        var tempans2 = add_sub(("0b" + temp[2]),("0b" + tempans1));
        console.log("testing here");
        console.log("tempans", tempans1, tempans2, temp[2])
        B[2] = tempans2;
        console.log("0b" + convertToBinary(q), "0b" + convertToBinary(B[1]));
        var tempans1 = polyMultiplication("0b" + convertToBinary(q), "0b" + convertToBinary(B[1]));
        var tempans2 = add_sub(("0b" + temp[1]),("0b" + tempans1));
        console.log("tempans", tempans1, tempans2, temp[2])
        B[1] = tempans2;
        
        console.log("A: " + A[1] +"   " + "   " + A[2] +"   "+ A[3])
        console.log("B: " + B[1] +"   " + "   " + B[2] +"   "+ B[3])
    }
}

function add_sub(a, b, m){     // addition and subtraction of ploynomials result in the same binary representation, since -1 = 1 mod 2
    console.log(typeof a,typeof b,typeof m);
    var bit_a = bitCount(a);
    var bit_b = bitCount(b);
    if ((bit_a-1 == m) && (bit_b-1 == m)) {
        return -1;
    }
    var result;
    console.log("a = " + a);
    console.log("b = " + b);
    result = a ^ b;
    console.log("Result:", result)
    console.log("Resultbin :", convertToBinary(result))
    return convertToBinary(result);
}




    // var res = polyModuloReduction( 0b10001111, 0b11000111111)
    // console.log("a/b mod m = " + res)
    
    var x = 0b100
    var m = 0b100011011
    var y = 0b10000011
    //var div = inverse(m,y) //big then small
    // console.log(div)
    //console.log("x^-1 mod m : " + div)
    // q: 101011001 --> 011
    // rem: 01010 --> 111
    //var div = polyDivision(y,m);
    //console.log(div.quotient, div.remainder);
    //var ans = polyMultiplication(0b10,0b11101)
    //console.log(ans)
    // console.log((polyMultiplication(0b11011, 0b1011)))
    // console.log((polyModuloReduction(0b1011, 0b0111)))
    // console.log((add_sub(0b110000100, 0b110001101, 8)))