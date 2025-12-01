# Rating

Компонент рейтинга со звёздами для сбора и отображения пользовательских оценок. Поддерживает точные оценки с настраиваемой точностью, размерами, цветами и может быть интегрирован с формами.

## Установка

```bash
npx @zizigy/capsule add Rating
```

## Использование

### Базовый рейтинг

<div style="margin: 1rem 0;">
  <capsule-rating></capsule-rating>
</div>

```html
<capsule-rating></capsule-rating>
```

### С начальным значением

<div style="margin: 1rem 0;">
  <capsule-rating value="3"></capsule-rating>
</div>

```html
<capsule-rating value="3"></capsule-rating>
```

### Пользовательский максимум

<div style="margin: 1rem 0;">
  <capsule-rating max="10" value="7"></capsule-rating>
</div>

```html
<capsule-rating
  max="10"
  value="7"
></capsule-rating>
```

### Точность

#### Целые звёзды (по умолчанию)

<div style="margin: 1rem 0;">
  <capsule-rating precision="1" value="3"></capsule-rating>
</div>

```html
<capsule-rating
  precision="1"
  value="3"
></capsule-rating>
```

#### Половины звёзд

<div style="margin: 1rem 0;">
  <capsule-rating precision="0.5" value="3.5"></capsule-rating>
</div>

```html
<capsule-rating
  precision="0.5"
  value="3.5"
></capsule-rating>
```

#### Десятичная точность

<div style="margin: 1rem 0;">
  <capsule-rating precision="0.1" value="3.7"></capsule-rating>
</div>

```html
<capsule-rating
  precision="0.1"
  value="3.7"
></capsule-rating>
```

### Размеры

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <capsule-rating size="sm" value="3"></capsule-rating>
  <capsule-rating size="md" value="3"></capsule-rating>
  <capsule-rating size="lg" value="3"></capsule-rating>
</div>

```html
<capsule-rating
  size="sm"
  value="3"
></capsule-rating>
<capsule-rating
  size="md"
  value="3"
></capsule-rating>
<capsule-rating
  size="lg"
  value="3"
></capsule-rating>
```

### Цвета

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <capsule-rating color="warning" value="3"></capsule-rating>
  <capsule-rating color="primary" value="3"></capsule-rating>
  <capsule-rating color="error" value="3"></capsule-rating>
  <capsule-rating color="success" value="3"></capsule-rating>
  <capsule-rating color="info" value="3"></capsule-rating>
  <capsule-rating color="secondary" value="3"></capsule-rating>
</div>

```html
<capsule-rating
  color="warning"
  value="3"
></capsule-rating>
<capsule-rating
  color="primary"
  value="3"
></capsule-rating>
<capsule-rating
  color="error"
  value="3"
></capsule-rating>
<capsule-rating
  color="success"
  value="3"
></capsule-rating>
<capsule-rating
  color="info"
  value="3"
></capsule-rating>
<capsule-rating
  color="secondary"
  value="3"
></capsule-rating>
```

### Только для чтения

<div style="margin: 1rem 0;">
  <capsule-rating readonly value="4"></capsule-rating>
</div>

```html
<capsule-rating
  readonly
  value="4"
></capsule-rating>
```

### Отключённый

<div style="margin: 1rem 0;">
  <capsule-rating disabled value="3"></capsule-rating>
</div>

```html
<capsule-rating
  disabled
  value="3"
></capsule-rating>
```

### Интеграция с формами

Компонент рейтинга может использоваться в HTML формах и будет отправлять своё значение.

```html
<form>
  <label>
    Оцените этот продукт
    <capsule-rating
      name="rating"
      value="0"
    ></capsule-rating>
  </label>
  <button type="submit">Отправить</button>
</form>
```

### Пользовательские иконки звёзд

Вы можете предоставить пользовательские иконки звёзд, используя слоты. Например, используя emoji:

<div style="margin: 1rem 0;">
  <capsule-rating value="3" size="lg">
    <span slot="star-1-filled">⭐</span>
    <span slot="star-1-empty">☆</span>
    <span slot="star-2-filled">⭐</span>
    <span slot="star-2-empty">☆</span>
    <span slot="star-3-filled">⭐</span>
    <span slot="star-3-empty">☆</span>
    <span slot="star-4-filled">⭐</span>
    <span slot="star-4-empty">☆</span>
    <span slot="star-5-filled">⭐</span>
    <span slot="star-5-empty">☆</span>
  </capsule-rating>
</div>

```html
<capsule-rating
  value="3"
  size="lg"
>
  <span slot="star-1-filled">⭐</span>
  <span slot="star-1-empty">☆</span>
  <span slot="star-2-filled">⭐</span>
  <span slot="star-2-empty">☆</span>
  <span slot="star-3-filled">⭐</span>
  <span slot="star-3-empty">☆</span>
  <span slot="star-4-filled">⭐</span>
  <span slot="star-4-empty">☆</span>
  <span slot="star-5-filled">⭐</span>
  <span slot="star-5-empty">☆</span>
</capsule-rating>
```

Вы также можете использовать пользовательские SVG иконки:

```html
<capsule-rating value="3">
  <svg
    slot="star-1-filled"
    viewBox="0 0 24 24"
    style="width: 100%; height: 100%;"
  >
    <!-- Пользовательская заполненная иконка звезды -->
  </svg>
  <svg
    slot="star-1-empty"
    viewBox="0 0 24 24"
    style="width: 100%; height: 100%;"
  >
    <!-- Пользовательская пустая иконка звезды -->
  </svg>
  <!-- Повторите для других звёзд (star-2-filled, star-2-empty и т.д.) -->
</capsule-rating>
```

## Компоненты

### `capsule-rating`

Основной компонент рейтинга.

## Атрибуты

| Атрибут     | Тип     | По умолчанию | Описание                                          |
| ----------- | ------- | ------------ | ------------------------------------------------- |
| `value`     | number  | `0`          | Текущее значение рейтинга                         |
| `max`       | number  | `5`          | Максимальное значение рейтинга (количество звёзд) |
| `precision` | number  | `1`          | Точность рейтинга (1, 0.5 или 0.1)                |
| `readonly`  | boolean | `false`      | Делает рейтинг доступным только для чтения        |
| `disabled`  | boolean | `false`      | Отключает рейтинг                                 |
| `size`      | string  | `md`         | Размер звёзд                                      |
| `color`     | string  | `warning`    | Цвет заполненных звёзд                            |

### Значения размера

- `sm` — Маленький размер (16px)
- `md` — Средний размер (24px) — по умолчанию
- `lg` — Большой размер (32px)

### Значения цвета

- `warning` — Цвет предупреждения (по умолчанию)
- `primary` — Основной цвет
- `error` — Цвет ошибки
- `success` — Цвет успеха
- `info` — Информационный цвет
- `secondary` — Вторичный цвет

### Значения точности

- `1` — Только целые звёзды (по умолчанию)
- `0.5` — Разрешены половинки звёзд
- `0.1` — Десятичная точность

## API Справка

### Свойства

#### `value`

Получает или устанавливает текущее значение рейтинга.

```javascript
const rating = document.querySelector('capsule-rating');

// Получить текущее значение
console.log(rating.value); // 3.5

// Установить новое значение
rating.value = 4.5;
```

#### `max`

Получает или устанавливает максимальное значение рейтинга.

```javascript
const rating = document.querySelector('capsule-rating');

// Получить максимальное значение
console.log(rating.max); // 5

// Установить новый максимум
rating.max = 10;
```

#### `precision`

Получает или устанавливает точность рейтинга.

```javascript
const rating = document.querySelector('capsule-rating');

// Получить точность
console.log(rating.precision); // 1

// Установить точность
rating.precision = 0.5; // Разрешить половинки звёзд
```

#### `readonly`

Получает или устанавливает состояние только для чтения.

```javascript
const rating = document.querySelector('capsule-rating');

// Получить состояние только для чтения
console.log(rating.readonly); // false

// Установить только для чтения
rating.readonly = true;
```

#### `disabled`

Получает или устанавливает отключённое состояние.

```javascript
const rating = document.querySelector('capsule-rating');

// Получить отключённое состояние
console.log(rating.disabled); // false

// Отключить
rating.disabled = true;
```

#### `size`

Получает или устанавливает размер звёзд.

```javascript
const rating = document.querySelector('capsule-rating');

// Получить размер
console.log(rating.size); // 'md'

// Установить размер
rating.size = 'lg';
```

#### `color`

Получает или устанавливает цвет заполненных звёзд.

```javascript
const rating = document.querySelector('capsule-rating');

// Получить цвет
console.log(rating.color); // 'warning'

// Установить цвет
rating.color = 'primary';
```

### События

Компонент рейтинга отправляет следующие пользовательские события:

#### `change`

Отправляется при изменении значения рейтинга. Детали события содержат новое значение.

```javascript
const rating = document.querySelector('capsule-rating');
rating.addEventListener('change', (event) => {
  console.log('Рейтинг изменён:', event.detail.value);
  // event.detail.value — это число
});
```

**Детали события:**

- `value` (number) — Новое значение рейтинга

#### `input`

Отправляется постоянно, пока пользователь наводит курсор на рейтинг (перед кликом). Детали события содержат значение при наведении.

```javascript
const rating = document.querySelector('capsule-rating');
rating.addEventListener('input', (event) => {
  console.log('Значение при наведении:', event.detail.value);
});
```

**Детали события:**

- `value` (number) — Значение рейтинга при наведении

### Пример: Программное управление

```javascript
// Получить ссылку на рейтинг
const rating = document.querySelector('capsule-rating');

// Слушать события изменения
rating.addEventListener('change', (event) => {
  console.log(`Пользователь оценил: ${event.detail.value} из ${rating.max}`);
  // Сохранить рейтинг на сервер, обновить UI и т.д.
});

// Установить рейтинг программно
rating.value = 4.5;

// Изменить максимальное количество звёзд
rating.max = 10;

// Изменить точность
rating.precision = 0.5; // Разрешить половинки звёзд

// Сделать только для чтения после отправки
rating.readonly = true;
```

### Пример: С отображением значения

```html
<div style="display: flex; align-items: center; gap: 1rem;">
  <capsule-rating
    id="product-rating"
    value="0"
    onchange="document.querySelector('#rating-value').textContent = event.detail.value"
  ></capsule-rating>
  <span>Оценка: <span id="rating-value">0</span> / 5</span>
</div>
```

## Доступность

- ✅ ARIA role="group" с aria-label
- ✅ Визуальная обратная связь при наведении
- ✅ Поддержка навигации с клавиатуры
- ✅ Поддержка ассоциации с формами
- ✅ Семантическая структура для экранных читалок
- ✅ Правильное управление фокусом
