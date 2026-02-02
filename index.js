require('dotenv').config();

// данные из .env
const { FIRST_NAME, LAST_NAME, GROUP, LIST_NUMBER } = process.env;

console.log('Имя:', FIRST_NAME);
console.log('Фамилия:', LAST_NAME);
console.log('Группа:', GROUP);
console.log('Номер по списку:', LIST_NUMBER);

// подключение OS модуля
const { showOSInfoByMode, checkFreeMemory } = require('./os');

showOSInfoByMode();
console.log('Свободной памяти больше 4GB:', checkFreeMemory());
