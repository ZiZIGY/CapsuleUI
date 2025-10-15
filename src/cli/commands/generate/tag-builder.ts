import fs from 'fs';
import path from 'path';
import { extractComponentTagName, extractObservedAttributes, readFileSafe } from './js-parser';
import { extractAttributeValuesFromCss, inferBooleanPresence } from './css-parser';

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
  const attrSet = new Set<string>(attrsFromJs);
  const common = ['size', 'variant', 'orientation', 'animation', 'status', 'disabled', 'type'];
  for (const c of common) attrSet.add(c);

  const attributes: AttributeSpec[] = [];
  for (const name of attrSet) {
    if (!name) continue;
    const values = extractAttributeValuesFromCss(cssSource, name);
    if (name === 'disabled') {
      attributes.push({ name: 'disabled', description: 'Disables component', valueSet: 'v' });
      continue;
    }
    if (name === 'type') {
      const typeValues = values.length ? values : ['button', 'submit', 'reset'];
      attributes.push({ name: 'type', description: 'Type attribute', values: typeValues.map((v) => ({ name: v })) });
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
  const registerPath = path.join(componentDir, 'register.js');
  const hasRegister = fs.existsSync(registerPath);

  const entries: { js: string; css?: string }[] = [];
  if (hasRegister) {
    const reg = readFileSafe(registerPath);
    const imports = Array.from(reg.matchAll(/import\s+['"]\.\/(.*?\.js)['"]/g)).map((m) => m[1]);
    for (const imp of imports) {
      const jsPath = path.join(componentDir, imp);
      const cssPath = jsPath.replace(/\.js$/, '.style.css');
      entries.push({ js: jsPath, css: fs.existsSync(cssPath) ? cssPath : undefined });
    }
  }

  if (entries.length === 0) {
    const candidates = fs
      .readdirSync(componentDir)
      .filter((f) => f.endsWith('.js'))
      .map((f) => path.join(componentDir, f));
    for (const js of candidates) {
      const css = js.replace(/\.js$/, '.style.css');
      entries.push({ js, css: fs.existsSync(css) ? css : undefined });
    }
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


