import fs from 'fs';
import { TagSpec } from './tag-builder';

export function writeVscodeDataJson(outFile: string, tags: TagSpec[], dry: boolean) {
  const payload = { version: 1.1, tags } as any;
  if (dry) {
    console.log(`Would write ${outFile}`);
    console.log(JSON.stringify(payload, null, 2));
    return;
  }
  fs.writeFileSync(outFile, JSON.stringify(payload, null, 2), 'utf8');
}


