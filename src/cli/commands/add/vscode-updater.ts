import fs from 'fs';
import path from 'path';

/**
 * Утилиты для обновления VS Code настроек
 */

/**
 * Поиск всех файлов .vscode/settings.json в проекте
 */
function findAllVscodeSettings(root: string): string[] {
  const result: string[] = [];
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

    let hasVscode = false;
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name === '.vscode') {
        hasVscode = true;
      }
    }

    if (hasVscode) {
      const settingsPath = path.join(current, '.vscode', 'settings.json');
      if (fs.existsSync(settingsPath)) {
        result.push(settingsPath);
      }
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (skip.has(entry.name)) continue;
      stack.push(path.join(current, entry.name));
    }
  }

  return result;
}

/**
 * Обновление VS Code настроек для добавления пути к vscode.data.json компонента
 */
export function updateVscodeSettings(
  projectDir: string,
  _destComponentDir: string,
  vscodeDataPath: string
): void {
  try {
    if (!fs.existsSync(vscodeDataPath)) {
      return;
    }

    const settingsFiles = findAllVscodeSettings(projectDir);

    for (const settingsPath of settingsFiles) {
      try {
        // base directory is the folder that contains .vscode
        const baseForRel = path.dirname(path.dirname(settingsPath));
        const rel = path
          .relative(baseForRel, vscodeDataPath)
          .split(path.sep)
          .join('/');

        let settingsObj: any = {};
        try {
          settingsObj = JSON.parse(fs.readFileSync(settingsPath, 'utf8')) || {};
        } catch {
          settingsObj = {};
        }

        const arr: string[] = Array.isArray(settingsObj['html.customData'])
          ? settingsObj['html.customData']
          : [];

        if (!arr.includes(rel)) {
          arr.push(rel);
          settingsObj['html.customData'] = arr;
          fs.writeFileSync(
            settingsPath,
            JSON.stringify(settingsObj, null, 2),
            'utf8'
          );
          console.log(`Updated VS Code settings: ${settingsPath} (+ ${rel})`);
        }
      } catch (e) {
        console.log(
          'Warning: failed to update VS Code settings:',
          (e as Error).message
        );
      }
    }
  } catch (e) {
    console.log(
      'Warning: VS Code html.customData update skipped:',
      (e as Error).message
    );
  }
}
