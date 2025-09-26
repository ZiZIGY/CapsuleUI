class CapsuleValidator {
  constructor(formSelector, zodSchema) {
    this.form = document.querySelector(formSelector);
    this.zodSchema = zodSchema;
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData);

      const result = this.zodSchema.parse(data);

      if (result.success) {
        alert('Форма отправлена: ' + JSON.stringify(result.data));
      } else {
        this.displayErrors(result.errors);
      }
    });

    this.form.addEventListener('input', (e) => {
      const field = e.target.closest('form-field');
      if (field) {
        const fieldName = this.getFieldName(field);
        this.clearError(fieldName);
      }
    });

    this.form.addEventListener('change', (e) => {
      const field = e.target.closest('form-field');
      if (field) {
        const fieldName = this.getFieldName(field);
        this.clearError(fieldName);
      }
    });
  }

  getFieldName(fieldElement) {
    const field = fieldElement.querySelector('[name]');
    return field ? field.name : fieldElement.getAttribute('name');
  }

  displayErrors(errors) {
    this.form.querySelectorAll('form-field').forEach((field) => {
      field.setError(null);
    });

    Object.keys(errors).forEach((fieldName) => {
      const field = this.findFieldByName(fieldName);
      if (field) {
        field.setError(errors[fieldName]);
      }
    });
  }

  findFieldByName(fieldName) {
    return (
      this.form.querySelector(`[name="${fieldName}"]`)?.closest('form-field') ||
      this.form.querySelector(`[name="${fieldName}"]`)
    );
  }

  clearError(fieldName) {
    const field = this.findFieldByName(fieldName);
    if (field) {
      field.setError(null);
    }
  }
}
