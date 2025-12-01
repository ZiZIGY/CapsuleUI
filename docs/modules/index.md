# Modules

CapsuleUI modules are reusable functionality packages that extend the capabilities of your application. Unlike components, modules provide logic and utilities that can be used across multiple components.

## Available Modules

### Form

- **[Form Module](/modules/form)** - Complete form validation system with field management and error handling

## Adding a Module

To add a module to your project, use:

```bash
npx capsule module add <module-name>
```

For example, to add the Form module:

```bash
npx capsule module add form
```

See the [CLI Commands](/cli-commands) documentation for more information about module management.

## Module vs Component

- **Components** are UI elements that you can see and interact with (buttons, inputs, etc.)
- **Modules** provide functionality and logic that enhance your application (validation, utilities, etc.)

Modules are added to `@capsule/modules` and automatically imported into your main `@capsule/index.js` file.
