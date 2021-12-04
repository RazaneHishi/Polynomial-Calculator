/* For this project, we will assume that polynomials are lists. 
The first index refers to the LSB, the last index refers to the MSB. 
For example:
list [0,1,1] ==> x^2 + x + 0
 */
const degree = (polynomial) => {
    while(polynomial && polynomial[-1] == 0){
        polynomial.pop();
    }
    return polynomial.length - 1; 
}
