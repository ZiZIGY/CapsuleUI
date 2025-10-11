# CapsuleUI Source Code Documentation

This document describes the internal architecture, namespaces, and development guidelines for CapsuleUI.

## Project Structure

```
src/
├── @template/          # Template system for component generation
├── cli/               # Command-line interface and tools
├── modules/           # Core modules (forms, validation, etc.)
└── templates/         # Component templates
```

## Namespaces and Conventions

### Component Templates (`src/templates/`)

Each component template follows a specific structure:

```
ComponentName/
├── component.js           # Main component file
├── component-part.js      # Sub-components (panels, steps, etc.)
├── component.style.css    # Component styles
├── register.js           # Import orchestration (CRITICAL for loading order)
├── variants.js           # Component variants (optional)
├── vscode.data.json      # VS Code IntelliSense data
└── README.md             # Component documentation
```

#### Placeholders System

Templates use placeholders that get replaced during component installation:

- `__PREFIX__` - Component prefix (default: "capsule")
- `__COMPONENT__` - Component name in kebab-case

**Example:**

```javascript
// In template: stepper/register.js
import './__PREFIX__-__COMPONENT__-panels.js';
import './__PREFIX__-__COMPONENT__-steps.js';

// After installation with prefix "ui":
import './ui-stepper-panels.js';
import './ui-stepper-steps.js';
```

### Register.js Pattern

**Critical:** Components with multiple sub-components MUST use `register.js` to ensure correct loading order.

```javascript
// register.js - Import order matters for web components
import './__PREFIX__-__COMPONENT__-panels.js'; // Child components first
import './__PREFIX__-__COMPONENT__-steps.js'; // Then parent components
import './__PREFIX__-__COMPONENT__-panel.js';
import './__PREFIX__-__COMPONENT__-step.js';
import './__PREFIX__-__COMPONENT__.js'; // Main component last
```

This pattern solves web component initialization issues where parent components try to access child components that haven't been registered yet.

### CLI Architecture (`src/cli/`)

The CLI is modularized for maintainability:

```
cli/
├── commands/
│   ├── add/
│   │   ├── index.ts              # Main add command
│   │   ├── component-processor.ts # Component processing logic
│   │   ├── css-importer.ts       # CSS auto-import functionality
│   │   ├── file-operations.ts    # File manipulation utilities
│   │   ├── js-importer.ts        # JS auto-import (register.js support)
│   │   ├── minification.ts       # JS minification utilities
│   │   └── vscode-updater.ts     # VS Code settings management
│   ├── init.ts                   # Project initialization
│   ├── list.ts                   # Component listing
│   └── ...
├── filesystem.ts                 # File system utilities
├── prompts.ts                    # Interactive prompts
└── utils.ts                      # General utilities
```

### Core Modules (`src/modules/`)

Reusable modules that can be shared across components:

- **Form Module**: Validation, field management, error handling
- **Utility Functions**: Common helpers for component development

## Development Guidelines

### Adding New Components

1. **Create template structure** in `src/templates/ComponentName/`
2. **Use placeholders** for dynamic naming (`__PREFIX__`, `__COMPONENT__`)
3. **Include register.js** for multi-part components
4. **Add VS Code data** for IntelliSense support
5. **Test installation** with `capsule add ComponentName`

### Component Naming Convention

- **Template folders**: PascalCase (`Stepper`, `DataTable`)
- **Generated files**: kebab-case with prefix (`capsule-stepper`, `ui-data-table`)
- **Web components**: kebab-case (`<capsule-stepper>`, `<ui-data-table>`)

### File Processing Order

During component installation, files are processed in this order:

1. **Copy** template files to destination
2. **Replace placeholders** in all file contents
3. **Rename files** with placeholders in names
4. **Process JS files** (merge variants, minify, handle register.js specially)
5. **Auto-import CSS** to global.css
6. **Auto-import JS** via register.js to all.js
7. **Update VS Code** settings for IntelliSense

### Register.js Special Handling

The `register.js` file is processed differently:

- ✅ **Placeholder replacement** (**PREFIX**, **COMPONENT**)
- ✅ **Minification** (if enabled)
- ❌ **Variants merging** (not applicable)
- ❌ **Import/export removal** (must preserve imports)

This ensures the import orchestration remains intact while still benefiting from placeholder replacement and minification.

## Contributing

When contributing to CapsuleUI:

1. **Follow the template structure** described above
2. **Test component installation** thoroughly
3. **Ensure register.js loading order** is correct
4. **Add VS Code IntelliSense data** for better DX
5. **Update this documentation** if adding new patterns

## Web Component Considerations

- Components are loaded as ES modules
- No DOMContentLoaded dependency - components initialize immediately
- Loading order matters for parent-child component relationships
- Use register.js to control initialization sequence
- Components should be self-contained and not depend on external loading order

## Troubleshooting

### Empty register.js after installation

This usually means placeholder replacement failed. Check:

1. Template has correct placeholder syntax
2. Component name is valid
3. Prefix is properly set
4. File permissions allow writing

### Component initialization errors

Usually indicates incorrect loading order:

1. Verify register.js import order (children first, parents last)
2. Check that all referenced files exist
3. Ensure no circular dependencies
4. Test in isolation before integration
