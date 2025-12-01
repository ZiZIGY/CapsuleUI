import fs from 'fs';
import path from 'path';
import { ensureDir } from '../filesystem';
import { createSpinner } from '../utils';

export const vscode = {
  command: 'vscode',
  description:
    'Setup VS Code HTML Custom Data (html.customData) for CapsuleUI components',
  options: [
    {
      flags: '-d, --dir <directory>',
      description:
        'Base directory where .vscode will be created (default: project root)',
      defaultValue: '',
    },
    {
      flags: '--data <path>',
      description: 'Explicit path to additional custom data JSON to include',
      defaultValue: '',
    },
    {
      flags: '--clear',
      description: 'Clear previous CapsuleUI entries before adding',
      defaultValue: false,
    },
    {
      flags: '--dry',
      description: 'Dry run (print actions without writing files)',
      defaultValue: false,
    },
  ],
  action: async (options: {
    dir?: string;
    data?: string;
    clear?: boolean;
    dry?: boolean;
  }) => {
    const spinner = createSpinner('Configuring VS Code integration...');
    try {
      const projectDir = process.cwd();
      const baseDir = options.dir
        ? path.resolve(projectDir, options.dir)
        : projectDir;

      // 1) Find @capsule folder in project
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

      const capsuleRoot = findCapsuleRoot(baseDir);
      if (!capsuleRoot) {
        spinner.fail(
          "Could not find '@capsule' folder in the selected directory. Run 'npx @zizigy/capsule init' first or provide --dir."
        );
        process.exit(1);
      }

      // 2) Collect per-component vscode.data.json files
      const componentsDir = path.join(capsuleRoot, 'components');
      const jsonFiles: string[] = [];
      if (fs.existsSync(componentsDir)) {
        const comps = fs
          .readdirSync(componentsDir, { withFileTypes: true })
          .filter((d) => d.isDirectory());
        for (const comp of comps) {
          const compDir = path.join(componentsDir, comp.name);
          const candidate = path.join(compDir, 'vscode.data.json');
          if (fs.existsSync(candidate)) jsonFiles.push(candidate);
        }
      }

      // Optionally include explicit --data
      if (options.data) {
        const explicit = path.resolve(baseDir, options.data);
        if (fs.existsSync(explicit)) jsonFiles.push(explicit);
      }

      if (jsonFiles.length === 0) {
        spinner.fail('No vscode.data.json files found to register.');
        process.exit(1);
      }

      // 3) Ensure .vscode exists
      const vscodeDir = path.join(baseDir, '.vscode');
      ensureDir(vscodeDir);

      // 4) Update .vscode/settings.json (html.customData)
      const settingsPath = path.join(vscodeDir, 'settings.json');
      let settings: any = {};
      if (fs.existsSync(settingsPath)) {
        try {
          settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8')) || {};
        } catch {
          settings = {};
        }
      }

      let customData: string[] = Array.isArray(settings?.['html.customData'])
        ? settings['html.customData']
        : [];

      if (options.clear) customData = [];

      // helper to normalize and add path if not exists
      function addCustomData(p: string) {
        const rel = path.relative(baseDir, p).split(path.sep).join('/');
        if (!customData.includes(rel)) customData.push(rel);
      }

      jsonFiles.forEach(addCustomData);

      settings['html.customData'] = customData;

      if (!options.dry) {
        fs.writeFileSync(
          settingsPath,
          JSON.stringify(settings, null, 2),
          'utf8'
        );
        spinner.succeed('VS Code settings updated successfully.');
      } else {
        spinner.succeed('Dry run complete. No files were modified.');
        console.log('Would set html.customData to:');
        console.log(customData);
      }
    } catch (error) {
      spinner.fail(`VS Code setup error: ${(error as Error).message}`);
      console.error(error);
      process.exit(1);
    }
  },
};
