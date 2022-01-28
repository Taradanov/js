// (*) С помощью рекурсии организовать функцию возведения числа в степень: function power(val, pow),
// где val – заданное число, pow – степень.


// Дробные не буду рассматривать))
function power(val, pow) {
    if (pow === 0) {
        return 1;
    } else if (pow === 1) {
        return val;
    }

    if (pow > 0) {
        return val * power(val, pow - 1)
    } else {
        return (1 / val) * power(val, pow + 1)
    }
}

console.log(power(2,2))
console.log(power(3,3))
console.log(power(2,8))

console.log(power(2,-2))
console.log(power(3,-3))
console.log(power(2,-8))

console.log(power(-3,3))
console.log(power(-3,4))

console.log(power(-3,-3))
console.log(power(-3,-4))