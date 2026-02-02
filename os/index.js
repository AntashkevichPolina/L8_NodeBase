const os = require('os');

// a) Основная информация об ОС
function getOSInfo() {
  console.log('Платформа:', os.platform());
  console.log('Свободная память (GB):', (os.freemem() / 1024 / 1024 / 1024).toFixed(2));
  console.log('Домашняя директория:', os.homedir());
  console.log('Имя хоста:', os.hostname());
  console.log('Сетевые интерфейсы:', os.networkInterfaces());
}

// b) Проверка свободной памяти > 4GB
function checkFreeMemory() {
  return os.freemem() / 1024 / 1024 / 1024 > 4;
}

// c) Доступ по MODE из .env
function showOSInfoByMode() {
  if (process.env.MODE === 'admin') {
    getOSInfo();
  } else {
    console.log('Недостаточно прав доступа');
  }
}

module.exports = {
  getOSInfo,
  checkFreeMemory,
  showOSInfoByMode
};
