'use strict'
// 5*. Пользователь, с помощью команды prompt, вводит номер билета - 6 цифр. Программа определяет
// является ли счастливым данный билетик и выводит соответстующее сообщение в консоль.
// Счастливый билет - билет, у которого сумма первых трех цифр равна сумме последних трех цифр номера билета.

// Предполагаю что пользователь всегда вводит только 6 цифр, никаких проверок на длину и цифровость) не делаю
let number = prompt('Введите номер билетика:');

let numbers_left = number.substr(0, 3);
let numbers_right = number.substr(3, 3);

numbers_left = parseInt(numbers_left);
numbers_right = parseInt(numbers_right);

let left_summ = 0, right_summ = 0;

for (let i = 0; i < 3; i++) {
    right_summ += number % 10;
    number = Math.trunc(number / 10);
}
for (let i = 0; i < 3; i++) {
    left_summ += number % 10;
    number = Math.trunc(number / 10);
}
if (left_summ === right_summ) {
    alert('Билетик счастливый');
} else {
    alert('Билетик не является счастливым');
}
