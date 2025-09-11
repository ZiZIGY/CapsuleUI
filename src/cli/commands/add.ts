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
      flags: '-d, --dir <directory>',
      description: 'Directory to install the component',
      defaultValue: 'src/components',
    },
    {
      flags: '-p, --prefix <prefix>',
      description: 'Custom element prefix (например: ui)',
      defaultValue: '',
    },
    {
      flags: '-n, --native',
      description:
        'Собрать компонент в один нативный js-файл без import/export',
      defaultValue: false,
    },
  ],
  action: async (
    component: string,
    options: { dir: string; prefix?: string; native?: boolean }
  ) => {
    const spinner = createSpinner(
      `Installing component ${colors.blue(component)}...`
    );

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
        const destDir = path.join(projectDir, options.dir);
        ensureDir(destDir);
        let prefix = options.prefix;
        if (!prefix) {
          prefix = await new Promise<string>((resolve) => {
            const rl = require('readline').createInterface({
              input: process.stdin,
              output: process.stdout,
            });
            rl.question(
              'Введите префикс для custom element (например: ui): ',
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
        // --- Новый блок: режим native ---
        if (options.native) {
          // Найти итоговый js-файл, variants.js и style.css
          const jsFile = files.find(
            (f) =>
              f.endsWith('.js') &&
              !f.endsWith('.variants.js') &&
              !f.endsWith('index.js')
          );
          const variantsFile = files.find((f) => f.endsWith('.variants.js'));
          const styleFile = files.find((f) => f.endsWith('.style.css'));
          if (!jsFile) throw new Error('Не найден основной js-файл компонента');
          const jsPath = path.join(
            destComponentDir,
            jsFile.replace(kebabComponent, `${prefix}-${kebabComponent}`)
          );
          let jsCode = fs.readFileSync(jsPath, 'utf8');
          // Вставить variants
          if (variantsFile) {
            const variantsPath = path.join(
              destComponentDir,
              variantsFile.replace(
                kebabComponent,
                `${prefix}-${kebabComponent}`
              )
            );
            let variantsCode = fs.readFileSync(variantsPath, 'utf8');
            // Удалить export
            variantsCode = variantsCode.replace(/export\s+const\s+/, 'const ');
            jsCode = variantsCode + '\n\n' + jsCode;
          }
          // Вставить style
          if (styleFile) {
            const stylePath = path.join(
              destComponentDir,
              styleFile.replace(kebabComponent, `${prefix}-${kebabComponent}`)
            );
            let styleCode = fs.readFileSync(stylePath, 'utf8');
            // Вставить styleCode в _applyStyles()
            jsCode = jsCode.replace(
              /(this\.shadowRoot\.appendChild\(style\);)/,
              `style.textContent = \
\`${styleCode}\`\;\n    $1`
            );
          }
          // Удалить import/export
          jsCode = jsCode
            .replace(/import[^;]+;?/g, '')
            .replace(/export\s+/g, '');
          // Перезаписать итоговый js-файл
          fs.writeFileSync(jsPath, jsCode, 'utf8');
          // Удалить лишние файлы
          if (variantsFile)
            fs.unlinkSync(
              path.join(
                destComponentDir,
                variantsFile.replace(
                  kebabComponent,
                  `${prefix}-${kebabComponent}`
                )
              )
            );
          if (styleFile)
            fs.unlinkSync(
              path.join(
                destComponentDir,
                styleFile.replace(kebabComponent, `${prefix}-${kebabComponent}`)
              )
            );
          // Можно удалить index.js, если он есть
          const indexPath = path.join(destComponentDir, 'index.js');
          if (fs.existsSync(indexPath)) fs.unlinkSync(indexPath);
        }
        // --- Конец блока native ---
        spinner.succeed(
          `Component ${colors.green(
            component
          )} successfully installed in ${colors.blue(
            options.dir + '/' + prefix + '-' + kebabComponent
          )} with prefix ${colors.cyan(prefix)}${
            options.native ? ' (native)' : ''
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
