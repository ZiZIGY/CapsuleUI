# CapsuleUI Variant System

Единая система вариантов для всех компонентов CapsuleUI.

## 🎨 Color Variants

### Основные цвета

- **`primary`** - Основной цвет бренда
- **`secondary`** - Вторичный цвет (нейтральный)
- **`error`** / **`destructive`** - Цвет ошибки/опасности (красный)
- **`warning`** - Цвет предупреждения (желтый/оранжевый)
- **`success`** - Цвет успеха (зеленый)
- **`info`** - Информационный цвет (синий)

### Специальные цвета

- **`default`** - Дефолтный цвет (обычно primary или neutral)

## 🎭 Visual Variants

### Button & Interactive Components

- **`primary`** - Заполненная кнопка основного цвета
- **`secondary`** - Заполненная кнопка вторичного цвета
- **`outline`** - Кнопка с обводкой, прозрачным фоном
- **`text`** - Текстовая кнопка без фона и обводки
- **`ghost`** - Призрачная кнопка с полупрозрачным фоном

### Alert & Status Components

- **`default`** - Стандартный стиль
- **`destructive`** - Стиль ошибки/опасности
- **`warning`** - Стиль предупреждения
- **`success`** - Стиль успеха
- **`info`** - Информационный стиль

### Badge & Chip Components

- **`default`** - Стандартный стиль
- **`outline`** - С обводкой
- **`ghost`** - Призрачный стиль
- **`dot`** - Точка вместо текста (только Badge)

### Pagination Components

- **`default`** - Стандартный стиль
- **`outline`** - С обводкой
- **`ghost`** - Призрачный стиль

## 📏 Size Variants

### Стандартные размеры

- **`xs`** - Extra small (очень маленький)
- **`sm`** - Small (маленький)
- **`md`** - Medium (средний, дефолтный)
- **`lg`** - Large (большой)
- **`xl`** - Extra large (очень большой)

### Компонент-специфичные размеры

- **Rating**: `sm` (16px), `md` (24px), `lg` (32px)
- **Switch**: `sm` (28px), `md` (36px), `lg` (44px)
- **Skeleton**: `sm`, `md`, `lg` (высота)

## 🎯 Orientation Variants

### Направление компонентов

- **`horizontal`** - Горизонтальное (дефолт)
- **`vertical`** - Вертикальное

### Применяется к:

- **Divider** - направление разделителя
- **Stepper** - направление шагов
- **Range** - направление слайдера
- **ButtonGroup** - направление кнопок

## 📍 Position Variants

### Позиционирование элементов

- **`top-left`** - Верхний левый угол
- **`top-right`** - Верхний правый угол (дефолт)
- **`bottom-left`** - Нижний левый угол
- **`bottom-right`** - Нижний правый угол

### Применяется к:

- **Badge** - позиция бейджа относительно родителя
- **Tooltip** - позиция всплывающей подсказки

## 🎬 Animation Variants

### Анимации переходов

- **`fade`** - Плавное появление/исчезновение
- **`x`** - Горизонтальный сдвиг
- **`y`** - Вертикальный сдвиг
- **`scale`** - Масштабирование

### Применяется к:

- **Tabs** - анимация переключения панелей
- **Modal** - анимация появления модального окна

## 🎨 Shape Variants

### Формы элементов

- **`rectangular`** - Прямоугольная (дефолт)
- **`circular`** - Круглая
- **`rounded`** - Скругленная
- **`pill`** - Капсульная (полностью скругленная)

### Применяется к:

- **Skeleton** - форма скелетона
- **Avatar** - форма аватара
- **Button** - форма кнопки

## 🎯 Thickness Variants

### Толщина элементов

- **`thin`** - Тонкий
- **`normal`** - Обычный (дефолт)
- **`thick`** - Толстый

### Применяется к:

- **Divider** - толщина разделителя
- **Border** - толщина границ

## 📋 Placement Variants

### Размещение элементов

- **`top`** - Сверху
- **`bottom`** - Снизу
- **`left`** - Слева
- **`right`** - Справа
- **`center`** - По центру

### Применяется к:

- **Tooltip** - размещение всплывающей подсказки
- **Popover** - размещение всплывающего окна

## 🎭 Type Variants

### Типы поведения

- **`single`** - Одиночный выбор
- **`multiple`** - Множественный выбор
- **`collapsible`** - Сворачиваемый

### Применяется к:

- **Accordion** - тип поведения аккордеона
- **Tabs** - тип переключения табов

## 📊 Status Variants

### Состояния элементов

- **`loading`** - Загрузка
- **`disabled`** - Отключен
- **`readonly`** - Только для чтения
- **`active`** - Активный
- **`inactive`** - Неактивный

## 🎨 Component-Specific Variants

### Button

```html
<button
  variant="primary|secondary|outline|text|ghost|success|error|warning"
  size="xs|sm|md|lg|xl"
></button>
```

### Alert

```html
<alert variant="default|destructive|warning|success|info"></alert>
```

### Badge

```html
<badge
  color="primary|secondary|error|warning|success|info"
  variant="default|outline|ghost|dot"
  position="top-left|top-right|bottom-left|bottom-right"
></badge>
```

### Chip

```html
<chip
  color="primary|secondary|error|warning|success"
  variant="default|outline|ghost"
  size="sm|md|lg"
></chip>
```

### Divider

```html
<divider
  orientation="horizontal|vertical"
  thickness="thin|normal|thick"
  color="primary|error|warning|success"
  variant="default|ghost"
></divider>
```

### Pagination

```html
<pagination
  variant="default|outline|ghost"
  color="primary|secondary|error|warning|success"
  size="sm|md|lg"
></pagination>
```

### Rating

```html
<rating
  color="primary|error|success|secondary"
  size="sm|md|lg"
></rating>
```

### Switch

```html
<switch size="sm|md|lg"></switch>
```

### Tabs

```html
<tabs
  animation="fade|x|y"
  type="single|multiple|collapsible"
></tabs>
```

### Tooltip

```html
<tooltip placement="top|bottom|left|right"></tooltip>
```

### Range

```html
<range
  orientation="horizontal|vertical"
  size="sm|md|lg"
></range>
```

### Skeleton

```html
<skeleton variant="rectangular|text|circular"></skeleton>
```

### Stepper

```html
<stepper orientation="horizontal|vertical"></stepper>
```

## 🎯 Правила именования

### Атрибуты

- **`variant`** - основной визуальный стиль
- **`color`** - цветовая схема
- **`size`** - размер
- **`orientation`** - направление
- **`position`** - позиция
- **`placement`** - размещение
- **`animation`** - анимация
- **`type`** - тип поведения
- **`thickness`** - толщина

### Значения

- Всегда в kebab-case: `top-left`, `extra-large`
- Дефолтные значения не указываются в атрибуте
- Булевые состояния: `disabled`, `readonly`, `active`

## 🎨 CSS Custom Properties

### Цвета

```css
--capsule-color-primary
--capsule-color-secondary
--capsule-color-error / --capsule-color-destructive
--capsule-color-warning
--capsule-color-success
--capsule-color-info
--capsule-color-text
--capsule-color-text-secondary
--capsule-color-background
--capsule-color-surface
--capsule-color-outline
```

### Размеры

```css
--capsule-font-size-xs
--capsule-font-size-sm
--capsule-font-size-md
--capsule-font-size-lg
--capsule-font-size-xl
```

### Отступы

```css
--capsule-padding-xs
--capsule-padding-sm
--capsule-padding-md
--capsule-padding-lg
--capsule-padding-xl
```

### Радиусы

```css
--capsule-radius-sm
--capsule-radius-md
--capsule-radius-lg
--capsule-radius-full
```

## 🚀 Примеры использования

### Button с разными вариантами

```html
<button
  variant="primary"
  size="lg"
  >Primary Large</button
>
<button
  variant="outline"
  color="error"
  >Error Outline</button
>
<button
  variant="ghost"
  size="sm"
  >Ghost Small</button
>
```

### Alert с разными типами

```html
<alert variant="success">Operation completed!</alert>
<alert variant="destructive">Error occurred!</alert>
<alert variant="warning">Please check your input</alert>
```

### Badge с позиционированием

```html
<badge
  color="error"
  variant="dot"
  position="top-right"
  >5</badge
>
<badge
  color="success"
  variant="outline"
  >New</badge
>
```

Эта система обеспечивает консистентность и предсказуемость во всех компонентах CapsuleUI.
