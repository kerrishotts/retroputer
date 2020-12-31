function ftoa(f, {p = 10} = {}) {
    let a = "";
    const integerPortion = Math.trunc(f);
    a += integerPortion.toString();
    a += ".";
    const decimalPortion = Math.round(Math.abs(f - integerPortion) * Math.pow(10, p + 1));
    let divisor = Math.pow(10,p);
    while (p >= 0) {
        const digit = Math.trunc((decimalPortion / divisor) % 10);
        const char = String.fromCharCode(48 + digit);
        a += char;
        p = p - 1;
        divisor = Math.pow(10,p);
    }
    a = a.replace(/0*$/g,"");
    a = a.replace(/\.*$/g,"");
    return a;
}

console.log(ftoa(5322.5493009354))
console.log(ftoa(5322.1))
console.log(ftoa(5322))
console.log(ftoa(Math.PI), Math.PI)
console.log(ftoa(22/7))
console.log(ftoa(12/5))
console.log(ftoa(Math.E))