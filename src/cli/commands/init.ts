import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { copyDir, ensureDir } from '../filesystem';
import { findTemplateDir } from '../utils';

export const init = {
  command: 'init',
  description:
    'Initialize CapsuleUI: create @capsule folder with global styles and utils',
  options: [
    {
      flags: '-d, --dir <directory>',
      description:
        'Base directory where @capsule will be created (default: project root)',
      defaultValue: '',
    },
  ],
  action: async (options: { dir?: string }) => {
    const projectDir = process.cwd();

    // Get __dirname for the init command file
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Locate @template folder in the package
    const templateCapsuleDir = findTemplateDir(__dirname);
    if (!fs.existsSync(templateCapsuleDir)) {
      console.error(
        `Template folder @template/ not found in package. Expected at: ${templateCapsuleDir}`
      );
      process.exit(1);
    }

    // Scan the whole project for any existing '@capsule' folder
    function hasCapsuleDir(root: string): string | null {
      const skip = new Set(['.git', 'node_modules', 'dist', 'build']);
      const stack: string[] = [root];
      while (stack.length) {
        const current = stack.pop() as string;
        try {
          const entries = fs.readdirSync(current, { withFileTypes: true });
          for (const entry of entries) {
            if (skip.has(entry.name)) continue;
            const full = path.join(current, entry.name);
            if (entry.isDirectory()) {
              if (entry.name === '@capsule') return full;
              stack.push(full);
            }
          }
        } catch {}
      }
      return null;
    }

    const existing = hasCapsuleDir(projectDir);
    if (existing) {
      console.error(
        `@capsule folder already exists in the project at: ${existing}. Initialization is blocked.`
      );
      process.exit(1);
    }

    // Resolve base destination and ensure it exists
    const baseDestDir = options.dir
      ? path.resolve(projectDir, options.dir)
      : projectDir;
    ensureDir(baseDestDir);

    // Always place folder named '@capsule' inside the base destination
    const destCapsuleDir = path.join(baseDestDir, '@capsule');

    copyDir(templateCapsuleDir, destCapsuleDir);
    console.log(`Created @capsule folder in ${destCapsuleDir}`);
    console.log('CapsuleUI initialized!');
  },
};
