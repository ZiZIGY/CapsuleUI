import fs from 'fs';
import path from 'path';
import { createSpinner, findTemplatesDir } from '../../utils';
import { ensureDir } from '../../filesystem';
import { generateTagSpec } from './tag-builder';
import { writeVscodeDataJson } from './writer';

type GenerateOptions = {
  dir?: string;
  out?: string;
  dry?: boolean;
};

export const generate = {
  command: 'generate',
  description: 'Generate vscode.data.json for components based on CSS/JS',
  options: [
    {
      flags: '-d, --dir <directory>',
      description: 'Base directory to search templates (default: auto-detect)',
      defaultValue: '',
    },
    {
      flags: '-o, --out <directory>',
      description: 'Output directory (default: same component folder)',
      defaultValue: '',
    },
    {
      flags: '--dry',
      description: 'Dry run (no files will be written)',
      defaultValue: false,
    },
  ],
  action: async (options: GenerateOptions) => {
    const spinner = createSpinner('Generating VSCode custom data...');
    try {
      const cwd = process.cwd();
      const base = options.dir ? path.resolve(cwd, options.dir) : undefined;
      const templatesDir = base ?? findTemplatesDir(__dirname);

      if (!fs.existsSync(templatesDir)) {
        spinner.fail(`Templates directory not found: ${templatesDir}`);
        process.exit(1);
      }

      const componentDirs = fs
        .readdirSync(templatesDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => path.join(templatesDir, d.name));

      let total = 0;
      for (const compDir of componentDirs) {
        const tags = generateTagSpec(compDir);
        if (tags.length === 0) continue;
        const outDir = options.out ? path.resolve(cwd, options.out) : compDir;
        if (!options.dry) {
          ensureDir(outDir);
        }
        const outFile = path.join(outDir, 'vscode.data.json');
        writeVscodeDataJson(outFile, tags, !!options.dry);
        total += 1;
      }

      spinner.succeed(
        `Generated vscode.data.json for ${total} component folder(s).`
      );
    } catch (e) {
      spinner.fail(`Generation failed: ${(e as Error).message}`);
      process.exit(1);
    }
  },
};
