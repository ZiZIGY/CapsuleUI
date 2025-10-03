import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ensureDir, copyDir } from '../filesystem';
import { createSpinner } from '../utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  blue: (text: string) => `\x1b[34m${text}\x1b[0m`,
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
};

function printHelp() {
  console.log(colors.green('Module command usage:'));
  console.log(
    '  capsule module add <name>     ' + colors.blue('- Add a new module')
  );
  console.log(
    '  capsule module remove <name>  ' + colors.blue('- Remove a module')
  );
  console.log(
    '  capsule module list           ' +
      colors.blue('- List available modules (from src/modules)')
  );
}

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

export const moduleCmd = {
  command: 'module <action> [name]',
  description: 'Work with modules (add/remove/list)',
  action: async (action?: string, name?: string) => {
    if (!action) {
      printHelp();
      return;
    }
    const spinner = createSpinner('Processing module command...');
    const projectDir = process.cwd();
    const capsuleRoot = findCapsuleRoot(projectDir);
    if (!capsuleRoot) {
      if (action !== 'list') {
        // Для add/remove требуется @capsule
        spinner.fail(
          "Could not find '@capsule' folder in the project. Run 'capsule init' first."
        );
        return;
      }
    }
    const modulesDir = capsuleRoot ? path.join(capsuleRoot, 'modules') : '';

    switch (action) {
      case 'add': {
        if (!name) {
          spinner.fail('Please specify module name: module add <name>');
          return;
        }
        // Источник берём из src/modules/<name>
        const sourceModuleDir = path.join(projectDir, 'src', 'modules', name);
        if (!fs.existsSync(sourceModuleDir)) {
          spinner.fail(`Module template not found in src/modules/${name}.`);
          // Показать доступные исходные модули
          try {
            const srcModulesRoot = path.join(projectDir, 'src', 'modules');
            if (fs.existsSync(srcModulesRoot)) {
              const available = fs
                .readdirSync(srcModulesRoot, { withFileTypes: true })
                .filter((d) => d.isDirectory())
                .map((d) => d.name);
              if (available.length) {
                console.log(colors.yellow('Available modules in src/modules:'));
                available.forEach((m) => console.log('  - ' + colors.blue(m)));
              }
            }
          } catch {}
          return;
        }
        // Создаём @capsule/modules, если его нет
        ensureDir(modulesDir);
        const newModuleDir = path.join(modulesDir, name);
        if (fs.existsSync(newModuleDir)) {
          spinner.fail(`Module ${name} already exists.`);
          return;
        }
        try {
          copyDir(sourceModuleDir, newModuleDir);
          spinner.succeed(`Module ${name} added to @capsule/modules/`);
        } catch (e) {
          spinner.fail('Failed to copy module: ' + (e as Error).message);
        }
        break;
      }
      case 'list': {
        // Доступные модули из src/modules
        const srcModulesRoot = path.join(projectDir, 'src', 'modules');
        spinner.stop();
        if (!fs.existsSync(srcModulesRoot)) {
          console.log(colors.yellow('No src/modules directory found.'));
          return;
        }
        const modules = fs
          .readdirSync(srcModulesRoot, { withFileTypes: true })
          .filter((d) => d.isDirectory())
          .map((d) => d.name);
        if (modules.length === 0) {
          console.log(colors.yellow('No available modules in src/modules.'));
        } else {
          console.log(colors.green('Available modules (src/modules):'));
          modules.forEach((m) => console.log('  - ' + colors.blue(m)));
        }
        break;
      }
      case 'remove': {
        if (!name) {
          spinner.fail('Please specify module name: module remove <name>');
          return;
        }
        const target = path.join(modulesDir, name);
        if (!fs.existsSync(target)) {
          spinner.fail(`Module ${name} not found.`);
          return;
        }
        fs.rmSync(target, { recursive: true, force: true });
        spinner.succeed(`Module ${name} removed from @capsule/modules/`);
        break;
      }
      default:
        spinner.stop();
        printHelp();
        return;
    }
  },
};
