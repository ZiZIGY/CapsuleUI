# Range

Компонент ползунка для выбора одного или нескольких значений в заданном диапазоне. Поддерживает горизонтальную и вертикальную ориентацию, настраиваемые шаги, десятичную точность и визуальные метки.

## Установка

```bash
npx @zizigy/capsule add Range
```

## Использование

### Базовый Range (множественные значения)

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-range></capsule-range>
</div>

```html
<capsule-range></capsule-range>
```

### Одно значение

<div style="margin: 1rem 0; max-width: 400px;">
  <div style="display: flex; align-items: center; gap: 1rem;">
    <capsule-range
      id="single-range-ru"
      value="[50]"
      onchange="document.querySelector('#single-input-ru').value = event.detail.values[0]"
    ></capsule-range>
    <input
      type="number"
      id="single-input-ru"
      value="50"
      min="0"
      max="100"
      oninput="document.querySelector('#single-range-ru').value = `[${Math.max(0, Math.min(100, parseFloat(this.value) || 0))}]`"
      style="width: 80px; padding: 0.5rem;"
    />
  </div>
</div>

```html
<div style="display: flex; align-items: center; gap: 1rem;">
  <capsule-range
    id="single-range"
    value="[50]"
    onchange="document.querySelector('#single-input').value = event.detail.values[0]"
  ></capsule-range>
  <input
    type="number"
    id="single-input"
    value="50"
    min="0"
    max="100"
    oninput="document.querySelector('#single-range').value = `[${Math.max(0, Math.min(100, parseFloat(this.value) || 0))}]`"
  />
</div>
```

### Настроенный диапазон

<div style="margin: 1rem 0; max-width: 400px;">
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <capsule-range
      id="custom-range-ru"
      min="0"
      max="1000"
      value="[200, 800]"
      onchange="
        const values = event.detail.values;
        document.querySelector('#custom-min-ru').value = values[0];
        document.querySelector('#custom-max-ru').value = values[1];
      "
    ></capsule-range>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <label style="display: flex; align-items: center; gap: 0.5rem;">
        Мин:
        <input
          type="number"
          id="custom-min-ru"
          value="200"
          min="0"
          max="1000"
          oninput="
            const range = document.querySelector('#custom-range-ru');
            const values = range.getValues();
            range.value = `[${Math.max(0, Math.min(1000, parseFloat(this.value) || 0))}, ${values[1]}]`;
          "
          style="width: 100px; padding: 0.5rem;"
        />
      </label>
      <label style="display: flex; align-items: center; gap: 0.5rem;">
        Макс:
        <input
          type="number"
          id="custom-max-ru"
          value="800"
          min="0"
          max="1000"
          oninput="
            const range = document.querySelector('#custom-range-ru');
            const values = range.getValues();
            range.value = `[${values[0]}, ${Math.max(0, Math.min(1000, parseFloat(this.value) || 0))}]`;
          "
          style="width: 100px; padding: 0.5rem;"
        />
      </label>
    </div>
  </div>
</div>

```html
<div style="display: flex; flex-direction: column; gap: 0.5rem;">
  <capsule-range
    id="custom-range"
    min="0"
    max="1000"
    value="[200, 800]"
    onchange="
      const values = event.detail.values;
      document.querySelector('#custom-min').value = values[0];
      document.querySelector('#custom-max').value = values[1];
    "
  ></capsule-range>
  <div style="display: flex; gap: 1rem;">
    <label>
      Мин:
      <input
        type="number"
        id="custom-min"
        value="200"
        min="0"
        max="1000"
        oninput="
          const range = document.querySelector('#custom-range');
          const values = range.getValues();
          range.value = `[${Math.max(0, Math.min(1000, parseFloat(this.value) || 0))}, ${values[1]}]`;
        "
      />
    </label>
    <label>
      Макс:
      <input
        type="number"
        id="custom-max"
        value="800"
        min="0"
        max="1000"
        oninput="
          const range = document.querySelector('#custom-range');
          const values = range.getValues();
          range.value = `[${values[0]}, ${Math.max(0, Math.min(1000, parseFloat(this.value) || 0))}]`;
        "
      />
    </label>
  </div>
</div>
```

### Шаг

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-range step="10" value="[30, 70]"></capsule-range>
</div>

```html
<capsule-range
  step="10"
  value="[30, 70]"
></capsule-range>
```

### Десятичные значения

<div style="margin: 1rem 0; max-width: 400px;">
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <capsule-range
      id="decimals-range-ru"
      min="0"
      max="10"
      decimals="1"
      step="0.1"
      value="[2.5, 7.5]"
      onchange="
        const values = event.detail.values;
        document.querySelector('#decimals-min-ru').value = parseFloat(values[0].toFixed(1));
        document.querySelector('#decimals-max-ru').value = parseFloat(values[1].toFixed(1));
      "
    ></capsule-range>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <label style="display: flex; align-items: center; gap: 0.5rem;">
        От:
        <input
          type="number"
          id="decimals-min-ru"
          value="2.5"
          min="0"
          max="10"
          step="0.1"
          oninput="
            const range = document.querySelector('#decimals-range-ru');
            const values = range.getValues();
            range.value = `[${Math.max(0, Math.min(10, parseFloat(this.value) || 0))}, ${values[1]}]`;
          "
          style="width: 100px; padding: 0.5rem;"
        />
      </label>
      <label style="display: flex; align-items: center; gap: 0.5rem;">
        До:
        <input
          type="number"
          id="decimals-max-ru"
          value="7.5"
          min="0"
          max="10"
          step="0.1"
          oninput="
            const range = document.querySelector('#decimals-range-ru');
            const values = range.getValues();
            range.value = `[${values[0]}, ${Math.max(0, Math.min(10, parseFloat(this.value) || 0))}]`;
          "
          style="width: 100px; padding: 0.5rem;"
        />
      </label>
    </div>
  </div>
</div>

```html
<div style="display: flex; flex-direction: column; gap: 0.5rem;">
  <capsule-range
    id="decimals-range"
    min="0"
    max="10"
    decimals="1"
    step="0.1"
    value="[2.5, 7.5]"
    onchange="
      const values = event.detail.values;
      document.querySelector('#decimals-min').value = parseFloat(values[0].toFixed(1));
      document.querySelector('#decimals-max').value = parseFloat(values[1].toFixed(1));
    "
  ></capsule-range>
  <div style="display: flex; gap: 1rem;">
    <label>
      От:
      <input
        type="number"
        id="decimals-min"
        value="2.5"
        min="0"
        max="10"
        step="0.1"
        oninput="
          const range = document.querySelector('#decimals-range');
          const values = range.getValues();
          range.value = `[${Math.max(0, Math.min(10, parseFloat(this.value) || 0))}, ${values[1]}]`;
        "
      />
    </label>
    <label>
      До:
      <input
        type="number"
        id="decimals-max"
        value="7.5"
        min="0"
        max="10"
        step="0.1"
        oninput="
          const range = document.querySelector('#decimals-range');
          const values = range.getValues();
          range.value = `[${values[0]}, ${Math.max(0, Math.min(10, parseFloat(this.value) || 0))}]`;
        "
      />
    </label>
  </div>
</div>
```

### Ориентация

#### Горизонтальная (по умолчанию)

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-range orientation="horizontal"></capsule-range>
</div>

```html
<capsule-range orientation="horizontal"></capsule-range>
```

#### Вертикальная

<div style="margin: 1rem 0; max-width: 100px; height: 300px;">
  <capsule-range orientation="vertical"></capsule-range>
</div>

```html
<capsule-range orientation="vertical"></capsule-range>
```

### Метки

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-range show-ticks ticks-density="10"></capsule-range>
</div>

```html
<capsule-range
  show-ticks
  ticks-density="10"
></capsule-range>
```

### Отключённый

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-range disabled value="[30, 70]"></capsule-range>
</div>

```html
<capsule-range
  disabled
  value="[30, 70]"
></capsule-range>
```

### Несколько значений

Вы можете установить несколько ползунков, предоставив массив более чем с двумя значениями:

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-range value="[10, 30, 50, 70, 90]"></capsule-range>
</div>

```html
<capsule-range value="[10, 30, 50, 70, 90]"></capsule-range>
```

### С элементами ввода

Вы можете синхронизировать значения range с числовыми полями ввода для точного контроля:

<div style="margin: 1rem 0; max-width: 500px;">
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div>
      <label style="display: block; margin-bottom: 0.5rem;">Громкость</label>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <capsule-range
          id="volume-range-ru"
          min="0"
          max="100"
          value="[50]"
          onchange="document.querySelector('#volume-input-ru').value = event.detail.values[0]"
        ></capsule-range>
        <input
          type="number"
          id="volume-input-ru"
          value="50"
          min="0"
          max="100"
          oninput="document.querySelector('#volume-range-ru').value = `[${Math.max(0, Math.min(100, parseFloat(this.value) || 0))}]`"
          style="width: 80px; padding: 0.5rem;"
        />
      </div>
    </div>
  </div>
</div>

```html
<div style="display: flex; align-items: center; gap: 1rem;">
  <capsule-range
    id="volume-range"
    min="0"
    max="100"
    value="[50]"
    onchange="document.querySelector('#volume-input').value = event.detail.values[0]"
  ></capsule-range>
  <input
    type="number"
    id="volume-input"
    value="50"
    min="0"
    max="100"
    oninput="document.querySelector('#volume-range').value = `[${Math.max(0, Math.min(100, parseFloat(this.value) || 0))}]`"
  />
</div>
```

### Интеграция с формами

Компонент range может использоваться в HTML формах и будет отправлять свои значения в виде JSON строки.

```html
<form>
  <label>
    Диапазон цен
    <capsule-range
      name="price"
      min="0"
      max="1000"
      value="[100, 500]"
    ></capsule-range>
  </label>
  <button type="submit">Отправить</button>
</form>
```

## Компоненты

### `capsule-range`

Основной компонент ползунка диапазона.

## Атрибуты

| Атрибут         | Тип     | По умолчанию | Описание                                |
| --------------- | ------- | ------------ | --------------------------------------- |
| `min`           | number  | `0`          | Минимальное значение                    |
| `max`           | number  | `100`        | Максимальное значение                   |
| `step`          | number  | `1`          | Шаг приращения                          |
| `decimals`      | number  | `0`          | Количество десятичных знаков            |
| `value`         | string  | `"[25, 75]"` | JSON строка массива значений            |
| `orientation`   | string  | `horizontal` | Ориентация ползунка                     |
| `show-ticks`    | boolean | `false`      | Показывать метки на дорожке             |
| `ticks-density` | number  | `1`          | Плотность меток (больше = больше меток) |
| `disabled`      | boolean | `false`      | Отключает ползунок                      |

### Значения ориентации

- `horizontal` — Горизонтальная раскладка (по умолчанию)
- `vertical` — Вертикальная раскладка

## Справочник API

### Методы

#### `updateValues(options, reset = false)`

Обновляет конфигурацию и значения ползунка диапазона.

```javascript
const range = document.querySelector('capsule-range');

// Обновить новыми значениями
range.updateValues({
  min: 0,
  max: 100,
  step: 5,
  values: [20, 50, 80],
});

// Сбросить к равномерно распределённым значениям
range.updateValues(
  {
    values: [10, 30, 50, 70, 90],
  },
  true
);
```

**Параметры:**

- `options` (object) - Объект конфигурации с любыми из: `min`, `max`, `step`, `decimals`, `values`, `orientation`, `showTicks`, `ticksDensity`
- `reset` (boolean) - Если `true`, значения будут равномерно распределены; если `false`, будут использованы предоставленные значения

#### `getValues()`

Возвращает текущие значения в виде массива.

```javascript
const range = document.querySelector('capsule-range');
const values = range.getValues(); // [25, 75]
console.log(values);
```

#### `getSettings()`

Возвращает все текущие настройки, включая min, max, step, values, orientation и т.д.

```javascript
const range = document.querySelector('capsule-range');
const settings = range.getSettings();
console.log(settings);
// {
//   min: 0,
//   max: 100,
//   step: 1,
//   decimals: 0,
//   values: [25, 75],
//   orientation: 'horizontal',
//   showTicks: false,
//   ticksDensity: 1
// }
```

### Свойства

#### `value`

Получает или устанавливает значения в виде JSON строки.

```javascript
const range = document.querySelector('capsule-range');

// Получить текущие значения
console.log(range.value); // "[25, 75]"

// Установить новые значения
range.value = '[10, 50, 90]';
```

#### `min`, `max`, `step`, `decimals`, `orientation`

Эти свойства можно получать и изменять напрямую:

```javascript
const range = document.querySelector('capsule-range');

// Получить значения
console.log(range.min); // 0
console.log(range.max); // 100

// Установить значения
range.min = 10;
range.max = 200;
range.step = 5;
range.decimals = 2;
range.orientation = 'vertical';
```

### События

Компонент range отправляет следующее пользовательское событие:

#### `change`

Отправляется при перемещении любого ползунка. В объекте события содержится текущий массив значений.

```javascript
const range = document.querySelector('capsule-range');
range.addEventListener('change', (event) => {
  console.log('Диапазон изменён, значения:', event.detail.values);
  // event.detail.values - это массив чисел
});
```

**Данные события:**

- `values` (array) — Текущий массив значений

### Пример: Программное управление

```javascript
// Получить ссылку на range
const range = document.querySelector('capsule-range');

// Слушать события изменения
range.addEventListener('change', (event) => {
  const values = event.detail.values;
  console.log(`Диапазон: ${values[0]} - ${values[values.length - 1]}`);

  // Обновить UI на основе значений
  document.querySelector('#minValue').textContent = values[0];
  document.querySelector('#maxValue').textContent = values[values.length - 1];
});

// Программно установить значения
range.value = '[30, 70]';

// Обновить конфигурацию
range.updateValues({
  min: 0,
  max: 200,
  step: 10,
  values: [50, 150],
});

// Получить текущие значения
const currentValues = range.getValues();
console.log('Текущие значения:', currentValues);

// Отключить/включить
range.disabled = true;
range.disabled = false;
```

## Доступность

- ✅ ARIA роль="slider" с правильными атрибутами
- ✅ Поддержка навигации с клавиатуры
- ✅ Правильное управление фокусом
- ✅ Поддержка интеграции с формами
- ✅ Поддержка screen readers
- ✅ Визуальная обратная связь для активного ползунка
