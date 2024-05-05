function factorial(num){
    if(num<0)
        return null
    if(num===0||num===1)
        return 1;
    factorialRes=1
    for(let i=2; i<=num; i++)
        factorialRes*=i
    return factorialRes
}

module.exports = { factorial };