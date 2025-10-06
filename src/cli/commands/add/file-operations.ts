import fs from 'fs';
import path from 'path';

/**
 * Утилиты для работы с файлами компонентов
 */

/**
 * Вспомогательная функция для kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

/**
 * Замена плейсхолдеров в файле
 */
export function replacePlaceholdersInFile(
  filePath: string,
  prefix: string,
  component: string
): void {
  if (!fs.statSync(filePath).isFile()) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/__PREFIX__/g, prefix || 'capsule');
  content = content.replace(/__COMPONENT__/g, component);
  fs.writeFileSync(filePath, content, 'utf8');
}

/**
 * Рекурсивный обход директории и замена плейсхолдеров
 */
export function walkDirAndReplace(
  dir: string,
  prefix: string,
  component: string
): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDirAndReplace(fullPath, prefix, component);
    } else {
      replacePlaceholdersInFile(fullPath, prefix, component);
    }
  }
}

/**
 * Переименование файлов с плейсхолдерами в названии
 */
export function renameFilesWithPlaceholders(
  dir: string,
  prefix: string,
  component: string
): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      renameFilesWithPlaceholders(fullPath, prefix, component);
    } else {
      let newName = entry.name
        .replace(/__PREFIX__/g, prefix || 'capsule')
        .replace(/__COMPONENT__/g, component);
      if (newName !== entry.name) {
        fs.renameSync(fullPath, path.join(dir, newName));
      }
    }
  }
}

/**
 * Поиск корневой папки @capsule в проекте
 */
export function findCapsuleRoot(root: string): string | null {
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
