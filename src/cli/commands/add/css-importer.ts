import fs from 'fs';
import path from 'path';

/**
 * Утилиты для автоматического импорта CSS файлов в global.css
 */

/**
 * Автоматический импорт CSS файлов в global.css
 */
export function importCssFiles(
  capsuleRoot: string,
  cssFiles: string[],
  prefix: string,
  kebabComponent: string
): void {
  if (cssFiles.length === 0) return;

  console.log(`CSS files saved: ${cssFiles.join(', ')}`);

  try {
    const globalCssPath = path.join(capsuleRoot, 'global.css');
    if (!fs.existsSync(globalCssPath)) {
      console.log(
        'Warning: @capsule/global.css not found. Skipped auto-import.'
      );
      return;
    }

    let globalCss = fs.readFileSync(globalCssPath, 'utf8');

    // Вставляем каждый импорт первой строкой (в обратном порядке, чтобы итоговый порядок совпал с исходным списком)
    for (let i = cssFiles.length - 1; i >= 0; i--) {
      const cssf = cssFiles[i];
      const importPath = `./components/${prefix}-${kebabComponent}/${cssf}`;
      const alreadyImported = new RegExp(
        String.raw`@import\s+url\(['\"]?${importPath.replace(
          /[-\/\\.^$*+?()|\[\]{}]/g,
          (r) => r
        )}['\"]?\)\s*;`
      ).test(globalCss);

      if (!alreadyImported) {
        const importLine = `@import url('${importPath}');`;
        const lines = globalCss.split(/\r?\n/);
        lines.splice(0, 0, importLine);
        globalCss = lines.join('\n');
      }
    }

    if (!globalCss.endsWith('\n')) globalCss += '\n';
    fs.writeFileSync(globalCssPath, globalCss, 'utf8');
    console.log(
      `Injected imports into @capsule/global.css for: ${cssFiles.join(', ')}`
    );
  } catch (e) {
    console.log(
      'Warning: failed to update @capsule/global.css:',
      (e as Error).message
    );
  }
}
