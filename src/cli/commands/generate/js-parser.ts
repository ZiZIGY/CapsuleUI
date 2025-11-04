import fs from 'fs';

export function readFileSafe(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return '';
  }
}

export function extractComponentTagName(jsSource: string): string | null {
  const match = jsSource.match(
    /customElements\.define\((?:\s*|[\s\S]*?)['"`]([^'"`]+)['"`]/
  );
  return match ? match[1] : null;
}

export function extractObservedAttributes(jsSource: string): string[] {
  const list: string[] = [];
  const getter = jsSource.match(
    /observedAttributes\s*\(\)\s*\{|get\s+observedAttributes\s*\(\)\s*\{|static\s+get\s+observedAttributes\s*\(\)\s*\{/
  );
  if (getter) {
    const arrMatch = jsSource.match(/observedAttributes[^\[]*\[([\s\S]*?)\]/);
    if (arrMatch) {
      const inside = arrMatch[1];
      inside
        .split(',')
        .map((s) => s.replace(/['"`\s]/g, ''))
        .filter(Boolean)
        .forEach((a) => list.push(a));
    }
  } else {
    const staticArr = jsSource.match(
      /static\s+observedAttributes\s*=\s*\[([\s\S]*?)\]/
    );
    if (staticArr) {
      staticArr[1]
        .split(',')
        .map((s) => s.replace(/['"`\s]/g, ''))
        .filter(Boolean)
        .forEach((a) => list.push(a));
    }
  }
  return Array.from(new Set(list));
}

export function extractStaticProperties(jsSource: string): Record<string, any> {
  const result: Record<string, any> = {};
  const blockMatch = jsSource.match(
    /static\s+properties\s*=\s*\{([\s\S]*?)\}\s*;/
  );
  if (!blockMatch) return result;
  const propsBlock = blockMatch[1];
  let raw = propsBlock.trim();
  raw = raw.replace(/(\w+)\s*:/g, '"$1":');
  try {
    const obj = Function('return ({' + raw + '})')();
    Object.assign(result, obj);
  } catch {}
  return result;
}
