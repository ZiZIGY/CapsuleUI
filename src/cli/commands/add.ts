import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createSpinner, findTemplatesDir } from '../utils';
import { copyDir, ensureDir } from '../filesystem';
// Get __dirname in ESM module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Console colors
const colors = {
  blue: (text: string) => `\x1b[34m${text}\x1b[0m`,
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
  cyan: (text: string) => `\x1b[36m${text}\x1b[0m`,
};

// Вспомогательная функция для kebab-case
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export const add = {
  command: 'add <component>',
  description: 'Add a component to your project',
  options: [
    {
      flags: '-p, --prefix <prefix>',
      description: 'Custom element prefix (e.g. ui)',
      defaultValue: '',
    },
    {
      flags: '-m, --minify',
      description: 'Minify resulting JS',
      defaultValue: false,
    },
  ],
  action: async (
    component: string,
    options: {
      prefix?: string;
      minify?: boolean;
    }
  ) => {
    const spinner = createSpinner(
      `Installing component ${colors.blue(component)}...`
    );

    // Простая минификация JS (без внешних зависимостей)
    function minifyJs(source: string): string {
      try {
        let code = source;
        // удалить блок-комментарии
        code = code.replace(/\/\*[\s\S]*?\*\//g, '');
        // удалить строковые комментарии (не в URL)
        code = code.replace(/(^|[^:])\/\/.*$/gm, '$1');
        // удалить лишние переводы строк
        code = code.replace(/\r?\n+/g, '\n');
        // убрать отступы в началах строк
        code = code.replace(/^\s+/gm, '');
        // схлопнуть множественные пробелы
        code = code.replace(/\s{2,}/g, ' ');
        // убрать пробелы вокруг символов
        code = code.replace(/\s*([{}();,:])\s*/g, '$1');
        return code.trim();
      } catch {
        return source;
      }
    }

    (async function () {
      try {
        const projectDir = process.cwd();
        const templateDir = findTemplatesDir(__dirname);
        const componentPath = path.join(templateDir, component);
        if (!fs.existsSync(componentPath)) {
          spinner.fail(`Component ${colors.red(component)} not found`);

          // Show available components
          const availableComponents = fs
            .readdirSync(templateDir)
            .filter((file) =>
              fs.statSync(path.join(templateDir, file)).isDirectory()
            );

          if (availableComponents.length > 0) {
            console.log(colors.yellow('\nAvailable components:'));
            availableComponents.forEach((comp) => {
              console.log(`  - ${comp}`);
            });
          } else {
            console.log(
              colors.yellow('\nNo available components in templates.')
            );
          }

          process.exit(1);
        }

        // Find @capsule folder anywhere in the project (ignore heavy/system dirs)
        function findCapsuleRoot(root: string): string | null {
          const skip = new Set(['.git', 'node_modules', 'dist', 'build']);
          const stack: string[] = [root];
          while (stack.length) {
            const current = stack.pop() as string;
            let entries: fs.Dirent[] = [];
            try {
              entries = fs.readdirSync(current, { withFileTypes: true });
            } catch {
              continue;
            }
            for (const entry of entries) {
              if (!entry.isDirectory()) continue;
              if (skip.has(entry.name)) continue;
              const full = path.join(current, entry.name);
              if (entry.name === '@capsule') return full;
              stack.push(full);
            }
          }
          return null;
        }

        const capsuleRoot = findCapsuleRoot(projectDir);
        if (!capsuleRoot) {
          spinner.fail(
            `Could not find '@capsule' folder in the project. Run 'capsule init' first.`
          );
          process.exit(1);
        }

        const destDir = path.join(capsuleRoot, 'components');
        ensureDir(destDir);
        let prefix = options.prefix;
        if (!prefix) {
          prefix = await new Promise<string>((resolve) => {
            const rl = require('readline').createInterface({
              input: process.stdin,
              output: process.stdout,
            });
            rl.question(
              'Enter custom element prefix (e.g. ui): ',
              (answer: string) => {
                rl.close();
                resolve(answer.trim() || 'ui');
              }
            );
          });
        }
        const kebabComponent = toKebabCase(component);
        const destComponentDir = path.join(
          destDir,
          `${prefix}-${kebabComponent}`
        );
        copyDir(componentPath, destComponentDir);
        // --- Замена плейсхолдеров во всех файлах компонента ---
        function replacePlaceholdersInFile(filePath: string) {
          if (!fs.statSync(filePath).isFile()) return;
          let content = fs.readFileSync(filePath, 'utf8');
          content = content.replace(/__PREFIX__/g, prefix || 'ui');
          content = content.replace(/__COMPONENT__/g, kebabComponent);
          fs.writeFileSync(filePath, content, 'utf8');
        }
        function walkDirAndReplace(dir: string) {
          const entries = fs.readdirSync(dir, { withFileTypes: true });
          for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
              walkDirAndReplace(fullPath);
            } else {
              replacePlaceholdersInFile(fullPath);
            }
          }
        }
        walkDirAndReplace(destComponentDir);
        // После walkDirAndReplace: корректно переименовать только нужные файлы
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
        // После переименования обновим список файлов
        const renamedFiles = fs.readdirSync(destComponentDir);

        // Новая логика: всегда native сборка
        const jsFile = renamedFiles.find(
          (f) =>
            f.endsWith('.js') &&
            !f.endsWith('.variants.js') &&
            !f.endsWith('index.js')
        );
        const variantsFile = renamedFiles.find((f) =>
          f.endsWith('.variants.js')
        );
        const styleFile = renamedFiles.find((f) => f.endsWith('.style.css'));
        const readmeFile = renamedFiles.find((f) => f.endsWith('.md'));

        if (!jsFile) throw new Error('Не найден основной js-файл компонента');

        const jsPath = path.join(destComponentDir, jsFile);
        let jsCode = fs.readFileSync(jsPath, 'utf8');

        // Вставить variants (как const ...) если есть
        if (variantsFile) {
          const variantsPath = path.join(destComponentDir, variantsFile);
          let variantsCode = fs.readFileSync(variantsPath, 'utf8');
          variantsCode = variantsCode.replace(/export\s+const\s+/, 'const ');
          jsCode = variantsCode + '\n\n' + jsCode;
        }

        // Обработка обычного style.css - оставляем как отдельный файл
        if (styleFile) {
          console.log(`CSS file saved: ${styleFile}`);

          // Auto-import component styles into @capsule/global.css
          try {
            const globalCssPath = path.join(capsuleRoot, 'global.css');
            if (fs.existsSync(globalCssPath)) {
              const importPath = `./components/${prefix}-${kebabComponent}/${styleFile}`;
              let globalCss = fs.readFileSync(globalCssPath, 'utf8');
              const alreadyImported = new RegExp(
                String.raw`@import\s+url\(['\"]?${importPath.replace(
                  /[-/\\.^$*+?()|\[\]{}]/g,
                  (r) => r
                )}['\"]?\)\s*;`
              ).test(globalCss);
              if (!alreadyImported) {
                const line = `@import url('${importPath}');\n`;
                globalCss += (globalCss.endsWith('\n') ? '' : '\n') + line;
                fs.writeFileSync(globalCssPath, globalCss, 'utf8');
                console.log(
                  `Injected import into @capsule/global.css: ${importPath}`
                );
              } else {
                console.log('Import already present in @capsule/global.css');
              }
            } else {
              console.log(
                'Warning: @capsule/global.css not found. Skipped auto-import.'
              );
            }
          } catch (e) {
            console.log(
              'Warning: failed to update @capsule/global.css:',
              (e as Error).message
            );
          }
        }

        if (readmeFile) {
          // Оставляем README.md как есть - пользователь получит его отдельно
          console.log(`Documentation saved: ${readmeFile}`);
        }

        // Удалить import/export для native build
        jsCode = jsCode.replace(/import[^;]+;?/g, '').replace(/export\s+/g, '');

        // Минификация если указано
        if (options.minify) {
          jsCode = minifyJs(jsCode);
        }

        fs.writeFileSync(jsPath, jsCode, 'utf8');

        // Удалить лишние файлы
        if (variantsFile)
          fs.unlinkSync(path.join(destComponentDir, variantsFile));
        const indexPath = path.join(destComponentDir, 'index.js');
        if (fs.existsSync(indexPath)) fs.unlinkSync(indexPath);
        spinner.succeed(
          `Component ${colors.green(
            component
          )} successfully installed in ${colors.blue(
            path.join('@capsule', 'components', `${prefix}-${kebabComponent}`)
          )} with prefix ${colors.cyan(prefix)}${
            options.minify ? ' (minified)' : ''
          }`
        );
      } catch (error) {
        spinner.fail(`Installation error: ${(error as Error).message}`);
        console.error(error);
        process.exit(1);
      }
    })();
  },
};
