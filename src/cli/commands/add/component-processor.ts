import fs from 'fs';
import path from 'path';

/**
 * Обработка компонентов - объединение variants, минификация, переименование файлов
 */

/**
 * Объединение variants файла с основными JS файлами
 * register.js обрабатывается отдельно - только минификация, без удаления import/export
 */
export function mergeVariantsWithJsFiles(
  destComponentDir: string,
  jsFiles: string[],
  variantsFile: string,
  minify: boolean,
  minifyFn: (code: string) => string
): void {
  for (const jf of jsFiles) {
    const jsPath = path.join(destComponentDir, jf);
    let jsCode = fs.readFileSync(jsPath, 'utf8');

    // Для register.js - только минификация, без обработки variants и удаления import/export
    if (jf === 'register.js') {
      if (minify) {
        jsCode = minifyFn(jsCode);
      }
      fs.writeFileSync(jsPath, jsCode, 'utf8');
      continue;
    }

    // Обычная обработка для остальных JS файлов
    if (variantsFile) {
      const variantsPath = path.join(destComponentDir, variantsFile);
      let variantsCode = fs.readFileSync(variantsPath, 'utf8');
      variantsCode = variantsCode.replace(/export\s+const\s+/, 'const ');
      jsCode = variantsCode + '\n\n' + jsCode;
    }

    // Удалить import/export для native build
    jsCode = jsCode.replace(/import[^;]+;?/g, '').replace(/export\s+/g, '');

    // Минификация если указано
    if (minify) {
      jsCode = minifyFn(jsCode);
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
export function cleanupTempFiles(
  destComponentDir: string,
  variantsFile?: string
): void {
  if (variantsFile) {
    fs.unlinkSync(path.join(destComponentDir, variantsFile));
  }
  const indexPath = path.join(destComponentDir, 'index.js');
  if (fs.existsSync(indexPath)) {
    fs.unlinkSync(indexPath);
  }
}
