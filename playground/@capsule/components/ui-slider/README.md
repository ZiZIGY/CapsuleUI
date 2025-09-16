# **PREFIX**-**COMPONENT**

Мультислайдер на Web Components

## Использование

```html
<ui-slider min="0" max="100" step="1" decimals="0" values="[25,75]"></ui-slider>
<ui-slider min="0" max="100" step="1" decimals="0" values="[25,75]" orientation="vertical"></ui-slider>
```

## Кастомизация стилей

Все элементы имеют part-атрибуты:

- `part="container"`
- `part="track"`
- `part="range"`
- `part="thumb"`
- `part="label"`
- `part="values-display"`

Пример кастомизации:

```css
ui-slider::part(thumb) {
  border-color: red;
}
ui-slider::part(label) {
  background: blue;
}
```

## Атрибуты

- `min` — минимальное значение (по умолчанию 0)
- `max` — максимальное значение (по умолчанию 100)
- `step` — шаг (по умолчанию 1)
- `decimals` — количество знаков после запятой (по умолчанию 0)
- `values` — начальные значения, JSON-массив (например, `[25,75]`)
- `orientation` — направление: `horizontal` (по умолчанию) или `vertical`

## События

- `sliderChange` — диспатчится при изменении значений, detail: `{ values: number[] }`

## Методы

- `updateValues({ min, max, step, decimals, values })` — обновить настройки/значения
- `getValues()` — получить текущие значения
- `getSettings()` — получить все настройки

## Пример JS

```js
const slider = document.querySelector('ui-slider');
slider.addEventListener('sliderChange', (e) => {
  console.log('values:', e.detail.values);
});
slider.updateValues({ min: 0, max: 200, values: [50, 150] });
```
