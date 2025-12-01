import fs from 'fs';
import path from 'path';
import { ensureDir } from '../../filesystem';

/**
 * Утилита для автоматического импорта/удаления модулей в главный index.js
 * Импортирует/удаляет index.js модуля в @capsule/index.js
 */

/**
 * Автоматический импорт модуля в @capsule/index.js
 * Ищет index.js в модуле и добавляет его импорт
 */
export function importModule(
  capsuleRoot: string,
  moduleName: string
): void {
  try {
    const mainIndexPath = path.join(capsuleRoot, 'index.js');
    
    // Проверяем, что index.js модуля существует
    const moduleIndexPath = path.join(capsuleRoot, 'modules', moduleName, 'index.js');
    if (!fs.existsSync(moduleIndexPath)) {
      console.log(
        `Warning: index.js not found in module ${moduleName}, skipping import.`
      );
      return;
    }

    ensureDir(capsuleRoot);

    let indexContent = '';
    if (fs.existsSync(mainIndexPath)) {
      indexContent = fs.readFileSync(mainIndexPath, 'utf8');
    } else {
      indexContent = `// CapsuleUI components entry\n`;
    }

    // Путь для импорта модуля
    const importModulePath = `./modules/${moduleName}/index.js`;
    
    // Проверяем, нет ли уже такого импорта
    const alreadyHasImport = new RegExp(
      String.raw`^\s*import\s+['\"]${importModulePath.replace(
        /[-\/\\.^$*+?()|\[\]{}]/g,
        (r) => '\\' + r
      )}['\"];?\s*$`,
      'm'
    ).test(indexContent);

    if (!alreadyHasImport) {
      // Добавляем импорт модуля в конец файла
      // Если секции для модулей нет, добавляем её перед импортом
      const hasModulesSection = indexContent.includes('// Import all modules');
      if (!hasModulesSection) {
        indexContent +=
          (indexContent.endsWith('\n') ? '' : '\n') +
          `\n// Import all modules\n`;
      }
      indexContent += `import './modules/${moduleName}/index.js';\n`;

      fs.writeFileSync(mainIndexPath, indexContent, 'utf8');
      console.log(
        `Injected module import into @capsule/index.js for: ${moduleName}`
      );
    } else {
      console.log(
        `Module import already present in @capsule/index.js for: ${moduleName}`
      );
    }
  } catch (e) {
    console.log(
      'Warning: failed to update @capsule/index.js:',
      (e as Error).message
    );
  }
}

/**
 * Удаление импорта модуля из @capsule/index.js
 */
export function removeModuleImport(
  capsuleRoot: string,
  moduleName: string
): void {
  try {
    const mainIndexPath = path.join(capsuleRoot, 'index.js');
    
    if (!fs.existsSync(mainIndexPath)) {
      return;
    }

    let indexContent = fs.readFileSync(mainIndexPath, 'utf8');
    
    // Путь для импорта модуля
    const importModulePath = `./modules/${moduleName}/index.js`;
    
    // Удаляем импорт модуля
    const importRegex = new RegExp(
      String.raw`^\s*import\s+['\"]${importModulePath.replace(
        /[-\/\\.^$*+?()|\[\]{}]/g,
        (r) => '\\' + r
      )}['\"];?\s*$\n?`,
      'gm'
    );
    
    const newContent = indexContent.replace(importRegex, '');
    
    if (newContent !== indexContent) {
      fs.writeFileSync(mainIndexPath, newContent, 'utf8');
      console.log(
        `Removed module import from @capsule/index.js for: ${moduleName}`
      );
    }
  } catch (e) {
    console.log(
      'Warning: failed to remove module import from @capsule/index.js:',
      (e as Error).message
    );
  }
}
