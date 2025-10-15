import fs from 'fs';
import path from 'path';
import {
  extractComponentTagName,
  extractObservedAttributes,
  readFileSafe,
} from './js-parser';
import {
  extractAttributeValuesFromCss,
  inferBooleanPresence,
  extractAttributeNames,
} from './css-parser';

export type AttributeValue = { name: string; description?: string };

export type AttributeSpec = {
  name: string;
  description?: string;
  type?: string;
  valueSet?: string;
  values?: AttributeValue[];
};

export type TagSpec = {
  name: string;
  description?: string;
  attributes: AttributeSpec[];
};

function buildAttributes(jsSource: string, cssSource: string): AttributeSpec[] {
  const attrsFromJs = extractObservedAttributes(jsSource);
  const attrsFromCss = extractAttributeNames(cssSource);
  const attrSet = new Set<string>([...attrsFromJs, ...attrsFromCss]);

  const attributes: AttributeSpec[] = [];
  for (const name of attrSet) {
    if (!name) continue;
    const values = extractAttributeValuesFromCss(cssSource, name);
    if (name === 'disabled') {
      attributes.push({
        name: 'disabled',
        description: 'Disables component',
        valueSet: 'v',
      });
      continue;
    }
    if (values.length) {
      attributes.push({ name, values: values.map((v) => ({ name: v })) });
    } else if (inferBooleanPresence(cssSource, name)) {
      attributes.push({ name, valueSet: 'v' });
    }
  }
  return attributes;
}

export function generateTagSpec(componentDir: string): TagSpec[] {
  const entries: { js: string; css?: string }[] = [];
  const rootCssCandidate = path.join(
    componentDir,
    path.basename(componentDir).toLowerCase() + '.style.css'
  );
  const jsFiles = fs
    .readdirSync(componentDir)
    .filter((f) => f.endsWith('.js') && f !== 'register.js')
    .map((f) => path.join(componentDir, f));
  for (const jsPath of jsFiles) {
    const specificCss = jsPath.replace(/\.js$/, '.style.css');
    const cssPath = fs.existsSync(specificCss)
      ? specificCss
      : fs.existsSync(rootCssCandidate)
      ? rootCssCandidate
      : undefined;
    entries.push({ js: jsPath, css: cssPath });
  }

  const tags: TagSpec[] = [];
  for (const { js, css } of entries) {
    const jsSource = readFileSafe(js);
    if (!jsSource) continue;
    const cssSource = css ? readFileSafe(css) : '';
    const tagName = extractComponentTagName(jsSource);
    if (!tagName) continue;
    const attributes = buildAttributes(jsSource, cssSource);
    tags.push({ name: tagName, attributes });
  }
  return tags;
}
