export function extractAttributeValuesFromCss(
  cssSource: string,
  attributeName: string
): string[] {
  const values = new Set<string>();
  const re = new RegExp(
    `\\[${attributeName}=['\\\"\\\`](.*?)['\\\"\\\`]\\]`,
    'g'
  );
  let m: RegExpExecArray | null;
  while ((m = re.exec(cssSource))) {
    if (m[1]) values.add(m[1]);
  }
  if (attributeName === 'disabled' && cssSource.includes('[disabled]')) {
    values.add('');
  }
  return Array.from(values);
}

export function inferBooleanPresence(
  cssSource: string,
  attributeName: string
): boolean {
  const re = new RegExp(`\\[${attributeName}\\]`, 'g');
  return re.test(cssSource);
}

export function extractAttributeNames(cssSource: string): string[] {
  const names = new Set<string>();
  const re = /\[([a-zA-Z0-9_\-:]+)(?:=[^\]]+)?\]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(cssSource))) {
    if (m[1]) names.add(m[1]);
  }
  return Array.from(names);
}
