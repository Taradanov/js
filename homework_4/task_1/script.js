'use strict'
// Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы должны получить
// на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни.
// Например, для числа 245 мы должны получить следующий объект: {'единицы': 5, 'десятки': 4, 'сотни': 2}.
// Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
const digit = {
    number: NaN,
    firstDigit: NaN,
    secondDigit: NaN,
    thirdDigit: NaN,
    numberIsNaN() {
        return isNaN(this.number)
    },
    inputNumber() {
        const inputDigit = parseInt(prompt('Введите трехзначное число'))
        if (!this.numberIsNaN() && inputDigit < 1000 && inputDigit >= 0) {
            this.number = inputDigit;
        }
    },
    calculateDigits() {
        this.firstDigit = this.number % 10;
        this.secondDigit = Math.floor(this.number / 10) % 10;
        this.thirdDigit = Math.floor(this.number / 100);
    },
    showDigits() {
        if (this.numberIsNaN()) {
            alert('Вы ввели не число или число больше 999');
            return;
        }
        alert(`единицы ${this.firstDigit}, десятки ${this.secondDigit}, сотни ${this.thirdDigit}`);
    }
}
digit.inputNumber();
digit.calculateDigits()
digit.showDigits()