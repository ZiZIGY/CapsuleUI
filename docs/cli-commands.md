# CLI Commands

CapsuleUI provides a simple CLI to manage your components and project setup. All commands are prefixed with `npx capsule`.

## Commands

### `npx @zizigy/capsule init`

Initializes CapsuleUI in your project. Creates the `@capsule` folder with global styles and utilities.

**Usage:**

```bash
npx @zizigy/capsule init
```

**Options:**

- `-d, --dir <directory>` - Base directory where `@capsule` will be created (default: project root)

**Example:**

```bash
# Initialize in project root
npx @zizigy/capsule init

# Initialize in src directory
npx @zizigy/capsule init -d src
```

**What it does:**

- Creates `@capsule` folder structure
- Copies global styles and utilities
- Sets up component registry

---

### `npx @zizigy/capsule add <component>`

Adds a component to your project from the available templates.

**Usage:**

```bash
npx @zizigy/capsule add <component-name>
```

**Options:**

- `-p, --prefix <prefix>` - Custom element prefix (default: `capsule`)

**Examples:**

```bash
# Add a Button component with default prefix
npx @zizigy/capsule add Button

# Add a Button component with custom prefix
npx @zizigy/capsule add Button --prefix ui

# Add multiple components
npx @zizigy/capsule add Button
npx @zizigy/capsule add Alert
npx @zizigy/capsule add Accordion
```

**What it does:**

1. Copies component files from templates
2. Replaces `__PREFIX__` and `__COMPONENT__` placeholders
3. Renames files to match your prefix (e.g., `capsule-button.js`)
4. Imports CSS files into global styles
5. Imports JavaScript files into components index
6. Updates VS Code settings if needed

---

### `npx @zizigy/capsule list`

Lists all available components that can be added to your project.

**Usage:**

```bash
npx @zizigy/capsule list
```

**Example output:**

```
Available components:

  - Accordion
  - Alert
  - Autocomplete
  - Badge
  - Breadcrumb
  - Button
  - ButtonGroup
  - Chip
  - Divider
  - Pagination
  - Range
  - Rating
  - ScrollArea
  - Skeleton
  - Stepper
  - Switch
  - Tabs
  - Tooltip
```

---

### `npx @zizigy/capsule module <action> [name]`

Manages modules in your project (like form validation utilities).

**Usage:**

```bash
npx @zizigy/capsule module <action> [name]
```

**Actions:**

- `add <name>` - Add a module to your project
- `remove <name>` - Remove a module from your project
- `list` - List all available modules

**Examples:**

```bash
# List available modules
npx @zizigy/capsule module list

# Add a specific module
npx @zizigy/capsule module add form

# Remove a module
npx @zizigy/capsule module remove form
```

**Available modules:**

- `form` - Form validation utilities

---

### `npx @zizigy/capsule debug`

Helps debug CapsuleUI installation and configuration issues.

**Usage:**

```bash
npx @zizigy/capsule debug
```

**What it does:**

- Checks if `@capsule` folder exists
- Validates component structure
- Shows current configuration
- Provides troubleshooting information

---

### `npx @zizigy/capsule vscode`

Updates VS Code settings for better autocomplete and IntelliSense support.

**Usage:**

```bash
npx @zizigy/capsule vscode
```

**What it does:**

- Updates VS Code HTML custom data
- Enables IntelliSense for component attributes
- Improves autocomplete in VS Code

---

## Global Options

All commands support these global options:

- `--help, -h` - Display help for the command
- `--version, -v` - Display version number

## Tips

- Always run `npx @zizigy/capsule init` first in a new project
- Use `npx @zizigy/capsule list` to see all available components
- Components are case-sensitive (use `Button` not `button`)
- Custom prefixes must be lowercase and contain no special characters
