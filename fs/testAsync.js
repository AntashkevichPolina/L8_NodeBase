const path = require('path');
const {
  writeFileAsync,
  readFileAsync,
  updateFileAsync,
  deleteFileContentAsync,
  cleanFileAsync,
  copyFileAsync,
  createFolderAsync,
  deleteFolderAsync,
  listFilesAsync
} = require('./indexAsync');

async function testAsyncFS() {
  const folderPath = path.join(__dirname, 'testFolderAsync');
  const filePath = path.join(folderPath, 'test.txt');
  const copyPath = path.join(folderPath, 'copy.txt');

  // Создаём папку
  await createFolderAsync(folderPath);

  // Записываем данные
  await writeFileAsync(filePath, 'Привет123, МИР!');

  // Читаем данные
  console.log('Чтение файла:', await readFileAsync(filePath));

  // Изменяем данные
  await updateFileAsync(filePath, 'Новое содержание');
  console.log('После изменения:', await readFileAsync(filePath));

  // Удаляем содержание
  await deleteFileContentAsync(filePath);
  console.log('После удаления:', await readFileAsync(filePath));

  // Записываем снова и очищаем "шум"
  await writeFileAsync(filePath, 'Hello123 WORLD!');
  await cleanFileAsync(filePath);
  console.log('После очистки шума:', await readFileAsync(filePath));

  // Копируем файл
  await copyFileAsync(filePath, copyPath);
  console.log('Файл скопирован в:', copyPath);

  // Вывод всех файлов
  console.log('Список файлов в проекте:', await listFilesAsync());

  // Удаляем папку теста
  await deleteFolderAsync(folderPath);
  console.log('Папка удалена');
}

testAsyncFS();
