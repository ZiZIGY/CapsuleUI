import fs from 'fs';
import path from 'path';

/**
 * Обработка компонентов - минификация, переименование файлов
 */

/**
 * Обработка JS файлов - минификация и удаление import/export
 * register.js обрабатывается отдельно - только минификация, без удаления import/export
 */
export function processJsFiles(
  destComponentDir: string,
  jsFiles: string[],
): void {
  for (const jf of jsFiles) {
    const jsPath = path.join(destComponentDir, jf);
    let jsCode = fs.readFileSync(jsPath, 'utf8');

    // Для register.js - просто копируем исходник
    if (jf === 'register.js') {
      fs.writeFileSync(jsPath, jsCode, 'utf8');
      continue;
    }

    fs.writeFileSync(jsPath, jsCode, 'utf8');
  }
}

/**
 * Переименование основных файлов компонента с правильным префиксом
 */
export function renameComponentFiles(
  destComponentDir: string,
  kebabComponent: string,
  prefix: string
): string[] {
  const files = fs.readdirSync(destComponentDir);
  for (const file of files) {
    if (file !== 'index.js' && file.startsWith(kebabComponent)) {
      const newFileName = `${prefix}-${kebabComponent}${file.slice(
        kebabComponent.length
      )}`;
      const oldPath = path.join(destComponentDir, file);
      const newPath = path.join(destComponentDir, newFileName);
      fs.renameSync(oldPath, newPath);
    }
  }

  // Возвращаем обновленный список файлов
  return fs.readdirSync(destComponentDir);
}

/**
 * Очистка временных файлов
 */
export function cleanupTempFiles(destComponentDir: string): void {
  const indexPath = path.join(destComponentDir, 'index.js');
  if (fs.existsSync(indexPath)) {
    fs.unlinkSync(indexPath);
  }
}
