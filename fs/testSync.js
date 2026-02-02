const path = require('path');
const {
  writeFileSync,
  readFileSync,
  updateFileSync,
  deleteFileContentSync,
  cleanFileSync,
  copyFileSync,
  createFolderSync,
  deleteFolderSync,
  listFilesSync,
  cleanProjectSync
} = require('./index');

// Пути для теста
const folderPath = path.join(__dirname, 'testFolder');
const filePath = path.join(folderPath, 'test.txt');
const copyPath = path.join(folderPath, 'copy.txt');

// Создаём папку
createFolderSync(folderPath);

// Записываем данные
writeFileSync(filePath, 'Привет123, МИР!');

// Читаем данные
console.log('Чтение файла:', readFileSync(filePath));

// Изменяем данные
updateFileSync(filePath, 'Новое содержание');

// Читаем после изменения
console.log('После изменения:', readFileSync(filePath));

// Удаляем содержание
deleteFileContentSync(filePath);
console.log('После удаления:', readFileSync(filePath));

// Записываем снова и очищаем "шум"
writeFileSync(filePath, 'Hello123 WORLD!');
cleanFileSync(filePath);
console.log('После очистки шума:', readFileSync(filePath));

// Копируем файл
copyFileSync(filePath, copyPath);
console.log('Файл скопирован в:', copyPath);

// Вывод всех файлов в проекте
console.log('Список файлов в проекте:', listFilesSync());

// Удаляем папку теста
deleteFolderSync(folderPath);
console.log('Папка удалена');
