# Comparison

Компонент для сравнения "до/после" двух изображений или контента рядом. Пользователи могут перетаскивать разделительную линию, чтобы показывать больше или меньше контента с любой стороны. Разделитель можно управлять перетаскиванием мышью, стрелками клавиатуры или программно. Идеально подходит для демонстрации изменений дизайна, редактирования фотографий или любых визуальных сравнений.

## Установка

```bash
npx @zizigy/capsule add Comparison
```

## Использование

### Базовое сравнение

<div style="margin: 1rem 0; max-width: 800px;">
  <capsule-comparison style="aspect-ratio: 16/9; border-radius: 8px; overflow: hidden;">
    <capsule-comparison-before>
      <img src="https://picsum.photos/800/450?random=1" alt="До" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-before>
    <capsule-comparison-line></capsule-comparison-line>
    <capsule-comparison-after>
      <img src="https://picsum.photos/800/450?random=2" alt="После" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-after>
  </capsule-comparison>
</div>

```html
<capsule-comparison>
  <capsule-comparison-before>
    <img src="before.jpg" alt="До" />
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <img src="after.jpg" alt="После" />
  </capsule-comparison-after>
</capsule-comparison>
```

**Управление с клавиатуры:** Кликните на разделительную линию, чтобы сфокусироваться на ней, затем используйте стрелки (`←`/`→`) для перемещения разделителя. Нажмите `Shift + Стрелка` для перемещения на 10%, или `Home`/`End` для перехода к краям.

### Кастомная начальная позиция

Установите начальную позицию разделительной линии с помощью атрибута `position` (0-100, где 50 — это центр).

<div style="margin: 1rem 0; max-width: 800px;">
  <capsule-comparison position="30" style="aspect-ratio: 16/9; border-radius: 8px; overflow: hidden;">
    <capsule-comparison-before>
      <img src="https://picsum.photos/800/450?random=3" alt="До" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-before>
    <capsule-comparison-line></capsule-comparison-line>
    <capsule-comparison-after>
      <img src="https://picsum.photos/800/450?random=4" alt="После" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-after>
  </capsule-comparison>
</div>

```html
<capsule-comparison position="30">
  <capsule-comparison-before>
    <img src="before.jpg" alt="До" />
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <img src="after.jpg" alt="После" />
  </capsule-comparison-after>
</capsule-comparison>
```

### Кастомное содержимое разделителя

У вас полный контроль над содержимым разделительной линии! Используйте слот, чтобы настроить его как хотите - вы можете поместить любой HTML контент внутрь.

<div style="margin: 1rem 0; max-width: 800px;">
  <capsule-comparison style="aspect-ratio: 16/9; border-radius: 8px; overflow: hidden;">
    <capsule-comparison-before>
      <img src="https://picsum.photos/800/450?random=5" alt="До" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-before>
    <capsule-comparison-line>
      <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.2); font-size: 20px;">↔️</div>
    </capsule-comparison-line>
    <capsule-comparison-after>
      <img src="https://picsum.photos/800/450?random=6" alt="После" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-after>
  </capsule-comparison>
</div>

```html
<!-- Простая иконка с эмодзи -->
<capsule-comparison-line>
  <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
    ↔️
  </div>
</capsule-comparison-line>

<!-- Кастомная SVG иконка -->
<capsule-comparison-line>
  <div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border-radius: 50%;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M8 12h8M12 8v8" stroke-width="2"/>
    </svg>
  </div>
</capsule-comparison-line>

<!-- Без круга, просто линия -->
<capsule-comparison-line>
  <div style="width: 2px; height: 100%; background: rgba(255,255,255,0.8);"></div>
</capsule-comparison-line>
```

**Примечание:** Разделительная линия использует слот, так что вы можете поместить внутрь всё что угодно. Если вы не предоставите никакого контента, компонент покажет иконку-стрелку по умолчанию. Но поскольку у вас есть код в вашем проекте, вы можете стилизовать это как угодно!

### Программное управление

Управляйте позицией разделителя программно с помощью JavaScript.

<div style="margin: 1rem 0; max-width: 800px;">
  <capsule-comparison id="comparison-control-ru" style="aspect-ratio: 16/9; border-radius: 8px; overflow: hidden;">
    <capsule-comparison-before>
      <img src="https://picsum.photos/800/450?random=7" alt="До" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-before>
    <capsule-comparison-line></capsule-comparison-line>
    <capsule-comparison-after>
      <img src="https://picsum.photos/800/450?random=8" alt="После" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-after>
  </capsule-comparison>
  <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
    <button onclick="document.querySelector('#comparison-control-ru').setPosition(0)">Показать До</button>
    <button onclick="document.querySelector('#comparison-control-ru').setPosition(50)">По центру</button>
    <button onclick="document.querySelector('#comparison-control-ru').setPosition(100)">Показать После</button>
  </div>
</div>

```html
<capsule-comparison id="my-comparison">
  <capsule-comparison-before>
    <img src="before.jpg" alt="До" />
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <img src="after.jpg" alt="После" />
  </capsule-comparison-after>
</capsule-comparison>

<script>
  const comparison = document.getElementById('my-comparison');
  comparison.setPosition(30); // Установить позицию на 30%
</script>
```

### С видео

Компонент сравнения также работает с видео.

```html
<capsule-comparison>
  <capsule-comparison-before>
    <video src="before.mp4" autoplay muted loop></video>
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <video src="after.mp4" autoplay muted loop></video>
  </capsule-comparison-after>
</capsule-comparison>
```

### Кастомизация и фильтры

У вас полный контроль над внешним видом! Вы можете применять CSS фильтры, наложения или любые стили к изображениям. Вот пример с черно-белым фильтром на изображении "до":

<div style="margin: 1rem 0; max-width: 800px;">
  <capsule-comparison style="aspect-ratio: 16/9; border-radius: 8px; overflow: hidden;">
    <capsule-comparison-before>
      <img src="https://picsum.photos/800/450?random=9" alt="До" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%);" />
    </capsule-comparison-before>
    <capsule-comparison-line></capsule-comparison-line>
    <capsule-comparison-after>
      <img src="https://picsum.photos/800/450?random=9" alt="После" style="width: 100%; height: 100%; object-fit: cover;" />
    </capsule-comparison-after>
  </capsule-comparison>
</div>

```html
<style>
  .before-image {
    filter: grayscale(100%); /* Черно-белое изображение */
  }
  
  .after-image {
    /* Цветное изображение - без фильтра */
  }
</style>

<capsule-comparison>
  <capsule-comparison-before>
    <img src="photo.jpg" alt="До" class="before-image" />
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <img src="photo.jpg" alt="После" class="after-image" />
  </capsule-comparison-after>
</capsule-comparison>
```

Можете использовать любые CSS фильтры: `grayscale()`, `blur()`, `brightness()`, `contrast()`, `sepia()`, или комбинировать несколько фильтров. Компонент дает вам полный контроль над стилизацией!

## Компоненты

Компонент Comparison состоит из нескольких подкомпонентов:

### `capsule-comparison`

Главный контейнер для сравнения. Управляет позицией разделителя и координирует все подкомпоненты.

| Атрибут   | Тип    | По умолчанию | Описание                                                 |
| --------- | ------ | ------------ | -------------------------------------------------------- |
| `position` | number | 50           | Начальная позиция разделительной линии (0-100, где 50 — это центр) |

### `capsule-comparison-before`

Контейнер для контента "до". Отображается слева (или сверху для вертикальных макетов).

```html
<capsule-comparison-before>
  <img src="before.jpg" alt="До" />
</capsule-comparison-before>
```

### `capsule-comparison-after`

Контейнер для контента "после". Отображается справа (или снизу для вертикальных макетов).

```html
<capsule-comparison-after>
  <img src="after.jpg" alt="После" />
</capsule-comparison-after>
```

### `capsule-comparison-line`

Перетаскиваемая разделительная линия, которая разделяет две стороны. Включает поддержку навигации с клавиатуры. Вы можете настроить её внешний вид, поместив любой HTML контент внутрь используя слот.

```html
<capsule-comparison-line>
  <!-- Ваш кастомный контент здесь -->
  <div>Кастомная иконка или контент</div>
</capsule-comparison-line>
```

## Методы

### `setPosition(position)`

Программно установить позицию разделителя.

- **Параметры:**
  - `position` (number): Значение позиции от 0 до 100
- **Возвращает:** `void`

```javascript
const comparison = document.querySelector('capsule-comparison');
comparison.setPosition(75); // Переместить разделитель на 75%
```

## События

### `comparison-line-move`

Срабатывает, когда разделительная линия перемещается (либо перетаскиванием, либо программно).

- **Detail:**
  - `position` (number): Новое значение позиции (0-100)

```javascript
const comparison = document.querySelector('capsule-comparison');
comparison.addEventListener('comparison-line-move', (event) => {
  console.log('Новая позиция:', event.detail.position);
});
```

## Навигация с клавиатуры

Разделительная линия полностью поддерживает навигацию с клавиатуры. Кликните на разделительную линию, чтобы сфокусироваться на ней, затем используйте следующие клавиши:

- **Стрелка Влево** (`←`): Переместить разделитель влево (уменьшить позицию на 1%)
- **Стрелка Вправо** (`→`): Переместить разделитель вправо (увеличить позицию на 1%)
- **Shift + Стрелка Влево/Вправо**: Переместить на 10% инкрементами (быстрая навигация)
- **Home**: Переместить на позицию 0 (показать только контент "до")
- **End**: Переместить на позицию 100 (показать только контент "после")

**Совет:** Используйте клавишу Tab для фокусировки на разделительной линии, затем используйте стрелки для настройки позиции без использования мыши.

## Доступность

Компонент включает правильные ARIA атрибуты для screen readers:

- Разделительная линия имеет `role="slider"`
- Установлены атрибуты `aria-valuemin`, `aria-valuemax` и `aria-valuenow`
- Полностью поддерживается навигация с клавиатуры
- Предоставлены индикаторы фокуса

## Стилизация

Компонент использует CSS custom properties для легкой темизации:

```css
capsule-comparison {
  --comparison-position: 50%; /* Управляется компонентом */
}
```

Вы можете стилизовать иконку разделительной линии, используя селектор `::part()`:

```css
capsule-comparison-line::part(icon) {
  background: #000;
  color: #fff;
}
```

## Примеры

### Сравнение изображений

Идеально подходит для демонстрации изменений дизайна или редактирования фотографий.

```html
<capsule-comparison style="max-width: 800px; border-radius: 8px; overflow: hidden;">
  <capsule-comparison-before>
    <img src="original.jpg" alt="Оригинальный дизайн" />
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <img src="redesigned.jpg" alt="Переработанная версия" />
  </capsule-comparison-after>
</capsule-comparison>
```

### Сравнение продуктов

Сравните разные версии продукта.

```html
<capsule-comparison position="40">
  <capsule-comparison-before>
    <img src="product-v1.jpg" alt="Продукт v1" />
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <img src="product-v2.jpg" alt="Продукт v2" />
  </capsule-comparison-after>
</capsule-comparison>
```

### До/После с фильтрами

Покажите одно и то же изображение с разными фильтрами - идеально для демонстрации редактирования фотографий.

```html
<style>
  .sepia-filter {
    filter: sepia(100%) contrast(120%);
  }
  
  .colorful {
    filter: saturate(150%) brightness(110%);
  }
</style>

<capsule-comparison>
  <capsule-comparison-before>
    <img src="photo.jpg" alt="Оригинал" class="sepia-filter" />
  </capsule-comparison-before>
  <capsule-comparison-line></capsule-comparison-line>
  <capsule-comparison-after>
    <img src="photo.jpg" alt="Улучшенное" class="colorful" />
  </capsule-comparison-after>
</capsule-comparison>
```

Помните: Поскольку у вас есть реальные файлы кода в вашем проекте, вы можете стилизовать всё именно так, как хотите - фильтры, наложения, границы, тени, анимации или что-угодно еще!

