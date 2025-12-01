# Form Module

A comprehensive form validation module that provides field management, validation rules, and error handling for your forms.

## Installation

```bash
npx capsule module add form
```

This will add the Form module to your `@capsule/modules/form` directory and automatically import it into your main `@capsule/index.js` file.

## Quick Start

The Form module consists of three main parts:

1. **CapsuleValidator** - The main validation class
2. **CapsuleRules** - Pre-built validation rules
3. **Form Components** - `form-field` and `form-message` web components

## Basic Example

```html
<form id="myForm">
  <form-field>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required />
    <form-message></form-message>
  </form-field>
  
  <form-field>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" required />
    <form-message></form-message>
  </form-field>
  
  <button type="submit">Submit</button>
</form>

<script type="module">
  import { CapsuleValidator, CapsuleRules } from '@capsule/modules/form/index.js';
  
  const validator = new CapsuleValidator('#myForm', {
    fields: {
      email: [
        CapsuleRules.required(),
        CapsuleRules.email(),
      ],
      password: [
        CapsuleRules.required(),
        CapsuleRules.min(8, 'Password must be at least 8 characters'),
      ],
    },
    onSubmit: async (values) => {
      console.log('Form submitted with values:', values);
      // Handle form submission
    },
  });
</script>
```

## Form Components

### form-field

A wrapper component that manages error states for form fields.

```html
<form-field>
  <label for="username">Username</label>
  <input type="text" id="username" name="username" />
  <form-message></form-message>
</form-field>
```

**Attributes:**
- Automatically gets error class when validation fails

**Methods:**
- `setError(message)` - Set error message on the field
- Automatically manages error state classes

### form-message

A component for displaying validation error messages.

```html
<form-message></form-message>
```

**Methods:**
- `setMessage(message)` - Display an error message
- `clearMessage()` - Clear the error message

## Validation Rules

The `CapsuleRules` class provides many pre-built validation rules:

### Basic Rules

```javascript
// Required field
CapsuleRules.required('This field is required')

// Email validation
CapsuleRules.email('Please enter a valid email')

// Minimum length
CapsuleRules.min(8, 'Must be at least 8 characters')

// Maximum length
CapsuleRules.max(100, 'Must be less than 100 characters')
```

### String Rules

```javascript
// URL validation
CapsuleRules.url('Please enter a valid URL')

// Phone number
CapsuleRules.phone('Please enter a valid phone number')

// Password strength
CapsuleRules.password('Password must be at least 8 characters with letters and numbers')

// Pattern matching
CapsuleRules.pattern(/^[A-Z]/, 'Must start with uppercase letter')

// Alphanumeric only
CapsuleRules.alphaNumeric('Only letters and numbers allowed')
```

### Number Rules

```javascript
// Minimum value
CapsuleRules.minValue(0, 'Must be at least 0')

// Maximum value
CapsuleRules.maxValue(100, 'Must be at most 100')

// Between values
CapsuleRules.between(1, 100, 'Must be between 1 and 100')

// Integer
CapsuleRules.integer('Must be an integer')

// Positive number
CapsuleRules.positive('Must be a positive number')
```

### Custom Rules

```javascript
// Custom validation function
const customRule = (value) => {
  if (value === 'forbidden') {
    return 'This value is not allowed';
  }
  return true; // Valid
};

// Use in validator
fields: {
  customField: [customRule],
}
```

### Async Rules

```javascript
import { CapsuleRules } from '@capsule/modules/form/index.js';

// Check if username is available
const checkUsername = async (username) => {
  const response = await fetch(`/api/check-username?username=${username}`);
  const data = await response.json();
  return data.available || 'Username is already taken';
};

fields: {
  username: [
    CapsuleRules.required(),
    CapsuleRules.async(checkUsername),
  ],
}
```

## Validator Options

```javascript
const validator = new CapsuleValidator('#myForm', {
  // Validation rules for each field
  fields: {
    email: [CapsuleRules.required(), CapsuleRules.email()],
  },
  
  // Validate on input events
  validateOnInput: true,
  
  // Validate on change events
  validateOnChange: false,
  
  // Stop validation on first error (default: true)
  bails: true,
  
  // Initial form values
  initialValues: {
    email: 'user@example.com',
  },
  
  // Custom selectors for form components
  formFieldSelector: 'form-field',
  formMessageSelector: 'form-message',
  
  // Callbacks
  onSubmit: async (values, helpers) => {
    // Handle successful submission
    helpers.reset(); // Reset form
  },
  
  onValidate: (result) => {
    // Called after validation (valid or invalid)
  },
  
  onError: async (errors, helpers) => {
    // Handle validation errors
  },
  
  onFieldValidate: (fieldName, result) => {
    // Called when a field is validated
  },
});
```

## Complete Example

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@capsule/global.css" />
  <script type="module" src="@capsule/index.js"></script>
</head>
<body>
  <form id="registrationForm">
    <form-field>
      <label for="name">Full Name</label>
      <input type="text" id="name" name="name" />
      <form-message></form-message>
    </form-field>
    
    <form-field>
      <label for="email">Email</label>
      <input type="email" id="email" name="email" />
      <form-message></form-message>
    </form-field>
    
    <form-field>
      <label for="password">Password</label>
      <input type="password" id="password" name="password" />
      <form-message></form-message>
    </form-field>
    
    <form-field>
      <label for="confirmPassword">Confirm Password</label>
      <input type="password" id="confirmPassword" name="confirmPassword" />
      <form-message></form-message>
    </form-field>
    
    <button type="submit">Register</button>
  </form>
  
  <script type="module">
    import { CapsuleValidator, CapsuleRules } from '@capsule/modules/form/index.js';
    
    const validator = new CapsuleValidator('#registrationForm', {
      fields: {
        name: [
          CapsuleRules.required('Name is required'),
          CapsuleRules.min(2, 'Name must be at least 2 characters'),
        ],
        email: [
          CapsuleRules.required('Email is required'),
          CapsuleRules.email('Please enter a valid email'),
        ],
        password: [
          CapsuleRules.required('Password is required'),
          CapsuleRules.min(8, 'Password must be at least 8 characters'),
          CapsuleRules.password('Password must contain letters and numbers'),
        ],
        confirmPassword: [
          CapsuleRules.required('Please confirm your password'),
          CapsuleRules.match('password', 'Passwords do not match'),
        ],
      },
      validateOnInput: true,
      onSubmit: async (values, { reset, setErrors, setFieldError }) => {
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          });
          
          if (!response.ok) {
            const errors = await response.json();
            setErrors(errors);
            return;
          }
          
          alert('Registration successful!');
          reset();
        } catch (error) {
          setFieldError('email', 'Network error. Please try again.');
        }
      },
    });
  </script>
</body>
</html>
```

## API Reference

### CapsuleValidator

#### Constructor

```javascript
new CapsuleValidator(formSelector, options)
```

- `formSelector` - CSS selector for the form element
- `options` - Configuration object (see Validator Options)

#### Methods

- `validate()` - Validate all fields, returns `Promise<{valid: boolean, values: object, errors: object}>`
- `validateField(fieldName)` - Validate a single field
- `setFieldError(fieldName, message)` - Set error message for a field
- `clearError(fieldName)` - Clear error for a field
- `displayErrors(errors)` - Display multiple errors at once
- `setValues(values)` - Set form values programmatically
- `getValues()` - Get current form values
- `reset()` - Reset form to initial state

## Styling

You can style the error states using CSS:

```css
form-field.error input {
  border-color: var(--capsule-color-error);
}

form-message {
  color: var(--capsule-color-error);
  font-size: var(--capsule-font-size-sm);
  margin-top: 0.25rem;
}
```
