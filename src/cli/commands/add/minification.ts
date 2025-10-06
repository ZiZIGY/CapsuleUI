/**
 * Утилиты для минификации JavaScript кода
 */

/**
 * Простая минификация JS (без внешних зависимостей)
 */
export function minifyJs(source: string): string {
  try {
    let code = source;
    // удалить блок-комментарии
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    // удалить строковые комментарии (не в URL)
    code = code.replace(/(^|[^:])\/\/.*$/gm, '$1');
    // удалить лишние переводы строк
    code = code.replace(/\r?\n+/g, '\n');
    // убрать отступы в началах строк
    code = code.replace(/^\s+/gm, '');
    // схлопнуть множественные пробелы
    code = code.replace(/\s{2,}/g, ' ');
    // убрать пробелы вокруг символов
    code = code.replace(/\s*([{}();,:])\s*/g, '$1');
    return code.trim();
  } catch {
    return source;
  }
}
