# Tour

Компонент тура для пошагового руководства пользователя по интерфейсу. Выделяет целевые элементы и отображает инструкции по шагам.

## Установка

```bash
npx @zizigy/capsule add Tour
```

## Использование

### Базовый тур

<div style="margin: 1rem 0;">
  <capsule-button id="tour-button1">Button 1</capsule-button>
  <capsule-button id="tour-button2">Button 2</capsule-button>
  
  <capsule-tour id="my-tour" hidden>
    <capsule-tour-step value="1" target="#tour-button1" position="bottom">
      <h3 style="margin: 0 0 0.5rem 0;">Привет!</h3>
      <p style="margin: 0 0 1rem 0;">Это ваша основная кнопка</p>
      <div style="display: flex; gap: 0.5rem;">
        <capsule-button onclick="document.getElementById('my-tour').skip()">Окей</capsule-button>
      </div>
    </capsule-tour-step>
  </capsule-tour>
  
  <capsule-button color="success" onclick="document.getElementById('my-tour').start()">Начать тур</capsule-button>
</div>

```html
<button id="my-button">Нажми меня</button>

<capsule-tour id="my-tour">
  <capsule-tour-step
    value="1"
    target="#my-button"
    position="bottom"
  >
    <h3>Добро пожаловать!</h3>
    <p>Это ваша главная кнопка</p>
    <button onclick="document.getElementById('my-tour').next()">Далее</button>
  </capsule-tour-step>
</capsule-tour>

<script>
  // Начать тур
  document.getElementById('my-tour').start();
</script>
```

### Варианты позиционирования

Шаг тура может быть позиционирован относительно целевого элемента:

- `top` - Сверху от цели
- `bottom` - Снизу от цели (по умолчанию)
- `left` - Слева от цели
- `right` - Справа от цели

```html
<capsule-tour-step
  value="1"
  target="#element"
  position="top"
>
  <!-- Контент -->
</capsule-tour-step>
```

### Программное управление

Управляйте туром с помощью JavaScript API:

```html
<capsule-tour id="my-tour">
  <capsule-tour-step
    value="1"
    target="#button1"
    >Шаг 1</capsule-tour-step
  >
  <capsule-tour-step
    value="2"
    target="#button2"
    >Шаг 2</capsule-tour-step
  >
  <capsule-tour-step
    value="3"
    target="#button3"
    >Шаг 3</capsule-tour-step
  >
</capsule-tour>

<script>
  const tour = document.getElementById('my-tour');

  // Начать тур
  tour.start();

  // Навигация
  tour.next(); // Перейти к следующему шагу
  tour.prev(); // Перейти к предыдущему шагу
  tour.goToStep(2); // Перейти к конкретному шагу
  tour.skip(); // Пропустить/закрыть тур

  // Проверка состояния
  tour.isActive(); // Возвращает true, если тур активен
  tour.getCurrentStep(); // Возвращает номер текущего шага
  tour.getTotalSteps(); // Возвращает общее количество шагов
</script>
```

## Атрибуты

### `capsule-tour`

| Атрибут | Тип    | По умолчанию | Описание                                                                           |
| ------- | ------ | ------------ | ---------------------------------------------------------------------------------- |
| `value` | number | —            | Номер текущего активного шага (начиная с 1). Если пустое или невалидное, тур скрыт |

### `capsule-tour-step`

| Атрибут    | Тип    | По умолчанию | Описание                                                    |
| ---------- | ------ | ------------ | ----------------------------------------------------------- |
| `value`    | number | —            | Номер шага (начиная с 1)                                    |
| `target`   | string | —            | CSS селектор целевого элемента                              |
| `position` | string | `bottom`     | Позиция относительно цели: `top`, `bottom`, `left`, `right` |

## Методы

### `start()`

Начать тур с первого шага.

```javascript
tour.start();
```

### `next()`

Перейти к следующему шагу.

```javascript
tour.next(); // Возвращает true, если перешел, false если уже на последнем шаге
```

### `prev()`

Перейти к предыдущему шагу.

```javascript
tour.prev(); // Возвращает true, если перешел, false если уже на первом шаге
```

### `skip()`

Пропустить/закрыть тур.

```javascript
tour.skip();
```

### `goToStep(stepNumber)`

Перейти к конкретному шагу.

```javascript
tour.goToStep(2); // Перейти к шагу 2
```

### `getCurrentStep()`

Получить номер текущего шага.

```javascript
const step = tour.getCurrentStep(); // Возвращает число или null
```

### `getTotalSteps()`

Получить общее количество шагов.

```javascript
const total = tour.getTotalSteps(); // Возвращает число
```

### `isActive()`

Проверить, активен ли тур сейчас.

```javascript
if (tour.isActive()) {
  console.log('Тур активен');
}
```

## Стилизация

Тур автоматически добавляет класс `tour-active` к целевым элементам. Настройте эффект подсветки:

```css
/* Настройте эффект подсветки */
.tour-active {
  position: relative;
  z-index: 9998;
}

.tour-active::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px solid var(--capsule-color-primary);
  border-radius: var(--capsule-radius);
  pointer-events: none;
}
```

Настройте внешний вид шага:

```css
capsule-tour-step {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## Поведение

- **Автоскролл**: Тур автоматически прокручивает страницу, чтобы показать целевые элементы, включая вложенные прокручиваемые контейнеры
- **Автопозиционирование**: Шаги автоматически позиционируются относительно целей с учетом границ viewport
- **Overlay**: Целевые элементы получают класс `tour-active` для удобной стилизации
- **Скрыт по умолчанию**: Тур скрыт, когда `value` пустое, null или невалидное
