export class CapsuleValidator {
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
      onSubmit: options.onSubmit,
      onValidate: options.onValidate,
      onError: options.onError,
      onFieldValidate: options.onFieldValidate,
    };

    this.setValues(this.options.initialValues);
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.options.validateOnInput) {
      this.form.addEventListener('input', (e) => {
        const field = e.target.closest(this.options.formFieldSelector);
        if (field) {
          const fieldName = this.getFieldName(field);
          this.clearError(fieldName);
          this.validateField(fieldName).then((result) => {
            if (!result.valid) {
              this.setFieldError(fieldName, result.errors[0]);
            }
            if (this.options.onFieldValidate) {
              this.options.onFieldValidate(fieldName, result);
            }
          });
        }
      });
    }

    if (this.options.validateOnChange) {
      this.form.addEventListener('change', (e) => {
        const field = e.target.closest(this.options.formFieldSelector);
        if (field) {
          const fieldName = this.getFieldName(field);
          this.clearError(fieldName);
          this.validateField(fieldName).then((result) => {
            if (!result.valid) {
              this.setFieldError(fieldName, result.errors[0]);
            }
            if (this.options.onFieldValidate) {
              this.options.onFieldValidate(fieldName, result);
            }
          });
        }
      });
    }

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleSubmit();
    });
  }

  async handleSubmit() {
    const result = await this.validate();

    if (this.options.onValidate) {
      this.options.onValidate(result);
    }

    if (result.valid) {
      if (this.options.onSubmit) {
        await this.options.onSubmit(result.values, {
          setErrors: (errors) => this.displayErrors(errors),
          setFieldError: (field, error) => this.setFieldError(field, error),
          reset: () => this.reset(),
        });
      } else {
        alert('Form submitted successfully!');
      }
    } else {
      if (this.options.onError) {
        await this.options.onError(result.errors, {
          setErrors: (errors) => this.displayErrors(errors),
          setFieldError: (field, error) => this.setFieldError(field, error),
        });
      } else {
        this.displayErrors(result.errors);
      }
    }
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

    const validationResult = {
      valid: Object.keys(errors).length === 0,
      errors,
      values: allValues,
    };

    return validationResult;
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
        errors.push(error.message || 'Validation error');
        if (this.options.bails) break;
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  getFieldRules(fieldName) {
    const fieldConfig = this.fields[fieldName];
    return Array.isArray(fieldConfig) ? fieldConfig : fieldConfig?.rules || [];
  }

  async validateFields(...fieldNames) {
    const formData = new FormData(this.form);
    const allValues = Object.fromEntries(formData);
    const errors = {};

    for (const fieldName of fieldNames) {
      const rules = this.getFieldRules(fieldName);
      if (rules.length > 0) {
        const result = await this.validateField(fieldName, allValues);
        if (!result.valid) {
          errors[fieldName] = result.errors[0];
        }
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
      values: allValues,
    };
  }

  async validateGroup(groupName) {
    const formData = new FormData(this.form);
    const allValues = Object.fromEntries(formData);
    const errors = {};

    for (const [fieldName, fieldConfig] of Object.entries(this.fields)) {
      const fieldGroup =
        typeof fieldConfig === 'object' ? fieldConfig.group : undefined;
      if (fieldGroup === groupName) {
        const result = await this.validateField(fieldName, allValues);
        if (!result.valid) {
          errors[fieldName] = result.errors[0];
        }
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
      values: allValues,
    };
  }

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
    const fieldWithInput = this.form.querySelector(
      `${this.options.formFieldSelector} [name="${fieldName}"]`
    );
    if (fieldWithInput) {
      return fieldWithInput.closest(this.options.formFieldSelector);
    }

    return null;
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

  async submit() {
    return await this.handleSubmit();
  }
}
