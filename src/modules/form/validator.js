class CapsuleValidator {
  constructor(formSelector, options = {}) {
    this.form = document.querySelector(formSelector);
    this.fields = options.fields || {};
    this.options = {
      validateOnInput: options.validateOnInput || false,
      validateOnChange: options.validateOnChange || false,
      bails: options.bails !== false,
      initialValues: options.initialValues || {},

      formFieldSelector: options.formFieldSelector || 'form-field',
      formMessageSelector: options.formMessageSelector || 'form-message',
    };

    this.setValues(this.options.initialValues);

    this.form.addEventListener('input', (e) => {
      const field = e.target.closest(this.options.formFieldSelector);
      if (field) {
        const fieldName = this.getFieldName(field);
        this.clearError(fieldName);

        if (this.options.validateOnInput) {
          this.validateField(fieldName);
        }
      }
    });

    this.form.addEventListener('change', (e) => {
      const field = e.target.closest(this.options.formFieldSelector);
      if (field) {
        const fieldName = this.getFieldName(field);
        this.clearError(fieldName);

        if (this.options.validateOnChange) {
          this.validateField(fieldName);
        }
      }
    });
  }

  async validate() {
    const formData = new FormData(this.form);
    const allValues = Object.fromEntries(formData);
    const errors = {};

    for (const [fieldName, rules] of Object.entries(this.fields)) {
      const result = await this.validateField(fieldName, allValues);
      if (!result.valid) {
        errors[fieldName] = result.errors[0];
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
      values: allValues,
    };
  }

  async validateField(fieldName, allValues = null) {
    if (!allValues) {
      const formData = new FormData(this.form);
      allValues = Object.fromEntries(formData);
    }

    const value = allValues[fieldName];
    const rules = this.fields[fieldName] || [];
    const errors = [];

    for (const rule of rules) {
      try {
        const result = await rule(value, allValues);
        if (typeof result === 'string') {
          errors.push(result);
          if (this.options.bails) break;
        }
      } catch (error) {
        errors.push(error.message || 'Ошибка валидации');
        if (this.options.bails) break;
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  static rules = {
    required:
      (message = 'Поле обязательно для заполнения') =>
      (v) =>
        !!v || message,
    email:
      (message = 'Введите корректный email') =>
      (v) =>
        !v || /^\S+@\S+\.\S+$/.test(v) || message,
    min: (length, message) => (v) =>
      !v || v.length >= length || message || `Минимум ${length} символов`,
    max: (length, message) => (v) =>
      !v || v.length <= length || message || `Максимум ${length} символов`,
    minValue: (min, message) => (v) =>
      !v ||
      Number(v) >= min ||
      message ||
      `Значение должно быть не менее ${min}`,
    maxValue: (max, message) => (v) =>
      !v ||
      Number(v) <= max ||
      message ||
      `Значение должно быть не более ${max}`,
    match: (fieldToMatch, message) => (v, allValues) =>
      !v ||
      v === allValues[fieldToMatch] ||
      message ||
      `Поле должно совпадать с ${fieldToMatch}`,
    async:
      (validator, message = 'Ошибка валидации') =>
      async (v, allValues) => {
        try {
          const isValid = await validator(v, allValues);
          return isValid || message;
        } catch (error) {
          return error.message || message;
        }
      },
  };

  getFieldName(fieldElement) {
    const field = fieldElement.querySelector('[name]');
    return field ? field.name : fieldElement.getAttribute('name');
  }

  displayErrors(errors) {
    this.form
      .querySelectorAll(this.options.formFieldSelector)
      .forEach((field) => {
        field.setError(null, this.options.formMessageSelector);
      });

    Object.keys(errors).forEach((fieldName) => {
      this.setFieldError(fieldName, errors[fieldName]);
    });
  }

  setFieldError(fieldName, error) {
    const field = this.findFieldByName(fieldName);
    if (field) {
      field.setError(error, this.options.formMessageSelector);
    }
  }

  findFieldByName(fieldName) {
    return (
      this.form
        .querySelector(`[name="${fieldName}"]`)
        ?.closest(this.options.formFieldSelector) ||
      this.form
        .querySelector(
          `${this.options.formFieldSelector} [name="${fieldName}"]`
        )
        ?.closest(this.options.formFieldSelector)
    );
  }

  clearError(fieldName) {
    const field = this.findFieldByName(fieldName);
    if (field) {
      field.setError(null, this.options.formMessageSelector);
    }
  }

  setValues(values) {
    Object.entries(values).forEach(([fieldName, value]) => {
      const input = this.form.querySelector(`[name="${fieldName}"]`);
      if (input) {
        input.value = value;
      }
    });
  }

  reset() {
    this.form.reset();
    this.form
      .querySelectorAll(this.options.formFieldSelector)
      .forEach((field) => {
        field.setError(null, this.options.formMessageSelector);
      });
    this.setValues(this.options.initialValues);
  }

  getFormData() {
    const formData = new FormData(this.form);
    return Object.fromEntries(formData);
  }
}
