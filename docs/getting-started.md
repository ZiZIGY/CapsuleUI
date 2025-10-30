# Getting Started

CapsuleUI is a collection of modern, unstyled web components that you can add to your project just like shadcn/ui, but for web components. Instead of installing a package, you copy and paste code into your project.

## Installation

To get started with CapsuleUI, initialize it in your project:

```bash
npx capsule init
```

This command creates an `@capsule` folder in your project with global styles and utilities.

### Custom Directory

You can specify a custom directory where `@capsule` will be created:

```bash
npx capsule init -d src
```

This will create the `@capsule` folder in the `src` directory.

## Adding Components

Once initialized, you can add any component to your project:

```bash
npx capsule add <component-name>
```

For example, to add a Button component:

```bash
npx capsule add Button
```

### Custom Element Prefix

By default, components use the `capsule` prefix (e.g., `capsule-button`). You can customize this with the `--prefix` option:

```bash
npx capsule add Button --prefix ui
```

This will create components with the `ui` prefix (e.g., `ui-button`).

## Available Commands

For a complete list of all available CLI commands, options, and examples, see the [CLI Commands](/cli-commands) documentation.

## How It Works

When you run `npx capsule add <component>`, the CLI:

1. Copies the component files from the templates directory
2. Imports CSS files into your global styles
3. Imports JavaScript files into the components index
4. Updates VS Code settings if needed

All components are added to your project's `@capsule/components` directory and are fully customizable.

## Including Styles and Scripts

If you use CapsuleUI in a plain HTML page, add global styles and the main JS file directly to your index.html:

```html
<link
  rel="stylesheet"
  href="@capsule/global.css"
/>
<script
  type="module"
  src="@capsule/index.js"
></script>
```

If you use a bundler (Vite, Webpack, etc.) or a framework (React, Vue, etc.), simply import them in your root JS/TS entry:

```js
import '@capsule/global.css';
import '@capsule/index.js';
```

## Next Steps

- Browse the [Components](/components/button) section to see all available components
- Check out the [Examples](/examples) to see components in action
- Read about [Theming](/theming) to customize component styles
