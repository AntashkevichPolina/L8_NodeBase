const fs = require('fs');
const path = require('path');

// Функция записи в файл
function writeFileSync(filePath, data) {
  fs.writeFileSync(filePath, data, 'utf8');
}

// Функция чтения из файла
function readFileSync(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

// Функция изменения информации в файле (полная перезапись)
function updateFileSync(filePath, newData) {
  fs.writeFileSync(filePath, newData, 'utf8');
}

// Функция удаления информации в файле
function deleteFileContentSync(filePath) {
  fs.writeFileSync(filePath, '', 'utf8');
}

// Функция очистки "шума" из файла (удаление цифр и перевод больших букв в маленькие)
function cleanFileSync(filePath) {
  let data = fs.readFileSync(filePath, 'utf8');
  data = data.replace(/\d+/g, '').toLowerCase();
  fs.writeFileSync(filePath, data, 'utf8');
}

// Функция копирования файла
function copyFileSync(src, dest) {
  fs.copyFileSync(src, dest);
}

// Функция создания папки
function createFolderSync(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
}

// Функция удаления папки
function deleteFolderSync(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.rmdirSync(folderPath, { recursive: true });
  }
}

// Функция вывода путей ко всем файлам в проекте (кроме служебных)
function listFilesSync(dirPath = process.cwd(), result = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      listFilesSync(fullPath, result);
    } else if (!file.startsWith('.') && file !== 'package.json') {
      result.push(fullPath);
    }
  });
  return result;
}

// Функция удаления всех файлов и папок кроме служебных
function cleanProjectSync(dirPath = process.cwd()) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      cleanProjectSync(fullPath);
      fs.rmdirSync(fullPath, { recursive: true });
    } else if (!file.startsWith('.') && file !== 'package.json') {
      fs.unlinkSync(fullPath);
    }
  });
}

module.exports = {
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
};
