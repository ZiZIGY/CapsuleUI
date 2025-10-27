# Stepper

A multi-step form component for breaking down complex processes into manageable steps. The component handles state management and provides a programmatic API for navigation.

## Installation

```bash
npx capsule add Stepper
```

## Usage

### Basic Stepper

The Stepper provides the structure and state management. You'll need to add your own visual styles for step indicators, lines, and animations.

<div style="margin: 1rem 0; max-width: 500px;">
  <capsule-stepper current-step="1">
    <capsule-stepper-steps>
      <capsule-stepper-step>Account</capsule-stepper-step>
      <capsule-stepper-step>Profile</capsule-stepper-step>
      <capsule-stepper-step>Review</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels>
      <capsule-stepper-panel>
        <h3>Account Information</h3>
        <p>Create your account</p>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <h3>Profile Details</h3>
        <p>Complete your profile</p>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <h3>Review</h3>
        <p>Review your information</p>
      </capsule-stepper-panel>
    </capsule-stepper-panels>
  </capsule-stepper>
</div>

```html
<capsule-stepper current-step="1">
  <capsule-stepper-steps>
    <capsule-stepper-step>Account</capsule-stepper-step>
    <capsule-stepper-step>Profile</capsule-stepper-step>
    <capsule-stepper-step>Review</capsule-stepper-step>
  </capsule-stepper-steps>
  <capsule-stepper-panels>
    <capsule-stepper-panel>...</capsule-stepper-panel>
    <capsule-stepper-panel>...</capsule-stepper-panel>
    <capsule-stepper-panel>...</capsule-stepper-panel>
  </capsule-stepper-panels>
</capsule-stepper>
```

### Navigation

<div style="margin: 1rem 0; max-width: 500px;">
  <capsule-stepper current-step="2" id="stepper-example">
    <capsule-stepper-steps>
      <capsule-stepper-step>Step 1</capsule-stepper-step>
      <capsule-stepper-step>Step 2</capsule-stepper-step>
      <capsule-stepper-step>Step 3</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels>
      <capsule-stepper-panel>Content for step 1</capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="margin-bottom: 1rem;">
          <capsule-button onclick="document.getElementById('stepper-example').previous()">
            Previous
          </capsule-button>
          <capsule-button onclick="document.getElementById('stepper-example').next()">
            Next
          </capsule-button>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>Content for step 3</capsule-stepper-panel>
    </capsule-stepper-panels>
  </capsule-stepper>
</div>

```javascript
const stepper = document.querySelector('capsule-stepper');

// Navigate programmatically
stepper.next(); // Go to next step
stepper.previous(); // Go to previous step
stepper.setStep(3); // Jump to specific step
stepper.first(); // Go to first step
stepper.last(); // Go to last step
stepper.reset(); // Reset to first step
```

### Orientation

<div style="margin: 1rem 0;">
  <capsule-stepper current-step="1" orientation="vertical">
    <capsule-stepper-steps>
      <capsule-stepper-step>Start</capsule-stepper-step>
      <capsule-stepper-step>Progress</capsule-stepper-step>
      <capsule-stepper-step>Complete</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels>
      <capsule-stepper-panel>Vertical layout for steps</capsule-stepper-panel>
      <capsule-stepper-panel>Each step below the previous</capsule-stepper-panel>
      <capsule-stepper-panel>Best for mobile interfaces</capsule-stepper-panel>
    </capsule-stepper-panels>
  </capsule-stepper>
</div>

```html
<capsule-stepper
  current-step="1"
  orientation="vertical"
>
  ...
</capsule-stepper>
```

### Animation

<div style="margin: 1rem 0; max-width: 500px;">
  <capsule-stepper current-step="2" id="stepper-anim">
    <capsule-stepper-steps>
      <capsule-stepper-step>1</capsule-stepper-step>
      <capsule-stepper-step>2</capsule-stepper-step>
      <capsule-stepper-step>3</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels animation="x">
      <capsule-stepper-panel>Slide transition X</capsule-stepper-panel>
      <capsule-stepper-panel>Horizontal sliding effect</capsule-stepper-panel>
      <capsule-stepper-panel>Panels slide left/right</capsule-stepper-panel>
    </capsule-stepper-panels>
  </capsule-stepper>
</div>

```html
<capsule-stepper-panels animation="x">
  <!-- Horizontal slide animation -->
</capsule-stepper-panels>

<capsule-stepper-panels animation="y">
  <!-- Vertical slide animation -->
</capsule-stepper-panels>
```

## Components

The Stepper component consists of several sub-components:

### `capsule-stepper`

Main container that manages the current step and provides navigation API.

### `capsule-stepper-steps`

Container for step indicators. Automatically applies status attributes to each step.

### `capsule-stepper-step`

Individual step indicator. Receives `status` attribute (`active`, `completed`, `inactive`).

```html
<capsule-stepper-step>Step Label</capsule-stepper-step>
```

### `capsule-stepper-panels`

Container for panel content. Manages which panel is visible based on current step.

### `capsule-stepper-panel`

Individual content panel. Receives `status` attribute (`active`, `inactive`).

```html
<capsule-stepper-panel> Your content here </capsule-stepper-panel>
```

## Attributes

### `capsule-stepper`

| Attribute      | Type   | Default | Description                     |
| -------------- | ------ | ------- | ------------------------------- |
| `current-step` | number | 1       | Current active step (1-indexed) |
| `orientation`  | string | -       | Layout direction (vertical)     |

### `capsule-stepper-steps`

No attributes.

### `capsule-stepper-step`

The step automatically receives `status` attribute with values:

- `active` — Currently active step
- `completed` — Step that has been completed
- `inactive` — Step not yet reached

### `capsule-stepper-panels`

| Attribute   | Type   | Default | Description           |
| ----------- | ------ | ------- | --------------------- |
| `animation` | string | -       | Animation type (x, y) |

### `capsule-stepper-panel`

The panel automatically receives `status` attribute with values:

- `active` — Currently visible panel
- `inactive` — Hidden panel

## API Methods

### Navigation

| Method       | Returns | Description                       |
| ------------ | ------- | --------------------------------- |
| `next()`     | boolean | Go to next step                   |
| `previous()` | boolean | Go to previous step               |
| `setStep(n)` | void    | Jump to specific step (1-indexed) |
| `first()`    | void    | Go to first step                  |
| `last()`     | void    | Go to last step                   |
| `reset()`    | void    | Reset to first step               |

### State Checks

| Method            | Returns | Description                   |
| ----------------- | ------- | ----------------------------- |
| `canGoNext()`     | boolean | Can navigate to next step     |
| `canGoPrevious()` | boolean | Can navigate to previous step |

### Getters

| Property      | Returns | Description                          |
| ------------- | ------- | ------------------------------------ |
| `currentStep` | number  | Current step number (1-indexed)      |
| `totalSteps`  | number  | Total number of steps                |
| `status`      | object  | Status object with current step info |

## Events

### `change`

Dispatched when the current step changes.

```javascript
stepper.addEventListener('change', (e) => {
  console.log(e.detail); // { current, total, isFirst, isLast, progress }
});
```

## Styling

The component provides minimal CSS for layout only. You need to style:

- **Step indicators**: Circles, numbers, icons, checkmarks
- **Connector lines**: Lines between steps
- **Panel transitions**: Custom animations if needed
- **State variations**: Active, completed, inactive styles

Example CSS structure:

```css
/* Your custom styles */
capsule-stepper-step[status='active'] {
  color: blue;
}

capsule-stepper-step[status='completed'] {
  color: green;
}

capsule-stepper-step[status='inactive'] {
  color: gray;
}
```

## Accessibility

- ✅ Automatic ARIA attributes for step status
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Semantic structure for screen readers
