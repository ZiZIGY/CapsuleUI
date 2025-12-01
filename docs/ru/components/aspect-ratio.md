# AspectRatio

Простой компонент для поддержания соотношений сторон. Идеально подходит для изображений, видео или любого контента, которому нужно сохранить пропорции.

## Установка

```bash
npx @zizigy/capsule add AspectRatio
```

## Использование

### Базовое соотношение сторон

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-aspect-ratio ratio="16/9">
    <img src="https://picsum.photos/800/450" alt="Изображение" style="border-radius: 6px;" />
  </capsule-aspect-ratio>
</div>

```html
<capsule-aspect-ratio ratio="16/9">
  <img
    src="https://picsum.photos/800/450"
    alt="Изображение"
  />
</capsule-aspect-ratio>
```

### Распространённые соотношения

<div style="margin: 1rem 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
  <div>
    <h4>16:9 (Широкоэкранный)</h4>
    <capsule-aspect-ratio ratio="16/9">
      <img src="https://picsum.photos/400/225" alt="16:9" style="border-radius: 6px;" />
    </capsule-aspect-ratio>
  </div>
  <div>
    <h4>4:3 (Классический)</h4>
    <capsule-aspect-ratio ratio="4/3">
      <img src="https://picsum.photos/400/300" alt="4:3" style="border-radius: 6px;" />
    </capsule-aspect-ratio>
  </div>
  <div>
    <h4>1:1 (Квадрат)</h4>
    <capsule-aspect-ratio ratio="1/1">
      <img src="https://picsum.photos/400/400" alt="1:1" style="border-radius: 6px;" />
    </capsule-aspect-ratio>
  </div>
  <div>
    <h4>21:9 (Ультраширокий)</h4>
    <capsule-aspect-ratio ratio="21/9">
      <img src="https://picsum.photos/700/300" alt="21:9" style="border-radius: 6px;" />
    </capsule-aspect-ratio>
  </div>
</div>

```html
<!-- 16:9 -->
<capsule-aspect-ratio ratio="16/9">
  <img
    src="https://picsum.photos/800/450"
    alt="Изображение"
  />
</capsule-aspect-ratio>

<!-- 4:3 -->
<capsule-aspect-ratio ratio="4/3">
  <img
    src="https://picsum.photos/800/600"
    alt="Изображение"
  />
</capsule-aspect-ratio>

<!-- 1:1 (Квадрат) -->
<capsule-aspect-ratio ratio="1/1">
  <img
    src="https://picsum.photos/600/600"
    alt="Изображение"
  />
</capsule-aspect-ratio>
```

### Использование формата с двоеточием

Вы также можете использовать формат с двоеточием вместо слэша:

```html
<capsule-aspect-ratio ratio="16:9">
  <img
    src="https://picsum.photos/800/450"
    alt="Изображение"
  />
</capsule-aspect-ratio>
```

### С видео

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-aspect-ratio ratio="16/9">
    <video controls style="border-radius: 6px;">
      <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
    </video>
  </capsule-aspect-ratio>
</div>

```html
<capsule-aspect-ratio ratio="16/9">
  <video controls>
    <source
      src="video.mp4"
      type="video/mp4"
    />
  </video>
</capsule-aspect-ratio>
```

### С пользовательским контентом

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-aspect-ratio ratio="3/2">
    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--capsule-color-primary), var(--capsule-color-accent)); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">Пользовательский контент</div>
  </capsule-aspect-ratio>
</div>

```html
<capsule-aspect-ratio ratio="3/2">
  <div style="background: linear-gradient(...);">
    Пользовательский контент
  </div>
</capsule-aspect-ratio>
```

### Портретные изображения

<div style="margin: 1rem 0; max-width: 300px;">
  <capsule-aspect-ratio ratio="3/4">
    <img src="https://picsum.photos/300/400" alt="Портрет" style="border-radius: 6px;" />
  </capsule-aspect-ratio>
</div>

```html
<capsule-aspect-ratio ratio="3/4">
  <img
    src="https://picsum.photos/300/400"
    alt="Портрет"
  />
</capsule-aspect-ratio>
```

## API

### Свойства

| Свойство | Тип      | По умолчанию | Описание                                                          |
| -------- | -------- | ------------ | ----------------------------------------------------------------- |
| `ratio`  | `string` | `''`         | Соотношение сторон (например, `'16/9'`, `'16:9'`, `'4/3'`, `'1'`) |

### Формат

Атрибут `ratio` принимает значения в следующих форматах:

- `"16/9"` - Формат со слэшем (рекомендуется)
- `"16:9"` - Формат с двоеточием (тоже поддерживается)
- `"1"` - Одно число (интерпретируется как `1/1`)

## Примечания

- Дочерние элементы автоматически заполняют контейнер
- Используйте CSS свойство `object-fit` на изображениях/видео для правильного размера (по умолчанию `cover`)
- Компонент использует CSS свойство `aspect-ratio` под капотом
