# Stepper

A multi-step form component for breaking down complex processes into manageable steps. The component handles state management and provides a programmatic API for navigation.

## Installation

```bash
npx capsule add Stepper
```

## Usage

### Basic Stepper

The Stepper provides the structure and state management. You'll need to add your own visual styles for step indicators, lines, and animations.

<div style="margin: 1rem 0; border-radius: 8px; padding: 1.5rem;">
  <capsule-stepper current-step="1" id="stepper-basic">
    <capsule-stepper-steps>
      <capsule-stepper-step>Account</capsule-stepper-step>
      <capsule-stepper-step>Profile</capsule-stepper-step>
      <capsule-stepper-step>Review</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Account Information</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Create your account</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <capsule-button onclick="document.getElementById('stepper-basic').next()">Next</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Profile Details</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Complete your profile</p>
          <div style="display: flex; gap: 0.5rem; justify-content: space-between;">
            <capsule-button onclick="document.getElementById('stepper-basic').previous()">Previous</capsule-button>
            <capsule-button onclick="document.getElementById('stepper-basic').next()">Next</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Review</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Review your information</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-start;">
            <capsule-button onclick="document.getElementById('stepper-basic').previous()">Previous</capsule-button>
          </div>
        </div>
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

<div style="margin: 1rem 0; border-radius: 8px; padding: 1.5rem;">
  <capsule-stepper current-step="2" id="stepper-example">
    <capsule-stepper-steps>
      <capsule-stepper-step>Step 1</capsule-stepper-step>
      <capsule-stepper-step>Step 2</capsule-stepper-step>
      <capsule-stepper-step>Step 3</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">First Step</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Content for step 1</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <capsule-button onclick="document.getElementById('stepper-example').next()">Next</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Second Step</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Content for step 2</p>
          <div style="display: flex; gap: 0.5rem; justify-content: space-between;">
            <capsule-button onclick="document.getElementById('stepper-example').previous()">Previous</capsule-button>
            <capsule-button onclick="document.getElementById('stepper-example').next()">Next</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Third Step</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Content for step 3</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-start;">
            <capsule-button onclick="document.getElementById('stepper-example').previous()">Previous</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
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

<div style="margin: 1rem 0; border-radius: 8px; padding: 1.5rem;">
  <capsule-stepper current-step="1" orientation="vertical" id="stepper-vertical">
    <capsule-stepper-steps>
      <capsule-stepper-step>Start</capsule-stepper-step>
      <capsule-stepper-step>Progress</capsule-stepper-step>
      <capsule-stepper-step>Complete</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels animation="y">
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Start</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Vertical layout for steps</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <capsule-button onclick="document.getElementById('stepper-vertical').next()">Next</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Progress</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Each step below the previous</p>
          <div style="display: flex; gap: 0.5rem; justify-content: space-between;">
            <capsule-button onclick="document.getElementById('stepper-vertical').previous()">Previous</capsule-button>
            <capsule-button onclick="document.getElementById('stepper-vertical').next()">Next</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Complete</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Best for mobile interfaces</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-start;">
            <capsule-button onclick="document.getElementById('stepper-vertical').previous()">Previous</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
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

<div style="margin: 1rem 0; border-radius: 8px; padding: 1.5rem;">
  <capsule-stepper current-step="2" id="stepper-anim">
    <capsule-stepper-steps>
      <capsule-stepper-step>1</capsule-stepper-step>
      <capsule-stepper-step>2</capsule-stepper-step>
      <capsule-stepper-step>3</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels animation="x">
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Slide 1</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Slide transition X</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <capsule-button onclick="document.getElementById('stepper-anim').next()">Next</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Slide 2</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Horizontal sliding effect</p>
          <div style="display: flex; gap: 0.5rem; justify-content: space-between;">
            <capsule-button onclick="document.getElementById('stepper-anim').previous()">Previous</capsule-button>
            <capsule-button onclick="document.getElementById('stepper-anim').next()">Next</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Slide 3</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Panels slide left/right</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-start;">
            <capsule-button onclick="document.getElementById('stepper-anim').previous()">Previous</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
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

| Attribute      | Type   | Default | Description                                 |
| -------------- | ------ | ------- | ------------------------------------------- |
| `current-step` | number | 1       | Current active step (1-indexed)             |
| `orientation`  | string | -       | Layout direction (`vertical`, `horizontal`) |

#### Orientation Values

- `vertical` — Steps arranged vertically
- `horizontal` — Steps arranged horizontally (default if not specified)

### `capsule-stepper-steps`

Container for step indicators. No attributes.

### `capsule-stepper-step`

Individual step indicator.

| Attribute | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| `status`  | string | Step status (`active`, `completed`, `inactive`) |

#### Status Values

- `active` — Currently active step
- `completed` — Step has been completed
- `inactive` — Step not yet reached

### `capsule-stepper-panels`

Container for panel content.

| Attribute     | Type   | Default | Description                                    |
| ------------- | ------ | ------- | ---------------------------------------------- |
| `animation`   | string | -       | Animation type (`x`, `y`, `none`)              |
| `orientation` | string | -       | Direction of panels (`vertical`, `horizontal`) |

#### Animation Values

- `x` — Horizontal slide animation (default for horizontal stepper)
- `y` — Vertical slide animation (default for vertical stepper)
- `none` — No animation

#### Orientation Values

- `vertical` — Panels arranged vertically
- `horizontal` — Panels arranged horizontally

### `capsule-stepper-panel`

Individual content panel.

| Attribute | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `status`  | string | Panel status (`active`, `inactive`) |

#### Status Values

- `active` — Currently visible panel
- `inactive` — Hidden panel

## Attributes

All attributes are described in the Components section above. Here are additional details:

### `status` attribute values

For `capsule-stepper-step`:

- `active` — Currently active step
- `completed` — Step that has been completed
- `inactive` — Step not yet reached

For `capsule-stepper-panel`:

- `active` — Currently visible panel
- `inactive` — Hidden panel

### `animation` attribute values

For `capsule-stepper-panels`:

- `x` — Horizontal slide animation
- `y` — Vertical slide animation
- `none` — No animation

### `orientation` attribute values

For `capsule-stepper`:

- `vertical` — Vertical layout

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
