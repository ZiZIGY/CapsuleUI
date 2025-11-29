# Switch

Компонент переключателя для представления состояний вкл/выкл. Полностью доступен с клавиатуры, поддерживает несколько размеров, вертикальную ориентацию и может быть интегрирован с формами.

## Установка

```bash
npx capsule add Switch
```

## Использование

### Базовый переключатель

<div style="margin: 1rem 0; max-width: 100px;">
  <capsule-switch></capsule-switch>
</div>

```html
<capsule-switch></capsule-switch>
```

### Включённое состояние

<div style="margin: 1rem 0; max-width: 100px;">
  <capsule-switch checked></capsule-switch>
</div>

```html
<capsule-switch checked></capsule-switch>
```

### Отключённый

<div style="margin: 1rem 0; max-width: 100px;">
  <capsule-switch disabled></capsule-switch>
  <capsule-switch checked disabled></capsule-switch>
</div>

```html
<capsule-switch disabled></capsule-switch>
<capsule-switch checked disabled></capsule-switch>
```

### Размеры

<div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center;">
  <capsule-switch size="sm"></capsule-switch>
  <capsule-switch size="md"></capsule-switch>
  <capsule-switch size="lg"></capsule-switch>
</div>

```html
<capsule-switch size="sm"></capsule-switch>
<capsule-switch size="md"></capsule-switch>
<capsule-switch size="lg"></capsule-switch>
```

### Ориентация

#### Горизонтальная (по умолчанию)

<div style="margin: 1rem 0; max-width: 100px;">
  <capsule-switch></capsule-switch>
</div>

```html
<capsule-switch></capsule-switch>
```

#### Вертикальная

<div style="margin: 1rem 0; max-width: 100px; height: 60px;">
  <capsule-switch orientation="vertical"></capsule-switch>
</div>

```html
<capsule-switch orientation="vertical"></capsule-switch>
```

### Интеграция с формами

Переключатель может использоваться в HTML формах и будет отправлять своё значение.

```html
<form>
  <label>
    Включить уведомления
    <capsule-switch name="notifications" checked></capsule-switch>
  </label>
  <button type="submit">Сохранить</button>
</form>
```

## Компоненты

### `capsule-switch`

Основной компонент переключателя.

## Атрибуты

| Атрибут         | Тип     | По умолчанию | Описание                                   |
| --------------- | ------- | ------------ | ------------------------------------------ |
| `checked`       | boolean | `false`      | Управляет состоянием вкл/выкл              |
| `disabled`      | boolean | `false`      | Отключает переключатель                    |
| `size`          | string  | `md`         | Размер переключателя                       |
| `orientation`   | string  | `horizontal` | Ориентация переключателя                   |

### Значения размера

- `sm` — Маленький размер (28px × 16px)
- `md` — Средний размер (36px × 20px) — по умолчанию
- `lg` — Большой размер (44px × 24px)

### Значения ориентации

- `horizontal` — Горизонтальная раскладка (по умолчанию)
- `vertical` — Вертикальная раскладка

## Справочник API

### Методы

#### `toggle()`

Программно переключает состояние переключателя.

```javascript
const switchElement = document.querySelector('capsule-switch');
switchElement.toggle(); // Переключает между включённым и выключенным
```

### Свойства

#### `checked`

Получает или устанавливает состояние переключателя.

```javascript
const switchElement = document.querySelector('capsule-switch');

// Получить состояние
console.log(switchElement.checked); // true или false

// Установить состояние
switchElement.checked = true; // Включить переключатель
switchElement.checked = false; // Выключить переключатель
```

#### `disabled`

Получает или устанавливает отключённое состояние переключателя.

```javascript
const switchElement = document.querySelector('capsule-switch');

// Получить состояние
console.log(switchElement.disabled); // true или false

// Установить состояние
switchElement.disabled = true; // Отключить переключатель
switchElement.disabled = false; // Включить переключатель
```

#### `size`

Получает или устанавливает размер переключателя.

```javascript
const switchElement = document.querySelector('capsule-switch');

// Получить размер
console.log(switchElement.size); // 'sm', 'md' или 'lg'

// Установить размер
switchElement.size = 'lg'; // Изменить на большой размер
```

### События

Компонент переключателя отправляет следующее пользовательское событие:

#### `change`

Отправляется при переключении переключателя. В объекте события содержится текущее состояние.

```javascript
const switchElement = document.querySelector('capsule-switch');
switchElement.addEventListener('change', (event) => {
  console.log('Переключатель переключён, включён:', event.detail.checked);
  // event.detail.checked — это boolean
});
```

**Данные события:**
- `checked` (boolean) — Текущее состояние переключателя

### Пример: Программное управление

```javascript
// Получить ссылку на переключатель
const switchElement = document.querySelector('capsule-switch');

// Слушать события изменения
switchElement.addEventListener('change', (event) => {
  if (event.detail.checked) {
    console.log('Переключатель теперь ВКЛЮЧЁН');
    // Выполнить действие при включении
  } else {
    console.log('Переключатель теперь ВЫКЛЮЧЕН');
    // Выполнить действие при выключении
  }
});

// Программно переключить переключатель
document.querySelector('#toggleButton').addEventListener('click', () => {
  switchElement.toggle();
});

// Программно установить состояние
switchElement.checked = true; // Включить
switchElement.checked = false; // Выключить

// Отключить/включить переключатель
switchElement.disabled = true; // Отключить
switchElement.disabled = false; // Включить
```

## Доступность

- ✅ ARIA роль="switch" с атрибутом aria-checked
- ✅ Поддержка навигации с клавиатуры (Пробел/Enter для переключения)
- ✅ Правильное управление фокусом
- ✅ Поддержка интеграции с формами
- ✅ Семантическая структура для screen readers

