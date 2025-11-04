import fs from 'fs';
import path from 'path';
import {
  extractComponentTagName,
  extractObservedAttributes,
  readFileSafe,
  extractStaticProperties,
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

function getTypeString(
  valType: string | Function | undefined
): string | undefined {
  if (!valType) return undefined;
  if (typeof valType === 'function') {
    const name = valType.name;
    if (!name) return undefined;
    return name.toLowerCase();
  }
  if (typeof valType === 'string') {
    return valType.toLowerCase();
  }
  return undefined;
}

function buildAttributes(
  jsSource: string,
  cssSource: string,
  tagName: string
): AttributeSpec[] {
  const attrsFromJs = extractObservedAttributes(jsSource);
  const staticProps = extractStaticProperties(jsSource);
  const attrStatic = Object.entries(staticProps).map(([key, val]) => {
    const name = val.attribute || key;
    return {
      name,
      type: getTypeString(val.type),
      reflect: typeof val.reflect !== 'undefined' ? !!val.reflect : undefined,
    };
  });

  let attrsFromCss = extractAttributeNames(cssSource);
  attrsFromCss = attrsFromCss.filter((attr) =>
    cssSource.includes(`${tagName}[${attr}`)
  );

  const attrSet = new Set([
    ...attrsFromJs,
    ...attrStatic.map((i) => i.name),
    ...attrsFromCss,
  ]);

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
    const staticDef = attrStatic.find((a) => a.name === name);
    const typeStr = staticDef && staticDef.type ? staticDef.type : undefined;
    if (values.length) {
      attributes.push({
        name,
        values: values.map((v) => ({ name: v })),
        ...(typeStr ? { type: typeStr } : {}),
      });
    } else if (inferBooleanPresence(cssSource, name)) {
      attributes.push({
        name,
        valueSet: 'v',
        ...(typeStr ? { type: typeStr } : {}),
      });
    } else if (staticDef) {
      attributes.push({ name, ...(typeStr ? { type: typeStr } : {}) });
    } else {
      attributes.push({ name });
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
    const attributes = buildAttributes(jsSource, cssSource, tagName);
    tags.push({ name: tagName, attributes });
  }
  return tags;
}
