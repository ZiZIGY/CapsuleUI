import fs from 'fs';
import path from 'path';
import { ensureDir } from '../../filesystem';

/**
 * Утилиты для автоматического импорта JS файлов в all.js
 */

/**
 * Автоматический импорт JS файлов в @capsule/components/all.js
 * Всегда импортируем register.js для правильной последовательности загрузки компонентов
 */
export function importJsFiles(
  capsuleRoot: string,
  jsFiles: string[],
  prefix: string,
  kebabComponent: string
): void {
  try {
    const initJsDir = path.join(capsuleRoot);
    const initJsPath = path.join(initJsDir, 'index.js');
    ensureDir(initJsDir);

    let initContent = '';
    if (fs.existsSync(initJsPath)) {
      initContent = fs.readFileSync(initJsPath, 'utf8');
    } else {
      initContent = `// CapsuleUI components entry\n`;
    }

    // Всегда ищем register.js файл
    const registerFile = jsFiles.find((f) => f === 'register.js');

    if (!registerFile) {
      throw new Error(`register.js not found for component ${kebabComponent}`);
    }

    // Импортируем только register.js
    const importJsPath = `./${prefix}-${kebabComponent}/${registerFile}`;
    const alreadyHasImport = new RegExp(
      String.raw`^\s*import\s+['\"]${importJsPath.replace(
        /[-\/\\.^$*+?()|\[\]{}]/g,
        (r) => r
      )}['\"];?\s*$`,
      'm'
    ).test(initContent);

    if (!alreadyHasImport) {
      initContent +=
        (initContent.endsWith('\n') ? '' : '\n') +
        `import '${importJsPath}';\n`;

      fs.writeFileSync(initJsPath, initContent, 'utf8');
      console.log(
        `Injected register.js import into @capsule/components/all.js for: ${prefix}-${kebabComponent}`
      );
      console.log(
        `Using register.js for component ${kebabComponent} (ensures correct loading order)`
      );
    } else {
      console.log(
        'Register.js import already present in @capsule/components/all.js'
      );
    }
  } catch (e) {
    console.log(
      'Warning: failed to update @capsule/components/all.js:',
      (e as Error).message
    );
  }
}
