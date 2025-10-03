export class CapsuleRules {
  static required(message = 'This field is required') {
    return (v) => {
      if (v === null || v === undefined || v === '') return message;
      if (Array.isArray(v) && v.length === 0) return message;
      return true;
    };
  }

  static email(message = 'Please enter a valid email address') {
    return (v) => !v || /^\S+@\S+\.\S+$/.test(v) || message;
  }

  static min(length, message) {
    return (v) => {
      if (!v) return true;
      if (Array.isArray(v))
        return (
          v.length >= length || message || `Minimum ${length} items required`
        );
      return v.length >= length || message || `Minimum ${length} characters`;
    };
  }

  static max(length, message) {
    return (v) => {
      if (!v) return true;
      if (Array.isArray(v))
        return (
          v.length <= length || message || `Maximum ${length} items allowed`
        );
      return v.length <= length || message || `Maximum ${length} characters`;
    };
  }

  static minValue(min, message) {
    return (v) =>
      !v || Number(v) >= min || message || `Value must be at least ${min}`;
  }

  static maxValue(max, message) {
    return (v) =>
      !v || Number(v) <= max || message || `Value must be at most ${max}`;
  }

  static match(fieldToMatch, message) {
    return (v, allValues) =>
      !v ||
      v === allValues[fieldToMatch] ||
      message ||
      `Field must match ${fieldToMatch}`;
  }

  static arrayRequired(message = 'At least one item is required') {
    return (v) => {
      const array = CapsuleRules._parseArray(v);
      return (array && array.length > 0) || message;
    };
  }

  static arrayMin(length, message) {
    return (v) => {
      const array = CapsuleRules._parseArray(v);
      return (
        !array ||
        array.length >= length ||
        message ||
        `Minimum ${length} items required`
      );
    };
  }

  static arrayMax(length, message) {
    return (v) => {
      const array = CapsuleRules._parseArray(v);
      return (
        !array ||
        array.length <= length ||
        message ||
        `Maximum ${length} items allowed`
      );
    };
  }

  static arrayUnique(message = 'All items must be unique') {
    return (v) => {
      const array = CapsuleRules._parseArray(v);
      if (!array) return true;
      return new Set(array).size === array.length || message;
    };
  }

  static arrayOf(typeValidator, message) {
    return (v) => {
      const array = CapsuleRules._parseArray(v);
      if (!array) return true;

      for (let i = 0; i < array.length; i++) {
        const result = typeValidator(array[i]);
        if (result !== true) {
          return message || `Item ${i + 1}: ${result}`;
        }
      }
      return true;
    };
  }

  static json(message = 'Must be a valid JSON string') {
    return (v) => {
      if (!v) return true;
      try {
        JSON.parse(v);
        return true;
      } catch {
        return message;
      }
    };
  }

  static jsonArray(message = 'Must be a valid JSON array') {
    return (v) => {
      if (!v) return true;
      try {
        const parsed = JSON.parse(v);
        return Array.isArray(parsed) || message;
      } catch {
        return message;
      }
    };
  }

  static jsonObject(message = 'Must be a valid JSON object') {
    return (v) => {
      if (!v) return true;
      try {
        const parsed = JSON.parse(v);
        return (
          (typeof parsed === 'object' && !Array.isArray(parsed)) || message
        );
      } catch {
        return message;
      }
    };
  }

  static array(message = 'Must be an array or valid JSON array') {
    return (v) => {
      const array = CapsuleRules._parseArray(v);
      return array !== null || message;
    };
  }

  static arrayMinSmart(length, message) {
    return (v) => {
      const array = CapsuleRules._parseArray(v);
      if (!array)
        return message || `Must be a valid array with at least ${length} items`;
      return (
        array.length >= length || message || `Minimum ${length} items required`
      );
    };
  }

  static arrayMaxSmart(length, message) {
    return (v) => {
      const array = CapsuleRules._parseArray(v);
      if (!array)
        return message || `Must be a valid array with at most ${length} items`;
      return (
        array.length <= length || message || `Maximum ${length} items allowed`
      );
    };
  }

  static arrayOfSmart(itemValidator, message) {
    return (v) => {
      const array = CapsuleRules._parseArray(v);
      if (!array) return message || 'Must be a valid array';

      for (let i = 0; i < array.length; i++) {
        const result = itemValidator(array[i]);
        if (result !== true) {
          return message || `Item ${i + 1}: ${result}`;
        }
      }
      return true;
    };
  }

  static toArray(message = 'Must be convertible to array') {
    return (v) => {
      const array = CapsuleRules._parseArray(v, true);
      return array !== null || message;
    };
  }

  static _parseArray(v, allowConversion = false) {
    if (!v) return null;

    if (Array.isArray(v)) return v;

    if (typeof v === 'string') {
      try {
        const parsed = JSON.parse(v);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        if (allowConversion) {
          try {
            const array = v
              .split(',')
              .map((item) => item.trim())
              .filter((item) => item);
            return array.length > 0 ? array : null;
          } catch {
            return null;
          }
        }
      }
    }

    return null;
  }

  static phone(message = 'Please enter a valid phone number') {
    return (v) =>
      !v || /^[\+]?[0-9\s\-\(\)]{10,}$/.test(v.replace(/\s/g, '')) || message;
  }

  static url(message = 'Please enter a valid URL') {
    return (v) => !v || /^https?:\/\/.+\..+/.test(v) || message;
  }

  static password(
    message = 'Password must contain at least 8 characters with letters and numbers'
  ) {
    return (v) => !v || /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v) || message;
  }

  static numeric(message = 'Only numbers are allowed') {
    return (v) => !v || /^\d+$/.test(v) || message;
  }

  static alpha(message = 'Only letters are allowed') {
    return (v) => !v || /^[A-Za-z]+$/.test(v) || message;
  }

  static alphaNumeric(message = 'Only letters and numbers are allowed') {
    return (v) => !v || /^[A-Za-z0-9]+$/.test(v) || message;
  }

  static pattern(regex, message = 'Invalid format') {
    return (v) => !v || regex.test(v) || message;
  }

  static integer(message = 'Must be an integer') {
    return (v) => !v || Number.isInteger(Number(v)) || message;
  }

  static positive(message = 'Must be a positive number') {
    return (v) => !v || Number(v) > 0 || message;
  }

  static negative(message = 'Must be a negative number') {
    return (v) => !v || Number(v) < 0 || message;
  }

  static between(min, max, message) {
    return (v) =>
      !v ||
      (Number(v) >= min && Number(v) <= max) ||
      message ||
      `Must be between ${min} and ${max}`;
  }

  static fileSize(maxSizeMB, message) {
    return (v) => {
      if (!v || !v.size) return true;
      return (
        v.size <= maxSizeMB * 1024 * 1024 ||
        message ||
        `Maximum file size: ${maxSizeMB}MB`
      );
    };
  }

  static fileType(allowedTypes, message) {
    return (v) => {
      if (!v || !v.type) return true;
      const types = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes];
      return (
        types.includes(v.type) ||
        message ||
        `Allowed formats: ${types.join(', ')}`
      );
    };
  }

  static date(message = 'Please enter a valid date') {
    return (v) => !v || !isNaN(Date.parse(v)) || message;
  }

  static dateAfter(date, message) {
    return (v) =>
      !v ||
      new Date(v) > new Date(date) ||
      message ||
      `Date must be after ${new Date(date).toLocaleDateString()}`;
  }

  static dateBefore(date, message) {
    return (v) =>
      !v ||
      new Date(v) < new Date(date) ||
      message ||
      `Date must be before ${new Date(date).toLocaleDateString()}`;
  }

  static oneOf(allowedValues, message) {
    return (v) =>
      !v ||
      allowedValues.includes(v) ||
      message ||
      `Allowed values: ${allowedValues.join(', ')}`;
  }

  static notOneOf(disallowedValues, message) {
    return (v) =>
      !v ||
      !disallowedValues.includes(v) ||
      message ||
      `Disallowed values: ${disallowedValues.join(', ')}`;
  }

  static requiredIf(conditionField, conditionValue, message) {
    return (v, allValues) => {
      if (allValues[conditionField] === conditionValue) {
        return (
          !!v ||
          message ||
          `This field is required when ${conditionField} is ${conditionValue}`
        );
      }
      return true;
    };
  }

  static requiredUnless(conditionField, conditionValue, message) {
    return (v, allValues) => {
      if (allValues[conditionField] !== conditionValue) {
        return (
          !!v ||
          message ||
          `This field is required when ${conditionField} is not ${conditionValue}`
        );
      }
      return true;
    };
  }

  static async(validator, message = 'Validation error') {
    return async (v, allValues) => {
      try {
        const isValid = await validator(v, allValues);
        return isValid || message;
      } catch (error) {
        return error.message || message;
      }
    };
  }

  static slug(
    message = 'Must be a valid URL slug (letters, numbers, hyphens)'
  ) {
    return (v) => !v || /^[a-z0-9-]+$/.test(v) || message;
  }

  static hexColor(message = 'Must be a valid hex color (#RRGGBB)') {
    return (v) => !v || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v) || message;
  }
}
