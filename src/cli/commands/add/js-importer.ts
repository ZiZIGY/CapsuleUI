import fs from 'fs';
import path from 'path';
import { ensureDir } from '../../filesystem';

/**
 * Утилиты для автоматического импорта JS файлов в all.js
 */

/**
 * Автоматический импорт JS файлов в @capsule/components/all.js
 */
export function importJsFiles(
  capsuleRoot: string,
  jsFiles: string[],
  prefix: string,
  kebabComponent: string
): void {
  try {
    const initJsDir = path.join(capsuleRoot, 'components');
    const initJsPath = path.join(initJsDir, 'all.js');
    ensureDir(initJsDir);

    let initContent = '';
    if (fs.existsSync(initJsPath)) {
      initContent = fs.readFileSync(initJsPath, 'utf8');
    } else {
      initContent = `// CapsuleUI components entry\n`;
    }

    let updated = false;
    for (const jf of jsFiles) {
      const importJsPath = `./${prefix}-${kebabComponent}/${jf}`;
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
        updated = true;
      }
    }

    if (updated) {
      fs.writeFileSync(initJsPath, initContent, 'utf8');
      console.log(
        `Injected imports into @capsule/components/all.js for: ${jsFiles.join(
          ', '
        )}`
      );
    } else {
      console.log('Imports already present in @capsule/components/all.js');
    }
  } catch (e) {
    console.log(
      'Warning: failed to update @capsule/components/all.js:',
      (e as Error).message
    );
  }
}
