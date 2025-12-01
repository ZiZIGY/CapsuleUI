import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createSpinner, findTemplatesDir } from '../../utils';
import { copyDir, ensureDir } from '../../filesystem';

import {
  toKebabCase,
  walkDirAndReplace,
  renameFilesWithPlaceholders,
  findCapsuleRoot,
} from './file-operations';
import {
  processJsFiles,
  renameComponentFiles,
  cleanupTempFiles,
} from './component-processor';
import { importCssFiles } from './css-importer';
import { importJsFiles } from './js-importer';
import { updateVscodeSettings } from './vscode-updater';

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
    }
  ) => {
    const spinner = createSpinner(
      `Installing component ${colors.blue(component)}...`
    );

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
          console.log(colors.yellow('\nNo available components in templates.'));
        }

        process.exit(1);
      }

      const capsuleRoot = findCapsuleRoot(projectDir);
      if (!capsuleRoot) {
        spinner.fail(
          `Could not find '@capsule' folder in the project. Run 'npx @zizigy/capsule init' first.`
        );
        process.exit(1);
      }

      const destDir = path.join(capsuleRoot, 'components');
      ensureDir(destDir);
      const prefix = (options.prefix && options.prefix.trim()) || 'capsule';
      const kebabComponent = toKebabCase(component);
      const destComponentDir = path.join(
        destDir,
        `${prefix}-${kebabComponent}`
      );
      copyDir(componentPath, destComponentDir);
      // Замена плейсхолдеров во всех файлах компонента
      walkDirAndReplace(destComponentDir, prefix, kebabComponent);

      // Переименование файлов с плейсхолдерами в названии
      renameFilesWithPlaceholders(destComponentDir, prefix, kebabComponent);

      // Переименование основных файлов компонента
      const renamedFiles = renameComponentFiles(
        destComponentDir,
        kebabComponent,
        prefix
      );

      // Собираем все JS и CSS файлы для автоимпорта
      const jsFiles = renamedFiles.filter(
        (f) => f.endsWith('.js') && f !== 'index.js'
      );
      const cssFiles = renamedFiles.filter((f) => f.endsWith('.style.css'));
      const readmeFile = renamedFiles.find((f) => f.endsWith('.md'));
      const registerFile = renamedFiles.find((f) => f === 'register.js');

      if (jsFiles.length === 0) {
        throw new Error('Не найден основной js-файл компонента');
      }

      if (!registerFile) {
        throw new Error(
          'register.js не найден - обязательный файл для правильной последовательности загрузки'
        );
      }

      // Обработка JS файлов (минификация и удаление import/export)
      processJsFiles(destComponentDir, jsFiles);

      // Обработка CSS: автоимпорт в global.css
      importCssFiles(capsuleRoot, cssFiles, prefix, kebabComponent);

      if (readmeFile) {
        console.log(`Documentation saved: ${readmeFile}`);
      }

      // Очистка временных файлов
      cleanupTempFiles(destComponentDir);

      // Автоимпорт JS файлов в @capsule/components/all.js
      importJsFiles(capsuleRoot, jsFiles, prefix, kebabComponent);

      // Обновление VS Code настроек
      const vscodeDataPath = path.join(destComponentDir, 'vscode.data.json');
      updateVscodeSettings(projectDir, destComponentDir, vscodeDataPath);

      spinner.succeed(
        `Component ${colors.green(
          component
        )} successfully installed in ${colors.blue(
          path.join('@capsule', 'components', `${prefix}-${kebabComponent}`)
        )} with prefix ${colors.cyan(prefix)}`
      );
    } catch (error) {
      spinner.fail(`Installation error: ${(error as Error).message}`);
      console.error(error);
      process.exit(1);
    }
  },
};
