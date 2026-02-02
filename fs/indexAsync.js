const fs = require('fs').promises;
const path = require('path');

// Функция записи в файл
async function writeFileAsync(filePath, data) {
  await fs.writeFile(filePath, data, 'utf8');
}

// Функция чтения из файла
async function readFileAsync(filePath) {
  return await fs.readFile(filePath, 'utf8');
}

// Функция изменения информации в файле (полная перезапись)
async function updateFileAsync(filePath, newData) {
  await fs.writeFile(filePath, newData, 'utf8');
}

// Функция удаления информации в файле
async function deleteFileContentAsync(filePath) {
  await fs.writeFile(filePath, '', 'utf8');
}

// Функция очистки "шума" из файла (удаление цифр и перевод больших букв в маленькие)
async function cleanFileAsync(filePath) {
  let data = await fs.readFile(filePath, 'utf8');
  data = data.replace(/\d+/g, '').toLowerCase();
  await fs.writeFile(filePath, data, 'utf8');
}

// Функция копирования файла
async function copyFileAsync(src, dest) {
  await fs.copyFile(src, dest);
}

// Функция создания папки
async function createFolderAsync(folderPath) {
  try {
    await fs.mkdir(folderPath, { recursive: true });
  } catch (err) {
    console.error(err);
  }
}

// Функция удаления папки
async function deleteFolderAsync(folderPath) {
  try {
    await fs.rm(folderPath, { recursive: true, force: true });
  } catch (err) {
    console.error(err);
  }
}

// Функция вывода путей ко всем файлам в проекте (кроме служебных)
async function listFilesAsync(dirPath = process.cwd(), result = []) {
  const files = await fs.readdir(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stats = await fs.stat(fullPath);
    if (stats.isDirectory()) {
      await listFilesAsync(fullPath, result);
    } else if (!file.startsWith('.') && file !== 'package.json') {
      result.push(fullPath);
    }
  }
  return result;
}

// Функция удаления всех файлов и папок кроме служебных
async function cleanProjectAsync(dirPath = process.cwd()) {
  const files = await fs.readdir(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stats = await fs.stat(fullPath);
    if (stats.isDirectory()) {
      await cleanProjectAsync(fullPath);
      await fs.rm(fullPath, { recursive: true, force: true });
    } else if (!file.startsWith('.') && file !== 'package.json') {
      await fs.unlink(fullPath);
    }
  }
}

module.exports = {
  writeFileAsync,
  readFileAsync,
  updateFileAsync,
  deleteFileContentAsync,
  cleanFileAsync,
  copyFileAsync,
  createFolderAsync,
  deleteFolderAsync,
  listFilesAsync,
  cleanProjectAsync
};
