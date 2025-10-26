# Button Group

Компонент для группировки кнопок с бесшовными границами. Идеально подходит для группировки связанных действий.

## Установка

```bash
npx capsule add ButtonGroup
```

## Использование

### Базовая группа кнопок

<div style="margin: 1rem 0;">
<capsule-button-group>
  <capsule-button>Один</capsule-button>
  <capsule-button>Два</capsule-button>
  <capsule-button>Три</capsule-button>
</capsule-button-group>
</div>

```html
<capsule-button-group>
  <capsule-button>Один</capsule-button>
  <capsule-button>Два</capsule-button>
  <capsule-button>Три</capsule-button>
</capsule-button-group>
```

### Варианты в группе

<div style="margin: 1rem 0;">
<capsule-button-group>
  <capsule-button variant="primary">Primary</capsule-button>
  <capsule-button variant="secondary">Secondary</capsule-button>
  <capsule-button variant="outline">Outline</capsule-button>
</capsule-button-group>
</div>

```html
<capsule-button-group>
  <capsule-button variant="primary">Primary</capsule-button>
  <capsule-button variant="secondary">Secondary</capsule-button>
  <capsule-button variant="outline">Outline</capsule-button>
</capsule-button-group>
```

### Семантические цвета

<div style="margin: 1rem 0;">
<capsule-button-group>
  <capsule-button variant="success">Сохранить</capsule-button>
  <capsule-button variant="error">Удалить</capsule-button>
</capsule-button-group>
</div>

```html
<capsule-button-group>
  <capsule-button variant="success">Сохранить</capsule-button>
  <capsule-button variant="error">Удалить</capsule-button>
</capsule-button-group>
```

### Ориентации

#### Горизонтальная (по умолчанию)

<div style="margin: 1rem 0;">
<capsule-button-group orientation="horizontal">
  <capsule-button>Слева</capsule-button>
  <capsule-button>Центр</capsule-button>
  <capsule-button>Справа</capsule-button>
</capsule-button-group>
</div>

```html
<capsule-button-group orientation="horizontal">
  <capsule-button>Слева</capsule-button>
  <capsule-button>Центр</capsule-button>
  <capsule-button>Справа</capsule-button>
</capsule-button-group>
```

#### Вертикальная

<div style="margin: 1rem 0;">
<capsule-button-group orientation="vertical">
  <capsule-button>Первый</capsule-button>
  <capsule-button>Второй</capsule-button>
  <capsule-button>Третий</capsule-button>
</capsule-button-group>
</div>

```html
<capsule-button-group orientation="vertical">
  <capsule-button>Первый</capsule-button>
  <capsule-button>Второй</capsule-button>
  <capsule-button>Третий</capsule-button>
</capsule-button-group>
```

### Размеры

<div style="margin: 1rem 0;">
<capsule-button-group>
  <capsule-button size="xs">XS</capsule-button>
  <capsule-button size="xs">XS</capsule-button>
  <capsule-button size="xs">XS</capsule-button>
</capsule-button-group>
</div>

<div style="margin: 1rem 0;">
<capsule-button-group>
  <capsule-button size="sm">SM</capsule-button>
  <capsule-button size="sm">SM</capsule-button>
  <capsule-button size="sm">SM</capsule-button>
</capsule-button-group>
</div>

<div style="margin: 1rem 0;">
<capsule-button-group>
  <capsule-button size="md">MD</capsule-button>
  <capsule-button size="md">MD</capsule-button>
  <capsule-button size="md">MD</capsule-button>
</capsule-button-group>
</div>

```html
<capsule-button-group>
  <capsule-button size="xs">XS</capsule-button>
  <capsule-button size="xs">XS</capsule-button>
  <capsule-button size="xs">XS</capsule-button>
</capsule-button-group>
```

### Смешанные состояния

<div style="margin: 1rem 0;">
<capsule-button-group>
  <capsule-button>Включена</capsule-button>
  <capsule-button>Включена</capsule-button>
  <capsule-button disabled>Отключена</capsule-button>
</capsule-button-group>
</div>

```html
<capsule-button-group>
  <capsule-button>Включена</capsule-button>
  <capsule-button>Включена</capsule-button>
  <capsule-button disabled>Отключена</capsule-button>
</capsule-button-group>
```

## Атрибуты

| Атрибут      | Тип     | По умолчанию | Описание                           |
| ------------- | ------- | ------------ | ---------------------------------- |
| `orientation` | string  | `horizontal` | Ориентация группы кнопок           |

### Значения orientation

- `horizontal` - Расположить кнопки горизонтально (по умолчанию)
- `vertical` - Расположить кнопки вертикально

## Доступность

- ✅ ARIA role="group" для screen readers
- ✅ Правильное управление фокусом
- ✅ Поддержка навигации с клавиатуры

## Примечания

- ButtonGroup автоматически управляет border radius для создания бесшовных соединений
- Все кнопки внутри должны быть одинакового размера для лучшего внешнего вида
- Работает со всеми вариантами и размерами кнопок

